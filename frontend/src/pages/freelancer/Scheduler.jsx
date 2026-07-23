import React, { useState } from 'react';
import './Scheduler.css';

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookings, setBookings] = useState([
    { id: '1', title: 'Discovery Call with Creative Agency', time: '10:00 AM', status: 'Confirmed' },
    { id: '2', title: 'Project Kickoff - React App', time: '02:00 PM', status: 'Pending' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newSlot, setNewSlot] = useState({ time: '', title: '' });

  // Simple array to generate calendar days
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleAddSlot = () => {
    if (newSlot.time && newSlot.title) {
      setBookings([...bookings, { id: Date.now().toString(), title: newSlot.title, time: newSlot.time, status: 'Pending' }]);
      setShowModal(false);
      setNewSlot({ time: '', title: '' });
    }
  };

  return (
    <div className="scheduler-container">
      <header className="scheduler-header">
        <div>
          <h1>Availability Scheduler</h1>
          <p>Manage your working hours and upcoming client meetings.</p>
        </div>
        <button className="btn-add-slot" onClick={() => setShowModal(true)}>+ Add Availability Slot</button>
      </header>

      <div className="scheduler-grid">
        <div className="calendar-panel">
          <div className="calendar-month">July 2026</div>
          <div className="calendar-days-header">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>
          <div className="calendar-days">
            {/* Pad the start of month */}
            <span className="day empty"></span>
            <span className="day empty"></span>
            <span className="day empty"></span>
            {days.map(day => {
              const dateStr = `2026-07-${day.toString().padStart(2, '0')}`;
              const isSelected = dateStr === selectedDate;
              return (
                <button 
                  key={day} 
                  className={`day ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(dateStr)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="agenda-panel">
          <h3>Schedule for {new Date(selectedDate).toLocaleDateString()}</h3>
          {bookings.length > 0 ? (
            <div className="booking-list">
              {bookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-time">{booking.time}</div>
                  <div className="booking-details">
                    <h4>{booking.title}</h4>
                    <span className={`booking-status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                  </div>
                  <button className="btn-join">Details</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-agenda">No bookings or slots for this day.</div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Slot</h3>
            <div className="form-group">
              <label>Time</label>
              <input type="time" value={newSlot.time} onChange={(e) => setNewSlot({...newSlot, time: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Title/Description</label>
              <input type="text" placeholder="e.g. Available for consultation" value={newSlot.title} onChange={(e) => setNewSlot({...newSlot, title: e.target.value})} />
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-save" onClick={handleAddSlot}>Save Slot</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduler;
