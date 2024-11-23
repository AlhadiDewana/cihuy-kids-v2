import axios from 'axios';

export const createApi = () => {
    const api = axios.create({
        baseURL: 'http://localhost:9001/api',
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
    getProfile: () => api.get('/user/profile'),  // Tambah endpoint get profile
    updateProfile: (data) => api.put('/user/profile', data),  // Tambah endpoint update profile
    changePassword: (data) => api.put('/user/change-password', data), // Tambah endpoint change password
};

export const paymentAPI = {
    createPayment: (data) => api.post('/payment/create', data),
    confirmPayment: (data) => api.post('/payment/confirm', data),
    getPaymentStatus: (id) => api.get(`/payment/status/${id}`),
    // tambahkan method payment lainnya sesuai kebutuhan
};

export const musicAPI = {
    uploadMusic: (data) => api.post('/music/upload', data),
    getAllMusic: () => api.get('/music'),
    getMusicById: (id) => api.get(`/music/${id}`),
    deleteMusic: (id) => api.delete(`/music/${id}`),
    updateMusic: (id, data) => api.put(`/music/${id}`, data),
    // tambahkan method music lainnya sesuai kebutuhan
};

export const readingAPI = {
    uploadReading: (data) => api.post('/reading/upload', data),
    getAllReading: () => api.get('/reading'),
    getReadingById: (id) => api.get(`/reading/${id}`),
    deleteReading: (id) => api.delete(`/reading/${id}`),
    updateReading: (id, data) => api.put(`/reading/${id}`, data),
    // tambahkan method reading lainnya sesuai kebutuhan
};

export const videoAPI = {
    uploadVideo: (data) => api.post('/video/upload', data),
    getAllVideos: () => api.get('/video'),
    getVideoById: (id) => api.get(`/video/${id}`),
    deleteVideo: (id) => api.delete(`/video/${id}`),
    updateVideo: (id, data) => api.put(`/video/${id}`, data),
    // tambahkan method video lainnya sesuai kebutuhan
};

export default api;