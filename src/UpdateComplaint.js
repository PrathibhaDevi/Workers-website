import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateComplaint.css';

function UpdateComplaint() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Pending');
  const [cost, setCost] = useState('');
  const [reason, setReason] = useState('');
  const[complaints, setComplaints] = useState( () => {
    const storedComplaints=localStorage.getItem(type);
    return storedComplaints ? JSON.parse(storedComplaints) : [];
  });

  useEffect( () => {
    const complaint = complaints.find((c) => c.id === parseInt(id));
    if(complaint) {
      setStatus(complaint.status);
      setCost(complaint.cost);
      setReason(complaint.reason || '');
    }
  }, [complaints,id]);

  const handleUpdate = (e) => {
    //API call
    e.preventDefault();
    const updatedComplaints = complaints.map((complaint) => {
      if(complaint.id === parseInt(id)) {
        return { ...complaint, status, cost, reason }; 
      }
      return complaint;
    });
    localStorage.setItem(type, JSON.stringify(updatedComplaints));
    navigate(`/${type}`);
  };

  return (
    <div className="update-container">
      <h1>Update Complaint</h1>
      <form>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <label>Cost:</label>
        <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} />
        <label>Reason:</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} /> 
        <button onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
}

export default UpdateComplaint;