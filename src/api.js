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