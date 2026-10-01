import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { m } from "framer-motion";
import Logo from "../../../Components/Logo/Logo";
import ThemeToggle from "../../../Components/ThemeToggle/ThemeToggle";
import classes from "../Styles/Auth.module.css";

// Firebase error codes → something a person can act on
const MESSAGES = {
  "auth/invalid-credential": "That email and password don't match. Check them and try again.",
  "auth/wrong-password": "That email and password don't match. Check them and try again.",
  "auth/user-not-found": "There's no account with that email. Create one instead?",
  "auth/invalid-email": "That doesn't look like an email address.",
  "auth/email-already-in-use": "An account with this email already exists. Sign in instead.",
  "auth/weak-password": "Use a password of at least 6 characters.",
  "auth/missing-password": "Enter your password.",
  "auth/too-many-requests": "Too many attempts. Wait a minute, then try again.",
  "auth/network-request-failed": "Couldn't reach the server. Check your connection and try again.",
};
const messageFor = (code) => MESSAGES[code] ?? "Something went wrong. Please try again.";

/**
 * mode: "signin" | "signup"
 * submit(email, password): returns a promise from Firebase auth
 */
const AuthForm = ({ mode, submit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const isSignUp = mode === "signup";
  const next = location.state?.from || "/Dashboard";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await submit(email.trim(), password);
      navigate(next, { replace: true });
    } catch (err) {
      setError(messageFor(err.code));
      setBusy(false);
    }
  };

  return (
    <div className={classes.page}>
      <header className={classes.top}>
        <Link to="/" className={classes.brand}>
          <Logo className={classes.logo} />
        </Link>
        <ThemeToggle compact />
      </header>

      <main className={classes.main}>
        <m.form
          className={`card ${classes.card}`}
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          aria-labelledby="auth-title"
        >
          <div className={classes.head}>
            <h1 id="auth-title" className="serif">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p>{isSignUp ? "Sign up to start backtesting for free." : "Sign in to your account."}</p>
          </div>

          <div className="fieldset">
            <label htmlFor="email-address">Email</label>
            <input
              className="field"
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={error ? "true" : undefined}
            />
          </div>

          <div className="fieldset">
            <label htmlFor="password">Password</label>
            <input
              className="field"
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              minLength={isSignUp ? 6 : undefined}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={error ? "true" : undefined}
              aria-describedby={isSignUp ? "password-hint" : undefined}
            />
            {isSignUp && (
              <span id="password-hint" className="hint">
                At least 6 characters.
              </span>
            )}
          </div>

          <p className={`error-text ${classes.error}`} role="alert">
            {error}
          </p>

          <button type="submit" className="btn lg" disabled={busy}>
            {busy ? (isSignUp ? "Creating account…" : "Signing in…") : isSignUp ? "Create account" : "Sign in"}
          </button>

          <p className={classes.switch}>
            {isSignUp ? "Already have an account? " : "New to NiveshBuddy? "}
            <Link to={isSignUp ? "/SignIn" : "/SignUp"} state={location.state}>
              {isSignUp ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </m.form>
      </main>
    </div>
  );
};

export default AuthForm;
