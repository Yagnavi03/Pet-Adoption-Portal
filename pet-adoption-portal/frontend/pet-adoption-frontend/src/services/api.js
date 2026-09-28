const API_BASE = 'http://localhost:8080/api';

export async function apiGet(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export async function apiPost(endpoint, data) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Request failed');
  }
  return json;
}

export async function apiPut(endpoint, data) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Request failed');
  }
  return json;
}

export async function apiDelete(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Delete failed' }));
    throw new Error(err.message || 'Delete failed');
  }
  return true;
}

// Auth
export const registerUser = (data) => apiPost('/users/register', data);
export const loginUser = (data) => apiPost('/users/login', data);
export const registerAdmin = (data) => apiPost('/admin/register', data);

// Users
export const getUser = (id) => apiGet(`/users/${id}`);
export const updateUser = (id, data) => apiPut(`/users/${id}`, data);

// Pets
export const getPets = () => apiGet('/pets');
export const getAvailablePets = () => apiGet('/pets/available');
export const getPet = (id) => apiGet(`/pets/${id}`);
export const addPet = (data) => apiPost('/pets', data);
export const updatePet = (id, data) => apiPut(`/pets/${id}`, data);
export const deletePet = (id) => apiDelete(`/pets/${id}`);
export const searchPets = (params) => {
  const query = new URLSearchParams(params).toString();
  return apiGet(`/pets/search?${query}`);
};

// Adoptions
export const submitAdoption = (data) => apiPost('/adoptions', data);
export const getAdoptions = () => apiGet('/adoptions');
export const getUserAdoptions = (userId) => apiGet(`/adoptions/user/${userId}`);
export const approveAdoption = (id, adminId) => apiPut(`/adoptions/${id}/approve?adminId=${adminId}`);
export const rejectAdoption = (id, adminId) => apiPut(`/adoptions/${id}/reject?adminId=${adminId}`);

// Resolve image URL (handles both absolute and relative paths)
export function getImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const base = API_BASE.replace('/api', '');
  return `${base}${url}`;
}

// File Upload
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

// Admin
export const getDashboard = () => apiGet('/admin/dashboard');
