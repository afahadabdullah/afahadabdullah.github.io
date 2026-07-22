// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js';
// import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js'
// Replace with your Firebase project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2L31O2VtvaXWe-ktH77iMagARxdNqB88",
  authDomain: "climpy-e9dab.firebaseapp.com",
  projectId: "climpy-e9dab",
  storageBucket: "climpy-e9dab.appspot.com",
  messagingSenderId: "194247994975",
  appId: "1:194247994975:web:422d737a1bd25c0a4335ea",
  measurementId: "G-0R00GJTLX5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Check authentication state on each page
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in, you can access user information like user.displayName, user.email, etc.
    console.log("User is signed in");
  } else {
    // User is signed out
    console.log("User is signed out");
  }
});
