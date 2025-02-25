// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCWgoSVsmzYG9sD3SVOoMnB9HLs6aW88K0",
  authDomain: "techgestao-56108.firebaseapp.com",
  projectId: "techgestao-56108",
  storageBucket: "techgestao-56108.firebasestorage.app",
  messagingSenderId: "1070035644800",
  appId: "1:1070035644800:web:a43d310d74afda7e7b1165",
  measurementId: "G-JB6JCKFC02"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Exporta o db para que possa ser usado em outras partes do código
export { db };

