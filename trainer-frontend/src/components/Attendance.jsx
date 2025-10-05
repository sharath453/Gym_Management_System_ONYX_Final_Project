import React, { useState, useEffect } from 'react';
import { attendanceAPI, membersAPI } from '../services/api';

const Attendance = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Present');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      console.log('Members for attendance:', response.data);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      setMessage('Error fetching members: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember) {
      setMessage('Please select a member');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const attendanceData = {
        member: parseInt(selectedMember),
        date: date,
        status: status,
        trainer: 1 // You might need to get this from logged-in trainer
      };

      console.log('Submitting attendance:', attendanceData);
      
      const response = await attendanceAPI.create(attendanceData);
      console.log('Attendance response:', response.data);
      
      setMessage('✅ Attendance marked successfully!');
      setSelectedMember('');
      setDate(new Date().toISOString().split('T')[0]);
      setStatus('Present');
    } catch (error) {
      console.error('Error marking attendance:', error);
      const errorMsg = error.response?.data || error.message || 'Error marking attendance';
      setMessage('❌ Error: ' + JSON.stringify(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance">
      <h2>📝 Mark Attendance</h2>
      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="form-group">
          <label>👥 Member:</label>
          <select 
            value={selectedMember} 
            onChange={(e) => setSelectedMember(e.target.value)}
            required
            disabled={loading}
            className="custom-select"
          >
            <option value="">👤 Select Member</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>
                👤 {member.name} (@{member.username})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>📅 Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={loading}
            className="custom-input"
          />
        </div>

        <div className="form-group">
          <label>📊 Status:</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
            className="custom-select"
          >
            <option value="Present">✅ Present</option>
            <option value="Absent">❌ Absent</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn btn-primary btn-lg"
          style={{ width: '100%' }}
        >
          {loading ? '🔄 Marking Attendance...' : '📝 Mark Attendance'}
        </button>
      </form>
      
      {message && (
        <div className={message.includes('❌') ? 'error' : 'message'}>
          {message}
        </div>
      )}

      {/* Quick Stats */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        background: 'rgba(75, 41, 41, 0.05)', 
        borderRadius: 'var(--border-radius)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--light)' }}>📊 Quick Stats</h4>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              {members.length}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(8, 4, 4, 0.7)' }}>
              Total Members
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
              {date === new Date().toISOString().split('T')[0] ? 'Today' : 'Selected'}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Date
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;