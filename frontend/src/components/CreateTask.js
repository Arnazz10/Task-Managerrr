import React, { useState } from 'react';
import { api } from '../api';
import { Plus } from 'lucide-react';

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
            onTaskCreated();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-section">
            <div className="input-group">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Add a description (optional) for AI context"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="1"
                />
            </div>
            <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={loading}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
                <Plus size={16} />
                Add Task
            </button>
        </div>
    );
};

export default CreateTask;
