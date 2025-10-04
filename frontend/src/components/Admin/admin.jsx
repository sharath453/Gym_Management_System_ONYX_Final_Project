import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh" 
    }}>
      <h1>Welcome</h1>
      <button 
        onClick={handleLogout} 
        style={{ 
          padding: "10px 20px", 
          fontSize: "16px", 
          borderRadius: "8px", 
          cursor: "pointer", 
          marginTop: "20px" 
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
