import { Home, Search, Film, Tv, LayoutGrid, PlusCircle, Clapperboard } from 'lucide-react';

export default function SideNav({ setView, currentView, isExpanded, setIsExpanded, onSearch }) {
    const menuItems = [
        { icon: <Home size={22} />, label: 'HOME', view: 'home' },
        { icon: <Film size={22} />, label: 'MOVIES', view: 'movies' },
        { icon: <Tv size={22} />, label: 'SERIES', view: 'series' },
        { icon: <LayoutGrid size={22} />, label: 'GENRE', view: 'genre' },
        { icon: <PlusCircle size={22} />, label: 'MY LIST', view: 'list' },
    ];

    return (
        <nav
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className={`fixed left-0 top-0 h-full bg-[#050505] border-r border-white/5 flex flex-col py-10 z-[100] transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}
        >
            {/* 🎬 LOGO: PlotTwist Movie Icon */}
            <div className="px-6 mb-10">
                <div
                    onClick={() => setView('home')}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.4)] group-hover:scale-110 transition-transform">
                        <Clapperboard size={22} className="text-black" strokeWidth={3} />
                    </div>
                    {isExpanded && (
                        <span className="text-white font-black uppercase tracking-tighter text-xl italic animate-in fade-in slide-in-from-left-2">
                            Plot<span className="text-yellow-500">Twist</span>
                        </span>
                    )}
                </div>
            </div>

            {/* SEARCH INTEGRATED IN SIDENAV */}
            <div className="px-4 mb-6">
                <div className={`flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 border border-white/10 transition-all ${isExpanded ? 'opacity-100' : 'opacity-40'}`}>
                    <Search size={20} className="text-gray-400 min-w-[20px]" />
                    <input
                        type="text"
                        placeholder="SEARCH..."
                        onChange={(e) => onSearch(e.target.value)}
                        className={`bg-transparent border-none outline-none text-[10px] font-black tracking-[0.2em] text-white w-full transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setView(item.view)}
                        className={`flex items-center gap-6 px-6 py-4 transition-all group relative ${currentView === item.view ? 'text-yellow-500' : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        <div className="min-w-[24px] group-hover:scale-110 transition-transform">{item.icon}</div>
                        <span className={`font-black tracking-[0.2em] text-[10px] transition-opacity duration-300 whitespace-nowrap ${isExpanded ? 'opacity-100' : 'opacity-0'
                            }`}>
                            {item.label}
                        </span>

                        {/* THE INDICATOR: Shows which menu is active */}
                        {currentView === item.view && (
                            <div className="absolute left-0 w-1 h-6 bg-yellow-500 rounded-r-full shadow-[0_0_10px_#eab308]" />
                        )}
                    </button>
                ))}
            </div>
        </nav>
    );
}