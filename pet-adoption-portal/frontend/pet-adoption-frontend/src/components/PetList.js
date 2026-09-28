import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchPets, getPets, getImageUrl } from '../services/api';
import { PLACEHOLDER } from '../assets/images';
import './PetList.css';

function PetList() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', breed: '', location: '' });
  const [appliedFilters, setAppliedFilters] = useState({});

  let user = null;
  try { user = JSON.parse(localStorage.getItem('user')); } catch (e) {}

  useEffect(() => {
    const hasFilters = appliedFilters.category || appliedFilters.breed || appliedFilters.location;
    const fetcher = hasFilters
      ? searchPets({ ...appliedFilters })
      : getPets();
    fetcher.then((data) => { if (Array.isArray(data)) setPets(data); }).catch(() => {}).finally(() => setLoading(false));
  }, [appliedFilters]);

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const applyFilters = () => { setAppliedFilters({ ...filters }); setLoading(true); };
  const clearFilters = () => { setFilters({ category: '', breed: '', location: '' }); setAppliedFilters({}); setLoading(true); };
  const handleAdopt = (petId) => navigate(user ? `/adopt/${petId}` : '/login');

  const statusBadge = (status) => (
    <span className={`status-badge ${status === 'Available' ? 'avail' : 'adopted'}`}>
      {status === 'Available' ? 'Available' : 'Adopted'}
    </span>
  );

  return (
    <div className="pet-list-page">
      <div className="pl-header">
        <h1 className="page-title">Find Your Pet</h1>
        <p className="page-subtitle">Browse our lovable pets waiting for a forever home.</p>
      </div>

      <div className="pl-filters">
        <div className="pf-group">
          <label>Category</label>
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Dog">Dogs</option>
            <option value="Cat">Cats</option>
            <option value="Bird">Birds</option>
            <option value="Rabbit">Rabbits</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="pf-group">
          <label>Breed</label>
          <input type="text" name="breed" placeholder="Any breed" value={filters.breed} onChange={handleFilterChange} />
        </div>
        <div className="pf-group">
          <label>Location</label>
          <input type="text" name="location" placeholder="Any city" value={filters.location} onChange={handleFilterChange} />
        </div>
        <div className="pf-actions">
          <button className="btn btn-primary btn-sm" onClick={applyFilters}>Search</button>
          <button className="btn btn-light btn-sm" onClick={clearFilters}>Clear</button>
        </div>
      </div>

      {loading ? (
        <div className="pl-loading">
          <div className="pl-loader" />
          <p>Finding pets for you...</p>
        </div>
      ) : pets.length === 0 ? (
        <div className="pl-empty">
          <span className="pl-empty-icon">🐾</span>
          <h3>No pets found</h3>
          <p>Try adjusting your filters.</p>
          <button className="btn btn-outline btn-sm" onClick={clearFilters}>Clear Filters</button>
        </div>
      ) : (
        <div className="pl-grid">
          {pets.map((pet) => (
            <div className="pet-card-modern" key={pet.petId}>
              <div className="pcm-img">
                <img src={pet.imageUrl ? getImageUrl(pet.imageUrl) : (PLACEHOLDER[(pet.category || '').toLowerCase()] || PLACEHOLDER.other)} alt={pet.name} />
                {statusBadge(pet.adoptionStatus)}
              </div>
              <div className="pcm-body">
                <h3>{pet.name}</h3>
                <p className="pcm-breed">{pet.breed || 'Pet'}</p>
                <div className="pcm-meta">
                  <span>🎂 {pet.age} yr</span>
                  <span>⚤ {pet.gender || 'N/A'}</span>
                  <span>📍 {pet.location || 'N/A'}</span>
                </div>
                <div className="pcm-health">
                  <span className={`health-chip ${pet.healthStatus === 'Vaccinated' ? 'green' : 'amber'}`}>
                    {pet.healthStatus || 'Unknown'}
                  </span>
                </div>
                <div className="pcm-actions">
                  <Link to={`/pets/${pet.petId}`} className="btn btn-outline btn-sm">View Details</Link>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAdopt(pet.petId)}
                    disabled={pet.adoptionStatus !== 'Available'}
                  >
                    {pet.adoptionStatus === 'Available' ? 'Adopt Now' : 'Adopted'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PetList;
