import React from "react";
import { m } from "framer-motion";
import classes from "../Styles/Features.module.css";

// Fine-line category illustrations (decorative; the card text carries the meaning)
const Art = {
  backtest: (
    <svg viewBox="0 0 360 140" aria-hidden="true" focusable="false">
      <path className={classes.grid} d="M0 28h360M0 70h360M0 112h360" />
      <path className={classes.lineMuted} d="M0 104 C 40 98, 70 92, 110 94 S 170 80, 210 82 S 290 66, 360 62" />
      <path className={classes.line} d="M0 110 C 30 100, 60 84, 100 88 S 150 60, 190 66 S 250 40, 290 46 S 330 24, 360 20" />
      <circle className={classes.dot} cx="190" cy="66" r="4" />
    </svg>
  ),
  markets: (
    <svg viewBox="0 0 160 120" aria-hidden="true" focusable="false">
      <rect className={classes.lineMuted} x="14" y="54" width="18" height="52" rx="3" />
      <rect className={classes.lineMuted} x="46" y="38" width="18" height="68" rx="3" />
      <rect className={classes.line} x="78" y="20" width="18" height="86" rx="3" />
      <rect className={classes.lineMuted} x="110" y="46" width="18" height="60" rx="3" />
      <path className={classes.grid} d="M4 106h152" />
    </svg>
  ),
  learn: (
    <svg viewBox="0 0 160 120" aria-hidden="true" focusable="false">
      <path className={classes.line} d="M80 30 C 64 22, 40 20, 18 24 V 96 C 40 92, 64 94, 80 102 Z" />
      <path className={classes.line} d="M80 30 C 96 22, 120 20, 142 24 V 96 C 120 92, 96 94, 80 102 Z" />
      <path className={classes.lineMuted} d="M32 44h30M32 58h30M32 72h22M98 44h30M98 58h30M98 72h22" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 360 140" aria-hidden="true" focusable="false">
      <path className={classes.lineMuted} d="M60 70 L140 36 L220 84 L300 48 M140 36 L150 112 L220 84 M60 70 L150 112" />
      <circle className={classes.node} cx="60" cy="70" r="12" />
      <circle className={classes.node} cx="140" cy="36" r="14" />
      <circle className={classes.nodeAccent} cx="220" cy="84" r="16" />
      <circle className={classes.node} cx="300" cy="48" r="12" />
      <circle className={classes.node} cx="150" cy="112" r="10" />
    </svg>
  ),
};

const FEATURES = [
  {
    key: "backtest",
    wide: true,
    eyebrow: "Backtesting",
    title: "Validate a strategy before real money is involved",
    body: "Run your rules over historical data and judge them on what they would have done, not on how good they sound.",
  },
  {
    key: "markets",
    eyebrow: "Indian markets",
    title: "Built around NSE indices",
    body: "Universes from Nifty 50 to every listed stock, and liquidity filters in rupees.",
  },
  {
    key: "learn",
    eyebrow: "Education",
    title: "Learn rules-based investing",
    body: "Expert-led content on algorithmic investing and on getting the most from the platform.",
  },
  {
    key: "community",
    wide: true,
    eyebrow: "Community",
    title: "Compare notes with other investors",
    body: "Engage with like-minded investors, share what you are testing, and learn from each other's results.",
  },
];

const Features = () => (
  <section className={`wrap ${classes.section}`} aria-labelledby="features-title">
    <div className={classes.head}>
      <p className="label">What you get</p>
      <h2 id="features-title">Timely insight, without the guesswork.</h2>
    </div>

    <div className={classes.bento}>
      {FEATURES.map((f, i) => (
        <m.article
          key={f.key}
          className={`card ${classes.item} ${f.wide ? classes.wide : ""}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={classes.art}>{Art[f.key]}</div>
          <div className={classes.text}>
            <p className="label">{f.eyebrow}</p>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        </m.article>
      ))}
    </div>
  </section>
);

export default Features;
