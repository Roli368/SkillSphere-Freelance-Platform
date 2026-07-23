import React, { useState, useEffect } from 'react';
import './Admin.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch from /api/admin/users
    setTimeout(() => {
      setUsers([
        { _id: '1', fullName: 'Alice Smith', email: 'alice@example.com', role: 'freelancer', isActive: true, isVerified: false },
        { _id: '2', fullName: 'Bob Jones', email: 'bob@example.com', role: 'client', isActive: true, isVerified: true },
        { _id: '3', fullName: 'Charlie Brown', email: 'charlie@example.com', role: 'freelancer', isActive: false, isVerified: false },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleSuspend = (id) => {
    setUsers(users.map(u => u._id === id ? { ...u, isActive: !u.isActive } : u));
    // Implementation would call PUT /api/admin/users/:id/suspend
  };

  const handleVerify = (id) => {
    setUsers(users.map(u => u._id === id ? { ...u, isVerified: true } : u));
    // Implementation would call PUT /api/admin/freelancer/:id/verify
  };

  if (loading) return <div className="admin-loading">Loading Users...</div>;

  return (
    <div className="manage-users-container">
      <header className="admin-header">
        <h1>User Management</h1>
        <p>Control access, verify freelancers, and manage platform safety</p>
      </header>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td><strong>{user.fullName}</strong></td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${user.role}`}>{user.role}</span>
                {user.isVerified && <span className="badge active" style={{marginLeft: '8px'}}>Verified</span>}
              </td>
              <td>
                <span className={`badge ${user.isActive ? 'active' : 'suspended'}`}>
                  {user.isActive ? 'Active' : 'Suspended'}
                </span>
              </td>
              <td>
                <button 
                  className="btn-small btn-suspend"
                  onClick={() => handleSuspend(user._id)}
                >
                  {user.isActive ? 'Suspend' : 'Unsuspend'}
                </button>
                {user.role === 'freelancer' && !user.isVerified && (
                  <button 
                    className="btn-small btn-verify"
                    onClick={() => handleVerify(user._id)}
                  >
                    Verify
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
