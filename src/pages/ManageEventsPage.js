import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import '../assets/styles/ManageEventsPage.css';

const ManageEventsPage = () => {
  const { events, deleteEvent, editEvent } = useContext(EventContext);
  const [editEventData, setEditEventData] = useState(null);
  const [notification, setNotification] = useState('');

  const handleEditClick = (event) => {
    setEditEventData(event);
  };

  const handleDeleteClick = (id) => {
    deleteEvent(id);
    setNotification('Event deleted successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEventData((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    editEvent(editEventData);
    setNotification('Event updated successfully!');
    setEditEventData(null);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleCancelEdit = () => {
    setEditEventData(null);
  };

  return (
    <div className="manage-events-container">
      {notification && (
        <div className="notification-container">
          <p>{notification}</p>
          <button className="notification-close-button" onClick={() => setNotification('')}>×</button>
        </div>
      )}
      <h2>Manage Events</h2>
      {editEventData ? (
        <div className="edit-event-form">
          <h3>Edit Event</h3>
          <form onSubmit={handleSaveEdit}>
            <div className="form-group">
              <label htmlFor="title">Event Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={editEventData.title}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={editEventData.date}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={editEventData.location}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Event Description</label>
              <textarea
                id="description"
                name="description"
                value={editEventData.description}
                onChange={handleEditChange}
                required
              />
            </div>
            <button type="submit" className="save-edit-button">Save Changes</button>
            <button type="button" className="cancel-edit-button" onClick={handleCancelEdit}>Cancel</button>
          </form>
        </div>
      ) : (
        <ul className="event-list">
          {events.map(event => (
            <li key={event._id} className="event-item">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
              <div className="event-actions">
                <button className="edit-button" onClick={() => handleEditClick(event)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteClick(event._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageEventsPage;
