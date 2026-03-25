import { useState, useEffect, useRef } from "react";

// ─── LOGO SVG ───────────────────────────────────────────────────────────────
function AndinaLogo({ size = "md", showText = true }) {
  const s = size === "xl" ? 80 : size === "lg" ? 56 : size === "md" ? 40 : 28;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: s * 0.12 }}>
      <svg viewBox="0 0 100 70" fill="none" style={{ width: s, height: s * 0.7 }}>
        <polygon points="50,5 68,42 32,42" fill="#52b788" />
        <polygon points="22,20 38,50 6,50" fill="#2d6a4f" />
        <polygon points="78,20 94,50 62,50" fill="#2d6a4f" />
        <rect x="4" y="52" width="92" height="3" rx="1.5" fill="#52b788" opacity="0.35" />
      </svg>
      {showText && (
        <div style={{ textAlign: "center", lineHeight: 1 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: s * 0.38, fontWeight: 400, letterSpacing: "0.18em", color: "white" }}>
            ANDINA
          </div>
          {size !== "sm" && (
            <div style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontSize: s * 0.14, fontWeight: 300, letterSpacing: "0.22em", color: "rgba(255,255,255,0.55)", marginTop: 2, textTransform: "uppercase" }}>
              Consultora Socioambiental
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── SPLASH SCREEN ───────────────────────────────────────────────────────────
function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1400);
    const t4 = setTimeout(() => onDone(), 2600);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);
  return (
    <div style={{ position: "fixed", inset: 0, background: "linear-gradient(160deg,#0d2818 0%,#1b4332 50%,#2d6a4f 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
        <AndinaLogo size="xl" showText={false} />
      </div>
      <div style={{ marginTop: 20, opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(12px)", transition: "all 0.6s ease 0.1s", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 42, fontWeight: 400, letterSpacing: "0.2em", color: "white" }}>ANDINA</div>
        <div style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontSize: 10, fontWeight: 300, letterSpacing: "0.3em", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>CONSULTORA SOCIOAMBIENTAL</div>
      </div>
      <div style={{ marginTop: 16, opacity: phase >= 3 ? 1 : 0, transition: "opacity 0.5s ease", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, fontStyle: "italic", color: "#52b788" }}>Campo Digital</div>
        <div style={{ marginTop: 16, width: 120, height: 2, background: "rgba(82,183,136,0.2)", borderRadius: 1, overflow: "hidden", margin: "14px auto 0" }}>
          <div style={{ height: "100%", background: "#52b788", width: phase >= 3 ? "100%" : "0%", transition: "width 0.9s ease", borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
const USERS = [
  { user: "gonzalo", pass: "1234", name: "Gonzalo", role: "admin" },
  { user: "laura", pass: "1234", name: "Laura", role: "operador" },
  { user: "equipo", pass: "andina", name: "Equipo", role: "operador" },
];

function LoginScreen({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      const found = USERS.find(u => u.user === user.toLowerCase().trim() && u.pass === pass);
      if (found) {
        onLogin(found);
      } else {
        setError("Usuario o contraseña incorrectos");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#0d2818,#1b4332)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ marginBottom: 40 }}><AndinaLogo size="lg" /></div>
      <div style={{ width: "100%", maxWidth: 340, background: "rgba(255,255,255,0.06)", borderRadius: 24, padding: 28, border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "#52b788", margin: "0 0 20px", textTransform: "uppercase" }}>Acceso del equipo</p>
        <input value={user} onChange={e => setUser(e.target.value)} placeholder="Usuario" style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: 14, marginBottom: 12, outline: "none", boxSizing: "border-box" }} />
        <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Contraseña" onKeyDown={e => e.key === "Enter" && handleLogin()} style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: 14, marginBottom: error ? 8 : 20, outline: "none", boxSizing: "border-box" }} />
        {error && <p style={{ color: "#f87171", fontFamily: "'Montserrat', sans-serif", fontSize: 12, margin: "0 0 14px" }}>{error}</p>}
        <button onClick={handleLogin} disabled={loading || !user || !pass} style={{ width: "100%", padding: "15px", background: loading ? "rgba(82,183,136,0.5)" : "linear-gradient(135deg,#2d6a4f,#52b788)", border: "none", borderRadius: 14, color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 15, cursor: loading ? "default" : "pointer", transition: "all 0.2s" }}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </div>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 32, textAlign: "center" }}>Solo personal autorizado de Andina</p>
    </div>
  );
}

// ─── PROJECT SELECT ────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: "p1", name: "Mina Los Andes", client: "Minera Sur S.A.", campaign: "Monitoreo Q1 2026", color: "#2d6a4f" },
  { id: "p2", name: "Río Blanco", client: "Energía Patagónica", campaign: "EIA Fase 2", color: "#1e5f44" },
  { id: "p3", name: "Cerro Negro", client: "Litio Andino S.A.", campaign: "Línea de base 2026", color: "#40916c" },
];

function ProjectSelect({ user, onSelect }) {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#0d2818,#1b4332)", padding: "40px 20px" }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "#52b788", margin: "0 0 4px" }}>BIENVENIDO/A</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 400, color: "white", margin: 0 }}>{user.name}</h1>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "4px 0 0" }}>Seleccioná el proyecto de hoy</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {PROJECTS.map(p => (
          <button key={p.id} onClick={() => onSelect(p)} style={{ background: `linear-gradient(135deg,${p.color},rgba(82,183,136,0.4))`, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "20px 22px", textAlign: "left", cursor: "pointer", transition: "transform 0.15s" }}
            onPointerDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.55)", margin: "0 0 4px" }}>{p.client.toUpperCase()}</p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 400, color: "white", margin: "0 0 4px" }}>{p.name}</p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>{p.campaign}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── DATA STORAGE ──────────────────────────────────────────────────────────────
let globalRecords = [];
let recordIdCounter = 1;

function saveRecord(type, data, user, project) {
  const record = {
    id: recordIdCounter++,
    type,
    data,
    operator: user.name,
    project: project.name,
    projectId: project.id,
    timestamp: new Date().toISOString(),
    synced: false,
  };
  globalRecords.push(record);
  return record;
}

function getTodayRecords(projectId) {
  const today = new Date().toDateString();
  return globalRecords.filter(r => r.projectId === projectId && new Date(r.timestamp).toDateString() === today);
}

// ─── HOME SCREEN ───────────────────────────────────────────────────────────────
function HomeScreen({ user, project, onNavigate, onChangeProject }) {
  const todayRecords = getTodayRecords(project.id);
  const counts = {
    encuesta: todayRecords.filter(r => r.type === "encuesta").length,
    censo: todayRecords.filter(r => r.type === "censo").length,
    agua: todayRecords.filter(r => r.type === "agua").length,
    aire: todayRecords.filter(r => r.type === "aire").length,
    suelo: todayRecords.filter(r => r.type === "suelo").length,
  };

  const modules = [
    { id: "encuesta", label: "Encuesta", sub: "Social", icon: "📋", color: "#2d6a4f", bg: "#d8f3dc" },
    { id: "censo", label: "Censo", sub: "Comunitario", icon: "🏘", color: "#1e5f44", bg: "#b7e4c7" },
    { id: "agua", label: "Monitoreo", sub: "Agua", icon: "💧", color: "#1a5276", bg: "#d6eaf8" },
    { id: "aire", label: "Monitoreo", sub: "Aire", icon: "💨", color: "#4a235a", bg: "#e8daef" },
    { id: "suelo", label: "Monitoreo", sub: "Suelo", icon: "🌱", color: "#784212", bg: "#fdebd0" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#f0faf4,#e8f5e9)", paddingBottom: 90 }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#1b4332,#2d6a4f)", padding: "50px 20px 24px", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg viewBox="0 0 100 70" fill="none" style={{ width: 28, height: 20 }}>
              <polygon points="50,5 68,42 32,42" fill="#52b788" />
              <polygon points="22,20 38,50 6,50" fill="#40916c" />
              <polygon points="78,20 94,50 62,50" fill="#40916c" />
            </svg>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: "white", letterSpacing: "0.1em" }}>ANDINA</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8, color: "rgba(255,255,255,0.45)", letterSpacing: "0.15em" }}>CAMPO DIGITAL</div>
            </div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "white", fontSize: 15 }}>
            {user.name[0].toUpperCase()}
          </div>
        </div>
        {/* Project card */}
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.12)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", margin: "0 0 2px" }}>PROYECTO ACTIVO</p>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, color: "white", margin: "0 0 2px", fontWeight: 400 }}>{project.name}</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.55)", margin: 0 }}>{project.campaign}</p>
            </div>
            <button onClick={onChangeProject} style={{ background: "rgba(82,183,136,0.2)", border: "1px solid rgba(82,183,136,0.3)", borderRadius: 10, padding: "6px 10px", color: "#74c69d", fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>
              ⇄ Cambiar
            </button>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, color: "white", margin: 0 }}>{todayRecords.length}</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.4)", margin: 0 }}>hoy</p>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, color: "#f59e0b", margin: 0 }}>{todayRecords.filter(r => r.data.alertas?.length > 0).length}</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.4)", margin: 0 }}>alertas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules grid */}
      <div style={{ padding: "20px 16px" }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "#74c69d", margin: "0 0 14px" }}>MÓDULOS DE REGISTRO</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {modules.map(m => (
            <button key={m.id} onClick={() => onNavigate(m.id)}
              style={{ background: "white", borderRadius: 18, padding: "18px 16px", textAlign: "left", border: "1.5px solid rgba(0,0,0,0.06)", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.15s, box-shadow 0.15s", position: "relative" }}
              onPointerDown={e => { e.currentTarget.style.transform = "scale(0.96)"; e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.08)"; }}
              onPointerUp={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}>
              {counts[m.id] > 0 && (
                <div style={{ position: "absolute", top: 12, right: 12, background: m.color, borderRadius: 10, padding: "2px 7px", fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, color: "white" }}>{counts[m.id]}</div>
              )}
              <div style={{ width: 44, height: 44, borderRadius: 14, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 10 }}>{m.icon}</div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#888", margin: "0 0 2px" }}>{m.label}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: "#1b4332", margin: 0, fontWeight: 400 }}>{m.sub}</p>
            </button>
          ))}
          <button onClick={() => onNavigate("plantillas")}
            style={{ background: "linear-gradient(135deg,#1b4332,#2d6a4f)", borderRadius: 18, padding: "18px 16px", textAlign: "left", border: "none", cursor: "pointer", boxShadow: "0 2px 12px rgba(27,67,50,0.2)", transition: "transform 0.15s" }}
            onPointerDown={e => e.currentTarget.style.transform = "scale(0.96)"}
            onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 10 }}>📝</div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.55)", margin: "0 0 2px" }}>Constructor</p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: "white", margin: 0, fontWeight: 400 }}>Plantillas</p>
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav active="home" onNavigate={onNavigate} historialCount={todayRecords.length} />
    </div>
  );
}

// ─── BOTTOM NAV ────────────────────────────────────────────────────────────────
function BottomNav({ active, onNavigate, historialCount = 0 }) {
  const items = [
    { id: "home", icon: "⌂", label: "Inicio" },
    { id: "plantillas", icon: "📝", label: "Plantillas" },
    { id: "qr", icon: "▣", label: "QR" },
    { id: "historial", icon: "☰", label: "Historial", badge: historialCount },
  ];
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid rgba(0,0,0,0.08)", padding: "10px 0 20px", display: "flex", justifyContent: "space-around", zIndex: 50, boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onNavigate(item.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 16px", position: "relative" }}>
          {item.badge > 0 && (
            <div style={{ position: "absolute", top: -2, right: 8, background: "#2d6a4f", borderRadius: 8, padding: "1px 5px", fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 700, color: "white" }}>{item.badge}</div>
          )}
          <span style={{ fontSize: 20, opacity: active === item.id ? 1 : 0.35 }}>{item.icon}</span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: active === item.id ? 700 : 400, color: active === item.id ? "#1b4332" : "#999", letterSpacing: "0.05em" }}>{item.label.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

// ─── AGUA NORMS ────────────────────────────────────────────────────────────────
const AGUA_PARAMS = [
  { id: "ph", label: "pH", unit: "", min: 6.5, max: 8.5, norm: "Ley 25.688" },
  { id: "turbidez", label: "Turbidez", unit: "NTU", min: 0, max: 5, norm: "Res. SAyDS 97/2001" },
  { id: "oxigeno", label: "Oxígeno disuelto", unit: "mg/L", min: 5, max: 20, norm: "Ley 25.688" },
  { id: "conductividad", label: "Conductividad", unit: "µS/cm", min: 0, max: 1500, norm: "Res. SAyDS 97/2001" },
  { id: "temp", label: "Temperatura", unit: "°C", min: 0, max: 30, norm: "Ley 25.688" },
];
const AIRE_PARAMS = [
  { id: "pm25", label: "PM 2.5", unit: "µg/m³", min: 0, max: 25, norm: "Ley 20.284" },
  { id: "pm10", label: "PM 10", unit: "µg/m³", min: 0, max: 50, norm: "Ley 20.284" },
  { id: "ruido", label: "Ruido", unit: "dB", min: 0, max: 65, norm: "Res. MAyDS 91/2003" },
  { id: "co", label: "CO", unit: "ppm", min: 0, max: 9, norm: "Ley 20.284" },
];
const SUELO_PARAMS = [
  { id: "ph_suelo", label: "pH del suelo", unit: "", min: 5.5, max: 8, norm: "Ley 24.051" },
  { id: "cobertura", label: "Cobertura vegetal", unit: "%", min: 30, max: 100, norm: "Ley 22.351" },
  { id: "erosion", label: "Erosión", unit: "nivel 1-5", min: 0, max: 2, norm: "Ley 22.428" },
  { id: "compactacion", label: "Compactación", unit: "MPa", min: 0, max: 2, norm: "Ley 24.051" },
];

// ─── MONITORING FORM ──────────────────────────────────────────────────────────
function MonitoringForm({ type, user, project, onDone }) {
  const configs = { agua: { label: "Agua", icon: "💧", color: "#1a5276", params: AGUA_PARAMS }, aire: { label: "Aire", icon: "💨", color: "#4a235a", params: AIRE_PARAMS }, suelo: { label: "Suelo", icon: "🌱", color: "#784212", params: SUELO_PARAMS } };
  const cfg = configs[type];
  const [values, setValues] = useState({});
  const [lugar, setLugar] = useState("");
  const [obs, setObs] = useState("");
  const [saved, setSaved] = useState(false);

  const alertas = cfg.params.filter(p => {
    const v = parseFloat(values[p.id]);
    return !isNaN(v) && (v < p.min || v > p.max);
  });

  const handleSave = () => {
    saveRecord(type, { tipo: cfg.label, lugar, valores: values, observaciones: obs, alertas: alertas.map(a => a.label) }, user, project);
    setSaved(true);
  };

  if (saved) return (
    <div style={{ minHeight: "100vh", background: "#f0faf4", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: "#1b4332", margin: "0 0 8px" }}>Registro guardado</h2>
      {alertas.length > 0 && <div style={{ background: "#fef3cd", border: "1px solid #f59e0b", borderRadius: 14, padding: "12px 16px", margin: "12px 0", maxWidth: 320 }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700, color: "#92400e", margin: "0 0 6px" }}>⚠️ {alertas.length} alerta{alertas.length > 1 ? "s" : ""} detectada{alertas.length > 1 ? "s" : ""}</p>
        {alertas.map(a => <p key={a.id} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#92400e", margin: "2px 0" }}>{a.label} fuera de norma ({a.norm})</p>)}
      </div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 300, marginTop: 20 }}>
        <button onClick={() => { setValues({}); setLugar(""); setObs(""); setSaved(false); }} style={{ padding: 14, background: `linear-gradient(135deg,${cfg.color},rgba(82,183,136,0.8))`, border: "none", borderRadius: 14, color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Nuevo registro {cfg.icon}</button>
        <button onClick={onDone} style={{ padding: 14, background: "rgba(27,67,50,0.08)", border: "1px solid rgba(27,67,50,0.12)", borderRadius: 14, color: "#1b4332", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>← Volver al inicio</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f0faf4", paddingBottom: 30 }}>
      <div style={{ background: `linear-gradient(135deg,${cfg.color},rgba(82,183,136,0.6))`, padding: "50px 20px 24px" }}>
        <button onClick={onDone} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "6px 12px", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: 12, cursor: "pointer", marginBottom: 16 }}>← Volver</button>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)", margin: "0 0 4px" }}>MONITOREO</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 400, color: "white", margin: 0 }}>{cfg.icon} {cfg.label}</h1>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", margin: "4px 0 0" }}>{project.name} · {user.name}</p>
      </div>
      <div style={{ padding: "20px 16px" }}>
        <input value={lugar} onChange={e => setLugar(e.target.value)} placeholder="Lugar / punto de muestreo *" style={{ width: "100%", padding: "14px 16px", background: "white", border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: 12, fontFamily: "'Montserrat', sans-serif", fontSize: 14, outline: "none", marginBottom: 16, boxSizing: "border-box" }} />
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.15em", color: "#74c69d", margin: "0 0 12px" }}>PARÁMETROS</p>
        {cfg.params.map(p => {
          const v = parseFloat(values[p.id]);
          const outOfRange = !isNaN(v) && (v < p.min || v > p.max);
          return (
            <div key={p.id} style={{ background: "white", borderRadius: 16, padding: "16px", marginBottom: 10, border: outOfRange ? "1.5px solid #f59e0b" : "1.5px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600, color: "#1b4332", margin: 0 }}>{p.label}</p>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#999", margin: "2px 0 0" }}>Norma: {p.norm} · Límite: {p.min}–{p.max} {p.unit}</p>
                </div>
                {outOfRange && <span style={{ background: "#fef3cd", color: "#92400e", borderRadius: 8, padding: "3px 8px", fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700 }}>⚠️ Alerta</span>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="number" value={values[p.id] || ""} onChange={e => setValues({ ...values, [p.id]: e.target.value })} placeholder="0.00" style={{ flex: 1, padding: "12px 14px", background: "#f8faf9", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, outline: "none", color: "#1b4332" }} />
                {p.unit && <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#888", minWidth: 40 }}>{p.unit}</span>}
              </div>
            </div>
          );
        })}
        <textarea value={obs} onChange={e => setObs(e.target.value)} placeholder="Observaciones (opcional)" rows={3} style={{ width: "100%", padding: "14px 16px", background: "white", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 14, fontFamily: "'Montserrat', sans-serif", fontSize: 13, outline: "none", marginTop: 6, resize: "none", boxSizing: "border-box" }} />
        <button onClick={handleSave} disabled={!lugar} style={{ width: "100%", marginTop: 16, padding: "16px", background: lugar ? `linear-gradient(135deg,${cfg.color},rgba(82,183,136,0.8))` : "#ddd", border: "none", borderRadius: 16, color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, cursor: lugar ? "pointer" : "default" }}>
          Guardar registro {cfg.icon}
        </button>
      </div>
    </div>
  );
}

// ─── SURVEY FORM ───────────────────────────────────────────────────────────────
let templates = [
  { id: "t1", name: "Encuesta - Los Molles", community: "Los Molles", locked: false, version: 1, questions: [
    { id: "q1", type: "texto", text: "¿Cuál es su nombre completo?", required: false },
    { id: "q2", type: "unica", text: "¿Cuál es su actividad principal?", required: true, options: ["Agricultura", "Ganadería", "Minería", "Comercio", "Otra"] },
    { id: "q3", type: "multiple", text: "¿Con qué servicios cuenta su hogar?", required: false, options: ["Agua corriente", "Gas natural", "Electricidad", "Internet"] },
    { id: "q4", type: "sino", text: "¿Conoce las actividades mineras en la zona?", required: true },
    { id: "q5", type: "numero", text: "¿Cuántas personas viven en el hogar?", required: true },
  ]},
];
let templateIdCounter = 10;
let questionIdCounter = 100;

function SurveyForm({ user, project, onDone }) {
  const [step, setStep] = useState("select");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleAnswer = (qid, value) => setAnswers({ ...answers, [qid]: value });

  const handleSave = () => {
    saveRecord("encuesta", { comunidad: selectedTemplate.community, plantilla: selectedTemplate.name, respuestas: answers, alertas: [] }, user, project);
    setSaved(true);
  };

  if (step === "select") return (
    <div style={{ minHeight: "100vh", background: "#f0faf4", paddingBottom: 30 }}>
      <div style={{ background: "linear-gradient(135deg,#1b4332,#2d6a4f)", padding: "50px 20px 24px" }}>
        <button onClick={onDone} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "6px 12px", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: 12, cursor: "pointer", marginBottom: 16 }}>← Volver</button>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "white", margin: 0 }}>📋 Encuesta Social</h1>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", margin: "4px 0 0" }}>Elegí la plantilla de la comunidad</p>
      </div>
      <div style={{ padding: "20px 16px" }}>
        {templates.map(t => (
          <button key={t.id} onClick={() => { setSelectedTemplate(t); setStep("form"); }} style={{ width: "100%", background: "white", border: "1.5px solid rgba(0,0,0,0.06)", borderRadius: 18, padding: "18px 20px", textAlign: "left", cursor: "pointer", marginBottom: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#74c69d", margin: "0 0 4px", letterSpacing: "0.1em" }}>{t.locked ? "🔒 BLOQUEADO" : `v${t.version}`}</p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, color: "#1b4332", margin: "0 0 4px" }}>{t.name}</p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#999", margin: 0 }}>{t.questions.length} preguntas</p>
          </button>
        ))}
      </div>
    </div>
  );

  const q = selectedTemplate.questions;
  const cq = q[currentQ];

  if (saved) return (
    <div style={{ minHeight: "100vh", background: "#f0faf4", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: "#1b4332", margin: "0 0 8px" }}>Encuesta guardada</h2>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#666", margin: "0 0 24px" }}>{selectedTemplate.community}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 280 }}>
        <button onClick={() => { setAnswers({}); setCurrentQ(0); setSaved(false); setStep("select"); }} style={{ padding: 14, background: "linear-gradient(135deg,#1b4332,#2d6a4f)", border: "none", borderRadius: 14, color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Nueva encuesta 📋</button>
        <button onClick={onDone} style={{ padding: 14, background: "rgba(27,67,50,0.08)", border: "1px solid rgba(27,67,50,0.12)", borderRadius: 14, color: "#1b4332", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>← Inicio</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f0faf4" }}>
      <div style={{ background: "linear-gradient(135deg,#1b4332,#2d6a4f)", padding: "50px 20px 20px" }}>
        <button onClick={() => currentQ === 0 ? setStep("select") : setCurrentQ(currentQ - 1)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "6px 12px", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: 12, cursor: "pointer", marginBottom: 16 }}>← {currentQ === 0 ? "Plantillas" : "Anterior"}</button>
        <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
          {q.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= currentQ ? "#52b788" : "rgba(255,255,255,0.2)" }} />)}
        </div>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.55)", margin: "0 0 4px" }}>{currentQ + 1} de {q.length} · {selectedTemplate.community}</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 400, color: "white", margin: 0 }}>{cq.text}</h2>
        {cq.required && <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#f59e0b", margin: "6px 0 0" }}>* Obligatoria</p>}
      </div>
      <div style={{ padding: "24px 16px" }}>
        {cq.type === "texto" && <textarea value={answers[cq.id] || ""} onChange={e => handleAnswer(cq.id, e.target.value)} placeholder="Escribí tu respuesta..." rows={4} style={{ width: "100%", padding: "16px", background: "white", border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: 16, fontFamily: "'Montserrat', sans-serif", fontSize: 15, outline: "none", resize: "none", boxSizing: "border-box" }} />}
        {cq.type === "numero" && <input type="number" value={answers[cq.id] || ""} onChange={e => handleAnswer(cq.id, e.target.value)} placeholder="0" style={{ width: "100%", padding: "20px 16px", background: "white", border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: 16, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, outline: "none", textAlign: "center", boxSizing: "border-box" }} />}
        {cq.type === "sino" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {["Sí", "No"].map(opt => (
              <button key={opt} onClick={() => handleAnswer(cq.id, opt)} style={{ padding: "24px", background: answers[cq.id] === opt ? "#1b4332" : "white", border: `2px solid ${answers[cq.id] === opt ? "#1b4332" : "rgba(0,0,0,0.1)"}`, borderRadius: 18, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: answers[cq.id] === opt ? "white" : "#1b4332", cursor: "pointer" }}>{opt}</button>
            ))}
          </div>
        )}
        {(cq.type === "unica" || cq.type === "multiple") && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {cq.options.map(opt => {
              const sel = cq.type === "unica" ? answers[cq.id] === opt : (answers[cq.id] || []).includes(opt);
              return (
                <button key={opt} onClick={() => {
                  if (cq.type === "unica") handleAnswer(cq.id, opt);
                  else { const arr = answers[cq.id] || []; handleAnswer(cq.id, sel ? arr.filter(x => x !== opt) : [...arr, opt]); }
                }} style={{ padding: "16px 20px", background: sel ? "#1b4332" : "white", border: `2px solid ${sel ? "#1b4332" : "rgba(0,0,0,0.1)"}`, borderRadius: 14, textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: sel ? "white" : "#333", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 20, height: 20, borderRadius: cq.type === "unica" ? "50%" : 6, border: `2px solid ${sel ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, color: "white", background: sel ? "rgba(255,255,255,0.2)" : "transparent" }}>{sel ? "✓" : ""}</span>
                  {opt}
                </button>
              );
            })}
          </div>
        )}
        <div style={{ marginTop: 24 }}>
          {currentQ < q.length - 1 ? (
            <button onClick={() => setCurrentQ(currentQ + 1)} disabled={cq.required && !answers[cq.id]} style={{ width: "100%", padding: "16px", background: (cq.required && !answers[cq.id]) ? "#ddd" : "linear-gradient(135deg,#1b4332,#2d6a4f)", border: "none", borderRadius: 16, color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, cursor: (cq.required && !answers[cq.id]) ? "default" : "pointer" }}>Siguiente →</button>
          ) : (
            <button onClick={handleSave} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg,#1b4332,#52b788)", border: "none", borderRadius: 16, color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>✅ Guardar encuesta</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CENSUS FORM ───────────────────────────────────────────────────────────────
function CensoForm({ user, project, onDone }) {
  const [data, setData] = useState({ nombre: "", apellido: "", edad: "", genero: "", actividad: "", servicios: [], observaciones: "" });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveRecord("censo", { ...data, alertas: [] }, user, project);
    setSaved(true);
  };

  if (saved) return (
    <div style={{ minHeight: "100vh", background: "#f0faf4", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: "#1b4332", margin: "0 0 8px" }}>Registro guardado</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 280, marginTop: 20 }}>
        <button onClick={() => { setData({ nombre: "", apellido: "", edad: "", genero: "", actividad: "", servicios: [], observaciones: "" }); setSaved(false); }} style={{ padding: 14, background: "linear-gradient(135deg,#1e5f44,#2d6a4f)", border: "none", borderRadius: 14, color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Nuevo registro 🏘</button>
        <button onClick={onDone} style={{ padding: 14, background: "rgba(27,67,50,0.08)", border: "1px solid rgba(27,67,50,0.12)", borderRadius: 14, color: "#1b4332", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>← Inicio</button>
      </div>
    </div>
  );

  const toggleServicio = (s) => {
    const arr = data.servicios.includes(s) ? data.servicios.filter(x => x !== s) : [...data.servicios, s];
    setData({ ...data, servicios: arr });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0faf4", paddingBottom: 30 }}>
      <div style={{ background: "linear-gradient(135deg,#1e5f44,#2d6a4f)", padding: "50px 20px 24px" }}>
        <button onClick={onDone} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "6px 12px", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: 12, cursor: "pointer", marginBottom: 16 }}>← Volver</button>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "white", margin: 0 }}>🏘 Censo Comunitario</h1>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", margin: "4px 0 0" }}>Datos opcionales — protegidos por Ley 25.326</p>
      </div>
      <div style={{ padding: "20px 16px" }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "#74c69d", margin: "0 0 10px" }}>DATOS DEL HOGAR (OPCIONALES)</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          <input value={data.nombre} onChange={e => setData({ ...data, nombre: e.target.value })} placeholder="Nombre" style={{ padding: "12px 14px", background: "white", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 12, fontFamily: "'Montserrat', sans-serif", fontSize: 14, outline: "none" }} />
          <input value={data.apellido} onChange={e => setData({ ...data, apellido: e.target.value })} placeholder="Apellido" style={{ padding: "12px 14px", background: "white", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 12, fontFamily: "'Montserrat', sans-serif", fontSize: 14, outline: "none" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          <input type="number" value={data.edad} onChange={e => setData({ ...data, edad: e.target.value })} placeholder="Edad" style={{ padding: "12px 14px", background: "white", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 12, fontFamily: "'Montserrat', sans-serif", fontSize: 14, outline: "none" }} />
          <select value={data.genero} onChange={e => setData({ ...data, genero: e.target.value })} style={{ padding: "12px 14px", background: "white", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 12, fontFamily: "'Montserrat', sans-serif", fontSize: 14, outline: "none", color: data.genero ? "#333" : "#aaa" }}>
            <option value="">Género</option>
            <option>Masculino</option><option>Femenino</option><option>Otro</option><option>Prefiero no decir</option>
          </select>
        </div>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "#74c69d", margin: "16px 0 10px" }}>ACTIVIDAD PRINCIPAL</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {["Agricultura", "Ganadería", "Minería", "Comercio", "Educación", "Otra"].map(a => (
            <button key={a} onClick={() => setData({ ...data, actividad: a })} style={{ padding: "8px 14px", background: data.actividad === a ? "#1b4332" : "white", border: `1.5px solid ${data.actividad === a ? "#1b4332" : "rgba(0,0,0,0.1)"}`, borderRadius: 20, fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: data.actividad === a ? "white" : "#555", cursor: "pointer" }}>{a}</button>
          ))}
        </div>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "#74c69d", margin: "0 0 10px" }}>SERVICIOS DEL HOGAR</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {["Agua corriente", "Gas natural", "Electricidad", "Internet", "Saneamiento"].map(s => (
            <button key={s} onClick={() => toggleServicio(s)} style={{ padding: "8px 14px", background: data.servicios.includes(s) ? "#1b4332" : "white", border: `1.5px solid ${data.servicios.includes(s) ? "#1b4332" : "rgba(0,0,0,0.1)"}`, borderRadius: 20, fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: data.servicios.includes(s) ? "white" : "#555", cursor: "pointer" }}>{s}</button>
          ))}
        </div>
        <textarea value={data.observaciones} onChange={e => setData({ ...data, observaciones: e.target.value })} placeholder="Observaciones (opcional)" rows={3} style={{ width: "100%", padding: "14px 16px", background: "white", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 14, fontFamily: "'Montserrat', sans-serif", fontSize: 13, outline: "none", resize: "none", marginBottom: 16, boxSizing: "border-box" }} />
        <button onClick={handleSave} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg,#1e5f44,#2d6a4f)", border: "none", borderRadius: 16, color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>✅ Guardar registro</button>
      </div>
    </div>
  );
}

// ─── HISTORIAL ─────────────────────────────────────────────────────────────────
function Historial({ project, onDone }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const todayRecs = getTodayRecords(project.id);
  const typeIcons = { encuesta: "📋", censo: "🏘", agua: "💧", aire: "💨", suelo: "🌱" };
  const typeLabels = { encuesta: "Encuesta Social", censo: "Censo", agua: "Monitoreo Agua", aire: "Monitoreo Aire", suelo: "Monitoreo Suelo" };

  const filtered = todayRecs.filter(r => {
    const matchesFilter = filter === "all" || r.type === filter;
    const matchesSearch = !search || JSON.stringify(r.data).toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }).reverse();

  return (
    <div style={{ minHeight: "100vh", background: "#f0faf4", paddingBottom: 90 }}>
      <div style={{ background: "linear-gradient(135deg,#1b4332,#2d6a4f)", padding: "50px 20px 20px" }}>
        <button onClick={onDone} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "6px 12px", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: 12, cursor: "pointer", marginBottom: 16 }}>← Volver</button>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "white", margin: "0 0 16px" }}>Historial de hoy</h1>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Buscar..." style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
          {[["all", "Todos"], ["encuesta", "📋"], ["censo", "🏘"], ["agua", "💧"], ["aire", "💨"], ["suelo", "🌱"]].map(([id, label]) => (
            <button key={id} onClick={() => setFilter(id)} style={{ padding: "6px 14px", background: filter === id ? "#1b4332" : "white", border: `1.5px solid ${filter === id ? "#1b4332" : "rgba(0,0,0,0.1)"}`, borderRadius: 20, fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: filter === id ? "white" : "#666", cursor: "pointer", flexShrink: 0 }}>{label}</button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>📭</p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, color: "#1b4332" }}>Sin registros aún</p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#999" }}>Los registros del día aparecen acá</p>
          </div>
        ) : filtered.map(r => (
          <div key={r.id} style={{ background: "white", borderRadius: 16, padding: "16px", marginBottom: 10, border: "1.5px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, color: "#1b4332", margin: "0 0 2px" }}>{typeIcons[r.type]} {typeLabels[r.type]}</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#999", margin: 0 }}>{r.operator} · {new Date(r.timestamp).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {r.data.alertas?.length > 0 && <span style={{ background: "#fef3cd", color: "#92400e", borderRadius: 8, padding: "3px 8px", fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700 }}>⚠️ {r.data.alertas.length}</span>}
                <span style={{ background: "#d8f3dc", color: "#2d6a4f", borderRadius: 8, padding: "3px 8px", fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700 }}>🟡 Local</span>
              </div>
            </div>
            {r.data.lugar && <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#555", margin: "8px 0 0" }}>📍 {r.data.lugar}</p>}
            {r.data.comunidad && <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#555", margin: "8px 0 0" }}>🏘 {r.data.comunidad}</p>}
          </div>
        ))}
      </div>
      <BottomNav active="historial" onNavigate={id => id === "home" && onDone()} historialCount={todayRecs.length} />
    </div>
  );
}

// ─── PLANTILLAS ────────────────────────────────────────────────────────────────
function Plantillas({ onDone }) {
  const [view, setView] = useState("list");
  const [editing, setEditing] = useState(null);
  const [newName, setNewName] = useState("");
  const [newCommunity, setNewCommunity] = useState("");
  const [, forceUpdate] = useState(0);

  const handleNew = () => {
    const t = { id: `t${templateIdCounter++}`, name: newName, community: newCommunity, locked: false, version: 1, questions: [] };
    templates.push(t);
    setEditing(t);
    setView("edit");
    setNewName(""); setNewCommunity("");
  };

  const addQuestion = (type) => {
    const q = { id: `q${questionIdCounter++}`, type, text: "Nueva pregunta", required: false, options: type === "unica" || type === "multiple" ? ["Opción 1", "Opción 2"] : undefined };
    editing.questions.push(q);
    forceUpdate(n => n + 1);
  };

  const toggleLock = (t) => { t.locked = !t.locked; if (!t.locked) t.version++; forceUpdate(n => n + 1); };

  if (view === "list") return (
    <div style={{ minHeight: "100vh", background: "#f0faf4", paddingBottom: 90 }}>
      <div style={{ background: "linear-gradient(135deg,#1b4332,#2d6a4f)", padding: "50px 20px 24px" }}>
        <button onClick={onDone} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "6px 12px", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: 12, cursor: "pointer", marginBottom: 16 }}>← Volver</button>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "white", margin: 0 }}>📝 Plantillas</h1>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", margin: "4px 0 0" }}>Constructor de formularios por comunidad</p>
      </div>
      <div style={{ padding: "20px 16px" }}>
        <div style={{ background: "white", borderRadius: 16, padding: "16px", marginBottom: 16, border: "1.5px solid rgba(0,0,0,0.06)" }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.15em", color: "#74c69d", margin: "0 0 12px" }}>NUEVA PLANTILLA</p>
          <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nombre (ej: Encuesta Los Molles)" style={{ width: "100%", padding: "12px 14px", background: "#f8faf9", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, fontFamily: "'Montserrat', sans-serif", fontSize: 13, outline: "none", marginBottom: 8, boxSizing: "border-box" }} />
          <input value={newCommunity} onChange={e => setNewCommunity(e.target.value)} placeholder="Comunidad" style={{ width: "100%", padding: "12px 14px", background: "#f8faf9", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, fontFamily: "'Montserrat', sans-serif", fontSize: 13, outline: "none", marginBottom: 10, boxSizing: "border-box" }} />
          <button onClick={handleNew} disabled={!newName || !newCommunity} style={{ width: "100%", padding: "12px", background: newName && newCommunity ? "linear-gradient(135deg,#1b4332,#2d6a4f)" : "#ddd", border: "none", borderRadius: 12, color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 14, cursor: newName && newCommunity ? "pointer" : "default" }}>+ Crear plantilla</button>
        </div>
        {templates.map(t => (
          <div key={t.id} style={{ background: "white", borderRadius: 16, padding: "16px", marginBottom: 10, border: "1.5px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: t.locked ? "#f59e0b" : "#74c69d", margin: "0 0 2px", fontWeight: 700 }}>{t.locked ? "🔒 BLOQUEADO · v" : "✏️ EDITABLE · v"}{t.version}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, color: "#1b4332", margin: "0 0 2px" }}>{t.name}</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#999", margin: 0 }}>{t.questions.length} preguntas · {t.community}</p>
              </div>
              <button onClick={() => toggleLock(t)} style={{ background: t.locked ? "#fef3cd" : "#d8f3dc", border: "none", borderRadius: 10, padding: "6px 10px", fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, color: t.locked ? "#92400e" : "#1b4332", cursor: "pointer" }}>
                {t.locked ? "🔓 Desbloquear" : "🔒 Bloquear"}
              </button>
            </div>
            {!t.locked && <button onClick={() => { setEditing(t); setView("edit"); }} style={{ width: "100%", padding: "10px", background: "rgba(27,67,50,0.06)", border: "1px solid rgba(27,67,50,0.1)", borderRadius: 10, fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#1b4332", cursor: "pointer", fontWeight: 600 }}>Editar preguntas →</button>}
          </div>
        ))}
      </div>
      <BottomNav active="plantillas" onNavigate={id => id === "home" && onDone()} />
    </div>
  );

  // Edit view
  const qTypes = [{ id: "texto", label: "Texto libre" }, { id: "numero", label: "Número" }, { id: "unica", label: "Opción única" }, { id: "multiple", label: "Múltiple" }, { id: "sino", label: "Sí / No" }];
  return (
    <div style={{ minHeight: "100vh", background: "#f0faf4", paddingBottom: 30 }}>
      <div style={{ background: "linear-gradient(135deg,#1b4332,#2d6a4f)", padding: "50px 20px 24px" }}>
        <button onClick={() => setView("list")} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "6px 12px", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: 12, cursor: "pointer", marginBottom: 16 }}>← Plantillas</button>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 400, color: "white", margin: 0 }}>✏️ {editing.name}</h1>
      </div>
      <div style={{ padding: "16px" }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.15em", color: "#74c69d", margin: "0 0 10px" }}>AGREGAR PREGUNTA</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {qTypes.map(qt => (
            <button key={qt.id} onClick={() => addQuestion(qt.id)} style={{ padding: "8px 14px", background: "white", border: "1.5px solid rgba(27,67,50,0.2)", borderRadius: 20, fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#1b4332", cursor: "pointer", fontWeight: 600 }}>+ {qt.label}</button>
          ))}
        </div>
        {editing.questions.map((q, i) => (
          <div key={q.id} style={{ background: "white", borderRadius: 16, padding: "14px", marginBottom: 10, border: "1.5px solid rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, color: "#74c69d", background: "#d8f3dc", padding: "3px 8px", borderRadius: 8 }}>{q.type.toUpperCase()}</span>
              <button onClick={() => { editing.questions.splice(i, 1); forceUpdate(n => n + 1); }} style={{ background: "#fde8e8", border: "none", borderRadius: 8, padding: "4px 8px", color: "#c0392b", fontFamily: "'Montserrat', sans-serif", fontSize: 11, cursor: "pointer" }}>✕</button>
            </div>
            <input value={q.text} onChange={e => { q.text = e.target.value; forceUpdate(n => n + 1); }} style={{ width: "100%", padding: "10px 12px", background: "#f8faf9", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, fontFamily: "'Montserrat', sans-serif", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            {(q.type === "unica" || q.type === "multiple") && (
              <div style={{ marginTop: 8 }}>
                {q.options.map((opt, oi) => (
                  <div key={oi} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <input value={opt} onChange={e => { q.options[oi] = e.target.value; forceUpdate(n => n + 1); }} style={{ flex: 1, padding: "8px 10px", background: "#f8faf9", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, fontFamily: "'Montserrat', sans-serif", fontSize: 12, outline: "none" }} />
                    <button onClick={() => { q.options.splice(oi, 1); forceUpdate(n => n + 1); }} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 16 }}>✕</button>
                  </div>
                ))}
                <button onClick={() => { q.options.push("Nueva opción"); forceUpdate(n => n + 1); }} style={{ background: "none", border: "1px dashed rgba(0,0,0,0.15)", borderRadius: 8, padding: "6px 12px", fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#999", cursor: "pointer" }}>+ Agregar opción</button>
              </div>
            )}
          </div>
        ))}
        <button onClick={() => setView("list")} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg,#1b4332,#2d6a4f)", border: "none", borderRadius: 16, color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 8 }}>✅ Guardar plantilla</button>
      </div>
    </div>
  );
}

// ─── QR SCREEN ─────────────────────────────────────────────────────────────────
function QRScreen({ project, onDone }) {
  const qrData = `https://andina-campo-digital.vercel.app/cliente/${project.id}`;
  const size = 200;
  const cellSize = Math.floor(size / 21);

  // Simple QR pattern (visual representation)
  const pattern = Array.from({ length: 21 }, (_, r) =>
    Array.from({ length: 21 }, (_, c) => {
      if ((r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7)) return 1;
      if (r === 7 || c === 7 || r === 13 || c === 13) return (r + c) % 2;
      return Math.random() > 0.5 ? 1 : 0;
    })
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f0faf4", paddingBottom: 90 }}>
      <div style={{ background: "linear-gradient(135deg,#1b4332,#2d6a4f)", padding: "50px 20px 24px" }}>
        <button onClick={onDone} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "6px 12px", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: 12, cursor: "pointer", marginBottom: 16 }}>← Volver</button>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "white", margin: 0 }}>▣ QR Cliente</h1>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", margin: "4px 0 0" }}>Acceso de solo lectura para el cliente</p>
      </div>
      <div style={{ padding: "24px 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ background: "white", borderRadius: 24, padding: 24, boxShadow: "0 8px 32px rgba(27,67,50,0.12)", border: "1.5px solid rgba(0,0,0,0.06)", textAlign: "center", maxWidth: 320, width: "100%" }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "#74c69d", margin: "0 0 8px" }}>PROYECTO</p>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, color: "#1b4332", margin: "0 0 20px" }}>{project.name}</p>
          <div style={{ background: "#f8faf9", borderRadius: 16, padding: 16, display: "inline-block", border: "1px solid rgba(0,0,0,0.06)" }}>
            <svg width={cellSize * 21} height={cellSize * 21}>
              {pattern.map((row, r) => row.map((cell, c) => cell ? (
                <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize} width={cellSize} height={cellSize} fill="#1b4332" />
              ) : null))}
            </svg>
          </div>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#999", margin: "16px 0 0", lineHeight: 1.5 }}>El cliente escanea este QR y accede a los datos del proyecto en tiempo real</p>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, color: "#1b4332", margin: 0 }}>0</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "#999", margin: 0 }}>accesos</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, color: "#1b4332", margin: 0 }}>Solo</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "#999", margin: 0 }}>lectura</p>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#888", marginTop: 20, textAlign: "center", maxWidth: 280, lineHeight: 1.6 }}>
          Una vez que la app esté publicada en Vercel, el QR va a funcionar con el link real del proyecto.
        </p>
      </div>
      <BottomNav active="qr" onNavigate={id => id === "home" && onDone()} />
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);

  const navigate = (to) => setScreen(to);

  if (screen === "splash") return <SplashScreen onDone={() => setScreen("login")} />;
  if (screen === "login") return <LoginScreen onLogin={u => { setUser(u); setScreen("project"); }} />;
  if (screen === "project") return <ProjectSelect user={user} onSelect={p => { setProject(p); setScreen("home"); }} />;
  if (!user || !project) return null;

  if (screen === "home") return <HomeScreen user={user} project={project} onNavigate={navigate} onChangeProject={() => setScreen("project")} />;
  if (screen === "encuesta") return <SurveyForm user={user} project={project} onDone={() => setScreen("home")} />;
  if (screen === "censo") return <CensoForm user={user} project={project} onDone={() => setScreen("home")} />;
  if (screen === "agua") return <MonitoringForm type="agua" user={user} project={project} onDone={() => setScreen("home")} />;
  if (screen === "aire") return <MonitoringForm type="aire" user={user} project={project} onDone={() => setScreen("home")} />;
  if (screen === "suelo") return <MonitoringForm type="suelo" user={user} project={project} onDone={() => setScreen("home")} />;
  if (screen === "historial") return <Historial project={project} onDone={() => setScreen("home")} />;
  if (screen === "plantillas") return <Plantillas onDone={() => setScreen("home")} />;
  if (screen === "qr") return <QRScreen project={project} onDone={() => setScreen("home")} />;

  return <HomeScreen user={user} project={project} onNavigate={navigate} onChangeProject={() => setScreen("project")} />;
}
