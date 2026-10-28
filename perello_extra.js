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
})();
