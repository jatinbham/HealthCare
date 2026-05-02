import React, { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, 
    ResponsiveContainer, CartesianGrid, AreaChart, Area 
} from 'recharts';
import { LogOut, Activity, Brain, User as UserIcon, RefreshCw, Sparkles } from 'lucide-react';
import BASE_URL from "../../api";
import ReactMarkdown from 'react-markdown';

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
            // Multi-key check backend response ke liye
            setAiResponse(data.reply || data.message || data.response || "AI suggestion received.");
        } catch (error) {
            setAiResponse("AI service is currently unavailable. Please try again.");
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
                        
                        {/* AI Insights Card (Screenshot 11 Style) */}
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 transition-all duration-500 hover:border-cyan-500/30 shadow-2xl shadow-cyan-500/5">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Brain size={22} className="text-cyan-400" />
                                    Neural Health Insight
                                </h2>
                                <button 
                                    onClick={getAIResponse}
                                    disabled={aiLoading}
                                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 group"
                                    title="Regenerate Analysis"
                                >
                                    <RefreshCw size={20} className={`${aiLoading ? 'animate-spin' : ''} text-slate-400 group-hover:text-cyan-400`} />
                                </button>
                            </div>

                            <div className="min-h-[140px] flex flex-col justify-center">
                                {aiLoading ? (
                                    <div className="space-y-4 animate-pulse">
                                        <div className="h-3 bg-slate-800 rounded-full w-full"></div>
                                        <div className="h-3 bg-slate-800 rounded-full w-[92%]"></div>
                                        <div className="h-3 bg-slate-800 rounded-full w-[75%]"></div>
                                    </div>
                                ) : aiResponse ? (
                                    <div className="text-slate-300 leading-relaxed prose prose-invert max-w-none">
                                        <ReactMarkdown 
                                            components={{
                                                strong: ({node, ...props}) => <span className="text-cyan-400 font-bold" {...props} />,
                                                p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                                                li: ({node, ...props}) => <li className="ml-4 list-disc mb-1 text-slate-400" {...props} />,
                                                ul: ({node, ...props}) => <ul className="mb-4" {...props} />
                                            }}
                                        >
                                            {aiResponse}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <p className="text-slate-500 italic mb-6">Your neural health analysis is ready to be generated.</p>
                                        <button
                                            onClick={getAIResponse}
                                            className="bg-cyan-500 hover:bg-cyan-400 text-[#020617] px-8 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto shadow-lg shadow-cyan-500/20"
                                        >
                                            <Sparkles size={18} />
                                            Generate Insights
                                        </button>
                                    </div>
                                )}
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
                                            itemStyle={{ color: '#22d3ee' }}
                                        />
                                        <Area type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Profile & Vitals */}
                    <div className="space-y-8">
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 shadow-xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <UserIcon size={20} className="text-indigo-400" />
                                Health Profile
                            </h2>
                            
                            {loading ? (
                                <div className="animate-pulse space-y-4">
                                    {[1,2,3,4].map(i => <div key={i} className="h-12 bg-slate-800/50 rounded-xl" />)}
                                </div>
                            ) : profile ? (
                                <div className="space-y-4">
                                    {Object.entries(profile).slice(0, 6).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                                            <span className="text-slate-400 capitalize text-sm">{key.replace(/_/g, ' ')}</span>
                                            <span className="font-semibold text-cyan-400">{String(value)}</span>
                                        </div>
                                    ))}
                                    <p className="text-[10px] text-center text-slate-500 mt-4 uppercase tracking-widest">
                                        Verified Biometric Data
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
                        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-[2rem] p-6 relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-indigo-500/10 blur-2xl rounded-full group-hover:bg-indigo-500/20 transition-all"></div>
                            <h3 className="font-bold text-indigo-300 mb-2 flex items-center gap-2">
                                <Sparkles size={16} />
                                Quick Tip
                            </h3>
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