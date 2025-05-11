// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGXrl2nOvLW_6XdhkewbqCRG9UujCTqnc",
  authDomain: "login-auth-dbd91.firebaseapp.com",
  projectId: "login-auth-dbd91",
  storageBucket: "login-auth-dbd91.firebasestorage.app",
  messagingSenderId: "102396797693",
  appId: "1:102396797693:web:40c819969f7022ae271494"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;