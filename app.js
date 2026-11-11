'use strict';

/* ---------- Entorn: versió de proves o definitiva ---------- */
// La versió de proves (adreça amb «proves») guarda les dades a part, per no tocar mai les reals.
const PROVES = /proves/i.test(location.pathname);
const KEY = 'qqq-dades-v1' + (PROVES ? '-proves' : '');

/* ---------- Tipus de pla de sèrie (es poden canviar des d'Ajustos) ---------- */
// Identificadors fixos: així els dispositius nous no dupliquen els tipus en sincronitzar
const GRUPS = [
  ['apats', 'Àpats i trobades'],
  ['cultura', 'Cultura i lleure'],
  ['celebracions', 'Celebracions'],
  ['feina', 'Feina i gestions'],
  ['personal', 'Vida personal'],
  ['altres', 'Altres'],
];
// Versió de la llista de categories: si un compte en té una d'anterior, se substitueix per aquesta
const VERSIO_CATEGORIES = 2;
const TIPUS_INICIALS = [
  { id: 't-esmorzar', nom: 'Esmorzar', emoji: '', color: '#F08C00', grup: 'apats' },
  { id: 't-dinar', nom: 'Dinar', emoji: '', color: '#E8590C', grup: 'apats' },
  { id: 't-berenar', nom: 'Berenar', emoji: '', color: '#D9480F', grup: 'apats' },
  { id: 't-sopar', nom: 'Sopar', emoji: '', color: '#C92A2A', grup: 'apats' },
  { id: 't-cafe', nom: 'Cafè', emoji: '', color: '#A0522D', grup: 'apats' },
  { id: 't-amics', nom: 'Trobada', emoji: '', color: '#F76707', grup: 'apats' },
  { id: 't-vermut', nom: 'Vermut', emoji: '', color: '#E03131', grup: 'apats' },
  { id: 't-barbacoa', nom: 'Barbacoa', emoji: '', color: '#B35900', grup: 'apats' },
  { id: 't-calcotada', nom: 'Calçotada', emoji: '', color: '#FA5252', grup: 'apats' },
  { id: 't-tast', nom: 'Tast', emoji: '', color: '#E67700', grup: 'apats' },
  { id: 't-concert', nom: 'Concert', emoji: '', color: '#7048E8', grup: 'cultura' },
  { id: 't-cinema', nom: 'Cinema', emoji: '', color: '#4263EB', grup: 'cultura' },
  { id: 't-teatre', nom: 'Teatre', emoji: '', color: '#9C36B5', grup: 'cultura' },
  { id: 't-exposicio', nom: 'Exposició', emoji: '', color: '#1C7ED6', grup: 'cultura' },
  { id: 't-festival', nom: 'Festival', emoji: '', color: '#BE4BDB', grup: 'cultura' },
  { id: 't-excursio', nom: 'Excursió', emoji: '', color: '#5F3DC4', grup: 'cultura' },
  { id: 't-passejada', nom: 'Passejada', emoji: '', color: '#7950F2', grup: 'cultura' },
  { id: 't-sortida', nom: 'Sortida', emoji: '', color: '#364FC7', grup: 'cultura' },
  { id: 't-taller', nom: 'Taller', emoji: '', color: '#AE3EC9', grup: 'cultura' },
  { id: 't-partida', nom: 'Partida', emoji: '', color: '#1971C2', grup: 'cultura' },
  { id: 't-aniversari', nom: 'Aniversari', emoji: '', color: '#F06595', grup: 'celebracions' },
  { id: 't-festa', nom: 'Festa', emoji: '', color: '#E64980', grup: 'celebracions' },
  { id: 't-casament', nom: 'Casament', emoji: '', color: '#C2255C', grup: 'celebracions' },
  { id: 't-bateig', nom: 'Bateig', emoji: '', color: '#F783AC', grup: 'celebracions' },
  { id: 't-comunio', nom: 'Comunió', emoji: '', color: '#E8738A', grup: 'celebracions' },
  { id: 't-homenatge', nom: 'Homenatge', emoji: '', color: '#A61E4D', grup: 'celebracions' },
  { id: 't-comiat', nom: 'Comiat', emoji: '', color: '#D6336C', grup: 'celebracions' },
  { id: 't-revetlla', nom: 'Revetlla', emoji: '', color: '#FF6B6B', grup: 'celebracions' },
  { id: 't-inauguracio', nom: 'Inauguració', emoji: '', color: '#FAB005', grup: 'celebracions' },
  { id: 't-commemoracio', nom: 'Commemoració', emoji: '', color: '#B83280', grup: 'celebracions' },
  { id: 't-reunio', nom: 'Reunió', emoji: '', color: '#495057', grup: 'feina' },
  { id: 't-entrevista', nom: 'Entrevista', emoji: '', color: '#1098AD', grup: 'feina' },
  { id: 't-formacio', nom: 'Formació', emoji: '', color: '#0B7285', grup: 'feina' },
  { id: 't-conferencia', nom: 'Conferència', emoji: '', color: '#3B5BDB', grup: 'feina' },
  { id: 't-presentacio', nom: 'Presentació', emoji: '', color: '#15AABF', grup: 'feina' },
  { id: 't-congres', nom: 'Congrés', emoji: '', color: '#343A40', grup: 'feina' },
  { id: 't-jornada', nom: 'Jornada', emoji: '', color: '#5C7CFA', grup: 'feina' },
  { id: 't-assemblea', nom: 'Assemblea', emoji: '', color: '#0C8599', grup: 'feina' },
  { id: 't-tramit', nom: 'Tràmit', emoji: '', color: '#868E96', grup: 'feina' },
  { id: 't-gravacio', nom: 'Gravació', emoji: '', color: '#212529', grup: 'feina' },
  { id: 't-visita', nom: 'Visita', emoji: '', color: '#2F9E44', grup: 'personal' },
  { id: 't-metge', nom: 'Metge', emoji: '', color: '#0CA678', grup: 'personal' },
  { id: 't-revisio', nom: 'Revisió', emoji: '', color: '#099268', grup: 'personal' },
  { id: 't-compres', nom: 'Compres', emoji: '', color: '#66A80F', grup: 'personal' },
  { id: 't-esport', nom: 'Esport', emoji: '', color: '#37B24D', grup: 'personal' },
  { id: 't-entrenament', nom: 'Entrenament', emoji: '', color: '#74B816', grup: 'personal' },
  { id: 't-viatge', nom: 'Viatge', emoji: '', color: '#12B886', grup: 'personal' },
  { id: 't-escapada', nom: 'Escapada', emoji: '', color: '#087F5B', grup: 'personal' },
  { id: 't-vacances', nom: 'Vacances', emoji: '', color: '#20C997', grup: 'personal' },
  { id: 't-perruqueria', nom: 'Perruqueria', emoji: '', color: '#40C057', grup: 'personal' },
];
// Colors per als tipus nous que es creen des del formulari
const COLORS_NOUS = ['#5C7CFA', '#20C997', '#FF922B', '#CC5DE8', '#F06595', '#339AF0', '#94D82D', '#FAB005'];
// Icones (Material Symbols) dels tipus de sèrie. Si un tipus té «icona: ''», es mostra el seu emoji.
const ICONES = {
  't-esmorzar': 'bakery_dining', 't-dinar': 'lunch_dining', 't-sopar': 'dinner_dining', 't-vermut': 'local_bar',
  't-cafe': 'local_cafe', 't-concert': 'music_note', 't-teatre': 'theater_comedy', 't-cinema': 'movie',
  't-exposicio': 'palette', 't-inauguracio': 'wine_bar', 't-festa': 'celebration', 't-amics': 'diversity_3',
  't-casament': 'favorite', 't-excursio': 'hiking', 't-escapada': 'luggage', 't-esport': 'sports_soccer',
  't-festival': 'festival', 't-altres': 'auto_awesome',
};
const iconaDe = (t) => (t.icona !== undefined ? t.icona : ICONES[t.id] || '');
const ico = () => '<span class="punt" aria-hidden="true"></span>';
const ESTATS = [['confirmat', 'Confirmat'], ['pendent', 'Per confirmar'], ['cancellat', 'Cancel·lat']];

/* ---------- Utilitats ---------- */
const MESOS = ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'];
const DIES = ['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'];
const DIES_LLARGS = ['dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte', 'diumenge'];
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const pad = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseYmd = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const mondayOf = (d) => addDays(d, -((d.getDay() + 6) % 7));
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const avui = () => ymd(new Date());
const dataLlarga = (ds) => { const d = parseYmd(ds); return `${DIES_LLARGS[(d.getDay() + 6) % 7]} ${d.getDate()} de ${MESOS[d.getMonth()]}`.replace(/de ([ao])/, "d'$1"); };
const dataCurta = (ds) => { const d = parseYmd(ds); return `${DIES[(d.getDay() + 6) % 7]} ${d.getDate()} ${MESOS[d.getMonth()].slice(0, 3)}.${d.getFullYear() !== new Date().getFullYear() ? ' ' + d.getFullYear() : ''}`; };
const normal = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const llistaNoms = (n) => (n.length < 2 ? n.join('') : n.slice(0, -1).join(', ') + ' i ' + n[n.length - 1]);

/* ---------- Dades ---------- */
function seed() {
  return { tipus: TIPUS_INICIALS.map((t) => ({ ...t })), persones: [], plans: [], ajustos: { nom: '', categories: VERSIO_CATEGORIES } };
}
function normalize(d) {
  const arr = (x) => (Array.isArray(x) ? x : []);
  return {
    tipus: arr(d.tipus).length ? arr(d.tipus) : TIPUS_INICIALS.map((t) => ({ ...t })),
    persones: arr(d.persones),
    plans: arr(d.plans).map((p) => ({ qui: [], estat: 'confirmat', ...p })),
    ajustos: d.ajustos && typeof d.ajustos === 'object' ? { nom: '', ...d.ajustos } : { nom: '' },
  };
}
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) return normalize(JSON.parse(raw)); } catch (e) { /* res */ }
  return seed();
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch (e) { toast("No s'han pogut desar les dades. Fes-ne una còpia des d'Ajustos."); }
  if (typeof Sync !== 'undefined') Sync.canvi();
}

let state = load();
actualitzaCategories();
save();
// Si les dades tenen la llista de categories antiga, es canvia per la nova (els plans conserven la seva
// categoria quan existeix a la llista nova; si no, queden sense categoria)
function actualitzaCategories() {
  if ((state.ajustos.categories || 0) >= VERSIO_CATEGORIES) return;
  state.tipus = TIPUS_INICIALS.map((t) => ({ ...t }));
  state.ajustos.categories = VERSIO_CATEGORIES;
  const valids = new Set(state.tipus.map((t) => t.id));
  state.plans.forEach((p) => { if (p.tipusId && !valids.has(p.tipusId)) p.tipusId = ''; });
}
// En sortir del compte (o si entra una altra persona en aquest dispositiu) es comença de zero
function reiniciaDades() {
  state = seed();
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* res */ }
}

function llegeixPref(k, def) { try { const v = localStorage.getItem('qqq-pref-' + k); return v === null ? def : JSON.parse(v); } catch (e) { return def; } }
function desaPref(k, v) { try { localStorage.setItem('qqq-pref-' + k, JSON.stringify(v)); } catch (e) { /* res */ } }
const ui = {
  view: llegeixPref('view', 'propers'), calMode: llegeixPref('calMode', 'mes'), cursor: new Date(), diaSel: avui(), cerca: '', cercaGent: '', passats: false, persona: '',
  entrada: { pas: 'correu', email: '' },
};

/* ---------- Consultes ---------- */
const ALTRES = { id: '', nom: 'Altres', emoji: '✨', icona: 'auto_awesome', color: '#868E96' };
const tipusOrdenats = () => state.tipus.map((t, i) => [t, i])
  .sort((a, b) => ((a[0].ordre ?? a[1]) - (b[0].ordre ?? b[1]))).map((x) => x[0]);
const grupDe = (t) => (GRUPS.some(([x]) => x === t.grup) ? t.grup : 'altres');
const esUrl = (t) => /^https?:\/\/\S+$/i.test(String(t || '').trim());
const mapaDe = (p) => p.llocUrl || (p.lloc ? Cal.mapa(p.lloc) : '');
const tip = (id) => state.tipus.find((t) => t.id === id) || state.tipus.find((t) => t.id === 't-altres') || ALTRES;
const pers = (id) => state.persones.find((p) => p.id === id);
const nomCurt = (t) => t.nom.split(' / ')[0];
const emailValid = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').trim());
// Els plans que t'envien altres persones porten el seu propi tipus i la seva llista de gent
const tipDe = (p) => p._t || tip(p.tipusId);
const noms = (p) => p._amb || (p.qui || []).map(pers).filter(Boolean).map((x) => x.nom);
const titolPla = (p) => (p.titol || '').trim() || nomCurt(tipDe(p)) + (noms(p).length ? ' amb ' + llistaNoms(noms(p)) : '');
const REPETICIONS = [['', 'No es repeteix'], ['setmana', 'Cada setmana'], ['mes', 'Cada mes'], ['any', 'Cada any']];
const nomRepeticio = (r) => (REPETICIONS.find((x) => x[0] === r) || ['', ''])[1];
const diesPla = (p) => (p.dataFi && p.dataFi > p.data ? p.dataFi : p.data);   // últim dia del pla
const cobreix = (p, ds) => p.data <= ds && ds <= diesPla(p);
const horaSola = (p) => (p.totElDia ? 'Tot el dia' : p.hora ? (p.horaFi ? `${p.hora} – ${p.horaFi}` : p.hora) : 'Sense hora');
const horaText = (p) => (p.dataFi && p.dataFi > p.data
  ? `${dataCurta(p.data)} → ${dataCurta(p.dataFi)}${p.totElDia || !p.hora ? '' : ' · ' + horaSola(p)}`
  : horaSola(p));
// Data següent d'una repetició (el dia 31 passa a l'últim dia dels mesos que no en tenen)
function sumaPeriode(ds, freq, n) {
  const d = parseYmd(ds);
  if (freq === 'setmana') return ymd(addDays(d, 7 * n));
  const y = d.getFullYear() + (freq === 'any' ? n : 0), m = d.getMonth() + (freq === 'mes' ? n : 0);
  return ymd(new Date(y, m, Math.min(d.getDate(), new Date(y, m + 1, 0).getDate())));
}
// Totes les vegades que surt un pla que es repeteix (fins a la data «fins»); la primera és el pla mateix
function instancies(p, fins) {
  if (!p.repeteix || !p.data) return [p];
  const durada = p.dataFi && p.dataFi > p.data ? Math.round((parseYmd(p.dataFi) - parseYmd(p.data)) / 86400000) : 0;
  const limit = p.repeteixFins && p.repeteixFins < fins ? p.repeteixFins : fins;
  const out = [];
  for (let n = 0; n < 800; n++) {
    const ds = sumaPeriode(p.data, p.repeteix, n);
    if (ds > limit) break;
    out.push(n === 0 ? p : { ...p, id: p.id + '@' + ds, base: p, data: ds, dataFi: durada ? ymd(addDays(parseYmd(ds), durada)) : '' });
  }
  return out;
}
const clau = (p) => p.data + (p.totElDia ? ' 00:00' : ' ' + (p.hora || '99:99'));
const perOrdre = (a, b) => (clau(a) < clau(b) ? -1 : clau(a) > clau(b) ? 1 : 0);
const usos = (pid) => state.plans.filter((p) => (p.qui || []).includes(pid)).length;

const sync = () => (typeof Sync !== 'undefined' ? Sync : null);
const usuari = () => sync()?.usuari() || null;
const nomPropi = () => (state.ajustos.nom || '').trim() || (usuari()?.email || '').split('@')[0] || 'Algú';
function planRebut(r) {
  const s = r.pla || {};
  return {
    id: 'r|' + r.de + '|' + r.pla_id, rebut: r, titol: s.titol || '', data: s.data, hora: s.hora || '', horaFi: s.horaFi || '',
    totElDia: Boolean(s.totElDia), lloc: s.lloc || '', llocUrl: s.llocUrl || '', dataFi: s.dataFi || '', repeteix: s.repeteix || '', repeteixFins: s.repeteixFins || '', estat: s.estat || 'confirmat', versio: s.versio || 1, qui: [],
    _t: { nom: s.tipusNom || 'Pla', emoji: s.emoji || '✨', icona: s.icona || '', color: s.color || '#868E96' }, _amb: s.amb || [],
  };
}
const rebuts = () => (sync()?.rebuts() || []).filter((r) => r.pla && r.pla.data).map(planRebut);
// Tots els plans que es veuen: els teus i els que t'han enviat i has dit que hi vas
// Aniversaris: es generen sols a partir de la fitxa de cada contacte (no es guarden com a plans)
function llegeixAniv(txt) {
  const t = String(txt || '').trim();
  let m = t.match(/^(\d{1,2})[\/.\-](\d{1,2})(?:[\/.\-](\d{2,4}))?$/);
  if (m) {
    let y = m[3] ? Number(m[3]) : null;
    if (y !== null && y < 100) y += y > (new Date().getFullYear() % 100) ? 1900 : 2000;
    return { d: Number(m[1]), m: Number(m[2]), y };
  }
  m = t.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? { d: Number(m[3]), m: Number(m[2]), y: Number(m[1]) } : null;
}
const tipusAniv = () => state.tipus.find((t) => normal(t.nom) === 'aniversari');
function aniversaris(anys) {
  const out = [];
  const ta = tipusAniv();
  state.persones.forEach((pe) => {
    const a = llegeixAniv(pe.aniversari);
    if (!a || a.m < 1 || a.m > 12 || a.d < 1 || a.d > 31) return;
    anys.forEach((y) => {
      const dies = new Date(y, a.m, 0).getDate();   // 29 de febrer → 28 els anys que no és de traspàs
      const ds = `${y}-${pad(a.m)}-${pad(Math.min(a.d, dies))}`;
      const edat = a.y && a.y <= y ? y - a.y : null;
      out.push({
        id: 'an|' + pe.id + '|' + y, aniversari: pe, data: ds, totElDia: true, hora: '', horaFi: '', estat: 'confirmat',
        titol: `Aniversari de ${pe.nom}${edat ? ` (${edat} anys)` : ''}`, lloc: '', qui: [pe.id], _amb: [],
        _t: { nom: 'Aniversari', color: ta ? ta.color : '#F06595' },
      });
    });
  });
  return out;
}
// Anys dels quals cal mostrar aniversaris: l'actual, el següent i el que es mira al calendari
const anysAniv = () => [...new Set([new Date().getFullYear(), new Date().getFullYear() + 1, ui.cursor.getFullYear(), parseYmd(ui.diaSel).getFullYear()])];
// Altres calendaris (p. ex. l'app de gravacions): es llegeixen per la funció «extern» i es guarden en aquest dispositiu
const externs = () => (Array.isArray(state.ajustos.externs) ? state.ajustos.externs : []);
const CAU_EXT = 'qqq-externs-cau';
let cauExt = (() => { try { return JSON.parse(localStorage.getItem(CAU_EXT)) || {}; } catch (e) { return {}; } })();
function plansExterns() {
  const out = [];
  externs().forEach((c) => (cauExt[c.id]?.events || []).forEach((ev) => {
    if (ev.cancellat) return;
    out.push({
      id: 'ext|' + c.id + '|' + ev.uid, extern: c, data: ev.data, hora: ev.hora, horaFi: ev.horaFi, totElDia: ev.totElDia,
      titol: ev.titol, lloc: ev.lloc, notes: ev.notes, estat: 'confirmat', qui: [], _amb: [],
      _t: { nom: c.nom, color: c.color || '#2F9E44' },
    });
  }));
  return out;
}
let llegintExt = false;
async function actualitzaExterns(avisa = false) {
  const cfg = window.QQQ_CONFIG || {};
  if (!cfg.supabaseUrl || !externs().length || llegintExt || !navigator.onLine) return;
  llegintExt = true;
  let canvi = false, error = '';
  for (const c of externs()) {
    try {
      const r = await fetch(`${cfg.supabaseUrl.replace(/\/$/, '')}/functions/v1/extern?u=${encodeURIComponent(c.url)}`);
      if (!r.ok) throw new Error(r.status === 403 ? 'aquest calendari no està permès' : 'no respon (' + r.status + ')');
      const events = Cal.llegeixIcs(await r.text());
      if (JSON.stringify(events) !== JSON.stringify(cauExt[c.id]?.events)) canvi = true;
      cauExt[c.id] = { events, quan: new Date().toISOString() };
    } catch (e) { error = `«${c.nom}»: ${e.message}`; }
  }
  llegintExt = false;
  try { localStorage.setItem(CAU_EXT, JSON.stringify(cauExt)); } catch (e) { /* res */ }
  if (avisa) toast(error ? 'No s\'ha pogut llegir ' + error : 'Calendaris actualitzats');
  if ((canvi || avisa) && !document.querySelector('#dlg[open]')) render();
}
const finsRepeticions = () => `${Math.max(...anysAniv())}-12-31`;
const totsPlans = (ambAniv = true) => {
  const fins = finsRepeticions();
  return [...[...state.plans, ...rebuts().filter((p) => p.rebut.resposta === 'si')].flatMap((p) => instancies(p, fins)),
    ...plansExterns(), ...(ambAniv ? aniversaris(anysAniv()) : [])];
};
const trobaPla = (id) => state.plans.find((p) => p.id === id) || rebuts().find((p) => p.id === id) || plansExterns().find((p) => p.id === id)
  || (id.startsWith('an|') ? aniversaris([Number(id.split('|')[2])]).find((p) => p.id === id) : null)
  || (() => {   // una de les repeticions d'un pla: «idDelPla@AAAA-MM-DD»
    const i = id.lastIndexOf('@');
    if (i < 0) return null;
    const b = state.plans.find((p) => p.id === id.slice(0, i)) || rebuts().find((p) => p.id === id.slice(0, i));
    return b ? instancies(b, id.slice(i + 1)).find((x) => x.id === id) || null : null;
  })();
const delDia = (ds) => totsPlans().filter((p) => cobreix(p, ds)).sort(perOrdre);
// Còpia del pla que rep cada persona (sense notes; «amb» des del seu punt de vista)
function snapshotPla(p, em) {
  const t = tip(p.tipusId);
  const amb = [nomPropi(), ...(p.qui || []).map(pers).filter((x) => x && normal(x.email) !== em).map((x) => x.nom)];
  return {
    tipusNom: t.nom, emoji: t.emoji, icona: iconaDe(t), color: t.color, titol: p.titol || '', amb, data: p.data,
    hora: p.totElDia ? '' : p.hora || '', horaFi: p.totElDia ? '' : p.horaFi || '', totElDia: Boolean(p.totElDia),
    lloc: p.lloc || '', llocUrl: p.llocUrl || '', estat: p.estat || 'confirmat', versio: p.versio || 1,
    dataFi: p.dataFi || '', repeteix: p.repeteix || '', repeteixFins: p.repeteixFins || '',
  };
}
const nomDeCorreu = (em) => state.persones.find((x) => normal(x.email) === em)?.nom || em;
const RESPOSTES = { si: '✅ Hi va', no: '❌ No hi va', pendent: '⏳ Sense resposta' };

function etiquetaDia(ds) {
  const a = avui();
  if (ds === a) return 'Avui';
  if (ds === ymd(addDays(new Date(), 1))) return 'Demà';
  if (ds === ymd(addDays(new Date(), -1))) return 'Ahir';
  const d = parseYmd(ds);
  return cap(dataLlarga(ds)) + (d.getFullYear() !== new Date().getFullYear() ? ` de ${d.getFullYear()}` : '');
}
function falten(ds) {
  const dies = Math.round((parseYmd(ds) - parseYmd(avui())) / 86400000);
  if (dies <= 1 || dies > 60) return '';
  return dies < 14 ? `d'aquí a ${dies} dies` : `d'aquí a ${Math.round(dies / 7)} setmanes`;
}

/* ---------- Triar el color d'un tipus ---------- */
const PALETA = [
  '#E03131', '#F76707', '#F08C00', '#FAB005', '#FFD43B', '#94D82D', '#66A80F', '#2F9E44',
  '#0CA678', '#12B886', '#15AABF', '#1098AD', '#228BE6', '#1C7ED6', '#4263EB', '#5C7CFA',
  '#7048E8', '#7950F2', '#9C36B5', '#BE4BDB', '#E64980', '#F06595', '#C2255C', '#E8738A',
  '#A0522D', '#8D6E63', '#495057', '#868E96',
];
const botoColor = (color, attrs) => `<button type="button" class="emoji-btn" aria-label="Tria el color" style="--c:${esc(color)}"><span class="punt"></span></button><input type="hidden" ${attrs} value="${esc(color)}">`;
let botoEmojiActiu = null;
function tancaPanellEmoji() { $$('.emoji-panel').forEach((x) => x.remove()); botoEmojiActiu = null; }
function obrePanellEmoji(b) {
  const mateix = botoEmojiActiu === b;
  tancaPanellEmoji();
  if (mateix) return;
  botoEmojiActiu = b;
  const actual = b.nextElementSibling.value;
  const fila = b.closest('.tipus-fila, .barra, .nou-tipus-fila') || b.parentElement;
  fila.insertAdjacentHTML('afterend', `<div class="emoji-panel">
      <p class="help">Toca el color que vulguis:</p>
      <div class="color-grid">${PALETA.map((x) => `<button type="button" data-posa-emoji="${x}" style="--c:${x}" aria-label="${x}" aria-pressed="${x.toLowerCase() === String(actual).toLowerCase()}"></button>`).join('')}</div>
      <label class="color-altre">Un altre color: <input type="color" value="${esc(actual || '#868E96')}"></label>
    </div>`);
}
function posaEmoji(v) {
  const b = botoEmojiActiu;
  tancaPanellEmoji();
  if (!b || !v) return;
  b.style.setProperty('--c', v);
  const inp = b.nextElementSibling;
  inp.value = v;
  inp.dispatchEvent(new Event('change', { bubbles: true }));
}
document.addEventListener('change', (e) => {
  if (e.target.matches('.color-altre input')) posaEmoji(e.target.value);
});
document.addEventListener('click', (e) => {
  const b = e.target.closest('.emoji-btn');
  if (b) { obrePanellEmoji(b); return; }
  const em = e.target.closest('[data-posa-emoji]');
  if (em) { posaEmoji(em.dataset.posaEmoji); return; }
});

/* ---------- Cercar llocs (camp «On») ---------- */
// Fa servir Photon (komoot), un cercador gratuït basat en OpenStreetMap. Només s'hi envia el text que s'escriu.
async function cercaLlocs(q) {
  const u = 'https://photon.komoot.io/api/?' + new URLSearchParams({ q, limit: '6', lat: '41.9', lon: '2.3', location_bias_scale: '0.3' });
  const r = await fetch(u);
  if (!r.ok) return [];
  const j = await r.json();
  const vist = new Set();
  return (j.features || []).map(({ properties: p }) => {
    const carrer = [p.street, p.housenumber].filter(Boolean).join(', ');
    return [p.name, carrer, p.city || p.town || p.village || p.locality || p.county]
      .filter(Boolean).filter((x, i, a) => a.indexOf(x) === i).join(', ');
  }).filter((x) => x && !vist.has(x) && vist.add(x));
}

/* ---------- Contactes del mòbil ---------- */
// Selector de contactes del navegador (Android; a l'iPhone, només si s'activa a Safari)
const potContactes = () => 'contacts' in navigator && typeof navigator.contacts.select === 'function';
async function triaContactes() {
  // Demana també el telèfon i l'adreça, si el mòbil ho permet
  const disponibles = navigator.contacts.getProperties ? await navigator.contacts.getProperties().catch(() => ['name', 'email']) : ['name', 'email'];
  const res = await navigator.contacts.select(['name', 'email', 'tel', 'address'].filter((p) => disponibles.includes(p)), { multiple: true });
  return res.map((c) => ({
    nom: String((c.name || [])[0] || '').trim(), email: String((c.email || [])[0] || '').trim().toLowerCase(),
    tel: String((c.tel || [])[0] || '').trim(), tel2: String((c.tel || [])[1] || '').trim(),
    adreca: (c.address || [])[0] ? [].concat(c.address[0].addressLine || [], c.address[0].city || []).filter(Boolean).join(', ') : '',
  }))
    .map((c) => ({ ...c, nom: c.nom || c.email.split('@')[0] || c.tel, email: emailValid(c.email) ? c.email : '' }))
    .filter((c) => c.nom);
}
// Targetes de contacte (.vcf), com les que es comparteixen des de l'app Contactes de l'iPhone
const desescapa = (v) => String(v || '').replace(/\\n/gi, '\n').replace(/\\([,;\\])/g, '$1').trim();
function llegeixVcf(text) {
  const net = String(text).replace(/\r?\n[ \t]/g, '');
  return net.split(/BEGIN:VCARD/i).slice(1).map((bloc) => {
    const linies = bloc.split(/\r?\n/);
    // Totes les línies d'un camp (TEL, EMAIL…), amb els seus tipus (CELL, HOME…)
    const tots = (camp) => linies
      .map((l) => l.match(new RegExp('^(?:item\\d+\\.)?' + camp + '((?:;[^:]*)?):(.*)$', 'i')))
      .filter(Boolean).map((m) => ({ tipus: m[1].toUpperCase(), valor: desescapa(m[2]) })).filter((x) => x.valor);
    const u = (camp) => (tots(camp)[0] || {}).valor || '';
    let nom = u('FN');
    if (!nom) { const n = u('N').split(';'); nom = [n[1], n[0]].filter(Boolean).join(' '); }
    const tels = tots('TEL');
    const mobil = tels.find((t) => /CELL|IPHONE|MOBILE/.test(t.tipus)) || tels[0];
    const altre = tels.find((t) => t !== mobil);
    const emails = tots('EMAIL').map((x) => x.valor.toLowerCase()).filter(emailValid);
    // ADR: apartat;extens;carrer;població;província;codi postal;país
    const [, , carrer, poble, , cp, pais] = u('ADR').split(';').map((x) => x.trim());
    const adreca = [carrer, [cp, poble].filter(Boolean).join(' '), /^(espa(ñ|ny)a|spain)$/i.test(pais || '') ? '' : pais].filter(Boolean).join(', ');
    let anv = u('BDAY').replace(/T.*$/, '');
    let m = anv.match(/^(\d{4})-?(\d{2})-?(\d{2})$/);
    if (m) anv = m[1] === '1604' ? `${m[3]}/${m[2]}` : `${m[3]}/${m[2]}/${m[1]}`;
    else if ((m = anv.match(/^--(\d{2})-?(\d{2})$/))) anv = `${m[2]}/${m[1]}`;
    return {
      nom, email: emails[0] || '', tel: mobil ? mobil.valor : '', tel2: altre ? altre.valor : '',
      adreca,
      aniversari: anv, empresa: u('ORG').split(';').filter(Boolean).join(' · '), notes: u('NOTE'),
    };
  }).filter((c) => c.nom || c.email || c.tel).map((c) => ({ ...c, nom: c.nom || c.email.split('@')[0] || c.tel }));
}
const CAMPS_CONTACTE = ['email', 'tel', 'tel2', 'adreca', 'aniversari', 'empresa', 'notes'];
// Converteix contactes en fitxes de persona (si ja hi són, només hi afegeix el correu)
function incorporaContactes(llista, existents, onAfegir) {
  return llista.map((c) => {
    let pe = existents.find((x) => (c.email && normal(x.email) === c.email) || normal(x.nom) === normal(c.nom));
    if (!pe) { pe = { id: 'pe-' + uid(), nom: c.nom }; onAfegir.push(pe); existents.push(pe); }
    // Només s'omplen els camps buits: el que ja s'hagi escrit a mà no es trepitja
    CAMPS_CONTACTE.forEach((k) => { if (c[k] && !pe[k]) pe[k] = c[k]; });
    return pe;
  });
}
const AJUDA_CONTACTES = `<details class="ajuda"><summary>Com puc afegir gent dels contactes de l'iPhone?</summary>
    <p><b>Opció 1 (sempre funciona):</b> a l'app <b>Contactes</b>, obre un contacte → <b>Comparteix el contacte</b> → <b>Desa a Arxius</b>.
      Després, aquí, prem <b>Importa contactes</b> i tria el fitxer. (També pots seleccionar una llista sencera de contactes i compartir-la de cop.)</p>
    <p><b>Opció 2:</b> a <b>Configuració → Apps → Safari → Avançat → Feature Flags</b>, activa <b>Contact Picker API</b>.
      Tanca i torna a obrir l'app: apareixerà el botó <b>Tria dels contactes</b>.</p>
  </details>`;

/* ---------- Toast ---------- */
let toastT = null;
function toast(msg, ms = 3200) {
  const t = $('#toast');
  // Si hi ha una finestra oberta, l'avís hi va a dins (si no, quedaria amagat al darrere)
  const dl = $('#dlg');
  const pare = dl && dl.open ? dl : document.body;
  if (t.parentNode !== pare) pare.appendChild(t);
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastT);
  toastT = setTimeout(() => { t.hidden = true; }, ms);
}
// Qualsevol error inesperat es mostra a la pantalla (així es pot saber què ha passat al mòbil)
addEventListener('error', (e) => { try { toast('⚠️ Error: ' + (e.message || 'desconegut'), 8000); } catch (x) { /* res */ } });
addEventListener('unhandledrejection', (e) => { try { toast('⚠️ Error: ' + (e.reason?.message || e.reason || 'desconegut'), 8000); } catch (x) { /* res */ } });

/* ---------- Targeta d'un pla ---------- */
function targeta(p, ambData = false) {
  const t = tipDe(p);
  const info = [ambData ? dataCurta(p.data) : '', horaText(p), p.lloc ? '📍 ' + p.lloc : ''].filter(Boolean);
  const gent = (p.titol || '').trim() && noms(p).length ? `<small class="pla-qui">👥 ${esc(llistaNoms(noms(p)))}</small>` : '';
  const de = p.rebut ? `<small class="pla-de">📨 De part de ${esc(p.rebut.de_nom || p.rebut.de_email)}</small>` : '';
  const env = '';
  const estat = p.estat !== 'confirmat' ? `<span class="badge ${p.estat}">${esc((ESTATS.find((e) => e[0] === p.estat) || [, p.estat])[1])}</span>` : '';
  return `<button class="pla ${esc(p.estat)}${diesPla(p) < avui() ? ' passat' : ''}${p.rebut ? ' rebut' : ''}" data-pla="${esc(p.id)}" style="--c:${esc(t.color)}">
    <span class="pla-emoji">${ico(t)}</span>
    <span class="pla-cos"><b>${esc(titolPla(p))}</b><small>${esc(info.join(' · '))}</small>${gent}${de}</span>
    ${env}${estat}
  </button>`;
}
function llistaPerDies(plans, ordreInvers = false) {
  const grups = new Map();
  const clauDia = (p) => (!ordreInvers && p.data < avui() && diesPla(p) >= avui() ? avui() : p.data);
  plans.forEach((p) => { const k = clauDia(p); if (!grups.has(k)) grups.set(k, []); grups.get(k).push(p); });
  const dies = [...grups.keys()].sort();
  if (ordreInvers) dies.reverse();
  return dies.map((ds) => `<section class="dia${ds === avui() ? ' avui' : ''}">
      <h3>${esc(etiquetaDia(ds))}<small>${esc(falten(ds))}</small></h3>
      ${grups.get(ds).sort(perOrdre).map((p) => targeta(p)).join('')}
    </section>`).join('');
}

/* ---------- Vista: Plans ---------- */
function vistaPropers() {
  const q = normal(ui.cerca.trim());
  let plans, invers = false, buit;
  if (q) {
    plans = totsPlans(false).filter((p) => normal([titolPla(p), tipDe(p).nom, p.lloc, p.notes, p.rebut?.de_nom, ...noms(p)].join(' ')).includes(q));
    invers = true;
    buit = `No s'ha trobat cap pla amb «${esc(ui.cerca.trim())}».`;
  } else if (ui.passats) {
    plans = totsPlans(false).filter((p) => p.data < avui());
    invers = true;
    buit = 'Encara no hi ha cap pla passat.';
  } else {
    // Les repeticions i els aniversaris, només de les properes setmanes (si no, la llista seria infinita)
    plans = totsPlans().filter((p) => diesPla(p) >= avui()
      && (!(p.aniversari || p.base) || p.data <= ymd(addDays(new Date(), p.aniversari ? 45 : 31))));
    buit = '';
  }
  const setmana = totsPlans().filter((p) => p.data >= avui() && p.data <= ymd(addDays(mondayOf(new Date()), 6)) && p.estat !== 'cancellat').length;
  const cap0 = !q && !ui.passats
    ? `<p class="resum">${setmana ? `Aquesta setmana tens <b>${setmana} ${setmana === 1 ? 'pla' : 'plans'}</b>.` : 'Aquesta setmana encara no tens cap pla.'}</p>` : '';
  // Plans que t'han enviat i encara no has contestat
  const inv = !q && !ui.passats ? rebuts().filter((p) => p.rebut.resposta === 'pendent' && p.data >= avui()).sort(perOrdre) : [];
  const invHtml = inv.length ? `<section class="invitacions"><h3>📨 T'han enviat ${inv.length === 1 ? 'un pla' : inv.length + ' plans'}</h3>
      ${inv.map((p) => `<div class="invitacio">${targeta(p, true)}
        <div class="grp"><button class="btn primary" data-respon="si" data-r="${esc(p.id)}">✅ Hi vaig</button><button class="btn" data-respon="no" data-r="${esc(p.id)}">No hi vaig</button></div>
        ${p.rebut.de_email ? `<button class="enllac sempre" data-sempre="${esc(p.id)}">Accepta sempre els plans de ${esc(p.rebut.de_nom || p.rebut.de_email)}</button>` : ''}</div>`).join('')}
    </section>` : '';
  return `${invHtml}<div class="barra">
      <input type="search" id="cerca" placeholder="Busca: sopar, Marta, Girona…" value="${esc(ui.cerca)}" autocomplete="off">
      <div class="seg petit">
        <button data-passats="0" aria-pressed="${!ui.passats}">Propers</button>
        <button data-passats="1" aria-pressed="${ui.passats}">Passats</button>
      </div>
    </div>
    ${cap0}
    ${plans.length ? llistaPerDies(plans, invers) : buit ? `<p class="buit">${buit}</p>` : `<div class="buit gran">
      <div class="buit-emoji"><span class="punt-buit"></span></div>
      <p>No tens cap pla a la vista.</p>
      <button class="btn primary" data-nou>+ Afegeix el primer pla</button></div>`}`;
}

/* ---------- Vista: Calendari (dia, setmana o mes) ---------- */
const MODES = [['dia', 'Dia'], ['setmana', 'Setmana'], ['mes', 'Mes'], ['any', 'Any']];
const apostrof = (txt) => txt.replace(/de ([aeiou])/g, "d'$1");
function vistaCalendari() {
  const mode = ui.calMode;
  const sel = parseYmd(ui.diaSel);
  // Tots els plans agrupats per dia, calculats una sola vegada (la vista anual en mira 365)
  const perDia = new Map();
  totsPlans().forEach((p) => {
    // Els plans de diversos dies surten a cada dia (com a molt, 62 dies)
    let ds = p.data;
    for (let i = 0; i < 62 && ds <= diesPla(p); i++) {
      if (!perDia.has(ds)) perDia.set(ds, []);
      perDia.get(ds).push(p);
      ds = ymd(addDays(parseYmd(ds), 1));
    }
  });
  const delDia = (ds) => (perDia.get(ds) || []).slice().sort(perOrdre);
  let titol, cos;
  if (mode === 'dia') {
    titol = cap(dataLlarga(ui.diaSel));
    const plans = delDia(ui.diaSel);
    cos = `<section class="vista-dia">
        ${plans.map((p) => `<div class="franja"><span class="franja-hora">${esc(p.totElDia ? 'Tot el dia' : p.hora || '—')}</span>${targeta(p)}</div>`).join('') || '<p class="buit">Cap pla aquest dia.</p>'}
        <button class="btn afegeix-dia" data-nou="${ui.diaSel}">+ Afegeix un pla aquest dia</button>
        <button class="btn llista-btn" data-llista="dia">📋 Llista del dia</button>
      </section>`;
  } else if (mode === 'setmana') {
    const dl = mondayOf(sel), dg = addDays(dl, 6);
    titol = dl.getMonth() === dg.getMonth()
      ? apostrof(`${dl.getDate()} – ${dg.getDate()} de ${MESOS[dg.getMonth()]}`)
      : `${dl.getDate()} ${MESOS[dl.getMonth()].slice(0, 3)}. – ${dg.getDate()} ${MESOS[dg.getMonth()].slice(0, 3)}.`;
    cos = '<div class="vista-setmana">' + Array.from({ length: 7 }, (_, i) => {
      const d = addDays(dl, i), ds = ymd(d), plans = delDia(ds);
      return `<section class="setm-dia${ds === avui() ? ' avui' : ''}">
          <button class="setm-cap" data-anadia="${ds}" aria-label="Veure el dia"><b>${DIES[i]}</b><span>${d.getDate()}</span></button>
          <div class="setm-plans">${plans.map((p) => targeta(p)).join('') || `<button class="setm-buit" data-nou="${ds}">+ Afegeix</button>`}</div>
        </section>`;
    }).join('') + '</div><button class="btn llista-btn" data-llista="setmana">📋 Llista de la setmana</button>';
  } else if (mode === 'any') {
    const y = ui.cursor.getFullYear();
    titol = String(y);
    cos = '<div class="vista-any">' + MESOS.map((nomMes, m) => {
      const inici = mondayOf(new Date(y, m, 1));
      let dies = '';
      for (let i = 0; i < 42; i++) {
        const d = addDays(inici, i);
        if (i >= 35 && d.getMonth() !== m) break;
        if (d.getMonth() !== m) { dies += '<span></span>'; continue; }
        const ds = ymd(d), plans = delDia(ds).filter((p) => p.estat !== 'cancellat');
        const c = plans.length ? tipDe(plans[0]).color : '';
        dies += `<button class="any-dia${plans.length ? ' te' : ''}${ds === avui() ? ' avui' : ''}" data-anadia="${ds}" ${c ? `style="--c:${esc(c)}"` : ''}>${d.getDate()}</button>`;
      }
      return `<section class="any-mes">
          <button class="any-nom" data-anames="${m}">${cap(nomMes)}</button>
          <div class="any-grid">${DIES.map((x) => `<b>${x}</b>`).join('')}${dies}</div>
        </section>`;
    }).join('') + '</div>';
  } else {
    const c = ui.cursor;
    titol = `${cap(MESOS[c.getMonth()])} ${c.getFullYear()}`;
    const inici = mondayOf(new Date(c.getFullYear(), c.getMonth(), 1));
    let cel = '';
    for (let i = 0; i < 42; i++) {
      const d = addDays(inici, i);
      if (i >= 35 && d.getMonth() !== c.getMonth()) break;
      const ds = ymd(d), plans = delDia(ds), fora = d.getMonth() !== c.getMonth();
      const marques = plans.slice(0, 3).map((p) => `<i class="${p.estat === 'cancellat' ? 'canc' : ''}" style="--c:${esc(tipDe(p).color)}">${ico(tipDe(p))}</i>`).join('')
        + (plans.length > 3 ? `<em>+${plans.length - 3}</em>` : '');
      cel += `<button class="cel${fora ? ' fora' : ''}${ds === avui() ? ' avui' : ''}${ds === ui.diaSel ? ' sel' : ''}" data-dia="${ds}">
        <span class="num">${d.getDate()}</span><span class="marques">${marques}</span></button>`;
    }
    const delSel = delDia(ui.diaSel);
    cos = `<div class="cal-grid">${DIES.map((d) => `<span class="cal-dia">${d}</span>`).join('')}${cel}</div>
      <section class="dia-sel">
        <h3>${esc(etiquetaDia(ui.diaSel))}</h3>
        ${delSel.map((p) => targeta(p)).join('') || '<p class="buit">Cap pla aquest dia.</p>'}
        <button class="btn" data-nou="${ui.diaSel}">+ Afegeix un pla aquest dia</button>
      </section>`;
  }
  const quin = { dia: 'Dia', setmana: 'Setmana', mes: 'Mes', any: 'Any' }[mode];
  return `<div class="seg cal-modes">${MODES.map(([m, n]) => `<button data-calmode="${m}" aria-pressed="${mode === m}">${n}</button>`).join('')}</div>
    <div class="cal-cap">
      <button class="btn icona" data-mes="-1" aria-label="${quin} anterior">‹</button>
      <h2>${esc(titol)}</h2>
      <button class="btn icona" data-mes="1" aria-label="${quin} següent">›</button>
      <button class="btn" data-mes="0">Avui</button>
    </div>
    ${cos}`;
}

/* ---------- Vista: Gent ---------- */
function vistaGent() {
  if (ui.persona && pers(ui.persona)) {
    const pe = pers(ui.persona);
    const seus = state.plans.filter((p) => (p.qui || []).includes(pe.id));
    const propers = seus.filter((p) => p.data >= avui()).sort(perOrdre);
    const passats = seus.filter((p) => p.data < avui()).sort(perOrdre).reverse();
    const telNet = (t) => String(t || '').replace(/[^\d+]/g, '');
    const wa = (t) => { let n = telNet(t).replace(/^\+/, '').replace(/^00/, ''); if (/^[6789]\d{8}$/.test(n)) n = '34' + n; return 'https://wa.me/' + n; };
    const camp = (k, etiqueta, attrs = '') => `<label class="camp">${etiqueta}<input data-pcamp="${k}" value="${esc(pe[k] || '')}" autocomplete="off" ${attrs}></label>`;
    const accions = [
      pe.tel ? `<a class="btn" href="tel:${esc(telNet(pe.tel))}">📞 Truca</a>` : '',
      pe.tel ? `<a class="btn" href="${esc(wa(pe.tel))}" target="_blank" rel="noopener">💬 WhatsApp</a>` : '',
      pe.email ? `<a class="btn" href="mailto:${esc(pe.email)}">✉️ Correu</a>` : '',
      pe.adreca ? `<a class="btn" href="${esc(Cal.mapa(pe.adreca))}" target="_blank" rel="noopener">📍 Mapa</a>` : '',
    ].filter(Boolean).join('');
    return `<div class="cal-cap"><button class="btn" data-persona="">‹ Contactes</button><h2 id="fitxaNom">${esc(pe.nom)}</h2></div>
      ${accions ? `<div class="grp fitxa-accions">${accions}</div>` : ''}
      <div class="section fitxa">
        ${camp('nom', 'Nom')}
        ${camp('tel', 'Mòbil', 'type="tel" inputmode="tel"')}
        ${camp('tel2', 'Un altre telèfon', 'type="tel" inputmode="tel"')}
        <label class="camp">Correu
          <input data-pcamp="email" type="email" value="${esc(pe.email || '')}" placeholder="nom@exemple.com" autocomplete="off" inputmode="email"></label>
        ${camp('adreca', 'Adreça')}
${camp('aniversari', 'Aniversari <small>(dia/mes o dia/mes/any: sortirà sol al calendari cada any)</small>', 'placeholder="p. ex. 14/03 o 14/03/1980" inputmode="numeric"')}
        ${camp('empresa', 'Feina / empresa')}
        <label class="camp">Notes<textarea data-pcamp="notes" rows="3" placeholder="Al·lèrgies, gustos, el nom dels fills…">${esc(pe.notes || '')}</textarea></label>
        <p class="help">Els canvis es desen sols.</p>
        <button class="btn perill" id="pEsborra">Esborra aquesta persona</button>
      </div>
      <h3 class="sub">Propers</h3>
      ${propers.map((p) => targeta(p, true)).join('') || '<p class="buit">Cap pla previst.</p>'}
      <h3 class="sub">Fets</h3>
      ${passats.map((p) => targeta(p, true)).join('') || '<p class="buit">Encara cap.</p>'}`;
  }
  const llista = [...state.persones].sort((a, b) => a.nom.localeCompare(b.nom, 'ca'));
  const qg = normal(ui.cercaGent.trim());
  const coincideix = (pe) => !qg || normal([pe.nom, pe.tel, pe.tel2, pe.email, pe.empresa].join(' ')).includes(qg);
  return `${llista.length > 3 ? `<input type="search" id="cercaGent" class="cerca-gent" placeholder="🔍 Cerca un contacte" value="${esc(ui.cercaGent)}" autocomplete="off">` : ''}
    <form class="barra" id="formPersona">
      <input name="nom" placeholder="Nom d'una persona" autocomplete="off">
      <button class="btn primary">Afegeix</button>
    </form>
    <div class="grp">
      ${potContactes() ? '<button class="btn" id="gContactes">📇 Tria dels contactes</button>' : ''}
      <label class="btn">📥 Importa contactes<input type="file" id="gVcf" accept=".vcf,text/vcard,text/x-vcard" multiple hidden></label>
    </div>
    ${potContactes() ? '' : AJUDA_CONTACTES}
    ${llista.length ? (() => {
      const n = llista.filter((pe) => llegeixAniv(pe.aniversari)).length;
      return `<p class="help">${llista.length} contactes · ${n ? `<b>${n}</b> amb l'aniversari apuntat (surten sols al calendari)` : "cap amb l'aniversari apuntat"}.${n < llista.length ? ' Si als teus contactes de l\'iPhone hi tens aniversaris que aquí no surten, torna a importar el fitxer: s\'ompliran les dades que falten.' : ''}</p>`;
    })() : ''}
    ${llista.length ? `<div class="gent">${llista.map((pe) => {
      const seus = state.plans.filter((p) => (p.qui || []).includes(pe.id)).sort(perOrdre);
      const prox = seus.find((p) => p.data >= avui());
      const ult = [...seus].reverse().find((p) => p.data < avui());
      const info = [pe.tel || '', seus.length ? `${seus.length} ${seus.length === 1 ? 'pla' : 'plans'}` : 'Cap pla', prox ? 'proper: ' + dataCurta(prox.data) : ult ? 'últim: ' + dataCurta(ult.data) : ''].filter(Boolean).join(' · ');
      return `<button class="persona" data-persona="${esc(pe.id)}" data-cerca="${esc(normal([pe.nom, pe.tel, pe.tel2, pe.email, pe.empresa].join(' ')))}" ${coincideix(pe) ? '' : 'hidden'}><span class="avatar">${esc(pe.nom.trim().charAt(0).toUpperCase())}</span><span><b>${esc(pe.nom)}</b><small>${esc(info)}</small></span></button>`;
    }).join('')}</div>` : '<p class="buit">Aquí hi sortiran les persones amb qui quedes. Les pots afegir aquí o directament quan crees un pla.</p>'}`;
}

/* ---------- Vista: Ajustos ---------- */
function vistaAjustos() {
  const files = GRUPS.map(([g, nomG]) => {
    const ts = tipusOrdenats().filter((t) => grupDe(t) === g);
    if (!ts.length) return '';
    return `<h3 class="sub">${esc(nomG)}</h3>` + ts.map((t, i) => `<div class="tipus-fila" data-tid="${esc(t.id)}">
        ${botoColor(t.color, 'data-camp="color"')}
        <div class="tipus-dades">
          <input data-camp="nom" value="${esc(t.nom)}" aria-label="Nom">
          <select data-camp="grup" aria-label="Grup">${GRUPS.map(([x, n]) => `<option value="${x}"${x === g ? ' selected' : ''}>${esc(n)}</option>`).join('')}</select>
        </div>
        <div class="tipus-ordre">
          <button class="btn icona" data-mou="-1" aria-label="Puja ${esc(t.nom)}" ${i === 0 ? 'disabled' : ''}>▲</button>
          <button class="btn icona" data-mou="1" aria-label="Baixa ${esc(t.nom)}" ${i === ts.length - 1 ? 'disabled' : ''}>▼</button>
        </div>
        <button class="btn icona" data-treu="${esc(t.id)}" aria-label="Treu ${esc(t.nom)}">×</button>
      </div>`).join('');
  }).join('');
  return `${sync() ? sync().html() : ''}
    <div class="section" id="seccioExterns">
      <h2>Altres calendaris</h2>
      <p class="help">Afegeix aquí el calendari d'una altra app (per exemple, el de les <b>gravacions de podcasts</b>):
        les seves activitats sortiran a Plans i al Calendari (només per consultar-les) i l'app t'avisarà si un pla hi coincideix.</p>
      ${externs().map((c) => `<div class="extern-fila" data-ext="${esc(c.id)}">
          ${botoColor(c.color || '#2F9E44', 'data-extcamp="color"')}
          <div class="tipus-dades"><input data-extcamp="nom" value="${esc(c.nom)}" aria-label="Nom">
            <small class="hint">${cauExt[c.id] ? `${(cauExt[c.id].events || []).length} activitats · actualitzat ${new Date(cauExt[c.id].quan).toLocaleString('ca', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}` : 'Encara no s\'ha llegit'}</small></div>
          <button class="btn icona" data-treuext="${esc(c.id)}" aria-label="Treu ${esc(c.nom)}">×</button>
        </div>`).join('')}
      <form class="barra" id="formExtern">
        <input name="nom" placeholder="Nom (p. ex. Gravacions)" autocomplete="off">
        <input name="url" placeholder="Enllaç del calendari (webcal://… o https://…)" autocomplete="off" autocapitalize="off" spellcheck="false">
        <button class="btn primary">Afegeix</button>
      </form>
      ${externs().length ? '<button class="btn" id="extActualitza">Actualitza ara</button>' : ''}
    </div>
    ${sync()?.disponible ? `<div class="section" id="seccioCal">
      <h2>Calendari de l'iPhone</h2>
      <p class="help">Fes-ho <b>una sola vegada</b>: el calendari de l'iPhone se subscriu a la teva agenda i hi apareixen sols
        tots els plans i els <b>aniversaris</b> dels contactes (cada any, amb un avís el mateix dia). S'actualitza sol, sense preguntar res.</p>
      ${usuari()
        ? `<div class="grp">
            <button class="btn primary" id="calSubscriu">📆 Afegeix l'agenda al calendari de l'iPhone</button>
            <button class="btn" id="calCopia">Copia l'enllaç (Google, Outlook…)</button>
          </div>
          <details class="ajuda"><summary>Més informació</summary>
            <p>Els canvis poden trigar una estona a sortir a l'iPhone (normalment menys d'una hora). Per fer-ho més ràpid:
              <b>Configuració → Apps → Calendari → Comptes → Obtenir dades</b>.</p>
            <p>Perquè avisi dels aniversaris, al calendari subscrit desactiva <b>«Elimina les alertes»</b>.</p>
            <p>L'enllaç és privat: qui el tingui pot veure la teva agenda. Si l'has compartit sense voler,
              <button class="enllac" id="calNou">fes-ne un de nou</button> (l'antic deixarà de funcionar i caldrà tornar-se a subscriure).</p>
          </details>`
        : '<p class="help">Primer has d\'entrar amb el teu correu (a dalt, a «Compte»).</p>'}
    </div>` : ''}
    ${sync()?.disponible && rebuts().length ? `<div class="section" id="seccioAuto">
      <h2>Plans que t'envien</h2>
      <label class="check"><input type="checkbox" id="acceptaTot" ${state.ajustos.acceptaTot ? 'checked' : ''}> Accepta sols tots els plans que m'enviïn</label>
      <p class="help">Si no ho marques, només s'accepten sols els d'aquestes persones (les afegeixes amb «Accepta sempre els plans de…» a cada invitació):</p>
      ${confiança().length ? `<div class="confiança">${confiança().map((em) => `<span class="xip">${esc(nomDeCorreu(em))}<button class="treu-conf" data-treuconf="${esc(em)}" aria-label="Treu ${esc(em)}">×</button></span>`).join('')}</div>` : '<p class="help"><i>Encara cap.</i></p>'}
    </div>` : ''}
    <div class="section">
      <h2>El teu nom</h2>
      <p class="help">Surt als missatges dels plans que comparteixes.</p>
      <input id="nomMeu" value="${esc(state.ajustos.nom || '')}" placeholder="El teu nom">
    </div>
    <div class="section" id="seccioTipus">
      <h2>Tipus de pla</h2>
      <p class="help">Toca el cercle per canviar-ne el color. Amb ▲ ▼ ordenes les categories dins del seu grup (les de dalt surten primer al formulari), i amb el desplegable les canvies de grup. Els canvis es desen sols.</p>
      ${files}
      <form class="barra" id="formTipus">
        ${botoColor(COLORS_NOUS[state.tipus.length % COLORS_NOUS.length], 'name="color"')}
        <input name="nom" placeholder="Nou tipus (p. ex. Karaoke)" autocomplete="off">
        <select name="grup" aria-label="Grup">${GRUPS.map(([g, n]) => `<option value="${g}"${g === 'altres' ? ' selected' : ''}>${esc(n)}</option>`).join('')}</select>
        <button class="btn primary">Afegeix</button>
      </form>
    </div>
    <div class="section">
      <h2>Còpia de seguretat</h2>
      <p class="help">Desa tots els plans en un fitxer, o recupera'ls d'una còpia.</p>
      <div class="grp">
        <button class="btn" id="btnExporta">Desa una còpia</button>
        <label class="btn">Recupera una còpia<input type="file" id="fitxerImporta" accept=".json,application/json" hidden></label>
      </div>
    </div>
    <div class="section">
      <h2>Guia d'ús</h2>
      <p class="help">Una guia pràctica de dues pàgines per imprimir o enviar a qui comenci a fer servir l'app.</p>
      <a class="btn" href="guia.html" target="_blank" rel="noopener">📄 Obre la guia</a>
    </div>
    <p class="versio">Què · Qui · Quan${PROVES ? ' · versió de proves' : ''}</p>`;
}

/* ---------- Vista: Entrada (correu + codi, sense contrasenya) ---------- */
function vistaEntrada() {
  const en = ui.entrada;
  let cos;
  if (en.pas === 'codi') {
    cos = `<p>Hem enviat un codi a <b>${esc(en.email)}</b>.<br>Mira el correu (i la carpeta de correu brossa) i escriu-lo aquí:</p>
      <form id="formCodi" class="entrada-form">
        <input name="codi" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="Codi" class="codi" required>
        <button class="btn primary">Entra</button>
      </form>
      <div class="grp centre">
        <button class="enllac" data-pas="correu">Canvia el correu</button>
        <button class="enllac" id="reenvia">Torna a enviar el codi</button>
      </div>`;
  } else if (en.pas === 'nom') {
    cos = `<form id="formNom" class="entrada-form">
        <label class="camp">Com et dius?<input name="nom" value="${esc(state.ajustos.nom || '')}" autocomplete="given-name" required></label>
        <p class="help">És el nom que veuran les persones a qui enviïs plans.</p>
        <button class="btn primary">Comença</button>
      </form>`;
  } else {
    cos = `<form id="formCorreu" class="entrada-form">
        <label class="camp">El teu correu<input type="email" name="email" value="${esc(en.email)}" autocomplete="email" inputmode="email" placeholder="nom@exemple.com" required></label>
        <button class="btn primary">Envia'm un codi</button>
      </form>
      <p class="help">T'enviarem un codi per correu per entrar. No cal cap contrasenya.</p>
      <button class="enllac" id="senseCompte">Ara no: fes-la servir només en aquest dispositiu</button>`;
  }
  return `<div class="entrada">
      <img src="img/icona.svg" alt="" class="entrada-logo">
      <h1><span class="w-que">Què</span> · <span class="w-qui">Qui</span> · <span class="w-quan">Quan</span></h1>
      <p class="entrada-sub">Els teus sopars, concerts, trobades i sortides, en un sol lloc.</p>
      ${cos}
    </div>`;
}

/* ---------- Pintar ---------- */
/* ---------- Portada (el que surt en obrir l'app) ---------- */
function vistaInici() {
  const h = new Date().getHours();
  const salut = h < 6 ? 'Bona nit' : h < 13 ? 'Bon dia' : h < 20 ? 'Bona tarda' : 'Bona nit';
  const nom = (state.ajustos.nom || '').trim().split(' ')[0];
  // Només el que encara ha de venir: un pla amb hora desapareix quan acaba («Fins a», o una hora després de començar)
  const ara = new Date(), minutsAra = ara.getHours() * 60 + ara.getMinutes();
  const minuts = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + (b || 0); };
  const pendent = (p) => {
    if (p.totElDia || !p.hora || diesPla(p) > avui() || p.data < avui()) return true;
    const ini = minuts(p.hora);
    const fi = p.horaFi ? (minuts(p.horaFi) > ini ? minuts(p.horaFi) : 24 * 60) : ini + 60;
    return fi > minutsAra;
  };
  const totsAvui = totsPlans().filter((p) => cobreix(p, avui()) && p.estat !== 'cancellat');
  const dAvui = totsAvui.filter(pendent).sort(perOrdre);
  const inv = rebuts().filter((p) => p.rebut.resposta === 'pendent' && p.data >= avui()).length;
  const encara = totsAvui.length > dAvui.length ? 'encara ' : '';
  const resum = dAvui.length
    ? `Avui ${encara}tens <b>${dAvui.length} ${dAvui.length === 1 ? 'pla' : 'plans'}</b>`
    : totsAvui.length ? 'Avui ja no et queda cap pla' : 'Avui no tens cap pla';
  return `<div class="portada">
      <div class="portada-punt"></div>
      <h1>${esc(salut)}${nom ? ', ' + esc(nom) : ''}</h1>
      <p class="portada-data">${esc(cap(dataLlarga(avui())))}</p>
      <p class="portada-resum">${resum}${inv ? ` · <b>${inv}</b> ${inv === 1 ? 'invitació' : 'invitacions'} per respondre` : ''}</p>
      ${dAvui.length ? `<div class="portada-avui">${dAvui.slice(0, 4).map((p) => targeta(p)).join('')}${dAvui.length > 4 ? `<p class="help">i ${dAvui.length - 4} més…</p>` : ''}</div>` : ''}
      <button class="btn primary portada-nou" data-nou="${avui()}">+ Nou pla</button>
      ${inv ? '<button class="btn portada-veure" data-anar="propers">Veure les invitacions</button>' : ''}
    </div>`;
}

const VISTES = { inici: vistaInici, propers: vistaPropers, calendari: vistaCalendari, gent: vistaGent, ajustos: vistaAjustos, entrada: vistaEntrada };
function render() {
  if (!VISTES[ui.view]) ui.view = 'propers';
  if (ui.view === 'entrada' && !sync()?.disponible) ui.view = 'propers';
  document.body.classList.toggle('mode-entrada', ui.view === 'entrada');
  document.body.classList.toggle('mode-inici', ui.view === 'inici');
  if ($('#syncBtn') && sync()?.disponible) $('#syncBtn').hidden = ui.view === 'entrada';
  $$('#tabs button').forEach((b) => b.setAttribute('aria-current', b.dataset.view === ui.view ? 'page' : 'false'));
  const focus = document.activeElement?.id === 'cerca' ? document.activeElement.selectionStart : null;
  $('#main').innerHTML = `<div class="vista vista-${ui.view}">${VISTES[ui.view]()}</div>`;
  if (focus !== null && $('#cerca')) { $('#cerca').focus(); $('#cerca').setSelectionRange(focus, focus); }
  if (ui.view === 'ajustos' && sync()) sync().bind();
  if (ui.view === 'entrada') $('.entrada input')?.focus();
}
const fiEntrada = () => { ui.view = 'inici'; render(); };

/* ---------- Clics a la pantalla principal ---------- */
$('#tabs').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-view]');
  if (!b) return;
  ui.view = b.dataset.view; ui.persona = '';
  desaPref('view', ui.view);
  render(); window.scrollTo(0, 0);
});
$('#btnNou').addEventListener('click', () => obreForm(null, { data: ui.view === 'calendari' ? ui.diaSel : avui() }));

$('#main').addEventListener('click', (e) => {
  const t = e.target;
  const pla = t.closest('[data-pla]');
  const tc = t.closest('[data-treuconf]');
  if (tc) { state.ajustos.autoAccepta = confiança().filter((x) => x !== tc.dataset.treuconf); save(); render(); return; }
  const sempre = t.closest('[data-sempre]');
  if (sempre) {
    const p = trobaPla(sempre.dataset.sempre);
    if (!p?.rebut?.de_email) return;
    const em = normal(p.rebut.de_email);
    if (!confiança().includes(em)) state.ajustos.autoAccepta = [...confiança(), em];
    save();
    respon(p, 'si');
    toast(`A partir d'ara, els plans de ${p.rebut.de_nom || em} s'afegiran sols`);
    return;
  }
  const resp = t.closest('[data-respon]');
  if (resp) { const p = trobaPla(resp.dataset.r); if (p) respon(p, resp.dataset.respon); return; }
  if (pla) { const p = trobaPla(pla.dataset.pla); if (p) (p.aniversari ? obreAniversari(p) : p.extern ? obreExtern(p) : obreDetall(p)); return; }
  if (t.closest('[data-entrada]')) { ui.view = 'entrada'; ui.entrada = { pas: 'correu', email: '' }; render(); return; }
  const pas = t.closest('[data-pas]');
  if (pas) { ui.entrada.pas = pas.dataset.pas; render(); return; }
  if (t.id === 'senseCompte') { desaPref('senseCompte', true); fiEntrada(); return; }
  if (t.id === 'reenvia') {
    sync().demanaCodi(ui.entrada.email).then(() => toast('Codi enviat de nou')).catch((err) => toast(errorEntrada(err)));
    return;
  }
  const nou = t.closest('[data-nou]');
  if (nou) { obreForm(null, { data: nou.dataset.nou || avui() }); return; }
  const ps = t.closest('[data-passats]');
  if (ps) { ui.passats = ps.dataset.passats === '1'; render(); return; }
  const dia = t.closest('[data-dia]');
  if (dia) {
    ui.diaSel = dia.dataset.dia;
    const d = parseYmd(ui.diaSel);
    if (d.getMonth() !== ui.cursor.getMonth()) ui.cursor = new Date(d.getFullYear(), d.getMonth(), 1);
    render(); return;
  }
  const mes = t.closest('[data-mes]');
  if (mes) { navegaCalendari(Number(mes.dataset.mes)); return; }
  const an = t.closest('[data-anar]');
  if (an) { ui.view = an.dataset.anar; render(); window.scrollTo(0, 0); return; }
  const ll = t.closest('[data-llista]');
  if (ll) { obreLlista(ll.dataset.llista); return; }
  const am = t.closest('[data-anames]');
  if (am) {
    ui.cursor = new Date(ui.cursor.getFullYear(), Number(am.dataset.anames), 1);
    ui.calMode = 'mes'; desaPref('calMode', 'mes'); render(); window.scrollTo(0, 0); return;
  }
  const cm = t.closest('[data-calmode]');
  if (cm) {
    ui.calMode = cm.dataset.calmode; desaPref('calMode', ui.calMode);
    const d = parseYmd(ui.diaSel); ui.cursor = new Date(d.getFullYear(), d.getMonth(), 1);
    render(); return;
  }
  const ad = t.closest('[data-anadia]');
  if (ad) { ui.diaSel = ad.dataset.anadia; ui.calMode = 'dia'; desaPref('calMode', 'dia'); render(); window.scrollTo(0, 0); return; }
  const pe = t.closest('[data-persona]');
  if (pe) { ui.persona = pe.dataset.persona; render(); window.scrollTo(0, 0); return; }
  if (t.id === 'pRenom') {
    const p = pers(ui.persona);
    const n = prompt('Nom nou:', p.nom);
    if (n && n.trim()) { p.nom = n.trim(); save(); render(); }
    return;
  }
  if (t.id === 'pEsborra') {
    const p = pers(ui.persona);
    const n = usos(p.id);
    if (!confirm(`Esborrar ${p.nom}?${n ? ` Surt en ${n} ${n === 1 ? 'pla' : 'plans'}; els plans es mantindran, però sense aquesta persona.` : ''}`)) return;
    state.plans.forEach((x) => { if ((x.qui || []).includes(p.id)) x.qui = x.qui.filter((i) => i !== p.id); });
    state.persones = state.persones.filter((x) => x.id !== p.id);
    ui.persona = ''; save(); render(); return;
  }
  const mou = t.closest('[data-mou]');
  if (mou) {
    const id = mou.closest('[data-tid]').dataset.tid;
    const tt = state.tipus.find((x) => x.id === id);
    const germans = tipusOrdenats().filter((x) => grupDe(x) === grupDe(tt));
    const i = germans.indexOf(tt), j = i + Number(mou.dataset.mou);
    if (j < 0 || j >= germans.length) return;
    const ord = tipusOrdenats();
    const a = ord.indexOf(tt), b = ord.indexOf(germans[j]);
    [ord[a], ord[b]] = [ord[b], ord[a]];
    ord.forEach((x, k) => { if (x.ordre !== k) x.ordre = k; });
    save();
    const y = mou.getBoundingClientRect().top;
    render();
    // Manté la fila a la vista mentre es mou
    const nova = document.querySelector(`[data-tid="${id}"] [data-mou="${mou.dataset.mou}"]`) || document.querySelector(`[data-tid="${id}"]`);
    if (nova) window.scrollBy(0, nova.getBoundingClientRect().top - y);
    return;
  }
  const treu = t.closest('[data-treu]');
  if (treu) {
    const tt = state.tipus.find((x) => x.id === treu.dataset.treu);
    const n = state.plans.filter((p) => p.tipusId === tt.id).length;
    if (!confirm(`Treure «${tt.nom}»?${n ? ` Els ${n} plans d'aquest tipus passaran a «Altres».` : ''}`)) return;
    state.tipus = state.tipus.filter((x) => x.id !== tt.id);
    save(); render(); return;
  }
  if (t.id === 'btnExporta') exporta();
});

$('#main').addEventListener('input', (e) => {
  if (e.target.id === 'cercaGent') {
    ui.cercaGent = e.target.value;
    const q = normal(ui.cercaGent.trim());
    $$('.persona[data-cerca]').forEach((b) => { b.hidden = Boolean(q) && !b.dataset.cerca.includes(q); });
    return;
  }
  if (e.target.id === 'cerca') { ui.cerca = e.target.value; render(); }
});
$('#main').addEventListener('change', (e) => {
  const t = e.target;
  if (t.id === 'acceptaTot') {
    state.ajustos.acceptaTot = t.checked; save();
    toast(t.checked ? "Els plans que t'enviïn s'afegiran sols" : "Només s'afegiran sols els de les persones de la llista");
    if (t.checked) acceptaAutomatics();
    return;
  }
  if (t.id === 'nomMeu') { state.ajustos.nom = t.value.trim(); save(); toast('Desat'); return; }
  if (t.dataset.pcamp) {
    const pe = pers(ui.persona), k = t.dataset.pcamp, v = t.value.trim();
    if (k === 'nom' && !v) { t.value = pe.nom; toast('El nom no pot quedar buit'); return; }
    if (k === 'email' && v && !emailValid(v)) { toast('Aquest correu no sembla correcte'); return; }
    if (k === 'aniversari' && v && !llegeixAniv(v)) { toast('Escriu l\'aniversari com 14/03 o 14/03/1980'); return; }
    pe[k] = k === 'email' ? v.toLowerCase() : v;
    save(); toast('Desat');
    if (k === 'nom') $('#fitxaNom').textContent = v;
    return;
  }
  if (t.id === 'pCorreu') {
    const v = t.value.trim().toLowerCase();
    if (v && !emailValid(v)) { toast('Aquest correu no sembla correcte'); return; }
    pers(ui.persona).email = v; save(); toast('Desat'); return;
  }
  const fila = t.closest('[data-tid]');
  if (fila && t.dataset.camp === 'grup') {
    const tt = state.tipus.find((x) => x.id === fila.dataset.tid);
    tt.grup = t.value;
    const ord = tipusOrdenats().filter((x) => x !== tt);
    ord.push(tt);
    ord.forEach((x, k) => { if (x.ordre !== k) x.ordre = k; });
    save(); render(); $(`[data-tid="${tt.id}"]`)?.scrollIntoView({ block: 'center' }); toast(`«${tt.nom}» mogut`);
    return;
  }
  if (fila && t.dataset.camp) {
    const tt = state.tipus.find((x) => x.id === fila.dataset.tid);
    const v = t.value.trim();
    if (!v) { t.value = tt[t.dataset.camp]; return; }
    tt[t.dataset.camp] = v; save(); toast('Desat'); return;
  }
  if (t.id === 'fitxerImporta' && t.files[0]) importa(t.files[0]);
});
function errorEntrada(err) {
  const m = String(err?.message || err || '');
  if (/rate|seconds|too many/i.test(m)) return "Massa intents seguits. Espera uns minuts i torna-ho a provar.";
  if (/expired|invalid|token/i.test(m)) return 'El codi no és correcte o ha caducat. Torna-ho a provar.';
  if (!navigator.onLine) return 'No hi ha connexió a internet.';
  return "No s'ha pogut fer: " + m;
}
// Persones de confiança: els seus plans s'accepten sols
const confiança = () => (Array.isArray(state.ajustos.autoAccepta) ? state.ajustos.autoAccepta : []);
const acceptaSol = (r) => state.ajustos.acceptaTot || confiança().includes(normal(r.de_email));
let acceptant = false;
async function acceptaAutomatics() {
  if (acceptant || !sync()?.usuari()) return;
  const pendents = (sync().rebuts() || []).filter((r) => r.resposta === 'pendent' && r.pla && acceptaSol(r));
  if (!pendents.length) return;
  acceptant = true;
  const fets = [];
  for (const r of pendents) {
    try { await sync().respon(r, 'si'); fets.push(r); } catch (e) { /* es tornarà a provar a la propera sincronització */ }
  }
  acceptant = false;
  if (fets.length) {
    toast(fets.length === 1 ? `Afegit sol: ${fets[0].pla.titol || fets[0].pla.tipusNom || 'un pla'} (de part de ${fets[0].de_nom || fets[0].de_email})` : `${fets.length} plans afegits sols`);
    if (!dlg.open) render();
  }
}
async function respon(p, resposta) {
  try {
    await sync().respon(p.rebut, resposta);
    toast(resposta === 'si' ? 'Apuntat! Ja el tens als teus plans 🎉' : 'Fet. Ja saben que no hi vas.');
    if (dlg.open) tancaDlg();
    render();
  } catch (err) { toast(navigator.onLine ? "No s'ha pogut enviar la resposta." : 'Cal connexió a internet per respondre.'); }
}

$('#main').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const boto = e.target.querySelector('button.primary');
  if (e.target.id === 'formCorreu') {
    const email = String(f.get('email') || '').trim().toLowerCase();
    if (!emailValid(email)) { toast('Escriu un correu correcte'); return; }
    boto.disabled = true; boto.textContent = 'Enviant…';
    try { await sync().demanaCodi(email); ui.entrada = { pas: 'codi', email }; render(); }
    catch (err) { toast(errorEntrada(err)); boto.disabled = false; boto.textContent = "Envia'm un codi"; }
    return;
  }
  if (e.target.id === 'formCodi') {
    const codi = String(f.get('codi') || '').replace(/\D/g, '');
    if (codi.length < 6) { toast('El codi té 6 xifres o més'); return; }
    boto.disabled = true; boto.textContent = 'Entrant…';
    try {
      await sync().entra(ui.entrada.email, codi);
      if ((state.ajustos.nom || '').trim()) { toast('Hola de nou, ' + state.ajustos.nom + '!'); fiEntrada(); }
      else { ui.entrada.pas = 'nom'; render(); }
    } catch (err) { toast(errorEntrada(err)); boto.disabled = false; boto.textContent = 'Entra'; }
    return;
  }
  if (e.target.id === 'formNom') {
    const nom = String(f.get('nom') || '').trim();
    if (!nom) return;
    state.ajustos.nom = nom; save(); fiEntrada(); toast(`Benvingut/da, ${nom}! 🎉`);
    return;
  }
  if (e.target.id === 'formPersona') {
    const nom = String(f.get('nom') || '').trim();
    if (!nom) return;
    if (state.persones.some((p) => normal(p.nom) === normal(nom))) { toast(`${nom} ja hi és.`); return; }
    state.persones.push({ id: 'pe-' + uid(), nom }); save(); render();
    $('#formPersona input')?.focus();
  }
  if (e.target.id === 'formExtern') {
    const nom = String(f.get('nom') || '').trim() || 'Gravacions';
    const url = String(f.get('url') || '').trim();
    if (!/^(webcals?|https):\/\//i.test(url)) { toast("Enganxa l'enllaç del calendari (comença per webcal:// o https://)"); return; }
    state.ajustos.externs = [...externs(), { id: 'c-' + uid(), nom, url, color: '#2F9E44' }];
    save(); render(); toast('Llegint el calendari…');
    actualitzaExterns(true);
    return;
  }
  if (e.target.id === 'formTipus') {
    const nom = String(f.get('nom') || '').trim();
    if (!nom) return;
    state.tipus.push({ id: 't-' + uid(), nom, emoji: '', icona: 'auto_awesome', color: COLORS_NOUS[state.tipus.length % COLORS_NOUS.length], grup: String(f.get('grup') || 'altres'), color: String(f.get('color') || '#5C7CFA') });
    save(); render(); toast(`«${nom}» afegit`);
  }
});

// Gent: afegir persones des dels contactes del mòbil o d'un fitxer .vcf
function contactesAfegits(n, total) {
  save(); render();
  toast(total ? (n ? `${n} ${n === 1 ? 'persona afegida' : 'persones afegides'}` : 'Ja les tenies totes (he afegit els correus que faltaven)') : 'No hi he trobat cap contacte');
}
$('#main').addEventListener('click', (e) => {
  if (!e.target.closest('#gContactes')) return;
  triaContactes().then((cs) => { const nous = []; incorporaContactes(cs, [...state.persones], nous); state.persones.push(...nous); contactesAfegits(nous.length, cs.length); }).catch(() => {});
});
$('#main').addEventListener('change', async (e) => {
  if (e.target.id !== 'gVcf' || !e.target.files.length) return;
  const cs = [];
  for (const f of e.target.files) cs.push(...llegeixVcf(await f.text()));
  const nous = [];
  incorporaContactes(cs, [...state.persones], nous);
  state.persones.push(...nous);
  contactesAfegits(nous.length, cs.length);
});

/* ---------- Mantenir premut un pla (o botó dret) per eliminar-lo ---------- */
function eliminaPla(p) {
  p = p?.base || p;
  if (!p || p.rebut || p.aniversari || p.extern) {
    if (p?.rebut) toast("Aquest pla te l'han enviat: no el pots eliminar, però pots dir que no hi vas.");
    return;
  }
  if (!confirm(p.repeteix ? `Vols eliminar «${titolPla(p)}» i totes les seves repeticions?` : `Vols eliminar «${titolPla(p)}»?`)) return;
  state.plans = state.plans.filter((x) => x.id !== p.id);
  save(); render(); toast('Pla eliminat');
}
let premut = null, ignoraClic = false;
$('#main').addEventListener('touchstart', (e) => {
  const c = e.target.closest('[data-pla]');
  if (!c || e.touches.length !== 1) return;
  const x = e.touches[0].clientX, y = e.touches[0].clientY;
  clearTimeout(premut?.t);
  premut = {
    x, y, c,
    t: setTimeout(() => {
      premut = null;
      ignoraClic = true;                    // el clic que ve després de deixar anar no ha d'obrir el pla
      setTimeout(() => { ignoraClic = false; }, 900);
      if (navigator.vibrate) navigator.vibrate(15);
      eliminaPla(trobaPla(c.dataset.pla));
    }, 550),
  };
}, { passive: true });
const cancelaPremut = () => { if (premut) { clearTimeout(premut.t); premut = null; } };
$('#main').addEventListener('touchmove', (e) => {
  if (premut && Math.hypot(e.touches[0].clientX - premut.x, e.touches[0].clientY - premut.y) > 10) cancelaPremut();
}, { passive: true });
$('#main').addEventListener('touchend', cancelaPremut, { passive: true });
$('#main').addEventListener('touchcancel', cancelaPremut, { passive: true });
$('#main').addEventListener('contextmenu', (e) => {
  const c = e.target.closest('[data-pla]');
  if (!c) return;
  e.preventDefault();
  if (!('ontouchstart' in window)) eliminaPla(trobaPla(c.dataset.pla));
});
$('#main').addEventListener('click', (e) => {
  if (ignoraClic && e.target.closest('[data-pla]')) { e.stopImmediatePropagation(); e.preventDefault(); }
}, true);

/* ---------- Ajustos: altres calendaris (nom, color, treure, actualitzar) ---------- */
$('#main').addEventListener('change', (e) => {
  const camp = e.target.dataset.extcamp, fila = e.target.closest('[data-ext]');
  if (!camp || !fila) return;
  const c = externs().find((x) => x.id === fila.dataset.ext);
  const v = e.target.value.trim();
  if (!c || !v) return;
  c[camp] = v; save(); toast('Desat');
  if (camp === 'color') render();
});
$('#main').addEventListener('click', (e) => {
  const tr = e.target.closest('[data-treuext]');
  if (tr) {
    const c = externs().find((x) => x.id === tr.dataset.treuext);
    if (!c || !confirm(`Treure el calendari «${c.nom}»? Les seves activitats deixaran de sortir aquí (a la seva app no es toca res).`)) return;
    state.ajustos.externs = externs().filter((x) => x.id !== c.id);
    delete cauExt[c.id];
    try { localStorage.setItem(CAU_EXT, JSON.stringify(cauExt)); } catch (x) { /* res */ }
    save(); render(); return;
  }
  if (e.target.closest('#extActualitza')) { toast('Llegint…'); actualitzaExterns(true); }
});

/* ---------- Ajustos: subscripció al calendari ---------- */
$('#main').addEventListener('click', async (e) => {
  const b = e.target.closest('#calSubscriu, #calCopia, #calNou');
  if (!b) return;
  if (b.id === 'calNou' && !confirm("Fer un enllaç nou? L'antic deixarà de funcionar i t'hauràs de tornar a subscriure des de l'iPhone.")) return;
  try {
    const en = await sync().enllacCalendari(b.id === 'calNou');
    if (b.id === 'calSubscriu') { location.href = en.webcal; return; }
    if (b.id === 'calNou') { toast('Enllaç nou creat. Torna a prémer «Afegeix l\'agenda…»'); return; }
    try { await navigator.clipboard.writeText(en.https); toast('Enllaç copiat'); }
    catch (x) { prompt('Copia aquest enllaç:', en.https); }
  } catch (err) {
    toast(navigator.onLine ? "No s'ha pogut preparar el calendari. Comprova que a Supabase hi ha la taula i la funció «calendari»." : 'Cal connexió a internet.');
  }
});

/* ---------- Llista del dia / de la setmana (per imprimir o compartir) ---------- */
function diesLlista(quin) {
  const sel = parseYmd(ui.diaSel);
  if (quin === 'dia') return [ui.diaSel];
  const dl = mondayOf(sel);
  return Array.from({ length: 7 }, (_, i) => ymd(addDays(dl, i)));
}
function activitatsDe(ds) {
  return totsPlans().filter((p) => cobreix(p, ds) && p.estat !== 'cancellat').sort(perOrdre);
}
function htmlLlista(dies) {
  const blocs = dies.map((ds) => {
    const ps = activitatsDe(ds);
    if (!ps.length && dies.length > 1) return '';
    return `<section class="ll-dia">
        <h2>${esc(cap(dataLlarga(ds)) + (parseYmd(ds).getFullYear() !== new Date().getFullYear() ? ' de ' + parseYmd(ds).getFullYear() : ''))}</h2>
        ${ps.length ? `<ul>${ps.map((p) => {
          const n = noms(p);
          const detalls = [p.lloc ? '📍 ' + p.lloc : '', n.length && (p.titol || '').trim() ? '👥 ' + llistaNoms(n) : '', p.extern ? p.extern.nom : ''].filter(Boolean);
          return `<li style="--c:${esc(tipDe(p).color)}">
              <span class="ll-casella"></span>
              <span class="ll-hora">${esc(p.totElDia || !p.hora ? 'Tot el dia' : p.hora + (p.horaFi ? '–' + p.horaFi : ''))}</span>
              <span class="ll-cos"><b>${esc(titolPla(p))}</b>${detalls.length ? `<small>${esc(detalls.join(' · '))}</small>` : ''}${p.notes ? `<small class="ll-notes">${esc(p.notes)}</small>` : ''}</span>
            </li>`;
        }).join('')}</ul>` : '<p class="ll-buit">Cap activitat.</p>'}
      </section>`;
  }).join('');
  return blocs || '<p class="ll-buit">Cap activitat aquesta setmana.</p>';
}
function textLlista(dies) {
  return dies.map((ds) => {
    const ps = activitatsDe(ds);
    if (!ps.length && dies.length > 1) return '';
    return [cap(dataLlarga(ds)).toUpperCase(), ...(ps.length ? ps.map((p) => {
      const n = noms(p);
      return `☐ ${p.totElDia || !p.hora ? 'Tot el dia' : p.hora + (p.horaFi ? '–' + p.horaFi : '')} · ${titolPla(p)}${p.lloc ? ' · 📍 ' + p.lloc : ''}${n.length && (p.titol || '').trim() ? ' · 👥 ' + llistaNoms(n) : ''}`;
    }) : ['(cap activitat)'])].join('\n');
  }).filter(Boolean).join('\n\n');
}
function obreLlista(quin) {
  const dies = diesLlista(quin);
  const titol = quin === 'dia' ? 'Llista del dia' : 'Llista de la setmana';
  obreDlg(`<header class="dlg-cap"><h2>${titol}</h2><button type="button" class="x" data-tanca aria-label="Tanca">×</button></header>
    <div class="dlg-cos"><div class="llista-full">${htmlLlista(dies)}</div></div>
    <footer class="dlg-peu">
      <button type="button" class="btn" id="llText">📤 Envia el text</button>
      <button type="button" class="btn primary" id="llImprimeix">🖨️ Imprimeix</button>
    </footer>`, 'form');
  dlgForm.onclick = async (e) => {
    if (e.target.closest('#llImprimeix')) {
      // Es prepara un full a part (fora de la finestra) i s'imprimeix només aquest
      const full = $('#impressio');
      full.innerHTML = `<div class="llista-full imprès"><p class="ll-app">Què · Qui · Quan</p>${htmlLlista(dies)}</div>`;
      tancaDlg();
      document.body.classList.add('imprimint');
      setTimeout(() => { window.print(); setTimeout(() => document.body.classList.remove('imprimint'), 500); }, 100);
      return;
    }
    if (e.target.closest('#llText')) {
      const text = textLlista(dies);
      if (navigator.share) { try { await navigator.share({ title: titol, text }); return; } catch (x) { if (x.name === 'AbortError') return; } }
      try { await navigator.clipboard.writeText(text); toast('Llista copiada'); } catch (x) { prompt('Copia la llista:', text); }
    }
  };
}
addEventListener('afterprint', () => document.body.classList.remove('imprimint'));

/* ---------- Calendari: anar endavant o enrere (fletxes o lliscar amb el dit) ---------- */
function navegaCalendari(n) {
  if (n === 0) { ui.cursor = new Date(); ui.diaSel = avui(); }
  else if (ui.calMode === 'dia') ui.diaSel = ymd(addDays(parseYmd(ui.diaSel), n));
  else if (ui.calMode === 'setmana') ui.diaSel = ymd(addDays(parseYmd(ui.diaSel), 7 * n));
  else if (ui.calMode === 'any') ui.cursor = new Date(ui.cursor.getFullYear() + n, 0, 1);
  else ui.cursor = new Date(ui.cursor.getFullYear(), ui.cursor.getMonth() + n, 1);
  if (ui.calMode === 'dia' || ui.calMode === 'setmana') { const d = parseYmd(ui.diaSel); ui.cursor = new Date(d.getFullYear(), d.getMonth(), 1); }
  render();
  if (n) {
    const v = $('.vista-calendari');
    if (v) { v.classList.add(n > 0 ? 'entra-dreta' : 'entra-esquerra'); }
  }
}
let toc = null;
$('#main').addEventListener('touchstart', (e) => {
  if (ui.view !== 'calendari' || e.touches.length !== 1) { toc = null; return; }
  toc = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
}, { passive: true });
$('#main').addEventListener('touchend', (e) => {
  if (!toc || ui.view !== 'calendari') return;
  const dx = e.changedTouches[0].clientX - toc.x, dy = e.changedTouches[0].clientY - toc.y;
  const rapid = Date.now() - toc.t < 700;
  toc = null;
  // Gest horitzontal clar: cap a l'esquerra = següent, cap a la dreta = anterior
  if (rapid && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) navegaCalendari(dx < 0 ? 1 : -1);
}, { passive: true });

/* ---------- Diàleg ---------- */
const dlg = $('#dlg'), dlgForm = $('#dlgForm');
function tancaDlg() { if (dlg.open) dlg.close(); }
dlg.addEventListener('click', (e) => {
  if (e.target === dlg || e.target.closest('[data-tanca]')) tancaDlg();
});
function obreDlg(html, classe = '') {
  dlgForm.onsubmit = null; dlgForm.onclick = null; dlgForm.onchange = null; dlgForm.oninput = null;
  dlgForm.className = classe;
  dlgForm.innerHTML = html;
  if (!dlg.open) dlg.showModal();
  dlgForm.scrollTop = 0;
}

/* ---------- Detall d'un aniversari ---------- */
function obreExtern(p) {
  obreDlg(`<header class="det-cap" style="--c:${esc(p._t.color)}">
      <span class="det-emoji">${ico(p._t)}</span>
      <div><small>${esc(p.extern.nom)}</small><h2>${esc(p.titol)}</h2></div>
      <button type="button" class="x" data-tanca aria-label="Tanca">×</button>
    </header>
    <div class="dlg-cos">
      <ul class="det">
        <li><span>📅</span>${esc(cap(dataLlarga(p.data)))}</li>
        <li><span>🕘</span>${esc(horaText(p))}</li>
        ${p.lloc ? `<li><span>📍</span><a href="${esc(mapaDe(p))}" target="_blank" rel="noopener">${esc(p.lloc)}</a></li>` : ''}
        ${p.notes ? `<li class="notes"><span>📝</span><div>${esc(p.notes).replace(/\n/g, '<br>')}</div></li>` : ''}
      </ul>
      <p class="help">Ve del calendari «${esc(p.extern.nom)}». Per canviar-lo, fes-ho a la seva app.</p>
    </div>`, 'detall');
}
function obreAniversari(p) {
  const pe = p.aniversari;
  obreDlg(`<header class="det-cap" style="--c:${esc(p._t.color)}">
      <span class="det-emoji">${ico(p._t)}</span>
      <div><small>Aniversari</small><h2>${esc(p.titol)}</h2></div>
      <button type="button" class="x" data-tanca aria-label="Tanca">×</button>
    </header>
    <div class="dlg-cos">
      <ul class="det">
        <li><span>🎂</span>${esc(cap(dataLlarga(p.data)))}</li>
        ${falten(p.data) ? `<li><span>⏳</span>${esc(cap(falten(p.data)))}</li>` : ''}
        ${pe.tel ? `<li><span>📞</span>${esc(pe.tel)}</li>` : ''}
      </ul>
      <p class="help">Surt sol cada any perquè la fitxa de ${esc(pe.nom)} té l'aniversari. Per canviar-lo o treure'l, edita la fitxa.</p>
    </div>
    <footer class="dlg-peu det-accions">
      ${pe.tel ? `<a class="btn primary" href="https://wa.me/${esc(waNum(pe.tel))}" target="_blank" rel="noopener">💬 Felicita'l per WhatsApp</a>` : ''}
      <button type="button" class="btn" id="aFitxa">👤 Fitxa de ${esc(pe.nom)}</button>
    </footer>`, 'detall');
  dlgForm.onclick = (e) => {
    if (e.target.closest('#aFitxa')) { tancaDlg(); ui.view = 'gent'; ui.persona = pe.id; render(); window.scrollTo(0, 0); }
  };
}
const waNum = (t) => { let n = String(t || '').replace(/[^\d+]/g, '').replace(/^\+/, '').replace(/^00/, ''); if (/^[6789]\d{8}$/.test(n)) n = '34' + n; return n; };

/* ---------- Detall d'un pla ---------- */
function obreDetall(p) {
  // Si és una de les repeticions, es mostra aquell dia però s'editen totes (el pla original)
  const vista = p;
  p = p.base || p;
  const t = tipDe(p);
  const n = noms(p);
  const r = p.rebut;
  const resp = !r && usuari() ? sync().respostes(p.id).filter((x) => (p.compartit || []).includes(x.email)) : [];
  const ambTel = r ? [] : (p.qui || []).map(pers).filter((pe) => pe && pe.tel);
  const whatsapp = ambTel.length ? `<li><span>💬</span><div>Avisa per WhatsApp:<div class="wa-botons">${ambTel.map((pe) =>
    `<a class="btn wa" href="https://wa.me/${esc(waNum(pe.tel))}?text=${encodeURIComponent(textPla(p, pe))}" target="_blank" rel="noopener">${esc(pe.nom)}</a>`).join('')}</div>
      <small class="hint">S'obre el xat amb el missatge escrit: només has de prémer Enviar.</small></div></li>` : '';
  const enviat = (p.compartit || []).length
    ? `<li><span>📨</span><div>Enviat a:<ul class="respostes">${(p.compartit || []).map((em) => {
      const x = resp.find((y) => y.email === em);
      return `<li><b>${esc(nomDeCorreu(em))}</b> <small>${esc(RESPOSTES[x?.resposta || 'pendent'])}</small></li>`;
    }).join('')}</ul>${usuari() ? '' : '<small class="hint">Entra amb el teu correu perquè els arribi.</small>'}</div></li>` : '';
  const peu = r
    ? `<button type="button" class="btn${r.resposta === 'si' ? ' primary' : ''}" data-respon="si">✅ Hi vaig</button>
       <button type="button" class="btn${r.resposta === 'no' ? ' primary' : ''}" data-respon="no">❌ No hi vaig</button>
       <button type="button" class="btn" id="dCalendari">Al meu calendari</button>`
    : `<button type="button" class="btn primary" id="dComparteix">📤 Comparteix</button>
       <button type="button" class="btn" id="dCalendari">Al meu calendari</button>
       <button type="button" class="btn" id="dEdita">✏️ Edita</button>
       <button type="button" class="btn" id="dDuplica">⧉ Duplica</button>`;
  obreDlg(`<header class="det-cap" style="--c:${esc(t.color)}">
      <span class="det-emoji">${ico(t)}</span>
      <div><small>${esc(t.nom)}</small><h2>${esc(titolPla(p))}</h2></div>
      <button type="button" class="x" data-tanca aria-label="Tanca">×</button>
    </header>
    <div class="dlg-cos">
      <ul class="det">
        ${r ? `<li><span>💌</span>De part de <b>&nbsp;${esc(r.de_nom || r.de_email)}</b></li>` : ''}
        <li><span>📅</span>${esc(etiquetaDia(vista.data) === cap(dataLlarga(vista.data)) ? etiquetaDia(vista.data) : etiquetaDia(vista.data) + ', ' + dataLlarga(vista.data))}${vista.dataFi && vista.dataFi > vista.data ? esc(' → ' + dataLlarga(vista.dataFi)) : ''}</li>
        ${p.repeteix ? `<li><span>🔁</span>${esc(nomRepeticio(p.repeteix))}${p.repeteixFins ? esc(', fins al ' + dataLlarga(p.repeteixFins)) : ''}</li>` : ''}
        <li><span>🕘</span>${esc(horaSola(p))}</li>
        ${p.lloc || p.llocUrl ? `<li><span>📍</span><a href="${esc(mapaDe(p))}" target="_blank" rel="noopener">${esc(p.lloc || 'Obre la ubicació al mapa')}</a></li>` : ''}
        ${n.length ? `<li><span>👥</span>${esc(llistaNoms(n))}</li>` : ''}
        ${p.estat !== 'confirmat' ? `<li><span>${p.estat === 'cancellat' ? '🚫' : '⏳'}</span>${esc((ESTATS.find((e) => e[0] === p.estat) || [, ''])[1])}</li>` : ''}
        ${p.notes ? `<li class="notes"><span>📝</span><div>${esc(p.notes).replace(/\n/g, '<br>')}</div></li>` : ''}
        ${whatsapp}
        ${r && r.resposta === 'pendent' ? '<li><span>❓</span>Encara no has dit si hi vas.</li>' : ''}
      </ul>
    </div>
    <footer class="dlg-peu det-accions">${peu}</footer>`, 'detall');
  dlgForm.onsubmit = (e) => e.preventDefault();
  dlgForm.onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.respon) { respon(p, b.dataset.respon); return; }
    if (b.id === 'dComparteix') enviaEnllac(p);
    if (b.id === 'dCalendari') obreAlCalendari(p);
    if (b.id === 'dEdita') obreForm(p);
    if (b.id === 'dDuplica') {
      const { id: _id, versio, modificat, compartit, ...resta } = p;
      obreForm(null, { ...resta, qui: [...(p.qui || [])], estat: 'confirmat' });
      toast('Tria el dia nou i desa');
    }
  };
}

/* ---------- Compartir ---------- */
function titolPer(p, pe) {
  if ((p.titol || '').trim() || !pe) return titolPla(p);
  const altres = (p.qui || []).filter((id) => id !== pe.id).map(pers).filter(Boolean).map((x) => x.nom);
  return nomCurt(tipDe(p)) + ' amb ' + llistaNoms([nomPropi(), ...altres]);
}
function textPla(p, pe) {
  const quan = etiquetaDia(p.data) === cap(dataLlarga(p.data)) ? etiquetaDia(p.data) : `${etiquetaDia(p.data)}, ${dataLlarga(p.data)}`;
  return [
    titolPer(p, pe),
    `📅 ${quan}${p.totElDia || !p.hora ? '' : ' · ' + horaText(p)}`,
    p.lloc ? `📍 ${p.lloc}` : '',
    p.llocUrl ? `🗺️ ${p.llocUrl}` : '',
    '',
    'Afegeix-ho al teu calendari:',
    enllacPla(p, true, pe),
  ].filter((x, i) => x !== '' || i === 4).join('\n');
}
function dadesCal(p, perAltres, pe) {
  return {
    u: p.rebut ? p.rebut.pla_id : p.id, v: p.versio || 1, t: perAltres ? titolPer(p, pe) : titolPla(p), e: tipDe(p).emoji, d: p.data,
    h: p.totElDia ? undefined : p.hora || undefined, f: p.totElDia ? undefined : p.horaFi || undefined,
    a: p.totElDia ? 1 : undefined, l: p.lloc || p.llocUrl || undefined,
    df: p.dataFi && p.dataFi > p.data ? p.dataFi : undefined, r: p.repeteix || undefined, ru: p.repeteix && p.repeteixFins ? p.repeteixFins : undefined,
    n: perAltres ? undefined : p.notes || undefined,
    o: perAltres ? nomPropi() : undefined,
  };
}
function enllacPla(p, perAltres, pe) {
  return new URL('afegir.html', location.href).href.split('#')[0] + '#' + Cal.codifica(dadesCal(p, perAltres, pe));
}
// «Al meu calendari»: s'escull el calendari aquí mateix, sense sortir de l'app
function obreAlCalendari(p) {
  const e = dadesCal(p, false);
  obreDlg(`<header class="dlg-cap"><h2>Al meu calendari</h2><button type="button" class="x" data-tanca aria-label="Tanca">×</button></header>
    <div class="dlg-cos">
      <p class="help">On vols afegir «${esc(titolPla(p))}»? Si és un pla amb hora, t'avisarà una hora abans.</p>
      <div class="accions-cal">
        ${Cal.urlIcs(e)
          ? `<a class="btn primary" href="${esc(Cal.urlIcs(e))}" target="_blank" rel="noopener">📱 Calendari de l'iPhone / Mac</a>`
          : '<button type="button" class="btn primary" id="cIcs">📱 Calendari de l\'iPhone / Mac</button>'}
        <a class="btn" href="${esc(Cal.google(e))}" target="_blank" rel="noopener">Google Calendar</a>
        <a class="btn" href="${esc(Cal.outlook(e))}" target="_blank" rel="noopener">Outlook</a>
      </div>
    </div>
    <footer class="dlg-peu"><button type="button" class="btn" id="torna">‹ Torna al pla</button></footer>`, 'form');
  dlgForm.onclick = (ev) => {
    const b = ev.target.closest('button');
    if (!b) return;
    if (b.id === 'cIcs') Cal.baixaIcs(e);
    if (b.id === 'torna') obreDetall(p);
  };
}
// Finestra «Comparteix»: a l'app d'altres persones (pel correu) o amb un enllaç (WhatsApp…)
function obreComparteix(p) {
  // Candidats: la gent del pla, i qualsevol a qui ja s'hagi enviat
  const files = [];
  (p.qui || []).map(pers).filter(Boolean).forEach((pe) => files.push({ pid: pe.id, nom: pe.nom, email: normal(pe.email) }));
  (p.compartit || []).forEach((em) => {
    if (files.some((f) => f.email === em)) return;
    const pe = state.persones.find((x) => normal(x.email) === em);
    files.push({ pid: pe?.id || '', nom: pe?.nom || em, email: em });
  });
  const fila = (f, i) => `<div class="dest">
      <label class="check"><input type="checkbox" data-i="${i}" ${f.email && (p.compartit || []).includes(f.email) ? 'checked' : ''}><b>${esc(f.nom)}</b></label>
      <input type="email" data-email="${i}" value="${esc(f.email)}" placeholder="Correu de ${esc(f.nom)}" autocomplete="off" inputmode="email">
    </div>`;
  const app = usuari()
    ? `<p class="help">Les persones que marquis veuran el pla a la seva app <b>Què · Qui · Quan</b> i et podran dir si hi van. Si encara no la tenen, els sortirà quan hi entrin amb aquest correu.</p>
       <div id="dests">${files.map(fila).join('') || '<p class="help">Afegeix el correu de qui vulguis:</p>'}</div>
       <div class="afegeix"><input type="email" id="altreCorreu" placeholder="Un altre correu" autocomplete="off" inputmode="email"><button type="button" class="btn" id="afegeixCorreu">Afegeix</button></div>
       <button type="button" class="btn primary ample" id="envia">Desa i envia</button>`
    : `<p class="help">Per enviar plans a l'app d'altres persones, primer has d'entrar amb el teu correu.</p>
       <button type="button" class="btn" data-entra>Entra amb el teu correu</button>`;
  obreDlg(`<header class="dlg-cap"><h2>Comparteix</h2><button type="button" class="x" data-tanca aria-label="Tanca">×</button></header>
    <div class="dlg-cos">
      <fieldset><legend>📲 A la seva app</legend>${app}</fieldset>
      <fieldset><legend>💬 Per WhatsApp, missatge o correu</legend>
        <p class="help">Envia un enllaç: qui el rebi el podrà afegir al seu calendari, encara que no tingui l'app.</p>
        <button type="button" class="btn ample" id="enllac">📤 Envia l'enllaç</button>
      </fieldset>
    </div>
    <footer class="dlg-peu"><button type="button" class="btn" id="torna">‹ Torna al pla</button></footer>`, 'form');

  const afegeix = () => {
    const inp = $('#altreCorreu');
    const em = inp.value.trim().toLowerCase();
    if (!emailValid(em)) { toast('Aquest correu no sembla correcte'); return; }
    const ja = files.findIndex((f) => f.email === em);
    if (ja >= 0) { $(`[data-i="${ja}"]`).checked = true; inp.value = ''; return; }
    const pe = state.persones.find((x) => normal(x.email) === em);
    files.push({ pid: pe?.id || '', nom: pe?.nom || em, email: em });
    const i = files.length - 1;
    $('#dests').querySelector('p.help')?.remove();
    $('#dests').insertAdjacentHTML('beforeend', fila(files[i], i));
    $(`[data-i="${i}"]`).checked = true;
    inp.value = '';
  };
  $('#altreCorreu')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); afegeix(); } });
  dlgForm.oninput = (e) => {
    // Si s'escriu un correu, la persona queda marcada
    const i = e.target.dataset.email;
    if (i !== undefined) $(`[data-i="${i}"]`).checked = emailValid(e.target.value);
  };
  dlgForm.onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.id === 'torna') obreDetall(p);
    if (b.id === 'enllac') enviaEnllac(p);
    if (b.dataset.entra !== undefined) { tancaDlg(); ui.view = 'entrada'; ui.entrada = { pas: 'correu', email: '' }; render(); }
    if (b.id === 'afegeixCorreu') afegeix();
    if (b.id === 'envia') {
      const triats = [];
      for (let i = 0; i < files.length; i++) {
        const em = String($(`[data-email="${i}"]`).value || '').trim().toLowerCase();
        const marcat = $(`[data-i="${i}"]`).checked;
        if (em && !emailValid(em)) { toast(`El correu de ${files[i].nom} no sembla correcte`); return; }
        // Es guarda el correu a la fitxa de la persona per a la propera vegada
        const pe = files[i].pid && pers(files[i].pid);
        if (pe && em && normal(pe.email) !== em) pe.email = em;
        if (marcat && em && em !== normal(usuari()?.email) && !triats.includes(em)) triats.push(em);
      }
      const abans = p.compartit || [];
      p.compartit = triats;
      save();
      const nous = triats.filter((em) => !abans.includes(em));
      const trets = abans.filter((em) => !triats.includes(em));
      toast(nous.length ? `Enviat a ${llistaNoms(nous.map(nomDeCorreu))} 📨` : trets.length ? 'Fet: ja no ho veuran' : 'Desat');
      render();
      obreDetall(p);
    }
  };
}
async function enviaEnllac(p) {
  const t = tipDe(p);
  const quan = etiquetaDia(p.data) === cap(dataLlarga(p.data)) ? etiquetaDia(p.data) : `${etiquetaDia(p.data)}, ${dataLlarga(p.data)}`;
  const text = textPla(p);
  if (navigator.share) {
    try { await navigator.share({ title: titolPla(p), text }); return; }
    catch (e) { if (e.name === 'AbortError') return; }
  }
  try { await navigator.clipboard.writeText(text); toast("Missatge copiat. Enganxa'l a WhatsApp, a un correu…"); }
  catch (e) { prompt('Copia aquest missatge:', text); }
}

/* ---------- Formulari: nou pla / editar ---------- */
function obreForm(p, base = {}) {
  const nou = !p;
  const d = p ? { ...p, qui: [...(p.qui || [])] } : { tipusId: '', titol: '', data: avui(), hora: '', horaFi: '', totElDia: false, lloc: '', notes: '', estat: 'confirmat', qui: [], ...base };
  const nousPers = [];   // persones creades aquí: només es guarden si es desa
  const totes = () => [...state.persones, ...nousPers];
  // Sense cercar: les persones triades i les més habituals. Cercant: les que coincideixen.
  const xips = () => {
    const q = normal(($('#quiNou')?.value || '').trim());
    const triades = totes().filter((pe) => d.qui.includes(pe.id));
    let altres;
    if (q) {
      altres = totes().filter((pe) => !d.qui.includes(pe.id) && normal([pe.nom, pe.tel, pe.email].join(' ')).includes(q))
        .sort((a, b) => (normal(b.nom).startsWith(q) - normal(a.nom).startsWith(q)) || a.nom.localeCompare(b.nom, 'ca')).slice(0, 30);
    } else {
      altres = totes().filter((pe) => !d.qui.includes(pe.id) && usos(pe.id) > 0)
        .sort((a, b) => (usos(b.id) - usos(a.id)) || a.nom.localeCompare(b.nom, 'ca')).slice(0, 8);
    }
    const boto = (pe) => `<button type="button" class="xip" data-qui="${esc(pe.id)}" aria-pressed="${d.qui.includes(pe.id)}">${esc(pe.nom)}</button>`;
    const exacte = q && totes().some((pe) => normal(pe.nom) === q);
    return (triades.map(boto).join('') + altres.map(boto).join(''))
      + (q && !exacte ? `<button type="button" class="xip xip-nou" id="quiAfegeix">+ Afegeix «${esc($('#quiNou').value.trim())}»</button>` : '')
      || `<span class="help">${totes().length ? 'Escriu per cercar entre els teus contactes.' : 'Encara no hi ha ningú: escriu un nom per afegir-lo.'}</span>`;
  };
  // Tipus agrupats (Àpats i trobades, Cultura i lleure…), amb el nom del grup a sobre
  // Persones de «Qui» amb correu: rebran el pla a la seva app quan es desi
  const ambCorreu = () => totes().filter((pe) => d.qui.includes(pe.id) && emailValid(pe.email));
  const pintaQui = () => {
    $('#quiXips').innerHTML = xips();
    const env = $('#quiEnvia'), ll = ambCorreu();
    if (!env) return;
    env.hidden = !usuari() || !ll.length;
    env.querySelector('span').textContent = `Envia-ho a la seva app: ${llistaNoms(ll.map((pe) => pe.nom))}`;
  };
  const xipTipus = (t) => `<button type="button" class="txip" data-tipus="${esc(t.id)}" aria-pressed="${d.tipusId === t.id}" style="--c:${esc(t.color)}">${ico(t)}<span class="txip-nom">${esc(nomCurt(t))}</span></button>`;
  const tipusXips = () => GRUPS.map(([g, nomG]) => {
    const ts = tipusOrdenats().filter((t) => grupDe(t) === g);
    return ts.length ? `<div class="tg-cap">${esc(nomG)}</div>` + ts.map(xipTipus).join('') : '';
  }).join('')
    + '<button type="button" class="txip nou-tipus" id="tNou"><span class="ms">add</span><span class="txip-nom">Nou tipus</span></button>';

  obreDlg(`<header class="dlg-cap"><h2>${nou ? 'Nou pla' : 'Edita el pla'}</h2><button type="button" class="x" data-tanca aria-label="Tanca">×</button></header>
    <div class="dlg-cos">
      <fieldset><legend><span class="w-que">Què</span></legend>
        <input name="titol" value="${esc(d.titol)}" placeholder="Què faràs? Escriu-ho com vulguis" autocomplete="off">
        <p class="help">I, si vols, tria'n el tipus (o crea'n un de nou):</p>
        <div class="tipus-grid" id="tipusGrid">${tipusXips()}</div>
        <div class="nou-tipus-fila" id="nouTipusFila" hidden>
          ${botoColor(COLORS_NOUS[state.tipus.length % COLORS_NOUS.length], 'id="ntColor"')}
          <input id="ntNom" placeholder="Nom del tipus (p. ex. Karaoke)" autocomplete="off" enterkeyhint="done">
          <button type="button" class="btn primary" id="ntCrea">Crea</button>
        </div>
        <button type="button" class="enllac" id="tGestiona">✏️ Canvia o esborra els tipus</button>
      </fieldset>
      <fieldset><legend><span class="w-qui">Qui</span></legend>
        <div class="afegeix"><input id="quiNou" type="search" placeholder="🔍 Cerca o afegeix una persona" autocomplete="off" enterkeyhint="done">${potContactes() ? '<button type="button" class="btn" id="quiContactes" aria-label="Tria dels contactes"><span class="ms">contacts</span></button>' : ''}</div>
        <div class="xips xips-col" id="quiXips"></div>
      </fieldset>
      <fieldset><legend><span class="w-quan">Quan</span></legend>
        <div class="fila">
          <label>Dia<input type="date" name="data" value="${esc(d.data)}" required></label>
          <label>Hora<input type="time" name="hora" value="${esc(d.hora || '')}" ${d.totElDia ? 'disabled' : ''}></label>
          <label>Fins a<input type="time" name="horaFi" value="${esc(d.horaFi || '')}" ${d.totElDia ? 'disabled' : ''}></label>
        </div>
        <div class="fila fila2">
          <label>Fins al dia <small>(si dura més d'un dia)</small><input type="date" name="dataFi" value="${esc(d.dataFi || '')}"></label>
          <label>Es repeteix<select name="repeteix">${REPETICIONS.map(([v, n]) => `<option value="${v}"${(d.repeteix || '') === v ? ' selected' : ''}>${n}</option>`).join('')}</select></label>
        </div>
        <label class="camp rep-fins" ${d.repeteix ? '' : 'hidden'}>Fins quan es repeteix <small>(opcional; si no hi poses res, sempre)</small>
          <input type="date" name="repeteixFins" value="${esc(d.repeteixFins || '')}"></label>
        <label class="check"><input type="checkbox" name="totElDia" ${d.totElDia ? 'checked' : ''}> Tot el dia</label>
      </fieldset>
      <fieldset><legend>On</legend>
        <div class="lloc-cerca">
          <input name="lloc" value="${esc(d.lloc || '')}" placeholder="Cerca un lloc o escriu-lo" autocomplete="off" enterkeyhint="done">
          <div class="sugg" id="llocSugg" hidden></div>
        </div>
        <input name="llocUrl" type="url" value="${esc(d.llocUrl || '')}" placeholder="🔗 Enllaç de la ubicació (Google Maps, Apple Maps…)" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="url">
        <div class="grp lloc-botons">
          <button type="button" class="btn" id="llocMaps">🔎 Cerca a Maps</button>
          <button type="button" class="btn" id="llocAra">📍 On soc ara</button>
        </div>
      </fieldset>
      <fieldset><legend>Estat</legend>
        <div class="seg">${ESTATS.map(([v, n]) => `<label><input type="radio" name="estat" value="${v}" ${d.estat === v ? 'checked' : ''}><span>${n}</span></label>`).join('')}</div>
      </fieldset>
      <fieldset><legend>Notes</legend>
        <textarea name="notes" rows="3" placeholder="Reserva, entrades, què portar…">${esc(d.notes || '')}</textarea>
      </fieldset>
    </div>
    <footer class="dlg-peu">
      ${nou ? '' : '<button type="button" class="btn perill" id="fEsborra">Esborra</button>'}
      <span class="flex"></span>
      <button type="button" class="btn" data-tanca>Cancel·la</button>
      <button class="btn primary">Desa</button>
    </footer>`, 'form');

  const afegeixPersona = () => {
    const inp = $('#quiNou');
    const nom = inp.value.trim();
    if (!nom) return;
    const ja = totes().find((x) => normal(x.nom) === normal(nom));
    if (ja) { if (!d.qui.includes(ja.id)) d.qui.push(ja.id); }
    else { const pe = { id: 'pe-' + uid(), nom }; nousPers.push(pe); d.qui.push(pe.id); }
    inp.value = '';
    pintaQui();
  };
  pintaQui();
  $('#quiNou').addEventListener('input', () => { pintaQui(); });
  $('#quiNou').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); afegeixPersona(); } });
  // Tipus nou creat des del mateix formulari (queda guardat per a la propera vegada)
  const creaTipus = () => {
    const nom = $('#ntNom').value.trim();
    if (!nom) { toast('Escriu el nom del tipus'); $('#ntNom').focus(); return; }
    const ja = state.tipus.find((t) => normal(t.nom) === normal(nom));
    const t = ja || { id: 't-' + uid(), nom, emoji: '', icona: 'auto_awesome', color: COLORS_NOUS[state.tipus.length % COLORS_NOUS.length], grup: 'altres', color: $('#ntColor').value || '#5C7CFA' };
    if (!ja) { state.tipus.push(t); save(); }
    d.tipusId = t.id;
    $('#tipusGrid').innerHTML = tipusXips();
    $('#nouTipusFila').hidden = true;
    $('#ntNom').value = '';
    toast(ja ? `«${t.nom}» ja existia: l'he triat` : `Tipus «${nom}» creat`);
  };
  $('#ntNom').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); creaTipus(); } });
  // Suggeriments d'adreces mentre s'escriu al camp «On»
  const llocInp = dlgForm.elements.lloc, sugg = $('#llocSugg');
  let tLloc = null;
  llocInp.addEventListener('input', () => {
    clearTimeout(tLloc);
    const q = llocInp.value.trim();
    if (esUrl(q)) { dlgForm.elements.llocUrl.value = q; llocInp.value = ''; sugg.hidden = true; toast("Enllaç de la ubicació afegit. Si vols, escriu el nom del lloc."); return; }
    if (q.length < 3) { sugg.hidden = true; return; }
    tLloc = setTimeout(() => cercaLlocs(q).then((ll) => {
      if (llocInp.value.trim() !== q) return;
      sugg.innerHTML = ll.map((x) => `<button type="button" data-lloc="${esc(x)}"><span class="ms">location_on</span><span>${esc(x)}</span></button>`).join('');
      sugg.hidden = !ll.length;
    }).catch(() => { sugg.hidden = true; }), 400);
  });
  llocInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); sugg.hidden = true; llocInp.blur(); } });

  dlgForm.onclick = (e) => {
    const ll = e.target.closest('[data-lloc]');
    if (ll) { llocInp.value = ll.dataset.lloc; sugg.hidden = true; return; }
    if (e.target.closest('#llocMaps')) {
      const q = llocInp.value.trim();
      window.open(q ? Cal.mapa(q) : 'https://www.google.com/maps', '_blank', 'noopener');
      toast("Quan el trobis, prem «Comparteix» → «Copia l'enllaç» i enganxa'l a «Enllaç de la ubicació»", 7000);
      return;
    }
    if (e.target.closest('#llocAra')) {
      if (!navigator.geolocation) { toast('Aquest dispositiu no pot saber on ets'); return; }
      toast('Buscant on ets…');
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude.toFixed(6), lon = pos.coords.longitude.toFixed(6);
        dlgForm.elements.llocUrl.value = `https://maps.google.com/?q=${lat},${lon}`;
        try {
          const r = await fetch(`https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`);
          const p = ((await r.json()).features || [])[0]?.properties || {};
          const carrer = [p.street, p.housenumber].filter(Boolean).join(', ');
          const nom = [p.name, carrer, p.city || p.town || p.village || p.locality].filter(Boolean).filter((x, i, a) => a.indexOf(x) === i).join(', ');
          if (nom && !llocInp.value.trim()) llocInp.value = nom;
        } catch (err) { /* sense adreça: ja hi ha l'enllaç */ }
        toast('Ubicació afegida 📍');
      }, () => toast("No s'ha pogut saber on ets. Cal donar permís d'ubicació a l'app."), { enableHighAccuracy: true, timeout: 15000 });
      return;
    }
    if (e.target.closest('#quiContactes')) {
      triaContactes().then((cs) => {
        incorporaContactes(cs, totes(), nousPers).forEach((pe) => { if (!d.qui.includes(pe.id)) d.qui.push(pe.id); });
        pintaQui();
      }).catch(() => {});
      return;
    }
    if (e.target.closest('#tNou')) { $('#nouTipusFila').hidden = false; $('#ntNom').focus(); return; }
    if (e.target.id === 'ntCrea') { creaTipus(); return; }
    if (e.target.id === 'tGestiona') {
      if (!confirm("Vols anar a Ajustos per canviar els tipus? Aquest pla encara no s'ha desat.")) return;
      tancaDlg(); ui.view = 'ajustos'; desaPref('view', ui.view); render();
      $('#seccioTipus')?.scrollIntoView({ block: 'start' });
      return;
    }
    const tx = e.target.closest('[data-tipus]');
    if (tx) {
      // Tornar a tocar el tipus triat el treu (el tipus és opcional)
      d.tipusId = d.tipusId === tx.dataset.tipus ? '' : tx.dataset.tipus;
      $$('#dlgForm [data-tipus]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.tipus === d.tipusId));
      return;
    }
    const q = e.target.closest('[data-qui]');
    if (q) {
      const id = q.dataset.qui;
      d.qui = d.qui.includes(id) ? d.qui.filter((x) => x !== id) : [...d.qui, id];
      if ($('#quiNou').value) $('#quiNou').value = '';
      pintaQui();
      return;
    }
    if (e.target.closest('#quiAfegeix')) { afegeixPersona(); return; }
    if (e.target.id === 'fEsborra') {
      if (!confirm(`Esborrar «${titolPla(p)}»?`)) return;
      state.plans = state.plans.filter((x) => x.id !== p.id);
      save(); tancaDlg(); render(); toast('Pla esborrat');
    }
  };
  const hi = dlgForm.elements.hora, hf = dlgForm.elements.horaFi;
  const mesUna = (h) => { const [a, b] = h.split(':').map(Number); return `${pad((a + 1) % 24)}:${pad(b)}`; };
  const posaHora = (el, valor) => { if (!el.value && !el.disabled) el.value = valor; };
  ['pointerdown', 'touchstart', 'focus'].forEach((ev) => {
    hi.addEventListener(ev, () => posaHora(hi, '09:00'), { passive: true });
    hf.addEventListener(ev, () => posaHora(hf, hi.value ? mesUna(hi.value) : '10:00'), { passive: true });
  });
  // «Fins al dia»: el calendari s'obre al primer dia del pla (no a avui), i no deixa triar dies d'abans
  const di = dlgForm.elements.data, df = dlgForm.elements.dataFi, rf = dlgForm.elements.repeteixFins;
  const limits = () => {
    [df, rf].forEach((el) => { if (el) el.min = di.value || ''; });
    if (df.value && di.value && df.value < di.value) df.value = '';
  };
  limits();
  di.addEventListener('change', limits);
  di.addEventListener('input', limits);
  ['pointerdown', 'touchstart', 'focus'].forEach((ev) => df.addEventListener(ev, () => { if (!df.value && di.value) df.value = di.value; }, { passive: true }));
  dlgForm.onchange = (e) => {
    if (e.target.name === 'repeteix') dlgForm.querySelector('.rep-fins').hidden = !e.target.value;
    if (e.target.name === 'totElDia') {
      dlgForm.elements.hora.disabled = e.target.checked;
      dlgForm.elements.horaFi.disabled = e.target.checked;
    }
  };
  dlgForm.onsubmit = (e) => {
    e.preventDefault();
    const f = dlgForm.elements;
    if (!d.tipusId && !f.titol.value.trim()) { toast('Escriu què faràs o tria un tipus'); f.titol.focus(); return; }
    if (!f.data.value) { toast('Falta el dia'); f.data.focus(); return; }
    if (f.dataFi.value && f.dataFi.value < f.data.value) { toast("«Fins al dia» ha de ser després del primer dia"); f.dataFi.focus(); return; }
    // Coincideix amb una altra activitat amb hora el mateix dia?
    if (!f.totElDia.checked && f.hora.value && !dlgForm.dataset.solapOk) {
      const min = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
      const ini = min(f.hora.value), fi = f.horaFi.value && min(f.horaFi.value) > ini ? min(f.horaFi.value) : ini + 60;
      const xoc = totsPlans(false).filter((x) => x.data === f.data.value && !(x.dataFi > x.data) && (x.base || x).id !== p?.id && !x.totElDia && x.hora && x.estat !== 'cancellat')
        .filter((x) => { const a = min(x.hora), b = x.horaFi && min(x.horaFi) > a ? min(x.horaFi) : a + 60; return a < fi && ini < b; });
      if (xoc.length) {
        const llista = xoc.map((x) => `• ${titolPla(x)} (${horaText(x)})`).join('\n');
        if (!confirm(`Aquest pla coincideix amb:\n${llista}\n\nVols desar-lo igualment?`)) return;
      }
    }
    const dades = {
      tipusId: d.tipusId, titol: f.titol.value.trim(), data: f.data.value,
      totElDia: f.totElDia.checked, hora: f.totElDia.checked ? '' : f.hora.value, horaFi: f.totElDia.checked ? '' : f.horaFi.value,
      dataFi: f.dataFi.value > f.data.value ? f.dataFi.value : '',
      repeteix: f.repeteix.value || '', repeteixFins: f.repeteix.value && f.repeteixFins.value >= f.data.value ? f.repeteixFins.value : '',
      lloc: f.lloc.value.trim(), llocUrl: esUrl(f.llocUrl.value) ? f.llocUrl.value.trim() : '', notes: f.notes.value.trim(), estat: f.estat.value || 'confirmat',
      qui: d.qui.filter((id) => totes().some((x) => x.id === id)),
    };
    nousPers.filter((pe) => dades.qui.includes(pe.id)).forEach((pe) => state.persones.push(pe));
    // Compartir: s'afegeixen els correus de la gent nova de «Qui» i es treuen els de qui ja no hi és
    const correuDe = (id) => normal(pers(id)?.email);
    const abansQui = nou ? [] : (p.qui || []);
    const trets = abansQui.filter((id) => !dades.qui.includes(id)).map(correuDe).filter(Boolean);
    let compartit = (nou ? [] : (p.compartit || [])).filter((em) => !trets.includes(em));
    dades.compartit = compartit;
    let desat;
    if (nou) { desat = { id: 'pl-' + uid(), ...dades, versio: 1, modificat: new Date().toISOString() }; state.plans.push(desat); }
    else { desat = Object.assign(p, dades, { versio: (p.versio || 1) + 1, modificat: new Date().toISOString() }); }
    save();
    ui.diaSel = desat.data;
    ui.cursor = new Date(parseYmd(desat.data).getFullYear(), parseYmd(desat.data).getMonth(), 1);
    render();
    obreDetall(desat);
    const perWa = dades.qui.map(pers).filter((pe) => pe && pe.tel);
    toast((nou ? 'Pla afegit' : 'Canvis desats')
      + (nou && perWa.length ? `. Per avisar ${perWa.length === 1 ? perWa[0].nom : 'els altres'} per WhatsApp, toca el seu nom aquí sota.` : ''), perWa.length ? 6000 : 3200);
  };
}

/* ---------- Còpia de seguretat ---------- */
function exporta() {
  const blob = new Blob([JSON.stringify({ app: 'que-qui-quan', versio: 1, data: new Date().toISOString(), ...state }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `que-qui-quan-copia-${avui()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
function importa(fitxer) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const d = JSON.parse(r.result);
      if (!d || !Array.isArray(d.plans)) throw new Error('format');
      if (!confirm(`Aquesta còpia té ${d.plans.length} plans. Vols substituir les dades actuals per les de la còpia?`)) return;
      state = normalize(d); save(); render(); toast('Còpia recuperada');
    } catch (e) { toast('Aquest fitxer no és una còpia de Què · Qui · Quan.'); }
  };
  r.readAsText(fitxer);
}

/* ---------- Arrencada ---------- */
if (PROVES) $('#provesTag').hidden = false;
// S'espera que estigui carregat sync.js. La primera vegada es demana d'entrar amb el correu.
addEventListener('DOMContentLoaded', () => {
  ui.view = 'inici';
  if (sync()?.disponible && !sync().potserEntrat() && !llegeixPref('senseCompte', false)) ui.view = 'entrada';
  render();
  actualitzaExterns();
  setInterval(() => { if (document.visibilityState === 'visible') actualitzaExterns(); }, 15 * 60 * 1000);
  document.addEventListener('visibilitychange', () => {
    const fa = Object.values(cauExt).map((c) => Date.now() - new Date(c.quan).getTime());
    if (document.visibilityState === 'visible' && (!fa.length || Math.min(...fa) > 5 * 60 * 1000)) actualitzaExterns();
  });
});
// Quan canvia el dia (app oberta tota la nit), es torna a pintar
let diaActual = avui();
setInterval(() => {
  if (avui() !== diaActual) { diaActual = avui(); render(); return; }
  if (ui.view === 'inici' && !document.querySelector('#dlg[open]') && document.visibilityState === 'visible') render();
}, 60000);
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});

// Tocar el logo de dalt torna a la portada
document.querySelector('.brand')?.addEventListener('click', () => { ui.view = 'inici'; ui.persona = ''; render(); window.scrollTo(0, 0); });
