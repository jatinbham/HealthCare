import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Page load hote hi check karo
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("userName");
        
        if (token) {
            setIsLoggedIn(true);
            setUserName(name || "User");
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        // Logout ke baad bhi refresh taaki public UI dikhne lage
        window.location.href = "/";
    };

    return (
        <nav className="flex items-center justify-between px-10 py-6 bg-[#050505] border-b border-white/5 sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center font-black text-black text-xl">V</div>
                <div className="text-left leading-tight">
                    <h1 className="text-white font-black tracking-tighter text-xl italic uppercase">VitalAI</h1>
                    <p className="text-[8px] text-cyan-500 font-bold uppercase tracking-widest">Intelligence</p>
                </div>
            </div>

            {/* Links Section */}
            <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                
                {/* 🔒 Protected Links: Sirf login par dikhenge */}
                {isLoggedIn && (
                    <>
                        <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                        <Link to="/analyze" className="hover:text-white transition-colors">AI Analysis</Link>
                        <Link to="/history" className="hover:text-white transition-colors">History</Link>
                    </>
                )}
                
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-900/50 px-4 py-2 rounded-full border border-white/10">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                                Welcome, <span className="text-white">{userName}</span>
                            </p>
                        </div>
                        <button onClick={handleLogout} className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:text-red-400">
                            Logout
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => navigate("/login")}
                        className="bg-cyan-500 text-black px-6 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                        Get Started
                    </button>
                )}
            </div>
        </nav>
    );
}