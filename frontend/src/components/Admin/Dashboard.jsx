import React from 'react';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const dashboardStats = [
    {
      title: 'Total Members',
      value: '3',
      icon: 'members',
      color: '#3B82F6'
    },
    {
      title: 'Active Trainers',
      value: 'All trainers active',
      icon: 'trainers',
      color: '#10B981'
    },
    {
      title: 'Workout Plans',
      value: '3 Ready to assign',
      icon: 'plans',
      color: '#8B5CF6'
    },
    {
      title: 'Monthly Revenue',
      value: '$12,450',
      subtitle: '+8% from last month',
      icon: 'revenue',
      color: '#F59E0B',
      trend: 'up'
    }
  ];

  // SVG Icons as components
  const MembersIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  );

  const TrainersIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"/>
    </svg>
  );

  const PlansIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"/>
    </svg>
  );

  const RevenueIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z"/>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd"/>
    </svg>
  );

  const TrendUpIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#10B981">
      <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 00-5.45 5.174.75.75 0 01-1.199.19L9 12.31l-6.22 6.22a.75.75 0 11-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l3.606 3.605a12.694 12.694 0 015.68-4.973l1.086-.484-4.251-1.631a.75.75 0 01-.432-.97z" clipRule="evenodd"/>
    </svg>
  );

  const StatCard = ({ stat }) => {
    const getIcon = () => {
      switch (stat.icon) {
        case 'members':
          return <MembersIcon />;
        case 'trainers':
          return <TrainersIcon />;
        case 'plans':
          return <PlansIcon />;
        case 'revenue':
          return <RevenueIcon />;
        default:
          return <MembersIcon />;
      }
    };

    return (
      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
            <div style={{ color: stat.color }}>
              {getIcon()}
            </div>
          </div>
        </div>
        <div className="stat-content">
          <h3 className="stat-value">{stat.value}</h3>
          <p className="stat-title">{stat.title}</p>
          {stat.subtitle && (
            <div className="stat-trend">
              <TrendUpIcon />
              <span style={{ color: '#10B981' }}>{stat.subtitle}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
      </div>

      <div className="stats-grid">
        {dashboardStats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      <div className="dashboard-content">
        {/* Additional dashboard widgets can be added here */}
        <div className="placeholder-content">
          <p>More dashboard content will be added here...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;