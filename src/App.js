import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// LOGO ANDINA — tres montañas misma base, central más alta
// ═══════════════════════════════════════════════════════════════
function AndinaLogo({ size = "md", light = false, showSubtitle = true }) {
  const sizes = {
    sm:  { w: 80,  h: 58,  sp: 2,  name: 12, sub: 5   },
    md:  { w: 130, h: 94,  sp: 3,  name: 19, sub: 6.5  },
    lg:  { w: 200, h: 144, sp: 4,  name: 28, sub: 8.5  },
    xl:  { w: 300, h: 216, sp: 6,  name: 42, sub: 11   },
  };
  const s = sizes[size];
  const cx = s.w / 2;
  const base  = s.h * 0.46;
  const hLat  = base * 0.44;
  const hCen  = base * 0.60;
  const mW = s.w * 0.60; const mL = cx - mW/2; const mR = cx + mW/2;
  const unit = mW / 5;
  const l1x=mL; const l1x2=mL+unit*2; const l1cx=(l1x+l1x2)/2;
  const m1x=mL+unit; const m1x2=mR-unit;
  const r1x=mR-unit*2; const r1x2=mR; const r1cx=(r1x+r1x2)/2;
  const v1=light?"#2d6a4f":"#52b788"; const v2=light?"#40916c":"#74c69d";
  const tc=light?"#1b4332":"white"; const sc=light?"#2d6a4f":"#95d5b2";
  const nameY=base+s.name*1.55; const lineY=nameY+s.name*0.32; const subY=lineY+s.sub*2.0;
  return (
    <svg width={s.w} height={s.h} viewBox={`0 0 ${s.w} ${s.h}`} style={{ display:"block" }}>
      <defs><style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400&family=Montserrat:wght@300&display=swap');`}</style></defs>
      <polygon points={`${l1x},${base} ${l1cx},${base-hLat} ${l1x2},${base}`} fill={v1} opacity="0.82"/>
      <polygon points={`${m1x},${base} ${cx},${base-hCen} ${m1x2},${base}`} fill={v2}/>
      <polygon points={`${r1x},${base} ${r1cx},${base-hLat} ${r1x2},${base}`} fill={v1} opacity="0.82"/>
      <line x1={mL-4} y1={base} x2={mR+4} y2={base} stroke="#52b788" strokeWidth="0.8" opacity="0.3"/>
      <text x={cx} y={nameY} textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize={s.name} fontWeight="400" fill={tc} letterSpacing={s.sp}>ANDINA</text>
      <line x1={cx-s.w*0.20} y1={lineY} x2={cx+s.w*0.20} y2={lineY} stroke="#52b788" strokeWidth="0.7" opacity="0.45"/>
      {showSubtitle&&<text x={cx} y={subY} textAnchor="middle" fontFamily="'Montserrat',system-ui,sans-serif" fontSize={s.sub} fontWeight="300" fill={sc} letterSpacing={s.sp*0.75}>CONSULTORA SOCIOAMBIENTAL</text>}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// PERSISTENCIA localStorage
// ═══════════════════════════════════════════════════════════════
function save(key, data) { try { localStorage.setItem(`andina_${key}`, JSON.stringify(data)); } catch(e) {} }
function load(key, def)  { try { const v=localStorage.getItem(`andina_${key}`); return v?JSON.parse(v):def; } catch(e) { return def; } }

// ═══════════════════════════════════════════════════════════════
// DATOS
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
  encuesta: { icon:"📋", label:"Encuesta Social",   color:"#1b4332", bg:"#d8f3dc" },
  censo:    { icon:"🏘", label:"Censo Comunitario", color:"#2d4a8a", bg:"#dce8ff" },
  agua:     { icon:"💧", label:"Monitoreo Agua",    color:"#1e6091", bg:"#d0e8f5" },
  aire:     { icon:"💨", label:"Monitoreo Aire",    color:"#5c4a1e", bg:"#f5ead0" },
  suelo:    { icon:"🌱", label:"Monitoreo Suelo",   color:"#4a2c0a", bg:"#f0dfc8" },
};
const NORMATIVA = {
  agua:  { ph:{min:6.5,max:8.5,norma:"Ley 25.688 Art. 6°"}, turbidez:{max:5,norma:"CAA Art. 982"}, oxigeno:{min:6,norma:"Res. SAyDS 97/2001"}, conductividad:{max:1500,norma:"Ley 24.051"} },
  aire:  { pm10:{max:50,norma:"Ley 20.284 Art. 11°"}, pm25:{max:25,norma:"Res. 91/2016 SAyDS"}, ruido:{max:55,norma:"Ley 13.660 Art. 4°"} },
  suelo: { ph:{min:6.0,max:7.5,norma:"Ley 24.051 Art. 2°"}, cobertura:{min:60,norma:"Ley 26.331 Art. 4°"} },
};
const CAMPOS = {
  encuesta: [
    { id:"comunidad",   label:"Comunidad / Zona",                 ph:"Ej: Los Molles",              req:true  },
    { id:"actividad",   label:"Actividad económica predominante", ph:"Ej: Ganadería",               req:true  },
    { id:"acceso_agua", label:"¿Tiene acceso a agua potable?",    req:true, tipo:"yesno"            },
    { id:"servicios",   label:"Servicios disponibles",            ph:"Ej: Luz, gas, internet",      req:false },
    { id:"impacto",     label:"Percepción del impacto ambiental", ph:"Positivo / Negativo / Neutro",req:false },
    { id:"obs",         label:"Observaciones",                    ph:"Notas adicionales…",          req:false, area:true },
  ],
  censo: [
    { id:"comunidad", label:"Comunidad / Localidad",           ph:"Ej: Villa Unión",      req:true       },
    { id:"hogares",   label:"N° de hogares relevados",         ph:"Ej: 12",               req:true, num:true },
    { id:"actividad", label:"Actividad principal de la zona",  ph:"Ej: Minería",          req:true       },
    { id:"servicios", label:"Servicios básicos disponibles",   ph:"Ej: Agua, luz, gas",   req:false      },
    { id:"referente", label:"Referente comunitario",           ph:"Nombre del referente", req:false      },
    { id:"obs",       label:"Observaciones",                   ph:"Notas…",               req:false, area:true },
  ],
  agua: [
    { id:"punto",         label:"Punto de muestreo",         ph:"Ej: Río Los Molles Norte", req:true            },
    { id:"ph",            label:"pH",                        ph:"Ref: 6.5–8.5",             req:true, num:true, nk:"ph"           },
    { id:"turbidez",      label:"Turbidez (NTU)",            ph:"Ref: < 5",                 req:true, num:true, nk:"turbidez"     },
    { id:"oxigeno",       label:"Oxígeno disuelto (mg/L)",   ph:"Ref: > 6",                 req:false,num:true, nk:"oxigeno"      },
    { id:"conductividad", label:"Conductividad (μS/cm)",     ph:"Ref: < 1500",              req:false,num:true, nk:"conductividad"},
    { id:"temperatura",   label:"Temperatura (°C)",          ph:"Ej: 14",                   req:false,num:true                   },
    { id:"obs",           label:"Observaciones",             ph:"Condiciones del sitio…",   req:false, area:true                 },
  ],
  aire: [
    { id:"punto",  label:"Punto de muestreo",                ph:"Ej: Acceso principal",   req:true            },
    { id:"pm10",   label:"PM10 (μg/m³)",                     ph:"Ref: < 50",              req:true, num:true, nk:"pm10"  },
    { id:"pm25",   label:"PM2.5 (μg/m³)",                   ph:"Ref: < 25",              req:false,num:true, nk:"pm25"  },
    { id:"ruido",  label:"Ruido (dB)",                       ph:"Ref: < 55",              req:true, num:true, nk:"ruido" },
    { id:"viento", label:"Dirección y velocidad del viento", ph:"Ej: NE 15 km/h",         req:false          },
    { id:"obs",    label:"Observaciones",                    ph:"Condiciones del sitio…", req:false, area:true},
  ],
  suelo: [
    { id:"punto",         label:"Punto de muestreo",        ph:"Ej: Talud sector B",                   req:true            },
    { id:"ph",            label:"pH suelo",                 ph:"Ref: 6.0–7.5",                         req:true, num:true, nk:"ph"       },
    { id:"cobertura",     label:"Cobertura vegetal (%)",    ph:"Ref: > 60%",                            req:false,num:true, nk:"cobertura"},
    { id:"erosion",       label:"Erosión",                  ph:"Sin erosión / Leve / Moderada / Severa",req:false          },
    { id:"contaminantes", label:"Contaminantes detectados", ph:"Sin detección / Describir",             req:false          },
    { id:"obs",           label:"Observaciones",            ph:"Condiciones del sitio…",                req:false, area:true},
  ],
};

function ahora() { return new Date().toLocaleString("es-AR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}); }
function horaCorta() { return new Date().toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"}); }
function checkAlerta(tipo, key, val) {
  const r=NORMATIVA[tipo]?.[key]; if(!r||!val) return null;
  const v=parseFloat(val); if(isNaN(v)) return null;
  if((r.max&&v>r.max)||(r.min&&v<r.min)) return "critico";
  if((r.max&&v>r.max*0.88)||(r.min&&v<r.min*1.12)) return "alerta";
  return null;
}

// ═══════════════════════════════════════════════════════════════
// SPLASH
// ═══════════════════════════════════════════════════════════════
function Splash({ onDone }) {
  const [ph,setPh]=useState(0);
  useEffect(()=>{
    const ts=[setTimeout(()=>setPh(1),400),setTimeout(()=>setPh(2),1200),setTimeout(()=>setPh(3),2600),setTimeout(onDone,3400)];
    return ()=>ts.forEach(clearTimeout);
  },[]);
  return (
    <div style={{ position:"fixed",inset:0,zIndex:999,background:"#1b4332",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:ph===3?0:1,transition:ph===3?"opacity 0.8s":"none",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:-120,right:-120,width:340,height:340,borderRadius:"50%",background:"rgba(82,183,136,0.06)" }}/>
      <div style={{ opacity:ph>=0?1:0,transform:ph>=0?"scale(1) translateY(0)":"scale(0.8) translateY(24px)",transition:"all 1s cubic-bezier(0.34,1.4,0.64,1)",display:"flex",flexDirection:"column",alignItems:"center" }}>
        <AndinaLogo size="xl" showSubtitle={ph>=1}/>
      </div>
      <div style={{ position:"absolute",bottom:60,left:"20%",right:"20%",opacity:ph>=2?1:0,transition:"opacity 0.5s" }}>
        <div style={{ width:"100%",height:2,background:"rgba(255,255,255,0.07)",borderRadius:2,overflow:"hidden" }}>
          <div style={{ height:"100%",width:ph>=2?"100%":"0%",background:"linear-gradient(90deg,#2d6a4f,#52b788)",transition:"width 1.2s ease",borderRadius:2 }}/>
        </div>
        <p style={{ color:"rgba(255,255,255,0.2)",fontFamily:"system-ui",fontSize:9,textAlign:"center",marginTop:8,letterSpacing:"0.15em" }}>v1.0</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════
function Login({ onLogin }) {
  const [u,setU]=useState(""); const [p,setP]=useState("");
  const [loading,setLoading]=useState(false); const [err,setErr]=useState("");
  const [vis,setVis]=useState(false);
  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);
  const handle=()=>{
    if(!u||!p){ setErr("Completá todos los campos"); return; }
    setLoading(true); setErr("");
    setTimeout(()=>{
      const user=USUARIOS.find(x=>x.nombre.toLowerCase()===u.toLowerCase()&&x.pass===p);
      if(user) onLogin(user); else { setLoading(false); setErr("Usuario o contraseña incorrectos"); }
    },900);
  };
  return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",background:"linear-gradient(160deg,#0a1a0f,#1b4332,#2d6a4f)",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:"all 0.6s",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:-80,right:-80,width:220,height:220,borderRadius:"50%",background:"rgba(82,183,136,0.07)" }}/>
      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",position:"relative" }}>
        <div style={{ marginBottom:24 }}><AndinaLogo size="lg" showSubtitle={true}/></div>
        <div style={{ width:"100%",display:"flex",flexDirection:"column",gap:10 }}>
          {[["USUARIO",u,setU,"text","Tu nombre"],["CONTRASEÑA",p,setP,"password","••••••••"]].map(([lbl,val,set,type,ph])=>(
            <div key={lbl}>
              <p style={{ color:"rgba(255,255,255,0.35)",fontFamily:"system-ui",fontSize:9,fontWeight:700,letterSpacing:"0.18em",margin:"0 0 5px" }}>{lbl}</p>
              <input value={val} onChange={e=>set(e.target.value)} type={type} placeholder={ph} onKeyDown={e=>e.key==="Enter"&&handle()}
                style={{ width:"100%",background:"rgba(255,255,255,0.07)",border:`1.5px solid ${val?"rgba(82,183,136,0.4)":"rgba(255,255,255,0.12)"}`,borderRadius:14,padding:"13px 16px",color:"white",fontFamily:"system-ui",fontSize:14,outline:"none",boxSizing:"border-box" }}/>
            </div>
          ))}
          {err&&<p style={{ color:"#f4a261",fontFamily:"system-ui",fontSize:12,textAlign:"center",margin:0 }}>{err}</p>}
          <button onClick={handle} style={{ width:"100%",marginTop:6,background:loading?"rgba(82,183,136,0.3)":"linear-gradient(135deg,#52b788,#2d6a4f)",border:"none",borderRadius:14,padding:"14px",color:"white",fontFamily:"system-ui",fontWeight:700,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
            {loading?<><div style={{ width:16,height:16,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"white",animation:"spin 0.8s linear infinite" }}/>Verificando…</>:"Ingresar →"}
          </button>
        </div>
        <p style={{ color:"rgba(255,255,255,0.15)",fontFamily:"system-ui",fontSize:10,marginTop:20,letterSpacing:"0.1em" }}>ACCESO RESTRINGIDO · EQUIPO AUTORIZADO</p>
        <p style={{ color:"rgba(255,255,255,0.2)",fontFamily:"system-ui",fontSize:10,marginTop:4 }}>Demo: Gonzalo / 1234</p>
      </div>
      <style>{`input::placeholder{color:rgba(255,255,255,0.2)}`}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// INICIO — directo después del login, proyectos en botón ⚙
// ═══════════════════════════════════════════════════════════════
function Inicio({ user, proyecto, registros, online, pendientes, onNav, onVerProyectos, onSincronizar }) {
  const hoy=registros.filter(r=>r.proyectoId===proyecto.id);
  const alertasHoy=hoy.filter(r=>r.alerta).length;
  return (
    <div style={{ flex:1,overflowY:"auto",background:"linear-gradient(160deg,#f0faf4,#e8f5e9)" }}>
      <div style={{ padding:"14px 18px 10px" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <AndinaLogo size="sm" light={true} showSubtitle={false}/>
            <div>
              <p style={{ color:"#74c69d",fontFamily:"system-ui",fontSize:10,margin:0 }}>Hola, {user.nombre}</p>
              <p style={{ color:"#1b4332",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:13,margin:0,letterSpacing:1 }}>
                Campo <span style={{ fontStyle:"italic",color:"#2d6a4f" }}>Digital</span>
              </p>
            </div>
          </div>
          <button onClick={onVerProyectos} style={{ background:"rgba(45,106,79,0.08)",border:"1px solid rgba(45,106,79,0.15)",borderRadius:10,padding:"6px 12px",cursor:"pointer" }}>
            <span style={{ color:"#52b788",fontFamily:"system-ui",fontSize:10,fontWeight:600 }}>⚙ Proyectos</span>
          </button>
        </div>

        <div style={{ background:`linear-gradient(135deg,${proyecto.color},${proyecto.color}dd)`,borderRadius:20,padding:"14px 16px",boxShadow:`0 6px 24px ${proyecto.color}44`,marginBottom:8 }}>
          <p style={{ color:"rgba(255,255,255,0.4)",fontFamily:"system-ui",fontSize:8,fontWeight:700,letterSpacing:"0.2em",margin:"0 0 2px" }}>PROYECTO ACTIVO</p>
          <p style={{ color:"white",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:18,margin:0,fontWeight:400 }}>{proyecto.nombre}</p>
          <p style={{ color:"rgba(255,255,255,0.45)",fontFamily:"system-ui",fontSize:11,margin:"3px 0 8px" }}>{proyecto.cliente} · {proyecto.campaña}</p>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            <span style={{ background:"rgba(255,255,255,0.12)",color:"white",fontFamily:"system-ui",fontSize:10,padding:"3px 8px",borderRadius:8 }}>📋 {hoy.length} registros hoy</span>
            {alertasHoy>0&&<span style={{ background:"rgba(192,57,43,0.4)",color:"white",fontFamily:"system-ui",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:8 }}>🚨 {alertasHoy} alerta{alertasHoy>1?"s":""}</span>}
            {!online&&pendientes>0&&<span style={{ background:"rgba(230,168,23,0.4)",color:"white",fontFamily:"system-ui",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:8 }}>⏳ {pendientes} pend.</span>}
          </div>
        </div>

        {!online&&pendientes>0&&(
          <div style={{ background:"rgba(230,168,23,0.1)",border:"1px solid rgba(230,168,23,0.3)",borderRadius:12,padding:"8px 12px",display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
            <span>⚠️</span>
            <span style={{ color:"#e6a817",fontFamily:"system-ui",fontSize:11,flex:1 }}>Sin conexión · {pendientes} registro{pendientes>1?"s":""} pendiente{pendientes>1?"s":""}</span>
            <button onClick={onSincronizar} style={{ background:"#e6a817",border:"none",borderRadius:8,padding:"4px 10px",color:"white",fontFamily:"system-ui",fontSize:10,fontWeight:700,cursor:"pointer" }}>Sync</button>
          </div>
        )}
      </div>

      <div style={{ padding:"0 16px 24px" }}>
        <p style={{ color:"#52b788",fontFamily:"system-ui",fontSize:9,fontWeight:700,letterSpacing:"0.2em",margin:"0 0 8px" }}>REGISTRAR</p>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          {Object.entries(TIPO_CFG).map(([id,cfg])=>{
            const count=hoy.filter(r=>r.tipo===id).length;
            return (
              <button key={id} onClick={()=>onNav(id)} style={{ background:`linear-gradient(135deg,${cfg.color},${cfg.color}dd)`,border:"none",borderRadius:16,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",boxShadow:`0 4px 14px ${cfg.color}33` }}>
                <div style={{ width:40,height:40,borderRadius:11,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{cfg.icon}</div>
                <p style={{ color:"white",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:17,margin:0,fontWeight:400,flex:1,textAlign:"left",letterSpacing:0.5 }}>{cfg.label}</p>
                {count>0&&<span style={{ background:"rgba(255,255,255,0.2)",color:"white",fontFamily:"system-ui",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:8 }}>{count} hoy</span>}
                <span style={{ color:"rgba(255,255,255,0.35)",fontSize:18 }}>›</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROYECTOS — pantalla separada
// ═══════════════════════════════════════════════════════════════
function Proyectos({ proyectos, proyectoActivo, onCambiarActivo, onActualizar, onVolver }) {
  const [editando,setEditando]=useState(null);
  const [form,setForm]=useState({});
  const abrirEditor=p=>{ setEditando(p.id); setForm({nombre:p.nombre,cliente:p.cliente,campaña:p.campaña}); };
  const guardar=()=>{ if(!form.nombre.trim()) return; onActualizar(editando,form); setEditando(null); };
  return (
    <div style={{ flex:1,overflowY:"auto",background:"linear-gradient(160deg,#f0faf4,#e8f5e9)" }}>
      <div style={{ padding:"14px 18px 12px",borderBottom:"1px solid rgba(45,106,79,0.1)",position:"sticky",top:0,background:"rgba(240,250,244,0.96)",backdropFilter:"blur(12px)",zIndex:10 }}>
        <button onClick={onVolver} style={{ color:"#52b788",fontFamily:"system-ui",fontSize:12,background:"none",border:"none",cursor:"pointer",padding:0,marginBottom:8 }}>‹ Inicio</button>
        <p style={{ color:"#52b788",fontFamily:"system-ui",fontSize:9,fontWeight:700,letterSpacing:"0.2em",margin:"0 0 2px" }}>GESTIÓN</p>
        <h2 style={{ color:"#1b4332",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:400,margin:0 }}>
          <span style={{ fontStyle:"italic",color:"#2d6a4f" }}>Proyectos</span>
        </h2>
        <p style={{ color:"#74c69d",fontFamily:"system-ui",fontSize:11,margin:"4px 0 0" }}>Seleccioná el activo o editá los datos</p>
      </div>
      <div style={{ padding:"14px 16px",display:"flex",flexDirection:"column",gap:10 }}>
        {proyectos.map(p=>(
          <div key={p.id}>
            {editando===p.id?(
              <div style={{ background:"white",border:"1.5px solid rgba(45,106,79,0.2)",borderRadius:20,padding:"16px",boxShadow:"0 4px 16px rgba(27,67,50,0.1)" }}>
                <p style={{ color:"#52b788",fontFamily:"system-ui",fontSize:9,fontWeight:700,letterSpacing:"0.15em",margin:"0 0 12px" }}>EDITANDO PROYECTO</p>
                {[["NOMBRE","nombre","Ej: Mina Los Andes"],["CLIENTE","cliente","Ej: Minera Patagónica S.A."],["CAMPAÑA","campaña","Ej: Q1 2026"]].map(([lbl,key,ph])=>(
                  <div key={key} style={{ marginBottom:10 }}>
                    <p style={{ color:"#2d6a4f",fontFamily:"system-ui",fontSize:9,fontWeight:700,letterSpacing:"0.1em",margin:"0 0 5px" }}>{lbl}</p>
                    <input value={form[key]||""} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph}
                      style={{ width:"100%",background:"#f0faf4",border:`1.5px solid ${form[key]?"rgba(45,106,79,0.3)":"rgba(45,106,79,0.15)"}`,borderRadius:12,padding:"10px 14px",fontFamily:"system-ui",fontSize:14,outline:"none",boxSizing:"border-box",color:"#1a1a1a" }}/>
                  </div>
                ))}
                <div style={{ display:"flex",gap:8,marginTop:4 }}>
                  <button onClick={()=>setEditando(null)} style={{ flex:1,background:"#f0faf4",border:"1.5px solid rgba(45,106,79,0.2)",borderRadius:12,padding:"11px",color:"#52b788",fontFamily:"system-ui",fontWeight:600,fontSize:13,cursor:"pointer" }}>Cancelar</button>
                  <button onClick={guardar} style={{ flex:2,background:"linear-gradient(135deg,#1b4332,#2d6a4f)",border:"none",borderRadius:12,padding:"11px",color:"white",fontFamily:"system-ui",fontWeight:700,fontSize:13,cursor:"pointer" }}>✓ Guardar cambios</button>
                </div>
              </div>
            ):(
              <div style={{ background:"white",border:`2px solid ${p.id===proyectoActivo.id?"rgba(45,106,79,0.4)":"rgba(45,106,79,0.1)"}`,borderRadius:20,padding:"16px",boxShadow:`0 4px 16px ${p.id===proyectoActivo.id?"rgba(27,67,50,0.12)":"rgba(27,67,50,0.05)"}` }}>
                <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:10 }}>
                  <div style={{ width:46,height:46,borderRadius:14,background:p.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:22 }}>⛏</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:2 }}>
                      <p style={{ color:"#1b4332",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:16,fontWeight:400,margin:0 }}>{p.nombre}</p>
                      {p.id===proyectoActivo.id&&<span style={{ background:"#d8f3dc",color:"#2d6a4f",fontFamily:"system-ui",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:8 }}>✓ Activo</span>}
                    </div>
                    <p style={{ color:"#74c69d",fontFamily:"system-ui",fontSize:11,margin:0 }}>{p.cliente} · {p.campaña}</p>
                  </div>
                </div>
                <div style={{ display:"flex",gap:8 }}>
                  {p.id!==proyectoActivo.id&&(
                    <button onClick={()=>{ onCambiarActivo(p); onVolver(); }} style={{ flex:1,background:"#d8f3dc",border:"none",borderRadius:11,padding:"10px",color:"#2d6a4f",fontFamily:"system-ui",fontWeight:700,fontSize:12,cursor:"pointer" }}>✓ Seleccionar</button>
                  )}
                  <button onClick={()=>abrirEditor(p)} style={{ flex:1,background:"rgba(45,106,79,0.08)",border:"1px solid rgba(45,106,79,0.15)",borderRadius:11,padding:"10px",color:"#52b788",fontFamily:"system-ui",fontWeight:600,fontSize:12,cursor:"pointer" }}>✏ Editar</button>
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
// FORMULARIO
// ═══════════════════════════════════════════════════════════════
function Formulario({ tipo, proyecto, user, onGuardar, onBack }) {
  const cfg=TIPO_CFG[tipo]; const campos=CAMPOS[tipo]||[];
  const [vals,setVals]=useState({}); const [guardado,setGuardado]=useState(false);
  const reqsOk=campos.filter(c=>c.req&&c.tipo!=="yesno"&&!c.num).every(c=>vals[c.id]?.trim())
    && campos.filter(c=>c.req&&c.num).every(c=>vals[c.id])
    && campos.filter(c=>c.req&&c.tipo==="yesno").every(c=>vals[c.id]);
  const alertas=campos.filter(c=>c.nk&&checkAlerta(tipo,c.nk,vals[c.id])==="critico").length;
  const guardar=()=>{
    const ad=campos.find(c=>c.nk&&checkAlerta(tipo,c.nk,vals[c.id])==="critico");
    onGuardar({ tipo, proyectoId:proyecto.id, valores:vals, operador:`${user.nombre} ${user.apellido}`, timestamp:ahora(), alerta:ad?{nivel:"critico",campo:ad.label}:null, sincronizado:true });
    setGuardado(true);
  };
  if(guardado) return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:`linear-gradient(160deg,${cfg.color}18,${cfg.color}06)`,padding:28,gap:14 }}>
      <div style={{ width:80,height:80,borderRadius:"50%",background:cfg.bg,border:`3px solid ${cfg.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:38 }}>{cfg.icon}</div>
      <h3 style={{ color:cfg.color,fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:28,fontWeight:400,textAlign:"center",margin:0 }}>¡Guardado!</h3>
      {alertas>0&&<span style={{ background:"#fde8e8",color:"#c0392b",fontFamily:"system-ui",fontSize:12,fontWeight:700,padding:"5px 14px",borderRadius:20 }}>🚨 {alertas} alerta registrada</span>}
      <div style={{ background:"#d8f3dc",border:"1px solid rgba(45,106,79,0.2)",borderRadius:12,padding:"10px 14px",width:"100%" }}>
        <p style={{ color:"#2d6a4f",fontFamily:"system-ui",fontSize:11,margin:0,textAlign:"center" }}>✓ Guardado en el dispositivo · No se pierde al cerrar</p>
      </div>
      <button onClick={onBack} style={{ width:"100%",background:cfg.color,border:"none",borderRadius:14,padding:"14px",color:"white",fontFamily:"system-ui",fontWeight:700,fontSize:14,cursor:"pointer" }}>← Volver al inicio</button>
      <button onClick={()=>{setVals({});setGuardado(false);}} style={{ width:"100%",background:cfg.bg,border:"none",borderRadius:14,padding:"12px",color:cfg.color,fontFamily:"system-ui",fontWeight:600,fontSize:13,cursor:"pointer" }}>+ Nuevo registro</button>
    </div>
  );
  return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",background:"linear-gradient(160deg,#f0faf4,#e8f5e9)" }}>
      <div style={{ padding:"14px 18px 12px",borderBottom:`1.5px solid ${cfg.bg}`,background:"rgba(255,255,255,0.9)",position:"sticky",top:0,zIndex:10,backdropFilter:"blur(12px)" }}>
        <button onClick={onBack} style={{ color:cfg.color,fontFamily:"system-ui",fontSize:12,background:"none",border:"none",cursor:"pointer",padding:0,marginBottom:8 }}>‹ Inicio</button>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:40,height:40,borderRadius:12,background:cfg.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{cfg.icon}</div>
          <div>
            <p style={{ color:cfg.color,fontFamily:"system-ui",fontSize:9,fontWeight:700,letterSpacing:"0.15em",margin:0,opacity:0.7 }}>{proyecto.nombre}</p>
            <p style={{ color:cfg.color,fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:17,fontWeight:400,margin:0 }}>{cfg.label}</p>
          </div>
        </div>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"14px 16px",display:"flex",flexDirection:"column",gap:10 }}>
        {alertas>0&&<div style={{ background:"#fde8e8",border:"1.5px solid rgba(192,57,43,0.2)",borderRadius:14,padding:"10px 14px" }}><p style={{ color:"#c0392b",fontFamily:"system-ui",fontSize:11,fontWeight:700,margin:0 }}>🚨 {alertas} parámetro{alertas>1?"s":""} fuera de norma</p></div>}
        {campos.map(c=>{
          const est=c.nk?checkAlerta(tipo,c.nk,vals[c.id]):null;
          const norm=NORMATIVA[tipo]?.[c.nk];
          return (
            <div key={c.id}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5 }}>
                <p style={{ color:cfg.color,fontFamily:"system-ui",fontSize:9,fontWeight:700,letterSpacing:"0.12em",margin:0 }}>{c.label.toUpperCase()} {c.req&&<span style={{ color:"#e07070" }}>*</span>}</p>
                {norm&&<span style={{ background:cfg.bg,color:cfg.color,fontFamily:"system-ui",fontSize:9,padding:"1px 7px",borderRadius:8,opacity:0.8 }}>Ref: {norm.min?`${norm.min}–${norm.max||"∞"}`:`≤ ${norm.max}`}</span>}
              </div>
              {c.tipo==="yesno"?(
                <div style={{ display:"flex",gap:8 }}>
                  {["Sí","No","Parcialmente"].map(o=>(
                    <button key={o} onClick={()=>setVals(v=>({...v,[c.id]:o}))} style={{ flex:1,padding:"10px",borderRadius:12,border:`1.5px solid ${vals[c.id]===o?cfg.color:"rgba(0,0,0,0.1)"}`,background:vals[c.id]===o?cfg.color:"white",color:vals[c.id]===o?"white":"#555",fontFamily:"system-ui",fontSize:12,fontWeight:vals[c.id]===o?700:400,cursor:"pointer" }}>{o}</button>
                  ))}
                </div>
              ):c.area?(
                <textarea value={vals[c.id]||""} onChange={e=>setVals(v=>({...v,[c.id]:e.target.value}))} placeholder={c.ph} rows={3}
                  style={{ width:"100%",background:"white",border:"1.5px solid rgba(0,0,0,0.1)",borderRadius:12,padding:"11px 14px",fontFamily:"system-ui",fontSize:13,outline:"none",resize:"none",boxSizing:"border-box" }}/>
              ):(
                <input type={c.num?"number":"text"} value={vals[c.id]||""} onChange={e=>setVals(v=>({...v,[c.id]:e.target.value}))} placeholder={c.ph}
                  style={{ width:"100%",background:est==="critico"?"#fde8e8":est==="alerta"?"#fef3cd":"white",border:`1.5px solid ${est==="critico"?"#c0392b":est==="alerta"?"#e6a817":vals[c.id]?cfg.color+"55":"rgba(0,0,0,0.1)"}`,borderRadius:12,padding:"11px 14px",fontFamily:"system-ui",fontSize:14,outline:"none",boxSizing:"border-box",color:"#1a1a1a" }}/>
              )}
              {est==="critico"&&norm&&<p style={{ color:"#c0392b",fontFamily:"system-ui",fontSize:10,margin:"3px 0 0",fontWeight:700 }}>🔴 Fuera de norma · {norm.norma}</p>}
              {est==="alerta"&&norm&&<p style={{ color:"#e6a817",fontFamily:"system-ui",fontSize:10,margin:"3px 0 0",fontWeight:700 }}>🟡 Cerca del límite · {norm.norma}</p>}
            </div>
          );
        })}
        <button onClick={guardar} disabled={!reqsOk} style={{ width:"100%",background:reqsOk?`linear-gradient(135deg,${cfg.color},${cfg.color}cc)`:"rgba(45,106,79,0.1)",border:"none",borderRadius:16,padding:"14px",color:reqsOk?"white":"#95d5b2",fontFamily:"system-ui",fontWeight:700,fontSize:14,cursor:reqsOk?"pointer":"default" }}>
          {reqsOk?`Guardar registro ${alertas>0?"⚠️":"✓"}`:"Completá los campos obligatorios (*)"}
        </button>
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HISTORIAL
// ═══════════════════════════════════════════════════════════════
function Historial({ registros, proyecto }) {
  const [filtro,setFiltro]=useState("todos"); const [busqueda,setBusqueda]=useState("");
  const todos=registros.filter(r=>r.proyectoId===proyecto.id);
  const filtrados=todos.filter(r=>(filtro==="todos"||r.tipo===filtro)&&(!busqueda||JSON.stringify(r).toLowerCase().includes(busqueda.toLowerCase())));
  return (
    <div style={{ flex:1,overflowY:"auto",background:"linear-gradient(160deg,#f0faf4,#e8f5e9)" }}>
      <div style={{ padding:"14px 18px 12px",borderBottom:"1px solid rgba(45,106,79,0.1)",position:"sticky",top:0,background:"rgba(240,250,244,0.96)",backdropFilter:"blur(12px)",zIndex:10 }}>
        <p style={{ color:"#52b788",fontFamily:"system-ui",fontSize:9,fontWeight:700,letterSpacing:"0.2em",margin:"0 0 2px" }}>HISTORIAL · {proyecto.nombre}</p>
        <h2 style={{ color:"#1b4332",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:400,margin:"0 0 10px" }}>
          Todos los <span style={{ fontStyle:"italic",color:"#2d6a4f" }}>registros</span>
          {todos.length>0&&<span style={{ color:"#52b788",fontFamily:"system-ui",fontSize:16 }}> · {todos.length}</span>}
        </h2>
        <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="🔍 Buscar…"
          style={{ width:"100%",background:"white",border:"1.5px solid rgba(45,106,79,0.15)",borderRadius:12,padding:"9px 14px",fontFamily:"system-ui",fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:8 }}/>
        <div style={{ display:"flex",gap:6,overflowX:"auto" }}>
          {[["todos","Todos"],...Object.entries(TIPO_CFG).map(([k,v])=>[k,`${v.icon} ${v.label.split(" ")[0]}`])].map(([id,lbl])=>(
            <button key={id} onClick={()=>setFiltro(id)} style={{ padding:"5px 12px",borderRadius:20,border:"none",cursor:"pointer",background:filtro===id?"#2d6a4f":"rgba(45,106,79,0.08)",color:filtro===id?"white":"#52b788",fontFamily:"system-ui",fontSize:11,fontWeight:600,flexShrink:0 }}>{lbl}</button>
          ))}
        </div>
      </div>
      <div style={{ padding:"12px 16px",display:"flex",flexDirection:"column",gap:8 }}>
        {filtrados.length===0&&<div style={{ textAlign:"center",padding:"40px 0" }}><div style={{ fontSize:40,marginBottom:10 }}>📋</div><p style={{ color:"#b7e4c7",fontFamily:"system-ui",fontSize:13 }}>Sin registros{filtro!=="todos"?" de este tipo":""}</p></div>}
        {filtrados.map(r=>{
          const cfg=TIPO_CFG[r.tipo];
          return (
            <div key={r.id} style={{ background:"white",border:`1.5px solid ${cfg.bg}`,borderRadius:16,padding:"12px 14px",boxShadow:"0 2px 8px rgba(27,67,50,0.05)" }}>
              <div style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                <div style={{ width:36,height:36,borderRadius:10,background:cfg.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{cfg.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginBottom:3 }}>
                    <span style={{ background:cfg.bg,color:cfg.color,fontFamily:"system-ui",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:8 }}>{cfg.label}</span>
                    {r.alerta&&<span style={{ background:"#fde8e8",color:"#c0392b",fontFamily:"system-ui",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:8 }}>🚨 Alerta</span>}
                    <span style={{ color:"#ccc",fontFamily:"system-ui",fontSize:10 }}>· {r.timestamp}</span>
                  </div>
                  <p style={{ color:"#1a1a1a",fontFamily:"system-ui",fontSize:13,margin:"0 0 2px",fontWeight:500 }}>{r.valores?.comunidad||r.valores?.punto||"Sin detalle"}</p>
                  <div style={{ display:"flex",gap:8 }}>
                    <span style={{ color:"#aaa",fontFamily:"system-ui",fontSize:10 }}>👤 {r.operador}</span>
                    <span style={{ color:"#52b788",fontFamily:"system-ui",fontSize:10 }}>✓ Guardado</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// QR
// ═══════════════════════════════════════════════════════════════
function QRCliente({ proyectos }) {
  const [sel,setSel]=useState(null);
  return (
    <div style={{ flex:1,overflowY:"auto",background:"linear-gradient(160deg,#f0faf4,#e8f5e9)" }}>
      <div style={{ padding:"14px 18px 12px",borderBottom:"1px solid rgba(45,106,79,0.1)" }}>
        <p style={{ color:"#52b788",fontFamily:"system-ui",fontSize:9,fontWeight:700,letterSpacing:"0.2em",margin:"0 0 2px" }}>ACCESO CLIENTE</p>
        <h2 style={{ color:"#1b4332",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:400,margin:0 }}>Dashboard <span style={{ fontStyle:"italic",color:"#2d6a4f" }}>QR</span></h2>
        <p style={{ color:"#74c69d",fontFamily:"system-ui",fontSize:11,margin:"4px 0 0" }}>El cliente escanea el QR y ve sus datos en tiempo real</p>
      </div>
      <div style={{ padding:"14px 16px",display:"flex",flexDirection:"column",gap:10 }}>
        {proyectos.map(p=>(
          <div key={p.id} style={{ background:"white",borderRadius:18,overflow:"hidden",boxShadow:"0 2px 12px rgba(27,67,50,0.07)",border:"1.5px solid rgba(45,106,79,0.08)" }}>
            <div style={{ padding:"14px 16px" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
                <div style={{ width:42,height:42,borderRadius:12,background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>⛏</div>
                <div>
                  <p style={{ color:"#1b4332",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:15,margin:0 }}>{p.nombre}</p>
                  <p style={{ color:"#74c69d",fontFamily:"system-ui",fontSize:11,margin:"2px 0 0" }}>{p.cliente}</p>
                </div>
              </div>
              <button onClick={()=>setSel(sel===p.id?null:p.id)} style={{ width:"100%",background:sel===p.id?"#f0faf4":p.color,border:"none",borderRadius:12,padding:"10px",color:sel===p.id?p.color:"white",fontFamily:"system-ui",fontWeight:700,fontSize:13,cursor:"pointer" }}>
                {sel===p.id?"Ocultar QR":"📱 Mostrar QR para cliente"}
              </button>
            </div>
            {sel===p.id&&(
              <div style={{ padding:"16px",borderTop:"1px solid rgba(45,106,79,0.08)",background:"#f9fffe",display:"flex",flexDirection:"column",alignItems:"center",gap:12 }}>
                <div style={{ width:150,height:150,background:"white",borderRadius:12,padding:10,boxShadow:"0 4px 16px rgba(0,0,0,0.1)",display:"grid",gridTemplateColumns:"repeat(10,1fr)",gap:1.5 }}>
                  {Array.from({length:100}).map((_,i)=>{ const c=(i<30&&i%10<3)||(i<30&&i%10>6)||(i>69&&i%10<3); const r=((i*7+p.id*13)%3===0); return <div key={i} style={{ background:c||r?p.color:"transparent",borderRadius:1 }}/>; })}
                </div>
                <p style={{ color:"#1b4332",fontFamily:"system-ui",fontSize:11,fontWeight:600,margin:0,textAlign:"center" }}>andina.app/{p.nombre.toLowerCase().replace(/ /g,"-")}</p>
                <p style={{ color:"#74c69d",fontFamily:"system-ui",fontSize:10,margin:0,textAlign:"center" }}>Solo lectura · Sin acceso al sistema interno</p>
                <div style={{ display:"flex",gap:8,width:"100%" }}>
                  <button style={{ flex:1,background:"#d8f3dc",border:"none",borderRadius:10,padding:"9px",color:"#2d6a4f",fontFamily:"system-ui",fontWeight:600,fontSize:12,cursor:"pointer" }}>📤 Compartir</button>
                  <button style={{ flex:1,background:"#d8f3dc",border:"none",borderRadius:10,padding:"9px",color:"#2d6a4f",fontFamily:"system-ui",fontWeight:600,fontSize:12,cursor:"pointer" }}>🔄 Renovar</button>
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
// FORMULARIOS / VERSIONADO
// ═══════════════════════════════════════════════════════════════
const PLANTILLAS_DEF=[
  { id:1,nombre:"Relevamiento inicial",comunidad:"Los Molles", version:1,bloqueado:true, usos:24,modificado:"10/03/2026" },
  { id:2,nombre:"Impacto percibido",   comunidad:"Villa Unión",version:1,bloqueado:false,usos:8, modificado:"12/03/2026" },
  { id:3,nombre:"Censo básico",        comunidad:"El Retamo",  version:2,bloqueado:false,usos:0, modificado:"17/03/2026" },
];
function Formularios() {
  const [plantillas,setPlantillas]=useState(()=>load("plantillas",PLANTILLAS_DEF));
  const [sel,setSel]=useState(null);
  const form=sel?plantillas.find(f=>f.id===sel):null;
  const upd=ps=>{ setPlantillas(ps); save("plantillas",ps); };
  return (
    <div style={{ flex:1,overflowY:"auto",background:"linear-gradient(160deg,#f0faf4,#e8f5e9)" }}>
      <div style={{ padding:"14px 18px 12px",borderBottom:"1px solid rgba(45,106,79,0.1)",position:"sticky",top:0,background:"rgba(240,250,244,0.96)",backdropFilter:"blur(12px)",zIndex:10 }}>
        {sel&&<button onClick={()=>setSel(null)} style={{ color:"#52b788",fontFamily:"system-ui",fontSize:12,background:"none",border:"none",cursor:"pointer",padding:0,marginBottom:8 }}>‹ Plantillas</button>}
        <p style={{ color:"#52b788",fontFamily:"system-ui",fontSize:9,fontWeight:700,letterSpacing:"0.2em",margin:"0 0 2px" }}>VERSIONADO</p>
        <h2 style={{ color:"#1b4332",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:400,margin:0 }}>
          {sel?form.nombre:<>Formularios <span style={{ fontStyle:"italic",color:"#2d6a4f" }}>y plantillas</span></>}
        </h2>
      </div>
      <div style={{ padding:"14px 16px",display:"flex",flexDirection:"column",gap:10 }}>
        {!sel?(
          <>
            <div style={{ background:"linear-gradient(135deg,#1b4332,#2d6a4f)",borderRadius:16,padding:"13px 16px" }}>
              <p style={{ color:"rgba(255,255,255,0.65)",fontFamily:"system-ui",fontSize:11,margin:0,lineHeight:1.6 }}>🔒 Los formularios bloqueados no se pueden modificar durante una campaña activa.</p>
            </div>
            {plantillas.map(f=>(
              <button key={f.id} onClick={()=>setSel(f.id)} style={{ background:"white",border:`1.5px solid ${f.bloqueado?"#d0e8f5":"rgba(45,106,79,0.1)"}`,borderRadius:18,padding:"14px 16px",cursor:"pointer",textAlign:"left",boxShadow:"0 3px 12px rgba(27,67,50,0.06)" }}>
                <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                  <div style={{ width:42,height:42,borderRadius:12,background:f.bloqueado?"#d0e8f5":"#d8f3dc",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>📝</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3 }}>
                      <span style={{ color:"#1b4332",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:15 }}>{f.nombre}</span>
                      <span style={{ background:f.bloqueado?"#d0e8f5":"#d8f3dc",color:f.bloqueado?"#1e6091":"#2d6a4f",fontFamily:"system-ui",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:8 }}>{f.bloqueado?"🔒 Bloqueado":"✅ Activo"}</span>
                      <span style={{ background:"#f0faf4",color:"#52b788",fontFamily:"system-ui",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:8 }}>v{f.version}</span>
                    </div>
                    <p style={{ color:"#888",fontFamily:"system-ui",fontSize:11,margin:0 }}>📍 {f.comunidad} · {f.usos} usos</p>
                  </div>
                  <span style={{ color:"#b7e4c7",fontSize:18 }}>›</span>
                </div>
              </button>
            ))}
            <button style={{ border:"2px dashed rgba(45,106,79,0.2)",borderRadius:16,padding:"14px",color:"#52b788",fontFamily:"system-ui",fontSize:13,fontWeight:600,background:"none",cursor:"pointer",textAlign:"center" }}>+ Nueva plantilla</button>
          </>
        ):(
          <div style={{ background:"white",borderRadius:18,padding:"16px",border:"1.5px solid rgba(45,106,79,0.1)" }}>
            <div style={{ display:"flex",gap:10,marginBottom:12 }}>
              <div style={{ flex:1,background:"#f0faf4",borderRadius:12,padding:"10px",textAlign:"center" }}>
                <p style={{ color:"#1b4332",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:26,margin:0 }}>v{form.version}</p>
                <p style={{ color:"#74c69d",fontFamily:"system-ui",fontSize:10,margin:"2px 0 0" }}>Versión</p>
              </div>
              <div style={{ flex:1,background:form.bloqueado?"#d0e8f5":"#d8f3dc",borderRadius:12,padding:"10px",textAlign:"center" }}>
                <p style={{ color:form.bloqueado?"#1e6091":"#2d6a4f",fontFamily:"system-ui",fontSize:13,fontWeight:700,margin:0 }}>{form.bloqueado?"🔒 Bloqueado":"✅ Activo"}</p>
              </div>
            </div>
            {form.bloqueado
              ?<button onClick={()=>upd(plantillas.map(p=>p.id===form.id?{...p,bloqueado:false}:p))} style={{ width:"100%",background:"#f0faf4",border:"1.5px solid rgba(45,106,79,0.2)",borderRadius:12,padding:"11px",color:"#2d6a4f",fontFamily:"system-ui",fontWeight:600,fontSize:13,cursor:"pointer" }}>🔓 Desbloquear</button>
              :<button onClick={()=>upd(plantillas.map(p=>p.id===form.id?{...p,bloqueado:true}:p))} style={{ width:"100%",background:"#1e6091",border:"none",borderRadius:12,padding:"11px",color:"white",fontFamily:"system-ui",fontWeight:700,fontSize:13,cursor:"pointer" }}>🔒 Bloquear para campaña activa</button>
            }
          </div>
        )}
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [screen,    setScreen]    = useState("splash");
  const [user,      setUser]      = useState(null);
  const [tab,       setTab]       = useState("inicio");
  const [tipoForm,  setTipoForm]  = useState(null);
  const [online,    setOnline]    = useState(true);
  const [pendientes,setPendientes]= useState(0);

  const [proyectos,setProyectos] = useState(()=>load("proyectos",PROYECTOS_DEF));
  const [proyecto, setProyecto]  = useState(()=>{ const ps=load("proyectos",PROYECTOS_DEF); const id=load("proyectoActivo",1); return ps.find(p=>p.id===id)||ps[0]; });

  const actualizarProyecto=(id,cambios)=>{
    const n=proyectos.map(p=>p.id===id?{...p,...cambios}:p);
    setProyectos(n); save("proyectos",n);
    if(proyecto?.id===id){ const a={...proyecto,...cambios}; setProyecto(a); save("proyectoActivo",a.id); }
  };
  const cambiarActivo=p=>{ setProyecto(p); save("proyectoActivo",p.id); };

  const [registros,setRegistros] = useState(()=>load("registros",[]));
  const addRegistro=r=>{ const n=[{...r,id:Date.now()},...registros]; setRegistros(n); save("registros",n); if(!online) setPendientes(p=>p+1); };
  const sincronizar=()=>{ const s=registros.map(r=>({...r,sincronizado:true})); setRegistros(s); save("registros",s); setPendientes(0); };

  const hoyCount=proyecto?registros.filter(r=>r.proyectoId===proyecto.id).length:0;

  const renderContent=()=>{
    if(screen==="login") return <Login onLogin={u=>{ setUser(u); setScreen("app"); setTab("inicio"); }}/>;
    if(screen!=="app") return null;
    if(tab==="proyectos") return <Proyectos proyectos={proyectos} proyectoActivo={proyecto} onCambiarActivo={cambiarActivo} onActualizar={actualizarProyecto} onVolver={()=>setTab("inicio")}/>;
    if(tab==="form"&&tipoForm) return <Formulario tipo={tipoForm} proyecto={proyecto} user={user} onGuardar={r=>addRegistro(r)} onBack={()=>{ setTipoForm(null); setTab("inicio"); }}/>;
    if(tab==="historial") return <Historial registros={registros} proyecto={proyecto}/>;
    if(tab==="qr") return <QRCliente proyectos={proyectos}/>;
    if(tab==="formularios") return <Formularios/>;
    return <Inicio user={user} proyecto={proyecto} registros={registros} online={online} pendientes={pendientes} onNav={tipo=>{ setTipoForm(tipo); setTab("form"); }} onVerProyectos={()=>setTab("proyectos")} onSincronizar={sincronizar}/>;
  };

  return (
    <div style={{ width:"100%",height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative" }}>
      {screen==="splash"&&<Splash onDone={()=>setScreen("login")}/>}
      {screen!=="splash"&&(
        <div style={{ height:28,background:"rgba(0,0,0,0.2)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",flexShrink:0 }}>
          <span style={{ color:"rgba(255,255,255,0.65)",fontFamily:"system-ui",fontSize:10,fontWeight:600 }}>{horaCorta()}</span>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            {pendientes>0&&<span style={{ background:"#e6a817",color:"white",fontFamily:"system-ui",fontSize:9,fontWeight:700,padding:"1px 7px",borderRadius:8 }}>{pendientes} pend.</span>}
            <button onClick={()=>setOnline(o=>!o)} style={{ display:"flex",alignItems:"center",gap:4,background:"none",border:"none",cursor:"pointer",padding:0 }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:online?"#52b788":"#e07070" }}/>
              <span style={{ color:online?"#52b788":"#e07070",fontFamily:"system-ui",fontSize:10 }}>{online?"En línea":"Sin conexión"}</span>
            </button>
          </div>
        </div>
      )}
      <div style={{ flex:1,overflow:"hidden",display:"flex",flexDirection:"column" }}>{renderContent()}</div>
      {screen==="app"&&tab!=="form"&&tab!=="proyectos"&&(
        <div style={{ height:64,background:"white",borderTop:"1px solid rgba(45,106,79,0.1)",display:"flex",alignItems:"center",justifyContent:"space-around",flexShrink:0,boxShadow:"0 -4px 20px rgba(27,67,50,0.08)" }}>
          {[{id:"inicio",icon:"⊞",label:"Inicio"},{id:"formularios",icon:"📝",label:"Plantillas"},{fab:true},{id:"qr",icon:"📱",label:"QR"},{id:"historial",icon:"☰",label:"Historial",badge:hoyCount}].map((t,i)=>
            t.fab?(
              <button key="fab" onClick={()=>setTab("inicio")} style={{ width:52,height:52,borderRadius:"50%",background:"#2d6a4f",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",marginTop:-20,boxShadow:"0 4px 16px rgba(27,67,50,0.3)",flex:1 }}>
                <span style={{ fontSize:24,color:"white" }}>+</span>
              </button>
            ):(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,flex:1,position:"relative" }}>
                <span style={{ fontSize:tab===t.id?19:15,color:tab===t.id?"#2d6a4f":"#bbb",transition:"all 0.2s" }}>{t.icon}</span>
                <span style={{ fontFamily:"system-ui",fontSize:9,color:tab===t.id?"#2d6a4f":"#bbb",fontWeight:tab===t.id?700:400 }}>{t.label}</span>
                {tab===t.id&&<div style={{ width:18,height:2.5,background:"#2d6a4f",borderRadius:2 }}/>}
                {t.badge>0&&<div style={{ position:"absolute",top:-2,right:4,width:16,height:16,borderRadius:"50%",background:"#52b788",display:"flex",alignItems:"center",justifyContent:"center" }}><span style={{ color:"white",fontFamily:"system-ui",fontSize:9,fontWeight:700 }}>{t.badge}</span></div>}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
