import React from 'react'
import { NavLink } from 'react-router-dom'
import LogoutButton from './logout'

export default function Sidebar({ username }) {
  const items = ['dashboard','profile','diet','workouts','attendance','bmi']
  return (
    <aside className="sidebar">
      <h2>Fitverse</h2>
      <p>{username}</p>
      <nav>
        {items.map(i => (
          <NavLink 
            key={i} 
            to={`/member/${username}/${i}`} 
            className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            {i.charAt(0).toUpperCase()+i.slice(1)}
          </NavLink>

        ))}
      </nav>
      <LogoutButton />
    </aside>
  )
}
