import { useState, useEffect } from 'react';
import { searchMovies } from './api';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import Hero from './components/Hero';
import MovieDetails from './components/MovieDetails';

function App() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]); // Separate state for trending
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [view, setView] = useState('home');

  // Your curated 2025-2026 list
  const myTrendingList = [
    {
      Title: "Sinners",
      Year: "2025",
      imdbRating: "9.2",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", // Example placeholder
      Plot: "Critics’ darling sweeping major awards and Oscar buzz. If you like deep character drama with a punch, this one’s speaking prestige cinema realness.",
      imdbID: "trending1"
    },
    {
      Title: "One Battle After Another",
      Year: "2025",
      imdbRating: "8.8",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
      Plot: "A critics’ fave from 2025 that’s still rocking conversations for its intense, action-driven storytelling.",
      imdbID: "trending2"
    },
    {
      Title: "The Moment",
      Year: "2026",
      imdbRating: "NEW",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTY5NzE3NzU3MF5BMl5BanBnXkFtZTcwOTMxMDc3NA@@._V1_SX300.jpg",
      Plot: "A quirky A24 mockumentary starring Charli XCX. It’s meta, it’s weird, it’s film-fest flexy.",
      imdbID: "trending3"
    },
    {
      Title: "Scream 7",
      Year: "2026",
      imdbRating: "SOON",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_SX300.jpg",
      Plot: "Horror franchise legacy comes back for more with the Ghostface saga — perfect if you live for jump scares and slasher callbacks.",
      imdbID: "trending4"
    }
  ];

  useEffect(() => {
    setTrendingMovies(myTrendingList); // Load these immediately on start
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    setView('results');
    const data = await searchMovies(query);
    if (data && data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
    setLoading(false);
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setView('details');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-sans">
      <header className="py-6 px-4 flex flex-col items-center border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-md sticky top-0 z-50">
        <h1 onClick={() => setView('home')} className="text-3xl font-black tracking-tighter text-yellow-500 cursor-pointer mb-4">
          PLOT-TWIST
        </h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {view === 'home' && (
        <div className="animate-in fade-in duration-700">
          <Hero />
          <section className="max-w-7xl mx-auto px-4 pb-20 mt-10">
            <h2 className="text-xl font-bold mb-8 text-gray-400 uppercase tracking-widest border-l-4 border-yellow-500 pl-4">
              Trending Now
            </h2>

            {/* The 4-movie grid for your curated list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {trendingMovies.map((movie) => (
                <div key={movie.imdbID} onClick={() => handleSelectMovie(movie)} className="cursor-pointer group">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 transition-all group-hover:border-yellow-500/50">
                    <img src={movie.Poster} alt={movie.Title} className="w-full h-[400px] object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <span className="text-yellow-500 font-bold text-xs italic">★ {movie.imdbRating}</span>
                      <h3 className="text-white font-black text-sm uppercase truncate">{movie.Title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {view === 'results' && (
        <main className="max-w-7xl mx-auto py-12 px-4 min-h-[70vh]">
          <h2 className="text-3xl font-black uppercase mb-10 border-b border-white/5 pb-4">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {movies.map((movie) => (
              <div key={movie.imdbID} onClick={() => handleSelectMovie(movie)} className="cursor-pointer">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </main>
      )}

      {view === 'details' && (
        <MovieDetails movie={selectedMovie} onBack={() => setView('home')} />
      )}

      <footer className="py-10 text-center text-gray-600 text-[10px] tracking-widest uppercase">
        <p>© 2026 Plot-Twist Movie Database • Built with React & OMDb</p>
      </footer>
    </div>
  );
}

export default App;