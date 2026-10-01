import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useUser } from "../../authState";
import { CONTACT_EMAIL } from "../../Components/Footer/Footer";
import { MailIcon } from "../../Components/Icons/Icons";
import Sidebar, { SECTIONS } from "./Components/Sidebar";
import StrategyBuilder from "./Components/StrategyBuilder";
import SavedStrategies from "./Components/SavedStrategies";
import { DATA_YEARS, emptyStrategy } from "./strategyOptions";
import { useSavedStrategies } from "./savedStrategies";
import classes from "./Styles/Dashboard.module.css";
import panels from "./Styles/Panels.module.css";

const firstName = (user) => {
  if (user?.displayName) return user.displayName.split(" ")[0];
  return user?.email?.split("@")[0] ?? "there";
};

// Account balance isn't served by any API yet, so it says so instead of showing a made-up number
const STATS = [
  { label: "Backtests left", value: "—", note: "Not available yet" },
  { label: "Credits", value: "—", note: "Not available yet" },
  { label: "Historical data", value: `${DATA_YEARS} years`, note: "NSE, daily" },
];

const Dashboard = () => {
  const [user] = useUser();
  const navigate = useNavigate();
  const [section, setSection] = useState("build");
  const [strategy, setStrategy] = useState(emptyStrategy);
  const saved = useSavedStrategies(user?.uid);

  const title = SECTIONS.find((s) => s.id === section)?.name;

  const onSignOut = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };

  const openStrategy = (s) => {
    setStrategy(s);
    setSection("build");
  };

  const newStrategy = () => {
    setStrategy(emptyStrategy());
    setSection("build");
  };

  return (
    <div className={classes.shell}>
      <Sidebar
        section={section}
        onSection={setSection}
        savedCount={saved.list.length}
        email={user?.email}
        onSignOut={onSignOut}
      />

      <main className={classes.main}>
        <header className={classes.header}>
          <div>
            <p className="label">Dashboard</p>
            <h1 className={`serif ${classes.greeting}`}>Hi, {firstName(user)}</h1>
          </div>
          <dl className={classes.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={`card ${classes.stat}`}>
                <dt>{s.label}</dt>
                <dd className="num">{s.value}</dd>
                <dd className={classes.statNote}>{s.note}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className={classes.panelHead}>
          <h2>{title}</h2>
          {section === "build" && strategy.id && (
            <button type="button" className="btn quiet" onClick={newStrategy}>
              Start a new one
            </button>
          )}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={section}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {section === "build" && (
              <StrategyBuilder strategy={strategy} setStrategy={setStrategy} onSave={saved.save} />
            )}

            {section === "saved" && (
              <SavedStrategies list={saved.list} onLoad={openStrategy} onRemove={saved.remove} onNew={newStrategy} />
            )}

            {section === "history" && (
              <div className={`card ${panels.empty}`}>
                <h2>No backtests yet</h2>
                <p>
                  Completed runs will be listed here with their results. Running backtests isn't
                  connected to this app yet.
                </p>
                <button type="button" className="btn" onClick={() => setSection("build")}>
                  Build a strategy
                </button>
              </div>
            )}

            {section === "help" && (
              <div className={`card ${panels.help}`}>
                <dl>
                  <div>
                    <dt>How do I build a strategy?</dt>
                    <dd>
                      Pick an index, filter it by liquidity and distance from the one-year high,
                      choose how to rank what is left, then pick a date range and run it.
                    </dd>
                  </div>
                  <div>
                    <dt>How far back does the data go?</dt>
                    <dd>The last {DATA_YEARS} years of daily NSE data.</dd>
                  </div>
                  <div>
                    <dt>Where are my saved strategies kept?</dt>
                    <dd>In this browser, under your account. Clearing site data removes them.</dd>
                  </div>
                </dl>
                <div className={panels.helpActions}>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="btn">
                    <MailIcon />
                    Email support
                  </a>
                  <Link to="/#how" className="btn ghost">
                    How it works
                  </Link>
                </div>
              </div>
            )}
          </m.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
