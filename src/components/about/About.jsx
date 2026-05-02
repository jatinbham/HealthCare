import React from 'react';

export default function About() {
    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
            
            <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    {/* Left Column: Story & Mission */}
                    <div className="sticky top-10">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                            Our Mission
                        </div>
                        
                        <h1 className="text-6xl font-extrabold leading-[1.1] tracking-tight">
                            Redefining <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Wellness with AI
                            </span>
                        </h1>

                        <p className="mt-8 text-slate-400 text-xl leading-relaxed max-w-xl">
                            VitalAI isn't just a health app; it's your personal biological radar. 
                            We bridge the gap between reactive treatment and proactive prevention.
                        </p>

                        <p className="mt-6 text-slate-500 text-lg leading-relaxed max-w-xl">
                            By synthesizing complex data points from your daily life—like sleep 
                            architecture and heart rate variability—our neural networks identify 
                            risks before they become symptoms.
                        </p>

                        {/* Stat Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-12">
                            <div className="bg-slate-900/40 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-800 hover:border-cyan-500/30 transition-colors">
                                <h2 className="text-5xl font-black text-cyan-400">98%</h2>
                                <p className="mt-2 text-slate-500 font-medium uppercase text-xs tracking-tighter">
                                    Prediction Accuracy
                                </p>
                            </div>

                            <div className="bg-slate-900/40 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-800 hover:border-green-500/30 transition-colors">
                                <h2 className="text-5xl font-black text-green-400">24/7</h2>
                                <p className="mt-2 text-slate-500 font-medium uppercase text-xs tracking-tighter">
                                    Autonomous Monitoring
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Why VitalAI Features */}
                    <div className="relative">
                        {/* Decorative glow for the box */}
                        <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/20 to-transparent blur-2xl rounded-[3rem] -z-10" />
                        
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-[3rem] p-12 shadow-2xl">
                            <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
                                <span className="w-8 h-1 bg-cyan-500 rounded-full"></span>
                                Why VitalAI?
                            </h2>

                            <div className="space-y-12">
                                {[
                                    {
                                        title: "Predictive Analytics",
                                        desc: "Advanced risk assessment for chronic conditions like hypertension and diabetes using deep learning."
                                    },
                                    {
                                        title: "Personalized Biometry",
                                        desc: "Tailored insights that adapt to your unique metabolism, age, and activity levels."
                                    },
                                    {
                                        title: "Explainable Models",
                                        desc: "No 'Black Box' AI. We provide clear reasoning behind every health prediction and score."
                                    },
                                    {
                                        title: "Privacy First",
                                        desc: "Your medical data is encrypted with military-grade protocols and never shared with third parties."
                                    }
                                ].map((feature, idx) => (
                                    <div key={idx} className="group cursor-default">
                                        <h3 className="text-xl font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-400 mt-3 leading-relaxed text-md">
                                            {feature.desc}
                                        </p>
                                        {idx !== 3 && <div className="mt-8 border-b border-slate-800/50 w-full" />}
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