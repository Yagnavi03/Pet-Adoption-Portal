import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPet, getImageUrl } from '../services/api';
import { PLACEHOLDER } from '../assets/images';
import './PetDetails.css';

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  let user = null;
  try { user = JSON.parse(localStorage.getItem('user')); } catch (e) {}

  useEffect(() => {
    setLoading(true);
    getPet(id).then(setPet).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pd-loading">
        <div className="pd-loader" />
        <p>Loading pet details...</p>
      </div>
    );
  }

  if (error) return <div className="error-message" style={{ maxWidth: 600, margin: '40px auto' }}>{error}</div>;
  if (!pet) return <p className="loading-text">Pet not found.</p>;

  const isAvail = pet.adoptionStatus === 'Available';

  return (
    <div className="pet-details">
      <div className="pd-back" onClick={() => navigate('/pets')}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Back to Pets
      </div>

      <div className="pd-hero">
        <img src={pet.imageUrl ? getImageUrl(pet.imageUrl) : (PLACEHOLDER[(pet.category || '').toLowerCase()] || PLACEHOLDER.other)} alt={pet.name} />
        <div className="pd-hero-overlay">
          <div className="pd-hero-text">
            <span className={`pd-hero-badge ${isAvail ? 'avail' : 'adopted'}`}>
              {isAvail ? 'Available for Adoption' : 'Adopted'}
            </span>
            <h1>{pet.name}</h1>
            <p className="pd-hero-breed">{pet.breed} &middot; {pet.category}</p>
          </div>
        </div>
      </div>

      <div className="pd-body">
        <div className="pd-main">
          <div className="pd-info-grid">
            <div className="pd-info-item"><span className="pd-info-label">Age</span><span>{pet.age} years</span></div>
            <div className="pd-info-item"><span className="pd-info-label">Gender</span><span>{pet.gender}</span></div>
            <div className="pd-info-item"><span className="pd-info-label">Size</span><span>{pet.size || 'N/A'}</span></div>
            <div className="pd-info-item"><span className="pd-info-label">Color</span><span>{pet.color || 'N/A'}</span></div>
            <div className="pd-info-item"><span className="pd-info-label">Location</span><span>{pet.location || 'N/A'}</span></div>
            <div className="pd-info-item"><span className="pd-info-label">Health</span><span>{pet.healthStatus || 'N/A'}</span></div>
            <div className="pd-info-item"><span className="pd-info-label">Vaccinations</span><span>{pet.vaccinations || 'N/A'}</span></div>
            <div className="pd-info-item"><span className="pd-info-label">Temperament</span><span>{pet.temperament || 'N/A'}</span></div>
          </div>

          <div className="pd-desc">
            <h3>About {pet.name}</h3>
            <p>{pet.description || 'No description available.'}</p>
          </div>

          {pet.specialNeeds && (
            <div className="pd-special">
              <h3>Special Needs</h3>
              <p>{pet.specialNeeds}</p>
            </div>
          )}
        </div>

        <div className="pd-sidebar">
          <div className="pd-sidebar-card">
            <div className="pd-sidebar-header">Adoption Details</div>
            <div className="pd-sidebar-body">
              <div className="pd-sidebar-row">
                <span>Status</span>
                <span className={`pd-status-badge ${isAvail ? 'green' : 'red'}`}>
                  {isAvail ? 'Available' : 'Adopted'}
                </span>
              </div>
              <div className="pd-sidebar-row">
                <span>Location</span>
                <span>{pet.location || 'N/A'}</span>
              </div>
              <div className="pd-sidebar-row">
                <span>Health</span>
                <span>{pet.healthStatus || 'N/A'}</span>
              </div>
              {isAvail ? (
                user ? (
                  <button className="btn btn-primary btn-lg pd-adopt-btn" onClick={() => navigate(`/adopt/${pet.petId}`)}>
                    Adopt {pet.name}
                  </button>
                ) : (
                  <div>
                    <p className="pd-login-msg">Login to apply for adoption.</p>
                    <Link to="/login" className="btn btn-primary btn-lg pd-adopt-btn">Login</Link>
                  </div>
                )
              ) : (
                <p className="pd-adopted-msg">This pet has already found their forever home!</p>
              )}
              <Link to="/pets" className="btn btn-outline pd-back-btn">Browse More Pets</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetails;
