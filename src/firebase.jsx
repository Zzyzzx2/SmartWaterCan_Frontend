// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2MezLylbUWo9N8qqWhEETDlDf4GalISw",
  authDomain: "smart-bubble-top-server.firebaseapp.com",
  projectId: "smart-bubble-top-server",
  storageBucket: "smart-bubble-top-server.appspot.com",
  messagingSenderId: "1045500224068",
  appId: "1:1045500224068:web:d1946919ab242356c11211",
  measurementId: "G-KCSTCL2T1V",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const firestore = getFirestore(app);
