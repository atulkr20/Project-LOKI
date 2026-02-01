import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, GuestRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SecurityScan from './pages/SecurityScan';
import NotFound from './pages/NotFound';


function App() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono scanlines">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/login" element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            } />
            
            <Route path="/signup" element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/s/:shortCode" element={<SecurityScan />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
