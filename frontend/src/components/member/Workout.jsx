import React from 'react'

export default function WorkoutCard({ workout }) {
  return (
    <div className="card">
      <h4>Date: {new Date(workout.created_at).toLocaleDateString() || 'N/A'}</h4>
      <p>Details: {workout.details || 'No details available'}</p>
    </div>
  )
}
