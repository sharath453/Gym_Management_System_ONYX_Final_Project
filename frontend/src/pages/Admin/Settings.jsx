import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Admin/Settings.css";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);

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
    <div className="settings-container">
      <div className="settings-card">
        <h2 className="settings-heading">Admin Profile</h2>

        <div className="settings-info">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone_number}</p>
        </div>

        {!showChangePassword ? (
          <button
            className="change-password-btn"
            onClick={() => setShowChangePassword(true)}
          >
            Change Password
          </button>
        ) : (
          <form className="password-form" onSubmit={handleChangePassword}>
            <input
              type="password"
              className="password-input"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <input
              type="password"
              className="password-input"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <div className="password-buttons">
              <button type="submit" className="update-btn">Update</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowChangePassword(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {message && <p className="settings-message">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;
