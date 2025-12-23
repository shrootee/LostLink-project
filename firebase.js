// Import the functions you need from the SDKs you need
import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1B4cZ9gufx3EKLvTTFlLE_2l2zlWUsNM",
  authDomain: "lostlink-1.firebaseapp.com",
  projectId: "lostlink-1",
  storageBucket: "lostlink-1.appspot.com",
  messagingSenderId: "142223143888",
  appId: "1:142223143888:web:bf6dbdc0b9785eb8c1bfd5",
  measurementId: "G-8P24MYY36F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

import { getFirestore } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const db = getFirestore(app);
