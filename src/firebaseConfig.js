// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'firebase/app';

// Add the Firebase products that you want to use
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3FtFh3oi--pO79NfbgalZUrmTFUBkh9c",
  authDomain: "tic-tac-toe-dfe95.firebaseapp.com",
  projectId: "tic-tac-toe-dfe95",
  appId: "1:79741017545:web:20df71cf95d9d45bcc5c18",
  measurementId: "G-MB5MH6DHJ2"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };