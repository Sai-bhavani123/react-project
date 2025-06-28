import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
const firebaseConfig = {
    apiKey: "AIzaSyA0ZlSr-nBzVlyyo5YimAzYpbo427dVUA8",
    authDomain: "virtualclassroom-54741.firebaseapp.com",
    projectId: "virtualclassroom-54741",
    storageBucket: "virtualclassroom-54741.firebasestorage.app",
    messagingSenderId: "732371078414",
    appId: "1:732371078414:web:4daab1df7eb72a0a521b5f",
    measurementId: "G-NW786P0XZR"
  };

  const app = initializeApp(firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
  export const auth = getAuth(app);
  export const db = getFirestore(app); // <-- Add this export
  export const storage = getStorage(app); 