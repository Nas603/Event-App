import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { EventContext } from '../context/EventContext';
import '../assets/styles/Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isLoading, isAuthenticated, logout } = useAuth0();
  const { events, unregisterFromEvent } = useContext(EventContext);
  const [signedUpEvents, setSignedUpEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      const userSignedUpEvents = events.filter(event => event.signedUpUsers?.includes(user.sub));
      setSignedUpEvents(userSignedUpEvents);
    }
  }, [isAuthenticated, user, events]);

  const handleUnregister = (eventId) => {
    unregisterFromEvent(eventId, user.sub);
    setSignedUpEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  }; 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-info">
        <h2>Name: {user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
      <div className="signed-up-events">
        <h3 className="events-title">Signed Up Events:</h3>
        {signedUpEvents.length > 0 ? (
          <ul className="events-list">
            {signedUpEvents.map(event => {
              const isEventPassed = new Date(event.date) < new Date();  // Check if the event has passed
              return (
                <li key={event.id} className="event-item">
                  <span>{event.title} - {formatDate(event.date)}</span> {/* Formatted date */}
                  {isEventPassed ? (
                    <button 
                      onClick={() => navigate(`/review-event/${event.id}`)} 
                      className="rate-event-button">
                      Rate Event
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleUnregister(event.id)} 
                      className="unregister-button">
                      Unregister
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>You have not signed up for any events.</p>
        )}
      </div>
      <div className="buttons-container">
        <button 
          onClick={() => navigate('/admin/dashboard')} 
          className="admin-dashboard-button">
          Admin Dashboard
        </button>
        <button 
          onClick={() => logout({ returnTo: window.location.origin })} 
          className="logout-button">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
