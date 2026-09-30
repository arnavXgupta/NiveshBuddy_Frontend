import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { ArrowIcon } from "../../../Components/Icons/Icons";
import classes from "../Styles/Hero.module.css";

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] } }),
};

// Settings a real strategy is built from. Shown as an example, not as a result.
const EXAMPLE = [
  ["Universe", "Nifty 500"],
  ["Liquidity", "Median daily volume ≥ ₹1 crore"],
  ["Momentum filter", "Within 20% of the 1-year high"],
  ["Rank by", "Sharpe return, 1 year"],
  ["Period", "Last 2 years"],
];

const Hero = () => {
  const [user] = useAuthState(auth);

  return (
    <section className={`wrap ${classes.hero}`} aria-labelledby="hero-title">
      <div className={classes.copy}>
        <motion.p className="label" variants={rise} initial="hidden" animate="show" custom={0}>
          Backtesting for Indian equities
        </motion.p>
        <motion.h1 id="hero-title" className={`serif ${classes.title}`} variants={rise} initial="hidden" animate="show" custom={1}>
          Simplify equity investing.
        </motion.h1>
        <motion.p className={classes.lede} variants={rise} initial="hidden" animate="show" custom={2}>
          Your fintech companion for data-driven investing in India. Pick stocks by clear rules,
          backtest them on historical NSE data, and see how the strategy would have held up
          before you put money behind it.
        </motion.p>
        <motion.div className={classes.ctas} variants={rise} initial="hidden" animate="show" custom={3}>
          <Link to={user ? "/Dashboard" : "/SignUp"} className="btn lg">
            {user ? "Open dashboard" : "Start backtesting free"}
            <ArrowIcon />
          </Link>
          <a href="#how" className="btn lg ghost">
            How it works
          </a>
        </motion.div>
      </div>

      <motion.aside
        className={`card ${classes.example}`}
        aria-label="Example strategy"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.25 }}
      >
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
      </motion.aside>
    </section>
  );
};

export default Hero;
