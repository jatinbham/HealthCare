import React from 'react';

export default function About() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/5 blur-[150px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
            
            <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    {/* Left Column: Our Story */}
                    <div className="lg:sticky lg:top-24">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                            VitalAI Mission
                        </div>
                        
                        <h1 className="text-6xl md:text-7xl font-black italic leading-[0.9] tracking-tighter uppercase mb-8">
                            Tech for the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Common Man
                            </span>
                        </h1>

                        <p className="text-slate-400 text-xl leading-relaxed max-w-xl font-medium">
                            VitalAI koi complicated medical app nahi hai. Ye ek simple tool hai jo aapko batata hai ki aapka dimaag kitna "active" hai.
                        </p>

                        <p className="mt-6 text-slate-500 text-lg leading-relaxed max-w-xl">
                            Humne tech ko itna aasaan bana diya hai ki koi bhi apne reflexes aur sheher ke pollution (AQI) ka asar check kar sake. No confusing reports, just pure facts.
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 mt-12">
                            <div className="bg-[#0a0a0a] p-8 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-all">
                                <h2 className="text-5xl font-black italic text-cyan-500">Fast</h2>
                                <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                                    Instant Results
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all">
                                <h2 className="text-5xl font-black italic text-blue-500">24/7</h2>
                                <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                                    Live Monitoring
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Why Us? */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/20 to-transparent blur-2xl rounded-[3rem] -z-10" />
                        
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl">
                            <h2 className="text-2xl font-black italic text-white mb-12 uppercase flex items-center gap-4 tracking-widest">
                                <span className="w-12 h-[2px] bg-cyan-500"></span>
                                Why VitalAI?
                            </h2> 

                            <div className="space-y-12">
                                {[
                                    {
                                        title: "Brain Speed Test",
                                        desc: "Check karo ki aapka reaction time millisecond mein kitna hai. Simple and gaming-style."
                                    },
                                    {
                                        title: "AQI Awareness",
                                        desc: "Hawa mein kitna pollution hai aur wo aapki speed ko kaise slow kar raha hai, hum batayenge."
                                    },
                                    {
                                        title: "Cyber-ID Profile",
                                        desc: "Har user ko ek unique digital identity milti hai jo aapke progress ko track karti hai."
                                    },
                                    {
                                        title: "Privacy Protected",
                                        desc: "Aapka data ekdam safe hai. Hum privacy ko military-grade protocols ke saath secure rakhte hain."
                                    }
                                ].map((feature, idx) => (
                                    <div key={idx} className="group">
                                        <h3 className="text-lg font-black italic uppercase text-slate-200 group-hover:text-cyan-400 transition-colors tracking-wider">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-500 mt-3 leading-relaxed text-sm font-medium">
                                            {feature.desc}
                                        </p>
                                        {idx !== 3 && <div className="mt-8 border-b border-white/5 w-full" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}