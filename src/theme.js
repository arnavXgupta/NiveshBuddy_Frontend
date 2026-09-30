import { useCallback, useEffect, useState } from "react";

// Two first-class themes: "evening" (default) and "daylight".
// public/index.html applies the saved choice before first paint; this hook keeps it in sync.
const KEY = "nb-theme";
const THEME_COLOR = { evening: "#0f1412", daylight: "#f2f5f1" };

const readTheme = () =>
  document.documentElement.dataset.theme === "daylight" ? "daylight" : "evening";

export function useTheme() {
  const [theme, setThemeState] = useState(readTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLOR[theme]);
  }, [theme]);

  // Keep every toggle on the page (header, sidebar) in agreement
  useEffect(() => {
    const onChange = (e) => setThemeState(e.detail);
    window.addEventListener("nb-theme", onChange);
    return () => window.removeEventListener("nb-theme", onChange);
  }, []);

  const setTheme = useCallback((next) => {
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {
      // storage blocked: the choice still applies for this visit
    }
    window.dispatchEvent(new CustomEvent("nb-theme", { detail: next }));
  }, []);

  return [theme, setTheme];
}
