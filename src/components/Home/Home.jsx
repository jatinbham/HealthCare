import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Activity, Globe, Shield, ArrowRight, BarChart3, LogOut } from "lucide-react";

const Home = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("userName");
        if (token) {
            setIsLoggedIn(true);
            if (name) setUserName(name);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
            
            {/* Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
            </div>

            <AnimatePresence mode="wait">
                {isLoggedIn ? (
                    /* ================= DASHBOARD (AFTER LOGIN) ================= */
                    <motion.div 
                        key="auth" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="max-w-6xl mx-auto px-6 py-12 relative z-10"
                    >
                        <header className="mb-12 flex justify-between items-end">
                            <div>
                                <p className="text-cyan-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-2">System Active</p>
                                <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-none">
                                    Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">{userName}</span>
                                </h1>
                            </div>
                            <button onClick={handleLogout} className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-red-500 transition-all uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg">
                                <LogOut size={12} /> Logout
                            </button>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Start Scan Card */}
                            <div onClick={() => navigate('/analyze')} className="md:col-span-2 bg-[#0a0a0a] border border-white/10 p-12 rounded-[3rem] cursor-pointer hover:border-cyan-500/50 transition-all group relative overflow-hidden">
                                <h2 className="text-4xl font-black italic uppercase mb-4">Start New Scan</h2>
                                <p className="text-slate-400 max-w-sm mb-10 font-medium">Dekhte hain aaj aapka reaction time kitna fast hai. Ready?</p>
                                <div className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest group-hover:bg-cyan-400 transition-colors">
                                    Launch Test <ArrowRight size={14} />
                                </div>
                                <Zap size={180} className="absolute -right-12 -bottom-12 text-white/5 rotate-12 group-hover:text-cyan-500/10 transition-all" />
                            </div>

                            {/* Stats Card */}
                            <div className="bg-cyan-500/5 border border-cyan-500/20 p-8 rounded-[3rem] flex flex-col justify-center items-center text-center">
                                <BarChart3 size={40} className="text-cyan-500 mb-4" />
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Your Best</p>
                                <p className="text-6xl font-black italic">--<span className="text-xl ml-1">ms</span></p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* ================= LANDING PAGE (PUBLIC) ================= */
                    <motion.div key="public" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
                        
                        {/* Hero Section */}
                        <section className="max-w-6xl mx-auto pt-32 pb-16 px-6 text-center">
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                <h1 className="text-7xl md:text-[9rem] font-black italic tracking-tighter uppercase leading-[0.8] mb-8">
                                    VitalAI <br /> 
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Protocol.</span>
                                </h1>
                                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
                                    Decode your reaction speed against live AQI levels. <br />
                                    <span className="text-white/80">Check karo ki aapka dimaag kitna fast react karta hai.</span>
                                </p>
                                
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <button onClick={() => navigate('/login')} className="bg-white text-black px-12 py-6 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-cyan-400 transition-all shadow-2xl shadow-cyan-500/20">
                                        Initialize Test
                                    </button>
                                    <button onClick={() => navigate('/signup')} className="border border-white/10 px-12 py-6 rounded-full font-black uppercase text-[11px] tracking-widest text-slate-400 hover:bg-white/5 transition-all">
                                        Join Network
                                    </button>
                                </div>
                            </motion.div>
                        </section>

                        {/* Features Section */}
                        <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] hover:border-cyan-500/30 transition-all">
                                <Activity className="text-cyan-500 mb-6" size={28} />
                                <h3 className="text-xl font-black italic uppercase mb-3 text-left">Reflex Test</h3>
                                <p className="text-slate-500 text-sm leading-relaxed text-left font-medium">Check your brain's processing speed in milliseconds. Ekdum simple aur fast!</p>
                            </div>
                            
                            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] hover:border-blue-500/30 transition-all">
                                <Globe className="text-blue-500 mb-6" size={28} />
                                <h3 className="text-xl font-black italic uppercase mb-3 text-left">Live AQI</h3>
                                <p className="text-slate-500 text-sm leading-relaxed text-left font-medium">Real-time air quality tracking. Dekhiye pollution aapko kitna slow kar raha hai.</p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] hover:border-emerald-500/30 transition-all">
                                <Shield className="text-emerald-500 mb-6" size={28} />
                                <h3 className="text-xl font-black italic uppercase mb-3 text-left">Cyber ID</h3>
                                <p className="text-slate-500 text-sm leading-relaxed text-left font-medium">Get your unique Neural ID card. Apna score doston ke saath share karein.</p>
                            </div>
                        </section>

                        <footer className="py-20 border-t border-white/5 text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-700 italic">© 2026 VitalAI Neural Systems • Secured Access</p>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;