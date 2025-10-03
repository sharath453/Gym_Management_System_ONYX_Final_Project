import React, { useState, useEffect } from 'react';
import { membersAPI } from '../services/api';

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await membersAPI.getAll();
      console.log('Members data:', response.data);
      setMembers(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching members:', error);
      const errorMessage = error.response?.data?.detail || 
                          error.message || 
                          'Failed to fetch members';
      setError(errorMessage);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const retryFetch = () => {
    fetchMembers();
  };

  if (loading) return (
    <div className="loading">
      <div>Loading members...</div>
      <button onClick={retryFetch} style={{ marginTop: '1rem' }}>Retry</button>
    </div>
  );

  if (error) return (
    <div className="error">
      <div>{error}</div>
      <button onClick={retryFetch} style={{ marginTop: '1rem' }}>Retry</button>
    </div>
  );

  return (
    <div className="members-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>All Members ({members.length})</h2>
        <button onClick={fetchMembers}>Refresh</button>
      </div>
      
      {members.length === 0 ? (
        <div className="no-data">No members found in the database.</div>
      ) : (
        <div className="members-grid">
          {members.map(member => (
            <div key={member.id} className="member-card">
              <h3>{member.name || 'No Name'}</h3>
              <p><strong>Email:</strong> {member.email || 'N/A'}</p>
              <p><strong>Phone:</strong> {member.phone_number || 'N/A'}</p>
              <p><strong>Join Date:</strong> {member.join_date ? new Date(member.join_date).toLocaleDateString() : 'N/A'}</p>
              <p><strong>ID:</strong> {member.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MembersList;