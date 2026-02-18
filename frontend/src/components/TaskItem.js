import React, { useState } from 'react';
import { api } from '../api';
import { Sparkles, Circle, CheckCircle2, Trash2, Calendar } from 'lucide-react';

const TaskItem = ({ task, onUpdate }) => {
    const [loading, setLoading] = useState(false);

    const handleToggleStatus = async () => {
        setLoading(true);
        try {
            const newStatus = task.status === 'pending' ? 'completed' : 'pending';
            await api.updateTask(task.id, { status: newStatus });
            onUpdate();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Delete this task?')) return;
        setLoading(true);
        try {
            await api.deleteTask(task.id);
            onUpdate();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategorize = async () => {
        if (task.category) return;
        setLoading(true);
        try {
            await api.categorizeTask(task.id);
            onUpdate();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`task-card ${task.status}`}>
            <div className="task-header">
                <h3>{task.title}</h3>
                <div className="badges">
                    {task.category && (
                        <span className={`badge category-${task.category}`}>
                            {task.category}
                        </span>
                    )}
                </div>
            </div>

            <div className="task-desc">
                {task.description || 'No description provided'}
            </div>

            <div className="task-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <Calendar size={14} />
                    {new Date(task.created_at).toLocaleDateString()}
                </div>

                <div className="actions">
                    <button
                        className="btn-icon btn-ai"
                        onClick={handleCategorize}
                        disabled={loading || !!task.category}
                        title="Auto Categorize"
                    >
                        <Sparkles size={18} />
                    </button>
                    <button
                        className="btn-icon btn-check"
                        onClick={handleToggleStatus}
                        title="Toggle Status"
                    >
                        {task.status === 'pending' ? <Circle size={18} /> : <CheckCircle2 size={18} />}
                    </button>
                    <button
                        className="btn-icon btn-delete"
                        onClick={handleDelete}
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
