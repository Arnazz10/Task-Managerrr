import React from 'react';

const Hero = () => {
    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center text-center px-4 pt-[200px] md:pt-[200px] pb-[102px] gap-[40px] max-w-4xl mx-auto">

                {/* Badge */}
                <div className="rounded-full bg-white/10 border border-white/20 px-4 py-1.5 flex items-center gap-2 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <span className="text-xs text-white/60 font-medium">
                        Early access available <span className="text-white">AI Task Manager</span>
                    </span>
                </div>

                {/* Heading */}
                <h1 className="text-[36px] md:text-[56px] font-medium leading-[1.28] tracking-tight max-w-[613px] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                    AI Task Manager for Focused Productivity
                </h1>

                {/* Subtitle */}
                <p className="text-[15px] text-white/70 max-w-[480px] md:max-w-[680px] leading-relaxed mt-[-16px]">
                    Organize tasks, categorize automatically with AI, and stay focused with a simple and reliable workflow system.
                </p>

                {/* CTA Button */}
                <button className="rounded-full border border-white p-[0.6px] mt-4 group transition-transform hover:scale-105">
                    <div className="rounded-full bg-white px-[29px] py-[11px] text-sm font-medium text-black relative overflow-hidden">
                        Join Waitlist
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                    </div>
                </button>

            </div>
        </div>
    );
};

export default Hero;
