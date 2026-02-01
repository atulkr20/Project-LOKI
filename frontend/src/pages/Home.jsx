import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB', { hour12: false }));
  const [nodes, setNodes] = useState(1248);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-GB', { hour12: false }) + "." + Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0');
      setTime(timeString);
      if (Math.random() > 0.9) setNodes(n => n + (Math.random() > 0.5 ? 1 : -1));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.page}>
      
      <div style={styles.gridBackground}></div>
      <div style={styles.vignette}></div>

      <div style={styles.container}>
        
        <div style={styles.iconBox}>
          <Terminal size={48} color="#00ff41" strokeWidth={2} />
        </div>

        <h1 style={styles.title}>PROJECT LOKI</h1>

        <div style={styles.statusRow}>
          <div style={styles.greenDot}></div>
          <span style={styles.statusText}>SYSTEM STATUS: ONLINE</span>
        </div>

        <div style={styles.statsContainer}>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>ACTIVE NODES</div>
            <div style={styles.statValue}>{nodes.toLocaleString()}</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>LINKS MONITORED</div>
            <div style={styles.statValue}>85.2k</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>LAST EVENT TIMESTAMP</div>
            <div style={styles.statValue}>{time}</div>
          </div>
        </div>

        <div style={styles.heroTextContainer}>
          <p style={styles.heroLine}>Every click leaves a signal.</p>
          <p style={styles.heroLine}>Observe behavior. Not just traffic.</p>
          
          <div style={styles.redWarningBox}>
             <span style={styles.blink}>&gt;</span> ACCESS_IS_MONITORED.
          </div>
        </div>

        <div style={styles.actionRow}>
          <button onClick={() => navigate('/signup')} style={styles.btn}>
            [ CREATE_ACCOUNT ]
          </button>
          <button onClick={() => navigate('/login')} style={styles.btn}>
            [ SYSTEM_LOGIN ]
          </button>
        </div>

        <div style={styles.infoGrid}>
          <div style={styles.infoBox}>
            <h3 style={styles.colHeader}>### BEHAVIOR_ANALYSIS</h3>
            <p style={styles.colText}>
              Advanced heuristics track interaction patterns beyond simple redirection. Understand the intent behind every connection in real-time.
            </p>
          </div>
          <div style={styles.infoBox}>
            <h3 style={styles.colHeader}>### SECURE_ROUTING</h3>
            <p style={styles.colText}>
              Encrypted pathways and zero-trust architecture ensure that your links remain private and your data remains yours.
            </p>
          </div>
        </div>

      </div>

      <footer style={styles.footer}>
        Project Loki // Zero-Day Redirection // v2.0.4
      </footer>

      <style>{`
        button:hover { 
          background: #00ff41 !important; 
          color: #000 !important; 
          box-shadow: 0 0 15px rgba(0,255,65,0.4);
          cursor: pointer;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh', width: '100vw',
    backgroundColor: '#000000',
    color: '#00ff41',
    fontFamily: '"Consolas", "Monaco", "Lucida Console", monospace',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    position: 'relative', overflowX: 'hidden'
  },
  
  // Background Pattern
  gridBackground: {
    position: 'fixed', inset: 0, pointerEvents: 'none',
    backgroundImage: `linear-gradient(rgba(0, 255, 65, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.07) 1px, transparent 1px)`,
    backgroundSize: '40px 40px', zIndex: 1
  },
  vignette: {
    position: 'fixed', inset: 0, pointerEvents: 'none',
    background: 'radial-gradient(circle, transparent 40%, #000000 100%)', zIndex: 2
  },

  container: {
    zIndex: 10,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    width: '100%', maxWidth: '1000px',
    padding: '60px 20px',
    boxSizing: 'border-box'
  },
  iconBox: {
    border: '2px solid #00ff41', padding: '15px', borderRadius: '4px',
    marginBottom: '20px', boxShadow: '0 0 15px rgba(0, 255, 65, 0.2)',
    display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  title: {
    fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '900', letterSpacing: '4px',
    margin: '0 0 10px 0', color: '#00ff41',
    textShadow: '0 0 25px rgba(0, 255, 65, 0.6)', textAlign: 'center'
  },
  statusRow: {
    display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '50px', opacity: 0.9
  },
  greenDot: {
    width: '8px', height: '8px', backgroundColor: '#00ff41', borderRadius: '50%', boxShadow: '0 0 8px #00ff41'
  },
  statusText: {
    fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase'
  },
  statsContainer: {
    display: 'flex', justifyContent: 'center', gap: '20px', width: '100%', marginBottom: '50px', flexWrap: 'wrap'
  },
  statBox: {
    border: '1px solid #00330d', padding: '20px 30px', minWidth: '200px', flex: '1',
    textAlign: 'center', backgroundColor: 'rgba(0, 20, 0, 0.3)'
  },
  statLabel: {
    fontSize: '10px', color: '#00cc33', letterSpacing: '1px', marginBottom: '10px', textTransform: 'uppercase'
  },
  statValue: {
    fontSize: '24px', fontWeight: 'bold', color: '#fff', textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
  },
  heroTextContainer: {
    textAlign: 'center', marginBottom: '50px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'
  },
  heroLine: {
    fontSize: 'clamp(16px, 2vw, 18px)', fontStyle: 'italic', color: '#00ff41', margin: 0, letterSpacing: '0.5px', textShadow: '0 0 5px rgba(0, 255, 65, 0.3)'
  },
  redWarningBox: {
    display: 'inline-block', fontSize: '12px', color: '#ff3333', fontWeight: 'bold',
    background: 'rgba(50, 0, 0, 0.5)', padding: '8px 16px', borderRadius: '2px',
    border: '1px solid #ff3333', letterSpacing: '1px', marginTop: '15px'
  },
  blink: { animation: 'blink 1s step-end infinite' },

  // Buttons
  actionRow: {
    display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '60px', flexWrap: 'wrap'
  },
  btn: {
    background: 'transparent', border: '1px solid #00ff41', color: '#00ff41',
    padding: '16px 32px', fontSize: '15px', fontWeight: 'bold', letterSpacing: '2px',
    transition: 'all 0.2s ease', fontFamily: 'inherit',
    textShadow: '0 0 5px rgba(0,255,65,0.4)'
  },

  // Info Grid
  infoGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
    gap: '40px', width: '100%', marginBottom: '40px'
  },
  infoBox: {
    border: '1px solid #00330d', padding: '30px', backgroundColor: 'rgba(0, 20, 0, 0.2)',
    display: 'flex', flexDirection: 'column', gap: '15px'
  },
  colHeader: { fontSize: '18px', color: '#00ff41', margin: 0, letterSpacing: '1px' },
  colText: { fontSize: '14px', lineHeight: '1.6', color: '#88cc88' },

  // Footer
  footer: {
    marginTop: 'auto', padding: '20px 0', width: '100%', textAlign: 'center', fontSize: '11px', color: '#004d00', letterSpacing: '2px'
  }
};

export default Home;