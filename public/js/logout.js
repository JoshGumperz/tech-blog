const logoutButton = $(".logout-btn")
const deleteAccount = $(".delete-account-btn")

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

deleteAccount.on("click", async function(){
  const result = await Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Are you sure you want to delete your account?',
    showConfirmButton: true,
    showCancelButton: true
  })

 if(result.isDismissed) {
   return
 }

  const response = await fetch(`/api/user`, {
      method: 'DELETE',
  })
  if (response.ok) {
      await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Account deleted',
          showConfirmButton: false,
          timer: 1500
      })
      
      logout();
  } else {
      await Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Failed to delete Account',
          showConfirmButton: false,
          timer: 1500
      })
  }
})
  
logoutButton.on("click", logout)