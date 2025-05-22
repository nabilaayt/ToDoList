import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return <button onClick={toggleTheme}>{theme === "light" ? "☀️" : "🌙"}</button>;
};

export default ThemeSwitch;