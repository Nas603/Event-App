import React from 'react';
import SignUpForm from '../components/SignUpForm';
import '../assets/styles/SignUpPage.css';

const SignUpPage = () => {
  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <p>Fill in the details to create an account.</p>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;