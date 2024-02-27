import React from 'react';

function GameDetails({ game, onBack }) {
    return (
        <div>
            <h2>Game Details</h2>
            <p><strong>Title:</strong> {game.title}</p>
            <p><strong>Description:</strong> {game.description}</p>
            <p><strong>Author:</strong> {game.author}</p>
            <p>
            {game.image && (
                <img src={`data:image/jpeg;base64,${game.image}`} alt={`Bad file type req JPEG`} style={{ maxWidth: '100%', height: '480px' }} />
            )}
            </p>
            <button onClick={onBack}>Back to List</button>
        </div>
    );
}

export default GameDetails;
