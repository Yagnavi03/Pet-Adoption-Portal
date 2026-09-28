import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import PawLogo from '../assets/PawLogo';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await registerUser(form);

      if (res.success) {
        setSuccessMsg(res.message || "Registration Successful!");

        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('userId', res.data?.userId || '');
        localStorage.setItem('role', 'USER');

        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <PawLogo size={48} />
      </div>
      <h2>Create Account</h2>
      {successMsg && <div className="success-message">{successMsg}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" placeholder="John Doe" value={form.fullName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Create a strong password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Account</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#888' }}>
        Already have an account? <Link to="/login" style={{ color: '#ff8c42', fontWeight: 600 }}>Login here</Link>
      </p>
    </div>
  );
}

export default Register;
