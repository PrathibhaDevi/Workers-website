import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateComplaint.css";

function UpdateComplaint() {
  const { type, id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Pending");
  const [cost, setCost] = useState("");
  const [reason, setReason] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    let normalizedStatus = status;
    if (status === "In Progress") normalizedStatus = "inprogress";
    if (status === "Resolved") normalizedStatus = "resolved";
    if (status === "Pending") normalizedStatus = "pending";

    await fetch(`http://localhost:5000/api/complaints/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: normalizedStatus,
        cost,
        reason,
      }),
    });

    navigate(`/${type}`);
  };

  return (
    <div className="update-container">
      <h1>Update Complaint</h1>

      <form onSubmit={handleUpdate}>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <label>Cost:</label>
        <input value={cost} onChange={(e) => setCost(e.target.value)} />

        <label>Reason:</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateComplaint;