import React, { useState, useEffect } from "react";
import { bmiAPI, membersAPI } from "../services/api";

const BMICalculator = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

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

  const calculateBMI = () => {
    if (!height || !weight) {
      setMessage("Please enter both height and weight");
      return;
    }

    const bmiValue = bmiAPI.calculate(parseFloat(height), parseFloat(weight));
    setBmi(bmiValue);
    setMessage("");
  };

  const saveBMI = async () => {
    if (!selectedMember || !bmi) {
      setMessage("Please select a member and calculate BMI first");
      return;
    }

    try {
      await bmiAPI.create({
        member: selectedMember,
        height_cm: parseFloat(height),
        weight_kg: parseFloat(weight),
        bmi_value: parseFloat(bmi),
      });
      setMessage("✅ BMI record saved successfully!");
      setSelectedMember("");
      setHeight("");
      setWeight("");
      setBmi(null);
    } catch (error) {
      setMessage("❌ Error saving BMI record");
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>BMI CALCULATOR</h2>

        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>👥 Member</label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              style={styles.select}
            >
              <option value="">Select Member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>📏 Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in cm"
              step="0.1"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>⚖️ Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
              step="0.1"
              style={styles.input}
            />
          </div>

          <div style={styles.buttonContainer}>
            <button type="button" onClick={calculateBMI} style={styles.button}>
              🔄 Calculate BMI
            </button>
          </div>

          {bmi && (
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <h3>BMI Result: {bmi}</h3>
              <p>Category: {getBMICategory(bmi)}</p>
              <button type="button" onClick={saveBMI} style={styles.saveButton}>
                💾 Save BMI Record
              </button>
            </div>
          )}

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
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1f2233 0%, #2b2e44 100%)",
    padding: "2rem 1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "rgba(44, 47, 68, 0.95)",
    borderRadius: "12px",
    padding: "3rem",
    width: "100%",
    maxWidth: "500px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
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
    marginBottom: "1.5rem",
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
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "#3a3f5c",
    color: "#ffffff",
    outline: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  button: {
    width: "100%",
    padding: "14px 0",
    fontSize: "1rem",
    borderRadius: "8px",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#fff",
    background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255,126,95,0.5)",
  },
  saveButton: {
    marginTop: "1rem",
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "8px",
    fontWeight: "600",
    color: "#fff",
    background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(76,175,80,0.5)",
  },
  successMessage: {
    marginTop: "1.5rem",
    padding: "1rem",
    textAlign: "center",
    borderRadius: "8px",
    backgroundColor: "rgba(31,60,31,0.7)",
    color: "#a5f3a5",
    fontWeight: "500",
  },
  errorMessage: {
    marginTop: "1.5rem",
    padding: "1rem",
    textAlign: "center",
    borderRadius: "8px",
    backgroundColor: "rgba(60,31,31,0.7)",
    color: "#f3a5a5",
    fontWeight: "500",
  },
};

export default BMICalculator;
