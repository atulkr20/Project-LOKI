import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    // The "scanlines" class adds the CRT effect to the whole app
    <div className="min-h-screen bg-black text-green-500 font-mono scanlines">
      <BrowserRouter>
        <Routes>
          {/* When URL is /, show Home */}
          <Route path="/" element={<Home />} />
          
          {/* When URL is /login, show Login */}
          <Route path="/login" element={<Login />} />
          
          {/* When URL is /signup, show Signup */}
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;