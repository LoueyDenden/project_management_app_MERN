import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProjectList.css';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false); // State variable to manage the visibility of the form

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:3000/project/all');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const navigate = useNavigate();

    const deleteProject = async (projectId) => {
        try {
            await axios.delete(`http://localhost:3000/project/delete/${projectId}`);
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm); // Toggle the visibility of the form
    };

    const handleFormSubmit = async (formData) => {
        try {
            // Make API call to add new project using formData
            // After adding the project, fetch the updated list of projects
            await axios.post('http://localhost:3000/project/add', formData);
            fetchProjects();
            // Hide the form after adding the project
            setShowForm(false);
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    return (
        <div className="project-list-container">
            <h2>Projects</h2>
            <button onClick={toggleForm} className="add-project-button">Add Project</button>
            {/* Render form if showForm is true */}
            {showForm && <ProjectForm onSubmit={handleFormSubmit} />}
            <div className="project-cards-container">
                {projects.map((project) => (
                    <div key={project._id} className="project-card" onClick={() => navigate(`/tasks/${project._id}`)}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <p>{project.date}</p>
                        <button
                            className="delete-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteProject(project._id);
                            }}
                        >
                            Delete Project
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProjectForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            title: '',
            description: '',
            date: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="project-form">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
            <button type="submit">Add</button>
        </form>
    );
};

export default ProjectList;
