import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/themeContext";
import AppLayout from "./AppLayout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppLayout>
        <App />
      </AppLayout>
    </ThemeProvider>
  </React.StrictMode>
);
