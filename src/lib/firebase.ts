// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For security, you should move this to environment variables for production
const firebaseConfig = {
  apiKey: "AIzaSyBQkjNKhTbiwe96ng9N5IvlD0Tyj_QRn6w",
  authDomain: "healthflow-ai-ecn1x.firebaseapp.com",
  projectId: "healthflow-ai-ecn1x",
  storageBucket: "healthflow-ai-ecn1x.appspot.com",
  messagingSenderId: "214514185368",
  appId: "1:214514185368:web:b6e145eca2094538338ced"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
