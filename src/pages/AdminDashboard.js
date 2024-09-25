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

    const today = new Date();
    const tenDaysFromNow = new Date();
    tenDaysFromNow.setDate(today.getDate() + 10);

    const userId = user.sub;
    const userEvents = events.filter(event => event.userId === userId);

    const upcomingEventsCount = userEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= tenDaysFromNow;
    }).length;

    const totalUserRegistrations = userEvents.reduce((total, event) => {
      return total + (event.signedUpUsers?.length || 0);
    }, 0);

    const feedbackList = events.reduce((acc, event) => {
      return acc.concat(event.feedback || []);
    }, []);

    console.log('Feedback List:', feedbackList);

    const recentFeedbackList = feedbackList.slice(-3).map(feedback => (
      `Rating: ${feedback.rating}, Comments: ${feedback.comments}`
    ));

    console.log('Recent Feedback List:', recentFeedbackList);

    setUpcomingEvents(upcomingEventsCount);
    setTotalRegistrations(totalUserRegistrations);
    setRecentFeedback(recentFeedbackList);
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
