import { useCallback, useEffect, useState } from "react";

// Saved strategies live in this browser until a backend endpoint exists for them.
// Keyed per account so two people on one machine don't see each other's list.
const keyFor = (uid) => `nb-strategies:${uid || "anon"}`;

const read = (uid) => {
  try {
    const list = JSON.parse(localStorage.getItem(keyFor(uid)) || "[]");
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
};

export function useSavedStrategies(uid) {
  const [list, setList] = useState(() => read(uid));

  useEffect(() => setList(read(uid)), [uid]);

  const persist = useCallback(
    (next) => {
      setList(next);
      try {
        localStorage.setItem(keyFor(uid), JSON.stringify(next));
      } catch (e) {
        // storage blocked or full: the list still works for this visit
      }
    },
    [uid]
  );

  // Same name replaces the earlier version
  const save = useCallback(
    (strategy) => {
      const entry = { ...strategy, id: strategy.id || String(Date.now()), savedAt: new Date().toISOString() };
      const rest = list.filter((s) => s.id !== entry.id && s.name.toLowerCase() !== entry.name.toLowerCase());
      persist([entry, ...rest]);
      return entry;
    },
    [list, persist]
  );

  const remove = useCallback((id) => persist(list.filter((s) => s.id !== id)), [list, persist]);

  return { list, save, remove };
}
