import React, { useState, useContext, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import '../assets/styles/EventsPage.css';

const EventsPage = () => {
  const { events } = useContext(EventContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ date: '', location: '' });

  const eventsPerPage = 6;

  const filteredEvents = events
    .filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.date ? event.date === filters.date : true) &&
      (filters.location ? event.location.toLowerCase().includes(filters.location.toLowerCase()) : true)
    );

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
          currentEvents.map(event => (
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
