import React, { useEffect, useState } from "react"
import BASE_URL from "../../api"

export default function HealthHistory() {

    const [reports, setReports] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const token = localStorage.getItem("token")

            const res = await fetch(`${BASE_URL}/health-history`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()
            setReports(data.reports)

        }

        fetchData()

    }, [])

    return (

        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-4xl text-cyan-400 font-bold mb-10">
                Health History
            </h1>

            {reports.map((r, i) => (

                <div key={i} className="bg-slate-900 p-6 rounded-2xl mb-6">

                    <p className="text-cyan-400 font-bold">Symptoms:</p>
                    <p>{r.symptoms}</p>

                    <p className="text-green-400 font-bold mt-4">AI Response:</p>
                    <p className="whitespace-pre-line">{r.aiResponse}</p>

                </div>

            ))}

        </div>

    )
}