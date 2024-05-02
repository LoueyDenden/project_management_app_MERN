import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';
import { useParams } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [editingTask, setEditingTask] = useState(null); // Track the task being edited
    const { projectId } = useParams();

    const fetchTasksByProject = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/task/gettaskbyproject/${projectId}`);
            setTasks(response.data);

            const projectResponse = await axios.get(`http://localhost:3000/project/get/${projectId}`);
            setProjectName(projectResponse.data.title);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTasksByProject();
    }, [projectId]);

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3000/task/delete/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const editTask = (task) => {
        setEditingTask(task);
    };

    const updateTask = async () => {
        try {
            await axios.put(`http://localhost:3000/task/update/${editingTask._id}`, {
                title: editingTask.title,
                description: editingTask.description,
                status: editingTask.status,
                idProject: editingTask.idProject
            });
            setEditingTask(null); // Reset editing task
            fetchTasksByProject(); // Refresh task list

        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const renderTaskCards = (taskList) => {
        return taskList.map(task => (
            <div key={task._id} className="task-card">
                {editingTask && editingTask._id === task._id ? (
                    <div className="edit-task-container">
                            <input
                                type="text"
                                value={editingTask.title}
                                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                            />
                            <textarea
                                value={editingTask.description}
                                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                            />
                            <select
                                value={editingTask.status}
                                onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                            >
                                <option value="to-do">To-Do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                            <button onClick={updateTask}>Save</button>
                        </div>
                ) : (
                    <div>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <button className="delete-button" onClick={() => deleteTask(task._id)}>X</button>
                        <button className="edit-button" onClick={() => editTask(task)}>Edit</button>
                    </div>
                )}
            </div>
        ));
    };

    const todoTasks = tasks.filter(task => task.status === 'to-do');
    const doingTasks = tasks.filter(task => task.status === 'doing');
    const doneTasks = tasks.filter(task => task.status === 'done');

    const handleAddTask = async () => {
        try {
            const response = await axios.post('http://localhost:3000/task/add', {
                title: newTaskTitle,
                description: newTaskDescription,
                status: 'to-do', // Default status
                idProject: projectId
            });
            const newTask = response.data;
            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setNewTaskDescription('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div className="board-container">
            <h2>{projectName}</h2>
            <div className="task-list-container">
                <div className="column">
                    <h3>To-Do</h3>
                    <div className="task-cards-container">
                        {renderTaskCards(todoTasks)}
                    </div>
                </div>
                <div className="column">
                    <h3>Doing</h3>
                    <div className="task-cards-container">
                        {renderTaskCards(doingTasks)}
                    </div>
                </div>
                <div className="column">
                    <h3>Done</h3>
                    <div className="task-cards-container">
                        {renderTaskCards(doneTasks)}
                    </div>
                </div>
            </div>
            <div className="add-task-container">
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                />
                <textarea
                    placeholder="Enter task description"
                    value={newTaskDescription}
                    onChange={e => setNewTaskDescription(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
        </div>
    );
};

export default TaskList;
