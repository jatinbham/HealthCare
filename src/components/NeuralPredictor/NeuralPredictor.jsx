import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, Wind, Timer, Activity } from 'lucide-react';

const NeuralPredictor = ({ reactionTime, aqi }) => {
    // 1. DYNAMIC CALCULATIONS (Formula for the visuals)
    const stats = useMemo(() => {
        // PM2.5 Impact: AQI 150+ increases stress drastically
        const aqiStress = Math.min(100, (aqi / 300) * 100); 
        
        // Latency Drift: Using 250ms as a healthy baseline
        const baseReaction = 250;
        const drift = reactionTime ? Math.max(0, ((reactionTime - baseReaction) / baseReaction) * 100) : 0;
        
        // Neural Reserve (The big circle): Health decreases with high AQI and high Latency
        const reserve = Math.max(12, 100 - (aqiStress * 0.6) - (drift * 0.4));
        
        // Burnout Alert Logic: Based on Screenshot (17).jpg
        const burnoutMins = Math.max(15, Math.floor(reserve * 1.2));

        return { aqiStress, drift, reserve, burnoutMins };
    }, [reactionTime, aqi]);

    return (
        <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                
                {/* NEURAL RESERVE CARD (Big Circle) */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 flex flex-col items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute top-4 left-6 flex items-center gap-2 opacity-40">
                        <Brain size={14} className="text-orange-500" />
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Neural Reserve</span>
                    </div>

                    {/* DYNAMIC PROGRESS CIRCLE */}
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                            <circle 
                                cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" 
                                strokeDasharray={502.4}
                                strokeDashoffset={502.4 - (502.4 * stats.reserve) / 100}
                                className="text-orange-500 transition-all duration-1000 ease-out"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black italic text-white">{Math.floor(stats.reserve)}%</span>
                        </div>
                    </div>
                </motion.div>

                {/* DEGRADATION FACTORS (Progress Bars) */}
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="lg:col-span-2 bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 flex flex-col justify-center space-y-10"
                >
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <Activity size={18} className="text-cyan-400" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Critical Degradation Factors</h3>
                    </div>

                    <div className="space-y-8">
                        {/* AQI BAR */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-slate-500">AQI Induced Oxidative Stress</span>
                                <span className="text-orange-500">+{Math.floor(stats.aqiStress)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stats.aqiStress}%` }}
                                    className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                                />
                            </div>
                        </div>

                        {/* REACTION DRIFT BAR */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-slate-500">Cognitive Drift (Latency)</span>
                                <span className="text-cyan-400">{reactionTime ? `${reactionTime}ms` : "---ms"}</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: reactionTime ? `${Math.min(100, stats.drift)}%` : "0%" }}
                                    className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* BURNOUT ALERT FOOTER (Bottom Card from Screenshot (17).jpg) */}
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gradient-to-r from-orange-950/40 via-slate-900/60 to-slate-900/40 border border-orange-500/20 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                        <AlertTriangle className="text-orange-500 animate-pulse" size={28} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-lg font-black italic uppercase text-white tracking-tighter">Neural Burnout Alert</h4>
                        <p className="text-xs text-slate-400 font-medium max-w-md">
                            Our AI models predict a <span className="text-white font-bold underline decoration-orange-500">systemic focus crash</span> in approximately <span className="text-orange-500 font-black">{stats.burnoutMins} minutes</span>. Your neural pathways are over-compensating for the current PM2.5 levels.
                        </p>
                    </div>
                </div>

                <div className="bg-black/40 border border-white/5 p-6 rounded-3xl min-w-[240px] text-center">
                    <p className="text-[8px] font-black uppercase text-slate-500 tracking-[0.3em] mb-3">Recommended Protocol</p>
                    <h5 className="text-emerald-400 font-black text-xl italic mb-1 uppercase tracking-tighter">Box Breathing</h5>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">4 Cycles Required</p>
                </div>
            </motion.div>
        </div>
    );
};

export default NeuralPredictor;