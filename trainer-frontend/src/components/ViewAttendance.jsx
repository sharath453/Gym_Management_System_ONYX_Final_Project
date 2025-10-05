import React, { useState, useEffect } from "react";
import { attendanceAPI, membersAPI } from "../services/api";

const ViewAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [members, setMembers] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [attendanceResponse, membersResponse] = await Promise.all([
        attendanceAPI.list(),
        membersAPI.getAll(),
      ]);

      setAttendance(attendanceResponse.data);
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

  const filteredAttendance = filterDate
    ? attendance.filter((record) => record.date === filterDate)
    : attendance;

  const getStatusClass = (status) => {
    return status === "Present" ? "status-present" : "status-absent";
  };

  if (loading) return <div className="loading">Loading attendance...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-attendance">
      <div
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <h2>Attendance Records ({filteredAttendance.length})</h2>
        <div
          className="filters"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="Filter by date"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <button
            onClick={fetchData}
            className="refresh-btn"
            style={{
              padding: "0.5rem 1.5rem",
              borderRadius: "6px",
              border: "none",
              background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = 0.85)}
            onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
          >
            Refresh
          </button>
        </div>
      </div>

      {filteredAttendance.length === 0 ? (
        <div className="no-data">No attendance records found.</div>
      ) : (
        <div className="records-table">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((record) => (
                <tr key={record.id}>
                  <td>{getMemberName(record.member)}</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`status-badge ${getStatusClass(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewAttendance;
