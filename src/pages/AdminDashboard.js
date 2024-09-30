import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { useAuth0 } from '@auth0/auth0-react';
import '../assets/styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { events = [] } = useContext(EventContext);
  const { user } = useAuth0();
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [recentFeedback, setRecentFeedback] = useState([]);

  useEffect(() => {
    if (!events || !user) return;

    const currentDate = new Date();
    const userId = user.sub;

    const userEvents = events.filter(userEvent => userEvent.userId === userId);
    
    const upcomingEventCount = userEvents.filter(userEvent => new Date(userEvent.date) >= currentDate).length;
    setUpcomingEvents(upcomingEventCount);
    
    const totalRegs = userEvents.reduce((acc, userEvent) => acc + (userEvent.signedUpUsers?.length || 0), 0);
    setTotalRegistrations(totalRegs);

    const feedbackList = userEvents.reduce((acc, userEvent) => {
      if (userEvent.feedback && userEvent.feedback.length > 0) {
        const feedbackWithEventDetails = userEvent.feedback.map(feedback => ({
          ...feedback,
          eventName: userEvent.title,
        }));
        return acc.concat(feedbackWithEventDetails);
      }
      return acc;
    }, []);

    setRecentFeedback(feedbackList.slice(-3).map(feedback => (
      `Event: ${feedback.eventName}, Rating: ${feedback.rating}, Comments: ${feedback.comments}`
    )));
  }, [events, user]);

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="quick-stats">
        <div className="stat-card">
          <h3>Upcoming Events</h3>
          <p>{upcomingEvents}</p>
        </div>
        <div className="stat-card">
          <h3>Total Registrations</h3>
          <p>{totalRegistrations}</p>
        </div>
        <div className="stat-card recent-feedback">
          <h3>Recent Feedback</h3>
          <ul>
            {recentFeedback.length > 0 ? (
              recentFeedback.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))
            ) : (
              <li>No feedback available yet</li>
            )}
          </ul>
        </div>
      </div>

      <div className="dashboard-links">
        <Link to="/admin/create-event" className="dashboard-link">
          <button className="dashboard-button">Create Event</button>
        </Link>
        <Link to="/admin/manage-events" className="dashboard-link">
          <button className="dashboard-button">Manage Events</button>
        </Link>
        <Link to="/admin/reports" className="dashboard-link">
          <button className="dashboard-button">View Reports</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
