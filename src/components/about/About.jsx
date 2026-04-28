import React from 'react'

export default function About() {

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

              

                    <div>

                        <h1 className="text-5xl font-extrabold leading-tight">

                            About
                            <span className="text-cyan-400 block">
                                VitalAI
                            </span>

                        </h1>

                        <p className="mt-8 text-slate-300 text-lg leading-8">

                            VitalAI is an AI-driven predictive healthcare platform
                            designed to detect health risks early using lifestyle
                            and behavioral data.

                        </p>

                        <p className="mt-6 text-slate-400 leading-8">

                            Our platform continuously analyzes sleep patterns,
                            diet, stress levels, physical activity and heart
                            health to provide intelligent recommendations
                            and predictive insights.

                        </p>

                        <div className="grid grid-cols-2 gap-6 mt-10">

                            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">

                                <h2 className="text-4xl font-bold text-cyan-400">
                                    98%
                                </h2>

                                <p className="mt-3 text-slate-300">
                                    Prediction Accuracy
                                </p>

                            </div>

                            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">

                                <h2 className="text-4xl font-bold text-green-400">
                                    24/7
                                </h2>

                                <p className="mt-3 text-slate-300">
                                    AI Monitoring
                                </p>

                            </div>

                        </div>

                    </div>

                    
                    <div>

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

                            <h2 className="text-3xl font-bold text-cyan-400 mb-8">

                                Why VitalAI?

                            </h2>

                            <div className="space-y-8">

                                <div>

                                    <h3 className="text-2xl font-semibold">
                                        AI Predictions
                                    </h3>

                                    <p className="text-slate-400 mt-2">
                                        Predict diabetes, hypertension and stress risks.
                                    </p>

                                </div>

                                <div>

                                    <h3 className="text-2xl font-semibold">
                                        Personalized Insights
                                    </h3>

                                    <p className="text-slate-400 mt-2">
                                        Smart recommendations for diet and fitness.
                                    </p>

                                </div>

                                <div>

                                    <h3 className="text-2xl font-semibold">
                                        Explainable AI
                                    </h3>

                                    <p className="text-slate-400 mt-2">
                                        Understand how AI generates health predictions.
                                    </p>

                                </div>

                                <div>

                                    <h3 className="text-2xl font-semibold">
                                        Real-time Tracking
                                    </h3>

                                    <p className="text-slate-400 mt-2">
                                        Continuous monitoring with dynamic health updates.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}