const editUserRole = async (user, role) => {
  if (user && role) {
    const assignment = {
      user_id: user,
      role_id: role,
    };
    const response = await fetch(`/api/userroles`, {
      method: 'POST',
      body: JSON.stringify(assignment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log('response :>> ', response);
      document.location.reload();
    } else {
      alert('Failed to assign role');
    }
  }
};

if (document.querySelector('#roleTable')) {
  document
    .querySelector('#roleTable')
    .addEventListener('click', function (event) {
      // event.preventDefault();
      if (event.target.value === 'Submit') {
        const btnId = event.target.id;
        const btn = document.getElementById(btnId);
        const roleId = btn.getAttribute('data-value');
        const role = document.getElementById(roleId);
        const userId = btn.getAttribute('data-user');
        editUserRole(userId, role.value);
      }
    });
}
