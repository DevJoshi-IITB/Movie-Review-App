import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MovieListPage from './pages/MovieListPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import AddEditMoviePage from './pages/AddEditMoviePage';
import Header from './components/Layout/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<MovieListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/movies" exact element={<MovieListPage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/add-movie" element={<AddEditMoviePage />} />
        <Route path="/edit-movie/:id" element={<AddEditMoviePage />} />
      </Routes>
    </Router>
  );
};

export default App;

