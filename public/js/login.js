const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log('form handler working');
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const json = await response.json();
      alert(json.message);
    }
  }
};

if (document.querySelector('.login-form')) {
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
}
