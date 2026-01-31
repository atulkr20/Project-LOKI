import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Lock } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState("");

  // Simple animation for the "TRACING IP" text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + "." : "");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      
      {/* GLITCH HEADER */}
      <div className="glitch-wrapper" style={{ marginBottom: '40px' }}>
        <h1 style={styles.errorCode}>404</h1>
        <div style={styles.errorText}>SYSTEM_FAILURE</div>
      </div>

      {/* ERROR LOGS */}
      <div style={styles.terminalBox}>
        <div style={styles.logRow}>
          <span style={styles.timestamp}>[CRITICAL]</span>
          <span style={styles.message}>TARGET_HASH_UNRECOGNIZED</span>
        </div>
        <div style={styles.logRow}>
          <span style={styles.timestamp}>[WARNING]</span>
          <span style={styles.message}>UNAUTHORIZED_ENTRY_DETECTED</span>
        </div>
        <div style={styles.logRow}>
          <span style={styles.timestamp}>[SYSTEM]</span>
          <span style={{...styles.message, color: '#ff0033', fontWeight: 'bold'}}>
            TRACING_ORIGIN_IP{dots}
          </span>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <button onClick={() => navigate('/')} style={styles.button}>
        <Lock size={14} />
        <span>RETURN_TO_SAFETY</span>
      </button>

      {/* FOOTER */}
      <div style={styles.footer}>
        <span>ERR_CODE: ID_10_T</span>
        <span>NO_ESCAPE</span>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

// --- STYLES (MATCHING THEME BUT RED) ---
const styles = {
  container: {
    height: '100vh', width: '100vw',
    backgroundColor: '#050000', // Very dark red-black
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    fontFamily: '"Consolas", "Monaco", monospace',
    color: '#ff0033', // LOKI RED
    position: 'relative',
    overflow: 'hidden'
  },
  errorCode: {
    fontSize: 'clamp(60px, 10vw, 100px)',
    fontWeight: '900',
    margin: 0,
    lineHeight: 1,
    letterSpacing: '10px',
    textShadow: '0 0 20px rgba(255, 0, 51, 0.6)'
  },
  errorText: {
    fontSize: 'clamp(14px, 3vw, 20px)',
    letterSpacing: '5px',
    textAlign: 'center',
    opacity: 0.8
  },
  terminalBox: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px',
    marginTop: '40px',
    padding: '20px',
    borderLeft: '2px solid #ff0033',
    backgroundColor: 'rgba(255, 0, 51, 0.05)'
  },
  logRow: {
    display: 'flex', alignItems: 'center', gap: '15px',
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    fontFamily: 'monospace'
  },
  timestamp: { color: '#800000', fontWeight: 'bold' }, // Dark Red
  message: { color: '#ff4d6a' }, // Pinkish Red
  
  button: {
    marginTop: '50px',
    background: 'transparent',
    border: '1px solid #ff0033',
    color: '#ff0033',
    padding: '12px 24px',
    display: 'flex', alignItems: 'center', gap: '10px',
    cursor: 'pointer',
    fontSize: '12px',
    letterSpacing: '2px',
    transition: 'all 0.3s ease'
  },
  footer: {
    position: 'absolute', bottom: '30px',
    display: 'flex', gap: '40px',
    opacity: 0.3, fontSize: '10px', letterSpacing: '2px'
  }
};

export default NotFound;