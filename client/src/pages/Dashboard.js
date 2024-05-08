import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavDashboard from '../components/TopNavDashboard';
import DashboardGrid from '../components/DashboardGrid';
import AddGame from '../components/AddGame';
import GameDetails from '../components/GameDetails';
import EditGame from '../components/EditGame';
import TranscriptsGrid from '../components/TranscriptsGrid'; // Import TranscriptsGrid component

const Dashboard = () => {
    const [games, setGames] = useState([]);
    const [transcripts, setTranscripts] = useState([]);
    const [currentView, setCurrentView] = useState('list');
    const [selectedGame, setSelectedGame] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (currentView === 'list') {
            const fetchGames = async () => {
                try {
                    const response = await fetch('http://localhost:3001/games', {
                        credentials: 'include',
                    });
                    const data = await response.json();
                    setGames(data);
                } catch (error) {
                    console.error("Failed to fetch games:", error);
                }
            };

            fetchGames();
        }
    }, [currentView]);

    const handleAddGameClick = () => {
        setCurrentView('addGame');
    };

    const handleGameSelect = (game) => {
        setSelectedGame(game);
        setCurrentView('gameDetails');
    };

    const handleEditGameClick = (game) => {
        setSelectedGame(game);
        setCurrentView('editGame');
    };

    const handleViewTranscripts = () => {
        setCurrentView('transcripts');
    };

    return (
        <div className="d-flex dashboard" id="temp-ed-dash">
            <TopNavDashboard />
            {currentView === 'list' && (
                <DashboardGrid 
                    games={games} 
                    onAddGame={handleAddGameClick} 
                    onGameSelect={handleGameSelect} 
                    onEditGame={handleEditGameClick} 
                />
            )}
            {currentView === 'addGame' && (
                <AddGame onBack={() => setCurrentView('list')} />
            )}
            {currentView === 'gameDetails' && selectedGame && (
                <GameDetails 
                    game={selectedGame} 
                    onBack={() => setCurrentView('list')} 
                    onViewTranscripts={handleViewTranscripts} 
                />
            )}
            {currentView === 'editGame' && selectedGame && (
                <EditGame game={selectedGame} onBack={() => setCurrentView('list')} />
            )}
            {currentView === 'transcripts' && (
                <TranscriptsGrid transcripts={transcripts} />
            )}
        </div>
    );
}

export default Dashboard;
