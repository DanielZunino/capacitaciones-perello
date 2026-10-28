// ===== Mejoras comunes para todos los portales de capacitación (Integra Prevención) · 28-10-2026 =====
// Se agrega al final del script de cada portal. Configurar antes: window.MARCA = { nombre, c1, c2, fuente }.
// 1) Voz: siglas leídas a la chilena (EPP = "e pe pe", ACHS = "achs", 1404 = "catorce cero cuatro"...).
// 2) Grúa horquilla con baliza encendida, alarma de retroceso y el nombre de la empresa.
// 3) Evaluación: marcar no corrige al tiro; se puede cambiar la respuesta y se revisa al tocar el botón.
// 4) Imágenes de las preguntas más chicas: en las de elegir imagen, ambas caben en la pantalla.
// 5) Dibujos más vivos: ✓/✗ que laten y logo de la empresa en los camiones.
// Se carga desde https://danielzunino.github.io/capacitaciones-perello/mejoras_comunes.js en todos los portales.
(function () {
  const M = window.MARCA || {};
  // ---------- 1) Pronunciación chilena de siglas
  const PRON = [
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
        if (M.nombre) a += `<rect x="${x + 14}" y="${y - 37}" width="46" height="12" rx="3" fill="${M.c1 || '#263238'}"/><text x="${x + 37}" y="${y - 28}" font-size="8" font-weight="bold" text-anchor="middle" fill="#fff" font-family="${M.fuente || 'Arial'}"${o.flip ? ` transform="translate(${2 * x + 74},0) scale(-1,1)"` : ''}>${M.nombre}</text>`;
        return g0 + (o.flip ? `<g transform="translate(${2 * x + 120},0) scale(-1,1)">${a}</g>` : a);
      };
      forklift.__mejor = true;
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
        const b = document.getElementById('qNext'); b.textContent = 'Revisar mi respuesta'; b.style.display = 'block';
        try { GUIA.hide(); leerYGuiar([], 'qNext', 'REVISAR', 'Si estás seguro, toca revisar. Si te equivocaste, cambia tu respuesta.'); } catch (e) {}
        setTimeout(() => b.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
      };
      answer.__mejor = true;
      const nx = document.getElementById('qNext'), N0 = nx.onclick;
      nx.onclick = function (ev) {
        if (!st.revisada) { if (!st.sel) return; st.revisada = true; revelar(st.sel.btn, st.sel.ok); return; }
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
        if (M.nombre && svg.indexOf('>' + M.nombre + '</text>') < 0) svg = svg.replace(/<rect x="5" y="-104" width="([\d.]+)" height="58" fill="#123F8C"\/>/g, (m, w) => { const L = +w + 11, ww = Math.min(L - 30, 84); return m + `<g transform="translate(${(L / 2 - ww / 2).toFixed(1)},-99)">${logoCortina(ww)}</g><g class="mjInter"><rect x="-4" y="-50" width="5" height="5" rx="1" fill="#FFB300"/></g>`; });
        return svg;
      };
      Object.keys(S).forEach(k => { const f = S[k]; if (typeof f !== 'function') return; S[k] = function () { return mejorar(f.apply(this, arguments)); }; });
      Object.defineProperty(S, '__mj', { value: true });
    }
  } catch (e) {}
})();
