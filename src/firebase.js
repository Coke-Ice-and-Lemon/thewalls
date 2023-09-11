// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvERiUcByAR-VvAuUMJBX8OD-e8ldSzsg",
  authDomain: "apollomusic-dc837.firebaseapp.com",
  projectId: "apollomusic-dc837",
  storageBucket: "apollomusic-dc837.appspot.com",
  messagingSenderId: "366837073068",
  appId: "1:366837073068:web:a69e982149b37e7e388b09"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const storage = firebase.storage();

export default firebase;