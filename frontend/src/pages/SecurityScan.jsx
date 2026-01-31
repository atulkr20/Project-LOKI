import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SecurityScan = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  
  // State
  const [lines, setLines] = useState([]);      // Completed lines
  const [currentLine, setCurrentLine] = useState(""); // Currently typing line
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  
  // Refs
  const bottomRef = useRef(null);
  const hasFetched = useRef(false);

  // 1. THE SCRIPT
  const script = [
    "INITIALIZING SYSTEM SCAN...",
    "ESTABLISHING SECURE CHANNEL...",
    "RESOLVING DESTINATION HOST...",
    "VERIFYING CRYPTOGRAPHIC HANDSHAKE...",
    "SYNCHRONIZING UPLINK PROTOCOLS...",
    "MONITORING USER BEHAVIOR...",
    "SESSION INTEGRITY: ACTIVE",
    "PREPARING REDIRECT..."
  ];

  // 2. FETCH URL (Silent Background Process)
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchUrl = async () => {
      try {
        const res = await fetch(`http://localhost:8000/url/resolve/${shortCode}`);
        if (res.ok) {
          const data = await res.json();
          setRedirectUrl(data.targetURL);
        } else {
          // If link not found, wait a moment then go to 404
          setTimeout(() => navigate("/404"), 2000); 
        }
      } catch (err) {
        console.error("Connection failed");
        // Optional: Stay on page and show red error if backend is down
      }
    };
    fetchUrl();
  }, [shortCode, navigate]);

  // 3. SMOOTH TYPEWRITER ENGINE
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId;

    const typeChar = () => {
      if (lineIndex >= script.length) {
        setIsComplete(true);
        return;
      }

      const targetLine = script[lineIndex];
      setCurrentLine(targetLine.substring(0, charIndex + 1));
      charIndex++;

      if (charIndex > targetLine.length) {
        // Line finished
        setLines(prev => [...prev, targetLine]);
        setCurrentLine(""); 
        lineIndex++;
        charIndex = 0;
        timeoutId = setTimeout(typeChar, 150); // Pause between lines
      } else {
        // Typing next char
        timeoutId = setTimeout(typeChar, 30); // Typing speed
      }
    };

    typeChar();
    return () => clearTimeout(timeoutId);
  }, []);

  // 4. FINAL REDIRECT
  useEffect(() => {
    if (isComplete && redirectUrl) {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 800);
    }
  }, [isComplete, redirectUrl]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [currentLine, lines]);

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>PROJECT <span style={{color: '#00cc33'}}>_</span> LOKI</h1>
        <div style={styles.separator}></div>
      </div>

      {/* LOG OUTPUT */}
      <div style={styles.terminalBox}>
        {lines.map((line, index) => (
          <div key={index} style={styles.logRow}>
            <span className="hidden-mobile" style={styles.timestamp}>[17:00:07]</span>
            <span style={styles.dollar}>$</span>
            <span style={{
              ...styles.message,
              color: line.includes("ACTIVE") ? '#fff' : '#00ff41',
              fontWeight: line.includes("ACTIVE") ? 'bold' : 'normal'
            }}>
              {line}
            </span>
          </div>
        ))}
        
        {/* Typing Line */}
        {!isComplete && (
          <div style={styles.logRow}>
            <span className="hidden-mobile" style={styles.timestamp}>[17:00:07]</span>
            <span style={styles.dollar}>$</span>
            <span style={styles.message}>{currentLine}</span>
            <span style={styles.cursor}>_</span>
          </div>
        )}
        
        <div ref={bottomRef} />
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <div style={styles.footerCol}>SEC: ALPHA-9</div>
        <div style={styles.footerCol}>ENCRYPTED</div>
        <div style={styles.footerCol}>NODE: LOKI-01</div>
      </div>

      {/* RESPONSIVE HACKS */}
      <style>{`
        @media (max-width: 600px) {
          .hidden-mobile { display: none !important; }
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

// --- RESPONSIVE STYLES ---
const styles = {
  container: {
    height: '100vh', width: '100vw',
    backgroundColor: '#000000',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    fontFamily: '"Consolas", "Monaco", "Lucida Console", monospace',
    color: '#00ff41',
    overflow: 'hidden',
    position: 'relative',
    padding: '20px',
    boxSizing: 'border-box'
  },
  header: {
    marginBottom: '5vh',
    textAlign: 'center',
    width: '100%', maxWidth: '600px'
  },
  title: {
    fontSize: 'clamp(24px, 5vw, 32px)',
    fontWeight: '900',
    letterSpacing: 'clamp(5px, 1vw, 12px)',
    color: '#00ff41',
    textShadow: '0 0 20px rgba(0, 255, 65, 0.4)',
    margin: '0 0 20px 0',
    whiteSpace: 'nowrap'
  },
  separator: {
    width: '100%', height: '1px',
    background: 'linear-gradient(90deg, transparent 0%, #00330d 50%, transparent 100%)',
    opacity: 0.8
  },
  terminalBox: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%', maxWidth: '750px',
    minHeight: '300px',
    gap: '12px',
    overflowY: 'auto'
  },
  logRow: {
    display: 'flex', alignItems: 'center', gap: '12px',
    fontSize: 'clamp(12px, 3vw, 16px)',
    lineHeight: '1.4',
    width: '100%',
    flexWrap: 'wrap'
  },
  timestamp: { color: '#004d00', fontWeight: 'normal', opacity: 0.8, whiteSpace: 'nowrap' },
  dollar: { color: '#00ff41', fontWeight: 'bold' },
  message: { color: '#00ff41', textShadow: '0 0 5px rgba(0, 255, 65, 0.3)', wordBreak: 'break-word' },
  cursor: { color: '#00ff41', animation: 'blink 1s step-end infinite', marginLeft: '5px' },
  
  footer: {
    position: 'absolute', bottom: '30px',
    width: '90%', maxWidth: '900px',
    display: 'flex', justifyContent: 'space-between',
    opacity: 0.3,
    fontSize: 'clamp(10px, 2vw, 12px)',
    fontWeight: 'bold',
    letterSpacing: '2px',
    textAlign: 'center'
  },
  footerCol: { minWidth: '80px' }
};

// Inject Global Keyframes for Blink
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
`;
document.head.appendChild(styleSheet);

export default SecurityScan;