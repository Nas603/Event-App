import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { EventProvider } from './context/EventContext';
import App from './App';
import './assets/styles/index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-fz8bn7c5210d4nsk.us.auth0.com"
        clientId="okEigYo8ImbRx5nxi5CXpyg1ABU11WXk"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <EventProvider>
          <App />
        </EventProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);