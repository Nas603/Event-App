import React from 'react';
import '../assets/styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <section className="hero">
        <h1>Welcome to Event Planner</h1>
        <p>Plan, manage, and enjoy your events effortlessly.</p>
        <button className="cta-button">Explore Events</button>
      </section>

      <section className="features">
        <div className="feature-card">
          <h2>Discover Events</h2>
          <p>Find events that match your interests, and join the community.</p>
        </div>
        <div className="feature-card">
          <h2>Create Events</h2>
          <p>Organize and manage your events, with tools built for ease.</p>
        </div>
        <div className="feature-card">
          <h2>Track Attendance</h2>
          <p>Keep track of event attendees and make data-driven decisions.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;