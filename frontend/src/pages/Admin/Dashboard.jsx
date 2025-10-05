import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Admin/Dashboard.css";

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
        const res = await axios.get(
          "http://127.0.0.1:8000/api/admin/dashboard/"
        );
        setDashboard(res.data);
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Admin Dashboard</h2>
      <div className="dashboard-card-container">
        <div className="dashboard-card total-members">
          <h3>Total Members</h3>
          <p>{dashboard.total_members}</p>
        </div>
        <div className="dashboard-card active-trainers">
          <h3>Active Trainers</h3>
          <p>{dashboard.active_trainers}</p>
        </div>
        <div className="dashboard-card total-plans">
          <h3>Total Plans</h3>
          <p>{dashboard.total_plans}</p>
        </div>
        <div className="dashboard-card total-revenue">
          <h3>Total Revenue</h3>
          <p>₹ {dashboard.total_revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
