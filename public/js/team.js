const newFormHandler = async (event) => {
  event.preventDefault();

  const team_name = document.querySelector('#team-name').value.trim();

  if (team_name) {
    const response = await fetch(`/api/team`, {
      method: 'POST',
      body: JSON.stringify({ team_name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('response :>> ', response);

    if (response.ok) {
      console.log(response);
      document.location.replace('/teams');
    } else {
      alert('Failed to create team');
    }
  }
};

// const newEventForm = document.querySelector('.new-event-form');
// const team_id = newEventForm.getAttribute('data-team-id');
// console.log('team_id :>> ', team_id);

const newEventHandler = async (event) => {
  event.preventDefault();

  const event_name = document.querySelector('#event-name').value.trim();
  const date = document.querySelector('#event-date').value.trim();
  console.log('date :>> ', date);
  const time = document.querySelector('#event-time').value.trim();
  console.log('time :>> ', time);
  const team_id = event.target.getAttribute('data-team-id');

  const event_date = `${date}T${time}`;
  console.log('event_date :>> ', event_date);

  if (event_name && event_date && team_id) {
    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({ event_name, event_date, team_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
      alert('Failed to create event');
    }
  }
};
const newTeamPlayerHandler = async (event) => {
  event.preventDefault();

  const sel = document.getElementById('get-user');
  const user_id = parseInt(sel.value);
  const role_id = parseInt(sel.getAttribute('data-player-value'));

  console.log('user_id :>> ', user_id);
  console.log('role_id :>> ', role_id);

  console.log('typeof user_id :>> ', typeof user_id);
  console.log('typeof role_id :>> ', typeof role_id);

  if (user_id && role_id) {
    const response = await fetch(`/api/userroles`, {
      method: 'POST',
      body: JSON.stringify({ user_id, role_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
      console.log('success!');
    } else {
      alert(response.statusText);
      alert('Failed to create event');
    }
  }
};

const newAnnouncementHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#announcement-title').value.trim();
  const message = document.querySelector('#announcement-message').value.trim();
  const team_id = event.target.getAttribute('data-team-id');

  if (title && message && team_id) {
    const response = await fetch(`/api/announcements`, {
      method: 'POST',
      body: JSON.stringify({ title, message, team_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
      alert('Failed to create announcement');
    }
  }
};

const removeFromTeamHandler = async (event) => {
  event.preventDefault();

  console.log('event :>> ', event.submitter);

  const submitter = event.submitter;

  const userId = submitter.getAttribute('data-user-id');
  const teamId = submitter.getAttribute('data-team-id');
  const userRoleId = submitter.getAttribute('data-user-role-id');

  if (userRoleId) {
    const response = await fetch(`/api/userroles/${userRoleId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
      alert('Failed to remove user');
    }
  }
};

if (document.querySelector('.new-team-form')) {
  document
    .querySelector('.new-team-form')
    .addEventListener('submit', newFormHandler);
}

if (document.querySelector('.new-event-form')) {
  document
    .querySelector('.new-event-form')
    .addEventListener('submit', newEventHandler);
}

if (document.querySelector('.new-announcement-form')) {
  document
    .querySelector('.new-announcement-form')
    .addEventListener('submit', newAnnouncementHandler);
}

if (document.querySelector('.new-team-player-form')) {
  document
    .querySelector('.new-team-player-form')
    .addEventListener('submit', newTeamPlayerHandler);
}

if (document.querySelector('.remove-from-team-form')) {
  document
    .querySelector('.remove-from-team-form')
    .addEventListener('submit', removeFromTeamHandler);
}
