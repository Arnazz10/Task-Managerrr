import React from 'react';

const Header = () => {
    return (
        <header className="flex items-center justify-between px-10 py-8 bg-[#0B1220]">
            <div>
                <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
                <p className="text-sm text-white/50 mt-1">Welcome back, User</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium ring-4 ring-indigo-500/20">
                U
            </div>
        </header>
    );
};

export default Header;
