import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjAicvZJmnSUJ7hmht4MWLxFqFlRLbg7w",
  authDomain: "zephyr-project-f2ca7.firebaseapp.com",
  databaseURL: "https://zephyr-project-f2ca7.firebaseio.com",
  projectId: "zephyr-project-f2ca7",
  storageBucket: "zephyr-project-f2ca7.appspot.com",
  messagingSenderId: "730197660354",
  appId: "1:730197660354:web:343973528bf917e73de15b",
  measurementId: "G-61JYMCWM2V",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export { firebase };
