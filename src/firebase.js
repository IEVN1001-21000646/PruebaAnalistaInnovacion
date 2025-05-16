// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUjuMaE2iZZyjJTeYfy89l4GOJae9OCwM",
  authDomain: "innova-tube-23d89.firebaseapp.com",
  projectId: "innova-tube-23d89",
  storageBucket: "innova-tube-23d89.firebasestorage.app",
  messagingSenderId: "1058711288318",
  appId: "1:1058711288318:web:995f128b64ab8adeba28af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);