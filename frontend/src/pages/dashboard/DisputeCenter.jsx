import React, { useState } from 'react';
import './DisputeCenter.css';

const DisputeCenter = () => {
  const [disputes, setDisputes] = useState([
    { _id: 'd1', gigTitle: 'E-Commerce Website', reason: 'Freelancer did not deliver source code.', status: 'Under Review', date: '2026-07-22' },
    { _id: 'd2', gigTitle: 'Logo Design', reason: 'Client refusing to release milestone.', status: 'Open', date: '2026-07-23' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newDispute, setNewDispute] = useState({ gigId: '', reason: '' });

  const handleSubmitDispute = () => {
    // API call to POST /api/disputes
    setDisputes([{ _id: Date.now().toString(), gigTitle: 'Selected Gig', reason: newDispute.reason, status: 'Open', date: new Date().toISOString().split('T')[0] }, ...disputes]);
    setShowModal(false);
  };

  return (
    <div className="dispute-center-container">
      <header className="dispute-header">
        <div className="header-text">
          <h1>Dispute Resolution Center</h1>
          <p>Open disputes for payment issues and track admin mediation.</p>
        </div>
        <button className="btn-new-dispute" onClick={() => setShowModal(true)}>Open New Dispute</button>
      </header>

      <div className="disputes-list">
        {disputes.length === 0 ? (
          <div className="empty-disputes">You have no active disputes.</div>
        ) : (
          disputes.map(dispute => (
            <div key={dispute._id} className="dispute-card">
              <div className="dispute-header-row">
                <span className="dispute-gig-title">{dispute.gigTitle}</span>
                <span className={`dispute-status ${dispute.status.replace(/ /g, '-').toLowerCase()}`}>
                  {dispute.status}
                </span>
              </div>
              <p className="dispute-reason"><strong>Reason:</strong> {dispute.reason}</p>
              <div className="dispute-footer">
                <span className="dispute-date">Opened on {dispute.date}</span>
                <button className="btn-view-details">Upload Evidence / View Details</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Open a Dispute</h3>
            <p className="modal-subtitle">Our admin team will mediate this issue.</p>
            
            <div className="form-group">
              <label>Select Gig / Transaction</label>
              <select value={newDispute.gigId} onChange={e => setNewDispute({...newDispute, gigId: e.target.value})}>
                <option value="">-- Select --</option>
                <option value="g1">E-Commerce Website</option>
                <option value="g2">Logo Design</option>
              </select>
            </div>

            <div className="form-group">
              <label>Reason for Dispute</label>
              <textarea 
                rows="4" 
                placeholder="Explain the issue in detail..."
                value={newDispute.reason}
                onChange={e => setNewDispute({...newDispute, reason: e.target.value})}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-submit-dispute" onClick={handleSubmitDispute}>Submit Dispute</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisputeCenter;
