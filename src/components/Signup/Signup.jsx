import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../../api';

export default function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Account Created Successfully! 🎉");
                navigate("/login"); 
            } else {
                alert(data.error || data.message || "Signup failed");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-12 font-sans relative overflow-hidden">
            
            {/* Background Glows (Same as Login) */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/20 blur-[120px] rounded-full opacity-50"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full opacity-50"></div>

            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl w-full z-10">

                {/* Left Side: Text Branding */}
                <div className="hidden lg:block text-left">
                    <p className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 italic">System Registry 04</p>
                    <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.85] mb-8">
                        Join <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-600">The Neural</span> <br /> Network.
                    </h1>
                    <p className="text-slate-500 text-lg font-medium max-w-sm">
                        Create your unique identity to begin AI-powered health tracking.
                    </p>
                </div>

                {/* Right Side: Signup Card (Matched to Login Card) */}
                <div className="bg-[#0a0a0a] border border-white/5 p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter">Create Identity</h2>
                        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-2">Initialize your biometric link</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="YOUR NAME"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Identifier</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="EMAIL@IDENTITY.COM"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Key</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm Key</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black py-5 rounded-full font-black uppercase text-[11px] tracking-[0.2em] hover:bg-cyan-400 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-cyan-500/5 mt-4"
                        >
                            {loading ? "Registering..." : "Initialize Session →"}
                        </button>
                    </form>

                    <div className="mt-10 border-t border-white/5 pt-8 text-center">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                            Already linked? <Link to="/login" className="text-white hover:text-cyan-400 ml-1 transition-colors">Login Here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}