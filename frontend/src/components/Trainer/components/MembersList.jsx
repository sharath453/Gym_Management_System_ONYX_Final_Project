import React, { useState, useEffect } from "react";
import { membersAPI } from "../services/api";

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await membersAPI.getAll();
      console.log("Members data:", response.data);
      setMembers(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching members:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        "Failed to fetch members";
      setError(errorMessage);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const retryFetch = () => {
    fetchMembers();
  };

  if (loading)
    return (
      <div className="loading">
        <div>🔄 Loading members...</div>
        <button
          onClick={retryFetch}
          className="btn btn-outline"
          style={{ marginTop: "1rem" }}
        >
          🔄 Retry
        </button>
      </div>
    );

  if (error)
    return (
      <div className="error">
        <div>❌ {error}</div>
        <button
          onClick={retryFetch}
          className="btn btn-outline"
          style={{ marginTop: "1rem" }}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="members-list">
      <div className="section-header">
        <h2>👥 All Members ({members.length})</h2>
        <button onClick={fetchMembers} className="btn btn-secondary">
          Refresh
        </button>
      </div>

      {members.length === 0 ? (
        <div className="no-data">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👥</div>
          <h3>No Members Found</h3>
          <p>There are no members in the database yet.</p>
        </div>
      ) : (
        <div className="members-grid">
          {members.map((member) => (
            <div key={member.id} className="member-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "var(--gradient-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {member.name ? member.name.charAt(0).toUpperCase() : "M"}
                </div>
                <div>
                  <h3>👤 {member.name || "No Name"}</h3>
                  <p
                    style={{
                      color: "var(--secondary)",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }}
                  >
                    @{member.username}
                  </p>
                </div>
              </div>

              <div className="member-details">
                <p>📧 {member.email || "N/A"}</p>
                <p>
                  📅 Joined:{" "}
                  {member.join_date
                    ? new Date(member.join_date).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  🎯 Membership:
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      marginLeft: "0.5rem",
                      background:
                        member.membership_type === "Premium"
                          ? "rgba(255, 159, 28, 0.2)"
                          : member.membership_type === "Gold"
                          ? "rgba(255, 215, 0, 0.2)"
                          : "rgba(255, 255, 255, 0.1)",
                      color:
                        member.membership_type === "Premium"
                          ? "var(--warning)"
                          : member.membership_type === "Gold"
                          ? "#ffd700"
                          : "var(--light)",
                      border:
                        member.membership_type === "Premium"
                          ? "1px solid rgba(255, 159, 28, 0.3)"
                          : member.membership_type === "Gold"
                          ? "1px solid rgba(255, 215, 0, 0.3)"
                          : "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {member.membership_type || "Basic"}
                  </span>
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255, 255, 255, 0.5)",
                    marginTop: "1rem",
                  }}
                >
                  🆔 ID: {member.id}
                </p>
              </div>

              {/* Quick Actions */}
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginTop: "1.5rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MembersList;
