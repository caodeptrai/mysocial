// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD37pb5ZI2K4qFXNq-fahg9dNrwnr7XaR4",
  authDomain: "mysocial-124b9.firebaseapp.com",
  projectId: "mysocial-124b9",
  storageBucket: "mysocial-124b9.appspot.com",
  messagingSenderId: "209095404557",
  appId: "1:209095404557:web:f097d397e10be7ef17f944"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
