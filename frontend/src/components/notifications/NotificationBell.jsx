import React, { useState, useEffect } from 'react';
import './Notifications.css';
// import { io } from "socket.io-client";

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simulated initial fetch
    const initialNotifs = [
      { _id: 'n1', type: 'payment', title: 'Payment Received', message: 'Escrow released $1500 for E-Commerce Gig.', read: false, createdAt: new Date() },
      { _id: 'n2', type: 'review', title: 'New Review', message: 'Client left a 5-star verified review.', read: false, createdAt: new Date(Date.now() - 3600000) },
      { _id: 'n3', type: 'gig', title: 'New Gig Match', message: 'A gig matches your AI skill profile.', read: true, createdAt: new Date(Date.now() - 86400000) }
    ];
    setNotifications(initialNotifs);
    setUnreadCount(initialNotifs.filter(n => !n.read).length);

    /* 
    // Socket.io integration
    const socket = io("http://localhost:5000");
    socket.emit("join", userId);

    socket.on("notification", (newNotif) => {
      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);
      
      // Optional: Browser Notification API
      if (Notification.permission === 'granted') {
        new Notification(newNotif.title, { body: newNotif.message });
      }
    });

    return () => socket.disconnect();
    */
  }, [userId]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
    // API call to PUT /api/notifications/read-all
  };

  return (
    <div className="notification-bell-wrapper">
      <button className="bell-icon" onClick={() => setIsOpen(!isOpen)}>
        🔔
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            <h4>Notifications</h4>
            <button onClick={markAllAsRead} className="mark-read-btn">Mark all read</button>
          </div>
          
          <div className="notification-list">
            {notifications.length === 0 ? (
              <p className="empty-notifs">No new notifications.</p>
            ) : (
              notifications.map(n => (
                <div key={n._id} className={`notification-item ${!n.read ? 'unread' : ''}`}>
                  <div className="notif-icon">
                    {n.type === 'payment' ? '💳' : n.type === 'review' ? '⭐' : '📢'}
                  </div>
                  <div className="notif-content">
                    <h5>{n.title}</h5>
                    <p>{n.message}</p>
                    <span className="time">{new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
