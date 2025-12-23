import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Complaints.css';

function LanComplaints() {
  const [complaints, setComplaints] = useState( () => {
    const storedComplaints = localStorage.getItem('lan');
    return storedComplaints ? JSON.parse(storedComplaints) : [
      { id: 1, problem: "Internet not working", priority: "Emergency", status: "Pending", cost: '', raeson: ''},
      { id: 2, problem: "Network issue", priority: "Normal", status: "In Progress", cost: '', reason: ''},
    ];
  });

  useEffect( () => {
    //API or axios
    localStorage.setItem('lan', JSON.stringify(complaints));
  }, [complaints]);

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src="/VNIT_logo.png" alt="Logo" />
          <span>VNIT, Nagpur</span>
        </div>
        <div className="heading">
          <h1>LAN Complaints</h1>
        </div>
        <div className="logout">
          <Link to="/" className="logout-link">LOGOUT</Link>
        </div>
      </nav>
      <div className="complaints-container">
        {complaints.length > 0 ? (
          complaints.map(complaint => (
            <div key={complaint.id} className="complaint">
              <p><span className="label">Problem:</span> {complaint.problem}</p>
              <p><span className="label">Priority:</span> {complaint.priority}</p>
              <p><span className="label">Status:</span> {complaint.status}</p>
              {complaint.cost && (<p><span className="label">Cost:</span> {complaint.cost}</p>)}
              {complaint.reason && (<p><span className="label">Reason:</span> {complaint.reason}</p>)}
              <Link to={`/update-complaint/lan/${complaint.id}`} className="update-link">Update Progress</Link>
            </div>
           ))
         ) : (
           <div style={{ textAlign: 'center', width: '100%', marginTop: '50px' }}>
              <h2>No complaints found</h2>
           </div>
      )}
      </div>
    </div>
  );
}

export default LanComplaints;