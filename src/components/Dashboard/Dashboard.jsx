import React, { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, 
    ResponsiveContainer, CartesianGrid, AreaChart, Area 
} from 'recharts';
import { LogOut, Activity, Brain, User as UserIcon, RefreshCw } from 'lucide-react'; // Icons ke liye
import BASE_URL from "../../api";

export default function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    const healthData = [
        { day: "Mon", score: 72 }, { day: "Tue", score: 78 },
        { day: "Wed", score: 80 }, { day: "Thu", score: 85 },
        { day: "Fri", score: 92 }, { day: "Sat", score: 88 },
        { day: "Sun", score: 95 }
    ];

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
        setAiLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/ai-health`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ symptoms: "headache, stress, low sleep" })
            });
            const data = await response.json();
            setAiResponse(data.reply || data.message || "AI suggestion received.");
        } catch (error) {
            setAiResponse("AI service is currently unavailable.");
        } finally {
            setAiLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchProfile();
    }, [token, refreshTrigger]);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
            {/* Background Decorative Blobs */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto p-6 lg:p-10">
                
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                            Hello, {user?.name?.split(" ")[0] || "Champ"}
                        </h1>
                        <p className="text-slate-400 mt-2 flex items-center gap-2">
                            <Activity size={18} className="text-cyan-400" /> 
                            Your health vitals are looking great today.
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="group flex items-center gap-2 bg-slate-900/50 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/50 px-5 py-2.5 rounded-xl transition-all duration-300 text-slate-400 hover:text-red-400"
                    >
                        <LogOut size={18} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: AI & Stats */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* AI Insights Card */}
                        <div className="relative overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                                <Brain size={120} className="text-cyan-400" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400">
                                        <Brain size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold">Neural Health Insight</h2>
                                </div>

                                <div className="min-h-[100px] flex flex-col justify-center">
                                    {aiLoading ? (
                                        <div className="space-y-3 animate-pulse">
                                            <div className="h-4 bg-slate-800 rounded w-full"></div>
                                            <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                                        </div>
                                    ) : aiResponse ? (
                                        <p className="text-lg text-slate-300 leading-relaxed italic">"{aiResponse}"</p>
                                    ) : (
                                        <p className="text-slate-500">Click below to generate a new AI-powered health analysis.</p>
                                    )}
                                </div>

                                <button
                                    onClick={getAIResponse}
                                    disabled={aiLoading}
                                    className="mt-8 flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-[#020617] px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50"
                                >
                                    {aiLoading ? <RefreshCw className="animate-spin" /> : <Activity size={20} />}
                                    {aiLoading ? "Analyzing..." : "Generate Insights"}
                                </button>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8">
                            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                                <Activity size={20} className="text-emerald-400" />
                                Recovery Progress
                            </h2>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={healthData}>
                                        <defs>
                                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                        <XAxis dataKey="day" stroke="#64748b" axisLine={false} tickLine={false} dy={10} />
                                        <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                                        />
                                        <Area type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Profile & Vitals */}
                    <div className="space-y-8">
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <UserIcon size={20} className="text-indigo-400" />
                                Health Profile
                            </h2>
                            
                            {loading ? (
                                <div className="animate-pulse space-y-4">
                                    {[1,2,3].map(i => <div key={i} className="h-12 bg-slate-800/50 rounded-xl" />)}
                                </div>
                            ) : profile ? (
                                <div className="space-y-4">
                                    {Object.entries(profile).slice(0, 5).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                                            <span className="text-slate-400 capitalize text-sm">{key}</span>
                                            <span className="font-semibold text-cyan-400">{String(value)}</span>
                                        </div>
                                    ))}
                                    <p className="text-xs text-center text-slate-500 mt-4 italic">
                                        Last updated: Just now
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-slate-500 text-sm mb-4">Complete your profile to see vitals</p>
                                    <button className="text-cyan-400 text-sm font-bold hover:underline">Setup Now →</button>
                                </div>
                            )}
                        </div>

                        {/* Quick Tips Box */}
                        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-[2rem] p-6">
                            <h3 className="font-bold text-indigo-300 mb-2">Quick Tip</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Drinking 500ml of water right after waking up can boost your metabolism by 24%.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}