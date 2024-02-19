import React, { useState } from 'react';

function AddGame({ onBack }) { // Removed useNavigate and adjusted for onBack prop
    const [game, setGame] = useState({ title: '', description: '', author: '', pages: {} });

    const handleChange = (event) => {
        setGame({ ...game, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game),
            });
            if (response.ok) {
                // Call onBack to switch back to the game listing view instead of navigating
                onBack();
            } else {
                throw new Error('Failed to create game');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='d-flex add-game-form'>
            <h2>Add New Game</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Game ID:
                    <input type="text" name="game_id" value={game.game_id} onChange={handleChange} />
                </label>
                
                <label>
                    Title:
                    <input type="text" name="title" value={game.title} onChange={handleChange} />
                </label>
                
                <label>
                    Description:
                    <textarea name="description" value={game.description} onChange={handleChange}></textarea>
                </label>
                
                <label>
                    Author:
                    <input type="text" name="author" value={game.author} onChange={handleChange} />
                </label>
                {/* Add fields for other properties like pages if necessary */}
                
                <button type="submit">Add Game</button>
            </form>
        </div>
    );
}

export default AddGame;
