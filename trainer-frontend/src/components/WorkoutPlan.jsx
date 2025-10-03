import React, { useState, useEffect } from 'react';
import { workoutAPI, membersAPI } from '../services/api';

const WorkoutPlan = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [workoutDetails, setWorkoutDetails] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      console.log('Members for workout:', response.data);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      setMessage('Error fetching members: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember || !workoutDetails.trim()) {
      setMessage('Please select a member and enter workout details');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const workoutData = {
        member: parseInt(selectedMember),
        details: workoutDetails,
        trainer: 1 // You might need to get this from logged-in trainer
      };

      console.log('Submitting workout:', workoutData);
      
      const response = await workoutAPI.create(workoutData);
      console.log('Workout response:', response.data);
      
      setMessage('Workout plan created successfully!');
      setSelectedMember('');
      setWorkoutDetails('');
    } catch (error) {
      console.error('Error creating workout plan:', error);
      const errorMsg = error.response?.data || error.message || 'Error creating workout plan';
      setMessage('Error: ' + JSON.stringify(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workout-plan">
      <h2>Create Workout Plan</h2>
      <form onSubmit={handleSubmit} className="workout-form">
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
          <label>Workout Details:</label>
          <textarea
            value={workoutDetails}
            onChange={(e) => setWorkoutDetails(e.target.value)}
            placeholder="Enter workout plan details (exercises, sets, reps, duration, etc.)..."
            rows="8"
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Workout Plan...' : 'Create Workout Plan'}
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
          Members loaded: {members.length}<br />
          Details length: {workoutDetails.length}
        </small>
      </div>
    </div>
  );
};

export default WorkoutPlan;