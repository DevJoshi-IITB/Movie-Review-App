import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDi6KjlXP2ocXuUTrml99KYiayQ6BFUcN0",
    authDomain: "movie-review-app-cb1e3.firebaseapp.com",
    projectId: "movie-review-app-cb1e3",
    storageBucket: "movie-review-app-cb1e3.appspot.com",
    messagingSenderId: "627908731855",
    appId: "1:627908731855:web:eee309d6079d9f671d68ba",
    measurementId: "G-QDK3BXSCBP"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth }