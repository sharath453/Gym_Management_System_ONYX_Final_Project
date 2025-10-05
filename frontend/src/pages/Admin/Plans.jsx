import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Plans.css";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    duration_days: "",
    price: ""
  });

  useEffect(() => {
    axios.get("/api/admin/plans/")
      .then(res => setPlans(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post("/api/admin/plans/", newPlan)
      .then(res => {
        setPlans([...plans, res.data]);
        setShowModal(false);
        setNewPlan({ name: "", duration_days: "", price: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="plans-page">
      <div className="header">
        <h2>Workout Plans</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>+ Create Plan</button>
      </div>

      <div className="plans-grid">
        {plans.map((p) => (
          <div key={p.id} className="plan-card">
            <h3>{p.name}</h3>
            <p>{p.duration_days} days • ${p.price}</p>
            <div className="actions">
              <button>Edit</button>
              <button>Assign</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create New Plan</h3>
            <input type="text" name="name" placeholder="Plan Name" value={newPlan.name} onChange={handleChange} />
            <input type="number" name="duration_days" placeholder="Duration (days)" value={newPlan.duration_days} onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" value={newPlan.price} onChange={handleChange} />
            <button onClick={handleSubmit}>Create Plan</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
