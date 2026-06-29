# 今川大悟 ポートフォリオ — Web制作・LINE Bot・システム開発

LP・店舗サイトの制作から、LINE Bot構築・業務自動化・SaaSプロトタイプ開発まで一貫して対応します。自社プロダクトを本番運用しながら、企画・設計・実装・運用までを一人で回しています。

**公開サイト**: https://imagawadaigo.github.io/daigo-portfolio/

---

## このサイトでわかること

- **制作できるもの**: 業種別ランディングページ、店舗サイト、LINE Bot、業務自動化ツール、Webアプリ
- **進め方**: ヒアリング → 設計 → 実装 → 公開 → 運用までの流れ（[process.html](process.html)）
- **実績・連絡先**: プロフィールと問い合わせ（[about.html](about.html) / [contact.html](contact.html)）

## 収録している制作サンプル

| ページ | 内容 |
|---|---|
| [bakery-cafe.html](bakery-cafe.html) | ベーカリー・カフェ向けLP |
| [izakaya-lp.html](izakaya-lp.html) | 居酒屋向けLP |
| [salon-lp.html](salon-lp.html) | サロン向けLP |
| [construction.html](construction.html) | 建設・工務店向けサイト |

## 技術構成

- **サイト本体**: Jekyll（静的サイトジェネレータ）+ GitHub Pages でホスティング
- **レイアウト/共通部品**: `_layouts/` `_includes/`
- **問い合わせ・チャット**: Cloudflare Workers 上のAPI（別リポジトリ `portfolio-contact-worker` / `portfolio-chat-worker`）と連携

## ローカルで動かす

```bash
bundle install
bundle exec jekyll serve
# http://localhost:4000/daigo-portfolio/
```

## 制作者

今川大悟 — 九州大学法学部在学。自社プロダクト（法学学習プラットフォーム等）を企画から本番運用まで手がける。
お問い合わせはサイトの[コンタクトフォーム](https://imagawadaigo.github.io/daigo-portfolio/contact.html)から。
