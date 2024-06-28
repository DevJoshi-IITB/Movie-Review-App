import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, auth } from '../../services/authService';

const Header = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    useEffect(() => {
        const checkUser = () => {
            auth.onAuthStateChanged((currentUser) => {
                if (currentUser) {
                    setCurrentUser(currentUser);
                } else {
                    navigate('/login');
                }
                setIsAdmin(currentUser && currentUser.email === 'devrjoshi15@gmail.com');
            });
        };
        checkUser();
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ">
                        {currentUser ? (
                            <>
                                <li className="nav-item mr-3"><strong>Welcome, {currentUser.displayName}    </strong></li>
                                <li className="nav-item"><Link className="nav-link mx-2" to="/movies">Movies</Link></li>
                                {isAdmin && (
                                    <li className="nav-item"><Link className="nav-link mx-2" to="/add-movie">Add New Movie</Link></li>
                                )}
                                <li className="nav-item"><button className="btn btn-outline-secondary mx-2" onClick={handleLogout}>Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link mx-2" to="/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link mx-2" to="/signup">Signup</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
