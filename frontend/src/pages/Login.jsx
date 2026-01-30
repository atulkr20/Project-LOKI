import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Mail, Lock, ChevronRight, Cpu, ArrowRight, ShieldAlert } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save Token
        localStorage.setItem('token', data.token);
        
        // Success Delay for Effect
        setTimeout(() => {
            alert("ACCESS GRANTED. WELCOME BACK, OPERATOR.");
            navigate('/dashboard');
        }, 1000);
      } else {
        alert("ACCESS DENIED: " + (data.error || "INVALID CREDENTIALS"));
        setLoading(false);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("CONNECTION FAILURE: SERVER UNREACHABLE");
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      
      {/* Background Effects */}
      <div style={styles.scanline}></div>
      <div style={styles.gridBackground}></div>

      {/* --- 1. THE HEADER SECTION (Branding) --- */}
      <div style={styles.brandingSection}>
        <div style={styles.logoBox}>
          <Terminal size={40} color="#00ff41" />
        </div>
        <h1 style={styles.mainTitle}>PROJECT LOKI</h1>
        <p style={styles.subTitle}>SECURE_ACCESS_TERMINAL_V2.0.4</p>
      </div>

      {/* --- 2. THE LOGIN CARD --- */}
      <div style={styles.window}>
        
        {/* Card Header */}
        <div style={styles.cardHeader}>
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <ChevronRight size={20} color="#00ff41" />
                <span style={styles.cardTitle}>AUTHENTICATE_USER</span>
            </div>
            <ShieldAlert size={24} color="#00ff41" style={{opacity: 0.2}} />
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} style={styles.form}>
            
            {/* EML Input */}
            <div style={styles.inputContainer}>
                <div style={styles.iconLabel}>
                    <Mail size={14} />
                    <span>EML:</span>
                </div>
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  placeholder="OPERATOR_ID@ADDR.NET"
                  required
                  style={styles.input}
                />
            </div>

            {/* PWD Input */}
            <div style={styles.inputContainer}>
                <div style={styles.iconLabel}>
                    <Lock size={14} />
                    <span>KEY:</span>
                </div>
                <input 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password" 
                  placeholder="••••••••••••"
                  required
                  style={styles.input}
                />
            </div>

            {/* ACTION BUTTON */}
            <button disabled={loading} style={styles.button}>
              {loading ? <Cpu size={16} style={{animation: 'spin 1s linear infinite'}} /> : <ArrowRight size={16} />}
              {loading ? "DECRYPTING..." : "INITIATE_SESSION"}
            </button>

        </form>
      </div>

      {/* Footer Link */}
      <div style={styles.footer}>
        <span>NO CLEARANCE?</span>
        <Link to="/signup" style={styles.link}>
           REQUEST IDENTITY
        </Link>
      </div>

    </div>
  );
}

// --- EXACT STYLES (Copied to ensure 100% match) ---
const styles = {
  pageContainer: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#020202',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Courier New", Courier, monospace',
    color: '#00ff41',
    overflow: 'hidden',
    position: 'relative',
  },
  gridBackground: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)',
    backgroundSize: '30px 30px',
    pointerEvents: 'none',
  },
  scanline: {
    position: 'absolute',
    top: 0, left: 0, right: 0, height: '100vh',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))',
    backgroundSize: '100% 3px',
    pointerEvents: 'none',
    zIndex: 5,
    opacity: 0.3
  },
  brandingSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '40px',
    zIndex: 10,
  },
  logoBox: {
    width: '80px',
    height: '80px',
    border: '2px solid #00ff41',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)',
    marginBottom: '20px',
    backgroundColor: 'rgba(0, 20, 0, 0.5)',
  },
  mainTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    letterSpacing: '5px',
    margin: '0 0 10px 0',
    textShadow: '0 0 15px rgba(0, 255, 65, 0.6)',
    color: '#fff',
  },
  subTitle: {
    fontSize: '10px',
    letterSpacing: '3px',
    opacity: 0.6,
    margin: 0,
  },
  window: {
    width: '500px',
    border: '1px solid rgba(0, 255, 65, 0.5)',
    boxShadow: '0 0 30px rgba(0, 255, 65, 0.05)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(5px)',
    zIndex: 10,
    padding: '30px',
    position: 'relative',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '1px solid rgba(0, 255, 65, 0.2)',
    paddingBottom: '15px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    color: '#00ff41',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(0, 255, 65, 0.3)',
    backgroundColor: 'rgba(0, 20, 0, 0.2)',
    padding: '0 15px',
    height: '50px',
    transition: 'border 0.3s ease',
  },
  iconLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '80px',
    fontSize: '12px',
    fontWeight: 'bold',
    opacity: 0.8,
    borderRight: '1px solid rgba(0, 255, 65, 0.2)',
    marginRight: '15px',
    height: '60%',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontFamily: 'inherit',
    fontSize: '14px',
    outline: 'none',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  button: {
    marginTop: '10px',
    height: '50px',
    background: 'transparent',
    color: '#00ff41',
    border: '1px solid #00ff41',
    fontWeight: 'bold',
    letterSpacing: '2px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '14px',
    transition: 'all 0.2s',
  },
  footer: {
    marginTop: '30px',
    fontSize: '10px',
    opacity: 0.5,
    zIndex: 10,
    display: 'flex',
    gap: '10px',
  },
  link: {
    color: '#00ff41',
    textDecoration: 'none',
    fontWeight: 'bold',
    borderBottom: '1px solid rgba(0, 255, 65, 0.3)',
  }
};