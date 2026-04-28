import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 text-white">

            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">

                            AI-Driven Made By Jatin
                            <span className="block text-cyan-400">
                                Predictive Healthcare
                            </span>

                        </h1>

                        <p className="mt-8 text-lg text-slate-300 leading-8">

                            Predict diseases before symptoms appear using Artificial Intelligence.
                            Track sleep, stress, activity, diet and health risks in real-time.

                        </p>

                        <div className="mt-10 flex gap-5">

                            <button className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl font-semibold text-lg transition duration-300 shadow-lg shadow-cyan-500/30">

                                Get Health Analysis

                            </button>

                            <button className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-2xl font-semibold text-lg transition duration-300">

                                Learn More

                            </button>

                        </div>

                    
                

                        <div className="grid grid-cols-3 gap-6 mt-14">

                            <div className="bg-slate-800/50 backdrop-blur-lg p-5 rounded-2xl border border-slate-700">

                                <h2 className="text-3xl font-bold text-cyan-400">
                                    98%
                                </h2>

                                <p className="text-slate-300 mt-2">
                                    Accuracy
                                </p>

                            </div>

                            <div className="bg-slate-800/50 backdrop-blur-lg p-5 rounded-2xl border border-slate-700">

                                <h2 className="text-3xl font-bold text-green-400">
                                    24/7
                                </h2>

                                <p className="text-slate-300 mt-2">
                                    Monitoring
                                </p>

                            </div>

                            <div className="bg-slate-800/50 backdrop-blur-lg p-5 rounded-2xl border border-slate-700">

                                <h2 className="text-3xl font-bold text-pink-400">
                                    AI
                                </h2>

                                <p className="text-slate-300 mt-2">
                                    Insights
                                </p>

                            </div>

                        </div>

                    </div>

                    

                    <div className="relative">

                        <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">

                            <h2 className="text-3xl font-bold mb-8 text-cyan-400">

                                Health Dashboard

                            </h2>

                            <div className="space-y-6">

                                <div className="bg-slate-900 p-5 rounded-2xl">

                                    <div className="flex justify-between items-center">

                                        <h3 className="text-lg">
                                            Sleep Score
                                        </h3>

                                        <span className="text-cyan-400 font-bold">
                                            89%
                                        </span>

                                    </div>

                                    <div className="w-full bg-slate-700 rounded-full h-3 mt-4">

                                        <div className="bg-cyan-400 h-3 rounded-full w-[89%]"></div>

                                    </div>

                                </div>

                                <div className="bg-slate-900 p-5 rounded-2xl">

                                    <div className="flex justify-between items-center">

                                        <h3 className="text-lg">
                                            Stress Level
                                        </h3>

                                        <span className="text-yellow-400 font-bold">
                                            Medium
                                        </span>

                                    </div>

                                    <div className="w-full bg-slate-700 rounded-full h-3 mt-4">

                                        <div className="bg-yellow-400 h-3 rounded-full w-[60%]"></div>

                                    </div>

                                </div>

                                <div className="bg-slate-900 p-5 rounded-2xl">

                                    <div className="flex justify-between items-center">

                                        <h3 className="text-lg">
                                            Diabetes Risk
                                        </h3>

                                        <span className="text-red-400 font-bold">
                                            Low
                                        </span>

                                    </div>

                                    <div className="w-full bg-slate-700 rounded-full h-3 mt-4">

                                        <div className="bg-red-400 h-3 rounded-full w-[25%]"></div>

                                    </div>

                                </div>

                                <div className="bg-slate-900 p-5 rounded-2xl">

                                    <div className="flex justify-between items-center">

                                        <h3 className="text-lg">
                                            Heart Health
                                        </h3>

                                        <span className="text-green-400 font-bold">
                                            Excellent
                                        </span>

                                    </div>

                                    <div className="w-full bg-slate-700 rounded-full h-3 mt-4">

                                        <div className="bg-green-400 h-3 rounded-full w-[92%]"></div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="mt-28">

                    <h2 className="text-5xl font-bold text-center">

                        Smart Healthcare Features

                    </h2>

                    <p className="text-slate-400 text-center mt-5 text-lg">

                        AI-powered monitoring and prediction system for preventive healthcare.

                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

                        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-cyan-400 transition duration-300">

                            <h3 className="text-2xl font-bold text-cyan-400">
                                Sleep Tracking
                            </h3>

                            <p className="text-slate-300 mt-4 leading-7">
                                Monitor sleep cycles and improve recovery with AI insights.
                            </p>

                        </div>

                        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-cyan-400 transition duration-300">

                            <h3 className="text-2xl font-bold text-pink-400">
                                Stress Detection
                            </h3>

                            <p className="text-slate-300 mt-4 leading-7">
                                Analyze stress patterns using behavioral and health data.
                            </p>

                        </div>

                        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-cyan-400 transition duration-300">

                            <h3 className="text-2xl font-bold text-green-400">
                                Heart Monitoring
                            </h3>

                            <p className="text-slate-300 mt-4 leading-7">
                                Track heart health and receive predictive alerts instantly.
                            </p>

                        </div>

                        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-cyan-400 transition duration-300">

                            <h3 className="text-2xl font-bold text-yellow-400">
                                AI Predictions
                            </h3>

                            <p className="text-slate-300 mt-4 leading-7">
                                Predict diabetes, hypertension and health risks early.
                            </p>

                        </div>

                        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-cyan-400 transition duration-300">

                            <h3 className="text-2xl font-bold text-cyan-400">
                                Personalized Diet
                            </h3>

                            <p className="text-slate-300 mt-4 leading-7">
                                Receive AI-based meal plans and nutrition recommendations.
                            </p>

                        </div>

                        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-cyan-400 transition duration-300">

                            <h3 className="text-2xl font-bold text-red-400">
                                Explainable AI
                            </h3>

                            <p className="text-slate-300 mt-4 leading-7">
                                Understand why predictions are generated with transparent AI.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}