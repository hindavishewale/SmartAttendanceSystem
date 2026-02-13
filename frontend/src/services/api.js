import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentAPI = {
  getAll: () => api.get('/students'),
  getById: (id) => api.get(`/students/${id}`),
  add: (student) => api.post('/students', student),
  update: (id, student) => api.put(`/students/${id}`, student),
  delete: (id) => api.delete(`/students/${id}`),
};

export const attendanceAPI = {
  getAll: () => api.get('/attendance'),
  getById: (id) => api.get(`/attendance/${id}`),
  add: (attendance) => api.post('/attendance', attendance),
  update: (id, attendance) => api.put(`/attendance/${id}`, attendance),
  delete: (id) => api.delete(`/attendance/${id}`),
};

export default api;
