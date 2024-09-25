import React, { useContext, useState } from 'react';
import { EventContext } from '../context/EventContext';
import '../assets/styles/ReviewEvent.css';

const ReviewEvent = ({ eventId }) => {
    const { addFeedbackToEvent } = useContext(EventContext);
    const [rating, setRating] = useState('');
    const [comments, setComments] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const feedback = { rating, comments };
        console.log('Submitting feedback:', feedback);
        addFeedbackToEvent(eventId, feedback);
        setSubmitted(true);
    };

    return (
        <div className="review-event-container">
            <h1>Review Event</h1>
            {submitted ? (
                <div className="thank-you-message">
                    <h2>Thank you for your feedback!</h2>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="review-event-form">
                    <div className="form-group">
                        <label htmlFor="rating">Rating:</label>
                        <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <label key={star}>
                                    <input
                                        type="radio"
                                        value={star}
                                        checked={rating === String(star)}
                                        onChange={(e) => setRating(e.target.value)}
                                    />
                                    {star} Star{star > 1 ? 's' : ''}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Comments:</label>
                        <textarea
                            id="comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            rows="4"
                            placeholder="Write your comments here..."
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Submit Review</button>
                </form>
            )}
        </div>
    );
};

export default ReviewEvent;
