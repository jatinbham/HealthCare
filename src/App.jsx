import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// Naya Master Component Import
import CyberpunkLab from "./components/CyberpunkLab/CyberpunkLab"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout ke saath routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Ab Analyze path par CyberpunkLab load hoga */}
          {/* Iske andar hi AnalyzeHealth aur Analysis switch honge */}
          <Route 
            path="/analyze" 
            element={
              <ProtectedRoute>
                <CyberpunkLab />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;