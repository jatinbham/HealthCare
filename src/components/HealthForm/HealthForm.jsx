import React, { useState, useEffect } from 'react'
import axios from "axios"

export default function HealthForm() {

    const token = localStorage.getItem("token")

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

    })

    const [result, setResult] = useState("")

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

   const analyzeHealth = () => {

    let score = 100

    let tips = []

    let warnings = []

    const age = Number(formData.age)
    const sleep = Number(formData.sleep)
    const water = Number(formData.water)
    const exercise = Number(formData.exercise)
    const stress = Number(formData.stress)
    const sugar = Number(formData.sugar)
    const bp = Number(formData.bp)
    const weight = Number(formData.weight)
    const height = Number(formData.height)

    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1)

    // AGE BASED

    if(age > 50){

        score -= 10
        warnings.push("Age-related health risks increased.")
        tips.push("Regular full body checkup recommended.")

    }

    // SLEEP

    if(sleep < 5){

        score -= 20
        warnings.push("Severe sleep deficiency detected.")
        tips.push("Your body needs proper recovery sleep.")

    }

    else if(sleep < 7){

        score -= 10
        warnings.push("Insufficient sleep.")
        tips.push("Try sleeping at least 7 hours.")

    }

    // WATER

    if(water < 2){

        score -= 10
        warnings.push("Low hydration level.")
        tips.push("Increase daily water intake.")

    }

    // EXERCISE

    if(exercise === 0){

        score -= 20
        warnings.push("No physical activity detected.")
        tips.push("Daily walking recommended.")

    }

    else if(exercise < 3){

        score -= 10
        warnings.push("Low activity lifestyle.")
        tips.push("Exercise minimum 3-5 days weekly.")

    }

    // STRESS

    if(stress >= 8){

        score -= 25
        warnings.push("Critical stress level.")
        tips.push("Meditation & mental wellness strongly advised.")

    }

    else if(stress >= 5){

        score -= 10
        warnings.push("Moderate stress detected.")
        tips.push("Take proper breaks and rest.")

    }

    // BLOOD SUGAR

    if(sugar > 180){

        score -= 30
        warnings.push("Very high diabetes risk.")
        tips.push("Immediate doctor consultation advised.")

    }

    else if(sugar > 140){

        score -= 15
        warnings.push("Elevated blood sugar.")
        tips.push("Reduce sugar intake and monitor regularly.")

    }

    // BLOOD PRESSURE

    if(bp > 160){

        score -= 30
        warnings.push("Critical hypertension risk.")
        tips.push("Urgent blood pressure management required.")

    }

    else if(bp > 140){

        score -= 15
        warnings.push("High blood pressure detected.")
        tips.push("Reduce salt intake and stress.")

    }

    // BMI

    if(bmi < 18.5){

        score -= 10
        warnings.push("Underweight body condition.")
        tips.push("Increase healthy calorie intake.")

    }

    else if(bmi > 25){

        score -= 15
        warnings.push("Overweight condition detected.")
        tips.push("Weight management recommended.")

    }

    // FINAL STATUS

    let healthStatus = ""

    if(score >= 85){

        healthStatus = "Excellent Health"

    }

    else if(score >= 65){

        healthStatus = "Moderate Health"

    }

    else if(score >= 40){

        healthStatus = "Poor Health Condition"

    }

    else{

        healthStatus = "Critical Health Risk"

    }

    // UNIQUE PERSONAL MESSAGE

    let personalMessage = ""

    if(stress > 7 && sleep < 6){

        personalMessage =
        "Your stress and sleep combination may seriously impact mental health."

    }

    else if(bp > 150 && sugar > 160){

        personalMessage =
        "You may have combined cardiovascular and diabetes-related risks."

    }

    else if(exercise === 0){

        personalMessage =
        "Sedentary lifestyle detected. Your body needs movement daily."

    }

    else{

        personalMessage =
        "Your health condition is stable but can still improve with consistency."

    }

    setResult({

        score,
        bmi,
        healthStatus,
        warnings,
        tips,
        personalMessage

    })

}

const saveHealthProfile = async () => {

    try {

        await axios.post(
            "https://your-backend-url/health-profile",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        alert("Profile Saved 🚀")

    } catch (error) {

        console.log(error)
        alert("Save failed")

    }

}

    useEffect(() => {

    const fetchProfile = async () => {

        try {

            const res = await axios.get(
                "https://your-backend-url/health-profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (res.data.profile) {
                setFormData(res.data.profile)
            }

        } catch (error) {
            console.log(error)
        }

    }

    fetchProfile()

}, [])

    return (

        <div className="min-h-screen bg-slate-950 text-white py-20 px-6">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-5xl font-bold text-center mb-4">

                    AI Health Analysis

                </h1>

                <p className="text-slate-400 text-center mb-14 text-lg">

                    Fill your health details and get AI-powered predictions.

                </p>

                <div className="grid md:grid-cols-2 gap-6">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="bg-slate-800 p-4 rounded-xl outline-none"
                    />

                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        onChange={handleChange}
                        className="bg-slate-800 p-4 rounded-xl outline-none"
                    />

                    <input
                        type="number"
                        name="weight"
                        placeholder="Weight (kg)"
                        onChange={handleChange}
                        className="bg-slate-800 p-4 rounded-xl outline-none"
                    />

                    <input
                        type="number"
                        name="height"
                        placeholder="Height (cm)"
                        onChange={handleChange}
                        className="bg-slate-800 p-4 rounded-xl outline-none"
                    />

                    <input
                        type="number"
                        name="sleep"
                        placeholder="Sleep Hours"
                        onChange={handleChange}
                        className="bg-slate-800 p-4 rounded-xl outline-none"
                    />

                    <input
                        type="number"
                        name="water"
                        placeholder="Water Intake (litres)"
                        onChange={handleChange}
                        className="bg-slate-800 p-4 rounded-xl outline-none"
                    />

                    <input
                        type="number"
                        name="exercise"
                        placeholder="Exercise Days / Week"
                        onChange={handleChange}
                        className="bg-slate-800 p-4 rounded-xl outline-none"
                    />

                    <input
                        type="number"
                        name="stress"
                        placeholder="Stress Level (1-10)"
                        onChange={handleChange}
                        className="bg-slate-800 p-4 rounded-xl outline-none"
                    />

                    <input
                        type="number"
                        name="sugar"
                        placeholder="Blood Sugar"
                        onChange={handleChange}
                        className="bg-slate-800 p-4 rounded-xl outline-none"
                    />

                    <input
                        type="number"
                        name="bp"
                        placeholder="Blood Pressure"
                        onChange={handleChange}
                        className="bg-slate-800 p-4 rounded-xl outline-none"
                    />

                </div>

                <button
                    onClick={analyzeHealth}
                    className="mt-10 w-full bg-cyan-500 hover:bg-cyan-600 text-black py-4 rounded-2xl text-xl font-bold transition duration-300"
                >

                    Analyze My Health

                </button>

                <button
    onClick={saveHealthProfile}
    className="mt-6 w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-2xl text-xl font-bold"
>
    Save / Update Profile
</button>

                {

                    result && (

                        <div className="mt-14 bg-slate-900 border border-cyan-500 p-8 rounded-3xl">

                            <h2 className="text-4xl font-bold mb-6 text-cyan-400">

                                Health Report

                            </h2>

                            <div className="space-y-4 text-lg">

                                <p>
                                    <span className="font-bold">
                                        Health Score:
                                    </span>
                                <p>
    <span className="font-bold">
        BMI:
    </span>

    {" "}
    {result.bmi}
</p>

<p>
    <span className="font-bold">
        AI Insight:
    </span>

    {" "}
    {result.personalMessage}
</p>
                                    {" "}
                                    {result.score}/100
                                </p>

                                <p>
                                    <span className="font-bold">
                                        Status:
                                    </span>

                                    {" "}
                                    {result.healthStatus}
                                </p>

                                <div>

                                    <h3 className="text-2xl font-bold mt-6 mb-3 text-red-400">
                                        Warnings
                                    </h3>

                                    <ul className="list-disc pl-6">

                                        {

                                            result.warnings.map((warning, index) => (

                                                <li key={index}>
                                                    {warning}
                                                </li>

                                            ))

                                        }

                                    </ul>

                                </div>

                                <div>

                                    <h3 className="text-2xl font-bold mt-6 mb-3 text-green-400">
                                        AI Suggestions
                                    </h3>

                                    <ul className="list-disc pl-6">

                                        {

                                            result.tips.map((tip, index) => (

                                                <li key={index}>
                                                    {tip}
                                                </li>

                                            ))

                                        }

                                    </ul>

                                </div>

                            </div>

                        </div>

                    )

                }

            </div>

        </div>

    )
}