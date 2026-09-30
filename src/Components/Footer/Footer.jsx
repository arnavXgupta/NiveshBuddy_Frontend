import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import classes from "./Footer.module.css";

export const CONTACT_EMAIL = "nivesh.buddy@gmail.com";

const Footer = () => (
  <footer className={classes.footer}>
    <div className={`wrap ${classes.grid}`}>
      <div className={classes.about}>
        <Link to="/" className={classes.brand}>
          <Logo className={classes.logo} />
        </Link>
        <p>
          Your go-to for mastering Indian equity markets. Start your journey to financial
          prosperity today.
        </p>
      </div>

      <nav aria-label="Footer" className={classes.cols}>
        <div>
          <h2 className="label">Product</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/About">About us</Link></li>
            <li><Link to="/Dashboard">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="label">Account</h2>
          <ul>
            <li><Link to="/SignIn">Sign in</Link></li>
            <li><Link to="/SignUp">Create an account</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="label">Contact</h2>
          <ul>
            <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <div className={`wrap ${classes.legal}`}>
      <span>© {new Date().getFullYear()} NiveshBuddy</span>
      <span>Backtest results use historical data and do not predict future returns.</span>
    </div>
  </footer>
);

export default Footer;
