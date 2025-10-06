import React, { useState } from "react";
import { authAPI } from "../services/api";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login(credentials);

      if (response.data.access) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        setTimeout(() => onLogin(), 500);
      } else {
        throw new Error("No access token received");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Invalid credentials. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Trainer Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>👤 Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              disabled={loading}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>🔒 Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
              style={styles.input}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="submit"
            disabled={loading}
            style={loading ? styles.buttonLoading : styles.button}
          >
            {loading ? "🔄 Logging in..." : "🚀 Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1f2233 0%, #2b2e44 100%)",
    padding: "1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#2c2f44",
    padding: "2.5rem 2rem",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
    border: "1px solid #3a3f5c",
  },
  title: {
    textAlign: "center",
    color: "#ffffff",
    marginBottom: "2rem",
    fontSize: "1.5rem",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  form: {
    width: "100%",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#cbd5e0",
    fontWeight: "600",
    fontSize: "0.9rem",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #4a4f6a",
    backgroundColor: "#3a3f5c",
    color: "#ffffff",
    outline: "none",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "14px 0",
    background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    textTransform: "uppercase",
    boxShadow: "0 4px 15px rgba(255,126,95,0.5)",
  },
  buttonLoading: {
    width: "100%",
    padding: "14px 0",
    background: "linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "not-allowed",
    opacity: 0.8,
  },
  error: {
    color: "#f3a5a5",
    marginBottom: "1rem",
    textAlign: "center",
    fontWeight: "500",
    fontSize: "0.9rem",
  },
};

export default Login;
