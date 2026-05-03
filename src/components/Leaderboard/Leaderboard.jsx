import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown, Target, Loader2 } from 'lucide-react';

const Leaderboard = () => {
    // State to store real scores from MongoDB
    const [rankings, setRankings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Replace with your actual backend URL
    const BASE_URL = "https://healthcareb.onrender.com"; 

    // Function to fetch data from your backend API
    const fetchLeaderboard = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/leaderboard`);
            const data = await response.json();
            
            if (data.success) {
                // Backend provides sorted scores (lowest ms first)
                setRankings(data.scores);
            }
        } catch (error) {
            console.error("Neural Network Fetch Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    // Helper function to assign ranks based on ms (Optional styling)
    const getNeuralRank = (score) => {
        if (score < 200) return 'Neural God';
        if (score < 250) return 'Elite';
        if (score < 300) return 'Pro';
        return 'Soldier';
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 font-mono">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-5xl font-black italic uppercase text-white tracking-tighter">
                        Neural <span className="text-cyan-500">Rankings</span>
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">
                        Global Synapse Competition
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-md">
                    <Trophy className="text-yellow-500 animate-bounce" size={24} />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="space-y-4">
                {isLoading ? (
                    /* Loading State */
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="text-cyan-500 animate-spin" size={40} />
                        <p className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.5em]">Syncing with Grid...</p>
                    </div>
                ) : rankings.length > 0 ? (
                    /* Real Data Rendering */
                    rankings.map((player, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={player._id || index}
                            className="group relative bg-slate-900/40 border border-white/5 p-6 rounded-[2rem] flex items-center justify-between hover:border-cyan-500/30 transition-all hover:bg-slate-900/60 overflow-hidden"
                        >
                            <div className="flex items-center gap-6">
                                <span className="text-2xl font-black italic text-slate-700 group-hover:text-cyan-500 transition-colors w-8">
                                    #{index + 1}
                                </span>
                                <div>
                                    <h4 className="text-xl font-bold text-white tracking-tight uppercase">
                                        {player.alias}
                                    </h4>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                                        {getNeuralRank(player.score)} • {player.location || 'Unknown Sector'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 relative z-10">
                                <div className="text-right">
                                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Latency</p>
                                    <p className="text-2xl font-black text-cyan-400 italic">{player.score}ms</p>
                                </div>
                                <div className="flex items-center justify-center w-6">
                                    {index === 0 && <Crown className="text-yellow-500" size={24} />}
                                    {index === 1 && <Medal className="text-slate-300" size={22} />}
                                    {index === 2 && <Medal className="text-amber-600" size={22} />}
                                </div>
                            </div>
                            
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))
                ) : (
                    /* Empty State */
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]">
                        <p className="text-slate-600 uppercase tracking-[0.3em] text-xs">The grid is empty. No data found.</p>
                    </div>
                )}
            </div>
            
            {/* Footer Prompt */}
            <div className="mt-12 p-8 border border-dashed border-white/10 rounded-[3rem] text-center">
                <Target size={32} className="mx-auto text-slate-700 mb-4" />
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                    Test your reflexes in the <span className="text-white">Reflex Core</span> <br /> to claim your spot in the global net.
                </p>
            </div>
        </div>
    );
};

export default Leaderboard;