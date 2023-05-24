// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyClIPc_o1tx8sNmmN51V3F24jVxfLRCG4E",
//   authDomain: "neyo-cyber.firebaseapp.com",
//   projectId: "neyo-cyber",
//   storageBucket: "neyo-cyber.appspot.com",
//   messagingSenderId: "910381485620",
//   appId: "1:910381485620:web:6d6b3441c09f842e25c461",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzLhsBj0wOqGtbkDnEeJr93P2jEJBzewY",
  authDomain: "realtor-react-9e360.firebaseapp.com",
  projectId: "realtor-react-9e360",
  storageBucket: "realtor-react-9e360.appspot.com",
  messagingSenderId: "53998883249",
  appId: "1:53998883249:web:5ecd2ba7bda74e88902d90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
