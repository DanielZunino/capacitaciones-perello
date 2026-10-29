// ===== ZG SpA y Transportes ZG SpA · ajustes en línea (se carga después de mejoras_comunes.js) · 29-10-2026 =====
// Base: portal de obra. Se adapta a faena forestal y de biomasa (ZG SpA) y a transporte con cama baja y piso caminante (Transportes ZG SpA).
(function () {
  try {
    const PORTAL = location.pathname.split('/')[1] || '';
    const CFG = {
      'capacitaciones-zg': { emp: 'ZG SpA', secs: ['todos', 'faena', 'taller', 'admin'],
        mover: { herramientas: 'taller', electrico: 'taller', caliente: 'taller', ruido: 'faena', tmert: 'faena', pvd: 'admin', oficina: 'admin' },
        quitar: ['altura', 'andamios', 'excavaciones', 'maquinas', 'polvo', 'quimicos', 'izaje', 'maquinaria', 'camion_conduccion', 'cama_baja', 'piso_caminante'] },
      'capacitaciones-transporteszg': { emp: 'Transportes ZG SpA', secs: ['todos', 'conductores'],
        mover: { camion_conduccion: 'conductores' },
        quitar: ['altura', 'andamios', 'excavaciones', 'herramientas', 'maquinas', 'polvo', 'ruido', 'quimicos', 'tmert', 'electrico', 'caliente', 'izaje', 'maquinaria', 'pvd', 'oficina', 'triturador', 'astillador', 'arjes', 'excavadora', 'incendio_forestal', 'mecanico_soldador'] }
    };
    const C = CFG[PORTAL] || CFG['capacitaciones-zg'];
    if (typeof TOPICS === 'undefined' || typeof S !== 'object' || window.__zg) return;
    window.__zg = true;
  // ---------- Dibujos propios de ZG: faena forestal, triturador Bandit, astillador, Arjes, excavadora, cama baja, piso caminante y taller
  const n1 = v => (+v).toFixed(1);
  const SV = inner => `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const placa = (cx, cy, w, h) => (window.MJ_PLACA ? window.MJ_PLACA(cx, cy, w, h) : '');
  const fondo = (o = {}) => {
    let g = `<defs><linearGradient id="zgSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FD3F5"/><stop offset="1" stop-color="#E8F5FD"/></linearGradient></defs><rect width="320" height="200" fill="url(#zgSky)"/>`;
    g += `<path d="M0,120 Q60,92 120,112 T240,104 T320,110 V160 H0Z" fill="#8DB46A"/><path d="M0,132 Q80,112 160,128 T320,124 V160 H0Z" fill="#6E9A4E"/>`;
    [12, 34, 58, 230, 252, 276, 300].forEach((x, i) => { const h = 34 + (i % 3) * 8; g += `<rect x="${x - 1.5}" y="${132 - 6}" width="3" height="8" fill="#5D4037"/><path d="M${x},${132 - 6 - h} l${h * .28},${h} h${-h * .56}z" fill="${i % 2 ? '#2E6B3A' : '#3C7D46'}"/>`; });
    g += `<rect y="148" width="320" height="52" fill="${o.taller ? '#B0BEC5' : '#B08B60'}"/>`;
    if (!o.taller) for (let i = 0; i < 40; i++) g += `<rect x="${(i * 37) % 320}" y="${152 + (i * 13) % 44}" width="3" height="1.6" fill="#8D6E4A" opacity=".6"/>`;
    return g;
  };
  const tallerFondo = () => `<rect width="320" height="200" fill="#ECEFF1"/><rect y="0" width="320" height="18" fill="#90A4AE"/>${[0, 1, 2, 3].map(i => `<rect x="${10 + i * 80}" y="28" width="60" height="40" fill="#B3E5FC" stroke="#78909C"/>`).join('')}<rect y="148" width="320" height="52" fill="#9E9E9E"/><rect y="148" width="320" height="3" fill="#FFC20E"/>`;
  const txt = (x, y, s, size = 12, c = '#263238') => `<text x="${x}" y="${y}" font-size="${size}" font-weight="bold" text-anchor="middle" fill="${c}" font-family="Arial" stroke="#fff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">${s}</text>`;
  const pill = (x, y, s, c = '#2E7D32', size = 11) => { const w = Math.round(s.length * size * .6 + 16); return `<rect x="${n1(x - w / 2)}" y="${y - size - 4}" width="${w}" height="${size + 10}" rx="${(size + 10) / 2}" fill="${c}"/><text x="${x}" y="${y + 1}" font-size="${size}" font-weight="bold" text-anchor="middle" fill="#fff" font-family="Arial">${s}</text>`; };
  const ok = (x, y) => (typeof badge === 'function' ? badge(x, y, true, 14) : '');
  const no = (x, y) => (typeof badge === 'function' ? badge(x, y, false, 14) : '');
  const prohibido = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#D7262B" stroke-width="4"/><line x1="${n1(x - r * .7)}" y1="${n1(y - r * .7)}" x2="${n1(x + r * .7)}" y2="${n1(y + r * .7)}" stroke="#D7262B" stroke-width="4"/>`;
  const zona = (x, y, w, c = '#D7262B') => `<rect x="${x}" y="${y}" width="${w}" height="5" fill="${c}" opacity=".85"/>${[...Array(Math.floor(w / 12))].map((_, i) => `<rect x="${x + i * 12}" y="${y}" width="6" height="5" fill="#fff" opacity=".8"/>`).join('')}`;
  const cono = (x, y, s = 1) => `<path d="M${x - 8 * s},${y} l${5 * s},${-22 * s} h${6 * s} l${5 * s},${22 * s}z" fill="#FF6D00"/><rect x="${x - 5 * s}" y="${y - 13 * s}" width="${10 * s}" height="${3.5 * s}" fill="#fff"/><rect x="${x - 11 * s}" y="${y - 2 * s}" width="${22 * s}" height="${3 * s}" fill="#E65100"/>`;
  const tronco = (x, y, l = 40, r = 6) => `<rect x="${x}" y="${y - r}" width="${l}" height="${r * 2}" rx="${r}" fill="#8D6E63" stroke="#5D4037"/><ellipse cx="${x + l}" cy="${y}" rx="${r * .7}" ry="${r}" fill="#D7B98E" stroke="#5D4037"/>`;
  const chips = (x, y, n = 10) => [...Array(n)].map((_, i) => `<circle cx="${n1(x + (i * 7) % 26 - 13)}" cy="${n1(y + (i * 5) % 18)}" r="${1.4 + (i % 2)}" fill="#C8955A"/>`).join('');
  const pila = (x, y, w = 70, h = 34) => `<path d="M${x},${y} q${w / 2},${-h * 2} ${w},0z" fill="#C49A6C" stroke="#9C7448"/>${chips(x + w / 2, y - h * .6, 14)}`;
  const llama = (x, y, s = 1) => `<g class="an-flash"><path d="M${x},${y} c${-10 * s},${-8 * s} ${-6 * s},${-22 * s} ${2 * s},${-30 * s} c${-2 * s},${10 * s} ${10 * s},${12 * s} ${6 * s},${30 * s}z" fill="#FF6D00"/><path d="M${x + 1 * s},${y} c${-5 * s},${-5 * s} ${-3 * s},${-12 * s} ${1 * s},${-17 * s} c${0},${6 * s} ${5 * s},${7 * s} ${3 * s},${17 * s}z" fill="#FFD54F"/></g>`;
  const humo = (x, y) => `<g opacity=".55"><circle cx="${x}" cy="${y}" r="9" fill="#9E9E9E"/><circle cx="${x + 9}" cy="${y - 10}" r="11" fill="#BDBDBD"/><circle cx="${x + 2}" cy="${y - 24}" r="13" fill="#CFD8DC"/></g>`;
  const extintor = (x, y) => `<rect x="${x - 6}" y="${y - 30}" width="12" height="30" rx="5" fill="#D32F2F" stroke="#8E0000"/><rect x="${x - 3}" y="${y - 36}" width="6" height="6" fill="#263238"/><path d="M${x + 3},${y - 34} q12,2 10,14" stroke="#263238" stroke-width="2" fill="none"/>`;
  const operario = (x, y, o = {}) => W(x, y, Object.assign({ helmet: '#FAFAFA', vest: true, shirt: '#37474F', pants: '#263238', gloves: '#C8A26A', glasses: true }, o));
  // excavadora (tipo PC-130/210): x = izquierda de las orugas, y = suelo
  const excavadora = (x, y, o = {}) => {
    const s = o.s || 1, AM = '#F2C200', OL = '#7A5C00', bz = o.brazo || 0;
    let g = `<ellipse cx="${x + 46}" cy="${y + 1}" rx="52" ry="4" fill="#000" opacity=".18"/>`;
    g += `<rect x="${x}" y="${y - 18}" width="94" height="18" rx="9" fill="#263238"/>` + [10, 26, 42, 58, 74, 86].map(c => `<circle cx="${x + c}" cy="${y - 9}" r="5" fill="#455A64"/>`).join('') + `<rect x="${x + 6}" y="${y - 19}" width="82" height="3" fill="#37474F"/>`;
    g += `<rect x="${x + 38}" y="${y - 26}" width="20" height="8" fill="#37474F"/>`;
    g += `<path d="M${x + 2},${y - 26} h84 v-20 h-30 v-24 h-30 v24 h-14 q-10,0 -10,10z" fill="${AM}" stroke="${OL}" stroke-width="1.3"/>`;
    g += `<rect x="${x + 28}" y="${y - 68}" width="26" height="22" rx="2" fill="#B3E5FC" stroke="${OL}"/><line x1="${x + 41}" y1="${y - 68}" x2="${x + 41}" y2="${y - 46}" stroke="${OL}"/>`;
    g += `<rect x="${x + 2}" y="${y - 32}" width="24" height="5" fill="#263238"/>`;
    g += placa(x + 72, y - 37, 26, 12);
    const p0 = [x + 60, y - 44], p1 = [x + 110, y - 92 + bz * 10], p2 = [x + 140 - bz * 6, y - 48 + bz * 22];
    g += `<path d="M${p0[0]},${p0[1]} L${p1[0]},${p1[1]} L${p1[0] + 9},${p1[1] + 11} L${p0[0] + 8},${p0[1] + 9}z" fill="${AM}" stroke="${OL}" stroke-width="1.2"/>`;
    g += `<path d="M${p1[0]},${p1[1]} L${p2[0]},${p2[1]} L${p2[0] - 7},${p2[1] + 3} L${p1[0] - 1},${p1[1] + 11}z" fill="${AM}" stroke="${OL}" stroke-width="1.2"/>`;
    g += `<line x1="${p0[0] + 4}" y1="${p0[1] - 2}" x2="${p1[0] - 6}" y2="${p1[1] + 14}" stroke="#90A4AE" stroke-width="3"/>`;
    g += `<path d="M${p2[0] - 4},${p2[1]} q14,4 12,20 l-6,4 q-14,-6 -14,-18z" fill="${AM}" stroke="${OL}" stroke-width="1.2"/>` + [0, 4, 8].map(d => `<rect x="${p2[0] + 2 + d}" y="${p2[1] + 22}" width="2.5" height="4" fill="#455A64"/>`).join('');
    g = o.flip ? `<g transform="translate(${2 * x + 150},0) scale(-1,1)">${g}</g>` : g;
    return s !== 1 ? `<g transform="translate(${x},${y}) scale(${s}) translate(${-x},${-y})">${g}</g>` : g;
  };
  // triturador horizontal Bandit (tipo Beast): x = izquierda, y = suelo
  const triturador = (x, y, o = {}) => {
    const AM = '#F2B705', OL = '#8A6500';
    let g = `<ellipse cx="${x + 100}" cy="${y + 1}" rx="100" ry="4" fill="#000" opacity=".18"/>`;
    g += `<rect x="${x + 6}" y="${y - 34}" width="150" height="10" fill="#4E3B00"/>` + [x + 112, x + 134].map(c => `<circle cx="${c}" cy="${y - 12}" r="12" fill="#263238"/><circle cx="${c}" cy="${y - 12}" r="5" fill="#B0BEC5"/>`).join('');
    g += `<path d="M${x},${y - 34} h70 v-12 h-70z" fill="${AM}" stroke="${OL}"/><rect x="${x + 2}" y="${y - 44}" width="66" height="3" fill="#455A64"/>`;
    if (o.troncos !== false) g += tronco(x + 4, y - 51, 34, 6) + tronco(x + 22, y - 62, 30, 5);
    g += `<path d="M${x + 66},${y - 34} v-46 h40 l12,-14 h30 v60z" fill="${AM}" stroke="${OL}" stroke-width="1.4"/>`;
    g += `<rect x="${x + 72}" y="${y - 74}" width="44" height="18" fill="#F7C948" stroke="${OL}"/><rect x="${x + 120}" y="${y - 86}" width="24" height="44" fill="#E0A800" stroke="${OL}"/>` + [0, 1, 2, 3].map(i => `<line x1="${x + 124}" y1="${y - 80 + i * 9}" x2="${x + 140}" y2="${y - 80 + i * 9}" stroke="${OL}" stroke-width="1.5"/>`).join('');
    g += placa(x + 94, y - 65, 36, 14);
    g += `<path d="M${x + 146},${y - 40} L${x + 196},${y - 118} l9,5 L${x + 154},${y - 34}z" fill="${AM}" stroke="${OL}" stroke-width="1.2"/>` + [0, 1, 2, 3].map(i => `<line x1="${x + 154 + i * 11}" y1="${y - 44 - i * 17}" x2="${x + 161 + i * 11}" y2="${y - 40 - i * 17}" stroke="${OL}"/>`).join('');
    if (o.on !== false) g += `<g class="an-flash">${chips(x + 205, y - 110, 12)}</g>` + pila(x + 182, y, 70, 30);
    if (o.on !== false) g += `<g opacity=".35">${humo(x + 80, y - 92)}</g>`;
    if (o.estop) g += `<rect x="${x + 54}" y="${y - 30}" width="12" height="12" rx="2" fill="#FFC20E" stroke="#263238"/><g class="an-pulse"><circle cx="${x + 60}" cy="${y - 24}" r="4.5" fill="#D50000"/></g>`;
    return g;
  };
  // astillador de tambor sobre remolque (tipo Bandit 2680 / 1425)
  const astillador = (x, y, o = {}) => {
    const AM = '#F2B705', OL = '#8A6500';
    let g = `<ellipse cx="${x + 70}" cy="${y + 1}" rx="76" ry="4" fill="#000" opacity=".18"/>`;
    g += `<rect x="${x - 20}" y="${y - 26}" width="40" height="4" fill="#455A64"/><rect x="${x - 26}" y="${y - 30}" width="8" height="8" rx="2" fill="#263238"/>`;
    g += `<circle cx="${x + 76}" cy="${y - 13}" r="13" fill="#263238"/><circle cx="${x + 76}" cy="${y - 13}" r="5" fill="#B0BEC5"/>`;
    g += `<path d="M${x + 14},${y - 26} v-30 l-14,-16 h40 l6,10 h70 v36z" fill="${AM}" stroke="${OL}" stroke-width="1.4"/>`;
    g += `<rect x="${x + 2}" y="${y - 70}" width="34" height="5" fill="#455A64"/><rect x="${x + 6}" y="${y - 62}" width="28" height="22" fill="#37474F" opacity=".85"/>`;
    g += `<rect x="${x + 60}" y="${y - 52}" width="40" height="20" fill="#F7C948" stroke="${OL}"/>` + placa(x + 80, y - 42, 30, 12);
    g += `<path d="M${x + 104},${y - 56} q6,-40 34,-46 l4,8 q-22,6 -28,40z" fill="${AM}" stroke="${OL}" stroke-width="1.2"/>`;
    if (o.on !== false) g += `<g class="an-flash">${chips(x + 150, y - 98, 10)}</g>`;
    if (o.rama) g += tronco(x - 30, y - 52, 36, 4);
    return g;
  };
  // triturador Arjes Impaktor sobre orugas (naranjo)
  const arjes = (x, y, o = {}) => {
    const NA = '#F05A1A', OL = '#8A2E00';
    let g = `<ellipse cx="${x + 80}" cy="${y + 1}" rx="84" ry="4" fill="#000" opacity=".18"/>`;
    g += `<rect x="${x + 20}" y="${y - 20}" width="120" height="20" rx="10" fill="#212121"/>` + [32, 52, 72, 92, 112, 128].map(c => `<circle cx="${x + c}" cy="${y - 10}" r="5.5" fill="#424242"/>`).join('');
    g += `<path d="M${x + 14},${y - 22} l-10,-46 h44 l14,20 h72 v26z" fill="${NA}" stroke="${OL}" stroke-width="1.4"/>`;
    g += `<path d="M${x + 4},${y - 68} l-8,-10 h58 l2,10z" fill="#263238"/><rect x="${x + 70}" y="${y - 58}" width="54" height="30" fill="${NA}" stroke="${OL}"/>`;
    g += placa(x + 97, y - 43, 34, 14);
    g += `<path d="M${x + 134},${y - 26} L${x + 178},${y - 46} l3,7 L${x + 136},${y - 18}z" fill="#37474F"/>`;
    if (o.on !== false) g += `<g class="an-flash">${chips(x + 186, y - 40, 9)}</g>` + pila(x + 168, y, 56, 22);
    return g;
  };
  // tracto (Volvo FH / Freightliner) visto de lado, mirando a la derecha: x = parte trasera del chasis
  const tracto = (x, y, c = '#ECEFF1') => {
    let g = `<rect x="${x}" y="${y - 30}" width="74" height="9" fill="#263238"/>`;
    g += `<path d="M${x + 30},${y - 26} V${y - 92} q0,-6 6,-8 H${x + 66} q8,1 10,8 L${x + 80},${y - 82} V${y - 30} z" fill="${c}" stroke="#455A64" stroke-width="1.4"/>`;
    g += `<path d="M${x + 40},${y - 86} H${x + 70} V${y - 66} H${x + 40}z" fill="#B3E5FC" stroke="#455A64"/><rect x="${x + 74}" y="${y - 84}" width="6" height="18" fill="#81D4FA"/>`;
    g += `<rect x="${x + 30}" y="${y - 54}" width="50" height="7" fill="#2E7D32"/>` + placa(x + 55, y - 40, 28, 11);
    g += `<rect x="${x + 76}" y="${y - 40}" width="6" height="6" fill="#FFF59D" stroke="#F9A825"/>`;
    g += [x + 14, x + 64].map(c => `<circle cx="${c}" cy="${y - 12}" r="12" fill="#263238"/><circle cx="${c}" cy="${y - 12}" r="5" fill="#B0BEC5"/>`).join('');
    return g;
  };
  // cama baja con o sin máquina; o.rampa = rampas abajo; o.cadenas = amarrada
  const camaBaja = (x, y, o = {}) => {
    let g = `<ellipse cx="${x + 140}" cy="${y + 1}" rx="146" ry="4" fill="#000" opacity=".18"/>`;
    g += `<rect x="${x + 6}" y="${y - 30}" width="184" height="9" fill="#37474F"/><path d="M${x + 190},${y - 30} l14,-16 h34 v9 h-28 l-12,16z" fill="#37474F"/>`;
    g += `<rect x="${x + 6}" y="${y - 34}" width="184" height="5" fill="#FFC20E"/>` + [...Array(15)].map((_, i) => `<rect x="${x + 8 + i * 12}" y="${y - 34}" width="6" height="5" fill="#D7262B"/>`).join('');
    g += [x + 20, x + 44, x + 68].map(c => `<circle cx="${c}" cy="${y - 11}" r="11" fill="#263238"/><circle cx="${c}" cy="${y - 11}" r="4.5" fill="#B0BEC5"/>`).join('');
    g += o.rampa ? `<path d="M${x + 6},${y - 30} L${x - 30},${y} h8 L${x + 10},${y - 28}z" fill="#546E7A"/>` : `<path d="M${x + 6},${y - 30} l-6,-34 h8 l6,32z" fill="#546E7A"/>`;
    if (o.maquina) g += excavadora(x + 40, y - 34, { s: .78, brazo: o.brazo || 1 });
    if (o.cadenas) g += [[x + 34, x + 20], [x + 112, x + 128]].map(([a, b]) => `<line x1="${a}" y1="${y - 46}" x2="${b}" y2="${y - 31}" stroke="#90A4AE" stroke-width="2.5" stroke-dasharray="3 2"/>`).join('');
    if (o.bandera) g += `<rect x="${x - 2}" y="${y - 70}" width="2" height="30" fill="#5D4037"/><path d="M${x},${y - 70} h14 v10 h-14z" fill="#D7262B"/>`;
    g += tracto(x + 200, y);
    return o.s ? `<g transform="translate(${x},${y}) scale(${o.s}) translate(${-x},${-y})">${g}</g>` : g;
  };
  // camión con semirremolque de piso caminante (batea cerrada amarilla con nervios)
  const pisoCaminante = (x, y, o = {}) => {
    let g = `<ellipse cx="${x + 140}" cy="${y + 1}" rx="146" ry="4" fill="#000" opacity=".18"/>`;
    g += `<rect x="${x}" y="${y - 108}" width="190" height="76" fill="#F2B705" stroke="#B88A00" stroke-width="1.5"/>` + [...Array(19)].map((_, i) => `<rect x="${x + 4 + i * 10}" y="${y - 106}" width="2.5" height="72" fill="#E0E0E0"/>`).join('');
    g += `<rect x="${x}" y="${y - 34}" width="190" height="3" fill="#D7262B"/><rect x="${x + 8}" y="${y - 31}" width="182" height="8" fill="#B88A00"/>`;
    g += placa(x + 95, y - 72, 70, 30);
    g += [x + 20, x + 44, x + 150].map(c => `<circle cx="${c}" cy="${y - 11}" r="11" fill="#263238"/><circle cx="${c}" cy="${y - 11}" r="4.5" fill="#B0BEC5"/>`).join('');
    if (o.abierta) g += `<rect x="${x - 6}" y="${y - 108}" width="6" height="76" fill="#B88A00"/>` + `<g class="an-flash">${chips(x - 12, y - 38, 14)}</g>` + pila(x - 70, y, 66, 26);
    if (o.lona) g += `<path d="M${x},${y - 112} h190 v6 h-190z" fill="#2E7D32"/>`;
    return g + tracto(x + 196, y);
  };
  // soldador con careta, chaqueta de cuero y arco
  const soldador = (x, y, o = {}) => {
    let g = W(x, y, { pose: 'bend', helmet: false, shirt: '#8D4E2A', pants: '#37474F', gloves: '#A1887F', flip: !!o.flip });
    const hx = o.flip ? x - 14 : x + 14;
    g += `<path d="M${hx - 10},${y - 64} h20 v22 q-10,6 -20,0z" fill="#263238" stroke="#000"/><rect x="${hx - 6}" y="${y - 58}" width="12" height="6" fill="#4FC3F7" opacity=".8"/>`;
    if (o.arco !== false) { const ax = o.flip ? x - 30 : x + 30; g += `<g class="an-flash"><circle cx="${ax}" cy="${y - 22}" r="7" fill="#E1F5FE"/><circle cx="${ax}" cy="${y - 22}" r="13" fill="#81D4FA" opacity=".45"/>${[0, 1, 2, 3, 4, 5].map(i => `<line x1="${ax}" y1="${y - 22}" x2="${n1(ax + Math.cos(i) * 16)}" y2="${n1(y - 22 + Math.sin(i) * 10)}" stroke="#FFB300" stroke-width="1.4"/>`).join('')}</g>`; }
    return g;
  };
  const mesa = (x, y, w = 70) => `<rect x="${x}" y="${y - 30}" width="${w}" height="6" fill="#607D8B"/><rect x="${x + 4}" y="${y - 24}" width="5" height="24" fill="#455A64"/><rect x="${x + w - 9}" y="${y - 24}" width="5" height="24" fill="#455A64"/>`;
  const biombo = (x, y) => `<rect x="${x}" y="${y - 60}" width="40" height="60" fill="#C62828" opacity=".85" stroke="#8E0000"/><rect x="${x + 2}" y="${y - 2}" width="4" height="4" fill="#263238"/>`;
  const cilindros = (x, y) => `<rect x="${x}" y="${y - 50}" width="12" height="50" rx="5" fill="#2E7D32"/><rect x="${x + 16}" y="${y - 50}" width="12" height="50" rx="5" fill="#E53935"/><rect x="${x - 2}" y="${y - 34}" width="34" height="3" fill="#263238"/>`;
  const gata = (x, y) => `<rect x="${x}" y="${y - 10}" width="26" height="10" fill="#D32F2F"/><rect x="${x + 10}" y="${y - 28}" width="6" height="18" fill="#9E9E9E"/>`;
  const caballete = (x, y) => `<path d="M${x},${y} l8,-26 h10 l8,26" stroke="#F57F17" stroke-width="4" fill="none"/>`;
  const candado = (x, y) => `<rect x="${x - 7}" y="${y - 6}" width="14" height="12" rx="2" fill="#D32F2F"/><path d="M${x - 4},${y - 6} v-5 a4,4 0 0 1 8,0 v5" stroke="#455A64" stroke-width="2.4" fill="none"/>`;
  const tarjeta = (x, y) => `<rect x="${x}" y="${y}" width="16" height="22" rx="2" fill="#FFEB3B" stroke="#F57F17"/><text x="${x + 8}" y="${y + 14}" font-size="8" font-weight="bold" text-anchor="middle" fill="#B71C1C" font-family="Arial">NO</text>`;
  const ZGS = {
    zg_faena: () => SV(fondo() + triturador(10, 170, { troncos: true }) + excavadora(168, 168, { flip: true, s: .9 }) + operario(150, 186, { pose: 'stop' })),
    zg_trit: () => SV(fondo() + triturador(30, 168, { estop: true }) + zona(20, 178, 200, '#F9A825') + operario(286, 186, { pose: 'point', flip: true, muffs: true })),
    zg_trit_mal: () => SV(fondo() + triturador(30, 168) + operario(48, 150, { pose: 'c4reach', flip: false }) + no(296, 22) + txt(160, 194, 'Nadie en la mesa de alimentación con el equipo en marcha', 10, '#C62828')),
    zg_trit_ok: () => SV(fondo() + triturador(30, 168, { estop: true }) + excavadora(-6, 168, { s: .6, brazo: 1 }) + operario(290, 186, { pose: 'stand', muffs: true }) + ok(296, 22) + txt(160, 194, 'Se alimenta con la excavadora, a distancia', 10, '#2E7D32')),
    zg_trit_bloqueo: () => SV(fondo() + triturador(20, 168, { on: false }) + candado(70, 132) + tarjeta(78, 136) + operario(250, 186, { pose: 'point', flip: true }) + pill(160, 26, 'Detenido · llave fuera · bloqueado', '#1565C0')),
    zg_trit_proyeccion: () => SV(fondo() + triturador(20, 168) + `<g class="an-flash">${[0, 1, 2, 3, 4].map(i => `<path d="M${150 + i * 6},${70 + i * 4} l${20 + i * 8},${-6 + i * 3}" stroke="#795548" stroke-width="3"/>`).join('')}</g>` + zona(170, 178, 120) + operario(296, 186, { pose: 'stop', flip: true, muffs: true }) + pill(225, 30, 'Zona de exclusión: nadie adentro', '#D7262B', 10)),
    zg_astillador: () => SV(fondo() + astillador(70, 168, { rama: true }) + operario(20, 186, { pose: 'carry', muffs: true }) + pill(160, 26, 'Ramas por el costado, nunca de frente', '#2E7D32', 10)),
    zg_astill_mal: () => SV(fondo() + astillador(110, 168) + operario(98, 162, { pose: 'c4reach' }) + no(296, 22) + txt(160, 194, 'Nunca empujes con la mano ni el pie', 11, '#C62828')),
    zg_astill_ok: () => SV(fondo() + astillador(110, 168, { rama: true }) + operario(56, 186, { pose: 'point', muffs: true }) + ok(296, 22) + txt(160, 194, 'Suelta la rama y aléjate de la boca', 11, '#2E7D32')),
    zg_arjes: () => SV(fondo() + arjes(40, 170) + operario(280, 186, { pose: 'point', flip: true, muffs: true }) + zona(20, 180, 220, '#F9A825')),
    zg_arjes_ok: () => SV(fondo() + arjes(40, 170) + excavadora(-10, 168, { s: .55, brazo: 1 }) + operario(286, 186, { pose: 'stand', muffs: true }) + ok(296, 22)),
    zg_exc: () => SV(fondo() + excavadora(60, 172) + operario(270, 186, { pose: 'stop', flip: true }) + `<circle cx="134" cy="128" r="96" fill="none" stroke="#D7262B" stroke-width="2.5" stroke-dasharray="8 6"/>` + pill(160, 26, 'Radio de giro: nadie adentro', '#D7262B')),
    zg_exc_mal: () => SV(fondo() + excavadora(60, 172) + operario(118, 186, { pose: 'walk' }) + no(296, 22) + txt(160, 196, 'Nunca dentro del radio de giro', 11, '#C62828')),
    zg_exc_ok: () => SV(fondo() + excavadora(40, 172) + operario(282, 186, { pose: 'stop', flip: true }) + `<path d="M210,70 q30,-20 60,0" stroke="#1565C0" stroke-width="2" fill="none" stroke-dasharray="4 3"/>` + ok(24, 22) + txt(160, 196, 'Contacto visual y señal antes de acercarse', 11, '#2E7D32')),
    zg_exc_pendiente: () => SV(`<rect width="320" height="200" fill="#CDE8F7"/><path d="M0,190 L320,110 V200 H0Z" fill="#B08B60"/><g transform="rotate(-14 150 150)">${excavadora(90, 168, { brazo: 1 })}</g>` + pill(160, 26, 'Pendientes: de frente, balde bajo', '#1565C0')),
    zg_exc_subir: () => SV(fondo() + excavadora(40, 172) + operario(68, 168, { pose: 'c4climb' }) + pill(160, 26, '3 puntos de apoyo al subir y bajar', '#2E7D32')),
    zg_cama: () => SV(fondo() + camaBaja(14, 182, { maquina: true, cadenas: true }) + pill(160, 26, 'Máquina amarrada con cadenas y tensores', '#2E7D32', 10)),
    zg_cama_rampa: () => SV(fondo() + camaBaja(84, 182, { rampa: true, s: .74 }) + excavadora(0, 190, { s: .5, brazo: 1 }) + operario(140, 196, { pose: 'cc1sign', flip: true }) + pill(170, 26, 'Señalero a la vista, nadie al costado', '#1565C0', 10)),
    zg_cama_mal: () => SV(fondo() + camaBaja(14, 182, { maquina: true }) + no(296, 22) + txt(160, 196, 'Sin amarre: la máquina se puede desplazar', 11, '#C62828')),
    zg_cama_ruta: () => SV(fondo() + camaBaja(14, 182, { maquina: true, cadenas: true, bandera: true }) + pill(160, 26, 'Carga sobredimensionada: señalizada', '#F57F17', 10)),
    zg_piso: () => SV(fondo() + pisoCaminante(14, 182, { lona: true }) + pill(160, 24, 'Piso caminante: batea cerrada y encarpada', '#2E7D32', 10)),
    zg_piso_descarga: () => SV(fondo() + pisoCaminante(90, 182, { abierta: true }) + zona(10, 186, 70) + pill(160, 24, 'Descarga: nadie detrás de la batea', '#D7262B', 10)),
    zg_piso_mal: () => SV(fondo() + pisoCaminante(30, 182) + operario(118, 74, { pose: 'c4climb', s: .7 }) + no(296, 22) + txt(160, 196, 'Nunca entres a la batea con el piso andando', 10, '#C62828')),
    zg_piso_lona: () => SV(fondo() + pisoCaminante(30, 182, { lona: true }) + operario(20, 186, { pose: 'point' }) + pill(170, 24, 'Encarpado desde el suelo o plataforma', '#1565C0', 10)),
    zg_taller: () => SV(tallerFondo() + mesa(150, 180, 90) + soldador(200, 180) + biombo(250, 180) + extintor(30, 180) + cilindros(70, 180)),
    zg_sold_ok: () => SV(tallerFondo() + mesa(130, 180, 90) + soldador(180, 180) + biombo(232, 180) + extintor(30, 180) + ok(296, 22) + txt(120, 196, 'Careta, cuero, biombo y extintor a mano', 11, '#2E7D32')),
    zg_sold_mal: () => SV(tallerFondo() + mesa(130, 180, 90) + W(180, 180, { pose: 'bend', helmet: false, shirt: '#8D4E2A' }) + `<g class="an-flash"><circle cx="210" cy="158" r="8" fill="#E1F5FE"/></g>` + `<rect x="40" y="150" width="30" height="30" fill="#795548"/>` + llama(56, 150, .8) + no(296, 22) + txt(150, 196, 'Sin careta y con combustibles cerca', 11, '#C62828')),
    zg_mantencion: () => SV(tallerFondo() + excavadora(20, 180, { brazo: 1 }) + caballete(150, 180) + gata(176, 180) + candado(64, 140) + tarjeta(72, 144) + W(250, 180, { pose: 'point', flip: true, helmet: '#FAFAFA', shirt: '#1565C0' }) + pill(160, 26, 'Detenida, bloqueada y apoyada', '#1565C0')),
    zg_mant_mal: () => SV(tallerFondo() + excavadora(20, 180, { brazo: 0 }) + W(120, 178, { pose: 'squat', helmet: '#FAFAFA', shirt: '#1565C0' }) + no(296, 22) + txt(160, 196, 'Nunca bajo un balde o carga levantada', 11, '#C62828')),
    zg_incendio: () => SV(fondo() + llama(150, 160, 1.4) + llama(176, 162, 1.1) + humo(150, 110) + humo(190, 100) + operario(60, 186, { pose: 'stop' }) + extintor(90, 186) + pill(160, 24, 'Amago: avisa, aléjate y usa el extintor', '#D7262B', 10)),
    zg_incendio_prev: () => SV(fondo() + triturador(20, 168, { on: false }) + extintor(260, 186) + operario(290, 186, { pose: 'point', flip: true }) + pill(160, 24, 'Equipo limpio de astillas y polvo', '#2E7D32', 10)),
    zg_fatiga: () => SV(fondo() + pisoCaminante(14, 182) + `<text x="250" y="70" font-size="20" fill="#1565C0" font-family="Arial">Z z z</text>` + pill(160, 24, 'Con sueño: detente en un lugar seguro', '#1565C0', 10))
  };
  Object.keys(ZGS).forEach(k => { if (typeof S[k] !== 'function') S[k] = ZGS[k]; });
  // ---------- Charlas propias de ZG SpA y Transportes ZG SpA (3 versiones por pregunta)
  const V = (q, o, w) => ({ q, o, a: 0, w });
  const VF = (q, v, w) => ({ q, vf: v, w });
  const Q = (s, a, b, c) => Object.assign({ s }, a, { v: [b, c] });
  const L = (s, t, x, k) => ({ s, t, x, k });
  const NUEVOS = [
    { id: 'triturador', sec: 'faena', mins: 7, title: 'Triturador horizontal Bandit: operación segura', thumb: 'zg_trit',
      learn: [
        L('zg_trit', 'El triturador', 'El triturador horizontal recibe troncos y despuntes por la <b>mesa de alimentación</b>, los muele con un rotor de martillos y bota el material por la <b>correa de descarga</b>. Tiene partes que giran a alta velocidad y puede lanzar trozos de madera lejos.', 'Rotor, mesa y descarga: tres zonas de peligro.'),
        L('zg_trit_bloqueo', 'Solo opera quien está autorizado', 'Lo opera solo personal <b>capacitado y autorizado</b> por la empresa, que conoce el manual del fabricante. Antes de partir: check-list, resguardos puestos, paradas de emergencia probadas y zona despejada.', 'Sin autorización, no se toca.'),
        L('zg_trit_ok', 'Alimentación a distancia', 'El triturador se alimenta con la <b>excavadora o cargador</b>, nunca a mano. Nadie se sube a la mesa de alimentación ni se acerca a la boca con el equipo en marcha.', 'Se alimenta con máquina, no con las manos.'),
        L('zg_trit_mal', 'Prohibido subirse a la mesa', 'Subirse a la mesa para soltar un tronco trabado es una de las causas de accidentes <b>fatales</b> en estos equipos: el rodillo de alimentación arrastra a la persona hacia el rotor. Si algo se traba: <b>detén, apaga y bloquea</b>.', 'Trabado = detener, apagar y bloquear.'),
        L('zg_trit_proyeccion', 'Zona de exclusión', 'El rotor puede lanzar trozos por la boca de alimentación y por la descarga. Se delimita una <b>zona de exclusión</b> alrededor del equipo y nadie entra mientras funciona. Mira hacia dónde apunta la descarga.', 'Nadie dentro de la zona mientras opera.'),
        L('zg_trit_bloqueo', 'Mantención y limpieza: bloqueo', 'Para limpiar, cambiar martillos o revisar: equipo <b>detenido</b>, llave fuera, <b>espera que el rotor deje de girar</b> (sigue girando varios minutos) y deja tu candado y tarjeta. Nunca abras la tapa del rotor con el motor andando.', 'El rotor sigue girando: espera y bloquea.'),
        L('zg_trit', 'Ruido y polvo', 'El triturador supera con creces los niveles de ruido permitidos: <b>protector auditivo siempre</b> cerca del equipo. El polvo de madera irrita ojos y vías respiratorias: lentes y mascarilla.', 'Fonos, lentes y mascarilla.'),
        L('zg_incendio_prev', 'Prevención de incendios', 'El polvo y las astillas acumuladas sobre el motor y el escape se pueden encender. Limpia el equipo al final de cada jornada, revisa fugas de aceite y ten el <b>extintor a mano</b>.', 'Equipo limpio y extintor cerca.'),
        L('zg_trit_ok', 'Parada de emergencia', 'Conoce dónde están las <b>paradas de emergencia</b> y el control remoto. Si ves a alguien en peligro, detén el equipo de inmediato y avisa.', 'Sabe dónde está la parada.')
      ],
      quiz: [
        Q('zg_trit_ok', V('¿Cómo se alimenta el triturador?', ['Con la excavadora o el cargador, a distancia', 'Empujando los troncos con las manos', 'Subiéndose a la mesa para acomodarlos'], 'Siempre con máquina, a distancia.'),
          V('Un tronco largo no entra bien a la mesa. ¿Qué haces?', ['Lo acomodo con la excavadora', 'Me subo a la mesa a empujarlo', 'Lo pateo para que avance'], 'Nunca se interviene a mano con el equipo andando.'),
          VF('Se puede empujar un tronco con la mano si el equipo va lento.', false, 'Falso: nunca a mano.')),
        Q('zg_trit_mal', V('Se traba un tronco en el rodillo de alimentación. ¿Qué haces primero?', ['Detengo, apago, saco la llave y bloqueo', 'Me subo a la mesa y lo suelto rápido', 'Le pego con un palo con el equipo andando'], 'Detener y bloquear antes de cualquier intervención.'),
          V('¿Por qué está prohibido subirse a la mesa de alimentación?', ['Porque el rodillo puede arrastrar a la persona hacia el rotor', 'Porque se ensucia la mesa', 'Porque se raya la pintura'], 'El arrastre al rotor es fatal.'),
          VF('Subirse a la mesa de alimentación con el equipo encendido es una falta gravísima.', true, 'Verdadero: puede ser fatal.')),
        Q('zg_trit_proyeccion', V('¿Para qué es la zona de exclusión del triturador?', ['Para que nadie sea alcanzado por trozos lanzados', 'Para estacionar camionetas', 'Para guardar herramientas'], 'El rotor puede lanzar trozos lejos.'),
          V('El triturador está funcionando. ¿Dónde puedes estar?', ['Fuera de la zona de exclusión', 'Junto a la boca de descarga', 'Frente a la mesa de alimentación'], 'Fuera de la zona mientras opera.'),
          V('¿Hacia dónde es más peligroso pararse con el equipo andando?', ['Frente a la boca de alimentación y en la línea de la descarga', 'Detrás de la excavadora a distancia', 'En la caseta de faena'], 'Por ahí salen los trozos lanzados.')),
        Q('zg_trit_bloqueo', V('Vas a cambiar martillos del rotor. ¿Qué es lo correcto?', ['Detener, sacar la llave, esperar que el rotor pare y bloquear', 'Abrir la tapa apenas se apaga el motor', 'Hacerlo con el motor en ralentí'], 'El rotor sigue girando varios minutos.'),
          V('¿Por qué hay que esperar antes de abrir la tapa del rotor?', ['Porque el rotor sigue girando por inercia', 'Porque hay que dejar enfriar el café', 'No hay que esperar'], 'La inercia mantiene el rotor girando.'),
          V('¿Qué se deja puesto mientras haces mantención?', ['Candado y tarjeta de bloqueo personal', 'Nada', 'Una nota en el parabrisas'], 'Bloqueo con candado y tarjeta.')),
        Q('zg_trit', V('¿Qué EPP es obligatorio cerca del triturador?', ['Protector auditivo, lentes, mascarilla, casco y zapatos de seguridad', 'Solo gorro', 'Ninguno si estoy lejos'], 'Ruido, polvo y proyecciones.'),
          V('¿Por qué se usa protector auditivo junto al triturador?', ['Porque el ruido supera los niveles permitidos y daña el oído', 'Para no escuchar a la jefatura', 'Por el frío'], 'El ruido daña la audición en forma permanente.'),
          VF('El polvo de madera puede irritar los ojos y las vías respiratorias.', true, 'Verdadero: lentes y mascarilla.')),
        Q('zg_trit_bloqueo', V('¿Quién puede operar el triturador?', ['Solo personal capacitado y autorizado', 'Cualquiera que sepa manejar', 'El que llegue primero'], 'Solo autorizados.'),
          V('Antes de partir el triturador, ¿qué se revisa?', ['Check-list, resguardos, paradas de emergencia y zona despejada', 'Solo el combustible', 'Nada, se parte y listo'], 'Revisión antes de operar.'),
          VF('Un compañero sin autorización puede operar el triturador si el operador lo supervisa de lejos.', false, 'Falso: solo autorizados.')),
        Q('zg_incendio_prev', V('¿Por qué se limpian las astillas acumuladas sobre el motor?', ['Porque se pueden encender con el calor del escape', 'Para que se vea bonito', 'No es necesario'], 'Polvo y astillas + calor = incendio.'),
          V('¿Qué debe haber siempre cerca del triturador?', ['Un extintor cargado y accesible', 'Un bidón de bencina abierto', 'Ropa colgada'], 'Extintor a mano.'),
          V('Ves una fuga de aceite en el triturador. ¿Qué haces?', ['Aviso de inmediato para que se repare', 'Sigo trabajando', 'La tapo con aserrín y sigo'], 'Las fugas alimentan incendios.')),
        Q('zg_trit_ok', V('Ves a una persona entrando a la zona del triturador en marcha. ¿Qué haces?', ['Uso la parada de emergencia o pido detener el equipo y aviso', 'Nada', 'Le grito y sigo trabajando'], 'Detener primero.'),
          V('¿Para qué sirve la parada de emergencia?', ['Para detener el equipo de inmediato ante un peligro', 'Para encenderlo', 'Para tocar la bocina'], 'Detención inmediata.'),
          VF('Debo saber dónde están las paradas de emergencia del equipo.', true, 'Verdadero.'))
      ] },
    { id: 'astillador', sec: 'faena', mins: 6, title: 'Astillador de ramas Bandit: alimentación segura', thumb: 'zg_astillador',
      learn: [
        L('zg_astillador', 'El astillador', 'El astillador tiene un <b>tambor o disco con cuchillos</b> y rodillos que tiran la rama hacia adentro con mucha fuerza. Lo que entra en la boca no sale: ni una manga, ni un guante.', 'Lo que los rodillos atrapan no lo sueltan.'),
        L('zg_astill_ok', 'Alimenta por el costado', 'Párate <b>al costado</b> de la boca, no de frente. Introduce la rama por la punta gruesa, <b>suéltala</b> apenas los rodillos la tomen y aléjate.', 'Al costado, suelta y aléjate.'),
        L('zg_astill_mal', 'Nunca empujes con la mano ni el pie', 'Las ramas cortas se empujan con <b>otra rama más larga</b>, nunca con la mano, el pie o una pala. No te subas al equipo para alimentar.', 'Rama corta: empuja con otra rama.'),
        L('zg_astillador', 'Ropa ajustada', 'Nada suelto: <b>ropa ajustada</b>, sin bufandas, cordones ni chaquetas abiertas. Guantes ajustados con puño, sin flecos.', 'Nada que se pueda enganchar.'),
        L('zg_trit_ok', 'Barra de parada', 'Antes de partir, prueba la <b>barra de parada</b> que rodea la boca. Si algo se engancha, empújala o usa la parada de emergencia.', 'Prueba la barra de parada cada día.'),
        L('zg_trit_bloqueo', 'Atascos y cambio de cuchillos', 'Para destrabar o cambiar cuchillos: <b>apaga, saca la llave, espera que el tambor pare y bloquea</b>. Los cuchillos se manipulan con guantes anticorte.', 'Detenido y bloqueado antes de meter las manos.'),
        L('zg_astillador', 'Descarga y entorno', 'El chorro de astillas sale con fuerza: nunca lo apuntes a personas, caminos ni vehículos. Mantén el área sin piedras ni metales que dañen los cuchillos y salgan lanzados.', 'La descarga apunta a un lugar seguro.'),
        L('zg_trit', 'EPP del astillador', 'Casco con <b>visor o lentes</b>, protector auditivo, guantes ajustados, ropa sin partes sueltas, zapatos de seguridad y chaleco reflectante.', 'EPP completo siempre.')
      ],
      quiz: [
        Q('zg_astill_ok', V('¿Dónde te paras para alimentar el astillador?', ['Al costado de la boca', 'Justo frente a la boca', 'Sobre el equipo'], 'Al costado, fuera de la línea.'),
          V('Los rodillos tomaron la rama. ¿Qué haces?', ['La suelto y me alejo', 'La sigo empujando con la mano', 'La sujeto fuerte para frenarla'], 'Soltar y alejarse.'),
          VF('Se debe alimentar el astillador parado de frente a la boca.', false, 'Falso: al costado.')),
        Q('zg_astill_mal', V('Una rama corta queda en la boca. ¿Cómo la empujas?', ['Con otra rama más larga', 'Con la mano', 'Con el pie'], 'Nunca con el cuerpo.'),
          V('¿Por qué no se empuja con el pie?', ['Porque los rodillos pueden atrapar la pierna', 'Porque se ensucia el zapato', 'Porque es lento'], 'Atrapamiento grave.'),
          VF('Está permitido usar una pala para empujar ramas dentro del astillador.', false, 'Falso: se usa otra rama.')),
        Q('zg_astillador', V('¿Qué ropa se usa para operar el astillador?', ['Ropa ajustada, sin cordones ni partes sueltas', 'Chaqueta abierta y bufanda', 'Cualquier ropa'], 'Nada que se enganche.'),
          V('¿Qué guantes son adecuados?', ['Ajustados con puño, sin flecos', 'Grandes y sueltos', 'Ninguno'], 'Guantes que no se enganchen.'),
          V('¿Qué pasa si una manga se engancha en la rama?', ['Los rodillos pueden arrastrar el brazo', 'Nada', 'Se rompe la rama'], 'Lo que entra no sale.')),
        Q('zg_trit_ok', V('¿Cuándo se prueba la barra de parada?', ['Antes de partir cada jornada', 'Una vez al año', 'Nunca'], 'Prueba diaria.'),
          V('Algo se engancha en la boca del astillador. ¿Qué usas?', ['La barra de parada o la parada de emergencia', 'La bocina', 'El acelerador'], 'Detención inmediata.'),
          VF('La barra de parada detiene los rodillos de alimentación.', true, 'Verdadero.')),
        Q('zg_trit_bloqueo', V('¿Qué haces antes de destrabar el astillador?', ['Apagar, sacar la llave, esperar que el tambor pare y bloquear', 'Meter la mano con cuidado', 'Bajar las revoluciones'], 'Bloqueo antes de intervenir.'),
          V('¿Con qué se manipulan los cuchillos del tambor?', ['Con guantes anticorte y el equipo bloqueado', 'Con las manos desnudas', 'Con el equipo en marcha'], 'Cuchillos muy afilados.'),
          V('¿Por qué se espera antes de abrir el tambor?', ['Porque sigue girando por inercia', 'Para descansar', 'No se espera'], 'Inercia del tambor.')),
        Q('zg_astillador', V('¿Hacia dónde debe apuntar la descarga de astillas?', ['A un lugar sin personas, caminos ni vehículos', 'Hacia la caseta', 'Hacia el camino'], 'Descarga segura.'),
          V('¿Por qué se retiran piedras y metales del material?', ['Porque dañan los cuchillos y pueden salir lanzados', 'Por estética', 'No importa'], 'Proyecciones peligrosas.'),
          VF('El chorro de astillas puede lesionar a una persona.', true, 'Verdadero.')),
        Q('zg_trit', V('¿Qué EPP usas en el astillador?', ['Casco con visor o lentes, fonos, guantes ajustados, zapatos y chaleco', 'Solo zapatos', 'Ninguno'], 'EPP completo.'),
          V('¿Por qué se usan lentes o visor?', ['Por las astillas y partículas proyectadas', 'Por el sol solamente', 'Por moda'], 'Proyección de partículas.'),
          V('¿Qué protege del ruido del astillador?', ['El protector auditivo', 'El casco solo', 'Los guantes'], 'Fonos o tapones.')),
        Q('zg_astill_ok', V('¿Por qué extremo se introduce la rama?', ['Por la punta gruesa', 'Por las hojas', 'Da lo mismo'], 'La punta gruesa entra primero.'),
          V('¿Te puedes subir al astillador para alimentarlo mejor?', ['No, nunca', 'Sí, si voy con cuidado', 'Sí, si está lento'], 'Nunca subirse.'),
          VF('Después de soltar la rama, hay que alejarse de la boca.', true, 'Verdadero.'))
      ] },
    { id: 'arjes', sec: 'faena', mins: 5, title: 'Triturador Arjes Impaktor sobre orugas', thumb: 'zg_arjes',
      learn: [
        L('zg_arjes', 'El Arjes Impaktor', 'Es un triturador sobre <b>orugas</b> que se traslada por sí mismo y se opera con <b>control remoto</b>. Tiene una tolva de alimentación, un rotor con martillos y una correa de descarga.', 'Se mueve solo y se opera a distancia.'),
        L('zg_arjes_ok', 'Alimentación con máquina', 'La tolva se alimenta con <b>excavadora</b>. Nadie se sube a la tolva ni mete las manos para acomodar material.', 'Tolva solo con máquina.'),
        L('zg_arjes', 'Traslado sobre orugas', 'Al trasladarlo con el control remoto, camina <b>al costado y a distancia</b>, nunca delante ni detrás. Revisa pendientes, terreno blando y que no haya personas en el recorrido.', 'Nunca delante ni detrás al trasladarlo.'),
        L('zg_trit_proyeccion', 'Zona de exclusión', 'Igual que el triturador grande, puede lanzar trozos. Delimita la zona y nadie entra mientras opera.', 'Zona delimitada y despejada.'),
        L('zg_trit_bloqueo', 'Bloqueo para mantención', 'Detén, apaga, saca la llave y guarda el control remoto. Espera que el rotor pare y bloquea antes de limpiar o revisar.', 'Control remoto guardado y equipo bloqueado.'),
        L('zg_trit', 'EPP y salud', 'Protector auditivo, lentes, mascarilla, casco, guantes y zapatos de seguridad. Haz pausas: el ruido y la vibración cansan.', 'Fonos, lentes y mascarilla.'),
        L('zg_incendio_prev', 'Limpieza y fuego', 'Retira astillas y polvo acumulados cerca del motor y el escape. Extintor cargado siempre a mano.', 'Limpio y con extintor.')
      ],
      quiz: [
        Q('zg_arjes', V('¿Cómo se opera el Arjes Impaktor?', ['Con control remoto, a distancia', 'Subido a la tolva', 'Empujándolo'], 'Control remoto.'),
          V('Al trasladarlo sobre orugas, ¿dónde caminas?', ['Al costado y a distancia', 'Delante del equipo', 'Detrás, pegado al equipo'], 'Nunca delante ni detrás.'),
          VF('El Arjes se puede trasladar sobre sus orugas con personas en el recorrido.', false, 'Falso: recorrido despejado.')),
        Q('zg_arjes_ok', V('¿Con qué se alimenta la tolva?', ['Con la excavadora', 'Con las manos', 'Subiéndose a la tolva'], 'Siempre con máquina.'),
          V('Material se queda atascado en la tolva. ¿Qué haces?', ['Detengo, bloqueo y lo saco con el equipo detenido', 'Me subo a empujarlo', 'Lo empujo con la mano'], 'Bloqueo primero.'),
          VF('Está prohibido subirse a la tolva con el equipo andando.', true, 'Verdadero.')),
        Q('zg_trit_bloqueo', V('Antes de limpiar el Arjes, ¿qué haces con el control remoto?', ['Lo guardo yo y bloqueo el equipo', 'Lo dejo sobre la máquina', 'Se lo paso a un compañero'], 'Que nadie lo pueda partir.'),
          V('¿Por qué se espera después de apagar?', ['Porque el rotor sigue girando', 'Por costumbre', 'No se espera'], 'Inercia.'),
          V('¿Qué se usa para el bloqueo personal?', ['Candado y tarjeta', 'Una cuerda', 'Nada'], 'Candado y tarjeta.')),
        Q('zg_trit_proyeccion', V('¿Quién puede estar dentro de la zona de exclusión con el equipo andando?', ['Nadie', 'Cualquiera con casco', 'El ayudante'], 'Nadie adentro.'),
          V('¿Por qué existe la zona de exclusión?', ['Porque el equipo puede lanzar trozos', 'Por el polvo solamente', 'Por orden'], 'Proyecciones.'),
          VF('La zona de exclusión se delimita antes de partir.', true, 'Verdadero.')),
        Q('zg_trit', V('¿Qué EPP es obligatorio junto al Arjes?', ['Fonos, lentes, mascarilla, casco, guantes y zapatos', 'Solo casco', 'Nada'], 'EPP completo.'),
          V('El ruido constante te molesta. ¿Qué haces?', ['Uso siempre el protector auditivo y hago pausas', 'Me acostumbro', 'Subo la radio'], 'Proteger la audición.'),
          VF('El polvo de la trituración puede dañar los pulmones.', true, 'Verdadero: mascarilla.')),
        Q('zg_arjes', V('Antes de trasladar el equipo, ¿qué revisas?', ['Pendientes, terreno blando y que no haya personas', 'Solo la radio', 'Nada'], 'Recorrido seguro.'),
          V('¿Qué riesgo tiene trasladarlo en pendiente fuerte?', ['Volcamiento', 'Ninguno', 'Que se ensucie'], 'Riesgo de volcar.'),
          V('¿Quién puede operar el control remoto?', ['Solo el operador autorizado', 'Cualquiera', 'El que esté cerca'], 'Solo autorizados.')),
        Q('zg_incendio_prev', V('¿Qué limpias al terminar la jornada?', ['Astillas y polvo cerca del motor y el escape', 'Solo los vidrios', 'Nada'], 'Prevención de incendios.'),
          V('¿Qué debe haber a mano junto al equipo?', ['Extintor cargado', 'Bidón de combustible abierto', 'Nada'], 'Extintor.'),
          VF('Las astillas acumuladas sobre el escape pueden encenderse.', true, 'Verdadero.'))
      ] },
    { id: 'excavadora', sec: 'faena', mins: 7, title: 'Excavadora: operación y trabajo cerca de ella', thumb: 'zg_exc',
      learn: [
        L('zg_exc', 'La excavadora en faena', 'Las excavadoras alimentan el triturador, cargan camiones y mueven material. El mayor peligro es el <b>radio de giro</b>: la parte trasera gira y puede aplastar a una persona contra un tronco o un equipo.', 'Respeta el radio de giro.'),
        L('zg_exc_ok', 'Contacto visual', 'Nunca te acerques a una excavadora en operación sin <b>contacto visual</b> con el operador y su <b>señal</b> para hacerlo. El operador baja el balde al suelo y detiene el giro.', 'Mírame, espera mi señal.'),
        L('zg_exc_mal', 'Nadie dentro del radio de giro', 'Si alguien entra al radio de giro, el operador <b>detiene</b> la máquina de inmediato. Peatones fuera de la zona de trabajo y con chaleco reflectante.', 'Si entra alguien, la máquina se detiene.'),
        L('zg_exc_subir', 'Subir y bajar', 'Sube y baja <b>de frente</b>, usando pasamanos y peldaños, con <b>3 puntos de apoyo</b>. Nunca saltes desde la cabina ni subas con herramientas en la mano.', '3 puntos de apoyo, de frente.'),
        L('zg_exc_pendiente', 'Pendientes y terreno', 'En pendientes, trabaja y trasládate <b>de frente</b> a la pendiente, con el balde bajo. Evita bordes de taludes y terreno blando. Usa siempre el <b>cinturón de seguridad</b>.', 'Cinturón puesto y balde bajo.'),
        L('zg_exc', 'Check-list diario', 'Antes de partir: niveles, fugas, mangueras, orugas, alarma de retroceso, luces, espejos, extintor y cinturón. Si algo falla, no se opera y se avisa.', 'Si falla, no se opera.'),
        L('zg_mant_mal', 'Nunca bajo el balde', 'Nadie se pone <b>bajo el balde</b>, la pluma ni una carga suspendida. Para mantención, el balde se apoya en el suelo y la máquina queda bloqueada.', 'Balde al suelo y bloqueado.'),
        L('zg_exc_ok', 'Al estacionar', 'Estaciona en terreno firme y plano, <b>balde apoyado en el suelo</b>, freno puesto, motor apagado y llave fuera.', 'Balde al suelo y llave fuera.')
      ],
      quiz: [
        Q('zg_exc', V('¿Cuál es el principal peligro alrededor de una excavadora?', ['El radio de giro de la parte trasera', 'El color de la máquina', 'El ruido de la radio'], 'Aplastamiento en el giro.'),
          V('¿Qué es el radio de giro?', ['El espacio que barre la máquina al girar', 'La velocidad del motor', 'El largo del balde'], 'Zona de aplastamiento.'),
          VF('Una persona puede quedar aplastada entre la parte trasera de la excavadora y un tronco.', true, 'Verdadero.')),
        Q('zg_exc_ok', V('Necesitas acercarte a una excavadora trabajando. ¿Qué haces?', ['Busco contacto visual y espero la señal del operador', 'Me acerco por detrás', 'Le grito y paso'], 'Contacto visual y señal.'),
          V('¿Qué hace el operador antes de que te acerques?', ['Baja el balde y detiene el giro', 'Acelera', 'Sigue trabajando'], 'Máquina detenida.'),
          VF('Puedo acercarme a la excavadora sin que el operador me vea si voy rápido.', false, 'Falso: siempre contacto visual.')),
        Q('zg_exc_mal', V('Alguien entra al radio de giro. ¿Qué debe hacer el operador?', ['Detener la máquina de inmediato', 'Tocar la bocina y seguir', 'Girar más lento'], 'Detención inmediata.'),
          V('¿Qué usa siempre un peatón cerca de la maquinaria?', ['Chaleco reflectante y casco', 'Polera oscura', 'Nada'], 'Ser visible.'),
          V('¿Dónde caminan los peatones en la faena?', ['Fuera de la zona de trabajo de la máquina', 'Por detrás de la excavadora', 'Bajo la pluma'], 'Separados de la máquina.')),
        Q('zg_exc_subir', V('¿Cómo se sube a la cabina?', ['De frente, con 3 puntos de apoyo', 'De espaldas y saltando', 'Con herramientas en la mano'], '3 puntos de apoyo.'),
          V('¿Qué son los 3 puntos de apoyo?', ['Dos manos y un pie, o dos pies y una mano', 'Un pie y la cabeza', 'Solo las manos'], 'Siempre 3 apoyos.'),
          VF('Saltar desde la cabina es una causa común de lesiones.', true, 'Verdadero.')),
        Q('zg_exc_pendiente', V('¿Cómo se trabaja en pendiente?', ['De frente a la pendiente y con el balde bajo', 'De costado con el balde arriba', 'Rápido para salir luego'], 'Evita el volcamiento.'),
          V('¿Qué es obligatorio dentro de la cabina?', ['El cinturón de seguridad', 'La radio encendida', 'La puerta abierta'], 'Cinturón siempre.'),
          V('¿Qué terreno se evita con la excavadora?', ['Bordes de taludes y terreno blando', 'Terreno firme', 'Terreno plano'], 'Riesgo de volcamiento.')),
        Q('zg_exc', V('¿Qué se revisa en el check-list diario?', ['Niveles, fugas, orugas, alarma, luces, espejos, extintor y cinturón', 'Solo el combustible', 'Nada'], 'Revisión completa.'),
          V('En el check-list encuentras una manguera hidráulica dañada. ¿Qué haces?', ['No opero y aviso para que se repare', 'Opero igual', 'La amarro con alambre'], 'Si falla, no se opera.'),
          VF('Una fuga hidráulica a presión puede inyectar aceite bajo la piel.', true, 'Verdadero: no se toca con la mano.')),
        Q('zg_mant_mal', V('¿Te puedes poner bajo el balde levantado?', ['No, nunca', 'Sí, si es un momento', 'Sí, si el motor está en ralentí'], 'Nunca bajo carga.'),
          V('Para hacer mantención a la excavadora, ¿cómo queda el balde?', ['Apoyado en el suelo y la máquina bloqueada', 'Levantado', 'A media altura'], 'Balde al suelo.'),
          V('¿Qué riesgo hay bajo la pluma levantada?', ['Aplastamiento si baja', 'Ninguno', 'Que te llueva aceite'], 'Puede bajar.')),
        Q('zg_exc_ok', V('¿Cómo se estaciona la excavadora?', ['Terreno firme, balde al suelo, freno, motor apagado y llave fuera', 'En pendiente con el balde arriba', 'Con el motor andando'], 'Estacionamiento seguro.'),
          V('¿Por qué se saca la llave al estacionar?', ['Para que nadie no autorizado la ponga en marcha', 'Para no perderla', 'No hace falta'], 'Evita uso no autorizado.'),
          VF('Al estacionar, el balde se deja apoyado en el suelo.', true, 'Verdadero.'))
      ] },
    { id: 'carga_maquinaria', sec: 'faena', secs: ['faena', 'conductores'], mins: 7, title: 'Carga y descarga de maquinaria en cama baja', thumb: 'zg_cama',
      learn: [
        L('zg_cama_rampa', 'Una maniobra crítica', 'Subir o bajar una excavadora, un triturador o el Arjes de la cama baja es una de las maniobras <b>más riesgosas</b>: la máquina puede deslizarse o volcar desde las rampas.', 'Maniobra crítica: se planifica.'),
        L('zg_cama_rampa', 'Antes de cargar', 'Camión estacionado en <b>terreno firme y plano</b>, freno puesto, motor apagado y <b>cuñas</b> en las ruedas. Rampas bien apoyadas y aseguradas, limpias de barro, aceite o hielo.', 'Plano, frenado, con cuñas y rampas firmes.'),
        L('zg_cama_rampa', 'Un señalero', 'La maniobra la dirige <b>un solo señalero</b>, a la vista del operador. Nadie al costado de las rampas ni detrás de la máquina.', 'Un señalero y nadie al costado.'),
        L('zg_exc_pendiente', 'Subir lento y alineado', 'La máquina sube <b>alineada</b> con las rampas, a velocidad mínima, sin girar sobre ellas. La excavadora sube con el balde bajo, como apoyo.', 'Alineado, lento y sin girar.'),
        L('zg_cama', 'Amarre', 'Arriba: freno puesto, balde o equipo apoyado sobre la plataforma y <b>al menos 4 puntos de amarre</b> con cadenas y tensores en buen estado, en los puntos de anclaje del fabricante.', 'Mínimo 4 cadenas con tensores.'),
        L('zg_cama_mal', 'Revisar el amarre', 'Revisa cadenas y tensores antes de salir y en las detenciones del viaje. Una máquina suelta puede desplazarse en una curva o una frenada.', 'Revisar al salir y en el camino.'),
        L('zg_cama_ruta', 'Alto y ancho', 'Verifica la <b>altura total</b> con la máquina cargada (cables, puentes, ramas) y el ancho. Si es carga sobredimensionada, se señaliza y se cumplen los permisos de vialidad.', 'Conoce la altura y el ancho de tu carga.'),
        L('zg_cama_rampa', 'Descarga', 'Al descargar se repite todo: terreno firme, cuñas, rampas aseguradas, señalero y nadie al costado. Se sueltan los amarres solo cuando el operador está en la cabina listo.', 'Misma seguridad al bajar.')
      ],
      quiz: [
        Q('zg_cama_rampa', V('¿Dónde se estaciona la cama baja para cargar maquinaria?', ['En terreno firme y plano, con freno y cuñas', 'En pendiente', 'En la berma de la carretera'], 'Terreno firme y plano.'),
          V('¿Para qué se ponen cuñas en las ruedas?', ['Para que el camión no se desplace', 'Para adornar', 'Para que la máquina suba más rápido'], 'Evitan el desplazamiento.'),
          VF('Las rampas deben estar limpias de barro, aceite o hielo.', true, 'Verdadero: la máquina puede deslizarse.')),
        Q('zg_cama_rampa', V('¿Quién dirige la maniobra de carga?', ['Un solo señalero, a la vista del operador', 'Todos los presentes', 'Nadie'], 'Un solo señalero.'),
          V('¿Dónde NO debe estar nadie durante la carga?', ['Al costado de las rampas ni detrás de la máquina', 'Lejos, fuera de la zona', 'En la caseta'], 'Zona de volcamiento.'),
          VF('Varias personas pueden dar señales al operador al mismo tiempo.', false, 'Falso: un solo señalero.')),
        Q('zg_exc_pendiente', V('¿Cómo sube la máquina por las rampas?', ['Alineada, lenta y sin girar sobre ellas', 'Rápida para no perder impulso', 'Girando para acomodarse'], 'Alineada y lenta.'),
          V('¿Qué hace la excavadora con el balde al subir?', ['Lo lleva bajo, como apoyo', 'Lo lleva arriba', 'Lo gira'], 'Balde bajo.'),
          V('¿Qué pasa si la máquina gira sobre las rampas?', ['Puede salirse y volcar', 'Nada', 'Sube mejor'], 'Riesgo de volcamiento.')),
        Q('zg_cama', V('¿Cuántos puntos de amarre como mínimo lleva la máquina?', ['Al menos 4, con cadenas y tensores', 'Uno', 'Ninguno si es pesada'], 'Mínimo 4.'),
          V('¿Dónde se enganchan las cadenas?', ['En los puntos de anclaje del fabricante', 'En las mangueras', 'En los espejos'], 'Puntos de anclaje.'),
          VF('Una máquina pesada no necesita amarre porque su peso la mantiene quieta.', false, 'Falso: se desplaza en curvas y frenadas.')),
        Q('zg_cama_mal', V('¿Cuándo se revisa el amarre?', ['Antes de salir y en las detenciones del viaje', 'Solo al llegar', 'Nunca'], 'Revisión permanente.'),
          V('Encuentras un tensor suelto en una detención. ¿Qué haces?', ['Lo ajusto antes de seguir', 'Sigo y lo veo al llegar', 'Lo saco'], 'Se corrige antes de continuar.'),
          V('¿Qué puede pasar con una máquina mal amarrada?', ['Desplazarse o caer en una curva o frenada', 'Nada', 'Llegar más rápido'], 'Accidente grave.')),
        Q('zg_cama_ruta', V('¿Por qué hay que conocer la altura total con la máquina cargada?', ['Para no chocar con cables, puentes o ramas', 'Para el seguro', 'No importa'], 'Altura libre.'),
          V('¿Qué se hace con una carga sobredimensionada?', ['Se señaliza y se cumplen los permisos de vialidad', 'Se viaja de noche sin luces', 'Nada'], 'Señalización y permisos.'),
          VF('La pluma de la excavadora puede tocar un cable eléctrico si va muy alta.', true, 'Verdadero.')),
        Q('zg_cama_rampa', V('¿Cuándo se sueltan los amarres al descargar?', ['Con el camión asegurado y el operador listo en la cabina', 'En el camino', 'Antes de estacionar'], 'Orden seguro.'),
          V('Al descargar, ¿qué se repite?', ['Terreno firme, cuñas, rampas, señalero y nadie al costado', 'Nada', 'Solo las cuñas'], 'Misma seguridad.'),
          VF('Descargar es menos peligroso que cargar, así que no requiere señalero.', false, 'Falso: misma maniobra crítica.')),
        Q('zg_cama_rampa', V('¿Por qué la carga y descarga es una maniobra crítica?', ['Porque la máquina puede deslizarse o volcar desde las rampas', 'Porque es lenta', 'Porque es aburrida'], 'Riesgo grave.'),
          V('¿Qué EPP usa el señalero?', ['Casco, chaleco reflectante, zapatos de seguridad y guantes', 'Nada', 'Solo lentes'], 'Ser visible.'),
          VF('La maniobra se planifica antes de empezar.', true, 'Verdadero.'))
      ] },
    { id: 'incendio_forestal', sec: 'faena', mins: 5, title: 'Prevención de incendios en faena de biomasa', thumb: 'zg_incendio',
      learn: [
        L('zg_incendio', 'Faena con combustible por todas partes', 'Astillas, aserrín, ramas secas y pasto rodean la faena. Una chispa del escape, de una soldadura o un cigarro puede iniciar un <b>incendio forestal</b>, sobre todo en verano.', 'En faena, todo puede arder.'),
        L('zg_incendio_prev', 'Equipos limpios', 'Limpia a diario el polvo y las astillas sobre motores y escapes. Repara fugas de aceite y combustible de inmediato.', 'Limpio y sin fugas.'),
        L('zg_incendio', 'Fuego y cigarros', 'Está prohibido hacer fuego y fumar fuera de las zonas autorizadas. Los trabajos con soldadura o esmeril en faena requieren <b>permiso</b>, extintor y despeje del área.', 'Sin fuego, sin cigarros, con permiso.'),
        L('zg_incendio', 'Extintores', 'Cada equipo y vehículo lleva <b>extintor cargado</b>. Conoce dónde está y cómo usarlo: quita el seguro, apunta a la base y descarga en barrido.', 'Quita, apunta a la base y barre.'),
        L('zg_incendio', 'Si hay un amago', 'Da la alarma, avisa a tu jefatura y, solo si es pequeño y seguro, usa el extintor. Si crece, <b>aléjate</b> a favor del viento contrario y llama a Bomberos (132) y CONAF (130).', 'Avisa, aléjate y llama al 132 / 130.'),
        L('zg_fatiga', 'Días de alto riesgo', 'Con calor, viento y baja humedad, el riesgo sube. Se refuerzan las limpiezas, se dejan cortafuegos y se puede suspender la faena.', 'Calor + viento = máximo cuidado.'),
        L('zg_faena', 'Ruta de evacuación', 'Conoce la <b>ruta de salida</b> de la faena y el punto de encuentro. Los vehículos se estacionan mirando hacia la salida.', 'Estaciona mirando a la salida.')
      ],
      quiz: [
        Q('zg_incendio', V('¿Qué puede iniciar un incendio en la faena?', ['Una chispa del escape, una soldadura o un cigarro', 'El agua', 'La sombra'], 'Fuentes de ignición.'),
          V('¿En qué época el riesgo de incendio forestal es mayor?', ['En verano, con calor y viento', 'En invierno con lluvia', 'Da lo mismo'], 'Calor, viento y sequedad.'),
          VF('Las astillas y el aserrín acumulados son combustible.', true, 'Verdadero.')),
        Q('zg_incendio_prev', V('¿Qué se limpia a diario en los equipos?', ['Polvo y astillas sobre motores y escapes', 'Solo los vidrios', 'Nada'], 'Prevención.'),
          V('Ves una fuga de combustible. ¿Qué haces?', ['Aviso de inmediato para repararla', 'Sigo trabajando', 'La tapo con tierra y sigo'], 'Las fugas alimentan el fuego.'),
          VF('Una fuga de aceite sobre el escape puede provocar un incendio.', true, 'Verdadero.')),
        Q('zg_incendio', V('¿Qué requiere soldar o esmerilar en la faena?', ['Permiso, extintor y despeje del área', 'Nada', 'Solo guantes'], 'Trabajo en caliente controlado.'),
          V('¿Dónde se puede fumar?', ['Solo en las zonas autorizadas', 'En cualquier parte', 'Junto al triturador'], 'Zonas autorizadas.'),
          VF('Hacer una fogata para calentarse en la faena está permitido.', false, 'Falso: prohibido hacer fuego.')),
        Q('zg_incendio', V('¿Cómo se usa el extintor?', ['Quitar el seguro, apuntar a la base y descargar en barrido', 'Apuntar a las llamas altas', 'Tirarlo al fuego'], 'Base del fuego.'),
          V('¿Qué debe llevar cada equipo y vehículo?', ['Un extintor cargado', 'Un bidón de bencina extra', 'Nada'], 'Extintor siempre.'),
          V('¿A qué parte del fuego se apunta el extintor?', ['A la base', 'A la punta de las llamas', 'Al humo'], 'A la base.')),
        Q('zg_incendio', V('El fuego crece y no lo puedes controlar. ¿Qué haces?', ['Me alejo y llamo a Bomberos y CONAF', 'Sigo con el extintor', 'Me quedo mirando'], 'Tu vida primero.'),
          V('¿Cuál es el número de CONAF para incendios forestales?', ['130', '133', '131'], 'CONAF: 130.'),
          V('¿Cuál es el número de Bomberos?', ['132', '130', '134'], 'Bomberos: 132.')),
        Q('zg_fatiga', V('¿Qué condiciones aumentan el riesgo de incendio?', ['Calor, viento y baja humedad', 'Lluvia y frío', 'Neblina'], 'Condiciones críticas.'),
          V('En un día de alto riesgo, ¿qué se puede hacer?', ['Reforzar limpieza, dejar cortafuegos o suspender la faena', 'Trabajar más rápido', 'Nada'], 'Medidas reforzadas.'),
          VF('En días de mucho viento y calor se puede suspender la faena por riesgo de incendio.', true, 'Verdadero.')),
        Q('zg_faena', V('¿Cómo se estacionan los vehículos en la faena?', ['Mirando hacia la salida', 'Bloqueando el camino', 'Da lo mismo'], 'Para evacuar rápido.'),
          V('¿Qué debes conocer al llegar a una faena?', ['La ruta de salida y el punto de encuentro', 'Solo dónde está el baño', 'Nada'], 'Evacuación.'),
          VF('Hay que conocer la ruta de evacuación de la faena.', true, 'Verdadero.'))
      ] },
    { id: 'mecanico_soldador', sec: 'taller', mins: 7, title: 'Taller: soldadura, mantención y bloqueo de equipos', thumb: 'zg_taller',
      learn: [
        L('zg_taller', 'El taller', 'En el taller se reparan triturador, astilladores, excavadoras y camiones. Los riesgos: <b>atrapamiento</b>, aplastamiento bajo equipos, quemaduras, radiación del arco, humos de soldadura, incendio y ruido.', 'Mantención segura = equipo detenido y bloqueado.'),
        L('zg_mantencion', 'Bloqueo antes de intervenir', 'Antes de reparar: equipo <b>detenido</b>, llave fuera, energía aislada (eléctrica, hidráulica, neumática), partes en movimiento detenidas y tu <b>candado y tarjeta</b> puestos. Solo quien bloqueó retira su candado.', 'Tu candado, tu vida.'),
        L('zg_mantencion', 'Energía acumulada', 'Libera la presión hidráulica y de aire, apoya el balde o la pluma en el suelo y espera que rotores y tambores <b>dejen de girar</b>. Un cilindro con presión puede mover la máquina aunque el motor esté apagado.', 'Libera presión y apoya todo en el suelo.'),
        L('zg_mant_mal', 'Nunca bajo una carga', 'Nunca trabajes bajo un equipo sostenido solo por la gata o el hidráulico. Usa <b>caballetes</b> o soportes adecuados en terreno firme.', 'Gata para levantar, caballete para sostener.'),
        L('zg_sold_ok', 'Soldadura: EPP', 'Careta de soldar con filtro adecuado, <b>chaqueta, delantal y polainas de cuero</b>, guantes de soldador, zapatos de seguridad y ropa sin restos de aceite. Biombo para proteger a los demás del arco.', 'Careta, cuero y biombo.'),
        L('zg_sold_mal', 'Fuego y combustibles', 'Antes de soldar, retira combustibles, astillas y trapos con aceite en 10 m a la redonda, ten un <b>extintor</b> a mano y revisa el área 30 minutos después de terminar. Nunca sueldes estanques que contuvieron combustible sin limpieza y autorización.', 'Despeja, extintor y vigila después.'),
        L('zg_taller', 'Cilindros de gas', 'Los cilindros se mantienen <b>de pie y amarrados</b>, con su tapa al trasladarlos, lejos del calor. Revisa mangueras y válvulas; nunca uses aceite ni grasa en las conexiones de oxígeno.', 'De pie, amarrados y sin grasa en el oxígeno.'),
        L('zg_taller', 'Humos y ventilación', 'Los humos de soldadura dañan los pulmones. Suelda en lugares <b>ventilados</b>, con la cabeza fuera del humo y, si corresponde, con respirador.', 'Ventilación y cabeza fuera del humo.'),
        L('zg_taller', 'Esmeril y herramientas', 'Esmeril con su <b>protección</b> y disco adecuado a las revoluciones, lentes y careta facial. Desconecta para cambiar el disco. Herramientas en buen estado y orden en el taller.', 'Protección puesta y desconectar para cambiar disco.')
      ],
      quiz: [
        Q('zg_mantencion', V('¿Qué haces antes de reparar un equipo?', ['Lo detengo, saco la llave, aíslo la energía y pongo mi candado y tarjeta', 'Lo reparo con el motor andando', 'Le aviso a un compañero y empiezo'], 'Bloqueo antes de intervenir.'),
          V('¿Quién retira el candado de bloqueo?', ['Solo quien lo puso', 'Cualquiera', 'El jefe sin avisar'], 'Tu candado, tu vida.'),
          VF('Con la llave sacada y el candado puesto, nadie puede partir el equipo por error.', true, 'Verdadero.')),
        Q('zg_mantencion', V('¿Qué es la energía acumulada?', ['Presión hidráulica o de aire, o partes que siguen girando', 'La batería cargada del celular', 'El combustible del estanque'], 'Energía que puede mover el equipo.'),
          V('Antes de soltar una manguera hidráulica, ¿qué haces?', ['Libero la presión y apoyo el balde en el suelo', 'La suelto rápido', 'La corto'], 'Liberar presión.'),
          VF('Un cilindro hidráulico con presión puede mover la máquina con el motor apagado.', true, 'Verdadero.')),
        Q('zg_mant_mal', V('¿Puedes trabajar bajo un camión sostenido solo por la gata?', ['No, se usan caballetes o soportes adecuados', 'Sí, si es rápido', 'Sí, si la gata es nueva'], 'Gata para levantar, caballete para sostener.'),
          V('¿Dónde se ponen los caballetes?', ['En terreno firme y nivelado', 'Sobre tablas sueltas', 'Sobre ladrillos'], 'Base firme.'),
          V('¿Te puedes poner bajo el balde levantado para revisarlo?', ['No, nunca', 'Sí, un momento', 'Sí, con casco'], 'Nunca bajo carga.')),
        Q('zg_sold_ok', V('¿Qué EPP usas para soldar?', ['Careta con filtro, cuero, guantes de soldador y zapatos de seguridad', 'Solo lentes de sol', 'Polera y guantes de lana'], 'EPP de soldador.'),
          V('¿Para qué se usa el biombo?', ['Para proteger a los demás del arco de soldadura', 'Para descansar', 'Para colgar ropa'], 'Protege a terceros.'),
          VF('Mirar el arco de soldadura sin careta puede dañar los ojos.', true, 'Verdadero.')),
        Q('zg_sold_mal', V('Antes de soldar, ¿qué haces con los combustibles cercanos?', ['Los retiro del área y tengo extintor a mano', 'Los dejo donde están', 'Los tapo con un trapo'], 'Despeje del área.'),
          V('¿Por qué se revisa el área después de terminar de soldar?', ['Porque una chispa puede encender un fuego horas después', 'Por orden', 'No se revisa'], 'Fuego latente.'),
          VF('Se puede soldar un estanque que tuvo combustible sin limpiarlo.', false, 'Falso: puede explotar.')),
        Q('zg_taller', V('¿Cómo se mantienen los cilindros de gas?', ['De pie y amarrados, lejos del calor', 'Acostados en el suelo', 'Sueltos al sol'], 'Seguros.'),
          V('¿Qué nunca se pone en las conexiones de oxígeno?', ['Aceite ni grasa', 'Agua jabonosa para detectar fugas', 'Su tapa'], 'Riesgo de explosión.'),
          V('¿Cómo se trasladan los cilindros?', ['Con su tapa y en carro adecuado', 'Rodándolos por el suelo', 'Del regulador'], 'Traslado seguro.')),
        Q('zg_taller', V('¿Cómo te proteges de los humos de soldadura?', ['Ventilación, cabeza fuera del humo y respirador si corresponde', 'Respirando por la boca', 'Nada'], 'Los humos dañan los pulmones.'),
          V('¿Dónde se suelda?', ['En lugares ventilados', 'En un espacio cerrado sin ventilación', 'Dentro del camión cerrado'], 'Ventilación.'),
          VF('Los humos de soldadura pueden causar enfermedades respiratorias.', true, 'Verdadero.')),
        Q('zg_taller', V('¿Qué haces antes de cambiar el disco del esmeril?', ['Lo desconecto', 'Lo dejo enchufado', 'Lo cambio girando'], 'Siempre desconectar.'),
          V('¿Qué disco usas en el esmeril?', ['Uno adecuado a las revoluciones del equipo', 'Cualquiera que entre', 'Uno trizado'], 'Disco correcto.'),
          V('¿Qué protección usas al esmerilar?', ['Lentes y careta facial', 'Nada', 'Solo guantes'], 'Proyección de partículas.'))
      ] },
    { id: 'cama_baja', sec: 'conductores', mins: 7, title: 'Conducción de camión con cama baja', thumb: 'zg_cama',
      learn: [
        L('zg_cama', 'La cama baja', 'Transporta excavadoras, trituradores y el Arjes a las faenas. Es una carga <b>muy pesada, alta y con centro de gravedad alto</b>: cambia la forma de frenar, doblar y subir pendientes.', 'Carga pesada y alta: conduce distinto.'),
        L('zg_exc', 'Revisión antes de salir', 'Frenos, neumáticos, luces, rampas aseguradas en posición de viaje, cuñas guardadas, cadenas y tensores, documentos y <b>permisos</b> si la carga es sobredimensionada.', 'Revisa todo antes de partir.'),
        L('zg_cama', 'Amarre revisado', 'No sales si la máquina no está amarrada con <b>al menos 4 cadenas</b> con tensores. Revisa el amarre en las detenciones, sobre todo después de caminos de ripio.', 'Amarre revisado al salir y en ruta.'),
        L('zg_cama_ruta', 'Altura y ancho', 'Conoce la <b>altura total</b> de tu carga. Cables eléctricos, puentes, túneles y ramas de árboles son un peligro. Si no estás seguro de pasar, detente y verifica.', 'Si dudas de la altura, detente.'),
        L('zg_cama_ruta', 'Velocidad y curvas', 'Baja la velocidad antes de las curvas, no en medio de ellas. Frena con anticipación: con carga, el camión necesita <b>mucha más distancia</b> para detenerse. Usa el freno motor en las bajadas.', 'Frena antes, no durante la curva.'),
        L('zg_exc_pendiente', 'Caminos forestales', 'Los caminos de faena tienen ripio, barro y pendientes. Avanza lento, evita bordes blandos y verifica que el camino soporte el peso antes de entrar.', 'Lento y por terreno firme.'),
        L('zg_fatiga', 'Cansancio', 'Respeta los <b>tiempos de conducción y descanso</b>. Si tienes sueño, detente en un lugar seguro. Nunca conduzcas bajo efecto de alcohol, drogas o medicamentos que den sueño.', 'Con sueño, detente.'),
        L('zg_cama_rampa', 'Estacionar con carga', 'Estaciona en lugar <b>firme, plano y fuera de la vía</b>, con freno, cuñas y luces de emergencia o triángulos si quedas en la berma.', 'Fuera de la vía, frenado y señalizado.')
      ],
      quiz: [
        Q('zg_cama', V('¿Qué cambia al conducir con una máquina en la cama baja?', ['Frena en más distancia y el centro de gravedad es más alto', 'Nada', 'Se puede ir más rápido'], 'Carga pesada y alta.'),
          V('¿Qué riesgo aumenta con el centro de gravedad alto?', ['Volcamiento en curvas', 'Ninguno', 'Se gasta menos combustible'], 'Volcamiento.'),
          VF('Con carga, el camión necesita más distancia para frenar.', true, 'Verdadero.')),
        Q('zg_exc', V('¿Qué revisas antes de salir con la cama baja?', ['Frenos, neumáticos, luces, rampas, amarre y documentos', 'Solo la radio', 'Nada'], 'Revisión completa.'),
          V('¿En qué posición van las rampas al viajar?', ['Levantadas y aseguradas', 'Abajo arrastrando', 'Sueltas'], 'Posición de viaje.'),
          V('¿Qué documento se necesita si la carga es sobredimensionada?', ['El permiso de vialidad', 'Ninguno', 'Solo la licencia'], 'Permisos al día.')),
        Q('zg_cama', V('¿Con cuántas cadenas como mínimo se amarra la máquina?', ['Al menos 4 con tensores', 'Una', 'Ninguna'], 'Mínimo 4.'),
          V('¿Cuándo vuelves a revisar el amarre?', ['En las detenciones, sobre todo después de ripio', 'Nunca', 'Solo al llegar'], 'Revisión en ruta.'),
          VF('Las vibraciones del camino pueden soltar un tensor.', true, 'Verdadero.')),
        Q('zg_cama_ruta', V('No estás seguro de que la carga pase bajo un cable. ¿Qué haces?', ['Me detengo y verifico la altura', 'Paso rápido', 'Paso agachado'], 'Si dudas, detente.'),
          V('¿Qué elementos pueden chocar con una carga alta?', ['Cables eléctricos, puentes, túneles y ramas', 'Solo los letreros', 'Nada'], 'Altura libre.'),
          VF('Debo conocer la altura total de mi camión con la carga.', true, 'Verdadero.')),
        Q('zg_cama_ruta', V('¿Cuándo bajas la velocidad para una curva?', ['Antes de entrar a la curva', 'En medio de la curva', 'Después de la curva'], 'Frena antes.'),
          V('¿Qué usas en las bajadas largas?', ['El freno motor', 'Solo el freno de servicio todo el rato', 'Punto muerto'], 'Freno motor.'),
          V('¿Por qué no se baja en punto muerto?', ['Porque se pierde control y se recalientan los frenos', 'Porque gasta más', 'Sí se puede'], 'Pérdida de control.')),
        Q('zg_exc_pendiente', V('¿Cómo avanzas por un camino forestal con barro y pendiente?', ['Lento y por terreno firme', 'Rápido para no quedar pegado', 'Por el borde'], 'Lento y seguro.'),
          V('Antes de entrar a un camino de faena, ¿qué verificas?', ['Que soporte el peso del camión cargado', 'Nada', 'Solo el GPS'], 'Capacidad del camino.'),
          VF('Los bordes blandos de un camino pueden ceder con el peso del camión.', true, 'Verdadero.')),
        Q('zg_fatiga', V('Sientes sueño manejando. ¿Qué haces?', ['Me detengo en un lugar seguro a descansar', 'Abro la ventana y sigo', 'Subo el volumen'], 'Con sueño, detente.'),
          V('¿Qué se respeta siempre en la conducción?', ['Los tiempos de conducción y descanso', 'Solo la hora de llegada', 'Nada'], 'Descansos.'),
          VF('Algunos medicamentos pueden dar sueño y afectar la conducción.', true, 'Verdadero.')),
        Q('zg_cama_rampa', V('¿Dónde estacionas con la carga?', ['En lugar firme, plano y fuera de la vía', 'En la pista', 'En una curva'], 'Fuera de la vía.'),
          V('Quedas detenido en la berma. ¿Qué pones?', ['Luces de emergencia y triángulos', 'Nada', 'Solo la radio'], 'Señalización.'),
          V('¿Qué pones en las ruedas al estacionar en terreno con pendiente?', ['Cuñas', 'Nada', 'Ramas'], 'Cuñas.'))
      ] },
    { id: 'piso_caminante', sec: 'conductores', mins: 7, title: 'Camión con piso caminante: carga, viaje y descarga', thumb: 'zg_piso',
      learn: [
        L('zg_piso', 'El piso caminante', 'La batea tiene un piso de <b>listones que se mueven</b> con un sistema hidráulico y empujan la carga (astillas, biomasa) hacia atrás para descargar. Ese movimiento puede <b>atrapar</b> pies, manos o a una persona completa.', 'El piso se mueve: atrapa y arrastra.'),
        L('zg_piso_mal', 'Nunca dentro de la batea', 'Nadie entra a la batea con el sistema funcionando o con carga. Para limpiar o revisar: piso detenido, hidráulico <b>desconectado y bloqueado</b>, motor apagado y llave fuera.', 'Batea: solo con el sistema bloqueado.'),
        L('zg_piso_descarga', 'Descarga', 'Antes de descargar: camión en terreno <b>firme y plano</b>, freno puesto, puertas abiertas y aseguradas. Durante la descarga, <b>nadie detrás</b> de la batea: la carga cae con fuerza.', 'Plano, frenado y nadie atrás.'),
        L('zg_piso_descarga', 'Puertas traseras', 'Las puertas se abren parado <b>al costado</b>, nunca de frente: la carga puede empujarlas de golpe. Asegúralas abiertas con sus seguros.', 'Abre al costado y asegura.'),
        L('zg_piso_lona', 'Encarpado', 'La carga de astillas se cubre con la <b>carpa o lona</b> para que no salgan volando. Se encarpa con el sistema del camión, desde el suelo o desde una plataforma con baranda, <b>nunca caminando sobre la carga</b>.', 'Encarpa desde el suelo o plataforma.'),
        L('zg_piso', 'Carga en la faena', 'Durante la carga con excavadora o cargador, el conductor <b>queda fuera de la zona</b> o en la cabina, y nadie pasa entre el camión y la máquina. No se sobrecarga el camión.', 'Fuera de la zona de carga y sin sobrecarga.'),
        L('zg_exc_subir', 'Subir y bajar', 'Para subir a la cabina o a la escalera de la batea: <b>3 puntos de apoyo</b> y de frente. Nunca saltes.', '3 puntos de apoyo.'),
        L('zg_fatiga', 'En ruta', 'Con la batea llena el camión es alto y pesado: frena con anticipación, baja la velocidad en curvas y respeta los descansos.', 'Anticípate y descansa.')
      ],
      quiz: [
        Q('zg_piso', V('¿Cuál es el principal peligro del piso caminante?', ['Que los listones en movimiento atrapen a una persona', 'El color de la batea', 'El ruido de la radio'], 'Atrapamiento.'),
          V('¿Qué mueve el piso caminante?', ['Un sistema hidráulico', 'El viento', 'Las personas'], 'Hidráulico.'),
          VF('El piso caminante puede arrastrar a una persona que esté dentro de la batea.', true, 'Verdadero.')),
        Q('zg_piso_mal', V('¿Puedes entrar a la batea con el sistema funcionando?', ['No, nunca', 'Sí, si voy con cuidado', 'Sí, para destrabar rápido'], 'Nunca.'),
          V('Necesitas limpiar la batea. ¿Qué haces primero?', ['Detengo el piso, bloqueo el hidráulico, apago y saco la llave', 'Entro con el motor andando', 'Le pido a otro que vigile el piso'], 'Bloqueo antes de entrar.'),
          VF('Para entrar a la batea, el sistema hidráulico debe quedar bloqueado.', true, 'Verdadero.')),
        Q('zg_piso_descarga', V('¿Dónde NO debe haber nadie durante la descarga?', ['Detrás de la batea', 'En la cabina', 'A un costado lejos'], 'La carga cae con fuerza.'),
          V('¿Cómo debe estar el camión para descargar?', ['En terreno firme y plano, con freno puesto', 'En pendiente', 'En movimiento'], 'Estabilidad.'),
          VF('Descargar en terreno blando o en pendiente aumenta el riesgo de volcamiento.', true, 'Verdadero.')),
        Q('zg_piso_descarga', V('¿Desde dónde se abren las puertas traseras?', ['Desde el costado, nunca de frente', 'De frente', 'Desde arriba de la carga'], 'La carga puede empujarlas.'),
          V('¿Qué haces después de abrir las puertas?', ['Las aseguro con sus seguros', 'Las dejo sueltas', 'Las amarro con la carpa'], 'Puertas aseguradas.'),
          VF('Las puertas pueden abrirse de golpe por el empuje de la carga.', true, 'Verdadero.')),
        Q('zg_piso_lona', V('¿Cómo se encarpa la carga?', ['Desde el suelo o una plataforma con baranda', 'Caminando sobre la carga', 'No se encarpa'], 'Sin caminar sobre la carga.'),
          V('¿Para qué se cubre la carga de astillas?', ['Para que no salga volando a la ruta', 'Para que se vea bien', 'No sirve'], 'Seguridad vial.'),
          VF('Caminar sobre la carga para encarpar es un riesgo de caída.', true, 'Verdadero.')),
        Q('zg_piso', V('Mientras te cargan con la excavadora, ¿dónde estás?', ['Fuera de la zona de carga o en la cabina', 'Entre el camión y la máquina', 'Sobre la batea'], 'Fuera de la zona.'),
          V('¿Qué pasa si sobrecargas el camión?', ['Frena peor, se desgasta y puede volcar', 'Nada', 'Ahorra viajes sin riesgo'], 'Sin sobrecarga.'),
          V('¿Puede alguien pasar entre el camión y la excavadora durante la carga?', ['No', 'Sí, si corre', 'Sí, si avisa'], 'Zona de aplastamiento.')),
        Q('zg_exc_subir', V('¿Cómo subes a la escalera de la batea?', ['De frente y con 3 puntos de apoyo', 'Saltando', 'Con herramientas en la mano'], '3 puntos de apoyo.'),
          V('¿Cómo bajas de la cabina?', ['De frente, con 3 puntos de apoyo', 'Saltando de espaldas', 'Corriendo'], 'Nunca saltes.'),
          VF('Saltar desde la cabina puede causar lesiones en tobillos y rodillas.', true, 'Verdadero.')),
        Q('zg_fatiga', V('Con la batea llena, ¿cómo conduces?', ['Frenando con anticipación y lento en las curvas', 'Más rápido para llegar luego', 'Igual que vacío'], 'Anticipación.'),
          V('¿Qué haces si tienes sueño en ruta?', ['Me detengo en un lugar seguro', 'Sigo con la ventana abierta', 'Tomo más café y sigo'], 'Con sueño, detente.'),
          VF('Un camión alto y cargado puede volcar en una curva tomada rápido.', true, 'Verdadero.'))
      ] }
  ];
    // ---------- Textos: de obra a faena, nombre de la empresa y lenguaje propio
    const CAMBIOS = [[/Constructora Plaza|Plaza Propiedades|Montasip/g, C.emp], [/capataz o jefe de obra/g, 'jefatura'], [/jefe de obra, capataz/g, 'jefatura'], [/jefes? de obra/g, 'jefe de operaciones'],
      [/capataces/g, 'supervisores'], [/capataz/g, 'supervisor'], [/libro de obra/g, 'libro de faena'], [/\bobras\b/g, 'faenas'], [/\bobra\b/g, 'faena'], [/\bObra\b/g, 'Faena'], [/al tiro/g, 'de inmediato']];
    const fx = v => CAMBIOS.reduce((s, [a, b]) => s.replace(a, b), v);
    const recorrer = (o, d) => { if (!o || typeof o !== 'object' || d > 7) return; Object.keys(o).forEach(k => { const v = o[k]; if (typeof v === 'string') o[k] = fx(v); else if (v && typeof v === 'object') recorrer(v, d + 1); }); };
    recorrer(TOPICS, 0); if (typeof NORMAS !== 'undefined') recorrer(NORMAS, 0);
    // ---------- Inducción: riesgos por puesto de la empresa
    const ind = TOPICS.find(t => t.id === 'induccion');
    if (ind) {
      const pc = ind.learn.find(l => /riesgos de tu puesto|TU puesto/i.test(l.t || ''));
      const PUESTOS = C.emp === 'Transportes ZG SpA'
        ? '<li><b>Conductores (camión cama baja y piso caminante):</b> choque y volcamiento en ruta, desplazamiento de la carga, atrapamiento en el piso caminante, caídas al subir a la cabina o a la batea, fatiga.</li><li><b>Todos:</b> atropello en patios y faenas, cargas, ruido, radiación UV y accidentes de trayecto.</li>'
        : '<li><b>Operadores de triturador, astillador y Arjes:</b> atrapamiento en la alimentación, proyección de trozos, ruido, polvo e incendio.</li><li><b>Operadores de excavadora:</b> aplastamiento en el radio de giro, volcamiento en pendientes y caídas al subir y bajar.</li><li><b>Mecánico soldador:</b> atrapamiento por energías no bloqueadas, aplastamiento bajo equipos, quemaduras, radiación del arco y humos.</li><li><b>Jefatura, prevención y administración:</b> tránsito en faena, trayecto, trabajo con computador y riesgos psicosociales.</li>';
      if (pc) pc.x = 'Cada puesto tiene sus riesgos. Tu jefatura y prevención te explican los de tu cargo:<ul>' + PUESTOS + '</ul>';
    }
    // ---------- Charlas: se quitan las de obra, se mueven las que sirven y se agregan las de ZG
    for (let i = TOPICS.length - 1; i >= 0; i--) { const t = TOPICS[i]; if (C.quitar.indexOf(t.id) >= 0) TOPICS.splice(i, 1); else if (C.mover[t.id]) t.sec = C.mover[t.id]; }
    const norma = ['Ley 16.744 y DS 44/2023: el empleador informa los riesgos (IRL) y capacita en las medidas de control.', 'DS 594: condiciones sanitarias y ambientales básicas en los lugares de trabajo.', 'Manual del fabricante del equipo y procedimientos de trabajo seguro de ' + C.emp + '.'];
    NUEVOS.forEach(t => { if (C.quitar.indexOf(t.id) >= 0 || TOPICS.some(x => x.id === t.id)) return; const s = (t.secs || [t.sec]).find(x => C.secs.indexOf(x) >= 0) || t.sec; const tt = Object.assign({}, t, { sec: s }); delete tt.secs; TOPICS.push(tt); if (typeof NORMAS !== 'undefined') NORMAS[t.id] = norma; });
    // ---------- Secciones del inicio
    const SEC = { todos: { id: 'todos', t: 'Para todos', ic: '⭐', c: '#398E39', d: 'Lo que todo el equipo de ' + C.emp + ' debe saber' },
      faena: { id: 'faena', t: 'Equipos de faena', ic: '🌲', c: '#2E7D32', d: 'Triturador, astillador, Arjes, excavadora y carga de maquinaria' },
      taller: { id: 'taller', t: 'Taller y mantención', ic: '🔧', c: '#6E4223', d: 'Soldadura, bloqueo de equipos, electricidad y herramientas' },
      conductores: { id: 'conductores', t: 'Conductores de camión', ic: '🚚', c: '#1565C0', d: 'Cama baja, piso caminante, carga de maquinaria y conducción' },
      admin: { id: 'admin', t: 'Administración y oficina', ic: '💻', c: '#00838F', d: 'Computador, ergonomía y oficina' } };
    if (typeof SECCIONES !== 'undefined' && Array.isArray(SECCIONES)) { SECCIONES.splice(0, SECCIONES.length, ...C.secs.map(k => SEC[k])); }
    // orden: por sección según C.secs
    const ord = id => C.secs.indexOf(id), nuevo = t => NUEVOS.some(x => x.id === t.id) ? 0 : 1, idx = new Map(TOPICS.map((t, i) => [t, i]));
    TOPICS.sort((a, b) => (ord(a.sec) - ord(b.sec)) || (a.sec === 'todos' ? 0 : nuevo(a) - nuevo(b)) || (idx.get(a) - idx.get(b)));
    // textos dentro de los dibujos heredados (letreros y globos)
    Object.keys(S).forEach(k => { const f = S[k]; if (typeof f !== 'function' || f.__zg || /^zg_/.test(k)) return; S[k] = function () { const v = f.apply(this, arguments); return typeof v === 'string' ? v.replace(/>([^<>]+)</g, (m, t) => '>' + fx(t) + '<') : v; }; S[k].__zg = true; });
    try { if (typeof renderHome === 'function') renderHome(); } catch (e) {}
  } catch (e) { console.log('zg_extra: ' + e); }
})();
