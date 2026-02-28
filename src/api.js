import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (title) => {
    try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${title}`);
        return response.data; // This will return { Search: [...], totalResults: "...", Response: "True" }
    } catch (error) {
        console.error("API Error:", error);
        return { Response: "False", Error: "Network Error" };
    }
};

export const getPopularMovies = async () => {
    const searchTerms = ['action', 'adventure', 'thriller', 'sci-fi', 'drama', 'horror'];
    const results = [];

    try {
        for (const term of searchTerms) {
            const data = await searchMovies(term);
            if (data.Search) {
                results.push(...data.Search.slice(0, 2));
            }
        }
    } catch (error) {
        console.error("Error fetching popular movies:", error);
    }

    return results.slice(0, 12);
};

export const getMoviesByGenre = async (genre) => {
    try {
        const response = await searchMovies(genre);
        return response.Search || [];
    } catch (error) {
        console.error("Error fetching movies by genre:", error);
        return [];
    }
};

export const getPopularSeries = async () => {
    const searchTerms = ['series', 'show', 'drama series', 'tv series', 'thriller series'];
    const results = [];

    try {
        for (const term of searchTerms) {
            const data = await searchMovies(term);
            if (data.Search) {
                results.push(...data.Search.slice(0, 2));
            }
        }
    } catch (error) {
        console.error("Error fetching popular series:", error);
    }

    return results.slice(0, 12);
};