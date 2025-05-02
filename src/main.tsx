import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.tsx";
import EditApp from "./EditApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <BrowserRouter>
        <Routes>
          <Route element={<App />} path="/employee_info/" />
          <Route element={<EditApp />} path="/employee_info/edit" />
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>,
);
