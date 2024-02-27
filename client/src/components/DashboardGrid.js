import React from 'react';

const DashboardGrid = ({ games, onAddGame, onGameSelect }) => {
  // Function to generate the correct src attribute for an image
  const getImageSrc = (image) => {
    // Check if the image string is likely base64 encoded
    if (image && !image.startsWith('http')) {
      return `data:image/jpeg;base64,${image}`;
    }
    return image;
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
              alt={`Bad file type req JPEG`}
              style={{ maxWidth: '100%', height: '240px' }}
            />
          )}
        </div>
      ))}
      <div className='game-card add-game' onClick={onAddGame}>
        <h5>Add Game</h5>
      </div>
    </section>
  );
};

export default DashboardGrid;
