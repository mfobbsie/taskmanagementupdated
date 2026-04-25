// src/router/AppRoutes.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard"; // will be replaced in Phase 3
import { withAuthenticationRequired } from "@auth0/auth0-react";
import ViewTaskDetails from "../pages/ViewTaskDetails";

const ProtectedDashboard = withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <p>Redirecting...</p>,
});

const ProtectedTaskDetails = withAuthenticationRequired(ViewTaskDetails, {
  onRedirecting: () => <p>Redirecting...</p>,
});

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/callback" element={<p>Completing sign-in...</p>} />
      <Route path="/dashboard" element={<ProtectedDashboard />} />
      <Route path="/tasks/:id" element={<ProtectedTaskDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
