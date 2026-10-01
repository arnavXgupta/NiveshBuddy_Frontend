import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useUser } from "../../authState";
import Logo from "../Logo/Logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { CloseIcon, MenuIcon } from "../Icons/Icons";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const [user] = useUser();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the phone menu whenever the route changes
  useEffect(() => setOpen(false), [location.pathname]);

  const actions = user ? (
    <Link to="/Dashboard" className="btn">
      Open dashboard
    </Link>
  ) : (
    <>
      <Link to="/SignIn" className="btn ghost">
        Sign in
      </Link>
      <Link to="/SignUp" className="btn">
        Start free
      </Link>
    </>
  );

  return (
    <header className={classes.header}>
      <div className={`wrap ${classes.bar}`}>
        <Link to="/" className={classes.brand}>
          <Logo className={classes.logo} />
        </Link>

        <nav aria-label="Main" className={classes.links}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? classes.active : undefined)}>
            Home
          </NavLink>
          <NavLink to="/About" className={({ isActive }) => (isActive ? classes.active : undefined)}>
            About
          </NavLink>
        </nav>

        <div className={classes.actions}>
          <ThemeToggle compact />
          {actions}
        </div>

        <button
          type="button"
          className={`btn quiet ${classes.menuBtn}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className={classes.sheet}>
          <nav aria-label="Main" className={classes.sheetLinks}>
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/About">About</NavLink>
          </nav>
          <div className={classes.sheetActions}>{actions}</div>
          <ThemeToggle />
        </div>
      )}
    </header>
  );
};

export default Navbar;
