import React, { useState, useEffect } from "react";
import ReflexTest from "../ReflexTest/ReflexTest";

const AnalyzeHealth = () => {
    const [symptoms, setSymptoms] = useState("");
    const [reactionTime, setReactionTime] = useState(null);
    const [aqi, setAqi] = useState(null);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [vitals, setVitals] = useState({ energy: 5, focus: 5, mood: 5 });

    // Location-based AQI Fetch
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch("https://healthcareb.onrender.com/get-aqi", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ lat: latitude, lon: longitude })
                    });
                    const data = await res.json();
                    if (data.success) setAqi(data.aqi);
                } catch (err) { console.error("AQI Error:", err); }
            });
        }
    }, []);

    const handleAnalyze = async () => {
        if (!symptoms.trim()) return alert("Please describe your condition.");
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://healthcareb.onrender.com/ai-health", {
                method: "POST",
                headers: { 
                    "Authorization": `Bearer ${token}`, 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ symptoms, reactionTime, aqi, vitals })
            });
            const data = await res.json();
            if (data.success) {
                setResult(data.reply);
                setStep(3);

                localStorage.setItem("lastReflex", reactionTime); // Reaction time save karo
    localStorage.setItem("lastAqi", aqi || "02");
            }
        } catch (err) {
            alert("Neural Link Failure. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-10 font-sans selection:bg-cyan-500/30">
            <div className="max-w-2xl mx-auto">
                
                {/* PHASE 1: BIO-CALIBRATION & INPUT */}
                {step === 1 && (
                    <div className="space-y-8 animate-in fade-in duration-700">
                        <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800 backdrop-blur-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-8 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                                System Calibration
                            </h3>
                            <div className="space-y-8">
                                {['energy', 'focus', 'mood'].map((type) => (
                                    <div key={type} className="space-y-3">
                                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                                            <span>{type} level</span>
                                            <span className="text-cyan-400 font-mono">{vitals[type]*10}%</span>
                                        </div>
                                        <input type="range" min="1" max="10" value={vitals[type]} 
                                            onChange={(e) => setVitals({...vitals, [type]: parseInt(e.target.value)})}
                                            className="w-full h-1 bg-slate-800 appearance-none accent-cyan-500 cursor-pointer" 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Describe Anomaly</h2>
                            <textarea 
                                className="w-full bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] h-48 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-800 text-lg"
                                placeholder="What are your current symptoms?"
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                            />
                        </div>

                        <button onClick={() => setStep(2)} className="w-full bg-white text-black font-black py-6 rounded-3xl uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-xl">
                            Proceed to Neuro-Test →
                        </button>
                    </div>
                )}

                {/* PHASE 2: REFLEX TEST */}
                {step === 2 && (
                    <div className="space-y-10 animate-in slide-in-from-right duration-500 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Neuro-Reflex</h2>
                            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">Measuring Neural Latency</p>
                        </div>
                        <ReflexTest onComplete={(time) => setReactionTime(time)} />
                        {reactionTime && (
                            <button onClick={handleAnalyze} disabled={loading}
                                className="w-full bg-cyan-500 text-black py-6 rounded-3xl font-black uppercase tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                                {loading ? "Syncing with AI..." : "Generate Neural Report"}
                            </button>
                        )}
                    </div>
                )}

                {/* PHASE 3: RESULTS & DIGITAL TWIN */}
                {step === 3 && (
                    <div className="space-y-8 animate-in zoom-in-95 duration-700">
                        
                        {/* DIGITAL TWIN VISUALIZER */}
                        <div className="bg-slate-900/50 rounded-[3rem] border border-slate-800 p-10 flex flex-col items-center">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-8">Digital Twin Live-Map</h4>
                            
                            <svg viewBox="0 0 200 500" className="h-72 w-auto filter drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                <circle cx="100" cy="60" r="25" className={`${reactionTime > 400 ? 'fill-red-500 animate-pulse' : 'fill-cyan-500/20'} transition-all`} />
                                <path d="M70 120 Q100 100 130 120 L140 220 Q100 240 60 220 Z" className={`${aqi > 3 ? 'fill-orange-500/40 animate-bounce' : 'fill-cyan-500/10'} transition-all`} />
                                <path d="M100 35 L130 80 L160 120 L150 250 L130 450 L110 450 L100 280 L90 450 L70 450 L50 250 L40 120 L70 80 L100 35" fill="none" stroke="#1e293b" strokeWidth="2" />
                            </svg>

                            <div className="grid grid-cols-3 gap-6 w-full mt-10 border-t border-slate-800 pt-8">
                                <div className="text-center">
                                    <p className="text-[8px] text-slate-500 uppercase font-black">Reflex</p>
                                    <p className="text-lg font-mono text-cyan-400">{reactionTime}ms</p>
                                </div>
                                <div className="text-center border-x border-slate-800">
                                    <p className="text-[8px] text-slate-500 uppercase font-black">AQI</p>
                                    <p className={`text-lg font-black ${aqi > 3 ? 'text-red-500' : 'text-green-500'}`}>{aqi || 'N/A'}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[8px] text-slate-500 uppercase font-black">Mood</p>
                                    <p className="text-lg font-mono text-yellow-500">{vitals.mood}/10</p>
                                </div>
                            </div>
                        </div>

                        {/* AI ANALYSIS */}
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-cyan-500/20">
                            <h3 className="text-cyan-400 font-black text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></span> Analysis Report
                            </h3>
                            <div className="text-slate-300 leading-relaxed text-lg italic italic">"{result}"</div>
                        </div>

                        {/* ACTION PROTOCOLS */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-center text-slate-600 mb-4 italic">Action Protocols Required</p>
                            
                            {reactionTime > 400 && (
                                <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-bold text-red-400 uppercase tracking-widest italic tracking-tighter">Neural Recovery</p>
                                        <p className="text-[10px] text-slate-500">Rest for 30 mins, avoid screens.</p>
                                    </div>
                                    <div className="w-4 h-4 border border-slate-800 rounded-md"></div>
                                </div>
                            )}

                            <div className="bg-cyan-500/5 border border-cyan-500/20 p-5 rounded-2xl flex justify-between items-center">
                                <div>
                                    <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest italic tracking-tighter">Hydration Sync</p>
                                    <p className="text-[10px] text-slate-500">Drink 500ml water to clear toxins.</p>
                                </div>
                                <div className="w-4 h-4 border border-slate-800 rounded-md"></div>
                            </div>
                        </div>

                        <button onClick={() => {setStep(1); setResult("");}} className="w-full py-4 text-slate-600 hover:text-white transition uppercase font-bold text-[10px] tracking-[0.8em]">
                            [ Clear Session Data ]
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyzeHealth;