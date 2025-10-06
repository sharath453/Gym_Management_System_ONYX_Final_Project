import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {getMemberWorkouts} from '../../api/api'
import WorkoutCard from './Workout'

export default function WorkoutsPage() {
  const { username } = useParams()
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    getMemberWorkouts(username).then(res => setWorkouts(res.data))
  }, [username])

  return (
    <div>
      <h1>Workouts</h1>
      <div className="grid grid-3">
        {workouts.map(w => <WorkoutCard key={w.id} workout={w} />)}
      </div>
    </div>
  )
}
