# ==============================================================================
# File: app/models.py
# ==============================================================================
from pydantic import BaseModel
from typing import List, Optional

# Basic movie model for lists and cards
class Movie(BaseModel):
    id: int
    title: str
    overview: str
    release_date: str
    poster_path: Optional[str]
    vote_average: float

# More detailed model for the movie details page
class Genre(BaseModel):
    id: int
    name: str

class MovieDetails(Movie):
    genres: List[Genre]
    runtime: Optional[int]
    tagline: Optional[str]