import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout(); // Call onLogout function to clear user session
    navigate('/login'); // Redirect to login page after logging out
  }, [navigate, onLogout]);

  return <div>Logging out...</div>;
}

export default LogoutPage;
