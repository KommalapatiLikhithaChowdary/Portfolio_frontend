import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap'; // Renamed imported Navbar
import { Link } from 'react-router-dom';

function NavbarComponent({ userName, onLogout }) {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Logo on the left */}
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="logo-style">L</span> {/* Custom logo */}
        </BootstrapNavbar.Brand>
        
        {/* Navigation links on the right */}
        <Nav className="ml-auto">
          {userName ? (
            <>
              {/* Display user's name if logged in */}
              <Nav.Item className="mr-3">
                <span className="text-white">{userName}</span>
              </Nav.Item>
              {/* Logout link */}
              <Nav.Link as={Link} to="/logout" onClick={onLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              {/* Show login and signup if not logged in */}
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </>
          )}

          {/* Always visible links */}
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link> {/* Added Dashboard link */}
          <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
}

export default NavbarComponent;
