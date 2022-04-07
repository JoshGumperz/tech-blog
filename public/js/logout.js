const logoutButton = $(".logout-btn")

const logout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/api/login');
    } else {
      alert('Failed to log out.');
    }
};
  
logoutButton.on("click", logout)