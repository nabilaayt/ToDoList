import React, { createContext, useState } from "react";

// Membuat Context
export const ThemeContext = createContext();

// Membuat Provider untuk Context ()
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    // Fungsi untuk mengubah tema
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
};