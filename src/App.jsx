import { useState, useEffect } from 'react';
import { searchMovies } from './api';
import { Play } from 'lucide-react';
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

  // Video State for On-Site Theater
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState("");

  const featuredMovie = {
    Title: "The Conjuring", Year: "2013", imdbRating: "7.5",
    Poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2070",
    imdbID: "tt1457767"
  };

  useEffect(() => {
    setTrendingMovies([
      { Title: "Sinners", Year: "2025", imdbRating: "9.2", Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", imdbID: "t1" },
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
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-yellow-500 selection:text-black">
      <SideNav
        setView={setView}
        currentView={view}
        isExpanded={isNavExpanded}
        setIsExpanded={setIsNavExpanded}
        onSearch={handleSearch}
      />

      <main className={`flex-1 transition-all duration-500 ${isNavExpanded ? 'ml-64' : 'ml-20'}`}>
        {view === 'home' && (
          <div className="animate-in fade-in duration-1000">
            <Hero
              title={featuredMovie.Title}
              onWatchTrailer={() => openTrailer(featuredMovie.Title)}
              onViewDetails={() => { setSelectedMovie(featuredMovie); setView('details'); }}
            />

            <section className="px-10 md:px-24 py-20">
              <h2 className="text-xl font-black mb-12 text-gray-500 uppercase tracking-[0.5em] border-l-4 border-yellow-500 pl-8">
                Trending Now
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {trendingMovies.map(m => (
                  <div key={m.imdbID} className="group flex flex-col cursor-pointer">
                    {/* Poster with Hover Play Button */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/5 group-hover:border-yellow-500 transition-all duration-500 shadow-2xl aspect-[2/3]">
                      <img src={m.Poster} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={m.Title} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); openTrailer(m.Title); }}
                          className="bg-yellow-500 text-black p-4 rounded-full hover:scale-110 transition-transform shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                        >
                          <Play fill="black" size={24} />
                        </button>
                      </div>
                    </div>

                    {/* ALWAYS VISIBLE INFO: Back by popular demand! */}
                    <div className="mt-5 px-1 flex flex-col gap-1" onClick={() => { setSelectedMovie(m); setView('details'); }}>
                      <div className="flex justify-between items-start">
                        <span className="text-[11px] font-black uppercase tracking-widest text-gray-300 group-hover:text-yellow-500 transition-colors truncate pr-2">
                          {m.Title}
                        </span>
                        <span className="text-yellow-500 text-[10px] font-black">★ {m.imdbRating}</span>
                      </div>
                      <div className="text-[9px] font-bold text-gray-600 tracking-tighter uppercase">
                        {m.Year} • 4K HDR
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {view === 'results' && (
          <div className="p-10 md:p-24">
            <h2 className="text-4xl font-black uppercase mb-16 italic border-b border-white/10 pb-6">Library Results</h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
              {movies.map(m => (
                <div key={m.imdbID} className="group flex flex-col cursor-pointer" onClick={() => openTrailer(m.Title)}>
                  <div className="relative rounded-xl overflow-hidden border border-white/10">
                    <img src={m.Poster} className="w-full transition-all group-hover:opacity-50" alt={m.Title} />
                    <Play fill="yellow" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-500" size={40} />
                  </div>
                  <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-gray-500">{m.Title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'details' && <MovieDetails movie={selectedMovie} onBack={() => setView('home')} />}
      </main>

      <VideoModal isOpen={isPlayerOpen} onClose={() => setIsPlayerOpen(false)} movieTitle={activeTrailer} />
    </div>
  );
}

export default App;