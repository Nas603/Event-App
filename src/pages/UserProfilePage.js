import React from 'react';
import Profile from '../components/Profile';
import '../assets/styles/UserProfilePage.css';

const UserProfilePage = () => {
  return (
    <div className="user-profile-page">
      <h1>User Profile</h1>
      <Profile />
    </div>
  );
};

export default UserProfilePage;