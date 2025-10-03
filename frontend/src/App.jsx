import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Admin/Login";
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="" element={<Login />} />
      </Routes>
    </Router>
  );
}
