import React, { useEffect, useState } from "react";
import api from "../../api";   // Better to use improved api.js

export default function HealthHistory() {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");

                const res = await fetch(`${api.baseURL}/health-history`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!res.ok) throw new Error("Failed to fetch history");

                const data = await res.json();
                setReports(data.reports || data);   // agar structure different ho to handle kare

            } catch (err) {
                console.error(err);
                setError("Unable to load health history. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <p className="text-xl">Loading your health history...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 text-white p-10">
                <p className="text-red-400 text-center">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-cyan-400 mb-10">
                    Health History
                </h1>

                {reports.length === 0 ? (
                    <div className="bg-slate-900 p-12 rounded-3xl text-center">
                        <p className="text-slate-400 text-xl">No health reports found yet.</p>
                        <p className="text-slate-500 mt-3">Complete your first health analysis to see history here.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reports.map((report, index) => (
                            <div 
                                key={index} 
                                className="bg-slate-900 border border-slate-700 p-8 rounded-3xl hover:border-cyan-500/30 transition"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <p className="text-sm text-slate-400">
                                        {new Date(report.date || Date.now()).toLocaleDateString('en-IN')}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-cyan-400 font-semibold mb-2">Symptoms / Input:</p>
                                    <p className="text-slate-200 leading-relaxed">{report.symptoms}</p>
                                </div>

                                <div className="mt-8">
                                    <p className="text-green-400 font-semibold mb-2">AI Analysis:</p>
                                    <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                        {report.aiResponse || report.reply}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}