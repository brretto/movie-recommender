# ==============================================================================
# File: app/routes.py
# ==============================================================================
from fastapi import APIRouter, HTTPException, Query
from typing import List
from .services import get_popular_movies, get_movie_details, search_movies
from .models import Movie, MovieDetails

router = APIRouter()

@router.get("/movies", response_model=List[Movie])
def read_movies(page: int = 1):
    """
    Get a paginated list of popular movies.
    """
    movies = get_popular_movies(page)
    if not movies:
        raise HTTPException(status_code=404, detail="Movies not found")
    return movies

@router.get("/movies/{movie_id}", response_model=MovieDetails)
def read_movie_details(movie_id: int):
    """
    Get detailed information for a single movie by its ID.
    """
    movie = get_movie_details(movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

@router.get("/search", response_model=List[Movie])
def search_for_movies(query: str = Query(..., min_length=1, description="The search term for movies.")):
    """
    Search for movies by title.
    """
    movies = search_movies(query)
    # The search endpoint can return an empty list, which is not an error.
    return movies