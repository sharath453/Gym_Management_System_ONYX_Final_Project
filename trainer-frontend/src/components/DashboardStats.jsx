import React, { useState, useEffect } from 'react';
import { membersAPI, attendanceAPI, workoutAPI, dietAPI } from '../services/api';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    todayAttendance: 0,
    totalWorkouts: 0,
    totalDiets: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const [membersResponse, attendanceResponse, workoutsResponse, dietsResponse] = await Promise.all([
        membersAPI.getAll(),
        attendanceAPI.list(),
        workoutAPI.list(),
        dietAPI.list()
      ]);

      const todayRecords = attendanceResponse.data.filter(record => record.date === today);
      
      setStats({
        totalMembers: membersResponse.data.length,
        todayAttendance: todayRecords.length,
        totalWorkouts: workoutsResponse.data.length,
        totalDiets: dietsResponse.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading statistics...</div>;

  return (
    <div className="dashboard-stats">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Members</h3>
          <div className="stat-number">{stats.totalMembers}</div>
        </div>
        <div className="stat-card">
          <h3>Today's Attendance</h3>
          <div className="stat-number">{stats.todayAttendance}</div>
        </div>
        <div className="stat-card">
          <h3>Workout Plans</h3>
          <div className="stat-number">{stats.totalWorkouts}</div>
        </div>
        <div className="stat-card">
          <h3>Diet Plans</h3>
          <div className="stat-number">{stats.totalDiets}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;