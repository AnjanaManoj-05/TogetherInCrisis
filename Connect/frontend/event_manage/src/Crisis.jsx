import React, { useEffect, useState } from 'react';
import { Link, Router } from 'react-router-dom';
import axios from 'axios';

const Crisis = () => {
  const [crisisEvents, setCrisisEvents] = useState([]);
  const [error, setError] = useState('');
  const [hoveredEventId, setHoveredEventId] = useState(null);

  // Fetch all events filtered by event_cat === 'c'
  const fetchCrisisEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/events');
      const filteredEvents = response.data.data.filter(event => event.event_cat === 'c');
      setCrisisEvents(filteredEvents);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch crisis events.');
    }
  };

  useEffect(() => {
    fetchCrisisEvents(); // Load crisis events on component mount
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        background: 'linear-gradient(135deg, #f8c8dc 0%, #ffc6a8 100%)',
        padding: '1rem',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#b04e74' }}>Crisis Events</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ padding: '1rem' }}>
        {crisisEvents.map(event => (
          <div
            key={event.event_id}
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              borderBottom: '1px solid black',
            }}
          >
            <Link
              to={`/event/${event.event_id}`}
              style={{
                fontSize: '1.5rem',
                textDecoration: 'none',
                color: hoveredEventId === event.event_id ? '#0e4f5f' : '#a33c5a',
                          transition: 'color 0.3s ease', // Smooth transition
                        }}
                        onMouseEnter={() => setHoveredEventId(event.event_id)}
                        onMouseLeave={() => setHoveredEventId(null)}
            >
              {event.event_desc}
            </Link>
            <p style={{ margin: '0.5rem 0', color: '#777' }}>
              {event.event_det
                ? event.event_det.substring(0, 35) + '...'
                : 'No details available'}
            </p>
            <p style={{ margin: '0.5rem 0', color: '#888' }}>
              <strong>Date Posted:</strong> {event.date}
            </p>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Crisis;
