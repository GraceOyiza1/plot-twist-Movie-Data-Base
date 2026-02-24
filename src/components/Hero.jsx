import { Play } from 'lucide-react';

export default function Hero({ title, onWatchTrailer, onViewDetails }) {
    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">
            <img
                src="https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2070"
                className="absolute inset-0 w-full h-full object-cover opacity-70 scale-105"
                alt="Hero Art"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-[#050505] to-transparent z-10" />

            <div className="relative z-20 h-full flex flex-col justify-center px-10 md:px-24">
                <h1 className="text-7xl md:text-[130px] font-black mb-2 tracking-tighter uppercase italic leading-[0.8] text-white">
                    THE <br /> CONJURING
                </h1>

                <div className="flex items-center gap-6 mb-8 font-black text-[10px] tracking-[0.2em] text-yellow-500">
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded">R</span>
                    <span>★ 7.5</span>
                    <span className="text-gray-400 border-l border-white/20 pl-6 uppercase">112 MIN</span>
                </div>

                <div className="flex gap-6">
                    <button
                        onClick={onWatchTrailer}
                        className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-black hover:bg-yellow-500 transition-all uppercase tracking-[0.3em] text-[10px] group shadow-2xl"
                    >
                        <Play size={16} fill="black" className="group-hover:scale-125 transition-transform" />
                        Watch Trailer
                    </button>

                    <button
                        onClick={onViewDetails}
                        className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-14 py-5 rounded-full font-black hover:bg-white/20 transition-all uppercase tracking-[0.3em] text-[10px]"
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
}