import { useState, useEffect } from 'react';
import { searchMovies } from './api';
import { Play, Sun, Moon } from 'lucide-react';
import Hero from './components/Hero';
import MovieDetails from './components/MovieDetails';
import SideNav from './components/SideNav';
import VideoModal from './components/VideoModal';

function App() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [view, setView] = useState('home');
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  // NEW: Theme State for responsiveness and user choice
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState("");

  const featuredMovie = {
    Title: "The Conjuring", Year: "2013", imdbRating: "7.5",
    Poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2070",
    imdbID: "tt1457767"
  };

  useEffect(() => {
    setTrendingMovies([
      { Title: "Inception", Year: "2025", imdbRating: "9.2", Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", imdbID: "t1" },
      { Title: "One Battle After Another", Year: "2025", imdbRating: "8.8", Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", imdbID: "t2" },
      { Title: "A Quiet Place", Year: "2024", imdbRating: "8.1", Poster: "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM2OTk1NTM@._V1_SX300.jpg", imdbID: "t3" },
      { Title: "Scream 7", Year: "2026", imdbRating: "SOON", Poster: "https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_SX300.jpg", imdbID: "t4" }
    ]);
  }, []);

  const openTrailer = (title) => {
    setActiveTrailer(title);
    setIsPlayerOpen(true);
  };

  const handleSearch = async (query) => {
    if (query.length < 3) return;
    setView('results');
    const data = await searchMovies(query);
    if (data && data.Response === "True") setMovies(data.Search);
  };

  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-gray-50 text-black'} selection:bg-yellow-500 selection:text-black`}>
      <SideNav
        setView={setView}
        currentView={view}
        isExpanded={isNavExpanded}
        setIsExpanded={setIsNavExpanded}
        onSearch={handleSearch}
      />

      <main className={`flex-1 transition-all duration-500 ${isNavExpanded ? 'ml-64' : 'ml-16 md:ml-20'}`}>
        {/* --- HOME VIEW --- */}
        {view === 'home' && (
          <div className="animate-in fade-in duration-1000">
            <Hero
              title={featuredMovie.Title}
              onWatchTrailer={() => openTrailer(featuredMovie.Title)}
              onViewDetails={() => { setSelectedMovie(featuredMovie); setView('details'); }}
            />

            <section className="px-6 md:px-24 py-12 md:py-20">
              <h2 className={`text-lg md:text-xl font-black mb-12 uppercase tracking-[0.5em] border-l-4 border-yellow-500 pl-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Trending Now
              </h2>

              {/* Grid is now fully responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {trendingMovies.map(m => (
                  <div key={m.imdbID} className="group flex flex-col cursor-pointer">
                    <div className="relative rounded-2xl overflow-hidden border border-white/5 group-hover:border-yellow-500 transition-all duration-500 shadow-2xl aspect-[2/3]">
                      <img src={m.Poster} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={m.Title} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); openTrailer(m.Title); }}
                          className="bg-yellow-500 text-black p-4 rounded-full hover:scale-110 transition-transform shadow-lg"
                        >
                          <Play fill="black" size={24} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 px-1 flex flex-col gap-1" onClick={() => { setSelectedMovie(m); setView('details'); }}>
                      <div className="flex justify-between items-start">
                        <span className={`text-[11px] font-black uppercase tracking-widest transition-colors truncate pr-2 ${isDarkMode ? 'text-gray-300 group-hover:text-yellow-500' : 'text-gray-700 group-hover:text-yellow-600'}`}>
                          {m.Title}
                        </span>
                        <span className="text-yellow-500 text-[10px] font-black">★ {m.imdbRating}</span>
                      </div>
                      <div className="text-[9px] font-bold text-gray-500 tracking-tighter uppercase">
                        {m.Year} • 4K HDR
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* --- SETTINGS VIEW --- */}
        {view === 'settings' && (
          <div className="p-8 md:p-24 animate-in slide-in-from-bottom-5 duration-500">
            <h2 className={`text-3xl md:text-4xl font-black uppercase mb-12 italic border-b pb-6 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>App Settings</h2>

            <div className="max-w-2xl space-y-10">
              {/* Appearance Toggle */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <div>
                  <h3 className="font-black text-sm tracking-widest uppercase">Appearance</h3>
                  <p className="text-gray-500 text-[10px]">Customize your viewing interface.</p>
                </div>
                <div className="flex bg-gray-200 dark:bg-white/5 p-1 rounded-full border border-black/10 dark:border-white/10">
                  <button
                    onClick={() => setIsDarkMode(false)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${!isDarkMode ? 'bg-white text-black shadow-md' : 'text-gray-500 hover:text-white'}`}
                  >
                    <Sun size={14} /> LIGHT
                  </button>
                  <button
                    onClick={() => setIsDarkMode(true)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${isDarkMode ? 'bg-yellow-500 text-black shadow-md' : 'text-gray-500 hover:text-black'}`}
                  >
                    <Moon size={14} /> DARK
                  </button>
                </div>
              </div>

              {/* Language Selection */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <div>
                  <h3 className="font-black text-sm tracking-widest uppercase">Language</h3>
                  <p className="text-gray-500 text-[10px]">Select display language.</p>
                </div>
                <select className={`bg-transparent border px-4 py-2 rounded-lg text-[10px] font-black uppercase outline-none cursor-pointer ${isDarkMode ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}>
                  <option className="text-black">English (US)</option>
                  <option className="text-black">Spanish</option>
                  <option className="text-black">French</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* --- DYNAMIC VIEWS: Movies, Series, Genre, List --- */}
        {(view === 'movies' || view === 'series' || view === 'genre' || view === 'list') && (
          <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-in zoom-in-95 duration-500">
            <h2 className={`text-5xl md:text-8xl font-black uppercase italic tracking-tighter absolute select-none opacity-10`}>
              {view}
            </h2>
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-black text-yellow-500 uppercase tracking-[0.3em] mb-4">Coming Soon</h3>
              <p className="text-gray-500 text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-10">Part of the PlotTwist 2026 Roadmap</p>
              <button
                onClick={() => setView('home')}
                className={`px-8 py-3 border rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isDarkMode ? 'border-white/10 hover:bg-white hover:text-black' : 'border-black/10 hover:bg-black hover:text-white'}`}
              >
                Return Home
              </button>
            </div>
          </div>
        )}

        {/* --- SEARCH RESULTS VIEW --- */}
        {view === 'results' && (
          <div className="p-8 md:p-24">
            <h2 className="text-2xl md:text-4xl font-black uppercase mb-12 italic border-b border-white/10 pb-6">Library Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
              {movies.map(m => (
                <div key={m.imdbID} className="group flex flex-col cursor-pointer" onClick={() => openTrailer(m.Title)}>
                  <div className="relative rounded-xl overflow-hidden border border-white/10">
                    <img src={m.Poster} className="w-full transition-all group-hover:opacity-50" alt={m.Title} />
                    <Play fill="yellow" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-500" size={32} />
                  </div>
                  <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-gray-500">{m.Title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- DETAILS VIEW --- */}
        {view === 'details' && <MovieDetails movie={selectedMovie} onBack={() => setView('home')} />}
      </main>

      <VideoModal isOpen={isPlayerOpen} onClose={() => setIsPlayerOpen(false)} movieTitle={activeTrailer} />
    </div>
  );
}

export default App;