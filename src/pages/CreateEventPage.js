import React, { useState } from 'react';
import '../assets/styles/CreateEventPage.css';

const CreateEventPage = () => {
    const [eventData, setEventData] = useState({
        name: '',
        date: '',
        location: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Event Created', eventData);
    };

    return (
        <div className="create-event-container">
            <h2>Create a New Event</h2>
            <form onSubmit={handleSubmit} className="create-event-form">
                <div className="form-group">
                    <label htmlFor="name">Event Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={eventData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Event Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Event Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Event Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit" className="create-event-button">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEventPage;