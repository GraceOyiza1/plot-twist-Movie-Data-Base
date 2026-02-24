export default function MovieDetails({ movie, onBack }) {
    if (!movie) return null;

    // Custom descriptions based on your list
    const customDescriptions = {
        'Sinners': 'Critics’ darling sweeping major awards and Oscar buzz. If you like deep character drama with a punch, this one’s speaking prestige cinema realness.',
        'One Battle After Another': 'A critics’ fave from 2025 that’s still rocking conversations for its intense, action-driven storytelling.',
        'The Moment': 'A quirky A24 mockumentary starring Charli XCX. It’s meta, it’s weird, it’s film-fest flexy.',
        'Scream 7': 'Horror franchise legacy comes back for more with the Ghostface saga — perfect if you live for jump scares and slasher callbacks.'
    };

    const displayPlot = movie.Plot && movie.Plot !== "N/A" ? movie.Plot : (customDescriptions[movie.Title] || "Plot details coming soon to Plot-Twist.");

    return (
        <div className="animate-in fade-in zoom-in duration-500 max-w-6xl mx-auto p-6 min-h-screen">
            <button onClick={onBack} className="mb-8 text-yellow-500 font-bold tracking-widest text-sm hover:underline">
                ← BACK
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/20">
                    <img
                        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/500x750?text=No+Poster"}
                        alt={movie.Title}
                        className="w-full h-auto object-cover"
                    />
                </div>

                <div className="flex flex-col">
                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none">{movie.Title}</h2>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded text-xs font-black italic">IMDb {movie.imdbRating || "NEW"}</span>
                        <span className="text-gray-400 font-mono">{movie.Year}</span>
                        <span className="text-gray-400 font-mono">{movie.Runtime || "TBA"}</span>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-yellow-500 font-bold uppercase text-xs tracking-[0.3em] mb-3 underline decoration-yellow-500/30 underline-offset-8">Reviewer Notes</h3>
                        <p className="text-gray-300 leading-relaxed text-lg italic">{displayPlot}</p>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-yellow-500 font-bold uppercase text-xs tracking-[0.3em] mb-4 underline decoration-yellow-500/30 underline-offset-8">Cast Members</h3>
                        <p className="text-gray-400 text-sm font-medium leading-loose">{movie.Actors || "To be announced."}</p>
                    </div>

                    <button className="bg-red-600 hover:bg-red-700 text-white font-black py-5 px-10 rounded-full transition-all shadow-xl uppercase tracking-[0.2em] text-sm w-fit">
                        Watch Trailer
                    </button>
                </div>
            </div>
        </div>
    );
}