import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3X1diBFZPzZZpEs8zaJLAFIQwmBHRsfM",
  authDomain: "crud-react-firebase-8f4ee.firebaseapp.com",
  databaseURL: "https://crud-react-firebase-8f4ee.firebaseio.com",
  projectId: "crud-react-firebase-8f4ee",
  storageBucket: "crud-react-firebase-8f4ee.appspot.com",
  messagingSenderId: "232074208526",
  appId: "1:232074208526:web:5987846963050ccd03235f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export { firebase };
