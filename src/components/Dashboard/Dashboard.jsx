import React, { useEffect, useState } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, Tooltip, 
    ResponsiveContainer, CartesianGrid
} from 'recharts';
import { 
    LogOut, Activity, Brain, User as UserIcon, 
    RefreshCw, Sparkles, TrendingUp, Zap, Shield, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import BASE_URL from "../../api";

export default function Dashboard() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState(null);
    const [symptoms, setSymptoms] = useState("");
    
    // --- Reaction Test States ---
    const [testState, setTestState] = useState("idle"); 
    const [startTime, setStartTime] = useState(0);
    const [reactionScore, setReactionScore] = useState(null);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const performanceData = [
        { day: "Mon", reaction: 240, aqi: 110 },
        { day: "Tue", reaction: 280, aqi: 190 },
        { day: "Wed", reaction: 215, aqi: 85 },
        { day: "Thu", reaction: 295, aqi: 220 },
        { day: "Fri", reaction: 230, aqi: 95 },
        { day: "Sat", reaction: 210, aqi: 60 },
        { day: "Sun", reaction: 225, aqi: 75 },
    ];

    const startReactionTest = () => {
        setTestState("waiting");
        setReactionScore(null);
        const delay = Math.floor(Math.random() * 3000) + 2000;
        setTimeout(() => {
            setTestState("click");
            setStartTime(Date.now());
        }, delay);
    };

    const handleReactionClick = () => {
        if (testState === "waiting") {
            alert("Rukiye! Green signal ka wait karein.");
            setTestState("idle");
        } else if (testState === "click") {
            const time = Date.now() - startTime;
            setReactionScore(time);
            setTestState("result");
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const fetchProfile = async () => {
        try {
            const res = await fetch(`${BASE_URL}/health-profile`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            setProfile(data.profile || data);
        } catch (error) {
            console.error("Profile fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const getAIResponse = async () => {
        const trimmedSymptoms = symptoms.trim();
        if (!trimmedSymptoms) {
            alert("Pehle bataiye aapko kaisa feel ho raha hai.");
            return;
        }
        setAiLoading(true);
        setAiResponse(null); 
        try {
            const response = await fetch(`${BASE_URL}/ai-health`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    avg_reaction: reactionScore || 250, 
                    current_aqi: 156,
                    user_symptoms: trimmedSymptoms 
                })
            });
            const data = await response.json();
            setAiResponse(data.reply || data.message || data.response || "AI Report ready.");
        } catch (error) {
            setAiResponse("Network problem: Report generate nahi ho payi.");
        } finally {
            setAiLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchProfile();
    }, [token]);

    return (
        <div className="min-h-screen bg-[#050505] text-slate-200 font-sans pb-20 overflow-x-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-600/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto p-6 lg:p-10 pt-24">
                
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-5xl font-black italic uppercase text-white tracking-tighter leading-none">
                            Subject: <span className="text-cyan-400">{user?.name || "User"}</span>
                        </h1>
                        <p className="text-slate-500 mt-3 font-black tracking-[0.3em] text-[10px] uppercase flex items-center gap-2">
                            <Activity size={12} className="text-cyan-500 animate-pulse" /> Neural Network Active
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => navigate('/analyze')} className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-cyan-400 transition-all active:scale-95 flex items-center gap-2">
                            Enter Lab <ArrowRight size={14} />
                        </button>
                        <button onClick={logout} className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:border-red-500 transition-all text-slate-500 hover:text-red-500">
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Data & Tests */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* 1. Simple Reaction Test */}
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">Speed Test</h3>
                                    <p className="text-xl font-black italic text-white uppercase">Brain Reflexes</p>
                                </div>
                                {reactionScore && (
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Reaction</p>
                                        <p className="text-3xl font-black italic text-cyan-400 leading-none">{reactionScore}ms</p>
                                    </div>
                                )}
                            </div>

                            <div 
                                onClick={testState === "click" || testState === "waiting" ? handleReactionClick : null}
                                className={`h-48 rounded-3xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all duration-300 ${
                                    testState === "idle" ? "border-slate-800 bg-slate-900/50 hover:bg-white/5" :
                                    testState === "waiting" ? "border-yellow-500/50 bg-yellow-500/5 animate-pulse" :
                                    testState === "click" ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.1)]" :
                                    "border-cyan-500/30 bg-cyan-500/5"
                                }`}
                            >
                                {testState === "idle" && (
                                    <button onClick={startReactionTest} className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 bg-cyan-500 text-black rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                            <Zap size={20} fill="currentColor" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Press to start</span>
                                    </button>
                                )}
                                {testState === "waiting" && <span className="text-yellow-500 font-black italic uppercase tracking-widest text-lg">Wait for it...</span>}
                                {testState === "click" && <span className="text-white font-black text-4xl italic tracking-tighter uppercase animate-bounce">Tap Now!</span>}
                                {testState === "result" && (
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Test Complete</p>
                                        <button onClick={startReactionTest} className="bg-white/10 px-6 py-2 rounded-full text-white font-black uppercase text-[9px] tracking-widest hover:bg-white/20 transition-all">Try Again</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 2. AI Card (Pure Magic) */}
                        <motion.div layout className="bg-gradient-to-br from-cyan-500 to-blue-700 rounded-[2.5rem] p-10 text-white relative shadow-2xl shadow-cyan-500/10">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <Brain size={24} className="text-white" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Vital AI Assistant</h3>
                                </div>

                                <AnimatePresence mode="wait">
                                    {!aiResponse ? (
                                        <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter leading-none">
                                                {reactionScore ? `Score: ${reactionScore}ms` : "Kaisa lag raha hai?"}
                                            </h2>
                                            <div className="relative group">
                                                <input 
                                                    type="text" 
                                                    value={symptoms} 
                                                    onChange={(e) => setSymptoms(e.target.value)}
                                                    placeholder="Example: Tired feel ho raha hai..."
                                                    className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-5 text-sm placeholder:text-white/30 focus:outline-none focus:bg-black/30 transition-all font-bold pr-16"
                                                />
                                                <button 
                                                    onClick={getAIResponse} 
                                                    disabled={aiLoading || !symptoms.trim()}
                                                    className="absolute right-3 top-3 bg-white text-black p-3 rounded-xl hover:bg-cyan-400 transition-colors"
                                                >
                                                    {aiLoading ? <RefreshCw size={20} className="animate-spin" /> : <Sparkles size={20} />}
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="response" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                                            <div className="bg-black/20 p-6 rounded-3xl border border-white/10 max-h-[220px] overflow-y-auto custom-scrollbar">
                                                <div className="prose prose-invert text-sm font-medium leading-relaxed">
                                                    <ReactMarkdown>{aiResponse}</ReactMarkdown>
                                                </div>
                                            </div>
                                            <button onClick={() => { setAiResponse(null); setSymptoms(""); }} className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full hover:bg-black/40 transition-all">
                                                <RefreshCw size={12} /> New Report
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <Activity size={180} className="absolute -right-16 -bottom-16 text-white/5 rotate-12" />
                        </motion.div>
                    </div>

                    {/* Right Column: User Bio & Stats */}
                    <div className="space-y-8">
                        {/* Profile Info */}
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 border border-white/5">
                                    <UserIcon size={22} />
                                </div>
                                <div>
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-500">Status</h4>
                                    <p className="text-lg font-black italic text-white tracking-tight uppercase">User Online</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {loading ? [1,2,3].map(i => <div key={i} className="h-12 bg-white/5 rounded-2xl animate-pulse" />) : 
                                profile && Object.entries(profile).slice(0, 4).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{key.replace(/_/g, ' ')}</span>
                                        <span className="text-xs font-black italic text-white">{String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Small Stat Blocks */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[2.5rem] text-center">
                                <TrendingUp size={20} className="text-emerald-500 mx-auto mb-3" />
                                <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Global Rank</p>
                                <p className="text-2xl font-black italic text-white">#402</p>
                            </div>
                            <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[2.5rem] text-center">
                                <Shield size={20} className="text-blue-500 mx-auto mb-3" />
                                <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Security</p>
                                <p className="text-2xl font-black italic text-blue-500">SAFE</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}