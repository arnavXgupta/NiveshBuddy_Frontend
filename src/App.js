import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes, useLocation } from "react-router-dom";
import { LazyMotion, MotionConfig } from "framer-motion";
import HomePage from "./Pages/HomePage/HomePage";
import RequireAuth from "./Components/RequireAuth";
import Navbar from "./Components/Navbar/Navbar";

const loadMotionFeatures = () => import("./motionFeatures").then((mod) => mod.default);

// Each page past the home page loads as its own chunk, on demand
const About = lazy(() => import("./Pages/About Us/About"));
const SignUp = lazy(() => import("./Pages/Login_signup/Components/SignUp"));
const SignIn = lazy(() => import("./Pages/Login_signup/Components/SignIn"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));

// New page: start at the top, or at #section when the link has one
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

const NotFound = () => (
  <>
    <Navbar />
    <main className="wrap" style={{ padding: "96px 0", display: "grid", gap: 16, justifyItems: "start" }}>
      <p className="label">404</p>
      <h1 className="serif" style={{ fontSize: "clamp(44px, 6vw, 72px)", lineHeight: 1 }}>Page not found.</h1>
      <p style={{ color: "rgb(var(--muted))" }}>The page you were looking for doesn't exist.</p>
      <Link to="/" className="btn">Back to home</Link>
    </main>
  </>
);

function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <Router>
          <ScrollManager />
          <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/About" element={<About />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route
                path="/Dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
