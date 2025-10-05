import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMemberProfile } from '../../api/api'
import StatCard from './StatCard'

export default function ProfilePage() {
  const { username } = useParams()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getMemberProfile(username).then(res => setProfile(res.data))
  }, [username])

  if (!profile) return <p>Loading...</p>

  return (
    <div>
      <h1>Profile</h1>
      <div className="grid grid-3">
        <StatCard title="Name" value={profile.name} />
        <StatCard title="Email" value={profile.email} />
        <StatCard title="Gender" value={profile.gender} />
        <StatCard title="Join Date" value={profile.join_date} />
        <StatCard title="Plan" value={profile.plan?.name || 'No Plan'} />
      </div>
    </div>
  )
}
