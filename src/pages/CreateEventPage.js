import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
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
        image: '',
    });
    const [alert, setAlert] = useState({ message: '', color: '' });
    const [imagePreview, setImagePreview] = useState(null);

    const showAlert = (message, color) => {
        setAlert({ message, color });
        setTimeout(() => setAlert({ message: '', color: '' }), 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Combine date and start time into a local Date object
        const selectedDate = new Date(`${event.date}T${event.startTime}`); // Local time
        const endDate = new Date(`${event.date}T${event.endTime}`); // Local time
        const currentDate = new Date(); // Local time
    
        console.log("Selected Date (Local):", selectedDate);
        console.log("End Date (Local):", endDate);
        console.log("Current Date (Local):", currentDate);
    
        if (selectedDate < currentDate) {
            showAlert('The event date cannot be in the past. Please select a valid date.', 'red');
            return;
        }
    
        if (endDate <= selectedDate) {
            showAlert('The end time must be after the start time.', 'red');
            return;
        }
    
        const eventWithImage = { ...event, id: Date.now() };
        addEvent(eventWithImage);
        showAlert('Event created successfully', 'green');
    
        // Reset the form
        setEvent({
            title: '',
            date: '',
            startTime: '',
            endTime: '',
            location: '',
            description: '',
            image: '',
        });
        setImagePreview(null);
    };       

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEvent(prev => ({ ...prev, image: reader.result }));
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="create-event-container">
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit} className="create-event-form">
                <div className="form-group">
                    <label htmlFor="title">Event Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={event.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Event Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={event.date}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={event.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group image-upload-group">
                    <label htmlFor="image">Event Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Event Preview" />
                        </div>
                    )}
                </div>
                <button type="submit" className="submit-button">Create Event</button>
            </form>

            {alert.message && <div className={`alert ${alert.color}`}>{alert.message}</div>}
        </div>
    );
};

export default CreateEventPage;