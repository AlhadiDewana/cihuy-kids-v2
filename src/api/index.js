import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Redirect ke login jika menggunakan router
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    register: async (userData) => {
        const response = await api.post('/register', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    upgrade: async () => {
        const response = await api.post('/upgrade');
        return response.data;
    }
};

export default api;