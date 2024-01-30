import React from 'react';

const TopNavDashboard = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="#home">Dashboard</a>

        <div id="basic-navbar-nav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#myaccount">My Account</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

  );
};

export default TopNavDashboard;
