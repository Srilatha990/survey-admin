
import React, { useState } from 'react';
import { Navbar, Button, Offcanvas, ListGroup, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarWithSidebar = ({ setActiveComponent, handleLogout, isSidebarOpen, setIsSidebarOpen }) => {
  const username = 'Admin'; // Replace with dynamic username
  const navigate = useNavigate(); // For navigation

  const handleMenuClick = (item) => {
    setActiveComponent(item); // Update the active component
    navigate(`/${item.toLowerCase()}`); // Navigate to the appropriate route
    setIsSidebarOpen(false); // Close the sidebar automatically
  };

  const handleLogoutClick = () => {
    handleLogout(); // Call the handleLogout function from App.js
    navigate('/login'); // Navigate to the login page after logging out
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
        <Container fluid>
          <Button
            variant="outline-light"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar
            className="me-2"
            aria-label="Toggle Sidebar"
          >
            <i className="bi bi-list"></i> {/* Menu icon */}
          </Button>
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="me-3">
              <strong>{username}</strong>
            </Navbar.Text>
            <Button variant="outline-light" onClick={handleLogoutClick}>Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar */}
      <Offcanvas
        show={isSidebarOpen}
        onHide={() => setIsSidebarOpen(false)} // Close on toggle
        placement="start"
        backdrop={false} // Persistent until clicked
        style={{ width: '250px' }} // Fixed width for the sidebar
      >
        <Offcanvas.Header>
          <Offcanvas.Title>Admin Dashboard</Offcanvas.Title>
          <Button
            variant="outline-dark"
            onClick={() => setIsSidebarOpen(false)} // Close button
            aria-label="Close Sidebar"
            style={{ border: 'none', fontSize: '1.2rem' }}
          >
            <i className="bi bi-x-lg"></i>
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {['Users','Surveys'].map((item) => (
              <ListGroup.Item
                key={item}
                action
                onClick={() => handleMenuClick(item)} // Auto-close on item click
                className="text-capitalize"
              >
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavbarWithSidebar;
