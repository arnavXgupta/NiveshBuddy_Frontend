import React from "react";
import { useTheme } from "../../theme";
import { MoonIcon, SunIcon } from "../Icons/Icons";

// compact: icon-only (header). Otherwise icon + name (sidebar).
const ThemeToggle = ({ compact = false }) => {
  const [theme, setTheme] = useTheme();
  const options = [
    { id: "evening", name: "Evening", Icon: MoonIcon },
    { id: "daylight", name: "Daylight", Icon: SunIcon },
  ];

  return (
    <div className="seg" role="group" aria-label="Theme">
      {options.map(({ id, name, Icon }) => (
        <button
          key={id}
          type="button"
          aria-pressed={theme === id}
          aria-label={compact ? `${name} theme` : undefined}
          title={compact ? `${name} theme` : undefined}
          onClick={() => setTheme(id)}
        >
          <Icon />
          {!compact && name}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
