import React, { useState, useEffect } from 'react';
import { addMovie, getMovie, updateMovie } from '../../services/movieService';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from '../../services/authService';

const AddEditMovie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({ title: '', releaseDate: '', genre: '', rating: '', poster: '' });
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchMovie = async () => {
                const data = await getMovie(id);
                setMovie(data);
            };
            fetchMovie();
        }
        const checkUser = () => {
            auth.onAuthStateChanged((currentUser) => {
                if (currentUser) {
                    setCurrentUser(currentUser);
                } else {
                    navigate('/login');
                }
            });
        };
        checkUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleFileChange = (e) => {
        setMovie({ ...movie, poster: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateMovie(id, movie);
        } else {
            await addMovie(movie);
        }
        navigate('/movies');
    };

    return (
        <div className="container">
            <div className="container">
                <div className="row justify-content-center">
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <input type="text" name="title" className="form-control" value={movie.title} onChange={handleChange} placeholder="Title" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <input type="date" name="releaseDate" className="form-control" value={movie.releaseDate} onChange={handleChange} placeholder="Release Date" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <input type="text" name="genre" className="form-control" value={movie.genre} onChange={handleChange} placeholder="Genre" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <input type="number" name="rating" className="form-control" value={movie.rating} onChange={handleChange} placeholder="Rating" min="1" max="5" step="0.1" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <input type="file" name="poster" className="form-control" onChange={handleFileChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Upload</button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEditMovie;
