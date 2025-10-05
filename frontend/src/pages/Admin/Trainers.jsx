import React, { useState, useEffect } from "react";
import "../../styles/Admin/Trainer.css";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTrainer, setNewTrainer] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch trainers from API
  const fetchTrainers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/trainers/");
      const data = await response.json();
      setTrainers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trainers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // Add new trainer
  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/admin/trainers/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTrainer),
        }
      );

      if (response.ok) {
        setShowAddForm(false);
        setNewTrainer({
          username: "",
          name: "",
          email: "",
          password: "",
          phone_number: "",
        });
        fetchTrainers();
      }
    } catch (error) {
      console.error("Error adding trainer:", error);
    }
  };

  // Edit trainer
  const handleEditTrainer = (trainer) => {
    setEditingTrainer(trainer);
    setShowEditForm(true);
  };

  // Update trainer
  const handleUpdateTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/trainers/${editingTrainer.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingTrainer),
        }
      );

      if (response.ok) {
        setShowEditForm(false);
        setEditingTrainer(null);
        fetchTrainers();
      }
    } catch (error) {
      console.error("Error updating trainer:", error);
    }
  };

  // Delete trainer
  const handleDeleteTrainer = async (trainerId) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      try {
        await fetch(`http://127.0.0.1:8000/api/admin/trainers/${trainerId}/`, {
          method: "DELETE",
        });
        fetchTrainers();
      } catch (error) {
        console.error("Error deleting trainer:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="trainers">
      <div className="page-header">
        <h2>Trainer Management</h2>
        <button className="add-button" onClick={() => setShowAddForm(true)}>
          Add New Trainer
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, email, or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Add Trainer Form */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Trainer</h3>
            <form onSubmit={handleAddTrainer}>
              <input
                type="text"
                placeholder="Username"
                value={newTrainer.username}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, username: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Full Name"
                value={newTrainer.name}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newTrainer.email}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Initial Password"
                value={newTrainer.password}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, password: e.target.value })
                }
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newTrainer.phone_number}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, phone_number: e.target.value })
                }
                required
              />
              <div className="form-actions">
                <button type="submit">Add Trainer</button>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Trainer Form */}
      {showEditForm && editingTrainer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Trainer</h3>
            <form onSubmit={handleUpdateTrainer}>
              <input
                type="text"
                placeholder="Username"
                value={editingTrainer.username}
                onChange={(e) =>
                  setEditingTrainer({
                    ...editingTrainer,
                    username: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Full Name"
                value={editingTrainer.name}
                onChange={(e) =>
                  setEditingTrainer({ ...editingTrainer, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={editingTrainer.email}
                onChange={(e) =>
                  setEditingTrainer({
                    ...editingTrainer,
                    email: e.target.value,
                  })
                }
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={editingTrainer.phone_number}
                onChange={(e) =>
                  setEditingTrainer({
                    ...editingTrainer,
                    phone_number: e.target.value,
                  })
                }
                required
              />
              <div className="form-actions">
                <button type="submit">Update Trainer</button>
                <button type="button" onClick={() => setShowEditForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Trainers Table */}
      <table className="trainers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrainers.map((trainer) => (
            <tr key={trainer.id}>
              <td>{trainer.name}</td>
              <td>{trainer.username}</td>
              <td>{trainer.email}</td>
              <td>{trainer.phone_number}</td>
              <td>{trainer.join_date}</td>
              <td>
                <button
                  className="action-btn edit"
                  onClick={() => handleEditTrainer(trainer)}
                >
                  Edit ✏️
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteTrainer(trainer.id)}
                >
                  Delete 🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trainers;
