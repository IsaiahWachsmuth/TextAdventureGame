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
            <h2>Add a New Game</h2>
            <p>Fill in the details of the game you want to add.</p>
            <form className='d-flex' onSubmit={handleSubmit}>
                <label>
                    <input type="text" placeholder='Game ID' name="game_id" value={game.game_id} onChange={handleChange} />
                </label>
                
                <label>
                    <input type="text" placeholder='Title' name="title" value={game.title} onChange={handleChange} />
                </label>

                <label>
                    <input type="text" name="author"  placeholder='Author' value={game.author} onChange={handleChange} />
                </label>
                
                <label>
                    <textarea name="description" placeholder='Description' value={game.description} onChange={handleChange}></textarea>
                </label>
                
                {/* Add fields for other properties like pages if necessary */}
                
                <button type="submit">Add Game</button>
                <button type="button" onClick={onBack}>Cancel</button>
            </form>
        </div>
    );
}

export default AddGame;
