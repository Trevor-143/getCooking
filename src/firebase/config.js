// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDDtiEiQF9Syb0oA18F5JD7aaVn9tcQhzA",
  authDomain: "get-cooking-5737d.firebaseapp.com",
  projectId: "get-cooking-5737d",
  storageBucket: "get-cooking-5737d.appspot.com",
  messagingSenderId: "1010433368835",
  appId: "1:1010433368835:web:bf97114295d0877da67f36",
  measurementId: "G-XPEL2E3VK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const DataStore = getFirestore(app)
const Authenticate = getAuth(app)

export {
    DataStore,
    Authenticate
}