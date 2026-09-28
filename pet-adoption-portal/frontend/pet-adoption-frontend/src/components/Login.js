import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import PawLogo from '../assets/PawLogo';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', role: 'USER' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser(form);
      if (res.success) {
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('userId', res.data?.userId ?? res.data);
        localStorage.setItem('role', res.role || 'USER');
        navigate(res.role === 'ADMIN' ? '/admin' : '/');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <PawLogo size={48} />
      </div>
      <h2>Welcome Back</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Login as</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#888' }}>
        Don't have an account? <Link to="/register" style={{ color: '#ff8c42', fontWeight: 600 }}>Register here</Link>
      </p>
    </div>
  );
}

export default Login;
