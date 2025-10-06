import React, { useState, useEffect } from 'react';
import { dietAPI } from '../services/api';

const EditDietModal = ({ diet, isOpen, onClose, onUpdate }) => {
  const [dietTime, setDietTime] = useState('');
  const [dietDetails, setDietDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (diet) {
      setDietTime(diet.diet_time?.slice(0, 5) || '');
      setDietDetails(diet.details || '');
    }
  }, [diet]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dietTime || !dietDetails.trim()) {
      setMessage('Please fill all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const updatedDiet = {
        ...diet,
        diet_time: dietTime + ':00',
        details: dietDetails
      };

      const response = await dietAPI.update(diet.id, updatedDiet);
      onUpdate(response.data);
      setMessage('Diet plan updated successfully!');
      
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error updating diet:', error);
      setMessage('Error updating diet plan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Edit Diet Plan</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Diet Time</label>
              <input
                type="time"
                value={dietTime}
                onChange={(e) => setDietTime(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Diet Details</label>
              <textarea
                value={dietDetails}
                onChange={(e) => setDietDetails(e.target.value)}
                placeholder="Enter diet plan details..."
                rows="8"
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
              {loading ? 'Updating...' : 'Update Diet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDietModal;