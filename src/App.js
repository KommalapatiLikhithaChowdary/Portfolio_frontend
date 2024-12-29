import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import LogoutPage from './pages/LogoutPage';
import Dashboard from './pages/Dashboard'; // Import the new Dashboard component
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';

function App() {
  const [users, setUsers] = useState([]); // State to store all users
  const [currentUser, setCurrentUser] = useState(null); // Track the logged-in user
  const [stocks, setStocks] = useState([]); // State to store the stock data

  // Function to handle new user signup
  const handleUserSignup = (user) => {
    setUsers([...users, user]); // Add new user to the list
  };

  // Function to handle user login
  const handleUserLogin = (email, password) => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setCurrentUser(foundUser); // Set the currentUser state
    } else {
      alert('Invalid email or password');
    }
  };

  // Function to handle adding a new stock
  const handleAddStock = (stock) => {
    setStocks([...stocks, stock]); // Add new stock to the portfolio
  };

  // Function to handle deleting a user
  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers); // Update the state with the remaining users
  };

  // Function to handle profile save (update user information)
  const handleProfileSave = (name) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, name };
      setCurrentUser(updatedUser);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setCurrentUser(null); // Clear the currentUser state
  };

  return (
    <Router>
      <NavbarComponent userName={currentUser ? currentUser.name : ''} />
      <Container className="mt-4">
        <Routes>
          <Route path="/login" element={<LoginPage onUserLogin={handleUserLogin} />} />
          <Route path="/signup" element={<SignupPage onUserSignup={handleUserSignup} />} />
          <Route
            path="/profile"
            element={<ProfilePage onProfileSave={handleProfileSave} currentUser={currentUser} />}
          />
          <Route
            path="/admin"
            element={<AdminPage users={users} onDeleteUser={handleDeleteUser} />}
          />
          <Route path="/user" element={<UserPage stocks={stocks} />} />
          <Route path="/logout" element={<LogoutPage onLogout={handleLogout} />} />
          
          {/* New Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <Dashboard
                stocks={stocks}
                currentUser={currentUser}
              />
            }
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
