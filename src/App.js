import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS — sistema de diseño centralizado
// ═══════════════════════════════════════════════════════════════
const T = {
  // Paleta refinada
  forest:   "#0d2818",
  pine:     "#1a3d28",
  moss:     "#2d6a4f",
  sage:     "#52b788",
  mist:     "#95d5b2",
  frost:    "#d8f3dc",
  surface:  "#f4faf6",
  
  // Tipografía
  serif:    "'Cormorant Garamond', Georgia, serif",
  sans:     "'DM Sans', system-ui, sans-serif",
  mono:     "'DM Mono', 'Courier New', monospace",
  
  // Alertas
  danger:   "#c0392b",
  dangerBg: "#fde8e8",
  warn:     "#c67c1a",
  warnBg:   "#fff4e0",
  
  // Sombras
  shadow:   "0 2px 12px rgba(13,40,24,0.10)",
  shadowMd: "0 6px 24px rgba(13,40,24,0.14)",
  shadowLg: "0 12px 40px rgba(13,40,24,0.18)",
};

// ═══════════════════════════════════════════════════════════════
// GLOBAL STYLES — inyectados una sola vez
// ═══════════════════════════════════════════════════════════════
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@300;400&display=swap');
  
  * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
  
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:0.5; } }
  @keyframes shimmer { 0%{ background-position:-200% 0; } 100%{ background-position:200% 0; } }
  @keyframes scaleIn { from{ transform:scale(0.94); opacity:0; } to{ transform:scale(1); opacity:1; } }
  
  input::placeholder, textarea::placeholder { color: rgba(45,106,79,0.3); font-family: 'DM Sans', system-ui; }
  input:focus, textarea:focus { outline: none !important; }
  
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(82,183,136,0.3); border-radius: 3px; }
  
  .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(13,40,24,0.16) !important; }
  .btn-press:active { transform: scale(0.97); }
`;

// ═══════════════════════════════════════════════════════════════
// LOGO ANDINA — SVG puro, nunca borroso
// ═══════════════════════════════════════════════════════════════
function AndinaLogo({ size = "md", light = false, showSubtitle = true }) {
  const sizes = {
    sm:  { w: 80,  h: 58,  sp: 2,   name: 12, sub: 5   },
    md:  { w: 130, h: 94,  sp: 3,   name: 19, sub: 6.5 },
    lg:  { w: 200, h: 144, sp: 4,   name: 28, sub: 8.5 },
    xl:  { w: 300, h: 216, sp: 6,   name: 42, sub: 11  },
  };
  const s = sizes[size];
  const cx = s.w / 2;
  const base = s.h * 0.46;
  const hLat = base * 0.44; const hCen = base * 0.60;
  const mW = s.w * 0.60; const mL = cx - mW/2; const mR = cx + mW/2;
  const unit = mW / 5;
  const l1x=mL; const l1x2=mL+unit*2; const l1cx=(l1x+l1x2)/2;
  const m1x=mL+unit; const m1x2=mR-unit;
  const r1x=mR-unit*2; const r1x2=mR; const r1cx=(r1x+r1x2)/2;
  const v1=light?"#2d6a4f":"#52b788"; const v2=light?"#40916c":"#74c69d";
  const tc=light?"#1b4332":"white";   const sc=light?"#2d6a4f":"#95d5b2";
  const nameY=base+s.name*1.55; const lineY=nameY+s.name*0.32; const subY=lineY+s.sub*2.0;
  return (
    <svg width={s.w} height={s.h} viewBox={`0 0 ${s.w} ${s.h}`} style={{ display:"block" }}>
      <defs><style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400&family=DM+Sans:wght@300&display=swap');`}</style></defs>
      <polygon points={`${l1x},${base} ${l1cx},${base-hLat} ${l1x2},${base}`} fill={v1} opacity="0.82"/>
      <polygon points={`${m1x},${base} ${cx},${base-hCen} ${m1x2},${base}`}   fill={v2}/>
      <polygon points={`${r1x},${base} ${r1cx},${base-hLat} ${r1x2},${base}`} fill={v1} opacity="0.82"/>
      <line x1={mL-4} y1={base} x2={mR+4} y2={base} stroke="#52b788" strokeWidth="0.8" opacity="0.3"/>
      <text x={cx} y={nameY} textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize={s.name} fontWeight="400" fill={tc} letterSpacing={s.sp}>ANDINA</text>
      <line x1={cx-s.w*0.20} y1={lineY} x2={cx+s.w*0.20} y2={lineY} stroke="#52b788" strokeWidth="0.7" opacity="0.45"/>
      {showSubtitle&&<text x={cx} y={subY} textAnchor="middle" fontFamily="'DM Sans',system-ui,sans-serif" fontSize={s.sub} fontWeight="300" fill={sc} letterSpacing={s.sp*0.75}>CONSULTORA SOCIOAMBIENTAL</text>}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// PERSISTENCIA localStorage
// ═══════════════════════════════════════════════════════════════
function save(key, data) {
  try { localStorage.setItem(`andina_${key}`, JSON.stringify(data)); } catch(e) { console.warn("Storage lleno:", e); }
}
function load(key, def) {
  try { const v=localStorage.getItem(`andina_${key}`); return v ? JSON.parse(v) : def; } catch(e) { return def; }
}

// ═══════════════════════════════════════════════════════════════
// EXPORTACIÓN CSV
// ═══════════════════════════════════════════════════════════════
function exportarCSV(registros, proyectos) {
  if (!registros.length) return;
  const todosLosCampos = ["comunidad","punto","actividad","hogares","acceso_agua","servicios",
    "referente","impacto","ph","turbidez","oxigeno","conductividad","temperatura",
    "pm10","pm25","ruido","viento","cobertura","erosion","contaminantes","obs"];
  const cabecera = ["ID","Proyecto","Cliente","Tipo","Operador","Fecha/Hora","Alerta","Editado",...todosLosCampos];
  const filas = registros.map(r => {
    const proy = proyectos.find(p => p.id === r.proyectoId) || {};
    const vals = r.valores || {};
    return [r.id,proy.nombre||"",proy.cliente||"",r.tipo,r.operador,r.timestamp,r.alerta?`${r.alerta.nivel} - ${r.alerta.campo}`:"",r.editado||"",...todosLosCampos.map(k=>`"${String(vals[k]||"").replace(/"/g,'""')}"`)];
  });
  const csvContent = [cabecera,...filas].map(f=>f.join(",")).join("\n");
  const blob = new Blob(["\uFEFF"+csvContent],{type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href=url; link.download=`andina_registros_${new Date().toLocaleDateString("es-AR").replace(/\//g,"-")}.csv`; link.click();
  URL.revokeObjectURL(url);
}

// ═══════════════════════════════════════════════════════════════
// DATOS BASE
// ═══════════════════════════════════════════════════════════════
const USUARIOS = [
  { id:1, nombre:"Gonzalo", apellido:"R.", rol:"Admin",    avatar:"G", pass:"1234" },
  { id:2, nombre:"Carlos",  apellido:"M.", rol:"Operador", avatar:"C", pass:"1234" },
  { id:3, nombre:"Laura",   apellido:"V.", rol:"Operador", avatar:"L", pass:"1234" },
];
const PROYECTOS_DEF = [
  { id:1, nombre:"Mina Los Andes",      cliente:"Minera Patagónica S.A.", campaña:"Q1 2026",    color:"#1b4332" },
  { id:2, nombre:"Proyecto Río Blanco", cliente:"Cerro Mining Corp.",     campaña:"Marzo 2026", color:"#1e6091" },
  { id:3, nombre:"EIA Cerro Negro",     cliente:"Andina Recursos",        campaña:"Q1 2026",    color:"#5c4a1e" },
];
const TIPO_CFG = {
  encuesta: { icon:"📋", label:"Encuesta Social",   color:"#1b4332", bg:"#d8f3dc", accent:"#52b788" },
  censo:    { icon:"🏘",  label:"Censo Comunitario", color:"#2d4a8a", bg:"#dce8ff", accent:"#6b8cda" },
  agua:     { icon:"💧", label:"Monitoreo Agua",    color:"#1e6091", bg:"#d0e8f5", accent:"#4ea8d4" },
  aire:     { icon:"💨", label:"Monitoreo Aire",    color:"#5c4a1e", bg:"#f5ead0", accent:"#c9954a" },
  suelo:    { icon:"🌱", label:"Monitoreo Suelo",   color:"#4a2c0a", bg:"#f0dfc8", accent:"#a0724e" },
};

const NORMATIVA = {
  agua: {
    ph:           { min:6.5, max:8.5,  norma:"Ley 25.688 Art. 6°",      unidad:"" },
    turbidez:     { max:5,             norma:"CAA Art. 982",             unidad:"NTU" },
    oxigeno:      { min:6,             norma:"Res. SAyDS 97/2001",       unidad:"mg/L" },
    conductividad:{ max:1500,          norma:"Ley 24.051",               unidad:"μS/cm" },
  },
  aire: {
    pm10:  { max:50,  norma:"Ley 20.284 Art. 11°",   unidad:"μg/m³" },
    pm25:  { max:25,  norma:"Res. 91/2016 SAyDS",    unidad:"μg/m³" },
    ruido: { max:55,  norma:"Ley 13.660 Art. 4°",    unidad:"dB" },
  },
  suelo: {
    ph:       { min:6.0, max:7.5, norma:"Ley 24.051 Art. 2°",  unidad:"" },
    cobertura:{ min:60,           norma:"Ley 26.331 Art. 4°",  unidad:"%" },
  },
};

const CAMPOS = {
  encuesta: [
    { id:"comunidad",   label:"Comunidad / Zona",                 ph:"Ej: Los Molles",               req:true  },
    { id:"actividad",   label:"Actividad económica predominante", ph:"Ej: Ganadería",                req:true  },
    { id:"acceso_agua", label:"¿Tiene acceso a agua potable?",    req:true,  tipo:"yesno"            },
    { id:"servicios",   label:"Servicios disponibles",            ph:"Ej: Luz, gas, internet",       req:false },
    { id:"impacto",     label:"Percepción del impacto ambiental", ph:"Positivo / Negativo / Neutro", req:false },
    { id:"obs",         label:"Observaciones",                    ph:"Notas adicionales…",           req:false, area:true },
  ],
  censo: [
    { id:"comunidad", label:"Comunidad / Localidad",          ph:"Ej: Villa Unión",      req:true       },
    { id:"hogares",   label:"N° de hogares relevados",        ph:"Ej: 12",               req:true, num:true },
    { id:"actividad", label:"Actividad principal de la zona", ph:"Ej: Minería",          req:true       },
    { id:"servicios", label:"Servicios básicos disponibles",  ph:"Ej: Agua, luz, gas",   req:false      },
    { id:"referente", label:"Referente comunitario",          ph:"Nombre del referente", req:false      },
    { id:"obs",       label:"Observaciones",                  ph:"Notas…",               req:false, area:true },
  ],
  agua: [
    { id:"punto",         label:"Punto de muestreo",        ph:"Ej: Río Los Molles Norte", req:true,  nk:"" },
    { id:"ph",            label:"pH",                       ph:"Ref: 6.5–8.5",             req:true,  num:true, nk:"ph"           },
    { id:"turbidez",      label:"Turbidez (NTU)",           ph:"Ref: < 5",                 req:true,  num:true, nk:"turbidez"     },
    { id:"oxigeno",       label:"Oxígeno disuelto (mg/L)",  ph:"Ref: > 6",                 req:false, num:true, nk:"oxigeno"      },
    { id:"conductividad", label:"Conductividad (μS/cm)",    ph:"Ref: < 1500",              req:false, num:true, nk:"conductividad"},
    { id:"temperatura",   label:"Temperatura (°C)",         ph:"Ej: 14",                   req:false, num:true                   },
    { id:"obs",           label:"Observaciones",            ph:"Condiciones del sitio…",   req:false, area:true                  },
  ],
  aire: [
    { id:"punto",  label:"Punto de muestreo",               ph:"Ej: Acceso principal",    req:true            },
    { id:"pm10",   label:"PM10 (μg/m³)",                    ph:"Ref: < 50",               req:true,  num:true, nk:"pm10"  },
    { id:"pm25",   label:"PM2.5 (μg/m³)",                   ph:"Ref: < 25",               req:false, num:true, nk:"pm25"  },
    { id:"ruido",  label:"Ruido (dB)",                      ph:"Ref: < 55",               req:true,  num:true, nk:"ruido" },
    { id:"viento", label:"Dirección y vel. del viento",     ph:"Ej: NE 15 km/h",          req:false          },
    { id:"obs",    label:"Observaciones",                   ph:"Condiciones del sitio…",  req:false, area:true},
  ],
  suelo: [
    { id:"punto",         label:"Punto de muestreo",       ph:"Ej: Talud sector B",                    req:true,  nk:"" },
    { id:"ph",            label:"pH suelo",                ph:"Ref: 6.0–7.5",                          req:true,  num:true, nk:"ph"       },
    { id:"cobertura",     label:"Cobertura vegetal (%)",   ph:"Ref: > 60%",                            req:false, num:true, nk:"cobertura"},
    { id:"erosion",       label:"Erosión",                 ph:"Sin erosión / Leve / Moderada / Severa",req:false          },
    { id:"contaminantes", label:"Contaminantes detectados",ph:"Sin detección / Describir",             req:false          },
    { id:"obs",           label:"Observaciones",           ph:"Condiciones del sitio…",                req:false, area:true},
  ],
};

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function ahora() { return new Date().toLocaleString("es-AR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}); }
function horaCorta() { return new Date().toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"}); }

function checkAlerta(tipo, nk, val) {
  const r = NORMATIVA[tipo]?.[nk];
  if (!r || !val) return null;
  const v = parseFloat(val); if (isNaN(v)) return null;
  const fuera = (r.max && v > r.max) || (r.min && v < r.min);
  if (fuera) return "critico";
  const cerca = (r.max && v > r.max * 0.88) || (r.min && v < r.min * 1.15);
  if (cerca) return "alerta";
  return null;
}

function semaforoUI(nivel) {
  if (nivel === "critico") return { bg:"#fde8e8", border:"rgba(192,57,43,0.3)", dot:"#c0392b", label:"Fuera de norma" };
  if (nivel === "alerta")  return { bg:"#fff4e0", border:"rgba(198,124,26,0.3)", dot:"#c67c1a", label:"Cerca del límite" };
  return { bg:"white", border:"rgba(45,106,79,0.12)", dot:null, label:null };
}

// ═══════════════════════════════════════════════════════════════
// UI PRIMITIVES
// ═══════════════════════════════════════════════════════════════
function Badge({ children, variant="green", small=false }) {
  const variants = {
    green:  { bg:"#d8f3dc", color:"#1b4332" },
    blue:   { bg:"#dce8ff", color:"#1e3a6e" },
    red:    { bg:"#fde8e8", color:"#c0392b" },
    amber:  { bg:"#fff4e0", color:"#c67c1a" },
    slate:  { bg:"rgba(45,106,79,0.08)", color:"#2d6a4f" },
    dark:   { bg:"rgba(13,40,24,0.7)", color:"white" },
  };
  const v = variants[variant] || variants.green;
  return (
    <span style={{ background:v.bg, color:v.color, fontFamily:T.sans, fontSize:small?8:9, fontWeight:600, padding:small?"1px 6px":"2px 8px", borderRadius:6, letterSpacing:"0.04em", display:"inline-flex", alignItems:"center", gap:3 }}>
      {children}
    </span>
  );
}

function Divider({ vertical=false, style={} }) {
  return <div style={{ [vertical?"width":"height"]:1, background:"rgba(45,106,79,0.08)", ...style }}/>;
}

function IconBox({ icon, size=40, bg="#d8f3dc", radius=12, fontSize=18 }) {
  return (
    <div style={{ width:size, height:size, borderRadius:radius, background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize, flexShrink:0 }}>
      {icon}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CAMPOS DEL FORMULARIO
// ═══════════════════════════════════════════════════════════════
function CamposFormulario({ tipo, vals, setVals }) {
  const cfg = TIPO_CFG[tipo];
  const campos = CAMPOS[tipo] || [];
  const criticos = campos.filter(c => c.nk && checkAlerta(tipo, c.nk, vals[c.id]) === "critico").length;

  return (
    <>
      {criticos > 0 && (
        <div style={{ background:T.dangerBg, border:`1.5px solid rgba(192,57,43,0.2)`, borderRadius:14, padding:"12px 16px", display:"flex", alignItems:"center", gap:10, animation:"scaleIn 0.2s ease" }}>
          <span style={{ fontSize:16 }}>🚨</span>
          <p style={{ color:T.danger, fontFamily:T.sans, fontSize:12, fontWeight:600, margin:0 }}>
            {criticos} parámetro{criticos>1?"s":""} fuera de normativa legal
          </p>
        </div>
      )}

      {campos.map(c => {
        const nivel = c.nk ? checkAlerta(tipo, c.nk, vals[c.id]) : null;
        const sem = semaforoUI(nivel);
        const norm = NORMATIVA[tipo]?.[c.nk];
        return (
          <div key={c.id} style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <label style={{ color:cfg.color, fontFamily:T.sans, fontSize:10, fontWeight:600, letterSpacing:"0.08em", opacity:0.8 }}>
                {c.label.toUpperCase()} {c.req && <span style={{ color:"#e07070" }}>*</span>}
              </label>
              {norm && (
                <span style={{ background:cfg.bg, color:cfg.color, fontFamily:T.mono, fontSize:9, padding:"2px 8px", borderRadius:6, opacity:0.85 }}>
                  {norm.min && norm.max ? `${norm.min}–${norm.max}` : norm.min ? `≥ ${norm.min}` : `≤ ${norm.max}`} {norm.unidad}
                </span>
              )}
            </div>

            {c.tipo === "yesno" ? (
              <div style={{ display:"flex", gap:6 }}>
                {["Sí","No","Parcialmente"].map(o => (
                  <button key={o} onClick={() => setVals(v => ({...v, [c.id]:o}))} className="btn-press"
                    style={{ flex:1, padding:"10px 8px", borderRadius:10, border:`1.5px solid ${vals[c.id]===o ? cfg.color : "rgba(45,106,79,0.12)"}`, background:vals[c.id]===o ? cfg.color : "white", color:vals[c.id]===o ? "white" : "#555", fontFamily:T.sans, fontSize:12, fontWeight:vals[c.id]===o?600:400, cursor:"pointer", transition:"all 0.15s" }}>{o}
                  </button>
                ))}
              </div>
            ) : c.area ? (
              <textarea value={vals[c.id]||""} onChange={e => setVals(v => ({...v,[c.id]:e.target.value}))} placeholder={c.ph} rows={3}
                style={{ width:"100%", background:"white", border:"1.5px solid rgba(45,106,79,0.12)", borderRadius:12, padding:"11px 14px", fontFamily:T.sans, fontSize:13, resize:"none", boxSizing:"border-box", color:"#1a1a1a", transition:"border-color 0.2s" }}/>
            ) : (
              <div style={{ position:"relative" }}>
                <input type={c.num?"number":"text"} value={vals[c.id]||""} onChange={e => setVals(v => ({...v,[c.id]:e.target.value}))} placeholder={c.ph}
                  style={{ width:"100%", background:sem.bg, border:`1.5px solid ${vals[c.id] ? (nivel ? sem.border : cfg.color+"55") : "rgba(45,106,79,0.12)"}`, borderRadius:12, padding:"11px 14px", paddingRight:nivel?"36px":"14px", fontFamily:T.sans, fontSize:14, boxSizing:"border-box", color:"#1a1a1a", transition:"all 0.2s" }}/>
                {sem.dot && (
                  <div style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", width:8, height:8, borderRadius:"50%", background:sem.dot, animation:"pulse 1.5s ease infinite" }}/>
                )}
              </div>
            )}

            {nivel && norm && (
              <p style={{ color: nivel==="critico" ? T.danger : T.warn, fontFamily:T.sans, fontSize:10, margin:0, fontWeight:600, paddingLeft:2 }}>
                {nivel==="critico"?"🔴":"🟡"} {sem.label} · <span style={{ fontFamily:T.mono, fontSize:9 }}>{norm.norma}</span>
              </p>
            )}
          </div>
        );
      })}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// SPLASH
// ═══════════════════════════════════════════════════════════════
function Splash({ onDone }) {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const ts = [
      setTimeout(() => setPh(1), 400),
      setTimeout(() => setPh(2), 1200),
      setTimeout(() => setPh(3), 2600),
      setTimeout(onDone, 3400),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);
  return (
    <div style={{ position:"fixed", inset:0, zIndex:999, background:`linear-gradient(160deg, ${T.forest} 0%, ${T.pine} 60%, #1a4a32 100%)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", opacity:ph===3?0:1, transition:ph===3?"opacity 0.8s":"none", overflow:"hidden" }}>
      {/* Decorative circles */}
      <div style={{ position:"absolute", top:-100, right:-100, width:320, height:320, borderRadius:"50%", background:"rgba(82,183,136,0.05)", border:"1px solid rgba(82,183,136,0.08)" }}/>
      <div style={{ position:"absolute", bottom:-60, left:-60, width:200, height:200, borderRadius:"50%", background:"rgba(82,183,136,0.04)" }}/>
      
      <div style={{ opacity:ph>=0?1:0, transform:ph>=0?"scale(1) translateY(0)":"scale(0.85) translateY(24px)", transition:"all 1s cubic-bezier(0.34,1.4,0.64,1)", display:"flex", flexDirection:"column", alignItems:"center" }}>
        <AndinaLogo size="xl" showSubtitle={ph>=1}/>
      </div>
      
      <div style={{ position:"absolute", bottom:64, left:"20%", right:"20%", opacity:ph>=2?1:0, transition:"opacity 0.6s" }}>
        <div style={{ width:"100%", height:1.5, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden" }}>
          <div style={{ height:"100%", width:ph>=2?"100%":"0%", background:"linear-gradient(90deg,transparent,#52b788,transparent)", backgroundSize:"200% 100%", transition:"width 1.2s ease", borderRadius:2, animation:ph>=2?"shimmer 1.5s ease infinite":"none" }}/>
        </div>
        <p style={{ color:"rgba(255,255,255,0.18)", fontFamily:T.mono, fontSize:9, textAlign:"center", marginTop:10, letterSpacing:"0.2em" }}>v5.0 · CAMPO DIGITAL</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════
function Login({ onLogin }) {
  const [u, setU] = useState(""); const [p, setP] = useState("");
  const [loading, setLoading] = useState(false); const [err, setErr] = useState("");
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

  const handle = () => {
    if (!u || !p) { setErr("Completá todos los campos"); return; }
    setLoading(true); setErr("");
    setTimeout(() => {
      const user = USUARIOS.find(x => x.nombre.toLowerCase() === u.toLowerCase() && x.pass === p);
      if (user) onLogin(user);
      else { setLoading(false); setErr("Usuario o contraseña incorrectos"); }
    }, 900);
  };

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", background:`linear-gradient(160deg,${T.forest} 0%,${T.pine} 55%,#234d35 100%)`, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(16px)", transition:"all 0.5s", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:"rgba(82,183,136,0.06)", border:"1px solid rgba(82,183,136,0.08)" }}/>
      <div style={{ position:"absolute", bottom:80, left:-40, width:140, height:140, borderRadius:"50%", background:"rgba(82,183,136,0.04)" }}/>
      
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 28px", position:"relative", gap:0 }}>
        <div style={{ marginBottom:32 }}><AndinaLogo size="lg" showSubtitle={true}/></div>
        
        <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:12 }}>
          {[["USUARIO",u,setU,"text","Tu nombre de acceso"],["CONTRASEÑA",p,setP,"password","••••••"]].map(([lbl,val,set,type,ph]) => (
            <div key={lbl}>
              <p style={{ color:"rgba(255,255,255,0.3)", fontFamily:T.sans, fontSize:9, fontWeight:600, letterSpacing:"0.16em", margin:"0 0 6px" }}>{lbl}</p>
              <input value={val} onChange={e => set(e.target.value)} type={type} placeholder={ph} onKeyDown={e => e.key==="Enter"&&handle()}
                style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:`1.5px solid ${val?"rgba(82,183,136,0.45)":"rgba(255,255,255,0.1)"}`, borderRadius:14, padding:"13px 16px", color:"white", fontFamily:T.sans, fontSize:14, boxSizing:"border-box", transition:"border-color 0.2s", letterSpacing:type==="password"?"0.1em":"normal" }}/>
            </div>
          ))}
          
          {err && (
            <div style={{ background:"rgba(192,57,43,0.15)", border:"1px solid rgba(192,57,43,0.25)", borderRadius:10, padding:"8px 14px", animation:"scaleIn 0.2s ease" }}>
              <p style={{ color:"#f1948a", fontFamily:T.sans, fontSize:12, textAlign:"center", margin:0 }}>{err}</p>
            </div>
          )}
          
          <button onClick={handle} className="btn-press" style={{ width:"100%", marginTop:4, background:loading?"rgba(82,183,136,0.25)":"linear-gradient(135deg,#52b788,#2d6a4f)", border:"none", borderRadius:14, padding:"14px", color:"white", fontFamily:T.sans, fontWeight:600, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"all 0.2s", letterSpacing:"0.02em" }}>
            {loading
              ? <><div style={{ width:14, height:14, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.25)", borderTopColor:"white", animation:"spin 0.8s linear infinite" }}/>Verificando…</>
              : <span>Ingresar <span style={{ opacity:0.6, marginLeft:2 }}>→</span></span>
            }
          </button>
        </div>
        
        <div style={{ marginTop:28, display:"flex", justifyContent:"center", width:"100%" }}>
          <p style={{ color:"rgba(255,255,255,0.12)", fontFamily:T.mono, fontSize:9, letterSpacing:"0.16em", margin:0 }}>ACCESO RESTRINGIDO · EQUIPO AUTORIZADO</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// INICIO
// ═══════════════════════════════════════════════════════════════
function Inicio({ user, proyecto, registros, online, pendientes, formulariosCust, onNav, onNavCustom, onVerProyectos, onSincronizar, onExportar }) {
  const hoy = registros.filter(r => r.proyectoId === proyecto.id);
  const alertasHoy = hoy.filter(r => r.alerta).length;
  const totalTodos = registros.length;

  return (
    <div style={{ flex:1, overflowY:"auto", background:T.surface }}>
      {/* HEADER */}
      <div style={{ padding:"16px 18px 14px", background:"white", borderBottom:`1px solid rgba(45,106,79,0.07)` }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:11 }}>
            <AndinaLogo size="sm" light={true} showSubtitle={false}/>
            <div>
              <p style={{ color:T.sage, fontFamily:T.sans, fontSize:10, margin:0, fontWeight:400, opacity:0.9 }}>
                Hola, <strong style={{ fontWeight:600 }}>{user.nombre}</strong> <span style={{ opacity:0.5 }}>· {user.rol}</span>
              </p>
              <p style={{ color:T.forest, fontFamily:T.serif, fontSize:13, margin:0, letterSpacing:"0.5px" }}>
                Campo <em style={{ color:T.moss }}>Digital</em>
              </p>
            </div>
          </div>
          <button onClick={onVerProyectos} className="btn-press" style={{ background:T.surface, border:`1px solid rgba(45,106,79,0.15)`, borderRadius:10, padding:"6px 12px", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ fontSize:11 }}>⚙</span>
            <span style={{ color:T.moss, fontFamily:T.sans, fontSize:10, fontWeight:600 }}>Proyectos</span>
          </button>
        </div>

        {/* PROYECTO ACTIVO — card elevada */}
        <div style={{ background:`linear-gradient(135deg,${proyecto.color} 0%,${proyecto.color}e8 100%)`, borderRadius:18, padding:"16px", boxShadow:`0 8px 28px ${proyecto.color}40`, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-20, right:-20, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
          <p style={{ color:"rgba(255,255,255,0.45)", fontFamily:T.mono, fontSize:8, fontWeight:400, letterSpacing:"0.2em", margin:"0 0 3px" }}>PROYECTO ACTIVO</p>
          <p style={{ color:"white", fontFamily:T.serif, fontSize:19, margin:0, fontWeight:400, lineHeight:1.2 }}>{proyecto.nombre}</p>
          <p style={{ color:"rgba(255,255,255,0.45)", fontFamily:T.sans, fontSize:11, margin:"4px 0 12px" }}>{proyecto.cliente} · {proyecto.campaña}</p>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            <span style={{ background:"rgba(255,255,255,0.12)", color:"white", fontFamily:T.sans, fontSize:10, fontWeight:500, padding:"4px 10px", borderRadius:8 }}>📋 {hoy.length} registros</span>
            {alertasHoy > 0 && <span style={{ background:"rgba(192,57,43,0.35)", color:"white", fontFamily:T.sans, fontSize:10, fontWeight:600, padding:"4px 10px", borderRadius:8 }}>🚨 {alertasHoy} alerta{alertasHoy>1?"s":""}</span>}
            {!online && pendientes > 0 && <span style={{ background:"rgba(198,124,26,0.35)", color:"white", fontFamily:T.sans, fontSize:10, fontWeight:600, padding:"4px 10px", borderRadius:8 }}>⏳ {pendientes} pend.</span>}
          </div>
        </div>
      </div>

      <div style={{ padding:"14px 16px 0" }}>
        {/* OFFLINE BANNER */}
        {!online && pendientes > 0 && (
          <div style={{ background:"#fff9ed", border:`1px solid rgba(198,124,26,0.25)`, borderRadius:12, padding:"10px 14px", display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <span style={{ fontSize:14 }}>⚠️</span>
            <span style={{ color:"#a06010", fontFamily:T.sans, fontSize:11, flex:1, fontWeight:500 }}>Sin señal · {pendientes} registro{pendientes>1?"s":""} guardado{pendientes>1?"s":""} localmente</span>
            <button onClick={onSincronizar} className="btn-press" style={{ background:"#c67c1a", border:"none", borderRadius:8, padding:"5px 12px", color:"white", fontFamily:T.sans, fontSize:10, fontWeight:600, cursor:"pointer" }}>Sync</button>
          </div>
        )}

        {/* EXPORTAR */}
        <button onClick={onExportar} className="card-hover btn-press" style={{ width:"100%", background:"white", border:`1.5px solid rgba(45,106,79,0.1)`, borderRadius:14, padding:"12px 14px", display:"flex", alignItems:"center", gap:12, cursor:"pointer", marginBottom:14, boxShadow:T.shadow }}>
          <IconBox icon="📊" bg="#d8f3dc" radius={10} size={38} fontSize={16}/>
          <div style={{ textAlign:"left", flex:1 }}>
            <p style={{ color:T.forest, fontFamily:T.sans, fontSize:13, fontWeight:600, margin:0 }}>Exportar a Excel / CSV</p>
            <p style={{ color:T.mist, fontFamily:T.sans, fontSize:10, margin:"1px 0 0", fontWeight:400 }}>{totalTodos} registro{totalTodos!==1?"s":""} en total</p>
          </div>
          <span style={{ color:T.sage, fontSize:16, fontWeight:300 }}>↓</span>
        </button>

        {/* SECCIÓN REGISTRAR */}
        <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, fontWeight:400, letterSpacing:"0.2em", margin:"0 0 10px", paddingLeft:2 }}>REGISTRAR</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8, paddingBottom:24 }}>
          {Object.entries(TIPO_CFG).map(([id, cfg]) => {
            const count = hoy.filter(r => r.tipo === id).length;
            return (
              <button key={id} onClick={() => onNav(id)} className="btn-press" style={{ background:`linear-gradient(135deg,${cfg.color} 0%,${cfg.color}dd 100%)`, border:"none", borderRadius:16, padding:"13px 14px", display:"flex", alignItems:"center", gap:12, cursor:"pointer", boxShadow:`0 4px 16px ${cfg.color}2a`, textAlign:"left" }}>
                <div style={{ width:42, height:42, borderRadius:12, background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{cfg.icon}</div>
                <p style={{ color:"white", fontFamily:T.serif, fontSize:17, margin:0, fontWeight:400, flex:1, letterSpacing:"0.3px" }}>{cfg.label}</p>
                {count > 0 && <Badge variant="dark" small>{count} hoy</Badge>}
                <span style={{ color:"rgba(255,255,255,0.3)", fontSize:18, fontWeight:300 }}>›</span>
              </button>
            );
          })}

          {/* FORMULARIOS CUSTOM */}
          {(formulariosCust||[]).length > 0 && (
            <>
              <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, fontWeight:400, letterSpacing:"0.2em", margin:"6px 0 0", paddingLeft:2 }}>MIS FORMULARIOS</p>
              {(formulariosCust||[]).map(f => {
                const cfg = BASE_TIPO_CFG[f.tipo] || BASE_TIPO_CFG.custom;
                const count = hoy.filter(r => r.formularioId === f.id).length;
                return (
                  <button key={f.id} onClick={() => onNavCustom(f)} className="btn-press" style={{ background:`linear-gradient(135deg,${cfg.color} 0%,${cfg.color}dd 100%)`, border:"none", borderRadius:16, padding:"13px 14px", display:"flex", alignItems:"center", gap:12, cursor:"pointer", boxShadow:`0 4px 16px ${cfg.color}2a`, textAlign:"left" }}>
                    <div style={{ width:42, height:42, borderRadius:12, background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{cfg.icon}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ color:"white", fontFamily:T.serif, fontSize:17, margin:0, fontWeight:400, letterSpacing:"0.3px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{f.nombre}</p>
                      <p style={{ color:"rgba(255,255,255,0.45)", fontFamily:T.mono, fontSize:9, margin:0 }}>{(f.preguntas||[]).length} preguntas</p>
                    </div>
                    {count > 0 && <Badge variant="dark" small>{count} hoy</Badge>}
                    <span style={{ color:"rgba(255,255,255,0.3)", fontSize:18, fontWeight:300 }}>›</span>
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EDITOR DE REGISTRO
// ═══════════════════════════════════════════════════════════════
function EditorRegistro({ registro, onGuardar, onEliminar, onVolver }) {
  const cfg = TIPO_CFG[registro.tipo];
  const campos = CAMPOS[registro.tipo] || [];
  const [vals, setVals] = useState({...registro.valores});
  const [confirmDel, setConfirmDel] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const criticos = campos.filter(c => c.nk && checkAlerta(registro.tipo, c.nk, vals[c.id]) === "critico").length;
  const guardar = () => {
    const ad = campos.find(c => c.nk && checkAlerta(registro.tipo, c.nk, vals[c.id]) === "critico");
    onGuardar({ ...registro, valores:vals, alerta:ad?{nivel:"critico",campo:ad.label}:null, editado:ahora() });
    setGuardado(true);
  };

  if (guardado) return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:T.surface, padding:28, gap:16 }}>
      <div style={{ width:80, height:80, borderRadius:"50%", background:cfg.bg, border:`3px solid ${cfg.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, animation:"scaleIn 0.3s ease" }}>{cfg.icon}</div>
      <h3 style={{ color:cfg.color, fontFamily:T.serif, fontSize:28, fontWeight:400, textAlign:"center", margin:0 }}>¡Cambios guardados!</h3>
      {criticos > 0 && <Badge variant="red">🚨 {criticos} alerta registrada</Badge>}
      <button onClick={onVolver} className="btn-press" style={{ width:"100%", background:cfg.color, border:"none", borderRadius:14, padding:"14px", color:"white", fontFamily:T.sans, fontWeight:600, fontSize:14, cursor:"pointer" }}>← Volver</button>
    </div>
  );

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", background:T.surface }}>
      <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid rgba(45,106,79,0.08)`, background:"rgba(255,255,255,0.97)", position:"sticky", top:0, zIndex:10, backdropFilter:"blur(12px)" }}>
        <button onClick={onVolver} style={{ color:T.sage, fontFamily:T.sans, fontSize:12, background:"none", border:"none", cursor:"pointer", padding:0, marginBottom:10, fontWeight:500 }}>‹ Volver</button>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <IconBox icon={cfg.icon} bg={cfg.bg} size={40} radius={11} fontSize={19}/>
            <div>
              <p style={{ color:cfg.color, fontFamily:T.mono, fontSize:8, fontWeight:400, letterSpacing:"0.14em", margin:0, opacity:0.65 }}>EDITANDO REGISTRO</p>
              <p style={{ color:cfg.color, fontFamily:T.serif, fontSize:17, fontWeight:400, margin:0 }}>{cfg.label}</p>
            </div>
          </div>
          <button onClick={() => setConfirmDel(true)} className="btn-press" style={{ background:T.dangerBg, border:"none", borderRadius:10, padding:"7px 12px", color:T.danger, fontFamily:T.sans, fontSize:11, fontWeight:600, cursor:"pointer" }}>🗑 Eliminar</button>
        </div>
        <p style={{ color:"#bbb", fontFamily:T.mono, fontSize:9, margin:"8px 0 0", letterSpacing:"0.04em" }}>
          {registro.timestamp} · {registro.operador}
          {registro.editado && <span style={{ color:"#a07820" }}> · ✏ {registro.editado}</span>}
        </p>
      </div>

      {confirmDel && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:24, backdropFilter:"blur(4px)" }}>
          <div style={{ background:"white", borderRadius:22, padding:"28px 24px", width:"100%", maxWidth:340, boxShadow:"0 16px 48px rgba(0,0,0,0.2)", animation:"scaleIn 0.2s ease" }}>
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <div style={{ fontSize:36, marginBottom:10 }}>🗑</div>
              <p style={{ color:T.danger, fontFamily:T.serif, fontSize:22, fontWeight:400, margin:"0 0 6px" }}>¿Eliminar registro?</p>
              <p style={{ color:"#999", fontFamily:T.sans, fontSize:12, margin:0, fontWeight:400 }}>Esta acción no se puede deshacer.</p>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setConfirmDel(false)} className="btn-press" style={{ flex:1, background:T.surface, border:`1.5px solid rgba(45,106,79,0.15)`, borderRadius:12, padding:"12px", color:T.moss, fontFamily:T.sans, fontWeight:600, fontSize:13, cursor:"pointer" }}>Cancelar</button>
              <button onClick={onEliminar} className="btn-press" style={{ flex:1, background:T.danger, border:"none", borderRadius:12, padding:"12px", color:"white", fontFamily:T.sans, fontWeight:600, fontSize:13, cursor:"pointer" }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
        <CamposFormulario tipo={registro.tipo} vals={vals} setVals={setVals}/>
        <div style={{ display:"flex", gap:8, marginTop:4 }}>
          <button onClick={onVolver} className="btn-press" style={{ flex:1, background:"white", border:`1.5px solid rgba(45,106,79,0.15)`, borderRadius:14, padding:"13px", color:T.moss, fontFamily:T.sans, fontWeight:600, fontSize:13, cursor:"pointer" }}>Cancelar</button>
          <button onClick={guardar} className="btn-press" style={{ flex:2, background:`linear-gradient(135deg,${cfg.color},${cfg.color}cc)`, border:"none", borderRadius:14, padding:"13px", color:"white", fontFamily:T.sans, fontWeight:600, fontSize:14, cursor:"pointer" }}>
            Guardar cambios {criticos>0?"⚠️":"✓"}
          </button>
        </div>
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TARJETA DE REGISTRO
// ═══════════════════════════════════════════════════════════════
function TarjetaRegistro({ r, abierto, onToggle, onEditar }) {
  const cfg = TIPO_CFG[r.tipo];
  const campos = CAMPOS[r.tipo] || [];
  return (
    <div style={{ background:"white", border:`1.5px solid ${abierto ? cfg.color+"44" : "rgba(45,106,79,0.08)"}`, borderRadius:16, overflow:"hidden", boxShadow:abierto?T.shadowMd:T.shadow, transition:"all 0.2s" }}>
      <button onClick={onToggle} style={{ width:"100%", background:"none", border:"none", cursor:"pointer", padding:"12px 14px", textAlign:"left" }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
          <IconBox icon={cfg.icon} bg={cfg.bg} size={36} radius={10} fontSize={17}/>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap", marginBottom:4 }}>
              <Badge variant={r.alerta?"red":"green"} small>{cfg.label}</Badge>
              {r.alerta && <Badge variant="red" small>🚨 Alerta</Badge>}
              {r.editado && <Badge variant="amber" small>✏ Editado</Badge>}
              <span style={{ color:"#ccc", fontFamily:T.mono, fontSize:9, marginLeft:2 }}>{r.timestamp}</span>
            </div>
            <p style={{ color:"#1a1a1a", fontFamily:T.sans, fontSize:13, margin:"0 0 3px", fontWeight:500 }}>{r.valores?.comunidad||r.valores?.punto||"Sin detalle"}</p>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", gap:10 }}>
                <span style={{ color:"#bbb", fontFamily:T.sans, fontSize:10 }}>👤 {r.operador}</span>
                <span style={{ color:T.sage, fontFamily:T.sans, fontSize:10 }}>✓ Guardado</span>
              </div>
              <span style={{ color:cfg.color, fontSize:14, transition:"transform 0.2s", display:"inline-block", transform:abierto?"rotate(90deg)":"rotate(0deg)" }}>›</span>
            </div>
          </div>
        </div>
      </button>

      {abierto && (
        <div style={{ borderTop:`1px solid ${cfg.bg}`, padding:"12px 14px", display:"flex", flexDirection:"column", gap:8, animation:"fadeUp 0.2s ease" }}>
          <div style={{ display:"flex", gap:8 }}>
            <div style={{ flex:1, background:cfg.bg, borderRadius:10, padding:"8px 12px" }}>
              <p style={{ color:cfg.color, fontFamily:T.mono, fontSize:8, fontWeight:400, margin:"0 0 2px", letterSpacing:"0.12em", opacity:0.7 }}>FECHA</p>
              <p style={{ color:cfg.color, fontFamily:T.sans, fontSize:11, margin:0, fontWeight:500 }}>{r.timestamp}</p>
            </div>
            <div style={{ flex:1, background:T.surface, borderRadius:10, padding:"8px 12px" }}>
              <p style={{ color:"#999", fontFamily:T.mono, fontSize:8, fontWeight:400, margin:"0 0 2px", letterSpacing:"0.12em" }}>OPERADOR</p>
              <p style={{ color:"#1a1a1a", fontFamily:T.sans, fontSize:11, margin:0, fontWeight:500 }}>{r.operador}</p>
            </div>
          </div>

          {campos.filter(c => r.valores?.[c.id]).map(c => {
            const nivel = c.nk ? checkAlerta(r.tipo, c.nk, r.valores[c.id]) : null;
            const sem = semaforoUI(nivel);
            const norm = NORMATIVA[r.tipo]?.[c.nk];
            return (
              <div key={c.id} style={{ background:sem.bg, border:`1px solid ${sem.border}`, borderRadius:10, padding:"8px 12px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <p style={{ color:nivel==="critico"?T.danger:nivel==="alerta"?T.warn:"#999", fontFamily:T.mono, fontSize:8, fontWeight:400, letterSpacing:"0.1em", margin:"0 0 2px" }}>{c.label.toUpperCase()}</p>
                  {sem.dot && <div style={{ width:7, height:7, borderRadius:"50%", background:sem.dot, animation:"pulse 1.5s ease infinite" }}/>}
                </div>
                <p style={{ color:nivel==="critico"?T.danger:"#1a1a1a", fontFamily:T.sans, fontSize:14, margin:0, fontWeight:nivel?"600":"400" }}>{r.valores[c.id]}</p>
                {nivel && norm && <p style={{ color:nivel==="critico"?T.danger:T.warn, fontFamily:T.mono, fontSize:9, margin:"3px 0 0" }}>{sem.label} · {norm.norma}</p>}
              </div>
            );
          })}
          {campos.filter(c => r.valores?.[c.id]).length === 0 && (
            <p style={{ color:"#ccc", fontFamily:T.sans, fontSize:12, textAlign:"center", margin:"4px 0" }}>Sin datos cargados</p>
          )}
          <button onClick={onEditar} className="btn-press" style={{ width:"100%", background:T.surface, border:`1.5px solid rgba(45,106,79,0.15)`, borderRadius:12, padding:"10px", color:T.moss, fontFamily:T.sans, fontWeight:600, fontSize:13, cursor:"pointer", marginTop:2 }}>
            ✏ Editar este registro
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DETALLE PROYECTO
// ═══════════════════════════════════════════════════════════════
function DetalleProyecto({ proyecto, proyectoActivo, registros, onCambiarActivo, onActualizar, onEditarRegistro, onEliminarRegistro, onNuevoRegistro, onVolver }) {
  const [vista, setVista] = useState("registros");
  const [form, setForm] = useState({nombre:proyecto.nombre, cliente:proyecto.cliente, campaña:proyecto.campaña});
  const [expandido, setExpandido] = useState(null);
  const [filtro, setFiltro] = useState("todos");
  const [editandoReg, setEditandoReg] = useState(null);

  const regs = registros.filter(r => r.proyectoId === proyecto.id);
  const alertas = regs.filter(r => r.alerta).length;
  const tipos = [...new Set(regs.map(r => r.tipo))];
  const filtrados = regs.filter(r => filtro === "todos" || r.tipo === filtro);

  const guardarEdicion = () => { if (!form.nombre.trim()) return; onActualizar(proyecto.id, form); setVista("registros"); };

  if (editandoReg) {
    const reg = registros.find(r => r.id === editandoReg);
    if (!reg) { setEditandoReg(null); return null; }
    return <EditorRegistro registro={reg} onGuardar={r=>{ onEditarRegistro(r); setEditandoReg(null); }} onEliminar={()=>{ onEliminarRegistro(editandoReg); setEditandoReg(null); }} onVolver={()=>setEditandoReg(null)}/>;
  }

  return (
    <div style={{ flex:1, overflowY:"auto", background:T.surface }}>
      <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid rgba(45,106,79,0.07)`, position:"sticky", top:0, background:"rgba(244,250,246,0.97)", backdropFilter:"blur(12px)", zIndex:10 }}>
        <button onClick={onVolver} style={{ color:T.sage, fontFamily:T.sans, fontSize:12, background:"none", border:"none", cursor:"pointer", padding:0, marginBottom:10, fontWeight:500 }}>‹ Proyectos</button>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
          <div style={{ width:44, height:44, borderRadius:13, background:proyecto.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>⛏</div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <p style={{ color:T.forest, fontFamily:T.serif, fontSize:18, fontWeight:400, margin:0 }}>{proyecto.nombre}</p>
              {proyecto.id===proyectoActivo.id && <Badge variant="green">✓ Activo</Badge>}
            </div>
            <p style={{ color:T.mist, fontFamily:T.sans, fontSize:11, margin:0 }}>{proyecto.cliente} · {proyecto.campaña}</p>
          </div>
        </div>

        <div style={{ display:"flex", gap:8, marginBottom:12 }}>
          {[["Registros", regs.length, T.forest, "white"], ["Alertas", alertas, alertas>0?T.danger:T.forest, alertas>0?T.dangerBg:"white"], ["Tipos", tipos.length, T.forest, "white"]].map(([lbl,val,tc,bg]) => (
            <div key={lbl} style={{ flex:1, background:bg, borderRadius:12, padding:"9px 10px", textAlign:"center", border:`1px solid ${alertas>0&&lbl==="Alertas"?"rgba(192,57,43,0.15)":"rgba(45,106,79,0.08)"}` }}>
              <p style={{ color:tc, fontFamily:T.serif, fontSize:22, margin:0 }}>{val}</p>
              <p style={{ color:tc===T.danger?tc:T.mist, fontFamily:T.mono, fontSize:8, margin:0, letterSpacing:"0.06em" }}>{lbl.toUpperCase()}</p>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => onNuevoRegistro(proyecto)} className="btn-press" style={{ flex:2, background:`linear-gradient(135deg,${T.forest},${T.moss})`, border:"none", borderRadius:12, padding:"10px", color:"white", fontFamily:T.sans, fontWeight:600, fontSize:12, cursor:"pointer" }}>+ Nuevo registro</button>
          {proyecto.id !== proyectoActivo.id && (
            <button onClick={() => onCambiarActivo(proyecto)} className="btn-press" style={{ flex:1, background:T.frost, border:"none", borderRadius:12, padding:"10px", color:T.moss, fontFamily:T.sans, fontWeight:600, fontSize:12, cursor:"pointer" }}>✓ Activar</button>
          )}
          <button onClick={() => setVista(v => v==="editar"?"registros":"editar")} className="btn-press" style={{ flex:1, background:vista==="editar"?T.forest:"rgba(45,106,79,0.07)", border:`1px solid rgba(45,106,79,0.12)`, borderRadius:12, padding:"10px", color:vista==="editar"?"white":T.moss, fontFamily:T.sans, fontWeight:600, fontSize:12, cursor:"pointer" }}>✏ Editar</button>
        </div>
      </div>

      <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:10 }}>
        {vista === "editar" && (
          <div style={{ background:"white", border:`1.5px solid rgba(45,106,79,0.1)`, borderRadius:18, padding:"16px", boxShadow:T.shadow, animation:"scaleIn 0.2s ease" }}>
            <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, letterSpacing:"0.14em", margin:"0 0 14px" }}>EDITANDO PROYECTO</p>
            {[["NOMBRE","nombre","Ej: Mina Los Andes"],["CLIENTE","cliente","Ej: Minera Patagónica S.A."],["CAMPAÑA","campaña","Ej: Q1 2026"]].map(([lbl,key,ph]) => (
              <div key={key} style={{ marginBottom:10 }}>
                <p style={{ color:T.moss, fontFamily:T.sans, fontSize:9, fontWeight:600, letterSpacing:"0.1em", margin:"0 0 5px" }}>{lbl}</p>
                <input value={form[key]||""} onChange={e => setForm(f => ({...f,[key]:e.target.value}))} placeholder={ph}
                  style={{ width:"100%", background:T.surface, border:`1.5px solid ${form[key]?"rgba(45,106,79,0.3)":"rgba(45,106,79,0.12)"}`, borderRadius:12, padding:"10px 14px", fontFamily:T.sans, fontSize:14, boxSizing:"border-box", color:"#1a1a1a" }}/>
              </div>
            ))}
            <div style={{ display:"flex", gap:8, marginTop:4 }}>
              <button onClick={() => setVista("registros")} className="btn-press" style={{ flex:1, background:"white", border:`1.5px solid rgba(45,106,79,0.15)`, borderRadius:12, padding:"11px", color:T.moss, fontFamily:T.sans, fontWeight:600, fontSize:13, cursor:"pointer" }}>Cancelar</button>
              <button onClick={guardarEdicion} className="btn-press" style={{ flex:2, background:`linear-gradient(135deg,${T.forest},${T.moss})`, border:"none", borderRadius:12, padding:"11px", color:"white", fontFamily:T.sans, fontWeight:600, fontSize:13, cursor:"pointer" }}>✓ Guardar cambios</button>
            </div>
          </div>
        )}

        {vista === "registros" && regs.length > 0 && (
          <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:2 }}>
            {[["todos","Todos"],...Object.entries(TIPO_CFG).filter(([k])=>tipos.includes(k)).map(([k,v])=>[k,`${v.icon} ${v.label.split(" ")[0]}`])].map(([id,lbl]) => (
              <button key={id} onClick={() => setFiltro(id)} className="btn-press" style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", background:filtro===id?T.moss:"rgba(45,106,79,0.07)", color:filtro===id?"white":T.moss, fontFamily:T.sans, fontSize:11, fontWeight:500, flexShrink:0, transition:"all 0.15s" }}>{lbl}</button>
            ))}
          </div>
        )}

        {vista === "registros" && (
          filtrados.length === 0
            ? <div style={{ textAlign:"center", padding:"48px 0" }}><div style={{ fontSize:36, marginBottom:10, opacity:0.4 }}>📋</div><p style={{ color:T.mist, fontFamily:T.sans, fontSize:13, fontWeight:400 }}>Sin registros todavía</p><p style={{ color:"#ccc", fontFamily:T.sans, fontSize:11 }}>Tocá "+ Nuevo registro" para empezar</p></div>
            : filtrados.map(r => <TarjetaRegistro key={r.id} r={r} abierto={expandido===r.id} onToggle={()=>setExpandido(expandido===r.id?null:r.id)} onEditar={()=>setEditandoReg(r.id)}/>)
        )}
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROYECTOS
// ═══════════════════════════════════════════════════════════════
function Proyectos({ proyectos, proyectoActivo, registros, onCambiarActivo, onActualizar, onEditarRegistro, onEliminarRegistro, onNuevoRegistro, onVolver, onAgregarProyecto }) {
  const [detalle, setDetalle] = useState(null);
  const [nuevoForm, setNuevoForm] = useState(false);
  const [nf, setNf] = useState({ nombre:"", cliente:"", campaña:"", color:"#1b4332" });
  const colores = ["#1b4332","#1e6091","#5c4a1e","#6b2d5e","#2d4a8a","#7a3b1e"];

  if (detalle) return (
    <DetalleProyecto proyecto={detalle} proyectoActivo={proyectoActivo} registros={registros}
      onCambiarActivo={p => { onCambiarActivo(p); setDetalle({...detalle,...p}); }}
      onActualizar={(id,cambios) => { onActualizar(id,cambios); setDetalle(d=>({...d,...cambios})); }}
      onEditarRegistro={onEditarRegistro} onEliminarRegistro={onEliminarRegistro}
      onNuevoRegistro={onNuevoRegistro} onVolver={() => setDetalle(null)}/>
  );

  return (
    <div style={{ flex:1, overflowY:"auto", background:T.surface }}>
      <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid rgba(45,106,79,0.07)`, position:"sticky", top:0, background:"rgba(244,250,246,0.97)", backdropFilter:"blur(12px)", zIndex:10 }}>
        <button onClick={onVolver} style={{ color:T.sage, fontFamily:T.sans, fontSize:12, background:"none", border:"none", cursor:"pointer", padding:0, marginBottom:10, fontWeight:500 }}>‹ Inicio</button>
        <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, letterSpacing:"0.2em", margin:"0 0 2px" }}>MULTICLIENTE</p>
        <h2 style={{ color:T.forest, fontFamily:T.serif, fontSize:22, fontWeight:400, margin:0 }}>
          <em style={{ color:T.moss, fontStyle:"italic" }}>Proyectos</em>
        </h2>
        <p style={{ color:T.mist, fontFamily:T.sans, fontSize:11, margin:"4px 0 0", fontWeight:400 }}>{proyectos.length} proyecto{proyectos.length!==1?"s":""} · Tocá uno para ver sus registros</p>
      </div>

      <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
        {proyectos.map(p => {
          const regsP = registros.filter(r => r.proyectoId === p.id);
          const alertasP = regsP.filter(r => r.alerta).length;
          return (
            <button key={p.id} onClick={() => setDetalle(p)} className="card-hover btn-press" style={{ background:"white", border:`2px solid ${p.id===proyectoActivo.id?"rgba(45,106,79,0.35)":"rgba(45,106,79,0.08)"}`, borderRadius:18, padding:"16px", boxShadow:p.id===proyectoActivo.id?T.shadowMd:T.shadow, cursor:"pointer", textAlign:"left", width:"100%" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:46, height:46, borderRadius:14, background:p.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:22 }}>⛏</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3, flexWrap:"wrap" }}>
                    <p style={{ color:T.forest, fontFamily:T.serif, fontSize:16, fontWeight:400, margin:0 }}>{p.nombre}</p>
                    {p.id===proyectoActivo.id && <Badge variant="green">✓ Activo</Badge>}
                  </div>
                  <p style={{ color:T.mist, fontFamily:T.sans, fontSize:11, margin:"0 0 6px", fontWeight:400 }}>{p.cliente} · {p.campaña}</p>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <span style={{ color:T.sage, fontFamily:T.sans, fontSize:11 }}>📋 {regsP.length} registro{regsP.length!==1?"s":""}</span>
                    {alertasP > 0 && <span style={{ color:T.danger, fontFamily:T.sans, fontSize:11, fontWeight:600 }}>🚨 {alertasP} alerta{alertasP!==1?"s":""}</span>}
                    <span style={{ color:"#ddd", fontFamily:T.sans, fontSize:18, marginLeft:"auto" }}>›</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        {nuevoForm ? (
          <div style={{ background:"white", border:`1.5px solid rgba(45,106,79,0.15)`, borderRadius:18, padding:"16px", boxShadow:T.shadow, animation:"scaleIn 0.2s ease" }}>
            <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, letterSpacing:"0.14em", margin:"0 0 14px" }}>NUEVO PROYECTO</p>
            {[["NOMBRE","nombre","Ej: EIA Quebrada Honda"],["CLIENTE","cliente","Ej: Empresa SA"],["CAMPAÑA","campaña","Ej: Q2 2026"]].map(([lbl,key,ph]) => (
              <div key={key} style={{ marginBottom:10 }}>
                <p style={{ color:T.moss, fontFamily:T.sans, fontSize:9, fontWeight:600, letterSpacing:"0.1em", margin:"0 0 5px" }}>{lbl}</p>
                <input value={nf[key]||""} onChange={e => setNf(f=>({...f,[key]:e.target.value}))} placeholder={ph}
                  style={{ width:"100%", background:T.surface, border:`1.5px solid ${nf[key]?"rgba(45,106,79,0.3)":"rgba(45,106,79,0.12)"}`, borderRadius:12, padding:"10px 14px", fontFamily:T.sans, fontSize:14, boxSizing:"border-box", color:"#1a1a1a" }}/>
              </div>
            ))}
            <p style={{ color:T.moss, fontFamily:T.sans, fontSize:9, fontWeight:600, letterSpacing:"0.1em", margin:"0 0 8px" }}>COLOR</p>
            <div style={{ display:"flex", gap:8, marginBottom:14 }}>
              {colores.map(c => (
                <button key={c} onClick={() => setNf(f=>({...f,color:c}))} className="btn-press" style={{ width:32, height:32, borderRadius:"50%", background:c, border:nf.color===c?"3px solid #52b788":"3px solid transparent", cursor:"pointer", transition:"border 0.15s" }}/>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => { setNuevoForm(false); setNf({nombre:"",cliente:"",campaña:"",color:"#1b4332"}); }} className="btn-press" style={{ flex:1, background:"white", border:`1.5px solid rgba(45,106,79,0.15)`, borderRadius:12, padding:"11px", color:T.moss, fontFamily:T.sans, fontWeight:600, fontSize:13, cursor:"pointer" }}>Cancelar</button>
              <button onClick={() => { if(!nf.nombre.trim()) return; onAgregarProyecto(nf); setNuevoForm(false); setNf({nombre:"",cliente:"",campaña:"",color:"#1b4332"}); }} className="btn-press" style={{ flex:2, background:`linear-gradient(135deg,${T.forest},${T.moss})`, border:"none", borderRadius:12, padding:"11px", color:"white", fontFamily:T.sans, fontWeight:600, fontSize:13, cursor:"pointer" }}>✓ Crear proyecto</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setNuevoForm(true)} className="btn-press" style={{ border:`2px dashed rgba(45,106,79,0.2)`, borderRadius:18, padding:"16px", color:T.moss, fontFamily:T.sans, fontSize:13, fontWeight:500, background:"none", cursor:"pointer", textAlign:"center", transition:"background 0.15s" }}>+ Nuevo proyecto</button>
        )}
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FORMULARIO NUEVO REGISTRO
// ═══════════════════════════════════════════════════════════════
function Formulario({ tipo, proyecto, user, onGuardar, onBack }) {
  const cfg = TIPO_CFG[tipo];
  const campos = CAMPOS[tipo] || [];
  const [vals, setVals] = useState({});
  const [guardado, setGuardado] = useState(false);

  const reqsOk = campos.filter(c=>c.req&&c.tipo!=="yesno"&&!c.num).every(c=>vals[c.id]?.trim())
    && campos.filter(c=>c.req&&c.num).every(c=>vals[c.id])
    && campos.filter(c=>c.req&&c.tipo==="yesno").every(c=>vals[c.id]);
  const alertas = campos.filter(c=>c.nk&&checkAlerta(tipo,c.nk,vals[c.id])==="critico").length;

  const guardar = () => {
    const ad = campos.find(c=>c.nk&&checkAlerta(tipo,c.nk,vals[c.id])==="critico");
    onGuardar({ tipo, proyectoId:proyecto.id, valores:vals, operador:`${user.nombre} ${user.apellido}`, timestamp:ahora(), alerta:ad?{nivel:"critico",campo:ad.label}:null, sincronizado:true });
    setGuardado(true);
  };

  if (guardado) return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:T.surface, padding:28, gap:16 }}>
      <div style={{ width:80, height:80, borderRadius:"50%", background:cfg.bg, border:`3px solid ${cfg.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, animation:"scaleIn 0.3s ease" }}>{cfg.icon}</div>
      <h3 style={{ color:cfg.color, fontFamily:T.serif, fontSize:28, fontWeight:400, textAlign:"center", margin:0 }}>¡Guardado!</h3>
      {alertas > 0 && <Badge variant="red">🚨 {alertas} alerta registrada</Badge>}
      <div style={{ background:T.frost, border:`1px solid rgba(45,106,79,0.15)`, borderRadius:12, padding:"11px 16px", width:"100%" }}>
        <p style={{ color:T.moss, fontFamily:T.sans, fontSize:11, margin:0, textAlign:"center", fontWeight:500 }}>✓ Guardado localmente · No se pierde sin conexión</p>
      </div>
      <button onClick={onBack} className="btn-press" style={{ width:"100%", background:cfg.color, border:"none", borderRadius:14, padding:"14px", color:"white", fontFamily:T.sans, fontWeight:600, fontSize:14, cursor:"pointer" }}>← Volver al inicio</button>
      <button onClick={() => { setVals({}); setGuardado(false); }} className="btn-press" style={{ width:"100%", background:cfg.bg, border:"none", borderRadius:14, padding:"12px", color:cfg.color, fontFamily:T.sans, fontWeight:500, fontSize:13, cursor:"pointer" }}>+ Nuevo registro</button>
    </div>
  );

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", background:T.surface }}>
      <div style={{ padding:"14px 18px 12px", borderBottom:`1.5px solid ${cfg.bg}`, background:"rgba(255,255,255,0.95)", position:"sticky", top:0, zIndex:10, backdropFilter:"blur(12px)" }}>
        <button onClick={onBack} style={{ color:cfg.color, fontFamily:T.sans, fontSize:12, background:"none", border:"none", cursor:"pointer", padding:0, marginBottom:10, fontWeight:500 }}>‹ Inicio</button>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <IconBox icon={cfg.icon} bg={cfg.bg} size={40} radius={12} fontSize={19}/>
          <div>
            <p style={{ color:cfg.color, fontFamily:T.mono, fontSize:8, fontWeight:400, letterSpacing:"0.14em", margin:0, opacity:0.65 }}>{proyecto.nombre}</p>
            <p style={{ color:cfg.color, fontFamily:T.serif, fontSize:17, fontWeight:400, margin:0 }}>{cfg.label}</p>
          </div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
        <CamposFormulario tipo={tipo} vals={vals} setVals={setVals}/>
        <button onClick={guardar} disabled={!reqsOk} className={reqsOk?"btn-press":""} style={{ width:"100%", background:reqsOk?`linear-gradient(135deg,${cfg.color},${cfg.color}cc)`:"rgba(45,106,79,0.08)", border:"none", borderRadius:16, padding:"14px", color:reqsOk?"white":T.mist, fontFamily:T.sans, fontWeight:600, fontSize:14, cursor:reqsOk?"pointer":"default", transition:"all 0.2s" }}>
          {reqsOk ? `Guardar registro ${alertas>0?"⚠️":"✓"}` : "Completá los campos obligatorios (*)"}
        </button>
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HISTORIAL
// ═══════════════════════════════════════════════════════════════
function Historial({ registros, proyecto, onEditarRegistro, onEliminarRegistro }) {
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [expandido, setExpandido] = useState(null);
  const [editandoReg, setEditandoReg] = useState(null);

  const todos = registros.filter(r => r.proyectoId === proyecto.id);
  const filtrados = todos.filter(r => (filtro==="todos"||r.tipo===filtro) && (!busqueda||JSON.stringify(r).toLowerCase().includes(busqueda.toLowerCase())));

  if (editandoReg) {
    const reg = registros.find(r => r.id === editandoReg);
    if (!reg) { setEditandoReg(null); return null; }
    return <EditorRegistro registro={reg} onGuardar={r=>{ onEditarRegistro(r); setEditandoReg(null); }} onEliminar={()=>{ onEliminarRegistro(editandoReg); setEditandoReg(null); }} onVolver={()=>setEditandoReg(null)}/>;
  }

  return (
    <div style={{ flex:1, overflowY:"auto", background:T.surface }}>
      <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid rgba(45,106,79,0.07)`, position:"sticky", top:0, background:"rgba(244,250,246,0.97)", backdropFilter:"blur(12px)", zIndex:10 }}>
        <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, letterSpacing:"0.2em", margin:"0 0 2px" }}>HISTORIAL · {proyecto.nombre}</p>
        <h2 style={{ color:T.forest, fontFamily:T.serif, fontSize:22, fontWeight:400, margin:"0 0 10px" }}>
          Todos los <em style={{ color:T.moss }}>registros</em>
          {todos.length>0 && <span style={{ color:T.sage, fontFamily:T.sans, fontSize:16 }}> · {todos.length}</span>}
        </h2>
        <div style={{ position:"relative", marginBottom:10 }}>
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:12, opacity:0.4 }}>🔍</span>
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar en registros…"
            style={{ width:"100%", background:"white", border:`1.5px solid rgba(45,106,79,0.12)`, borderRadius:12, padding:"9px 14px 9px 34px", fontFamily:T.sans, fontSize:13, boxSizing:"border-box", color:"#1a1a1a" }}/>
        </div>
        <div style={{ display:"flex", gap:6, overflowX:"auto" }}>
          {[["todos","Todos"],...Object.entries(TIPO_CFG).map(([k,v])=>[k,`${v.icon} ${v.label.split(" ")[0]}`])].map(([id,lbl]) => (
            <button key={id} onClick={() => setFiltro(id)} className="btn-press" style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", background:filtro===id?T.moss:"rgba(45,106,79,0.07)", color:filtro===id?"white":T.moss, fontFamily:T.sans, fontSize:11, fontWeight:500, flexShrink:0, transition:"all 0.15s" }}>{lbl}</button>
          ))}
        </div>
      </div>

      <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:8 }}>
        {filtrados.length === 0 && (
          <div style={{ textAlign:"center", padding:"48px 0" }}>
            <div style={{ fontSize:36, marginBottom:10, opacity:0.3 }}>📋</div>
            <p style={{ color:T.mist, fontFamily:T.sans, fontSize:13, fontWeight:400 }}>Sin registros{filtro!=="todos"?" de este tipo":""}</p>
          </div>
        )}
        {filtrados.map(r => (
          <TarjetaRegistro key={r.id} r={r} abierto={expandido===r.id} onToggle={()=>setExpandido(expandido===r.id?null:r.id)} onEditar={()=>setEditandoReg(r.id)}/>
        ))}
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// QR
// ═══════════════════════════════════════════════════════════════
function QRCliente({ proyectos }) {
  const [sel, setSel] = useState(null);
  return (
    <div style={{ flex:1, overflowY:"auto", background:T.surface }}>
      <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid rgba(45,106,79,0.07)` }}>
        <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, letterSpacing:"0.2em", margin:"0 0 2px" }}>ACCESO CLIENTE</p>
        <h2 style={{ color:T.forest, fontFamily:T.serif, fontSize:22, fontWeight:400, margin:0 }}>Dashboard <em style={{ color:T.moss }}>QR</em></h2>
        <p style={{ color:T.mist, fontFamily:T.sans, fontSize:11, margin:"4px 0 0", fontWeight:400 }}>El cliente escanea el QR y ve sus datos en tiempo real</p>
      </div>
      <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
        {proyectos.map(p => (
          <div key={p.id} style={{ background:"white", borderRadius:18, overflow:"hidden", boxShadow:T.shadow, border:`1.5px solid rgba(45,106,79,0.07)` }}>
            <div style={{ padding:"14px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ width:42, height:42, borderRadius:12, background:p.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>⛏</div>
                <div>
                  <p style={{ color:T.forest, fontFamily:T.serif, fontSize:15, margin:0 }}>{p.nombre}</p>
                  <p style={{ color:T.mist, fontFamily:T.sans, fontSize:11, margin:"2px 0 0", fontWeight:400 }}>{p.cliente}</p>
                </div>
              </div>
              <button onClick={() => setSel(sel===p.id?null:p.id)} className="btn-press" style={{ width:"100%", background:sel===p.id?T.surface:p.color, border:sel===p.id?`1px solid rgba(45,106,79,0.15)`:"none", borderRadius:12, padding:"10px", color:sel===p.id?p.color:"white", fontFamily:T.sans, fontWeight:600, fontSize:13, cursor:"pointer", transition:"all 0.2s" }}>
                {sel===p.id ? "Ocultar QR" : "📱 Mostrar QR para cliente"}
              </button>
            </div>
            {sel===p.id && (
              <div style={{ padding:"16px", borderTop:`1px solid rgba(45,106,79,0.07)`, background:T.surface, display:"flex", flexDirection:"column", alignItems:"center", gap:12, animation:"fadeUp 0.2s ease" }}>
                <div style={{ width:150, height:150, background:"white", borderRadius:14, padding:10, boxShadow:T.shadowMd, display:"grid", gridTemplateColumns:"repeat(10,1fr)", gap:1.5 }}>
                  {Array.from({length:100}).map((_,i) => { const c=(i<30&&i%10<3)||(i<30&&i%10>6)||(i>69&&i%10<3); const r=((i*7+p.id*13)%3===0); return <div key={i} style={{ background:c||r?p.color:"transparent", borderRadius:1 }}/>; })}
                </div>
                <p style={{ color:T.forest, fontFamily:T.mono, fontSize:11, margin:0, textAlign:"center" }}>andina.app/{p.nombre.toLowerCase().replace(/ /g,"-")}</p>
                <p style={{ color:T.mist, fontFamily:T.sans, fontSize:10, margin:0, textAlign:"center", fontWeight:400 }}>Solo lectura · Sin acceso al sistema interno</p>
                <div style={{ display:"flex", gap:8, width:"100%" }}>
                  <button className="btn-press" style={{ flex:1, background:T.frost, border:"none", borderRadius:10, padding:"9px", color:T.moss, fontFamily:T.sans, fontWeight:600, fontSize:12, cursor:"pointer" }}>📤 Compartir</button>
                  <button className="btn-press" style={{ flex:1, background:T.frost, border:"none", borderRadius:10, padding:"9px", color:T.moss, fontFamily:T.sans, fontWeight:600, fontSize:12, cursor:"pointer" }}>🔄 Renovar</button>
                </div>
              </div>
            )}
          </div>
        ))}
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONSTRUCTOR DE FORMULARIOS
// Permite crear formularios custom con preguntas propias,
// editarlos, y usarlos para relevar encuestas y censos.
// ═══════════════════════════════════════════════════════════════

const TIPO_PREGUNTA_CFG = {
  texto:    { label:"Texto libre",              icon:"📝", ph:"Respuesta abierta" },
  numero:   { label:"Número",                   icon:"🔢", ph:"Valor numérico" },
  yesno:    { label:"Sí / No / Parcialmente",   icon:"✅", ph:"" },
  opcion:   { label:"Opción múltiple",          icon:"☰",  ph:"" },
};

const BASE_TIPO_CFG = {
  encuesta: { icon:"📋", label:"Encuesta Social",   color:"#1b4332", bg:"#d8f3dc" },
  censo:    { icon:"🏘",  label:"Censo Comunitario", color:"#2d4a8a", bg:"#dce8ff" },
  custom:   { icon:"✏️", label:"Personalizado",     color:"#5c3d7a", bg:"#ede8f5" },
};

// ── Editor de una pregunta individual ───────────────────────────
function EditorPregunta({ pregunta, idx, total, onChange, onEliminar, onMover }) {
  const [abierto, setAbierto] = useState(false);
  const cfg = TIPO_PREGUNTA_CFG[pregunta.tipo];

  return (
    <div style={{ background:"white", border:`1.5px solid rgba(45,106,79,0.1)`, borderRadius:14, overflow:"hidden", boxShadow:T.shadow }}>
      {/* Cabecera colapsable */}
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
          <button onClick={() => onMover(idx, -1)} disabled={idx===0} style={{ background:"none", border:"none", cursor:idx===0?"default":"pointer", fontSize:11, color:idx===0?"#ddd":T.moss, lineHeight:1, padding:0 }}>▲</button>
          <button onClick={() => onMover(idx,  1)} disabled={idx===total-1} style={{ background:"none", border:"none", cursor:idx===total-1?"default":"pointer", fontSize:11, color:idx===total-1?"#ddd":T.moss, lineHeight:1, padding:0 }}>▼</button>
        </div>
        <div style={{ width:32, height:32, borderRadius:8, background:T.surface, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{cfg.icon}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ color:"#1a1a1a", fontFamily:T.sans, fontSize:13, fontWeight:500, margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
            {pregunta.label || <span style={{ color:"#ccc" }}>Sin título</span>}
          </p>
          <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, margin:0 }}>{cfg.label} {pregunta.req && "· Obligatoria"}</p>
        </div>
        <button onClick={() => onEliminar(idx)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, color:"#ddd", padding:"2px 4px" }}>✕</button>
        <button onClick={() => setAbierto(v=>!v)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, color:T.moss, padding:"2px 4px", transition:"transform 0.2s", transform:abierto?"rotate(90deg)":"none" }}>›</button>
      </div>

      {abierto && (
        <div style={{ borderTop:`1px solid ${T.surface}`, padding:"12px 14px", display:"flex", flexDirection:"column", gap:10, background:T.surface, animation:"fadeUp 0.15s ease" }}>
          {/* Tipo */}
          <div>
            <p style={{ color:T.moss, fontFamily:T.sans, fontSize:9, fontWeight:600, letterSpacing:"0.1em", margin:"0 0 6px" }}>TIPO DE RESPUESTA</p>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {Object.entries(TIPO_PREGUNTA_CFG).map(([k, v]) => (
                <button key={k} onClick={() => onChange(idx, { tipo: k })} className="btn-press"
                  style={{ padding:"6px 10px", borderRadius:10, border:`1.5px solid ${pregunta.tipo===k?T.moss:"rgba(45,106,79,0.12)"}`, background:pregunta.tipo===k?T.frost:"white", color:pregunta.tipo===k?T.moss:"#888", fontFamily:T.sans, fontSize:11, fontWeight:pregunta.tipo===k?600:400, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
                  {v.icon} {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Etiqueta */}
          <div>
            <p style={{ color:T.moss, fontFamily:T.sans, fontSize:9, fontWeight:600, letterSpacing:"0.1em", margin:"0 0 5px" }}>PREGUNTA / ETIQUETA</p>
            <input value={pregunta.label} onChange={e => onChange(idx, { label: e.target.value })} placeholder="Ej: ¿Cuántas personas habitan el hogar?"
              style={{ width:"100%", background:"white", border:`1.5px solid rgba(45,106,79,0.15)`, borderRadius:10, padding:"9px 12px", fontFamily:T.sans, fontSize:13, boxSizing:"border-box", color:"#1a1a1a" }}/>
          </div>

          {/* Placeholder (solo para texto/numero) */}
          {(pregunta.tipo === "texto" || pregunta.tipo === "numero") && (
            <div>
              <p style={{ color:T.moss, fontFamily:T.sans, fontSize:9, fontWeight:600, letterSpacing:"0.1em", margin:"0 0 5px" }}>TEXTO DE AYUDA (opcional)</p>
              <input value={pregunta.ph||""} onChange={e => onChange(idx, { ph: e.target.value })} placeholder="Ej: Ingresá un valor entre 1 y 100"
                style={{ width:"100%", background:"white", border:`1.5px solid rgba(45,106,79,0.12)`, borderRadius:10, padding:"9px 12px", fontFamily:T.sans, fontSize:13, boxSizing:"border-box", color:"#1a1a1a" }}/>
            </div>
          )}

          {/* Opciones múltiples */}
          {pregunta.tipo === "opcion" && (
            <div>
              <p style={{ color:T.moss, fontFamily:T.sans, fontSize:9, fontWeight:600, letterSpacing:"0.1em", margin:"0 0 6px" }}>OPCIONES</p>
              {(pregunta.opciones||[""]).map((op, oi) => (
                <div key={oi} style={{ display:"flex", gap:6, marginBottom:6 }}>
                  <input value={op} onChange={e => { const ops=[...(pregunta.opciones||[""])]; ops[oi]=e.target.value; onChange(idx,{opciones:ops}); }} placeholder={`Opción ${oi+1}`}
                    style={{ flex:1, background:"white", border:`1.5px solid rgba(45,106,79,0.12)`, borderRadius:10, padding:"8px 12px", fontFamily:T.sans, fontSize:13, boxSizing:"border-box", color:"#1a1a1a" }}/>
                  <button onClick={() => { const ops=(pregunta.opciones||[""]).filter((_,i)=>i!==oi); onChange(idx,{opciones:ops.length?ops:[""]}); }} style={{ background:"none", border:"none", cursor:"pointer", color:"#ddd", fontSize:14 }}>✕</button>
                </div>
              ))}
              <button onClick={() => onChange(idx,{opciones:[...(pregunta.opciones||[""]),""]})} className="btn-press" style={{ border:`1.5px dashed rgba(45,106,79,0.2)`, borderRadius:10, padding:"7px 14px", color:T.moss, fontFamily:T.sans, fontSize:12, background:"none", cursor:"pointer" }}>+ Agregar opción</button>
            </div>
          )}

          {/* Obligatoria */}
          <button onClick={() => onChange(idx, { req: !pregunta.req })} className="btn-press"
            style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <div style={{ width:18, height:18, borderRadius:5, border:`2px solid ${pregunta.req?T.moss:"rgba(45,106,79,0.2)"}`, background:pregunta.req?T.moss:"white", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>
              {pregunta.req && <span style={{ color:"white", fontSize:10, lineHeight:1 }}>✓</span>}
            </div>
            <span style={{ color:"#555", fontFamily:T.sans, fontSize:12 }}>Obligatoria</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ── Constructor / Editor de formulario completo ──────────────────
function BuilderFormulario({ formulario, onGuardar, onVolver }) {
  const esNuevo = !formulario;
  const [nombre, setNombre] = useState(formulario?.nombre || "");
  const [tipo,   setTipo]   = useState(formulario?.tipo   || "encuesta");
  const [preguntas, setPreguntas] = useState(
    formulario?.preguntas || [{ id: Date.now(), tipo:"texto", label:"", ph:"", req:false }]
  );
  const [guardado, setGuardado] = useState(false);

  const addPregunta = () => setPreguntas(ps => [...ps, { id:Date.now(), tipo:"texto", label:"", ph:"", req:false }]);
  const delPregunta = idx => setPreguntas(ps => ps.filter((_,i)=>i!==idx));
  const updPregunta = (idx, cambios) => setPreguntas(ps => ps.map((p,i) => i===idx ? {...p,...cambios} : p));
  const moverPregunta = (idx, dir) => {
    const ps = [...preguntas];
    const ni = idx + dir;
    if (ni < 0 || ni >= ps.length) return;
    [ps[idx], ps[ni]] = [ps[ni], ps[idx]];
    setPreguntas(ps);
  };

  const guardar = () => {
    if (!nombre.trim() || preguntas.length === 0) return;
    onGuardar({ ...(formulario||{}), id: formulario?.id || Date.now(), nombre: nombre.trim(), tipo, preguntas, modificado: ahora(), version: (formulario?.version||0)+1, usos: formulario?.usos||0 });
    setGuardado(true);
  };

  if (guardado) return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:T.surface, padding:28, gap:16 }}>
      <div style={{ width:76, height:76, borderRadius:"50%", background:T.frost, border:`3px solid ${T.sage}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:34, animation:"scaleIn 0.3s ease" }}>✅</div>
      <h3 style={{ color:T.forest, fontFamily:T.serif, fontSize:26, fontWeight:400, textAlign:"center", margin:0 }}>¡Formulario guardado!</h3>
      <p style={{ color:T.mist, fontFamily:T.sans, fontSize:13, textAlign:"center", margin:0 }}>{preguntas.length} pregunta{preguntas.length!==1?"s":""} · {nombre}</p>
      <button onClick={onVolver} className="btn-press" style={{ width:"100%", background:T.moss, border:"none", borderRadius:14, padding:"14px", color:"white", fontFamily:T.sans, fontWeight:600, fontSize:14, cursor:"pointer" }}>← Volver a formularios</button>
    </div>
  );

  const cfgTipo = BASE_TIPO_CFG[tipo];
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", background:T.surface }}>
      {/* Header */}
      <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid rgba(45,106,79,0.07)`, background:"rgba(255,255,255,0.97)", position:"sticky", top:0, zIndex:10, backdropFilter:"blur(12px)" }}>
        <button onClick={onVolver} style={{ color:T.sage, fontFamily:T.sans, fontSize:12, background:"none", border:"none", cursor:"pointer", padding:0, marginBottom:10, fontWeight:500 }}>‹ Formularios</button>
        <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, letterSpacing:"0.18em", margin:"0 0 2px" }}>{esNuevo?"NUEVO FORMULARIO":"EDITAR FORMULARIO"}</p>
        <h2 style={{ color:T.forest, fontFamily:T.serif, fontSize:21, fontWeight:400, margin:0 }}>{nombre || <span style={{ color:"#ccc" }}>Sin título</span>}</h2>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:12 }}>
        {/* Nombre del formulario */}
        <div style={{ background:"white", borderRadius:16, padding:"14px", border:`1.5px solid rgba(45,106,79,0.1)`, boxShadow:T.shadow }}>
          <p style={{ color:T.moss, fontFamily:T.sans, fontSize:9, fontWeight:600, letterSpacing:"0.12em", margin:"0 0 6px" }}>NOMBRE DEL FORMULARIO</p>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Ej: Encuesta socioeconómica Q2"
            style={{ width:"100%", background:T.surface, border:`1.5px solid ${nombre?"rgba(45,106,79,0.3)":"rgba(45,106,79,0.12)"}`, borderRadius:12, padding:"11px 14px", fontFamily:T.sans, fontSize:14, boxSizing:"border-box", color:"#1a1a1a", fontWeight:500 }}/>

          {/* Tipo de formulario */}
          <p style={{ color:T.moss, fontFamily:T.sans, fontSize:9, fontWeight:600, letterSpacing:"0.12em", margin:"12px 0 6px" }}>TIPO</p>
          <div style={{ display:"flex", gap:8 }}>
            {Object.entries(BASE_TIPO_CFG).map(([k,v]) => (
              <button key={k} onClick={() => setTipo(k)} className="btn-press"
                style={{ flex:1, padding:"9px 6px", borderRadius:12, border:`1.5px solid ${tipo===k?v.color:"rgba(45,106,79,0.12)"}`, background:tipo===k?v.bg:"white", cursor:"pointer" }}>
                <div style={{ fontSize:16, marginBottom:2 }}>{v.icon}</div>
                <p style={{ color:tipo===k?v.color:"#aaa", fontFamily:T.sans, fontSize:9, fontWeight:tipo===k?600:400, margin:0, lineHeight:1.3 }}>{v.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Lista de preguntas */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, letterSpacing:"0.18em", margin:0 }}>PREGUNTAS · {preguntas.length}</p>
        </div>

        {preguntas.map((p, idx) => (
          <EditorPregunta key={p.id} pregunta={p} idx={idx} total={preguntas.length} onChange={updPregunta} onEliminar={delPregunta} onMover={moverPregunta}/>
        ))}

        <button onClick={addPregunta} className="btn-press" style={{ border:`2px dashed rgba(45,106,79,0.2)`, borderRadius:14, padding:"13px", color:T.moss, fontFamily:T.sans, fontSize:13, fontWeight:500, background:"none", cursor:"pointer", textAlign:"center" }}>+ Agregar pregunta</button>

        {/* Guardar */}
        <button onClick={guardar} disabled={!nombre.trim() || preguntas.length===0} className={nombre.trim()&&preguntas.length?"btn-press":""} style={{ width:"100%", background:nombre.trim()&&preguntas.length?`linear-gradient(135deg,${T.forest},${T.moss})`:"rgba(45,106,79,0.08)", border:"none", borderRadius:16, padding:"14px", color:nombre.trim()&&preguntas.length?"white":T.mist, fontFamily:T.sans, fontWeight:600, fontSize:14, cursor:nombre.trim()&&preguntas.length?"pointer":"default", transition:"all 0.2s" }}>
          {esNuevo?"Crear formulario ✓":"Guardar cambios ✓"}
        </button>
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

// ── Render de campos custom al completar un formulario ───────────
function CamposCustom({ preguntas, vals, setVals }) {
  return (
    <>
      {preguntas.map((p, idx) => (
        <div key={p.id||idx} style={{ display:"flex", flexDirection:"column", gap:6 }}>
          <label style={{ color:T.moss, fontFamily:T.sans, fontSize:10, fontWeight:600, letterSpacing:"0.08em", opacity:0.85 }}>
            {(p.label||"Sin título").toUpperCase()} {p.req && <span style={{ color:"#e07070" }}>*</span>}
          </label>
          {p.tipo === "yesno" ? (
            <div style={{ display:"flex", gap:6 }}>
              {["Sí","No","Parcialmente"].map(o => (
                <button key={o} onClick={() => setVals(v=>({...v,[p.id]:o}))} className="btn-press"
                  style={{ flex:1, padding:"10px 8px", borderRadius:10, border:`1.5px solid ${vals[p.id]===o?T.moss:"rgba(45,106,79,0.12)"}`, background:vals[p.id]===o?T.moss:"white", color:vals[p.id]===o?"white":"#555", fontFamily:T.sans, fontSize:12, fontWeight:vals[p.id]===o?600:400, cursor:"pointer", transition:"all 0.15s" }}>{o}</button>
              ))}
            </div>
          ) : p.tipo === "opcion" ? (
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {(p.opciones||[]).map(op => (
                <button key={op} onClick={() => setVals(v=>({...v,[p.id]:op}))} className="btn-press"
                  style={{ padding:"10px 14px", borderRadius:10, border:`1.5px solid ${vals[p.id]===op?T.moss:"rgba(45,106,79,0.12)"}`, background:vals[p.id]===op?T.frost:"white", color:vals[p.id]===op?T.moss:"#555", fontFamily:T.sans, fontSize:13, fontWeight:vals[p.id]===op?600:400, cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}>
                  {vals[p.id]===op ? "● " : "○ "}{op}
                </button>
              ))}
            </div>
          ) : (
            <input type={p.tipo==="numero"?"number":"text"} value={vals[p.id]||""} onChange={e=>setVals(v=>({...v,[p.id]:e.target.value}))} placeholder={p.ph||""}
              style={{ width:"100%", background:"white", border:`1.5px solid ${vals[p.id]?"rgba(45,106,79,0.35)":"rgba(45,106,79,0.12)"}`, borderRadius:12, padding:"11px 14px", fontFamily:T.sans, fontSize:14, boxSizing:"border-box", color:"#1a1a1a", transition:"border-color 0.2s" }}/>
          )}
        </div>
      ))}
    </>
  );
}

// ── Completar un formulario custom (al relevar) ──────────────────
function RellenarFormularioCustom({ formulario, proyecto, user, onGuardar, onBack }) {
  const [vals, setVals] = useState({});
  const [guardado, setGuardado] = useState(false);
  const cfg = BASE_TIPO_CFG[formulario.tipo] || BASE_TIPO_CFG.custom;
  const reqsOk = (formulario.preguntas||[]).filter(p=>p.req).every(p => vals[p.id]?.toString().trim());

  const guardar = () => {
    onGuardar({ tipo:`custom_${formulario.id}`, proyectoId:proyecto.id, valores:vals, operador:`${user.nombre} ${user.apellido}`, timestamp:ahora(), formularioId:formulario.id, formularioNombre:formulario.nombre, alerta:null, sincronizado:true });
    setGuardado(true);
  };

  if (guardado) return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:T.surface, padding:28, gap:16 }}>
      <div style={{ width:76, height:76, borderRadius:"50%", background:cfg.bg, border:`3px solid ${cfg.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:34, animation:"scaleIn 0.3s ease" }}>{cfg.icon}</div>
      <h3 style={{ color:cfg.color, fontFamily:T.serif, fontSize:28, fontWeight:400, textAlign:"center", margin:0 }}>¡Guardado!</h3>
      <div style={{ background:T.frost, border:`1px solid rgba(45,106,79,0.15)`, borderRadius:12, padding:"11px 16px", width:"100%" }}>
        <p style={{ color:T.moss, fontFamily:T.sans, fontSize:11, margin:0, textAlign:"center", fontWeight:500 }}>✓ Guardado localmente · No se pierde sin conexión</p>
      </div>
      <button onClick={onBack} className="btn-press" style={{ width:"100%", background:cfg.color, border:"none", borderRadius:14, padding:"14px", color:"white", fontFamily:T.sans, fontWeight:600, fontSize:14, cursor:"pointer" }}>← Volver al inicio</button>
      <button onClick={() => { setVals({}); setGuardado(false); }} className="btn-press" style={{ width:"100%", background:cfg.bg, border:"none", borderRadius:14, padding:"12px", color:cfg.color, fontFamily:T.sans, fontWeight:500, fontSize:13, cursor:"pointer" }}>+ Nuevo registro</button>
    </div>
  );

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", background:T.surface }}>
      <div style={{ padding:"14px 18px 12px", borderBottom:`1.5px solid ${cfg.bg}`, background:"rgba(255,255,255,0.95)", position:"sticky", top:0, zIndex:10, backdropFilter:"blur(12px)" }}>
        <button onClick={onBack} style={{ color:cfg.color, fontFamily:T.sans, fontSize:12, background:"none", border:"none", cursor:"pointer", padding:0, marginBottom:10, fontWeight:500 }}>‹ Inicio</button>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <IconBox icon={cfg.icon} bg={cfg.bg} size={40} radius={12} fontSize={18}/>
          <div>
            <p style={{ color:cfg.color, fontFamily:T.mono, fontSize:8, fontWeight:400, letterSpacing:"0.14em", margin:0, opacity:0.65 }}>{proyecto.nombre}</p>
            <p style={{ color:cfg.color, fontFamily:T.serif, fontSize:17, fontWeight:400, margin:0 }}>{formulario.nombre}</p>
          </div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
        <CamposCustom preguntas={formulario.preguntas||[]} vals={vals} setVals={setVals}/>
        <button onClick={guardar} disabled={!reqsOk} className={reqsOk?"btn-press":""} style={{ width:"100%", background:reqsOk?`linear-gradient(135deg,${cfg.color},${cfg.color}cc)`:"rgba(45,106,79,0.08)", border:"none", borderRadius:16, padding:"14px", color:reqsOk?"white":T.mist, fontFamily:T.sans, fontWeight:600, fontSize:14, cursor:reqsOk?"pointer":"default", transition:"all 0.2s" }}>
          {reqsOk ? "Guardar registro ✓" : "Completá los campos obligatorios (*)"}
        </button>
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

// ── Pantalla principal de Formularios ───────────────────────────
function Formularios({ onUsarFormulario }) {
  const [formularios, setFormularios] = useState(() => load("formularios_custom", []));
  const [vista, setVista] = useState("lista"); // "lista" | "builder" | "detalle"
  const [editando, setEditando] = useState(null);

  const guardarFormulario = f => {
    const existe = formularios.find(x => x.id === f.id);
    const nuevos = existe ? formularios.map(x => x.id===f.id?f:x) : [...formularios, f];
    setFormularios(nuevos);
    save("formularios_custom", nuevos);
    setVista("lista");
    setEditando(null);
  };

  const eliminarFormulario = id => {
    const nuevos = formularios.filter(f => f.id !== id);
    setFormularios(nuevos);
    save("formularios_custom", nuevos);
    setVista("lista");
    setEditando(null);
  };

  if (vista === "builder") {
    return <BuilderFormulario formulario={editando} onGuardar={guardarFormulario} onVolver={() => { setVista("lista"); setEditando(null); }}/>;
  }

  if (vista === "detalle" && editando) {
    const f = editando;
    const cfg = BASE_TIPO_CFG[f.tipo] || BASE_TIPO_CFG.custom;
    return (
      <div style={{ flex:1, overflowY:"auto", background:T.surface }}>
        <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid rgba(45,106,79,0.07)`, position:"sticky", top:0, background:"rgba(244,250,246,0.97)", backdropFilter:"blur(12px)", zIndex:10 }}>
          <button onClick={() => { setVista("lista"); setEditando(null); }} style={{ color:T.sage, fontFamily:T.sans, fontSize:12, background:"none", border:"none", cursor:"pointer", padding:0, marginBottom:10, fontWeight:500 }}>‹ Formularios</button>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <IconBox icon={cfg.icon} bg={cfg.bg} size={40} radius={11} fontSize={18}/>
            <div style={{ flex:1 }}>
              <p style={{ color:cfg.color, fontFamily:T.mono, fontSize:8, letterSpacing:"0.14em", margin:0, opacity:0.65 }}>{cfg.label.toUpperCase()}</p>
              <p style={{ color:T.forest, fontFamily:T.serif, fontSize:18, fontWeight:400, margin:0 }}>{f.nombre}</p>
            </div>
          </div>
        </div>
        <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
          {/* Stats */}
          <div style={{ display:"flex", gap:8 }}>
            {[["Preguntas",(f.preguntas||[]).length],["Versión",f.version||1],["Usos",f.usos||0]].map(([lbl,val]) => (
              <div key={lbl} style={{ flex:1, background:"white", borderRadius:12, padding:"10px", textAlign:"center", border:`1px solid rgba(45,106,79,0.08)` }}>
                <p style={{ color:T.forest, fontFamily:T.serif, fontSize:22, margin:0 }}>{val}</p>
                <p style={{ color:T.mist, fontFamily:T.mono, fontSize:8, margin:0, letterSpacing:"0.06em" }}>{lbl.toUpperCase()}</p>
              </div>
            ))}
          </div>

          {/* Preview preguntas */}
          <div style={{ background:"white", borderRadius:16, border:`1.5px solid rgba(45,106,79,0.08)`, overflow:"hidden", boxShadow:T.shadow }}>
            <div style={{ padding:"12px 14px", borderBottom:`1px solid ${T.surface}` }}>
              <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, letterSpacing:"0.14em", margin:0 }}>VISTA PREVIA</p>
            </div>
            {(f.preguntas||[]).map((p, i) => {
              const pcfg = TIPO_PREGUNTA_CFG[p.tipo] || TIPO_PREGUNTA_CFG.texto;
              return (
                <div key={i} style={{ padding:"10px 14px", borderBottom:i<(f.preguntas||[]).length-1?`1px solid ${T.surface}`:"none", display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:13 }}>{pcfg.icon}</span>
                  <div style={{ flex:1 }}>
                    <p style={{ color:"#1a1a1a", fontFamily:T.sans, fontSize:12, fontWeight:500, margin:0 }}>{p.label||"Sin título"}</p>
                    <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, margin:0 }}>{pcfg.label}{p.req?" · Obligatoria":""}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, margin:"4px 0 0", textAlign:"center", letterSpacing:"0.06em" }}>Modificado: {f.modificado||"—"}</p>

          <button onClick={() => onUsarFormulario(f)} className="btn-press" style={{ width:"100%", background:`linear-gradient(135deg,${cfg.color},${cfg.color}cc)`, border:"none", borderRadius:14, padding:"13px", color:"white", fontFamily:T.sans, fontWeight:600, fontSize:14, cursor:"pointer" }}>
            Usar este formulario →
          </button>
          <button onClick={() => { setEditando(f); setVista("builder"); }} className="btn-press" style={{ width:"100%", background:"white", border:`1.5px solid rgba(45,106,79,0.15)`, borderRadius:14, padding:"12px", color:T.moss, fontFamily:T.sans, fontWeight:600, fontSize:13, cursor:"pointer" }}>
            ✏ Editar preguntas
          </button>
          <button onClick={() => eliminarFormulario(f.id)} className="btn-press" style={{ width:"100%", background:T.dangerBg, border:"none", borderRadius:14, padding:"12px", color:T.danger, fontFamily:T.sans, fontWeight:600, fontSize:13, cursor:"pointer" }}>
            🗑 Eliminar formulario
          </button>
          <div style={{ height:16 }}/>
        </div>
      </div>
    );
  }

  // ── LISTA ────────────────────────────────────────────────────
  return (
    <div style={{ flex:1, overflowY:"auto", background:T.surface }}>
      <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid rgba(45,106,79,0.07)`, position:"sticky", top:0, background:"rgba(244,250,246,0.97)", backdropFilter:"blur(12px)", zIndex:10 }}>
        <p style={{ color:T.mist, fontFamily:T.mono, fontSize:9, letterSpacing:"0.2em", margin:"0 0 2px" }}>CONSTRUCTOR</p>
        <h2 style={{ color:T.forest, fontFamily:T.serif, fontSize:22, fontWeight:400, margin:0 }}>
          Mis <em style={{ color:T.moss }}>formularios</em>
        </h2>
        <p style={{ color:T.mist, fontFamily:T.sans, fontSize:11, margin:"4px 0 0", fontWeight:400 }}>Diseñá y guardá tus propias encuestas y censos</p>
      </div>

      <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
        {/* Info banner */}
        <div style={{ background:`linear-gradient(135deg,${T.forest},${T.moss})`, borderRadius:16, padding:"14px 16px" }}>
          <p style={{ color:"rgba(255,255,255,0.55)", fontFamily:T.mono, fontSize:9, letterSpacing:"0.14em", margin:"0 0 4px" }}>CÓMO FUNCIONA</p>
          <p style={{ color:"rgba(255,255,255,0.75)", fontFamily:T.sans, fontSize:11, margin:0, lineHeight:1.6, fontWeight:400 }}>Creá un formulario con tus preguntas → aparece en Inicio para usarlo en el campo → los registros se guardan en Historial.</p>
        </div>

        {formularios.length === 0 ? (
          <div style={{ textAlign:"center", padding:"40px 0" }}>
            <div style={{ fontSize:36, marginBottom:10, opacity:0.3 }}>📋</div>
            <p style={{ color:T.mist, fontFamily:T.sans, fontSize:13, fontWeight:400 }}>Todavía no creaste ningún formulario</p>
            <p style={{ color:"#ccc", fontFamily:T.sans, fontSize:11, marginBottom:20 }}>Tocá el botón de abajo para empezar</p>
          </div>
        ) : (
          formularios.map(f => {
            const cfg = BASE_TIPO_CFG[f.tipo] || BASE_TIPO_CFG.custom;
            return (
              <button key={f.id} onClick={() => { setEditando(f); setVista("detalle"); }} className="card-hover btn-press" style={{ background:"white", border:`1.5px solid rgba(45,106,79,0.08)`, borderRadius:18, padding:"14px 16px", cursor:"pointer", textAlign:"left", boxShadow:T.shadow }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <IconBox icon={cfg.icon} bg={cfg.bg} size={42} radius={12} fontSize={18}/>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:4 }}>
                      <span style={{ color:T.forest, fontFamily:T.serif, fontSize:15 }}>{f.nombre}</span>
                      <Badge variant="slate" small>{cfg.label}</Badge>
                    </div>
                    <p style={{ color:"#bbb", fontFamily:T.sans, fontSize:11, margin:0, fontWeight:400 }}>
                      {(f.preguntas||[]).length} pregunta{(f.preguntas||[]).length!==1?"s":""} · {f.usos||0} usos · v{f.version||1}
                    </p>
                  </div>
                  <span style={{ color:T.mist, fontSize:18 }}>›</span>
                </div>
              </button>
            );
          })
        )}

        <button onClick={() => { setEditando(null); setVista("builder"); }} className="btn-press" style={{ border:`2px dashed rgba(45,106,79,0.22)`, borderRadius:18, padding:"16px", color:T.moss, fontFamily:T.sans, fontSize:13, fontWeight:500, background:"none", cursor:"pointer", textAlign:"center" }}>
          + Crear nuevo formulario
        </button>
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [screen,       setScreen]       = useState("splash");
  const [user,         setUser]         = useState(null);
  const [tab,          setTab]          = useState("inicio");
  const [tipoForm,     setTipoForm]     = useState(null);
  const [formCustom,   setFormCustom]   = useState(null); // formulario custom seleccionado
  const [pendientes,   setPendientes]   = useState(0);

  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const goOn  = () => setOnline(true);
    const goOff = () => setOnline(false);
    window.addEventListener("online",  goOn);
    window.addEventListener("offline", goOff);
    return () => { window.removeEventListener("online",goOn); window.removeEventListener("offline",goOff); };
  }, []);

  const [proyectos, setProyectos] = useState(() => load("proyectos", PROYECTOS_DEF));
  const [proyecto,  setProyecto]  = useState(() => {
    const ps = load("proyectos", PROYECTOS_DEF);
    const id = load("proyectoActivo", 1);
    return ps.find(p => p.id===id) || ps[0];
  });

  const actualizarProyecto = (id, cambios) => {
    const n = proyectos.map(p => p.id===id ? {...p,...cambios} : p);
    setProyectos(n); save("proyectos", n);
    if (proyecto?.id===id) { const a={...proyecto,...cambios}; setProyecto(a); save("proyectoActivo",a.id); }
  };
  const cambiarActivo = p => { setProyecto(p); save("proyectoActivo", p.id); };
  const agregarProyecto = datos => {
    const nuevo = { ...datos, id: Date.now() };
    const n = [...proyectos, nuevo];
    setProyectos(n); save("proyectos", n);
  };

  const [registros, setRegistros] = useState(() => load("registros", []));
  const addRegistro    = r => { const n=[{...r,id:Date.now()},...registros]; setRegistros(n); save("registros",n); if(!online) setPendientes(p=>p+1); };
  const editRegistro   = r => { const n=registros.map(x=>x.id===r.id?r:x); setRegistros(n); save("registros",n); };
  const deleteRegistro = id => { const n=registros.filter(x=>x.id!==id); setRegistros(n); save("registros",n); };
  const sincronizar    = () => { const s=registros.map(r=>({...r,sincronizado:true})); setRegistros(s); save("registros",s); setPendientes(0); };
  const exportar = () => exportarCSV(registros, proyectos);

  const hoyCount = proyecto ? registros.filter(r => r.proyectoId===proyecto.id).length : 0;

  // Formularios custom guardados (para mostrar botones en Inicio)
  const [formulariosCust, setFormulariosCust] = useState(() => load("formularios_custom", []));
  // Refrescar cuando vuelve de Formularios
  const refrescarFormularios = () => setFormulariosCust(load("formularios_custom", []));

  const usarFormulario = f => {
    setFormCustom(f);
    setTab("form_custom");
  };

  const renderContent = () => {
    if (screen==="login") return <Login onLogin={u => { setUser(u); setScreen("app"); setTab("inicio"); }}/>;
    if (screen!=="app") return null;
    if (tab==="proyectos") return (
      <Proyectos proyectos={proyectos} proyectoActivo={proyecto} registros={registros}
        onCambiarActivo={cambiarActivo} onActualizar={actualizarProyecto}
        onEditarRegistro={editRegistro} onEliminarRegistro={deleteRegistro}
        onNuevoRegistro={p => { cambiarActivo(p); setTipoForm(null); setTab("inicio"); }}
        onAgregarProyecto={agregarProyecto}
        onVolver={() => setTab("inicio")}/>
    );
    if (tab==="form"&&tipoForm) return <Formulario tipo={tipoForm} proyecto={proyecto} user={user} onGuardar={r=>addRegistro(r)} onBack={()=>{ setTipoForm(null); setTab("inicio"); }}/>;
    if (tab==="form_custom"&&formCustom) return <RellenarFormularioCustom formulario={formCustom} proyecto={proyecto} user={user} onGuardar={r=>addRegistro(r)} onBack={()=>{ setFormCustom(null); setTab("inicio"); }}/>;
    if (tab==="historial") return <Historial registros={registros} proyecto={proyecto} onEditarRegistro={editRegistro} onEliminarRegistro={deleteRegistro}/>;
    if (tab==="qr") return <QRCliente proyectos={proyectos}/>;
    if (tab==="formularios") return <Formularios onUsarFormulario={f => { refrescarFormularios(); usarFormulario(f); }}/>;
    return <Inicio user={user} proyecto={proyecto} registros={registros} online={online} pendientes={pendientes} formulariosCust={formulariosCust} onNav={tipo=>{ setTipoForm(tipo); setTab("form"); }} onNavCustom={f=>{ setFormCustom(f); setTab("form_custom"); }} onVerProyectos={()=>setTab("proyectos")} onSincronizar={sincronizar} onExportar={exportar}/>;
  };

  // NAV items
  const NAV_ITEMS = [
    { id:"inicio",      icon:"⊞",  label:"Inicio" },
    { id:"formularios", icon:"📝", label:"Plantillas" },
    { fab:true },
    { id:"qr",          icon:"📱", label:"QR" },
    { id:"historial",   icon:"☰",  label:"Historial", badge:hoyCount },
  ];

  return (
    <div style={{ width:"100%", height:"100vh", display:"flex", flexDirection:"column", overflow:"hidden", position:"relative", fontFamily:T.sans }}>
      <style>{GLOBAL_CSS}</style>
      
      {screen==="splash" && <Splash onDone={() => setScreen("login")}/>}

      {/* STATUS BAR */}
      {screen!=="splash" && (
        <div style={{ height:30, background:T.forest, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 18px", flexShrink:0 }}>
          <span style={{ color:"rgba(255,255,255,0.4)", fontFamily:T.mono, fontSize:10, letterSpacing:"0.06em" }}>{horaCorta()}</span>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {pendientes > 0 && (
              <span style={{ background:"rgba(198,124,26,0.8)", color:"white", fontFamily:T.sans, fontSize:9, fontWeight:600, padding:"1px 8px", borderRadius:8 }}>{pendientes} pend.</span>
            )}
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:online?"#52b788":"#e07070", boxShadow:online?"0 0 6px #52b78888":"0 0 6px #e0707088" }}/>
              <span style={{ color:online?"#52b788":"#e07070", fontFamily:T.mono, fontSize:9, letterSpacing:"0.04em" }}>{online?"En línea":"Sin conexión"}</span>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>{renderContent()}</div>

      {/* NAV BAR — rediseñada */}
      {screen==="app" && tab!=="form" && tab!=="form_custom" && tab!=="proyectos" && (
        <div style={{ height:66, background:"white", borderTop:`1px solid rgba(45,106,79,0.07)`, display:"flex", alignItems:"center", justifyContent:"space-around", flexShrink:0, boxShadow:"0 -6px 24px rgba(13,40,24,0.07)" }}>
          {NAV_ITEMS.map((t, i) =>
            t.fab ? (
              <button key="fab" onClick={() => setTab("inicio")} className="btn-press" style={{ width:52, height:52, borderRadius:"50%", background:`linear-gradient(135deg,${T.moss},${T.forest})`, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginTop:-22, boxShadow:`0 6px 20px rgba(27,67,50,0.32)`, flex:1 }}>
                <span style={{ fontSize:24, color:"white", lineHeight:1 }}>+</span>
              </button>
            ) : (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, flex:1, position:"relative", paddingBottom:2 }}>
                <span style={{ fontSize:tab===t.id?18:15, transition:"all 0.2s", filter:tab===t.id?"none":"grayscale(0.4) opacity(0.45)" }}>{t.icon}</span>
                <span style={{ fontFamily:T.mono, fontSize:8, color:tab===t.id?T.moss:"#ccc", fontWeight:tab===t.id?400:300, letterSpacing:"0.04em", transition:"color 0.2s" }}>{t.label}</span>
                {tab===t.id && <div style={{ width:16, height:2, background:T.sage, borderRadius:2, position:"absolute", bottom:0 }}/>}
                {t.badge>0 && <div style={{ position:"absolute", top:0, right:8, width:15, height:15, borderRadius:"50%", background:T.sage, display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ color:"white", fontFamily:T.mono, fontSize:8 }}>{t.badge}</span></div>}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
