import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser, getUserAdoptions } from '../services/api';
import './UserProfile.css';

function UserProfile() {
  const navigate = useNavigate();
  const [userId] = useState(localStorage.getItem('userId'));
  const [user] = useState(() => { try { return JSON.parse(localStorage.getItem('user')); } catch (e) { return null; } });

  const [profile, setProfile] = useState({ fullName: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const [adoptions, setAdoptions] = useState([]);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (userId) {
      getUser(userId).then((data) => { if (data && data.userId) setProfile(data); }).catch(() => {});
      getUserAdoptions(userId).then((data) => { if (Array.isArray(data)) setAdoptions(data); }).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, refreshKey, navigate]);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const updated = await updateUser(userId, profile);
      if (updated && updated.userId) {
        setProfile(updated);
        localStorage.setItem('user', JSON.stringify(updated));
      }
      setEditing(false);
      setMessage('Profile updated!');
      setTimeout(() => setMessage(''), 3000);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  const statusStyle = (status) => ({
    display: 'inline-block', padding: '3px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 600,
    background: status === 'PENDING' ? '#fef3c7' : status === 'APPROVED' ? '#d1fae5' : '#fee2e2',
    color: status === 'PENDING' ? '#92400e' : status === 'APPROVED' ? '#065f46' : '#991b1b',
  });

  return (
    <div className="up-container">
      <div className="up-card">
        {message && <div className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</div>}

        {!editing ? (
          <>
            <div className="up-header">
              <div className="up-avatar">
                {(profile.fullName || 'U').charAt(0).toUpperCase()}
              </div>
              <h2>{profile.fullName || 'User'}</h2>
              <p className="up-email">{profile.email}</p>
            </div>
            <div className="up-details">
              <div className="up-detail"><span className="up-label">Email</span><span>{profile.email}</span></div>
              {profile.phone && <div className="up-detail"><span className="up-label">Phone</span><span>{profile.phone}</span></div>}
              {profile.address && <div className="up-detail"><span className="up-label">Address</span><span>{profile.address}</span></div>}
              {profile.city && <div className="up-detail"><span className="up-label">City</span><span>{profile.city}</span></div>}
              {profile.state && <div className="up-detail"><span className="up-label">State</span><span>{profile.state}</span></div>}
            </div>
            <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
          </>
        ) : (
          <div className="up-edit">
            <h2>Edit Profile</h2>
            <div className="form-group"><label>Full Name</label><input name="fullName" value={profile.fullName} onChange={handleChange} /></div>
            <div className="form-group"><label>Phone</label><input name="phone" value={profile.phone} onChange={handleChange} /></div>
            <div className="form-group"><label>Address</label><input name="address" value={profile.address} onChange={handleChange} /></div>
            <div className="form-group"><label>City</label><input name="city" value={profile.city} onChange={handleChange} /></div>
            <div className="form-group"><label>State</label><input name="state" value={profile.state} onChange={handleChange} /></div>
            <div className="form-group"><label>Pincode</label><input name="pincode" value={profile.pincode} onChange={handleChange} /></div>
            <div className="up-edit-actions">
              <button className="btn btn-success" onClick={handleSave}>Save</button>
              <button className="btn btn-light" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div className="up-history">
          <h3>Adoption History</h3>
          {adoptions.length === 0 ? (
            <p className="up-empty">No adoption requests yet.</p>
          ) : (
            <div className="up-table-wrap">
              <table className="up-table">
                <thead>
                  <tr><th>Pet</th><th>Date</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {adoptions.map((req) => (
                    <tr key={req.requestId}>
                      <td>{req.petName || '—'}</td>
                      <td>{req.requestDate ? new Date(req.requestDate).toLocaleDateString() : '—'}</td>
                      <td><span style={statusStyle(req.status)}>{req.status || '—'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
