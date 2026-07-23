import React, { useState, useEffect } from 'react';
import './ProjectTracker.css';

const ProjectProgressTracker = ({ gigId }) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch from /api/progress/:gigId
    setTimeout(() => {
      setProgress({
        completionPercentage: 65,
        milestones: [
          { _id: 'm1', title: 'Design Mockups', status: 'Approved', dueDate: '2026-08-01', amount: 300, files: [{ name: 'mockup.fig' }] },
          { _id: 'm2', title: 'Frontend Development', status: 'In Progress', dueDate: '2026-08-15', amount: 700, files: [] },
          { _id: 'm3', title: 'Backend API Integration', status: 'Pending', dueDate: '2026-08-30', amount: 500, files: [] },
        ],
        progressLogs: [
          { _id: 'l1', message: 'Completed initial wireframes and sent to client', timestamp: '2026-07-20T10:00:00Z' },
          { _id: 'l2', message: 'Client approved mockups. Starting frontend.', timestamp: '2026-07-22T14:30:00Z' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [gigId]);

  if (loading) return <div className="tracker-loading">Loading Project Progress...</div>;

  return (
    <div className="tracker-container">
      <header className="tracker-header">
        <h1>Project Workspace</h1>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progress.completionPercentage}%` }}></div>
        </div>
        <p className="progress-text">{progress.completionPercentage}% Completed</p>
      </header>

      <div className="tracker-grid">
        <div className="milestones-section">
          <h2>Milestones & Deliverables</h2>
          <div className="milestones-list">
            {progress.milestones.map((m, idx) => (
              <div key={m._id} className={`milestone-card ${m.status.toLowerCase().replace(' ', '-')}`}>
                <div className="milestone-header">
                  <h3>{idx + 1}. {m.title}</h3>
                  <span className={`status-badge ${m.status.toLowerCase().replace(' ', '-')}`}>{m.status}</span>
                </div>
                <div className="milestone-details">
                  <p><strong>Due:</strong> {new Date(m.dueDate).toLocaleDateString()}</p>
                  <p><strong>Amount:</strong> ${m.amount}</p>
                </div>
                {m.files.length > 0 && (
                  <div className="milestone-files">
                    <h4>Attached Files</h4>
                    <ul>
                      {m.files.map((file, fIdx) => (
                        <li key={fIdx}>📎 {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {m.status === 'In Progress' && (
                  <button className="btn-upload">Upload Deliverable</button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="logs-section">
          <h2>Progress Logs</h2>
          <div className="timeline">
            {progress.progressLogs.map(log => (
              <div key={log._id} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <p className="log-time">{new Date(log.timestamp).toLocaleString()}</p>
                  <p className="log-message">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="add-log">
            <input type="text" placeholder="Add a quick update..." className="log-input" />
            <button className="btn-log">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgressTracker;
