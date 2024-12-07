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

    return api;
};

const api = createApi();

export const userAPI = {
    register: (data) => api.post('/register', data),
    login: (data) => api.post('/login', data),
    getProfile: () => api.get('/profile'),  // Tambah endpoint get profile
    getAllUsers: () => api.get('/all-users'),  // Tambah endpoint get profile
    updateProfile: (data) => api.put('/update-profile', data),  // Tambah endpoint update profile
    changePassword: (data) => api.put('/change-password', data),
    forgotPassword: (data) => api.post('/forgot-password', data),// Tambah endpoint change password
};

export const paymentAPI = {
    confirmPayment: (data) => api.post('/payment/confirm', data),
    getPaymentStatus: (id) => api.get(`/payment/status/${id}`),
    getAllPayments: () => api.get('/payments/all'),
    updatePayment: (id, data) => api.put(`/payments/approve/${id}`, data),
    deletePayment: (id) => api.delete(`/payment/${id}`),
    getPaymentById: (id) => api.get(`/payment/${id}`)
};

export const musicAPI = {
    uploadMusic: (data) => api.post('/music/upload', data, {
        
       
    }),
    getAllMusic: () => api.get('/music'),
    getMusicById: (id) => api.get(`/music/${id}`),
    deleteMusic: (id) => api.delete(`/music/${id}`),
    updateMusic: (id, data) => api.put(`/music/${id}`, data),
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
    uploadVideo: (formData) => api.post('/videos/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    getAllVideos: () => api.get('/videos'),
    getVideoById: (id) => api.get(`/videos/${id}`),
    deleteVideo: (id) => api.delete(`/videos/${id}`),
    updateVideo: (id, data) => api.put(`/videos/${id}`, data),
};

export default api;