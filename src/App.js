import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// LOGO ANDINA (Preservado de tu original)
// ═══════════════════════════════════════════════════════════════
function AndinaLogo({ size = "md", light = false, showSubtitle = true }) {
  const sizes = {
    sm:  { w: 80,  h: 58,  sp: 2,  name: 12, sub: 5   },
    md:  { w: 130, h: 94,  sp: 3,  name: 19, sub: 6.5  },
    lg:  { w: 200, h: 144, sp: 4,  name: 28, sub: 8.5  },
    xl:  { w: 300, h: 216, sp: 6,  name: 42, sub: 11   },
  };
  const s = sizes[size] || sizes.md;
  const cx = s.w / 2;
  const base  = s.h * 0.46;
  const hLat  = base * 0.44;
  const hCen  = base * 0.60;
  const mW = s.w * 0.60; const mL = cx - mW/2; const mR = cx + mW/2;
  const unit = mW / 5;
  const l1x=mL; const l1x2=mL+unit*2; const l1cx=(l1x+l1x2)/2;
  const m1x=mL+unit; const m1x2=mR-unit;
  const r1x=mR-unit*2; const r1x2=mR; const r1cx=(r1x+r1x2)/2;
  const v1 = light ? "rgba(255,255,255,0.85)" : "#52b788";
  const v2 = light ? "#fff" : "#2d6a4f";
  const tc = light ? "#fff" : "#1b4332";
  const sc = light ? "rgba(255,255,255,0.6)" : "#40916c";
  const nameY = base + s.name * 1.55;
  const lineY = nameY + s.name * 0.32;
  const subY  = lineY + s.sub * 2.0;

  return (
    <svg width={s.w} height={s.h} viewBox={`0 0 ${s.w} ${s.h}`} style={{ display:"block" }}>
      <defs><style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400&family=Montserrat:wght@300&display=swap');`}</style></defs>
      <polygon points={`${l1x},${base} ${l1cx},${base-hLat} ${l1x2},${base}`} fill={v1} opacity="0.8"/>
      <polygon points={`${m1x},${base} ${cx},${base-hCen} ${m1x2},${base}`} fill={v2}/>
      <polygon points={`${r1x},${base} ${r1cx},${base-hLat} ${r1x2},${base}`} fill={v1} opacity="0.8"/>
      <line x1={mL-4} y1={base} x2={mR+4} y2={base} stroke={v1} strokeWidth="0.8" opacity="0.3"/>
      <text x={cx} y={nameY} textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize={s.name} fill={tc} letterSpacing={s.sp}>ANDINA</text>
      <line x1={cx-s.w*0.2} y1={lineY} x2={cx+s.w*0.2} y2={lineY} stroke={v1} strokeWidth="0.5" opacity="0.5"/>
      {showSubtitle && <text x={cx} y={subY} textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontSize={s.sub} fill={sc} letterSpacing={s.sp*0.8}>CONSULTORA SOCIOAMBIENTAL</text>}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONSTANTES Y CONFIGURACIÓN (Tus datos originales)
// ═══════════════════════════════════════════════════════════════
const USUARIOS = [
  { id: 1, nombre: "Gonzalo", apellido: "R.", rol: "Admin", pass: "1234" },
  { id: 2, nombre: "Operador", apellido: "Campo", rol: "Campo", pass: "1234" }
];

const PROYECTOS_DEF = [
  { id: 1, nombre: "Mina Los Andes", cliente: "Minera Patagónica S.A.", campaña: "2024", color: "#1b4332" },
  { id: 2, nombre: "Proyecto Río Blanco", cliente: "Cerro Mining Corp.", campaña: "2024", color: "#1e6091" }
];

const TIPO_CFG = {
  agua:  { icon: "💧", label: "Agua", color: "#1e6091", bg: "#e1f0f7" },
  aire:  { icon: "💨", label: "Aire", color: "#5c4a1e", bg: "#f7f1e1" },
  suelo: { icon: "🌱", label: "Suelo", color: "#2d4a3e", bg: "#e1f7ec" },
  social:{ icon: "👥", label: "Social", color: "#6b2d5c", bg: "#f7e1f2" }
};

const NORMATIVA = {
  agua: { ph: { min: 6.5, max: 8.5 }, turbidez: { max: 5 }, cloro: { min: 0.2, max: 0.5 } },
  aire: { ruido: { max: 55 }, pm10: { max: 50 } }
};

const CAMPOS = {
  agua: [
    { id: "punto", label: "Punto de Muestreo", ph: "Ej: Río Norte", req: true },
    { id: "ph", label: "pH", num: true, nk: "ph" },
    { id: "turbidez", label: "Turbidez (NTU)", num: true, nk: "turbidez" }
  ],
  aire: [
    { id: "punto", label: "Estación Aire", req: true },
    { id: "ruido", label: "Ruido dB(A)", num: true, nk: "ruido" }
  ],
  suelo: [{ id: "punto", label: "Parcela", req: true }, { id: "humedad", label: "Humedad %", num: true }],
  social: [{ id: "percepcion", label: "Percepción Proyecto", area: true }]
};

// ═══════════════════════════════════════════════════════════════
// LÓGICA DE PERSISTENCIA Y EXPORTACIÓN
// ═══════════════════════════════════════════════════════════════
const save = (key, val) => localStorage.setItem(`andina_${key}`, JSON.stringify(val));
const load = (key, def) => JSON.parse(localStorage.getItem(`andina_${key}`)) || def;

const exportarCSV = (data) => {
  if (data.length === 0) return alert("No hay datos");
  const headers = "Fecha,Operador,Proyecto,Tipo,Datos\n";
  const rows = data.map(r => `${r.timestamp},${r.operador},${r.proyectoNombre},${r.tipo},"${JSON.stringify(r.valores).replace(/"/g, '""')}"`).join("\n");
  const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Reporte_Andina_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};

function checkAlerta(tipo, key, val) {
  const cfg = NORMATIVA[tipo]?.[key];
  if (!cfg || !val) return null;
  const v = parseFloat(val);
  if ((cfg.max && v > cfg.max) || (cfg.min && v < cfg.min)) return "critico";
  if ((cfg.max && v > cfg.max * 0.9) || (cfg.min && v < cfg.min * 1.1)) return "alerta";
  return null;
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL (TODO EN UNO)
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("splash");
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("inicio");
  const [proyActivo, setProyActivo] = useState(PROYECTOS_DEF[0]);
  const [registros, setRegistros] = useState(() => load("registros", []));
  const [formTipo, setFormTipo] = useState(null);
  const [formVals, setFormVals] = useState({});
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (view === "splash") setTimeout(() => setView("login"), 2500);
    const handleS = () => setOnline(navigator.onLine);
    window.addEventListener("online", handleS);
    window.addEventListener("offline", handleS);
    return () => { window.removeEventListener("online", handleS); window.removeEventListener("offline", handleS); };
  }, [view]);

  useEffect(() => { save("registros", registros); }, [registros]);

  const handleLogin = (u, p) => {
    const f = USUARIOS.find(x => x.nombre.toLowerCase() === u.toLowerCase() && x.pass === p);
    if (f) { setUser(f); setView("main"); } else alert("Usuario: Gonzalo / Pass: 1234");
  };

  const handleSave = () => {
    const nuevo = { id: Date.now(), timestamp: new Date().toLocaleString(), operador: user.nombre, proyectoNombre: proyActivo.nombre, tipo: formTipo, valores: { ...formVals } };
    setRegistros([...registros, nuevo]);
    setFormVals({}); setTab("inicio"); setFormTipo(null);
  };

  if (view === "splash") return (
    <div style={{ height: "100vh", background: "#1b4332", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AndinaLogo size="xl" light />
    </div>
  );

  if (view === "login") return (
    <div style={{ height: "100vh", background: "#1b4332", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <AndinaLogo size="md" light />
      <div style={{ width: "100%", marginTop: 50, maxWidth: 350 }}>
        <input placeholder="Usuario" onChange={e => setUser({...user, tempU: e.target.value})} style={inputS} />
        <input type="password" placeholder="Contraseña" onChange={e => setUser({...user, tempP: e.target.value})} style={inputS} />
        <button onClick={() => handleLogin(user?.tempU || "", user?.tempP || "")} style={btnP}>Ingresar</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", background: "#f8f9fa", minHeight: "100vh", position: "relative", fontFamily: "sans-serif" }}>
      <header style={{ background: proyActivo.color, padding: "25px 20px", color: "white", borderRadius: "0 0 25px 25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <AndinaLogo size="sm" light showSubtitle={false} />
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 10, background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: 10 }}>{online ? "● Sincronizado" : "● Offline"}</span>
            <p style={{ margin: "5px 0 0", fontSize: 13, fontWeight: "bold" }}>{proyActivo.nombre}</p>
          </div>
        </div>
      </header>

      <main style={{ padding: 20, paddingBottom: 100 }}>
        {tab === "inicio" && !formTipo && (
          <>
            <section style={{ background: "white", padding: 20, borderRadius: 20, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <h4 style={{ margin: "0 0 10px", color: "#1b4332" }}>Consultora: Gestión de Datos</h4>
              <button onClick={() => exportarCSV(registros)} style={btnS}>📊 Exportar CSV para Cliente</button>
            </section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
              {Object.entries(TIPO_CFG).map(([id, cfg]) => (
                <button key={id} onClick={() => { setFormTipo(id); setTab("form"); }} style={{ border: "none", background: cfg.bg, padding: 25, borderRadius: 22, cursor: "pointer", textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{cfg.icon}</div>
                  <div style={{ fontWeight: "bold", color: cfg.color }}>{cfg.label}</div>
                </button>
              ))}
            </div>
          </>
        )}

        {tab === "form" && formTipo && (
          <div style={{ background: "white", padding: 25, borderRadius: 25 }}>
            <h3 style={{ marginTop: 0, color: TIPO_CFG[formTipo].color }}>Nuevo Monitoreo {TIPO_CFG[formTipo].label}</h3>
            {CAMPOS[formTipo].map(c => {
              const status = c.nk ? checkAlerta(formTipo, c.nk, formVals[c.id]) : null;
              return (
                <div key={c.id} style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: "#666", marginBottom: 6 }}>{c.label.toUpperCase()}</label>
                  {c.area ? (
                    <textarea onChange={e => setFormVals({...formVals, [c.id]: e.target.value})} style={{ ...inputF, height: 100 }} />
                  ) : (
                    <input type={c.num ? "number" : "text"} onChange={e => setFormVals({...formVals, [c.id]: e.target.value})} placeholder={c.ph} style={{ ...inputF, borderColor: status === "critico" ? "#e74c3c" : status === "alerta" ? "#f39c12" : "#ddd" }} />
                  )}
                  {status && <p style={{ fontSize: 10, color: status === "critico" ? "#e74c3c" : "#f39c12", fontWeight: "bold" }}>{status === "critico" ? "⚠️ FUERA DE NORMA" : "⚡ VALOR LÍMITE"}</p>}
                </div>
              );
            })}
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => { setTab("inicio"); setFormTipo(null); }} style={{ flex: 1, padding: 16, borderRadius: 15, border: "1px solid #ddd", background: "none" }}>Cancelar</button>
              <button onClick={handleSave} style={{ flex: 2, padding: 16, borderRadius: 15, border: "none", background: "#2d6a4f", color: "white", fontWeight: "bold" }}>Guardar Registro</button>
            </div>
          </div>
        )}

        {tab === "historial" && (
          <div>
            <h3>Historial Reciente</h3>
            {registros.slice().reverse().map(r => (
              <div key={r.id} style={{ background: "white", padding: 18, borderRadius: 20, marginBottom: 12, borderLeft: `6px solid ${TIPO_CFG[r.tipo].color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <strong>{TIPO_CFG[r.tipo].label}</strong> <span style={{ color: '#aaa' }}>{r.timestamp}</span>
                </div>
                <div style={{ fontSize: 12, color: "#444" }}>Punto: {r.valores.punto || "Carga Social"}</div>
              </div>
            ))}
          </div>
        )}
      </main>

      <nav style={{ position: "fixed", bottom: 0, width: "100%", maxWidth: 500, background: "white", display: "flex", justifyContent: "space-around", padding: "18px 0", borderTop: "1px solid #eee" }}>
        <button onClick={() => {setTab("inicio"); setFormTipo(null);}} style={{ background: "none", border: "none", fontSize: 24, color: tab === "inicio" ? "#2d6a4f" : "#ccc" }}>🏠</button>
        <button onClick={() => setTab("historial")} style={{ background: "none", border: "none", fontSize: 24, color: tab === "historial" ? "#2d6a4f" : "#ccc" }}>☰</button>
      </nav>
    </div>
  );
}

const inputS = { width: "100%", padding: 16, borderRadius: 15, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "white", marginBottom: 12, boxSizing: "border-box" };
const inputF = { width: "100%", padding: 14, borderRadius: 12, border: "1.5px solid #eee", boxSizing: "border-box", outline: 'none' };
const btnP = { width: "100%", padding: 16, borderRadius: 15, border: "none", background: "#52b788", color: "white", fontWeight: "bold" };
const btnS = { width: "100%", padding: 14, borderRadius: 12, border: "none", background: "#2d6a4f", color: "white", fontWeight: "bold" };
