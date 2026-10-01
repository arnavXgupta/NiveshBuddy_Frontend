// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// initializeAuth (not getAuth) leaves out the popup/redirect sign-in code, which nothing uses
import { initializeAuth, indexedDBLocalPersistence, browserLocalPersistence } from "firebase/auth";
// import { signInWithPhoneNumber } from "firebase/auth";

// Values come from .env.local (gitignored); see .env.example for the names.
// Note: Firebase web config is shipped to every browser in the built JS, so it is not a
// secret. Protect the project with Auth settings, security rules and API-key restrictions.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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
