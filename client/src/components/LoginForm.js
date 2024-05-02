// src/components/LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    // State variables to store form data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make HTTP POST request to login user
            const response = await axios.post('http://localhost:3000/user/login', {
                email,
                password
            });
            console.log('User logged in successfully:', response.data);
            localStorage.setItem('token', response.data.token);

            navigate('/projects');
            // Optionally, redirect to dashboard or show a success message
        } catch (error) {
            console.error('Error logging in user:', error);
            // Handle error, e.g., show error message to user
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" required />
                </label>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
