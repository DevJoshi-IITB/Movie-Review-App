import React, { useState, useEffect } from 'react';
import { signup, auth } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            auth.onAuthStateChanged((currentUser) => {
                if (currentUser) {
                    setCurrentUser(currentUser);
                } else {
                    navigate('/login');
                }
                if (currentUser) navigate('/movies');
            });
        };
        checkUser();
    }, [])

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            await signup(username, email, password);
            navigate('/login');
        } catch (error) {
            console.error(error);
            navigate('/login');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSignup}>
                        <h2 className="mb-4">Signup</h2>
                        <div className="mb-3">
                            <label className="form-label">Username:</label>
                            <input type="text" value={username} className="form-control" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input type="password" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password:</label>
                            <input type="password" value={confirmPassword} className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
