import React from 'react'

export default function AttendanceList({ attendance }) {
  return (
    <div className="card">
      <h3>Attendance</h3>
      <ul>
        {attendance.map((a, idx) => (
          <li key={idx}>{a.date}: {a.status}</li>
        ))}
      </ul>
    </div>
  )
}
