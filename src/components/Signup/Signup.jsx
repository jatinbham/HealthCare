import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BASE_URL from '../../api'

export default function Signup() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    console.log("🔥 Submit function triggered")
    const handleSubmit = async (e) => {

        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match")
            return
        }

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
            })

            const data = await response.json()
            console.log("Response:", data)

            if (response.ok) {
                alert("Account Created Successfully 🚀")
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
            } else {
                alert(data.error || "Signup failed")
            }

        } catch (error) {
            console.log("Error:", error)
            alert("Something went wrong")
        }

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 text-white flex items-center justify-center px-6">

            <div className="grid lg:grid-cols-2 gap-14 items-center max-w-7xl w-full">

                <div>

                    <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                        Join The Future
                        <span className="block text-cyan-400">
                            Of Healthcare
                        </span>
                    </h1>

                    <p className="mt-8 text-lg text-slate-300 leading-8">
                        Create your account and start tracking your health
                        with AI-powered monitoring and predictive analysis.
                    </p>

                </div>

                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-10 shadow-2xl">

                    <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400"
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400"
                        />

                        <button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-2xl font-semibold text-lg text-black"
                        >
                            Create Account
                        </button>

                    </form>

                    <p className="text-center text-slate-400 mt-8">
                        Already have an account?
                        <Link to="/login" className="text-cyan-400 ml-2">
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    )
}