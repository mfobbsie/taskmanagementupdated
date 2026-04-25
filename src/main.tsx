// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import { TaskProvider } from "./context/TaskProvider";
import { AppRoutes } from "./router/AppRoutes";
import { Auth0ProviderWithNavigate } from "./auth/Auth0ProviderWithNavigate";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <TaskProvider>
          <AppRoutes />
        </TaskProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>,
);
