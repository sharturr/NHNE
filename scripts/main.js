document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('.form');
  if (!form) return;

  const inputs = form.querySelectorAll('input');

  const url = "https://script.google.com/macros/s/AKfycbye-NSCe_pYOBU0irZqYPcwR8mDHAhsKVpX63l92xdlBzJ-R2inkSwgFz3aoER0nN4MFQ/exec";

  // Отправка формы
  form.addEventListener('submit', e => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return; // не отправляем, если есть ошибки

    // отправка данных
    const data = new FormData(form);

    fetch(url, { method: 'POST', body: data })
      .then(res => res.text())
      .then(() => {
        alert("Форма отправлена!");
        form.reset();
        inputs.forEach(input => {
          input.classList.remove('valid', 'error');
          input.nextElementSibling.textContent = '';
        });
      })
      .catch(() => {
        alert("Ошибка отправки, попробуйте ещё раз");
      });
  });

  // Проверка при вводе
  inputs.forEach(input => {
    input.addEventListener('input', () => validateField(input));
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
    const errorBox = input.nextElementSibling;
    let message = '';

    if (!value) {
      message = 'Это поле обязательно';
    } else if (input.id === 'phone') {
      const cleaned = value.replace(/[\s()+-]/g, '');
      if (!/^[0-9]{10,15}$/.test(cleaned)) {
        message = 'Введите корректный номер телефона';
      }
    }

    if (message) {
      input.classList.add('error');
      input.classList.remove('valid');
      if (errorBox) errorBox.textContent = message;
      return false;
    }

    input.classList.remove('error');
    input.classList.add('valid');
    if (errorBox) errorBox.textContent = '';
    return true;
  }

});