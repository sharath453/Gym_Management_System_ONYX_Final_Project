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
      
      setMessage('Attendance marked successfully!');
      setSelectedMember('');
      setDate(new Date().toISOString().split('T')[0]);
      setStatus('Present');
    } catch (error) {
      console.error('Error marking attendance:', error);
      const errorMsg = error.response?.data || error.message || 'Error marking attendance';
      setMessage('Error: ' + JSON.stringify(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance">
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="form-group">
          <label>Member:</label>
          <select 
            value={selectedMember} 
            onChange={(e) => setSelectedMember(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">Select Member</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.username})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Marking Attendance...' : 'Mark Attendance'}
        </button>
      </form>
      
      {message && (
        <div className={message.includes('Error') ? 'error' : 'message'}>
          {message}
        </div>
      )}

      {/* Debug info */}
      <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f5f5f5', borderRadius: '5px' }}>
        <small>
          <strong>Debug Info:</strong><br />
          Selected Member: {selectedMember}<br />
          Members loaded: {members.length}
        </small>
      </div>
    </div>
  );
};

export default Attendance;