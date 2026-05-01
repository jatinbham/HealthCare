import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 text-white flex items-center justify-center px-6">

            <div className="grid lg:grid-cols-2 gap-14 items-center max-w-7xl w-full">

                <div>

                    <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">

                        Welcome Back
                        <span className="block text-cyan-400">
                            Login Securely
                        </span>

                    </h1>

                    <p className="mt-8 text-lg text-slate-300 leading-8">

                        Access your AI-powered healthcare dashboard,
                        monitor your health insights and receive predictive analysis instantly.

                    </p>

                    <div className="grid grid-cols-3 gap-6 mt-14">

                        <div className="bg-slate-800/50 backdrop-blur-lg p-5 rounded-2xl border border-slate-700">

                            <h2 className="text-3xl font-bold text-cyan-400">
                                Secure
                            </h2>

                            <p className="text-slate-300 mt-2">
                                Login
                            </p>

                        </div>

                        <div className="bg-slate-800/50 backdrop-blur-lg p-5 rounded-2xl border border-slate-700">

                            <h2 className="text-3xl font-bold text-green-400">
                                AI
                            </h2>

                            <p className="text-slate-300 mt-2">
                                Analysis
                            </p>

                        </div>

                        <div className="bg-slate-800/50 backdrop-blur-lg p-5 rounded-2xl border border-slate-700">

                            <h2 className="text-3xl font-bold text-pink-400">
                                24/7
                            </h2>

                            <p className="text-slate-300 mt-2">
                                Monitoring
                            </p>

                        </div>

                    </div>

                </div>

                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-10 shadow-2xl">

                    <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">

                        Login

                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>

                            <label className="block text-slate-300 mb-3 text-lg">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"
                            />

                        </div>

                        <div>

                            <label className="block text-slate-300 mb-3 text-lg">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"
                            />

                        </div>

                        <div className="flex items-center justify-between text-sm">

                            <label className="flex items-center gap-2 text-slate-300">

                                <input type="checkbox" />

                                Remember me

                            </label>

                            <button
                                type="button"
                                className="text-cyan-400 hover:text-cyan-300"
                            >
                                Forgot Password?
                            </button>

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-2xl font-semibold text-lg transition duration-300 shadow-lg shadow-cyan-500/30 text-black"
                        >

                            Login to Dashboard

                        </button>

                    </form>

                    <p className="text-center text-slate-400 mt-8">

                        Don’t have an account?

                        <Link
                            to="/signup"
                            className="text-cyan-400 hover:text-cyan-300 ml-2"
                        >
                            Create Account
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    )
}