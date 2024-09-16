import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats] = useState({
      upcomingEvents: 5,
      totalRegistrations: 120,
      recentFeedback: [
          "Great event!",
          "Loved the venue",
          "Could be better",
      ],
  });

    return (
        <div className="admin-dashboard-container">
            <h1>Admin Dashboard</h1>

            <div className="quick-stats">
                <div className="stat-card">
                    <h3>Upcoming Events</h3>
                    <p>{stats.upcomingEvents}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Registrations</h3>
                    <p>{stats.totalRegistrations}</p>
                </div>
                <div className="stat-card recent-feedback">
                    <h3>Recent Feedback</h3>
                    <ul>
                        {stats.recentFeedback.slice(0, 3).map((feedback, index) => (
                            <li key={index}>{feedback}</li>
                        ))}
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