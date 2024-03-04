// client/src/components/DashboardGrid.js
import React from 'react';

// Add onEditGame to the list of props received by DashboardGrid
const DashboardGrid = ({ games, onAddGame, onGameSelect, onEditGame }) => {
  const getImageSrc = (image) => {
    if (image && !image.startsWith('http')) {
      return `data:image/jpeg;base64,${image}`;
    }
    return image;
  };

  return (
    <section className='game-dash'>
      {games.map((game) => (
        <div className='game-card' key={game.game_id}>
          <h5>{game.title}</h5>
          <p>{game.description}</p>
          {game.image && (
            <img
              src={getImageSrc(game.image)}
              alt="Game"
              style={{ maxWidth: '100%', height: '240px' }}
            />
          )}
          <button onClick={() => onEditGame(game)}>Edit</button>
          <button onClick={() => {}}>Play Game</button> {/* Needs to be hooked */}
        </div>
      ))}
      <div className='game-card add-game' onClick={onAddGame}>
        <h5>Add Game</h5>
      </div>
    </section>
  );
};

export default DashboardGrid;
