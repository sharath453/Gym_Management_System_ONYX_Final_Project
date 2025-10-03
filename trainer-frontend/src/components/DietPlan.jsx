import React, { useState, useEffect } from 'react';
import { dietAPI, membersAPI } from '../services/api';

const DietPlan = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [dietTime, setDietTime] = useState('');
  const [dietDetails, setDietDetails] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (error) {
      setMessage('Error fetching members');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember || !dietTime || !dietDetails) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      await dietAPI.create({
        member: selectedMember,
        diet_time: dietTime,
        details: dietDetails
      });
      setMessage('Diet plan created successfully!');
      setSelectedMember('');
      setDietTime('');
      setDietDetails('');
    } catch (error) {
      setMessage('Error creating diet plan');
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
          >
            <option value="">Select Member</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>
                {member.name}
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
          />
        </div>

        <div className="form-group">
          <label>Diet Details:</label>
          <textarea
            value={dietDetails}
            onChange={(e) => setDietDetails(e.target.value)}
            placeholder="Enter diet plan details..."
            rows="8"
            required
          />
        </div>

        <button type="submit">Create Diet Plan</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default DietPlan;