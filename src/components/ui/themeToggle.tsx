import { useTheme } from "../../context/themeContext";

import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className=" rounded-md inline-flex">
      <button
        onClick={toggleTheme}
        className="inline-flex items-center justify-center border rounded-md h-8 w-full"
        type="button"
        aria-haspopup="menu"
        aria-expanded="false"
      >
        <p></p>
        {theme === "dark" ? (
          <CiDark
            size={20}
            className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 "
          />
        ) : (
          <MdOutlineLightMode
            size={20}
            className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
        )}
        <span className="sr-only">Toggle theme</span>
        <p className="ml-2">{theme}</p>
      </button>
    </div>
  );
};
