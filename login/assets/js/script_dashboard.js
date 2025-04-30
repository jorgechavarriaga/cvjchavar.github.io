function logout() {
  showToast('success', 'You have been logged out successfully!');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_info');
  localStorage.removeItem('email'); 
  setTimeout(() => {
    window.location.replace('/login/index.html');
  }, 100);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      document.getElementById('welcome-message').innerHTML = `Welcome, ${user.username}! <br> ${user.email}`;
    } else {
      window.location.href = '/login/index.html';
    }
  });
  