import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPet, submitAdoption } from '../services/api';

function AdoptionForm() {
  const { petId } = useParams();
  const navigate = useNavigate();
  let user = null;
  try { user = JSON.parse(localStorage.getItem('user')); } catch (e) {}
  const userId = localStorage.getItem('userId');

  const [pet, setPet] = useState(null);
  const [form, setForm] = useState({
    userId: parseInt(userId),
    petId: petId,
    petName: '',
    applicantName: user?.fullName || '',
    applicantEmail: user?.email || '',
    applicantPhone: user?.phone || '',
    applicantAddress: '',
    reasonForAdoption: '',
    hasExperience: false,
    homeEnvironment: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getPet(petId).then((data) => {
      setPet(data);
      setForm((f) => ({ ...f, petName: data.name }));
    }).catch(() => navigate('/pets'));
  }, [petId, navigate]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await submitAdoption(form);
      if (res.requestId) {
        setSuccess('Adoption request submitted successfully! We will review it shortly.');
        setTimeout(() => navigate('/profile'), 2000);
      } else {
        setError(res.message || 'Submission failed');
      }
    } catch (err) {
      setError(err.message || 'Submission failed');
    }
  };

  if (!user) {
    return <div className="auth-container"><p>Please <Link to="/login">login</Link> to submit an adoption request.</p></div>;
  }

  return (
    <div className="auth-container" style={{ maxWidth: '600px' }}>
      <h2>Adoption Application</h2>
      {pet && <p style={{ textAlign: 'center', marginBottom: '16px', color: '#7f8c8d' }}>Applying for: <strong>{pet.name}</strong> ({pet.breed})</p>}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="applicantName" value={form.applicantName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="applicantEmail" value={form.applicantEmail} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="applicantPhone" value={form.applicantPhone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea name="applicantAddress" value={form.applicantAddress} onChange={handleChange} rows="2" required />
        </div>
        <div className="form-group">
          <label>Why do you want to adopt this pet?</label>
          <textarea name="reasonForAdoption" value={form.reasonForAdoption} onChange={handleChange} rows="3" required />
        </div>
        <div className="form-group">
          <label>Home Environment</label>
          <select name="homeEnvironment" value={form.homeEnvironment} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="Apartment">Apartment</option>
            <option value="House with Yard">House with Yard</option>
            <option value="House without Yard">House without Yard</option>
            <option value="Farm">Farm</option>
          </select>
        </div>
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" name="hasExperience" checked={form.hasExperience} onChange={handleChange} style={{ width: 'auto' }} />
          <label style={{ margin: 0 }}>I have previous pet experience</label>
        </div>
        <button type="submit" className="btn btn-success" style={{ width: '100%' }}>Submit Application</button>
      </form>
    </div>
  );
}

export default AdoptionForm;
