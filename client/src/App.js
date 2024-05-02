import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import Header from './components/Header';
import './App.css';

const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., check if the token exists)
    const token = localStorage.getItem('token'); // Get the token from local storage
    return token !== null;
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" />;
}


function App() {
    return (
        <Router>
            <div className="app-container">
            <Header />
                <Routes>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/projects" element={<PrivateRoute> <ProjectList /> </PrivateRoute>}/>
                    <Route path="/tasks/:projectId" element={<PrivateRoute> <TaskList /> </PrivateRoute>}/>
                    <Route path="/" element={<LoginForm />} /> {/* Default route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
