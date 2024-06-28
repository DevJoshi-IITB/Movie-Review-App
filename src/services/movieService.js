import axios from 'axios';

const API_URL = 'http://localhost:3001/movies'


const getMovies = async () => {
    // const response = await tmdbAxios.get('/movie/popular');
    // return response.data.results;
    try {
        const response = await fetch(API_URL);
        const movies = response.json();
        return movies;
    } catch (err) {
        console.error(err);
    }
};

const getMovie = async (id) => {
    // const response = await tmdbAxios.get(`/movie/${id}`);
    // return response.data;
    try {
        const response = await fetch(`${API_URL}/${String(id)}`)
        const movie = response.json();
        return movie;
    } catch (err) {
        console.error(err);
    }
};

const addMovie = async (movie) => {
    // const response = await tmdbAxios.post(`/movie`, movie);
    // return response.data;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
        const newMovie = await response.json();
        return newMovie;
    } catch (err) {
        console.error(err);
    }
};

const updateMovie = async (id, movie) => {
    // const response = await tmdbAxios.put(`/movie/${id}`, movie);
    // return response.data;
    try {
        const response = await fetch(`${API_URL}/${String(id)}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
        const updatedMovie = await response.json();
        return updatedMovie;
    } catch (err) {
        console.error(err);
    }
};

const deleteMovie = async (id) => {
    // const response = await tmdbAxios.delete(`/movie/${id}`);
    // return response.data;
    try {
        const response = await fetch(`${API_URL}/${String(id)}`, {
            method: 'DELETE',
        });
        return response.ok;
    } catch (err) {
        console.error(err);
    }
};

export { getMovies, getMovie, addMovie, updateMovie, deleteMovie };
