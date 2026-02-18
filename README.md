<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>今川大悟 | Web制作・資料作成</title>
  <meta name="description" content="今川大悟のポートフォリオ。Webページ制作（LP/プロフィール）・資料作成・構成設計を丁寧なヒアリングで対応します。" />
  <style>
    :root{
      --bg: #0b0f14;
      --card: #111826;
      --text: #e6edf6;
      --muted: #a9b5c7;
      --line: rgba(255,255,255,.12);
      --accent: #7aa7ff;
      --accent2: #8dffd6;
      --shadow: 0 18px 60px rgba(0,0,0,.35);
      --radius: 18px;
      --max: 1040px;
    }
    *{ box-sizing: border-box; }
    html,body{ height:100%; }
    body{
      margin:0;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Hiragino Kaku Gothic ProN",
                   "Hiragino Sans", "Noto Sans JP", "Yu Gothic", "Meiryo", sans-serif;
      color: var(--text);
      background:
        radial-gradient(1000px 600px at 15% 10%, rgba(122,167,255,.20), transparent 55%),
        radial-gradient(900px 550px at 90% 20%, rgba(141,255,214,.13), transparent 60%),
        radial-gradient(850px 700px at 50% 90%, rgba(122,167,255,.10), transparent 55%),
        var(--bg);
      line-height: 1.7;
    }
    a{ color: inherit; text-decoration: none; }
    a:hover{ opacity: .9; }

    .wrap{ max-width: var(--max); margin: 0 auto; padding: 28px 20px 64px; }

    /* Header */
    header{
      display:flex; align-items:center; justify-content:space-between;
      gap: 14px;
      position: sticky;
      top: 0;
      padding: 14px 0;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      background: linear-gradient(to bottom, rgba(11,15,20,.75), rgba(11,15,20,0));
      z-index: 20;
    }
    .brand{
      display:flex; align-items:center; gap: 10px;
      font-weight: 700;
      letter-spacing: .02em;
    }
    .dot{
      width:10px; height:10px; border-radius: 999px;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      box-shadow: 0 0 0 5px rgba(122,167,255,.12);
    }
    nav{
      display:flex; gap: 14px; flex-wrap: wrap;
      font-size: 14px;
      color: var(--muted);
    }
    nav a{
      padding: 8px 10px;
      border: 1px solid transparent;
      border-radius: 999px;
    }
    nav a:hover{
      border-color: var(--line);
      background: rgba(255,255,255,.04);
      color: var(--text);
    }

    /* Hero */
    .hero{
      margin-top: 18px;
      padding: 26px;
      border-radius: var(--radius);
      border: 1px solid var(--line);
      background: rgba(17,24,38,.65);
      box-shadow: var(--shadow);
      overflow: hidden;
      position: relative;
    }
    .hero:before{
      content:"";
      position:absolute; inset:-2px;
      background: linear-gradient(120deg, rgba(122,167,255,.14), transparent 35%, rgba(141,255,214,.10));
      pointer-events:none;
    }
    .hero-inner{ position: relative; display:grid; gap: 18px; }
    .kicker{
      display:inline-flex; align-items:center; gap: 10px;
      font-size: 13px;
      color: var(--muted);
    }
    .pill{
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,.04);
    }
    h1{
      margin: 0;
      font-size: clamp(28px, 4.5vw, 44px);
      line-height: 1.2;
      letter-spacing: .01em;
    }
    .sub{
      margin: 0;
      color: var(--muted);
      font-size: 16px;
      max-width: 62ch;
    }
    .cta{
      display:flex; flex-wrap:wrap; gap: 10px;
      margin-top: 6px;
    }
    .btn{
      display:inline-flex; align-items:center; justify-content:center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 12px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,.04);
      font-weight: 650;
      font-size: 14px;
      cursor: pointer;
    }
    .btn.primary{
      border: none;
      background: linear-gradient(135deg, rgba(122,167,255,.95), rgba(141,255,214,.85));
      color: #081019;
    }
    .btn:hover{ transform: translateY(-1px); transition: .18s ease; }

    /* Sections */
    section{ margin-top: 26px; }
    .grid{
      display:grid;
      grid-template-columns: 1.2fr .8fr;
      gap: 16px;
    }
    @media (max-width: 900px){
      .grid{ grid-template-columns: 1fr; }
    }
    .card{
      padding: 18px;
      border-radius: var(--radius);
      border: 1px solid var(--line);
      background: rgba(17,24,38,.55);
      box-shadow: 0 10px 35px rgba(0,0,0,.22);
    }
    .card h2{
      margin: 0 0 10px;
      font-size: 18px;
    }
    .card p{ margin: 0 0 10px; color: var(--muted); }
    .list{
      margin: 12px 0 0; padding: 0;
      list-style: none;
      display:grid; gap: 10px;
    }
    .list li{
      padding: 12px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: rgba(255,255,255,.03);
    }
    .list strong{ color: var(--text); }
    .meta{
      display:flex; flex-wrap:wrap; gap: 8px;
      margin-top: 8px;
      color: var(--muted);
      font-size: 13px;
    }

    /* Works */
    .works{
      display:grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    @media (max-width: 900px){
      .works{ grid-template-columns: 1fr; }
    }
    .work{
      padding: 16px;
      border-radius: var(--radius);
      border: 1px solid var(--line);
      background: rgba(17,24,38,.55);
      position: relative;
      overflow: hidden;
    }
    .work:before{
      content:"";
      position:absolute; inset: 0;
      background: radial-gradient(450px 220px at 30% 20%, rgba(122,167,255,.12), transparent 60%);
      pointer-events:none;
    }
    .work > *{ position: relative; }
    .tagrow{ display:flex; flex-wrap:wrap; gap: 8px; margin-top: 10px; }
    .tag{
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,.03);
      color: var(--muted);
    }
    .work h3{ margin: 2px 0 8px; font-size: 16px; }
    .work p{ margin: 0; color: var(--muted); }

    /* Process */
    .steps{
      display:grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    @media (max-width: 900px){
      .steps{ grid-template-columns: 1fr; }
    }
    .step{
      padding: 14px;
      border-radius: var(--radius);
      border: 1px solid var(--line);
      background: rgba(17,24,38,.55);
    }
    .num{
      width: 30px; height: 30px; border-radius: 999px;
      display:grid; place-items:center;
      background: rgba(255,255,255,.06);
      border: 1px solid var(--line);
      color: var(--text);
      font-weight: 700;
      margin-bottom: 10px;
    }
    .step p{ margin: 0; color: var(--muted); }

    /* Footer */
    footer{
      margin-top: 28px;
      padding-top: 16px;
      border-top: 1px solid var(--line);
      color: var(--muted);
      font-size: 13px;
      display:flex; justify-content:space-between; gap: 10px; flex-wrap:wrap;
    }
    .small a{ text-decoration: underline; }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <div class="brand">
        <span class="dot" aria-hidden="true"></span>
        <span>今川大悟</span>
      </div>
      <nav>
        <a href="#about">自己紹介</a>
        <a href="#works">制作例</a>
        <a href="#services">できること</a>
        <a href="#process">流れ</a>
        <a href="#contact">連絡</a>
      </nav>
    </header>

    <main>
      <div class="hero">
        <div class="hero-inner">
          <div class="kicker">
            <span class="pill">Web制作 / 資料作成</span>
            <span class="pill">丁寧ヒアリング</span>
            <span class="pill">返信は原則24h以内</span>
          </div>

          <h1>想いを、伝わる形に。</h1>
          <p class="sub">
            今川大悟です。まずは「何を、誰に、どう伝えるか」を一緒に整理して、
            1ページのWebや資料として仕上げます。実績はこれから積み上げる段階ですが、
            その分、一件一件を丁寧に、スピード感を持って対応します。
          </p>

          <div class="cta">
            <a class="btn primary" href="#contact">相談する（まずは内容整理から）</a>
            <a class="btn" href="#works">制作例を見る</a>
          </div>
        </div>
      </div>

      <section id="about" class="grid">
        <div class="card">
          <h2>自己紹介</h2>
          <p>
            学生団体・イベント企画・運営の経験を通じて、「情報を整理して、人に伝わる形にする」ことを積み重ねてきました。
            Webページや資料は、見た目だけじゃなく<strong>構成（情報設計）</strong>が命だと思っています。
          </p>
          <p>
            まだ制作実績は少ないですが、まずは小さな案件から着実に信頼を積み上げたいです。
            「言いたいことはあるけど、うまくまとまらない」——その状態から一緒に整えます。
          </p>
          <div class="meta">
            <span>拠点：日本</span>
            <span>対応：オンライン中心</span>
            <span>返信：原則24時間以内</span>
          </div>
        </div>

        <div class="card" id="services">
          <h2>できること</h2>
          <ul class="list">
            <li><strong>プロフィール/LP（1ページ）制作</strong><br><span style="color:var(--muted)">構成 → デザイン → 公開までサポート</span></li>
            <li><strong>資料作成（スライド）</strong><br><span style="color:var(--muted)">要点整理・見やすさ改善・ストーリー設計</span></li>
            <li><strong>文章の整理・整形</strong><br><span style="color:var(--muted)">自己紹介文、サービス説明、募集文など</span></li>
          </ul>
        </div>
      </section>

      <section id="works">
        <h2 style="margin:0 0 12px; font-size:18px;">制作例（サンプル）</h2>
        <div class="works">
          <article class="work">
            <div class="pill" style="display:inline-block;">Sample</div>
            <h3>架空サービスのLP</h3>
            <p>ターゲット/訴求/導線を整理して、1ページに落とし込みます。</p>
            <div class="tagrow">
              <span class="tag">構成設計</span><span class="tag">コピー</span><span class="tag">LP</span>
            </div>
          </article>

          <article class="work">
            <div class="pill" style="display:inline-block;">Sample</div>
            <h3>自己紹介ページ</h3>
            <p>あなたの強みが伝わるように、情報を整理して見せます。</p>
            <div class="tagrow">
              <span class="tag">プロフィール</span><span class="tag">Web</span><span class="tag">文章整理</span>
            </div>
          </article>

          <article class="work">
            <div class="pill" style="display:inline-block;">Sample</div>
            <h3>営業/提案資料（10枚）</h3>
            <p>「何を言うか」より「どう伝わるか」を重視して整えます。</p>
            <div class="tagrow">
              <span class="tag">スライド</span><span class="tag">ストーリー</span><span class="tag">整理</span>
            </div>
          </article>
        </div>
        <p style="color:var(--muted); margin:10px 0 0;">
          ※ここはあなたが制作したスクショやリンクに差し替えていけば、ポートフォリオとして完成します。
        </p>
      </section>

      <section id="process">
        <h2 style="margin:0 0 12px; font-size:18px;">制作の流れ</h2>
        <div class="steps">
          <div class="step">
            <div class="num">1</div>
            <p><strong>ヒアリング</strong><br>目的・ターゲット・素材を確認します。</p>
          </div>
          <div class="step">
            <div class="num">2</div>
            <p><strong>構成提案</strong><br>ページ構成と文章の方向性を作ります。</p>
          </div>
          <div class="step">
            <div class="num">3</div>
            <p><strong>制作</strong><br>Web/資料を形にして初稿提出します。</p>
          </div>
          <div class="step">
            <div class="num">4</div>
            <p><strong>修正・納品</strong><br>調整して納品。公開もサポートします。</p>
          </div>
        </div>
      </section>

      <section id="contact" class="card">
        <h2>連絡</h2>
        <p>
          まずは「相談希望」とメッセージでOKです。<br>
          目的とざっくりのイメージを教えてもらえれば、必要な質問をこちらから投げます。
        </p>
        <div class="cta">
          <!-- メールアドレスは後で差し替え -->
          <a class="btn primary" href="mailto:your-email@example.com?subject=制作相談&body=相談内容：%0D%0A希望納期：%0D%0A参考URL（あれば）：">メールで相談</a>
          <a class="btn" href="#about">ページ上部へ</a>
        </div>
        <p class="small" style="margin-top:10px;">
          ※メール欄の <code>your-email@example.com</code> をあなたのアドレスに変えてください。
        </p>
      </section>
    </main>

    <footer>
      <div>© <span id="year"></span> Daigo Imagawa</div>
      <div class="small">このページはHTML/CSSのみで作成（軽量・高速）</div>
    </footer>
  </div>

  <script>
    // 年号だけ自動更新
    document.getElementById("year").textContent = new Date().getFullYear();
  </script>
</body>
</html>
