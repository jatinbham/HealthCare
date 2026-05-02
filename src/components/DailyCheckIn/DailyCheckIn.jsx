import React, { useState } from "react";

const DailyCheckIn = ({ onComplete }) => {
    const [scores, setScores] = useState({ energy: 5, focus: 5, mood: 5 });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://healthcareb.onrender.com/daily-checkin", {
                method: "POST",
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(scores)
            });
            if (res.ok) {
                setSubmitted(true);
                setTimeout(() => onComplete(), 2000);
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (submitted) return (
        <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-3xl text-center animate-bounce">
            <p className="text-green-400 font-bold">Great! Data logged for today. 🚀</p>
        </div>
    );

    return (
        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 backdrop-blur-xl space-y-8">
            <div className="text-center">
                <h3 className="text-xl font-black uppercase tracking-tighter italic">Daily Bio-Sync</h3>
                <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Calibrate your vitals</p>
            </div>

            {Object.keys(scores).map((type) => (
                <div key={type} className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">{type}</span>
                        <span className="text-cyan-400 font-mono text-lg">{scores[type]}/10</span>
                    </div>
                    <input 
                        type="range" min="1" max="10" 
                        value={scores[type]} 
                        onChange={(e) => setScores({...scores, [type]: parseInt(e.target.value)})}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                </div>
            ))}

            <button 
                onClick={handleSubmit}
                className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-cyan-400 transition-all active:scale-95"
            >
                Log Daily Stats
            </button>
        </div>
    );
};

export default DailyCheckIn;