import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Login.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "", role: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", form);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);

      switch (res.data.role) {
        case "Admin":
          navigate("/admin");
          break;
        case "Trainer":
          navigate("/trainer");
          break;
        case "Member":
          navigate(`/member/${res.data.username}/*`);
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.detail ||
          err.response?.data?.non_field_errors?.[0] ||
          "Invalid credentials"
      );
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="">Select role</option>
          <option value="Admin">Admin</option>
          <option value="Trainer">Trainer</option>
          <option value="Member">Member</option>
        </select>

        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
