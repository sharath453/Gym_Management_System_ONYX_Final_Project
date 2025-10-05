import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import './member.css'

export default function Layout() {
  const { username } = useParams()
  return (
    <div className="layout-container">
      <Sidebar username={username} />
      <div className="main-content">
        <Header username={username} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
