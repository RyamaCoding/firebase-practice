// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSGzrHwlxI93yb4Qe43ugy3wgexxJec8M",
  authDomain: "fir-practice-ed432.firebaseapp.com",
  projectId: "fir-practice-ed432",
  storageBucket: "fir-practice-ed432.appspot.com",
  messagingSenderId: "220089998255",
  appId: "1:220089998255:web:dec2c06ea59ba52443ad5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();