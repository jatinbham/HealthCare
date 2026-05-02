import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("USER");

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
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30">
            
            {/* Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full"></div>
            </div>

            <AnimatePresence mode="wait">
                {isLoggedIn ? (
                    /* ================= AUTH UI (Dashboard Lite) ================= */
                    <motion.div 
                        key="auth" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="max-w-6xl mx-auto px-6 py-12 relative z-10"
                    >
                        <header className="mb-16 border-l-4 border-cyan-500 pl-8 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500 mb-2 italic">Protocol: Established</p>
                                <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                                    Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">{userName}</span>
                                </h1>
                            </div>
                            <button onClick={handleLogout} className="text-[10px] font-black text-slate-600 hover:text-red-500 transition-all uppercase tracking-widest">[ Terminate Session ]</button>
                        </header>

                        <div className="bg-[#0a0a0a] border border-white/5 p-12 rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="text-left">
                                <h2 className="text-4xl font-black italic uppercase mb-4">Ready for Analysis?</h2>
                                <p className="text-slate-500 max-w-sm mb-8">Scan your neural markers and environmental factors to get the latest AI health insights.</p>
                                <button onClick={() => navigate('/analyze')} className="bg-white text-black px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-cyan-400 transition-all">Start New Scan</button>
                            </div>
                            <div className="w-full md:w-1/3 bg-cyan-500/5 border border-cyan-500/10 p-8 rounded-3xl text-center">
                                <p className="text-cyan-500 font-bold text-xs uppercase tracking-tighter mb-2">Neural Health</p>
                                <p className="text-5xl font-black italic">98%</p>
                                <p className="text-[10px] text-slate-500 mt-2 uppercase">Optimal Performance</p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* ================= PUBLIC UI (Landing Page) ================= */
                    <motion.div 
                        key="public" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="relative z-10"
                    >
                        {/* Hero Section */}
                        <section className="max-w-6xl mx-auto pt-32 pb-20 px-6 text-center">
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                                <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8] mb-8">
                                    VitalAI <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Protocol.</span>
                                </h1>
                                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
                                    The world's first AI-driven neural tracking system. Decode your reaction times against environmental AQI levels in seconds.
                                </p>
                                <div className="flex flex-col md:flex-row justify-center gap-6">
                                    <button onClick={() => navigate('/login')} className="bg-white text-black px-12 py-6 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-cyan-400 transition-all shadow-2xl shadow-cyan-500/10">Initialize Link</button>
                                    <button onClick={() => navigate('/signup')} className="border border-white/10 px-12 py-6 rounded-full font-black uppercase text-[11px] tracking-widest text-slate-400 hover:bg-white/5 transition-all">Join The Network</button>
                                </div>
                            </motion.div>
                        </section>

                        {/* Features Info Section */}
                        <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-slate-900/20 border border-white/5 p-10 rounded-[3rem] hover:border-cyan-500/30 transition-all group">
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-500 font-bold">01</div>
                                <h3 className="text-xl font-black italic uppercase mb-4 group-hover:text-cyan-400 transition-colors text-left">Neural Analysis</h3>
                                <p className="text-slate-500 text-sm leading-relaxed text-left">Measure your brain's processing speed with our precision reflex tests, calibrated for high-performance athletes.</p>
                            </div>
                            
                            <div className="bg-slate-900/20 border border-white/5 p-10 rounded-[3rem] hover:border-cyan-500/30 transition-all group">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500 font-bold">02</div>
                                <h3 className="text-xl font-black italic uppercase mb-4 group-hover:text-blue-400 transition-colors text-left">Env Monitoring</h3>
                                <p className="text-slate-500 text-sm leading-relaxed text-left">Real-time Air Quality Index (AQI) tracking to show you how your environment directly impacts your mental clarity.</p>
                            </div>

                            <div className="bg-slate-900/20 border border-white/5 p-10 rounded-[3rem] hover:border-cyan-500/30 transition-all group">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 text-purple-500 font-bold">03</div>
                                <h3 className="text-xl font-black italic uppercase mb-4 group-hover:text-purple-400 transition-colors text-left">AI Predictions</h3>
                                <p className="text-slate-500 text-sm leading-relaxed text-left">Advanced machine learning models analyze your history to predict recovery times and performance peaks.</p>
                            </div>
                        </section>

                        {/* Footer Info */}
                        <footer className="py-20 border-t border-white/5 text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-700">© 2026 VitalAI Neural Systems • Secured by AES-256</p>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;