import React from 'react'

export default function Contact() {

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <div className="max-w-5xl mx-auto px-6 py-20">

                <div className="text-center">

                    <h1 className="text-5xl font-extrabold">

                        Contact
                        <span className="text-cyan-400">
                            {" "}VitalAI
                        </span>

                    </h1>

                    <p className="text-slate-400 mt-5 text-lg">

                        Get in touch with our AI healthcare team.

                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-14 mt-20">

              

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

                        <h2 className="text-3xl font-bold text-cyan-400 mb-10">

                            Contact Information

                        </h2>

                        <div className="space-y-8">

                            <div>

                                <p className="text-slate-400">
                                    Email
                                </p>

                                <h3 className="text-xl font-semibold mt-2">
                                    vitalai@gmail.com
                                </h3>

                            </div>

                            <div>

                                <p className="text-slate-400">
                                    Phone
                                </p>

                                <h3 className="text-xl font-semibold mt-2">
                                    +91 9876543210
                                </h3>

                            </div>

                            <div>

                                <p className="text-slate-400">
                                    Location
                                </p>

                                <h3 className="text-xl font-semibold mt-2">
                                    India
                                </h3>

                            </div>

                        </div>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

                        <form className="space-y-6">

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-cyan-400"
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-cyan-400"
                            />

                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-cyan-400"
                            />

                            <textarea
                                rows="5"
                                placeholder="Your Message"
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-cyan-400"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 rounded-2xl transition duration-300"
                            >

                                Send Message

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )
}