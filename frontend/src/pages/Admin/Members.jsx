import React, { useState, useEffect } from 'react';
import '../../styles/Admin/Members.css';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    plan: '',
    gender: ''
  });

  // Fetch members and plans from API
  const fetchMembers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/members/');
      const data = await response.json();
      setMembers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching members:', error);
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/plans/');
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchPlans();
  }, []);

  // Get plan name by ID
  const getPlanName = (planId) => {
    const plan = plans.find(p => p.id === planId);
    return plan ? plan.name : 'No Plan';
  };

  // Add new member
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/members/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });
      
      if (response.ok) {
        setShowAddForm(false);
        setNewMember({ name: '', email: '', phone: '', plan: '', gender: '' });
        fetchMembers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  // Edit member
  const handleEditMember = (member) => {
    setEditingMember(member);
    setShowEditForm(true);
  };

  // Update member
  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/members/${editingMember.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingMember),
      });
      
      if (response.ok) {
        setShowEditForm(false);
        setEditingMember(null);
        fetchMembers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  // Delete member
  const handleDeleteMember = async (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await fetch(`http://127.0.0.1:8000/api/admin/members/${memberId}/`, {
          method: 'DELETE',
        });
        fetchMembers(); // Refresh the list
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="members">
      <div className="page-header">
        <h2>Member Management</h2>
        <button 
          className="add-button"
          onClick={() => setShowAddForm(true)}
        >
          Add New Member
        </button>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Member</h3>
            <form onSubmit={handleAddMember}>
              <input
                type="text"
                placeholder="Full Name"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newMember.phone}
                onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                required
              />
              <select
                value={newMember.plan}
                onChange={(e) => setNewMember({...newMember, plan: e.target.value})}
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
                onChange={(e) => setNewMember({...newMember, gender: e.target.value})}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
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

      {/* Edit Member Form */}
      {showEditForm && editingMember && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Member</h3>
            <form onSubmit={handleUpdateMember}>
              <input
                type="text"
                placeholder="Full Name"
                value={editingMember.name}
                onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={editingMember.email}
                onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                required
              />
              {/* <input
                type="tel"
                placeholder="Phone"
                value={editingMember.phone}
                onChange={(e) => setEditingMember({...editingMember, phone: e.target.value})}
                required
              /> */}
              <select
                value={editingMember.plan}
                onChange={(e) => setEditingMember({...editingMember, plan: e.target.value})}
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
                onChange={(e) => setEditingMember({...editingMember, gender: e.target.value})}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
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
            <th>Plan</th>
            <th>Gender</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.username}</td>
              <td>{member.email}</td>
              <td>{getPlanName(member.plan)}</td>
              <td>{member.gender}</td>
              <td>{member.join_date}</td>
              <td>
                <button 
                  className="action-btn edit"
                  onClick={() => handleEditMember(member)}
                >
                  ☑
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => handleDeleteMember(member.id)}
                >
                  🗑
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