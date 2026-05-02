import React, { useState } from "react";
import api from "../api"; // Path check kar lena apne hisaab se

const AnalyzeHealth = () => {
    const [symptoms, setSymptoms] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!symptoms.trim()) return alert("Kuch symptoms toh likho!");
        
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const baseUrl = api?.baseURL || "https://healthcareb.onrender.com";

            const res = await fetch(`${baseUrl}/ai-health`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ symptoms })
            });

            const data = await res.json();
            if (data.success) {
                setResult(data.reply);
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("AI busy hai, baad mein try karein.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white p-10">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-cyan-400">AI Health Analysis</h1>
                <textarea 
                    className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl mb-4 h-40 focus:outline-none focus:border-cyan-500"
                    placeholder="Describe your symptoms (e.g., I have a cough and cold since 2 days)..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                />
                <button 
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                    {loading ? "Analyzing..." : "Check Symptoms"}
                </button>

                {result && (
                    <div className="mt-8 p-6 bg-slate-800 rounded-2xl border-l-4 border-cyan-500">
                        <h2 className="text-xl font-bold mb-3">AI Suggestions:</h2>
                        <p className="whitespace-pre-line text-slate-300 leading-relaxed">{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyzeHealth;