export default function MovieCard({ movie }) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300">
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
                alt={movie.Title}
                className="w-full h-80 object-cover"
            />
            <div className="p-4">
                <h3 className="text-white font-bold truncate">{movie.Title}</h3>
                <p className="text-yellow-500 text-sm">{movie.Year}</p>
            </div>
        </div>
    );
}