// Firebase initialization and auth setup for Casaamigo login
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import 'dotenv/config'; // Load .env variables

// Firebase configuration from .env - all vars secured
const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app with config
const app = initializeApp(firebaseConfig);

// Get auth instance for login operations
export const auth = getAuth(app);

// Google provider for social login
export const googleProvider = new GoogleAuthProvider();