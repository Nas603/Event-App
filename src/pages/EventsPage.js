import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import '../assets/styles/EventsPage.css';

const EventsPage = () => {
  const { events, setEvents } = useContext(EventContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ date: '', location: '' });
  const navigate = useNavigate();
  
  const eventsPerPage = 6;

  const isEventInPast = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
  
    today.setHours(0, 0, 0, 0);
    eventDateObj.setHours(0, 0, 0, 0);
  
    return eventDateObj < today;
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };  

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const [hours, minutes] = event.endTime.split(':');
    const eventEndDateTime = new Date(eventDate);
    eventEndDateTime.setHours(hours, minutes);

    return eventEndDateTime >= new Date();
  });

  useEffect(() => {
    const upcomingEvents = events.filter(event => !isEventInPast(event.date));
    if (upcomingEvents.length !== events.length) {
      setEvents(upcomingEvents);
    }
  }, [events, setEvents]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showFilters, filters]);

  const handleViewDetails = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Upcoming Events</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <button className="filters-toggle-btn" onClick={() => setShowFilters(prev => !prev)}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        <div className={`filters-container ${showFilters ? 'active' : ''}`}>
          <Filters onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className="event-list">
  {currentEvents.length > 0 ? (
    currentEvents.map(event => {
      const formattedDate = formatDate(event.date);

      return (
        <div key={event.id} className="event-card">
          {event.image && (
            <img 
              src={event.image} 
              alt={`${event.title} event`} 
              className="event-image" 
            />
          )}
          <h2>{event.title}</h2>
          <p><strong>Date:</strong> {formattedDate}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p className="event-description">{event.description}</p>
          <button className="view-details-btn" onClick={() => handleViewDetails(event.id)}>
            View Details
          </button>
        </div>
      );
    })
  ) : (
    <p className="no-events-message">No events found.</p>
  )}
</div>

      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventsPage;