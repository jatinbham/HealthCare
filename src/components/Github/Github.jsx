import React from 'react'

function Github() {

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <div className="max-w-7xl mx-auto px-6 py-20">

                <h1 className="text-5xl font-extrabold text-center">

                    AI Health
                    <span className="text-cyan-400">
                        {" "}Dashboard
                    </span>

                </h1>

                <p className="text-center text-slate-400 mt-5 text-lg">

                    Real-time health monitoring and predictive analytics.

                </p>

                

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">

                        <h2 className="text-slate-400 text-lg">
                            Health Score
                        </h2>

                        <h1 className="text-5xl font-bold text-cyan-400 mt-4">
                            87%
                        </h1>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">

                        <h2 className="text-slate-400 text-lg">
                            Stress Level
                        </h2>

                        <h1 className="text-5xl font-bold text-yellow-400 mt-4">
                            Medium
                        </h1>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">

                        <h2 className="text-slate-400 text-lg">
                            Sleep Quality
                        </h2>

                        <h1 className="text-5xl font-bold text-green-400 mt-4">
                            Good
                        </h1>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">

                        <h2 className="text-slate-400 text-lg">
                            Heart Rate
                        </h2>

                        <h1 className="text-5xl font-bold text-red-400 mt-4">
                            72
                        </h1>

                    </div>

                </div>

                

                <div className="mt-20 bg-slate-900 border border-slate-800 rounded-3xl p-10">

                    <h2 className="text-4xl font-bold text-cyan-400 mb-10">

                        Risk Analysis

                    </h2>

                    <div className="space-y-10">

                        <div>

                            <div className="flex justify-between">

                                <span className="text-xl">
                                    Diabetes Risk
                                </span>

                                <span className="text-red-400 font-bold">
                                    25%
                                </span>

                            </div>

                            <div className="w-full bg-slate-700 rounded-full h-4 mt-4">

                                <div className="bg-red-400 h-4 rounded-full w-[25%]"></div>

                            </div>

                        </div>

                        <div>

                            <div className="flex justify-between">

                                <span className="text-xl">
                                    Hypertension Risk
                                </span>

                                <span className="text-yellow-400 font-bold">
                                    48%
                                </span>

                            </div>

                            <div className="w-full bg-slate-700 rounded-full h-4 mt-4">

                                <div className="bg-yellow-400 h-4 rounded-full w-[48%]"></div>

                            </div>

                        </div>

                        <div>

                            <div className="flex justify-between">

                                <span className="text-xl">
                                    Stress Risk
                                </span>

                                <span className="text-cyan-400 font-bold">
                                    60%
                                </span>

                            </div>

                            <div className="w-full bg-slate-700 rounded-full h-4 mt-4">

                                <div className="bg-cyan-400 h-4 rounded-full w-[60%]"></div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Github