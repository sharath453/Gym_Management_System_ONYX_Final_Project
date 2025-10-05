import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Member components
import Layout from './components/member/Layout'
import Dashboard from './components/member/Dashboard'
import ProfilePage from './components/member/ProfilePage'
import DietPage from './components/member/DietPage'
import WorkoutsPage from './components/member/WorkoutsPage'
import AttendancePage from './components/member/AttendancePage'
import BMIPage from './components/member/BMIPage'

export default function App() {
  return (
    <Routes>
      {/* Redirect root to member dashboard */}
      <Route path="/" element={<Navigate to="/member/Member/dashboard" replace />} />

      {/* Member pages */}
      <Route path="/member/:username/*" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="diet" element={<DietPage />} />
        <Route path="workouts" element={<WorkoutsPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="bmi" element={<BMIPage />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<div style={{ padding: '2rem' }}>404 - Page Not Found</div>} />
    </Routes>
  )
}
