import React from 'react'

export default function StatCard({ title, value }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{value}</p>
    </div>
  )
}
