# ==============================================================================
# File: app/services.py
# ==============================================================================
import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_API_BASE_URL = "https://api.themoviedb.org/3"

def get_popular_movies(page: int = 1):
    """Fetches popular movies from The Movie Database (TMDB)."""
    if not TMDB_API_KEY:
        return None # Or raise an exception
        
    endpoint = f"{TMDB_API_BASE_URL}/movie/popular"
    params = {"api_key": TMDB_API_KEY, "language": "en-US", "page": page}
    
    try:
        response = requests.get(endpoint, params=params)
        response.raise_for_status()  # Raises an HTTPError for bad responses (4xx or 5xx)
        return response.json().get("results", [])
    except requests.RequestException as e:
        print(f"An error occurred: {e}")
        return []

def get_movie_details(movie_id: int):
    """Fetches details for a specific movie from TMDB."""
    if not TMDB_API_KEY:
        return None

    endpoint = f"{TMDB_API_BASE_URL}/movie/{movie_id}"
    params = {"api_key": TMDB_API_KEY, "language": "en-US"}

    try:
        response = requests.get(endpoint, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"An error occurred: {e}")
        return None

def search_movies(query: str, page: int = 1):
    """Searches for movies by title on TMDB."""
    if not TMDB_API_KEY:
        return None

    endpoint = f"{TMDB_API_BASE_URL}/search/movie"
    params = {"api_key": TMDB_API_KEY, "language": "en-US", "query": query, "page": page, "include_adult": False}

    try:
        response = requests.get(endpoint, params=params)
        response.raise_for_status()
        return response.json().get("results", [])
    except requests.RequestException as e:
        print(f"An error occurred: {e}")
        return []