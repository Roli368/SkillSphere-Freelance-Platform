import React, { useState, useEffect } from 'react';
import './Admin.css';

const ApproveGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch of pending gigs
    setTimeout(() => {
      setGigs([
        { _id: 'g1', title: 'Need React Developer for E-commerce', category: 'Web Development', budget: 1500, clientName: 'Acme Corp', status: 'Pending Approval' },
        { _id: 'g2', title: 'Logo Design for Startup', category: 'Graphic Design', budget: 300, clientName: 'StartUp Inc', status: 'Pending Approval' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleApprove = (id) => {
    setGigs(gigs.filter(g => g._id !== id));
    // Implementation would call PUT /api/admin/gigs/:id/approve
  };

  const handleReject = (id) => {
    setGigs(gigs.filter(g => g._id !== id));
    // Implementation would call an API to reject/delete gig
  };

  if (loading) return <div className="admin-loading">Loading Gigs...</div>;

  return (
    <div className="manage-users-container">
      <header className="admin-header">
        <h1>Approve Gigs</h1>
        <p>Review and moderate job postings before they go live.</p>
      </header>

      {gigs.length === 0 ? (
        <div className="admin-loading">No pending gigs to approve.</div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Category</th>
              <th>Client</th>
              <th>Budget</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gigs.map(gig => (
              <tr key={gig._id}>
                <td><strong>{gig.title}</strong></td>
                <td>{gig.category}</td>
                <td>{gig.clientName}</td>
                <td>${gig.budget}</td>
                <td>
                  <button 
                    className="btn-small btn-verify"
                    onClick={() => handleApprove(gig._id)}
                  >
                    Approve
                  </button>
                  <button 
                    className="btn-small btn-suspend"
                    onClick={() => handleReject(gig._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApproveGigs;
