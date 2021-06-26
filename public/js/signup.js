const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log('signup clicked');

  const first_name = document.querySelector('#first-name-signup').value.trim();
  const last_name = document.querySelector('#last-name-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (first_name && last_name && username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/login');
    } else {
      const json = await response.json();
      alert(json.message);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
