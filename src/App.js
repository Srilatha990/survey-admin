

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarWithSidebar from './components/navbar/NavBar'; // Updated Navbar to Bootstrap
import Users from './components/Users/Users';
import { Container } from 'react-bootstrap';
import LoginPage from './components/Login';
import SurveyForm from './components/surveys/SurveyForm';
import SurveyList from './components/surveys/SurveyList';
import SurveyDetails from './components/surveys/SurveyDetails';

function App() {
  const [activeComponent, setActiveComponent] = useState('Users');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null); // State to track login status

  // Check if user is logged in when app initializes
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Load user from localStorage
    }
  }, []);

  // Render a fallback component for components without dedicated routes
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Users':
        return <Users />;
      default:
        return <Users />;
    }
  };

  // Handle login
  const handleLogin = (user) => {
    setUser(user); // Set the user in state
    localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null); // Clear user state on logout
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <Router>
      <div className="d-flex vh-100">
        {/* Conditionally render Navbar only if user is logged in */}
        {user && (
          <NavbarWithSidebar
            setActiveComponent={setActiveComponent}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            handleLogout={handleLogout} // Pass logout handler to Navbar

          />
        )}

        {/* Main Content */}
        <Container
          fluid
          className={`transition-all px-4 py-3 ${isSidebarOpen ? 'ms-250' : 'ms-0'}`}
          style={{ flex: 1 }}
        >
          <Routes>
            {/* Login Page */}
            <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />

            {/* Redirect to Users page after login */}
            <Route
              path="/"
              element={user ? <Users /> : <Navigate to="/login" />}
            />

            {/* Other routes */}
            <Route path="/surveys" element={<SurveyList />} />
            <Route path="/add-survey" element={<SurveyForm />} />
            <Route path="/edit-survey/:id" element={<SurveyForm />} />
            <Route path="/survey-details/:id" element={<SurveyDetails />} />
            {/* Fallback render logic for other sidebar components */}
            <Route path="*" element={renderComponent()} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;

