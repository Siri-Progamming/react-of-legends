// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIc1a3zljORz47-Zq-gNasAVD8Tb_rZy0",
    authDomain: "loreact-666d4.firebaseapp.com",
    projectId: "loreact-666d4",
    storageBucket: "loreact-666d4.appspot.com",
    messagingSenderId: "45002453253",
    appId: "1:45002453253:web:8ba54b97c54044b241076c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
export const db = getFirestore(app)
// Get a reference to the auth service
export const auth = getAuth(app);
