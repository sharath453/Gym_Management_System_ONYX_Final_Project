import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState({
    total_members: 0,
    active_trainers: 0,
    total_plans: 0,
    total_revenue: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/admin/dashboard/");
        setDashboard(res.data);
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
      }
    };

    fetchDashboard();
  }, []);

   return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>
      <div style={styles.cardContainer}>
        <div style={{ ...styles.card, backgroundColor: "#4caf50" }}>
          <h3>Total Members</h3>
          <p>{dashboard.total_members}</p>
        </div>
        <div style={{ ...styles.card, backgroundColor: "#2196f3" }}>
          <h3>Active Trainers</h3>
          <p>{dashboard.active_trainers}</p>
        </div>
        <div style={{ ...styles.card, backgroundColor: "#ff9800" }}>
          <h3>Total Plans</h3>
          <p>{dashboard.total_plans}</p>
        </div>
        <div style={{ ...styles.card, backgroundColor: "#9c27b0" }}>
          <h3>Total Revenue</h3>
          <p>₹ {dashboard.total_revenue}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    padding: "30px",
    textAlign: "center",
    background: "linear-gradient(135deg, #f3f3f3, #ddd)",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    flex: "1 1 200px",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    transition: "transform 0.2s ease-in-out",
  },
};

export default AdminDashboard;