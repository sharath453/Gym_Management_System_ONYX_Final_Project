import React from 'react'

export default function Header({ username }) {
  return (
    // rounded corners
    <header style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '10px 10px 10px 10px'}}>
      <h1>Member Portal</h1>
      <span style={{ borderRadius: '5px', padding: '0.5rem 1rem', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>{username}</span>
    </header>
  )
}
