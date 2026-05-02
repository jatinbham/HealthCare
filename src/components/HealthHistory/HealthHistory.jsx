import React, { useEffect, useState } from "react";
import api from "../../api";

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
                // Sorting reports to show latest first
                const sortedData = (data.reports || data).sort((a, b) => 
                    new Date(b.date) - new Date(a.date)
                );
                setReports(sortedData);

            } catch (err) {
                setError("Unable to sync with health database. Please refresh.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                    <p className="text-slate-400 font-medium tracking-widest text-xs uppercase">Retrieving Vitals...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            Archive
                        </div>
                        <h1 className="text-5xl font-black tracking-tight">Health <span className="text-slate-500">Timeline</span></h1>
                    </div>
                    <p className="text-slate-500 text-sm max-w-[200px] md:text-right">
                        A chronological record of your AI-driven health assessments.
                    </p>
                </div>

                {error ? (
                    <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl text-red-400 text-center">
                        {error}
                    </div>
                ) : reports.length === 0 ? (
                    <div className="bg-slate-900/30 border border-slate-800 p-20 rounded-[3rem] text-center">
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600 text-2xl font-bold">!</div>
                        <p className="text-slate-300 text-xl font-bold">No Records Found</p>
                        <p className="text-slate-500 mt-2">Generate your first report in the Health Form section.</p>
                    </div>
                ) : (
                    <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
                        {reports.map((report, index) => (
                            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                {/* Dot on timeline */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-[#020617] text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2">
                                    <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform" />
                                </div>

                                {/* Content Card */}
                                <div className="w-[calc(100%-4rem)] md:w-[45%] bg-slate-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-[2rem] hover:border-cyan-500/30 transition-all duration-500">
                                    <div className="flex justify-between items-center mb-6">
                                        <time className="text-[10px] font-black uppercase tracking-widest text-cyan-500">
                                            {new Date(report.date || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </time>
                                        <span className="px-3 py-1 rounded-md bg-white/5 text-[10px] font-bold text-slate-400">REPORT #{reports.length - index}</span>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-tighter mb-2">Patient Input</h3>
                                            <p className="text-slate-200 text-sm leading-relaxed italic">
                                                "{report.symptoms || "Regular Checkup"}"
                                            </p>
                                        </div>

                                        <div className="pt-6 border-t border-slate-800/50">
                                            <h3 className="text-xs font-bold text-green-500 uppercase tracking-tighter mb-3 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                AI Diagnostic Response
                                            </h3>
                                            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                                                {report.aiResponse || report.reply}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}