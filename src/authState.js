import { useEffect, useState } from "react";

// Firebase is loaded on demand, so the home page can render before the auth SDK arrives.
let firebase;
export const loadFirebase = () => (firebase ??= import("./firebase"));

// [user, loading]: user is null when signed out
export function useUser() {
  const [state, setState] = useState([null, true]);

  useEffect(() => {
    let unsubscribe;
    let alive = true;
    loadFirebase().then(({ auth, onAuthStateChanged }) => {
      if (!alive) return;
      unsubscribe = onAuthStateChanged(auth, (user) => setState([user, false]));
    });
    return () => {
      alive = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return state;
}
