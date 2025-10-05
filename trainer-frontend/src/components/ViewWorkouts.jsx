import React, { useState, useEffect } from "react";
import { workoutAPI, membersAPI } from "../services/api";
import EditWorkoutModal from "./EditWorkoutModal";

const ViewWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // Track which workout is being deleted

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [workoutsResponse, membersResponse] = await Promise.all([
        workoutAPI.list(),
        membersAPI.getAll(),
      ]);

      setWorkouts(workoutsResponse.data);
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

  const handleEdit = (workout) => {
    setEditingWorkout(workout);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedWorkout) => {
    setWorkouts(
      workouts.map((w) => (w.id === updatedWorkout.id ? updatedWorkout : w))
    );
  };

  const deleteWorkout = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout plan?")) {
      try {
        setDeletingId(id); // mark this workout as deleting
        await workoutAPI.delete(id); // delete from DB
        setWorkouts(workouts.filter((workout) => workout.id !== id)); // remove from UI
        alert("✅ Workout plan deleted successfully!");
      } catch (error) {
        console.error("Error deleting workout:", error);
        alert(
          "❌ Failed to delete workout plan: " +
            (error.response?.data || error.message)
        );
      } finally {
        setDeletingId(null); // reset deleting state
      }
    }
  };

  if (loading) return <div className="loading">Loading workouts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-workouts">
      <div className="section-header">
        <h2>All Workout Plans ({workouts.length})</h2>
        <button onClick={fetchData} className="btn btn-secondary">
          Refresh
        </button>
      </div>

      {workouts.length === 0 ? (
        <div className="no-data">No workout plans found.</div>
      ) : (
        <div className="records-table">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Workout Details</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{getMemberName(workout.member)}</td>
                  <td className="details-cell">
                    <div className="details-content">{workout.details}</div>
                  </td>
                  <td>{new Date(workout.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(workout)}
                        disabled={deletingId === workout.id} // disable edit only if this workout is deleting
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteWorkout(workout.id)}
                        disabled={deletingId === workout.id} // disable only this delete button
                      >
                        {deletingId === workout.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditWorkoutModal
        workout={editingWorkout}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default ViewWorkouts;
