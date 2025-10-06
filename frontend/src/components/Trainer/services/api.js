import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken
          });
          const newToken = response.data.access;
          localStorage.setItem('accessToken', newToken);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh token failed, logout user
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// API calls with better error handling
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/token/', credentials);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  },
  refreshToken: (refresh) => api.post('/token/refresh/', { refresh }),
};

export const membersAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/members/');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch members');
    }
  },
  get: (id) => api.get(`/members/${id}/`),
};

export const attendanceAPI = {
  create: async (data) => {
    try {
      const response = await api.post('/attendances/', data);
      return response;
    } catch (error) {
      console.error('Attendance API Error:', error.response?.data);
      throw error;
    }
  },
  update: (id, data) => api.put(`/attendances/${id}/`, data),
  list: () => api.get('/attendances/'),
  delete: (id) => api.delete(`/attendances/${id}/`),
};

 

export const workoutAPI = {
  create: (data) => api.post('/workouts/', data),
  update: (id, data) => api.put(`/workouts/${id}/`, data), // Make sure this exists
  list: () => api.get('/workouts/'),
  delete: (id) => api.delete(`/workouts/${id}/`),
};

export const dietAPI = {
  create: (data) => api.post('/diets/', data),
  update: (id, data) => api.put(`/diets/${id}/`, data), // Make sure this exists
  list: () => api.get('/diets/'),
  delete: (id) => api.delete(`/diets/${id}/`),
};

export const bmiAPI = {
  create: (data) => api.post('/bmis/', data),
  list: () => api.get('/bmis/'),
  calculate: (height, weight) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  },
};

// Test API connection
export const testAPI = {
  testConnection: () => api.get('/trainers/'),
};

export default api;