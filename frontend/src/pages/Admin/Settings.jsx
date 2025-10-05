import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch admin profile using username from localStorage
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

  // Change password
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
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif", maxWidth: "500px", margin: "auto" }}>
      <h2>Profile</h2>

      <div style={{ marginBottom: "20px" }}>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone_number}</p>
      </div>

      <h3>Change Password</h3>
      <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <button
          type="submit"
          style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}
        >
          Change Password
        </button>
      </form>

      {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}
    </div>
  );
};

export default Profile;
