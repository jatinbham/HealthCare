import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {

    return (

        <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-950/80 border-b border-slate-800">

            <nav className="max-w-7xl mx-auto px-6 py-4">

                <div className="flex items-center justify-between">

                    <Link to="/" className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/40">

                            <span className="text-black text-2xl font-extrabold">
                                V
                            </span>

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold text-white">
                                VitalAI
                            </h1>

                            <p className="text-xs text-cyan-400">
                                Predictive Healthcare
                            </p>

                        </div>

                    </Link>

                    <ul className="hidden lg:flex items-center gap-10 text-lg">

                        <li>

                            <Link
                                to="/"
                                className="text-slate-300 hover:text-cyan-400 transition duration-300"
                            >
                                Home
                            </Link>

                        </li>

                        <li>

                            <Link
                                to="/About"
                                className="text-slate-300 hover:text-cyan-400 transition duration-300"
                            >
                                About
                            </Link>

                        </li>

                        <li>

                            <Link
                                to="/Github"
                                className="text-slate-300 hover:text-cyan-400 transition duration-300"
                            >
                                Dashboard
                            </Link>

                        </li>

                        <li>

                            <Link
                                to="/Contact"
                                className="text-slate-300 hover:text-cyan-400 transition duration-300"
                            >
                                Contact
                            </Link>

                        </li>

                    </ul>

                    <div className="flex items-center gap-4">

                        <Link
                            to="/login"
                            className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-6 py-3 rounded-2xl font-semibold transition duration-300"
                        >

                            Login

                        </Link>

                        <Link
                            to="/health-analysis"
                            className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-2xl font-semibold transition duration-300 shadow-lg shadow-cyan-500/30"
                        >

                            Get Started

                        </Link>

                    </div>

                </div>

            </nav>

        </header>

    )
}