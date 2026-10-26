/* Generadores paramétricos de preguntas SPP. */
(function (root) {
  'use strict';
  const R = (typeof module !== 'undefined' && module.exports) ? require('./rules.js') : root.SPP_RULES;
  const pick = (rng, a) => a[Math.floor(rng() * a.length)];
  const randint = (rng, a, b) => a + Math.floor(rng() * (b - a + 1));
  function shuffle(rng, arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function single(rng, t, q, correct, distractors, e, extra) {
    const opts = [correct]; for (const d of distractors) if (!opts.includes(d) && opts.length < 4) opts.push(d);
    const sh = shuffle(rng, opts); return Object.assign({ t, q, o: sh, a: [sh.indexOf(correct)], e, gen: true }, extra || {});
  }
  const H = R.hdg;
  const G = {};

  // 1. Entrada en espera (regla de la mano)
  G.holdEntry = function (rng) {
    let inb, h, right, entry;
    do { inb = randint(rng, 0, 35) * 10; h = randint(rng, 0, 71) * 5; right = rng() < 0.7; } while (R.holdBoundaryDist(h, inb, right) < 8);
    entry = R.holdEntry(h, inb, right);
    const fix = pick(rng, R.VORS);
    const q = `Espera ${right ? 'estándar (virajes a la derecha)' : 'no estándar (virajes a la izquierda)'} sobre ${fix}, curso de acercamiento ${H(inb)}°. Vuelas hacia ${fix} con rumbo ${H(h)}°. ¿Qué entrada corresponde?`;
    const O = R.recip(inb);
    const e = `Rumbo de alejamiento ${H(O)}°. Mano ${right ? 'derecha' : 'izquierda'}, índice en ${H(h)}°: ` + (right ? `paralela si el alejamiento está entre ${H(h - 110)} y ${H(h)}, gota entre ${H(h)} y ${H(h + 70)}, directa en el resto.` : `paralela entre ${H(h)} y ${H(h + 110)}, gota entre ${H(h - 70)} y ${H(h)}, directa en el resto.`);
    const map = { directa: 'Directa (sector 3)', paralela: 'Paralela (sector 1)', gota: 'En gota (sector 2)' };
    return single(rng, 'esperas', q, map[entry], Object.values(map), e, { g: 'Entrada en espera', viz: { kind: 'hold', inb, h, right } });
  };

  // 2. Velocidad máxima y tiempo de alejamiento
  G.holdSpeed = function (rng) {
    const alt = pick(rng, [3000, 4000, 5000, 6000, 8000, 10000, 12000, 14000, 15000, 16000, 18000, 20000, 22000, 25000, 30000, 34000, 36000, 39000]);
    const kind = rng() < 0.65 ? 'speed' : 'time';
    const altTxt = alt >= 15000 ? 'FL' + alt / 100 : alt.toLocaleString('es-ES') + ' ft';
    if (kind === 'time') {
      return single(rng, 'esperas', `Espera no publicada a ${altTxt}; el ATC no especifica el tramo de alejamiento. ¿Cuánto dura?`, R.holdLegTime(alt), ['1 minuto', '1,5 minutos', '2 minutos', '30 segundos'], '1 min hasta 14 000 ft; 1,5 min por encima.', { g: 'Esperas' });
    }
    const turb = alt <= 14000 && rng() < 0.25, catAB = alt <= 14000 && !turb && rng() < 0.25;
    const v = R.holdMaxSpeed(alt, { turb, catAB });
    const q = `Velocidad máxima OACI en una espera a ${altTxt}${turb ? ', en turbulencia' : ''}${catAB ? ', espera limitada a aeronaves CAT A y B' : ''} (fuera de aerovía, sin indicación en la carta):`;
    return single(rng, 'esperas', q, v, shuffle(rng, ['170 kt', '230 kt', '240 kt', '265 kt', '280 kt', 'M0,83', 'la menor de 280 kt o M0,8']), '≤ 14 000 ft: 230 kt (CAT A/B 170, turbulencia 280) · 14 001–20 000: 240 · 20 001–34 000: 265 · > 34 000: M0,83.', { g: 'Esperas' });
  };

  // 3. Interceptación
  G.intercept = function (rng) {
    const inbound = rng() < 0.5;
    const qdm = randint(rng, 1, 72) * 5;
    let desired, d;
    do { desired = randint(rng, 1, 36) * 10; d = R.diff(inbound ? qdm : R.recip(qdm), desired); } while (d < 15 || (d > 80 && d < 100) || d > 170);
    const res = R.intercept(qdm, desired, inbound);
    const instr = inbound ? (rng() < 0.5 ? { txt: `interceptar el curso de acercamiento ${H(desired)}°`, crs: desired } : { txt: `acercarse por el radial ${H(R.recip(desired))}`, crs: desired }) : { txt: `alejarse por el radial ${H(desired)}`, crs: desired };
    const vor = pick(rng, R.VORS.slice(0, 12));
    const q = `RMI sintonizado al VOR ${vor}: cabeza (QDM) ${H(qdm)}°, cola (QDR) ${H(R.recip(qdm))}°. Te piden ${instr.txt}. ¿Rumbo de interceptación inicial?`;
    let correct, e;
    if (res.tipo === 'directa') {
      correct = H(res.heading) + '°';
      e = inbound ? `Curso deseado ${H(desired)}. Cabeza ${H(qdm)}: diferencia ${res.d}° < 90 → ruta directa, DC 30: ${H(desired)} → ${H(qdm)} → 30° más = ${H(res.heading)}.` : `Curso deseado ${H(desired)}. Cola ${H(R.recip(qdm))}: diferencia ${res.d}° < 90 → ruta directa, CD 45: ${H(R.recip(qdm))} → ${H(desired)} → 45° más = ${H(res.heading)}.`;
    } else {
      correct = H(res.heading) + '° (rumbo radial) y ' + (inbound ? 'al través 1 min y 90° hacia la estación' : 'al través 45° hacia la estación');
      e = `Diferencia ${res.d}° > 90 → ruta pasada en ${inbound ? 'acercamiento' : 'alejamiento'}: ${res.rule}.`;
    }
    const wrongs = res.tipo === 'directa'
      ? [H(res.heading + (inbound ? 30 : 45) * (R.turnDir(res.heading, desired) || 1)) + '°', H(desired) + '°', H(res.heading + 180) + '°', H(qdm) + '°', H(desired + (inbound ? 45 : 30)) + '°']
      : [H(desired) + '°', H(res.heading) + '° (rumbo radial) y ' + (inbound ? 'al través 45° hacia la estación' : 'al través 1 min y 90° hacia la estación'), H(R.recip(res.heading)) + '° y viraje de 90°'];
    return single(rng, 'navegacion', q, correct, shuffle(rng, wrongs), e, { g: 'Interceptaciones', viz: { kind: 'rmi', qdm, hdgAc: randint(rng, 0, 35) * 10 } });
  };

  // 4. Lectura de instrumentos
  G.instrument = function (rng) {
    const k = pick(rng, ['rmi', 'cdi', 'qdm']);
    if (k === 'rmi') { const qdm = randint(rng, 1, 72) * 5; return single(rng, 'navegacion', `La cabeza de la aguja VOR del RMI marca ${H(qdm)}°. ¿En qué radial estás?`, H(R.recip(qdm)), [H(qdm), H(qdm + 90), H(qdm - 90)], 'El radial se lee en la cola (QDR = QDM ± 180).', { g: 'Instrumentos', viz: { kind: 'rmi', qdm, hdgAc: randint(rng, 0, 35) * 10 } }); }
    if (k === 'cdi') { const c = randint(rng, 1, 72) * 5; const to = rng() < 0.5; return single(rng, 'navegacion', `Tu HSI está centrado en el curso ${H(c)}° con bandera ${to ? 'TO' : 'FROM'}. ¿En qué radial estás?`, to ? H(R.recip(c)) : H(c), [to ? H(c) : H(R.recip(c)), H(c + 90), H(c - 90)], to ? 'Con TO el curso es un QDM: el radial es su recíproco.' : 'Con FROM el curso centrado es el radial.', { g: 'Instrumentos' }); }
    const r = randint(rng, 1, 72) * 5; return single(rng, 'navegacion', `Estás en el radial ${H(r)} de un VOR. ¿Cuál es tu QDM (rumbo a la estación sin viento)?`, H(R.recip(r)), [H(r), H(r + 90), H(r - 90)], 'QDM y QDR son recíprocos.', { g: 'Instrumentos' });
  };

  // 5. Regla semicircular
  G.semicircular = function (rng) {
    const track = randint(rng, 0, 71) * 5; const vfr = rng() < 0.2;
    const east = track < 180;
    const pool = []; for (let f = 40; f <= 410; f += 10) pool.push(f);
    const good = pool.filter(f => R.semicircularOk(track, vfr ? f + 5 : f, vfr)).filter(f => f <= 250);
    const fl = pick(rng, good); const c = 'FL' + (vfr ? fl + 5 : fl);
    const bad = pool.filter(f => f <= 250 && !R.semicircularOk(track, vfr ? f + 5 : f, vfr)).map(f => 'FL' + (vfr ? f + 5 : f));
    const wrong = shuffle(rng, bad).slice(0, 2).concat(['FL' + (vfr ? fl : fl + 5)]);
    return single(rng, 'reglas-ifr', `Vuelo ${vfr ? 'VFR' : 'IFR'} en crucero con derrota magnética ${H(track)}°. ¿Qué nivel cumple la regla semicircular?`, c, wrong, `Derrota ${east ? '000–179 → niveles impares' : '180–359 → niveles pares'}${vfr ? ' + 500 ft (VFR)' : ' (IFR en miles enteros)'}.`, { g: 'Regla semicircular' });
  };

  // 6. Motor crítico
  G.critical = function (rng) {
    const l = pick(rng, ['h', 'a']), r = pick(rng, ['h', 'a']);
    const n = { h: 'horario', a: 'antihorario' };
    return single(rng, 'velocidades', `Bimotor: hélice izquierda en sentido ${n[l]}, hélice derecha en sentido ${n[r]} (vistas desde atrás). ¿Cuál es el motor crítico?`, R.criticalEngine(l, r), ['Izquierdo', 'Derecho', 'Ninguno'], 'El crítico es el que hace su tracción más cerca del CG (factor P hacia el lado de la pala descendente).', { g: 'Motor crítico' });
  };

  // 7. V-speeds
  const VS = [['VMCG', 'Mínima de control direccional en tierra con el crítico inoperativo'], ['VMCA', 'Mínima de control en el aire con el crítico inoperativo (≤ 5° de alabeo), marca roja'], ['VYSE', 'Mejor régimen de ascenso con el crítico inoperativo, marca azul'], ['VXSE', 'Mejor ángulo de ascenso con el crítico inoperativo'], ['V1', 'Máxima para iniciar el aborto y poder parar en la ASDA'], ['VR', 'Velocidad de rotación'], ['V2', 'Mínima con ascenso positivo tras un fallo de motor después de V1'], ['VX', 'Mejor ángulo de ascenso'], ['VY', 'Mejor régimen de ascenso'], ['VA', 'Velocidad de maniobra'], ['VNO', 'Máxima de operación normal (turbulencia)'], ['VNE', 'Velocidad que nunca se debe exceder'], ['VFE', 'Máxima con flaps extendidos'], ['VLO', 'Máxima para operar el tren'], ['VLE', 'Máxima con el tren extendido'], ['VREF', '1,3 × VS0, velocidad de aproximación final'], ['VMD', 'Mínima resistencia (máximo planeo)'], ['VMCL', 'Mínimo control en configuración de aterrizaje con el crítico inoperativo']];
  G.vspeed = function (rng) {
    const [k, d] = pick(rng, VS); const others = shuffle(rng, VS.filter(x => x[0] !== k));
    if (rng() < 0.5) return single(rng, 'velocidades', `¿Qué es ${k}?`, d, others.map(x => x[1]), `${k}: ${d}.`, { g: 'Velocidades de referencia' });
    return single(rng, 'velocidades', `¿Qué velocidad se define como «${d}»?`, k, others.map(x => x[0]), `${k}.`, { g: 'Velocidades de referencia' });
  };

  // 8. Escenarios de fallo de motor
  const EF = [['en la carrera de despegue, antes de VMCG', 'Reducir la potencia del motor operativo (abortar)'], ['en la carrera de despegue, entre VMCG y VMCA', 'Acelerar hasta VMCA antes de rotar'], ['justo tras el despegue, por encima de VMCA', 'Mantener más de VMCA y ascender a VYSE'], ['en ascenso a una velocidad superior a VYSE', 'Decelerar a VYSE'], ['con ambos motores a ralentí, por debajo de VMCA', 'Acelerar por encima de VMCA antes de aplicar máxima continua']];
  G.engineFail = function (rng) { const [s, a] = pick(rng, EF); return single(rng, 'velocidades', `Fallo del motor crítico ${s}. ¿Qué haces?`, a, EF.map(x => x[1]), a + '.', { g: 'Fallo de motor' }); };

  // 9. Altitudes mínimas
  const AM = [['MSA', 'Obstáculos en un sector de 25 NM (+5) alrededor de una radioayuda o ARP'], ['MVA/MRVA', 'Mínima para vectorización radar: obstáculos, radar y comunicaciones'], ['MOCA', 'Solo franqueamiento de obstáculos en un tramo de ruta'], ['MEA', 'La mayor entre MOCA, recepción de navegación, comunicaciones y estructura ATS'], ['MRA', 'Mínima de recepción de las radioayudas'], ['MHA', 'Mínima del circuito de espera'], ['MCA', 'Mínima para cruzar un punto y poder subir luego a la MEA'], ['Grid MORA / AMA', 'Obstáculos dentro de una cuadrícula de paralelos y meridianos'], ['MORA', 'Obstáculos a 10 NM a cada lado de la aerovía (Jeppesen)']];
  G.minalt = function (rng) {
    const [k, d] = pick(rng, AM); const others = shuffle(rng, AM.filter(x => x[0] !== k));
    if (rng() < 0.5) return single(rng, 'altitudes-minimas', `¿Qué define la ${k}?`, d, others.map(x => x[1]), `${k}: ${d}.`, { g: 'Altitudes mínimas' });
    return single(rng, 'altitudes-minimas', `¿Qué altitud se define como «${d}»?`, k, others.map(x => x[0]), k + '.', { g: 'Altitudes mínimas' });
  };

  // 10. Categoría ILS / tipo de aproximación
  G.ilsCat = function (rng) {
    if (rng() < 0.5) { const dh = pick(rng, [450, 400, 300, 250, 240, 220, 200]); return single(rng, 'aproximaciones', `Aproximación con DH/MDH de ${dh} ft. Según el Anexo 6 es…`, R.approachType(dh), ['Tipo A', 'Tipo B'], 'Tipo A: ≥ 250 ft; tipo B: < 250 ft.', { g: 'Clasificación de aproximaciones' }); }
    const dh = pick(rng, [250, 200, 150, 100, 80, 50, 30, null]);
    return single(rng, 'aproximaciones', dh == null ? 'Una aproximación ILS sin altura de decisión ni RVR mínimo es…' : `Un ILS con altura de decisión de ${dh} ft corresponde a…`, R.ilsCat(dh), ['CAT I', 'CAT II', 'CAT III A', 'CAT III B', 'CAT III C'], 'CAT I ≥ 200 · CAT II ≥ 100 · III A < 100 · III B < 50 · III C sin DH.', { g: 'Categorías ILS' });
  };

  // 11. Estimación TAS / GS
  G.tas = function (rng) {
    if (rng() < 0.6) {
      const ias = randint(rng, 12, 22) * 10, alt = randint(rng, 2, 12) * 1000; const t = R.tasEstimate(ias, alt);
      return single(rng, 'reglas-ifr', `Vuelas a ${ias} kt IAS a ${alt.toLocaleString('es-ES')} ft. Con la regla del 2 % por 1 000 ft, ¿TAS aproximada?`, t + ' kt', [ias + ' kt', (t + 20) + ' kt', (ias - Math.round(ias * 0.02 * alt / 1000)) + ' kt'], `${ias} × (1 + 0,02 × ${alt / 1000}) ≈ ${t} kt.`, { g: 'TAS y GS' });
    }
    const tas = randint(rng, 14, 24) * 10, w = randint(rng, 1, 6) * 5, head = rng() < 0.5; const gs = head ? tas - w : tas + w;
    return single(rng, 'reglas-ifr', `TAS ${tas} kt con ${w} kt de viento ${head ? 'en cara' : 'en cola'}. ¿GS?`, gs + ' kt', [(head ? tas + w : tas - w) + ' kt', tas + ' kt', (gs + 10) + ' kt'], 'GS = TAS ± componente de viento.', { g: 'TAS y GS' });
  };

  // 12. Fallo de comunicaciones
  const CF = [['¿Qué código pones ante un fallo de comunicaciones?', '7600', ['7500', '7700', '7601']], ['IFR en VMC con fallo de comunicaciones que decide aterrizar en el aeródromo adecuado más cercano. Código:', '7601', ['7600', '7700', '7000']], ['IFR con fallo de comunicaciones: ¿cuánto tiempo mantiene el último nivel y velocidad asignados?', '20 minutos', ['7 minutos', '30 minutos', '10 minutos']], ['IFR con fallo de comunicaciones: debe aterrizar dentro de los … siguientes a la EAT/ETA.', '30 minutos', ['20 minutos', '10 minutos', '60 minutos']], ['VFR con fallo de comunicaciones en el circuito de aeródromo:', 'Espera señales visuales', ['Pone 7700 y aterriza', 'Abandona el circuito', 'Sube a la MSA']], ['Te vectorizan y pierdes la radio. Primera acción vertical:', 'Subir a la MSA', ['Mantener la MVA', 'Descender a la MOCA', 'Mantener altitud indefinidamente']]];
  G.commFail = function (rng) { const [q, c, w] = pick(rng, CF); return single(rng, 'reglas-ifr', q, c, w, 'Procedimiento de fallo de comunicaciones (SERA.14083).', { g: 'Fallo de comunicaciones' }); };

  // 13. Plan de vuelo
  G.fpl = function (rng) {
    const k = pick(rng, ['equip', 'route', 'speed', 'rules']);
    if (k === 'equip') { const E = [['D', 'DME'], ['G', 'GPS/GNSS'], ['W', 'RVSM'], ['Y', 'Radio 8,33 kHz'], ['R', 'RNAV'], ['F', 'ADF'], ['L', 'ILS'], ['O', 'VOR'], ['J', 'Data link'], ['H', 'HF RTF'], ['S', 'Estándar (VHF, ADF, VOR, ILS)']]; const [l, n] = pick(rng, E); return single(rng, 'plan-de-vuelo', `En la casilla 10, la letra «${l}» significa…`, n, shuffle(rng, E.filter(x => x[0] !== l).map(x => x[1])), `${l} = ${n}.`, { g: 'Plan de vuelo' }); }
    if (k === 'route') { const p = pick(rng, R.VORS), s = randint(rng, 15, 48) * 10, f = randint(rng, 10, 39) * 10; return single(rng, 'plan-de-vuelo', `En la ruta aparece «${p}/N0${s}F${f}». Significa…`, `En ${p} cambia a ${s} kt TAS y FL${f}`, [`Directo a ${p} a FL${f}`, `${p} a ${s} NM y FL${f}`, `Espera en ${p} a FL${f}`], 'PUNTO/velocidad+nivel.', { g: 'Plan de vuelo' }); }
    if (k === 'speed') { const s = randint(rng, 12, 28) * 10; return single(rng, 'plan-de-vuelo', `¿Cómo se escribe una velocidad de crucero inicial de ${s} kt TAS?`, 'N0' + s, ['K0' + s, 'M0' + Math.round(s / 6), 'N' + s], 'N + 4 cifras = nudos TAS.', { g: 'Plan de vuelo' }); }
    const c = pick(rng, [['Sales VFR de un aeródromo sin procedimientos IFR y te unes a una aerovía', 'Z'], ['Sales IFR y cancelas para llegar VFR a un aeródromo no controlado', 'Y'], ['Todo el vuelo IFR', 'I'], ['Todo el vuelo VFR', 'V']]);
    return single(rng, 'plan-de-vuelo', `${c[0]}. Reglas de vuelo:`, c[1], ['I', 'V', 'Y', 'Z'], 'Y = IFR→VFR; Z = VFR→IFR.', { g: 'Plan de vuelo' });
  };

  // 14. Restricciones de altitud en cartas
  G.restriction = function (rng) {
    const alt = randint(rng, 20, 120) * 100;
    const R2 = [['subrayada', 'Mínima: a esa altitud o superior'], ['con línea encima', 'Máxima: a esa altitud o inferior'], ['con línea encima y debajo', 'Obligatoria: exactamente esa altitud'], ['sin líneas', 'Recomendada del procedimiento']];
    const [f, m] = pick(rng, R2);
    return single(rng, 'cartas', `En una carta aparece ${alt} ${f}. ¿Qué significa?`, m, R2.map(x => x[1]), m + '.', { g: 'Cartas' });
  };

  G.list = Object.keys(G).filter(k => typeof G[k] === 'function' && k !== 'list');
  G.combos = () => ({ holdEntry: 36 * 72 * 2, holdSpeed: 18 * 4, intercept: 72 * 36 * 3, instrument: 72 * 3, semicircular: 72 * 30, critical: 4, vspeed: 36, engineFail: 5, minalt: 18, ilsCat: 15, tas: 11 * 11 + 11 * 6 * 2, commFail: 6, fpl: 1500, restriction: 404 });
  G.generate = (rng, name) => G[name || pick(rng, G.list)](rng);
  G.mulberry32 = a => function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  if (typeof module !== 'undefined' && module.exports) module.exports = G; else root.SPP_GEN = G;
})(typeof window !== 'undefined' ? window : globalThis);
