import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4-kilj9A_bZOMTkWWbrwAzhD3lcOQWiY",
  authDomain: "unitutor-f0c21.firebaseapp.com",
  projectId: "unitutor-f0c21",
  storageBucket: "unitutor-f0c21.appspot.com",
  messagingSenderId: "1030142318033",
  appId: "1:1030142318033:web:581b7fb9ec412406efbcf0",
  measurementId: "G-V9L8BKF2P9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, analytics, auth};