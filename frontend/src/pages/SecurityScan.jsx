import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const SecurityScan = () => {
  const { shortCode } = useParams();
  
  // State
  const [displayedLines, setDisplayedLines] = useState([]);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null); // Track errors
  const hasFetched = useRef(false);

  // 1. LOG SEQUENCE
  const logSequence = [
    "INITIALIZING SYSTEM SCAN...",
    "ESTABLISHING SECURE CHANNEL...",
    "RESOLVING DESTINATION HOST...",
    "VERIFYING CRYPTOGRAPHIC HANDSHAKE...",
    "SYNCHRONIZING UPLINK PROTOCOLS...",
    "MONITORING USER BEHAVIOR...",
    "SESSION INTEGRITY: ACTIVE"
  ];

  // 2. FETCH REAL URL (With Debugging)
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchUrl = async () => {
      console.log("Attempting to resolve:", shortCode); // DEBUG LOG
      try {
        // Ensure this matches your backend port (usually 8000 or 5000)
        const res = await fetch(`http://localhost:8000/url/resolve/${shortCode}`);
        console.log("Response Status:", res.status); // DEBUG LOG

        if (res.ok) {
          const data = await res.json();
          console.log("Target Found:", data.targetURL); // DEBUG LOG
          setRedirectUrl(data.targetURL);
        } else {
          console.error("Backend Error:", res.statusText);
          setError("TARGET_NOT_FOUND");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("CONNECTION_REFUSED_BACKEND_OFFLINE");
      }
    };
    fetchUrl();
  }, [shortCode]);

  // 3. ANIMATION SEQUENCE
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      // If we have lines left, print them
      if (currentIndex < logSequence.length) {
        setDisplayedLines(prev => [
          ...prev, 
          { id: currentIndex, text: logSequence[currentIndex] }
        ]);
        currentIndex++;
      } else {
        // Animation done. Check for errors or success.
        clearInterval(interval);
        
        if (error) {
          setDisplayedLines(prev => [...prev, { id: 999, text: `FATAL ERROR: ${error}`, isError: true }]);
        } else if (!redirectUrl) {
          // If animation finished but fetch is still pending (slow network)
           setDisplayedLines(prev => [...prev, { id: 998, text: "AWAITING UPLINK RESPONSE...", isBlinking: true }]);
        } else {
           setDisplayedLines(prev => [...prev, { id: 1000, text: "PREPARING REDIRECT..." }]);
           setIsComplete(true);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [error, redirectUrl]); // Re-run if error or url changes late

  // 4. REDIRECT TRIGGER
  useEffect(() => {
    if (isComplete && redirectUrl) {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    }
  }, [isComplete, redirectUrl]);

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>PROJECT <span style={styles.underscore}>_</span> LOKI</h1>
        <div style={styles.separator}></div>
      </div>

      {/* LOG OUTPUT */}
      <div style={styles.terminalBox}>
        {displayedLines.map((line) => (
          <div key={line.id} style={styles.logRow}>
            <span style={styles.timestamp}>[17:00:07]</span>
            <span style={styles.dollar}>$</span>
            <span style={{
              ...styles.message,
              color: line.isError ? '#ff0033' : '#00ff41', // RED if error
              textShadow: line.isError ? '0 0 10px #ff0033' : '0 0 5px rgba(0, 255, 65, 0.3)'
            }}>
              {line.text}
            </span>
          </div>
        ))}
        
        {/* If stuck, show manual link */}
        {isComplete && redirectUrl && (
          <div style={{ marginTop: '20px', fontSize: '12px', color: '#004d00' }}>
            [ <a href={redirectUrl} style={{color:'#00ff41'}}>CLICK_MANUALLY_IF_NO_REDIRECT</a> ]
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <span style={styles.footerText}>SECURITY LEVEL: ALPHA-9</span>
        <span style={styles.footerText}>ENCRYPTED CONNECTION</span>
        <span style={styles.footerText}>NODE: LOKI-01</span>
      </div>

    </div>
  );
};

// --- STYLES ---
const styles = {
  container: {
    height: '100vh', width: '100vw',
    backgroundColor: '#000000',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    fontFamily: '"Consolas", "Monaco", "Lucida Console", monospace',
    color: '#00ff41',
    overflow: 'hidden',
    position: 'relative'
  },
  header: { marginBottom: '60px', textAlign: 'center', width: '600px' },
  title: {
    fontSize: '28px', fontWeight: '900', letterSpacing: '12px', color: '#00ff41',
    textShadow: '0 0 15px rgba(0, 255, 65, 0.6)', margin: '0 0 20px 0'
  },
  underscore: { color: '#00cc33' },
  separator: {
    width: '100%', height: '1px',
    background: 'linear-gradient(90deg, transparent 0%, #00330d 50%, transparent 100%)',
    opacity: 0.8
  },
  terminalBox: {
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
    width: '750px', gap: '14px'
  },
  logRow: {
    display: 'flex', alignItems: 'center', gap: '16px', fontSize: '15px', lineHeight: '1.5'
  },
  timestamp: { color: '#004d00', fontWeight: 'normal', opacity: 0.8 },
  dollar: { color: '#00ff41', fontWeight: 'bold', textShadow: '0 0 8px rgba(0, 255, 65, 0.5)' },
  message: { letterSpacing: '0.5px' },
  
  footer: {
    position: 'absolute', bottom: '60px', width: '80%', maxWidth: '900px',
    display: 'flex', justifyContent: 'space-between', opacity: 0.4
  },
  footerText: {
    color: '#008f24', fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase'
  }
};

export default SecurityScan;