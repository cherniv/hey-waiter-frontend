import firebase from 'firebase/app';
import "firebase/analytics";

export const projectId = "hey-waiter-9d976";
const firebaseConfig = {
  apiKey: "AIzaSyBtE7G1ffhIyHMRDyFlRmct6JwNrdeeJfQ",
  authDomain: "waiter.live",
  databaseURL: "https://hey-waiter-9d976.firebaseio.com",
  projectId,
  storageBucket: "hey-waiter-9d976.appspot.com",
  messagingSenderId: "149941741487",
  appId: "1:149941741487:web:df600f6a65a742be38715a",
  measurementId: "G-4D536LE3NF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseConfig;