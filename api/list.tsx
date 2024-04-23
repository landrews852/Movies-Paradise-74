import axios from 'axios';

const API_KEY = 'YOUR_OMDB_API_KEY';

async function searchMoviesByTitle(title: string) {
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);
        return response.data;
        } catch (error) {
        console.error('Error searching movies by title:', error);
        throw error;
        }
    }

    async function getMovieDetailsById(id: string) {
        try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
        return response.data;
        } catch (error) {
        console.error('Error getting movie details by ID:', error);
        throw error;
        }
    }

    async function getMoviePosterById(id: string) {
        try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
        return response.data.Poster;
        } catch (error) {
        console.error('Error getting movie poster by ID:', error);
        throw error;
        }
    }

    export { searchMoviesByTitle, getMovieDetailsById, getMoviePosterById };