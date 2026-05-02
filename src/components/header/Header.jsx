import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-950/90 border-b border-slate-800">
            <nav className="max-w-7xl mx-auto px-6 py-5">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-cyan-500 flex items-center justify-center">
                            <span className="text-black text-3xl font-black">V</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">VitalAI</h1>
                            <p className="text-xs text-cyan-400 -mt-1">AI Healthcare</p>
                        </div>
                    </Link>

                    {/* Nav Links */}
                    <ul className="hidden lg:flex items-center gap-10 text-[17px] font-medium">
                        <li><Link to="/" className="hover:text-cyan-400 transition">Home</Link></li>
                        <li><Link to="/about" className="hover:text-cyan-400 transition">About</Link></li>
                        <li><Link to="/dashboard" className="hover:text-cyan-400 transition">Dashboard</Link></li>
                        <li><Link to="/history" className="hover:text-cyan-400 transition">History</Link></li>
                    </ul>

                    {/* Auth Section */}
                    <div className="flex items-center gap-4">
                        {token ? (
                            // ========== Login ke baad ==========
                            <>
                                <span className="hidden md:block text-sm text-slate-300">
                                    Hi, {user.name?.split(" ")[0]}
                                </span>

                                <Link
                                    to="/health-analysis"     // ← Get Started yaha jaaye
                                    className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-2xl font-semibold transition"
                                >
                                    Get Started
                                </Link>

                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-semibold transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            // ========== Pehle (Not Logged In) ==========
                            <>
                                <Link
                                    to="/login"
                                    className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-6 py-3 rounded-2xl font-semibold transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-2xl font-semibold transition"
                                >
                                    Create Account
                                </Link>
                            </>
                        )}
                    </div>

                </div>
            </nav>
        </header>
    );
}