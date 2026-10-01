import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../authState";
import { ArrowIcon } from "../../../Components/Icons/Icons";
import classes from "../Styles/Hero.module.css";


// Settings a real strategy is built from. Shown as an example, not as a result.
const EXAMPLE = [
  ["Universe", "Nifty 500"],
  ["Liquidity", "Median daily volume ≥ ₹1 crore"],
  ["Momentum filter", "Within 20% of the 1-year high"],
  ["Rank by", "Sharpe return, 1 year"],
  ["Period", "Last 2 years"],
];

const Hero = () => {
  const [user] = useUser();

  return (
    <section className={`wrap ${classes.hero}`} aria-labelledby="hero-title">
      {/* Entrance is CSS, so the first screen never waits on the deferred motion chunk */}
      <div className={classes.copy}>
        <p className="label" style={{ "--i": 0 }}>
          Backtesting for Indian equities
        </p>
        <h1 id="hero-title" className={`serif ${classes.title}`} style={{ "--i": 1 }}>
          Simplify equity investing.
        </h1>
        <p className={classes.lede} style={{ "--i": 2 }}>
          Your fintech companion for data-driven investing in India. Pick stocks by clear rules,
          backtest them on historical NSE data, and see how the strategy would have held up
          before you put money behind it.
        </p>
        <div className={classes.ctas} style={{ "--i": 3 }}>
          <Link to={user ? "/Dashboard" : "/SignUp"} className="btn lg">
            {user ? "Open dashboard" : "Start backtesting free"}
            <ArrowIcon />
          </Link>
          <a href="#how" className="btn lg ghost">
            How it works
          </a>
        </div>
      </div>

      <aside className={`card ${classes.example}`} aria-label="Example strategy" style={{ "--i": 3 }}>
        <div className={classes.exampleHead}>
          <span className="label">Example strategy</span>
          <span className={classes.tag}>Illustrative settings</span>
        </div>
        <p className={classes.exampleName}>Liquid momentum, Nifty 500</p>
        <dl className={classes.rules}>
          {EXAMPLE.map(([k, v]) => (
            <div key={k} className={classes.rule}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="hint">Build one like this in the dashboard, then run it over any range in the last two years.</p>
      </aside>
    </section>
  );
};

export default Hero;
