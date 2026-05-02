import React, { useState } from 'react';
import axios from "axios";
import BASE_URL from '../../api';

export default function HealthForm() {
    const [formData, setFormData] = useState({
        name: "", age: "", weight: "", height: "", 
        sleep: "", water: "", exercise: "", 
        stress: "", sugar: "", bp: ""
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const analyzeHealth = () => {
        const { age, sleep, water, exercise, stress, sugar, bp, weight, height } = formData;
        let score = 100;
        let warnings = [];
        let tips = [];

        const bmi = weight && height ? 
            (weight / ((height / 100) * (height / 100))).toFixed(1) : 0;

        if (Number(age) > 50) { score -= 10; warnings.push("Age-related metabolic slowdown."); tips.push("Schedule a bone density test."); }
        if (Number(sleep) < 6) { score -= 20; warnings.push("Sleep debt detected."); tips.push("Maintain a consistent circadian rhythm."); }
        if (Number(water) < 2) { score -= 10; warnings.push("Dehydration risk."); tips.push("Drink 500ml water upon waking up."); }
        if (Number(exercise) === 0) { score -= 20; warnings.push("Sedentary lifestyle."); tips.push("Start with 15-min zone 2 cardio."); }
        if (Number(stress) >= 8) { score -= 25; warnings.push("High Cortisol levels likely."); tips.push("Try box breathing techniques."); }
        if (Number(sugar) > 140) { score -= 30; warnings.push("Hyperglycemia risk."); tips.push("Monitor post-meal glucose."); }
        if (Number(bp) > 140) { score -= 30; warnings.push("Hypertension warning."); tips.push("Reduce sodium intake immediately."); }

        let healthStatus = score >= 85 ? "Excellent" : score >= 65 ? "Stable" : score >= 40 ? "Needs Attention" : "Critical";
        let statusColor = score >= 85 ? "text-green-400" : score >= 65 ? "text-cyan-400" : "text-red-400";

        setResult({ score: Math.max(0, score), bmi, healthStatus, statusColor, warnings, tips });
    };

    const saveHealthProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) return alert("Please login to save progress!");
        if (!formData.name || !formData.age) return alert("Basics (Name/Age) are required!");

        setLoading(true);
        try {
            await axios.post(`${BASE_URL}/health-profile`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Vitals Sync Complete! ✅");
            localStorage.setItem("profileUpdated", Date.now().toString());
        } catch (error) {
            alert("Sync Failed. Check connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Biometric Analysis
                    </h1>
                    <p className="text-slate-400 text-lg">Input your daily vitals for an AI-generated health projection.</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Vital Inputs */}
                        {Object.keys(formData).map((field) => (
                            <div key={field} className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-2">
                                    {field}
                                </label>
                                <input
                                    type="text"
                                    name={field}
                                    placeholder={`Enter ${field}...`}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all text-cyan-50"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-12">
                        <button onClick={analyzeHealth} className="flex-1 bg-white text-black hover:bg-cyan-400 py-5 rounded-2xl font-black transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                            RUN AI DIAGNOSTIC
                        </button>
                        <button onClick={saveHealthProfile} disabled={loading} className="flex-1 border border-slate-700 hover:border-cyan-500/50 py-5 rounded-2xl font-black transition-all">
                            {loading ? "SYNCING..." : "SAVE TO CLOUD"}
                        </button>
                    </div>
                </div>

                {/* AI Report Section */}
                {result && (
                    <div className="mt-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <div className="bg-gradient-to-b from-slate-900 to-[#020617] border border-cyan-500/20 p-10 rounded-[2.5rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
                            
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                <div>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Analysis Result</p>
                                    <h2 className={`text-5xl font-black ${result.statusColor}`}>{result.healthStatus}</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Vital Score</p>
                                    <div className="text-5xl font-mono font-bold text-white">{result.score}<span className="text-slate-700 text-2xl">/100</span></div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Potential Risks</h4>
                                    {result.warnings.map((w, i) => (
                                        <div key={i} className="flex items-center gap-3 text-red-400/80 text-sm bg-red-400/5 p-3 rounded-xl border border-red-400/10">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> {w}
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">AI Recommendations</h4>
                                    {result.tips.map((t, i) => (
                                        <div key={i} className="flex items-center gap-3 text-cyan-400/80 text-sm bg-cyan-400/5 p-3 rounded-xl border border-cyan-400/10">
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> {t}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 font-medium">
                                <span>BMI Index: {result.bmi}</span>
                                <span>Generated by VitalAI v2.0</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}