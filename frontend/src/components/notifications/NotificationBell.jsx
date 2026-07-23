import React, { useState, useEffect } from 'react';
import './Notifications.css';
import { getSocket } from '../../services/socket';
import { getNotifications, getUnreadCount, markAllAsRead, markAsRead } from '../../services/notificationApi';

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    // Fetch initial notifications
    const fetchNotifs = async () => {
      try {
        const notifRes = await getNotifications();
        setNotifications(notifRes.data.data);
        
        const unreadRes = await getUnreadCount();
        setUnreadCount(unreadRes.data.data.count);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    
    fetchNotifs();

    // Socket.io integration
    const socket = getSocket();
    
    if (!socket.connected) {
      socket.connect();
    }
    
    socket.emit("join", userId);

    socket.on("notification", (newNotif) => {
      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);
      
      // Optional: Browser Notification API
      if (Notification.permission === 'granted') {
        new Notification(newNotif.title, { body: newNotif.message });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    });

    return () => {
      socket.off("notification");
    };
  }, [userId]);

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const handleMarkAsRead = async (id, isRead) => {
    if (isRead) return;
    try {
      await markAsRead(id);
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
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
            <button onClick={handleMarkAllAsRead} className="mark-read-btn">Mark all read</button>
          </div>
          
          <div className="notification-list">
            {notifications.length === 0 ? (
              <p className="empty-notifs">No new notifications.</p>
            ) : (
              notifications.map(n => (
                <div 
                  key={n._id} 
                  className={`notification-item ${!n.read ? 'unread' : ''}`}
                  onClick={() => handleMarkAsRead(n._id, n.read)}
                >
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
