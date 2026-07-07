/* AI chat widget — self-injecting, monochrome (styles.css token準拠) */
(function () {
  var ENDPOINT = 'https://portfolio-chat.wishdaigo1458.workers.dev/chat';

  var css = [
    '#chat-widget{position:fixed;bottom:24px;right:24px;z-index:9000;display:flex;flex-direction:column;align-items:flex-end;gap:12px;}',
    '#chat-toggle{display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 18px 0 14px;border-radius:999px;background:var(--ink);color:var(--bg);border:1px solid var(--ink);cursor:pointer;font-family:var(--sans);font-size:13px;font-weight:500;letter-spacing:-0.005em;box-shadow:0 8px 24px -12px rgba(10,10,10,0.4);transition:transform 180ms var(--ease-out);white-space:nowrap;}',
    '#chat-toggle:hover{transform:translateY(-2px);}',
    '#chat-toggle:active{transform:scale(0.97);}',
    '#chat-panel{display:none;flex-direction:column;width:320px;background:var(--bg-elev);border:1px solid var(--line-strong);border-radius:var(--radius);box-shadow:0 24px 48px -24px rgba(10,10,10,0.25);overflow:hidden;max-height:calc(100dvh - 100px);}',
    '#chat-panel.is-open{display:flex;animation:chat-in 220ms var(--ease-out);}',
    '@keyframes chat-in{from{opacity:0;transform:translateY(10px) scale(0.97);}to{opacity:1;transform:none;}}',
    '.chat-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--line);background:var(--bg);flex-shrink:0;}',
    '.chat-header__info{display:flex;align-items:center;gap:8px;}',
    '.chat-header__dot{width:6px;height:6px;border-radius:50%;background:#16a34a;box-shadow:0 0 0 3px rgba(22,163,74,0.16);}',
    '.chat-header__title{font-family:var(--mono);font-size:12px;letter-spacing:0.04em;color:var(--ink);}',
    '.chat-close-btn{width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:transparent;border:none;cursor:pointer;color:var(--ink-4);border-radius:6px;transition:background 150ms;}',
    '.chat-close-btn:hover{background:var(--line-2);color:var(--ink);}',
    '.chat-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:8px;min-height:180px;max-height:300px;scroll-behavior:smooth;}',
    '.chat-msg{max-width:90%;}',
    '.chat-msg--bot{align-self:flex-start;}',
    '.chat-msg--user{align-self:flex-end;}',
    '.chat-msg p,.chat-msg span{display:block;padding:9px 12px;border-radius:12px;font-size:13px;line-height:1.65;margin:0;word-break:break-word;font-family:var(--sans);}',
    '.chat-msg--bot p,.chat-msg--bot span{background:var(--line-2);color:var(--ink-2);border-radius:4px 12px 12px 12px;}',
    '.chat-msg--user p,.chat-msg--user span{background:var(--ink);color:var(--bg);border-radius:12px 4px 12px 12px;}',
    '.chat-msg--typing span{color:var(--ink-4);font-style:italic;background:transparent;}',
    '.chat-contact-link{display:inline-block;margin-top:8px;padding:6px 12px;background:var(--ink);color:var(--bg);font-size:12px;font-weight:500;border-radius:999px;text-decoration:none;}',
    '.chat-input-area{display:flex;align-items:center;gap:8px;padding:10px 12px;border-top:1px solid var(--line);background:var(--bg);flex-shrink:0;}',
    '.chat-input{flex:1;padding:8px 11px;font-size:13px;font-family:var(--sans);background:var(--bg-elev);color:var(--ink);border:1px solid var(--line-strong);border-radius:8px;min-width:0;transition:border-color 150ms;}',
    '.chat-input:focus{outline:none;border-color:var(--ink);}',
    '.chat-send{width:34px;height:34px;border-radius:8px;background:var(--ink);color:var(--bg);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity 150ms,transform 100ms;}',
    '.chat-send:active{transform:scale(0.93);}',
    '.chat-send:disabled{opacity:0.4;cursor:not-allowed;}',
    '@media (max-width:400px){#chat-widget{bottom:16px;right:16px;}#chat-panel{width:calc(100vw - 32px);}}'
  ].join('\n');

  var html =
    '<div id="chat-panel" role="dialog" aria-modal="false" aria-label="AI自動応答チャット">' +
      '<div class="chat-header">' +
        '<div class="chat-header__info"><span class="chat-header__dot" aria-hidden="true"></span><span class="chat-header__title">AI自動応答</span></div>' +
        '<button id="chat-close" class="chat-close-btn" aria-label="閉じる">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
      '<div id="chat-messages" class="chat-messages" aria-live="polite" aria-relevant="additions">' +
        '<div class="chat-msg chat-msg--bot"><p>AIが自動でお答えします。料金や制作の流れなど、お気軽にどうぞ。</p></div>' +
      '</div>' +
      '<form id="chat-form" class="chat-input-area" autocomplete="off">' +
        '<input id="chat-input" class="chat-input" type="text" placeholder="質問を入力…" maxlength="400" autocomplete="off" spellcheck="false" aria-label="メッセージを入力" required>' +
        '<button type="submit" class="chat-send" aria-label="送信">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
        '</button>' +
      '</form>' +
    '</div>' +
    '<button id="chat-toggle" aria-expanded="false" aria-controls="chat-panel" aria-label="AIに質問する（自動応答）">' +
      '<svg id="chat-icon-open" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
      '<span id="chat-toggle-label">AIに質問（自動応答）</span>' +
      '<svg id="chat-icon-close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true" style="display:none;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
    '</button>';

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var widget = document.createElement('div');
    widget.id = 'chat-widget';
    widget.setAttribute('aria-label', 'AIチャット相談');
    widget.setAttribute('role', 'complementary');
    widget.innerHTML = html;
    document.body.appendChild(widget);

    var toggle      = document.getElementById('chat-toggle');
    var panel       = document.getElementById('chat-panel');
    var closeBtn    = document.getElementById('chat-close');
    var msgArea     = document.getElementById('chat-messages');
    var form        = document.getElementById('chat-form');
    var input       = document.getElementById('chat-input');
    var iconOpen    = document.getElementById('chat-icon-open');
    var iconClose   = document.getElementById('chat-icon-close');
    var toggleLabel = document.getElementById('chat-toggle-label');

    var history = [];
    var loading = false;

    function openPanel() {
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      iconOpen.style.display  = 'none';
      iconClose.style.display = '';
      toggleLabel.style.display = 'none';
      input.focus();
    }
    function closePanel() {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      iconOpen.style.display  = '';
      iconClose.style.display = 'none';
      toggleLabel.style.display = '';
    }
    toggle.addEventListener('click', function () {
      panel.classList.contains('is-open') ? closePanel() : openPanel();
    });
    closeBtn.addEventListener('click', closePanel);

    function addMessage(role, text) {
      var div = document.createElement('div');
      div.className = 'chat-msg chat-msg--' + role;
      var p = document.createElement('p');
      p.textContent = text;
      div.appendChild(p);
      if (role === 'bot' && text.indexOf('相談フォーム') !== -1) {
        var link = document.createElement('a');
        link.href = 'index.html#contact';
        link.className = 'chat-contact-link';
        link.textContent = '→ 相談フォームへ';
        div.appendChild(link);
      }
      msgArea.appendChild(div);
      msgArea.scrollTop = msgArea.scrollHeight;
    }
    function showTyping() {
      var div = document.createElement('div');
      div.id = 'chat-typing';
      div.className = 'chat-msg chat-msg--bot chat-msg--typing';
      var s = document.createElement('span');
      s.textContent = '入力中…';
      div.appendChild(s);
      msgArea.appendChild(div);
      msgArea.scrollTop = msgArea.scrollHeight;
    }
    function hideTyping() {
      var el = document.getElementById('chat-typing');
      if (el) el.remove();
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text || loading) return;

      input.value = '';
      loading = true;
      form.querySelector('button[type="submit"]').disabled = true;

      addMessage('user', text);
      history.push({ role: 'user', content: text });
      showTyping();

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          hideTyping();
          if (data.ok) {
            addMessage('bot', data.reply);
            history.push({ role: 'assistant', content: data.reply });
          } else {
            addMessage('bot', data.message || 'エラーが発生しました。しばらくしてからお試しください。');
            if (data.error === 'rate_limited') history = [];
          }
        })
        .catch(function () {
          hideTyping();
          addMessage('bot', '通信エラーが発生しました。時間をおいてお試しください。');
        })
        .finally(function () {
          loading = false;
          form.querySelector('button[type="submit"]').disabled = false;
          input.focus();
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
