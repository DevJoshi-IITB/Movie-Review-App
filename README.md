# Movie Review Application

This is a React-based Movie Review Application that allows users to view, add, and manage movie reviews. The application features user authentication, movie listing, review submission, and review management. Admin users have additional privileges to add, edit, and delete movies.

## Features

1. **User Authentication**

    - Login and Signup functionality.
    - Admin and normal user roles.
    - Admin user is predefined in the system.

2. **Movie Listing Page**

    - Displays a list of movies with titles, release dates, and ratings.
    - Normal users can view movie details and read reviews.
    - Admin users can add, edit, and delete movies.

3. **Add/Edit Movie Page (Admin Only)**

    - Form for adding or editing movie details.
    - Fields: Title, Release Date, Genre, Rating, Poster Image.
    - Redirects to the Movie Listing Page after submission.

4. **Movie Details Page**

    - Displays detailed information about a selected movie.
    - Lists all reviews for the movie.
    - Allows logged-in users to submit reviews.

5. **Review Management**
    - Users can view, edit, and delete their own reviews.
    - Admin users can view and delete any review.
