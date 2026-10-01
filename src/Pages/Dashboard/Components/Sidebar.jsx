import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../Components/Logo/Logo";
import ThemeToggle from "../../../Components/ThemeToggle/ThemeToggle";
import { BookmarkIcon, HelpIcon, HistoryIcon, LogoutIcon, PlusIcon } from "../../../Components/Icons/Icons";
import classes from "../Styles/Sidebar.module.css";

export const SECTIONS = [
  { id: "build", name: "New backtest", Icon: PlusIcon },
  { id: "saved", name: "Saved strategies", Icon: BookmarkIcon },
  { id: "history", name: "Backtest history", Icon: HistoryIcon },
  { id: "help", name: "Help", Icon: HelpIcon },
];

const Sidebar = ({ section, onSection, savedCount, email, onSignOut }) => (
  <aside className={classes.side}>
    <Link to="/" className={classes.brand} aria-label="NiveshBuddy home">
      <Logo className={classes.logo} />
    </Link>

    <nav aria-label="Dashboard" className={classes.nav}>
      {SECTIONS.map(({ id, name, Icon }) => (
        <button
          key={id}
          type="button"
          aria-current={section === id ? "page" : undefined}
          onClick={() => onSection(id)}
        >
          <Icon />
          <span>{name}</span>
          {id === "saved" && savedCount > 0 && <span className={`num ${classes.count}`}>{savedCount}</span>}
        </button>
      ))}
    </nav>

    <div className={classes.foot}>
      <ThemeToggle />
      <div className={classes.account}>
        <span className="label">Signed in as</span>
        <span className={classes.email}>{email}</span>
      </div>
      <button type="button" className="btn ghost" onClick={onSignOut}>
        <LogoutIcon />
        Sign out
      </button>
    </div>
  </aside>
);

export default Sidebar;
