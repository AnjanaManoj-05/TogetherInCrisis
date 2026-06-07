import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import EventDetails from './EventDetails'; // Create this component for the detailed view
import UserProfile from './UserProfile';
import Crisis from './Crisis'; // Import the new Crisis component

const App = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  // Fetch all events
  const fetchAllEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/events');
      const filteredEvents = response.data.data.filter(event => event.event_cat === 'v');
      setEvents(filteredEvents);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch events.');
    }
  };

  useEffect(() => {
    fetchAllEvents(); // Load all events on component mount
  }, []);

  // Find the most recent event based on the event.date
  const recentEvent = events.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, events[0] || { event_desc: 'No recent events', date: '' });

  return (
    <Router>
      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          background: 'linear-gradient(135deg, #b4d6f6 0%, #c5f1d0 100%)',
        }}
      >
        {/* Navigation Section */}
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: '#fff',
            borderBottom: '1px solid #ddd',
          }}
        >
          <img src="/TogetherInCrisisLogo.jpg" alt="Logo" width="75px" />
          <h1 style={{ color: '#5AC6D0' }}>TogetherInCrisis</h1>
          <ul
            style={{
              display: 'flex',
              gap: '1.5rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {[
              { to: '/crisis', label: 'Crisis Home Page' },
              { to: '/', label: 'Volunteer Home Page' },
              { to: '/testimonials.html', label: 'Testimonials', external: true },
              { to: '/userprofile', label: 'Profile' },
            ].map((navItem, index) => (
              <li key={index}>
                {navItem.external ? (
                  <a
                    href={navItem.to}
                    style={{
                      ...linkStyle,
                      color: hoveredNavItem === index ? 'red' : linkStyle.color,
                    }}
                    onMouseEnter={() => setHoveredNavItem(index)}
                    onMouseLeave={() => setHoveredNavItem(null)}
                  >
                    {navItem.label}
                  </a>
                ) : (
                  <Link
                    to={navItem.to}
                    style={{
                      ...linkStyle,
                      color: hoveredNavItem === index ? 'red' : linkStyle.color,
                    }}
                    onMouseEnter={() => setHoveredNavItem(index)}
                    onMouseLeave={() => setHoveredNavItem(null)}
                  >
                    {navItem.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>





        {/* Routes */}
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <div>

                {/* Marquee Section */}
                <marquee
                  style={{
                    backgroundColor: '#f9f9f9',
                    padding: '0.5rem',
                    fontSize: '1.2rem',
                    color: '#333',
                    fontWeight: 'bold',
                  }}
                ><Link
                  to={`/event/${recentEvent.event_id}`}
                  style={{
                    fontSize: '1.5rem',
                    textDecoration: 'none',
                    color: hoveredEventId === recentEvent.event_id ? 'red' : '#0e4f5f',
                    transition: 'color 0.3s ease', // Smooth transition
                  }}
                  onMouseEnter={() => setHoveredEventId(recentEvent.event_id)}
                  onMouseLeave={() => setHoveredEventId(null)}
                >
                    {recentEvent.event_desc}
                  </Link>
                </marquee>
                {/* Events List */}
                <div style={{ padding: '1rem' }}>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {events.map((event) => (
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
                          color: hoveredEventId === event.event_id ? 'red' : '#0e4f5f',
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

            }
          />

          {/* Event Details Route */}
          <Route path="/event/:eventId" element={<EventDetails events={events} />} />
          <Route path="/userprofile" element={<UserProfile />} />
          {/* // Inside <Routes> */}
          <Route path="/crisis" element={<Crisis />} />
        </Routes>
        {/* Footer Section */}
        <footer
          style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#fff',
            borderTop: '1px solid #ddd',
            textAlign: 'center',
          }}
        >
          <div className="aboutus">
            <h2>About Us</h2>
            <p>Contact Us - 9876543210</p>
          </div>
        </footer>
      </div>

    </Router>
  );
};

// Common link style
const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: 'bold',
  padding: '0.5rem',
  transition: 'color 0.3s ease',
};

export default App;
