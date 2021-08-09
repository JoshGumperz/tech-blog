const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logging in',
          showConfirmButton: false,
          timer: 1500
        })
        document.location.replace('/');
      } else {
        await Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Incorrect Username or Password',
          showConfirmButton: true,
          timer: 1500
      })
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Account created',
          showConfirmButton: false,
          timer: 1500
        })
        document.location.replace('/');
      } else {
        await Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'User already exists',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  