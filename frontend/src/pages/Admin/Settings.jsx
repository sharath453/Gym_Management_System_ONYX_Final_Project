import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Fetch admin profile
  const fetchProfile = async () => {
    try {
      const username = localStorage.getItem("username");
      if (!username) {
        setMessage("No username found in localStorage");
        return;
      }
      const res = await axios.get(
        `http://127.0.0.1:8000/api/admin/profile/?username=${username}`
      );
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setMessage("Failed to fetch profile.");
    }
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem("username");
      if (!username) {
        setMessage("No username found in localStorage");
        return;
      }

      const res = await axios.post(
        "http://127.0.0.1:8000/api/admin/change-password/",
        { username, old_password: oldPassword, new_password: newPassword }
      );

      setMessage(res.data.message);
      setOldPassword("");
      setNewPassword("");
      setShowChangePassword(false);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4e72e1ff)",
        color: "#fff",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          padding: "30px 40px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#00e676" }}>Admin Profile</h2>

        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone_number}</p>
        </div>

        {!showChangePassword ? (
          <button
            onClick={() => setShowChangePassword(true)}
            style={{
              background: "#00e676",
              color: "#000",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#00c853")}
            onMouseOut={(e) => (e.target.style.background = "#00e676")}
          >
            Change Password
          </button>
        ) : (
          <form
            onSubmit={handleChangePassword}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
              }}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                type="submit"
                style={{
                  background: "#00e676",
                  color: "#000",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#00c853")}
                onMouseOut={(e) => (e.target.style.background = "#00e676")}
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setShowChangePassword(false)}
                style={{
                  background: "#ff1744",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#d50000")}
                onMouseOut={(e) => (e.target.style.background = "#ff1744")}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {message && (
          <p style={{ marginTop: "15px", color: "#ff9100", fontWeight: "bold" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;