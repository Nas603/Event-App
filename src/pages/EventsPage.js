import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import '../assets/styles/EventsPage.css';

const EventsPage = () => {
  const { events } = useContext(EventContext);
  console.log('Events from context:', events);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ date: '', location: '' });
  const navigate = useNavigate();

  const eventsPerPage = 6;

  const isEventInPast = (eventDateStr, endTimeStr) => {
    const now = new Date();
    const eventEndDateTime = new Date(`${eventDateStr}T${endTimeStr}:00`);
    console.log('Now:', now.toString());
    console.log('Event End Date Time:', eventEndDateTime.toString());
  
    return eventEndDateTime < now;
  };  

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const isPast = isEventInPast(eventDate, event.endTime);
    console.log('Event:', event, 'Is Past:', isPast);
    return !isPast;
  });
  console.log('Upcoming Events:', upcomingEvents);  

  const searchFilteredEvents = upcomingEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(event => 
    (filters.date ? event.date === filters.date : true) &&
    (filters.location ? event.location.toLowerCase().includes(filters.location.toLowerCase()) : true)
  );

  const totalPages = Math.ceil(searchFilteredEvents.length / eventsPerPage);
  const currentEvents = searchFilteredEvents.slice(
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
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
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