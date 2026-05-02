import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                "https://healthcare-backend-1-5jqb.onrender.com/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await response.json();

            if (response.ok) {
                // 1. Data ko LocalStorage mein save karna
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("userName", data.user.name);

                alert("Login Successful 🚀");
                
                // 2. 🔥 FORCE REFRESH REDIRECT
                // Isse Navbar ko naya data turant mil jayega bina kisi error ke
                window.location.href = "/"; 
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Server down hai ya net check karo!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-12 font-sans relative overflow-hidden">
            
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/20 blur-[120px] rounded-full opacity-50"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full opacity-50"></div>

            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl w-full z-10">

                {/* Left Side: Text Branding */}
                <div className="hidden lg:block">
                    <p className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 italic">Security Protocol 09</p>
                    <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.85] mb-8">
                        Access <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-600">The Neural</span> <br /> Network.
                    </h1>
                    <p className="text-slate-500 text-lg font-medium max-w-sm">
                        Log in to sync your biometric data with our AI diagnostics engine.
                    </p>
                </div>

                {/* Right Side: Login Form Card */}
                <div className="bg-[#0a0a0a] border border-white/5 p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative">
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter">Login Identity</h2>
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mt-2">Enter credentials to establish link</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Identifier</label>
                            <input
                                type="email"
                                placeholder="USER_NAME@IDENTITY.COM"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Key</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-4 text-slate-600 hover:text-white transition-colors text-[10px] font-black uppercase"
                                >
                                    {showPassword ? "[ Hide ]" : "[ Show ]"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black py-5 rounded-full font-black uppercase text-[11px] tracking-[0.2em] hover:bg-cyan-400 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-cyan-500/5"
                        >
                            {loading ? "Verifying..." : "Initialize Link →"}
                        </button>
                    </form>

                    <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                            No account? <Link to="/signup" className="text-white hover:text-cyan-400 ml-1 transition-colors">Join Network</Link>
                        </p>
                        <Link to="/forgot" className="text-[10px] font-black text-slate-700 uppercase tracking-widest hover:text-white transition-colors">Lost Access Key?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}