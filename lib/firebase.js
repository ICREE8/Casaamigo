// Firebase initialization and auth setup for Casaamigo login
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration from realstateauth-f010c project - web app registered
const firebaseConfig = {
  apiKey: "AIzaSyC6arN6_pNNVk7wsz6MMNNIiJvIApEyccM",
  authDomain: "realstateauth-f010c.firebaseapp.com",
  projectId: "realstateauth-f010c",
  storageBucket: "realstateauth-f010c.appspot.com", // Fixed typo: 'firebasestorage.app' → 'appspot.com'
  messagingSenderId: "953273538248",
  appId: "1:953273538248:web:b51a5bf9001be36a7377fd",//
  measurementId: "G-0BL41XK8XP" // Optional, included for analytics if needed later
};

// Initialize Firebase app with config
const app = initializeApp(firebaseConfig);

// Get auth instance for login operations
export const auth = getAuth(app);

// Google provider for social login
export const googleProvider = new GoogleAuthProvider();