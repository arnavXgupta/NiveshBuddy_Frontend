import React from "react";
import { m } from "framer-motion";
import classes from "../Styles/HowItWorks.module.css";

const STEPS = [
  {
    title: "Pick a universe",
    body: "Start from the index whose stocks you want to choose between.",
    chips: ["Nifty 50", "Nifty 500", "Midcap 150", "Smallcap 250", "All NSE"],
  },
  {
    title: "Filter for liquidity and trend",
    body: "Drop thinly traded stocks by median daily volume, and keep only those near their one-year high.",
    chips: ["₹1 lakh – ₹10 crore volume", "Within 10–50% of high"],
  },
  {
    title: "Rank what is left",
    body: "Order the shortlist by return, risk-adjusted return, volatility or beta to Nifty 50.",
    chips: ["Sharpe, 1Y", "12M − 1M ROC", "Volatility", "Beta"],
  },
  {
    title: "Run the backtest",
    body: "Choose a date range inside the two years of data and see how the rules would have performed.",
    chips: ["Custom date range", "Save and rerun"],
  },
];

const HowItWorks = () => (
  <section id="how" className={`wrap ${classes.section}`} aria-labelledby="how-title">
    <div className={classes.intro}>
      <p className="label">How it works</p>
      <h2 id="how-title">Four steps from an idea to a backtest.</h2>
      <p>
        Every strategy is a short list of rules you can read. No black box, no code: the same
        steps you will find in the dashboard.
      </p>
    </div>

    <ol className={classes.steps}>
      {STEPS.map((s, i) => (
        <m.li
          key={s.title}
          className={classes.step}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={`num ${classes.index}`} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className={classes.stepBody}>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <ul className="chips" aria-label="Examples">
              {s.chips.map((c) => (
                <li key={c} className="chip">{c}</li>
              ))}
            </ul>
          </div>
        </m.li>
      ))}
    </ol>
  </section>
);

export default HowItWorks;
