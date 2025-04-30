function swaggerDocumentation(){
  const token = localStorage.getItem('auth_token');
  if (!token) {
    showToast('error', 'Token not valid.')
    window.location.href = "/login/index.html"; 
    exit;
  } else {
    showToast('success', 'ChavaZystem.tech API Docs');
    window.location.href = "https://api.chavazystem.tech/api-docs"; 
  }
};

function getURLParameter(name) {
  return new URLSearchParams(window.location.search).get(name);
}

window.addEventListener('load', () => {
  const error = getURLParameter('error');
  if (error === 'rate_limit_docs') {
    showToast('error', 'Too many requests to documentation');
  }
});

function logout() {
  showToast('success', 'You have been logged out successfully!');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_info');
  localStorage.removeItem('email'); 
  setTimeout(() => {
    window.location.replace('/login/index.html');
  }, 100);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      document.getElementById('welcome-message').innerHTML = `Welcome, ${user.username}! <br> ${user.email}`;
    } else {
      window.location.href = '/login/index.html';
    }
  });
  