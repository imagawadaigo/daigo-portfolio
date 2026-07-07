/* Hearing form → portfolio-contact-worker /hearing */
(function () {
  var ENDPOINT = 'https://portfolio-contact.wishdaigo1458.workers.dev/hearing';
  var form = document.getElementById('hearing-form');
  var msg  = document.getElementById('form-msg');
  if (!form || !msg) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var btn = form.querySelector('button[type="submit"]');
    var label = btn.querySelector('span');
    btn.disabled = true;
    label.textContent = '送信中…';
    msg.hidden = true;

    fetch(ENDPOINT, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.ok) {
        msg.hidden = false;
        msg.dataset.state = 'success';
        msg.textContent = '送信しました。内容を確認のうえ、24時間以内にご連絡します。';
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
