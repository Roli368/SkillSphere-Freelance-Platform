import React, { useState, useEffect } from 'react';
import './PaymentHistory.css';

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch from /api/payments
    setTimeout(() => {
      setTransactions([
        { _id: 'tx1', gigTitle: 'E-Commerce React App', amount: 1500, type: 'Escrow', status: 'Held in Escrow', date: '2026-07-21T10:00:00Z', gateway: 'Stripe' },
        { _id: 'tx2', gigTitle: 'Logo Design', amount: 300, type: 'Payout', status: 'Released', date: '2026-07-18T14:30:00Z', gateway: 'Razorpay' },
        { _id: 'tx3', gigTitle: 'Backend API Integration', amount: 500, type: 'Milestone', status: 'Pending', date: '2026-07-23T09:15:00Z', gateway: 'Stripe' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleReleaseEscrow = (id) => {
    setTransactions(transactions.map(t => t._id === id ? { ...t, status: 'Released' } : t));
    // Implementation calls PUT /api/payments/:id/release
  };

  if (loading) return <div className="payment-loading">Loading Transactions...</div>;

  return (
    <div className="payment-history-container">
      <header className="payment-header">
        <h1>Secure Payment History</h1>
        <p>Manage Escrow funds, view payouts, and track milestones.</p>
      </header>

      <div className="transactions-list">
        {transactions.map(tx => (
          <div key={tx._id} className="transaction-card">
            <div className="tx-main">
              <div className="tx-icon">
                {tx.type === 'Escrow' ? '🔒' : tx.type === 'Payout' ? '💸' : '🎯'}
              </div>
              <div className="tx-info">
                <h3>{tx.gigTitle}</h3>
                <p className="tx-meta">{new Date(tx.date).toLocaleDateString()} • via {tx.gateway}</p>
              </div>
            </div>
            
            <div className="tx-amount-status">
              <span className="tx-amount">${tx.amount}</span>
              <span className={`tx-status ${tx.status.toLowerCase().replace(/ /g, '-')}`}>
                {tx.status}
              </span>
            </div>
            
            {tx.status === 'Held in Escrow' && (
              <div className="tx-actions">
                <button className="btn-release" onClick={() => handleReleaseEscrow(tx._id)}>
                  Release Funds
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
