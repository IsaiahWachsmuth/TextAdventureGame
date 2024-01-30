import React from 'react';

const DashboardGrid = () => {
  return (
    <section className='game-dash'>
        <div className='game-card'>
            <h5>Game Name</h5>
            <p>Info about the game.</p>
        </div>
        <div className='game-card add-game'>
            <h5>Add Game</h5>
        </div>
    </section>
  );
};

export default DashboardGrid;
