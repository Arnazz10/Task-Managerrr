import React from 'react';

const StatsCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-[#121A2A] rounded-xl p-6 border border-white/5">
                <p className="text-sm text-white/50 mb-2">Total Tasks</p>
                <p className="text-3xl font-semibold text-white">{stats.total}</p>
            </div>
            <div className="bg-[#121A2A] rounded-xl p-6 border border-white/5">
                <p className="text-sm text-white/50 mb-2">Pending</p>
                <p className="text-3xl font-semibold text-amber-400">{stats.pending}</p>
            </div>
            <div className="bg-[#121A2A] rounded-xl p-6 border border-white/5">
                <p className="text-sm text-white/50 mb-2">Completed</p>
                <p className="text-3xl font-semibold text-emerald-400">{stats.completed}</p>
            </div>
        </div>
    );
};

export default StatsCards;
