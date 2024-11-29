import axios from 'axios';


export const createApi = () => {
    const api = axios.create({
        baseURL: 'http://localhost:9000/api',
        headers: {
            'Content-Type': 'multipart/form-data'
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

export const paymentAPI = {
    createPayment: (data) => api.post('/payments/create', data),
};


export default api;