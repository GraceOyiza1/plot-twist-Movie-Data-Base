import { X } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, movieTitle }) {
    if (!isOpen) return null;

    // This URL searches YouTube and plays the first result automatically inside your site
    const videoUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(movieTitle + " official trailer")}&autoplay=1`;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-8 right-8 text-white/50 hover:text-yellow-500 transition-all hover:scale-110"
            >
                <X size={48} />
            </button>

            {/* Video Container */}
            <div className="w-full max-w-6xl aspect-video px-4 shadow-[0_0_100px_rgba(234,179,8,0.15)]">
                <iframe
                    className="w-full h-full rounded-2xl border border-white/10 shadow-2xl"
                    src={videoUrl}
                    title={`${movieTitle} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Background Label */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 font-black uppercase tracking-[1em] text-[10px]">
                Now Playing: {movieTitle}
            </div>
        </div>
    );
}