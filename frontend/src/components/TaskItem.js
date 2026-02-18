import React, { useState } from 'react';
import { api } from '../api';

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
            alert('Failed to update status');
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
            alert('Failed to delete task');
        } finally {
            setLoading(false);
        }
    };

    const handleCategorize = async () => {
        setLoading(true);
        try {
            await api.categorizeTask(task.id);
            onUpdate();
        } catch (error) {
            console.error(error);
            alert('Failed to categorize task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`task-item ${task.status}`} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '8px 0',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{ flex: 1 }}>
                <h3 style={{
                    textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                    margin: '0 0 8px 0'
                }}>
                    {task.title}
                </h3>
                {task.description && <p style={{ color: '#666', margin: '0 0 8px 0' }}>{task.description}</p>}
                <div>
                    <span style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: task.category ? '#e3f2fd' : '#f5f5f5',
                        color: task.category ? '#1976d2' : '#999',
                        fontSize: '0.85em',
                        marginRight: '8px'
                    }}>
                        {task.category || 'Uncategorized'}
                    </span>
                    <span style={{ fontSize: '0.85em', color: '#999' }}>
                        {new Date(task.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={handleCategorize}
                    disabled={loading || task.category}
                    style={{ padding: '8px', cursor: 'pointer' }}
                    title="Auto Categorize"
                >
                    AI
                </button>
                <button
                    onClick={handleToggleStatus}
                    disabled={loading}
                    style={{ padding: '8px', cursor: 'pointer' }}
                >
                    {task.status === 'pending' ? 'Done' : 'Undo'}
                </button>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    style={{ padding: '8px', cursor: 'pointer', color: 'red' }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
