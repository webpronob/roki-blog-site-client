import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPNyprU8FCualHmI3e_AfD9YlmG6hrHrI",
    authDomain: "blogsite-291be.firebaseapp.com",
    projectId: "blogsite-291be",
    storageBucket: "blogsite-291be.appspot.com",
    messagingSenderId: "186533105701",
    appId: "1:186533105701:web:916ae41891b5e6ccaeefcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;