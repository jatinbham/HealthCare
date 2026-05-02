import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../../api';

export default function Signup() {

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

        // Basic Validation
        if (!formData.name || !formData.email || !formData.password) {
            alert("All fields are required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Account Created Successfully! 🎉");
                // Form reset
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            } else {
                alert(data.error || data.message || "Signup failed");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
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
                        Join The Future
                        <span className="block text-cyan-400">Of Healthcare</span>
                    </h1>

                    <p className="mt-8 text-lg text-slate-300 leading-relaxed">
                        Create your account and start your journey towards better health with 
                        AI-powered insights and predictions.
                    </p>
                </div>

                {/* Signup Form */}
                <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-10 shadow-2xl">
                    <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">Create Account</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password (min 6 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-700 py-4 rounded-2xl font-semibold text-lg text-black transition disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-slate-400 mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}