import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router";

import App from "./App.tsx";

const EditApp = lazy(() => import("./EditApp.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <HashRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route element={<App />} path="/" />
            <Route element={<EditApp />} path="/edit" />
          </Routes>
        </Suspense>
      </HashRouter>
    </HeroUIProvider>
  </StrictMode>,
);
