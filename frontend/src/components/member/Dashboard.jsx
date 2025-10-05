import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import  { getMemberDashboard } from '../../api/api'
import StatCard from './StatCard'
import BMIChart from './BMIChart'

export default function Dashboard() {
  const { username } = useParams()
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    getMemberDashboard(username).then(res => setDashboard(res.data))
  }, [username])

  if (!dashboard) return <p>Loading...</p>

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Welcome, {dashboard.name}</h1>
      <div className="grid grid-3">
        <StatCard title="Plan" value={dashboard.plan.name} />
        <StatCard title="Attendance %" value={dashboard.attendance_rate} />
        <StatCard title="Total Workouts" value={dashboard.total_workouts} />
        <StatCard title="Latest BMI" value={dashboard.latest_bmi.bmi_value} />
      </div>
      <BMIChart data={[dashboard.latest_bmi]} />
    </div>
  )
}
