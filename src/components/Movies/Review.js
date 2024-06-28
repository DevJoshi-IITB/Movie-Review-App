import React, { useState, useEffect } from 'react';
import { getMovieReviews, addReview, deleteReview, updateReview } from '../../services/reviewService';
import { auth } from '../../services/authService';
import { useParams } from 'react-router-dom';

const Review = ({ movieId }) => {
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState(null);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' });

    useEffect(() => {
        const fetchReviews = async () => {
            const data = await getMovieReviews(movieId);
            setReviews(data.results);
        };

        const checkUser = () => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    setUser(user);
                }
            });
        };

        fetchReviews();
        checkUser();
    }, [movieId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addReview(movieId, newReview);
        setNewReview({ rating: '', comment: '' });
        const data = await getMovieReviews(movieId);
        setReviews(data);
    };

    const handleDelete = async (reviewId) => {
        await deleteReview(reviewId);
        const data = await getMovieReviews(movieId);
        setReviews(data);
    };

    const handleUpdate = async (reviewId, updatedReview) => {
        await updateReview(reviewId, updatedReview);
        const data = await getMovieReviews(movieId);
        setReviews(data);
    };

    return (
        <div>
            {user && (
                <form onSubmit={handleSubmit}>
                    <input type="number" name="rating" value={newReview.rating} onChange={handleChange} placeholder="Rating" min="1" max="5" required />
                    <textarea name="comment" value={newReview.comment} onChange={handleChange} placeholder="Comment" required />
                    <button type="submit">Submit</button>
                </form>
            )}
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <p>{review.content}</p>
                        <p>Rating: {review.author_details.rating}</p>
                        <p>By: {review.author}</p>
                        {user && (user.uid === review.userId || user.email === 'admin@example.com') && (
                            <>
                                <button onClick={() => handleUpdate(review.id, { rating: review.rating, comment: review.comment })}>Edit</button>
                                <button onClick={() => handleDelete(review.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Review;
