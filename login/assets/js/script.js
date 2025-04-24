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
// Inicial
showForm(true);

function togglePassword(btn) {
  const input = document.getElementById("password");
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