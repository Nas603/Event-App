import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents);
        setEvents(parsedEvents);
    }
}, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('events', JSON.stringify(events));
      console.log('Saved events to localStorage:', events);
    }
  }, [events]);  

  const removePastEvents = useCallback(() => {
    const now = new Date();
    const filteredEvents = events.filter(event => {
      const eventEndTime = new Date(`${event.date}T${event.endTime}`);
      return eventEndTime > now;
    });
  
    console.log('Filtered events after past event removal:', filteredEvents);
  
    if (filteredEvents.length !== events.length) {
      setEvents(filteredEvents);
    }
  }, [events]);  

  useEffect(() => {
  }, [removePastEvents]);

  const addEvent = (newEvent) => {
    const eventWithUser = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9),
      userId: user ? user.sub : null,
      createdBy: user ? user.name || user.email : 'Unknown',
      feedback: [],
      signedUpUsers: [],
    };
    
    console.log("Adding event:", eventWithUser);
    
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, eventWithUser];
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      console.log("Updated events:", updatedEvents);
      return updatedEvents;
    });
  };

  const editEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    console.log('Updated events state:', events);
};

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const signUpForEvent = (eventId) => {
    if (!user) {
      console.log('User not logged in');
      return;
    }

    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        if (event.id === eventId) {
          const isAlreadySignedUp = event.signedUpUsers?.includes(user.sub);

          if (!isAlreadySignedUp) {
            return {
              ...event,
              signedUpUsers: [...(event.signedUpUsers || []), user.sub],
            };
          }
        }
        return event;
      });
    });
  };

  const unregisterFromEvent = (eventId, userId) => {
    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            signedUpUsers: event.signedUpUsers?.filter((user) => user !== userId),
          };
        }
        return event;
      });
    });
  };

  const addFeedbackToEvent = (eventId, feedback) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map(event => {
        if (event.id === eventId) {
          console.log('Adding feedback to event:', event);
          return {
            ...event,
            feedback: [...(event.feedback || []), feedback],
          };
        }
        return event;
      });

      console.log('Updated events after adding feedback:', updatedEvents);
      return updatedEvents;
    });
  };

  const getTotalRegistrationsForUserEvents = () => {
    if (!user) return 0;

    return events.reduce((total, event) => {
      if (event.userId === user.sub) {
        return total + (event.signedUpUsers?.length || 0);
      }
      return total;
    }, 0);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        setEvents,
        editEvent,
        deleteEvent,
        signUpForEvent,
        unregisterFromEvent,
        addFeedbackToEvent,
        getTotalRegistrationsForUserEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
