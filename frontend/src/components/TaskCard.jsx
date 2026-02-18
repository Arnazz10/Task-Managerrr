import React, { useState } from 'react';
import { Sparkles, Circle, CheckCircle2, Trash2, Calendar } from 'lucide-react';
import { api } from '../api';

const TaskCard = ({ task, onUpdate }) => {
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        setLoading(true);
        try {
            await api.updateTask(task.id, { status: task.status === 'pending' ? 'completed' : 'pending' });
            onUpdate();
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete?")) return;
        setLoading(true);
        try {
            await api.deleteTask(task.id);
            onUpdate();
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleCategorize = async () => {
        setLoading(true);
        try {
            await api.categorizeTask(task.id);
            onUpdate();
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    return (
        <div className="bg-[#121A2A] rounded-xl p-5 border border-white/5 hover:border-indigo-500/30 transition-all group flex flex-col justify-between h-full">
            <div>
                <div className="flex justify-between items-start mb-3">
                    <h3 className={`font-medium text-white ${task.status === 'completed' ? 'line-through opacity-50' : ''}`}>
                        {task.title}
                    </h3>
                    {task.category && (
                        <div className={`text-[10px] px-2.5 py-1 rounded-full border ${task.category === 'Work' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                task.category === 'Personal' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                    task.category === 'Study' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                        'bg-slate-500/10 text-slate-400 border-slate-500/20'
                            }`}>
                            {task.category}
                        </div>
                    )}
                </div>
                <p className="text-sm text-white/50 line-clamp-2 mb-4">
                    {task.description || "No description provided."}
                </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-white/40">
                    <Calendar size={12} />
                    {new Date(task.created_at).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCategorize}
                        disabled={loading || task.category}
                        className={`p-1.5 rounded-md transition-colors ${task.category ? 'text-indigo-400/50 cursor-default' : 'text-white/40 hover:text-indigo-400 hover:bg-indigo-500/10'
                            }`}
                        title="Auto Categorize"
                    >
                        <Sparkles size={16} />
                    </button>
                    <button
                        onClick={handleToggle}
                        disabled={loading}
                        className={`p-1.5 rounded-md transition-colors ${task.status === 'completed' ? 'text-emerald-400' : 'text-white/40 hover:text-emerald-400 hover:bg-emerald-500/10'
                            }`}
                    >
                        {task.status === 'completed' ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="p-1.5 rounded-md text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
