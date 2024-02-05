import React, { useState, useEffect } from 'react';
import TopNavDashboard from '../components/TopNavDashboard';
import DashboardGrid from '../components/DashboardGrid';

const Dashboard = () => {
    const [games, setGames] = useState([]); // Initialize games state

    useEffect(() => {
        // Fetch from API
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:3001/games');
                const data = await response.json();
                setGames(data); // Update state with fetched
            } catch (error) {
                console.error("Failed to fetch games:", error);
            }
        };

        fetchGames();
    }, []);

    return (
        <div className="d-flex dashboard" id="temp-ed-dash">
            <TopNavDashboard />
            <DashboardGrid games={games} /> {/* Pass games to DashboardGrid */}
        </div>
    );
}

export default Dashboard;
