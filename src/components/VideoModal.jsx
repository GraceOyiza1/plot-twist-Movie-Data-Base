import { X } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, movieTitle }) {
    if (!isOpen) return null;

    // Directing movie trailers
    let videoUrl;

    if (movieTitle === "The Conjuring") {
        videoUrl = "https://www.youtube.com/embed/bMgfsdYoEEo?autoplay=1&rel=0";
    } else if (movieTitle === "Inception") {
        //  Inception embed link
        videoUrl = "https://www.youtube.com/embed/8hP9D6kZseM?autoplay=1&rel=0";
    } else {
        // Fallback search for any other movie
        videoUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(movieTitle + " official trailer")}&autoplay=1`;
    }

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-8 right-8 text-white/50 hover:text-yellow-500 transition-all hover:scale-110"
            >
                <X size={48} />
            </button>

            {/* Video Container - Responsive and high-end */}
            <div className="w-full max-w-6xl aspect-video px-4 shadow-[0_0_100px_rgba(234,179,8,0.15)]">
                <iframe
                    className="w-full h-full rounded-2xl border border-white/10 shadow-2xl"
                    src={videoUrl}
                    title={`${movieTitle} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Background Label - Keeps the context visible */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 font-black uppercase tracking-[1em] text-[10px]">
                Now Playing: {movieTitle}
            </div>
        </div>
    );
}