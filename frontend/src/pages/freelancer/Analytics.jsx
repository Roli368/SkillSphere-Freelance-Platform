import React, { useState, useEffect } from 'react';
import './Freelancer.css';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch from /api/analytics/:freelancerId
    setTimeout(() => {
      setData({
        profileViews: 1245,
        gigApplications: 34,
        totalEarnings: 8450,
        averageRating: 4.8,
        monthlyRevenue: [
          { month: 'Jan', amount: 1200 },
          { month: 'Feb', amount: 1900 },
          { month: 'Mar', amount: 1500 },
          { month: 'Apr', amount: 2200 },
          { month: 'May', amount: 1650 },
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="freelancer-loading">Loading Analytics...</div>;

  const maxRevenue = Math.max(...data.monthlyRevenue.map(m => m.amount));

  return (
    <div className="analytics-container">
      <header className="freelancer-header">
        <h1>Your Analytics</h1>
        <p>Track your performance, earnings, and profile reach</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon views">👁️</div>
          <h3>Profile Views</h3>
          <p className="stat-value">{data.profileViews.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon applications">📄</div>
          <h3>Gig Applications</h3>
          <p className="stat-value">{data.gigApplications}</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon earnings">💰</div>
          <h3>Total Earnings</h3>
          <p className="stat-value">${data.totalEarnings.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon rating">⭐</div>
          <h3>Average Rating</h3>
          <p className="stat-value">{data.averageRating}/5.0</p>
        </div>
      </div>

      <div className="chart-section">
        <h2>Monthly Revenue</h2>
        <div className="bar-chart">
          {data.monthlyRevenue.map((item, idx) => {
            const heightPercentage = (item.amount / maxRevenue) * 100;
            return (
              <div key={idx} className="bar-wrapper">
                <div className="bar" style={{ height: `${heightPercentage}%` }}>
                  <span className="tooltip">${item.amount}</span>
                </div>
                <span className="bar-label">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
