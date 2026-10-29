// ===== Mejoras comunes para todos los portales de capacitación (Integra Prevención) · 28-10-2026 =====
// Se agrega al final del script de cada portal. Configurar antes: window.MARCA = { nombre, c1, c2, fuente }.
// 1) Voz: siglas leídas a la chilena (EPP = "e pe pe", ACHS = "achs", 1404 = "catorce cero cuatro"...).
// 2) Grúa horquilla con baliza encendida, alarma de retroceso y el nombre de la empresa.
// 3) Evaluación: marcar no corrige al tiro; se puede cambiar la respuesta y se revisa al tocar el botón.
// 4) Imágenes de las preguntas más chicas: en las de elegir imagen, ambas caben en la pantalla.
// 5) Dibujos más vivos: ✓/✗ que laten y logo de la empresa en los camiones.
// 6) Láminas: al volver atrás, botón para regresar de inmediato a la lámina donde iba (las ya vistas no esperan de nuevo).
// 7) Prueba: se aprueba solo con 7,0; preguntas y alternativas al azar (con versiones); no muestra la correcta; PDF con la prueba respondida a Drive.
// 8) Inducción: 1 pregunta por cada uno de los 18 ítems de la inducción escrita, con 3 versiones (Constructor, OYM, Plaza y PROSIP).
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

  // ---------- 8) Inducción con 1 pregunta por cada uno de los 18 ítems de la inducción escrita (3 versiones cada una)
  //  Mismos 18 ítems en todas las empresas (Constructor, OYM, Plaza, PROSIP). Perelló tiene su propia versión (perello_extra.js).
  try {
    const CFG = { '/capacitaciones-constructor/': { m: 'la Mutual de Seguridad', n: '1407', l: 'la sucursal' }, '/capacitaciones-oym/': { m: 'la Mutual de Seguridad', n: '1407', l: 'la sucursal' },
      '/capacitaciones-plaza/': { m: 'la ACHS', n: '1404', l: 'la obra' }, '/capacitaciones-prosip/': { m: 'la ACHS', n: '1404', l: 'la planta' } };
    const C = CFG[location.pathname.replace(/index\.html$/, '')];
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
      const esc = IT.map(([re, sb, card]) => {
        const c = L.find(l => re.test(l.t));
        if (c) return c.s;
        const s = has(sb) ? sb : (L[0] && L[0].s);
        L.splice(Math.max(1, L.length - 2), 0, { s, t: card[0], x: card[1], k: card[2] });
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
})();
