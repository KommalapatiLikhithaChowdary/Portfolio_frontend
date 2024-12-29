import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignupPage({ onUserSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (name && email && password) {
      const newUser = { name, email, password }; // Store user data with password
      localStorage.setItem('user', JSON.stringify(newUser)); // Save user data in localStorage
      onUserSignup(newUser); // Optional: Notify the parent component about the new user
      navigate('/login'); // Redirect to login page after signup
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <Container>
      <h1>Signup</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSignup}>
          Signup
        </Button>
      </Form>
    </Container>
  );
}

export default SignupPage;
