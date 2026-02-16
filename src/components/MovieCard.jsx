export default function MovieCard({ movie }) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
            {/* Handle missing posters with a placeholder */}
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
                alt={movie.Title}
                className="w-full h-80 object-cover"
            />
            <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-white truncate">{movie.Title}</h3>
                <p className="text-yellow-500">{movie.Year}</p>
            </div>
        </div>
    );
}