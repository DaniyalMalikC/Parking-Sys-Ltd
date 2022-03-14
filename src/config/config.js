import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Firebase Config
var firebaseConfig = {
  apiKey: "AIzaSyB3XlMOXuyFXDzTpmypr1vKB0Ub7lUSJtw",
  authDomain: "parking-tracking-system.firebaseapp.com",
  databaseURL: "https://parking-tracking-system.firebaseio.com",
  projectId: "parking-tracking-system",
  storageBucket: "parking-tracking-system.appspot.com",
  messagingSenderId: "541909889547",
  appId: "1:541909889547:web:8f915da239a4c541174d0e",
  measurementId: "G-PVGHKCP9JL",
};

// Initializing Firebase App
firebase.initializeApp(firebaseConfig);

export const GoogleFirebase = firebase;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
