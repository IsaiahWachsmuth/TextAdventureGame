// client/src/components/DashboardGrid.js
import React from 'react';

const DashboardGrid = ({ games, onAddGame, onGameSelect, onEditGame }) => {
  const getImageSrc = (image) => {
    if (image && !image.startsWith('http')) {
      return `data:image/jpeg;base64,${image}`;
    }
    return image;
  };

  // Prevents click event from bubbling up to the parent when buttons are clicked
  const handleClick = (e, game) => {
    e.stopPropagation(); // Prevents the event from propagating up to the game card click
    onEditGame(game);
  };

  return (
    <section className='game-dash'>
      {games.map((game) => (
        <div className='game-card' key={game.game_id} onClick={() => onGameSelect(game)}>
          <h5>{game.title}</h5>
          <p>{game.description}</p>
          {game.image && (
            <img
              src={getImageSrc(game.image)}
              alt="Game"
              style={{ maxWidth: '100%', height: '240px' }}
            />
          )}
          <div onClick={(e) => e.stopPropagation()}> {/* Stops the click event from reaching the game card */}
            <button onClick={(e) => handleClick(e, game)}>Edit</button>
            <button onClick={(e) => e.stopPropagation()}>Play Game</button>
          </div>
        </div>
      ))}
      <div className='game-card add-game' onClick={onAddGame}>
        <h5>Add Game</h5>
      </div>
    </section>
  );
};

export default DashboardGrid;
