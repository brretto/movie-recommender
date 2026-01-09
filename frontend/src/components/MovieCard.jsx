// ==============================================================================
// File: src/components/MovieCard.jsx
// ==============================================================================
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750/1a202c/ffffff?text=No+Image';

  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <img src={posterUrl} alt={movie.title} className="w-full h-auto" />
        <div className="p-4">
          <h3 className="text-lg font-bold truncate group-hover:text-cyan-400 transition-colors">{movie.title}</h3>
          <p className="text-sm text-gray-400">{movie.release_date.substring(0, 4)}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;