import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { useAuth0 } from '@auth0/auth0-react';
import '../assets/styles/EventDetailPage.css';

const EventDetailPage = () => {
  const { events, signUpForEvent } = useContext(EventContext);
  const { id } = useParams();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const event = events.find(event => event.id === id);

  if (!event) {
    return <p>Event not found.</p>;
  }

  const isAlreadySignedUp = event.signedUpUsers?.includes(user?.sub);

  const handleSignUp = () => {
    if (!user) {
      alert('Please log in to sign up for this event.');
      return;
    }

    if (isAlreadySignedUp) {
      alert('You have already signed up for this event.');
    } else {
      signUpForEvent(event.id);
      alert('You have signed up for this event!');
      navigate('/profile');
    }
  };


  return (
    <div className="event-detail-container">
      <h1>{event.title}</h1>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p> {/* Add this line */}
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
  
      <div className="event-detail-buttons">
        <button className="sign-up-btn" onClick={handleSignUp}>
          Sign Up for Event
        </button>
        <button className="back-btn" onClick={() => navigate('/events')}>
          Back to Events
        </button>
      </div>
    </div>
  );
};
export default EventDetailPage;