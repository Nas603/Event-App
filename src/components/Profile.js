import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../assets/styles/Profile.css';

const Profile = () => {
  const { user, logout } = useAuth0();

  const events = [
    { id: 1, title: 'Event 1', date: '2024-10-01' },
    { id: 2, title: 'Event 2', date: '2024-10-15' },
    { id: 3, title: 'Event 3', date: '2024-11-05' },
  ];

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="signed-up-events">
        <h3>Signed-Up Events</h3>
        {events.length > 0 ? (
          <ul>
            {events.map(event => (
              <li key={event.id}>
                <strong>{event.title}</strong> - {event.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events signed up for yet.</p>
        )}
      </div>
      <button className="logout-button" onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;