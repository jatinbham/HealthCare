import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

const HealthHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("https://healthcareb.onrender.com/health-history", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) setHistory(data.reports.reverse());
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchHistory();
    }, []);

    const extractMs = (str) => {
        const match = str.match(/(\d+)ms/);
        return match ? parseInt(match[1]) : 300;
    };

    const chartData = {
        labels: history.map((_, i) => `T-${history.length - i}`),
        datasets: [{
            label: "Reaction Time",
            data: history.map(h => extractMs(h.aiResponse)),
            borderColor: "#06b6d4",
            backgroundColor: "rgba(6, 182, 212, 0.1)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
        }]
    };

    if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-cyan-500 font-mono animate-pulse">LOADING_NEURAL_LOGS...</div>;

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-y-10">
                <header className="flex justify-between items-end border-b border-slate-800 pb-6">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">History</h2>
                    <div className="text-right"><p className="text-[10px] text-slate-500 uppercase font-bold">Total Sessions</p><p className="text-2xl font-mono text-cyan-400">{history.length}</p></div>
                </header>

                {/* Graph Card */}
                <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800 backdrop-blur-sm">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-6 tracking-widest">Cognitive Trend (ms)</p>
                    <div className="h-64"><Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} /></div>
                </div>

                {/* List of Reports */}
                <div className="grid gap-4">
                    {history.slice().reverse().map((report, idx) => (
                        <div key={idx} className="bg-slate-900/20 p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all">
                            <div className="flex justify-between mb-2">
                                <span className="text-[10px] font-mono text-slate-500">{new Date(report.createdAt).toLocaleDateString()}</span>
                                <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest italic">Analysis Complete</span>
                            </div>
                            <p className="text-slate-300 text-sm font-medium mb-3">"{report.symptoms}"</p>
                            <p className="text-xs text-slate-500 leading-relaxed italic border-l-2 border-slate-800 pl-4"> {report.aiResponse} </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HealthHistory;