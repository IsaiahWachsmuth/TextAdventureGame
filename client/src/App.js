// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // dashboard component
// import GamePage from './pages/GamePage'; // Adjust the path as necessary
// import GameDetailsPage from './pages/GameDetails'; // Adjust the path as necessary
// import EditGame from './pages/EditGame'
// import AddGame from './pages/AddGame'
import LandingPage from './pages/LandingPage'; // main landing page
// import { Link } from 'react-router-dom';
// import EditGame from './pages/EditGame'; 
import GameEditorPage from './pages/GameEditorPage';
import PlayGamePage from './pages/PlayGame';


// ... other imports

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play/:classCode" element={<PlayGamePage />} />
                {/* Add more routes as necessary */}
            </Routes>
        </div>
    </Router>
);
}

function Home() {
return (
    <div>
        <LandingPage />
        <Dashboard />
    </div>
);
}

/*
temp save


<Routes>
<Route path="/" element={<Home />} />
<Route path="/games" element={<GamePage />} />
<Route path="/games/:gameId" element={<GameDetailsPage />} />
<Route path="/edit-game/:gameId" element={<EditGame />} />
<Route path="/add-game" element={<AddGame />} />

</Routes>


function Home() {
    // Home page component or content
    return (
      <div>Welcome to the Text Adventure Game Portal
            <header>
                <Link className="App-link" to="/">Home Page</Link>
                <Link className="App-link" to="/games">Games Page</Link>
                <Link className="App-link" to="/add-game">Add a Game</Link>
            </header>
            
            <Dashboard />
      </div>
    )
}
*/
export default App;
