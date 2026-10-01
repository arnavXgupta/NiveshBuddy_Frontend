import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import AuthForm from "./AuthForm";

const SignUp = () => (
  <AuthForm mode="signup" submit={(email, password) => createUserWithEmailAndPassword(auth, email, password)} />
);

export default SignUp;
