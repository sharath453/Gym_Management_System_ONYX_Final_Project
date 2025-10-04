import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Admin/Login";
import Admin from "./components/Admin/admin";
import ProtectedRoutes from "./components/ProtectRoutes/ProtectRoutes";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes role="Admin">
              <Admin />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
