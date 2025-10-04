import React, { useEffect, useState } from "react";
import axios from "axios";
// import "../styles/Dashboard.css";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    total_members: 0,
    total_trainers: 0,
    total_plans: 0,
    attendance_records: 0
  });

  useEffect(() => {
    axios.get("/api/admin/dashboard/")
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="grid">
        <div className="card">
          <h3>{summary.total_members}</h3>
          <p>Total Members</p>
        </div>
        <div className="card">
          <h3>{summary.total_trainers}</h3>
          <p>Total Trainers</p>
        </div>
        <div className="card">
          <h3>{summary.total_plans}</h3>
          <p>Total Plans</p>
        </div>
        <div className="card">
          <h3>{summary.attendance_records}</h3>
          <p>Attendance Records</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
