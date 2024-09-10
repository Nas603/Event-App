import React from 'react';
import LoginForm from '../components/LoginForm';
import '../assets/styles/LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <p>Enter your credentials to log in.</p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;