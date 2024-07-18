document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form form');
    const inputs = form.querySelectorAll('input, textarea');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(input);
        });
    });

    function validateForm() {
        let valid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                valid = false;
            }
        });
        if (valid) {
            alert('Form submitted successfully!');
        }
    }

    function validateField(input) {
        const isEmail = input.type === 'email';
        const isEmpty = input.value.trim() === '';
        const isInvalidEmail = isEmail && !validateEmail(input.value.trim());

        if (isEmpty || isInvalidEmail) {
            input.classList.add('error');
            input.classList.remove('valid');
            return false;
        } else {
            input.classList.remove('error');
            input.classList.add('valid');
            return true;
        }
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
});
