import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, Zap, Heart, Brain, Sparkles } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
            
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
                
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Content */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full text-cyan-400 text-sm font-medium mb-6">
                            <Sparkles size={16} />
                            <span>Next-Gen Disease Prediction</span>
                        </div>
                        
                        <h1 className="text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                            Predict Health <br />
                            <span className="text-cyan-400">Before</span> It Fails.
                        </h1>

                        <p className="mt-8 text-xl text-slate-400 leading-relaxed max-w-lg">
                            VitalAI leverages deep learning to analyze your medical patterns, 
                            giving you a window into your future health. Preventive care, 
                            reimagined.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-5">
                            <Link 
                                to="/health-analysis"
                                className="group flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
                            >
                                Get Started Free
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <button className="flex items-center gap-2 bg-slate-900/50 border border-slate-700 hover:border-slate-500 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300">
                                <Play size={20} fill="currentColor" />
                                Watch Demo
                            </button>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-3 gap-6 mt-16 border-t border-slate-800/50 pt-10">
                            {[
                                { val: "98%", label: "Accuracy", color: "text-cyan-400" },
                                { val: "24/7", label: "Monitoring", color: "text-emerald-400" },
                                { val: "HIPAA", label: "Secure", color: "text-indigo-400" }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <h2 className={`text-3xl font-bold ${stat.color}`}>{stat.val}</h2>
                                    <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Premium Dashboard Mockup */}
                    <div className="relative">
                        {/* Glow effect behind the card */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 blur-3xl rounded-[3rem]" />
                        
                        <div className="relative bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                                    Live Analysis
                                </h2>
                                <div className="bg-slate-800 px-4 py-1.5 rounded-full text-xs text-slate-400 border border-slate-700">
                                    Real-time Sync
                                </div>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { label: "Neural Sleep Score", value: "89%", color: "from-cyan-400 to-blue-500", width: "89%", icon: <Zap size={16}/> },
                                    { label: "Stress Markers", value: "Low", color: "from-emerald-400 to-teal-500", width: "25%", icon: <Brain size={16}/> },
                                    { label: "Cardiovascular Health", value: "Excellent", color: "from-rose-400 to-pink-600", width: "94%", icon: <Heart size={16}/> }
                                ].map((item, index) => (
                                    <div key={index} className="group bg-slate-950/50 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-3 text-slate-300">
                                                {item.icon}
                                                <h3 className="font-medium">{item.label}</h3>
                                            </div>
                                            <span className="font-bold text-white">{item.value}</span>
                                        </div>
                                        <div className="w-full bg-slate-800 rounded-full h-2.5">
                                            <div 
                                                className={`bg-gradient-to-r ${item.color} h-2.5 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.2)]`} 
                                                style={{ width: item.width }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-4 -left-4 bg-indigo-600 p-4 rounded-2xl shadow-xl rotate-3 border border-indigo-400 flex items-center gap-3">
                                <Shield className="text-white" />
                                <div>
                                    <p className="text-xs text-indigo-200">Data Encryption</p>
                                    <p className="font-bold text-sm">Military Grade</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-40 text-center">
                    <h2 className="text-4xl font-bold bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
                        Engineered for Prevention
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-8 mt-20">
                        {[
                            { title: "Smart Diagnosis", icon: <Brain />, color: "border-cyan-500/20", desc: "Our AI models are trained on millions of medical records for maximum accuracy." },
                            { title: "Pulse Sync", icon: <Heart />, color: "border-rose-500/20", desc: "Connect your wearable devices for seamless real-time vital monitoring." },
                            { title: "Risk Alerts", icon: <Shield />, color: "border-emerald-500/20", desc: "Get notified immediately when AI detects potential health anomalies." }
                        ].map((feature, i) => (
                            <div 
                                key={i}
                                className={`group p-10 rounded-[2.5rem] bg-slate-900/30 border ${feature.color} hover:bg-slate-900/50 transition-all duration-500 text-left`}
                            >
                                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500 transition-all duration-300">
                                    {React.cloneElement(feature.icon, { className: "group-hover:text-black" })}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}