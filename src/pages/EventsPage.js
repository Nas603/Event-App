import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import '../assets/styles/EventsPage.css';

const EventsPage = () => {
  const { events } = useContext(EventContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Upcoming Events</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filters />
      </div>

      <div className="event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <h2>{event.title}</h2>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p className="event-description">{event.description}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          ))
        ) : (
          <p className="no-events-message">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
