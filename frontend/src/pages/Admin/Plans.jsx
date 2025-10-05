import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Admin/Plans.css";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ name: "", duration_days: "", price: "" });
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editingPlanData, setEditingPlanData] = useState({ name: "", duration_days: "", price: "" });
  const [isAdding, setIsAdding] = useState(false);

  const API_URL = "http://127.0.0.1:8000/api/admin/plan/";

  const fetchPlans = async () => {
    try {
      const res = await axios.get(API_URL);
      setPlans(res.data);
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, newPlan);
      setPlans([...plans, res.data]);
      setNewPlan({ name: "", duration_days: "", price: "" });
      setIsAdding(false);
    } catch (err) {
      console.error("Error adding plan:", err);
    }
  };

  const handleEditClick = (plan) => {
    setEditingPlanId(plan.id);
    setEditingPlanData({ name: plan.name, duration_days: plan.duration_days, price: plan.price });
  };

  const handleUpdatePlan = async (planId) => {
    try {
      const res = await axios.put(`${API_URL}${planId}/`, editingPlanData);
      setPlans(plans.map((p) => (p.id === planId ? res.data : p)));
      setEditingPlanId(null);
    } catch (err) {
      console.error("Error updating plan:", err);
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      await axios.delete(`${API_URL}${planId}/`);
      setPlans(plans.filter((p) => p.id !== planId));
    } catch (err) {
      console.error("Error deleting plan:", err);
    }
  };

  return (
    <div className="plan-container">
      <h2 className="plan-heading">Plans</h2>

      <table className="plan-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration (days)</th>
            <th>Price (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td>
                {editingPlanId === plan.id ? (
                  <input
                    type="text"
                    className="plan-input"
                    value={editingPlanData.name}
                    onChange={(e) => setEditingPlanData({ ...editingPlanData, name: e.target.value })}
                  />
                ) : (
                  plan.name
                )}
              </td>
              <td>
                {editingPlanId === plan.id ? (
                  <input
                    type="number"
                    className="plan-input"
                    value={editingPlanData.duration_days}
                    onChange={(e) => setEditingPlanData({ ...editingPlanData, duration_days: e.target.value })}
                  />
                ) : (
                  plan.duration_days
                )}
              </td>
              <td>
                {editingPlanId === plan.id ? (
                  <input
                    type="number"
                    className="plan-input"
                    value={editingPlanData.price}
                    onChange={(e) => setEditingPlanData({ ...editingPlanData, price: e.target.value })}
                  />
                ) : (
                  plan.price
                )}
              </td>
              <td>
                {editingPlanId === plan.id ? (
                  <button className="edit-btn" onClick={() => handleUpdatePlan(plan.id)}>Save</button>
                ) : (
                  <button className="edit-btn" onClick={() => handleEditClick(plan)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => handleDeletePlan(plan.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!isAdding ? (
        <button className="add-btn" onClick={() => setIsAdding(true)}>+ Add New Plan</button>
      ) : (
        <form className="plan-form" onSubmit={handleAddPlan}>
          <input
            type="text"
            className="plan-input"
            placeholder="Plan Name"
            value={newPlan.name}
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            required
          />
          <input
            type="number"
            className="plan-input"
            placeholder="Duration (days)"
            value={newPlan.duration_days}
            onChange={(e) => setNewPlan({ ...newPlan, duration_days: e.target.value })}
            required
          />
          <input
            type="number"
            className="plan-input"
            placeholder="Price (₹)"
            value={newPlan.price}
            onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
            required
          />
          <button type="submit" className="add-btn">Save Plan</button>
          <button type="button" className="cancel-btn" onClick={() => setIsAdding(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default Plans;
