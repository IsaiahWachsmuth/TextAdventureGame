import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameList from '../components/GameList';
import { useNavigate } from 'react-router-dom';

function GamePage({ setGameToEdit }) {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const onDelete = async game_id => {
        const response = await fetch(`http://localhost:3001/games/${game_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const newGames = games.filter(game => game.game_id !== game_id);
            setGames(newGames);
        } else {
            console.error(`Failed to delete game with game_id = ${game_id}, status code = ${response.status}`);
        }
    };

    const onEdit = (game) => {
        navigate(`/edit-game/${game.game_id}`);
    };    

    const loadGames = async () => {
        const response = await fetch('http://localhost:3001/games');
        const data = await response.json();
        setGames(data);
    };

    useEffect(() => {
        loadGames();
    }, []);

    return (
        <div>
            <header>
                <Link className="App-link" to="/">Home Page</Link>
                <Link className="App-link" to="/games">Games Page</Link>
                <Link className="App-link" to="/add-game">Add a Game</Link>
            </header>
            <h2>Games</h2>
            <GameList games={games} onDelete={onDelete} onEdit={onEdit} />
        </div>
    );
}

export default GamePage;
