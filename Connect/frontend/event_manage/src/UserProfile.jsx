import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './userprofile.css'; // Import CSS

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [error, setError] = useState(null);

  const userId = Cookies.get('user_id');
  console.log("User ID from cookies: ", userId);

  useEffect(() => {
    if (userId) {
      // Fetch user data
      axios.get(`http://localhost:3000/api/users/${userId}`)
        .then((response) => {
          console.log('API Response:', response);
          if (response.data.success) {
            setUserData(response.data.data);
          } else {
            setError('No user data found. Please log in.');
          }
        })
        .catch((err) => {
          setError('Error fetching user data. Please log in.');
          console.error('Error fetching user data:', err);
        });

      // Fetch events data
      axios.get('http://localhost:3000/api/events-enrolled')
      .then((response) => {
        console.log('Raw Events Data:', response.data.data);
        const filteredEvents = response.data.data.filter(event => event.user_id === parseInt(userId, 10));
        console.log('Filtered Events:', filteredEvents);
        setEventsData(filteredEvents);
      })
      .catch((err) => {
        setError('Error fetching events data.');
        console.error('Error fetching events data:', err);
      });
    

    } else {
      setError('No user data found. Please log in.');
    }
  }, [userId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!userData) {
    return <p className="loading-message">Loading...</p>;
  }

  return (
    <div className="profile-container">
      <div className="content-container">
        <div className="table-container">
          <h2>Events</h2>
          {eventsData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              {eventsData.map((event) => (
  <tr key={`${event.event_id}-${event.user_id}`}>
    <td>{event.date}</td>
    <td>{event.event_desc}</td>
    <td style={{ width: '300px' }}>
      {event.attended === 'No' ? 'Registered but not attended' : 'Attended'}
    </td>
  </tr>
))}

              </tbody>
            </table>
          ) : (
            <p>No events found.</p>
          )}
        </div>
        <div className="user-info">
          <div className="profile-image-container">
            <img 
              src="user1.webp" 
              alt="User Avatar" 
            />
          </div>
          <div className="user-details">
            <h1>{userData.user_name}'s Profile</h1>
            <p>Email: {userData.email}</p>
            <p>Contact No: {userData.contact_no}</p>
            <p>Date of Birth: {userData.dateofbirth}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
