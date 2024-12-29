import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminPage({ users, onDeleteUser }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the admin is logged in using localStorage
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  const handleDeleteUser = (email) => {
    onDeleteUser(email); // Remove user from the list
  };

  const handleViewPortfolio = (user) => {
    setSelectedUser(user);
    setShowModal(true); // Show portfolio modal when clicking on View Portfolio
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Portfolio Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>${user.totalPortfolioValue || 0}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleViewPortfolio(user)}
                >
                  View Portfolio
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user.email)}
                  className="ml-2"
                >
                  Delete User
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedUser && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedUser.name}'s Portfolio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Stock Holdings:</h5>
            <ul>
              {selectedUser.portfolio && selectedUser.portfolio.length > 0 ? (
                selectedUser.portfolio.map((stock, index) => (
                  <li key={index}>
                    <strong>{stock.name}</strong> ({stock.ticker}) - {stock.quantity} shares at ${stock.buyPrice} each
                  </li>
                ))
              ) : (
                <p>No stocks in portfolio.</p>
              )}
            </ul>
            <h5>Total Portfolio Value: ${selectedUser.totalPortfolioValue}</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default AdminPage;
