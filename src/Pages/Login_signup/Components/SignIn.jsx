import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import AuthForm from "./AuthForm";

const SignIn = () => (
  <AuthForm mode="signin" submit={(email, password) => signInWithEmailAndPassword(auth, email, password)} />
);

export default SignIn;
