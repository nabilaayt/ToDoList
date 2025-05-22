import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ThemeProvider } from "./Context/ThemeContext";
import { NoteProvider } from "./Context/NoteContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoteProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </NoteProvider>
  </StrictMode>
);
