import axios from 'axios';

export const createApi = () => {
    const api = axios.create({
        baseURL: 'http://localhost:9000/api',
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });

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

    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
            }
            return Promise.reject(error);
        }
    );

    return api;
};

const api = createApi();

export const userAPI = {
    register: (data) => api.post('/register', data),
    login: (data) => api.post('/login', data),
    // ... rest of your api methods
};

export default api;