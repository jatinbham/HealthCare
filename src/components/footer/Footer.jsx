import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-12">

                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                <span className="text-black text-3xl font-black">V</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">VitalAI</h1>
                                <p className="text-cyan-400 text-sm -mt-1">Predictive Healthcare</p>
                            </div>
                        </div>

                        <p className="text-slate-400 mt-6 leading-relaxed text-[15px]">
                            AI-powered platform helping you detect health risks early 
                            and make smarter lifestyle choices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-lg font-semibold mb-6 text-cyan-400">Quick Links</h2>
                        <ul className="space-y-3.5 text-slate-300">
                            <li><Link to="/" className="hover:text-cyan-400 transition">Home</Link></li>
                            <li><Link to="/about" className="hover:text-cyan-400 transition">About Us</Link></li>
                            <li><Link to="/dashboard" className="hover:text-cyan-400 transition">Dashboard</Link></li>
                            <li><Link to="/history" className="hover:text-cyan-400 transition">Health History</Link></li>
                            <li><Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Features */}
                    <div>
                        <h2 className="text-lg font-semibold mb-6 text-cyan-400">Features</h2>
                        <ul className="space-y-3.5 text-slate-300">
                            <li>AI Health Predictions</li>
                            <li>Symptom Analysis</li>
                            <li>Heart & Sleep Monitoring</li>
                            <li>Stress & Lifestyle Insights</li>
                            <li>Personalized Reports</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="text-lg font-semibold mb-6 text-cyan-400">Get In Touch</h2>
                        <ul className="space-y-3.5 text-slate-300">
                            <li className="flex items-center gap-2">
                                ✉️ vitalai.health@gmail.com
                            </li>
                            <li className="flex items-center gap-2">
                                📞 +91 98765 43210
                            </li>
                            <li>Bhopal, Madhya Pradesh</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="text-slate-500">
                        © 2026 VitalAI. All Rights Reserved.
                    </p>

                    <div className="flex gap-6 mt-4 md:mt-0">
                        <div className="w-9 h-9 rounded-full bg-slate-800 hover:bg-cyan-500 hover:text-black flex items-center justify-center cursor-pointer transition">
                            𝕏
                        </div>
                        <div className="w-9 h-9 rounded-full bg-slate-800 hover:bg-cyan-500 hover:text-black flex items-center justify-center cursor-pointer transition">
                            𝕚
                        </div>
                        <div className="w-9 h-9 rounded-full bg-slate-800 hover:bg-cyan-500 hover:text-black flex items-center justify-center cursor-pointer transition">
                            𝕃
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}