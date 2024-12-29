import React, { useState } from 'react';
import { Button, Form, Container, Alert, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [activeKey, setActiveKey] = useState('admin'); // For switching between Admin and User login
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    // Hardcoded admin login check
    if (password === 'admin@123') {
      localStorage.setItem('adminLoggedIn', 'true'); // Store in localStorage
      navigate('/admin'); // Redirect to admin page
    } else {
      setError('Incorrect admin password');
    }
  };

  const handleUserLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Get user from localStorage
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem('userLoggedIn', 'true'); // Store in localStorage
      navigate('/user'); // Redirect to user page
    } else {
      setError('Incorrect email or password');
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs
        id="loginTabs"
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k)}
        className="mb-3"
      >
        <Tab eventKey="admin" title="Admin Login">
          <Form>
            <Form.Group controlId="formAdminPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAdminLogin}>
              Login as Admin
            </Button>
          </Form>
        </Tab>

        <Tab eventKey="user" title="User Login">
          <Form>
            <Form.Group controlId="formUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formUserPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleUserLogin}>
              Login as User
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default LoginPage;
