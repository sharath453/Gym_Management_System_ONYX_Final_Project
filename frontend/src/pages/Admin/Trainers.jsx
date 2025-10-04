import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../../styles/Trainer.css";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    email: "",
    phone_number: "",
    join_date: new Date().toISOString().split("T")[0]
  });

  useEffect(() => {
    axios.get(" http://127.0.0.1:8000/api/admin/trainers/")
      .then(res => {
        console.log("API response:", res.data);
        // Ensure trainers is always an array
        const trainersData = Array.isArray(res.data) ? res.data : [];
        setTrainers(trainersData);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setNewTrainer({ ...newTrainer, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post("/api/admin/trainers/", newTrainer)
      .then(res => {
        const addedTrainer = res.data;
        // Ensure addedTrainer is an object
        if (addedTrainer && typeof addedTrainer === "object") {
          setTrainers([...trainers, addedTrainer]);
        }
        setShowModal(false);
        setNewTrainer({
          name: "",
          email: "",
          phone_number: "",
          join_date: new Date().toISOString().split("T")[0]
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="trainers-page">
      <div className="header">
        <h2>Trainer Management</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>+ Add Trainer</button>
      </div>

      <table className="trainers-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Join Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(trainers) && trainers.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.phone_number}</td>
              <td>{t.join_date}</td>
              <td>
                <button>✏️</button>
                <button>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Trainer</h3>
            <input type="text" name="name" placeholder="Full Name" value={newTrainer.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={newTrainer.email} onChange={handleChange} />
            <input type="text" name="phone_number" placeholder="Phone Number" value={newTrainer.phone_number} onChange={handleChange} />
            <input type="date" name="join_date" value={newTrainer.join_date} onChange={handleChange} />
            <button onClick={handleSubmit}>Add Trainer</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainers;
