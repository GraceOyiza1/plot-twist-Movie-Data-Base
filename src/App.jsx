import { useState } from 'react';
import { searchMovies } from './api';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import Hero from './components/Hero'; // New Hero component

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
      setError(data?.Error || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-yellow-500/30">
      {/* 1. Header with Search Bar */}
      <header className="py-8 px-4 text-center z-20 relative">
        <h1 className="text-4xl font-black tracking-tighter text-yellow-500 mb-2">
          PLOT-TWIST
        </h1>
        <p className="text-gray-400 text-sm mb-6">Find your next favorite movie</p>
        <SearchBar onSearch={handleSearch} />
      </header>

      {/* 2. Hero Section - Only show when NOT searching for results to match Figma home */}
      {movies.length === 0 && !loading && !error && (
        <Hero />
      )}

      <main className="max-w-7xl mx-auto pb-20 px-4">
        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            <p className="mt-4 text-gray-400 animate-pulse">Fetching movies...</p>
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

        {/* 3. Movie Results Grid - Only shows if data exists */}
        {!loading && !error && movies.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6 text-yellow-500 uppercase tracking-widest border-l-4 border-yellow-500 pl-4">
              Search Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State / Welcome Message */}
        {!loading && !error && movies.length === 0 && (
          <div className="mt-10 text-center opacity-30">
            <p className="text-xl font-light italic">Enter a movie title to see more results...</p>
          </div>
        )}
      </main>

      <footer className="py-10 text-center border-t border-white/5 text-gray-500 text-sm mt-auto">
        <p>© 2026 Plot-Twist Movie Database • Built with React & OMDb</p>
      </footer>
    </div>
  );
}

export default App;