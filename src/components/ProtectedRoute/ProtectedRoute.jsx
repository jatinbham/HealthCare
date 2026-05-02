import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");
    const location = useLocation();

    useEffect(() => {
        // Optional: Token validation ke liye backend call kar sakte ho future mein
        const checkAuth = async () => {
            // Abhi ke liye simple check
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <p className="text-white text-xl">Checking authentication...</p>
            </div>
        );
    }

    if (!token) {
        // Redirect karte waqt current path save kar sakte ho (better UX)
        return <Navigate 
            to="/login" 
            state={{ from: location.pathname }} 
            replace 
        />;
    }

    return children;
}