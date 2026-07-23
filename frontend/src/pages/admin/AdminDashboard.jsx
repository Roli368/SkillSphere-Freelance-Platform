import React, { useState, useEffect } from 'react';
import './Admin.css';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch - replace with actual API call to /api/admin/analytics
    setTimeout(() => {
      setAnalytics({
        platformRevenue: 125400,
        activeFreelancers: 342,
        jobSuccessRate: 94,
        totalUsers: 1050,
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="admin-loading">Loading Dashboard...</div>;

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <h1>Admin Overview</h1>
        <p>Monitor platform health and key metrics</p>
      </header>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Platform Revenue</h3>
          <p className="metric-value">${analytics?.platformRevenue.toLocaleString()}</p>
          <div className="metric-indicator positive">+12% this month</div>
        </div>
        <div className="metric-card">
          <h3>Active Freelancers</h3>
          <p className="metric-value">{analytics?.activeFreelancers}</p>
          <div className="metric-indicator positive">+5% this month</div>
        </div>
        <div className="metric-card">
          <h3>Job Success Rate</h3>
          <p className="metric-value">{analytics?.jobSuccessRate}%</p>
          <div className="metric-indicator neutral">Stable</div>
        </div>
        <div className="metric-card">
          <h3>Total Users</h3>
          <p className="metric-value">{analytics?.totalUsers.toLocaleString()}</p>
          <div className="metric-indicator positive">+8% this month</div>
        </div>
      </div>

      <div className="admin-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <a href="/admin/users" className="btn-action">Manage Users</a>
          <a href="/admin/gigs" className="btn-action">Approve Gigs</a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
