import React, { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronIcon } from "../../../Components/Icons/Icons";
import {
  AWAY_FROM_HIGH,
  MEDIAN_VOLUMES,
  SORT_BY,
  UNIVERSES,
  earliestDate,
  labelFor,
  today,
} from "../strategyOptions";
import classes from "../Styles/StrategyBuilder.module.css";

const Select = ({ id, label, options, value, onChange }) => (
  <div className="fieldset">
    <label htmlFor={id}>{label}</label>
    <select id={id} className="field" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

// One collapsible step. Each step owns its own open state.
const Step = ({ n, title, summary, open, onToggle, children }) => (
  <section className={`${classes.step} ${open ? classes.open : ""}`}>
    <h3>
      <button
        type="button"
        className={classes.stepHead}
        aria-expanded={open}
        aria-controls={`step-${n}`}
        onClick={onToggle}
      >
        <span className={`num ${classes.stepNum}`}>{String(n).padStart(2, "0")}</span>
        <span className={classes.stepTitle}>
          {title}
          <span className={classes.stepSummary}>{summary}</span>
        </span>
        <ChevronIcon className={classes.chev} />
      </button>
    </h3>
    <AnimatePresence initial={false}>
      {open && (
        <m.div
          id={`step-${n}`}
          key="body"
          className={classes.stepBodyOuter}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={classes.stepBody}>{children}</div>
        </m.div>
      )}
    </AnimatePresence>
  </section>
);

const validate = (s) => {
  const errors = {};
  if (!s.from) errors.from = "Choose a start date.";
  if (!s.till) errors.till = "Choose an end date.";
  if (s.from && s.from < earliestDate()) errors.from = "Data starts two years ago.";
  if (s.till && s.till > today()) errors.till = "The end date can't be in the future.";
  if (s.from && s.till && s.from >= s.till) errors.till = "The end date must be after the start date.";
  return errors;
};

const StrategyBuilder = ({ strategy, setStrategy, onSave }) => {
  const [open, setOpen] = useState({ 1: true, 2: true, 3: true, 4: true });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { tone: "info" | "ok" | "bad", text }

  const set = (key) => (value) => {
    setStrategy((s) => ({ ...s, [key]: value }));
    setStatus(null);
  };
  const toggle = (n) => setOpen((o) => ({ ...o, [n]: !o[n] }));

  const check = () => {
    const e = validate(strategy);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    const e = validate(strategy);
    if (!strategy.name.trim()) e.name = "Give the strategy a name to save it.";
    setErrors(e);
    if (Object.keys(e).length) return;
    const saved = onSave({ ...strategy, name: strategy.name.trim() });
    setStrategy(saved);
    setStatus({ tone: "ok", text: `Saved “${saved.name}”.` });
  };

  const run = (ev) => {
    ev.preventDefault();
    if (!check()) return;
    // TODO: send `strategy` to the backtest API here and show its results.
    setStatus({
      tone: "info",
      text: "Your settings are valid. Running backtests isn't connected to this app yet, so no results can be shown.",
    });
  };

  const summary = [
    ["Universe", labelFor(UNIVERSES, strategy.index)],
    ["Median daily volume", `At least ${labelFor(MEDIAN_VOLUMES, strategy.median_volume)}`],
    ["From 1-year high", labelFor(AWAY_FROM_HIGH, strategy.away_from_high)],
    ["Rank by", labelFor(SORT_BY, strategy.sort_by)],
    ["Period", strategy.from && strategy.till ? `${strategy.from} → ${strategy.till}` : "—"],
  ];

  return (
    <form className={classes.builder} onSubmit={run} noValidate>
      <div className={`card ${classes.basics}`}>
        <div className="fieldset">
          <label htmlFor="strat-name">Strategy name</label>
          <input
            id="strat-name"
            className="field"
            type="text"
            placeholder="e.g. Liquid momentum, Nifty 500"
            value={strategy.name}
            onChange={(e) => set("name")(e.target.value)}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "strat-name-err" : undefined}
          />
          {errors.name && <span id="strat-name-err" className="error-text">{errors.name}</span>}
        </div>
        <div className={classes.dates}>
          <div className="fieldset">
            <label htmlFor="date-from">From</label>
            <input
              id="date-from"
              className="field num"
              type="date"
              min={earliestDate()}
              max={today()}
              value={strategy.from}
              onChange={(e) => set("from")(e.target.value)}
              aria-invalid={errors.from ? "true" : undefined}
              aria-describedby="date-from-msg"
            />
            <span id="date-from-msg" className={errors.from ? "error-text" : "hint"}>
              {errors.from || "Data covers the last 2 years."}
            </span>
          </div>
          <div className="fieldset">
            <label htmlFor="date-till">Till</label>
            <input
              id="date-till"
              className="field num"
              type="date"
              min={earliestDate()}
              max={today()}
              value={strategy.till}
              onChange={(e) => set("till")(e.target.value)}
              aria-invalid={errors.till ? "true" : undefined}
              aria-describedby={errors.till ? "date-till-err" : undefined}
            />
            {errors.till && <span id="date-till-err" className="error-text">{errors.till}</span>}
          </div>
        </div>
      </div>

      <div className={`card ${classes.steps}`}>
        <Step n={1} title="Construct the portfolio" summary={labelFor(UNIVERSES, strategy.index)} open={open[1]} onToggle={() => toggle(1)}>
          <Select id="index" label="Index" options={UNIVERSES} value={strategy.index} onChange={set("index")} />
        </Step>

        <Step
          n={2}
          title="Filter"
          summary={`${labelFor(MEDIAN_VOLUMES, strategy.median_volume)} volume · ${labelFor(AWAY_FROM_HIGH, strategy.away_from_high).toLowerCase()} of high`}
          open={open[2]}
          onToggle={() => toggle(2)}
        >
          <div className={classes.pair}>
            <Select
              id="median_volume"
              label="Median daily volume (at least)"
              options={MEDIAN_VOLUMES}
              value={strategy.median_volume}
              onChange={set("median_volume")}
            />
            <Select
              id="away_from_high"
              label="Distance from 1-year high"
              options={AWAY_FROM_HIGH}
              value={strategy.away_from_high}
              onChange={set("away_from_high")}
            />
          </div>
        </Step>

        <Step n={3} title="Rank" summary={labelFor(SORT_BY, strategy.sort_by)} open={open[3]} onToggle={() => toggle(3)}>
          <Select id="sort_by" label="Sort by" options={SORT_BY} value={strategy.sort_by} onChange={set("sort_by")} />
        </Step>

        <Step n={4} title="Review and run" summary="Check the rules, then run" open={open[4]} onToggle={() => toggle(4)}>
          <dl className={classes.summary}>
            {summary.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Step>
      </div>

      <div className={classes.actions}>
        <p className={`${classes.status} ${status ? classes[status.tone] : ""}`} role="status">
          {status?.text}
        </p>
        <div className={classes.buttons}>
          <button type="button" className="btn lg ghost" onClick={save}>
            Save strategy
          </button>
          <button type="submit" className="btn lg">
            Run backtest
          </button>
        </div>
      </div>
    </form>
  );
};

export default StrategyBuilder;
