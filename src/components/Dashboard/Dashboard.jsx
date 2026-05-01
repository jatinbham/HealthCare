import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts'

export default function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"))

    const logout = () => {

        localStorage.clear()

        window.location.href = "/login"

    }

    const healthData = [

        {
            day: "Mon",
            score: 72
        },

        {
            day: "Tue",
            score: 78
        },

        {
            day: "Wed",
            score: 80
        },

        {
            day: "Thu",
            score: 85
        },

        {
            day: "Fri",
            score: 92
        }

    ]



    const getAIResponse = async () => {

        try {

            const response = await fetch(
                "https://healthcare-backend-1-5jqb.onrender.com/ai-health",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        symptoms: "headache, stress, low sleep"
                    })
                }
            )

            const data = await response.json()

            alert(data.reply)

            console.log(data)

        } catch (error) {

            console.log(error)

            alert("AI request failed")

        }

    }

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
                        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-semibold"
                    >
                        Logout
                    </button>

                </div>



                <div className="grid md:grid-cols-4 gap-8">

                    <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8">

                        <h2 className="text-slate-400 text-lg">
                            Health Score
                        </h2>

                        <p className="text-5xl font-bold text-green-400 mt-4">
                            92%
                        </p>

                    </div>



                    <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8">

                        <h2 className="text-slate-400 text-lg">
                            Stress Level
                        </h2>

                        <p className="text-5xl font-bold text-yellow-400 mt-4">
                            Low
                        </p>

                    </div>



                    <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8">

                        <h2 className="text-slate-400 text-lg">
                            BMI
                        </h2>

                        <p className="text-5xl font-bold text-cyan-400 mt-4">
                            22.5
                        </p>

                    </div>



                    <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8">

                        <h2 className="text-slate-400 text-lg">
                            Sleep
                        </h2>

                        <p className="text-5xl font-bold text-pink-400 mt-4">
                            7.5h
                        </p>

                    </div>

                </div>



                <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 mt-12">

                    <div className="flex items-center justify-between mb-8">

                        <h2 className="text-3xl font-bold text-cyan-400">
                            Weekly Health Progress
                        </h2>

                        <button
                            onClick={getAIResponse}
                            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-2xl font-semibold text-black"
                        >
                            Get AI Suggestion
                        </button>

                    </div>

                    <div className="w-full h-[400px]">

                        <ResponsiveContainer width="100%" height="100%">

                            <LineChart data={healthData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="day" />

                                <YAxis />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#22d3ee"
                                    strokeWidth={4}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                </div>



                <div className="grid lg:grid-cols-2 gap-10 mt-12">

                    <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8">

                        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
                            AI Health Insights
                        </h2>

                        <div className="space-y-5">

                            <div className="bg-slate-900 rounded-2xl p-5">

                                <h3 className="text-xl font-semibold text-green-400">
                                    Great Physical Health
                                </h3>

                                <p className="text-slate-300 mt-2">
                                    Your activity and BMI are in healthy range.
                                </p>

                            </div>

                            <div className="bg-slate-900 rounded-2xl p-5">

                                <h3 className="text-xl font-semibold text-yellow-400">
                                    Mild Stress Detected
                                </h3>

                                <p className="text-slate-300 mt-2">
                                    Try meditation and proper sleep.
                                </p>

                            </div>

                        </div>

                    </div>



                    <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8">

                        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
                            Daily Activity
                        </h2>

                        <div className="space-y-5">

                            <div className="bg-slate-900 rounded-2xl p-5 flex justify-between">

                                <span>Steps Walked</span>

                                <span className="text-cyan-400 font-bold">
                                    8,240
                                </span>

                            </div>

                            <div className="bg-slate-900 rounded-2xl p-5 flex justify-between">

                                <span>Water Intake</span>

                                <span className="text-cyan-400 font-bold">
                                    2.5L
                                </span>

                            </div>

                            <div className="bg-slate-900 rounded-2xl p-5 flex justify-between">

                                <span>Calories Burned</span>

                                <span className="text-cyan-400 font-bold">
                                    520
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}