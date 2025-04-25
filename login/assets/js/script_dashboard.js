// const token = localStorage.getItem('auth_token');
document.getElementById('token-display').textContent = token;

function logout() {
    localStorage.removeItem('auth_token');
    window.location.replace('/');
  }