// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// initializeAuth (not getAuth) leaves out the popup/redirect sign-in code, which nothing uses
import { initializeAuth, indexedDBLocalPersistence, browserLocalPersistence } from "firebase/auth";
// import { signInWithPhoneNumber } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDioczyUBnGesiuPRR2nhrqIZasNTITCtE",
//   authDomain: "niveshbuddy-7351d.firebaseapp.com",
//   projectId: "niveshbuddy-7351d",
//   storageBucket: "niveshbuddy-7351d.appspot.com",
//   messagingSenderId: "1075869404000",
//   appId: "1:1075869404000:web:3eb17f95a6285ac6c6ec05",
//   measurementId: "G-PJ09B6LGC9"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDTaUa4JPZFzlGU31G1PW39NtGgOIQreuk",
  authDomain: "loginauth-ba9ca.firebaseapp.com",
  projectId: "loginauth-ba9ca",
  storageBucket: "loginauth-ba9ca.appspot.com",
  messagingSenderId: "941265217198",
  appId: "1:941265217198:web:e10f63dea30e21e8aeaf3f",
  measurementId: "G-P94G5BYK9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence],
});
// Google sign-in: add `popupRedirectResolver: browserPopupRedirectResolver` above
// and use signInWithPopup(auth, new GoogleAuthProvider()).


// const phoneNumber = getPhoneNumberFromUserInput();

// signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//     .then((confirmationResult) => {
//       // SMS sent. Prompt user to type the code from the message, then sign the
//       // user in with confirmationResult.confirm(code).
//       window.confirmationResult = confirmationResult;
//       // ...
//     }).catch((error) => {
//       // Error; SMS not sent
//       // ...
//     });

// const code = getCodeFromUserInput();
// confirmationResult.confirm(code).then((result) => {
//   // User signed in successfully.
//   const user = result.user;
//   // ...
// }).catch((error) => {
//   // User couldn't sign in (bad verification code?)
//   // ...
// });

export { onAuthStateChanged } from "firebase/auth";
