import React from 'react'

export default function Header({ username }) {
  return (
    <header>
      <h1>Member Portal</h1>
      <span>{username}</span>
    </header>
  )
}
