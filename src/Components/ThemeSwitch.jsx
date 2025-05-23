import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button 
            onClick={toggleTheme}
            className="w-12 h-12 rounded-full shadow-lg bg-white dark:bg-[#7E76B5] border-2 border-gray-200 dark:border-[#7E76B5] flex items-center justify-center text-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
};

export default ThemeSwitch;