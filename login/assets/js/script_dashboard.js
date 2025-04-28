function logout() {
    localStorage.removeItem('auth_token');
    window.location.replace('/');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const userInfo = localStorage.getItem('user_info');
    
    if (userInfo) {
      const user = JSON.parse(userInfo);
      document.getElementById('welcome-message').innerHTML = `Welcome, ${user.username}! <br> ${user.email}`;

    } else {
      // If no user info, redirect to login page
      window.location.href = 'login';
    }
  });
  