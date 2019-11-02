const express = require('express')
const app = express()

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyBHn7CvUWOlsb8bcllmJf26oKuYlg-8iD0",
    authDomain: "myratracker.firebaseapp.com",
    databaseURL: "https://myratracker.firebaseio.com",
    projectId: "myratracker",
    storageBucket: "myratracker.appspot.com",
    messagingSenderId: "963863783283",
    appId: "1:963863783283:web:a7870808c47d3c64ad8706",
    measurementId: "G-H29MTQ7S45"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const firebase = require('firebase');
const firebaseui = require('firebaseui');

// Firebase end 

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`listening on port ${port}`))
app.use(express.static('public'))
app.use(express.json({ limit: "100kb" }));
