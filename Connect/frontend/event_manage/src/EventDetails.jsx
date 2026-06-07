import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const EventDetails = ({ events }) => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Check if the event exists in the passed 'events' array
        const foundEvent = events?.find((e) => e.event_id === parseInt(eventId));
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          // Fetch the event from the backend if not found
          const response = await axios.get(`http://localhost:3000/api/events/${eventId}`);
          setEvent(response.data.data);
        }
      } catch (err) {
        console.error(err);
        setError('Event not found.');
      }
    };

    fetchEvent();

    // Retrieve the logged-in user ID from cookies
    const cookieUserId = Cookies.get('user_id');
    if (cookieUserId) {
      setLoggedInUserId(cookieUserId);
    }
  }, [eventId, events]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!event) {
    return <h2>Loading event details...</h2>;
  }

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const handleRegister = async () => {
    // Check if the event date is in the past
    const eventDate = new Date(event.date);
    const currentDate = new Date();

    if (eventDate < currentDate) {
      alert(`This event has already occurred on ${event.date}. We are Sorry :) ,you cannot register.`);
      return;
    }

    if (!userId) {
      alert('Please enter a valid User ID.');
      return;
    }

    // Check if the entered userId matches the logged-in userId
    if (userId !== loggedInUserId) {
      alert('The entered User ID does not match the logged-in User ID.');
      return;
    }

    const requestData = {
      event_id: event.event_id,
      user_id: userId,
      attended: 'No',
      date: event.date,
    };

    try {
      const response = await fetch('http://localhost:3000/api/events-enrolled', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert('Successfully registered for the event!');
        closePopup();
      } else {
        const errorData = await response.json();
        alert('You have already registered for this event. Check your profile.');
      }
    } catch (error) {
      alert('An error occurred while registering for the event.');
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        background: 'linear-gradient(135deg, rgb(194, 194, 253), rgb(192, 245, 192) 100%)',
        padding: '20px',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          marginBottom: '20px',
        }}
      >
        <h1>{event.event_desc}</h1>
      </header>

      <section
        className="event-section"
        style={{
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          {/* About Volunteering Section */}
          <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', flex: 1 }}>
            <h3>About Volunteering</h3>
            <p>{event.event_det}</p>
            <button onClick={openPopup}>Register</button>
          </div>

          {/* Cause Area Section */}
          <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', flex: 1 }}>
            <h3>Cause Area</h3>
            <ul>
              <li>
                <strong>When:</strong> {event.date}
              </li>
              <li>
                <strong>Where:</strong> {event.place_name}
              </li>
              <li>
                <strong>Skills:</strong> {event.skill_name}
              </li>
              <li>
                <strong>Cause Area:</strong> {event.cause_desc}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}
        >
          <h3>Register for {event.event_desc}</h3>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            User ID:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
          <button onClick={handleRegister} style={{ marginRight: '10px', padding: '5px 10px' }}>
            Submit
          </button>
          <button onClick={closePopup} style={{ padding: '5px 10px' }}>
            Cancel
          </button>
        </div>
      )}

      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={closePopup}
        />
      )}
    </div>
  );
};

export default EventDetails;
