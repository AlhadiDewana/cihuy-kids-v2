// src/components/auth/RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Password tidak cocok');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:9000/api/register', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.error || 'Registrasi gagal');
        } finally {
            setLoading(false);
        }
    };

    // ... rest of your form JSX similar to LoginForm
};