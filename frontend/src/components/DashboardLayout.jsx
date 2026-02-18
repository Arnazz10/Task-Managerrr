import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-[#0B1220] font-sans text-white overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto px-10 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
