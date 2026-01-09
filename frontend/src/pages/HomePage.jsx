// ==============================================================================
// File: src/pages/HomePage.jsx
// ==============================================================================
import React, { useState, useEffect } from 'react';
import { fetchPopularMovies, searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [header, setHeader] = useState("Popular Movies");

  useEffect(() => {
    // Only fetch popular movies if there is no search term
    if (!searchTerm) {
      setIsLoading(true);
      setHeader("Popular Movies");
      fetchPopularMovies()
        .then(data => {
          setMovies(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [searchTerm]); // Re-run when searchTerm becomes empty

  const handleSearch = async (query) => {
    setSearchTerm(query);
    setIsLoading(true);
    if (!query) {
       // If the search is cleared, fetchPopularMovies is handled by the useEffect
      return;
    }
    setHeader(`Search Results for "${query}"`);
    const results = await searchMovies(query);
    setMovies(results);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      <h1 className="text-3xl font-bold my-8 text-cyan-400">{header}</h1>
      {isLoading ? (
        <p className="text-center text-lg">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;