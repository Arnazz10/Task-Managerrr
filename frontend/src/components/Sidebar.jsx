import React from 'react';
import { LayoutDashboard, ListTodo, BarChart3, Settings, BrainCircuit } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', active: true },
        { icon: ListTodo, label: 'My Tasks', active: false },
        { icon: BarChart3, label: 'Analytics', active: false },
        { icon: Settings, label: 'Settings', active: false },
    ];

    return (
        <aside className="w-[260px] h-screen bg-[#121A2A] flex flex-col px-6 py-8 border-r border-white/5">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <BrainCircuit className="w-6 h-6 text-indigo-400" />
                <span className="text-lg font-semibold text-indigo-400">TaskAI</span>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${item.active
                                ? 'bg-indigo-500/10 text-indigo-400 font-medium'
                                : 'text-white/70 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
