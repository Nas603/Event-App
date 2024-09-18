import React, { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const storedEvents = JSON.parse(localStorage.getItem(user.sub)) || [];
      setEvents(storedEvents);
    }
  }, [isAuthenticated, user]);

  const addEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem(user.sub, JSON.stringify(updatedEvents));
  };

  const editEvent = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    localStorage.setItem(user.sub, JSON.stringify(updatedEvents));
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem(user.sub, JSON.stringify(updatedEvents));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};