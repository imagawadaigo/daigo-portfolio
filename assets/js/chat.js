(function () {
  var ENDPOINT = 'https://portfolio-chat.wishdaigo1458.workers.dev/chat';

  var toggle      = document.getElementById('chat-toggle');
  var panel       = document.getElementById('chat-panel');
  var closeBtn    = document.getElementById('chat-close');
  var msgArea     = document.getElementById('chat-messages');
  var form        = document.getElementById('chat-form');
  var input       = document.getElementById('chat-input');
  var iconOpen    = document.getElementById('chat-icon-open');
  var iconClose   = document.getElementById('chat-icon-close');
  var toggleLabel = document.getElementById('chat-toggle-label');

  if (!toggle || !panel) return;

  var history = [];
  var loading = false;

  function openPanel() {
    panel.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    iconOpen.style.display  = 'none';
    iconClose.style.display = '';
    if (toggleLabel) toggleLabel.style.display = 'none';
    input.focus();
  }

  function closePanel() {
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    iconOpen.style.display  = '';
    iconClose.style.display = 'none';
    if (toggleLabel) toggleLabel.style.display = '';
  }

  toggle.addEventListener('click', function () {
    panel.classList.contains('is-open') ? closePanel() : openPanel();
  });

  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  function addMessage(role, text) {
    var div = document.createElement('div');
    div.className = 'chat-msg chat-msg--' + role;
    var p = document.createElement('p');
    p.textContent = text;
    div.appendChild(p);
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

  if (form) {
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
}());
