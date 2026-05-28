import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZYCGJNw1U58FG3bjRo87RLwJcerAGZi0",
  authDomain: "saw-project-d2fad.firebaseapp.com",
  projectId: "saw-project-d2fad",
  storageBucket: "saw-project-d2fad.firebasestorage.app",
  messagingSenderId: "406220704198",
  appId: "1:406220704198:web:0ab51a2c2cf51676f88ac7",
  measurementId: "G-5NCW7HZ9DJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);