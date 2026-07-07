#!/bin/bash
# カスタムドメイン移行スクリプト
# 使い方: bash scripts/switch-domain.sh example.com
# やること:
#   1. 全HTML/sitemap.xml/robots.txt/site.webmanifest の絶対URLを新ドメインに置換
#   2. GitHub Pages 用の CNAME ファイルを作成
#   3. サブパス(/daigo-portfolio/)前提の絶対パスをルート(/)に付け替え
# 実行後: 差分を確認して commit → push。DNS/GSC の残作業は docs/domain-migration.md 参照。

set -euo pipefail

if [ $# -ne 1 ]; then
  echo "使い方: bash scripts/switch-domain.sh <新ドメイン (例: daigo-imagawa.com)>"
  exit 1
fi

DOMAIN="$1"
OLD_ORIGIN="https://imagawadaigo.github.io/daigo-portfolio"
NEW_ORIGIN="https://${DOMAIN}"

cd "$(dirname "$0")/.."

# 1. 絶対URLの置換（HTML / sitemap / robots / manifest / JS）
FILES=$(grep -rl "$OLD_ORIGIN" --include="*.html" --include="*.xml" --include="*.txt" --include="*.webmanifest" --include="*.js" . | grep -v node_modules || true)
for f in $FILES; do
  sed -i '' "s|${OLD_ORIGIN}|${NEW_ORIGIN}|g" "$f"
  echo "updated: $f"
done

# 2. サブパス絶対参照（/daigo-portfolio/xxx）をルートに付け替え
SUBPATH_FILES=$(grep -rl '"/daigo-portfolio/' --include="*.html" --include="*.webmanifest" --include="*.js" . | grep -v node_modules || true)
for f in $SUBPATH_FILES; do
  sed -i '' 's|"/daigo-portfolio/|"/|g' "$f"
  echo "subpath fixed: $f"
done
# url('/daigo-portfolio/...') 形式（CSS内・style属性）
SUBPATH_CSS=$(grep -rl "url('/daigo-portfolio/" --include="*.html" --include="*.css" . | grep -v node_modules || true)
for f in $SUBPATH_CSS; do
  sed -i '' "s|url('/daigo-portfolio/|url('/|g" "$f"
  echo "subpath(css) fixed: $f"
done

# 3. CNAME 作成
echo "$DOMAIN" > CNAME
echo "created: CNAME ($DOMAIN)"

echo ""
echo "完了。次にやること:"
echo "  1. git diff で置換結果を確認"
echo "  2. commit & push"
echo "  3. DNS設定・GSC移行は docs/domain-migration.md を参照"
