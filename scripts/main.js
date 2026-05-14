document.addEventListener('DOMContentLoaded', () => {

  console.log("FORM SCRIPT LOADED");

  const form = document.querySelector('.form');
  if (!form) {
    console.log("FORM NOT FOUND");
    return;
  }

  const inputs = form.querySelectorAll('input');

  const url = "https://script.google.com/macros/s/AKfycbye-NSCe_pYOBU0irZqYPcwR8mDHAhsKVpX63l92xdlBzJ-R2inkSwgFz3aoER0nN4MFQ/exec";

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("SUBMIT CLICKED");

    const isValid = validateForm();

    console.log("VALID:", isValid);

    if (isValid) {
      sendForm();
    }
  });

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

    console.log("SENDING FORM...");

    const data = new FormData(form);

    fetch(url, {
      method: 'POST',
      body: data
    })
    .then(res => res.text())
    .then(res => {

      console.log("SUCCESS:", res);

      form.reset();

      inputs.forEach(i => {
        i.classList.remove('valid', 'error');
      });

    })
    .catch(err => {
      console.log("ERROR:", err);
    });
  }

});