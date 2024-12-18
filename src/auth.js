// utils/auth.js
export const login = (userData, token) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData));
};

export const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
};

export const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

export const getUserData = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
};