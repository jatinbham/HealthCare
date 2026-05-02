import React, { useState, useRef } from "react";

const ReflexTest = ({ onComplete }) => {
    const [gameState, setGameState] = useState("idle"); 
    const [reactionTime, setReactionTime] = useState(null);
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);

    const startTest = () => {
        setGameState("waiting");
        setReactionTime(null);
        const randomDelay = Math.random() * 3000 + 2000; 

        timerRef.current = setTimeout(() => {
            setGameState("active");
            startTimeRef.current = performance.now();
        }, randomDelay);
    };

    const handleHit = () => {
        // AGAR GAME IDLE HAI TOH START KARO
        if (gameState === "idle") {
            startTest();
            return;
        }

        // AGAR GREEN/CYAN HAI TOH TIME RECORD KARO
        if (gameState === "active") {
            const endTime = performance.now();
            const timeTaken = Math.round(endTime - startTimeRef.current);
            setReactionTime(timeTaken);
            setGameState("finished");
            onComplete(timeTaken); 
        } 
        // AGAR RED HAI AUR JALDI CLICK KIYA
        else if (gameState === "waiting") {
            clearTimeout(timerRef.current);
            alert("Too early! Wait for the color to change.");
            setGameState("idle");
        }
        // AGAR FINISHED HAI TOH RESTART KARO
        else if (gameState === "finished") {
            startTest();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-900/50 rounded-3xl border border-slate-800 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-4 text-cyan-400 font-mono tracking-widest text-center">
                COGNITIVE SENSOR
            </h2>
            
            <div 
                onClick={handleHit} // Ab ye button har state mein kaam karegi
                className={`w-64 h-64 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-150 shadow-2xl ${
                    gameState === "waiting" ? "bg-red-500/10 border-4 border-red-500/50 animate-pulse" :
                    gameState === "active" ? "bg-cyan-500 scale-105 shadow-cyan-500/50" :
                    "bg-slate-800 border-4 border-slate-700 hover:border-cyan-500/50"
                }`}
            >
                <span className={`font-black text-center px-4 uppercase tracking-tighter ${gameState === 'active' ? 'text-black' : 'text-white'}`}>
                    {gameState === "idle" && "Click to Start"}
                    {gameState === "waiting" && "Wait..."}
                    {gameState === "active" && "TAP NOW!"}
                    {gameState === "finished" && `${reactionTime}ms`}
                </span>
                {gameState === "finished" && (
                    <span className="text-[10px] mt-2 text-slate-400 uppercase font-bold tracking-widest">
                        Tap to Retry
                    </span>
                )}
            </div>

            <p className="mt-6 text-[10px] text-slate-500 uppercase tracking-[0.2em] text-center">
                {gameState === "idle" ? "Ready to analyze neural lag" : "Don't blink!"}
            </p>
        </div>
    );
};

export default ReflexTest;