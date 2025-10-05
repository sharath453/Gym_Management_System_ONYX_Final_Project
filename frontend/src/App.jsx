import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./components/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Members from "./pages/Admin/Members";
// import Trainers from './pages/Admin/Trainers';
// import Plans from './pages/Plans';
// import Profile from './pages/Profile';
import "./App.css";
import Login from "./components/Admin/Login";
import ProtectedRoutes from "./components/ProtectRoutes/ProtectRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Admin routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoutes role="Admin">
              <AdminLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          {/* <Route path="trainers" element={<Trainers />} />
          <Route path="plans" element={<Plans />} />
          <Route path="profile" element={<Profile />} /> */}
          <Route index element={<Navigate to="dashboard" />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;