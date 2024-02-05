import React from 'react';

const DashboardGrid = ({ games, onAddGame }) => {
  return (
    <section className='game-dash'>
      {games.map((game) => (
        <div className='game-card' key={game.game_id}>
          {/* Are we going to have images? If so we'll need to add them here. */}
          <h5>{game.title}</h5>
          <p>{game.description}</p>
        </div>
      ))}
      <div className='game-card add-game' onClick={onAddGame}>
        <h5>Add Game</h5>
      </div>
    </section>
  );
};

export default DashboardGrid;
