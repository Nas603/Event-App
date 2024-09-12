import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import '../assets/styles/AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page">
      <div className="form-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <p>{isLogin ? 'Enter your credentials to log in.' : 'Fill in the details to create an account.'}</p>
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <button className="toggle-button" onClick={toggleForm}>
          {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Log In'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;