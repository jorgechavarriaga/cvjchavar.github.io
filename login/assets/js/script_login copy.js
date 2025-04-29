const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const formLogin = document.getElementById('form-login');
const formRegister = document.getElementById('form-register');

function showForm(showLogin) {
  if (showLogin) {
    formLogin.classList.remove('opacity-0', 'pointer-events-none');
    formRegister.classList.add('opacity-0', 'pointer-events-none');
    tabLogin.classList.add('bg-[#3F3A37]', 'border-white');
    tabLogin.classList.remove('bg-[#4F4A47]', 'border-transparent');
    tabRegister.classList.add('bg-[#4F4A47]', 'border-transparent');
    tabRegister.classList.remove('bg-[#3F3A37]', 'border-white');
  } else {
    formLogin.classList.add('opacity-0', 'pointer-events-none');
    formRegister.classList.remove('opacity-0', 'pointer-events-none');
    tabRegister.classList.add('bg-[#3F3A37]', 'border-white');
    tabRegister.classList.remove('bg-[#4F4A47]', 'border-transparent');
    tabLogin.classList.add('bg-[#4F4A47]', 'border-transparent');
    tabLogin.classList.remove('bg-[#3F3A37]', 'border-white');
  }
}

tabLogin.addEventListener('click', () => showForm(true));
tabRegister.addEventListener('click', () => showForm(false));

showForm(true);

function togglePassword(btn) {
  const input = document.getElementById("login-password");
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  btn.textContent = isPassword ? "visibility_off" : "visibility";
}

function togglePasswordRegister(btn) {
  const input = document.getElementById("reg-password");
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  btn.textContent = isPassword ? "visibility_off" : "visibility";
}

function registerUser() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('reg-password').value;  
    fetch('https://api.chavazystem.tech/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Registration successful. Please check your email to verify your account.');
        } else {
          alert('Error: ' + (data.message || 'Registration failed'));
        }
      })
      .catch(err => {
        console.error(err);
        alert('Network error');
      });
  }
    
  function loginUser() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    fetch('https://api.chavazystem.tech/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_info', JSON.stringify({ username: data.username, email: data.email }));
        window.location.href = '/login/dashboard.html';
      } else {
        alert('Error: ' + (data.message || 'Login failed'));
      }
    })
    .catch(err => {
      console.error(err);
      alert('Network error');
    });
  }

