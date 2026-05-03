import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, ChevronRight } from 'lucide-react';

const AliasModal = ({ isOpen, score, onSave }) => {
    const [alias, setAlias] = useState('');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-[2.5rem] p-8 relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)]"
                >
                    {/* Background Glitch Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" />
                    
                    <div className="flex items-center gap-3 mb-6">
                        <Terminal className="text-cyan-500" size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Identity Protocol</span>
                    </div>

                    <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-2">
                        Register <span className="text-cyan-500">Alias</span>
                    </h3>
                    <p className="text-slate-400 text-xs font-bold leading-relaxed mb-8">
                        Your latency of <span className="text-white">{score}ms</span> has been detected. 
                        Enter your cyber-handle to sync with the global net.
                    </p>

                    <div className="relative mb-8">
                        <input 
                            type="text" 
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            placeholder="e.g. CYBER_GHOST_99"
                            className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-cyan-400 font-bold placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all uppercase tracking-widest"
                        />
                    </div>

                    <button 
                        onClick={() => onSave(alias)}
                        disabled={!alias.trim()}
                        className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        Confirm Link <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Biometric Data Encrypted</span>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AliasModal;