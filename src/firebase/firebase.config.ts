// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcQ4TcESEs5lukxeFTOCeYg09SADMPLdg",
  authDomain: "wed-words.firebaseapp.com",
  projectId: "wed-words",
  storageBucket: "wed-words.appspot.com",
  messagingSenderId: "223587103029",
  appId: "1:223587103029:web:d2c3da43f2fbccfc70dc7c",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
