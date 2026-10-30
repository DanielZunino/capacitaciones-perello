// ===== Mejoras comunes para todos los portales de capacitación (Integra Prevención) · 28-10-2026 =====
// Se agrega al final del script de cada portal. Configurar antes: window.MARCA = { nombre, c1, c2, fuente }.
// 1) Voz: siglas leídas a la chilena (EPP = "e pe pe", ACHS = "achs", 1404 = "catorce cero cuatro"...).
// 2) Grúa horquilla con baliza encendida, alarma de retroceso y el nombre de la empresa.
// 3) Evaluación: marcar no corrige de inmediato; se puede cambiar la respuesta y se revisa al tocar el botón.
// 4) Imágenes de las preguntas más chicas: en las de elegir imagen, ambas caben en la pantalla.
// 5) Dibujos más vivos: ✓/✗ que laten y logo de la empresa en los camiones.
// 6) Láminas: al volver atrás, botón para regresar de inmediato a la lámina donde iba (las ya vistas no esperan de nuevo).
// 7) Prueba: se aprueba solo con 7,0; preguntas y alternativas al azar (con versiones); no muestra la correcta; PDF con la prueba respondida a Drive.
// 14) Aviso "aquí no se escucha la lectura": solo si de verdad no hay voz (no aparece en Chrome cuando la lectura funciona).
// 15) Sin recuadros "Idea clave": solo queda un aviso "Importante" en las láminas más críticas (máx. 2 por charla).
// 16) Diploma: no muestra los minutos en plataforma (solo la duración oficial de la charla).
// 17) Diploma y certificado: entrega GARANTIZADA al servidor (cola en el teléfono, se confirma con el registro oficial y se reintenta hasta que quede guardado).
// 18) Nombres de archivo cortos: "Diploma Juan Campos Induccion IRL 30-10-2026.pdf" (diploma, prueba y certificado DS 44).
// 19) Diploma, registro y certificados en vector: textos nítidos a cualquier zoom y PDF unas 20 veces más liviano; registro sin "Idea clave".
// 8) Inducción: 1 pregunta por cada uno de los 18 ítems de la inducción escrita, con 3 versiones (Constructor, OYM, Plaza y PROSIP).
// Se carga desde https://danielzunino.github.io/capacitaciones-perello/mejoras_comunes.js en todos los portales.
(function () {
  const M = window.MARCA || {};
  // Marca por portal (si el portal no la define) y logo real de la empresa para camiones y grúas
  const MCFG = { 'capacitaciones-prosip': { nombre: 'PROSIP', c1: '#3A3A3A', c2: '#9E9E9E', fachada: 'PLANTA PROSIP', corto: 'PROSIP' },
    'capacitaciones-plaza': { nombre: 'Constructora Plaza', c1: '#B21E35', c2: '#2B2B2E', fachada: 'BODEGA PLAZA', corto: 'PLAZA' },
    'capacitaciones-montasip': { nombre: 'Montasip', c1: '#141414', c2: '#F2B529', fachada: 'MONTASIP', corto: 'MONTASIP' },
    'capacitaciones-zg': { nombre: 'ZG SpA', c1: '#2E7D32', c2: '#6E4223', fachada: 'ZG SPA', corto: 'ZG' },
    'capacitaciones-transporteszg': { nombre: 'Transportes ZG SpA', c1: '#2E7D32', c2: '#6E4223', fachada: 'TRANSPORTES ZG', corto: 'ZG' },
    'capacitaciones-oym': { nombre: 'OYM Center', c1: '#0B7A35', c2: '#E0301E', fachada: 'OYM CENTER', corto: 'OYM' },
    'capacitaciones-constructor': { nombre: 'Constructor Center', c1: '#0039A6', c2: '#DC281D', fachada: 'FERRETERÍA', corto: 'CONSTRUCTOR' } };
  const PORTAL = location.pathname.split('/')[1] || '', MC = MCFG[PORTAL] || null;
  if (!M.nombre && MC) Object.assign(M, MC, { fuente: 'Arial' });
  const LOGO = (() => { try { const i = document.querySelector('.logoBar img'); return i ? { src: i.src, ar: (i.naturalWidth && i.naturalHeight) ? i.naturalWidth / i.naturalHeight : 0 } : null; } catch (e) { return null; } })();
  const LOGO_AR = { 'capacitaciones-perello': 3.02, 'capacitaciones-prosip': 6.21, 'capacitaciones-plaza': 1.22, 'capacitaciones-montasip': 1.27, 'capacitaciones-zg': 1.42, 'capacitaciones-transporteszg': 1.42, 'capacitaciones-oym': 1.25, 'capacitaciones-constructor': 1.99 };
  if (LOGO && !LOGO.ar) LOGO.ar = LOGO_AR[location.pathname.split('/')[1] || ''] || 2;
  // placa blanca con el logo (mantiene la proporción); cx, cy = centro; w, h = espacio máximo
  const placaLogo = (cx, cy, w, h) => {
    if (!LOGO || !LOGO.src) return '';
    const p = 1.6; let iw = w - 2 * p, ih = h - 2 * p; if (iw / ih > LOGO.ar) iw = ih * LOGO.ar; else ih = iw / LOGO.ar;
    const W = iw + 2 * p, H = ih + 2 * p, n = v => (+v).toFixed(1);
    return `<g class="mjLogoG"><rect x="${n(cx - W / 2)}" y="${n(cy - H / 2)}" width="${n(W)}" height="${n(H)}" rx="${n(Math.min(3, H / 4))}" fill="#fff" stroke="${M.c1 || '#263238'}" stroke-width=".8"/><image class="mjLogo" href="${LOGO.src}" x="${n(cx - iw / 2)}" y="${n(cy - ih / 2)}" width="${n(iw)}" height="${n(ih)}" preserveAspectRatio="xMidYMid meet"/></g>`;
  };
  window.MJ_PLACA = placaLogo;
  // si el dibujo quedó espejado (camión o grúa mirando al otro lado), el logo se endereza
  try {
    const enderezar = () => document.querySelectorAll('image.mjLogo:not([data-fx])').forEach(im => {
      im.setAttribute('data-fx', '1'); let neg = false, el = im.parentNode;
      while (el && el.tagName && el.tagName.toLowerCase() !== 'svg') { try { const t = el.transform && el.transform.baseVal && el.transform.baseVal.consolidate(); if (t) { const m = t.matrix; if (m.a * m.d - m.b * m.c < 0) neg = !neg; } } catch (e) {} el = el.parentNode; }
      if (neg) { const cx = +im.getAttribute('x') + im.getAttribute('width') / 2; im.setAttribute('transform', `translate(${(2 * cx).toFixed(1)},0) scale(-1,1)`); }
    });
    new MutationObserver(enderezar).observe(document.documentElement, { childList: true, subtree: true });
    window.MJ_ENDEREZAR = enderezar;
  } catch (e) {}
  // ---------- 1) Pronunciación chilena de siglas
  const PRON = [
    [/\b([Nn]ota) (\d),0\b/g, '$1 $2'], [/(\d) coma 0\b/g, '$1'], [/(\d),(\d)/g, '$1 coma $2'], [/(\d)\s?%/g, '$1 por ciento'], [/(\d+)\/(\d{4})\b/g, '$1 de $2'],
    [/\bE P P\b/g, 'e pe pe'], [/\bEPP\b/g, 'e pe pe'], [/\bA C H S\b/g, 'achs'], [/\bACHS\b/g, 'achs'], [/\bIST\b/g, 'i ese te'], [/\bISL\b/g, 'i ese ele'],
    [/\bSAMU\b/g, 'samu'], [/\bPDI\b/g, 'pe de i'], [/\bHDS\b/g, 'hache de ese'], [/\bSGA\b/g, 'ese ge a'], [/\bMIPER\b/g, 'míper'], [/\bIRL\b/g, 'i erre ele'],
    [/\bPREXOR\b/g, 'préxor'], [/\bCEAL-SM\b/g, 'ceal ese eme'], [/\bSUSESO\b/g, 'suseso'], [/\bISTAS ?21\b/g, 'istas veintiuno'], [/\bSEREMI\b/g, 'seremi'],
    [/\bSENAPRED\b/g, 'senapred'], [/\bMINSAL\b/g, 'minsal'], [/\bMINTRAB\b/g, 'mintrab'], [/\bDIEP\b/g, 'diep'], [/\bDIAT\b/g, 'diat'], [/\bUV\b/g, 'u ve'],
    [/\bFPS\b/g, 'efe pe ese'], [/\bNCh\b/g, 'norma chilena'], [/\bGLP\b/g, 'gas licuado'], [/\bSOAP\b/g, 'soap'], [/\bPVD\b/g, 'pantallas'], [/\bBPM\b/g, 'buenas prácticas'],
    [/\bRIOHS\b/g, 'reglamento interno'], [/\bTMERT\b/g, 'temert'], [/\bCPHS\b/g, 'comité paritario'], [/\bSST\b/g, 'seguridad y salud en el trabajo'],
    [/\bDS\s?(\d+)/g, 'decreto supremo $1'], [/\bdecreto (\d+)/g, 'decreto supremo $1'], [/\bLOTO\b/g, 'loto'], [/\b5S\b/g, 'cinco ese'], [/\bA-?4\b/g, 'a cuatro'],
    [/\b1404\b/g, 'catorce cero cuatro'], [/km\/h/g, 'kilómetros por hora'], [/°\s?C\b/g, ' grados'], [/(\d)\s?g\/l/g, '$1 gramos por litro'], [/dB\(A\)/g, 'decibeles'],
    [/(\d)\s?kg\b/g, '$1 kilos'], [/(\d)\s?m\b/g, '$1 metros'], [/\bRUT\b/g, 'rut'], [/\bN°\s?/g, 'número '], [/\bQR\b/g, 'cu erre'], [/\bOK\b/g, 'okey'],
    [/\bPYME\b/g, 'pyme'], [/\bAFP\b/g, 'a efe pe'], [/\bSII\b/g, 'ese i i'], [/\bF30-1\b/g, 'efe treinta uno'], [/\bF30\b/g, 'efe treinta'], [/\bCPR\b/g, 'ce pe erre']];
  const pron = t => PRON.reduce((s, [a, b]) => s.replace(a, b), String(t || ''));
  window.PRONUNCIAR = pron;
  try {
    const U = window.SpeechSynthesisUtterance;
    if (U && !U.__chile) {
      const UC = function (t) { const u = new U(pron(t)); return u; };
      UC.prototype = U.prototype; UC.__chile = true; window.SpeechSynthesisUtterance = UC;
    }
  } catch (e) {}

  // ---------- 2) Grúa horquilla: baliza, alarma de retroceso y marca
  try {
    if (typeof forklift === 'function' && !forklift.__mejor) {
      const css = document.createElement('style');
      css.textContent = '.mjBaliza{animation:mjBal 1s steps(2) infinite}@keyframes mjBal{0%{opacity:1}50%{opacity:.25}}'
        + '.mjAlarma path{animation:mjAl 1.2s ease-out infinite;opacity:0}.mjAlarma path:nth-child(2){animation-delay:.2s}.mjAlarma path:nth-child(3){animation-delay:.4s}@keyframes mjAl{0%{opacity:0}30%{opacity:1}100%{opacity:0}}';
      document.head.appendChild(css);
      const F0 = forklift;
      forklift = function (x, y, o) {
        o = o || {}; const g0 = F0(x, y, o); let a = '';
        a += `<rect x="${x + 36}" y="${y - 86}" width="8" height="6" rx="2" fill="#263238"/><g class="mjBaliza"><circle cx="${x + 40}" cy="${y - 88}" r="5" fill="#FF8F00"/><circle cx="${x + 40}" cy="${y - 88}" r="10" fill="#FFB300" opacity=".35"/></g>`;
        if (o.rev !== false) a += `<g class="mjAlarma">${[1, 2, 3].map(i => `<path d="M${x - 4 - i * 6},${y - 46 - i * 4} a${i * 7},${i * 7} 0 0 0 0,${14 + i * 8}" stroke="#FF6F00" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
        if (LOGO && LOGO.src) a += LOGO.ar < 2.2 ? placaLogo(x + 38, y - 30.5, 52, 17) : placaLogo(x + 38, y - 29.5, 52, 14);
        else if (M.nombre) a += `<rect x="${x + 14}" y="${y - 37}" width="46" height="12" rx="3" fill="${M.c1 || '#263238'}"/><text x="${x + 37}" y="${y - 28}" font-size="8" font-weight="bold" text-anchor="middle" fill="#fff" font-family="${M.fuente || 'Arial'}"${o.flip ? ` transform="translate(${2 * x + 74},0) scale(-1,1)"` : ''}>${M.nombre}</text>`;
        return g0 + (o.flip ? `<g transform="translate(${2 * x + 120},0) scale(-1,1)">${a}</g>` : a);
      };
      forklift.__mejor = true;
    }
  } catch (e) {}

  // ---------- 2b) Logo real de la empresa en todos los camiones (cabina y cortina) y en la grúa horquilla grande
  try {
    if (LOGO && LOGO.src && typeof RAMPLA === 'function' && !RAMPLA.__mj) {
      const R0 = RAMPLA;
      RAMPLA = function (L, o) {
        o = o || {}; L = L || 150; let g = R0.call(this, L, o);
        // cortina cerrada: el letrero de texto se cambia por el logo
        g = g.replace(/<g transform="translate\([\d.-]+,-99\)"><rect width="[\d.]+" height="26" rx="6"[^]*?<\/text><\/g>/, '');
        if (!o.open) g = g.replace(/(<rect x="5" y="-66" width="[\d.]+" height="4" fill="#DC281D"\/>)/, `$1${placaLogo(L / 2, -84, Math.min(L - 30, 110), 32)}`);
        const c = L + 2;   // cabina: logo en la puerta
        return g + placaLogo(c + 27, -44, 30, 11);
      };
      RAMPLA.__mj = true;
    }
    if (LOGO && LOGO.src && typeof grua === 'function' && !grua.__mj) {
      const G0 = grua;
      grua = function (x, y, o) {
        o = o || {}; const g0 = G0(x, y, o), s = o.s || 1;
        let a = LOGO.ar < 2.2 ? placaLogo(x + 30, y - 48.5, 40, 16) : placaLogo(x + 30, y - 48, 40, 14);
        if (s !== 1) a = `<g transform="translate(${x},${y}) scale(${s}) translate(${-x},${-y})">${a}</g>`;
        if (o.flip) a = `<g transform="translate(${2 * x + 160 * s},0) scale(-1,1)">${a}</g>`;
        return g0 + a;
      };
      grua.__mj = true;
    }
  } catch (e) {}

  // ---------- 3) y 4) Evaluación
  try {
    const css = document.createElement('style');
    css.textContent = '.opt.sel{border-color:#64B5F6;background:#16324F;box-shadow:0 0 0 2px #64B5F6 inset}.pick.sel{border-color:#1E88E5;box-shadow:0 0 0 3px #90CAF9}'
      + '.pick svg{max-height:27vh;width:100%}.qimg svg{max-height:30vh;width:100%;margin:0 auto}.picks{gap:8px}'
      + '.pick.sel::after{content:"Tu elección";position:absolute;top:6px;right:8px;background:#1E88E5;color:#fff;border-radius:8px;padding:2px 8px;font-size:13px;font-weight:bold}';
    document.head.appendChild(css);
    if (typeof answer === 'function' && typeof renderQ === 'function' && !answer.__mejor) {
      const revelar = answer;                     // la corrección original: se usa recién al tocar "Revisar"
      const R0 = renderQ;
      renderQ = function () { st.sel = null; st.revisada = false; R0.apply(this, arguments); };
      answer = function (btn, ok) {
        if (st.revisada) return;
        document.querySelectorAll('#qBody .sel').forEach(b => b.classList.remove('sel'));
        btn.classList.add('sel'); st.sel = { btn, ok };
        try { SFX.play('next'); } catch (e) {}
        const b = document.getElementById('qNext'), conNota = window.MJ_EVAL && st.mode !== 'ds44' && !st.repaso, ult = st.qi === st.topic.quiz.length - 1;
        b.textContent = conNota ? (ult ? 'Terminar la prueba' : 'Siguiente pregunta') : 'Revisar mi respuesta'; b.style.display = 'block';
        try { GUIA.hide(); leerYGuiar([], 'qNext', conNota ? (ult ? 'TERMINAR' : 'SIGUIENTE') : 'REVISAR', conNota ? 'Si estás seguro, toca el botón. Si te equivocaste, cambia tu respuesta.' : 'Si estás seguro, toca revisar. Si te equivocaste, cambia tu respuesta.'); } catch (e) {}
        setTimeout(() => b.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
      };
      answer.__mejor = true;
      const nx = document.getElementById('qNext'), N0 = nx.onclick;
      nx.onclick = function (ev) {
        if (!st.revisada) {
          if (!st.sel) return; st.revisada = true;
          if (st.mode === 'ds44' || st.repaso || !window.MJ_EVAL) { revelar(st.sel.btn, st.sel.ok); return; }
          // Evaluación con nota: se registra la respuesta SIN mostrar si es correcta (ni color, ni sonido, ni explicación) y se pasa a la siguiente
          try { MJ_EVAL.registrar(st.sel.btn, st.sel.ok); } catch (e) {}
          const s0 = SFX.play, l0 = window.leerYGuiar; SFX.play = () => {}; try { leerYGuiar = () => {}; } catch (e) {}
          try { revelar(st.sel.btn, st.sel.ok); } finally { SFX.play = s0; try { leerYGuiar = l0; } catch (e) {} }
          try { SFX.play('next'); } catch (e) {}
          return N0.call(this, ev);
        }
        return N0.call(this, ev);
      };
    }
  } catch (e) {}

  // ---------- 5) Dibujos más vivos y corporativos (todos los portales)
  try {
    if (typeof S === 'object' && !S.__mj) {
      const css = document.createElement('style');
      css.textContent = '.mjPop{animation:mjPop 1.8s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes mjPop{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}'
        + '.mjInter{animation:mjInter 1.2s steps(2) infinite}@keyframes mjInter{50%{opacity:.15}}';
      document.head.appendChild(css);
      const logoCortina = w => `<rect width="${w}" height="26" rx="6" fill="${M.c2 || '#FFC20E'}"/><rect x="2.5" y="2.5" width="${w - 5}" height="21" rx="4.5" fill="#fff"/><rect x="4.5" y="4.5" width="${w - 9}" height="17" rx="3.5" fill="${M.c1 || '#263238'}"/><text x="${w / 2}" y="18" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff" font-family="${M.fuente || 'Arial'}">${M.nombre}</text>`;
      const mejorar = svg => {
        if (typeof svg !== 'string') return svg;
        // ✓ y ✗ que laten
        svg = svg.replace(/(<circle cx="[\d.]+" cy="[\d.]+" r="[\d.]+" fill="(?:#2E7D32|#D7262B)" stroke="#fff" stroke-width="3"\/>)(<path [^>]*\/>)/g, '<g class="mjPop">$1$2</g>');
        // logo de la empresa en la cortina de los camiones
        if (!(LOGO && LOGO.src) && M.nombre && svg.indexOf('>' + M.nombre + '</text>') < 0) svg = svg.replace(/<rect x="5" y="-104" width="([\d.]+)" height="58" fill="#123F8C"\/>/g, (m, w) => { const L = +w + 11, ww = Math.min(L - 30, 84); return m + `<g transform="translate(${(L / 2 - ww / 2).toFixed(1)},-99)">${logoCortina(ww)}</g><g class="mjInter"><rect x="-4" y="-50" width="5" height="5" rx="1" fill="#FFB300"/></g>`; });
        // letreros de edificios con el nombre de la empresa del portal (no de otra)
        if (MC) {
          if (PORTAL !== 'capacitaciones-prosip') svg = svg.replace(/>PROSIP<\/text>/g, '>' + MC.corto + '</text>');
          svg = svg.replace(/(font-size=")12(" font-weight="bold" text-anchor="middle" fill="#fff" font-family="Arial">)FERRETERÍA</g, (m, a, b) => a + (MC.fachada.length > 12 ? '10' : '12') + b + MC.fachada + '<');
          svg = svg.replace(/>FERRETERÍA</g, '>' + (MC.fachada.length <= 11 ? MC.fachada : MC.corto) + '<');
          if (PORTAL !== 'capacitaciones-constructor') svg = svg.replace(/((?:height="14"|height="20" rx="3") fill="#37474F"\/><rect x="[\d.-]+" y="[\d.-]+" width="[\d.]+" height="[35]" fill=")#DC281D"/g, `$1${MC.c1}"`);
          if (PORTAL !== 'capacitaciones-constructor') svg = svg.replace(/(<rect x="[\d.-]+" y="[\d.-]+" width="[\d.]+" height="18" fill=")#0039A6("\/><rect x="[\d.-]+" y="[\d.-]+" width="[\d.]+" height="5" fill=")#DC281D(")/g, `$1${MC.c1}$2${MC.c2}$3`);
        }
        if (LOGO && LOGO.src) {
          // camión de caja blanca (furgón): logo en el costado
          svg = svg.replace(/<rect x="([\d.-]+)" y="([\d.-]+)" width="128" height="44" rx="2" fill="#ECEFF1" stroke="#90A4AE" stroke-width="1.5"\/>/g, (m, x, y) => m + placaLogo(+x + 64, +y + 15, 96, 24));
          // grúa horquilla grande (de perfil): logo en el chasis, sobre la franja negra
          svg = svg.replace(/(<path d="M([\d.-]+),([\d.-]+) V[\d.-]+ q0,-6 6,-6 H[\d.-]+ l6,8 H[\d.-]+ q8,0 10,8 l4,24 V[\d.-]+ z" fill="#FFC20E" stroke="#9A7400" stroke-width="1.4"\/>)/g, (m, p, X, Y) => { const x = +X - 6, y = +Y + 18; return p + (LOGO.ar < 2.2 ? placaLogo(x + 30, y - 48.5, 40, 16) : placaLogo(x + 30, y - 48, 40, 14)); });
          // grúa horquilla vista desde atrás: logo en el contrapeso
          svg = svg.replace(/<rect x="([\d.-]+)" y="([\d.-]+)" width="92" height="36" rx="6" fill="#FFC20E" stroke="#9A7400" stroke-width="1.4"\/>/g, (m, x, y) => m + placaLogo(+x + 46, +y + 7, 50, 10));
        }
        return svg;
      };
      Object.keys(S).forEach(k => { const f = S[k]; if (typeof f !== 'function') return; S[k] = function () { return mejorar(f.apply(this, arguments)); }; });
      Object.defineProperty(S, '__mj', { value: true });
    }
  } catch (e) {}

  // ---------- 6) Láminas: volver atrás y regresar rápido a donde iba (sin volver a esperar el tiempo mínimo)
  try {
    if (typeof renderLearn === 'function' && !renderLearn.__mj) {
      const RL = renderLearn, TM = typeof tiempoMinimo === 'function' ? tiempoMinimo : null;
      renderLearn = function () {
        const id = st.topic && st.topic.id;
        if (st.__mxT !== id) { st.__mxT = id; st.__mx = 0; st.__done = -1; st.__last = -1; }
        if (st.li === st.__last + 1 && st.__last >= 0) st.__done = Math.max(st.__done, st.__last);   // avanzó: la anterior quedó vista
        st.__last = st.li; if (st.li > st.__mx) st.__mx = st.li;
        RL.apply(this, arguments);
        const nx = document.getElementById('lNext'), row = nx && nx.parentNode; if (!row) return;
        let b = document.getElementById('mjVolver');
        if (!b) { b = document.createElement('button'); b.id = 'mjVolver'; b.className = 'btn'; b.style.cssText = 'margin-top:10px;width:100%;background:#1E88E5;color:#fff;border:none';
          row.parentNode.insertBefore(b, row.nextSibling);
          b.onclick = () => { try { SFX.play('next'); VOZ.stop(); } catch (e) {} st.li = st.__mx; renderLearn(); }; }
        if (st.li < st.__mx) { b.style.display = 'block'; b.textContent = '⏩ Volver a donde iba (lámina ' + (st.__mx + 1) + ' de ' + st.topic.learn.length + ')'; } else b.style.display = 'none';
      };
      renderLearn.__mj = true;
      if (TM) tiempoMinimo = function (card) {
        if (st.li <= st.__done) { try { clearInterval(_minT); } catch (e) {} const b = document.getElementById('lNext'); if (b) b.disabled = false; return; }
        return TM.apply(this, arguments);
      };
    }
  } catch (e) {}

  // ---------- 7) Evaluación con nota 7,0, anticopia y prueba respondida en PDF (va solo a Drive, junto al diploma)
  //  · Se aprueba solo con todas las respuestas correctas (nota 7,0). Si no, repasa las láminas de lo que falló y repite.
  //  · Cada intento: preguntas en otro orden, alternativas mezcladas y, si la pregunta tiene versiones (q.v = [{q,o,a,w}, ...]), una al azar.
  //  · No se muestra cuál era la correcta. Todo lo respondido (todos los intentos) queda en un PDF que se envía al servidor con el diploma.
  try {
    if (typeof startQuiz === 'function' && typeof result === 'function' && !window.MJ_EVAL) {
      const conNota = () => st.mode !== 'ds44' && !st.repaso;
      const mezclar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
      const LK = 'mj_eval_' + location.pathname;
      const log = { leer() { try { const o = JSON.parse(localStorage.getItem(LK) || 'null'); return o && Date.now() - o.ts < 2 * 864e5 ? o : null; } catch (e) { return null; } },
        guardar(o) { try { o.ts = Date.now(); localStorage.setItem(LK, JSON.stringify(o)); } catch (e) {} }, borrar() { try { localStorage.removeItem(LK); } catch (e) {} } };
      const actual = () => { let o = log.leer(); if (!o || o.tema !== (st.topic && st.topic.id) || o.rut !== st.rut) o = { tema: st.topic.id, rut: st.rut, intentos: [] }; return o; };
      const construir = base => mezclar(base.map((q, i) => {
        const vs = [q].concat(Array.isArray(q.v) ? q.v : []), k = Math.floor(Math.random() * vs.length);
        const c = k ? Object.assign({ s: q.s }, vs[k]) : Object.assign({}, q); delete c.v; c.__n = i + 1; c.__ver = 'ABCDEFG'[k]; c.__nv = vs.length; c.__base = q; return c;
      }));
      const S0 = startQuiz;
      startQuiz = function () {
        if (conNota()) {
          const base = st.topic.__base || st.topic;
          st.topic = Object.assign({}, base, { __base: base, quiz: construir(base.quiz) });
          const o = actual(); o.intentos.push({ n: o.intentos.length + 1, ini: Date.now(), r: [] }); log.guardar(o);
        }
        return S0.apply(this, arguments);
      };
      const txt = b => (b.textContent || '').trim();
      const registrar = (btn, ok) => {
        const q = st.topic.quiz[st.qi], o = actual(); if (!o.intentos.length) o.intentos.push({ n: 1, ini: Date.now(), r: [] });
        const it = o.intentos[o.intentos.length - 1];
        let ops, eleg, corr;
        if (q.pick) { const bs = [...document.querySelectorAll('#qBody .pick')]; ops = bs.map((b, k) => 'Imagen ' + 'AB'[k]); eleg = 'Imagen ' + 'AB'[bs.indexOf(btn)]; corr = 'Imagen ' + 'AB'[bs.findIndex(b => +b.dataset.i === q.a)]; }
        else { const bs = [...document.querySelectorAll('#qBody .opt')]; ops = bs.map(txt); eleg = txt(btn); const g = bs.find(b => b.dataset.ok === '1'); corr = g ? txt(g) : ''; }
        it.r = it.r.filter(x => x.p !== st.qi + 1);
        it.r.push({ p: st.qi + 1, n: q.__n || st.qi + 1, ver: q.__ver || 'A', nv: q.__nv || 1, q: q.q, ops, eleg, corr, ok: !!ok, s: q.s || '' });
        it.fin = Date.now(); log.guardar(o);
      };
      // Resultado: aprueba solo con 7,0
      const R0 = result;
      result = function () {
        if (!conNota()) return R0.apply(this, arguments);
        const tot = st.topic.quiz.length, p = st.ok / tot; st.nota = calcNota(p);
        const pass = st.ok === tot;
        const o = actual(), it = o.intentos[o.intentos.length - 1]; if (it) { it.nota = st.nota; it.ok = st.ok; it.tot = tot; it.fin = Date.now(); log.guardar(o); }
        // láminas a repasar según las preguntas falladas (sin decir cuál era la respuesta)
        const L = st.topic.learn || [], mal = it ? it.r.filter(x => !x.ok) : [];
        const idx = [...new Set(mal.map(x => L.findIndex(c => c.s && c.s === x.s)).filter(i => i >= 0))].sort((a, b) => a - b);
        st.__repasar = idx.length ? idx[0] : 0;
        $('rTitle').textContent = pass ? '¡Aprobaste!' : 'Casi... repasemos';
        $('rNota').textContent = fmtN(st.nota);
        $('rNota').style.color = pass ? '#81C784' : '#FF8A80';
        $('rDet').textContent = `Nota · ${st.ok} de ${tot} correctas (${Math.round(p * 100)}%)`;
        $('rMsg').innerHTML = pass ? 'Muy bien. Completa tu compromiso y firma para recibir tu diploma.'
          : 'Para aprobar necesitas <b>nota 7,0</b>: todas las respuestas correctas. Tuviste ' + (tot - st.ok) + (tot - st.ok > 1 ? ' respuestas incorrectas' : ' respuesta incorrecta') + '.'
            + (idx.length ? '<br>Repasa estas láminas:<ul style="text-align:left;margin:6px 0 0 18px">' + idx.slice(0, 5).map(i => '<li>' + L[i].t + '</li>').join('') + '</ul>' : '<br>Repasa las láminas del tema.')
            + 'Después vuelves a dar la prueba, con preguntas distintas.';
        $('rPass').style.display = pass ? 'flex' : 'none';
        $('rFail').style.display = pass ? 'none' : 'flex';
        show('s-result'); sesBorrar(); st.firmaGuia = false; try { firmaAviso = false; } catch (e) {}
        SFX.play(pass ? 'win' : 'bad');
        if (pass) VOZ.say(`¡Aprobaste con nota ${fmtN(st.nota).replace(',', ' coma ')}! Ahora marca los dos compromisos y firma con tu dedo en el recuadro blanco.`, () => { st.firmaGuia = true; guiaFirma(); });
        else guiar('Para aprobar necesitas nota siete: todas las respuestas correctas. Repasa las láminas y vuelve a intentarlo, con preguntas distintas.', 'bRetry', 'REPASAR', '');
        if (pass) setTimeout(sizeSig, 60);
      };
      const rb = document.getElementById('bRetry'), RB0 = rb && rb.onclick;
      if (rb) rb.onclick = function (ev) {
        if (!conNota()) return RB0.call(this, ev);
        st.attempts++; startLearn();
        if (st.__repasar > 0 && st.topic.learn[st.__repasar]) { st.li = st.__repasar; renderLearn(); }
      };
      // PDF de la prueba respondida (todos los intentos)
      const pdfPrueba = () => {
        const o = actual(); if (!o.intentos.length || !window.jspdf) return null;
        const { jsPDF } = window.jspdf, pdf = new jsPDF({ unit: 'mm', format: 'a4' }), W = 210, mx = 14;
        const hex = h => { h = String(h || '#263238').replace('#', ''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); };
        const c1 = hex(M.c1 || '#263238'), c2 = hex(M.c2 || '#FFC20E');
        const f = d => { d = new Date(d); return dmy(d) + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
        let y = 0, pag = 1;
        const pie = () => { pdf.setFontSize(7.5); pdf.setTextColor(120); pdf.text('Prueba respondida · ' + (M.nombre || '') + ' · Código ' + (st.code || '') + ' · Página ' + pag, W / 2, 290, { align: 'center' }); };
        const cab = primera => {
          pdf.setFillColor(...c1); pdf.rect(0, 0, W, primera ? 30 : 14, 'F'); pdf.setFillColor(...c2); pdf.rect(0, primera ? 30 : 14, W, 1.6, 'F');
          pdf.setTextColor(255); pdf.setFont('helvetica', 'bold');
          if (primera) { pdf.setFontSize(16); pdf.text('PRUEBA RESPONDIDA', mx, 13); pdf.setFontSize(11); pdf.text(st.topic.title, mx, 21, { maxWidth: W - 2 * mx }); pdf.setFontSize(9); pdf.setFont('helvetica', 'normal'); pdf.text(M.nombre || '', W - mx, 13, { align: 'right' }); y = 40; }
          else { pdf.setFontSize(10); pdf.text('Prueba respondida · ' + st.topic.title, mx, 9); y = 22; }
        };
        const nueva = () => { pie(); pdf.addPage(); pag++; cab(false); };
        const linea = (t, o2) => { o2 = o2 || {}; pdf.setFont('helvetica', o2.b ? 'bold' : 'normal'); pdf.setFontSize(o2.s || 9.5); pdf.setTextColor(...(o2.c || [38, 50, 56]));
          const ls = pdf.splitTextToSize(t, W - 2 * mx - (o2.ind || 0)); ls.forEach(l => { if (y > 278) nueva(); pdf.text(l, mx + (o2.ind || 0), y); y += (o2.s || 9.5) * 0.45; }); };
        cab(true);
        const ult = o.intentos[o.intentos.length - 1];
        [['Trabajador', st.name], ['RUT', st.rut], ['Fecha', f(st.date || Date.now())], ['Resultado', 'APROBADO · Nota ' + fmtN(ult.nota || 7) + ' (' + (ult.ok ?? '') + ' de ' + (ult.tot ?? '') + ')'], ['Intentos', String(o.intentos.length)], ['Código del diploma', st.code || '']]
          .forEach(([a, b]) => { pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9.5); pdf.setTextColor(90); pdf.text(a + ':', mx, y); pdf.setFont('helvetica', 'normal'); pdf.setTextColor(38, 50, 56); pdf.text(String(b || ''), mx + 38, y); y += 5.2; });
        y += 1; linea('Cada intento tiene las preguntas en distinto orden, las alternativas mezcladas y una versión de cada pregunta elegida al azar (indicada entre corchetes). Durante la prueba no se muestran las respuestas correctas.', { s: 8, c: [110, 110, 110] });
        o.intentos.forEach((it, k) => {
          y += 4; if (y > 262) nueva();
          const ap = it.tot && it.ok === it.tot;
          pdf.setFillColor(...(ap ? [232, 245, 233] : [255, 235, 238])); pdf.rect(mx - 2, y - 4.5, W - 2 * mx + 4, 7, 'F');
          linea('Intento ' + (k + 1) + ' de ' + o.intentos.length + ' · ' + f(it.ini) + ' · ' + (it.tot ? (ap ? 'APROBADO' : 'NO APROBADO') + ' · Nota ' + fmtN(it.nota) + ' (' + it.ok + ' de ' + it.tot + ' correctas)' : 'sin terminar'), { b: true, s: 10, c: ap ? [27, 94, 32] : [183, 28, 28] });
          y += 1.5;
          it.r.slice().sort((a, b) => a.p - b.p).forEach(r => {
            if (y > 262) nueva();
            linea(r.p + '. ' + r.q + (r.nv > 1 ? '  [pregunta ' + r.n + ', versión ' + r.ver + ']' : '  [pregunta ' + r.n + ']'), { b: true, s: 9.3 });
            r.ops.forEach(op => {
              const el = op === r.eleg, co = op === r.corr;
              linea((el ? '(X) ' : '(  ) ') + op + (el ? (r.ok ? '   <- respondió: CORRECTA' : '   <- respondió: INCORRECTA') : (co && !r.ok ? '   (correcta)' : '')), { ind: 4, s: 8.8, c: el ? (r.ok ? [27, 94, 32] : [183, 28, 28]) : co && !r.ok ? [27, 94, 32] : [69, 90, 100] });
            });
            y += 1.6;
          });
        });
        try { if (_sig) { if (y > 250) nueva(); y += 4; pdf.addImage(_sig.toDataURL('image/png'), 'PNG', mx, y, 60, 21); y += 24; pdf.setDrawColor(150); pdf.line(mx, y, mx + 60, y); y += 4; linea('Firma del trabajador · ' + st.name, { s: 8.5 }); } } catch (e) {}
        pie();
        return pdf;
      };
      const nombrePrueba = () => (window.MJ_NOMBRE ? window.MJ_NOMBRE('Prueba') : `Prueba ${st.name} ${String(st.topic.title).replace(/[:/\\]/g, '')} ${dmy(st.date || new Date())}.pdf`);
      const F0 = window.fetch;
      window.fetch = function (u, op) {
        try {
          if (op && op.method === 'POST' && typeof op.body === 'string' && String(u) === String(SCRIPT_URL) && op.body.indexOf('"diploma"') >= 0 && st.mode !== 'ds44') {
            const d = JSON.parse(op.body);
            if (!d.accion && !d.prueba) { const p = pdfPrueba(); if (p) { d.prueba = p.output('datauristring').split(',')[1]; d.archivo_prueba = nombrePrueba(); const o = actual(); d.intentos = o.intentos.length || d.intentos; op = Object.assign({}, op, { body: JSON.stringify(d) }); log.borrar(); } }
          }
        } catch (e) {}
        return F0.call(this, u, op);
      };
      window.MJ_EVAL = { registrar, pdfPrueba, construir, log };
    }
  } catch (e) {}

  // ---------- 8b) Escenas propias de los 18 ítems de la inducción (cada imagen calza con su pregunta, en todos los portales)
  const IND_ESC = (C) => {
    const sv = s => `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
    const T = (x, y, s, z = 12, c = '#263238', w = 'bold', a = 'middle') => `<text x="${x}" y="${y}" font-size="${z}" font-weight="${w}" text-anchor="${a}" fill="${c}" font-family="Arial">${s}</text>`;
    const pill = (x, y, s, c = '#2E7D32', z = 11) => { const w = s.length * z * .56 + 18; return `<rect x="${x - w / 2}" y="${y - z - 3}" width="${w}" height="${z + 9}" rx="${(z + 9) / 2}" fill="${c}"/>` + T(x, y, s, z, '#fff'); };
    const fondo = (c1 = '#E8EEF4', c2 = '#B8C2CC') => `<rect width="320" height="200" fill="${c1}"/><rect y="150" width="320" height="50" fill="${c2}"/><rect y="150" width="320" height="2" fill="#90A4AE"/>`;
    const cielo = () => `<rect width="320" height="200" fill="#BBDEFB"/><rect y="150" width="320" height="50" fill="#C8B59A"/>`;
    const ok = (x, y) => `<circle cx="${x}" cy="${y}" r="13" fill="#2E7D32" stroke="#fff" stroke-width="2.5"/><path d="M${x - 6},${y} l4,5 l8,-9" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    const no = (x, y) => `<circle cx="${x}" cy="${y}" r="13" fill="#D7262B" stroke="#fff" stroke-width="2.5"/><path d="M${x - 5},${y - 5} l10,10 M${x + 5},${y - 5} l-10,10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
    const PE = /capacitaciones-perello/.test(location.pathname);
    const P = (x, y, o) => { o = Object.assign({}, o || {}); if (PE && o.shirt === undefined) Object.assign(o, { helmet: false, cofia: true, apron: '#FFFFFF', boots: '#FAFAFA', gloves: o.gloves === false ? false : '#FDD835', mask: o.mask, shirt: '#ECEFF1', pants: '#CFD8DC' }); try { return W(x, y, o); } catch (e) { return ''; } };
    const caja = (x, y, w, h, c = '#C89B5E') => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="2" fill="${c}" stroke="#8D6E3F" stroke-width="1.2"/><rect x="${x + w / 2 - 3}" y="${y - h}" width="6" height="${h}" fill="#E0C08A"/>`;
    const fono = (x, y, num) => `<rect x="${x}" y="${y}" width="34" height="56" rx="6" fill="#263238"/><rect x="${x + 3}" y="${y + 6}" width="28" height="40" rx="2" fill="#81D4FA"/>` + T(x + 17, y + 31, num, 10, '#0D47A1');
    const ext = (x, y) => `<rect x="${x}" y="${y - 46}" width="16" height="46" rx="6" fill="#D32F2F" stroke="#7F0000"/><rect x="${x + 4}" y="${y - 54}" width="8" height="9" fill="#424242"/><path d="M${x + 12},${y - 52} q22,-4 30,10" stroke="#212121" stroke-width="3" fill="none"/>`;
    const fuego = (x, y) => `<path d="M${x},${y} q-14,-14 -2,-34 q2,12 9,6 q-2,-12 8,-20 q2,18 12,22 q8,14 -4,26 z" fill="#FF7043"/><path d="M${x + 6},${y} q-6,-8 0,-18 q3,8 8,6 q4,8 -2,12z" fill="#FFD54F"/>`;
    const cono = x => `<path d="M${x - 8},165 l6,-26 h4 l6,26z" fill="#FF6D00"/><rect x="${x - 4}" y="150" width="8" height="4" fill="#fff"/><rect x="${x - 10}" y="164" width="20" height="3" fill="#E65100"/>`;
    const sol = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FDD835"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<line x1="${x + Math.cos(a) * (r + 4)}" y1="${y + Math.sin(a) * (r + 4)}" x2="${x + Math.cos(a) * (r + 11)}" y2="${y + Math.sin(a) * (r + 11)}" stroke="#FBC02D" stroke-width="3" stroke-linecap="round"/>`; }).join('');
    const ondas = (x, y) => [0, 1, 2].map(i => `<path d="M${x + i * 8},${y - 10 - i * 4} q${8 + i * 3},${10 + i * 4} 0,${20 + i * 8}" stroke="#E53935" stroke-width="2.5" fill="none"/>`).join('');
    const fonos = (x, y) => `<path d="M${x - 10},${y} a10,11 0 0 1 20,0" stroke="#B71C1C" stroke-width="3" fill="none"/><rect x="${x - 13}" y="${y - 3}" width="7" height="11" rx="3" fill="#D32F2F"/><rect x="${x + 6}" y="${y - 3}" width="7" height="11" rx="3" fill="#D32F2F"/>`;
    const botella = (x, y, c, lab) => `<rect x="${x}" y="${y - 40}" width="22" height="40" rx="4" fill="${c}" stroke="#37474F"/><rect x="${x + 7}" y="${y - 48}" width="8" height="9" fill="#37474F"/><rect x="${x + 3}" y="${y - 30}" width="16" height="12" fill="#fff"/>` + T(x + 11, y - 21, lab, 7, '#263238');
    return {
      ind_orden: () => sv(fondo() + `<rect x="80" y="152" width="160" height="48" fill="#CFD8DC"/><rect x="155" y="160" width="10" height="34" fill="#FDD835"/>` + caja(14, 150, 30, 26) + caja(14, 124, 30, 22) + caja(46, 150, 28, 30) + caja(262, 150, 30, 26) + caja(278, 124, 26, 20) + P(200, 168, { pose: 'point' }) + pill(160, 30, 'Orden y limpieza: pasillos y salidas despejados') + ok(290, 60)),
      ind_ley: () => sv(fondo('#E3F2FD', '#BBDEFB') + `<path d="M160,40 l50,16 v34 q0,40 -50,58 q-50,-18 -50,-58 v-34z" fill="#1565C0" stroke="#0D47A1" stroke-width="3"/>` + T(160, 88, 'LEY', 14, '#fff') + T(160, 108, '16.744', 18, '#fff') + T(52, 172, 'Trabajo', 12) + T(160, 180, 'Trayecto', 12) + T(268, 172, 'Enfermedad', 12) + `<rect x="34" y="128" width="36" height="26" rx="3" fill="#FFB300"/><rect x="140" y="140" width="40" height="18" rx="5" fill="#E53935"/><circle cx="148" cy="160" r="5" fill="#263238"/><circle cx="172" cy="160" r="5" fill="#263238"/><rect x="256" y="126" width="24" height="24" rx="3" fill="#fff" stroke="#D32F2F"/><path d="M268,130 v16 M260,138 h16" stroke="#D32F2F" stroke-width="5"/>` + pill(160, 24, 'Estás protegido por el seguro', '#2E7D32')),
      ind_avisa: () => sv(fondo() + P(110, 165, { pose: 'point', face: 'worried' }) + `<rect x="112" y="118" width="12" height="8" rx="3" fill="#fff" stroke="#B0BEC5"/>` + P(205, 165, { flip: true, shirt: '#455A64', helmet: '#ECEFF1' }) + fono(258, 92, C.n) + pill(160, 30, 'Avisa de inmediato a tu jefatura') + T(160, 192, 'Atención en ' + C.m.replace(/^la /, '') + ' · ' + C.n, 12, '#0D47A1')),
      ind_grave: () => sv(fondo() + `<rect x="70" y="130" width="180" height="4" fill="#FDD835"/><rect x="70" y="130" width="180" height="4" fill="url(#)" />` + [60, 120, 200, 260].map(cono).join('') + `<line x1="60" y1="140" x2="260" y2="140" stroke="#FDD835" stroke-width="4" stroke-dasharray="10 6"/>` + `<ellipse cx="160" cy="166" rx="34" ry="7" fill="#90A4AE"/><rect x="132" y="154" width="56" height="12" rx="6" fill="#1565C0"/><circle cx="196" cy="158" r="8" fill="#F2C6A0"/>` + fono(276, 92, C.n) + pill(150, 30, 'Accidente grave: paraliza, delimita y llama', '#C62828')),
      ind_politica: () => sv(fondo('#E8F5E9', '#C8E6C9') + P(110, 165, { pose: 'stop' }) + P(210, 165, { pose: 'stop', flip: true }) + `<path d="M160,48 l34,11 v22 q0,28 -34,40 q-34,-12 -34,-40 v-22z" fill="#2E7D32"/><path d="M146,82 l10,10 l18,-20" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>` + pill(160, 28, 'Los accidentes se pueden evitar') + T(160, 192, 'La seguridad es tarea de todos', 12, '#1B5E20')),
      ind_epp: () => sv(fondo() + P(90, 168, { glasses: true, gloves: true, s: 1.25 }) + `<g transform="translate(180,56)"><path d="M0,22 a22,22 0 0 1 44,0 z" fill="#FFC20E" stroke="#9A7400"/><rect x="-4" y="20" width="52" height="5" rx="2" fill="#FFC20E"/></g><rect x="246" y="70" width="40" height="14" rx="7" fill="#90CAF9" stroke="#263238"/><path d="M190,112 h26 v26 h-26z" fill="#FDD835" stroke="#8D6E3F"/><path d="M246,118 h26 v14 h14 v10 h-40z" fill="#3E2723"/>` + pill(205, 30, 'EPP puesto siempre') + T(200, 172, 'Si se daña: devuélvelo y pide otro', 11, '#B71C1C')),
      ind_extintor: () => sv(fondo() + P(110, 165, { pose: 'point' }) + ext(128, 160) + fuego(190, 165) + pill(160, 30, 'Seguro · base del fuego · barrido') + `<path d="M170,148 l18,8" stroke="#ECEFF1" stroke-width="7" stroke-linecap="round" opacity=".9"/>` + T(270, 120, 'Si no se apaga:', 11) + T(270, 136, 'evacúa y llama', 11) + T(270, 154, '132', 16, '#C62828')),
      ind_senal: () => sv(cielo() + [0, 1, 2, 3, 4, 5].map(i => `<rect x="${110 + i * 18}" y="160" width="10" height="34" fill="#fff"/>`).join('') + P(150, 168, { pose: 'walk' }) + `<rect x="18" y="60" width="62" height="44" rx="4" fill="#2E7D32"/>` + T(49, 78, 'ZONA DE', 9, '#fff') + T(49, 92, 'SEGURIDAD', 9, '#fff') + `<line x1="49" y1="104" x2="49" y2="150" stroke="#607D8B" stroke-width="4"/><circle cx="268" cy="80" r="22" fill="#fff" stroke="#D32F2F" stroke-width="5"/><rect x="254" y="77" width="26" height="6" fill="#455A64"/><line x1="252" y1="64" x2="284" y2="96" stroke="#D32F2F" stroke-width="5"/><line x1="268" y1="102" x2="268" y2="150" stroke="#607D8B" stroke-width="4"/>` + pill(160, 28, 'Respeta la señalización y las zonas peatonales')),
      ind_cargas: () => sv(fondo() + P(90, 165, { pose: 'carry' }) + caja(100, 120, 34, 26) + T(117, 108, '25 kg', 10, '#fff') + P(220, 165, { pose: 'carry', hair: true }) + caja(230, 120, 34, 26) + T(247, 108, '20 kg', 10, '#fff') + T(90, 190, 'Hombres: 25 kg', 12) + T(225, 190, 'Mujeres y menores: 20 kg', 12) + pill(160, 30, 'Peso máximo de carga (Ley 20.949)')),
      ind_hanta: () => sv(fondo('#EFEBE9', '#BCAAA4') + `<ellipse cx="70" cy="150" rx="20" ry="11" fill="#8D6E63"/><circle cx="88" cy="144" r="8" fill="#8D6E63"/><circle cx="92" cy="141" r="2" fill="#000"/><path d="M50,152 q-24,4 -30,-10" stroke="#8D6E63" stroke-width="3" fill="none"/>` + P(190, 165, { mask: true, gloves: true }) + botella(222, 128, '#4FC3F7', 'AGUA+CLORO') + `<path d="M222,96 q-10,-8 -22,-4" stroke="#4FC3F7" stroke-width="3" stroke-dasharray="3 3" fill="none"/>` + pill(160, 30, 'Hantavirus: nunca barras en seco', '#6D4C41') + T(160, 192, 'Humedece con agua y cloro · mascarilla y guantes', 11)),
      ind_quimicos: () => sv(fondo() + botella(60, 150, '#FFEB3B', 'CLORO') + botella(96, 150, '#EF9A9A', 'ÁCIDO') + no(92, 92) + `<rect x="170" y="70" width="58" height="76" rx="3" fill="#fff" stroke="#90A4AE"/><rect x="170" y="70" width="58" height="14" fill="#1565C0"/>` + T(199, 81, 'HDS', 10, '#fff') + [0, 1, 2, 3].map(i => `<line x1="178" y1="${96 + i * 12}" x2="220" y2="${96 + i * 12}" stroke="#B0BEC5" stroke-width="3"/>`).join('') + P(268, 165, { flip: true, gloves: true, glasses: true }) + pill(160, 30, 'Químicos: lee la HDS y nunca mezcles')),
      ind_calor: () => sv(cielo() + sol(270, 44, 18) + `<rect x="20" y="96" width="100" height="10" fill="#558B2F"/><rect x="60" y="106" width="8" height="44" fill="#6D4C41"/><ellipse cx="64" cy="90" rx="58" ry="22" fill="#7CB342"/>` + P(70, 165, {}) + botella(90, 150, '#81D4FA', 'AGUA') + `<rect x="200" y="80" width="14" height="60" rx="7" fill="#fff" stroke="#E53935" stroke-width="2"/><rect x="204" y="100" width="6" height="36" fill="#E53935"/><circle cx="207" cy="146" r="9" fill="#E53935"/>` + pill(165, 30, 'Calor: agua seguido y sombra')),
      ind_tmert: () => sv(fondo() + `<rect x="160" y="112" width="120" height="8" fill="#78909C"/><rect x="166" y="120" width="6" height="30" fill="#78909C"/><rect x="268" y="120" width="6" height="30" fill="#78909C"/>` + P(140, 165, { pose: 'carry' }) + `<circle cx="150" cy="113" r="11" fill="none" stroke="#E53935" stroke-width="3"/><circle cx="136" cy="92" r="10" fill="none" stroke="#E53935" stroke-width="3"/>` + P(60, 165, { pose: 'stop' }) + pill(160, 30, 'Tareas repetitivas: pausas activas y alterna') + T(60, 190, 'Pausa activa', 11, '#2E7D32') + T(200, 190, 'Avisa si te duele', 11, '#C62828')),
      ind_karin: () => sv(fondo() + P(80, 165, { pose: 'point', shirt: '#6D4C41', helmet: false }) + `<path d="M98,70 h50 v22 h-36 l-8,8 v-8 h-6z" fill="#fff" stroke="#E53935"/>` + T(123, 85, '¡!#@', 12, '#E53935') + no(150, 60) + P(160, 165, { flip: true, face: 'worried' }) + `<rect x="226" y="96" width="60" height="40" rx="3" fill="#FFF8E1" stroke="#8D6E3F"/><path d="M226,96 l30,22 l30,-22" stroke="#8D6E3F" fill="none"/><rect x="248" y="122" width="16" height="12" rx="2" fill="#455A64"/><path d="M251,122 v-5 a5,5 0 0 1 10,0 v5" stroke="#455A64" stroke-width="2" fill="none"/>` + pill(160, 28, 'Ley Karin: respeto siempre') + T(256, 156, 'Denuncia confidencial', 11, '#1565C0')),
      ind_ruido: () => sv(fondo() + `<rect x="24" y="96" width="70" height="54" rx="4" fill="#78909C" stroke="#455A64"/><circle cx="59" cy="123" r="16" fill="#546E7A"/><circle cx="59" cy="123" r="5" fill="#263238"/>` + ondas(100, 120) + P(190, 165, {}) + fonos(190, 92) + `<rect x="238" y="56" width="66" height="50" rx="4" fill="#1565C0"/>` + T(271, 74, 'ZONA DE', 9, '#fff') + T(271, 87, 'RUIDO', 11, '#fff') + T(271, 100, 'PROTECTOR', 8, '#fff') + pill(150, 28, 'Ruido: protector auditivo obligatorio') + T(160, 192, 'El daño al oído es para siempre (PREXOR)', 11, '#B71C1C')),
      ind_uv: () => sv(cielo() + sol(60, 50, 18) + T(60, 98, 'UV', 14, '#E65100') + P(170, 165, { glasses: true }) + `<rect x="230" y="96" width="18" height="34" rx="4" fill="#FFF59D" stroke="#F9A825"/>` + T(239, 117, 'FPS', 7) + `<circle cx="282" cy="80" r="20" fill="#fff" stroke="#455A64" stroke-width="2"/><line x1="282" y1="80" x2="282" y2="66" stroke="#263238" stroke-width="2"/><line x1="282" y1="80" x2="292" y2="84" stroke="#263238" stroke-width="2"/>` + T(282, 116, '11:00–16:00', 10, '#C62828') + pill(170, 28, 'Sol: bloqueador, legionario, lentes y sombra')),
      ind_psico: () => sv(fondo() + P(110, 165, { face: 'worried' }) + `<ellipse cx="90" cy="64" rx="44" ry="22" fill="#fff" stroke="#90A4AE"/>` + T(90, 60, 'Mucha', 10) + T(90, 73, 'carga…', 10) + P(210, 165, { flip: true, shirt: '#455A64', helmet: '#ECEFF1' }) + `<path d="M196,70 h60 v24 h-44 l-8,8 v-8 h-8z" fill="#E8F5E9" stroke="#2E7D32"/>` + T(226, 86, 'Conversemos', 9, '#2E7D32') + pill(160, 28, 'Riesgos psicosociales: CEAL-SM') + T(160, 192, 'Si te sientes sobrepasado, convérsalo', 11, '#1565C0')),
      ind_luz: () => sv(`<rect width="320" height="200" fill="#455A64"/><rect y="150" width="320" height="50" fill="#37474F"/>` + `<rect x="150" y="40" width="20" height="8" fill="#263238"/><path d="M146,48 h28 l-6,16 h-16z" fill="#78909C"/>` + no(190, 56) + `<path d="M0,150 L120,150 L60,200 L0,200z" fill="#263238" opacity=".6"/>` + P(230, 165, { pose: 'point' }) + P(290, 165, { flip: true, shirt: '#455A64', helmet: '#ECEFF1' }) + pill(150, 26, 'Luz quemada o pasillo oscuro: avisa', '#F9A825') + T(80, 192, 'No improvises', 11, '#FFEB3B'))
    };
  };

  // ---------- 8) Inducción con 1 pregunta por cada uno de los 18 ítems de la inducción escrita (3 versiones cada una)
  //  Mismos 18 ítems en todas las empresas (Constructor, OYM, Plaza, PROSIP). Perelló tiene su propia versión (perello_extra.js).
  try {
    const CFG = { '/capacitaciones-constructor/': { m: 'la Mutual de Seguridad', n: '1407', l: 'la sucursal' }, '/capacitaciones-oym/': { m: 'la Mutual de Seguridad', n: '1407', l: 'la sucursal' },
      '/capacitaciones-plaza/': { m: 'la ACHS', n: '1404', l: 'la obra' }, '/capacitaciones-montasip/': { m: 'la ACHS', n: '1404', l: 'la obra' }, '/capacitaciones-zg/': { m: 'la ACHS', n: '1404', l: 'la faena' }, '/capacitaciones-transporteszg/': { m: 'la ACHS', n: '1404', l: 'la faena' }, '/capacitaciones-prosip/': { m: 'la ACHS', n: '1404', l: 'la planta' } };
    const C = CFG[location.pathname.replace(/index\.html$/, '')];
    try { const E = IND_ESC(C || { m: 'la ACHS', n: '1404', l: 'la planta' }); Object.keys(E).forEach(k => { if (typeof S[k] !== 'function') S[k] = E[k]; }); } catch (e) {}
    const ind = C && typeof TOPICS !== 'undefined' && TOPICS.find(t => t.id === 'induccion');
    if (ind && !ind.__i18) {
      ind.__i18 = true;
      const L = ind.learn, has = k => typeof S[k] === 'function';
      // ítem: [regex de la lámina, escena de respaldo, lámina de respaldo (título, texto, idea clave)]
      const IT = [
        [/orden/i, 'orden_aisle', ['Orden y limpieza: obligatorio', 'El área de trabajo debe estar <b>siempre</b> ordenada y limpia: pasillos y salidas despejados, materiales en su lugar. Retira o reporta de inmediato derrames, embalajes, polvo o clavos. No cumplir es una <b>falta grave</b>.', 'Orden y limpieza siempre.']],
        [/16\.744|seguro|protegido/i, 'accidente_ley', ['Ley 16.744: estás protegido', 'El seguro de la <b>Ley 16.744</b> te cubre ante accidentes del trabajo, de trayecto y enfermedades profesionales: atención médica, rehabilitación y prestaciones económicas.', 'Todos estamos cubiertos.']],
        [/tienes un accidente|ocurre un accidente|si te accidentas/i, 'accidente_avisa', ['Si tienes un accidente', 'Avisa <b>de inmediato</b> a tu jefatura, aunque parezca leve. Te atiendes en ' + C.m + '. Emergencias: <b>' + C.n + '</b>, las 24 horas.', 'Todo accidente se avisa al tiro a la jefatura.']],
        [/grave/i, 'accidente_companero', ['Accidente grave o fatal', 'Es grave, por ejemplo, una caída de más de <b>1,8 metros</b>, una amputación o si se requiere rescate o reanimación. Se <b>paraliza la faena</b>, se delimita el área y se llama al ' + C.n + '. No muevas al accidentado salvo que siga en peligro.', 'Paralizar, delimitar y pedir ayuda.']],
        [/bienvenid|política|evitar/i, 'accidente_casi', ['Nuestra política de prevención', 'Los accidentes <b>se pueden evitar</b>. La seguridad es tarea de todos: la empresa y cada trabajador cumpliendo las normas.', 'La seguridad es tarea de todos.']],
        [/EPP/, 'epp_task', ['Tus EPP', 'El uso del EPP es <b>obligatorio</b> todo el tiempo que estés expuesto al riesgo. Si se daña, devuélvelo y pide la reposición antes de seguir.', 'EPP puesto siempre.']],
        [/extintor/i, 'incendios_ext', ['Uso del extintor', 'Retira el seguro, apunta a la <b>base del fuego</b> y descarga en barrido. Si no se apaga en segundos, evacúa y llama al 132.', 'Seguro, base y barrido.']],
        [/señal/i, 'senaletica_piso', ['Señalización y zonas seguras', 'Respeta la señalización, camina por las <b>zonas peatonales</b>, fuma solo en la zona habilitada y mantén despejada la <b>zona de seguridad</b>.', 'Zonas peatonales y zona de seguridad despejada.']],
        [/20\.949|peso/i, 'cargas_limites', ['Peso máximo (Ley 20.949)', '<b>25 kg</b> para hombres adultos y <b>20 kg</b> para mujeres y menores de 18. Sobre eso: ayuda mecánica o de otra persona.', '25 kg hombres, 20 kg mujeres.']],
        [/hanta/i, 'orden_clean', ['Hantavirus', 'Lo transmite el <b>ratón colilargo</b>. Te contagias al respirar polvo contaminado. <b>Nunca barras en seco</b>: humedece con agua y cloro, usa mascarilla y guantes, y avisa si tienes fiebre y dolor muscular.', 'Nunca barrer en seco.']],
        [/químic/i, 'quimicos_hds', ['Sustancias químicas', 'Todo producto tiene su <b>HDS</b> (DS 57). Usa el EPP que indica, guárdalo en su envase original rotulado y <b>nunca mezcles</b> productos.', 'HDS, envase original y nunca mezclar.']],
        [/calor|temperatura/i, 'uv_sombra', ['Calor: hidrátate', 'Con calor puedes deshidratarte o sufrir un <b>golpe de calor</b> (mareo, dolor de cabeza, calambres). Toma <b>agua seguido</b> y haz pausas a la sombra.', 'Agua seguido y sombra.']],
        [/TMERT|repetitiv/i, 'tmert_pausa', ['Tareas repetitivas (TMERT)', 'Los movimientos repetitivos y las posturas forzadas lesionan hombros, codos y muñecas. Haz las <b>pausas activas</b>, alterna tareas y avisa cualquier dolor.', 'Pausas y avisar el dolor.']],
        [/Karin|respeto/i, 'karin_intro', ['Ley Karin', 'La <b>Ley Karin</b> previene y sanciona el acoso laboral, el acoso sexual y la violencia en el trabajo. Las denuncias son <b>confidenciales</b>.', 'Respeto siempre; se puede denunciar.']],
        [/PREXOR|ruido/i, 'ruido_prexor', ['Ruido (PREXOR)', 'El ruido fuerte daña el oído para siempre. El protocolo <b>PREXOR</b> controla la exposición; en zonas señalizadas el protector auditivo es <b>obligatorio</b>.', 'Zona de ruido: protector siempre.']],
        [/UV|sol\b|radiación/i, 'uv_bloq', ['Radiación UV', 'Al aire libre usa bloqueador, gorro legionario, lentes con filtro UV y busca sombra. Lo más peligroso: entre las <b>11:00 y las 16:00</b>, también nublado.', 'Bloqueador, gorro, lentes y sombra.']],
        [/psicosocial/i, 'psico_ceal', ['Riesgos psicosociales', 'La carga de trabajo, el liderazgo y el ambiente afectan la salud. El cuestionario <b>CEAL-SM</b> detecta estos riesgos para mejorar. Si te sientes sobrepasado, conversa con tu jefatura.', 'Si te sientes sobrepasado, conversa.']],
        [/ilumin/i, 'emergencias_luz', ['Iluminación', 'Una buena luz evita fatiga visual, errores y accidentes. Si una luz se quema o un sector queda oscuro, <b>avisa</b>; no improvises.', 'Luz quemada: se avisa.']]
      ];
      const NI = ['ind_orden', 'ind_ley', 'ind_avisa', 'ind_grave', 'ind_politica', 'ind_epp', 'ind_extintor', 'ind_senal', 'ind_cargas', 'ind_hanta', 'ind_quimicos', 'ind_calor', 'ind_tmert', 'ind_karin', 'ind_ruido', 'ind_uv', 'ind_psico', 'ind_luz'];
      try { const E = IND_ESC(C); Object.keys(E).forEach(k => { S[k] = E[k]; }); IT.forEach((it, i) => { it[1] = NI[i]; }); } catch (e) {}
      const esc = IT.map(([re, sb, card]) => {
        // la imagen de la pregunta es SIEMPRE la escena propia del ítem (si existe en el portal); la lámina del portal solo se usa si no hay escena propia
        const c = L.find(l => re.test(l.t));
        const s = has(sb) ? sb : (c ? c.s : (L[0] && L[0].s));
        if (!c) L.splice(Math.max(1, L.length - 2), 0, { s, t: card[0], x: card[1], k: card[2] });
        return s;
      });
      const O = (q, o, w) => ({ q, o, a: 0, w }), V = (q, vf, w) => ({ q, vf, w });
      const B = [
        [O('¿Cómo debe estar siempre tu área de trabajo?', ['Ordenada y limpia, con pasillos y salidas despejados', 'Ordenada solo cuando viene la jefatura', 'Con materiales en el pasillo para tenerlos a mano'], 'Orden y limpieza siempre.'),
         O('Ves un derrame, clavos o restos de embalaje en el pasillo. ¿Qué haces?', ['Lo retiro o lo reporto de inmediato', 'Paso por el lado', 'Lo dejo para el final del día'], 'Se retira o se reporta de inmediato.'),
         O('No cumplir con el orden y la limpieza del área es…', ['Una falta grave a la seguridad y a la normativa interna', 'Algo sin importancia', 'Un problema solo del personal de aseo'], 'Es obligatorio y sin excepciones.')],
        [O('¿Qué cubre el seguro de la Ley 16.744?', ['Accidentes del trabajo, de trayecto y enfermedades profesionales', 'Solo accidentes graves', 'Solo enfermedades comunes'], 'Cubre a todos los trabajadores.'),
         V('El seguro de la Ley 16.744 también cubre los accidentes de trayecto.', true, 'Verdadero.'),
         O('El seguro de la Ley 16.744 incluye…', ['Atención médica, rehabilitación y prestaciones económicas', 'Solo la primera consulta', 'Nada si el accidente fue leve'], 'Atención, rehabilitación y prestaciones.')],
        [O('Tienes un accidente que parece leve. ¿Qué haces?', ['Aviso de inmediato a mi jefatura', 'Sigo trabajando y aviso al final del día', 'No digo nada si no es grave'], 'Todo accidente se avisa de inmediato.'),
         O('¿Dónde te atiendes por un accidente del trabajo o de trayecto?', ['En ' + C.m + ', la mutualidad de la empresa', 'En cualquier consultorio, pagando la consulta', 'En la farmacia más cercana'], 'En ' + C.m + '.'),
         O('¿Cuál es el número de emergencias de ' + C.m + '?', [C.n, '131', '133'], C.n + ', las 24 horas.')],
        [O('Ante un accidente grave o fatal, ¿qué se hace en el lugar?', ['Se paraliza la faena y se delimita el área con conos o cinta', 'Se sigue trabajando para no atrasarse', 'Se limpia todo antes de que llegue alguien'], 'Paralizar y delimitar.'),
         O('¿Cuál de estos es un accidente grave?', ['Una caída de más de 1,8 metros de altura', 'Un rasguño en la mano', 'Un golpe leve en el codo'], 'Caídas de más de 1,8 m son graves.'),
         O('Un compañero queda inconsciente tras un golpe fuerte. ¿Qué haces primero?', ['Llamo al ' + C.n + ' y aviso a la jefatura, sin moverlo salvo que siga en peligro', 'Lo levanto y lo llevo caminando', 'Le doy agua y sigo trabajando'], 'Pide ayuda y no lo muevas salvo peligro.')],
        [V('Los accidentes del trabajo se pueden evitar.', true, 'Verdadero.'),
         O('Según la política de prevención, ¿quién es responsable de trabajar seguro?', ['Todos: la empresa y cada trabajador cumpliendo las normas', 'Solo el prevencionista', 'Solo la jefatura'], 'Es tarea de todos.'),
         O('¿Cuál es la causa más común de un accidente?', ['Una acción insegura que se pudo evitar, como apurarse o no usar el EPP', 'La mala suerte', 'El clima'], 'La mayoría se pueden evitar.')],
        [O('Notas que tu EPP está roto o dañado. ¿Qué haces?', ['Aviso a mi jefatura y pido el cambio antes de seguir trabajando', 'Sigo trabajando y lo cambio después', 'Me lo saco y trabajo sin él'], 'Un EPP dañado no protege.'),
         O('¿Cuándo debes usar tu EPP?', ['Todo el tiempo que estés expuesto al riesgo', 'Solo cuando está la jefatura', 'Solo si la tarea es larga'], 'Todo el tiempo de exposición.'),
         O('¿Qué haces con un EPP deteriorado para recibir uno nuevo?', ['Lo devuelvo y pido la reposición', 'Lo boto a la basura', 'Lo sigo usando igual'], 'Se devuelve el deteriorado.')],
        [O('Al usar el extintor, ¿hacia dónde apuntas?', ['A la base del fuego', 'A las llamas más altas', 'Al humo'], 'A la base del fuego.'),
         O('¿Cuál es el orden correcto para usar el extintor?', ['Retirar el seguro, apuntar a la base y descargar en barrido', 'Apuntar a las llamas, descargar y después retirar el seguro', 'Agitarlo y lanzar el polvo hacia arriba'], 'Seguro, base y barrido.'),
         O('Intentaste apagar un amago y no se apaga en segundos. ¿Qué haces?', ['Evacúo y aviso: se llama al 132 (Bomberos)', 'Sigo intentando hasta que se apague', 'Le echo agua al tablero eléctrico'], 'Si no se apaga en segundos, se evacúa.')],
        [O('¿Por dónde debes caminar en ' + C.l + '?', ['Por las zonas peatonales señalizadas', 'Por donde sea más corto', 'Por la ruta de los vehículos'], 'Por las zonas peatonales.'),
         O('¿Dónde se puede fumar?', ['Solo en la zona habilitada para fumar', 'En cualquier lugar abierto', 'Dentro de la bodega, con la puerta abierta'], 'Solo en la zona habilitada.'),
         O('La zona de seguridad debe estar…', ['Despejada y conocida por todos', 'Ocupada con materiales si falta espacio', 'Cerrada con llave'], 'Despejada para emergencias.')],
        [O('¿Cuál es el peso máximo que un hombre adulto puede cargar manualmente?', ['25 kg', '40 kg', '50 kg'], 'Ley 20.949: 25 kg.'),
         O('¿Cuál es el peso máximo para mujeres y menores de 18 años?', ['20 kg', '30 kg', '25 kg'], 'Ley 20.949: 20 kg.'),
         O('La carga que debes mover pesa más del límite. ¿Qué haces?', ['Pido ayuda o uso un carro o transpaleta', 'La levanto rápido de una vez', 'La arrastro con la espalda doblada'], 'Ayuda mecánica o de otra persona.')],
        [O('¿Cómo se contagia el hantavirus?', ['Al respirar polvo contaminado con orina o fecas de ratones silvestres', 'Por tomar agua de la llave', 'Por estar con un compañero resfriado'], 'Al respirar polvo contaminado.'),
         O('Debes limpiar una bodega con polvo. ¿Cómo lo haces?', ['Humedezco con agua y cloro antes de limpiar, con mascarilla y guantes', 'Barro en seco, es más rápido', 'Levanto el polvo con aire comprimido'], 'Nunca barrer en seco.'),
         O('Después de limpiar un galpón te da fiebre y dolor muscular. ¿Qué haces?', ['Aviso de inmediato a mi jefatura', 'Espero que se pase solo', 'Tomo un remedio y no digo nada'], 'Se avisa de inmediato.')],
        [O('¿Qué pasa si mezclas cloro con ácido?', ['Se libera un gas tóxico', 'Limpia mejor', 'Nada'], 'Nunca mezcles productos.'),
         O('¿Dónde encuentras cómo usar un químico y qué EPP necesitas?', ['En su Hoja de Datos de Seguridad (HDS)', 'En internet', 'Preguntándole a cualquier compañero'], 'La HDS lo indica.'),
         O('¿Dónde se guarda un producto químico?', ['En su envase original y rotulado', 'En una botella de bebida', 'En cualquier envase limpio'], 'Envase original y rotulado.')],
        [O('Trabajas en un día de mucho calor. ¿Qué haces?', ['Tomo agua seguido, aunque no tenga sed', 'Tomo agua solo en la colación', 'Trabajo sin pausas para terminar antes'], 'Hidrátate seguido.'),
         O('¿Cuál es una señal de golpe de calor?', ['Mareo, dolor de cabeza y mucho cansancio', 'Ganas de comer', 'Manos frías'], 'Mareo y dolor de cabeza.'),
         O('Un compañero se marea por el calor. ¿Qué haces?', ['Lo llevo a la sombra, le doy agua y aviso a la jefatura', 'Le digo que siga, que ya se le pasará', 'Lo dejo descansando al sol'], 'Sombra, agua y aviso.')],
        [O('Te empieza a doler la muñeca o el hombro por una tarea repetitiva. ¿Qué haces?', ['Aviso de inmediato a mi jefatura', 'Sigo igual hasta que se me pase', 'Tomo un analgésico y no digo nada'], 'Las molestias se avisan a tiempo.'),
         O('¿Qué ayuda a prevenir lesiones por tareas repetitivas?', ['Hacer las pausas activas y alternar tareas', 'Trabajar más rápido para terminar antes', 'Hacer fuerza con la muñeca doblada'], 'Pausas y alternar tareas.'),
         O('¿Qué partes del cuerpo se lesionan con movimientos repetitivos?', ['Hombros, codos y muñecas', 'Solo los pies', 'Ninguna'], 'Hombros, codos y muñecas.')],
        [O('Un compañero te grita y humilla seguido. ¿Qué puedes hacer?', ['Denunciarlo por los canales de la empresa (Ley Karin)', 'Nada, es normal en el trabajo', 'Responderle a golpes'], 'Se denuncia por los canales formales.'),
         O('¿Qué regula la Ley Karin?', ['La prevención y sanción del acoso laboral, el acoso sexual y la violencia en el trabajo', 'Los horarios de colación', 'El peso máximo de carga'], 'Acoso y violencia en el trabajo.'),
         V('Las denuncias por Ley Karin se manejan con confidencialidad.', true, 'Verdadero.')],
        [O('En una zona señalizada con ruido, el protector auditivo es…', ['Obligatorio todo el tiempo', 'Opcional', 'Solo para los nuevos'], 'Obligatorio.'),
         O('¿Qué daño produce el ruido sin protección?', ['Pérdida de audición que no se recupera', 'Ninguno si uno se acostumbra', 'Solo un dolor de cabeza pasajero'], 'Es irreversible.'),
         O('¿Qué protocolo del MINSAL controla la exposición a ruido?', ['PREXOR', 'TMERT', 'Ley Karin'], 'PREXOR.')],
        [O('Trabajas al aire libre en verano. ¿Qué haces?', ['Uso bloqueador, gorro legionario, lentes con filtro UV y busco sombra', 'Me saco la polera para estar fresco', 'Nada si está nublado'], 'Protégete siempre del sol.'),
         O('¿En qué horario la radiación UV es más peligrosa?', ['Entre las 11:00 y las 16:00', 'En la mañana temprano', 'Al atardecer'], 'Entre las 11:00 y las 16:00.'),
         V('En días nublados no hay radiación UV.', false, 'Falso: también hay radiación con nubes.')],
        [O('¿Para qué se aplica el cuestionario CEAL-SM?', ['Para identificar riesgos psicosociales y mejorar el ambiente de trabajo', 'Para evaluar tu desempeño y sancionarte', 'Para calcular tu sueldo'], 'Detecta riesgos psicosociales.'),
         O('¿Cuál de estos es un factor de riesgo psicosocial?', ['Una carga de trabajo excesiva o un mal liderazgo', 'Usar el EPP', 'Lavarse las manos'], 'Carga, liderazgo y ambiente.'),
         O('Hace semanas te sientes sobrepasado por el trabajo. ¿Qué haces?', ['Lo converso con mi jefatura o con prevención para buscar apoyo', 'Me lo guardo', 'Falto sin avisar'], 'Conversarlo es el primer paso.')],
        [O('Una luz de tu puesto se quemó y quedaste en penumbra. ¿Qué haces?', ['Aviso a la jefatura para que la reparen', 'Sigo trabajando igual', 'Cambio la ampolleta yo mismo subido a una silla'], 'Se avisa; no se improvisa.'),
         O('¿Por qué es importante una buena iluminación en el trabajo?', ['Evita la fatiga visual, los errores y los accidentes', 'Solo para ahorrar energía', 'No tiene importancia'], 'Previene fatiga, errores y accidentes.'),
         O('Ves un pasillo oscuro por donde pasan vehículos o grúas. ¿Qué haces?', ['Lo informo a la jefatura', 'Paso corriendo', 'Camino mirando el celular con la linterna'], 'Las condiciones inseguras se informan.')]
      ];
      ind.quiz = B.map((v, i) => Object.assign({ s: esc[i] }, v[0], { v: [v[1], v[2]] }));
    }
  } catch (e) {}

  // ---------- 10) Vestimenta de los monitos según la empresa
  //  · PROSIP: overol naranjo, guantes de cuero (carretilla), zapatos de seguridad y casco.
  //  · Constructora Plaza: obreros de la construcción (casco, chaleco geólogo, jeans y guantes de cuero).
  try {
    const VEST = {
      'capacitaciones-prosip': o => { if (o.shirt === undefined) { o.shirt = '#EF6C00'; if (o.pants === undefined) o.pants = '#E65100'; } if (o.gloves === undefined || o.gloves === true) o.gloves = '#D9B77E'; },
      'capacitaciones-plaza': o => { const sh = String(o.shirt || '#1565C0').toUpperCase(); if (['#0039A6', '#1565C0', '#455A64', '#DC281D'].indexOf(sh) >= 0) { o.shirt = sh === '#455A64' ? '#4E5D66' : '#6D8291'; if (o.pants === undefined || o.pants === '#1F4E9E') o.pants = '#2F4A7A'; if (o.vest === undefined) o.vest = true; if (o.helmet === undefined) o.helmet = sh === '#455A64' ? '#ECEFF1' : '#FFC20E'; if (o.gloves === undefined || o.gloves === true) o.gloves = '#D9B77E'; } }
    };
    const fv = VEST[PORTAL];
    if (fv && typeof W === 'function' && !W.__vest) { const W0 = W; W = function (x, y, o) { o = Object.assign({}, o || {}); fv(o); return W0(x, y, o); }; W.__vest = true; }
  } catch (e) {}

  // ---------- 11) Sin "al tiro" / "altiro" (no es bien visto): siempre "de inmediato", en charlas, preguntas, dibujos y pantallas
  try {
    const RX = /\b([Aa])l ?tiro\b/g, fx = s => s.replace(RX, (m, a) => a === 'A' ? 'De inmediato' : 'de inmediato');
    const limpia = (o, d) => { if (!o || d > 8) return o; if (typeof o === 'string') return RX.test(o) ? (RX.lastIndex = 0, fx(o)) : o;
      if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) o[i] = limpia(o[i], d + 1); return o; }
      if (typeof o === 'object') { for (const k in o) { const v = o[k]; if (typeof v === 'string' || (v && typeof v === 'object')) o[k] = limpia(v, d + 1); } } return o; };
    const pasada = () => { try { if (typeof TOPICS !== 'undefined') limpia(TOPICS, 0); if (typeof NORMAS !== 'undefined') limpia(NORMAS, 0); } catch (e) {} };
    pasada(); setTimeout(pasada, 800); setTimeout(pasada, 2500); window.addEventListener('load', pasada);
    if (typeof S === 'object') Object.keys(S).forEach(k => { const f = S[k]; if (typeof f !== 'function' || f.__mjTiro) return; S[k] = function () { const r = f.apply(this, arguments); return typeof r === 'string' ? fx(r) : r; }; S[k].__mjTiro = true; });
    const nodo = n => { if (n.nodeType === 3) { if (/[Aa]l ?tiro/.test(n.nodeValue)) n.nodeValue = fx(n.nodeValue); } else if (n.nodeType === 1) { const w = document.createTreeWalker(n, NodeFilter.SHOW_TEXT); let t; while ((t = w.nextNode())) if (/[Aa]l ?tiro/.test(t.nodeValue)) t.nodeValue = fx(t.nodeValue); } };
    const iniciar = () => { nodo(document.body); new MutationObserver(ms => ms.forEach(m => { if (m.type === 'characterData') nodo(m.target); else m.addedNodes.forEach(nodo); })).observe(document.body, { childList: true, subtree: true, characterData: true }); };
    if (document.body) iniciar(); else document.addEventListener('DOMContentLoaded', iniciar);
  } catch (e) {}

  // ---------- 12) Pasar las láminas sin esperar el tiempo mínimo: SOLO Daniel Zunino (RUT 16.675.624-3), para revisar las charlas.
  //  · Los trabajadores esperan el tiempo mínimo en cada lámina nueva (también en charlas presenciales).
  //  · Excepción: el repaso de un tema que el trabajador YA APROBÓ (vigente) no espera.
  //  · Las láminas que ya vio en ese mismo tema no vuelven a esperar (sección 6).
  try {
    if (typeof tiempoMinimo === 'function' && !tiempoMinimo.__solo) {
      const T1 = tiempoMinimo;
      const esAdmin = () => { try { return String((typeof st !== 'undefined' && st.rut) || '').replace(/[^0-9kK]/g, '').toUpperCase() === '166756243'; } catch (e) { return false; } };
      tiempoMinimo = function (card) {
        if (esAdmin()) { try { clearInterval(_minT); } catch (e) {} const b = document.getElementById('lNext'); if (b) { b.disabled = false; b.textContent = b.textContent.replace(/ \(\d+\)$/, ''); } return; }
        if (st.repaso) { try { clearInterval(_minT); } catch (e) {} const b = document.getElementById('lNext'); if (b) b.disabled = false; return; }   // tema ya aprobado: repaso sin esperar
        const r = st.repaso, m = st.modal, pr = window.__pruebas;
        if (m === 'presencial') st.modal = 'distancia'; window.__pruebas = false;
        try { return T1.apply(this, arguments); } finally { st.repaso = r; st.modal = m; window.__pruebas = pr; }
      };
      tiempoMinimo.__solo = true;
    }
  } catch (e) {}

  // ---------- 13) Aviso al inicio de cada charla: será evaluada, exigencia 100 % (nota 7,0) y derecho a reforzar y repetir la evaluación
  try {
    if (typeof renderLearn === 'function' && !renderLearn.__mjAviso) {
      const RL2 = renderLearn;
      renderLearn = function () {
        RL2.apply(this, arguments);
        try {
          if (st.li !== 0 || st.mode === 'ds44') return;
          const cb = document.querySelector('#lCard .cb'); if (!cb || cb.querySelector('.mjEval')) return;
          const d = document.createElement('div');
          d.className = 'rd mjEval';
          d.style.cssText = 'background:#FFF8E1;border-left:6px solid #F9A825;border-radius:10px;padding:10px 12px;margin:0 0 12px;font-size:15px;line-height:1.4;color:#3E2723;text-align:left';
          d.innerHTML = '<b>📝 Esta charla será evaluada.</b> Al final responderás una evaluación y para aprobar se exige el <b>100 % de respuestas correctas</b> (nota 7,0). Si no apruebas, tienes derecho a <b>reforzar tus conocimientos</b> repasando las láminas y a <b>repetir la evaluación</b>.';
          cb.insertBefore(d, cb.firstChild);
          const o = document.getElementById('bOir'); if (o) o.click();   // la voz lee también el aviso
        } catch (e) {}
      };
      renderLearn.__mjAviso = true; renderLearn.__mj = true;
    }
  } catch (e) {}
  // ---------- 14) Aviso "Aquí no se escucha la lectura": aparece solo si de verdad no hay voz
  //  Antes bastaba que la voz tardara más de 4,5 s en partir (pasa en Chrome de escritorio con voces en línea) para mostrarlo.
  //  Ahora: si alguna lectura ya sonó, o está sonando, no aparece nunca; y si la voz parte después, el aviso se cierra solo.
  try {
    const ss = window.speechSynthesis;
    window.__vozOk = false;
    const ocultarAviso = () => { const el = document.getElementById('vozBanner'); if (el) el.style.display = 'none'; document.body.classList.remove('conaviso'); };
    const vozSono = () => { window.__vozOk = true; try { vozFallas = 0; } catch (e) {} ocultarAviso(); };
    if (ss && !ss.__mjAviso) {
      const sp = ss.speak.bind(ss);
      ss.speak = function (u) {
        try { const t0 = Date.now(); u.addEventListener('start', vozSono); u.addEventListener('boundary', vozSono); u.addEventListener('end', () => { if (Date.now() - t0 > 900) vozSono(); }); } catch (e) {}
        return sp(u);
      };
      ss.__mjAviso = true;
    }
    if (typeof avisoVoz === 'function' && !avisoVoz.__mj) {
      const A0 = avisoVoz;
      const sinVoz = () => !(window.__vozOk || (ss && (ss.speaking || ss.pending)));
      avisoVoz = function () {
        const a = arguments, self = this;
        if (!sinVoz()) { try { vozFallas = 0; } catch (e) {} return; }
        setTimeout(() => { if (sinVoz()) A0.apply(self, a); else { try { vozFallas = 0; } catch (e) {} } }, 4000);
      };
      avisoVoz.__mj = true;
    }
  } catch (e) {}
  // ---------- 15) Fuera los recuadros "Idea clave": solo un "Importante" en lo más crítico (máximo 2 por charla)
  try {
    const CRIT = /nunca|jam[aá]s|bloque|energ[ií]a|atrap|aplast|radio de giro|altura|arn[eé]s|ca[ií]da|el[eé]ctric|incendio|emergencia|evacua|alcohol|drogas|detente|det[eé]n|prohibid|bajo (la |una |un )?carga|nadie|vida|grave|muerte|sin autorizaci|no autorizad|celular|cintur[oó]n/i;
    const elegidas = t => {
      if (t.__mjCrit) return t.__mjCrit;
      const cand = (t.learn || []).map((c, i) => ({ i, k: c.k || '', p: (c.k && CRIT.test(c.k)) ? 1 : 0 })).filter(o => o.p > 0);
      cand.sort((a, b) => b.p - a.p || a.i - b.i);
      return (t.__mjCrit = new Set(cand.slice(0, 2).map(o => o.i)));
    };
    if (typeof renderLearn === 'function' && !renderLearn.__mjKey) {
      const RL3 = renderLearn;
      renderLearn = function () {
        const t = st.topic, L = (t && t.learn) || [], c = L[st.li], k = c && c.k, sel = t ? elegidas(t) : new Set(), crit = sel.has(st.li);
        if (c && k && !crit) c.k = '';
        try { RL3.apply(this, arguments); } finally { if (c) c.k = k; }
        try {
          const el = document.querySelector('#lCard .key');
          if (el && crit) {
            const tx = String(k).replace(/"/g, '');
            el.dataset.voz = 'Importante: ' + tx;
            el.innerHTML = '<span style="color:#C62828">⚠️ Importante:</span> ' + k;
            el.style.cssText += ';background:#FFF3F0;border-left-color:#D32F2F;color:#3E2723';
          }
        } catch (e) {}
      };
      renderLearn.__mjKey = true; renderLearn.__mj = true; renderLearn.__mjAviso = true;
    }
  } catch (e) {}
  // ---------- 16) Diploma: fuera "· N min en plataforma" (queda solo la duración oficial de la charla)
  try {
    const RXp = /\s*·\s*\d+\s*min en plataforma/g, limpiaP = t => typeof t === 'string' ? t.replace(RXp, '') : t;
    const C2 = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
    if (C2 && !C2.__mjPlat) {
      ['fillText', 'strokeText', 'measureText'].forEach(m => { const f = C2[m]; if (typeof f === 'function') C2[m] = function (t) { const a = Array.prototype.slice.call(arguments); a[0] = limpiaP(t); return f.apply(this, a); }; });
      C2.__mjPlat = true;
    }
    const J = () => { try { const P = window.jspdf && window.jspdf.jsPDF && window.jspdf.jsPDF.API; if (P && P.text && !P.text.__mjPlat) { const t0 = P.text; P.text = function (t) { const a = Array.prototype.slice.call(arguments); a[0] = Array.isArray(t) ? t.map(limpiaP) : limpiaP(t); return t0.apply(this, a); }; P.text.__mjPlat = true; } } catch (e) {} };
    J(); setTimeout(J, 1500); window.addEventListener('load', J);
  } catch (e) {}
  // ---------- 17) Entrega garantizada de diplomas y certificados
  //  Antes: el envío era "a ciegas" (no-cors) y mostraba "✔ Diploma registrado" apenas salía, aunque el servidor no lo recibiera
  //  (se cortó la señal, cerró la página antes de tiempo, etc.). Ahora:
  //  · El envío se guarda primero en el teléfono (cola) y se confirma consultando el registro oficial (?codigo=...).
  //  · Recién cuando el registro lo confirma se muestra "✔ Diploma registrado". Si no, se reintenta solo.
  //  · Si la persona cierra o pierde la señal, se reenvía solo la próxima vez que abra el portal (en ese teléfono).
  //  · Mientras se guarda, la página avisa que no se cierre.
  try {
    if (!window.__mjEntrega && typeof SCRIPT_URL === 'string' && /^https/.test(SCRIPT_URL)) {
      window.__mjEntrega = true;
      const F0 = window.fetch.bind(window), DB = 'mj_cola_diplomas', ST = 'cola';
      const idb = () => new Promise((res, rej) => { try { const r = indexedDB.open(DB, 1); r.onupgradeneeded = () => r.result.createObjectStore(ST, { keyPath: 'codigo' }); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); } catch (e) { rej(e); } });
      const tx = async (modo, fn) => { const d = await idb(); return new Promise((res, rej) => { const t = d.transaction(ST, modo), o = t.objectStore(ST), q = fn(o); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }); };
      const guardar = it => tx('readwrite', o => o.put(it)).catch(() => {});
      const quitar = c => tx('readwrite', o => o.delete(c)).catch(() => {});
      const todos = () => tx('readonly', o => o.getAll()).catch(() => []);
      const espera = ms => new Promise(r => setTimeout(r, ms));
      let pendientes = 0;
      window.addEventListener('beforeunload', e => { if (pendientes > 0) { e.preventDefault(); e.returnValue = 'Tu diploma todavía se está guardando. Espera unos segundos.'; return e.returnValue; } });
      const registrado = async codigo => { try { const ctl = new AbortController(); setTimeout(() => ctl.abort(), 20000); const d = await F0(SCRIPT_URL + '?codigo=' + encodeURIComponent(codigo) + '&_=' + Date.now(), { signal: ctl.signal }).then(r => r.json()); return !!(d && d.ok); } catch (e) { return null; } };
      const enviar = body => F0(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body }).then(() => true, () => false);
      const aviso = t => { const el = document.getElementById('sent') || document.getElementById('xSent'); if (el && t) el.textContent = t; };
      // entrega con confirmación: hasta 4 envíos; después de cada uno se consulta el registro varias veces
      const entregar = async (it, conAviso) => {
        pendientes++;
        try {
          for (let intento = 0; intento < 4; intento++) {
            const ya = await registrado(it.codigo); if (ya === true) { await quitar(it.codigo); return true; }
            if (conAviso) aviso(intento ? 'Reintentando guardar tu diploma… no cierres esta página.' : 'Guardando tu diploma en el sistema… no cierres esta página (puede tardar hasta 1 minuto).');
            await enviar(it.body);
            for (let k = 0; k < 6; k++) { const ok = await registrado(it.codigo); if (ok === true) { await quitar(it.codigo); return true; } await espera(5000); }
          }
          return false;
        } finally { pendientes--; }
      };
      window.fetch = function (url, opt) {
        try {
          if (opt && String(opt.method || '').toUpperCase() === 'POST' && String(url).indexOf(SCRIPT_URL) === 0 && typeof opt.body === 'string' && opt.body.length > 2000) {
            const o = JSON.parse(opt.body);
            if (o && o.codigo && (o.diploma || o.pdf)) {
              const it = { codigo: String(o.codigo), body: opt.body, t: Date.now(), nombre: o.nombre || '', tema: o.tema || o.tema_id || '' };
              return guardar(it).then(() => entregar(it, true)).then(ok => { if (!ok) { setTimeout(() => aviso('⚠ Aún no queda guardado en el sistema. NO borres nada: se reintenta solo al volver a abrir el portal en este teléfono. Avísale al relator.'), 150); throw new Error('sin confirmar'); } aviso('✔ Diploma registrado en el sistema'); return new Response(null, { status: 200 }); });
            }
          }
        } catch (e) {}
        return F0.apply(this, arguments);
      };
      // al abrir el portal: reenvía lo que haya quedado pendiente en este teléfono
      setTimeout(async () => { try { const L = await todos(); for (const it of L) { if (Date.now() - (it.t || 0) > 60 * 24 * 3600 * 1000) { await quitar(it.codigo); continue; } await entregar(it, false); } } catch (e) {} }, 4000);
    }
  } catch (e) {}
  // ---------- 18) Nombres de archivo cortos (diploma, prueba respondida y certificado DS 44)
  //  Antes: "Diploma Juan Andres Campos Garrido Inducción de Prevención de Riesgos (IRL) 30-10-2026.pdf"
  //  Ahora: "Diploma Juan Campos Induccion IRL 30-10-2026.pdf" (primer nombre + primer apellido + tema corto + fecha; sin tildes)
  try {
    const sinTilde = x => String(x || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[\\/:*?"<>|()]/g, '').replace(/\s+/g, ' ').trim();
    const cap = w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : '';
    const nomCorto = n => { const p = String(n || '').trim().split(/\s+/).filter(Boolean); const k = p.length >= 4 ? [p[0], p[2]] : p.length === 3 ? [p[0], p[1]] : p; return k.map(cap).join(' '); };
    const fecha = d => { d = d instanceof Date ? d : new Date(d || Date.now()); return [d.getDate(), d.getMonth() + 1].map(v => String(v).padStart(2, '0')).join('-') + '-' + d.getFullYear(); };
    const temaCorto = () => { if (st.mode === 'ds44') return 'Curso DS44'; const id = String((st.topic && st.topic.id) || ''); if (id === 'induccion') return 'Induccion IRL'; if (/^ds44_/.test(id)) return 'DS44 ' + cap(id.slice(5)); return id.split('_').map(cap).join(' ') || 'Charla'; };
    window.MJ_NOMBRE = tipo => sinTilde(`${tipo} ${nomCorto(st.name)} ${temaCorto()} ${fecha(st.date)}`) + '.pdf';
    const corto = nombre => { try { const n = String(nombre || ''); if (/^Diploma /.test(n)) return window.MJ_NOMBRE('Diploma'); if (/^Certificado DS ?44 /i.test(n)) return sinTilde(`Certificado DS44 ${nomCorto(st.name)} ${fecha(st.date)}`) + '.pdf'; if (/^Prueba /.test(n)) return window.MJ_NOMBRE('Prueba'); } catch (e) {} return nombre; };
    // archivo que se guarda en Drive (lo que se envía al servidor)
    if (!window.__mjNombres) {
      window.__mjNombres = true;
      const F1 = window.fetch;
      window.fetch = function (url, opt) {
        try {
          if (opt && String(opt.method || '').toUpperCase() === 'POST' && typeof SCRIPT_URL === 'string' && String(url).indexOf(SCRIPT_URL) === 0 && typeof opt.body === 'string' && opt.body.indexOf('"archivo"') >= 0) {
            const o = JSON.parse(opt.body);
            if (o.archivo) { o.archivo = corto(o.archivo); opt = Object.assign({}, opt, { body: JSON.stringify(o) }); }
          }
        } catch (e) {}
        return F1.call(this, url, opt);
      };
      // archivo que descarga el trabajador
      const clk = HTMLAnchorElement.prototype.click;
      HTMLAnchorElement.prototype.click = function () { try { if (this.download) this.download = corto(this.download); } catch (e) {} return clk.apply(this, arguments); };
      const F0 = window.File;
      if (F0) { const FC = function (bits, name, o) { return new F0(bits, corto(name), o); }; FC.prototype = F0.prototype; window.File = FC; }
    }
  } catch (e) {}
})();

// 19) Diploma, registro y certificados en VECTOR: textos y líneas nítidos a cualquier zoom y archivos mucho más livianos
//     (se graba lo que se dibuja en el lienzo y se reproduce en el PDF; si algo no se puede, queda la imagen de siempre).
(function () {
  try {
    if (window.__mjVec) return; window.__mjVec = true;
    const OPS = new WeakMap();          // lienzo -> { ops, w, h, bad }
    const URLS = new Map();             // dataURL -> lienzo
    const recCanvas = cv => {
      if (OPS.has(cv)) return;
      const R = { ops: [], bad: false }; OPS.set(cv, R);
      const g0 = cv.getContext;
      cv.getContext = function (t) {
        const c = g0.apply(this, arguments);
        if (t !== '2d' || !c) { R.bad = true; return c; }
        if (c.__mjP) return c.__mjP;
        const P = new Proxy(c, {
          get(o, k) { const v = o[k]; if (typeof v !== 'function') return v; return function () {
            const a = Array.prototype.slice.call(arguments);
            if (k === 'fillText') { const st = o.font; a[0] = typeof a[0] === 'string' ? fixT(a[0].replace(/\s*·\s*\d+\s*min en plataforma/g, '')) : a[0]; let mw = o.measureText(String(a[0])).width; const lim = o.canvas.width * 0.86; if (a[3] == null && o.textAlign === 'center' && mw > lim) a[3] = lim; if (a[3] != null && mw > a[3]) mw = +a[3]; R.ops.push(['t', a[0], a[1], a[2], mw, st, o.textAlign, o.textBaseline, o.fillStyle, o.letterSpacing || '0px']); }
            else if (k === 'drawImage') { const s = a[0], Rs = OPS.get(s); R.ops.push(['i', s, a.slice(1), Rs ? (Rs.ops.length > 300 && s.width * s.height <= 400 * 400 && Rs.ops.filter(o => o[1] === 'fillRect').length > Rs.ops.length * 0.8 ? fino(s, Rs) : null) : snap(s)]); }
            else if (['measureText', 'getContextAttributes', 'isPointInPath', 'isPointInStroke', 'setLineDash', 'getLineDash'].indexOf(k) < 0) R.ops.push(['m', k, a]);
            return v.apply(o, a); }; },
          set(o, k, v) { o[k] = v; R.ops.push(['p', k, v]); return true; }
        });
        c.__mjP = P; return P;
      };
      const td = cv.toDataURL;
      cv.toDataURL = function () { const u = td.apply(this, arguments); URLS.set(u, this); if (URLS.size > 8) URLS.delete(URLS.keys().next().value); return u; };
    };
    // imágenes externas (logo, firma, sello): copia PNG del momento en que se dibujaron
    const snap = s => { try { const w = s.naturalWidth || s.videoWidth || s.width, h = s.naturalHeight || s.videoHeight || s.height; if (!w || !h) return null; const k = Math.min(1, 900 / Math.max(w, h)); const c = Document.prototype.createElement.call(document, 'canvas'); c.width = Math.round(w * k); c.height = Math.round(h * k); c.getContext('2d').drawImage(s, 0, 0, c.width, c.height); return { u: c.toDataURL('image/png'), w, h }; } catch (e) { return null; } };
    // dibujos con miles de cuadritos (código QR): imagen nítida de alta resolución (en vector quedan líneas finas entre módulos)
    const fino = (s, Rs) => { try { const k = 6, c = Document.prototype.createElement.call(document, 'canvas'); c.width = s.width * k; c.height = s.height * k; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; x.scale(k, k);
      for (const op of Rs.ops) { if (op[0] === 'p') x[op[1]] = op[2]; else if (op[0] === 'm') x[op[1]].apply(x, op[2]); else if (op[0] === 't') x.fillText(op[1], op[2], op[3]); else if (op[0] === 'i') x.drawImage.apply(x, [op[1]].concat(op[2])); }
      return { u: c.toDataURL('image/png'), w: s.width, h: s.height, fino: true }; } catch (e) { return null; } };
    // envuelve las funciones que dibujan documentos: todo lienzo creado adentro queda grabado
    let prof = 0, prevCE = null; const ce = Document.prototype.createElement;
    const grabando = f => { if (typeof f !== 'function' || f.__mjVec) return f; const g = function () { prof++; if (prof === 1) { prevCE = Object.getOwnPropertyDescriptor(document, 'createElement') || null; const base = prevCE ? prevCE.value : ce; document.createElement = function (n) { const el = base.apply(this, arguments); if (String(n).toLowerCase() === 'canvas') { recCanvas(el); if (alto) { alto = false; alto2(el); } } return el; }; } try { return f.apply(this, arguments); } finally { prof--; if (!prof) { if (prevCE) Object.defineProperty(document, 'createElement', prevCE); else delete document.createElement; } } }; g.__mjVec = true; return g; };
    // Registro: el lienzo original solo tenía 2 hojas; la inducción ocupa 3 y la última (firmas, código QR y evaluación) se perdía.
    //   Ahora hay espacio para 4 hojas y se recorta a las que realmente se usan.
    let alto = false; const HC = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype, 'height'), HP = 2339;
    const alto2 = el => { try { Object.defineProperty(el, 'height', { configurable: true, get() { return HC.get.call(this); }, set(v) { HC.set.call(this, v === HP * 2 ? HP * 4 : v); } }); } catch (e) {} };
    if (typeof window.registroCanvas === 'function') { const RC0 = window.registroCanvas; window.registroCanvas = function () { alto = true; let out; try { out = RC0.apply(this, arguments); } finally { alto = false; }
        try { if (out && out.qr && out.height > HP * (out.qr.page + 1) + 10) { const n = out.qr.page + 1, c = document.createElement('canvas'); c.width = out.width; c.height = HP * n; const x = c.getContext('2d'); x.fillStyle = '#ffffff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(out, 0, 0); c.qr = out.qr; return c; } } catch (e) {}
        return out; }; }
    ['diplomaCanvas', 'registroCanvas', 'paginas', 'ds44Detail', 'qrCanvas'].forEach(n => { try { if (typeof window[n] === 'function') window[n] = grabando(window[n]); } catch (e) {} });

    // registro: sin el rótulo "Idea clave" (queda "Resumen") y con el criterio real de aprobación (solo 7,0)
    const fixT = t => t.replace(/Idea clave:\s*/g, 'Resumen: ').replace(/^Escala de 1,0 a 7,0 con exigencia.*$/, 'Se aprueba solo con el 100 % de respuestas correctas (nota 7,0); si no, repasa y repite la evaluación.');
    try { const C2 = CanvasRenderingContext2D.prototype; ['fillText', 'measureText'].forEach(m => { const f = C2[m]; if (typeof f === 'function' && !f.__mjIC) { const g = function (t) { if (typeof t === 'string' && (t.indexOf('Idea clave') >= 0 || t.indexOf('Escala de 1,0 a 7,0 con exigencia') === 0)) { const a = Array.prototype.slice.call(arguments); a[0] = fixT(t); return f.apply(this, a); } return f.apply(this, arguments); }; g.__mjIC = true; C2[m] = g; } }); } catch (e) {}
    // ---------- reproducción en el PDF
    const COL = { white: '#ffffff', black: '#000000', transparent: null };
    const rgb = v => { if (v == null) return null; let s = String(v).trim().toLowerCase(); if (COL.hasOwnProperty(s)) s = COL[s]; if (s == null) return null;
      let m = /^#([0-9a-f]{3})$/.exec(s); if (m) return { r: parseInt(m[1][0] + m[1][0], 16), g: parseInt(m[1][1] + m[1][1], 16), b: parseInt(m[1][2] + m[1][2], 16), a: 1 };
      m = /^#([0-9a-f]{6})([0-9a-f]{2})?$/.exec(s); if (m) return { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16), a: m[2] ? parseInt(m[2], 16) / 255 : 1 };
      m = /^rgba?\(([^)]+)\)$/.exec(s); if (m) { const p = m[1].split(/[ ,\/]+/).map(parseFloat); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; }
      throw new Error('color ' + s); };
    const fuente = css => { const m = /^\s*((?:(?:italic|oblique|bold|bolder|normal|[1-9]00)\s+)*)([\d.]+)px\s+(.+)$/i.exec(css || ''); if (!m) throw new Error('fuente ' + css);
      const mods = m[1].toLowerCase(), fam = m[3].toLowerCase(); const b = /bold|[7-9]00/.test(mods), it = /italic|oblique/.test(mods);
      const f = /courier|mono/.test(fam) ? 'courier' : (/^\s*["']?(georgia|times|serif|cambria|garamond|palatino)/.test(fam) ? 'times' : 'helvetica');
      return { f, st: b && it ? 'bolditalic' : b ? 'bold' : it ? 'italic' : 'normal', px: +m[2] }; };
    const WIN = /^[ -~ -ÿ€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]*$/;
    function play(pdf, R, M, clip) {
      // M: [a,b,c,d,e,f] lienzo -> mm (sin rotación)
      const K = 72 / 25.4; let S = { M: M.slice(), fill: '#000000', stroke: '#000000', lw: 1, alpha: 1, font: '10px sans-serif', align: 'start', base: 'alphabetic', ls: '0px', cap: 'butt', join: 'miter' }; const pila = [];
      let path = [], cur = null, alphaPdf = -1;
      const T = (x, y) => [S.M[0] * x + S.M[2] * y + S.M[4], S.M[1] * x + S.M[3] * y + S.M[5]];
      const esc = () => Math.sqrt(Math.abs(S.M[0] * S.M[3] - S.M[1] * S.M[2]));
      const setA = a => { a = Math.max(0, Math.min(1, a)); if (Math.abs(a - alphaPdf) < 1e-3) return; pdf.setGState(new pdf.GState({ opacity: a, 'stroke-opacity': a })); alphaPdf = a; };
      const pinta = (modo) => { const c = rgb(modo === 'S' ? S.stroke : S.fill); if (!c) return false; setA(S.alpha * c.a); if (modo === 'S') { pdf.setDrawColor(c.r, c.g, c.b); pdf.setLineWidth(S.lw * esc()); pdf.setLineCap(S.cap); pdf.setLineJoin(S.join); } else pdf.setFillColor(c.r, c.g, c.b); return true; };
      const emitPath = () => { let any = false; path.forEach(s => { if (s[0] === 'M') { pdf.moveTo(s[1], s[2]); any = true; } else if (s[0] === 'L') pdf.lineTo(s[1], s[2]); else if (s[0] === 'C') pdf.curveTo(s[1], s[2], s[3], s[4], s[5], s[6]); else if (s[0] === 'Z') pdf.close(); }); return any; };
      const arc = (x, y, r, a0, a1, ccw) => { let d = a1 - a0; if (!ccw && d < 0) d = (d % (2 * Math.PI)) + 2 * Math.PI; if (ccw && d > 0) d = (d % (2 * Math.PI)) - 2 * Math.PI; if (!ccw && a1 - a0 >= 2 * Math.PI) d = 2 * Math.PI; if (ccw && a0 - a1 >= 2 * Math.PI) d = -2 * Math.PI;
        const n = Math.max(1, Math.ceil(Math.abs(d) / (Math.PI / 2))), h = d / n, k = 4 / 3 * Math.tan(h / 4);
        let a = a0; const p0 = T(x + r * Math.cos(a), y + r * Math.sin(a)); if (cur) path.push(['L', p0[0], p0[1]]); else path.push(['M', p0[0], p0[1]]);
        for (let i = 0; i < n; i++) { const b = a + h, c1 = T(x + r * (Math.cos(a) - k * Math.sin(a)), y + r * (Math.sin(a) + k * Math.cos(a))), c2 = T(x + r * (Math.cos(b) + k * Math.sin(b)), y + r * (Math.sin(b) - k * Math.cos(b))), p = T(x + r * Math.cos(b), y + r * Math.sin(b)); path.push(['C', c1[0], c1[1], c2[0], c2[1], p[0], p[1]]); a = b; cur = p; } };
      const PH = pdf.internal.pageSize.getHeight(); const fuera = (y1, y2) => { const a = T(0, y1)[1], b = T(0, y2)[1]; return Math.max(a, b) < -2 || Math.min(a, b) > PH + 2; };
      const rectPath = (x, y, w, h) => { const a = T(x, y), b = T(x + w, y), c = T(x + w, y + h), d = T(x, y + h); return [['M', a[0], a[1]], ['L', b[0], b[1]], ['L', c[0], c[1]], ['L', d[0], d[1]], ['Z']]; };
      const conRect = (segs, modo) => { const p0 = path, c0 = cur; path = segs; if (emitPath()) { if (modo === 'S') pdf.stroke(); else pdf.fill(); } path = p0; cur = c0; };
      if (clip) { pdf.saveGraphicsState(); path = rectPath(0, 0, clip[0], clip[1]); emitPath(); pdf.clip(); pdf.discardPath(); path = []; alphaPdf = -1; }
      for (const op of R.ops) {
        if (op[0] === 'p') { const k = op[1], v = op[2];
          if (k === 'fillStyle') { if (typeof v !== 'string') throw new Error('fillStyle'); S.fill = v; } else if (k === 'strokeStyle') { if (typeof v !== 'string') throw new Error('strokeStyle'); S.stroke = v; }
          else if (k === 'lineWidth') S.lw = +v; else if (k === 'globalAlpha') S.alpha = +v; else if (k === 'font') S.font = v; else if (k === 'textAlign') S.align = v; else if (k === 'textBaseline') S.base = v; else if (k === 'letterSpacing') S.ls = v; else if (k === 'lineCap') S.cap = v; else if (k === 'lineJoin') S.join = v;
          else if (['imageSmoothingEnabled', 'imageSmoothingQuality', 'miterLimit', 'direction', 'fontKerning', 'textRendering', 'wordSpacing'].indexOf(k) >= 0) {}
          else if (['shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY', 'filter', 'globalCompositeOperation'].indexOf(k) >= 0) { if (!(k === 'globalCompositeOperation' && v === 'source-over') && !(k === 'shadowBlur' && !+v) && !(/shadowOffset/.test(k) && !+v) && k !== 'shadowColor' && !(k === 'filter' && v === 'none')) throw new Error('prop ' + k); }
          else throw new Error('prop ' + k);
          continue; }
        if (op[0] === 't') { const [, txt, x, y, wpx, font, align, base, fill, ls] = op; const s = String(txt); if (!s.trim()) continue; { const fp = (/(\d+(?:\.\d+)?)px/.exec(font) || [0, 40])[1]; if (fuera(y - fp * 1.2, y + fp * 0.4)) continue; }
          const F = fuente(font), c = rgb(fill); if (!c) continue; const e = esc(), sz = F.px * e * K; let al = align === 'center' ? 'c' : (align === 'right' || align === 'end') ? 'r' : 'l';
          const p = T(x, y); let yy = p[1]; if (base === 'middle') yy += F.px * e * 0.35; else if (base === 'top' || base === 'hanging') yy += F.px * e * 0.8; else if (base === 'bottom' || base === 'ideographic') yy -= F.px * e * 0.2;
          const target = wpx * e; let x0 = al === 'c' ? p[0] - target / 2 : al === 'r' ? p[0] - target : p[0];
          // tramos: texto normal en vector; símbolos y emojis (fuera de la fuente estándar) como imagen nítida pequeña
          const runs = []; s.split(/([^\u0020-\u007e\u00a0-\u00ff\u20ac\u201a\u0192\u201e\u2026\u2020\u2021\u02c6\u2030\u0160\u2039\u0152\u017d\u2018\u2019\u201c\u201d\u2022\u2013\u2014\u02dc\u2122\u0161\u203a\u0153\u017e\u0178]+)/).forEach((r, i) => { if (r) runs.push([r, i % 2 === 1]); });
          const lsx = (parseFloat(ls) || 0) * e;
          let mx = null; const mide = t => { if (runs.length === 1) return wpx; if (!mx) { mx = Document.prototype.createElement.call(document, 'canvas').getContext('2d'); mx.font = font; try { mx.letterSpacing = ls; } catch (er) {} } return mx.measureText(t).width; };
          const kk = wpx / (mide(s) || wpx); let pre = '';
          for (const [r, sym] of runs) {
            const rx = runs.length === 1 ? x0 : x0 + mide(pre) * kk * e, rw = runs.length === 1 ? wpx : mide(r) * kk; pre += r;
            if (sym) { 
              const k2 = 5, cc = Document.prototype.createElement.call(document, 'canvas'), h = Math.ceil(F.px * 1.4); cc.width = Math.ceil(rw * k2) + 4; cc.height = Math.ceil(h * k2); const x2 = cc.getContext('2d'); x2.scale(k2, k2); x2.font = font; x2.fillStyle = fill; x2.textBaseline = 'alphabetic'; x2.fillText(r, 0, F.px * 1.05);
              setA(S.alpha); pdf.addImage(cc.toDataURL('image/png'), 'PNG', rx, yy - F.px * 1.05 * e, cc.width / k2 * e, cc.height / k2 * e, undefined, 'FAST'); continue; }
            pdf.setFont(F.f, F.st); pdf.setFontSize(sz); setA(S.alpha * c.a); pdf.setTextColor(c.r, c.g, c.b);
            const wp = pdf.getTextWidth(r), n = r.length, target = rw * e, opt = { baseline: 'alphabetic' };
            let hs = 1; if (lsx) opt.charSpace = lsx; if (wp > 0 && target > 0) { hs = (target - lsx * n) / wp; if (!(hs > 0.6 && hs < 1.6) || Math.abs(hs - 1) < 0.004) hs = 1; }
            if (hs !== 1) { pdf.saveGraphicsState(); const sf = pdf.internal.scaleFactor; pdf.setCurrentTransformationMatrix(new pdf.Matrix(hs, 0, 0, 1, rx * sf * (1 - hs), 0)); pdf.text(r, rx, yy, opt); pdf.restoreGraphicsState(); alphaPdf = -1; }
            else pdf.text(r, rx, yy, opt); }
          continue; }
        if (op[0] === 'i') { const [, src, a, img] = op; let sx = 0, sy = 0, sw, sh, dx, dy, dw, dh; const Rs = OPS.get(src);
          const W0 = Rs ? src.width : (img ? img.w : (src.naturalWidth || src.width)), H0 = Rs ? src.height : (img ? img.h : (src.naturalHeight || src.height));
          if (a.length === 2) { dx = a[0]; dy = a[1]; sw = dw = W0; sh = dh = H0; } else if (a.length === 4) { dx = a[0]; dy = a[1]; dw = a[2]; dh = a[3]; sw = W0; sh = H0; } else { [sx, sy, sw, sh, dx, dy, dw, dh] = a; }
          if (!dw || !dh || !sw || !sh) continue; if (fuera(dy, dy + dh)) continue;
          if (Rs && !(img && img.fino)) { if (Rs.bad) throw new Error('sub'); const kx = dw / sw, ky = dh / sh; const Mi = [S.M[0] * kx, S.M[1] * kx, S.M[2] * ky, S.M[3] * ky, 0, 0]; const o = T(dx - sx * kx, dy - sy * ky); Mi[4] = o[0]; Mi[5] = o[1];
            // recorte al área visible del lienzo de destino
            const sub = { ops: Rs.ops }; const c0 = T(dx, dy); pdf.saveGraphicsState(); const p0 = path, cu0 = cur; path = rectPath(dx, dy, dw, dh); emitPath(); pdf.clip(); pdf.discardPath(); path = p0; cur = cu0; alphaPdf = -1;
            const Mc = [Mi[0], Mi[1], Mi[2], Mi[3], Mi[4], Mi[5]]; play(pdf, sub, Mc, null); pdf.restoreGraphicsState(); alphaPdf = -1; void c0; continue; }
          if (!img) throw new Error('img');
          setA(S.alpha); const p = T(dx, dy), e = esc();
          if (sx || sy || sw !== W0 || sh !== H0) { pdf.saveGraphicsState(); const p0 = path, cu0 = cur; path = rectPath(dx, dy, dw, dh); emitPath(); pdf.clip(); pdf.discardPath(); path = p0; cur = cu0; const kx = dw / sw, ky = dh / sh, q = T(dx - sx * kx, dy - sy * ky); pdf.addImage(img.u, 'PNG', q[0], q[1], W0 * kx * e, H0 * ky * e, undefined, 'FAST'); pdf.restoreGraphicsState(); alphaPdf = -1; }
          else pdf.addImage(img.u, 'PNG', p[0], p[1], dw * e, dh * e, undefined, 'FAST');
          continue; }
        const k = op[1], a = op[2];
        switch (k) {
          case 'save': pila.push(Object.assign({}, S, { M: S.M.slice() })); break;
          case 'restore': if (pila.length) S = pila.pop(); break;
          case 'translate': S.M[4] += S.M[0] * a[0] + S.M[2] * a[1]; S.M[5] += S.M[1] * a[0] + S.M[3] * a[1]; break;
          case 'scale': S.M[0] *= a[0]; S.M[1] *= a[0]; S.M[2] *= a[1]; S.M[3] *= a[1]; break;
          case 'setTransform': if (a.length === 6 && !a[1] && !a[2]) { S.M = [M[0] * a[0], 0, 0, M[3] * a[3], M[0] * a[4] + M[4], M[3] * a[5] + M[5]]; } else throw new Error('setTransform'); break;
          case 'resetTransform': S.M = M.slice(); break;
          case 'beginPath': path = []; cur = null; break;
          case 'moveTo': { const p = T(a[0], a[1]); path.push(['M', p[0], p[1]]); cur = p; break; }
          case 'lineTo': { const p = T(a[0], a[1]); path.push([cur ? 'L' : 'M', p[0], p[1]]); cur = p; break; }
          case 'bezierCurveTo': { const c1 = T(a[0], a[1]), c2 = T(a[2], a[3]), p = T(a[4], a[5]); if (!cur) path.push(['M', c1[0], c1[1]]); path.push(['C', c1[0], c1[1], c2[0], c2[1], p[0], p[1]]); cur = p; break; }
          case 'quadraticCurveTo': { const q = T(a[0], a[1]), p = T(a[2], a[3]); const c0 = cur || q; path.push(['C', c0[0] + 2 / 3 * (q[0] - c0[0]), c0[1] + 2 / 3 * (q[1] - c0[1]), p[0] + 2 / 3 * (q[0] - p[0]), p[1] + 2 / 3 * (q[1] - p[1]), p[0], p[1]]); cur = p; break; }
          case 'arc': arc(a[0], a[1], a[2], a[3], a[4], !!a[5]); break;
          case 'ellipse': if (a[2] === a[3] && !a[4]) arc(a[0], a[1], a[2], a[5], a[6], !!a[7]); else throw new Error('ellipse'); break;
          case 'closePath': if (path.length) path.push(['Z']); break;
          case 'rect': path.push(...rectPath(a[0], a[1], a[2], a[3])); cur = T(a[0], a[1]); break;
          case 'roundRect': { const [x, y, w, h] = a; let r = a[4]; r = Array.isArray(r) ? r[0] : (r && typeof r === 'object' ? r.x : r) || 0; r = Math.min(+r || 0, Math.abs(w) / 2, Math.abs(h) / 2); cur = null; const p = T(x + r, y); path.push(['M', p[0], p[1]]); cur = p; const L = (X, Y) => { const q = T(X, Y); path.push(['L', q[0], q[1]]); cur = q; };
            L(x + w - r, y); if (r) arc(x + w - r, y + r, r, -Math.PI / 2, 0); L(x + w, y + h - r); if (r) arc(x + w - r, y + h - r, r, 0, Math.PI / 2); L(x + r, y + h); if (r) arc(x + r, y + h - r, r, Math.PI / 2, Math.PI); L(x, y + r); if (r) arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI); path.push(['Z']); break; }
          case 'fill': if (pinta('F') && emitPath()) { if (a[0] === 'evenodd') pdf.fillEvenOdd(); else pdf.fill(); } break;
          case 'stroke': if (pinta('S') && emitPath()) pdf.stroke(); break;
          case 'fillRect': if (fuera(a[1], a[1] + a[3])) break; if (pinta('F')) conRect(rectPath(a[0], a[1], a[2], a[3]), 'F'); break;
          case 'strokeRect': if (fuera(a[1], a[1] + a[3])) break; if (pinta('S')) conRect(rectPath(a[0], a[1], a[2], a[3]), 'S'); break;
          case 'clearRect': { const f0 = S.fill, a0 = S.alpha; S.fill = '#ffffff'; S.alpha = 1; pinta('F'); conRect(rectPath(a[0], a[1], a[2], a[3]), 'F'); S.fill = f0; S.alpha = a0; break; }
          case 'clip': if (emitPath()) { pdf.clip(); pdf.discardPath(); } throw new Error('clip');
          default: throw new Error('op ' + k);
        }
      }
      if (clip) { pdf.restoreGraphicsState(); }
    }
    // revisión previa: si hay algo que no se sabe reproducir, se usa la imagen de siempre
    const prueba = (R, depth) => { if (R.bad || depth > 4) return false; for (const op of R.ops) { if (op[0] === 'i') { const s = OPS.get(op[1]); if (op[3] && op[3].fino) continue; if (s ? !prueba(s, depth + 1) : !op[3]) return false; } else if (op[0] === 'm' && ['rotate', 'transform', 'clip', 'createLinearGradient', 'createRadialGradient', 'createPattern', 'getImageData', 'putImageData', 'strokeText', 'createConicGradient'].indexOf(op[1]) >= 0) return false; else if (op[0] === 'p' && (op[1] === 'fillStyle' || op[1] === 'strokeStyle') && typeof op[2] !== 'string') return false; } return true; };
    const J = () => { const P = window.jspdf && window.jspdf.jsPDF && window.jspdf.jsPDF.API; if (!P || !P.addImage || P.addImage.__mjVec) return !!(P && P.addImage && P.addImage.__mjVec);
      const A0 = P.addImage; let dentro = 0;
      P.addImage = function (data, fmt, x, y, w, h) {
        try {
          const cv = typeof data === 'string' ? URLS.get(data) : (data && OPS.has(data) ? data : null);
          const R = cv && OPS.get(cv);
          if (!dentro && R && typeof x === 'number' && w > 0 && h > 0 && !window.__mjSinVector && prueba(R, 0)) {
            const k = w / cv.width, kv = h / cv.height;
            this.saveGraphicsState(); dentro++;
            try { play(this, R, [k, 0, 0, kv, x, y], [cv.width, cv.height]); dentro--; this.restoreGraphicsState(); return this; }
            catch (e) { dentro--; console.warn('[MJ vector] uso imagen:', e && e.message); this.restoreGraphicsState(); }
          }
        } catch (e) {}
        return A0.apply(this, arguments);
      };
      P.addImage.__mjVec = true; return true; };
    // PDF comprimido (el mismo contenido, menos peso); evita la falla de jsPDF que quitaba la compresión al guardar por segunda vez
    const Z = () => { const j = window.jspdf; if (!j || !j.jsPDF) return false; if (j.jsPDF.__mjZ) return true; const J0 = j.jsPDF;
      const J2 = function (o) { const a = Array.prototype.slice.call(arguments); if (a.length === 1 && o && typeof o === 'object') a[0] = Object.assign({ compress: true }, o); else if (!a.length) a.push({ compress: true }); const d = new (Function.prototype.bind.apply(J0, [null].concat(a)))(); try { const fl = d.internal.getFilters().slice(); d.internal.getFilters = () => fl.slice(); } catch (e) {} return d; };
      Object.getOwnPropertyNames(J0).forEach(k => { if (['length', 'name', 'arguments', 'caller', 'prototype'].indexOf(k) < 0) try { J2[k] = J0[k]; } catch (e) {} }); J2.prototype = J0.prototype; J2.__mjZ = true; j.jsPDF = J2; return true; };
    if (!Z()) { let n = 0; const t = setInterval(() => { if (Z() || ++n > 120) clearInterval(t); }, 500); }
    if (!J()) { let n = 0; const t = setInterval(() => { if (J() || ++n > 120) clearInterval(t); }, 500); }
  } catch (e) {}
})();
