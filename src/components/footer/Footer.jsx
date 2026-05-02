import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-[#020617] border-t border-slate-900 text-white mt-auto relative">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center font-black text-black text-xl">
                                V
                            </div>
                            <div>
                                <h1 className="text-xl font-bold tracking-tight text-white">VitalAI</h1>
                                <p className="text-cyan-500 text-[10px] uppercase tracking-widest font-bold">Predictive Care</p>
                            </div>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-sm max-w-xs">
                            Advanced AI platform for early disease detection and proactive health management.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-slate-500">Navigation</h2>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
                            <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link></li>
                            <li><Link to="/history" className="hover:text-cyan-400 transition-colors">Health History</Link></li>
                        </ul>
                    </div>

                    {/* Capabilities */}
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-slate-500">Capabilities</h2>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li className="flex items-center gap-2">AI Health Predictions</li>
                            <li className="flex items-center gap-2">Symptom Analysis</li>
                            <li className="flex items-center gap-2">Vital Monitoring</li>
                            <li className="flex items-center gap-2">Lifestyle Insights</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-slate-500">Connect</h2>
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li className="text-slate-400">vitalai.health@gmail.com</li>
                            <li className="text-slate-400">+91 98765 43210</li>
                            <li className="text-slate-400">Bhopal, Madhya Pradesh</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-xs">
                        © 2026 VitalAI. All rights reserved.
                    </p>

                    <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <span className="hover:text-cyan-400 cursor-pointer transition-colors">Twitter</span>
                        <span className="hover:text-cyan-400 cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-cyan-400 cursor-pointer transition-colors">LinkedIn</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}