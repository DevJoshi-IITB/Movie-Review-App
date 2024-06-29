import React, { useEffect, useState } from 'react';
import { getMovie } from '../../services/movieService';
import { addReview, deleteReview, getMovieReviews } from '../../services/reviewService';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../../services/authService';


function MovieDetailsPage() {
    const API_URL = 'http://localhost:3001/';
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' });
    const [currentUser, setCurrentUser] = useState(null);
    const [currUser, setCurrUser] = useState(null);

    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            const data = await getMovie(id);
            setMovie(data);
        };
        fetchMovie();

        const fetchReviews = async () => {
            const data = await getMovieReviews(String(id));
            setReviews(data);
        };
        fetchReviews();
        console.log(reviews)

        const checkUser = () => {
            auth.onAuthStateChanged((currentUser) => {
                if (currentUser) {
                    setCurrentUser(currentUser);
                } else {
                    navigate('/login');
                }
                setIsAdmin(currentUser.email === 'devrjoshi15@gmail.com');
                setCurrUser(currentUser.displayName);
            });
        };
        checkUser();



    }, [id]);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (currentUser) {
            const review = {
                id: String(reviews.length + 1),
                movieId: String(parseInt(id)),
                username: currentUser.displayName,
                rating: String(parseInt(newReview.rating)),
                comment: newReview.comment,
            };
            setReviews([...reviews, review]);
            addReview(review)
        } else {
            alert('You must be logged in to submit a review');
        }
    };

    const handleReviewDelete = (id) => {
        const data = JSON.parse(localStorage.getItem('reviews'));
        const updatedReviews = data.filter(m => m.id !== id);
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
        setReviews(reviews.filter((review) => review.id !== id));
        deleteReview(id);
    }
    return (
        (movie ? (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src={`${process.env.PUBLIC_URL}/images/${movie.poster}`} alt={movie.title} style={{ 'max-height': '480px' }} />
                    </div>
                    <div className="col-md-6">
                        <h2>{movie.title}</h2>
                        <p>Release Date: {movie.releaseDate}</p>
                        <p>Genre: {movie.genre}</p>
                        <p>Rating: {movie.rating}</p>
                    </div>
                </div>
                <h3 className="mt-4">Reviews</h3>
                {reviews.length ? reviews.map(review => (
                    <div key={review.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{review.username}</h5>
                            <p className="card-text">{review.comment}</p>
                            <p className="card-text"><small className="text-muted">Rating: {review.rating} stars</small></p>
                            {isAdmin || currUser === review.username ?
                                <button className="btn btn-danger" onClick={() => handleReviewDelete(review.id)}>Delete</button> : ""}
                        </div>
                    </div>
                )) : <div className="my-3">No Reviews Yet. Be the first one to leave a review.</div>}
                {currentUser && (
                    <form className="mt-4" onSubmit={handleReviewSubmit}>
                        <h3>Submit a Review</h3>
                        <div className="mb-3">
                            <label className="form-label">Rating</label>
                            <select className="form-select" value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })} required>
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Comment </label>
                            <textarea className="form-control" value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} required />

                        </div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>
                )}
            </div>
        ) : <p className='m-2'>Movie with {id} not found </p>)
    );
}

export default MovieDetailsPage;
