import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Brain, Zap, Fingerprint, Trophy, Wind, ShieldCheck } from 'lucide-react';

// Components Import
import AnalyzeHealth from '../AnalyzeHealth/AnalyzeHealth';
import Analysis from '../Analysis/Analysis';
import NeuralPredictor from '../NeuralPredictor/NeuralPredictor';
import Leaderboard from '../Leaderboard/Leaderboard';

const CyberpunkLab = () => {
    // 1. STATE MANAGEMENT
    const [activeTab, setActiveTab] = useState('scan');
    const [aqiData, setAqiData] = useState({ value: 156, city: "Scanning..." }); 
    const [isSystemReady, setIsSystemReady] = useState(false);
    
    const [lastReactionTime, setLastReactionTime] = useState(() => {
        const saved = localStorage.getItem('lastReactionScore');
        return saved ? parseInt(saved) : null;
    });

    // 2. LIVE DATA FETCHING (AQI)
    useEffect(() => {
        const fetchEnvironmentData = async () => {
            try {
                // Production mein yahan real API use hogi
                setAqiData({ value: 184, city: "Indore" }); 
                setIsSystemReady(true);
            } catch (err) {
                console.error("Connection failed");
            }
        };

        fetchEnvironmentData();
        
        if (lastReactionTime) {
            localStorage.setItem('lastReactionScore', lastReactionTime.toString());
        }
    }, [lastReactionTime]);

    // 3. NAVIGATION CONFIGURATION (Simplified Words)
    const tabs = [
        { 
            id: 'scan', 
            label: 'Health Check', 
            icon: <Activity size={16} />, 
            color: '#06b6d4', 
            glow: 'rgba(6, 182, 212, 0.4)',
            desc: 'Check Body'
        },
        { 
            id: 'reflex', 
            label: 'Speed Test', 
            icon: <Brain size={16} />, 
            color: '#9333ea', 
            glow: 'rgba(147, 51, 234, 0.4)',
            desc: 'Reaction Time'
        },
        { 
            id: 'leaderboard', 
            label: 'Rankings', 
            icon: <Trophy size={16} />, 
            color: '#facc15', 
            glow: 'rgba(250, 204, 21, 0.4)',
            desc: 'Top Players'
        },
        { 
            id: 'predict', 
            label: 'AI Prediction', 
            icon: <Zap size={16} />, 
            color: '#f97316', 
            glow: 'rgba(249, 115, 22, 0.4)',
            desc: 'Future Score'
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] relative overflow-hidden font-sans text-slate-200">
            
            {/* AMBIENT BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
                <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
                
                <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.5)] z-10"
                />
            </div>

            {/* TOP NAVIGATION BAR */}
            <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 p-2 bg-slate-900/60 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl">
                {tabs.map((tab) => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`group relative flex flex-col items-center justify-center px-6 py-3 rounded-3xl transition-all duration-500 ${
                            activeTab === tab.id ? 'scale-105' : 'hover:bg-white/5'
                        }`}
                    >
                        <div 
                            className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${
                                activeTab === tab.id ? 'text-black' : 'text-slate-400 group-hover:text-white'
                            }`}
                        >
                            {tab.icon} <span>{tab.label}</span>
                        </div>
                        
                        {activeTab === tab.id && (
                            <motion.div 
                                layoutId="activeTab"
                                className="absolute inset-0 z-[-1] rounded-3xl"
                                style={{ 
                                    backgroundColor: tab.color,
                                    boxShadow: `0 0 40px ${tab.glow}`
                                }}
                            />
                        )}
                    </button>
                ))}
            </nav>

            {/* SIDE STATUS PANEL */}
            <div className="fixed left-10 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-10">
                <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Environment</p>
                    <div className="flex items-center gap-3 text-cyan-400">
                        <Wind size={14} />
                        <span className="text-sm font-bold">{aqiData.value} AQI</span>
                    </div>
                </div>
                
                <div className="h-20 w-[1px] bg-gradient-to-b from-slate-800 via-cyan-500/50 to-slate-800" />
                
                <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Status</p>
                    <div className="flex items-center gap-3 text-emerald-500">
                        <ShieldCheck size={14} />
                        <span className="text-sm font-bold uppercase">Online</span>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <main className="relative z-10 pt-36 pb-24 max-w-7xl mx-auto px-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {activeTab === 'scan' && <AnalyzeHealth />}
                        
                        {activeTab === 'reflex' && (
                            <Analysis 
                                onResult={(time) => setLastReactionTime(time)} 
                                onFinish={() => setActiveTab('leaderboard')} 
                            />
                        )}

                        {activeTab === 'leaderboard' && <Leaderboard />}

                        {activeTab === 'predict' && (
                            <NeuralPredictor 
                                reactionTime={lastReactionTime} 
                                aqi={aqiData.value} 
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* LOWER STATUS HUD */}
            <footer className="fixed bottom-8 left-12 right-12 flex justify-between items-center pointer-events-none z-50 font-mono">
                <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/5">
                    <div className="relative">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    </div>
                    <div className="leading-none">
                        <p className="text-[10px] font-black text-white uppercase tracking-widest">Server</p>
                        <p className="text-[8px] text-slate-500 font-bold uppercase">Connected</p>
                    </div>
                </div>

                <div className="flex gap-4 opacity-60">
                     <div className="px-4 py-2 border-l border-white/10">
                        <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Loc</p>
                        <p className="text-[10px] font-bold text-white uppercase italic tracking-tighter">{aqiData.city}</p>
                     </div>
                     <div className="px-4 py-2 border-l border-white/10">
                        <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Ver</p>
                        <p className="text-[10px] font-bold text-cyan-400">3.0.26</p>
                     </div>
                </div>
            </footer>

            {/* VIGNETTE OVERLAY */}
            <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] z-[60]" />
        </div>
    );
};

export default CyberpunkLab;