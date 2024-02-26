import React, { useState, useEffect } from 'react';
import TopNavDashboard from '../components/TopNavDashboard';
import DashboardGrid from '../components/DashboardGrid';
import AddGame from '../components/AddGame';
import GameDetails from '../components/GameDetails'; 

const Dashboard = () => {
    const [games, setGames] = useState([]);
    const [currentView, setCurrentView] = useState('list'); // Add a new state for 'gameDetails'
    const [selectedGame, setSelectedGame] = useState(null); // State to hold the selected game's details

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

    const handleGameSelect = (game) => {
        setSelectedGame(game);
        setCurrentView('gameDetails'); // Change to the game details view
    };

    return (
        <div className="d-flex dashboard" id="temp-ed-dash">
            <TopNavDashboard />
            {currentView === 'list' && (
                <DashboardGrid games={games} onAddGame={handleAddGameClick} onGameSelect={handleGameSelect} />
            )}
            {currentView === 'addGame' && (
                <AddGame onBack={() => setCurrentView('list')} />
            )}
            {currentView === 'gameDetails' && selectedGame && (
                <GameDetails game={selectedGame} onBack={() => setCurrentView('list')} />
            )}
        </div>
    );
}

export default Dashboard;
