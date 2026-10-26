/* Cabina SPP — app de estudio. Vanilla JS, sin dependencias. */
(function () {
  'use strict';
  const D = window.APP_DATA, R = window.SPP_RULES, G = window.SPP_GEN;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const rnd = Math.random;
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const topicById = Object.fromEntries(D.topics.map(t => [t.id, t]));
  const topicName = id => (topicById[id] || {}).title || id;
  const VIEW = $('#view');

  // ---------- almacenamiento local (opcional) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem('spp.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('spp.' + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };

  // ---------- markdown mínimo ----------
  function inline(t) {
    t = esc(t);
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/(^|[^\w/])_([^_]+?)_(?!\w)/g, '$1<em>$2</em>');
    t = t.replace(/\\\*/g, '*');
    return t;
  }
  const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  function md(src) {
    const L = src.split('\n'); let i = 0, out = '', para = [];
    const flush = () => { if (para.length) { out += '<p>' + inline(para.join(' ')) + '</p>'; para = []; } };
    while (i < L.length) {
      const ln = L[i].replace(/\s+$/, '');
      if (!ln.trim()) { flush(); i++; continue; }
      if (ln.startsWith('## ')) { flush(); const t = ln.slice(3); out += `<h2 id="${slug(t)}">${inline(t)}</h2>`; i++; continue; }
      if (ln.startsWith('### ')) { flush(); out += `<h3>${inline(ln.slice(4))}</h3>`; i++; continue; }
      if (ln.startsWith('|')) {
        flush(); const rows = [];
        while (i < L.length && L[i].startsWith('|')) { const c = L[i].trim().replace(/^\||\|$/g, '').split('|').map(x => x.trim()); if (!c.every(x => /^:?-{3,}:?$/.test(x))) rows.push(c); i++; }
        out += '<div class="tbl"><table><thead><tr>' + rows[0].map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
          rows.slice(1).map(r => '<tr>' + r.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>';
        continue;
      }
      let m = /^!\[(fig|wiki):([^|\]]+)\|?([^\]]*)\]/.exec(ln);
      if (m) {
        flush();
        if (m[1] === 'fig' && D.diagrams[m[2]]) out += `<figure class="fig"><div class="svg">${D.diagrams[m[2]]}</div><figcaption>${esc(m[3])}</figcaption></figure>`;
        else if (m[1] === 'wiki') out += `<a class="wikiimg" href="${esc(m[2])}" target="_blank" rel="noopener">Ver imagen en la wiki ↗ <span class="muted">${esc(m[3])}</span></a>`;
        i++; continue;
      }
      if (ln.startsWith('> [!')) {
        flush(); const kind = /> \[!(\w+)\]/.exec(ln)[1]; const buf = [ln.replace(/^> \[!\w+\]\s*/, '')]; i++;
        while (i < L.length && L[i].startsWith('>') && !L[i].startsWith('> [!')) { buf.push(L[i].slice(1).trim()); i++; }
        out += `<div class="call ${kind}"><span class="lbl">${kind === 'ivao' ? 'IVAO' : 'CLAVE'}</span>${buf.filter(Boolean).map(inline).join('<br>')}</div>`;
        continue;
      }
      if (ln.startsWith('>')) {
        flush(); const buf = [];
        while (i < L.length && L[i].startsWith('>')) { const s = L[i].slice(1).trim(); if (s) buf.push(`<div>${inline(s)}</div>`); i++; }
        out += `<div class="radio">${buf.join('')}</div>`; continue;
      }
      m = /^(\s*)([-*]|\d+\.)\s+(.*)/.exec(ln);
      if (m) {
        flush(); const ordered = /\d/.test(m[2]); const items = [];
        while (i < L.length) { const mm = /^(\s*)([-*]|\d+\.)\s+(.*)/.exec(L[i]); if (!mm) break; items.push(mm[3]); i++; }
        out += (ordered ? '<ol>' : '<ul>') + items.map(x => `<li>${inline(x)}</li>`).join('') + (ordered ? '</ol>' : '</ul>');
        continue;
      }
      para.push(ln.trim()); i++;
    }
    flush(); return out;
  }

  // ---------- estadísticas ----------
  const stats = store.get('stats', {}); // {topic: {ok, n}}
  function recordAnswer(topic, ok) { const s = stats[topic] || (stats[topic] = { ok: 0, n: 0 }); s.n++; if (ok) s.ok++; store.set('stats', stats); }

  // ---------- navegación ----------
  let state = { view: 'temario', topic: null };
  function go(view, extra) {
    state = Object.assign({ view }, extra || {});
    $$('#nav button').forEach(b => b.setAttribute('aria-current', b.dataset.view === view ? 'page' : 'false'));
    store.set('view', view);
    ({ temario: viewTemario, resumenes: viewResumenes, flashcards: viewFlash, test: viewTest, cabina: viewCabina, chuleta: viewChuleta })[view]();
    window.scrollTo(0, 0);
  }
  $$('#nav button').forEach(b => b.addEventListener('click', () => go(b.dataset.view)));

  // ---------- TEMARIO ----------
  function viewTemario() {
    if (state.topic) return viewTopic(state.topic);
    const tiles = D.topics.map(t => {
      const s = stats[t.id]; const pct = s && s.n ? Math.round(100 * s.ok / s.n) : null;
      const nQ = D.questions.filter(q => q.t === t.id).length, nF = D.flashcards.filter(f => f.topic === t.id).length;
      return `<button class="tile" data-topic="${t.id}"><span class="n">${t.num}</span><span><span class="t">${esc(t.title)}</span>
        <span class="m">${nQ} preguntas · ${nF} flashcards${pct != null ? ` · aciertos ${pct}% (${s.n})` : ''}</span>
        ${pct != null ? `<span class="progress"><i style="width:${pct}%"></i></span>` : ''}</span></button>`;
    }).join('');
    VIEW.innerHTML = `<div class="view-head"><div><div class="eyebrow">Libro SPP · ${D.topics.length} capítulos</div><h1>Temario</h1>
      <p>Todo el temario teórico del SPP organizado por temas, con diagramas, tablas y los puntos clave destacados. Los aciertos del test se reflejan en cada tema.</p></div></div>
      <div class="grid cols-3">${tiles}</div>`;
    $$('.tile', VIEW).forEach(b => b.addEventListener('click', () => go('temario', { topic: b.dataset.topic })));
  }
  function viewTopic(id) {
    const t = topicById[id], idx = D.topics.indexOf(t);
    const prev = D.topics[idx - 1], next = D.topics[idx + 1];
    const heads = (t.md.match(/^## .+$/gm) || []).map(h => h.slice(3));
    VIEW.innerHTML = `<div class="view-head"><div><div class="eyebrow">Tema ${t.num} de ${D.topics.length}</div><h1>${esc(t.title)}</h1>
      <p><a href="${esc(t.wiki)}" target="_blank" rel="noopener">Fuente en la wiki ↗</a></p></div>
      <div class="row"><button class="btn ghost" id="back">← Todos los temas</button><button class="btn" id="tq">Test de este tema</button><button class="btn" id="tf">Flashcards</button></div></div>
      <div class="reader"><article class="doc">${md(t.md)}
        ${D.summaries[id] ? `<section class="essential"><h3>Lo esencial</h3>${md(D.summaries[id])}</section>` : ''}
        <div class="pager">${prev ? `<button class="btn" data-go="${prev.id}">← ${esc(prev.title)}</button>` : '<span></span>'}${next ? `<button class="btn primary" data-go="${next.id}">${esc(next.title)} →</button>` : ''}</div>
      </article><nav class="toc" aria-label="En este tema">${heads.map(h => `<a href="#${slug(h)}" data-anchor="${slug(h)}">${esc(h)}</a>`).join('')}<a href="#" data-anchor="esencial">Lo esencial</a></nav></div>`;
    $('#back').onclick = () => go('temario');
    $('#tq').onclick = () => { testCfg.topics = [id]; go('test', { autostart: true }); };
    $('#tf').onclick = () => { flashCfg.topics = [id]; go('flashcards'); };
    $$('[data-go]', VIEW).forEach(b => b.onclick = () => go('temario', { topic: b.dataset.go }));
    $$('.toc a', VIEW).forEach(a => a.onclick = e => { e.preventDefault(); const el = a.dataset.anchor === 'esencial' ? $('.essential', VIEW) : document.getElementById(a.dataset.anchor); if (el) el.scrollIntoView({ behavior: 'smooth' }); });
  }

  // ---------- RESÚMENES ----------
  function viewResumenes() {
    const sel = state.topic || 'all';
    const list = sel === 'all' ? D.topics : [topicById[sel]];
    VIEW.innerHTML = `<div class="view-head"><div><div class="eyebrow">Repaso rápido</div><h1>Resúmenes</h1>
      <p>Lo imprescindible de cada tema en una sola pantalla. Ideal la noche antes del examen.</p></div></div>
      <div class="row" style="margin-bottom:14px"><span class="chip ${sel === 'all' ? 'on' : ''}"><button style="all:unset;cursor:pointer" data-s="all">Todos</button></span>
      ${D.topics.map(t => `<span class="chip ${sel === t.id ? 'on' : ''}"><button style="all:unset;cursor:pointer" data-s="${t.id}">${t.num}. ${esc(t.title)}</button></span>`).join('')}</div>
      <div class="grid">${list.map(t => `<article class="doc"><div class="eyebrow">Tema ${t.num}</div><h2 style="margin-top:4px;border:0;padding:0">${esc(t.title)}</h2>${md(D.summaries[t.id] || '')}
        <div class="row"><button class="btn" data-open="${t.id}">Leer el tema completo →</button></div></article>`).join('')}</div>`;
    $$('[data-s]', VIEW).forEach(b => b.onclick = () => go('resumenes', { topic: b.dataset.s === 'all' ? null : b.dataset.s }));
    $$('[data-open]', VIEW).forEach(b => b.onclick = () => go('temario', { topic: b.dataset.open }));
  }

  // ---------- FLASHCARDS (Leitner 1–5) ----------
  const flashCfg = { topics: null };
  const boxes = store.get('boxes', {}); // id -> box
  const fcId = c => slug(c.topic + '-' + c.front).slice(0, 80);
  function viewFlash() {
    const topics = flashCfg.topics;
    const pool = D.flashcards.filter(c => !topics || topics.includes(c.topic));
    const boxOf = c => boxes[fcId(c)] || 1;
    let queue = shuffle(pool).sort((a, b) => boxOf(a) - boxOf(b));
    let cur = 0, flipped = false, seen = 0, known = 0;
    function counts() { const n = [0, 0, 0, 0, 0]; pool.forEach(c => n[boxOf(c) - 1]++); return n; }
    function render() {
      const c = queue[cur]; const n = counts();
      VIEW.innerHTML = `<div class="view-head"><div><div class="eyebrow">Repetición espaciada · ${pool.length} tarjetas</div><h1>Flashcards</h1>
        <p>Toca la tarjeta (o pulsa espacio) para darle la vuelta. Las que no sabes vuelven a la caja 1 y salen antes; las que sabes suben de caja.</p></div></div>
        <div class="row" style="margin-bottom:12px"><span class="chip ${!topics ? 'on' : ''}"><button style="all:unset;cursor:pointer" data-t="all">Todos</button></span>
        ${D.topics.map(t => `<span class="chip ${topics && topics.includes(t.id) ? 'on' : ''}"><button style="all:unset;cursor:pointer" data-t="${t.id}">${esc(t.title)}</button></span>`).join('')}</div>
        <div class="box-row" style="margin-bottom:14px">${n.map((x, i) => `<div><b class="tabular">${x}</b><span>Caja ${i + 1}</span></div>`).join('')}</div>
        ${c ? `<div class="card-stage"><div class="fcard ${flipped ? 'flip' : ''}" id="fc" role="button" tabindex="0" aria-label="Dar la vuelta a la tarjeta">
          <div class="fface"><span class="lab">${esc(topicName(c.topic))} · caja ${boxOf(c)}</span><div class="txt">${esc(c.front)}</div><span class="lab">toca para ver la respuesta</span></div>
          <div class="fface back"><span class="lab">Respuesta</span><div class="txt">${esc(c.back)}</div></div></div></div>
          <div class="qbar"><span class="muted small tabular">Tarjeta ${cur + 1} de ${queue.length} · sesión: ${known}/${seen} sabidas</span>
          <div class="row"><button class="btn" id="no" ${flipped ? '' : 'disabled'}>No la sabía (1)</button><button class="btn primary" id="yes" ${flipped ? '' : 'disabled'}>La sabía (2)</button></div></div>`
          : `<div class="panel empty">Sesión terminada: ${known} de ${seen} sabidas. <button class="btn primary" id="again">Otra ronda</button></div>`}`;
      $$('[data-t]', VIEW).forEach(b => b.onclick = () => {
        const t = b.dataset.t;
        if (t === 'all') flashCfg.topics = null;
        else { const s = new Set(flashCfg.topics || []); s.has(t) ? s.delete(t) : s.add(t); flashCfg.topics = s.size ? [...s] : null; }
        viewFlash();
      });
      if (!c) { $('#again').onclick = viewFlash; return; }
      const flip = () => { flipped = !flipped; $('#fc').classList.toggle('flip', flipped); $('#no').disabled = $('#yes').disabled = !flipped; };
      $('#fc').onclick = flip;
      const answer = ok => { const id = fcId(c); boxes[id] = ok ? Math.min(5, boxOf(c) + 1) : 1; store.set('boxes', boxes); seen++; if (ok) known++; cur++; flipped = false; render(); };
      $('#no').onclick = () => answer(false); $('#yes').onclick = () => answer(true);
      keyHandler = e => { if (e.target.closest('input,textarea')) return; if (e.key === ' ') { e.preventDefault(); flip(); } else if (flipped && e.key === '1') answer(false); else if (flipped && e.key === '2') answer(true); };
    }
    render();
  }
  let keyHandler = null;
  document.addEventListener('keydown', e => { if (keyHandler && (state.view === 'flashcards' || state.view === 'test' || state.view === 'cabina')) keyHandler(e); });

  // ---------- TEST ----------
  const testCfg = { topics: null, source: 'mix', count: 20, mode: 'practice' };
  function buildQuestions() {
    const t = testCfg.topics;
    const fixed = D.questions.filter(q => !t || t.includes(q.t)).map(q => {
      const order = shuffle(q.o.map((_, i) => i));
      return { t: q.t, q: q.q, o: order.map(i => q.o[i]), a: q.a.map(i => order.indexOf(i)), m: !!q.m, e: q.e, g: 'Banco' };
    });
    const gens = G.list.filter(n => { const sample = G[n](Math.random); return !t || t.includes(sample.t); });
    const out = [];
    const n = testCfg.count;
    let nGen = testCfg.source === 'fixed' ? 0 : testCfg.source === 'gen' ? n : Math.round(n * 0.4);
    if (!gens.length) nGen = 0;
    const fx = shuffle(fixed).slice(0, n - nGen);
    for (let k = 0; k < n - fx.length && gens.length; k++) out.push(G[gens[k % gens.length]](Math.random));
    return shuffle(fx.concat(out)).slice(0, n);
  }
  function viewTest() {
    if (state.autostart) { state.autostart = false; return runTest(buildQuestions()); }
    const t = testCfg.topics;
    const nFixed = D.questions.filter(q => !t || t.includes(q.t)).length;
    const total = Object.values(G.combos()).reduce((a, b) => a + b, 0);
    const best = store.get('best', null);
    VIEW.innerHTML = `<div class="view-head"><div><div class="eyebrow">${D.questions.length} preguntas fijas + ${G.list.length} generadores</div><h1>Test</h1>
      <p>Preguntas de respuesta única y múltiple. Los generadores crean casos nuevos cada vez (entradas en espera, interceptaciones, lectura de RMI/HSI, regla semicircular, motor crítico, V-speeds, altitudes mínimas, TAS/GS, fallo de comunicaciones…): más de ${Math.floor(total / 1000) * 1000} combinaciones.</p></div></div>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr));margin-bottom:16px">
        <div class="panel stat"><b class="tabular">${nFixed}</b><span>preguntas fijas en la selección</span></div>
        <div class="panel stat"><b class="tabular">${Object.values(stats).reduce((a, s) => a + s.n, 0)}</b><span>respondidas en este navegador</span></div>
        <div class="panel stat"><b class="tabular">${best != null ? best + '%' : '—'}</b><span>mejor examen simulado</span></div>
      </div>
      <div class="panel" style="padding:18px;display:grid;gap:16px">
        <div><div class="eyebrow" style="margin-bottom:6px">Temas</div><div class="row">
          <label class="chip ${!t ? 'on' : ''}"><input type="checkbox" id="t-all" ${!t ? 'checked' : ''}> Todos</label>
          ${D.topics.map(x => `<label class="chip ${t && t.includes(x.id) ? 'on' : ''}"><input type="checkbox" id="t-${x.id}" data-id="${x.id}" ${t && t.includes(x.id) ? 'checked' : ''}> ${esc(x.title)}</label>`).join('')}</div></div>
        <div class="row" style="gap:22px">
          <div><div class="eyebrow" style="margin-bottom:6px">Origen</div><div class="seg" id="src">
            ${[['mix', 'Mezcla'], ['fixed', 'Solo banco'], ['gen', 'Solo generadas']].map(([k, l]) => `<button aria-pressed="${testCfg.source === k}" data-k="${k}">${l}</button>`).join('')}</div></div>
          <div><div class="eyebrow" style="margin-bottom:6px">Preguntas</div><div class="seg" id="cnt">
            ${[10, 20, 40, 80].map(k => `<button aria-pressed="${testCfg.count === k}" data-k="${k}">${k}</button>`).join('')}</div></div>
          <div><div class="eyebrow" style="margin-bottom:6px">Modo</div><div class="seg" id="mode">
            ${[['practice', 'Práctica'], ['exam', 'Examen']].map(([k, l]) => `<button aria-pressed="${testCfg.mode === k}" data-k="${k}">${l}</button>`).join('')}</div></div>
        </div>
        <p class="small muted" style="margin:0">Práctica: corrección y explicación tras cada pregunta. Examen: sin ayudas, nota y revisión al final.</p>
        <div><button class="btn primary" id="start">Empezar</button></div>
      </div>`;
    $('#t-all').onchange = () => { testCfg.topics = null; viewTest(); };
    $$('[data-id]', VIEW).forEach(c => c.onchange = () => { const s = new Set(testCfg.topics || []); c.checked ? s.add(c.dataset.id) : s.delete(c.dataset.id); testCfg.topics = s.size ? [...s] : null; viewTest(); });
    $$('#src button').forEach(b => b.onclick = () => { testCfg.source = b.dataset.k; viewTest(); });
    $$('#cnt button').forEach(b => b.onclick = () => { testCfg.count = +b.dataset.k; viewTest(); });
    $$('#mode button').forEach(b => b.onclick = () => { testCfg.mode = b.dataset.k; viewTest(); });
    $('#start').onclick = () => runTest(buildQuestions());
  }
  function runTest(qs) {
    let cur = 0; const answers = qs.map(() => null); const exam = testCfg.mode === 'exam';
    function isRight(q, sel) { return sel && sel.length === q.a.length && sel.every(x => q.a.includes(x)); }
    function render() {
      const q = qs[cur]; const ans = answers[cur]; const shown = ans && ans.done;
      const meter = qs.map((x, i) => { const a = answers[i]; const c = a && a.done ? (exam ? 'ok' : (isRight(x, a.sel) ? 'ok' : 'bad')) : ''; return `<i class="${c} ${i === cur ? 'cur' : ''}"></i>`; }).join('');
      const sel = ans ? ans.sel : [];
      const qhtml = esc(q.q).replace(/^METAR: (.+)$/m, '<span class="metar">METAR $1</span>');
      VIEW.innerHTML = `<div class="view-head"><div><div class="eyebrow">${exam ? 'Examen' : 'Práctica'} · pregunta ${cur + 1} de ${qs.length}</div><h1>Test</h1></div>
        <button class="btn ghost" id="quit">Salir</button></div>
        <div class="strip ${shown && !exam ? (isRight(q, sel) ? 'ok' : 'bad') : ''}"><div class="body">
          <div class="strip-meta"><span>${esc(topicName(q.t))}</span><span>${esc(q.g || '')}</span><span>${q.m || q.a.length > 1 ? 'Respuesta múltiple: marca todas las correctas' : 'Respuesta única'}</span></div>
          ${q.viz ? `<div class="vizbox">${viz(q.viz)}</div>` : ''}<p class="qtext">${qhtml}</p>
          <div class="opts">${q.o.map((o, i) => {
            let cls = sel.includes(i) ? 'sel' : '';
            if (shown && !exam) cls = q.a.includes(i) ? 'right' : (sel.includes(i) ? 'wrong' : '');
            return `<button class="opt ${cls}" data-i="${i}" ${shown ? 'disabled' : ''}><span class="k">${'ABCDEFG'[i]}</span><span>${esc(o)}</span></button>`;
          }).join('')}</div>
          ${shown && !exam ? `<div class="feedback ${isRight(q, sel) ? 'ok' : 'bad'}"><b>${isRight(q, sel) ? 'Correcto.' : 'Incorrecto.'}</b>${esc(q.e || '')}</div>` : ''}
          <div class="qbar"><div class="meter">${meter}</div><div class="row">
            ${!shown ? `<button class="btn primary" id="check" ${sel.length ? '' : 'disabled'}>${exam ? 'Responder' : 'Comprobar'}</button>` : `<button class="btn primary" id="next">${cur === qs.length - 1 ? 'Ver resultado' : 'Siguiente →'}</button>`}
          </div></div></div></div>`;
      $('#quit').onclick = () => viewTest();
      const multi = q.m || q.a.length > 1;
      $$('.opt', VIEW).forEach(b => b.onclick = () => {
        const i = +b.dataset.i; let s = (answers[cur] && answers[cur].sel) || [];
        s = multi ? (s.includes(i) ? s.filter(x => x !== i) : s.concat(i)) : [i];
        answers[cur] = { sel: s, done: false };
        if (!multi && exam) { answers[cur].done = true; recordAnswer(q.t, isRight(q, [i])); return next(); }
        render();
      });
      const check = () => { if (!sel.length) return; answers[cur].done = true; recordAnswer(q.t, isRight(q, sel)); exam ? next() : render(); };
      const next = () => { if (cur < qs.length - 1) { cur++; render(); } else finish(); };
      if ($('#check')) $('#check').onclick = check;
      if ($('#next')) $('#next').onclick = next;
            keyHandler = e => {
        const k = e.key.toUpperCase(); const idx = 'ABCDEFG'.indexOf(k);
        if (!shown && idx >= 0 && idx < q.o.length) { $$('.opt', VIEW)[idx].click(); }
        else if (e.key === 'Enter') { const b = $('#check') || $('#next'); if (b && !b.disabled) b.click(); }
      };
      if (exam && answers[cur] && answers[cur].done && !multi) { /* recorded at next */ }
    }
    function finish() {
      if (exam) qs.forEach((q, i) => { const a = answers[i]; if (a && a.done && !a.rec) { a.rec = true; } });
      const ok = qs.filter((q, i) => answers[i] && isRight(q, answers[i].sel)).length;
      const pct = Math.round(100 * ok / qs.length);
      if (exam) { const b = store.get('best', null); if (b == null || pct > b) store.set('best', pct); }
      const wrong = qs.map((q, i) => ({ q, a: answers[i] })).filter(x => !x.a || !isRight(x.q, x.a.sel));
      keyHandler = null;
      VIEW.innerHTML = `<div class="view-head"><div><div class="eyebrow">Resultado</div><h1>${ok} / ${qs.length} · ${pct}%</h1>
        <p>${pct >= 90 ? 'Listo para el examen.' : pct >= 75 ? 'Buen nivel: repasa los fallos.' : 'Toca repasar: revisa las explicaciones y vuelve al temario.'}</p></div>
        <div class="row"><button class="btn primary" id="again">Otro test</button><button class="btn" id="cfg">Cambiar ajustes</button></div></div>
        ${wrong.length ? `<div class="grid">${wrong.map(({ q, a }) => `<div class="strip bad"><div class="body"><div class="strip-meta"><span>${esc(topicName(q.t))}</span><span>${esc(q.g || '')}</span></div>
          <p class="qtext" style="font-size:15.5px">${esc(q.q)}</p>
          <div class="small"><b>Tu respuesta:</b> ${a && a.sel.length ? a.sel.map(i => esc(q.o[i])).join(' · ') : '—'}<br><b>Correcta:</b> ${q.a.map(i => esc(q.o[i])).join(' · ')}</div>
          <div class="feedback bad" style="margin-top:8px">${esc(q.e || '')}</div></div></div>`).join('')}</div>` : '<div class="panel empty">Sin fallos.</div>'}`;
      $('#again').onclick = () => runTest(buildQuestions());
      $('#cfg').onclick = () => viewTest();
    }
    // en modo examen registramos al finalizar respuesta (check ya llama recordAnswer)
    render();
  }

  // ---------- CABINA IFR ----------
  const P = (deg, r, cx, cy) => [cx + r * Math.sin(deg * Math.PI / 180), cy - r * Math.cos(deg * Math.PI / 180)];
  const f1 = n => Math.round(n * 10) / 10;
  function card(cx, cy, r, rot) { // rosa de rumbos girada (rot = rumbo arriba)
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--inst-bg)" stroke="var(--inst-ring)" stroke-width="2"/>`;
    for (let d = 0; d < 360; d += 5) {
      const a = d - rot, big = d % 30 === 0, mid = d % 10 === 0;
      const [x1, y1] = P(a, r - 2, cx, cy), [x2, y2] = P(a, r - (big ? 14 : mid ? 9 : 5), cx, cy);
      s += `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="var(--inst-fg)" stroke-width="${big ? 2 : 1}"/>`;
      if (big) { const lab = { 0: 'N', 90: 'E', 180: 'S', 270: 'W' }[d] || String(d / 10); const [tx, ty] = P(a, r - 26, cx, cy);
        s += `<text x="${f1(tx)}" y="${f1(ty + 4)}" text-anchor="middle" font-family="var(--mono)" font-size="12" font-weight="600" fill="var(--inst-fg)" transform="rotate(${a} ${f1(tx)} ${f1(ty + 4)})">${lab}</text>`; }
    }
    return s;
  }
  function rmiSVG(qdm, hdgAc) {
    const cx = 120, cy = 120, r = 104, a = qdm - hdgAc;
    const [hx, hy] = P(a, r - 34, cx, cy), [tx, ty] = P(a + 180, r - 34, cx, cy);
    return `<svg viewBox="0 0 240 262" class="inst" role="img" aria-label="RMI: cabeza ${R.hdg(qdm)}, rumbo ${R.hdg(hdgAc)}">${card(cx, cy, r, hdgAc)}
      <path d="M${cx},${cy - r - 6} l-7,-10 h14 z" fill="var(--inst-acc)"/>
      <line x1="${f1(tx)}" y1="${f1(ty)}" x2="${f1(hx)}" y2="${f1(hy)}" stroke="var(--inst-needle)" stroke-width="4" stroke-linecap="round"/>
      <path d="M${f1(hx)},${f1(hy)} l0,0" />${(() => { const [ax, ay] = P(a, r - 30, cx, cy), [bx, by] = P(a - 8, r - 46, cx, cy), [cx2, cy2] = P(a + 8, r - 46, cx, cy); return `<polygon points="${f1(ax)},${f1(ay)} ${f1(bx)},${f1(by)} ${f1(cx2)},${f1(cy2)}" fill="var(--inst-needle)"/>`; })()}
      <circle cx="${cx}" cy="${cy}" r="6" fill="var(--inst-fg)"/>
      <text x="120" y="256" text-anchor="middle" font-family="var(--mono)" font-size="12" fill="var(--muted)">RMI · rumbo ${R.hdg(hdgAc)}</text></svg>`;
  }
  function cdiSVG(crs, to) {
    const cx = 120, cy = 120, r = 104;
    return `<svg viewBox="0 0 240 262" class="inst" role="img" aria-label="CDI curso ${R.hdg(crs)} ${to ? 'TO' : 'FROM'}">${card(cx, cy, r, crs)}
      <path d="M${cx},${cy - r + 16} l-8,14 h16 z" fill="var(--inst-acc)"/>
      ${[-2, -1, 1, 2].map(k => `<circle cx="${cx + k * 22}" cy="${cy}" r="4" fill="none" stroke="var(--inst-fg)" stroke-width="1.5"/>`).join('')}
      <line x1="${cx}" y1="${cy - 52}" x2="${cx}" y2="${cy + 52}" stroke="var(--inst-acc)" stroke-width="4"/>
      <rect x="${cx + 28}" y="${cy + (to ? -30 : 14)}" width="38" height="18" rx="3" fill="var(--inst-fg)"/>
      <text x="${cx + 47}" y="${cy + (to ? -17 : 27)}" text-anchor="middle" font-family="var(--mono)" font-size="11" font-weight="700" fill="var(--inst-bg)">${to ? 'TO' : 'FROM'}</text>
      <text x="120" y="256" text-anchor="middle" font-family="var(--mono)" font-size="12" fill="var(--muted)">CDI · OBS ${R.hdg(crs)}</text></svg>`;
  }
  function asiSVG(ias) {
    const cx = 120, cy = 120, r = 104; const ang = v => -150 + (v - 40) * (300 / 180);
    const arc = (v1, v2, rr, col, w) => { const [x1, y1] = P(ang(v1), rr, cx, cy), [x2, y2] = P(ang(v2), rr, cx, cy); const large = ang(v2) - ang(v1) > 180 ? 1 : 0; return `<path d="M${f1(x1)},${f1(y1)} A${rr},${rr} 0 ${large} 1 ${f1(x2)},${f1(y2)}" stroke="${col}" stroke-width="${w}" fill="none"/>`; };
    const tick = (v, col) => { const [x1, y1] = P(ang(v), r - 2, cx, cy), [x2, y2] = P(ang(v), r - 22, cx, cy); return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${col}" stroke-width="4"/>`; };
    let nums = ''; for (let v = 40; v <= 220; v += 20) { const [x, y] = P(ang(v), r - 34, cx, cy); nums += `<text x="${f1(x)}" y="${f1(y + 4)}" text-anchor="middle" font-family="var(--mono)" font-size="11" fill="var(--inst-fg)">${v}</text>`; }
    const [nx, ny] = P(ang(Math.max(40, Math.min(220, ias))), r - 18, cx, cy);
    return `<svg viewBox="0 0 240 262" class="inst" role="img" aria-label="Anemómetro ${ias} nudos"><circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--inst-bg)" stroke="var(--inst-ring)" stroke-width="2"/>
      ${arc(60, 110, r - 8, '#f8fafc', 6)}${arc(66, 170, r - 15, '#22c55e', 8)}${arc(170, 200, r - 15, '#eab308', 8)}${tick(200, '#ef4444')}${tick(70, '#ef4444')}${tick(88, '#3b82f6')}${nums}
      <line x1="${cx}" y1="${cy}" x2="${f1(nx)}" y2="${f1(ny)}" stroke="var(--inst-needle)" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="7" fill="var(--inst-fg)"/>
      <text x="120" y="160" text-anchor="middle" font-family="var(--mono)" font-size="11" fill="var(--inst-fg)">KT</text>
      <text x="120" y="256" text-anchor="middle" font-family="var(--mono)" font-size="12" fill="var(--muted)">${ias} kt · VMCA 70 · VYSE 88</text></svg>`;
  }
  function holdSVG(inb, h, right, showSectors) {
    const cx = 170, cy = 140, L = 92, W = 52, d = (b, r) => [Math.sin(b * Math.PI / 180) * r, -Math.cos(b * Math.PI / 180) * r];
    const side = right ? inb + 90 : inb - 90;
    const [sx, sy] = d(inb + 180, L), [ox, oy] = d(side, W);
    const F = [cx, cy], S = [cx + sx, cy + sy], F2 = [cx + ox, cy + oy], S2 = [cx + sx + ox, cy + sy + oy];
    const sweep = right ? 1 : 0;
    let sect = '';
    if (showSectors) {
      const wedge = (b1, b2, col) => { const [x1, y1] = P(b1, 118, cx, cy), [x2, y2] = P(b2, 118, cx, cy); const span = ((b2 - b1) % 360 + 360) % 360; return `<path d="M${cx},${cy} L${f1(x1)},${f1(y1)} A118,118 0 ${span > 180 ? 1 : 0} 1 ${f1(x2)},${f1(y2)} Z" fill="${col}" opacity=".28"/>`; };
      // posiciones de llegada (bearing desde el fijo) = rumbo al fijo + 180
      const O = R.recip(inb);
      if (right) { sect = wedge(O + 180 - 0 + 180, O + 180 + 110, '#84cc16') ; }
      const toPos = hh => R.norm(hh + 180);
      const rng = right ? { par: [O, O + 110], gota: [O - 70, O] } : { par: [O - 110, O], gota: [O, O + 70] };
      // paralela si alejamiento en [H-110,H] (der.) → H en [O, O+110] → posición en [O+180, O+290]
      sect = wedge(toPos(rng.par[0]), toPos(rng.par[1]), '#84cc16') + wedge(toPos(rng.gota[0]), toPos(rng.gota[1]), '#6366f1');
      const rest = right ? [toPos(O + 110), toPos(O - 70)] : [toPos(O + 70), toPos(O - 110)];
      sect += wedge(rest[0], rest[1], '#ef4444');
    }
    const [px, py] = d(h + 180, 128), [qx, qy] = d(h + 180, 40);
    return `<svg viewBox="0 0 340 290" class="inst" role="img" aria-label="Espera, acercamiento ${R.hdg(inb)}, ${right ? 'derecha' : 'izquierda'}; llegada con rumbo ${R.hdg(h)}">
      <rect width="340" height="290" rx="8" fill="var(--inst-bg)"/>${sect}
      <text x="12" y="20" font-family="var(--mono)" font-size="11" fill="var(--inst-fg)">N ↑</text>
      <path d="M${f1(S[0])},${f1(S[1])} L${F[0]},${F[1]}" stroke="var(--inst-acc)" stroke-width="4"/>
      <path d="M${F[0]},${F[1]} A${W / 2},${W / 2} 0 0 ${sweep} ${f1(F2[0])},${f1(F2[1])} L${f1(S2[0])},${f1(S2[1])} A${W / 2},${W / 2} 0 0 ${sweep} ${f1(S[0])},${f1(S[1])}" stroke="var(--inst-acc)" stroke-width="2.5" stroke-dasharray="6 4" fill="none"/>
      <circle cx="${cx}" cy="${cy}" r="6" fill="var(--inst-fg)"/>
      <line x1="${f1(cx + px)}" y1="${f1(cy + py)}" x2="${f1(cx + qx)}" y2="${f1(cy + qy)}" stroke="var(--inst-needle)" stroke-width="3" stroke-dasharray="2 5"/>
      ${(() => { const [tx, ty] = [cx + qx, cy + qy]; const [ax, ay] = d(h, 0); const [l1x, l1y] = d(h + 150, 12), [l2x, l2y] = d(h - 150, 12); return `<polygon points="${f1(tx)},${f1(ty)} ${f1(tx + l1x)},${f1(ty + l1y)} ${f1(tx + l2x)},${f1(ty + l2y)}" fill="var(--inst-needle)"/>`; })()}
      <text x="12" y="276" font-family="var(--mono)" font-size="11" fill="var(--inst-fg)">Acerc. ${R.hdg(inb)}° · ${right ? 'derecha' : 'izquierda'} · tu rumbo ${R.hdg(h)}°</text></svg>`;
  }
  function viz(v) {
    if (!v || v.kind === 'none') return '';
    if (v.kind === 'rmi') return rmiSVG(v.qdm, v.hdgAc);
    if (v.kind === 'cdi') return cdiSVG(v.crs, v.to);
    if (v.kind === 'asi') return asiSVG(v.ias);
    if (v.kind === 'hold') return holdSVG(v.inb, v.h, v.right, v.sectors);
    return '';
  }
  const done = store.get('scen', {});
  function viewCabina() {
    const tab = state.tab || 'esc';
    VIEW.innerHTML = `<div class="view-head"><div><div class="eyebrow">Mini-juego</div><h1>Cabina IFR</h1>
      <p>Vuela situaciones del examen paso a paso, con los instrumentos delante. Las decisiones que te suspenderían (level bust, bajar de la mínima, perder el control) cuentan aparte.</p></div>
      <div class="seg"><button aria-pressed="${tab === 'esc'}" data-tab="esc">Escenarios</button><button aria-pressed="${tab === 'int'}" data-tab="int">Interceptaciones</button><button aria-pressed="${tab === 'hold'}" data-tab="hold">Entradas en espera</button></div></div>
      <div id="cab"></div>`;
    $$('[data-tab]', VIEW).forEach(b => b.onclick = () => go('cabina', { tab: b.dataset.tab }));
    const box = $('#cab');
    if (tab === 'int') return interceptTrainer(box);
    if (tab === 'hold') return holdTrainer(box);
    const cats = [...new Set(D.scenarios.map(s => s.cat))];
    box.innerHTML = cats.map(c => `<h3 class="cat-h">${esc(c)}</h3>
      <div class="grid cols-3">${D.scenarios.filter(s => s.cat === c).map(s => `<button class="scen ${done[s.id] ? 'done' : ''}" data-s="${s.id}"><span class="body">
        <span class="cs"><span>${esc(s.setup.ac)}</span><span>${'●'.repeat(s.diff)}${'○'.repeat(3 - s.diff)}</span></span>
        <span class="tt" style="display:block">${esc(s.title)}</span>
        <span class="small muted">${s.steps.length} decisiones${done[s.id] ? ` · mejor ${done[s.id]}%` : ''}</span></span></button>`).join('')}</div>`).join('');
    $$('[data-s]', box).forEach(b => b.onclick = () => playScenario(D.scenarios.find(s => s.id === b.dataset.s)));
  }
  function playScenario(sc) {
    let step = 0, points = 0, losses = 0; const log = [];
    const steps = sc.steps.map(st => { const order = shuffle(st.o.map((_, i) => i)); return Object.assign({}, st, { o: order.map(i => st.o[i]), a: st.a.map(i => order.indexOf(i)) }); });
    function render(sel, shown) {
      const st = steps[step]; sel = sel || [];
      const multi = st.a.length > 1;
      const right = shown && sel.length === st.a.length && sel.every(x => st.a.includes(x));
      const v = viz(st.viz);
      VIEW.innerHTML = `<div class="view-head"><div><div class="eyebrow">${esc(sc.cat)} · decisión ${step + 1} de ${steps.length}</div><h1>${esc(sc.title)}</h1></div>
        <button class="btn ghost" id="exit">← Escenarios</button></div>
        <div class="scorebar"><div class="panel"><b class="tabular">${points}</b><span>puntos</span></div><div class="panel"><b class="tabular">${step}/${steps.length}</b><span>decisiones</span></div><div class="panel"><b class="tabular" style="color:${losses ? 'var(--bad)' : 'inherit'}">${losses}</b><span>errores de suspenso</span></div></div>
        <div class="game"><div>${v ? `<div class="panelinst">${v}</div>` : ''}<div class="atis"><b>${esc(sc.setup.ac)}</b> · ${esc(sc.setup.route)}${sc.setup.metar ? '<br>' + esc(sc.setup.metar) : ''}${sc.setup.notes ? '<br>' + esc(sc.setup.notes) : ''}</div></div>
        <div><div class="sit">${esc(st.sit)}</div>
          <div class="strip arr ${shown ? (right ? 'ok' : 'bad') : ''}"><div class="body"><div class="strip-meta"><span>${multi ? 'Marca todas las correctas' : 'Elige una'}</span>${st.sev === 'loss' ? '<span style="color:var(--bad)">Crítica: motivo de suspenso</span>' : ''}</div>
          <p class="qtext" style="font-size:16px">${esc(st.q)}</p>
          <div class="opts">${st.o.map((o, i) => { let c = sel.includes(i) ? 'sel' : ''; if (shown) c = st.a.includes(i) ? 'right' : (sel.includes(i) ? 'wrong' : ''); return `<button class="opt ${c}" data-i="${i}" ${shown ? 'disabled' : ''}><span class="k">${'ABCDE'[i]}</span><span>${esc(o)}</span></button>`; }).join('')}</div>
          ${shown ? `<div class="feedback ${right ? 'ok' : 'bad'}"><b>${right ? 'Correcto.' : (st.sev === 'loss' ? 'En el examen esto sería suspenso.' : 'No es lo correcto.')}</b>${esc(st.e)}</div>` : ''}
          <div class="qbar"><span></span>${shown ? `<button class="btn primary" id="nx">${step === steps.length - 1 ? 'Terminar' : 'Siguiente →'}</button>` : `<button class="btn primary" id="ck" ${sel.length ? '' : 'disabled'}>Confirmar</button>`}</div>
          </div></div></div></div>`;
      $('#exit').onclick = () => go('cabina');
      $$('.opt', VIEW).forEach(b => b.onclick = () => { const i = +b.dataset.i; const s = multi ? (sel.includes(i) ? sel.filter(x => x !== i) : sel.concat(i)) : [i]; render(s, false); });
      if ($('#ck')) $('#ck').onclick = () => { const ok = sel.length === st.a.length && sel.every(x => st.a.includes(x)); if (ok) points += st.sev === 'loss' ? 20 : 10; else if (st.sev === 'loss') losses++; log.push(ok); render(sel, true); };
      if ($('#nx')) $('#nx').onclick = () => { if (step < steps.length - 1) { step++; render(); } else finish(); };
      keyHandler = e => { const idx = 'ABCDE'.indexOf(e.key.toUpperCase()); if (!shown && idx >= 0 && idx < st.o.length) $$('.opt', VIEW)[idx].click(); else if (e.key === 'Enter') { const b = $('#ck') || $('#nx'); if (b && !b.disabled) b.click(); } };
    }
    function finish() {
      const max = steps.reduce((a, s) => a + (s.sev === 'loss' ? 20 : 10), 0); const pct = Math.round(100 * points / max);
      if (!done[sc.id] || pct > done[sc.id]) { done[sc.id] = pct; store.set('scen', done); }
      keyHandler = null;
      VIEW.innerHTML = `<div class="view-head"><div><div class="eyebrow">Fin del escenario</div><h1>${esc(sc.title)}</h1>
        <p>${points} de ${max} puntos (${pct}%). ${losses ? `${losses} ${losses > 1 ? 'decisiones habrían' : 'decisión habría'} supuesto suspenso.` : 'Sin errores de suspenso.'}</p></div>
        <div class="row"><button class="btn primary" id="rep">Repetir</button><button class="btn" id="lst">Otros escenarios</button></div></div>
        <div class="grid">${steps.map((s, i) => `<div class="strip ${log[i] ? 'ok' : 'bad'}"><div class="body"><div class="strip-meta"><span>Decisión ${i + 1}</span><span>${log[i] ? 'Correcta' : 'Fallada'}</span></div>
          <div class="small"><b>${esc(s.q)}</b><br>${s.a.map(k => esc(s.o[k])).join(' · ')}</div><div class="small muted" style="margin-top:4px">${esc(s.e)}</div></div></div>`).join('')}</div>`;
      $('#rep').onclick = () => playScenario(sc); $('#lst').onclick = () => go('cabina');
    }
    render();
  }

  // Entrenador de interceptaciones
  const streaks = store.get('streaks', { int: 0, hold: 0, intBest: 0, holdBest: 0 });
  function interceptTrainer(box) {
    const inbound = rnd() < 0.5; const qdm = (1 + Math.floor(rnd() * 72)) * 5; const hdgAc = Math.floor(rnd() * 36) * 10;
    let desired, d; do { desired = (1 + Math.floor(rnd() * 36)) * 10; d = R.diff(inbound ? qdm : R.recip(qdm), desired); } while (d < 15 || (d > 80 && d < 100) || d > 170);
    const viaRadial = inbound && rnd() < 0.5; const res = R.intercept(qdm, desired, inbound);
    const instr = inbound ? (viaRadial ? `Acérquese por el radial ${R.hdg(R.recip(desired))}` : `Intercepte el curso de acercamiento ${R.hdg(desired)}`) : `Aléjese por el radial ${R.hdg(desired)}`;
    const pasOpts = shuffle([`Rumbo ${R.hdg(res.heading)}; al través ${inbound ? '1 min y 90° hacia la estación' : '45° hacia la estación'}`, `Rumbo ${R.hdg(res.heading)}; al través ${inbound ? '45° hacia la estación' : '1 min y 90° hacia la estación'}`, `Rumbo ${R.hdg(R.recip(res.heading))} directamente`]);
    const correctPas = pasOpts.findIndex(x => x.startsWith(`Rumbo ${R.hdg(res.heading)}; al través ${inbound ? '1 min' : '45°'}`));
    box.innerHTML = `<div class="game"><div class="panelinst">${rmiSVG(qdm, hdgAc)}</div><div>
      <div class="sit"><b>Instrucción:</b> «${instr}».<br><span class="small">Lee la cabeza y la cola del RMI, decide si es ruta directa o pasada y calcula el rumbo.</span></div>
      <div class="panel" style="padding:16px;display:grid;gap:12px">
        <div class="row"><span class="eyebrow">Tipo</span><div class="seg" id="tipo"><button data-k="directa" aria-pressed="false">Ruta directa</button><button data-k="pasada" aria-pressed="false">Ruta pasada</button></div></div>
        <div id="ans"></div><div id="fb"></div>
        <div class="row small muted">Racha: <b class="tabular">${streaks.int}</b> · mejor: <b class="tabular">${streaks.intBest}</b></div>
      </div></div></div>`;
    let tipo = null;
    $$('#tipo button', box).forEach(b => b.onclick = () => { tipo = b.dataset.k; $$('#tipo button', box).forEach(x => x.setAttribute('aria-pressed', x === b)); renderAns(); });
    function verdict(ok, extra) {
      if (ok) { streaks.int++; streaks.intBest = Math.max(streaks.intBest, streaks.int); } else streaks.int = 0; store.set('streaks', streaks);
      const expl = res.tipo === 'directa' ? (inbound ? `Deseada ${R.hdg(desired)} · cabeza ${R.hdg(qdm)} · diferencia ${res.d}° → DC 30 → rumbo ${R.hdg(res.heading)}.` : `Cola ${R.hdg(R.recip(qdm))} · deseada ${R.hdg(desired)} · diferencia ${res.d}° → CD 45 → rumbo ${R.hdg(res.heading)}.`) : `Diferencia ${res.d}° > 90 → ruta pasada en ${inbound ? 'acercamiento' : 'alejamiento'}: ${res.rule} (rumbo radial ${R.hdg(res.heading)}).`;
      $('#fb', box).innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}"><b>${ok ? 'Correcto.' : 'No.'}</b>${extra || ''}${esc(expl)}</div><div class="qbar"><span></span><button class="btn primary" id="otra">Otra interceptación</button></div>`;
      $('#otra', box).onclick = () => interceptTrainer(box);
      $$('#ans input, #ans button, #tipo button', box).forEach(x => x.disabled = true);
    }
    function renderAns() {
      const a = $('#ans', box);
      if (tipo !== res.tipo) { a.innerHTML = ''; verdict(false, `Es ruta ${res.tipo}. `); return; }
      if (tipo === 'directa') {
        a.innerHTML = `<label class="small" for="hdgin">Rumbo de interceptación (°)</label><div class="row"><input id="hdgin" class="num" type="number" min="1" max="360" inputmode="numeric" placeholder="p. ej. 100"><button class="btn primary" id="chk">Comprobar</button></div>`;
        const chk = () => { const v = +$('#hdgin', box).value; if (!v) return; verdict(R.diff(v, res.heading) <= 5, R.diff(v, res.heading) <= 5 ? '' : `Has puesto ${R.hdg(v)}. `); };
        $('#chk', box).onclick = chk; $('#hdgin', box).onkeydown = e => { if (e.key === 'Enter') chk(); }; $('#hdgin', box).focus();
      } else {
        a.innerHTML = `<div class="opts">${pasOpts.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${'ABC'[i]}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
        $$('.opt', a).forEach(b => b.onclick = () => { const i = +b.dataset.i; b.classList.add(i === correctPas ? 'right' : 'wrong'); verdict(i === correctPas); });
      }
    }
  }

  // Entrenador de entradas en espera
  function holdTrainer(box) {
    let inb, h, right; do { inb = Math.floor(rnd() * 36) * 10; h = Math.floor(rnd() * 72) * 5; right = rnd() < 0.7; } while (R.holdBoundaryDist(h, inb, right) < 8);
    const entry = R.holdEntry(h, inb, right); const fix = R.VORS[Math.floor(rnd() * 12)];
    function draw(shown, pick) {
      box.innerHTML = `<div class="game"><div class="panelinst">${holdSVG(inb, h, right, shown)}</div><div>
        <div class="sit">Espera ${right ? '<b>estándar</b> (derecha)' : '<b>no estándar</b> (izquierda)'} sobre <b>${fix}</b>, curso de acercamiento <b>${R.hdg(inb)}°</b>. Vuelas hacia ${fix} con rumbo <b>${R.hdg(h)}°</b>.</div>
        <div class="opts">${['directa', 'paralela', 'gota'].map((k, i) => { let c = ''; if (shown) c = k === entry ? 'right' : (k === pick ? 'wrong' : ''); return `<button class="opt ${c}" data-k="${k}" ${shown ? 'disabled' : ''}><span class="k">${'ABC'[i]}</span><span>${{ directa: 'Directa (sector 3)', paralela: 'Paralela (sector 1)', gota: 'En gota (sector 2)' }[k]}</span></button>`; }).join('')}</div>
        ${shown ? `<div class="feedback ${pick === entry ? 'ok' : 'bad'}"><b>${pick === entry ? 'Correcto.' : 'Es entrada ' + entry + '.'}</b>Rumbo de alejamiento ${R.hdg(R.recip(inb))}°. Mano ${right ? 'derecha' : 'izquierda'} con el índice en ${R.hdg(h)}°: ${right ? `paralela si el alejamiento cae entre ${R.hdg(h - 110)} y ${R.hdg(h)}, gota entre ${R.hdg(h)} y ${R.hdg(h + 70)}` : `paralela entre ${R.hdg(h)} y ${R.hdg(h + 110)}, gota entre ${R.hdg(h - 70)} y ${R.hdg(h)}`}; el resto, directa. En el dibujo: verde paralela, azul gota, rojo directa (zona desde la que llegas).</div><div class="qbar"><span></span><button class="btn primary" id="otra">Otra espera</button></div>` : ''}
        <p class="small muted">Racha: <b class="tabular">${streaks.hold}</b> · mejor: <b class="tabular">${streaks.holdBest}</b>. En el examen SPP solo se evalúa la entrada directa, pero saber identificar las tres evita errores.</p></div></div>`;
      $$('.opt', box).forEach(b => b.onclick = () => { const ok = b.dataset.k === entry; if (ok) { streaks.hold++; streaks.holdBest = Math.max(streaks.hold, streaks.holdBest); } else streaks.hold = 0; store.set('streaks', streaks); draw(true, b.dataset.k); });
      if ($('#otra', box)) $('#otra', box).onclick = () => holdTrainer(box);
      keyHandler = e => { const idx = 'ABC'.indexOf(e.key.toUpperCase()); if (!shown && idx >= 0) $$('.opt', box)[idx].click(); else if (shown && e.key === 'Enter') $('#otra', box).click(); };
    }
    draw(false);
  }

  // ---------- CHULETA ----------
  function viewChuleta() {
    VIEW.innerHTML = `<div class="view-head"><div><div class="eyebrow">Tablas de bolsillo</div><h1>Chuleta</h1>
      <p>Todos los números que hay que tener en la cabeza, en una sola página.</p></div></div><article class="doc">${md(D.cheatsheet)}</article>`;
  }

  // ---------- arranque ----------
  const tokens = ['temario', 'resumenes', 'flashcards', 'test', 'cabina', 'chuleta'];
  const h = (location.hash || '').slice(1);
  if (tokens.includes(h)) go(h);
  else if (h.startsWith('t-') && topicById[h.slice(2)]) go('temario', { topic: h.slice(2) });
  else go(tokens.includes(store.get('view', '')) ? store.get('view', 'temario') : 'temario');
})();
