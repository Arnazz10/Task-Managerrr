import React, { useState } from 'react';
import { api } from '../api';

const CreateTask = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            await api.createTask({ title, description });
            setTitle('');
            setDescription('');
            onTaskCreated(); // Refresh list
        } catch (error) {
            console.error(error);
            alert('Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: '20px'
        }}>
            <h2 style={{ marginTop: 0 }}>Add New Task</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                    <input
                        type="text"
                        placeholder="Task Title (Required)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Description (Optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            minHeight: '60px'
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'wait' : 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {loading ? 'Adding...' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default CreateTask;
