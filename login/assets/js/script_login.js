const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const formLogin = document.getElementById('form-login');
const formRegister = document.getElementById('form-register');


/**
 * Switch between login and register tabs, clearing other form fields.
 * @param {boolean} showLogin - If true, show login tab; otherwise, show register tab.
 * @returns {void}
 */
function showForm(showLogin) {
  formLogin.classList.add('opacity-0', 'pointer-events-none');
  formRegister.classList.add('opacity-0', 'pointer-events-none');
  formLogin.reset();
  formRegister.reset();
  [tabLogin, tabRegister].forEach(tab => {
    tab.classList.remove('bg-[#3F3A37]', 'border-white');
    tab.classList.add('bg-[#4F4A47]', 'border-transparent');
  });
  if (showLogin) {
    formLogin.classList.remove('opacity-0', 'pointer-events-none');
    tabLogin.classList.add('bg-[#3F3A37]', 'border-white');
  } else {
    formRegister.classList.remove('opacity-0', 'pointer-events-none');
    tabRegister.classList.add('bg-[#3F3A37]', 'border-white');
  }
}

tabLogin.addEventListener('click', () => showForm(true));
tabRegister.addEventListener('click', () => showForm(false));
showForm(true);


/**
 * Toggle visibility of a password field.
 * @param {HTMLElement} btn - The <button> element that was clicked.
 * @param {string} inputId - The ID of the <input type="password"> to toggle.
 * @example
 *    // Onclick: togglePassword(btn, 'login-password')
 */
function togglePassword(btn, inputId) {
  const input = document.getElementById(inputId);
  const isPwd = input.type === 'password';
  input.type = isPwd ? 'text' : 'password';
  btn.textContent = isPwd ? 'visibility_off' : 'visibility';
}


/**
 * Register a new user by sending data to the API.
 * Disables the register button, shows spinner, and displays toasts.
 * @async
 * @returns {Promise<void>}
 */
async function registerUser() {
  const btn = document.getElementById('btn-register');
  const spinner = document.getElementById('register-spinner');
  const text = document.getElementById('register-text');
  btn.disabled = true;
  spinner.classList.remove('hidden');
  text.classList.add('hidden');
  const username = document.getElementById('register-username').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('reg-password').value.trim();
  if (!username || !email || !password) {
    showToast('error', 'Please fill in all fields.');
    spinner.classList.add('hidden');
    text.classList.remove('hidden');
    btn.disabled = false;
    return;
  }
  try {
    const res = await fetch('https://api.chavazystem.tech/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (data.success) {
      showToast('success', 'Registration successful! Check your email.');
      showForm(true);
    } else {
      showToast('error', data.message || 'Registration failed');
    }
  } catch (err) {
    console.error(err);
    showToast('error', 'Network error');
  } finally {
    spinner.classList.add('hidden');
    text.classList.remove('hidden');
    btn.disabled = false;
  }
}


/**
 * Log in an existing user by sending credentials to the API.
 * Disables the login button, shows spinner, and displays toasts.
 * @async
 * @returns {Promise<void>}
 */
async function loginUser() {
  const btn = document.getElementById('btn-login');
  const spinner = document.getElementById('login-spinner');
  const text = document.getElementById('login-text');
  btn.disabled = true;
  spinner.classList.remove('hidden');
  text.classList.add('hidden');
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();
  if (!username || !password) {
    showToast('error', 'Please enter both username and password.');
    spinner.classList.add('hidden');
    text.classList.remove('hidden');
    btn.disabled = false;
    return;
  }
  try {
    const res = await fetch('https://api.chavazystem.tech/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_info', JSON.stringify({ username: data.username, email: data.email }));
      console.log('*******************\m' + JSON.stringify({ username: data.username, email: data.email }))
      showToast('success','Login successful!');
      setTimeout(() => {
        window.location.href = '/login/dashboard.html';
      }, 800);
    } else {
      showToast('error', data.message || 'Login failed');
    }
  } catch (err) {
    console.error(err);
    showToast('error', 'Network error');
  } finally {
    spinner.classList.add('hidden');
    text.classList.remove('hidden');
    btn.disabled = false;
  }
}


/**
 * Display a toast notification.
 * @param {'success' | 'error' | 'warning'} type - The toast type.
 * @param {string} message - Message to display.
 * @param {number} [duration=3000] - Duration before fade-out (ms).
 */
function showToast(type, message, duration = 3000) {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  const bgColor = {
    success: 'bg-green-500',
    error:   'bg-red-500',
    warning: 'bg-yellow-500'
  }[type] || 'bg-gray-500';

  toast.classList.add(
    bgColor, 'text-white', 'px-6', 'py-3', 'rounded-lg', 'shadow-lg',
    'mb-4', 'text-lg', 'transition-opacity', 'duration-500', 'opacity-100'
  );
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 500);
  }, duration);
}


document.addEventListener('DOMContentLoaded', async function () {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  const confirmed = queryParams.get('confirmed');
  if (confirmed === 'true' && token) {
    try {
      const res = await fetch(`https://api.chavazystem.tech/api/verify_session?token=${token}`);
      if (!res.ok) {
        throw new Error('Token inválido');
      }
      const data = await res.json();
      if (data.success) {
        showToast('success', '¡Email confirmado exitosamente! 🎉');
      } else {
        showToast('error', '⚠️ Token inválido o expirado.');
      }
    } catch (err) {
      console.error(err);
      showToast('error', '⚠️ Error verificando token.');
    }
  }
});
