import React, { useEffect, useState } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts'
import BASE_URL from "../../api"

export default function Dashboard() {

    const [profile, setProfile] = useState(null)

    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))

    const logout = () => {
        localStorage.clear()
        window.location.href = "/login"
    }

    const healthData = [
        { day: "Mon", score: 72 },
        { day: "Tue", score: 78 },
        { day: "Wed", score: 80 },
        { day: "Thu", score: 85 },
        { day: "Fri", score: 92 }
    ]

    const getAIResponse = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/ai-health`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        symptoms: "headache, stress, low sleep"
                    })
                }
            )

            const data = await response.json()

            alert(data.reply)

        } catch (error) {
            alert("AI request failed")
        }
    }

    // FETCH REAL PROFILE DATA
    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const res = await fetch(
                    `${BASE_URL}/health-profile`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                )

                const data = await res.json()

                setProfile(data.profile)

            } catch (error) {
                console.log(error)
            }
        }

        fetchProfile()

    }, [])

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 text-white p-8">

            <div className="max-w-7xl mx-auto">

                <div className="flex items-center justify-between mb-12">

                    <div>

                        <h1 className="text-5xl font-bold text-cyan-400">
                            Welcome, {user?.name} 🚀
                        </h1>

                        <p className="text-slate-300 mt-3 text-lg">
                            AI Powered Healthcare Dashboard
                        </p>

                    </div>

                    <button
                        onClick={logout}
                        className="bg-red-500 px-6 py-3 rounded-2xl"
                    >
                        Logout
                    </button>

                </div>

                {/* REAL DATA SECTION */}
                <div className="bg-slate-800 p-6 rounded-2xl mb-10">

                    <h2 className="text-2xl text-cyan-400 mb-4">
                        Your Health Profile (Live DB Data)
                    </h2>

                    {profile ? (
                        <pre className="text-slate-300">
                            {JSON.stringify(profile, null, 2)}
                        </pre>
                    ) : (
                        <p>Loading profile...</p>
                    )}

                </div>

                {/* GRAPH */}
                <div className="bg-slate-800 p-8 rounded-3xl">

                    <h2 className="text-3xl text-cyan-400 mb-6">
                        Weekly Progress
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>

                        <LineChart data={healthData}>

                            <CartesianGrid />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#22d3ee"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

                <button
                    onClick={getAIResponse}
                    className="mt-10 bg-cyan-500 px-6 py-3 rounded-2xl text-black font-bold"
                >
                    Get AI Suggestion
                </button>

            </div>

        </div>
    )
}