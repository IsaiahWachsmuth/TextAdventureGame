// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import Dashboard from './pages/Dashboard'; // Adjust the path as necessary
import GamePage from './pages/GamePage'; // Adjust the path as necessary
import GameDetailsPage from './pages/GameDetails'; // Adjust the path as necessary
import EditGame from './pages/EditGame'
import AddGame from './pages/AddGame'
import LandingPage from './LandingPage';
import { Link } from 'react-router-dom';

// ... other imports

function App() {
    return (
        <Router>
            <div>
              <div className="App">
                {/* Initialize with the LandingPage component */}
                  <LandingPage />
              </div>
                {/* Navigation Links can be added here */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/games" element={<GamePage />} />
                    <Route path="/games/:gameId" element={<GameDetailsPage />} />
                    <Route path="/edit-game/:gameId" element={<EditGame />} />
                    <Route path="/add-game" element={<AddGame />} />
                    {/* Other routes */}
                </Routes>
                
            </div>
        </Router>
    );
}

function Home() {
    // Home page component or content
    return (
      <div>Welcome to the Text Adventure Game Portal
            <header>
                <Link className="App-link" to="/">Home Page</Link>
                <Link className="App-link" to="/games">Games Page</Link>
                <Link className="App-link" to="/add-game">Add a Game</Link>
            </header>
            {/* Dashboard component displayed under the Home content */}
            <Dashboard />
      </div>
    )
}

export default App;
