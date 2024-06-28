import { useState, useEffect } from 'react';
import { login, googleLogin, auth } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState();

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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/movies');
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            navigate('/movies');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-auto mx-auto">
                <div className="col-md-6">
                    <form onSubmit={handleLogin}>
                        <h2 className="mb-4">Login</h2>
                        <div className="mb-3">
                            <label className="form-label">Email:
                                <input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:
                                <input type="password" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">Login</button>
                    </form>
                    <button className="btn btn-secondary " onClick={handleGoogleLogin} style={{
                        'background-image': `url(${process.env.PUBLIC_URL}/images/google.png)`,
                        'border-radius': '20px',
                        'background-size': 'cover',
                        'background-position': 'center',
                        'width': '180px', 'height': '40px',
                        'transition': 'background-color .218s, border-color .218s, box-shadow .218s',
                    }}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default Login;
