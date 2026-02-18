import React, { useEffect, useState } from 'react';
import { api } from '../api';
import TaskItem from '../components/TaskItem';
import CreateTask from '../components/CreateTask';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await api.fetchTasks();
            setTasks(data);
            setError(null);
        } catch (err) {
            setError('Failed to load tasks. ensure backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>AI Task Manager</h1>

            <CreateTask onTaskCreated={fetchTasks} />

            {error && <div style={{ color: 'red', padding: '10px', textAlign: 'center' }}>{error}</div>}

            {loading ? (
                <div style={{ textAlign: 'center' }}>Loading tasks...</div>
            ) : (
                <div>
                    {tasks.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#666' }}>No tasks found. Add one above!</p>
                    ) : (
                        tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onUpdate={fetchTasks}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskList;
