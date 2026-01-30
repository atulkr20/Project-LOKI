import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const Login = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-green-500 font-mono relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#003300 1px, transparent 1px), linear-gradient(90deg, #003300 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* THE CARD */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-[500px] bg-black border border-green-600 shadow-[0_0_50px_rgba(0,255,65,0.2)] relative z-10"
      >
        
        {/* Header Bar */}
        <div className="bg-green-900/30 border-b border-green-600 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={16} />
            <span className="text-xs font-bold tracking-widest">PROJECT LOKI // LOGIN</span>
          </div>
          <div className="flex gap-1.5">
             <div className="w-2 h-2 rounded-full bg-red-500"></div>
             <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
             <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 flex flex-col items-center">
          
          <h2 className="text-2xl font-bold text-white mb-2 tracking-wider">Welcome Back</h2>
          <p className="text-xs text-green-400/70 mb-8">Enter your details to access the system</p>

          <form className="w-full flex flex-col items-center space-y-4">
            
            {/* Email */}
            <div className="w-4/5 space-y-1">
              <label className="text-xs font-bold text-green-600 ml-1">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-gray-900/50 border border-green-800 p-3 text-green-100 placeholder-green-900/50 focus:border-green-400 focus:bg-black focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,65,0.1)] transition-all box-border rounded-md text-sm"
                placeholder="name@example.com"
              />
            </div>

            {/* Password */}
            <div className="w-4/5 space-y-1">
              <label className="text-xs font-bold text-green-600 ml-1">Password</label>
              <input 
                type="password" 
                className="w-full bg-gray-900/50 border border-green-800 p-3 text-green-100 placeholder-green-900/50 focus:border-green-400 focus:bg-black focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,65,0.1)] transition-all box-border rounded-md text-sm"
                placeholder="••••••••••••"
              />
            </div>

            {/* LOGIN BUTTON - BIGGER GAP & GLOW */}
            <button className="w-4/5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black font-extrabold py-3 mt-8 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:shadow-[0_0_40px_rgba(0,255,65,0.6)] hover:scale-[1.02] rounded-md text-sm border border-green-400">
              Login
            </button>

          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-xs opacity-60">
            <span>Don't have an account? </span>
            <Link to="/signup" className="text-green-400 hover:text-white hover:underline ml-1 font-bold">
              Sign up here
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;