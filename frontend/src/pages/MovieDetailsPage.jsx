// ==============================================================================
// File: src/pages/MovieDetailsPage.jsx
// ==============================================================================
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchMovieDetails(movieId)
      .then(data => {
        setMovie(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [movieId]);

  if (isLoading) {
    return <p className="text-center text-lg p-10">Loading details...</p>;
  }

  if (!movie) {
    return <p className="text-center text-lg p-10">Movie not found.</p>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750/1a202c/ffffff?text=No+Image';

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full md:w-1/3 h-auto object-cover"
        />
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-2 text-white">{movie.title}</h1>
            {movie.tagline && <p className="text-lg italic text-gray-400 mb-4">"{movie.tagline}"</p>}
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map(genre => (
                <span key={genre.id} className="bg-cyan-500 text-gray-900 px-3 py-1 text-sm font-semibold rounded-full">
                  {genre.name}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-2 text-cyan-400">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Release Date: <span className="font-normal text-gray-300">{movie.release_date}</span></span>
              <span className="font-semibold">Rating: <span className="font-normal text-yellow-400">{movie.vote_average.toFixed(1)} / 10</span></span>
              {movie.runtime && <span className="font-semibold">Runtime: <span className="font-normal text-gray-300">{movie.runtime} min</span></span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;