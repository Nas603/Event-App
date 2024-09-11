import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../assets/styles/LoginForm.css';

const LoginForm = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
          />
        </div>
        <button type="button" className="login-button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;