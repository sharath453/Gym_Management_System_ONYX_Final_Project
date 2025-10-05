import React, { useState, useEffect } from "react";
import { dietAPI, membersAPI } from "../services/api";
import EditDietModal from "./EditDietModal";

const ViewDiets = () => {
  const [diets, setDiets] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingDiet, setEditingDiet] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // Track which diet is being deleted

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dietsResponse, membersResponse] = await Promise.all([
        dietAPI.list(),
        membersAPI.getAll(),
      ]);

      setDiets(dietsResponse.data);
      setMembers(membersResponse.data);
    } catch (error) {
      setError("Failed to fetch data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getMemberName = (memberId) => {
    const member = members.find((m) => m.id === memberId);
    return member ? member.name : "Unknown Member";
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleEdit = (diet) => {
    setEditingDiet(diet);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedDiet) => {
    setDiets(diets.map((d) => (d.id === updatedDiet.id ? updatedDiet : d)));
  };

  const deleteDiet = async (id) => {
    if (window.confirm("Are you sure you want to delete this diet plan?")) {
      try {
        setDeletingId(id); // mark this diet as deleting
        await dietAPI.delete(id); // delete from database
        setDiets(diets.filter((diet) => diet.id !== id)); // remove from UI
        alert("✅ Diet plan deleted successfully!");
      } catch (error) {
        console.error("Error deleting diet:", error);
        alert(
          "❌ Failed to delete diet plan: " +
            (error.response?.data || error.message)
        );
      } finally {
        setDeletingId(null); // reset deleting state
      }
    }
  };

  if (loading) return <div className="loading">Loading diets...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-diets">
      <div className="section-header">
        <h2>All Diet Plans ({diets.length})</h2>
        <button onClick={fetchData} className="btn btn-secondary">
          Refresh
        </button>
      </div>

      {diets.length === 0 ? (
        <div className="no-data">No diet plans found.</div>
      ) : (
        <div className="records-table">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Time</th>
                <th>Diet Details</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {diets.map((diet) => (
                <tr key={diet.id}>
                  <td>{getMemberName(diet.member)}</td>
                  <td>{formatTime(diet.diet_time)}</td>
                  <td className="details-cell">
                    <div className="details-content">{diet.details}</div>
                  </td>
                  <td>{new Date(diet.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(diet)}
                        disabled={deletingId === diet.id}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteDiet(diet.id)}
                        disabled={deletingId === diet.id}
                      >
                        {deletingId === diet.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditDietModal
        diet={editingDiet}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default ViewDiets;
