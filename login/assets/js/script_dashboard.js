function logout() {
    localStorage.removeItem('auth_token');
    window.location.replace('/');
  }