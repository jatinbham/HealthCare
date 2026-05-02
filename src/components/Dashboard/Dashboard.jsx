import React, { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';
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
        { day: "Mon", score: 72 },
        { day: "Tue", score: 78 },
        { day: "Wed", score: 80 },
        { day: "Thu", score: 85 },
        { day: "Fri", score: 92 },
        { day: "Sat", score: 88 },
        { day: "Sun", score: 95 }
    ];

    // Fetch Profile
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

    // AI Suggestion
    const getAIResponse = async () => {
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
                    symptoms: "headache, stress, low sleep"
                })
            });

            const data = await response.json();
            setAiResponse(data.reply || data.message || "AI suggestion received.");
        } catch (error) {
            console.error(error);
            setAiResponse("AI service is currently unavailable. Please try again later.");
        } finally {
            setAiLoading(false);
        }
    };

    // Fetch on load and refresh
    useEffect(() => {
        if (token) {
            fetchProfile();
        }
    }, [token, refreshTrigger]);

    // Listen for update from HealthForm
    useEffect(() => {
        const interval = setInterval(() => {
            if (localStorage.getItem("profileUpdated")) {
                setRefreshTrigger(prev => prev + 1);
                localStorage.removeItem("profileUpdated");
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 text-white p-6 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">
                            Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
                        </h1>
                        <p className="text-slate-300 mt-2 text-lg">Your AI Health Dashboard</p>
                    </div>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-medium transition"
                    >
                        Logout
                    </button>
                </div>

                {/* AI Insight Section */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-400/40 rounded-3xl p-8 mb-10 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-2xl">
                            🤖
                        </div>
                        <h2 className="text-2xl font-bold text-cyan-400">AI Health Insight</h2>
                    </div>

                    {aiLoading ? (
                        <div className="flex items-center gap-4 text-cyan-300 py-8">
                            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                            <p>AI analyzing your health data...</p>
                        </div>
                    ) : aiResponse ? (
                        <div className="bg-slate-950/70 border-l-4 border-cyan-400 p-7 rounded-2xl text-slate-200 leading-relaxed text-[17px]">
                            {aiResponse}
                        </div>
                    ) : (
                        <p className="text-slate-400 py-6">Get personalized AI suggestion for your health</p>
                    )}

                    <button
                        onClick={getAIResponse}
                        disabled={aiLoading}
                        className="mt-6 w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 disabled:opacity-70 px-10 py-4 rounded-2xl text-black font-bold text-lg transition-all shadow-lg shadow-cyan-500/30"
                    >
                        {aiLoading ? "⏳ Thinking..." : "✨ Get New AI Suggestion"}
                    </button>
                </div>

                {/* Health Profile */}
                <div className="bg-slate-800/70 backdrop-blur-lg p-6 md:p-8 rounded-3xl mb-10 border border-slate-700">
                    <h2 className="text-2xl font-semibold text-cyan-400 mb-5">Your Health Profile</h2>
                    {loading ? (
                        <p>Loading your health data...</p>
                    ) : profile ? (
                        <pre className="bg-slate-900 p-5 rounded-2xl text-sm overflow-auto max-h-80 text-slate-300">
                            {JSON.stringify(profile, null, 2)}
                        </pre>
                    ) : (
                        <p className="text-slate-400">No profile data found. Fill Health Form first.</p>
                    )}
                </div>

                {/* Weekly Progress Chart */}
                <div className="bg-slate-800/70 backdrop-blur-lg p-6 md:p-8 rounded-3xl border border-slate-700">
                    <h2 className="text-3xl font-semibold text-cyan-400 mb-6">Weekly Health Score</h2>
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={healthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="day" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Line 
                                type="monotone" 
                                dataKey="score" 
                                stroke="#22d3ee" 
                                strokeWidth={4} 
                                dot={{ fill: "#22d3ee", r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}