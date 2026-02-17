function validateName() {
  const name = document.getElementById('name').value.trim();
  const error = document.getElementById('name-error');
  const input = document.getElementById('name');
  if (name === '') {
    error.textContent = 'Name should not be empty.';
    input.classList.add('invalid');
    return false;
  }
  error.textContent = '';
  input.classList.remove('invalid');
  return true;
}

function validateEmail() {
  const email = document.getElementById('email').value.trim();
  const error = document.getElementById('email-error');
  const input = document.getElementById('email');
  if (!email.includes('@')) {
    error.textContent = 'Email must contain @.';
    input.classList.add('invalid');
    return false;
  }
  error.textContent = '';
  input.classList.remove('invalid');
  return true;
}

function validateAge() {
  const age = parseInt(document.getElementById('age').value);
  const error = document.getElementById('age-error');
  const input = document.getElementById('age');
  if (isNaN(age) || age < 18 || age > 60) {
    error.textContent = 'Age must be between 18 and 60.';
    input.classList.add('invalid');
    return false;
  }
  error.textContent = '';
  input.classList.remove('invalid');
  return true;
}

function validatePassword() {
  const password = document.getElementById('password').value;
  const error = document.getElementById('password-error');
  const input = document.getElementById('password');
  if (password.length < 6) {
    error.textContent = 'Password must be at least 6 characters.';
    input.classList.add('invalid');
    return false;
  }
  error.textContent = '';
  input.classList.remove('invalid');
  return true;
}

function validateForm() {
  const n = validateName();
  const e = validateEmail();
  const a = validateAge();
  const p = validatePassword();

  const successMsg = document.getElementById('success-msg');

  if (n && e && a && p) {
    const confirmed = confirm('All details are valid. Do you want to submit the form?');
    if (confirmed) {
      successMsg.style.display = 'block';
      successMsg.textContent = '✅ Registration successful! Welcome!';
      alert('Thank you for registering!');
    }
  } else {
    successMsg.style.display = 'none';
  }
}