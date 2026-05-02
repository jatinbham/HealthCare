import React from 'react';

export default function Contact() {
    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[120px] -z-10" />

            <div className="max-w-6xl mx-auto px-6 py-24">
                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                        Support Center
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                        Contact <span className="text-cyan-400">VitalAI</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Have questions about our predictive models? Our healthcare and AI experts are here to help you navigate your data.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    
                    {/* Left: Info Cards (Takes 2 columns) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem]">
                            <h2 className="text-2xl font-bold text-white mb-8">Reach Out</h2>
                            
                            <div className="space-y-10">
                                <div className="group cursor-default">
                                    <p className="text-xs font-bold uppercase tracking-widest text-cyan-500/60 mb-2">Electronic Mail</p>
                                    <h3 className="text-xl font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                                        vitalai.health@gmail.com
                                    </h3>
                                </div>

                                <div className="group cursor-default">
                                    <p className="text-xs font-bold uppercase tracking-widest text-cyan-500/60 mb-2">Voice Assistance</p>
                                    <h3 className="text-xl font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                                        +91 98765 43210
                                    </h3>
                                </div>

                                <div className="group cursor-default">
                                    <p className="text-xs font-bold uppercase tracking-widest text-cyan-500/60 mb-2">Regional Office</p>
                                    <h3 className="text-xl font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                                        Bhopal, Madhya Pradesh <br />
                                        <span className="text-sm text-slate-500">Digital Health Park, Zone 1</span>
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Subtle Note */}
                        <div className="p-8 rounded-[2rem] border border-dashed border-slate-800 text-slate-500 text-sm">
                            Response time is usually within **24 hours** for health data inquiries.
                        </div>
                    </div>

                    {/* Right: Contact Form (Takes 3 columns) */}
                    <div className="lg:col-span-3">
                        <div className="bg-slate-900/30 border border-white/5 rounded-[2.5rem] p-8 md:p-12">
                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all placeholder:text-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">Email</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all placeholder:text-slate-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Prediction Inquiry"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all placeholder:text-slate-700"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">Message</label>
                                    <textarea
                                        rows="5"
                                        placeholder="How can we help?"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all placeholder:text-slate-700 resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#020617] font-black py-5 rounded-2xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-cyan-500/10 mt-4"
                                >
                                    SEND DISPATCH
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}