import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Terminal, LogOut, ShieldCheck, ChevronRight, 
  Cpu, Hash, Activity, Check, Copy, AlertTriangle, XCircle, 
  BarChart2, Eye
} from "lucide-react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
  const isError = type === 'error';
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'rgba(0, 0, 0, 0.95)', border: `1px solid ${isError ? '#ff0033' : '#00ff41'}`, padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '12px', color: isError ? '#ff0033' : '#00ff41', fontFamily: '"Courier New", monospace', fontSize: '12px', fontWeight: 'bold', boxShadow: `0 0 20px ${isError ? 'rgba(255, 0, 51, 0.2)' : 'rgba(0, 255, 65, 0.2)'}`, zIndex: 1000, animation: 'slideIn 0.3s ease-out' }}>
      {isError ? <AlertTriangle size={18} /> : <Check size={18} />} <div>{message}</div> <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', marginLeft: '10px' }}><XCircle size={14} /></button>
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]); 
  const [toast, setToast] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isGlitching, setIsGlitching] = useState(false);

  const showToast = (message, type = 'success') => setToast({ message, type });
  const BASE_URL = "http://localhost:8000";

  const fetchWithTimeout = async (url, options, timeout = 15000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      if (error.name === 'AbortError') throw new Error("Connection timeout");
      throw error;
    }
  };

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/url/codes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data.codes)) {
         setHistory(data.codes);
      }
    } catch (error) {
      console.error("History fetch error:", error.message);
    }
  };

  const fetchAnalytics = async (shortCode) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/track/analytics/${shortCode}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setAnalyticsData(data);
        setShowAnalytics(true);
      }
    } catch (error) {
      console.error("Analytics fetch error:", error.message);
      showToast("FAILED_TO_FETCH_ANALYTICS", 'error');
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(() => fetchHistory(), 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!longUrl) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithTimeout(`${BASE_URL}/url/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ url: longUrl }), 
      });

      const data = await response.json();

      if (response.ok) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);

        const generatedLink = `${window.location.origin}/s/${data.shortCode}`;
        setShortUrl(generatedLink);
        
        const newEntry = { 
            id: data.id,
            shortCode: data.shortCode, 
            targetURL: data.targetURL, 
            visits: 0 
        };
        setHistory([newEntry, ...history]);
        setLongUrl(""); 
        showToast("[SYSTEM]: ASSET_SECURED. THE_GUEST_HAS_ARRIVED.");
      } else {
        showToast("ERROR: REJECTION_BY_LOKI", 'error');
      }
    } catch (error) {
      showToast("CONNECTION REFUSED", 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    showToast("DATA_BUFFER_COPIED");
    setTimeout(() => setCopied(false), 2000);
  };

  const closeAnalytics = () => {
    setShowAnalytics(false);
    setAnalyticsData(null);
  };

  return (
    <div style={styles.pageContainer}>
      {isGlitching && <div className="glitch-overlay" />}
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div style={styles.scanline}></div>
      <div style={styles.gridBackground}></div>

      {showAnalytics && analyticsData && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={{margin: 0, color: '#00ff41'}}>📊 BEHAVIORAL_ANALYSIS</h2>
              <button onClick={closeAnalytics} style={styles.closeButton}>✕</button>
            </div>
            
            <div style={styles.modalContent}>
              <div style={styles.analyticsSection}>
                <h3 style={styles.analyticsTitle}>LINK: {analyticsData.shortCode}</h3>
              </div>
              
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statValue}>{analyticsData.totalArrivals}</div>
                  <div style={styles.statLabel}>TOTAL ARRIVALS</div>
                </div>
                <div style={styles.statCard}>
                  <div style={{...styles.statValue, color: '#ff0033'}}>{analyticsData.quitRate}</div>
                  <div style={styles.statLabel}>QUIT RATE</div>
                </div>
                <div style={styles.statCard}>
                  <div style={{...styles.statValue, color: '#00ff41'}}>{analyticsData.completionRate}</div>
                  <div style={styles.statLabel}>COMPLETION RATE</div>
                </div>
              </div>

              <div style={styles.behaviorBreakdown}>
                <h4 style={styles.sectionTitle}>BEHAVIOR BREAKDOWN</h4>
                
                <div style={styles.behaviorRow}>
                  <span style={styles.behaviorLabel}>🛡️ COMPLETED SCAN</span>
                  <span style={styles.behaviorValue}>{analyticsData.totalCompleted}</span>
                </div>
                <div style={styles.behaviorRow}>
                  <span style={styles.behaviorLabel}>🚨 QUITS (DID NOT COMPLETE)</span>
                  <span style={styles.behaviorValue}>{analyticsData.totalQuits}</span>
                </div>
              </div>

              <div style={styles.timingInfo}>
                <div>Completion Rate: {analyticsData.completionRate}</div>
                <div>Quit Rate: {analyticsData.quitRate}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={styles.window}>
        <header style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Terminal size={18} color="#00ff41" />
            <span style={styles.logoText}>PROJECT LOKI</span>
          </div>
          <button onClick={handleLogout} style={styles.abortButton}>
            <LogOut size={12} /> ABORT_SESSION
          </button>
        </header>

        <div style={styles.body}>
          <div style={styles.leftPanel}>
            <div style={styles.bgIcon}><ShieldCheck size={200} /></div>
            <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
              <h2 style={styles.heading}><ChevronRight size={20} /> INITIALIZE INTERCEPT</h2>
              <p style={styles.subText}>Enter target URL for secure encryption.</p>

              <form onSubmit={handleShorten} style={{ marginTop: '2rem' }}>
                <div style={{ position: 'relative', marginBottom: '1.5rem', width: '100%' }}>
                  <span style={styles.inputLabel}>SOURCE:</span>
                  <input 
                    type="url" 
                    value={longUrl} 
                    onChange={(e) => setLongUrl(e.target.value)} 
                    placeholder="HTTPS://TARGET-SOURCE..." 
                    required 
                    style={styles.input} 
                  />
                </div>
                <button disabled={loading} style={styles.button}>
                  {loading ? <Cpu size={16} className="animate-spin" /> : <Hash size={16} />}
                  {loading ? "PROCESSING..." : "EXECUTE"}
                </button>
              </form>

              {shortUrl && (
                <div style={styles.resultBox}>
                  <div style={{ flex: 1, overflow: 'hidden', marginRight: '10px' }}>
                    <span style={{ fontSize: '10px', opacity: 0.5, color: '#ff0033' }}>GENERATED_PHRASE:</span>
                    <div className="loki-breathing-link" style={styles.resultLink}>{shortUrl}</div>
                  </div>
                  <button onClick={copyToClipboard} style={styles.copyButton}>
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={styles.rightPanel}>
            <div style={styles.statsHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00ff41' }}>
                <Activity size={16} /> <span style={{ fontWeight: 'bold' }}>NETWORK_STATS</span>
              </div>
            </div>

            <div style={styles.historyList}>
              {history.length === 0 ? (
                 <div style={{padding:'20px', opacity:0.3, fontSize:'10px'}}>NO_LOGS_FOUND...</div>
               ) : (
                 history.map((item, idx) => (
                    <div key={idx} style={styles.historyItem}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '10px', opacity: 0.5 }}>LOG_{idx + 1}</span>
                          <span style={styles.hitBadge}>HITS: {item.visits || 0}</span>
                      </div>
                      <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '11px', wordBreak: 'break-all' }}>{item.shortCode}</div>
                      <div style={{ fontSize: '10px', opacity: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.targetURL}</div>
                      
                      {/* Analytics Button */}
                      <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
                        <button 
                          onClick={() => fetchAnalytics(item.shortCode)}
                          style={styles.analyticsButton}
                        >
                          <BarChart2 size={12} /> ANALYZE
                        </button>
                        <button 
                          onClick={() => navigator.clipboard.writeText(`${window.location.origin}/s/${item.shortCode}`)}
                          style={styles.copyLinkButton}
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                    </div>
                 ))
               )}
            </div>
            <div style={styles.footerStatus}>SECURE CONNECTION ESTABLISHED</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        @keyframes shudder {
          0% { transform: translate(0,0); }
          25% { transform: translate(-5px, 5px) skew(1deg); }
          50% { transform: translate(5px, -5px) skew(-deg); }
          100% { transform: translate(0,0); }
        }
        .glitch-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(255, 0, 51, 0.25); z-index: 9999; pointer-events: none;
          animation: shudder 0.1s infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.02); opacity: 1; filter: brightness(1.4) drop-shadow(0 0 10px #ff0033); }
        }
        .loki-breathing-link {
          animation: breathe 2.5s ease-in-out infinite;
          word-break: break-all;
          color: #ff0033 !important;
        }
      `}</style>
    </div>
  );
}

// STYLES
const styles = {
  pageContainer: { height: '100vh', width: '100vw', backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Courier New", Courier, monospace', color: '#00ff41', overflow: 'hidden', position: 'relative' },
  gridBackground: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' },
  scanline: { position: 'absolute', top: 0, left: 0, right: 0, height: '100vh', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))', backgroundSize: '100% 4px', pointerEvents: 'none', zIndex: 5, opacity: 0.6 },
  window: { width: '1000px', height: '650px', backgroundColor: 'rgba(0, 0, 0, 0.9)', border: '1px solid rgba(0, 255, 65, 0.3)', boxShadow: '0 0 40px rgba(0, 255, 65, 0.15)', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10, borderRadius: '4px', backdropFilter: 'blur(10px)' },
  header: { height: '50px', borderBottom: '1px solid rgba(0, 255, 65, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', backgroundColor: 'rgba(0, 255, 65, 0.05)' },
  logoText: { fontWeight: 'bold', letterSpacing: '2px', textShadow: '0 0 10px rgba(0, 255, 65, 0.5)' },
  abortButton: { background: 'transparent', border: '1px solid rgba(0, 255, 65, 0.3)', color: '#00ff41', padding: '5px 10px', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' },
  body: { flex: 1, display: 'flex', overflow: 'hidden' },
  leftPanel: { width: '65%', borderRight: '1px solid rgba(0, 255, 65, 0.2)', padding: '40px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box' },
  bgIcon: { position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.05, pointerEvents: 'none', color: '#00ff41' },
  heading: { margin: 0, fontSize: '20px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '2px' },
  subText: { margin: '5px 0 0 32px', fontSize: '12px', opacity: 0.6 },
  inputLabel: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', fontWeight: 'bold', color: '#00ff41', opacity: 0.7 },
  input: { width: '100%', padding: '15px 15px 15px 70px', background: '#000', border: '1px solid rgba(0, 255, 65, 0.4)', color: '#00ff41', fontFamily: 'inherit', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
  button: { width: '100%', padding: '15px', background: '#00ff41', color: '#000', border: 'none', fontWeight: 'bold', letterSpacing: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' },
  resultBox: { marginTop: '20px', border: '1px solid #ff0033', background: 'rgba(255, 0, 51, 0.05)', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', width: '100%' },
  resultLink: { fontSize: '14px', fontWeight: 'bold', textShadow: '0 0 10px rgba(255, 0, 51, 0.5)', wordBreak: 'break-all' },
  copyButton: { background: 'none', border: '1px solid #ff0033', color: '#ff0033', padding: '8px', cursor: 'pointer' },
  rightPanel: { width: '35%', background: 'rgba(0, 0, 0, 0.3)', display: 'flex', flexDirection: 'column' },
  statsHeader: { padding: '20px', borderBottom: '1px solid rgba(0, 255, 65, 0.2)', background: 'rgba(0, 255, 65, 0.02)' },
  historyList: { flex: 1, overflowY: 'auto', padding: '20px' },
  historyItem: { padding: '10px', border: '1px solid rgba(0, 255, 65, 0.1)', background: 'rgba(0, 0, 0, 0.5)', marginBottom: '10px' },
  hitBadge: { fontSize: '9px', background: 'rgba(0, 255, 65, 0.1)', padding: '2px 4px', borderRadius: '2px', color: '#00ff41' },
  footerStatus: { padding: '10px', borderTop: '1px solid rgba(0, 255, 65, 0.2)', fontSize: '10px', opacity: 0.5, textAlign: 'center', background: 'rgba(0, 255, 65, 0.05)' },
  analyticsButton: { 
    flex: 1, 
    background: 'rgba(0, 255, 65, 0.1)', 
    border: '1px solid rgba(0, 255, 65, 0.3)', 
    color: '#00ff41', 
    padding: '5px', 
    fontSize: '10px', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: '5px',
    fontWeight: 'bold'
  },
  copyLinkButton: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#00ff41',
    padding: '5px 8px',
    fontSize: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    width: '500px',
    maxHeight: '80vh',
    backgroundColor: '#000',
    border: '1px solid #00ff41',
    boxShadow: '0 0 30px rgba(0, 255, 65, 0.2)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    borderBottom: '1px solid rgba(0, 255, 65, 0.3)',
    backgroundColor: 'rgba(0, 255, 65, 0.05)'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#ff0033',
    fontSize: '20px',
    cursor: 'pointer'
  },
  modalContent: {
    padding: '20px',
    overflowY: 'auto'
  },
  analyticsSection: {
    marginBottom: '20px'
  },
  analyticsTitle: {
    fontSize: '14px',
    color: '#fff',
    margin: 0
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '20px'
  },
  statCard: {
    border: '1px solid rgba(0, 255, 65, 0.2)',
    padding: '15px',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 20, 0, 0.3)'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff'
  },
  statLabel: {
    fontSize: '10px',
    opacity: 0.7,
    marginTop: '5px'
  },
  behaviorBreakdown: {
    border: '1px solid rgba(0, 255, 65, 0.2)',
    padding: '15px',
    marginBottom: '15px'
  },
  sectionTitle: {
    fontSize: '12px',
    color: '#00ff41',
    margin: '0 0 15px 0',
    borderBottom: '1px solid rgba(0, 255, 65, 0.2)',
    paddingBottom: '10px'
  },
  behaviorRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '12px'
  },
  behaviorLabel: {
    color: '#ccc'
  },
  behaviorValue: {
    color: '#00ff41',
    fontWeight: 'bold'
  },
  timingInfo: {
    fontSize: '10px',
    opacity: 0.6,
    textAlign: 'center'
  }
};
