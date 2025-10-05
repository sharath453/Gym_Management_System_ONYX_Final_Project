import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import './App.css';
import Login from "./components/Admin/Login";
import ProtectedRoutes from "./components/ProtectRoutes/ProtectRoutes";
import Dashboard from "./pages/Admin/Dashboard";
import Plan from './pages/Admin/Plans';
import Profile from './pages/Admin/Settings'

function App() {
  return (
    <Router>
        <Routes>
        <Route path="" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoutes role="Admin">
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/plan"
          element={
            <ProtectedRoutes role="Admin">
              <Plan />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoutes role="Admin">
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>     
    </Router>
  );
}

export default App;

