import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 text-white">

            <div className="max-w-7xl mx-auto px-6 py-24">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side - Content */}
                    <div>
                        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter">
                            Predict Diseases Before They Appear
                            <span className="block text-cyan-400 mt-3">
                                Powered by AI
                            </span>
                        </h1>

                        <p className="mt-8 text-lg text-slate-300 leading-relaxed max-w-lg">
                            Advanced AI that analyzes your health data and predicts risks early. 
                            Take control of your health with real-time insights.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-5">
                            <Link 
                                to="/health-analysis"
                                className="bg-cyan-500 hover:bg-cyan-600 px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-cyan-500/40 inline-block"
                            >
                                Get Free Analysis
                            </Link>

                            <button className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-2xl font-semibold text-lg transition duration-300">
                                Watch Demo
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-16">
                            <div className="bg-slate-800/60 backdrop-blur-lg p-6 rounded-2xl border border-slate-700">
                                <h2 className="text-4xl font-bold text-cyan-400">98%</h2>
                                <p className="text-slate-400 mt-2 text-sm">Prediction Accuracy</p>
                            </div>

                            <div className="bg-slate-800/60 backdrop-blur-lg p-6 rounded-2xl border border-slate-700">
                                <h2 className="text-4xl font-bold text-green-400">24/7</h2>
                                <p className="text-slate-400 mt-2 text-sm">Health Monitoring</p>
                            </div>

                            <div className="bg-slate-800/60 backdrop-blur-lg p-6 rounded-2xl border border-slate-700">
                                <h2 className="text-4xl font-bold text-pink-400">AI</h2>
                                <p className="text-slate-400 mt-2 text-sm">Personal Insights</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Dashboard Preview */}
                    <div className="relative">
                        <div className="bg-slate-800/70 backdrop-blur-2xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
                            <h2 className="text-2xl font-bold mb-8 text-cyan-400 text-center">
                                Live Health Overview
                            </h2>

                            <div className="space-y-6">
                                {[
                                    { label: "Sleep Score", value: "89%", color: "bg-cyan-400", width: "89%" },
                                    { label: "Stress Level", value: "Medium", color: "bg-yellow-400", width: "60%" },
                                    { label: "Diabetes Risk", value: "Low", color: "bg-green-400", width: "25%" },
                                    { label: "Heart Health", value: "Excellent", color: "bg-emerald-400", width: "92%" }
                                ].map((item, index) => (
                                    <div key={index} className="bg-slate-900 p-5 rounded-2xl">
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-lg">{item.label}</h3>
                                            <span className="font-bold">{item.value}</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-3">
                                            <div 
                                                className={`${item.color} h-3 rounded-full`} 
                                                style={{ width: item.width }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-32">
                    <h2 className="text-4xl font-bold text-center mb-4">
                        Smart Healthcare Features
                    </h2>
                    <p className="text-slate-400 text-center text-lg max-w-2xl mx-auto">
                        Powerful AI tools designed for preventive healthcare
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        {[
                            { title: "Sleep Tracking", color: "text-cyan-400", desc: "Monitor sleep cycles and get AI-powered recovery tips." },
                            { title: "Stress Detection", color: "text-pink-400", desc: "Detect stress patterns from your daily behavior." },
                            { title: "Heart Monitoring", color: "text-green-400", desc: "Real-time heart health tracking with alerts." },
                            { title: "AI Predictions", color: "text-yellow-400", desc: "Early warnings for diabetes, hypertension & more." },
                            { title: "Personalized Diet", color: "text-cyan-400", desc: "Custom nutrition plans based on your health profile." },
                            { title: "Explainable AI", color: "text-purple-400", desc: "Understand exactly why a prediction was made." }
                        ].map((feature, i) => (
                            <div 
                                key={i}
                                className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
                            >
                                <h3 className={`text-2xl font-bold ${feature.color}`}>{feature.title}</h3>
                                <p className="text-slate-300 mt-4 leading-relaxed">
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