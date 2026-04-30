import { Routes, Route } from "react-router-dom";
import CallbackPage from "./pages/CallbackPage";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/callback" element={<CallbackPage />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>;

