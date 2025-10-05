import React, { useState, useEffect } from 'react';
import { workoutAPI } from '../services/api';

const EditWorkoutModal = ({ workout, isOpen, onClose, onUpdate }) => {
  const [workoutDetails, setWorkoutDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (workout) {
      setWorkoutDetails(workout.details || '');
    }
  }, [workout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!workoutDetails.trim()) {
      setMessage('Please enter workout details');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const updatedWorkout = {
        ...workout,
        details: workoutDetails
      };

      const response = await workoutAPI.update(workout.id, updatedWorkout);
      onUpdate(response.data);
      setMessage('Workout plan updated successfully!');
      
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error updating workout:', error);
      setMessage('Error updating workout plan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Edit Workout Plan</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Workout Details</label>
              <textarea
                value={workoutDetails}
                onChange={(e) => setWorkoutDetails(e.target.value)}
                placeholder="Enter workout plan details..."
                rows="10"
                required
                disabled={loading}
              />
            </div>
            
            {message && (
              <div className={message.includes('Error') ? 'error' : 'message'}>
                {message}
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Workout'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkoutModal;