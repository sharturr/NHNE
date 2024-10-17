document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form form');
    const inputs = form.querySelectorAll('input, textarea');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            sendMessageToGoogleSheets();
        }
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
        return valid;
    }

    function validateField(input) {
        // const isEmail = input.type === 'email';
        const isPhone = input.type === 'text' && input.id === 'phone';
        const isEmpty = input.value.trim() === '';
        // const isInvalidEmail = isEmail && !validateEmail(input.value.trim());
        const isInvalidPhone = isPhone && !validatePhone(input.value.trim());

        if (isEmpty || isInvalidPhone) {
            input.classList.add('error');
            input.classList.remove('valid');
            return false;
        } else {
            input.classList.remove('error');
            input.classList.add('valid');
            return true;
        }
    }

    // function validateEmail(email) {
    //     const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     return re.test(String(email).toLowerCase());
    // }

    function validatePhone(phone) {
        const re = /^[0-9]{10,15}$/;
        return re.test(phone);
    }

    function sendMessageToGoogleSheets() {
        const url = 'https://script.google.com/macros/s/AKfycbynpRHI2Mc-W4BEIQaF7h9gYdVJW5pzSObs1uA49uv_lyNDfVrzbtALsIdug8QQ4CYb/exec';
        const data = new FormData(form);

        fetch(url, {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            alert('Form submitted successfully!');
            form.reset();
            inputs.forEach(input => input.classList.remove('valid', 'error'));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});