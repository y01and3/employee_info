import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router";

import App from "./App.tsx";
import EditApp from "./EditApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <HashRouter>
        <Routes>
          <Route element={<App />} path="/" />
          <Route element={<EditApp />} path="/edit" />
        </Routes>
      </HashRouter>
    </HeroUIProvider>
  </StrictMode>,
);
