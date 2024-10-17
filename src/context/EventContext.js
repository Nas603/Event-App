import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const { user, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        try {
          const parsedEvents = JSON.parse(storedEvents);
          
          if (Array.isArray(parsedEvents)) {
            console.log('Parsed events from localStorage:', parsedEvents);
            setEvents(parsedEvents);
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
      console.log('Saved events to localStorage:', events);
    }
  }, [events]);

  const removePastEvents = useCallback(() => {
    const now = new Date();
    console.log('Current Time:', now);
    console.log('Events before filtering:', events);
  
    const filteredEvents = events.filter(event => {
      const eventEndDateTime = new Date(`${event.date}T${event.endTime}:00`);
      console.log(`Checking Event: ${event.title}`);
      console.log(`Event End Time: ${eventEndDateTime.toString()}`);
      console.log(`Current Time: ${now.toString()}`);
  
      return eventEndDateTime >= now;
    });
  
    console.log('Filtered events:', filteredEvents);
    console.log('Events after filtering:', filteredEvents);
  
    if (filteredEvents.length !== events.length) {
      setEvents(filteredEvents);
      console.log('Events updated after past event removal.');
    } else {
      console.log('No events removed.');
    }
  }, [events]);  

  useEffect(() => {
    if (!isLoading && events.length > 0) {
      console.log('Removing past events...');
      removePastEvents();
    }
  }, [removePastEvents, isLoading, events]);  

  const addEvent = (newEvent) => {
    console.log("Input newEvent:", newEvent);
  
    if (!newEvent.date) {
      console.error('No date provided for the new event');
      return;
    }
  
    const eventStartDate = new Date(`${newEvent.date}T${newEvent.startTime}:00`);
    const eventEndDate = new Date(`${newEvent.date}T${newEvent.endTime}:00`);
  
    console.log(`Event Start Date: ${eventStartDate}`);
    console.log(`Event End Date: ${eventEndDate}`);
  
    const now = new Date();
    console.log(`Current Date: ${now}`);
  
    if (eventEndDate <= eventStartDate) {
      console.error('End time must be greater than start time.');
      return;
    }
  
    if (eventStartDate < now) {
      console.error('Cannot create event in the past.');
      return;
    }

    const eventWithUser = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9),
      userId: user ? user.sub : null,
      createdBy: user ? user.name || user.email : 'Unknown',
      feedback: [],
      signedUpUsers: [],
    };

    console.log("Event being created with details:", eventWithUser);

    setEvents(prevEvents => {
      const updatedEvents = [...prevEvents, eventWithUser];
      console.log("Updated events after creation:", updatedEvents);
      return updatedEvents;
    });
  };

  const editEvent = (updatedEvent) => {
    console.log('Editing event:', updatedEvent);
    setEvents(prevEvents => {
      console.log('Before update:', prevEvents);
      const updatedEvents = prevEvents.map(event =>
        event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
      );
      console.log('After update:', updatedEvents);
      return updatedEvents;
    });
  };

  const deleteEvent = (id) => {
    console.log(`Deleting event with id: ${id}`);
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  const signUpForEvent = (eventId) => {
    if (!user) {
      console.log('User not logged in');
      return;
    }

    console.log(`User ${user.sub} signing up for event ${eventId}`);
    setEvents(prevEvents => {
      return prevEvents.map(event => {
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
    console.log(`User ${userId} unregistering from event ${eventId}`);
    setEvents(prevEvents => {
      return prevEvents.map(event => {
        if (event.id === eventId) {
          return {
            ...event,
            signedUpUsers: event.signedUpUsers?.filter(user => user !== userId),
          };
        }
        return event;
      });
    });
  };

  const addFeedbackToEvent = (eventId, feedback) => {
    console.log(`Adding feedback to event ${eventId}:`, feedback);
    setEvents(prevEvents => {
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

    const total = events.reduce((total, event) => {
      if (event.userId === user.sub) {
        return total + (event.signedUpUsers?.length || 0);
      }
      return total;
    }, 0);

    console.log(`Total registrations for user ${user.sub}: ${total}`);
    return total;
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