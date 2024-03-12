// client/src/components/TopNavDashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const TopNavDashboard = () => {
  const navigate = useNavigate(); // Used to redirect after logging out
  const { logout } = useAuth(); // Access logout function from context

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/'); // Redirect to the landing page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Dashboard</Link>
        <div id="basic-navbar-nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button className="nav-link" style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }} onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNavDashboard;
