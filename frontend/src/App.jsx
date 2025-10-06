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
import AdminDashboard from "./pages/Admin/Dashboard";
import Members from "./pages/Admin/Members";
import Plan from "./pages/Admin/Plans";
import Profile from "./pages/Admin/Settings";
import Trainer from "./pages/Admin/Trainers";

// Member Components
import Layout from "./components/member/Layout";
import MemberDashboard from "./components/member/Dashboard";
import ProfilePage from "./components/member/ProfilePage";
import DietPage from "./components/member/DietPage";
import WorkoutsPage from "./components/member/WorkoutsPage";
import AttendancePage from "./components/member/AttendancePage";
import BMIPage from "./components/member/BMIPage";

import "./App.css";

function App() {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  return (
    <Router>
      <Routes>
        {/* Default redirect logic based on role */}
        <Route
          path="/"
          element={
            role ? (
              role === "Admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : role === "Member" && username ? (
                <Navigate to={`/member/${username}/dashboard`} replace />
              ) : role === "Trainer" ? (
                <Navigate to="/trainer/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Universal Login */}
        <Route path="/login" element={<Login />} />

        {/* 🧩 Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoutes role="Admin">
              <AdminLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="plans" element={<Plan />} />
          <Route path="profile" element={<Profile />} />
          <Route path="trainers" element={<Trainer />} />
        </Route>

        {/* 💪 Member Routes */}
        <Route
          path="/member/:username/*"
          element={
            <ProtectedRoutes role="Member">
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<MemberDashboard />} />
          <Route path="dashboard" element={<MemberDashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="diet" element={<DietPage />} />
          <Route path="workouts" element={<WorkoutsPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="bmi" element={<BMIPage />} />
        </Route>
        {/* 404 Fallback */}
        <Route
          path="*"
          element={<div style={{ padding: "2rem" }}>404 - Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;