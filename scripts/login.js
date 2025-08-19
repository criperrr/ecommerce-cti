const pass = document.getElementById('pass');
const pass2 = document.getElementById('verify-pass');
const error = document.getElementById('error');
const button = document.getElementById('submit');

pass.addEventListener('input', verifyPassword);
pass2.addEventListener('input', verifyPassword);

button.disabled = true;

function verifyPassword() {
    error.textContent = '';

    if (pass.value == '' || pass2.value == '') {
        error.textContent = '';
        button.disabled = true;
    } else if (pass.value !== pass2.value) {
        error.textContent = 'As senhas não coincidem';
        button.disabled = true;
    } else {
        error.textContent = '';
        button.disabled = false;
    }
}