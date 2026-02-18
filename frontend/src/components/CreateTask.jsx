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
        <div className="bg-[#121A2A] rounded-xl p-6 mt-6 border border-white/5">
            <h3 className="text-white font-medium mb-4">Add New Task</h3>
            <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full bg-[#0B1220] text-white rounded-lg px-4 py-3 text-sm border border-white/5 focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                    <input
                        type="text"
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-[#0B1220] text-white rounded-lg px-4 py-3 text-sm border border-white/5 focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-6 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 h-fit self-start disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Adding...' : (
                        <>
                            <Plus size={16} />
                            Add Task
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default CreateTask;
