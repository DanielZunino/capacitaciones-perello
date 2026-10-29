// ===== Mejoras comunes para todos los portales de capacitación (Integra Prevención) · 28-10-2026 =====
// Se agrega al final del script de cada portal. Configurar antes: window.MARCA = { nombre, c1, c2, fuente }.
// 1) Voz: siglas leídas a la chilena (EPP = "e pe pe", ACHS = "achs", 1404 = "catorce cero cuatro"...).
// 2) Grúa horquilla con baliza encendida, alarma de retroceso y el nombre de la empresa.
// 3) Evaluación: marcar no corrige al tiro; se puede cambiar la respuesta y se revisa al tocar el botón.
// 4) Imágenes de las preguntas más chicas: en las de elegir imagen, ambas caben en la pantalla.
// 5) Dibujos más vivos: ✓/✗ que laten y logo de la empresa en los camiones.
// 6) Láminas: al volver atrás, botón para regresar de inmediato a la lámina donde iba (las ya vistas no esperan de nuevo).
// 7) Prueba: se aprueba solo con 7,0; preguntas y alternativas al azar (con versiones); no muestra la correcta; PDF con la prueba respondida a Drive.
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
        if (M.nombre && svg.indexOf('>' + M.nombre + '</text>') < 0) svg = svg.replace(/<rect x="5" y="-104" width="([\d.]+)" height="58" fill="#123F8C"\/>/g, (m, w) => { const L = +w + 11, ww = Math.min(L - 30, 84); return m + `<g transform="translate(${(L / 2 - ww / 2).toFixed(1)},-99)">${logoCortina(ww)}</g><g class="mjInter"><rect x="-4" y="-50" width="5" height="5" rx="1" fill="#FFB300"/></g>`; });
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
        const c = Object.assign({}, q, k ? vs[k] : {}); delete c.v; c.__n = i + 1; c.__ver = 'ABCDEFG'[k]; c.__nv = vs.length; c.__base = q; return c;
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
      const nombrePrueba = () => `Prueba ${st.name} ${String(st.topic.title).replace(/[:/\\]/g, '')} ${dmy(st.date || new Date())}.pdf`;
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
})();
