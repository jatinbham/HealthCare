import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User as UserIcon, LayoutDashboard, History, Info, Home, Rocket } from 'lucide-react';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // Active link check karne ke liye helper
    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/70 border-b border-slate-800/50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">

                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">
                                <span className="text-white text-2xl font-black">V</span>
                            </div>
                            <div className="absolute -inset-1 bg-cyan-500/20 blur-lg rounded-xl -z-10 group-hover:bg-cyan-500/40 transition-colors"></div>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-white tracking-tight leading-none">VitalAI</h1>
                            <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-black mt-1">Intelligence</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex items-center gap-8">
                        {[
                            { name: 'Home', path: '/', icon: <Home size={18} /> },
                            { name: 'About', path: '/about', icon: <Info size={18} /> },
                            { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
                            { name: 'History', path: '/history', icon: <History size={18} /> },
                        ].map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:text-cyan-400 ${
                                        isActive(item.path) ? 'text-cyan-400' : 'text-slate-400'
                                    }`}
                                >
                                    {isActive(item.path) && <span className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></span>}
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Auth Section */}
                    <div className="flex items-center gap-3">
                        {token ? (
                            <div className="flex items-center gap-3 bg-slate-900/40 p-1.5 pl-4 rounded-2xl border border-slate-800">
                                <div className="hidden md:flex flex-col items-end mr-2">
                                    <span className="text-xs text-slate-400">Welcome,</span>
                                    <span className="text-sm font-bold text-slate-200">{user.name?.split(" ")[0]}</span>
                                </div>
                                
                                <Link
                                    to="/health-analysis"
                                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                                >
                                    <Rocket size={16} />
                                    <span className="hidden sm:inline">Get Started</span>
                                </Link>

                                <button
                                    onClick={logout}
                                    className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/login"
                                    className="text-sm font-semibold text-slate-300 hover:text-white transition"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-white hover:bg-slate-200 text-black px-6 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-white/10"
                                >
                                    Join VitalAI
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </nav>
        </header>
    );
}