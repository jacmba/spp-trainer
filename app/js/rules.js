/* Reglas de cálculo del temario SPP (IVAO España). */
(function (root) {
  'use strict';
  const norm = a => ((Math.round(a) % 360) + 360) % 360;
  const hdg = a => { const n = norm(a); return String(n === 0 ? 360 : n).padStart(3, '0'); };
  const recip = a => norm(a + 180);
  // diferencia angular mínima (0..180)
  const diff = (a, b) => { const d = Math.abs(norm(a) - norm(b)) % 360; return d > 180 ? 360 - d : d; };
  // ¿está x dentro del arco que va de a a b en sentido horario?
  const inArc = (x, a, b) => { x = norm(x); a = norm(a); b = norm(b); return a <= b ? (x >= a && x <= b) : (x >= a || x <= b); };
  // signo del giro más corto de a hacia b (+1 horario, −1 antihorario)
  const turnDir = (a, b) => { const d = norm(b - a); return d === 0 ? 0 : (d <= 180 ? 1 : -1); };

  // ---------- Esperas ----------
  // Regla de la mano. H = rumbo con el que se vuela al fijo; inbound = curso de acercamiento; right = estándar
  function holdEntry(H, inbound, right) {
    const O = recip(inbound);
    if (right) {
      if (inArc(O, H - 110, H)) return 'paralela';
      if (inArc(O, H, H + 70)) return 'gota';
      return 'directa';
    }
    if (inArc(O, H, H + 110)) return 'paralela';
    if (inArc(O, H - 70, H)) return 'gota';
    return 'directa';
  }
  // distancia (°) al límite de sector más cercano, para evitar la zona de flexibilidad
  function holdBoundaryDist(H, inbound, right) {
    const O = recip(inbound);
    const bounds = right ? [H - 110, H, H + 70] : [H, H + 110, H - 70];
    return Math.min(...bounds.map(b => diff(O, b)));
  }
  function holdMaxSpeed(altFt, opts) {
    opts = opts || {};
    if (altFt <= 14000) return opts.catAB ? '170 kt' : (opts.turb ? '280 kt' : '230 kt');
    if (altFt <= 20000) return opts.turb ? 'la menor de 280 kt o M0,8' : (opts.airway ? '280 kt' : '240 kt');
    if (altFt <= 34000) return opts.turb ? 'la menor de 280 kt o M0,8' : (opts.airway ? '280 kt' : '265 kt');
    return 'M0,83';
  }
  const holdLegTime = altFt => altFt <= 14000 ? '1 minuto' : '1,5 minutos';

  // ---------- Interceptaciones ----------
  // inbound=true: acercamiento (compara cabeza QDM con deseada). Devuelve {tipo, rule, heading}
  function intercept(qdm, desired, inbound) {
    const ref = inbound ? qdm : recip(qdm); // cabeza o cola
    const d = diff(ref, desired);
    if (d <= 90) {
      if (inbound) { const s = turnDir(desired, ref); return { tipo: 'directa', rule: 'DC 30', heading: norm(ref + s * 30), d }; }
      const s = turnDir(ref, desired); return { tipo: 'directa', rule: 'CD 45', heading: norm(desired + s * 45), d };
    }
    return { tipo: 'pasada', rule: inbound ? 'rumbo radial, al través 1 min, 90° hacia la estación' : 'rumbo radial, al través 45° hacia la estación', heading: inbound ? recip(desired) : desired, d };
  }

  // ---------- Regla semicircular ----------
  function semicircularOk(track, fl, vfr) {
    const east = norm(track) < 180; const base = vfr ? fl - 5 : fl;
    if (base % 10 !== 0) return false;
    if (base >= 290 && base <= 410 && !vfr) { // RVSM
      return east ? [290, 310, 330, 350, 370, 390, 410].includes(base) : [300, 320, 340, 360, 380, 400].includes(base);
    }
    const odd = (base / 10) % 2 === 1;
    return east ? odd : !odd;
  }

  // ---------- Motor crítico ----------
  function criticalEngine(left, right) { // 'h' horario, 'a' antihorario
    if (left === 'h' && right === 'h') return 'Izquierdo';
    if (left === 'a' && right === 'a') return 'Derecho';
    return 'Ninguno';
  }

  // ---------- Aproximaciones ----------
  const approachType = dh => dh >= 250 ? 'Tipo A' : 'Tipo B';
  function ilsCat(dh) { if (dh == null) return 'CAT III C'; if (dh >= 200) return 'CAT I'; if (dh >= 100) return 'CAT II'; if (dh >= 50) return 'CAT III A'; return 'CAT III B'; }

  // ---------- TAS ----------
  const tasEstimate = (ias, altFt) => Math.round(ias * (1 + 0.02 * altFt / 1000));

  const AIRCRAFT = [
    { t: 'PA34', name: 'Piper Seneca' }, { t: 'BE58', name: 'Beechcraft Baron 58' }, { t: 'BE20', name: 'King Air 200' },
    { t: 'DA42', name: 'Diamond DA42' }, { t: 'C310', name: 'Cessna 310' }, { t: 'P68', name: 'Partenavia P68' }
  ];
  const VORS = ['VES', 'SLL', 'PDT', 'VLC', 'BLV', 'NVS', 'CCS', 'ZMR', 'SVL', 'MGA', 'TLD', 'RBO', 'CRISA', 'PISAV'];

  const API = { norm, hdg, recip, diff, inArc, turnDir, holdEntry, holdBoundaryDist, holdMaxSpeed, holdLegTime, intercept, semicircularOk, criticalEngine, approachType, ilsCat, tasEstimate, AIRCRAFT, VORS };
  if (typeof module !== 'undefined' && module.exports) module.exports = API; else root.SPP_RULES = API;
})(typeof window !== 'undefined' ? window : globalThis);
