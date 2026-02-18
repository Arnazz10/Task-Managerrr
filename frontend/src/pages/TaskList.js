import React, { useEffect, useState } from 'react';
import { api } from '../api';
import TaskItem from '../components/TaskItem';
import CreateTask from '../components/CreateTask';
import { LayoutDashboard, ListTodo, BarChart3, Settings, BrainCircuit } from 'lucide-react';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

    const fetchTasks = async () => {
        try {
            const data = await api.fetchTasks();
            setTasks(data);
            setStats({
                total: data.length,
                pending: data.filter(t => t.status === 'pending').length,
                completed: data.filter(t => t.status === 'completed').length
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="App">
            <aside>
                <div className="brand">
                    <BrainCircuit size={24} />
                    TaskAI
                </div>
                <nav>
                    <div className="nav-item active">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </div>
                    <div className="nav-item">
                        <ListTodo size={20} />
                        My Tasks
                    </div>
                    <div className="nav-item">
                        <BarChart3 size={20} />
                        Analytics
                    </div>
                    <div className="nav-item">
                        <Settings size={20} />
                        Settings
                    </div>
                </nav>
            </aside>

            <main>
                <header>
                    <div>
                        <h1>Dashboard</h1>
                        <div className="subtitle">Welcome back, User</div>
                    </div>
                    <div className="avatar" style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                    }}>U</div>
                </header>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-label">Total Tasks</div>
                        <div className="stat-value">{stats.total}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Pending</div>
                        <div className="stat-value" style={{ color: 'var(--warning)' }}>{stats.pending}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Completed</div>
                        <div className="stat-value" style={{ color: 'var(--success)' }}>{stats.completed}</div>
                    </div>
                </div>

                <CreateTask onTaskCreated={fetchTasks} />

                <h2 style={{ marginBottom: '24px' }}>Your Tasks</h2>
                <div className="task-grid">
                    {tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onUpdate={fetchTasks}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default TaskList;
