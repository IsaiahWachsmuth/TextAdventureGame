import React from 'react';
import { Link } from 'react-router-dom';

const TopNavDashboard = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <Link class="navbar-brand" to="/dashboard">Dashboard</Link>
        <div id="basic-navbar-nav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <Link class="nav-link" to="#myaccount">My Account</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="#logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNavDashboard;
