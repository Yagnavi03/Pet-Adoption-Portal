import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdoptions, approveAdoption, rejectAdoption, getPets, getPet, addPet, updatePet, deletePet, apiGet } from '../services/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  let user = null;
  try { user = JSON.parse(localStorage.getItem('user')); } catch (e) {}
  const storedRole = localStorage.getItem('role');
  const adminId = localStorage.getItem('userId');

  const [adoptions, setAdoptions] = useState([]);
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editPet, setEditPet] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPet, setNewPet] = useState({
    name: '', breed: '', age: '', gender: '', category: 'Dog',
    description: '', healthStatus: 'Vaccinated', adoptionStatus: 'Available',
  });

  useEffect(() => {
    const role = user?.role || storedRole;
    if (!user || role !== 'ADMIN') { navigate('/login'); return; }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const loadData = () => {
    getAdoptions().then((data) => { if (Array.isArray(data)) setAdoptions(data); }).catch(() => {});
    getPets().then((data) => { if (Array.isArray(data)) setPets(data); }).catch(() => {});
  };

  const showMsg = (msg, isError) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // --- Pet handlers ---
  const handleAddPet = async (e) => {
    e.preventDefault();
    try {
      await addPet(newPet);
      showMsg('Pet added successfully!');
      setShowAddForm(false);
      setNewPet({ name: '', breed: '', age: '', gender: '', category: 'Dog', description: '', healthStatus: 'Vaccinated', adoptionStatus: 'Available' });
      getPets().then((data) => { if (Array.isArray(data)) setPets(data); });
    } catch (err) { showMsg('Error: ' + err.message, true); }
  };

  const handleDeletePet = async (id) => {
    if (!window.confirm('Delete this pet?')) return;
    try {
      await deletePet(id);
      showMsg('Pet deleted!');
      getPets().then((data) => { if (Array.isArray(data)) setPets(data); });
    } catch (err) { showMsg('Error: ' + err.message, true); }
  };

  const handleEditPet = async (id) => {
    try {
      const data = await getPet(id);
      setEditPet(data);
    } catch (err) { showMsg('Error: ' + err.message, true); }
  };

  const handleSavePet = async () => {
    try {
      await updatePet(editPet.petId, editPet);
      showMsg('Pet updated!');
      setEditPet(null);
      getPets().then((data) => { if (Array.isArray(data)) setPets(data); });
    } catch (err) { showMsg('Error: ' + err.message, true); }
  };

  // --- Request handlers ---
  const handleStatus = async (id, status) => {
    try {
      if (status === 'APPROVED') await approveAdoption(id, adminId);
      else await rejectAdoption(id, adminId);
      showMsg(`Request ${status.toLowerCase()}!`);
      getAdoptions().then((data) => { if (Array.isArray(data)) setAdoptions(data); });
    } catch (err) { showMsg('Error: ' + err.message, true); }
  };

  const showRequest = async (id) => {
    try {
      const data = await apiGet('/adoptions/' + id);
      setSelectedRequest(data);
    } catch (err) { showMsg('Error: ' + err.message, true); }
  };

  const statusChip = (s) => ({
    display: 'inline-block', padding: '3px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 600,
    background: s === 'PENDING' ? '#fef3c7' : s === 'APPROVED' ? '#d1fae5' : '#fee2e2',
    color: s === 'PENDING' ? '#92400e' : s === 'APPROVED' ? '#065f46' : '#991b1b',
  });

  return (
    <div className="ad-container">
      {message && <div className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</div>}

      <h1 className="page-title">Admin Dashboard</h1>
      <p className="page-subtitle">Manage pets and adoption requests</p>

      <div className="ad-panels">
        {/* ===== LEFT: MANAGE PETS ===== */}
        <div className="ad-panel">
          <div className="ad-panel-header">
            <h2>Manage Pets</h2>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Cancel' : '+ Add Pet'}
            </button>
          </div>

          {showAddForm && (
            <form className="ad-form" onSubmit={handleAddPet}>
              <div className="ad-form-grid">
                <div className="form-group"><label>Name</label><input value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} required /></div>
                <div className="form-group"><label>Breed</label><input value={newPet.breed} onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })} required /></div>
                <div className="form-group"><label>Age</label><input type="number" value={newPet.age} onChange={(e) => setNewPet({ ...newPet, age: e.target.value })} required /></div>
                <div className="form-group"><label>Gender</label>
                  <select value={newPet.gender} onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}>
                    <option>Male</option><option>Female</option>
                  </select>
                </div>
                <div className="form-group"><label>Category</label>
                  <select value={newPet.category} onChange={(e) => setNewPet({ ...newPet, category: e.target.value })}>
                    <option>Dog</option><option>Cat</option><option>Bird</option><option>Rabbit</option><option>Other</option>
                  </select>
                </div>
                <div className="form-group"><label>Health</label>
                  <select value={newPet.healthStatus} onChange={(e) => setNewPet({ ...newPet, healthStatus: e.target.value })}>
                    <option>Vaccinated</option><option>Not Vaccinated</option><option>Needs Treatment</option>
                  </select>
                </div>
              </div>
              <div className="form-group"><label>Description</label><textarea value={newPet.description} onChange={(e) => setNewPet({ ...newPet, description: e.target.value })} rows={2} /></div>
              <button className="btn btn-success" type="submit">Add Pet</button>
            </form>
          )}

          {editPet && (
            <div className="ad-form">
              <h3>Edit {editPet.name}</h3>
              <div className="ad-form-grid">
                <div className="form-group"><label>Name</label><input value={editPet.name} onChange={(e) => setEditPet({ ...editPet, name: e.target.value })} /></div>
                <div className="form-group"><label>Breed</label><input value={editPet.breed} onChange={(e) => setEditPet({ ...editPet, breed: e.target.value })} /></div>
                <div className="form-group"><label>Age</label><input value={editPet.age} onChange={(e) => setEditPet({ ...editPet, age: e.target.value })} /></div>
                <div className="form-group"><label>Gender</label><input value={editPet.gender} onChange={(e) => setEditPet({ ...editPet, gender: e.target.value })} /></div>
                <div className="form-group"><label>Category</label><input value={editPet.category} onChange={(e) => setEditPet({ ...editPet, category: e.target.value })} /></div>
                <div className="form-group"><label>Health</label><input value={editPet.healthStatus || ''} onChange={(e) => setEditPet({ ...editPet, healthStatus: e.target.value })} /></div>
              </div>
              <div className="form-group"><label>Description</label><textarea value={editPet.description || ''} onChange={(e) => setEditPet({ ...editPet, description: e.target.value })} rows={2} /></div>
              <div className="form-group"><label>Status</label>
                <select value={editPet.adoptionStatus} onChange={(e) => setEditPet({ ...editPet, adoptionStatus: e.target.value })}>
                  <option>Available</option><option>Adopted</option>
                </select>
              </div>
              <div className="ad-form-actions">
                <button className="btn btn-success" onClick={handleSavePet}>Save</button>
                <button className="btn btn-light" onClick={() => setEditPet(null)}>Cancel</button>
              </div>
            </div>
          )}

          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr><th>ID</th><th>Name</th><th>Breed</th><th>Category</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {pets.length === 0 ? (
                  <tr><td colSpan="6" className="ad-empty-cell">No pets found</td></tr>
                ) : (
                  pets.map((pet) => (
                    <tr key={pet.petId}>
                      <td>#{pet.petId}</td>
                      <td>{pet.name}</td>
                      <td>{pet.breed}</td>
                      <td>{pet.category}</td>
                      <td><span style={statusChip(pet.adoptionStatus === 'Available' ? 'PENDING' : 'APPROVED')}>{pet.adoptionStatus}</span></td>
                      <td className="ad-actions-cell">
                        <button className="btn btn-sm btn-primary" onClick={() => handleEditPet(pet.petId)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeletePet(pet.petId)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== RIGHT: MANAGE REQUESTS ===== */}
        <div className="ad-panel">
          <div className="ad-panel-header">
            <h2>Manage Requests</h2>
          </div>

          {selectedRequest && (
            <div className="ad-detail-box">
              <h3>Request #{selectedRequest.requestId}</h3>
              <div className="ad-detail-grid">
                <div><strong>Pet:</strong> {selectedRequest.petName || '—'}</div>
                <div><strong>User:</strong> {selectedRequest.userName || selectedRequest.userId || '—'}</div>
                <div><strong>Date:</strong> {selectedRequest.requestDate ? new Date(selectedRequest.requestDate).toLocaleDateString() : '—'}</div>
                <div><strong>Status:</strong> <span style={statusChip(selectedRequest.status)}>{selectedRequest.status}</span></div>
                {selectedRequest.message && <div><strong>Message:</strong> {selectedRequest.message}</div>}
              </div>
              <div className="ad-detail-actions">
                <button className="btn btn-sm btn-success" onClick={() => handleStatus(selectedRequest.requestId, 'APPROVED')}>Approve</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleStatus(selectedRequest.requestId, 'REJECTED')}>Reject</button>
                <button className="btn btn-sm btn-light" onClick={() => setSelectedRequest(null)}>Back</button>
              </div>
            </div>
          )}

          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr><th>ID</th><th>Pet</th><th>User</th><th>Date</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {adoptions.length === 0 ? (
                  <tr><td colSpan="6" className="ad-empty-cell">No requests yet</td></tr>
                ) : (
                  adoptions.map((req) => (
                    <tr key={req.requestId}>
                      <td>#{req.requestId}</td>
                      <td>{req.petName || '—'}</td>
                      <td>{req.userName || req.userId || '—'}</td>
                      <td>{req.requestDate ? new Date(req.requestDate).toLocaleDateString() : '—'}</td>
                      <td><span style={statusChip(req.status)}>{req.status}</span></td>
                      <td className="ad-actions-cell">
                        <button className="btn btn-sm btn-success" onClick={() => handleStatus(req.requestId, 'APPROVED')}>Approve</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleStatus(req.requestId, 'REJECTED')}>Reject</button>
                        <button className="btn btn-sm btn-light" onClick={() => showRequest(req.requestId)}>View</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
