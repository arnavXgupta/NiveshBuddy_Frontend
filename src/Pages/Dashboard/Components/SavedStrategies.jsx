import React, { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { SearchIcon, TrashIcon } from "../../../Components/Icons/Icons";
import { SORT_BY, UNIVERSES, labelFor } from "../strategyOptions";
import classes from "../Styles/Panels.module.css";

const SavedStrategies = ({ list, onLoad, onRemove, onNew }) => {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = q ? list.filter((s) => s.name.toLowerCase().includes(q)) : list;

  if (list.length === 0) {
    return (
      <div className={`card ${classes.empty}`}>
        <h2>No saved strategies yet</h2>
        <p>Build a strategy and choose “Save strategy”. It will be listed here so you can reload it later.</p>
        <button type="button" className="btn" onClick={onNew}>Build a strategy</button>
      </div>
    );
  }

  return (
    <div className={classes.stack}>
      <div className={classes.search}>
        <label htmlFor="strat-search" className="sr-only">Search saved strategies</label>
        <SearchIcon className={classes.searchIcon} />
        <input
          id="strat-search"
          className="field"
          type="search"
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <p className="hint" role="status">
        {shown.length} of {list.length} saved in this browser
      </p>

      <ul className={classes.list}>
        <AnimatePresence initial={false}>
          {shown.map((s) => (
            <m.li
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={`card ${classes.item}`}
            >
              <div className={classes.itemText}>
                <h3>{s.name}</h3>
                <p>
                  {labelFor(UNIVERSES, s.index)} · {labelFor(SORT_BY, s.sort_by)}
                </p>
                <p className="num hint">
                  {s.from} → {s.till}
                </p>
              </div>
              <div className={classes.itemActions}>
                <button type="button" className="btn" onClick={() => onLoad(s)}>
                  Open
                </button>
                <button
                  type="button"
                  className="btn danger"
                  aria-label={`Delete ${s.name}`}
                  title="Delete"
                  onClick={() => onRemove(s.id)}
                >
                  <TrashIcon />
                </button>
              </div>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
      {shown.length === 0 && <p className={classes.none}>No saved strategy matches “{query}”.</p>}
    </div>
  );
};

export default SavedStrategies;
