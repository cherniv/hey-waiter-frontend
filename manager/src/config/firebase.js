import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBtE7G1ffhIyHMRDyFlRmct6JwNrdeeJfQ",
  authDomain: "hey-waiter-9d976.firebaseapp.com",
  databaseURL: "https://hey-waiter-9d976.firebaseio.com",
  projectId: "hey-waiter-9d976",
  storageBucket: "hey-waiter-9d976.appspot.com",
  messagingSenderId: "149941741487",
  appId: "1:149941741487:web:df600f6a65a742be38715a",
  measurementId: "G-4D536LE3NF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();