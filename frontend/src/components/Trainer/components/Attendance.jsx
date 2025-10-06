import React, { useState, useEffect } from "react";
import { attendanceAPI, membersAPI } from "../services/api";

const Attendance = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("Present");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (error) {
      setMessage("Error fetching members: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember) {
      setMessage("Please select a member");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const attendanceData = {
        member: parseInt(selectedMember),
        date: date,
        status: status,
        trainer: 1,
      };

      await attendanceAPI.create(attendanceData);

      setMessage("✅ Attendance marked successfully!");
      setSelectedMember("");
      setDate(new Date().toISOString().split("T")[0]);
      setStatus("Present");
    } catch (error) {
      const errorMsg =
        error.response?.data || error.message || "Error marking attendance";
      setMessage("❌ Error: " + JSON.stringify(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  const dropdownStyle = {
    backgroundColor: "#2c2f44",
    color: "#ffffff",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "1px solid #4a4f6a",
    fontSize: "1rem",
    outline: "none",
    appearance: "none",
    cursor: "pointer",
  };

  return (
    <div className="attendance">
      <h2>📝 Mark Attendance</h2>
      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="form-group">
          <label>👥 Member:</label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            required
            disabled={loading}
            style={dropdownStyle}
          >
            <option value="">👤 Select Member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                👤 {member.name} (@{member.username})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>📅 Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={loading}
            className="custom-input"
          />
        </div>

        <div className="form-group">
          <label>📊 Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
            style={dropdownStyle}
          >
            <option value="Present"> Present</option>
            <option value="Absent"> Absent</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary btn-lg"
          style={{ width: "100%" }}
        >
          {loading ? "🔄 Marking Attendance..." : "📝 Mark Attendance"}
        </button>
      </form>

      {message && (
        <div className={message.includes("❌") ? "error" : "message"}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Attendance;
