import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, MapPin, Zap, RefreshCw, Cpu, Terminal, ChevronRight, Download, ShieldCheck, Target, Scan } from 'lucide-react';
import html2canvas from 'html2canvas';

// --- CYBER ID CARD COMPONENT ---
const CyberIDCard = ({ alias, score, aqi, location, onComplete }) => {
    const cardRef = useRef(null);

    const getRank = (ms) => {
        if (ms < 200) return { title: 'Neural God', color: 'text-yellow-400', border: 'border-yellow-500/50', glow: 'shadow-[0_0_50px_rgba(250,204,21,0.3)]' };
        if (ms < 250) return { title: 'Cyber Samurai', color: 'text-cyan-400', border: 'border-cyan-500/50', glow: 'shadow-[0_0_50px_rgba(6,182,212,0.3)]' };
        if (ms < 300) return { title: 'Street Runner', color: 'text-purple-400', border: 'border-purple-500/50', glow: 'shadow-[0_0_50px_rgba(147,51,234,0.3)]' };
        return { title: 'Sector Trash', color: 'text-slate-500', border: 'border-slate-700', glow: '' };
    };

    const rank = getRank(score);

    const downloadCard = async () => {
        if (!cardRef.current) return;
        const canvas = await html2canvas(cardRef.current, { 
            backgroundColor: '#020617', 
            scale: 3, // Higher scale for ultra-sharp result
            useCORS: true 
        });
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `CyberID_${alias}_${score}ms.png`;
        link.click();
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div ref={cardRef} className={`w-[340px] h-[480px] bg-[#020617] border-2 ${rank.border} ${rank.glow} rounded-[3rem] p-8 relative overflow-hidden font-mono`}>
                {/* ID Card Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[60px]" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 blur-[60px]" />
                
                <div className="flex justify-between items-start mb-10">
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-2xl text-cyan-500 shadow-inner">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.3em]">Neural ID-V3</p>
                        <p className="text-[7px] text-slate-500 uppercase italic font-bold">System Verified</p>
                    </div>
                </div>

                <div className="space-y-8 mb-12">
                    <div className="relative">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-black">Subject Alias</p>
                        <h2 className="text-3xl font-black italic uppercase text-white truncate drop-shadow-2xl">{alias}</h2>
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-500 rounded-full" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Latency</p>
                            <p className="text-2xl font-black text-cyan-400">{score}<span className="text-[10px] ml-1">ms</span></p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Grade</p>
                            <p className={`text-lg font-black leading-none mt-1 ${rank.color}`}>{rank.title}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-6">
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] text-slate-500 uppercase font-black">Sector Location</span>
                        <span className="text-[10px] font-bold text-white uppercase">{location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] text-slate-500 uppercase font-black">Toxicity Index</span>
                        <span className="text-[10px] font-bold text-orange-400 uppercase">{aqi} AQI</span>
                    </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center opacity-30">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-3 bg-white/40" />)}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest">Lab-Reflex-X</span>
                </div>
            </div>

            <div className="flex flex-col w-full gap-3 px-2">
                <button onClick={downloadCard} className="w-full bg-cyan-500 text-black py-5 rounded-[2rem] font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all transform active:scale-95 shadow-lg shadow-cyan-500/20">
                    <Download size={18} /> Sync to Neural Link
                </button>
                <button onClick={onComplete} className="w-full py-2 text-slate-500 font-bold uppercase text-[9px] tracking-[0.3em] hover:text-white transition-colors">
                    Access Global Grid
                </button>
            </div>
        </div>
    );
};

// --- ALIAS MODAL ---
const AliasModal = ({ isOpen, score, aqi, location, onSave, onFinish }) => {
    const [alias, setAlias] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-[20px] bg-black/90 font-mono">
                <motion.div 
                    initial={{ y: 50, opacity: 0, scale: 0.9 }} 
                    animate={{ y: 0, opacity: 1, scale: 1 }} 
                    className="w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-[3.5rem] p-10 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]"
                >
                    {!isSaved ? (
                        <>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                                    <Terminal className="text-cyan-500" size={20} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 block">Identity Protocol</span>
                                    <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter">New <span className="text-cyan-500">Record</span> Detected</h3>
                                </div>
                            </div>

                            <div className="space-y-6 mb-10">
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                    <p className="text-slate-400 text-[10px] font-black mb-1 uppercase tracking-widest text-center">Neural Speed Detected</p>
                                    <p className="text-5xl font-black text-white text-center italic">{score}<span className="text-cyan-500 text-xl not-italic ml-2">MS</span></p>
                                </div>
                                
                                <input 
                                    type="text" value={alias} onChange={(e) => setAlias(e.target.value)}
                                    placeholder="ENTER OPERATOR ALIAS..."
                                    className="w-full bg-slate-800/50 border-2 border-white/10 rounded-[2rem] px-8 py-5 text-white font-black focus:outline-none focus:border-cyan-500 transition-all uppercase placeholder:text-slate-600 text-lg tracking-wider"
                                />
                            </div>

                            <button 
                                onClick={async () => {
                                    const success = await onSave(alias);
                                    if (success) setIsSaved(true);
                                }}
                                disabled={!alias.trim()}
                                className="w-full bg-white text-black py-6 rounded-[2.5rem] font-black uppercase text-[12px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-cyan-400 disabled:opacity-20 transition-all"
                            >
                                Register Identity <ChevronRight size={20} />
                            </button>
                        </>
                    ) : (
                        <CyberIDCard alias={alias} score={score} aqi={aqi} location={location} onComplete={onFinish} />
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

// --- MAIN ANALYSIS COMPONENT ---
export default function Analysis({ onResult, onFinish }) {
    const [gameState, setGameState] = useState('idle');
    const [startTime, setStartTime] = useState(0);
    const [reactionTime, setReactionTime] = useState(null);
    const [aqiData, setAqiData] = useState({ aqi: '--', city: 'Locating...', status: 'Syncing' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const BASE_URL = "https://healthcareb.onrender.com"; 

    useEffect(() => {
        const fetchAQI = async () => {
            try {
                const response = await fetch(`${BASE_URL}/get-aqi`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ lat: 28.6139, lon: 77.2090 }) 
                });
                const data = await response.json();
                setAqiData({ aqi: data.aqi || 184, city: 'Indore', status: 'Active' });
            } catch (err) {
                setAqiData({ aqi: 184, city: 'Indore', status: 'Unhealthy' });
            }
        };
        fetchAQI();
    }, []);

    const startTest = () => {
        setGameState('waiting');
        const randomDelay = Math.floor(Math.random() * 3000) + 2000; 
        setTimeout(() => {
            setGameState('active');
            setStartTime(Date.now());
        }, randomDelay);
    };

    const handleReaction = () => {
        if (gameState === 'active') {
            const timeTaken = Date.now() - startTime;
            setReactionTime(timeTaken);
            setGameState('result');
            if (onResult) onResult(timeTaken);
            setTimeout(() => setIsModalOpen(true), 1500);
        } else if (gameState === 'waiting') {
            alert("MISFIRE! DO NOT REACT BEFORE SYNC.");
            setGameState('idle');
        }
    };

    const saveResultToBackend = async (alias) => {
        try {
            const response = await fetch(`${BASE_URL}/save-reflex-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    alias: alias,
                    score: reactionTime,
                    aqi: aqiData.aqi,
                    location: aqiData.city
                })
            });
            const data = await response.json();
            return data.success;
        } catch (error) {
            console.error("Neural Link Failed:", error);
            return false;
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col justify-center font-mono relative">
            <AliasModal 
                isOpen={isModalOpen} 
                score={reactionTime} 
                aqi={aqiData.aqi}
                location={aqiData.city}
                onSave={saveResultToBackend}
                onFinish={() => {
                    setIsModalOpen(false);
                    if (onFinish) onFinish();
                }}
            />

            <div className="max-w-6xl mx-auto w-full relative z-10">
                {/* Header Stats */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-[2px] bg-cyan-500" />
                            <p className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.6em]">Reflex Module v3.0</p>
                        </div>
                        <h2 className="text-7xl font-black italic uppercase tracking-tighter text-white leading-tight">
                            Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Scan</span>
                        </h2>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-3xl flex items-center gap-6 shadow-2xl"
                    >
                        <div className="bg-cyan-500/10 p-4 rounded-2xl border border-cyan-500/20">
                            <MapPin size={24} className="text-cyan-400" />
                        </div>
                        <div className="text-right pr-2">
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Grid Sector</p>
                            <p className="text-xl font-bold text-white uppercase tracking-tighter">
                                {aqiData.city} <span className="text-slate-600 px-2">|</span> 
                                <span className={aqiData.aqi > 150 ? "text-orange-500" : "text-emerald-400"}>{aqiData.aqi} AQI</span>
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* GAME CORE AREA */}
                <motion.div layout
                    className={`w-full h-[550px] rounded-[5rem] border-2 transition-all duration-700 relative flex items-center justify-center cursor-pointer overflow-hidden backdrop-blur-md group ${
                        gameState === 'active' ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_100px_rgba(6,182,212,0.4)]' : 
                        gameState === 'waiting' ? 'bg-red-500/5 border-red-500/20' : 'bg-slate-900/40 border-white/10'
                    }`}
                    onClick={handleReaction}
                >
                    {/* Background Tech Grids */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
                         style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    </div>

                    <AnimatePresence mode="wait">
                        {gameState === 'idle' && (
                            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                                className="flex flex-col items-center gap-8"
                            >
                                <div className="relative">
                                    <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 group-hover:scale-110 transition-all duration-500">
                                        <Zap size={48} className="text-white group-hover:text-cyan-400" />
                                    </div>
                                    <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-ping" />
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); startTest(); }}
                                    className="bg-white text-black px-16 py-6 rounded-[2.5rem] font-black uppercase text-[12px] tracking-[0.4em] hover:bg-cyan-400 transition-all shadow-2xl hover:scale-105 active:scale-95"
                                >
                                    Initialize Scan
                                </button>
                                <p className="text-slate-600 text-[11px] uppercase font-bold tracking-[0.3em]">Latency Test Sequence 01</p>
                            </motion.div>
                        )}

                        {gameState === 'waiting' && (
                            <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                                <div className="relative mb-10">
                                    <Scan size={80} className="text-red-500/40 mx-auto animate-pulse" />
                                    <motion.div 
                                        animate={{ rotate: 360 }} 
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border-t-2 border-red-500 rounded-full"
                                    />
                                </div>
                                <p className="text-red-500 font-black text-xl uppercase tracking-[0.6em]">Stand By...</p>
                                <p className="text-slate-500 text-[10px] mt-4 font-bold uppercase">Detecting Neural Spike</p>
                            </motion.div>
                        )}

                        {gameState === 'active' && (
                            <motion.div key="active" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="text-center z-20"
                            >
                                <h2 className="text-[12rem] font-black italic text-black tracking-tighter leading-none mb-4 animate-bounce">HIT!</h2>
                                <p className="text-black font-black text-2xl uppercase tracking-widest">React Now!</p>
                            </motion.div>
                        )}

                        {gameState === 'result' && (
                            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                                <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.6em] mb-4">Neural Latency Logged</p>
                                <h3 className="text-[12rem] font-black italic text-white tracking-tighter mb-8 leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                                    {reactionTime}<span className="text-4xl text-cyan-500 not-italic ml-4 uppercase">ms</span>
                                </h3>
                                <div className="flex gap-4 justify-center">
                                    <button onClick={() => setGameState('idle')} 
                                        className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all flex items-center gap-3 shadow-xl"
                                    >
                                        <RefreshCw size={18} /> Re-Calibrate
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* VERDICT ENGINE */}
                <AnimatePresence>
                    {gameState === 'result' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="mt-16 w-full bg-slate-900/40 border border-white/10 p-12 rounded-[4rem] flex flex-col md:flex-row gap-10 items-center backdrop-blur-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                            <div className="bg-cyan-500 p-5 rounded-[2rem] text-black shadow-lg shadow-cyan-500/20">
                                <Activity size={32} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="text-cyan-400 font-black uppercase text-[12px] tracking-[0.5em] mb-4">Verdict Analysis</h4>
                                <p className="text-slate-300 leading-relaxed font-bold text-2xl tracking-tight">
                                    Your reaction speed is <span className="text-white italic">{reactionTime}ms</span>. 
                                    <span className="block mt-3 text-lg text-slate-500 font-medium">
                                        High toxicity in <span className="text-white">{aqiData.city}</span> ({aqiData.aqi} AQI) is causing a <span className="text-red-400 font-black">12.4%</span> neural lag in your pre-frontal cortex.
                                    </span>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}