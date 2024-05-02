// src/components/RegisterForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';


const RegisterForm = () => {
    // State variables to store form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role is employee
    const navigate = useNavigate();


    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make HTTP POST request to register user
            const response = await axios.post('http://localhost:3000/user/register', {
                name,
                email,
                password,
                role
            });
            console.log('User registered successfully:', response.data);
            navigate('/login');
            // Optionally, redirect to login page or show a success message
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle error, e.g., show error message to user
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="register-input" required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="register-input" required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="register-input" required />
                </label>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
