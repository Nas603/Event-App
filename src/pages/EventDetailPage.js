import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import '../assets/styles/EventDetailPage.css';

const EventDetailPage = () => {
  const { id } = useParams();
  const { events } = useContext(EventContext);
  const event = events.find(event => event.id === id);

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="event-detail-container">
      <h2 className="event-title">{event.title}</h2>
      <div className="event-info">
        <p className="event-date"><strong>Date:</strong> {event.date}</p>
        <p className="event-location"><strong>Location:</strong> {event.location}</p>
      </div>
      <p className="event-description">{event.description}</p>
      <button className="back-button" onClick={() => window.history.back()}>
        Back to Events
      </button>
    </div>
  );
};

export default EventDetailPage;
