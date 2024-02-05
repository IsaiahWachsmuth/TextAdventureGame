import React, { useState, useEffect } from 'react';
import TopNavDashboard from '../components/TopNavDashboard';
import DashboardGrid from '../components/DashboardGrid';
import AddGame from '../components/AddGame';

const Dashboard = () => {
    const [games, setGames] = useState([]); // Initialize games state
    const [currentView, setCurrentView] = useState('list'); // 'list' or 'addGame'

    useEffect(() => {
        if (currentView === 'list') {
            const fetchGames = async () => {
                try {
                    const response = await fetch('http://localhost:3001/games');
                    const data = await response.json();
                    setGames(data); // Update state with fetched games
                } catch (error) {
                    console.error("Failed to fetch games:", error);
                }
            };

            fetchGames();
        }
    }, [currentView]); // Dependency on currentView to re-fetch when needed

    const handleAddGameClick = () => {
        setCurrentView('addGame');
    };

    return (
        <div className="d-flex dashboard" id="temp-ed-dash">
            <TopNavDashboard />
            {currentView === 'list' ? (
                <DashboardGrid games={games} onAddGame={handleAddGameClick} />
            ) : (
                <AddGame setCurrentView={setCurrentView} />
            )}
        </div>
    );
}

export default Dashboard;
