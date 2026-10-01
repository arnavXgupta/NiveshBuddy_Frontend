import React from "react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "../../../Components/Footer/Footer";
import { ArrowIcon, MailIcon } from "../../../Components/Icons/Icons";
import classes from "../Styles/ClosingCta.module.css";

const ClosingCta = () => (
  <section className="wrap" aria-labelledby="cta-title">
    <div className={`card ${classes.band}`}>
      <div className={classes.primary}>
        <h2 id="cta-title">Get started for free.</h2>
        <p>Create an account and build your first strategy in a few minutes.</p>
        <Link to="/SignUp" className="btn lg">
          Create your account
          <ArrowIcon />
        </Link>
      </div>
      <div className={classes.secondary}>
        <h3>Have a suggestion or a question?</h3>
        <p>Write to us at {CONTACT_EMAIL}.</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn lg ghost">
          <MailIcon />
          Email us
        </a>
      </div>
    </div>
  </section>
);

export default ClosingCta;
