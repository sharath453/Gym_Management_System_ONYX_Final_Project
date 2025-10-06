import React, { useState, useEffect } from "react";
import "../../styles/Admin/Members.css";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAssignTrainerForm, setShowAssignTrainerForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [newMember, setNewMember] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    gender: "",
    phone_number: "",
    plan: "",
  });

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchTrainers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/trainers/");
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  // Assign trainer to member
  const handleAssignTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/members/${selectedMember.id}/assign_trainer/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trainer_id: selectedTrainer,
          }),
        }
      );

      if (response.ok) {
        setShowAssignTrainerForm(false);
        setSelectedMember(null);
        setSelectedTrainer("");
        fetchMembers(); // Refresh the list
        alert("Trainer assigned successfully!");
      }
    } catch (error) {
      console.error("Error assigning trainer:", error);
    }
  };

  // Fetch members and plans from API
  const fetchMembers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/members/");
      const data = await response.json();
      setMembers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching members:", error);
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/plans/");
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchPlans();
    fetchTrainers();
  }, []);

  // Get plan name by ID
  const getPlanName = (planId) => {
    const plan = plans.find((p) => p.id === planId);
    return plan ? plan.name : "No Plan";
  };
  // Get trainer name by ID
  const getTrainerName = (trainerId) => {
    const trainer = trainers.find((t) => t.id === trainerId);
    return trainer ? trainer.name : "No Trainer Assigned";
  };

  // Add new member
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/members/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });

      if (response.ok) {
        setShowAddForm(false);
        setNewMember({ name: "", email: "", phone: "", plan: "", gender: "" });
        fetchMembers(); // Refresh the list
      }
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  // Edit member
  const handleEditMember = (member) => {
    setEditingMember({
      ...member,
      plan_id: member.plan, // Copy plan value to plan_id for the form
    });
    setShowEditForm(true);
  };

  // Update member
  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/members/${editingMember.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: editingMember.username,
            name: editingMember.name,
            email: editingMember.email,
            gender: editingMember.gender,
            phone_number: editingMember.phone_number,
            plan: editingMember.plan_id, // Change plan_id to plan
          }),
        }
      );

      if (response.ok) {
        setShowEditForm(false);
        setEditingMember(null);
        fetchMembers(); // Refresh the list
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  // Delete member
  const handleDeleteMember = async (memberId) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await fetch(`http://127.0.0.1:8000/api/admin/members/${memberId}/`, {
          method: "DELETE",
        });
        fetchMembers(); // Refresh the list
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="members">
      <div className="page-header">
        <h2>Member Management</h2>
        <button className="add-button" onClick={() => setShowAddForm(true)}>
          Add New Member
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name,email or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Member</h3>
            <form onSubmit={handleAddMember}>
              <input
                type="text"
                placeholder="Username"
                value={newMember.username}
                onChange={(e) =>
                  setNewMember({ ...newMember, username: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Full Name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Initial Password"
                value={newMember.password}
                onChange={(e) =>
                  setNewMember({ ...newMember, password: e.target.value })
                }
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newMember.phone_number}
                onChange={(e) =>
                  setNewMember({ ...newMember, phone_number: e.target.value })
                }
              />
              <select
                value={newMember.plan}
                onChange={(e) =>
                  setNewMember({ ...newMember, plan: e.target.value })
                }
                required
              >
                <option value="">Select Plan</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
              <select
                value={newMember.gender}
                onChange={(e) =>
                  setNewMember({ ...newMember, gender: e.target.value })
                }
                required
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <div className="form-actions">
                <button type="submit">Add Member</button>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Assign Trainer Form */}
      {showAssignTrainerForm && selectedMember && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Assign Trainer to {selectedMember.name}</h3>
            <form onSubmit={handleAssignTrainer}>
              <select
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
                required
              >
                <option value="">Select Trainer</option>
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.name} - {trainer.specialty}
                  </option>
                ))}
              </select>
              <div className="form-actions">
                <button type="submit">Assign Trainer</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAssignTrainerForm(false);
                    setSelectedMember(null);
                    setSelectedTrainer("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Form */}
      {showEditForm && editingMember && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Member</h3>
            <form onSubmit={handleUpdateMember}>
              <input
                type="text"
                placeholder="Username"
                value={editingMember.username}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    username: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Full Name"
                value={editingMember.name}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={editingMember.email}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, email: e.target.value })
                }
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={editingMember.phone_number}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    phone_number: e.target.value,
                  })
                }
              />
              <select
                value={editingMember.plan_id}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    plan_id: parseInt(e.target.value),
                  })
                }
                required
              >
                <option value="">Select Plan</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
              <select
                value={editingMember.gender}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, gender: e.target.value })
                }
                required
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <div className="form-actions">
                <button type="submit">Update Member</button>
                <button type="button" onClick={() => setShowEditForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Members Table */}
      <table className="members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Plan</th>
            <th>Gender</th>
            <th>Join Date</th>
            <th>Assigned Trainer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.username}</td>
              <td>{member.email}</td>
              <td>{member.phone_number}</td>
              <td>{getPlanName(member.plan)}</td>
              <td>{member.gender}</td>
              <td>{member.join_date}</td>
              <td>
                {member.trainer
                  ? getTrainerName(member.trainer)
                  : "No Trainer Assigned"}
              </td>
              <td>
                <button
                  className="action-btn edit"
                  onClick={() => handleEditMember(member)}
                >
                  Edit ✏️
                </button>
                <button
                  className="action-btn assign"
                  onClick={() => {
                    setSelectedMember(member);
                    setShowAssignTrainerForm(true);
                  }}
                >
                  Assign Trainer 👥
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDeleteMember(member.id)}
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

export default Members;
