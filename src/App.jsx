import { useState } from 'react';
import { searchMovies } from './api';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);

    const data = await searchMovies(query);

    if (data && data.Response === "True") {
      setMovies(data.Search); // Store the list of movies
    } else {
      setMovies([]);
      // Handle cases where no movies match the search query
      setError(data?.Error || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-yellow-500/30">
      {/* Header Section */}
      <header className="py-12 px-4">
        <h1 className="text-5xl font-black text-center tracking-tighter text-yellow-500 mb-2">
          PLOT-TWIST
        </h1>
        <p className="text-center text-gray-400 text-lg mb-8">
          Find your next favorite movie
        </p>
        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            <p className="mt-4 text-gray-400 animate-pulse">Fetching movies...</p>
          </div>
        )}

        {/* Search Functionality */}
        <SearchBar onSearch={handleSearch} />
      </header>

      <main className="max-w-7xl mx-auto pb-20 px-4">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        )}

        {/* Error Handling */}
        {error && (
          <div className="mt-20 text-center">
            <p className="text-red-400 text-xl font-medium bg-red-400/10 inline-block px-6 py-3 rounded-full border border-red-400/20">
              ⚠️ {error}
            </p>
          </div>
        )}

        {/* Movie List Display */}
        {!loading && !error && movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 animate-in fade-in duration-700">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}

        {/* Welcome / Empty State */}
        {!loading && !error && movies.length === 0 && (
          <div className="mt-20 text-center opacity-30">
            <p className="text-2xl">Start searching to see movie results...</p>
          </div>
        )}
      </main>

      <footer className="py-10 text-center border-t border-white/5 text-gray-500 text-sm">
        <p>© 2026 Plot-Twist Movie Database • Built with React & OMDb</p>
      </footer>
    </div>
  );
}

export default App;