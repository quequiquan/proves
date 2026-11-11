'use strict';
/* Comptes i sincronització amb Supabase.
   Cada persona entra amb el seu correu i un codi que rep per correu (sense contrasenya).
   Cada compte només veu els seus plans, i pot enviar plans a l'app d'altres persones pel seu correu.
   Usa de app.js: state, ui, KEY, PROVES, save, render, toast, esc, $, reiniciaDades, snapshotPla, nomPropi */

const Sync = (() => {
  const cfg = window.QQQ_CONFIG || {};
  const disponible = !!(cfg.supabaseUrl && cfg.supabaseKey && window.supabase);
  const ENTORN = PROVES ? 'proves' : 'definitiva';
  const AUTH = 'qqq-auth';
  const MKEY = KEY + '-sync';
  const CKEY = KEY + '-comp';
  const COLS = ['tipus', 'persones', 'plans'];
  const META0 = { snap: {}, ultima: null, usuari: null, compSnap: {}, compUltima: null };
  const COMP0 = { enviats: {}, rebuts: {} };

  const sb = disponible ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: AUTH },
  }) : null;

  let usuari = null;
  let estat = disponible ? 'sense-compte' : 'off', detall = '';
  let ocupat = null, repetir = false, temps = null, aplicant = false;
  let meta = llegeix(MKEY, META0);
  let comp = llegeix(CKEY, COMP0);

  function llegeix(k, def) {
    try { const m = JSON.parse(localStorage.getItem(k)); if (m && typeof m === 'object') return { ...JSON.parse(JSON.stringify(def)), ...m }; } catch (e) { /* res */ }
    return JSON.parse(JSON.stringify(def));
  }
  function desa() {
    try { localStorage.setItem(MKEY, JSON.stringify(meta)); localStorage.setItem(CKEY, JSON.stringify(comp)); } catch (e) { /* res */ }
  }

  // JSON amb les claus ordenades, per comparar registres de manera fiable
  const estable = (v) => Array.isArray(v) ? '[' + v.map(estable).join(',') + ']'
    : v && typeof v === 'object'
      ? '{' + Object.keys(v).sort().filter((k) => v[k] !== undefined).map((k) => JSON.stringify(k) + ':' + estable(v[k])).join(',') + '}'
      : JSON.stringify(v ?? null);

  /* ---------- Dades pròpies ---------- */
  function mapa() {
    const m = {};
    COLS.forEach((c) => state[c].forEach((r) => { m[c + ':' + r.id] = estable(r); }));
    m['config:ajustos'] = estable(state.ajustos || {});
    return m;
  }
  function pendents() {
    const ara = mapa(), out = [];
    for (const k in ara) if (meta.snap[k] !== ara[k]) out.push({ k, v: ara[k], esborrat: false });
    for (const k in meta.snap) if (!(k in ara)) out.push({ k, v: meta.snap[k], esborrat: true });
    return out;
  }
  const parteix = (k) => { const i = k.indexOf(':'); return [k.slice(0, i), k.slice(i + 1)]; };

  async function upsert(taula, files, conflicte) {
    for (let i = 0; i < files.length; i += 500) {
      const { error } = await sb.from(taula).upsert(files.slice(i, i + 500), { onConflict: conflicte });
      if (error) throw error;
    }
  }
  async function totes(consulta) {
    const files = [];
    for (let des = 0; ; des += 1000) {
      const { data, error } = await consulta().range(des, des + 999);
      if (error) throw error;
      files.push(...data);
      if (data.length < 1000) break;
    }
    return files;
  }

  async function puja() {
    const p = pendents();
    if (!p.length) return;
    await upsert('registres', p.map(({ k, v, esborrat }) => {
      const [coleccio, id] = parteix(k);
      return { propietari: usuari.id, entorn: ENTORN, coleccio, id, dades: JSON.parse(v), esborrat };
    }), 'propietari,entorn,coleccio,id');
    p.forEach(({ k, v, esborrat }) => { if (esborrat) delete meta.snap[k]; else meta.snap[k] = v; });
    desa();
  }

  function posa(col, id, dades) {
    if (col === 'config') {
      if (id !== 'ajustos' || estable(dades) === estable(state.ajustos)) return false;
      state.ajustos = { ...dades }; return true;
    }
    if (!COLS.includes(col)) return false;
    const r = state[col].find((x) => x.id === id);
    if (r) {
      if (estable(r) === estable(dades)) return false;
      Object.keys(r).forEach((k) => delete r[k]);
      Object.assign(r, dades);
    } else {
      state[col].push(col === 'plans' ? { qui: [], estat: 'confirmat', ...dades } : dades);
    }
    return true;
  }
  function treu(col, id) {
    if (!COLS.includes(col)) return false;
    const n = state[col].length;
    state[col] = state[col].filter((x) => x.id !== id);
    return state[col].length !== n;
  }
  // Primera vegada en aquest dispositiu: ajunta les persones que tenen el mateix nom
  function fusionaPrimer(files) {
    const perNom = new Map(files.filter((f) => !f.esborrat && f.coleccio === 'persones' && f.dades?.nom)
      .map((f) => [f.dades.nom.trim().toLowerCase(), f.id]));
    const remap = {};
    state.persones = state.persones.filter((r) => {
      const rid = perNom.get((r.nom || '').trim().toLowerCase());
      if (rid && rid !== r.id) { remap[r.id] = rid; return false; }
      return true;
    });
    if (Object.keys(remap).length) state.plans.forEach((p) => { p.qui = (p.qui || []).map((id) => remap[id] || id); });
    // Si al núvol ja hi ha el nom, té preferència
    const aj = files.find((f) => f.coleccio === 'config' && f.id === 'ajustos' && !f.esborrat);
    if (aj && aj.dades?.nom) state.ajustos = { ...state.ajustos, ...aj.dades };
  }

  async function baixa() {
    const primer = !meta.ultima;
    const desde = primer ? null : new Date(new Date(meta.ultima).getTime() - 10000).toISOString();
    const files = await totes(() => {
      let q = sb.from('registres').select('coleccio,id,dades,esborrat,actualitzat')
        .eq('propietari', usuari.id).eq('entorn', ENTORN).order('actualitzat');
      return desde ? q.gte('actualitzat', desde) : q;
    });
    if (!files.length) return false;
    if (primer) fusionaPrimer(files);
    const ara = mapa();
    let canvi = primer;
    for (const f of files) {
      const k = f.coleccio + ':' + f.id;
      const pendentLocal = primer ? k === 'config:ajustos' : (k in ara ? ara[k] !== meta.snap[k] : k in meta.snap);
      if (!pendentLocal) {
        if (f.esborrat) { if (treu(f.coleccio, f.id)) canvi = true; delete meta.snap[k]; }
        else { if (posa(f.coleccio, f.id, f.dades)) canvi = true; meta.snap[k] = estable(f.dades); }
      }
      if (!meta.ultima || f.actualitzat > meta.ultima) meta.ultima = f.actualitzat;
    }
    desa();
    if (canvi) { aplicant = true; save(); aplicant = false; }
    return canvi;
  }

  /* ---------- Plans compartits ---------- */
  const ck = (pla, em) => pla + '|' + em;
  function compDesitjades() {
    const out = {}, nom = nomPropi();
    state.plans.forEach((p) => (p.compartit || []).forEach((em) => {
      out[ck(p.id, em)] = estable({ pla_id: p.id, per_email: em, de_nom: nom, de_email: usuari.email, pla: snapshotPla(p, em) });
    }));
    return out;
  }
  async function pujaComp() {
    const des = compDesitjades(), p = [];
    for (const k in des) if (meta.compSnap[k] !== des[k]) p.push({ k, v: des[k], esborrat: false });
    for (const k in meta.compSnap) if (!(k in des)) p.push({ k, v: meta.compSnap[k], esborrat: true });
    if (!p.length) return;
    await upsert('comparticions', p.map(({ v, esborrat }) => ({ ...JSON.parse(v), de: usuari.id, entorn: ENTORN, esborrat })), 'de,entorn,pla_id,per_email');
    p.forEach(({ k, v, esborrat }) => {
      if (esborrat) { delete meta.compSnap[k]; delete comp.enviats[k]; }
      else { meta.compSnap[k] = v; if (!comp.enviats[k]) comp.enviats[k] = 'pendent'; }
    });
    desa();
  }
  async function baixaComp() {
    const desde = meta.compUltima ? new Date(new Date(meta.compUltima).getTime() - 10000).toISOString() : null;
    // Les regles de la base de dades només deixen veure el que envio i el que em envien
    const files = await totes(() => {
      let q = sb.from('comparticions').select('de,pla_id,per_email,de_nom,de_email,pla,esborrat,resposta,actualitzat')
        .eq('entorn', ENTORN).order('actualitzat');
      return desde ? q.gte('actualitzat', desde) : q;
    });
    let canvi = false;
    const jo = (usuari.email || '').toLowerCase();
    for (const f of files) {
      if (f.de === usuari.id) {
        const k = ck(f.pla_id, f.per_email);
        if (!f.esborrat && k in meta.compSnap && comp.enviats[k] !== f.resposta) { comp.enviats[k] = f.resposta; canvi = true; }
      } else if (f.per_email === jo) {
        const k = f.de + '|' + f.pla_id;
        if (f.esborrat) { if (comp.rebuts[k]) { delete comp.rebuts[k]; canvi = true; } }
        else {
          const r = { de: f.de, pla_id: f.pla_id, de_nom: f.de_nom, de_email: f.de_email, pla: f.pla, resposta: f.resposta };
          if (estable(comp.rebuts[k]) !== estable(r)) { comp.rebuts[k] = r; canvi = true; }
        }
      }
      if (!meta.compUltima || f.actualitzat > meta.compUltima) meta.compUltima = f.actualitzat;
    }
    desa();
    return canvi;
  }

  async function respon(r, resposta) {
    const { error } = await sb.rpc('respon_comparticio', { p_de: r.de, p_entorn: ENTORN, p_pla: r.pla_id, p_resposta: resposta });
    if (error) throw error;
    const k = r.de + '|' + r.pla_id;
    if (comp.rebuts[k]) comp.rebuts[k].resposta = resposta;
    desa();
  }

  /* ---------- Cicle de sincronització ---------- */
  async function sincronitza() {
    if (!sb || !usuari) return;
    if (ocupat) { repetir = true; return ocupat; }
    ocupat = (async () => {
      posaEstat('sync');
      try {
        let canvi = false;
        if (!meta.ultima) { canvi = await baixa(); await puja(); canvi = (await baixa()) || canvi; }
        else { await puja(); canvi = await baixa(); }
        await pujaComp();
        canvi = (await baixaComp()) || canvi;
        posaEstat('ok');
        if (canvi && !document.querySelector('#dlg[open]')) render();
      } catch (e) {
        console.warn('Sincronització:', e);
        posaEstat(navigator.onLine ? 'error' : 'offline', e.message || String(e));
      }
    })();
    await ocupat;
    ocupat = null;
    if (repetir) { repetir = false; programa(0); }
  }
  function programa(ms = 700) { clearTimeout(temps); temps = setTimeout(sincronitza, ms); }

  /* ---------- Entrar i sortir ---------- */
  async function demanaCodi(email) {
    const { error } = await sb.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    if (error) throw error;
  }
  async function entra(email, codi) {
    const { data, error } = await sb.auth.verifyOtp({ email, token: codi, type: 'email' });
    if (error) throw error;
    await canviUsuari(data.user);
    await sincronitza();
  }
  async function surt() {
    try { await sb.auth.signOut(); } catch (e) { /* sense connexió: es tanca igualment aquí */ }
    try { localStorage.removeItem(AUTH); } catch (e) { /* res */ }
    usuari = null;
    meta = JSON.parse(JSON.stringify(META0));
    comp = JSON.parse(JSON.stringify(COMP0));
    desa();
    reiniciaDades();
    posaEstat('sense-compte');
  }
  async function canviUsuari(u) {
    if ((u?.id || null) === (usuari?.id || null)) return;
    usuari = u || null;
    if (!usuari) { posaEstat('sense-compte'); return; }
    // Si en aquest dispositiu hi havia les dades d'un altre compte, es comença de nou
    if (meta.usuari && meta.usuari !== usuari.id) {
      meta = JSON.parse(JSON.stringify(META0));
      comp = JSON.parse(JSON.stringify(COMP0));
      reiniciaDades();
    }
    meta.usuari = usuari.id;
    desa();
    programa(0);
  }

  /* ---------- Estat visible ---------- */
  const TEXTOS = {
    'sense-compte': 'Entra amb el teu correu', sync: 'Sincronitzant…', ok: 'Sincronitzat',
    offline: 'Sense connexió', error: 'Error de sincronització',
  };
  function posaEstat(e, d = '') {
    estat = e; detall = d;
    const b = $('#syncBtn');
    if (b) {
      b.hidden = e === 'off' || ui.view === 'entrada';
      b.dataset.estat = e;
      b.querySelector('span').textContent = TEXTOS[e] || '';
      b.title = d || TEXTOS[e] || '';
    }
    if (ui.view === 'ajustos') {
      const s = $('#seccioCompte');
      if (s) { s.outerHTML = html(); bind(); }
    }
  }
  const hora = (iso) => (iso ? new Date(iso).toLocaleString('ca', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—');

  function html() {
    if (!disponible) {
      return `<div class="section" id="seccioCompte"><h2>Compte</h2>
        <p class="help">La connexió amb el núvol encara no està configurada. De moment, els plans es guarden només en aquest dispositiu.</p></div>`;
    }
    if (!usuari) {
      return `<div class="section" id="seccioCompte"><h2>Compte</h2>
        <p class="help">No has entrat. Els plans es guarden només en aquest dispositiu. Entra amb el teu correu per tenir-los a tots els teus dispositius i poder enviar plans a l'app d'altres persones.</p>
        <button class="btn primary" data-entrada>Entra amb el teu correu</button></div>`;
    }
    const pend = pendents().length;
    return `<div class="section" id="seccioCompte"><h2>Compte</h2>
      <p class="help">Has entrat com a <b>${esc(usuari.email)}</b>${PROVES ? ' · <span class="proves-tag">PROVES</span>' : ''}.<br>
        Estat: <b>${TEXTOS[estat] || '—'}</b> · Darrera actualització: ${hora(meta.ultima)}${pend ? ` · ${pend} canvis per pujar` : ''}
        ${estat === 'error' && detall ? `<br><span class="hint">${esc(detall)}</span>` : ''}</p>
      <div class="grp">
        <button class="btn" id="btnSyncAra">Sincronitza ara</button>
        <button class="btn" id="btnSurt">Surt d'aquest dispositiu</button>
      </div></div>`;
  }
  function bind() {
    $('#btnSyncAra')?.addEventListener('click', () => programa(0));
    $('#btnSurt')?.addEventListener('click', async () => {
      const pend = pendents().length;
      if (!confirm(`Sortir del compte en aquest dispositiu?${pend ? `\n\nAtenció: hi ha ${pend} canvis que encara no s'han pujat al núvol i es perdran.` : '\n\nEls plans són al núvol: els recuperaràs quan tornis a entrar.'}`)) return;
      await surt();
      ui.view = 'entrada'; ui.entrada = { pas: 'correu', email: '' };
      render();
    });
  }

  /* ---------- Arrencada ---------- */
  function inicia() {
    $('#syncBtn')?.addEventListener('click', () => { ui.view = usuari ? 'ajustos' : 'entrada'; render(); window.scrollTo(0, 0); });
    if (!disponible) { posaEstat('off'); return; }
    posaEstat('sense-compte');
    sb.auth.onAuthStateChange((_ev, sessio) => { setTimeout(() => canviUsuari(sessio?.user || null), 0); });
    sb.auth.getSession().then(({ data }) => canviUsuari(data.session?.user || null));
    addEventListener('online', () => programa(0));
    addEventListener('offline', () => posaEstat('offline'));
    addEventListener('focus', () => programa(0));
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') programa(0); });
    // Comprova canvis (i plans que t'han enviat) cada 20 segons mentre l'app és oberta
    setInterval(() => { if (document.visibilityState === 'visible') programa(0); }, 20000);
  }

  /* ---------- Subscripció al calendari (iPhone, Google…) ---------- */
  // Enllaç privat a tota l'agenda; el «token» es crea la primera vegada i es pot canviar per anul·lar l'antic
  async function enllacCalendari(nou = false) {
    if (!sb || !usuari) throw new Error('Cal haver entrat amb el correu');
    let token = '';
    if (!nou) {
      const { data, error } = await sb.from('calendaris').select('token').eq('propietari', usuari.id).maybeSingle();
      if (error) throw error;
      token = data?.token || '';
    }
    if (!token) {
      const b = crypto.getRandomValues(new Uint8Array(24));
      token = btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      const { error } = await sb.from('calendaris').upsert({ propietari: usuari.id, token }, { onConflict: 'propietari' });
      if (error) throw error;
    }
    const https = `${cfg.supabaseUrl.replace(/\/$/, '')}/functions/v1/calendari?t=${token}${PROVES ? '&e=proves' : ''}`;
    return { https, webcal: https.replace(/^https:/, 'webcal:') };
  }

  return {
    enllacCalendari,
    disponible,
    usuari: () => usuari,
    // Abans de saber si hi ha sessió: n'hi ha alguna de guardada en aquest dispositiu?
    potserEntrat: () => { try { return Boolean(localStorage.getItem(AUTH)); } catch (e) { return false; } },
    rebuts: () => Object.values(comp.rebuts),
    respostes: (plaId) => Object.entries(comp.enviats).filter(([k]) => k.startsWith(plaId + '|')).map(([k, r]) => ({ email: k.slice(plaId.length + 1), resposta: r })),
    canvi() { if (!aplicant && usuari) { posaEstat('sync'); programa(); } },
    ara: sincronitza,
    demanaCodi, entra, surt, respon, html, bind, inicia,
  };
})();

Sync.inicia();
