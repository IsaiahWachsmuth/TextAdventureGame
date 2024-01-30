import React from 'react';

const DashboardGrid = () => {
  return (
    /*
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Game Name</h5>
                        <p class="card-text">
                            Info about the game here.
                        </p>
                    </div>
                </div>     
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <div class="card add-game-card">
                    <div class="card-body">
                        <h5 class="card-title">Add a Game</h5>
                    </div>
                </div>
            </div>

        </div>   
    </div>
    */
   // that shit isn't working

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
