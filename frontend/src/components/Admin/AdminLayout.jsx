import React from 'react';
import { useNavigate, NavLink, useLocation, Outlet } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/members', label: 'Members', icon: '👥' },
    { path: '/admin/trainers', label: 'Trainers', icon: '💪' },
    { path: '/admin/plans', label: 'Plans', icon: '📋' },
    { path: '/admin/profile', label: 'Profile', icon: '👤' }, // Changed from settings
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>FitVerse</h2>
        </div>

        <nav className="nav-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="logout-section">
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            ↩️ Logout
          </button>
        </div>

        {/* Admin Info */}
        <div className="admin-section">
          <div className="admin-header">Admin</div>
          <div className="admin-role">Administrator</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="content-header">
          <h1>
            {menuItems.find(item => item.path === location.pathname)?.label ||
              'Dashboard'}
          </h1>
        </header>
        <div className="content-area">
          <Outlet /> {/* This renders the nested routes (Dashboard, Members, etc.) */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;