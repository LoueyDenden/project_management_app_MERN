import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Log out the user by removing the token
        localStorage.removeItem('token');
        // Redirect to login page after logout
        navigate('/login', { replace: true });
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="header">
            {localStorage.getItem('token') ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={handleRegister}>Register</button>
            )}
        </div>
    );
};

export default Header;
