// import firebase from 'firebase/app';
// import 'firebase/firestore';

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC18oHvjnKRLJ4Ii_Qpc6IAPwkn3Bbw4Mo",
//   authDomain: "istqb-db.firebaseapp.com",
//   projectId: "istqb-db",
//   storageBucket: "istqb-db.appspot.com",
//   messagingSenderId: "793612916034",
//   appId: "1:793612916034:web:8f7a6522c0fedd56a7a4db",
//   measurementId: "G-6VZWJ8KCPF"
// };

// const app = firebase.initializeApp(firebaseConfig);

// // Agora você pode usar 'app' para acessar os recursos do Firebase, como Firestore
// const firestore = app.firestore();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC18oHvjnKRLJ4Ii_Qpc6IAPwkn3Bbw4Mo",
  authDomain: "istqb-db.firebaseapp.com",
  projectId: "istqb-db",
  storageBucket: "istqb-db.appspot.com",
  messagingSenderId: "793612916034",
  appId: "1:793612916034:web:8f7a6522c0fedd56a7a4db",
  measurementId: "G-6VZWJ8KCPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);