# ==============================================================================
# File: main.py
# ==============================================================================
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router as movie_router

app = FastAPI()

# Configure CORS (Cross-Origin Resource Sharing)
# This allows your React frontend to communicate with your FastAPI backend.
origins = [
    "http://localhost:5173", # The default Vite dev server port
    "http://localhost:3000", # A common port for create-react-app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the movie routes
app.include_router(movie_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Movie Recommender API"}

# It's good practice to have this for deployment, though uvicorn command is used for dev
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)