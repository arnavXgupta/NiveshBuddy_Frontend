import React from "react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "../../../Components/Footer/Footer";
import { ArrowIcon } from "../../../Components/Icons/Icons";
import classes from "../Styles/main.module.css";

// Cloudinary rasterises the 1.2 MB mascot SVG to a ~35 KB WebP/PNG
const MASCOT = "https://res.cloudinary.com/dnrxsykwg/image/upload/f_auto,q_auto,w_720/v1713003301/main_q2d8wb.svg";

const MainContent = () => (
  <section className={`wrap ${classes.section}`} aria-labelledby="about-title">
    <div className={classes.copy}>
      <p className="label">About us</p>
      <h1 id="about-title" className={`serif ${classes.title}`}>
        About NiveshBuddy
      </h1>
      <p className={classes.lede}>
        At NiveshBuddy, we're dedicated to changing the way you invest. Our platform lets you
        backtest equity strategies with ease, giving you the confidence to make informed
        decisions and optimise your portfolio in the ever-evolving Indian markets.
      </p>
      <div className={classes.ctas}>
        <Link to="/SignUp" className="btn lg">
          Start backtesting
          <ArrowIcon />
        </Link>
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn lg ghost">
          Contact us
        </a>
      </div>
    </div>

    <figure className={classes.figure}>
      <img src={MASCOT} alt="The NiveshBuddy mascot presenting a chart" width="720" height="720" loading="lazy" />
    </figure>
  </section>
);

export default MainContent;
