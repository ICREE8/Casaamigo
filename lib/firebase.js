// Firebase initialization and auth setup for Casaamigo login
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration from realstateauth-f010c project
const firebaseConfig = {
  apiKey: "AIzaSyC6arN6-pNNVk7wsz6MMNNIiJvIApEyccM",
  authDomain: "realstateauth-f010c.firebaseapp.com",
  projectId: "realstateauth-f010c",
  storageBucket: "realstateauth-f010c.appspot.com",
  messagingSenderId: "953273538248",
  appId: "1:953273538248:web:YOUR_APP_ID" // Replace with actual App ID from Firebase Console > General > Your Apps
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get auth instance for login operations
export const auth = getAuth(app);

// Google provider for social login
export const googleProvider = new GoogleAuthProvider();