import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Brain, Wind, Zap, ShieldAlert, CheckCircle2, ChevronRight, RefreshCcw, LayoutDashboard } from "lucide-react";
import ReflexTest from "../ReflexTest/ReflexTest";

const AnalyzeHealth = () => {
    // --- EXISTING LOGIC (STRICTLY PRESERVED) ---
    const [symptoms, setSymptoms] = useState("");
    const [reactionTime, setReactionTime] = useState(null);
    const [aqi, setAqi] = useState(null);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [vitals, setVitals] = useState({ energy: 5, focus: 5, mood: 5 });

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch("https://healthcareb.onrender.com/get-aqi", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ lat: latitude, lon: longitude })
                    });
                    const data = await res.json();
                    if (data.success) setAqi(data.aqi);
                } catch (err) { console.error("AQI Error:", err); }
            });
        }
    }, []);

    const handleAnalyze = async () => {
        if (!symptoms.trim()) return alert("Please describe your condition.");
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://healthcareb.onrender.com/ai-health", {
                method: "POST",
                headers: { 
                    "Authorization": `Bearer ${token}`, 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ symptoms, reactionTime, aqi, vitals })
            });
            const data = await res.json();
            if (data.success) {
                setResult(data.reply);
                setStep(3);
                localStorage.setItem("lastReflex", reactionTime);
                localStorage.setItem("lastAqi", aqi || "02");
            }
        } catch (err) {
            alert("Neural Link Failure. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    // --- PREMIUM UI WRAPPER ---
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12 pt-28 font-mono relative overflow-hidden">
            
            {/* Background Aesthetics */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <AnimatePresence mode="wait">
                    
                    {/* PHASE 1: BIO-CALIBRATION & INPUT */}
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="space-y-8"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                                <div>
                                    <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Neural <span className="text-cyan-500">Scan</span></h1>
                                    <p className="text-[10px] text-slate-500 tracking-[0.5em] font-bold mt-2 uppercase">Core Diagnostics // V5.2.0</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center gap-3">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Biometric Link Active</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-slate-900/40 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-3xl space-y-10">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 flex items-center gap-2">
                                        <LayoutDashboard size={14} /> System Calibration
                                    </h3>
                                    <div className="space-y-8">
                                        {['energy', 'focus', 'mood'].map((type) => (
                                            <div key={type} className="group">
                                                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 mb-3 group-hover:text-cyan-400 transition-colors">
                                                    <span>{type} Factor</span>
                                                    <span className="font-mono">{vitals[type] * 10}%</span>
                                                </div>
                                                <input 
                                                    type="range" min="1" max="10" value={vitals[type]} 
                                                    onChange={(e) => setVitals({...vitals, [type]: parseInt(e.target.value)})}
                                                    className="w-full h-1.5 bg-slate-800 appearance-none accent-cyan-500 cursor-pointer rounded-full" 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="relative">
                                        <div className="absolute -top-3 left-8 bg-[#020617] px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest z-10">Anomaly Description</div>
                                        <textarea 
                                            className="w-full bg-slate-900/40 border border-white/10 p-8 pt-10 rounded-[2.5rem] h-64 focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-800 text-sm font-sans backdrop-blur-3xl"
                                            placeholder="Detecting cognitive inconsistencies... Describe your state."
                                            value={symptoms}
                                            onChange={(e) => setSymptoms(e.target.value)}
                                        />
                                    </div>
                                    <button 
                                        onClick={() => setStep(2)} 
                                        className="w-full bg-white text-black font-black py-6 rounded-2xl uppercase tracking-[0.3em] text-[11px] hover:bg-cyan-400 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        Proceed to Neuro-Test <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* PHASE 2: REFLEX TEST */}
                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="space-y-10 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center gap-2">
                                    <Brain size={14} className="text-cyan-400" />
                                    <span className="text-[10px] font-black uppercase text-cyan-400 tracking-widest">Neural Latency Assessment</span>
                                </div>
                            </div>

                            <div className="bg-slate-900/20 border border-white/5 p-12 rounded-[4rem] backdrop-blur-sm relative overflow-hidden">
                                <ReflexTest onComplete={(time) => setReactionTime(time)} />
                            </div>

                            <div className="max-w-md mx-auto">
                                {reactionTime ? (
                                    <motion.button 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        onClick={handleAnalyze} 
                                        disabled={loading}
                                        className="w-full bg-cyan-500 text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-[0_0_50px_rgba(6,182,212,0.2)] hover:scale-105 transition-all disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-3">
                                                <RefreshCcw className="animate-spin" size={16} /> Syncing Neural Core...
                                            </span>
                                        ) : "Generate AI Health Report →"}
                                    </motion.button>
                                ) : (
                                    <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.5em] animate-pulse">Waiting for Reflex Input</p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* PHASE 3: RESULTS & DIGITAL TWIN */}
                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <div className="grid md:grid-cols-5 gap-8">
                                {/* Left: Digital Twin Visualizer */}
                                <div className="md:col-span-2 bg-slate-900/40 border border-white/10 rounded-[3.5rem] p-10 backdrop-blur-3xl flex flex-col items-center justify-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent)]" />
                                    
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-10 relative">Digital Twin Live-Map</h4>
                                    
                                    <svg viewBox="0 0 200 500" className="h-80 w-auto filter drop-shadow-[0_0_25px_rgba(6,182,212,0.3)] relative">
                                        <circle cx="100" cy="60" r="25" className={`${reactionTime > 400 ? 'fill-red-500 animate-pulse' : 'fill-cyan-500/20'} transition-all`} />
                                        <path d="M70 120 Q100 100 130 120 L140 220 Q100 240 60 220 Z" className={`${aqi > 3 ? 'fill-orange-500/40 animate-bounce' : 'fill-cyan-500/10'} transition-all`} />
                                        <path d="M100 35 L130 80 L160 120 L150 250 L130 450 L110 450 L100 280 L90 450 L70 450 L50 250 L40 120 L70 80 L100 35" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="5 5" />
                                    </svg>

                                    <div className="grid grid-cols-3 gap-4 w-full mt-10 pt-8 border-t border-white/5 relative">
                                        <div className="text-center">
                                            <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Latency</p>
                                            <p className="text-xs font-bold text-cyan-400">{reactionTime}ms</p>
                                        </div>
                                        <div className="text-center border-x border-white/5">
                                            <p className="text-[8px] text-slate-500 uppercase font-black mb-1">AQI</p>
                                            <p className={`text-xs font-black ${aqi > 3 ? 'text-red-500' : 'text-emerald-400'}`}>{aqi || 'N/A'}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Mood</p>
                                            <p className="text-xs font-bold text-purple-400">{vitals.mood}/10</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: AI Analysis & Protocols */}
                                <div className="md:col-span-3 space-y-8">
                                    <div className="bg-slate-900 border border-cyan-500/20 p-10 rounded-[3.5rem] relative">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                                            <h3 className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Analysis Report</h3>
                                        </div>
                                        <div className="text-slate-300 leading-relaxed text-lg font-sans italic">
                                            "{result}"
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500 pl-4 mb-4">Required Protocols</h3>
                                        
                                        <div className="grid gap-3">
                                            {reactionTime > 400 && (
                                                <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-3xl flex justify-between items-center group hover:border-red-500/30 transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <ShieldAlert className="text-red-500" size={20} />
                                                        <div>
                                                            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Neural Recovery</p>
                                                            <p className="text-[11px] text-slate-500 font-sans">Mandatory 30m screen-off rest.</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-5 h-5 border border-slate-800 rounded-lg flex items-center justify-center group-hover:bg-red-500/10">
                                                        <CheckCircle2 size={12} className="text-slate-800" />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="bg-cyan-500/5 border border-cyan-500/10 p-6 rounded-3xl flex justify-between items-center group hover:border-cyan-500/30 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <Wind className="text-cyan-500" size={20} />
                                                    <div>
                                                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Hydration Sync</p>
                                                        <p className="text-[11px] text-slate-500 font-sans">Toxin flush: 500ml H2O required.</p>
                                                    </div>
                                                </div>
                                                <div className="w-5 h-5 border border-slate-800 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/10">
                                                    <CheckCircle2 size={12} className="text-slate-800" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => {setStep(1); setResult("");}} 
                                        className="w-full py-4 text-slate-600 hover:text-cyan-400 transition-all uppercase font-black text-[9px] tracking-[0.8em] border border-transparent hover:border-cyan-500/20 rounded-2xl"
                                    >
                                        [ Purge Session Cache ]
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default AnalyzeHealth;