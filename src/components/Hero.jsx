export default function Hero() {
    return (
        <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden mb-12">
            {/* Real Movie Poster Image */}
            <div
                className="absolute inset-0 bg-cover bg-top bg-no-repeat transition-transform duration-1000 hover:scale-105"
                style={{
                    backgroundImage: `url('https://c8.alamy.com/comp/2K3MF2H/10-things-i-hate-about-you-1999-10-things-i-hate-about-you-movie-poster-julia-stilles-heath-ledger-joseph-gordon-levitt-2K3MF2H.jpg')`
                }}
            >
                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl">
                <span className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Featured Classic</span>
                <h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic">
                    10 THINGS I HATE ABOUT YOU
                </h2>
                <div className="flex gap-4 justify-center">
                    <button className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors shadow-lg">
                        Watch Trailer
                    </button>
                    <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}