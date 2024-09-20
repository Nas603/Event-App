import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import { useAuth0 } from '@auth0/auth0-react';
import '../assets/styles/ManageEventsPage.css';

const ManageEventsPage = () => {
  const { events, editEvent, deleteEvent } = useContext(EventContext);
  const [editingEvent, setEditingEvent] = useState(null);
  const { user } = useAuth0();

  const userEvents = events.filter(event => event.userId === user.sub);

  const handleEditClick = (event) => {
    setEditingEvent({ ...event });
  };

  const handleSaveEdit = () => {
    editEvent(editingEvent);
    setEditingEvent(null);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  const handleDeleteClick = (id) => {
    deleteEvent(id);
  };

  return (
    <div className="manage-events-container">
      <h2>Manage Your Events</h2>
      {userEvents.length === 0 ? (
        <p>You haven't created any events yet.</p>
      ) : (
        <ul className="event-list">
          {userEvents.map((event) => (
            <li key={event.id} className="event-item">
              {editingEvent && editingEvent.id === event.id ? (
                <div className="edit-event-form">
                  <h3>Edit Event</h3>
                  <div className="form-group">
                    <label htmlFor="title">Event Title</label>
                    <input
                      type="text"
                      id="title"
                      value={editingEvent.title}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      value={editingEvent.date}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      value={editingEvent.location}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Event Description</label>
                    <textarea
                      id="description"
                      value={editingEvent.description}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, description: e.target.value })
                      }
                    />
                  </div>
                  <button className="save-edit-button" onClick={handleSaveEdit}>
                    Save Changes
                  </button>
                  <button className="cancel-edit-button" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h3>{event.title}</h3>
                  <p>Date: {event.date}</p>
                  <p>Location: {event.location}</p>
                  <p>{event.description}</p>
                  <div className="event-actions">
                    <button className="edit-button" onClick={() => handleEditClick(event)}>
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(event.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageEventsPage;
