import React, { useState, useEffect } from 'react';
import { dietAPI, membersAPI } from '../services/api';

const DietPlan = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [dietTime, setDietTime] = useState('');
  const [dietDetails, setDietDetails] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (error) {
      setMessage('Error fetching members: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember || !dietTime || !dietDetails.trim()) {
      setMessage('Please fill all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Format time properly for Django
      const dietData = {
        member: parseInt(selectedMember),
        diet_time: dietTime + ':00', // Add seconds for Django TimeField
        details: dietDetails,
        trainer: 1
      };

      console.log('Submitting diet:', dietData);
      
      const response = await dietAPI.create(dietData);
      console.log('Diet response:', response.data);
      
      setMessage('Diet plan created successfully!');
      setSelectedMember('');
      setDietTime('');
      setDietDetails('');
    } catch (error) {
      console.error('Error creating diet plan:', error);
      const errorMsg = error.response?.data || error.message || 'Error creating diet plan';
      setMessage('Error: ' + JSON.stringify(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diet-plan">
      <h2>Create Diet Plan</h2>
      <form onSubmit={handleSubmit} className="diet-form">
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
          <label>Diet Time:</label>
          <input
            type="time"
            value={dietTime}
            onChange={(e) => setDietTime(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Diet Details:</label>
          <textarea
            value={dietDetails}
            onChange={(e) => setDietDetails(e.target.value)}
            placeholder="Enter diet plan details (meals, portions, timing, etc.)..."
            rows="8"
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Diet Plan...' : 'Create Diet Plan'}
        </button>
      </form>
      
      {message && (
        <div className={message.includes('Error') ? 'error' : 'message'}>
          {message}
        </div>
      )}
    </div>
  );
};

export default DietPlan;