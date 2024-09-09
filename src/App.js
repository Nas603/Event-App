import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import CreateEventPage from './pages/CreateEventPage';
import ManageEventsPage from './pages/ManageEventsPage';
import ReportsPage from './pages/ReportsPage';
import UserProfilePage from './pages/UserProfilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-event" element={<CreateEventPage />} />
        <Route path="/admin/manage-events" element={<ManageEventsPage />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;