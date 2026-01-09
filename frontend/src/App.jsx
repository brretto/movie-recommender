// ==============================================================================
// File: src/App.jsx
// ==============================================================================
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
            MovieRecommender
          </Link>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;