// client/src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Helper function for fetch calls
const fetchWithAuth = async (url, options = {}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Add auth token if available
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers
  });

  // Handle 401 Unauthorized globally
  if (response.status === 401) {
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Your session has expired. Please log in again.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// API methods
export const api = {
  // Auth
  login: (email, password) => 
    fetchWithAuth('/auth/login', { 
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),
  
  register: (userData) => 
    fetchWithAuth('/auth/register', { 
      method: 'POST',
      body: JSON.stringify(userData)
    }),
  
   registerAdmin: (userData) => 
    fetchWithAuth('/auth/register', { 
      method: 'POST',
      body: JSON.stringify({...userData, role: 'admin'})
    }),  
     
  
  getProfile: () => 
    fetchWithAuth('/auth/profile'),
  
  updateProfile: (userData) => 
    fetchWithAuth('/auth/profile', { 
      method: 'PUT',
      body: JSON.stringify(userData)
    }),
  
  // Health check
  healthCheck: () => 
    fetchWithAuth('/health'),

  // Categories
  getCategories: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchWithAuth(`/categories${queryString ? `?${queryString}` : ''}`);
  },
  
  getCategoryById: (id) => 
    fetchWithAuth(`/categories/${id}`),
  
  createCategory: (categoryData) => 
    fetchWithAuth('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    }),
  
  updateCategory: (id, categoryData) => 
    fetchWithAuth(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData)
    }),
  
  deleteCategory: (id) => 
    fetchWithAuth(`/categories/${id}`, {
      method: 'DELETE'
    }),
  
  // Services
  getServices: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchWithAuth(`/services${queryString ? `?${queryString}` : ''}`);
  },
  
  getServiceById: (id) => 
    fetchWithAuth(`/services/${id}`),
  
  createService: (serviceData) => 
    fetchWithAuth('/services', {
      method: 'POST',
      body: JSON.stringify(serviceData)
    }),
  
  updateService: (id, serviceData) => 
    fetchWithAuth(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData)
    }),
  
  deleteService: (id) => 
    fetchWithAuth(`/services/${id}`, {
      method: 'DELETE'
    })
};

export default api;