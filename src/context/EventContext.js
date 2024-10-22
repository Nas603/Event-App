import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState(() => {
    const storedPastEvents = localStorage.getItem('pastEvents');
    return storedPastEvents ? JSON.parse(storedPastEvents) : [];
  });
  const { user, isLoading } = useAuth0();

  const removePastEvents = useCallback((loadedEvents) => {
    const now = new Date();

    const upcomingEvents = loadedEvents.filter(event => {
      const eventEndDateTime = new Date(`${event.date}T${event.endTime}:00`);
      return eventEndDateTime >= now;
    });

    setEvents(upcomingEvents);

    const newPastEvents = loadedEvents.filter(event => {
      const eventEndDateTime = new Date(`${event.date}T${event.endTime}:00`);
      return eventEndDateTime < now;
    });

    setPastEvents(prev => {
      const existingEventIds = new Set(prev.map(event => event.id));
      const uniqueNewPastEvents = newPastEvents.filter(event => !existingEventIds.has(event.id));

      return [...prev, ...uniqueNewPastEvents];
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents);
        removePastEvents(parsedEvents);
      }
    }
  }, [isLoading, removePastEvents]);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('events', JSON.stringify(events));
    }
    if (pastEvents.length > 0) {
      localStorage.setItem('pastEvents', JSON.stringify(pastEvents));
    }
  }, [events, pastEvents]);

  const addEvent = (newEvent) => {
    if (!newEvent.date) return;
    const eventStartDate = new Date(`${newEvent.date}T${newEvent.startTime}:00`);
    const eventEndDate = new Date(`${newEvent.date}T${newEvent.endTime}:00`);

    if (eventEndDate <= eventStartDate) return;
    const now = new Date();
    if (eventStartDate < now) return;

    const eventWithUser = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9),
      userId: user ? user.sub : null,
      createdBy: user ? user.name || user.email : 'Unknown',
      feedback: [],
      signedUpUsers: [],
    };

    setEvents(prevEvents => [...prevEvents, eventWithUser]);
  };

  const editEvent = (updatedEvent) => {
    setEvents(prevEvents =>
      prevEvents.map(event => (event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event))
    );
  };

  const deleteEvent = (id) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  const signUpForEvent = (eventId) => {
    if (!user) return;

    setEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === eventId) {
          if (!event.signedUpUsers.includes(user.sub)) {
            return { ...event, signedUpUsers: [...event.signedUpUsers, user.sub] };
          }
        }
        return event;
      })
    );
  };

  const unregisterFromEvent = (eventId, userId) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, signedUpUsers: event.signedUpUsers.filter(user => user !== userId) }
          : event
      )
    );
  };

  const addFeedbackToEvent = (eventId, feedback) => {
    setEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event => {
        if (event.id === eventId) {
          return { ...event, feedback: [...event.feedback, feedback] };
        }
        return event;
      });
      return updatedEvents;
    });
  
    setPastEvents(prevPastEvents => {
      const updatedPastEvents = prevPastEvents.map(event => {
        if (event.id === eventId) {
          return { ...event, feedback: [...event.feedback, feedback] };
        }
        return event;
      });
      return updatedPastEvents;
    });
  };  

  return (
    <EventContext.Provider
      value={{
        events,
        pastEvents,
        addEvent,
        editEvent,
        deleteEvent,
        signUpForEvent,
        unregisterFromEvent,
        addFeedbackToEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};