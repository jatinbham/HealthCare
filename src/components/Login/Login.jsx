import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

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
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                alert("Login Successful 🚀");
                navigate("/dashboard");
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error(error);
            alert("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 text-white flex items-center justify-center px-6 py-12">
            <div className="grid lg:grid-cols-2 gap-14 items-center max-w-7xl w-full">

                {/* Left Side */}
                <div>
                    <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
                        Welcome Back
                        <span className="block text-cyan-400">to VitalAI</span>
                    </h1>

                    <p className="mt-8 text-lg text-slate-300 leading-relaxed">
                        Access your personal AI healthcare dashboard. 
                        Get real-time insights and predictive analysis.
                    </p>

                    <div className="grid grid-cols-3 gap-6 mt-14">
                        <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 text-center">
                            <h2 className="text-3xl font-bold text-cyan-400">Secure</h2>
                            <p className="text-slate-400 mt-1">Login</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 text-center">
                            <h2 className="text-3xl font-bold text-green-400">AI</h2>
                            <p className="text-slate-400 mt-1">Analysis</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 text-center">
                            <h2 className="text-3xl font-bold text-pink-400">24/7</h2>
                            <p className="text-slate-400 mt-1">Support</p>
                        </div>
                    </div>
                </div>

                {/* Login Form */}
                <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-10 shadow-2xl">
                    <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">Login</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-slate-300 mb-3 text-lg">Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 mb-3 text-lg">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-4 text-slate-400 hover:text-white"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                                <input type="checkbox" className="accent-cyan-400" />
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="text-cyan-400 hover:text-cyan-300">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-700 py-4 rounded-2xl font-semibold text-lg transition duration-300 text-black disabled:cursor-not-allowed"
                        >
                            {loading ? "Logging in..." : "Login to Dashboard"}
                        </button>
                    </form>

                    <p className="text-center text-slate-400 mt-8">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}