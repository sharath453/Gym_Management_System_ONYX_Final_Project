import React, { useState, useEffect } from 'react';
import { bmiAPI, membersAPI } from '../services/api';

const BMICalculator = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
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

  const calculateBMI = () => {
    if (!height || !weight) {
      setMessage('Please enter both height and weight');
      return;
    }

    const bmiValue = bmiAPI.calculate(parseFloat(height), parseFloat(weight));
    setBmi(bmiValue);
    setMessage('');
  };

  const saveBMI = async () => {
    if (!selectedMember || !bmi) {
      setMessage('Please select a member and calculate BMI first');
      return;
    }

    try {
      await bmiAPI.create({
        member: selectedMember,
        height_cm: parseFloat(height),
        weight_kg: parseFloat(weight),
        bmi_value: parseFloat(bmi)
      });
      setMessage('BMI record saved successfully!');
      setSelectedMember('');
      setHeight('');
      setWeight('');
      setBmi(null);
    } catch (error) {
      setMessage('Error saving BMI record');
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      
      <div className="bmi-form">
        <div className="form-group">
          <label>Member:</label>
          <select 
            value={selectedMember} 
            onChange={(e) => setSelectedMember(e.target.value)}
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
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
            step="0.1"
          />
        </div>

        <button type="button" onClick={calculateBMI} className="calculate-btn">
          Calculate BMI
        </button>

        {bmi && (
          <div className="bmi-result">
            <h3>BMI Result: {bmi}</h3>
            <p>Category: {getBMICategory(bmi)}</p>
            <button type="button" onClick={saveBMI} className="save-btn">
              Save BMI Record
            </button>
          </div>
        )}
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default BMICalculator;