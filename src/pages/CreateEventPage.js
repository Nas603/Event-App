import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import Alert from '../components/Alert';
import '../assets/styles/CreateEventPage.css';

const CreateEventPage = () => {
  const { addEvent } = useContext(EventContext);
  const [event, setEvent] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
  });
  const [notification, setNotification] = useState('');
  const [alertColor, setAlertColor] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedDate = new Date(event.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      showAlert('The event date cannot be in the past. Please select a valid date.', 'red');
      return;
    }

    addEvent({ ...event, id: Date.now() });
    showAlert('Event created successfully', 'green');
    setEvent({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      description: '',
    });
  };

  const showAlert = (message, color) => {
    setNotification(message);
    setAlertColor(color);
  };

  const handleAlertClose = () => {
    setNotification('');
    setAlertColor('');
  };

  return (
    <div className="create-event-container">
      {notification && (
        <Alert message={notification} onClose={handleAlertClose} color={alertColor} />
      )}
      <form className="create-event-form" onSubmit={handleSubmit}>
        <h2>Create Event</h2>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={event.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={event.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="create-event-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
