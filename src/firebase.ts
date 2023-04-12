// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let config = {
  apiKey: "AIzaSyCl40DgNhLLF0u3y0IsCtYxt9rZ-M0sNe0",
  authDomain: "demo1-eb438.firebaseapp.com",
  databaseURL: "https://demo1-eb438-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "demo1-eb438",
  storageBucket: "demo1-eb438.appspot.com",
  messagingSenderId: "411462337774",
  appId: "1:411462337774:web:de7e07816b62516b2e1fff"
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase.database();
