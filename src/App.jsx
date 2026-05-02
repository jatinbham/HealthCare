import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AnalyzeHealth from "./components/AnalyzeHealth/AnalyzeHealth";

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
          {/* Aur routes yaha add karte jaana */}
          <Route path="/analyze" element={<AnalyzeHealth />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;