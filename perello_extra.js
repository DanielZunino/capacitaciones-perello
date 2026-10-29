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
      const COTONA = '#2E7D32', CAB = '#C8A27A', MULTI = '#546E7A';
      const W2b = W;
      W = function (x, y, o) { o = Object.assign({}, o || {}); const m = window.__peMosq; if (m) { o.shirt = COTONA; o.apron = false; o.helmet = false; o.cofia = true; o.mask = m.mask ? true : false; if (o.gloves !== false) o.gloves = m.g === 'cab' ? CAB : MULTI; } return W2b(x, y, o); };
      W.__pe = true;
      const M = { pe_horno: { g: 'cab' }, pe_carro: { g: 'cab' }, pe_seleccion: { g: 'multi' }, pe_embandejado: { g: 'multi' }, pe_embandejado_patio: { g: 'multi' }, pe_descarga: { g: 'multi' }, pe_pelusa: { g: 'multi', mask: true }, enfermedades_polvo: { g: 'multi', mask: true } };
      Object.keys(M).forEach(k => { const f = S[k]; if (typeof f !== 'function') return; S[k] = function () { window.__peMosq = M[k]; try { return f.apply(this, arguments); } finally { window.__peMosq = null; } }; });
      const T = (x, y, t, z, c) => `<text x="${x}" y="${y}" font-size="${z || 11}" font-weight="bold" text-anchor="middle" fill="${c || '#263238'}" font-family="Arial">${t}</text>`;
      S.pe_mosq_vest = function () { window.__peMosq = { g: 'cab' }; let a; try { a = W(85, 170, { s: 1.3 }); } finally { window.__peMosq = null; } window.__peMosq = { g: 'multi' }; let b; try { b = W(235, 170, { s: 1.3, flip: true }); } finally { window.__peMosq = null; }
        return `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="#ECEFF1"/><rect y="165" width="320" height="35" fill="#B0BEC5"/>` + a + b + T(85, 28, 'Hornos y carros', 12, '#6D4C41') + T(85, 44, 'guantes de cabritilla', 11, '#6D4C41') + T(235, 28, 'Selección y embandejado', 12, '#37474F') + T(235, 44, 'guantes multiflex', 11, '#37474F') + T(160, 192, 'Cotona verde y gorro Perelló con cofia', 12, '#0F543A') + '</svg>'; };
    }
    const fx = (t, a, b) => { if (t && typeof t.x === 'string') t.x = t.x.replace(a, b); };
    const ind = TOPICS.find(t => t.id === 'induccion');
    if (ind) ind.learn.forEach(l => fx(l, 'guantes para calor, empujar los carros', 'cotona y guantes de cabritilla o multiflex según la labor, empujar los carros'));
    const epp = TOPICS.find(t => t.id === 'epp');
    if (epp) epp.learn.forEach(l => { if (/Cada área, su EPP/.test(l.t) && !/Deshidratado de mosqueta/.test(l.x)) { l.x = l.x.replace('<li><b>Aseo y sanitización:</b>', '<li><b>Deshidratado de mosqueta:</b> cotona, gorro con cofia y guantes de cabritilla (hornos y carros) o multiflex (selección y embandejado).</li><li><b>Aseo y sanitización:</b>').replace('Caldera, autoclaves y hornos:', 'Caldera y autoclaves:'); } });
    const mq = TOPICS.find(t => t.id === 'mosqueta');
    if (mq) { mq.learn.forEach(l => fx(l, 'usa guantes para calor', 'usa guantes de cabritilla'));
      if (!mq.learn.some(l => l.s === 'pe_mosq_vest')) mq.learn.splice(1, 0, { s: 'pe_mosq_vest', t: 'Tu vestimenta en deshidratado', x: 'Cotona verde y gorro Perelló con cofia. Los guantes según la labor:<ul><li><b>Cabritilla</b>: hornos y carros calientes.</li><li><b>Multiflex</b>: selección y embandejado.</li></ul>Mascarilla y lentes cuando haya pelusa.', k: 'Cada labor, su guante.' });
      if (!mq.quiz.some(q => /cabritilla/.test(q.q + (q.o || []).join()))) mq.quiz.push({ q: 'Vas a sacar un carro del horno de secado. ¿Qué guantes usas?', s: 'pe_mosq_vest', o: ['Guantes de cabritilla', 'Guantes multiflex', 'Sin guantes'], a: 0, w: 'Para hornos y carros calientes: cabritilla.' }); }
  } catch (e) {}

  // 5) Tipo de trabajador igual que en la ficha: "Personal de Planta" (incluye oficina) o "Personal de Temporada"
  try {
    if (typeof PE_TIPOS === 'object' && !PE_TIPOS.some(t => t.k === 'Personal de Planta')) PE_TIPOS.splice(0, PE_TIPOS.length,
      { k: 'Personal de Planta', t: 'Personal de Planta', d: 'Contrato todo el año (incluye oficina)', ic: '🏭' },
      { k: 'Personal de Temporada', t: 'Personal de Temporada', d: 'Contrato solo por la temporada', ic: '🍂' });
  } catch (e) {}

  // 6) Solo Perelló: no mencionar que los EPP son "sin costo" (sin afirmar lo contrario) y preguntas nuevas de EPP y piso mojado
  try {
    const fix = s => s
      .replace(/Los entrega la empresa sin costo y con registro\./g, 'La empresa los entrega con registro.')
      .replace(/EPP sin costo a cargo del empleador/g, 'entrega de EPP')
      .replace(/EPP sin costo \(Ley 16\.744\)/g, 'EPP obligatorio (Ley 16.744)')
      .replace(/,? ?<b>sin costo<\/b>/g, '')
      .replace(/, sin costo,/g, ',')
      .replace(/, libres de costo,/g, '')
      .replace(/,? sin costo para (el trabajador|ti)/g, '')
      .replace(/(?<!atiendes,) sin costo/g, '');
    const walk = o => { if (typeof o === 'string') return fix(o); if (Array.isArray(o)) { o.forEach((v, i) => o[i] = walk(v)); return o; } if (o && typeof o === 'object') { Object.keys(o).forEach(k => o[k] = walk(o[k])); return o; } return o; };
    TOPICS.forEach(walk);
    try { if (typeof NORMAS === 'object') walk(NORMAS); } catch (e) {}
    try { if (typeof NORMA_GENERAL === 'object') walk(NORMA_GENERAL); } catch (e) {}
    ['camion_carga_epp', 'c5ep_cuida'].forEach(k => { const f = S[k]; if (typeof f === 'function' && !f.__pe6) { S[k] = function () { return fix(f.apply(this, arguments)); }; S[k].__pe6 = true; } });
    const tp = id => TOPICS.find(t => t.id === id);
    const rq = (id, re, nq) => { const t = tp(id); if (!t) return; const i = t.quiz.findIndex(q => re.test(q.q)); if (i >= 0) t.quiz[i] = Object.assign({ s: t.quiz[i].s }, nq); };
    rq('induccion', /Quién paga/i, { q: 'Notas que tu guante está roto o tu mascarilla dañada. ¿Qué haces?', s: 'pe_epp_todo', o: ['Aviso a mi jefatura y pido el cambio antes de seguir trabajando', 'Sigo trabajando y lo cambio al final del turno', 'Me lo saco y trabajo sin él'], a: 0, w: 'Un EPP dañado no protege: avisa y pide el cambio antes de seguir.' });
    rq('epp', /Quién debe pagar/i, { q: '¿Cuándo debes usar tu EPP?', o: ['Todo el tiempo que estés expuesto al riesgo', 'Solo cuando está la jefatura', 'Solo si la tarea es larga'], a: 0, w: 'El EPP se usa todo el tiempo que estés expuesto al riesgo.' });
    rq('camion_carga', /lo paga el trabajador/i, { q: 'Si son pocas cajas, puedo descargar sin guantes ni zapatos de seguridad.', vf: false, w: 'Falso. El EPP se usa siempre que estés expuesto al riesgo, aunque la tarea sea corta.' });
    rq('induccion', /charco/i, { q: 'En la línea el piso suele estar mojado. ¿Cómo debes desplazarte?', o: ['Caminando, sin correr, con botas antideslizantes y por los pasillos', 'Rápido, para no perder tiempo', 'Con zapatillas, que son más cómodas'], a: 0, w: 'En piso mojado: camina sin correr, con botas antideslizantes y por los pasillos.' });
    rq('pisos', /charco/i, { q: 'Vas atrasado a tu puesto y el pasillo está mojado. ¿Qué haces?', o: ['Camino sin correr, mirando dónde piso', 'Corro para llegar a la hora', 'Paso por encima de la cinta para acortar camino'], a: 0, w: 'Llegar un minuto tarde es mejor que una caída: en piso mojado, nunca corras.' });
    const fp = S.pe_piso; if (typeof fp === 'function' && !fp.__pe6) { S.pe_piso = function () { return fp.apply(this, arguments).replace('Agua fuera del lavado: seca y avisa', 'Piso mojado: camina, no corras'); }; S.pe_piso.__pe6 = true; }
  } catch (e) {}

  // 7) Inducción: cubre los 18 ítems de la inducción escrita (Induccion 2026 Conservas Los Angeles) y la prueba trae 1 pregunta por ítem, con 3 versiones cada una
  try {
    const ind = TOPICS.find(t => t.id === 'induccion');
    if (ind && !ind.__pe18) {
      ind.__pe18 = true;
      const Z = inner => sv(bg() + inner), T = (x, y, s, z, c) => txt(x, y, s, z || 12, c || '#263238');
      const W2 = (x, y, o) => W(x, y, Object.assign({ helmet: false, cofia: true, apron: '#FFFFFF', boots: '#FAFAFA', gloves: '#FDD835', mask: true, shirt: '#ECEFF1', pants: '#CFD8DC' }, o || {}));
      const css = '<style>.peGota{animation:peGota 1.2s linear infinite}@keyframes peGota{from{transform:translateY(0);opacity:1}to{transform:translateY(22px);opacity:0}}.peRaton{animation:peRaton 4s ease-in-out infinite}@keyframes peRaton{0%,100%{transform:translateX(0)}50%{transform:translateX(-26px)}}.peParp{animation:peParp 1.4s steps(2) infinite}@keyframes peParp{50%{opacity:.2}}</style>';
      // Filtro sanitario: pediluvio y lavamanos
      S.pe_filtro = () => Z(css + `<rect x="30" y="160" width="110" height="14" rx="4" fill="#4FC3F7" stroke="#0277BD" stroke-width="2"/>${T(85, 192, 'Pediluvio', 11, '#01579B')}`
        + `<rect x="200" y="96" width="80" height="16" rx="6" fill="#ECEFF1" stroke="#90A4AE" stroke-width="2"/><rect x="232" y="112" width="16" height="50" fill="#B0BEC5"/><path d="M236,96 v-18 h18 v6" stroke="#78909C" stroke-width="5" fill="none"/>`
        + [0, 1, 2].map(i => `<circle class="peGota" style="animation-delay:-${i * .4}s" cx="254" cy="88" r="2.5" fill="#29B6F6"/>`).join('')
        + W2(85, 160, { gloves: false }) + T(240, 192, 'Lavado de manos', 11, '#01579B') + T(160, 30, 'Filtro sanitario: siempre al entrar', 13, '#0F543A'));
      // Hantavirus: humedecer con cloro, nunca barrer en seco
      S.pe_hanta = () => Z(css + `<rect x="200" y="60" width="100" height="100" fill="#A1887F" stroke="#5D4037" stroke-width="2"/>${[0, 1, 2].map(i => `<rect x="200" y="${60 + i * 33}" width="100" height="4" fill="#5D4037"/><rect x="${210 + i * 25}" y="${66 + i * 33}" width="22" height="26" fill="#D7CCC8" stroke="#8D6E63"/>`).join('')}`
        + `<g class="peRaton"><ellipse cx="270" cy="166" rx="12" ry="6" fill="#757575"/><circle cx="259" cy="163" r="4" fill="#757575"/><path d="M282,166 q14,2 18,-6" stroke="#757575" stroke-width="2" fill="none"/></g>`
        + W2(110, 165, { pose: 'carry' }) + `<path d="M138,128 l30,10" stroke="#0277BD" stroke-width="3"/>` + [0, 1, 2, 3].map(i => `<circle class="peGota" style="animation-delay:-${i * .3}s" cx="${170 + i * 6}" cy="${140 + i * 2}" r="2.5" fill="#29B6F6"/>`).join('')
        + T(160, 30, 'Humedece con agua y cloro: nunca barras en seco', 12, '#B71C1C'));
      // Iluminación: luz quemada, se avisa
      S.pe_luz = () => Z(css + `<rect x="60" y="22" width="60" height="10" rx="4" fill="#455A64"/><rect x="66" y="32" width="48" height="6" fill="#263238"/>`
        + `<rect x="200" y="22" width="60" height="10" rx="4" fill="#455A64"/><rect x="206" y="32" width="48" height="6" fill="#FFF59D"/><path d="M206,38 L180,160 H280 L254,38z" fill="#FFF59D" opacity=".35"/>`
        + `<path d="M66,38 L40,160 H140 L114,38z" fill="#263238" opacity=".18"/><g class="peParp">${T(90, 60, '!', 22, '#D32F2F')}</g>`
        + W2(110, 165, { pose: 'point' }) + W(230, 165, { shirt: '#2E7D32', pants: '#37474F', cofia: true, helmet: false, flip: true })
        + T(160, 192, '¿Luz quemada o sector oscuro? Avisa', 12, '#0F543A'));
      const add = (antesDe, card) => { if (ind.learn.some(l => l.t === card.t)) return; let i = ind.learn.findIndex(l => l.s === antesDe); if (i < 0) i = ind.learn.length - 3; ind.learn.splice(i, 0, card); };
      const desp = (s, card) => { if (ind.learn.some(l => l.t === card.t)) return; let i = ind.learn.findIndex(l => l.s === s); ind.learn.splice(i < 0 ? ind.learn.length - 3 : i + 1, 0, card); };
      const ev = ind.learn.find(l => l.s === 'pe_evitable'); if (ev && !/[Pp]olítica/.test(ev.t)) ev.t = 'Nuestra política: los accidentes se pueden evitar';
      add('pe_piso', { s: 'pe_filtro', t: 'Filtro sanitario', x: 'Antes de entrar a la planta pasa <b>siempre</b> por el <b>filtro sanitario</b>: <b>pediluvio</b> (las botas por la batea) y <b>lavado de manos</b>. Después ponte tus EPP de higiene y seguridad. Saltarse el filtro es una <b>falta grave</b>.', k: 'Filtro sanitario siempre, sin excepciones.' });
      desp('senaletica_piso', { s: 'pe_luz', t: 'Iluminación', x: 'Una buena luz evita <b>fatiga visual, errores y accidentes</b>. La empresa estudió la iluminación de los puestos y aplica mejoras. Si una luz se quema o un sector queda oscuro, <b>avisa a tu jefatura</b>. No cambies focos ni te subas a sillas por tu cuenta.', k: 'Luz quemada: se avisa, no se improvisa.' });
      desp('cargas_limites', { s: 'pe_hanta', t: 'Hantavirus', x: 'Lo transmite el <b>ratón colilargo</b> por su orina, fecas y saliva. Te contagias al <b>respirar el polvo</b> contaminado de bodegas, galpones y pastizales.<ul><li><b>Nunca barras en seco</b>: humedece con agua y cloro.</li><li>Mascarilla y guantes al limpiar.</li><li>Sin basura ni pasto acumulado.</li><li>Si te da <b>fiebre y dolor muscular</b> después de limpiar, avisa de inmediato.</li></ul>', k: 'Humedecer con cloro, nunca barrer en seco.' });
      desp('pe_mezcla', { s: 'pe_calor', t: 'Calor: hidrátate', x: 'Cerca de hornos, caldera o en días de calor puedes deshidratarte o sufrir un <b>golpe de calor</b>: mareo, dolor de cabeza, calambres y mucho cansancio.<ul><li>Toma <b>agua seguido</b>, aunque no tengas sed.</li><li>Haz las pausas en lugares frescos.</li><li>Si un compañero se marea: llévalo a un lugar fresco, dale agua y avisa.</li></ul>', k: 'Agua seguido y pausas en lugar fresco.' });
      desp('pe_calor', { s: 'ruido_prexor', t: 'Ruido (PREXOR)', x: 'El ruido fuerte de cerradoras, compresores y máquinas daña el oído <b>para siempre</b>. El protocolo <b>PREXOR</b> del MINSAL controla la exposición. En las zonas señalizadas el <b>protector auditivo es obligatorio todo el tiempo</b>.', k: 'Zona de ruido: protector puesto siempre.' });
      desp('ruido_prexor', { s: 'uv_bloq', t: 'Sol: radiación UV', x: 'Al aire libre (patios, embandejado, descarga) el sol quema y puede causar <b>cáncer de piel</b>. Lo más peligroso es entre las <b>11:00 y las 16:00</b>, también con nubes.<ul><li>Bloqueador FPS 30 o más (ideal 50+), cada 2 a 3 horas.</li><li>Gorro legionario, lentes con filtro UV y manga larga.</li><li>Busca la sombra y toma agua.</li></ul>', k: 'Bloqueador, gorro, lentes y sombra.' });
      desp('karin_intro', { s: 'psico_ceal', t: 'Riesgos psicosociales', x: 'La carga de trabajo, la organización, el liderazgo y el ambiente también afectan la salud. La empresa aplica el cuestionario <b>CEAL-SM</b> para detectar estos riesgos y mejorar. Si te sientes sobrepasado, conversa con tu jefatura o con prevención.', k: 'Si te sientes sobrepasado, conversa.' });
      // Prueba: 1 pregunta por ítem de la inducción escrita (en el orden del documento), cada una con 3 versiones
      const q3 = (s, a, b, c) => Object.assign({ s }, a, { v: [b, c] });
      const O = (q, o, w) => ({ q, o, a: 0, w }), V = (q, vf, w) => ({ q, vf, w });
      ind.quiz = [
        q3('pe_filtro', O('Al entrar a la planta, ¿qué debes hacer siempre?', ['Pasar por el filtro sanitario: pediluvio y lavado de manos', 'Entrar directo a mi puesto para no atrasarme', 'Lavarme las manos solo si están sucias'], 'El filtro sanitario es obligatorio cada vez que entras.'),
          Object.assign({ s: 'pe_piso' }, O('¿Cómo debe estar siempre tu área de trabajo?', ['Ordenada y limpia, con pasillos y salidas despejados', 'Ordenada solo cuando viene la jefatura', 'Con las cajas en el pasillo para tenerlas a mano'], 'Orden y limpieza siempre, sin excepciones.')),
          O('Saltarse el filtro sanitario al ingresar a la planta es…', ['Una falta grave a la normativa interna', 'Algo opcional si voy apurado', 'Permitido si uso guantes'], 'Es obligatorio y no admite excepciones.')),
        q3('accidente_ley', O('¿Qué cubre el seguro de la Ley 16.744?', ['Accidentes del trabajo, de trayecto y enfermedades profesionales', 'Solo accidentes graves dentro de la planta', 'Solo al personal de planta, no a los temporeros'], 'Cubre a todos los trabajadores.'),
          V('Los temporeros también están cubiertos por el seguro de la Ley 16.744.', true, 'Verdadero: cubre a todos los trabajadores.'),
          O('El seguro de la Ley 16.744 incluye…', ['Atención médica, rehabilitación y prestaciones económicas', 'Solo la primera consulta', 'Nada si el accidente fue leve'], 'Incluye atención, rehabilitación y prestaciones.')),
        q3('ind_avisa', O('Te cortas un dedo con el borde de una lata y parece leve. ¿Qué haces?', ['Aviso de inmediato a mi jefatura', 'Sigo trabajando y aviso al final del día', 'No digo nada si no sangra mucho'], 'Todo accidente se avisa de inmediato.'),
          O('¿Dónde te atiendes si tienes un accidente del trabajo o de trayecto?', ['En la ACHS, la mutualidad de la empresa', 'En cualquier consultorio, pagando la consulta', 'En la farmacia más cercana'], 'Perelló está adherida a la ACHS.'),
          O('¿Cuál es el número de emergencias de la ACHS?', ['1404', '131', '133'], 'ACHS: 1404, las 24 horas.')),
        q3('ind_grave', O('Ante un accidente grave o fatal, ¿qué se hace en el lugar?', ['Se paraliza la faena y se delimita el área con conos o cinta', 'Se sigue trabajando para no atrasar la producción', 'Se limpia todo antes de que llegue alguien'], 'Se paraliza y se delimita el área.'),
          O('¿Cuál de estos es un accidente grave?', ['Una caída de más de 1,8 metros de altura', 'Un rasguño en la mano', 'Un golpe leve en el codo'], 'Caídas de más de 1,8 m son accidente grave.'),
          O('Un compañero queda inconsciente tras un golpe fuerte. ¿Qué haces primero?', ['Llamo al 1404 y aviso a la jefatura, sin moverlo salvo que siga en peligro', 'Lo levanto y lo llevo caminando a la portería', 'Le doy agua y sigo trabajando'], 'Pide ayuda y no lo muevas salvo peligro.')),
        q3('pe_evitable', V('Los accidentes del trabajo se pueden evitar.', true, 'Verdadero: casi siempre hay una causa que se pudo controlar.'),
          O('Según la política de prevención, ¿quién es responsable de trabajar seguro?', ['Todos: la empresa y cada trabajador cumpliendo las normas', 'Solo el prevencionista', 'Solo la jefatura'], 'La seguridad es tarea de todos.'),
          O('¿Cuál es la causa más común de un accidente?', ['Una acción insegura que se pudo evitar, como apurarse o no usar el EPP', 'La mala suerte', 'El clima'], 'La mayoría se debe a acciones que se pueden evitar.')),
        q3('pe_epp_todo', O('Notas que tu guante está roto o tu mascarilla dañada. ¿Qué haces?', ['Aviso a mi jefatura y pido el cambio antes de seguir trabajando', 'Sigo trabajando y lo cambio al final del turno', 'Me lo saco y trabajo sin él'], 'Un EPP dañado no protege.'),
          O('¿Cuándo debes usar tu EPP?', ['Todo el tiempo que estés expuesto al riesgo', 'Solo cuando está la jefatura', 'Solo si la tarea es larga'], 'Todo el tiempo de exposición.'),
          O('En la conservera, ¿cuál es el EPP correcto?', ['Gorro con cofia, mascarilla, pechera blanca, guantes de nitrilo y botas blancas', 'Solo guantes', 'Casco y chaleco reflectante'], 'Ese es el EPP de la conservera.')),
        q3('incendios_ext', O('Al usar el extintor, ¿hacia dónde apuntas?', ['A la base del fuego', 'A las llamas más altas', 'Al humo'], 'Siempre a la base del fuego.'),
          O('¿Cuál es el orden correcto para usar el extintor?', ['Retirar el seguro, apuntar a la base y descargar en barrido', 'Apuntar a las llamas, descargar y después retirar el seguro', 'Agitarlo y lanzar el polvo hacia arriba'], 'Seguro, base y barrido.'),
          O('Intentaste apagar un amago y no se apaga en segundos. ¿Qué haces?', ['Evacúo y aviso: se llama al 132 (Bomberos)', 'Sigo intentando hasta que se apague', 'Le echo agua al tablero eléctrico'], 'Si no se apaga en segundos, se evacúa.')),
        q3('senaletica_piso', O('¿Por dónde debes caminar dentro de la planta?', ['Por las zonas peatonales demarcadas', 'Por donde sea más corto', 'Por la ruta de la grúa horquilla'], 'Siempre por las zonas peatonales.'),
          O('¿Dónde se puede fumar?', ['Solo en la zona habilitada para fumar', 'En el patio, si no hay nadie', 'Dentro de la bodega, con la puerta abierta'], 'Solo en la zona habilitada.'),
          O('La zona de seguridad debe estar…', ['Despejada y conocida por todos', 'Ocupada como bodega si falta espacio', 'Cerrada con llave'], 'Despejada y disponible para emergencias.')),
        q3('cargas_limites', O('¿Cuál es el peso máximo que un hombre adulto puede cargar manualmente?', ['25 kg', '40 kg', '50 kg'], 'Ley 20.949: 25 kg.'),
          O('¿Cuál es el peso máximo para mujeres y menores de 18 años?', ['20 kg', '30 kg', '25 kg'], 'Ley 20.949: 20 kg.'),
          O('La carga que debes mover pesa más del límite. ¿Qué haces?', ['Pido ayuda o uso un carro o transpaleta', 'La levanto rápido de una vez', 'La arrastro con la espalda doblada'], 'Sobre el límite: ayuda mecánica o de otra persona.')),
        q3('pe_hanta', O('¿Cómo se contagia el hantavirus?', ['Al respirar polvo contaminado con orina o fecas de ratones silvestres', 'Por tomar agua de la llave', 'Por estar con un compañero resfriado'], 'Se contagia al respirar polvo contaminado.'),
          O('Debes limpiar una bodega con polvo. ¿Cómo lo haces?', ['Humedezco con agua y cloro antes de limpiar, con mascarilla y guantes', 'Barro en seco, es más rápido', 'Levanto el polvo con aire comprimido'], 'Nunca barrer en seco.'),
          O('Después de limpiar un galpón te da fiebre y dolor muscular. ¿Qué haces?', ['Aviso de inmediato a mi jefatura', 'Espero que se pase solo', 'Tomo un remedio y no digo nada'], 'Esos síntomas se avisan de inmediato.')),
        q3('pe_mezcla', O('¿Qué pasa si mezclas cloro con ácido?', ['Se libera un gas tóxico', 'Limpia mejor', 'Nada'], 'Nunca mezcles productos.'),
          O('¿Dónde encuentras cómo usar un químico y qué EPP necesitas?', ['En su Hoja de Datos de Seguridad (HDS)', 'En internet', 'Preguntándole a cualquier compañero'], 'La HDS lo indica.'),
          O('¿Dónde se guarda un producto químico?', ['En su envase original y rotulado', 'En una botella de bebida', 'En cualquier envase limpio'], 'Envase original y rotulado.')),
        q3('pe_calor', O('Trabajas cerca de hornos o en un día de calor. ¿Qué haces?', ['Tomo agua seguido, aunque no tenga sed', 'Tomo agua solo en la colación', 'Trabajo sin pausas para terminar antes'], 'Hidrátate seguido.'),
          O('¿Cuál es una señal de golpe de calor?', ['Mareo, dolor de cabeza y mucho cansancio', 'Ganas de comer', 'Manos frías'], 'Mareo y dolor de cabeza son señales de alerta.'),
          O('Un compañero se marea por el calor. ¿Qué haces?', ['Lo llevo a un lugar fresco, le doy agua y aviso a la jefatura', 'Le digo que siga, que ya se le pasará', 'Lo dejo descansando al sol'], 'Lugar fresco, agua y aviso.')),
        q3('pe_seleccion', O('Haces un trabajo repetitivo y te empieza a doler la muñeca. ¿Qué haces?', ['Aviso de inmediato a mi jefatura', 'Sigo igual hasta que se me pase', 'Tomo un analgésico y no digo nada'], 'Las molestias se avisan a tiempo.'),
          O('¿Qué ayuda a prevenir lesiones por tareas repetitivas?', ['Hacer las pausas activas y alternar tareas', 'Trabajar más rápido para terminar antes', 'Hacer fuerza con la muñeca doblada'], 'Pausas y alternar tareas.'),
          O('¿Qué partes del cuerpo se lesionan con movimientos repetitivos?', ['Hombros, codos y muñecas', 'Solo los pies', 'Ninguna'], 'Hombros, codos y muñecas.')),
        q3('karin_intro', O('Un compañero te grita y humilla seguido. ¿Qué puedes hacer?', ['Denunciarlo por los canales de la empresa (Ley Karin)', 'Nada, es normal en el trabajo', 'Responderle a golpes'], 'Se denuncia por los canales formales.'),
          O('¿Qué regula la Ley Karin?', ['La prevención y sanción del acoso laboral, el acoso sexual y la violencia en el trabajo', 'Los horarios de colación', 'El peso máximo de carga'], 'Acoso y violencia en el trabajo.'),
          V('Las denuncias por Ley Karin se manejan con confidencialidad.', true, 'Verdadero.')),
        q3('ruido_prexor', O('En una zona señalizada con ruido, el protector auditivo es…', ['Obligatorio todo el tiempo', 'Opcional', 'Solo para los nuevos'], 'Obligatorio todo el tiempo.'),
          O('¿Qué daño produce el ruido sin protección?', ['Pérdida de audición que no se recupera', 'Ninguno si uno se acostumbra', 'Solo un dolor de cabeza pasajero'], 'La pérdida auditiva es irreversible.'),
          O('¿Qué protocolo del MINSAL controla la exposición a ruido?', ['PREXOR', 'TMERT', 'Ley Karin'], 'PREXOR.')),
        q3('uv_bloq', O('Trabajas al aire libre en verano. ¿Qué haces?', ['Uso bloqueador, gorro legionario, lentes con filtro UV y busco sombra', 'Me saco la polera para estar fresco', 'Nada si está nublado'], 'Protégete siempre del sol.'),
          O('¿En qué horario la radiación UV es más peligrosa?', ['Entre las 11:00 y las 16:00', 'En la mañana temprano', 'Al atardecer'], 'Entre las 11:00 y las 16:00.'),
          V('En días nublados no hay radiación UV.', false, 'Falso: también hay radiación con nubes.')),
        q3('psico_ceal', O('¿Para qué se aplica el cuestionario CEAL-SM?', ['Para identificar riesgos psicosociales y mejorar el ambiente de trabajo', 'Para evaluar tu desempeño y sancionarte', 'Para calcular tu sueldo'], 'Detecta riesgos psicosociales.'),
          O('¿Cuál de estos es un factor de riesgo psicosocial?', ['Una carga de trabajo excesiva o un mal liderazgo', 'Usar la pechera', 'Lavarse las manos'], 'Carga, organización, liderazgo y ambiente.'),
          O('Hace semanas te sientes sobrepasado por el trabajo. ¿Qué haces?', ['Lo converso con mi jefatura o con prevención para buscar apoyo', 'Me lo guardo', 'Falto sin avisar'], 'Conversarlo es el primer paso.')),
        q3('pe_luz', O('Una luz de tu puesto se quemó y quedaste en penumbra. ¿Qué haces?', ['Aviso a la jefatura para que la reparen', 'Sigo trabajando igual', 'Cambio el foco yo mismo subido a una silla'], 'Se avisa; no se improvisa.'),
          O('¿Por qué es importante una buena iluminación en el trabajo?', ['Evita la fatiga visual, los errores y los accidentes', 'Solo para ahorrar energía', 'No tiene importancia'], 'Previene fatiga, errores y accidentes.'),
          O('Ves un pasillo oscuro por donde pasan grúas horquilla. ¿Qué haces?', ['Lo informo a la jefatura', 'Paso corriendo', 'Camino mirando el celular con la linterna'], 'Las condiciones inseguras se informan.'))
      ];
    }
  } catch (e) {}


  // 8) Repaso rápido: si el tema ya está aprobado, se reconoce aunque en este teléfono no esté guardada la clave
  //    (se busca también lo aprobado en este teléfono y, si hace falta, se pide la clave una vez y queda guardada)
  try {
    if (typeof temaAprobado === 'function' && !temaAprobado.__pe) {
      const vigente = ap => ap && (st.topic.id === 'induccion' ? venceInduccion(ap.fecha) - Date.now() >= 30 * 864e5 : venceAprob(ap.tema_id || st.topic.id, ap.fecha) > Date.now());
      const rk = r => String(r || '').replace(/[^0-9kK]/g, '').toUpperCase();
      const local = () => {
        try { const R = JSON.parse(localStorage.getItem('perello_cap_ruta') || 'null'); if (R && rk(R.rut) === rk(st.rut) && R.aprob && vigente(R.aprob[st.topic.id])) return R.aprob[st.topic.id]; } catch (e) {}
        try { const ci = JSON.parse(localStorage.getItem('perello_cap_ind') || 'null'); if (st.topic.id === 'induccion' && ci && rk(ci.rut) === rk(st.rut) && vigente(ci)) return ci; } catch (e) {}
        return null;
      };
      const consulta = async k => {
        st.hash = await rutHash(st.rut);
        const ctl = new AbortController(); setTimeout(() => ctl.abort(), 25000);
        return fetch(SCRIPT_URL + '?historial=' + st.hash + '&k=' + encodeURIComponent(k || ''), { signal: ctl.signal }).then(r => r.json());
      };
      const desde = d => { if (d.persona) st.persona = d.persona; const ap = (d.temas || []).find(t => t.tema_id === st.topic.id) || null; return vigente(ap) ? ap : null; };
      const pedirClave = () => new Promise(res => {
        const b = document.getElementById('zBody'); if (!b) return res(null);
        b.innerHTML = `<h2>¿Ya aprobaste este tema?</h2>
          <p>Escribe tu clave para revisar tu registro. Si ya lo aprobaste, podrás repasarlo rápido, sin esperar en cada lámina.</p>
          <input type="password" id="peClave" autocomplete="current-password" placeholder="Tu clave (ej: juan1985)" style="width:100%;box-sizing:border-box">
          <p id="peErr" style="display:none;color:#FF8A80;font-size:14px"></p>
          <button class="btn" id="peOk">Revisar mi registro</button>
          <button class="btn ghost" id="peNo">Seguir sin clave</button>`;
        const go = async () => {
          const k = document.getElementById('peClave').value.trim(), e = document.getElementById('peErr'), ok = document.getElementById('peOk');
          if (!k) { e.textContent = 'Escribe tu clave o toca "Seguir sin clave".'; e.style.display = 'block'; return; }
          ok.disabled = true; ok.textContent = 'Revisando…';
          try { const d = await consulta(k);
            if (!d.ok && (d.error === 'clave' || d.error === 'sinnac')) { ok.disabled = false; ok.textContent = 'Revisar mi registro'; e.textContent = d.error === 'sinnac' ? 'Tu ficha no tiene fecha de nacimiento. Contacta al área de RR.HH.' : 'Clave incorrecta. Inténtalo de nuevo o sigue sin clave.'; e.style.display = 'block'; return; }
            if (d.ok) { try { const ps = JSON.parse(localStorage.getItem('perello_cap_persona') || '{}') || {}; localStorage.setItem('perello_cap_persona', JSON.stringify(Object.assign(ps, { name: st.name, rut: st.rut, k }))); } catch (er) {} }
            res(d.ok ? desde(d) : null);
          } catch (er) { res(null); }
        };
        document.getElementById('peOk').onclick = go;
        document.getElementById('peClave').onkeydown = ev => { if (ev.key === 'Enter') go(); };
        document.getElementById('peNo').onclick = () => res(null);
        try { guiar('Si ya aprobaste este tema, escribe tu clave para repasarlo rápido.', 'peClave', 'TU CLAVE', ''); } catch (e) {}
      });
      temaAprobado = async function () {
        let d = null;
        try { d = await consulta((sesion() || {}).k || ''); } catch (e) {}
        if (d && d.ok) return desde(d) || local();
        const l = local(); if (l) return l;
        if (d && d.error === 'clave') return pedirClave();
        return null;
      };
      temaAprobado.__pe = true;
    }
  } catch (e) {}


  // 9) Grúa horquilla con bins plásticos (no cajas ni tarros) y cintas de selección: lo prohibido es INTERVENIR equipos en movimiento
  try {
    // bin plástico agrícola con fruta; x = izquierda, y = base, w = ancho, h = alto
    const binP = (x, y, w, h, sinFruta) => {
      const n = v => (+v).toFixed(1), ft = Math.max(3, h * .12), top = y - h;
      let g = `<rect x="${n(x + 3)}" y="${n(y - ft)}" width="${n(w * .18)}" height="${n(ft)}" fill="#0D47A1"/><rect x="${n(x + w - 3 - w * .18)}" y="${n(y - ft)}" width="${n(w * .18)}" height="${n(ft)}" fill="#0D47A1"/>`;
      g += `<path d="M${n(x)},${n(y - ft)} h${n(w)} l-1.5,${n(-(h - ft - 3))} h${n(-(w - 3))} z" fill="#1E88E5" stroke="#0D47A1" stroke-width="1.1"/>`;
      for (let i = 1; i < 3; i++) g += `<line x1="${n(x + 1)}" y1="${n(y - ft - (h - ft - 3) * i / 3)}" x2="${n(x + w - 1)}" y2="${n(y - ft - (h - ft - 3) * i / 3)}" stroke="#1565C0" stroke-width="1"/>`;
      for (let i = 1; i < 4; i++) g += `<rect x="${n(x + w * i / 4 - 1.5)}" y="${n(top + 6)}" width="3" height="${n(Math.max(2, h - ft - 9))}" rx="1.2" fill="#1565C0"/>`;
      g += `<rect x="${n(x - 1)}" y="${n(top)}" width="${n(w + 2)}" height="4" rx="1.2" fill="#1565C0" stroke="#0D47A1" stroke-width=".8"/>`;
      if (!sinFruta) for (let i = 0; i < Math.max(2, Math.floor(w / 9)); i++) g += `<circle cx="${n(x + 5 + i * 9)}" cy="${n(top - 1.5)}" r="3.4" fill="${i % 2 ? '#E64A19' : '#C62828'}" stroke="#7F1D0B" stroke-width=".6"/>`;
      return g;
    };
    window.PE_BIN = binP;
    if (typeof carga === 'function' && !carga.__pe) {
      const C0 = carga;
      carga = function (kind, x0, y) {
        if (kind === 'alta') return binP(x0, y, 48, 28) + binP(x0, y - 28, 48, 28);
        if (!kind || kind === 'vacio' || kind === 'vacia') return C0.apply(this, arguments);
        return binP(x0, y, 48, 30);
      };
      carga.__pe = true;
    }
    if (typeof forklift === 'function' && !forklift.__pe) {
      const F1 = forklift;
      forklift = function (x, y, o) {
        o = o || {}; if (!o.load) return F1(x, y, o);
        const lift = o.lift || 8, h = Math.max(22, Math.min(34, +o.load || 26));
        const b = binP(x + 82, y - lift - 5, 38, h);
        return F1(x, y, Object.assign({}, o, { load: 0 })) + (o.flip ? `<g transform="translate(${2 * x + 120},0) scale(-1,1)">${b}</g>` : b);
      };
      forklift.__pe = true;
    }

    // Textos: seleccionar en la cinta en movimiento es la tarea; lo que no se hace es intervenirla en movimiento
    const NO_INTERV = 'No intervengas equipos en movimiento';
    const CAMBIOS = [
      ['Con resguardo y parada de emergencia. Nunca la mano con la cinta en marcha.', 'Con resguardo en rodillos y transmisión, parada de emergencia a mano y todo en orden. Seleccionar en la cinta es tu trabajo; destrabar, limpiar o reparar se hace con la cinta detenida y bloqueada.'],
      ['<li><b>Nunca</b> metas la mano con la máquina en marcha, aunque sea "un segundo".</li>', '<li><b>No intervengas equipos en movimiento</b>: seleccionar en la cinta es tu tarea, pero destrabar, limpiar, ajustar o reparar se hace con la máquina detenida y bloqueada, aunque sea "un segundo".</li><li>Manos fuera de rodillos, poleas, cadenas y cerradoras.</li>'],
      ['Primero detener y bloquear; después la mano.', 'No intervengas equipos en movimiento: primero detener y bloquear.'],
      ['Nunca la mano con la máquina en marcha', NO_INTERV],
      ['Una lata trabada, una fruta atascada o algo que cayó en la cinta: <b>nunca se saca con la máquina andando</b>.', 'Seleccionar fruta o latas desde la cinta en movimiento es parte del trabajo. Lo que <b>nunca</b> se hace es <b>intervenir</b> la máquina en movimiento: una lata trabada, una fruta atascada en un rodillo o algo que cayó dentro de la máquina no se saca con la máquina andando.'],
      ['Primero detener; después meter la mano.', 'Para intervenir: detener y bloquear primero.'],
      ['"Espera, detén la cinta primero"', '"Espera, detén y bloquea antes de destrabar"'],
      ['Las líneas tienen cintas y rodillos: <b>nada suelto</b>, pelo tomado y manos fuera de los puntos de atrapamiento.', 'En las líneas seleccionas desde la cinta en movimiento: esa es tu tarea. Lo que <b>no se hace</b> es intervenirla en movimiento (destrabar, limpiar o ajustar): para eso se detiene y se bloquea. <b>Nada suelto</b>, pelo tomado y manos fuera de rodillos y puntos de atrapamiento.']
    ];
    const fx = v => { if (typeof v !== 'string') return v; CAMBIOS.forEach(([a, b]) => { if (v.indexOf(a) >= 0) v = v.split(a).join(b); }); return v; };
    const recorrer = (o, d) => { if (!o || typeof o !== 'object' || d > 6) return; Object.keys(o).forEach(k => { const v = o[k]; if (typeof v === 'string') o[k] = fx(v); else if (v && typeof v === 'object') recorrer(v, d + 1); }); };
    [typeof TOPICS !== 'undefined' ? TOPICS : null, typeof NORMAS !== 'undefined' ? NORMAS : null].forEach(x => recorrer(x, 0));

    // Dibujos de la cinta
    if (typeof S === 'object' && window.WC) {
      const W2 = window.WC;
      const envolver = (k, f) => { const o = S[k]; if (typeof o !== 'function' || o.__pe9) return; S[k] = function () { return f(o.apply(this, arguments)); }; S[k].__pe9 = true; };
      const fin = (svg, extra) => svg.replace(/<\/svg>\s*$/, extra + '</svg>');
      // MAL: transmisión sin resguardo, mano en la polea con la cinta andando, cables pelados, latas en el piso y sin parada de emergencia
      envolver('pe_cinta_mal', svg => {
        const w = W2(200, 165, { pose: 'point', flip: true, shirt: '#ECEFF1' });
        svg = svg.split(w).join('').replace(/<circle cx="168" cy="118" r="18" fill="none" stroke="#C62828" stroke-width="3"\/>/, '');
        svg = svg.replace('Nunca la mano con la cinta en marcha', 'Intervenir la cinta en movimiento');
        let x = '';
        x += `<rect x="226" y="122" width="34" height="22" rx="3" fill="#78909C" stroke="#455A64"/><circle cx="236" cy="128" r="8" fill="#B0BEC5" stroke="#37474F" stroke-width="2"/><circle cx="236" cy="128" r="2.5" fill="#37474F"/>`;
        x += `<g class="an-spin" style="transform-origin:236px 128px;transform-box:view-box"><path d="M236,120 v16 M228,128 h16" stroke="#37474F" stroke-width="2"/></g>`;
        x += `<path d="M236,120 L254,124 M236,136 L254,140" stroke="#263238" stroke-width="2" stroke-dasharray="3 2"/><circle cx="254" cy="132" r="6" fill="#90A4AE" stroke="#37474F" stroke-width="1.5"/>`;
        x += `<path d="M258,140 q14,10 8,22 q-6,12 10,14" fill="none" stroke="#212121" stroke-width="3"/><path d="M265,158 l4,3" stroke="#E65100" stroke-width="3"/><path d="M268,168 l3,2" stroke="#E65100" stroke-width="3"/>`;
        x += `<g class="an-flash"><path d="M276,160 l5,-7 l1,6 l6,-3 l-4,7 l6,2 l-8,2" fill="#FFEB3B" stroke="#F57F17" stroke-width="1"/></g>`;
        x += `<g transform="rotate(80 70 168)"><rect x="64" y="160" width="12" height="16" rx="2" fill="#CFD8DC" stroke="#78909C"/><rect x="64" y="164" width="12" height="8" fill="#C62828"/></g><g transform="rotate(-70 112 170)"><rect x="106" y="162" width="12" height="16" rx="2" fill="#CFD8DC" stroke="#78909C"/><rect x="106" y="166" width="12" height="8" fill="#C62828"/></g>`;
        x += `<ellipse cx="150" cy="172" rx="18" ry="3" fill="#E57373" opacity=".5"/>`;
        x += W2(286, 165, { pose: 'point', flip: true, shirt: '#ECEFF1' });
        x += `<circle cx="248" cy="128" r="17" fill="none" stroke="#C62828" stroke-width="3"/>`;
        return fin(svg, x);
      });
      envolver('auto_mal', () => S.pe_cinta_mal());
      // BIEN: resguardo, parada de emergencia y trabajadora seleccionando con la cinta andando
      envolver('pe_cinta_ok', svg => svg.replace('Resguardo y parada de emergencia', 'Resguardo, orden y parada de emergencia'));
      envolver('auto_companero', svg => {
        svg = svg.replace('¡Espera! Detén la cinta', '¡Detén y bloquea primero!');
        return fin(svg, `<g transform="rotate(35 128 116)"><rect x="122" y="104" width="12" height="16" rx="2" fill="#CFD8DC" stroke="#78909C"/><rect x="122" y="108" width="12" height="8" fill="#C62828"/></g><g class="an-flash"><circle cx="128" cy="92" r="8" fill="#D7262B" stroke="#fff" stroke-width="2"/><text x="128" y="96" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff" font-family="Arial">!</text></g>`);
      });
      envolver('accidente_auto', svg => svg.replace(/font-size="\d+"([^>]*>)¡Rápido!</, 'font-size="11"$1¡Destrabo en marcha!<').replace(/font-size="\d+"([^>]*>)Detengo primero</, 'font-size="11"$1Detengo y bloqueo<'));
      // grúa horquilla grande: lo que va en las horquillas pasa a ser bins plásticos
      const BINS = svg => typeof svg !== 'string' ? svg : svg.replace(/(<path d="M([\d.-]+),([\d.-]+) h52 l2,3 h-54z" fill="#37474F"\/>)(<rect x="[\d.-]+" y="[\d.-]+" width="48" height="3" fill="#D7B98E"[^]*?)(?=<g|<\/g>|<animateTransform|<circle|<ellipse|<line|<polyline|$)/g, (m, fork, X, FY, load) => {
        const px = +((load.match(/^<rect x="([\d.-]+)"/) || [])[1] || (+X + 3)), x0 = px, fy = +FY; let keep = '', used = '';
        const els = load.match(/<rect[^>]*\/>|<path[^>]*\/>|<text[^>]*>[^<]*<\/text>/g) || [];
        els.forEach(e => { const c = e.match(/\sx="([\d.-]+)"[^>]*?\sy="([\d.-]+)"|d="M([\d.-]+),([\d.-]+)/); const ex = c ? +(c[1] || c[3]) : NaN, ey = c ? +(c[2] || c[4]) : NaN;
          if (ex >= x0 - 12 && ex <= x0 + 60 && ey >= fy - 90 && ey <= fy + 2) used += e; else keep += e; });
        const alto = els.length > 14 ? 2 : 1;
        return fork + (alto === 2 ? binP(x0, fy, 48, 28, true) + binP(x0, fy - 28, 48, 28) : binP(x0, fy, 48, 30)) + keep;
      });
      Object.keys(S).forEach(k => { const f = S[k]; if (typeof f !== 'function' || f.__peB) return; S[k] = function () { return BINS(f.apply(this, arguments)); }; S[k].__peB = true; });
    }
  } catch (e) {}
})();

// ---------- 10) Grúa horquilla: racks de planta (cajas de conservas y bins, no ferretería) y curso del operador en "Grúa horquilla"
(function () {
  try {
    const AZb = '#1565C0';
    const binR = (x, y, w, h) => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="2" fill="#1E88E5" stroke="#0D47A1" stroke-width=".8"/>` + [1, 2, 3].map(i => `<line x1="${x + i * w / 4}" y1="${y - h + 2}" x2="${x + i * w / 4}" y2="${y - 2}" stroke="#0D47A1" stroke-width=".6"/>`).join('') + `<rect x="${x}" y="${y - h}" width="${w}" height="3" fill="#1565C0"/>`;
    const cajaC = (x, y, w, h) => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#D7B98E" stroke="#8D6E3F" stroke-width=".7"/><rect x="${x}" y="${y - h * .62}" width="${w}" height="${h * .26}" fill="#C62828" opacity=".85"/><line x1="${x + w / 2}" y1="${y - h}" x2="${x + w / 2}" y2="${y}" stroke="#8D6E3F" stroke-width=".5"/>`;
    const rackP = (x, y, w, h) => {
      let s = `<rect x="${x}" y="${y - h}" width="5" height="${h}" fill="${AZb}"/><rect x="${x + w - 5}" y="${y - h}" width="5" height="${h}" fill="${AZb}"/>`;
      const lv = 3, ih = Math.min(22, (h - 8) / lv - 6);
      for (let i = 0; i < lv; i++) {
        const by = y - 4 - i * (h - 8) / lv; s += `<rect x="${x}" y="${by}" width="${w}" height="4" fill="#FF8F00"/>`;
        const iw = w - 12, n = Math.max(1, Math.floor(iw / 26)), cw = iw / n;
        for (let c = 0; c < n; c++) { const cx = x + 6 + c * cw; s += (i + c) % 2 ? binR(cx + 1, by, cw - 2, ih) : cajaC(cx + 1, by, cw - 2, ih * .55) + cajaC(cx + 1, by - ih * .55, cw - 2, ih * .45); }
      }
      return s;
    };
    const A = { horquilla_portada: [196, 150, 120, 126], horquilla_autorizado: [250, 150, 66, 120], horquilla_cinturon: [4, 150, 60, 110], horquilla_vision: [4, 150, 54, 110], horquilla_personas: [262, 150, 56, 140], horquilla_q_vision: [4, 150, 54, 110], horquilla_q_pers: [196, 150, 120, 140] };
    const cambiaRack = (svg, [x, y, w, h]) => {
      const i0 = svg.indexOf(`<rect x="${x}" y="${y - h}" width="5" height="${h}"`); if (i0 < 0) return svg;
      const by2 = y - 4 - 2 * (h - 8) / 3, k = svg.indexOf(`<rect x="${x + 60}" y="${by2 - 18}" width="50" height="18"`, i0); if (k < 0) return svg;
      let e = svg.indexOf('/>', k) + 2; e = svg.indexOf('/>', e) + 2;   // caja = 2 rect
      return svg.slice(0, i0) + rackP(x, y, w, h) + svg.slice(e);
    };
    Object.keys(A).forEach(k => { const f = S[k]; if (typeof f !== 'function') return; S[k] = function () { return cambiaRack(f.apply(this, arguments), A[k]); }; });

    // Curso del operador (sección "Grúa horquilla"), con ejemplos de la planta
    if (!TOPICS.some(t => t.id === 'grua_operacion')) {
      const VF = (q, v, s, w) => ({ q, s, vf: v, w });
      const t = { id: 'grua_operacion', title: 'Operación segura de grúa horquilla', sec: 'grua', thumb: 'horquilla_portada', mins: 6,
        learn: [
          { s: 'horquilla_autorizado', t: 'Solo opera quien está autorizado', x: 'Para operar la grúa en Perelló se exige <b>licencia clase D</b> (maquinaria automotriz, Ley de Tránsito) y además <b>estar capacitado y autorizado por la empresa</b>. Nadie más se sube a manejarla, ni "un ratito", ni para moverla un metro.', k: 'Clase D, capacitado y autorizado: si no, no se opera.' },
          { s: 'horquilla_cinturon', t: 'Cinturón: siempre puesto', x: 'Si la grúa se vuelca, el cinturón te mantiene <b>dentro de la cabina, bajo el techo protector</b>. Sin cinturón, el cuerpo sale disparado y la máquina cae encima. Por eso va puesto <b>en todo recorrido</b>, aunque sea corto o dentro de la bodega.', k: 'El cinturón te deja bajo el techo protector.' },
          { s: 'horquilla_centro', t: 'Placa de carga y centro de carga', x: 'La <b>placa de capacidad</b> indica cuántos kilos levanta la grúa, a qué <b>centro de carga</b> y hasta qué altura. La grúa funciona como un <b>balancín</b>: el eje delantero es el apoyo y el contrapeso va atrás. Si la carga queda <b>más lejos</b> (en las puntas, o un bin mal tomado), soporta <b>menos kilos</b>. Pégala al respaldo y <b>nunca superes la placa</b>.', k: 'Carga lejos = menos capacidad. Nunca superes la placa.' },
          { s: 'horquilla_vision', t: 'Si la carga tapa la vista: en reversa', x: 'Dos bins apilados te tapan la visión hacia adelante. Entonces <b>avanza en reversa</b>, mirando hacia donde vas. Si igual no ves bien, pide a un compañero que te guíe. <b>Nunca avances a ciegas</b> esperando que los demás se corran.', k: 'Si no ves hacia adelante, anda en reversa.' },
          { s: 'horquilla_bajas', t: 'Horquillas bajas al circular', x: '<ul><li>Lleva las horquillas <b>bajas, cerca del piso</b>, y el mástil inclinado hacia atrás.</li><li>Sube la carga <b>solo frente al rack o la ruma</b>, detenido.</li><li>No gires con la carga en alto.</li><li>Ve a velocidad moderada, según las reglas internas de la planta.</li></ul>Carga baja: la grúa es más estable y ves mejor.', k: 'Carga baja, velocidad moderada, atención alta.' },
          { s: 'horquilla_rampa', t: 'Pendientes y rampas', x: 'En una rampa, <b>con carga, la carga siempre va hacia arriba</b>: sube de frente y baja en reversa. Así no se cae de las horquillas. <ul><li>Nunca gires ni cruces de lado en una pendiente.</li><li>Sin carga, las horquillas van hacia abajo de la pendiente.</li></ul>', k: 'Con carga en rampa: la carga mira hacia arriba.' },
          { s: 'horquilla_vuelco', t: 'Volcamiento lateral', x: 'La grúa se puede volcar hacia el lado al <b>girar rápido</b>, al girar con la <b>carga en alto</b>, al pasar por <b>hoyos, lomos o pisos mojados</b>, o al andar de lado en una pendiente. Si se vuelca: <b>no saltes</b>. Quédate dentro con el cinturón, <b>afírmate al volante</b>, apoya los pies e inclínate al lado contrario.', k: 'Si se vuelca: no saltes, afírmate y quédate dentro.' },
          { s: 'horquilla_personas', t: 'Nunca levantar personas', x: 'Las horquillas son para cargas. <b>Nunca levantes a una persona</b> sobre las horquillas, sobre un pallet o dentro de un bin para alcanzar algo del rack, ni la lleves de pasajero. No tiene baranda ni sujeción: un movimiento y cae desde altura. Para subir, se usa el <b>equipo diseñado para personas</b>. <b>Subirse a las horquillas es una falta grave que puede ser sancionada drásticamente.</b>', k: 'Las horquillas son para cargas, nunca para personas.' },
          { s: 'horquilla_estacionar', t: 'Al estacionar', x: '<ul><li>Horquillas <b>apoyadas en el piso</b>.</li><li><b>Freno de estacionamiento</b> puesto.</li><li>Motor apagado y <b>llave retirada</b>.</li><li>Lejos de salidas, extintores, pasillos y cruces.</li></ul>Así nadie tropieza con las horquillas y nadie no autorizado la puede mover.', k: 'Horquillas al piso, freno puesto y llave fuera.' },
          { s: 'horquilla_auto', t: 'Autocuidado: tú decides', x: 'La mayoría de los accidentes se relacionan con una acción insegura. Con la grúa, las típicas son <b>apurarse</b> porque hay un camión esperando o la línea necesita bins, girar rápido con carga y <b>no ponerse el cinturón</b> "porque es corto". La decisión segura: <b>trabajar con calma</b>. Avisa a tu jefatura o al asesor en prevención los pisos dañados y las fallas.', k: 'El apuro no carga más rápido: carga accidentes.' }
        ],
        quiz: [
          { q: '¿Quién puede operar la grúa horquilla en la planta?', s: 'horquilla_q_quien', o: ['Cualquiera que sepa manejar auto', 'Quien tiene licencia clase D y está capacitado y autorizado por la empresa', 'El que esté más cerca cuando se necesite'], a: 1, w: 'Solo opera quien está capacitado y autorizado por la empresa. La Ley de Tránsito asigna a esta maquinaria la licencia clase D.' },
          { q: '¿Cuál es la forma correcta de circular con carga?', pick: ['horquilla_altas', 'horquilla_bajas_ok'], a: 1, w: 'Con la carga baja, la grúa es más estable y ves mejor. Se sube solo frente al rack, detenido.' },
          { q: 'Llevas dos bins apilados que no te dejan ver hacia adelante. ¿Qué haces?', s: 'horquilla_q_vision', o: ['Avanzo igual, tocando la bocina', 'Avanzo en reversa, mirando hacia donde voy', 'Subo la carga para mirar por debajo'], a: 1, w: 'Con la vista tapada se avanza en reversa. Si igual no ves, pide que alguien te guíe.' },
          { q: '¿Cuál es la forma correcta de llevar el bin?', pick: ['horquilla_centro_mal', 'horquilla_centro_bien'], a: 1, w: 'La carga va pegada al respaldo. En las puntas, el centro de carga se aleja, la grúa soporta menos y se puede ir hacia adelante.' },
          { q: 'Debes bajar una rampa con un bin cargado. ¿Cómo lo haces?', s: 'horquilla_q_rampa', o: ['De frente, con la carga hacia abajo', 'En reversa, con la carga hacia arriba de la rampa', 'De lado, para ir más despacio'], a: 1, w: 'Con carga, la carga siempre va hacia arriba de la pendiente: se sube de frente y se baja en reversa.' },
          { q: 'La grúa empieza a volcarse hacia un lado. ¿Qué haces?', s: 'horquilla_vuelco', o: ['Salto rápido hacia afuera', 'Me quedo dentro con el cinturón, me afirmo y me inclino al lado contrario', 'Suelto el volante y me agacho'], a: 1, w: 'Saltar es lo más peligroso: la máquina y el techo protector te pueden aplastar.' },
          VF('Un compañero puede subirse a un bin sobre las horquillas para sacar algo del rack, si subo despacio.', false, 'horquilla_q_pers', 'Falso. Las horquillas son para cargas. Nunca se levanta a una persona con la grúa.'),
          VF('En recorridos cortos dentro de la bodega puedo andar sin cinturón.', false, 'horquilla_portada', 'Falso. Un vuelco ocurre en segundos, también en recorridos cortos. El cinturón va siempre.'),
          { q: 'Terminas tu turno. ¿Cómo dejas la grúa?', s: 'horquilla_q_estac', o: ['Horquillas en el piso, freno puesto, motor apagado y llave fuera', 'Con las horquillas a media altura para la próxima carga', 'Encendida, por si alguien la necesita'], a: 0, w: 'Así nadie tropieza con las horquillas y nadie no autorizado la puede mover.' },
          { q: 'Hay un camión esperando y te piden "apurarte". ¿Cuál es la decisión segura?', s: 'horquilla_q_apuro', o: ['Girar más rápido con la carga en alto', 'Trabajar con calma: carga baja, velocidad moderada y cinturón', 'Llevar más bins de los que permite la placa'], a: 1, w: 'Apurarse es la acción insegura típica. Unos minutos de espera valen menos que un vuelco.' }
        ] };
      const norma = { obj: 'Que el operador de grúa horquilla opere de forma segura en la planta, bodega y patio: requisitos para operar, capacidad de carga, estabilidad, visibilidad, rampas, volcamiento y estacionamiento.',
        n: ['Ley 18.290 de Tránsito: la licencia clase D corresponde a la conducción de maquinaria automotriz, como la grúa horquilla.', 'Requisito de la empresa: solo opera la grúa quien está capacitado y autorizado por la empresa.', 'Código del Trabajo, art. 184: el empleador debe tomar todas las medidas necesarias para proteger eficazmente la vida y salud de los trabajadores.', 'DS 594/1999 MINSAL, arts. 36, 37 y 42: máquinas en condiciones seguras, eliminar factores de peligro y almacenamiento seguro de materiales.', 'DS 44/2023 MINTRAB, arts. 15 y 16: informar los riesgos laborales y capacitar según los riesgos del puesto.'] };
      const j = TOPICS.findIndex(x => x.sec === 'grua');
      if (j >= 0) TOPICS.splice(j, 0, t); else TOPICS.push(t);
      if (typeof NORMAS !== 'undefined') NORMAS[t.id] = norma;
      if (typeof renderHome === 'function') try { renderHome(); } catch (e) {}
    }
  } catch (e) { console.log('perello_extra 10: ' + e); }
})();
