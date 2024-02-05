import React from 'react';
import { Link } from 'react-router-dom';

const DashboardGrid = ({ games }) => {
  return (
    <section className='game-dash'>
      {games.map((game) => (
        <div className='game-card' key={game.game_id}>
          {/* Are we going to have images? If so we'll need to add them here. */}
          <h5>{game.title}</h5>
          <p>{game.description}</p>
        </div>
      ))}
      <Link to="/dashboard/add-game">
        <div className='game-card add-game'>
          <h5>Add Game</h5>
        </div>
      </Link>
    </section>
  );
};

export default DashboardGrid;
