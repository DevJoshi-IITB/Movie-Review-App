import axios from 'axios';

const API_URL = 'http://localhost:3001/reviews';


const getMovieReviews = async (movieId) => {
    try {
        const response = await fetch(`${API_URL}?movieId=${String(movieId)}`);
        const reviews = await response.json();
        return reviews;
    }
    catch (error) {
        console.error(error);
    }
};

const addReview = async (review) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });
        const newReview = await response.json();
        return newReview;
    } catch (err) {
        console.error(err);
    }
};

const updateReview = async (reviewId, review) => {
    try {
        const response = await fetch(`${API_URL}/${String(reviewId)}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });
        const updatedReview = await response.json();
        return updatedReview;
    }
    catch (error) {
        console.error(error);
    }
};

const deleteReview = async (reviewId) => {
    try {
        await fetch(`${API_URL}/${String(reviewId)}`, {
            method: 'DELETE'
        });
    }
    catch (error) {
        console.error(error);
    }
};

export { getMovieReviews, addReview, updateReview, deleteReview };
