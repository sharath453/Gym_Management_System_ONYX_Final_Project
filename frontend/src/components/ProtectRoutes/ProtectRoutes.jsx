import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, role }) {
  const token = localStorage.getItem("access");   
  const userRole = localStorage.getItem("role"); 
  console.log("ProtectedRoutes - role:", role, "userRole:", userRole);

  if (!token) {
    console.log("ProtectedRoutes - role:", role, "userRole:", userRole);
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    console.log("ProtectedRoutes - role:", role, "userRole:", userRole);
    return <Navigate to="/login" replace />;
  }

  return children; 
}

export default ProtectedRoutes;
