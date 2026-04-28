import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {

    return (

        <footer className="bg-slate-950 border-t border-slate-800 text-white">

            <div className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid md:grid-cols-4 gap-12">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center">

                                <span className="text-black text-2xl font-extrabold">
                                    V
                                </span>

                            </div>

                            <div>

                                <h1 className="text-2xl font-bold">
                                    VitalAI
                                </h1>

                                <p className="text-cyan-400 text-sm">
                                    AI Healthcare Platform
                                </p>

                            </div>

                        </div>

                        <p className="text-slate-400 mt-6 leading-7">

                            AI-powered predictive healthcare platform helping people
                            detect health risks early and improve lifestyle.

                        </p>

                    </div>

                    <div>

                        <h2 className="text-xl font-bold mb-6 text-cyan-400">
                            Quick Links
                        </h2>

                        <ul className="space-y-4 text-slate-300">

                            <li>
                                <Link to="/" className="hover:text-cyan-400 transition duration-300">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/about" className="hover:text-cyan-400 transition duration-300">
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link to="/github" className="hover:text-cyan-400 transition duration-300">
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link to="/contact" className="hover:text-cyan-400 transition duration-300">
                                    Contact
                                </Link>
                            </li>

                        </ul>

                    </div>

                    <div>

                        <h2 className="text-xl font-bold mb-6 text-cyan-400">
                            Features
                        </h2>

                        <ul className="space-y-4 text-slate-300">

                            <li>AI Predictions</li>
                            <li>Sleep Tracking</li>
                            <li>Heart Monitoring</li>
                            <li>Stress Analysis</li>

                        </ul>

                    </div>

                    <div>

                        <h2 className="text-xl font-bold mb-6 text-cyan-400">
                            Contact
                        </h2>

                        <ul className="space-y-4 text-slate-300">

                            <li>vitalai@gmail.com</li>
                            <li>+91 9876543210</li>
                            <li>India</li>

                        </ul>

                    </div>

                </div>

                <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center">

                    <p className="text-slate-500">
                        © 2026 VitalAI. All Rights Reserved.
                    </p>

                    <div className="flex gap-6 mt-4 md:mt-0">

                        <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-500 hover:text-black flex items-center justify-center cursor-pointer transition duration-300">
                            F
                        </div>

                        <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-500 hover:text-black flex items-center justify-center cursor-pointer transition duration-300">
                            X
                        </div>

                        <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-500 hover:text-black flex items-center justify-center cursor-pointer transition duration-300">
                            G
                        </div>

                    </div>

                </div>

            </div>

        </footer>

    )
}
