import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Members from './pages/Admin/Members';
// import Trainers from './pages/Admin/Trainers';
// import Plans from './pages/Plans';
// import Profile from './pages/Profile';
import './App.css';
import Login from "./components/Admin/Login";
import ProtectedRoutes from "./components/ProtectRoutes/ProtectRoutes";

function App() {
  return (
    <Router>
      {/* <AdminLayout>
        <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoutes role="Admin">
              <Admin />
            </ProtectedRoutes>
          }
        />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/members" element={<Members />} />
          <Route path="/admin/trainers" element={<Trainers />} />
          <Route path="/admin/plans" element={<Plans />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Routes>
      </AdminLayout> */}
        <Routes>
        <Route path="" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>     
    </Router>
  );
}

export default App;

