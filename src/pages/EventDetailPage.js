import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { useAuth0 } from '@auth0/auth0-react';
import Alert from '../components/Alert';
import '../assets/styles/EventDetailPage.css';

const EventDetailPage = () => {
  const { events, signUpForEvent } = useContext(EventContext);
  const { id } = useParams();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const event = events.find(event => event.id === id);
  const [notification, setNotification] = useState('');
  const [alertColor, setAlertColor] = useState('');

  if (!event) {
    return <p>Event not found.</p>;
  }

  const isAlreadySignedUp = event.signedUpUsers?.includes(user?.sub);

  const handleSignUp = () => {
    if (!user) {
      showAlert('Please log in to register for this event.', 'red');
      return;
    }

    if (isAlreadySignedUp) {
      showAlert('You have already registered for this event.', 'red');
    } else {
      signUpForEvent(event.id);
      showAlert('You have registered for this event!', 'green');
    }
  };

  const showAlert = (message, color) => {
    setNotification(message);
    setAlertColor(color);
    setTimeout(() => {
      setNotification('');
      setAlertColor('');
    }, 3000);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="event-detail-container">
      <h1>{event.title}</h1>
      
      {/* Add the image here */}
      {event.image && (
        <img 
          src={event.image} 
          alt={event.title} 
          className="event-detail-image"
        />
      )}

      <p><strong>Date:</strong> {formatDate(event.date)}</p>
      <p><strong>Time:</strong> {formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Created by:</strong> {event.createdBy}</p>

      <div className="event-detail-buttons">
        <button className="sign-up-btn" onClick={handleSignUp}>
          Register for Event
        </button>
        <button className="back-btn" onClick={() => navigate('/events')}>
          Back to Events
        </button>
      </div>

      {notification && (
        <Alert message={notification} onClose={() => setNotification('')} color={alertColor} />
      )}
    </div>
  );
};

export default EventDetailPage;