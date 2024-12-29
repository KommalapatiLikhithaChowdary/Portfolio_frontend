import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function ProfilePage({ currentUser, onProfileSave }) {
  const [name, setName] = useState(currentUser ? currentUser.name : '');
  const [email, setEmail] = useState(currentUser ? currentUser.email : '');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError('Name and email are required.');
      return;
    }

    setError('');
    onProfileSave(name); // Update the profile with the new name
    setIsEditing(false);  // Stop editing mode
  };

  return (
    <Container>
      <h1>Profile Page</h1>

      {error && <Alert variant="danger">{error}</Alert>} {/* Display error if any */}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          disabled={!isEditing}
        >
          Save Changes
        </Button>

        {!isEditing && (
          <Button
            variant="secondary"
            className="mt-3 ml-2"
            onClick={() => setIsEditing(true)} // Enable editing mode
          >
            Edit Profile
          </Button>
        )}

        {isEditing && (
          <Button
            variant="danger"
            className="mt-3 ml-2"
            onClick={() => setIsEditing(false)} // Disable editing mode
          >
            Cancel
          </Button>
        )}
      </Form>
    </Container>
  );
}

export default ProfilePage;
