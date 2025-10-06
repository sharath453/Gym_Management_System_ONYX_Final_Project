import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import MembersList from './MembersList';
import Attendance from './Attendance';
import WorkoutPlan from './WorkoutPlan';
import DietPlan from './DietPlan';
import BMICalculator from './BMICalculator';
import ViewWorkouts from './ViewWorkouts';
import ViewDiets from './ViewDiets';
import ViewAttendance from './ViewAttendance';
import DashboardStats from './DashboardStats';
import MotivationSection from './MotivationSection';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const tabs = {
    dashboard: '📊 Dashboard',
    members: '👥 Members',
    attendance: '📝 Mark Attendance',
    viewAttendance: '📋 View Attendance',
    workout: '💪 Create Workout',
    viewWorkouts: '🏋️ View Workouts',
    diet: '🥗 Create Diet',
    viewDiets: '📋 View Diets',
    bmi: '⚖️ BMI Calculator'
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="animated-bg"></div>
      
      <header className="dashboard-header">
        <h1>FitVerse Trainer Pro</h1>
        <button onClick={handleLogout} className="btn btn-danger">
          🚪 Logout
        </button>
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
        {/* Motivation Section for all pages except dashboard */}
        {activeTab !== 'dashboard' && <MotivationSection />}
        
        {activeTab === 'dashboard' && <DashboardStats />}
        {activeTab === 'members' && <MembersList />}
        {activeTab === 'attendance' && <Attendance />}
        {activeTab === 'viewAttendance' && <ViewAttendance />}
        {activeTab === 'workout' && <WorkoutPlan />}
        {activeTab === 'viewWorkouts' && <ViewWorkouts />}
        {activeTab === 'diet' && <DietPlan />}
        {activeTab === 'viewDiets' && <ViewDiets />}
        {activeTab === 'bmi' && <BMICalculator />}
      </div>
    </div>
  );
};

export default Dashboard;