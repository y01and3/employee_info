import { HeroUIProvider } from "@heroui/system";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.tsx";
import EditApp from "./EditApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />} path="/" />
          <Route element={<EditApp />} path="/edit" />
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>,
);
