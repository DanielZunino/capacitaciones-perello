// ===== Perelló · ajustes en línea (se carga después de mejoras_comunes.js) · 28-10-2026 =====
// Áreas por planta, vestimenta de mantención (cotona verde, gorro Perelló con cofia, guantes amarillos, sin casco)
// y gorro Perelló (banda verde) para todos. Todo es idempotente: si se carga dos veces no cambia nada.
(function () {
  if (window.__peExtra) return; window.__peExtra = true;
  // 1) Áreas: cámaras de frío en ambas plantas; sin casino
  try {
    if (typeof PE_AREAS === 'object') {
      PE_AREAS.alemania = PE_AREAS.alemania.filter(a => a[0] !== 'Casino');
      if (!PE_AREAS.industrias.some(a => a[0] === 'Cámaras de frío')) PE_AREAS.industrias.splice(PE_AREAS.industrias.length - 1, 0, ['Cámaras de frío', '❄️']);
    }
  } catch (e) {}
  // 2) Textos
  try {
    const walk = o => { if (Array.isArray(o)) return o.map(walk); if (o && typeof o === 'object') { Object.keys(o).forEach(k => o[k] = walk(o[k])); return o; }
      return typeof o === 'string' ? o.replace(/aceites de cocina \(casino\)/g, 'aceites de cocina').replace(/K: aceites de cocina \(casino\)/g, 'K: aceites de cocina') : o; };
    TOPICS.forEach(walk);
    const herr = TOPICS.find(t => t.id === 'herramientas');
    if (herr && !herr.learn.some(l => l.t === 'Tu vestimenta en mantención')) herr.learn.splice(herr.learn.length - 1, 0, { s: 'herr_epp', t: 'Tu vestimenta en mantención',
      x: 'En Perelló, mantención usa <b>cotona verde, gorro Perelló con cofia y guantes amarillos</b>. Sin casco, salvo que la tarea lo exija. Agrega lentes de seguridad y protector auditivo según la herramienta.', k: 'Cotona, gorro con cofia y guantes.' });
  } catch (e) {}
  // 3) Dibujos: gorro Perelló (banda verde) y vestimenta de mantención
  try {
    if (typeof W === 'function' && !W.__pe) {
      const W1 = W;
      W = function (x, y, o) {
        o = Object.assign({}, o || {});
        if (window.__peMant) { o.shirt = '#2E7D32'; o.helmet = false; o.cofia = true; o.apron = false; if (o.gloves !== false) o.gloves = '#FDD835'; }
        let g = W1(x, y, o);
        return g.replace(/(<path d="M[\d.\-]+,[\d.\-]+ H[\d.\-]+" stroke=")#90A4AE(" stroke-width=")([\d.]+)"/, (m, a, b, w) => a + '#0F543A' + b + (w * 1.4).toFixed(2) + '"');
      };
      W.__pe = true;
      const ids = ['herramientas', 'altura'], keys = new Set();
      TOPICS.filter(t => ids.includes(t.id)).forEach(t => { keys.add(t.thumb); t.learn.forEach(l => keys.add(l.s)); t.quiz.forEach(q => { if (q.s) keys.add(q.s); (q.pick || []).forEach(k => keys.add(k)); }); });
      keys.forEach(k => { const f = S[k]; if (typeof f !== 'function') return; S[k] = function () { window.__peMant = true; try { return f.apply(this, arguments); } finally { window.__peMant = false; } }; });
    }
  } catch (e) {}

  // 4) Deshidratado de mosqueta: cotona, gorro Perelló con cofia y guantes de cabritilla (hornos y carros) o multiflex (selección y embandejado)
  try {
    if (!window.__peMosqOk) {
      window.__peMosqOk = true;
      const COTONA = '#1565C0', CAB = '#C8A27A', MULTI = '#546E7A';
      const W2b = W;
      W = function (x, y, o) { o = Object.assign({}, o || {}); const m = window.__peMosq; if (m) { o.shirt = COTONA; o.apron = false; o.helmet = false; o.cofia = true; o.mask = m.mask ? true : false; if (o.gloves !== false) o.gloves = m.g === 'cab' ? CAB : MULTI; } return W2b(x, y, o); };
      W.__pe = true;
      const M = { pe_horno: { g: 'cab' }, pe_carro: { g: 'cab' }, pe_seleccion: { g: 'multi' }, pe_embandejado: { g: 'multi' }, pe_embandejado_patio: { g: 'multi' }, pe_descarga: { g: 'multi' }, pe_pelusa: { g: 'multi', mask: true }, enfermedades_polvo: { g: 'multi', mask: true } };
      Object.keys(M).forEach(k => { const f = S[k]; if (typeof f !== 'function') return; S[k] = function () { window.__peMosq = M[k]; try { return f.apply(this, arguments); } finally { window.__peMosq = null; } }; });
      const T = (x, y, t, z, c) => `<text x="${x}" y="${y}" font-size="${z || 11}" font-weight="bold" text-anchor="middle" fill="${c || '#263238'}" font-family="Arial">${t}</text>`;
      S.pe_mosq_vest = function () { window.__peMosq = { g: 'cab' }; let a; try { a = W(85, 170, { s: 1.3 }); } finally { window.__peMosq = null; } window.__peMosq = { g: 'multi' }; let b; try { b = W(235, 170, { s: 1.3, flip: true }); } finally { window.__peMosq = null; }
        return `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="#ECEFF1"/><rect y="165" width="320" height="35" fill="#B0BEC5"/>` + a + b + T(85, 28, 'Hornos y carros', 12, '#6D4C41') + T(85, 44, 'guantes de cabritilla', 11, '#6D4C41') + T(235, 28, 'Selección y embandejado', 12, '#37474F') + T(235, 44, 'guantes multiflex', 11, '#37474F') + T(160, 192, 'Cotona y gorro Perelló con cofia', 12, '#0F543A') + '</svg>'; };
    }
    const fx = (t, a, b) => { if (t && typeof t.x === 'string') t.x = t.x.replace(a, b); };
    const ind = TOPICS.find(t => t.id === 'induccion');
    if (ind) ind.learn.forEach(l => fx(l, 'guantes para calor, empujar los carros', 'cotona y guantes de cabritilla o multiflex según la labor, empujar los carros'));
    const epp = TOPICS.find(t => t.id === 'epp');
    if (epp) epp.learn.forEach(l => { if (/Cada área, su EPP/.test(l.t) && !/Deshidratado de mosqueta/.test(l.x)) { l.x = l.x.replace('<li><b>Aseo y sanitización:</b>', '<li><b>Deshidratado de mosqueta:</b> cotona, gorro con cofia y guantes de cabritilla (hornos y carros) o multiflex (selección y embandejado).</li><li><b>Aseo y sanitización:</b>').replace('Caldera, autoclaves y hornos:', 'Caldera y autoclaves:'); } });
    const mq = TOPICS.find(t => t.id === 'mosqueta');
    if (mq) { mq.learn.forEach(l => fx(l, 'usa guantes para calor', 'usa guantes de cabritilla'));
      if (!mq.learn.some(l => l.s === 'pe_mosq_vest')) mq.learn.splice(1, 0, { s: 'pe_mosq_vest', t: 'Tu vestimenta en deshidratado', x: 'Cotona y gorro Perelló con cofia. Los guantes según la labor:<ul><li><b>Cabritilla</b>: hornos y carros calientes.</li><li><b>Multiflex</b>: selección y embandejado.</li></ul>Mascarilla y lentes cuando haya pelusa.', k: 'Cada labor, su guante.' });
      if (!mq.quiz.some(q => /cabritilla/.test(q.q + (q.o || []).join()))) mq.quiz.push({ q: 'Vas a sacar un carro del horno de secado. ¿Qué guantes usas?', s: 'pe_mosq_vest', o: ['Guantes de cabritilla', 'Guantes multiflex', 'Sin guantes'], a: 0, w: 'Para hornos y carros calientes: cabritilla.' }); }
  } catch (e) {}
})();
