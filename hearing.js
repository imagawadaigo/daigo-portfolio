/* Hearing form → portfolio-contact-worker /hearing */
(function () {
  var ENDPOINT = 'https://portfolio-contact.wishdaigo1458.workers.dev/hearing';
  var form = document.getElementById('hearing-form');
  var msg  = document.getElementById('form-msg');
  var receipt     = document.getElementById('form-receipt');
  var receiptText = document.getElementById('receipt-text');
  var copyBtn     = document.getElementById('copy-receipt');
  if (!form || !msg) return;

  var FIELDS = [
    { name: 'company',       label: '会社名・部署' },
    { name: 'name',          label: 'ご担当者名' },
    { name: 'contact',       label: '連絡先' },
    { name: 'engagement',    label: 'ご依頼の形態',        type: 'choice' },
    { name: 'end_user',      label: 'ツールを実際に使う方', type: 'choice' },
    { name: 'task_detail',   label: '解決したい業務課題' },
    { name: 'current_tools', label: '現在の運用方法・使用ツール' },
    { name: 'systems',       label: '連携が必要になりそうなサービス', type: 'choice' },
    { name: 'access_grant',  label: '開発用の権限・アカウント発行',   type: 'choice' },
    { name: 'deliverable',   label: '完成イメージ',        type: 'choice' },
    { name: 'usage',         label: '利用人数・利用頻度' },
    { name: 'budget',        label: '予算感',   type: 'select' },
    { name: 'deadline',      label: '希望納期', type: 'select' },
    { name: 'mtg_slots',     label: 'MTGご希望日時' },
    { name: 'reference',     label: '参考資料・URL' },
    { name: 'note',          label: 'その他・補足' }
  ];

  function choiceText(input) {
    var wrap = input.closest('label');
    var span = wrap && wrap.querySelector('span');
    if (!span) return input.value;
    var clone = span.cloneNode(true);
    var note = clone.querySelector('.note');
    if (note) note.remove();
    return clone.textContent.trim();
  }

  function fieldValue(f) {
    if (f.type === 'choice') {
      var checked = form.querySelectorAll('input[name="' + f.name + '"]:checked');
      var texts = [];
      checked.forEach(function (el) { texts.push(choiceText(el)); });
      return texts.join(' / ');
    }
    if (f.type === 'select') {
      var sel = form.querySelector('select[name="' + f.name + '"]');
      if (!sel || !sel.value) return '';
      return sel.options[sel.selectedIndex].text;
    }
    var el = form.querySelector('[name="' + f.name + '"]');
    return el ? el.value.trim() : '';
  }

  function buildReceipt() {
    var lines = [
      '【ご依頼前ヒアリングシート 送信控え】',
      '送信日時: ' + new Date().toLocaleString('ja-JP'),
      '送信先: 今川大悟（wishdaigo1458@gmail.com）',
      '────────────────────'
    ];
    FIELDS.forEach(function (f) {
      lines.push(f.label + ': ' + (fieldValue(f) || '（未記入）'));
    });
    lines.push('────────────────────');
    lines.push('原則24時間以内に折り返しご連絡します。');
    return lines.join('\n');
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = receiptText.textContent;
      function done() {
        copyBtn.textContent = 'コピーしました ✓';
        setTimeout(function () { copyBtn.textContent = '控えをコピー'; }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        done();
      }
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var btn = form.querySelector('button[type="submit"]');
    var label = btn.querySelector('span');
    btn.disabled = true;
    label.textContent = '送信中…';
    msg.hidden = true;

    var summary = buildReceipt();

    fetch(ENDPOINT, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.ok) {
        msg.hidden = false;
        msg.dataset.state = 'success';
        msg.textContent = '送信しました。内容を確認のうえ、24時間以内にご連絡します。下記に送信内容の控えを表示しています。';
        if (receipt && receiptText) {
          receiptText.textContent = summary;
          receipt.hidden = false;
        }
        form.reset();
      } else {
        throw new Error(data.error);
      }
    })
    .catch(function () {
      msg.hidden = false;
      msg.dataset.state = 'error';
      msg.textContent = '送信に失敗しました。wishdaigo1458@gmail.com までご連絡ください。';
    })
    .finally(function () {
      btn.disabled = false;
      label.textContent = '送信する';
    });
  });
})();
