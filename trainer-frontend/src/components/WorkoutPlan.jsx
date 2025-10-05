import React, { useState, useEffect } from "react";
import { workoutAPI, membersAPI } from "../services/api";

const WorkoutPlan = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [workoutDetails, setWorkoutDetails] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (error) {
      setMessage("Error fetching members");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember || !workoutDetails.trim()) {
      setMessage("Please select a member and enter workout details");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const workoutData = {
        member: parseInt(selectedMember),
        details: workoutDetails,
        trainer: 1,
      };

      await workoutAPI.create(workoutData);
      setMessage("✅ Workout plan created successfully!");
      setSelectedMember("");
      setWorkoutDetails("");
    } catch (error) {
      const errorMsg =
        error.response?.data || error.message || "Error creating workout plan";
      setMessage("❌ Error: " + JSON.stringify(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>CREATE WORKOUT PLAN</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>👥 MEMBER</label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              required
              disabled={loading}
              style={styles.select}
            >
              <option value="">Select Member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} (@{member.username})
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>🏋️ WORKOUT DETAILS</label>
            <textarea
              value={workoutDetails}
              onChange={(e) => setWorkoutDetails(e.target.value)}
              placeholder="Enter workout plan details (exercises, sets, reps, duration, etc.)..."
              rows="6"
              required
              disabled={loading}
              style={styles.textarea}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={loading ? styles.buttonLoading : styles.button}
          >
            {loading ? "🔄 Creating Workout Plan..." : "📝 Create Workout Plan"}
          </button>
        </form>

        {message && (
          <div
            style={
              message.includes("❌")
                ? styles.errorMessage
                : styles.successMessage
            }
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1f2233 0%, #2b2e44 100%)",
    padding: "2rem 1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "rgba(44, 47, 68, 0.95)",
    borderRadius: "12px",
    padding: "3rem",
    width: "100%",
    maxWidth: "550px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
  },
  title: {
    textAlign: "center",
    color: "#ffffff",
    marginBottom: "2rem",
    fontSize: "1.5rem",
    fontWeight: "700",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  form: {
    width: "100%",
  },
  formGroup: {
    marginBottom: "1.8rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "600",
    color: "#cbd5e0",
    fontSize: "0.9rem",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "#3a3f5c",
    color: "#ffffff",
    outline: "none",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "#3a3f5c",
    color: "#ffffff",
    resize: "vertical",
    outline: "none",
    lineHeight: "1.5",
  },
  button: {
    width: "100%",
    background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
    color: "#ffffff",
    border: "none",
    padding: "14px 0",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    textTransform: "uppercase",
    boxShadow: "0 4px 15px rgba(255, 126, 95, 0.5)",
    transition: "all 0.2s ease",
  },
  buttonLoading: {
    width: "100%",
    background: "linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%)",
    color: "#ffffff",
    border: "none",
    padding: "14px 0",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "not-allowed",
    fontWeight: "600",
    opacity: 0.8,
  },
  successMessage: {
    padding: "1rem",
    backgroundColor: "rgba(31, 60, 31, 0.7)",
    color: "#a5f3a5",
    borderRadius: "8px",
    marginTop: "1rem",
    textAlign: "center",
    fontWeight: "500",
    fontSize: "0.9rem",
  },
  errorMessage: {
    padding: "1rem",
    backgroundColor: "rgba(60, 31, 31, 0.7)",
    color: "#f3a5a5",
    borderRadius: "8px",
    marginTop: "1rem",
    textAlign: "center",
    fontWeight: "500",
    fontSize: "0.9rem",
  },
};

export default WorkoutPlan;
