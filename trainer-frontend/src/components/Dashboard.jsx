import React, { useState } from 'react';
import MembersList from './MembersList';
import Attendance from './Attendance';
import WorkoutPlan from './WorkoutPlan';
import DietPlan from './DietPlan';
import BMICalculator from './BMICalculator';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('members');

  const tabs = {
    members: 'Members',
    attendance: 'Attendance',
    workout: 'Workout Plans',
    diet: 'Diet Plans',
    bmi: 'BMI Calculator'
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Trainer Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      
      <nav className="tabs">
        {Object.entries(tabs).map(([key, label]) => (
          <button
            key={key}
            className={`tab ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="tab-content">
        {activeTab === 'members' && <MembersList />}
        {activeTab === 'attendance' && <Attendance />}
        {activeTab === 'workout' && <WorkoutPlan />}
        {activeTab === 'diet' && <DietPlan />}
        {activeTab === 'bmi' && <BMICalculator />}
      </div>
    </div>
  );
};

export default Dashboard;