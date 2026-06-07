import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Professional from './pages/Professional';



const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route for Sign-EventList*/}
                <Route path="/" element={<SignIn />} />
                {/* Route for Sign-Up */}
                <Route path="/signup" element={<SignUp />} />
                {/* Route for Professional Profile */}
                <Route path="/professional" element={<Professional />} />
                
                
                {/* Route for Choose Interest (if needed) */}
                <Route path="/chooseInterest" element={<h1>Choose Your Interests (To be implemented)</h1>} />

            </Routes>
        </Router>
    );
};

export default App;
