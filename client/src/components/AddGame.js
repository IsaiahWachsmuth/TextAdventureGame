import React, { useState } from 'react';

function AddGame({ onBack }) { // Removed useNavigate and adjusted for onBack prop
    const [game, setGame] = useState({ title: '', description: '', author: '' });

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
        <div>
            <h2>Add New Game</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={game.title} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Description:
                    <textarea name="description" value={game.description} onChange={handleChange}></textarea>
                </label>
                <br />
                <label>
                    Author:
                    <input type="text" name="author" value={game.author} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Add Game</button>
                <button type="button" onClick={onBack}>Cancel</button>
            </form>
        </div>
    );
}

export default AddGame;
