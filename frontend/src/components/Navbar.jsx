import React from 'react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-[120px] md:py-[20px] bg-transparent">
            {/* Left Side */}
            <div className="flex items-center gap-[30px]">
                <div className="text-lg font-medium text-white">
                    TASKFLOW AI
                </div>

                <div className="hidden md:flex items-center gap-[30px]">
                    <a href="#" className="text-sm font-medium text-white opacity-90 hover:opacity-100 transition-opacity">Dashboard</a>
                    <a href="#" className="text-sm font-medium text-white opacity-90 hover:opacity-100 transition-opacity">Features</a>
                    <a href="#" className="text-sm font-medium text-white opacity-90 hover:opacity-100 transition-opacity">API</a>
                    <a href="#" className="text-sm font-medium text-white opacity-90 hover:opacity-100 transition-opacity">Resources</a>
                </div>
            </div>

            {/* Right Side */}
            <button className="hidden md:block rounded-full border border-white p-[0.6px] group">
                <div className="rounded-full bg-black px-[29px] py-[11px] text-sm font-medium text-white transition-all group-hover:bg-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-white blur-[2px]"></div>
                    Join Waitlist
                </div>
            </button>

            {/* Mobile Menu Icon (Placeholder) */}
            <div className="block md:hidden text-white">
                Menu
            </div>
        </nav>
    );
};

export default Navbar;
