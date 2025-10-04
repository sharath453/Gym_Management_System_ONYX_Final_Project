import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Admin/Login";
import Dashboard from "./components/Admin/Dashboard";
import ProtectedRoutes from "./components/ProtectRoutes/ProtectRoutes";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoutes role="Admin">
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
