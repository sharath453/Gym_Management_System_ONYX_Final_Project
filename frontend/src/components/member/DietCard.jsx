import React from 'react'

export default function DietCard({ diet }) {
  return (
    <div className="card">
      <h4>Time: {diet.diet_time || 'N/A'}</h4>
      <p>Details: {diet.details || 'No details available'}</p>
      <small>Trainer: {diet.trainer?.name || 'N/A'}</small>
    </div>
  )
}
