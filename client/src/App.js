// client/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard'; // dashboard component
import LandingPage from './pages/LandingPage'; // main landing page
import PlayGamePage from './pages/PlayGame';


function App() {
    return (
      <Router>
        <AuthProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/play/:classCode" element={<PlayGamePage />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    );
  }
  
  function Home() {
    const { isAuthenticated } = useAuth();
  
    return isAuthenticated ? <Dashboard /> : <LandingPage />;
  }

export default App;
