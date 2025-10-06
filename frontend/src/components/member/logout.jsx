import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#e74c3c",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "8px 16px",
        cursor: "pointer",
        fontWeight: "bold",
        marginTop: "10px",
      }}
    >
      Logout
    </button>
  );
}