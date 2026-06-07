import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Professional.css';

const Professional = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/events-enrolled');
                if (response.data && response.data.data) {
                    setAttendanceData(response.data.data);
                } else {
                    console.error('Invalid response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching attendance:', error);
                setAttendanceData([]);
            }
        };
        fetchAttendance();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = Cookies.get('user_id');
            console.log("from Cookies:", userId);
            if (!userId) {
                console.error('User ID not found in cookies');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
                if (response.data && response.data.data) {
                    setUserData(response.data.data);
                } else {
                    console.error('Invalid user response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleAttendanceUpdate = async (eventId, userId, attended) => {
        try {
            await axios.put('http://localhost:3000/api/events-enrolled/attended', {
                event_id: eventId,
                user_id: userId,
                attended,
            });

            setAttendanceData((prevData) =>
                prevData.map((entry) =>
                    entry.event_id === eventId && entry.user_id === userId
                        ? { ...entry, attended }
                        : entry
                )
            );

            alert('Attendance updated successfully!');
        } catch (error) {
            console.error('Error updating attendance:', error);
            alert('Failed to update attendance.');
        }
    };

    return (
        <div className="professional-container">
            {/* Sidebar */}
            <aside className="professional-sidebar">
                <div className="profile-image-container">
                    <img
                        src="professional.avif"
                        alt="Professional Profile"
                    />
                </div>
                {userData ? (
                    <ul className="user-details">
                        <li><strong>Name:</strong> {userData.user_name}</li>
                        <li><strong>Email:</strong> {userData.email}</li>
                        <li><strong>Phone:</strong> {userData.contact_no}</li>
                        <li><strong>Date of Birth:</strong> {userData.dateofbirth}</li>
                    </ul>
                ) : (
                    <p>Loading professional details...</p>
                )}
            </aside>

            {/* Main Content */}
            <main className="professional-main">
                <h1>Professional Profile</h1>
                {attendanceData.length > 0 ? (
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Volunteer Details</th>
                                <th>Event</th>
                                <th>Attendance (Weekly)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((entry) => (
                                <tr key={`${entry.event_id}-${entry.user_id}`}>
                                    <td>{entry.user_name}</td>
                                    <td>{entry.event_desc}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={entry.attended === 'Yes'}
                                            onChange={(e) =>
                                                handleAttendanceUpdate(
                                                    entry.event_id,
                                                    entry.user_id,
                                                    e.target.checked ? 'Yes' : 'No'
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No attendance data available.</p>
                )}
            </main>
        </div>
    );
};

export default Professional;
