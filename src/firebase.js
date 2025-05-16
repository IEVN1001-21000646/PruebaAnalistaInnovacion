
import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCUjuMaE2iZZyjJTeYfy89l4GOJae9OCwM",
  authDomain: "innova-tube-23d89.firebaseapp.com",
  projectId: "innova-tube-23d89",
  storageBucket: "innova-tube-23d89.firebasestorage.app",
  messagingSenderId: "1058711288318",
  appId: "1:1058711288318:web:995f128b64ab8adeba28af"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);