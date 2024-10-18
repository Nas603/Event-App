import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const { user, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        try {
          const parsedEvents = JSON.parse(storedEvents);
          
          if (Array.isArray(parsedEvents)) {
            const uniqueEvents = parsedEvents.filter((event, index, self) =>
              index === self.findIndex((e) => e.id === event.id)
            );
            console.log('Parsed events from localStorage:', uniqueEvents);
            setEvents(uniqueEvents);
          } else {
            console.log('Parsed events are not an array or are empty.');
          }
        } catch (error) {
          console.error('Error parsing events from localStorage:', error);
        }
      } else {
        console.log('No events found in localStorage.');
      }
    }
  }, [isLoading]);    

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('events', JSON.stringify(events));
    }
    if (pastEvents.length > 0) {
      localStorage.setItem('pastEvents', JSON.stringify(pastEvents));
    }
  }, [events, pastEvents]);

  const removePastEvents = useCallback(() => {
    const now = new Date();

    const upcomingEvents = events.filter(event => {
      const eventEndDateTime = new Date(`${event.date}T${event.endTime}:00`);
      if (eventEndDateTime >= now) {
        return true;
      } else {
        setPastEvents(prev => [...prev, event]);
        return false;
      }
    });

    setEvents(upcomingEvents);
  }, [events]);

  useEffect(() => {
    if (!isLoading && events.length > 0) {
      removePastEvents();
    }
  }, [removePastEvents, isLoading, events]);

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

    console.log('Current Events before adding:', events);

  setEvents(prevEvents => {
    const updatedEvents = [...prevEvents, eventWithUser];
    console.log('Updated Events after adding:', updatedEvents);
    return updatedEvents;
  });
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
    console.log('Events before feedback submission:', events);
    setEvents(prevEvents => 
        prevEvents.map(event => 
            event.id === eventId ? { ...event, feedback: [...event.feedback, feedback] } : event
        )
    );
    console.log('Events after feedback submission:', events);
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