 document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('.form');
  if (!form) return;

  const inputs = form.querySelectorAll('input');

  const url = 'https://script.google.com/macros/s/AKfycbye-NSCe_pYOBU0irZqYPcwR8mDHAhsKVpX63l92xdlBzJ-R2inkSwgFz3aoER0nN4MFQ/exec';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      sendForm();
    }
  });

  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
  });

  function validateForm() {
    let valid = true;

    inputs.forEach(input => {
      if (!validateField(input)) valid = false;
    });

    return valid;
  }

  function validateField(input) {

    const value = input.value.trim();

    const isEmpty = value === '';
    const isPhone = input.id === 'phone';

    const isInvalidPhone = isPhone && !validatePhone(value);

    if (isEmpty || isInvalidPhone) {
      input.classList.add('error');
      input.classList.remove('valid');
      return false;
    }

    input.classList.remove('error');
    input.classList.add('valid');
    return true;
  }

  function validatePhone(phone) {
    const cleaned = phone.replace(/[\s()+-]/g, '');
    return /^[0-9]{10,15}$/.test(cleaned);
  }

  function sendForm() {

    const data = new FormData(form);

    showStatus('loading');

    fetch(url, {
      method: 'POST',
      body: data
    })
    .then(res => res.text())
    .then(() => {

      showStatus('success');

      form.reset();

      inputs.forEach(i => {
        i.classList.remove('valid', 'error');
      });

    })
    .catch(() => {
      showStatus('error');
    });
  }

  function showStatus(type) {

    if (type === 'loading') {
      console.log('Отправка...');
    }

    if (type === 'success') {
      console.log('Заявка отправлена!');
    }

    if (type === 'error') {
      console.log('Ошибка отправки');
    }
  }

});