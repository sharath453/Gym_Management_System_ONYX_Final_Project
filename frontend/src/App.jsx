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
import Plan from "./pages/Admin/Plans"
import Profile from "./pages/Admin/Settings"
import Trainer from "./pages/Admin/Trainers"
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoutes role="Admin">
              <AdminLayout />
            </ProtectedRoutes>
          }
        >
        </Route>
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoutes role="Admin">
              <Dashboard />
            </ProtectedRoutes>
          }
        >
        </Route>
         <Route 
          path="/admin/members" 
          element={
            <ProtectedRoutes role="Admin">
              <Members />
            </ProtectedRoutes>
          }
        >
        </Route>
         <Route 
          path="/admin/plans" 
          element={
            <ProtectedRoutes role="Admin">
              <Plan />
            </ProtectedRoutes>
          }
        >
        </Route>
         <Route 
          path="/admin/profile" 
          element={
            <ProtectedRoutes role="Admin">
              <Profile />
            </ProtectedRoutes>
          }
        >
        </Route>
         <Route 
          path="/admin/trainers" 
          element={
            <ProtectedRoutes role="Admin">
              <Trainer />
            </ProtectedRoutes>
          }
        >
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;