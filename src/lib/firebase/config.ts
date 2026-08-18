// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration using environment variables securely
const firebaseConfig = {
  apiKey: process.env['NEXT_PUBLIC_FIREBASE_API_KEY'] as string,
  authDomain: process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'] as string,
  projectId: process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] as string,
  storageBucket: process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'] as string,
  messagingSenderId: process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'] as string,
  appId: process.env['NEXT_PUBLIC_FIREBASE_APP_ID'] as string,
  measurementId: process.env['NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'] as string
};

// Initialize Firebase securely (prevent multiple initializations during hot reloads)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Initialize Analytics conditionally (it only works in browser environments in production)
let analytics;
if (typeof window !== "undefined" && process.env.NODE_ENV === "production" && firebaseConfig.measurementId) {
  isSupported().then((yes) => yes && (analytics = getAnalytics(app)));
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };
