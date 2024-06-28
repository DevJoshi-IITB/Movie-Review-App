import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const signup = async (username, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await userCredential.user.updateProfile({ displayName: username });
    return userCredential;
};

const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

const logout = () => signOut(auth);

const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};

export { signup, login, logout, googleLogin, auth };
