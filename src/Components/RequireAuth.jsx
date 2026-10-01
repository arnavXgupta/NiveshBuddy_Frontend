import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../authState";

// Sends signed-out visitors to Sign in, then back to where they were going.
const RequireAuth = ({ children }) => {
  const [user, loading] = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div role="status" style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "rgb(var(--muted))" }}>
        Loading your account…
      </div>
    );
  }
  if (!user) return <Navigate to="/SignIn" replace state={{ from: location.pathname }} />;
  return children;
};

export default RequireAuth;
