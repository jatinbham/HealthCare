import React, { useState, useEffect } from 'react';
import axios from "axios";
import BASE_URL from '../../api';  // Better to use improved api.js

export default function HealthForm() {

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        weight: "",
        height: "",
        sleep: "",
        water: "",
        exercise: "",
        stress: "",
        sugar: "",
        bp: ""
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const analyzeHealth = () => {
        const { age, sleep, water, exercise, stress, sugar, bp, weight, height } = formData;

        let score = 100;
        let warnings = [];
        let tips = [];

        const bmi = weight && height ? 
            (weight / ((height / 100) * (height / 100))).toFixed(1) : 0;

        // Logic (same rakha hai, thoda clean kiya)
        if (Number(age) > 50) { score -= 10; warnings.push("Age-related risks increased"); tips.push("Regular full body checkup recommended"); }
        if (Number(sleep) < 5) { score -= 20; warnings.push("Severe sleep deficiency"); tips.push("Aim for 7-8 hours sleep"); }
        else if (Number(sleep) < 7) { score -= 10; warnings.push("Insufficient sleep"); tips.push("Try to sleep at least 7 hours"); }

        if (Number(water) < 2) { score -= 10; warnings.push("Low hydration"); tips.push("Increase water intake"); }
        if (Number(exercise) === 0) { score -= 20; warnings.push("No physical activity"); tips.push("Start daily walking"); }
        if (Number(stress) >= 8) { score -= 25; warnings.push("Critical stress level"); tips.push("Practice meditation"); }
        if (Number(sugar) > 180) { score -= 30; warnings.push("Very high diabetes risk"); tips.push("Consult doctor immediately"); }
        if (Number(bp) > 160) { score -= 30; warnings.push("Critical hypertension"); tips.push("Urgent medical attention needed"); }

        // Health Status
        let healthStatus = score >= 85 ? "Excellent" : 
                          score >= 65 ? "Moderate" : 
                          score >= 40 ? "Poor" : "Critical";

        setResult({
            score: Math.max(0, score),
            bmi,
            healthStatus,
            warnings,
            tips,
            personalMessage: "Your health can improve significantly with small consistent changes."
        });
    };

   const saveHealthProfile = async () => {
    const token = localStorage.getItem("token");   // ← Yeh line add karo

    if (!token) {
        alert("Please login first!");
        return;
    }

    if (!formData.name || !formData.age) {
        alert("Name and Age are required fields!");
        return;
    }

    setLoading(true);

    try {
        const response = await axios.post(`${BASE_URL}/health-profile`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        alert("Health Profile Saved Successfully! ✅");

        // Dashboard ko refresh karne ke liye
        localStorage.setItem("profileUpdated", Date.now().toString());

    } catch (error) {
        console.error(error);
        alert("Failed to save profile. Please try again.");
    } finally {
        setLoading(false);
    }
};
    return (
        <div className="min-h-screen bg-slate-950 text-white py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-center mb-4 text-cyan-400">
                    AI Health Analysis
                </h1>
                <p className="text-slate-400 text-center mb-14 text-lg">
                    Fill your details and get instant AI-powered health insights
                </p>

                <div className="grid md:grid-cols-2 gap-6 bg-slate-900 p-8 rounded-3xl">
                    {Object.keys(formData).map((field) => (
                        <input
                            key={field}
                            type="text"
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formData[field]}
                            onChange={handleChange}
                            className="bg-slate-800 p-4 rounded-2xl outline-none focus:border-cyan-400 border border-transparent transition"
                        />
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <button
                        onClick={analyzeHealth}
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black py-4 rounded-2xl text-xl font-bold transition"
                    >
                        Analyze My Health
                    </button>

                    <button
                        onClick={saveHealthProfile}
                        disabled={loading}
                        className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-700 text-black py-4 rounded-2xl text-xl font-bold transition"
                    >
                        {loading ? "Saving..." : "Save Profile"}
                    </button>
                </div>

                {result && (
                    <div className="mt-14 bg-slate-900 border border-cyan-500/50 p-8 rounded-3xl">
                        <h2 className="text-4xl font-bold mb-6 text-cyan-400">Your AI Health Report</h2>
                        {/* Result display code same rakh sakte ho, thoda style improve kar sakte hain */}
                    </div>
                )}
            </div>
        </div>
    );
}