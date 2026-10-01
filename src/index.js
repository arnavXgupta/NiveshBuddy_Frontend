import React from "react";
import ReactDOM from "react-dom/client";
// Self-hosted fonts: no third-party request reveals who visited
import "@fontsource/instrument-serif/400.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "@fontsource/ibm-plex-mono/400.css";
import "./styles/tokens.css";
import "./index.css";
import App from "./App";

// Tap feedback: a ripple on every .btn, skipped when reduced motion is on
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
document.addEventListener("pointerdown", (e) => {
  const b = e.target.closest?.(".btn");
  if (!b || b.disabled || reduceMotion.matches) return;
  const r = b.getBoundingClientRect();
  const size = Math.max(r.width, r.height) * 2;
  const dot = document.createElement("span");
  dot.className = "ripple";
  dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
  b.appendChild(dot);
  dot.animate([{ transform: "scale(0.1)", opacity: 1 }, { transform: "scale(1)", opacity: 0 }], {
    duration: 520,
    easing: "cubic-bezier(0.23, 1, 0.32, 1)",
  }).onfinish = () => dot.remove();
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
