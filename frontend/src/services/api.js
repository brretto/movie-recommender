// ==============================================================================
// File: src/services/api.js
// ==============================================================================
const API_BASE_URL = "http://127.0.0.1:8000/api";

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies?page=${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${movieId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching details for movie ${movieId}:`, error);
    return null;
  }
};

export const searchMovies = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error searching for movies with query "${query}":`, error);
    return [];
  }
};