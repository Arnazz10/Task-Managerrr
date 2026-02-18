import React, { useEffect, useState } from 'react';
import { api } from '../api';
import DashboardLayout from '../components/DashboardLayout';
import StatsCards from '../components/StatsCards';
import CreateTask from '../components/CreateTask';
import TaskCard from '../components/TaskCard';

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
        <DashboardLayout>
            <StatsCards stats={stats} />
            <CreateTask onTaskCreated={fetchTasks} />

            <h2 className="text-lg font-semibold text-white mt-8 mb-4">Your Tasks</h2>

            {tasks.length === 0 ? (
                <div className="text-center py-12 text-white/30 bg-[#121A2A] rounded-xl border border-white/5">
                    No tasks found. Create one above to get started.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onUpdate={fetchTasks}
                        />
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
};

export default TaskList;
