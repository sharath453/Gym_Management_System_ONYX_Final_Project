import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/Admin/admin';
import Dashboard from './pages/Admin/Dashboard';
import Members from './pages/Admin/Members';
// import Trainers from './pages/Admin/Trainers';
// import Plans from './pages/Plans';
// import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          {/* <Route path="/trainers" element={<Trainers />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;