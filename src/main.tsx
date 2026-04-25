// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import { TaskProvider } from "./context/TaskProvider";
import { AppRoutes } from "./router/AppRoutes";
import { Auth0ProviderWithNavigate } from "./auth/Auth0ProviderWithNavigate";
import { ToastProvider } from "./components/ToastProvider";

const root = document.getElementById("root")!;

document.documentElement.setAttribute("data-theme", "light");


createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <ToastProvider>
          <TaskProvider>
            <AppRoutes />
          </TaskProvider>
        </ToastProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>,
);
