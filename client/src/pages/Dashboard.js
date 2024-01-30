import React from 'react';
import TopNavDashboard from '../components/TopNavDashboard';
import DashboardGrid from '../components/DashboardGrid';

const Dashboard = () => {
    return (
        <div class="d-flex dashboard" id="temp-ed-dash">
            <TopNavDashboard />
            <DashboardGrid />
        </div>
    );
}

export default Dashboard;
