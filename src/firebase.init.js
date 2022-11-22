// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD16OQHbzScot9p2XzeEBjsDNGTCCS5s0k",
  authDomain: "email-password-auth-a9bb1.firebaseapp.com",
  projectId: "email-password-auth-a9bb1",
  storageBucket: "email-password-auth-a9bb1.appspot.com",
  messagingSenderId: "213757828325",
  appId: "1:213757828325:web:1f534d023777d397b0480c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;