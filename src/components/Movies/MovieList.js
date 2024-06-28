import React, { useEffect, useState } from 'react';
import { getMovies, deleteMovie } from '../../services/movieService';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/authService';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies();
            console.log(data);
            setMovies(data);
        };

        const checkUser = () => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    setUser(user);
                } else {
                    navigate('/login');
                }
            });
        };

        fetchMovies();
        checkUser();
    }, [navigate]);

    const handleDelete = async (id) => {
        await deleteMovie(id);
        setMovies(movies.filter(movie => movie.id !== id));
    };

    return (
        <div className="container">
            <h1 className="my-4">Movies List</h1>
            {user && user.email === 'devrjoshi15@gmail.com' && (
                <button className="btn btn-primary mb-3" onClick={() => navigate('/add-movie')}>Add New Movie</button>
            )}
            <div className="row">
                {movies.map(movie => (
                    <div className="col-md-4" key={movie.id}>
                        <div className="card mb-3 p-2 mx-2">
                            <div className="card-body">
                                <h2 className="card-title">{movie.title}</h2>
                                <p className="card-text">Release Date: {movie.releaseDate}</p>
                                <p className="card-text">Rating: {movie.rating}</p>
                                {user && user.email === 'devrjoshi15@gmail.com' && (
                                    <>
                                        <button className="btn btn-warning mx-2" onClick={() => navigate(`/edit-movie/${movie.id}`)}>Edit</button>
                                        <button className="btn btn-danger " onClick={() => handleDelete(movie.id)}>Delete</button>
                                    </>
                                )}
                                <button className="btn btn-primary m-2" onClick={() => navigate(`/movies/${movie.id}`)}>View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
