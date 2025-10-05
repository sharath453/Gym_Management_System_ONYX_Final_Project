import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Admin/Login";
import ProtectedRoutes from "./components/ProtectRoutes/ProtectRoutes";
import AdminLayout from "./components/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Members from "./pages/Admin/Members";
import Plan from "./pages/Admin/Plans";
import Profile from "./pages/Admin/Settings";
import Trainer from "./pages/Admin/Trainers";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect base path to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoutes role="Admin">
              <AdminLayout />
            </ProtectedRoutes>
          }
        >
          {/* Nested routes (relative paths, no leading /) */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="plans" element={<Plan />} />
          <Route path="profile" element={<Profile />} />
          <Route path="trainers" element={<Trainer />} />
        </Route>

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;