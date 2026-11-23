'use strict';

/* ---------- Entorn: versió de proves o definitiva ---------- */
// La versió de proves (adreça amb «proves») guarda les dades a part, per no tocar mai les reals.
const PROVES = /proves/i.test(location.pathname);
const KEY = 'qqq-dades-v1' + (PROVES ? '-proves' : '');

/* ---------- Tipus de pla de sèrie (es poden canviar des d'Ajustos) ---------- */
// Identificadors fixos: així els dispositius nous no dupliquen els tipus en sincronitzar
const GRUPS = [
  ['principals', 'Principals'],
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
// Les 6 etiquetes principals: surten sempre al formulari, amb colors vius i ben diferents.
// La resta queden al desplegable «Més tipus». (Es poden canviar a Ajustos, amb la ★.)
const VERSIO_PRINCIPALS = 2;
const PRINCIPALS = [
  { id: 't-social', nom: 'Social', color: '#F76707', paraules: ['social', 'sopar', 'dinar', 'esmorzar', 'berenar', 'vermut', 'cafe', 'trobada', 'amics', 'festa', 'calcotada', 'barbacoa', 'copa', 'casament', 'bateig', 'comunio'] },
  { id: 't-personal', nom: 'Personal', color: '#1C7ED6', paraules: ['personal', 'perruqueria', 'compres', 'gestio', 'banc', 'gimnas', 'esport', 'entrenament', 'ioga', 'pilates'] },
  { id: 't-podcast', nom: 'Podcast', color: '#7048E8', paraules: ['podcast', 'gravacio', 'entrevista', 'episodi', 'programa'] },
  { id: 't-escapada', nom: 'Escapades', color: '#2B8A3E', paraules: ['escapada', 'escapades', 'viatge', 'vacances', 'cap de setmana', 'excursio', 'ruta'] },
  { id: 't-botifarra', nom: 'Botifarra', color: '#E03131', paraules: ['botifarra', 'partida', 'cartes', 'campionat', 'torneig'] },
  { id: 't-aniversari', nom: 'Aniversaris', color: '#D6336C', paraules: ['aniversari', 'aniversaris', 'celebracio', 'sant'] },
  { id: 't-oci', nom: 'Oci', color: '#E8A400', des: 2, paraules: ['oci', 'cinema', 'cine', 'pel licula', 'teatre', 'concert', 'museu', 'exposicio', 'festival', 'espectacle', 'musical', 'opera'] },
  { id: 't-reunio', nom: 'Reunió', color: '#495057', des: 2, paraules: ['reunio', 'assemblea', 'junta', 'comunitat', 'tutoria', 'escola', 'consell', 'comissio'] },
  { id: 't-salut', nom: 'Salut', color: '#0C8599', des: 2, paraules: ['salut', 'metge', 'metgessa', 'doctor', 'doctora', 'dentista', 'revisio', 'analitica', 'analisi', 'fisio', 'fisioterapeuta', 'hospital', 'cap', 'vacuna', 'oculista', 'ginecoleg', 'farmacia'] },
];
// Les principals són les del grup «Principals» (a Ajustos s'hi poden posar o treure, i ordenar amb ▲ ▼)
const principals = () => tipusOrdenats().filter((t) => grupDe(t) === 'principals');
// Endevina el tipus a partir del nom del pla: «Sopar a can Pere» → Social, «Botifarra al casal» → Botifarra
function endevinaTipus(titol) {
  const txt = ' ' + normal(titol).replace(/[^a-z0-9]+/g, ' ') + ' ';
  if (txt.trim().length < 3) return null;
  const te = (w) => { const n = normal(w).replace(/[^a-z0-9]+/g, ' ').trim(); return n.length > 2 && txt.includes(' ' + n); };
  for (const t of principals()) {
    const pr = PRINCIPALS.find((x) => x.id === t.id);
    if (te(nomCurt(t)) || (pr && pr.paraules.some(te))) return t;
  }
  return state.tipus.find((t) => grupDe(t) !== 'principals' && te(nomCurt(t))) || null;
}
const ambPrincipals = (llista, desDe = 0) => {
  const out = llista.map((t) => ({ ...t }));
  PRINCIPALS.forEach(({ paraules, des = 1, ...pr }, i) => {
    if (des <= desDe) return;   // ja hi era: no es toca (pot tenir colors o ordre canviats)
    const t = out.find((x) => x.id === pr.id);
    if (t) Object.assign(t, pr, { grup: 'principals', ordre: i - 100 });
    else out.push({ ...pr, emoji: '', grup: 'principals', ordre: i - 100 });
  });
  return out;
};
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
  return { tipus: ambPrincipals(TIPUS_INICIALS), persones: [], plans: [], recordatoris: [], llistes: [], compres: [], memoria: [], documents: [], notesveu: [], ajustos: { nom: '', categories: VERSIO_CATEGORIES, principals: VERSIO_PRINCIPALS } };
}
function normalize(d) {
  const arr = (x) => (Array.isArray(x) ? x : []);
  return {
    tipus: arr(d.tipus).length ? arr(d.tipus) : TIPUS_INICIALS.map((t) => ({ ...t })),
    persones: arr(d.persones),
    plans: arr(d.plans).map((p) => ({ qui: [], estat: 'confirmat', ...p })),
    recordatoris: arr(d.recordatoris).filter((r) => r && r.id),
    llistes: arr(d.llistes).filter((l) => l && l.id).map((l) => ({ nom: '', ...l, items: arr(l.items).filter((i) => i && i.id) })),
    compres: arr(d.compres).filter((r) => r && r.id),
    memoria: arr(d.memoria).filter((r) => r && r.id),
    documents: arr(d.documents).filter((r) => r && r.id && (r.cami || r.url)),
    notesveu: arr(d.notesveu).filter((r) => r && r.id),
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
actualitzaPrincipals();
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
// Una sola vegada: s'afegeixen les 6 etiquetes principals (l'Escapada i l'Aniversari que ja hi havia
// passen a «Escapades» i «Aniversaris», i els seus plans no canvien)
function actualitzaPrincipals() {
  if ((state.ajustos.principals || 0) >= VERSIO_PRINCIPALS) return;
  state.tipus = ambPrincipals(state.tipus, state.ajustos.principals || 0);
  state.ajustos.principals = VERSIO_PRINCIPALS;
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
const REPETICIONS = [['', 'No es repeteix'], ['setmana', 'Cada setmana'], ['2setmanes', 'Cada 2 setmanes'], ['mes', 'Cada mes'], ['any', 'Cada any']];
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
  if (freq === '2setmanes') return ymd(addDays(d, 14 * n));
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
// Si el compte és l'administrador de la llista de convidats (es mira en obrir Ajustos)
const admin = { es: false, mirat: '', llista: null };
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
const tipusAniv = () => state.tipus.find((t) => t.id === 't-aniversari') || state.tipus.find((t) => /^aniversaris?$/.test(normal(t.nom)));
const tipusRecord = () => state.tipus.find((t) => /^recordatoris?$/.test(normal(t.nom)));
// Sants dels contactes (dia/mes): surten cada any a «Recordatoris»
function sants(anys) {
  const out = [];
  const tr = tipusRecord();
  state.persones.forEach((pe) => {
    const a = llegeixAniv(pe.sant);
    if (!a || a.m < 1 || a.m > 12 || a.d < 1 || a.d > 31) return;
    anys.forEach((y) => {
      const ds = `${y}-${pad(a.m)}-${pad(Math.min(a.d, new Date(y, a.m, 0).getDate()))}`;
      out.push({
        id: 'sa|' + pe.id + '|' + y, aniversari: pe, sant: true, data: ds, totElDia: true, hora: '', horaFi: '', estat: 'confirmat',
        titol: `Sant de ${pe.nom}`, lloc: '', qui: [pe.id], _amb: [],
        _t: { nom: tr ? tr.nom : 'Recordatoris', color: tr ? tr.color : '#868E96' },
      });
    });
  });
  return out;
}
function aniversaris(anys) {
  const out = sants(anys);
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
// Títols d'altres calendaris: sense emoji al davant i sense parts repetides («Blanc & Negre · Blanc & Negre» → «Blanc & Negre»)
function netejaTitolExt(t) {
  const net = String(t || '').replace(/^[\p{Extended_Pictographic}️\s]+/u, '').trim();
  const parts = net.split(/\s+·\s+/).filter((x, i, a) => x && a.findIndex((y) => normal(y) === normal(x)) === i);
  return parts.join(' · ') || String(t || '');
}
function plansExterns() {
  const out = [];
  externs().forEach((c) => (cauExt[c.id]?.events || []).forEach((ev) => {
    if (ev.cancellat) return;
    out.push({
      id: 'ext|' + c.id + '|' + ev.uid, extern: c, data: ev.data, hora: ev.hora, horaFi: ev.horaFi, totElDia: ev.totElDia,
      titol: netejaTitolExt(ev.titol), lloc: ev.lloc, notes: ev.notes, estat: 'confirmat', qui: [], _amb: [],
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
// Recordatoris amb data: a l'agenda surten com un pla de l'etiqueta «Recordatoris» (en tocar-lo s'obre la seva fitxa)
const recsAmbData = () => {
  const tr = tipusRecord();
  return (state.recordatoris || []).filter((r) => !r.fet && /^\d{4}-\d{2}-\d{2}$/.test(r.data || '')).map((r) => ({
    id: 'rc|' + r.id, recordatori: r, data: r.data, hora: r.hora || '', horaFi: '', totElDia: !r.hora, estat: 'confirmat',
    titol: r.text, lloc: '', qui: [], _amb: [], _t: { nom: tr ? tr.nom : 'Recordatoris', color: tr ? tr.color : '#E8590C' },
  }));
};
const totsPlans = (ambAniv = true) => {
  const fins = finsRepeticions();
  return [...[...state.plans, ...rebuts().filter((p) => p.rebut.resposta === 'si')].flatMap((p) => instancies(p, fins)),
    ...plansExterns(), ...(ambAniv ? aniversaris(anysAniv()) : []), ...recsAmbData()];
};
const trobaPla = (id) => state.plans.find((p) => p.id === id) || rebuts().find((p) => p.id === id) || plansExterns().find((p) => p.id === id)
  || (/^(an|sa)\|/.test(id) ? aniversaris([Number(id.split('|')[2])]).find((p) => p.id === id) : null)
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
    tipusId: t.id, tipusNom: t.nom, emoji: t.emoji, icona: iconaDe(t), color: t.color, titol: p.titol || '', amb, data: p.data,
    hora: p.totElDia ? '' : p.hora || '', horaFi: p.totElDia ? '' : p.horaFi || '', totElDia: Boolean(p.totElDia),
    lloc: p.lloc || '', llocUrl: p.llocUrl || '', estat: p.estat || 'confirmat', versio: p.versio || 1,
    dataFi: p.dataFi || '', repeteix: p.repeteix || '', repeteixFins: p.repeteixFins || '',
  };
}
const nomDeCorreu = (em) => state.persones.find((x) => normal(x.email) === em)?.nom || em;
const RESPOSTES = { si: 'Hi va', no: 'No hi va', pendent: 'Sense resposta' };

function etiquetaDia(ds) {
  const a = avui();
  if (ds === a) return 'Avui';
  if (ds === ymd(addDays(new Date(), 1))) return 'Demà';
  if (ds === ymd(addDays(new Date(), -1))) return 'Ahir';
  const d = parseYmd(ds);
  return cap(dataLlarga(ds)) + (d.getFullYear() !== new Date().getFullYear() ? ` de ${d.getFullYear()}` : '');
}
// Text del dia (o dels dies) d'un pla: «Avui, dimarts 3 de març», «Divendres 19 de març → diumenge 21 de març de 2027»
// Persones que tenen l'app: els plans (d'avui endavant) on surten els arriben sols a la seva app
const teApp = (pe) => Boolean(pe && pe.teApp && emailValid(pe.email) && normal(pe.email) !== normal(usuari()?.email));
function enviaAApp(plans = state.plans) {
  if (!usuari()) return [];
  const enviats = [];
  plans.forEach((p) => {
    if (!p.data || diesPla(p) < avui()) return;
    const falten = (p.qui || []).map(pers).filter(teApp).map((pe) => normal(pe.email)).filter((em) => !(p.compartit || []).includes(em));
    if (falten.length) { p.compartit = [...(p.compartit || []), ...falten]; enviats.push(p); }
  });
  return enviats;
}
/* ---------- Calendari propi per triar dates (en català, igual a tots els dispositius) ---------- */
const textData = (ds) => { if (!ds) return ''; const d = parseYmd(ds); return `${d.getDate()} ${MESOS[d.getMonth()].slice(0, 3)}. ${d.getFullYear()}`; };
const campData = (nom, valor) => `<input type="hidden" name="${nom}" value="${esc(valor)}"><button type="button" class="data-btn${valor ? '' : ' buida'}" data-dp="${nom}">${valor ? esc(textData(valor)) : 'Tria…'}</button>`;
function pintaDates() {
  document.querySelectorAll('[data-dp]').forEach((b) => {
    const inp = b.form?.elements[b.dataset.dp] || document.querySelector(`input[name="${b.dataset.dp}"]`);
    if (!inp) return;
    b.textContent = inp.value ? textData(inp.value) : 'Tria…';
    b.classList.toggle('buida', !inp.value);
  });
}
function obreCalendariDates(inp) {
  const dlg = document.querySelector('dialog[open]') || document.body;
  dlg.querySelector('.dp-fons')?.remove();
  const obligatori = inp.name === 'data';
  const min = inp.min || '';
  const base = parseYmd(inp.value || (min && min > avui() ? min : '') || min || avui());
  let mes = new Date(base.getFullYear(), base.getMonth(), 1);
  const fons = document.createElement('div');
  fons.className = 'dp-fons';
  const pinta = () => {
    const ini = mondayOf(mes);
    let dies = '';
    for (let i = 0; i < 42; i++) {
      const d = addDays(ini, i);
      if (i >= 35 && d.getMonth() !== mes.getMonth()) break;
      const ds = ymd(d), fora = d.getMonth() !== mes.getMonth(), no = min && ds < min;
      dies += `<button type="button" class="dp-dia${fora ? ' fora' : ''}${ds === avui() ? ' avui' : ''}${ds === inp.value ? ' triat' : ''}" data-dpdia="${ds}" ${no ? 'disabled' : ''}>${d.getDate()}</button>`;
    }
    fons.innerHTML = `<div class="dp" role="dialog" aria-label="Tria el dia">
        <div class="dp-cap">
          <button type="button" class="dp-nav" data-dpmes="-1" aria-label="Mes anterior">‹</button>
          <b>${esc(cap(MESOS[mes.getMonth()]))} ${mes.getFullYear()}</b>
          <button type="button" class="dp-nav" data-dpmes="1" aria-label="Mes següent">›</button>
        </div>
        <div class="dp-graella">${DIES.map((x) => `<span>${x}</span>`).join('')}${dies}</div>
        <div class="dp-peu">
          ${obligatori ? '<span></span>' : '<button type="button" class="enllac" data-dpbuida>Esborra</button>'}
          <button type="button" class="enllac" data-dpavui>Avui</button>
        </div>
      </div>`;
  };
  const tria = (ds) => {
    inp.value = ds;
    inp.dispatchEvent(new Event('input', { bubbles: true }));
    inp.dispatchEvent(new Event('change', { bubbles: true }));
    pintaDates();
    fons.remove();
  };
  fons.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    const b = e.target.closest('button');
    if (!b) { if (e.target === fons) fons.remove(); return; }
    if (b.dataset.dpmes) { mes = new Date(mes.getFullYear(), mes.getMonth() + Number(b.dataset.dpmes), 1); pinta(); return; }
    if (b.dataset.dpdia) { tria(b.dataset.dpdia); return; }
    if (b.dataset.dpbuida !== undefined) { tria(''); return; }
    if (b.dataset.dpavui !== undefined) { const a = avui(); if (min && a < min) { mes = new Date(parseYmd(min).getFullYear(), parseYmd(min).getMonth(), 1); pinta(); } else tria(a); }
  });
  // Lliscar per canviar de mes
  let x0 = null;
  fons.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  fons.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) { mes = new Date(mes.getFullYear(), mes.getMonth() + (dx < 0 ? 1 : -1), 1); pinta(); }
  }, { passive: true });
  pinta();
  dlg.appendChild(fons);
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-dp]');
  if (!b) return;
  e.preventDefault();
  const inp = b.form?.elements[b.dataset.dp] || document.querySelector(`input[name="${b.dataset.dp}"]`);
  if (inp) obreCalendariDates(inp);
});
function textDies(ds, fi) {
  const any = (x) => (parseYmd(x).getFullYear() !== new Date().getFullYear() ? ` de ${parseYmd(x).getFullYear()}` : '');
  const e = etiquetaDia(ds);
  const inici = /^(Avui|Demà|Ahir)$/.test(e) ? `${e}, ${dataLlarga(ds)}` : e;
  if (!fi || fi <= ds) return inici;
  const ini = /^(Avui|Demà|Ahir)$/.test(e) ? inici : cap(dataLlarga(ds)) + (any(ds) !== any(fi) ? any(ds) : '');
  return `${ini} → ${dataLlarga(fi)}${any(fi)}`;
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
  '#A0522D', '#8D6E63', '#495057', '#868E96', '#1A1A1A',
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
const CAMPS_CONTACTE = ['email', 'tel', 'tel2', 'adreca', 'aniversari', 'sant', 'empresa', 'notes'];
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
    <p><b>Tots de cop:</b> a l'app <b>Contactos</b>, toca <b>‹ Listas</b>, mantén premut <b>Todos los contactos</b> → <b>Exportar</b> → <b>Guardar en Archivos</b>. Després, aquí, prem <b>Importa contactes</b> i tria el fitxer.</p>
    <p><b>D'un en un:</b> a l'app <b>Contactes</b>, obre un contacte → <b>Comparteix el contacte</b> → <b>Desa a Arxius</b>.
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
  const info = [ambData ? dataCurta(p.data) : '', horaText(p), p.lloc || ''].filter(Boolean);
  const gent = (p.titol || '').trim() && noms(p).length ? `<small class="pla-qui">${esc(llistaNoms(noms(p)))}</small>` : '';
  const de = p.rebut ? `<small class="pla-de">De part de ${esc(p.rebut.de_nom || p.rebut.de_email)}</small>` : '';
  const env = '';
  const estat = p.estat !== 'confirmat' ? `<span class="badge ${p.estat}">${esc((ESTATS.find((e) => e[0] === p.estat) || [, p.estat])[1])}</span>` : '';
  const boto = `<button class="pla ${esc(p.estat)}${diesPla(p) < avui() ? ' passat' : ''}${p.rebut ? ' rebut' : ''}" data-pla="${esc(p.id)}" style="--c:${esc(t.color)}">
    <span class="pla-emoji">${ico(t)}</span>
    <span class="pla-cos"><b>${esc(titolPla(p))}</b><small>${esc(info.join(' · '))}</small>${gent}${de}</span>
    ${env}${estat}
  </button>`;
  // Els plans propis es poden lliscar cap a l'esquerra: Confirma (si està per confirmar) i Esborra
  if (p.rebut || p.aniversari || p.extern || p.recordatori) return boto;
  const base = p.base || p;
  return `<div class="pla-mur" data-mur="${esc(p.id)}">
    <div class="pla-accions">${base.estat === 'pendent' ? `<button type="button" class="acc-confirma" data-acc="confirma" data-accpla="${esc(p.id)}">Confirma</button>` : ''}<button type="button" class="acc-esborra" data-acc="esborra" data-accpla="${esc(p.id)}">Esborra</button></div>
    ${boto}
  </div>`;
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
  const invHtml = inv.length ? `<section class="invitacions"><h3>T'han enviat ${inv.length === 1 ? 'un pla' : inv.length + ' plans'}</h3>
      ${inv.map((p) => `<div class="invitacio">${targeta(p, true)}
        <div class="grp"><button class="btn primary" data-respon="si" data-r="${esc(p.id)}">Hi vaig</button><button class="btn" data-respon="no" data-r="${esc(p.id)}">No hi vaig</button></div>
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
/* ---------- Festius de Catalunya i de Girona (es pinten en vermell al calendari) ---------- */
// Calendaris oficials de la Generalitat (Ordre EMT/66/2025 per al 2026 i EMT/52/2026 per al 2027)
const FESTIUS_OFICIALS = {
  2026: { '01-01': "Cap d'Any", '01-06': 'Reis', '04-03': 'Divendres Sant', '04-06': 'Dilluns de Pasqua', '05-01': 'Festa del Treball',
    '06-24': 'Sant Joan', '08-15': "L'Assumpció", '09-11': 'Diada Nacional', '10-12': 'Festa Nacional d\'Espanya', '12-08': 'La Immaculada',
    '12-25': 'Nadal', '12-26': 'Sant Esteve' },
  2027: { '01-01': "Cap d'Any", '01-06': 'Reis', '03-26': 'Divendres Sant', '03-29': 'Dilluns de Pasqua', '05-01': 'Festa del Treball',
    '06-24': 'Sant Joan', '09-11': 'Diada Nacional', '10-12': 'Festa Nacional d\'Espanya', '11-01': 'Tots Sants', '12-06': 'La Constitució',
    '12-08': 'La Immaculada', '12-25': 'Nadal' },
};
// Festius locals de Girona
const FESTIUS_GIRONA = { '07-25': 'Sant Jaume (Girona)', '10-29': 'Sant Narcís (Girona)' };
// Diumenge de Pasqua (càlcul de Gauss/Butcher)
function pasqua(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  return new Date(y, Math.floor((h + l - 7 * m + 114) / 31) - 1, ((h + l - 7 * m + 114) % 31) + 1);
}
const _festius = new Map();
function festiusAny(y) {
  if (_festius.has(y)) return _festius.get(y);
  let f = FESTIUS_OFICIALS[y];
  if (!f) {   // anys sense calendari oficial: els festius habituals de Catalunya
    const p = pasqua(y), md = (d) => ymd(d).slice(5);
    f = { '01-01': "Cap d'Any", '01-06': 'Reis', [md(addDays(p, -2))]: 'Divendres Sant', [md(addDays(p, 1))]: 'Dilluns de Pasqua',
      '05-01': 'Festa del Treball', '06-24': 'Sant Joan', '08-15': "L'Assumpció", '09-11': 'Diada Nacional', '10-12': "Festa Nacional d'Espanya",
      '11-01': 'Tots Sants', '12-06': 'La Constitució', '12-08': 'La Immaculada', '12-25': 'Nadal', '12-26': 'Sant Esteve' };
  }
  const tot = { ...f, ...FESTIUS_GIRONA };
  _festius.set(y, tot);
  return tot;
}
const festiu = (ds) => festiusAny(Number(ds.slice(0, 4)))[ds.slice(5)] || '';
// Diumenges i festius: casella en vermell
const esFestiu = (ds) => Boolean(festiu(ds)) || parseYmd(ds).getDay() === 0;

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
        <button class="btn llista-btn" data-llista="dia">Llista del dia</button>
      </section>`;
  } else if (mode === 'setmana') {
    const dl = mondayOf(sel), dg = addDays(dl, 6);
    titol = dl.getMonth() === dg.getMonth()
      ? apostrof(`${dl.getDate()} – ${dg.getDate()} de ${MESOS[dg.getMonth()]}`)
      : `${dl.getDate()} ${MESOS[dl.getMonth()].slice(0, 3)}. – ${dg.getDate()} ${MESOS[dg.getMonth()].slice(0, 3)}.`;
    cos = '<div class="vista-setmana">' + Array.from({ length: 7 }, (_, i) => {
      const d = addDays(dl, i), ds = ymd(d), plans = delDia(ds);
      return `<section class="setm-dia${esFestiu(ds) ? ' festiu' : ''}${ds === avui() ? ' avui' : ''}">
          <button class="setm-cap" data-anadia="${ds}" aria-label="Veure el dia"><b>${DIES[i]}</b><span>${d.getDate()}</span></button>
          <div class="setm-plans">${plans.map((p) => targeta(p)).join('') || `<button class="setm-buit" data-nou="${ds}">+ Afegeix</button>`}</div>
        </section>`;
    }).join('') + '</div><button class="btn llista-btn" data-llista="setmana">Llista de la setmana</button>';
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
        dies += `<button class="any-dia${plans.length ? ' te' : ''}${esFestiu(ds) ? ' festiu' : ''}${ds === avui() ? ' avui' : ''}" data-anadia="${ds}" ${c ? `style="--c:${esc(c)}"` : ''}>${d.getDate()}</button>`;
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
      cel += `<button class="cel${fora ? ' fora' : ''}${esFestiu(ds) ? ' festiu' : ''}${ds === avui() ? ' avui' : ''}${ds === ui.diaSel ? ' sel' : ''}" data-dia="${ds}">
        <span class="num">${d.getDate()}</span><span class="marques">${marques}</span></button>`;
    }
    const delSel = delDia(ui.diaSel);
    cos = `<div class="cal-grid">${DIES.map((d) => `<span class="cal-dia">${d}</span>`).join('')}${cel}</div>
      <section class="dia-sel">
        <h3>${esc(etiquetaDia(ui.diaSel))}${festiu(ui.diaSel) ? ` <span class="festiu-nom">${esc(festiu(ui.diaSel))}</span>` : ''}</h3>
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
    // Dia, mes i (si cal) any, cadascun a la seva casella
    const campDiaMes = (k, etiqueta, ambAny) => {
      const a = llegeixAniv(pe[k]) || {};
      const c = (part, ph, max, val) => `<input class="dm-${part}" data-dm="${k}" data-part="${part}" inputmode="numeric" pattern="[0-9]*" maxlength="${max}" placeholder="${ph}" value="${val ? esc(part === 'a' ? String(val) : pad(val)) : ''}" autocomplete="off" aria-label="${etiqueta}: ${ph}">`;
      return `<div class="camp"><span>${etiqueta}</span><div class="dm">${c('d', 'Dia', 2, a.d)}<span>/</span>${c('m', 'Mes', 2, a.m)}${ambAny ? `<span>/</span>${c('a', 'Any', 4, a.y)}` : ''}
        ${pe[k] ? `<button type="button" class="enllac dm-treu" data-dmtreu="${k}">Treu</button>` : ''}</div></div>`;
    };
    const camp = (k, etiqueta, attrs = '') => `<label class="camp">${etiqueta}<input data-pcamp="${k}" value="${esc(pe[k] || '')}" autocomplete="off" ${attrs}></label>`;
    const accions = [
      pe.tel ? `<a class="btn" href="tel:${esc(telNet(pe.tel))}">Truca</a>` : '',
      pe.tel ? `<a class="btn" href="${esc(wa(pe.tel))}" target="_blank" rel="noopener">WhatsApp</a>` : '',
      pe.email ? `<a class="btn" href="mailto:${esc(pe.email)}">Correu</a>` : '',
      pe.adreca ? `<a class="btn" href="${esc(Cal.mapa(pe.adreca))}" target="_blank" rel="noopener">Mapa</a>` : '',
    ].filter(Boolean).join('');
    return `<div class="cal-cap"><button class="btn" data-persona="">${ui.tornaA === 'aniversaris' ? '‹ Aniversaris' : '‹ Contactes'}</button><h2 id="fitxaNom">${esc(pe.nom)}</h2></div>
      ${accions ? `<div class="grp fitxa-accions">${accions}</div>` : ''}
      <div class="section fitxa">
        ${camp('nom', 'Nom')}
        ${camp('tel', 'Mòbil', 'type="tel" inputmode="tel"')}
        ${camp('tel2', 'Un altre telèfon', 'type="tel" inputmode="tel"')}
        <label class="camp">Correu
          <input data-pcamp="email" type="email" value="${esc(pe.email || '')}" placeholder="nom@exemple.com" autocomplete="off" inputmode="email"></label>
        <label class="check te-app"><input type="checkbox" data-papp ${pe.teApp ? 'checked' : ''}> <span>Té l'app <b>Galàxia</b>: els plans on surti li arribaran sols a la seva app <small>(amb aquest mateix correu)</small></span></label>
        ${camp('adreca', 'Adreça')}
        ${campDiaMes('aniversari', 'Aniversari', true)}
        ${campDiaMes('sant', 'Sant', false)}
        <p class="help">Surten sols al calendari cada any: l'aniversari a «Aniversaris» i el sant a «Recordatoris».</p>
        ${camp('empresa', 'Feina / empresa')}
        <label class="camp">Notes<textarea data-pcamp="notes" rows="3" placeholder="Al·lèrgies, gustos, el nom dels fills…">${esc(pe.notes || '')}</textarea></label>
        <p class="help">Els canvis es desen sols.</p>
        <button class="btn" id="pEnvia">Envia una còpia del contacte</button>
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
  return `${llista.length > 3 ? `<div class="cerca-caixa"><input type="search" id="cercaGent" class="cerca-gent" placeholder="Cerca un contacte" value="${esc(ui.cercaGent)}" autocomplete="off"><button type="button" class="cerca-x" id="cercaGentX" aria-label="Esborra la cerca" ${ui.cercaGent ? '' : 'hidden'}>×</button></div>` : ''}
    <form class="barra" id="formPersona">
      <input name="nom" placeholder="Nom d'una persona" autocomplete="off">
      <button class="btn primary">Afegeix</button>
    </form>
    <div class="grp">
      ${potContactes() ? '<button class="btn" id="gContactes">Tria dels contactes</button>' : ''}
      <label class="btn">Importa contactes<input type="file" id="gVcf" accept=".vcf,text/vcard,text/x-vcard" multiple hidden></label>
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
  if (usuari() && admin.mirat !== usuari().id) setTimeout(() => carregaAdmin(), 0);
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
    <div class="section" id="seccioTema">
      <h2>Aspecte</h2>
      <p class="help"><b>Automàtic</b> fa el mateix que l'iPhone: clar de dia i fosc quan l'iPhone és en mode fosc.</p>
      <div class="seg tema-seg">${[['clar', 'Clar'], ['fosc', 'Fosc'], ['auto', 'Automàtic']].map(([k, n]) => `<button aria-pressed="${(state.ajustos.tema || 'auto') === k}" data-tema="${k}">${n}</button>`).join('')}</div>
    </div>
    <div class="section" id="seccioIcona">
      <h2>Icona</h2>
      <p class="help">Tria la que es vegi millor amb el fons de pantalla del teu mòbil. Fes córrer la tira amb el dit per veure-les totes.</p>
      <div class="icones-tria">${[['fosca', 'Negre', 'img/icona.svg'], ['perla', 'Gris perla', 'img/icona-perla.svg'], ['groc', 'Groc pàl·lid', 'img/icona-groc.svg'], ['blanc', 'Blanc', 'img/icona-blanc.svg'], ['posta', 'Posta de sol', 'img/icona-posta.svg'], ['blau', 'Blau intens', 'img/icona-blau.svg'], ['vores', 'Negre amb vores', 'img/icona-vores.svg']].map(([k, n, src]) => `<button class="icona-opcio" aria-pressed="${(llegeixPref('icona', 'fosca')) === k}" data-icona="${k}"><img src="${src}" alt=""><span>${n}</span></button>`).join('')}</div>
      <details class="ajuda"><summary>Com es canvia la icona del mòbil</summary>
        <ol class="passos-veu">
          <li>Tria la icona aquí a sobre i prem <b>Copia l'enllaç</b>.</li>
          <li>Obre <b>Safari</b>, enganxa l'enllaç a la barra d'adreces i obre'l.</li>
          <li>Toca <b>Compartir</b> → <b>Afegir a la pantalla d'inici</b>. Ja sortirà amb la icona nova.</li>
          <li>Obre l'app nova i entra amb el teu correu i el codi.</li>
          <li>Esborra la icona antiga (mantén-la premuda → <b>Eliminar l'app</b>).</li>
        </ol>
        <div class="grp"><button class="btn primary" id="iconaCopia">Copia l'enllaç</button></div>
      </details>
    </div>
    <div class="section" id="seccioMode">
      <h2>Com vols l'app</h2>
      <p class="help"><b>Galàxia</b>: el cercle amb l'agenda al mig i les micro-apps al voltant (recordatoris, compres, documents…). <b>Agenda</b>: només l'agenda, més senzilla. Ho pots canviar quan vulguis; no es perd res.</p>
      <div class="seg mode-seg"><button aria-pressed="${!modeAgenda()}" data-mode="galaxia">Galàxia</button><button aria-pressed="${modeAgenda()}" data-mode="agenda">Agenda</button></div>
    </div>
    ${usuari() && admin.es ? `<div class="section" id="seccioConvidats">
      <h2>Qui pot fer servir l'app</h2>
      <p class="help">Només les persones d'aquesta llista es poden crear un compte. Encara que l'enllaç corri, qui no hi sigui no podrà entrar.
        Afegeix el correu de la persona i després envia-li l'enllaç <b>quequiquan.github.io</b>.</p>
      <form class="barra" id="formConvida">
        <input name="email" type="email" inputmode="email" placeholder="Correu de la persona" autocomplete="off" required>
        <input name="nom" placeholder="Nom (opcional)" autocomplete="off">
        <select name="mode" aria-label="Mode"><option value="galaxia">Galàxia</option><option value="agenda">Agenda</option></select>
        <button class="btn primary">Convida</button>
      </form>
      ${admin.llista ? `<ul class="convidats">${admin.llista.map((c) => `<li><span><b>${esc(c.nom || c.email.split('@')[0])}</b><small>${esc(c.email)}</small></span>
        <select class="mode-convidat" data-modeconv="${esc(c.email)}" aria-label="Mode de ${esc(c.nom || c.email)}"><option value="galaxia"${c.mode !== 'agenda' ? ' selected' : ''}>Galàxia</option><option value="agenda"${c.mode === 'agenda' ? ' selected' : ''}>Agenda</option></select>
        ${normal(c.email) === normal(usuari().email) ? '<small>Tu</small>' : `<button class="enllac" data-desconvida="${esc(c.email)}">Treu</button>`}</li>`).join('')}</ul>
        <p class="help">El mode (Galàxia o Agenda) és com comença l'app cada persona la primera vegada; després el pot canviar als seus Ajustos.</p>
        <p class="help">${admin.llista.length} persones a la llista. Treure algú evita que es pugui crear un compte; si ja en tenia un, el conserva.</p>`
        : '<p class="help">Carregant la llista…</p>'}
    </div>` : ''}
    ${sync()?.disponible ? `<div class="section" id="seccioCal">
      <h2>Calendari de l'iPhone</h2>
      <p class="help">Un calendari per a cada etiqueta, perquè a l'iPhone cadascun tingui <b>el seu color</b>. Toca-les <b>una a una</b>
        i, a cada una, «Subscriure't»; després, a l'iPhone, tria-li el color. Els <b>aniversaris</b> dels contactes van a «Aniversaris».
        S'actualitzen sols, sense preguntar res.</p>
      ${usuari()
        ? `<div class="cal-etqs">
            ${principals().map((t) => `<button class="cal-etq" data-calg="${esc(t.id)}" style="--c:${esc(t.color)}"><i class="punt"></i>${esc(t.nom.split(' / ')[0])}</button>`).join('')}
            <button class="cal-etq" data-calg="resta" style="--c:#868E96"><i class="punt"></i>Altres</button>
          </div>
          <p class="help">Si abans t'havies subscrit a l'agenda sencera, esborra-la de l'iPhone (Calendari → Calendaris → ⓘ → Eliminar el calendari), o els plans sortiran dues vegades.</p>
          <div class="grp">
            <button class="btn" id="calCopia">Copia l'enllaç de l'agenda sencera (Google, Outlook…)</button>
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
    ${sync()?.disponible ? `<div class="section" id="seccioVeu">
      <h2>Dreceres de l'iPhone</h2>
      <p class="help">Dues dreceres per guardar coses a Galàxia sense obrir l'app. Es preparen un sol cop a l'app <b>Atajos</b> de l'iPhone. Cada persona ha de fer servir <b>el seu enllaç</b> (el d'aquests botons): així tot va a la seva Galàxia.</p>
      ${usuari()
        ? `<div class="grp"><button class="btn primary" id="veuDesa">Copia l'enllaç per a «Desa a Galàxia»</button><button class="btn primary" id="veuNota">Copia l'enllaç per a «Nota de veu»</button><button class="btn primary" id="veuDoc">Copia l'enllaç per a «Desa document»</button></div>
          <details class="ajuda"><summary>1. «Desa a Galàxia» (menú Compartir)</summary>
            <p>Des de Notes, Safari, Instagram, Google, Maps… toques <b>Compartir → Desa a Galàxia</b> i es crea una fitxa a <b>Memòria → Per classificar</b>. Si ja la tens, t'avisa i no la repeteix.</p>
            <ol class="passos-veu">
              <li>Aquí, prem <b>Copia l'enllaç per a «Desa a Galàxia»</b>.</li>
              <li>Obre <b>Atajos</b>, pestanya <b>Atajos</b>, i toca <b>+</b>. A dalt, toca el nom i posa-li <b>Desa a Galàxia</b>.</li>
              <li>Toca el nom de nou → <b>Detalles</b> (o la ⓘ) → activa <b>Mostrar en el panel de compartir</b>. Torna enrere.</li>
              <li>A la primera caixa, <b>Recibir … de Panel de compartir</b>: deixa marcats tots els tipus. A <b>Si no hay datos de entrada</b>, tria <b>Obtener portapapeles</b>.</li>
              <li>Afegeix l'acció <b>Texto</b>. Toca dins de la caixa i tria la variable <b>Entrada de atajo</b>.</li>
              <li>Afegeix l'acció <b>Obtener contenido de URL</b>. Toca <b>URL</b> i enganxa-hi l'enllaç (acaba en <b>&amp;desa=1</b>). Toca la fletxa <b>›</b>: Método <b>POST</b>, Cuerpo de la solicitud <b>Formulario</b>, <b>Añadir nuevo campo → Texto</b>, clau <b>text</b> i valor la variable <b>Texto</b>. Després, <b>Añadir nuevo campo → Archivo</b>, clau <b>fitxer</b> i valor la variable <b>Entrada de atajo</b> (així també desa les imatges).</li>
              <li>Afegeix l'acció <b>Mostrar notificación</b> amb la variable <b>Contenido de URL</b>. Toca <b>OK</b>.</li>
              <li>Prova-ho: a Notes, selecciona un text → <b>Compartir → Desa a Galàxia</b>. Ha de sortir «Desat a Galàxia: …».</li>
              <li>Perquè surti la primera del menú Compartir: al final del menú, <b>Editar acciones…</b> → <b>+</b> a «Desa a Galàxia» i arrossega-la a dalt de <b>Favoritos</b>.</li>
            </ol>
          </details>
          <details class="ajuda"><summary>2. «Nota de veu» (dictar sense obrir l'app)</summary>
            <p>Toques la icona (o fas dos tocs al darrere del mòbil), parles en català i la nota arriba a la micro-app <b>Veu</b>.</p>
            <ol class="passos-veu">
              <li>Aquí, prem <b>Copia l'enllaç per a «Nota de veu»</b>.</li>
              <li>A <b>Atajos</b>, toca <b>+</b> i posa-li de nom <b>Nota de veu</b>.</li>
              <li>Afegeix l'acció <b>Dictar texto</b>. A <b>Idioma</b>, tria <b>Catalán</b>; a <b>Dejar de escuchar</b>, <b>Tras pausa</b>.</li>
              <li>Afegeix l'acció <b>Obtener contenido de URL</b>. Si l'iPhone hi posa sol «Texto dictado» com a adreça, esborra-ho. Toca <b>URL</b> i enganxa-hi l'enllaç: ha d'acabar exactament en <b>&amp;nota=1</b> (amb el signe =).</li>
              <li>Toca la fletxa <b>›</b>: Método <b>POST</b>, Cuerpo de la solicitud <b>Formulario</b>, <b>Añadir nuevo campo → Texto</b>, clau <b>text</b> i valor la variable <b>Texto dictado</b>.</li>
              <li>Afegeix l'acció <b>Mostrar notificación</b> amb <b>Contenido de URL</b>. Toca <b>OK</b>.</li>
              <li>Prova-ho amb ▶: parla i calla. Ha de sortir <b>«Apuntat»</b> (si surt «Apuntat per confirmar…», a l'enllaç li falta «&amp;nota=1»).</li>
              <li>Per tenir-la a un toc: mantén-la premuda → <b>Compartir → Añadir a pantalla de inicio</b>. O bé a <b>Ajustes → Accesibilidad → Tocar → Tocar atrás → Doble toque → Nota de veu</b>.</li>
            </ol>
          </details>
          <details class="ajuda"><summary>3. «Desa document a Galàxia» (fitxers: PDF, fotos…)</summary>
            <p>Des d'<b>Arxius</b>, <b>Fotos</b>, <b>Mail</b>… toques <b>Compartir → Desa document a Galàxia</b> i el fitxer es desa a <b>Documents → General</b>. Si ja el tens, t'avisa i no el repeteix.</p>
            <ol class="passos-veu">
              <li>Aquí, prem <b>Copia l'enllaç per a «Desa document»</b>.</li>
              <li>A <b>Atajos</b>, toca <b>+</b> i posa-li de nom <b>Desa document a Galàxia</b>. A <b>Detalles</b>, activa <b>Mostrar en el panel de compartir</b>.</li>
              <li>A la primera caixa, <b>Recibir</b>: deixa només <b>Archivos</b>, <b>PDF</b> i <b>Imágenes</b>.</li>
              <li>Afegeix l'acció <b>Obtener contenido de URL</b>. Enganxa-hi l'enllaç (acaba en <b>&amp;doc=1</b>). Toca la fletxa <b>›</b>: Método <b>POST</b> i Cuerpo de la solicitud <b>Archivo</b>; a <b>Archivo</b>, tria la variable <b>Entrada de atajo</b>.</li>
              <li>Afegeix <b>Mostrar notificación</b> amb <b>Contenido de URL</b>. <b>OK</b>.</li>
              <li>Prova-ho: a <b>Arxius</b>, mantén premut un PDF → <b>Compartir → Desa document a Galàxia</b>. Ha de sortir «Desat a Galàxia: …».</li>
            </ol>
          </details>
          <details class="ajuda"><summary>Plans per veu amb Siri (opcional)</summary>
            <p>Per apuntar un pla a l'Agenda dient <b>«Ei Siri, nou pla»</b> (Siri només entén el castellà; l'app ho tradueix). Es desa com a <b>Per confirmar</b>.</p>
            <ol class="passos-veu">
              <li><button class="enllac" id="veuCopia">Copia l'enllaç per a plans</button>.</li>
              <li>Fes una drecera igual que «Nota de veu», però amb aquest enllaç (sense «&amp;nota=1») i de nom <b>Nou pla</b>.</li>
            </ol>
          </details>
          <p class="help">Els enllaços són privats: qui els tingui pot afegir coses a la teva Galàxia. Si n'has compartit un sense voler,
            <button class="enllac" id="veuNou">fes-ne un de nou</button> i torna'l a posar a les dreceres.</p>`
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
      <h2>Etiquetes</h2>
      <p class="help">Les del grup <b>Principals</b> surten sempre al formulari (millor que no en siguin més de 6); la resta, al desplegable «Més tipus». Per fer-ne una de principal, canvia-li el grup. Toca el cercle per canviar el color, i amb ▲ ▼ les ordenes. Els canvis es desen sols.</p>
      ${files}
      <form class="barra" id="formTipus">
        ${botoColor(COLORS_NOUS[state.tipus.length % COLORS_NOUS.length], 'name="color"')}
        <input name="nom" placeholder="Nou tipus (p. ex. Karaoke)" autocomplete="off">
        <select name="grup" aria-label="Grup">${GRUPS.map(([g, n]) => `<option value="${g}"${g === 'altres' ? ' selected' : ''}>${esc(n)}</option>`).join('')}</select>
        <button class="btn primary">Afegeix</button>
      </form>
    </div>
    <div class="section">
      <h2>Afegeix plans d'un fitxer</h2>
      <p class="help">Per carregar molts plans de cop (per exemple, el calendari de la lliga). S'<b>afegeixen</b> als que ja tens, sense esborrar res; si el tornes a carregar, no es dupliquen.</p>
      <label class="btn">Tria el fitxer<input type="file" id="fitxerPlans" accept=".json,application/json" hidden></label>
    </div>
    <div class="section">
      <h2>Còpia de seguretat</h2>
      <p class="help">Desa en un fitxer <b>tot</b> el que tens a Galàxia: agenda, contactes, recordatoris, llistes, compres, Memòria, notes de veu, la llista de documents i els ajustos. Desa'l a <b>Arxius → iCloud Drive</b> o envia-te'l per correu. Les fotos, els àudios i els fitxers de Documents es queden al teu núvol privat i no van dins de la còpia.</p>
      ${(() => { const u = llegeixPref('ultimaCopia', ''); if (!u) return '<p class="help"><b>Encara no has fet cap còpia en aquest aparell.</b></p>'; const dies = Math.round((Date.now() - new Date(u).getTime()) / 86400000); return `<p class="help">Última còpia en aquest aparell: <b>${dies <= 0 ? 'avui' : dies === 1 ? 'ahir' : 'fa ' + dies + ' dies'}</b>.${dies > 30 ? ' Ja tocaria fer-ne una de nova.' : ''}</p>`; })()}
      <div class="grp">
        <button class="btn" id="btnExporta">Desa una còpia</button>
        <label class="btn">Recupera una còpia<input type="file" id="fitxerImporta" accept=".json,application/json" hidden></label>
      </div>
    </div>
    <div class="section">
      <h2>Guia d'ús</h2>
      <p class="help">Manual visual amb totes les funcions de l'app, pas a pas. També el pots enviar a qui comenci a fer-la servir: quequiquan.github.io/guia.html</p>
      <a class="btn" href="guia.html" target="_blank" rel="noopener">Obre la guia</a>
    </div>
    <p class="versio">Galàxia${PROVES ? ' · versió de proves' : ''}</p>`;
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
      <h1 class="entrada-galaxia">Galàxia</h1>
      <p class="entrada-sub">La teva agenda i tot el que has de recordar, en un sol lloc.</p>
      ${cos}
    </div>`;
}

/* ---------- Pintar ---------- */
/* ---------- Portada (el que surt en obrir l'app) ---------- */
// La portada ocupa exactament l'espai entre la capçalera i el menú de baix, i el contingut queda centrat
function ajustaPortada() {
  const cap = document.querySelector('header.top'), menu = document.getElementById('tabs');
  const fix = menu && getComputedStyle(menu).position === 'fixed' ? menu.offsetHeight : 0;
  const alt = window.innerHeight - (cap ? cap.getBoundingClientRect().bottom : 0) - fix;
  document.documentElement.style.setProperty('--alt-portada', Math.max(alt, 360) + 'px');
}
addEventListener('resize', () => { if (ui.view === 'inici') ajustaPortada(); });
/* ---------- Galàxia: l'Agenda al mig i les micro-apps al voltant ---------- */
const SATEL = [
  { id: 'recordatoris', nom: 'Recordatoris', color: '#E8590C' },
  { id: 'memoria', nom: 'Memòria', color: '#7048E8' },
  { id: 'aniversaris', nom: 'Aniversaris', color: '#E64980' },
  { id: 'llista', nom: 'Llista', color: '#1C7ED6' },
  { id: 'compres', nom: 'Compres', color: '#2F9E44' },
  { id: 'documents', nom: 'Documents', color: '#FFC300' },
  { id: 'veu', nom: 'Veu', color: '#0B7285' },
];
let gxAnimat = false;
const modeAgenda = () => state.ajustos.mode === 'agenda';   // l'animació d'entrada només es fa el primer cop que s'obre l'app
const VISTES_GALAXIA = ['inici', 'aniversaris', 'recordatoris', 'llista', 'compres', 'memoria', 'documents', 'veu', 'pindoles'];
const pendentsRec = () => state.recordatoris.filter((r) => !r.fet);
// Propers aniversaris i sants dels contactes (els dels pròxims 12 mesos, el primer avui)
function propersAniv() {
  const avuiD = parseYmd(avui()), y = avuiD.getFullYear(), out = [];
  state.persones.forEach((pe) => {
    [['aniversari', pe.aniversari], ['sant', pe.sant]].forEach(([tipus, txt]) => {
      const a = llegeixAniv(txt);
      if (!a || a.m < 1 || a.m > 12 || a.d < 1 || a.d > 31) return;
      let any = y;
      const dia = (yy) => new Date(yy, a.m - 1, Math.min(a.d, new Date(yy, a.m, 0).getDate()));
      if (dia(any) < avuiD) any++;
      const d = dia(any);
      out.push({ pe, tipus, ds: ymd(d), d, edat: tipus === 'aniversari' && a.y && a.y <= any ? any - a.y : null, falten: Math.round((d - avuiD) / 86400000) });
    });
  });
  return out.sort((a, b) => a.d - b.d || a.pe.nom.localeCompare(b.pe.nom));
}
function capSatel(nom) {
  return `<div class="sat-cap"><button class="sat-torna" data-anar="inici" aria-label="Torna a Galàxia">‹ Galàxia</button><h1>${esc(nom)}</h1></div>`;
}
function vistaInici() {
  const h = new Date().getHours();
  const salut = h < 6 ? 'Bona nit' : h < 13 ? 'Bon dia' : h < 20 ? 'Bona tarda' : 'Bona nit';
  const nom = (state.ajustos.nom || '').trim().split(' ')[0];
  const nPlans = delDia(avui()).filter((p) => p.estat !== 'cancelat').length, nRec = pendentsRec().length;
  const aviatAniv = propersAniv().filter((x) => x.falten === 0).length;
  const inv = rebuts().filter((p) => p.rebut.resposta === 'pendent' && p.data >= avui()).length;
  const comptes = { recordatoris: nRec, aniversaris: aviatAniv, compres: state.compres.filter((r) => !r.fet).length,
    llista: state.llistes.reduce((n, l) => n + l.items.filter((i) => !i.fet).length, 0), veu: state.notesveu.length };
  const entra = !gxAnimat; gxAnimat = true;
  return `<div class="galaxia${entra ? ' entra' : ''}">
      <div class="gx-salut"><h1>${esc(salut)}${nom ? ', ' + esc(nom) : ''}</h1>
        <p class="portada-data">${esc(cap(dataLlarga(avui())))}</p>
</div>
      <div class="gx-cercle${modeAgenda() ? ' gx-sol' : ''}">
        ${modeAgenda() ? '' : '<div class="gx-orbita" aria-hidden="true"></div>'}
        <button class="gx-centre" id="gxAgenda" aria-label="Agenda (mantén premut per a un pla nou)">
          <span class="gx-centre-nom">Agenda</span>${nPlans ? `<small class="gx-centre-n" aria-label="${nPlans} plans avui">${nPlans}</small>` : ''}</button>
        ${(modeAgenda() ? [] : SATEL).map((s, i) => `<button class="gx-sat${s.aviat ? ' aviat' : ''}" data-sat="${s.id}" style="--c:${s.color};--a:${i * (360 / SATEL.length) - 90}deg;--i:${i}">
            <span class="gx-bola"><span class="gx-ini" aria-hidden="true">${esc(s.nom[0])}</span>${comptes[s.id] ? `<i>${comptes[s.id]}</i>` : ''}</span><span class="gx-nom">${esc(s.nom)}</span>${s.aviat ? '<small>aviat</small>' : ''}</button>`).join('')}
      </div>
      ${typeof pindolaDelDia === 'function' ? `<button class="gx-pindola" data-pindoles>${esc(pindola())}</button>` : ''}
      ${avisosEnviaments()}
      ${inv ? `<button class="enllac portada-veure" data-anar="propers">${inv === 1 ? 'Tens 1 invitació per respondre' : `Tens ${inv} invitacions per respondre`}</button>` : ''}
    </div>`;
}
function vistaAniversaris() {
  const llista = propersAniv();
  if (!llista.length) return capSatel('Aniversaris') + `<p class="help buit">Encara no hi ha cap aniversari. Posa'ls a la fitxa de cada contacte (pestanya Contactes).</p>
    <div class="grp"><button class="btn" data-anar="gent">Ves a Contactes</button></div>`;
  let mes = -1, html = '';
  llista.forEach((x) => {
    const m = x.d.getMonth() + x.d.getFullYear() * 12;
    if (m !== mes) { mes = m; html += `<h2 class="aniv-mes">${esc(cap(MESOS[x.d.getMonth()]))}${x.d.getFullYear() !== new Date().getFullYear() ? ' ' + x.d.getFullYear() : ''}</h2>`; }
    const quan = x.falten === 0 ? 'Avui' : x.falten === 1 ? 'Demà' : x.falten <= 7 ? `D'aquí a ${x.falten} dies` : '';
    const que = x.tipus === 'sant' ? 'Sant' : x.edat ? `Fa ${x.edat} anys` : 'Aniversari';
    html += `<button class="aniv-fila${x.falten === 0 ? ' avui' : ''}${x.tipus === 'sant' ? ' sant' : ''}" data-fitxa="${esc(x.pe.id)}">
        <span class="aniv-dia"><b>${x.d.getDate()}</b><small>${esc(DIES[(x.d.getDay() + 6) % 7].slice(0, 3))}</small></span>
        <span class="aniv-cos"><b>${esc(x.pe.nom)}</b><small>${esc([que, quan].filter(Boolean).join(' · '))}</small></span></button>`;
  });
  return capSatel('Aniversaris') + `<div class="aniv-llista">${html}</div>`;
}
const fa = (iso) => {
  const dies = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  return !iso || isNaN(dies) ? '' : dies < 1 ? 'Avui' : dies === 1 ? 'Ahir' : dies < 30 ? `Fa ${dies} dies` : dies < 60 ? 'Fa un mes' : `Fa ${Math.floor(dies / 30)} mesos`;
};
// Els recordatoris fets de fa més de 30 dies s'esborren (també les seves fotos)
function purgaFets() {
  const limit = Date.now() - 30 * 86400000;
  const vells = (state.recordatoris || []).filter((x) => x.fet && x.fetEl && new Date(x.fetEl).getTime() < limit);
  if (!vells.length) return;
  state.recordatoris = state.recordatoris.filter((x) => !vells.includes(x)); save();
  vells.forEach((x) => (x.imatges || []).forEach((im) => sync()?.esborraDoc(im.cami).catch(() => {})));
}
function marcaFet(r) {
  r.fet = true; r.fetEl = new Date().toISOString(); save(); render();
  toastDesfes(`Fet: ${r.text}`, () => { const x = state.recordatoris.find((y) => y.id === r.id); if (x) { x.fet = false; delete x.fetEl; } save(); render(); });
}
$('#main').addEventListener('click', (e) => {
  if (e.target.closest('[data-recfets]')) { ui.recFets = !ui.recFets; render(); return; }
  const rc = e.target.closest('[data-recrecupera]');
  if (rc) { const x = state.recordatoris.find((y) => y.id === rc.dataset.recrecupera); if (x) { x.fet = false; delete x.fetEl; save(); render(); toast('Recuperat'); } return; }
  const eb = e.target.closest('[data-recesborrafet]');
  if (eb) { const x = state.recordatoris.find((y) => y.id === eb.dataset.recesborrafet); if (x) treuRecordatori(x, `Esborrat: ${x.text}`); }
});
function vistaRecordatoris() {
  purgaFets();
  const obert = recObert();
  if (obert) return vistaRecFitxa(obert);
  const llista = pendentsRec().slice().sort((a, b) => (Boolean(b.important) - Boolean(a.important)) || String(b.creat || '').localeCompare(String(a.creat || '')));
  const indicadors = (r) => {
    const subs = r.subtasques || [], n = (r.imatges || []).length, out = [];
    if (r.data) out.push(dataCurta(r.data) + (r.hora ? ' ' + r.hora : ''));
    if (subs.length) out.push(`${subs.filter((x) => x.fet).length}/${subs.length}`);
    if (n) out.push(n === 1 ? '1 foto' : n + ' fotos');
    if (r.notes) out.push('Notes');
    if (r.lloc || r.llocUrl) out.push(r.lloc && r.lloc.length < 28 ? r.lloc : 'Ubicació');
    if (r.url) out.push('Enllaç');
    return out;
  };
  return capSatel('Recordatoris') + `<p class="help">Coses pendents que no vols oblidar. Toca un recordatori per afegir-hi notes, fotos, un enllaç o passos. Quan el facis, toca el cercle: passa a «Fets», on es guarda 30 dies.</p>
    <form id="formRec" class="rec-nou" autocomplete="off"><input id="recText" placeholder="Què has de recordar?" maxlength="300" enterkeyhint="done" value="${esc(ui.recNouText || '')}"><button class="btn primary">Afegeix</button></form>
    ${barraRecNou()}
    <button class="enllac enganxa" data-enganxa="recordatoris">Enganxa el que has copiat</button>
    ${llista.length > 3 ? '<input id="cercaRec" type="search" class="doc-cerca" placeholder="Cerca un recordatori…" autocomplete="off">' : ''}
    ${llista.length ? `<ul class="rec-llista recs">${llista.map((r) => `<li class="mur-rec" data-rec="${esc(r.id)}" data-reccerca="${esc(normal([r.text, r.notes, r.lloc, ...(r.subtasques || []).map((x) => x.text)].filter(Boolean).join(' ')))}">
        <div class="mur-accions"><button type="button" class="acc-esborra" data-rectreu="${esc(r.id)}">Esborra</button></div>
        <div class="rec-cos${r.important ? ' important' : ''}"><button class="rec-check" data-recfet="${esc(r.id)}" aria-label="Fet"></button>
        <button class="rec-text" data-recedita="${esc(r.id)}"><span>${r.important ? '<i class="rec-bandera"></i>' : ''}${esc(r.text)}</span><small>${esc([fa(r.creat), ...indicadors(r)].filter(Boolean).join(' · '))}</small></button></div></li>`).join('')}</ul>`
      : '<p class="help buit">No tens res pendent.</p>'}
    <p class="help buit" id="recRes" hidden>No hi ha cap recordatori que hi coincideixi.</p>
    ${(() => {
      const fets = (state.recordatoris || []).filter((x) => x.fet).sort((a, b) => String(b.fetEl || '').localeCompare(String(a.fetEl || '')));
      if (!fets.length) return '';
      return `<button class="rec-fets-cap" data-recfets aria-expanded="${Boolean(ui.recFets)}">${ui.recFets ? '▾' : '▸'} Fets (${fets.length})</button>
        ${ui.recFets ? `<p class="help">Els recordatoris fets es guarden 30 dies i després s'esborren sols.</p><ul class="rec-fets">${fets.map((x) => `<li>
          <span><s>${esc(x.text)}</s><small>Fet ${esc(fa(x.fetEl).toLowerCase())}</small></span>
          <button class="enllac" data-recrecupera="${esc(x.id)}">Recupera</button><button class="enllac perill" data-recesborrafet="${esc(x.id)}">Esborra</button></li>`).join('')}</ul>` : ''}`;
    })()}`;
}
$('#main').addEventListener('input', (e) => {
  if (e.target.id !== 'cercaRec') return;
  const q = normal(e.target.value.trim());
  let n = 0;
  document.querySelectorAll('[data-reccerca]').forEach((el) => { el.hidden = Boolean(q) && !el.dataset.reccerca.includes(q); if (!el.hidden) n++; });
  const r = document.getElementById('recRes'); if (r) r.hidden = n > 0;
});
// Elements d'una llista (Llista i Compres): casella per marcar i text per corregir
const nouId = (p) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
function filesItems(items, col, lid) {
  return `<ul class="rec-llista">${items.map((it) => `<li data-item="${esc(it.id)}">
      <button class="rec-check" data-chk="${col}|${esc(lid)}|${esc(it.id)}" aria-label="Fet"></button>
      <button class="rec-text" data-itedita="${col}|${esc(lid)}|${esc(it.id)}"><span>${esc(it.text)}</span></button></li>`).join('')}</ul>`;
}
const formItem = (col, lid, ph) => `<form class="rec-nou" data-formitem="${col}|${esc(lid)}" autocomplete="off"><input name="text" placeholder="${esc(ph)}" maxlength="200" enterkeyhint="done"><button class="btn primary">Afegeix</button></form>`;
// Ordre de les llistes dins d'una carpeta: el que s'ha triat amb el dit; si no, les més noves a dalt
const perOrdreLl = (a, b) => (a.ordre ?? 1e12) - (b.ordre ?? 1e12) || String(b.creat || '').localeCompare(String(a.creat || ''));
function vistaLlista() {
  const l = state.llistes.find((x) => x.id === ui.llista);
  if (!l) {
    const cid = carpetaOberta('llista');
    if (cid === null) {
      return capSatel('Llista') + `<p class="help">Llistes per a un moment concret, ordenades en carpetes: el que t'has d'endur de viatge, els encàrrecs d'avui…</p>
        ${graellaCarpetes('llista', ['llista', 'llistes'])}`;
    }
    const llistes = state.llistes.filter((x) => carpetaItem('llista', x) === cid).sort(perOrdreLl);
    return `<div class="sat-cap"><button class="sat-torna" data-cftorna="llista" aria-label="Torna a les carpetes">‹ Carpetes</button><h1>${esc(nomCarpeta('llista', cid))}</h1></div>
      <form id="formLlistaNova" class="rec-nou" autocomplete="off"><input id="llistaNom" placeholder="Nom de la llista nova" maxlength="60" enterkeyhint="done"><button class="btn primary">Crea</button></form>
      ${llistes.length ? `<div class="ll-index">${llistes.map((x) => {
        const n = x.items.filter((i) => !i.fet).length;
        return `<div class="mur-g cf-mur" data-ordre="llista|${esc(x.id)}"><div class="mur-accions"><button type="button" class="acc-esborra" data-lltreu="${esc(x.id)}">Esborra</button></div><button class="mur-cos ll-fila" data-obrellista="${esc(x.id)}"><b>${esc(x.nom)}</b><small>${n ? (n === 1 ? '1 pendent' : n + ' pendents') : x.items.length ? 'Feta' : 'Buida'}</small></button></div>`;
      }).join('')}</div>${llistes.length > 1 ? '<p class="help cf-ajuda">Mantén premuda una llista per moure-la amunt o avall. Llisca-la cap a l’esquerra per esborrar-la.</p>' : ''}` : '<p class="help buit">Aquesta carpeta encara és buida.</p>'}
      ${peuCarpeta('llista')}`;
  }
  const pend = l.items.filter((i) => !i.fet), fets = l.items.length - pend.length;
  const tornaA = carpetaOberta('llista') === null ? 'Carpetes' : nomCarpeta('llista', carpetaOberta('llista'));
  return `<div class="sat-cap"><button class="sat-torna" data-llistes aria-label="Torna">‹ ${esc(tornaA)}</button><h1>${esc(l.nom)}</h1></div>
    ${formItem('llista', l.id, 'Afegeix a la llista')}
    <button class="enllac enganxa" data-enganxa="llista|${esc(l.id)}">Enganxa el que has copiat</button>
    ${pend.length ? filesItems(pend, 'llista', l.id) : `<p class="help buit">${fets ? 'Llista feta.' : 'La llista és buida.'}</p>`}
    <div class="ll-peu">
      ${fets ? `<button class="btn" data-omple="${esc(l.id)}">Torna-la a omplir (${fets})</button>` : ''}
      ${l.items.length ? `<button class="btn" data-llistacomparteix="${esc(l.id)}">Comparteix</button><button class="btn" data-llistaimprimeix="${esc(l.id)}">Imprimeix</button>` : ''}
      <button class="enllac" data-envllista="${esc(l.id)}">Envia una còpia</button>
      <button class="enllac" data-llistanom="${esc(l.id)}">Canvia el nom</button>
      <button class="enllac perill" data-llistaesborra="${esc(l.id)}">Esborra la llista</button>
    </div>
    <div class="cf-peu">${triaCarpeta('llista', l)}</div>`;
}
// Carpetes de colors per a Llista i Documents (igual que les de Memòria).
// Les inicials tenen un id fix perquè siguin les mateixes a tots els aparells.
const CARPETES_INICIALS = {
  llista: [['Avui', '#E8590C'], ['Escapada', '#2F9E44'], ['Vacances', '#1C7ED6'], ['Urgent', '#E03131']],
  docs: [['Personals', '#7048E8'], ['Salut', '#2F9E44'], ['Assegurances', '#1C7ED6'], ['Laborals', '#E8590C']],
  compres: [['Ametller Origen', '#2F9E44'], ['Esclat', '#E03131'], ['Lidl', '#F59F00'], ['Aldi', '#3B5BDB'], ['Mercadona', '#12B886'], ['Carrefour', '#1C7ED6'], ['Gros Mercat', '#E8590C'], ['Action', '#7048E8']],
};
const UI_CARP = { llista: 'llCarpeta', docs: 'docCarpeta', compres: 'compCarpeta' };
const colCarp = (k) => (k === 'llista' ? state.llistes : k === 'compres' ? state.compres : state.documents);
function carpetesDe(k) {
  const camp = 'carpetes_' + k;
  if (!Array.isArray(state.ajustos[camp])) {
    state.ajustos[camp] = CARPETES_INICIALS[k].map(([nom, color]) => ({ id: k + '-' + normal(nom).replace(/[^a-z0-9]+/g, ''), nom, color }));
    save();
  }
  return state.ajustos[camp];
}
const carpetaItem = (k, x) => (carpetesDe(k).some((c) => c.id === x.carpeta) ? x.carpeta : '');
// null = a l'inici (es veuen les carpetes); '' = General (els que no tenen carpeta); si no, l'id de la carpeta
const carpetaOberta = (k) => { const v = ui[UI_CARP[k]]; return v === 'g' ? '' : carpetesDe(k).some((c) => c.id === v) ? v : null; };
const nomCarpeta = (k, id) => carpetesDe(k).find((c) => c.id === id)?.nom || 'General';
function graellaCarpetes(k, unitat) {
  const compta = (id) => colCarp(k).filter((x) => carpetaItem(k, x) === id && !(k === 'compres' && x.fet)).length;
  const totes = [...carpetesDe(k), ...(colCarp(k).some((x) => carpetaItem(k, x) === '') ? [{ id: 'g', nom: 'General', color: '#868E96' }] : [])];
  return `<div class="mem-carpetes" id="carp-${k}">${totes.map((c) => {
    const n = compta(c.id === 'g' ? '' : c.id);
    return murCarpeta(c.id === 'g' ? '' : k, c.id, `<button class="mem-carpeta" data-cfobre="${k}|${esc(c.id)}" style="--c:${esc(c.color)}"><b>${esc(c.nom)}</b><small>${n === 1 ? '1 ' + unitat[0] : n + ' ' + unitat[1]}</small></button>`);
  }).join('')}
    <button class="mem-carpeta nova" data-cfnova="${k}"><b>+ Nova carpeta</b></button></div>${AJUDA_CARPETES}`;
}
function peuCarpeta(k) {
  const c = carpetesDe(k).find((x) => x.id === carpetaOberta(k));
  return c ? `<div class="ll-peu"><button class="enllac" data-envcarp="${k}">Envia una còpia</button><button class="enllac" data-cfnom="${k}">Canvia el nom</button><button class="enllac" data-cfcolor="${k}">Canvia el color</button><button class="enllac perill" data-cfesborra="${k}">Esborra la carpeta</button></div>` : '';
}
// Desplegable per moure una llista o un document a una altra carpeta
const triaCarpeta = (k, x) => `<label class="cf-mou">Carpeta <select data-cfmou="${k}|${esc(x.id)}"><option value="">General</option>${carpetesDe(k).map((c) => `<option value="${esc(c.id)}"${c.id === carpetaItem(k, x) ? ' selected' : ''}>${esc(c.nom)}</option>`).join('')}</select></label>`;
document.addEventListener('change', (e) => {
  const s = e.target.closest('[data-cfmou]');
  if (!s) return;
  const [k, id] = s.dataset.cfmou.split('|');
  const x = colCarp(k).find((y) => y.id === id);
  if (!x) return;
  x.carpeta = s.value; save();
  ui[UI_CARP[k]] = s.value || 'g';
  render(); toast(`Ara és a ${nomCarpeta(k, s.value)}`);
});
$('#main').addEventListener('click', async (e) => {
  const t = e.target;
  const ob = t.closest('[data-cfobre]');
  if (ob) { const [k, id] = ob.dataset.cfobre.split('|'); ui[UI_CARP[k]] = id; if (k === 'docs') { ui.docFiltre = ''; ui.docCerca = ''; } render(); window.scrollTo(0, 0); return; }
  const tr = t.closest('[data-cftorna]');
  if (tr) { ui[UI_CARP[tr.dataset.cftorna]] = null; ui.docCerca = ''; render(); window.scrollTo(0, 0); return; }
  const nv = t.closest('[data-cfnova]');
  if (nv) {
    const k = nv.dataset.cfnova;
    const nom = await demanaText('Nom de la carpeta nova', '', { max: 40, placeholder: k === 'llista' ? 'Festa, Casa, Feina…' : 'Cotxe, Casa, Banc…' });
    if (!nom || !nom.trim()) return;
    const ja = carpetesDe(k).find((c) => normal(c.nom) === normal(nom.trim()));
    if (ja) { ui[UI_CARP[k]] = ja.id; render(); return; }
    const c = { id: nouId('c' + k[0]), nom: nom.trim().slice(0, 40), color: COLORS_CARPETA[carpetesDe(k).length % COLORS_CARPETA.length] };
    state.ajustos['carpetes_' + k] = [...carpetesDe(k), c]; save(); ui[UI_CARP[k]] = c.id; render(); window.scrollTo(0, 0);
    return;
  }
  const el = t.closest('[data-cfnom],[data-cfcolor],[data-cfesborra]');
  if (!el) return;
  const k = el.dataset.cfnom || el.dataset.cfcolor || el.dataset.cfesborra, camp = 'carpetes_' + k;
  const c = carpetesDe(k).find((x) => x.id === carpetaOberta(k));
  if (!c) return;
  if (el.dataset.cfnom) {
    const nom = await demanaText('Nom de la carpeta', c.nom, { max: 40 });
    if (nom && nom.trim()) { state.ajustos[camp] = carpetesDe(k).map((x) => (x.id === c.id ? { ...x, nom: nom.trim().slice(0, 40) } : x)); save(); render(); }
    return;
  }
  if (el.dataset.cfcolor) {
    const i = COLORS_CARPETA.indexOf(c.color);
    state.ajustos[camp] = carpetesDe(k).map((x) => (x.id === c.id ? { ...x, color: COLORS_CARPETA[(i + 1) % COLORS_CARPETA.length] } : x)); save(); render();
    return;
  }
  const n = colCarp(k).filter((x) => x.carpeta === c.id).length;
  if (el.dataset.segur !== '1') { el.dataset.segur = '1'; el.textContent = n ? `Segur? ${n === 1 ? 'Passarà' : `Els ${n} passaran`} a General` : "Segur? Toca'l un altre cop"; return; }
  colCarp(k).forEach((x) => { if (x.carpeta === c.id) x.carpeta = ''; });
  state.ajustos[camp] = carpetesDe(k).filter((x) => x.id !== c.id); save();
  ui[UI_CARP[k]] = null; render(); toast('Carpeta esborrada');
});
// ---------- Carpetes i llistes: lliscar per esborrar, mantenir premut per moure o canviar el color ----------
// k: 'mem' (Memòria), 'llista' o 'docs'
const carpsDe = (k) => (k === 'mem' ? carpetesReals() : carpetesDe(k));
const posaCarps = (k, arr) => { state.ajustos[k === 'mem' ? 'carpetesMem' : 'carpetes_' + k] = arr; save(); };
const itemsCarp = (k) => (k === 'mem' ? state.memoria : colCarp(k));
// Embolcall d'una carpeta de veritat (no General ni Per classificar): es pot lliscar i arrossegar
const murCarpeta = (k, id, html) => (!k ? html
  : `<div class="mur-g cf-mur" data-cfreal="${k}|${esc(id)}"><div class="mur-accions"><button type="button" class="acc-esborra" data-cftreu="${k}|${esc(id)}">Esborra</button></div>${html.replace('class="mem-carpeta', 'class="mur-cos mem-carpeta')}</div>`);
const AJUDA_CARPETES = '<p class="help cf-ajuda">Mantén premuda una carpeta per moure-la de lloc o canviar-ne el color. Llisca-la cap a l\'esquerra per esborrar-la.</p>';
// Botiga on es mostra Compres ara mateix ('' = General)
const botigaAra = () => carpetaOberta('compres') || '';
function esborraCarpeta(k, id) {
  const arr = carpsDe(k), lloc = arr.findIndex((c) => c.id === id);
  if (lloc < 0) return;
  const c = arr[lloc], moguts = itemsCarp(k).filter((x) => x.carpeta === id);
  moguts.forEach((x) => { x.carpeta = ''; });
  posaCarps(k, arr.filter((x) => x.id !== id));
  if (k === 'mem' && ui.memCarpeta === id) ui.memCarpeta = null;
  if (k !== 'mem' && ui[UI_CARP[k]] === id) ui[UI_CARP[k]] = null;
  render();
  toastDesfes(`Carpeta esborrada: ${c.nom}`, () => {
    const ara = [...carpsDe(k)]; ara.splice(Math.min(lloc, ara.length), 0, c); posaCarps(k, ara);
    moguts.forEach((x) => { x.carpeta = id; }); save(); render();
  });
}
function menuCarpeta(k, id) {
  const c = carpsDe(k).find((x) => x.id === id);
  if (!c) return;
  document.querySelector('.demana')?.remove();
  const d = document.createElement('div');
  d.className = 'demana';
  d.innerHTML = `<div class="demana-caixa cf-menu"><b>${esc(c.nom)}</b><span class="cf-menu-t">Color</span>
    <div class="cf-colors">${COLORS_CARPETA.map((col) => `<button type="button" class="cf-color${col === c.color ? ' on' : ''}" data-col="${col}" style="--c:${col}" aria-label="Color"></button>`).join('')}</div>
    <button type="button" class="btn" data-op="envia">Envia una còpia…</button>
    <button type="button" class="btn" data-op="nom">Canvia el nom</button>
    <button type="button" class="btn cf-perill" data-op="esborra">Esborra la carpeta</button>
    <p class="help">Per canviar-la de lloc, mantén-la premuda i arrossega-la on vulguis.</p>
    <button type="button" class="enllac" data-op="">Fet</button></div>`;
  document.body.appendChild(d);
  d.addEventListener('click', async (e) => {
    const col = e.target.closest('[data-col]');
    if (col) {
      posaCarps(k, carpsDe(k).map((x) => (x.id === id ? { ...x, color: col.dataset.col } : x)));
      d.querySelectorAll('.cf-color').forEach((b) => b.classList.toggle('on', b === col));
      render();
      return;
    }
    const b = e.target.closest('[data-op]');
    if (!b && e.target !== d) return;
    d.remove();
    if (b?.dataset.op === 'nom') {
      const nom = await demanaText('Nom de la carpeta', c.nom, { max: 40 });
      if (nom && nom.trim()) { posaCarps(k, carpsDe(k).map((x) => (x.id === id ? { ...x, nom: nom.trim().slice(0, 40) } : x))); render(); }
    }
    if (b?.dataset.op === 'esborra') esborraCarpeta(k, id);
    if (b?.dataset.op === 'envia') enviaCarpeta(k, id);
  });
}
let gG = null, murGObert = null, ignoraClicG = false, darrerToc = 0;
const tancaMurG = (m = murGObert) => { if (!m) return; const c = m.querySelector(':scope > .mur-cos'); if (c) c.style.transform = ''; m.classList.remove('obert'); if (murGObert === m) murGObert = null; };
const ampleG = (m) => m.querySelector(':scope > .mur-accions').offsetWidth;
function iniciGest(m, x, y, tactil) {
  if (murGObert && murGObert !== m) tancaMurG();
  gG = { m, x, y, ini: m.classList.contains('obert') ? -ampleG(m) : 0, mou: false, drag: false, moguda: false, tactil };
  if (m.dataset.cfreal || m.dataset.ordre) {
    gG.timer = setTimeout(() => {
      if (!gG || gG.m !== m || gG.mou) return;
      gG.drag = true; tancaMurG(m);
      m.classList.add('arrossega'); m.parentNode.classList.add('ordenant');
    }, 450);
  }
}
function mouGest(x, y, ev) {
  if (!gG) return;
  const dx = x - gG.x, dy = y - gG.y;
  if (gG.drag) {
    if (ev && ev.cancelable) ev.preventDefault();   // mentre s'arrossega, la pantalla no es desplaça
    if (Math.hypot(dx, dy) > 6) gG.moguda = true;
    gG.m.style.pointerEvents = 'none';
    const sota = document.elementFromPoint(x, y)?.closest('[data-cfreal],[data-ordre]');
    gG.m.style.pointerEvents = '';
    if (sota && sota !== gG.m && sota.parentNode === gG.m.parentNode) {
      const endavant = sota.compareDocumentPosition(gG.m) & Node.DOCUMENT_POSITION_PRECEDING;
      sota.parentNode.insertBefore(gG.m, endavant ? sota.nextSibling : sota);
    }
    return;
  }
  if (!gG.mou) {
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
    clearTimeout(gG.timer);
    if (!gG.tactil || Math.abs(dx) < Math.abs(dy) * 1.2) { gG = null; return; }
    gG.mou = true; gG.m.classList.add('mou');
  }
  gG.m.querySelector(':scope > .mur-cos').style.transform = `translateX(${Math.max(-ampleG(gG.m) - 30, Math.min(0, gG.ini + dx))}px)`;
}
function fiGest(x) {
  if (!gG) return;
  const g = gG; gG = null; clearTimeout(g.timer);
  if (g.drag) {
    g.m.classList.remove('arrossega'); g.m.parentNode.classList.remove('ordenant');
    ignoraClicG = true; setTimeout(() => { ignoraClicG = false; }, 450);
    if (g.m.dataset.ordre) {
      if (!g.moguda) return;
      [...g.m.parentNode.querySelectorAll(':scope > [data-ordre]')].forEach((el, i) => { const l = state.llistes.find((x) => x.id === el.dataset.ordre.split('|')[1]); if (l) l.ordre = i; });
      save(); toast('Ordre desat');
      return;
    }
    const [k, id] = g.m.dataset.cfreal.split('|');
    if (g.moguda) {
      const ordre = [...g.m.parentNode.querySelectorAll(':scope > [data-cfreal]')].map((el) => el.dataset.cfreal.split('|')[1]);
      const arr = carpsDe(k);
      posaCarps(k, [...ordre.map((i) => arr.find((c) => c.id === i)).filter(Boolean), ...arr.filter((c) => !ordre.includes(c.id))]);
      toast('Ordre desat');
    } else menuCarpeta(k, id);
    return;
  }
  if (!g.mou) return;
  g.m.classList.remove('mou');
  ignoraClicG = true; setTimeout(() => { ignoraClicG = false; }, 350);
  if (g.ini + (x - g.x) < -ampleG(g.m) / 2) {
    g.m.classList.add('obert'); g.m.querySelector(':scope > .mur-cos').style.transform = `translateX(-${ampleG(g.m)}px)`; murGObert = g.m;
  } else tancaMurG(g.m);
}
$('#main').addEventListener('touchstart', (e) => {
  darrerToc = Date.now();
  const m = e.target.closest('.mur-g');
  if (murGObert && murGObert !== m) tancaMurG();
  if (!m || e.target.closest('.mur-accions') || e.touches.length !== 1) { gG = null; return; }
  iniciGest(m, e.touches[0].clientX, e.touches[0].clientY, true);
}, { passive: true });
$('#main').addEventListener('touchmove', (e) => { if (gG && gG.tactil) mouGest(e.touches[0].clientX, e.touches[0].clientY, e); }, { passive: false });
$('#main').addEventListener('touchend', (e) => { if (gG && gG.tactil) fiGest(e.changedTouches[0].clientX); }, { passive: true });
$('#main').addEventListener('touchcancel', () => { if (gG?.drag) fiGest(gG.x); else gG = null; });
// Amb el ratolí (ordinador): mantenir premut el botó per arrossegar una carpeta
$('#main').addEventListener('mousedown', (e) => {
  if (e.button !== 0 || Date.now() - darrerToc < 1000) return;
  const m = e.target.closest('.mur-g[data-cfreal], .mur-g[data-ordre]');
  if (m && !e.target.closest('.mur-accions')) iniciGest(m, e.clientX, e.clientY, false);
});
document.addEventListener('mousemove', (e) => { if (gG && !gG.tactil) mouGest(e.clientX, e.clientY, e); });
document.addEventListener('mouseup', (e) => { if (gG && !gG.tactil) fiGest(e.clientX); });
$('#main').addEventListener('contextmenu', (e) => { if (e.target.closest('.mur-g[data-cfreal], .mur-g[data-ordre]')) e.preventDefault(); });
$('#main').addEventListener('click', (e) => {
  if (ignoraClicG && e.target.closest('.mur-g')) { e.stopImmediatePropagation(); e.preventDefault(); return; }
  const tc = e.target.closest('[data-cftreu]');
  if (tc) { e.stopImmediatePropagation(); const [k, id] = tc.dataset.cftreu.split('|'); murGObert = null; esborraCarpeta(k, id); return; }
  const tl = e.target.closest('[data-lltreu]');
  if (tl) {
    e.stopImmediatePropagation(); murGObert = null;
    const l = state.llistes.find((x) => x.id === tl.dataset.lltreu);
    if (!l) return;
    const lloc = state.llistes.indexOf(l), copia = JSON.parse(JSON.stringify(l));
    state.llistes.splice(lloc, 1); save(); render();
    toastDesfes(`Esborrada: ${l.nom}`, () => { state.llistes.splice(lloc, 0, copia); save(); render(); });
    return;
  }
  const td = e.target.closest('[data-doctreu]');
  if (td) {
    e.stopImmediatePropagation(); murGObert = null;
    const d = state.documents.find((x) => x.id === td.dataset.doctreu);
    if (!d) return;
    const lloc = state.documents.indexOf(d), copia = { ...d };
    state.documents.splice(lloc, 1); save(); render();
    toastDesfes(`Esborrat: ${d.titol}`, () => { state.documents.splice(Math.max(0, lloc), 0, copia); save(); render(); });
    if (copia.cami) setTimeout(() => { if (!state.documents.some((x) => x.id === copia.id)) sync()?.esborraDoc(copia.cami).catch(() => {}); }, 7000);
    return;
  }
  // Tocar una fila oberta la tanca (no l'obre); els botons de darrere sí que funcionen
  if (murGObert && e.target.closest('.mur-g') === murGObert && !e.target.closest('.mur-accions')) { e.stopImmediatePropagation(); e.preventDefault(); tancaMurG(); }
}, true);
// Famílies de la compra: cada producte es classifica sol per paraules clau (i es pot canviar a mà)
const FAMILIES = [
  { id: 'verdura', nom: 'Verdura', c: '#2F9E44', p: 'verdura,enciam,lletuga,tomaquet,tomate,ceba,ceba tendra,all,pebrot,carbasso,carbassa,albergina,pastanaga,patata,broquil,coliflor,espinac,mongeta tendra,mongeta,cogombre,porro,api,carxofa,bolet,xampinyo,col,julivert,rucula,canonges,remolatxa,nap,amanida' },
  { id: 'fruita', nom: 'Fruita', c: '#F08C00', p: 'fruita,poma,pera,platan,banana,taronja,mandarina,maduixa,raim,pressec,melo,sindria,kiwi,llimona,cirera,pinya,alvocat,figa,nespra,albercoc,pruna,mango,nabius,gerds' },
  { id: 'neteja', nom: 'Neteja i higiene', c: '#1C7ED6', p: 'detergent,lleixiu,sabo,xampu,gel de dutxa,gel de bany,paper higienic,paper de vater,paper wc,paper de cuina,rotllo de cuina,esponja,fregall,suavitzant,raspall de dents,pasta de dents,dentifric,desodorant,bosses d escombraries,bosses de brossa,bosses,escombraries,rentavaixelles,netejavidres,netejador,amoniac,tovalloletes,compreses,tampons,maquineta,fulles d afaitar,colonia,coto,bastonets,mocadors de paper,mocadors,crema' },
  { id: 'olis', nom: 'Olis, vinagres i salses', c: '#C2A100', p: 'oli,oli d oliva,vinagre,maionesa,quetxup,ketchup,mostassa,salsa,tomaquet fregit,tomaquet triturat,sal,pebre,especies,orenga,comi,allioli,salsa de soja' },
  { id: 'pa', nom: 'Pans, rebosteria i cereals', c: '#B07D48', p: 'pa,barra de pa,llesques,pa de motlle,pa torrat,torrades,biscotes,galeta,magdalena,croissant,cereals,muesli,civada,bescuit,coca,ensaimada,pastes,brioix,farina' },
  { id: 'cafe', nom: 'Cafè, te i infusions', c: '#8B5E3C', p: 'cafe,descafeinat,capsules de cafe,capsules,te,te verd,infusio,camamilla,poliol,tila,menta,poleo,cacau,colacao,xocolata a la tassa' },
  { id: 'carn', nom: 'Carns', c: '#E03131', p: 'carn,carn picada,pollastre,pit de pollastre,cuixes de pollastre,vedella,porc,xai,conill,botifarra,salsitxa,hamburguesa,pernil,pernil dolc,pernil salat,embotit,fuet,llonganissa,llom,costella,bacon,gall dindi,mandonguilles,filet,xorico,chorizo' },
  { id: 'peix', nom: 'Peixos', c: '#0B7285', p: 'peix,lluc,bacalla,salmo,tonyina,sardina,gamba,musclo,calamar,sipia,rap,llobarro,orada,anxova,seito,cloissa,marisc,surimi,navalla' },
  { id: 'lactics', nom: 'Làctics i ous', c: '#74C0FC', p: 'llet,llet sencera,llet semi,llet desnatada,llet sense lactosa,llet de soja,llet de civada,beguda de civada,beguda de soja,iogurt,iogurts,iogurt grec,formatge,formatge ratllat,formatget,mato,mantega,nata,nata per cuinar,quallada,flam,natilles,kefir,ou,ous' },
  { id: 'pasta', nom: 'Pasta, arròs i llegums', c: '#E8B04B', p: 'pasta,macarrons,espaguetis,fideus,tallarines,lasanya,canelons,arros,arros integral,cigrons,llenties,mongetes seques,fesols,quinoa,cuscus,sopa de sobre,brou' },
  { id: 'conserves', nom: 'Conserves', c: '#A9744F', p: 'conserva,llauna,tonyina en llauna,olives,escopinyes,espàrrecs,esparrecs,pebrots del piquillo,blat de moro,tomaquet en conserva,melmelada,confitura,mel' },
  { id: 'congelats', nom: 'Congelats', c: '#66D9E8', p: 'congelat,congelats,gelat,gelats,pizza,pizza congelada,croquetes,verdura congelada,peix congelat,gel,glacons,canelons congelats' },
  { id: 'begudes', nom: 'Begudes', c: '#7950F2', p: 'aigua,aigua amb gas,vi,vi negre,vi blanc,cava,cervesa,cerveses,refresc,refrescos,coca cola,cola,taronjada,llimonada,suc,sucs,suc de taronja,tonica,gasosa,vermut,licor,whisky,ginebra,brandi,orxata' },
  { id: 'altres', nom: 'Altres', c: '#868E96', p: '' },
];
// Formes en plural de l'última paraula: poma → pomes, pastanaga → pastanagues, vaca → vaques, platja → platges
function formesPlural(x) {
  const out = [x, x + 's', x + 'es', x + 'ns'];
  if (/a$/.test(x)) { const b = x.slice(0, -1); out.push(b + 'es'); if (/ga$/.test(x)) out.push(x.slice(0, -2) + 'gues'); if (/ca$/.test(x)) out.push(x.slice(0, -2) + 'ques'); if (/ja$/.test(x)) out.push(x.slice(0, -2) + 'ges'); if (/qua$/.test(x)) out.push(x.slice(0, -3) + 'qües'); }
  return out;
}
// Cada paraula o expressió (també en plural); les expressions llargues es miren primer («tomàquet fregit» abans que «tomàquet»)
const PARAULES_FAM = FAMILIES.flatMap((f) => f.p.split(',').map((x) => x.trim()).filter(Boolean)
  .map((x) => [new RegExp(' (' + formesPlural(x).join('|') + ') '), f.id, x.length]))
  .sort((a, b) => b[2] - a[2]);
function endevinaFamilia(text) {
  const t = ' ' + normal(text).replace(/[^a-z0-9]+/g, ' ').trim() + ' ';
  for (const [re, id] of PARAULES_FAM) if (re.test(t)) return id;
  return 'altres';
}
const familiaDe = (r) => (FAMILIES.some((f) => f.id === r.familia) ? r.familia : endevinaFamilia(r.text));
function filesCompres(items) {
  return FAMILIES.map((f) => {
    const seus = items.filter((r) => familiaDe(r) === f.id);
    if (!seus.length) return '';
    return `<h3 class="fam-titol" style="--fc:${f.c}">${esc(f.nom)}</h3><ul class="rec-llista">${seus.map((it) => `<li data-item="${esc(it.id)}">
      <button class="rec-check" data-chk="compres||${esc(it.id)}" aria-label="Fet"></button>
      <button class="rec-text" data-itedita="compres||${esc(it.id)}"><span>${esc(it.text)}</span></button>
      <select class="fam-tria" data-fam="${esc(it.id)}" aria-label="Família">${FAMILIES.map((x) => `<option value="${x.id}"${x.id === f.id ? ' selected' : ''}>${esc(x.nom)}</option>`).join('')}</select></li>`).join('')}</ul>`;
  }).join('');
}
function vistaCompres() {
  if (ui.compTot) return vistaTotaCompra();
  const cid = carpetaOberta('compres');
  if (cid === null) {
    const total = state.compres.filter((r) => !r.fet).length;
    return capSatel('Compres') + `<p class="help">Una llista de la compra per a cada botiga. Entra a la botiga i apunta el que falta: es classifica sol per famílies (fruita, verdura, neteja…).</p>
      <button class="tc-tot" data-comptot><b>Tota la compra</b><small>${total === 1 ? '1 cosa per comprar' : total + ' coses per comprar'} · totes les botigues juntes, per imprimir o compartir</small></button>
      ${graellaCarpetes('compres', ['per comprar', 'per comprar'])}`;
  }
  const deLaBotiga = state.compres.filter((r) => carpetaItem('compres', r) === cid);
  const pend = deLaBotiga.filter((r) => !r.fet);
  const vegades = (r) => r.vegades || 1;
  const habituals = deLaBotiga.filter((r) => r.fet).sort((a, b) => vegades(b) - vegades(a) || a.text.localeCompare(b.text, 'ca'));
  return `<div class="sat-cap"><button class="sat-torna" data-cftorna="compres" aria-label="Torna a les botigues">‹ Botigues</button><h1>${esc(nomCarpeta('compres', cid))}</h1></div>`
    + formItem('compres', cid, 'Què falta?') + `<button class="enllac enganxa" data-enganxa="compres|${esc(cid)}">Enganxa el que has copiat</button>`
    + (pend.length ? filesCompres(pend) + '<div class="ll-peu"><button class="btn" data-comprescomparteix>Comparteix la llista</button><button class="btn" data-comprescimprimeix>Imprimeix</button></div>' : '<p class="help buit">No falta res.</p>')
    + (habituals.length ? `<h2 class="ll-titol">Habituals</h2><p class="help">Toca'n un per tornar-lo a posar a la llista. Mantén-lo premut per treure'l dels habituals.</p>
      ${FAMILIES.map((f) => { const seus = habituals.filter((r) => familiaDe(r) === f.id); return seus.length ? `<div class="ll-chips fam-chips" style="--fc:${f.c}">${seus.map((r) => `<button class="ll-chip${vegades(r) >= 3 ? ' sovint' : ''}" data-torna="${esc(r.id)}">${esc(r.text)}</button>`).join('')}</div>` : ''; }).join('')}` : '')
    + peuCarpeta('compres');
}
// Memòria: fitxes amb informació per consultar (no contrasenyes)
// Memòria en carpetes (Restaurants, Vins, Filosofia…). «General» és la carpeta de les fitxes sense carpeta.
const COLORS_CARPETA = ['#E03131', '#E8590C', '#F59F00', '#C2A100', '#2F9E44', '#12B886', '#0B7285', '#1C7ED6', '#3B5BDB', '#7048E8', '#A61E4D', '#E64980', '#8B5E3C', '#5C677D', '#212529'];
const carpetesReals = () => (Array.isArray(state.ajustos.carpetesMem) ? state.ajustos.carpetesMem : []);
// «Per classificar»: on arriben les fitxes que es desen des del menú Compartir de l'iPhone (només surt si en té alguna)
const PER_CLASSIFICAR = { id: 'perclass', nom: 'Per classificar', color: '#F59F00', virtual: true };
const carpetesMem = () => (state.memoria.some((f) => f.carpeta === 'perclass') ? [PER_CLASSIFICAR, ...carpetesReals()] : carpetesReals());
const carpetaDe = (f) => (carpetesMem().some((c) => c.id === f.carpeta) ? f.carpeta : '');
const carpetaActual = () => (ui.memCarpeta === 'g' ? '' : carpetesMem().some((c) => c.id === ui.memCarpeta) ? ui.memCarpeta : null);
// Un sol cop: es creen les carpetes inicials i les fitxes «Filosofia · …» passen a la carpeta Filosofia
function preparaCarpetes() {
  if (state.ajustos.carpetesFetes) return;
  const llista = [...carpetesReals()];
  const troba = (nom, color) => {
    let c = llista.find((x) => normal(x.nom) === normal(nom));
    if (!c) { c = { id: nouId('cm'), nom, color }; llista.push(c); }
    return c;
  };
  troba('Restaurants', '#E8590C'); troba('Vins', '#A61E4D');
  if (state.memoria.some((f) => /^filosofia\s*·/i.test(f.titol))) {
    const fc = troba('Filosofia', '#7048E8');
    state.memoria.forEach((f) => {
      const m = f.titol.match(/^filosofia\s*·\s*(.+)$/i);
      if (m) { f.titol = m[1].trim(); f.carpeta = fc.id; }
      else if (normal(f.titol) === normal('Missatges per a la Mamen')) f.carpeta = fc.id;
    });
  }
  state.ajustos.carpetesMem = llista; state.ajustos.carpetesFetes = true; save();
}
// Text amb els enllaços (http…) que es poden tocar
const ambEnllacos = (t) => esc(t).replace(/https?:\/\/[^\s<]+/g, (u) => `<a href="${u}" target="_blank" rel="noopener">${u.replace(/^https?:\/\/(www\.)?/, '').slice(0, 40)}${u.length > 48 ? '…' : ''}</a>`);
function filaFitxa(x, ambCarpeta) {
  const c = ambCarpeta ? carpetesMem().find((k) => k.id === carpetaDe(x)) : null;
  return `<div class="mur-mem" data-memcerca="${esc(normal(x.titol + ' ' + x.text))}"><div class="mur-accions"><button type="button" class="acc-esborra" data-memtreu="${esc(x.id)}">Esborra</button></div><div class="mem-fitxa${ui.memSel ? ' triant' + (ui.memSel.includes(x.id) ? ' triada' : '') : ''}" data-memobre="${esc(x.id)}"${c ? ` style="--c:${esc(c.color)}"` : ''}>
        ${ambCarpeta ? `<small class="mem-de">${esc(c ? c.nom : 'General')}</small>` : ''}<b>${esc(x.titol)}</b>${x.text ? `<p>${ambEnllacos(x.text)}</p>` : ''}
        ${(x.imatges || []).length ? `<div class="mem-imgs">${x.imatges.map((im) => `<button class="rec-img" data-memimg="${esc(x.id)}|${esc(im.id)}"><img src="${esc(im.mini)}" alt=""></button>`).join('')}</div>` : ''}
        <div class="mem-accions"><button class="enllac" data-memcomparteix="${esc(x.id)}">Comparteix</button>${x.text ? `<button class="enllac" data-memcopia="${esc(x.id)}">Copia</button>` : ''}<button class="enllac" data-memimprimeix="${esc(x.id)}">Imprimeix</button><button class="enllac" data-memmou="${esc(x.id)}">Mou a…</button><button class="enllac" data-memedita="${esc(x.id)}">Edita</button></div>
      </div></div>`;
}
function vistaMemoria() {
  preparaCarpetes();
  if (ui.memEdita) ui.memSel = null;
  const ed = ui.memEdita, f = ed && ed !== 'nova' ? state.memoria.find((x) => x.id === ed) : null;
  const perOrdre = (a, b) => a.titol.localeCompare(b.titol, 'ca');
  if (ed) {
    const cSel = f ? carpetaDe(f) : (carpetaActual() || '');
    const cOn = carpetaActual() === null ? null : carpetesMem().find((c) => c.id === carpetaActual());
    const torna = carpetaActual() === null ? 'Carpetes' : cOn ? cOn.nom : 'General';
    return `<div class="sat-cap"><button class="sat-torna" data-memcancela aria-label="Torna">‹ ${esc(torna)}</button><h1>${f ? 'Fitxa' : 'Fitxa nova'}</h1></div>
    <form id="formMem" class="mem-form" autocomplete="off" data-memid="${esc(f ? f.id : 'nova')}">
      <label>Títol<textarea name="titol" data-triatot rows="1" class="mem-titol" placeholder="Nom del restaurant, del vi, de la pòlissa, una frase…" maxlength="500" required>${esc(f?.titol || '')}</textarea></label>
      <div class="mem-web"><button type="button" class="btn" data-memcerca-web="google">Cerca a Google</button><button type="button" class="btn" data-memcerca-web="maps">Cerca a Maps</button><button type="button" class="btn" data-memenganxa>Enganxa les dades</button></div>
      <p class="help mem-web-ajuda">Busca el nom a Google o a Maps, copia l'adreça, el telèfon o la web (a Maps: Compartir → Copiar) i torna aquí a prémer «Enganxa les dades».</p>
      <label>Carpeta<select name="carpeta"><option value="">General</option>${carpetesMem().map((c) => `<option value="${esc(c.id)}"${c.id === cSel ? ' selected' : ''}>${esc(c.nom)}</option>`).join('')}</select></label>
      <label>Què has de recordar<textarea name="text" rows="6" maxlength="3000" placeholder="Adreça, telèfon, enllaç, el que calgui…">${esc(f?.text || '')}</textarea></label>
      <div class="rec-bloc"><span>Fotos</span>
        ${f && (f.imatges || []).length ? `<div class="rec-imgs">${f.imatges.map((im) => `<button type="button" class="rec-img" data-memimg="${esc(f.id)}|${esc(im.id)}"><img src="${esc(im.mini)}" alt=""></button>`).join('')}</div>` : ''}
        ${!f ? '<p class="help">Toca «Fet» i després, amb «Edita», hi podràs afegir fotos.</p>'
          : usuari() ? `<label class="btn rec-afoto${ui.memPujant ? ' ocupat' : ''}"><input type="file" id="memFoto" accept="image/*" multiple hidden ${ui.memPujant ? 'disabled' : ''}>${ui.memPujant ? 'Pujant…' : 'Afegeix fotos'}</label>`
          : '<p class="help">Per afegir fotos cal haver entrat amb el teu correu.</p>'}
      </div>
      <div class="grp"><button class="btn primary">Fet</button><span class="mem-desat help">Els canvis es desen sols</span>
        ${f ? `<button type="button" class="enllac perill" data-memesborra="${esc(f.id)}">Esborra</button>` : ''}</div>
    </form>`;
  }
  const cid = carpetaActual();
  if (cid === null) ui.memSel = null;
  if (cid === null) {
    // Inici de Memòria: les carpetes i un cercador que busca a totes
    const totes = [{ id: 'g', nom: 'General', color: '#868E96' }, ...carpetesMem()];
    const compta = (c) => state.memoria.filter((x) => carpetaDe(x) === (c.id === 'g' ? '' : c.id)).length;
    return capSatel('Memòria') + `<p class="help">Les teves coses per consultar, ordenades en carpetes. Les contrasenyes, millor a l'app Contrasenyes de l'iPhone.</p>
      ${state.memoria.length ? '<input id="cercaMemG" type="search" class="doc-cerca" placeholder="Cerca a totes les carpetes…" autocomplete="off">' : ''}
      <div id="memCarpetes"><div class="mem-carpetes">${totes.map((c) => murCarpeta(c.id === 'g' || c.virtual ? '' : 'mem', c.id, `<button class="mem-carpeta" data-memcarpeta="${esc(c.id)}" style="--c:${esc(c.color)}"><b>${esc(c.nom)}</b><small>${compta(c) === 1 ? '1 fitxa' : compta(c) + ' fitxes'}</small></button>`)).join('')}
        <button class="mem-carpeta nova" data-memnovacarpeta><b>+ Nova carpeta</b></button></div>${AJUDA_CARPETES}</div>
      <div class="mem-llista" id="memResultats" hidden>${state.memoria.slice().sort(perOrdre).map((x) => filaFitxa(x, true)).join('')}</div>
      <p class="help buit" id="memRes" hidden>No hi ha cap fitxa que hi coincideixi.</p>`;
  }
  // Dins d'una carpeta
  const c = carpetesMem().find((k) => k.id === cid);
  const fitxes = state.memoria.filter((x) => carpetaDe(x) === cid).sort(perOrdre);
  return `<div class="sat-cap"><button class="sat-torna" data-memcarpetes aria-label="Torna a les carpetes">‹ Carpetes</button><h1>${esc(c ? c.nom : 'General')}</h1></div>
    ${ui.memSel ? `<div class="mem-sel-barra"><b id="memSelN">${memSelN(ui.memSel.length)}</b><button class="btn" data-memsel="totes">${ui.memSel.length && ui.memSel.length >= fitxes.length ? 'Desmarca-les totes' : 'Selecciona-les totes'}</button>
      <button class="btn mem-sel-envia" data-memsel="envia"${ui.memSel.length ? '' : ' disabled'}>Envia…</button>
      <button class="btn primary mem-sel-mou" data-memsel="mou"${ui.memSel.length ? '' : ' disabled'}>Mou a…${ui.memSel.length ? ' (' + ui.memSel.length + ')' : ''}</button>
      <button class="btn mem-sel-esborra" data-memsel="esborra"${ui.memSel.length ? '' : ' disabled'}>Esborra${ui.memSel.length ? ' (' + ui.memSel.length + ')' : ''}</button><button class="enllac" data-memsel="surt">Fet</button></div>
      <p class="help">Toca les fitxes que vulguis moure a una altra carpeta o esborrar.</p>`
    : `<div class="mem-barra">${fitxes.length > 3 ? '<input id="cercaMem" type="search" placeholder="Cerca…" autocomplete="off">' : ''}<button class="btn" data-memcopiat title="Fa una fitxa amb el text que has copiat">Enganxa</button><button class="btn primary" data-memnova>Nova fitxa</button></div><div class="mem-sota-barra"><button class="enllac enganxa" data-enganxa="memoria">Enganxa notes d'una altra app</button>${fitxes.length > 1 ? '<button class="enllac" data-memsel="entra">Selecciona per moure o esborrar</button>' : ''}</div>`}
    ${fitxes.length ? `<div class="mem-llista">${fitxes.map((x) => filaFitxa(x, false)).join('')}</div><p class="help buit" id="memRes" hidden>No hi ha cap fitxa que hi coincideixi.</p>
      ${fitxes.length > 1 ? '<div class="grp centre"><button class="btn" data-memimprimeix="totes">Imprimeix totes les fitxes</button></div>' : ''}`
      : '<p class="help buit">Aquesta carpeta encara és buida.</p>'}
    ${c && !c.virtual ? `<div class="ll-peu"><button class="enllac" data-envmem>Envia una còpia</button><button class="enllac" data-memcarpnom>Canvia el nom</button><button class="enllac" data-memcarpcolor>Canvia el color</button><button class="enllac perill" data-memcarpesborra>Esborra la carpeta</button></div>` : ''}`;
}
// Navegació i gestió de carpetes
$('#main').addEventListener('click', async (e) => {
  const t = e.target;
  const cb = t.closest('[data-memcarpeta]');
  if (cb) { ui.memCarpeta = cb.dataset.memcarpeta; render(); window.scrollTo(0, 0); return; }
  if (t.closest('[data-memcarpetes]')) { ui.memCarpeta = null; render(); window.scrollTo(0, 0); return; }
  if (t.closest('[data-memnovacarpeta]')) {
    const nom = await demanaText('Nom de la carpeta nova', '', { max: 40, placeholder: 'Restaurants, Vins, Receptes…' });
    if (!nom || !nom.trim()) return;
    const ja = carpetesMem().find((c) => normal(c.nom) === normal(nom.trim()));
    if (ja) { ui.memCarpeta = ja.id; render(); return; }
    const c = { id: nouId('cm'), nom: nom.trim().slice(0, 40), color: COLORS_CARPETA[carpetesMem().length % COLORS_CARPETA.length] };
    state.ajustos.carpetesMem = [...carpetesReals(), c]; save(); ui.memCarpeta = c.id; render(); window.scrollTo(0, 0);
    return;
  }
  const c = carpetesMem().find((k) => k.id === ui.memCarpeta);
  if (!c) return;
  if (t.closest('[data-memcarpnom]')) {
    const nom = await demanaText('Nom de la carpeta', c.nom, { max: 40 });
    if (nom && nom.trim()) { state.ajustos.carpetesMem = carpetesReals().map((k) => (k.id === c.id ? { ...k, nom: nom.trim().slice(0, 40) } : k)); save(); render(); }
    return;
  }
  if (t.closest('[data-memcarpcolor]')) {
    const i = COLORS_CARPETA.indexOf(c.color);
    state.ajustos.carpetesMem = carpetesReals().map((k) => (k.id === c.id ? { ...k, color: COLORS_CARPETA[(i + 1) % COLORS_CARPETA.length] } : k)); save(); render();
    return;
  }
  const es = t.closest('[data-memcarpesborra]');
  if (es) {
    const n = state.memoria.filter((x) => carpetaDe(x) === c.id).length;
    if (es.dataset.segur !== '1') { es.dataset.segur = '1'; es.textContent = n ? `Segur? Les ${n} fitxes passaran a General` : "Segur? Toca'l un altre cop"; return; }
    state.memoria.forEach((x) => { if (x.carpeta === c.id) x.carpeta = ''; });
    state.ajustos.carpetesMem = carpetesReals().filter((k) => k.id !== c.id); save();
    ui.memCarpeta = null; render(); toast('Carpeta esborrada');
  }
});
// Cercador de l'inici: busca a totes les carpetes
$('#main').addEventListener('input', (e) => {
  if (e.target.id !== 'cercaMemG') return;
  const q = normal(e.target.value.trim());
  const res = document.getElementById('memResultats'), carp = document.getElementById('memCarpetes');
  if (carp) carp.hidden = Boolean(q);
  if (res) res.hidden = !q;
  let n = 0;
  document.querySelectorAll('#memResultats [data-memcerca]').forEach((el) => { const si = Boolean(q) && el.dataset.memcerca.includes(q); el.hidden = !si; if (si) n++; });
  const r = document.getElementById('memRes'); if (r) r.hidden = !q || n > 0;
});
// Documents: qualsevol fitxer (fotos, PDF, Word, Excel…) al núvol privat de cada persona, i enllaços a pàgines web.
// A l'app només hi ha el nom, el tipus i, a les fotos, una miniatura.
const dataDoc = (iso) => { const d = new Date(iso); return isNaN(d) ? '' : `${d.getDate()} ${MESOS[d.getMonth()].slice(0, 3)}. ${d.getFullYear()}`; };
const extDoc = (d) => (d.tipus === 'enllac' ? '' : ((d.nomFitxer || d.cami || '').match(/\.([a-z0-9]{1,8})$/i) || [])[1]?.toLowerCase() || '');
const CATS_DOC = [
  { id: 'foto', nom: 'Fotos', c: '#2F9E44' },
  { id: 'pdf', nom: 'PDF', c: '#E03131' },
  { id: 'text', nom: 'Textos', c: '#1C7ED6', ext: 'doc docx odt rtf txt pages md' },
  { id: 'full', nom: 'Fulls de càlcul', c: '#2B8A3E', ext: 'xls xlsx ods csv numbers' },
  { id: 'presentacio', nom: 'Presentacions', c: '#E8590C', ext: 'ppt pptx odp key' },
  { id: 'enllac', nom: 'Enllaços', c: '#7048E8' },
  { id: 'altres', nom: 'Altres', c: '#868E96' },
];
function catDoc(d) {
  if (d.tipus === 'enllac') return 'enllac';
  if (/^image\//.test(d.tipus || '')) return 'foto';
  const e = extDoc(d);
  if (d.tipus === 'application/pdf' || e === 'pdf') return 'pdf';
  const c = CATS_DOC.find((x) => x.ext && x.ext.split(' ').includes(e));
  return c ? c.id : 'altres';
}
const midaText = (b) => (!b ? '' : b < 1024 * 1024 ? Math.max(1, Math.round(b / 1024)) + ' kB' : (b / 1024 / 1024).toFixed(1).replace('.', ',') + ' MB');
const etiquetaDoc = (d) => (d.tipus === 'enllac' ? 'WEB' : extDoc(d).toUpperCase().slice(0, 4) || 'DOC');
const domini = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return u; } };
const graellaDocs = (docs, q) => `<div class="doc-graella">${docs.map((x) => {
  const cat = CATS_DOC.find((c) => c.id === catDoc(x)), cerca = normal([x.titol, x.nomFitxer, x.url, cat.nom, etiquetaDoc(x), nomCarpeta('docs', carpetaItem('docs', x))].filter(Boolean).join(' '));
  return `<div class="mur-g doc-mur" data-doccerca="${esc(cerca)}"${q && !cerca.includes(q) ? ' hidden' : ''}><div class="mur-accions"><button type="button" class="acc-esborra" data-doctreu="${esc(x.id)}">Esborra</button></div><button class="mur-cos doc-fitxa" data-docobre="${esc(x.id)}">
        <span class="doc-mini" style="--fc:${cat.c}">${x.mini ? `<img src="${esc(x.mini)}" alt="">` : `<b>${esc(etiquetaDoc(x))}</b>`}</span>
        <span class="doc-nom">${esc(x.titol)}</span><small>${esc(x.tipus === 'enllac' ? domini(x.url) : [dataDoc(x.creat), midaText(x.mida)].filter(Boolean).join(' · '))}</small></button></div>`;
}).join('')}</div>`;
function vistaDocuments() {
  const entrat = Boolean(usuari());
  const tots = state.documents.slice().sort((a, b) => String(b.creat || '').localeCompare(String(a.creat || '')));
  const q = normal((ui.docCerca || '').trim());
  const cid = carpetaOberta('docs');
  if (cid === null) {
    // Inici: les carpetes i un cercador que busca a totes
    return capSatel('Documents') + `<p class="help">Guarda qualsevol document en carpetes: fotos, PDF, contractes, pressupostos, enllaços a pàgines web… Es guarden al teu núvol privat: només tu els pots veure.</p>
      ${!entrat ? '<p class="help avis-doc">Per guardar documents cal haver entrat amb el teu correu (toca el logo de Galàxia, a dalt).</p>' : ''}
      ${tots.length > 1 ? `<input id="cercaDoc" type="search" class="doc-cerca" placeholder="Cerca a totes les carpetes…" autocomplete="off" value="${esc(ui.docCerca || '')}">` : ''}
      <div id="docInici"${q ? ' hidden' : ''}>${graellaCarpetes('docs', ['document', 'documents'])}</div>
      <div id="docTots"${q ? '' : ' hidden'}>${graellaDocs(tots, q)}</div><p class="help buit" id="docRes" hidden>No hi ha cap document que hi coincideixi.</p>`;
  }
  const delaCarpeta = tots.filter((d) => carpetaItem('docs', d) === cid);
  const presents = CATS_DOC.filter((c) => delaCarpeta.some((d) => catDoc(d) === c.id));
  const filtre = presents.some((c) => c.id === ui.docFiltre) ? ui.docFiltre : '';
  const docs = filtre ? delaCarpeta.filter((d) => catDoc(d) === filtre) : delaCarpeta;
  return `<div class="sat-cap"><button class="sat-torna" data-cftorna="docs" aria-label="Torna a les carpetes">‹ Carpetes</button><h1>${esc(nomCarpeta('docs', cid))}</h1></div>
    ${entrat ? `<div class="doc-botons">
        <button class="btn primary" data-escaneja ${ui.docPujant ? 'disabled' : ''}>Escaneja</button>
        <label class="btn doc-afegeix${ui.docPujant ? ' ocupat' : ''}"><input type="file" id="docFoto" accept="image/*" capture="environment" hidden ${ui.docPujant ? 'disabled' : ''}>${ui.docPujant ? 'Pujant…' : 'Fes una foto'}</label>
        <label class="btn${ui.docPujant ? ' ocupat' : ''}"><input type="file" id="docFitxer" multiple hidden ${ui.docPujant ? 'disabled' : ''}>Afegeix fitxers</label>
        <button class="btn" data-docenllac ${ui.docPujant ? 'disabled' : ''}>Afegeix un enllaç</button></div>
      ${delaCarpeta.length > 3 ? `<input id="cercaDoc" type="search" class="doc-cerca" placeholder="Cerca en aquesta carpeta…" autocomplete="off" value="${esc(ui.docCerca || '')}">` : ''}
      ${presents.length > 1 ? `<div class="doc-filtres"><button class="${!filtre ? 'on' : ''}" data-docfiltre="">Tots</button>${presents.map((c) => `<button class="${filtre === c.id ? 'on' : ''}" data-docfiltre="${c.id}" style="--fc:${c.c}">${esc(c.nom)}</button>`).join('')}</div>` : ''}`
      : '<p class="help avis-doc">Per guardar documents cal haver entrat amb el teu correu (toca el logo de Galàxia, a dalt).</p>'}
    ${docs.length ? graellaDocs(docs, q) + '<p class="help buit" id="docRes" hidden>No hi ha cap document que hi coincideixi.</p>'
      : '<p class="help buit">Aquesta carpeta encara és buida.</p>'}
    ${entrat ? '<p class="help doc-consell"><b>Escaneja</b> fa la foto, troba les vores del full, el posa dret, li treu les ombres i el deixa net, com un escàner; pots fer-ne diverses pàgines i es desa en un sol PDF. <b>Fes una foto</b> la guarda tal qual. Mida màxima de cada fitxer: 50 MB. Per escanejar diverses pàgines en un sol PDF: a l\'app <b>Arxius</b> de l\'iPhone, toca <b>···</b> → <b>Escanejar documents</b>, desa\'l i després tria\'l amb «Afegeix fitxers».</p>' : ''}
    ${peuCarpeta('docs')}`;
}

// ---------- Notes de veu: safata amb el que es dicta (doble toc al darrere) o es grava aquí ----------
const durText = (s) => { s = Math.round(s || 0); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
const quanNota = (iso) => { const d = new Date(iso); return isNaN(d) ? '' : `${d.getDate()} ${MESOS[d.getMonth()].slice(0, 3)}. · ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
function vistaVeu() {
  const notes = state.notesveu.slice().sort((a, b) => String(b.creat || '').localeCompare(String(a.creat || '')));
  const grava = ui.grava;
  return capSatel('Notes de veu') + `<p class="help">Apunta el que se t'acudi sense haver d'escriure: després ho envies a Recordatoris, a una llista, a Compres o a Memòria.</p>
    ${usuari() ? `<div class="veu-grava">
        <button type="button" class="veu-boto${grava ? ' grava' : ''}" id="veuBoto" aria-label="${grava ? 'Atura i desa' : 'Grava una nota de veu'}">
          <svg viewBox="0 0 24 24" aria-hidden="true">${grava ? '<rect x="7" y="7" width="10" height="10" rx="2"/>' : '<path d="M12 15a3.5 3.5 0 0 0 3.5-3.5v-5a3.5 3.5 0 0 0-7 0v5A3.5 3.5 0 0 0 12 15zm6-3.5a6 6 0 0 1-12 0H4.5a7.5 7.5 0 0 0 6.75 7.46V21h1.5v-2.04a7.5 7.5 0 0 0 6.75-7.46z"/>'}</svg></button>
        <p class="veu-estat" id="veuEstat">${grava ? `<b class="veu-temps" id="veuTemps">${durText((Date.now() - grava.inici) / 1000)}</b> Gravant… toca per acabar` : ui.veuPujant ? 'Desant l\'àudio…' : '<b>Toca per gravar</b> i torna a tocar per acabar. També pots mantenir-lo premut mentre parles.'}</p>
      </div>` : '<p class="help avis-doc">Per gravar àudios cal haver entrat amb el teu correu (toca el logo de Galàxia, a dalt).</p>'}
    <form id="formNotaVeu" class="rec-nou" autocomplete="off"><input id="notaVeuText" placeholder="O escriu-la o dicta-la amb el teclat" maxlength="2000" enterkeyhint="done"><button class="btn primary">Apunta</button></form>
    <button class="enllac enganxa" data-veucopiat>Enganxa el que has copiat</button>
    ${notes.length ? `<div class="veu-llista">${notes.map((n) => `<div class="mur-g veu-mur"><div class="mur-accions"><button type="button" class="acc-esborra" data-notatreu="${esc(n.id)}">Esborra</button></div><div class="mur-cos veu-nota" data-nota="${esc(n.id)}">
        <small class="veu-de">${n.audio ? 'Àudio' : n.origen === 'dictat' ? 'Dictat' : 'Escrit'} · ${esc(quanNota(n.creat))}${n.audio ? ' · ' + durText(n.audio.durada) : ''}</small>
        ${n.text ? `<p>${ambEnllacos(n.text)}</p>` : '<p class="veu-sense">Sense text: escolta-la i escriu què diu per poder-la enviar.</p>'}
        ${n.audio ? `<div class="veu-audio" id="veuAudio-${esc(n.id)}"><button type="button" class="btn" data-notaescolta="${esc(n.id)}">▶ Escolta</button></div>` : ''}
        <div class="mem-accions"><button class="btn primary" data-notaenvia="${esc(n.id)}">Envia a…</button><button class="enllac" data-notaedita="${esc(n.id)}">${n.text ? 'Corregeix' : 'Escriu què diu'}</button><button class="enllac perill" data-notatreu="${esc(n.id)}">Esborra</button></div>
      </div></div>`).join('')}</div>` : '<p class="help buit">No tens cap nota de veu. Les que dictis amb el doble toc al darrere del mòbil també arribaran aquí.</p>'}
    ${usuari() ? `<details class="ajuda veu-drecera"><summary>Dictar amb el doble toc al darrere del mòbil</summary>
      <p>Prepara una drecera a l'app <b>Dreceres</b> que escolti en català i enviï el que diguis aquí. Necessitaràs aquest enllaç:</p>
      <div class="grp"><button class="btn" id="veuNota">Copia l'enllaç per a Notes de veu</button><button class="btn" id="veuBusca">Busca notes al núvol</button></div></details>` : ''}`;
}
// Gravació amb el micròfon (MediaRecorder): un toc comença i un altre acaba; si es manté premut, acaba en deixar-lo anar
let veuRec = null, veuTros = [], veuRellotge = null, veuPremut = 0;
async function comencaGravacio() {
  if (ui.grava || ui.veuPujant) return;
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { toast('Aquest aparell no pot gravar des de l\'app.'); return; }
  let flux;
  try { flux = await navigator.mediaDevices.getUserMedia({ audio: true }); }
  catch (x) { toast("Cal donar permís al micròfon. Si no surt la pregunta, mira Ajustos de l'iPhone → Safari → Micròfon.", 6000); return; }
  const tipus = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'].find((t) => MediaRecorder.isTypeSupported?.(t)) || '';
  veuRec = new MediaRecorder(flux, tipus ? { mimeType: tipus } : undefined);
  veuTros = [];
  veuRec.ondataavailable = (e) => { if (e.data && e.data.size) veuTros.push(e.data); };
  veuRec.onstop = () => desaGravacio(flux);
  veuRec.start(1000);
  ui.grava = { inici: Date.now() };
  render();
  veuRellotge = setInterval(() => { const t = document.getElementById('veuTemps'); if (t && ui.grava) t.textContent = durText((Date.now() - ui.grava.inici) / 1000); if (ui.grava && Date.now() - ui.grava.inici > 10 * 60 * 1000) aturaGravacio(); }, 500);
}
function aturaGravacio() {
  clearInterval(veuRellotge);
  if (veuRec && veuRec.state !== 'inactive') veuRec.stop();
}
async function desaGravacio(flux) {
  flux.getTracks().forEach((t) => t.stop());
  const durada = ui.grava ? (Date.now() - ui.grava.inici) / 1000 : 0;
  const tipus = (veuRec?.mimeType || 'audio/mp4').split(';')[0];
  ui.grava = null; veuRec = null;
  const blob = new Blob(veuTros, { type: tipus }); veuTros = [];
  if (durada < 1 || !blob.size) { render(); toast('Massa curta: no s\'ha desat'); return; }
  ui.veuPujant = true; render();
  const id = nouId('nv');
  try {
    const cami = await sync().pujaDoc(id, blob, tipus, tipus.includes('webm') ? 'webm' : 'm4a');
    state.notesveu.push({ id, text: '', origen: 'gravat', audio: { cami, tipus, durada: Math.round(durada) }, creat: new Date().toISOString() });
    save(); toast('Nota de veu desada');
  } catch (x) {
    toast(navigator.onLine ? "No s'ha pogut desar l'àudio. Torna-ho a provar." : "Cal connexió a internet per desar l'àudio.", 5000);
  }
  ui.veuPujant = false; render();
}
$('#main').addEventListener('pointerdown', (e) => {
  if (!e.target.closest('#veuBoto')) return;
  veuPremut = Date.now();
  if (!ui.grava) comencaGravacio();
});
$('#main').addEventListener('pointerup', (e) => {
  if (!e.target.closest('#veuBoto') || !veuPremut) return;
  const llarg = Date.now() - veuPremut > 900; veuPremut = 0;
  // Mantingut premut: s'acaba en deixar-lo anar. Un toc curt: segueix gravant fins al proper toc.
  if (ui.grava && (llarg || Date.now() - ui.grava.inici > 900)) aturaGravacio();
});
$('#main').addEventListener('contextmenu', (e) => { if (e.target.closest('#veuBoto')) e.preventDefault(); });
// Escriure una nota
$('#main').addEventListener('submit', (e) => {
  if (e.target.id !== 'formNotaVeu') return;
  e.preventDefault();
  const i = document.getElementById('notaVeuText'), text = i.value.trim();
  if (!text) { i.focus(); return; }
  state.notesveu.push({ id: nouId('nv'), text: text.slice(0, 2000), origen: 'escrit', creat: new Date().toISOString() });
  save(); render(); document.getElementById('notaVeuText')?.focus();
});
$('#main').addEventListener('click', async (e) => {
  if (!e.target.closest('[data-veucopiat]')) return;
  const text = await textCopiat('Enganxa el text', "Mantén el dit a la casella i tria «Enganxar».");
  if (!text || !text.trim()) return;
  const n = { id: nouId('nv'), text: text.trim().slice(0, 2000), origen: 'escrit', creat: new Date().toISOString() };
  state.notesveu.push(n); save(); render();
  toastDesfes('Nota afegida', () => { state.notesveu = state.notesveu.filter((x) => x.id !== n.id); save(); render(); });
});
function treuNota(n, missatge) {
  const lloc = state.notesveu.indexOf(n), copia = { ...n };
  state.notesveu.splice(lloc, 1); save(); render();
  toastDesfes(missatge, () => { state.notesveu.splice(Math.max(0, lloc), 0, copia); save(); render(); });
  if (copia.audio) setTimeout(() => { if (!state.notesveu.some((x) => x.id === copia.id)) sync()?.esborraDoc(copia.audio.cami).catch(() => {}); }, 7000);
}
$('#main').addEventListener('click', async (e) => {
  const t = e.target;
  if (t.closest('#veuBusca')) {
    try {
      const r = await sync().notesDelNuvol(); render();
      toast(`Al núvol: ${r.total} notes (${r.esborrades} esborrades). Noves aquí: ${r.noves}`, 6000);
    } catch (x) { toast(navigator.onLine ? "No s'ha pogut consultar el núvol." : 'Cal connexió a internet.'); }
    return;
  }
  if (t.closest('#veuNota')) {
    try {
      const url = (await sync().enllacVeu(false)) + '&nota=1';
      try { await navigator.clipboard.writeText(url); toast("Enllaç copiat: posa'l a la drecera", 4000); } catch (x) { prompt('Copia aquest enllaç:', url); }
    } catch (x) { toast(navigator.onLine ? "No s'ha pogut preparar l'enllaç." : 'Cal connexió a internet.'); }
    return;
  }
  const es = t.closest('[data-notaescolta]');
  if (es) {
    const n = state.notesveu.find((x) => x.id === es.dataset.notaescolta);
    if (!n?.audio) return;
    es.disabled = true; es.textContent = 'Carregant…';
    try {
      const url = await sync().urlDoc(n.audio.cami);
      const caixa = document.getElementById('veuAudio-' + n.id);
      if (caixa) { caixa.innerHTML = `<audio controls autoplay preload="auto" src="${esc(url)}"></audio>`; }
    } catch (x) { es.disabled = false; es.textContent = '▶ Escolta'; toast(navigator.onLine ? "No s'ha pogut carregar l'àudio." : 'Cal connexió a internet.'); }
    return;
  }
  const ed = t.closest('[data-notaedita]');
  if (ed) {
    const n = state.notesveu.find((x) => x.id === ed.dataset.notaedita);
    if (!n) return;
    const nou = await demanaText(n.text ? 'Corregeix la nota' : 'Què diu l\'àudio?', n.text || '', { max: 2000 });
    if (nou !== null) { n.text = nou.trim().slice(0, 2000); save(); render(); }
    return;
  }
  const tr = t.closest('[data-notatreu]');
  if (tr) { const n = state.notesveu.find((x) => x.id === tr.dataset.notatreu); if (n) treuNota(n, 'Nota esborrada'); return; }
  const en = t.closest('[data-notaenvia]');
  if (!en) return;
  const n = state.notesveu.find((x) => x.id === en.dataset.notaenvia);
  if (!n) return;
  if (!n.text) {
    const nou = await demanaText('Què diu l\'àudio?', '', { max: 2000, ajuda: 'Escriu-ho per poder-ho enviar.' });
    if (!nou || !nou.trim()) return;
    n.text = nou.trim().slice(0, 2000); save(); render();
  }
  const on = await triaOpcio('Envia a…', [['rec', 'Recordatoris', ''], ['llista', 'Una llista', ''], ['compres', 'Compres', 'A la botiga que triïs'], ['memoria', 'Memòria', 'A la carpeta que triïs'], ['agenda', "L'Agenda", 'Com a pla nou']]);
  if (!on) return;
  const text = n.text.trim(), ara = new Date().toISOString();
  if (on === 'rec') {
    state.recordatoris.push({ id: nouId('r'), text: text.slice(0, 300), creat: ara });
    treuNota(n, 'Enviada a Recordatoris');
  } else if (on === 'llista') {
    const ll = state.llistes.slice().sort(perOrdreLl);
    if (!ll.length) { toast('Encara no tens cap llista. Crea\'n una a Llista.'); return; }
    const lid = await triaOpcio('A quina llista?', ll.map((l) => [l.id, l.nom, nomCarpeta('llista', carpetaItem('llista', l))]));
    const l = state.llistes.find((x) => x.id === lid);
    if (!l) return;
    l.items.push({ id: nouId('i'), text: text.slice(0, 200), fet: false });
    treuNota(n, `Enviada a ${l.nom}`);
  } else if (on === 'compres') {
    const b = await triaOpcio('A quina botiga?', [...carpetesDe('compres').map((c) => [c.id, c.nom, '']), ['g', 'General', 'Sense botiga']]);
    if (!b) return;
    const carpeta = b === 'g' ? '' : b;
    text.split(/\s*(?:,|\n| i )\s*/).map((x) => x.trim()).filter(Boolean).forEach((x) => {
      const igual = state.compres.find((y) => normal(y.text) === normal(x) && carpetaItem('compres', y) === carpeta);
      if (igual) igual.fet = false;
      else state.compres.push({ id: nouId('c'), text: x.slice(0, 200), fet: false, carpeta, creat: ara });
    });
    treuNota(n, `Enviada a ${nomCarpeta('compres', carpeta)}`);
  } else if (on === 'memoria') {
    const c = await triaOpcio('A quina carpeta?', [['g', 'General', ''], ...carpetesMem().map((k) => [k.id, k.nom, ''])]);
    if (!c) return;
    const [titol, ...resta] = text.split('\n');
    state.memoria.push({ id: nouId('m'), titol: titol.slice(0, 500), text: (titol.length > 500 ? titol.slice(500) +'\n' : '') + resta.join('\n'), carpeta: c === 'g' ? '' : c, creat: ara });
    treuNota(n, 'Enviada a Memòria');
  } else if (on === 'agenda') {
    treuNota(n, 'Nota passada a l\'Agenda');
    obreForm(null, { titol: text.slice(0, 120) });
  }
});
// ---------- Escàner de documents: troba les vores, endreça la perspectiva, millora la imatge i en fa un PDF ----------
// Fa servir OpenCV.js (es baixa la primera vegada, uns 10 MB, i després queda guardat)
let cvPromesa = null;
// Compte: l'objecte «cv» té un mètode «then» i no es pot passar mai a una promesa (es quedaria en un bucle infinit).
// Per això la promesa es resol sense valor i després es fa servir window.cv.
function carregaCV() {
  if (window.cv && window.cv.Mat) return Promise.resolve(true);
  if (!cvPromesa) {
    cvPromesa = carregaScript('https://cdn.jsdelivr.net/npm/@techstark/opencv-js@4.10.0-release.1/dist/opencv.js')
      .then(() => new Promise((ok, ko) => {
        const t0 = Date.now();
        (function mira() {
          const c = window.cv;
          if (c && c.Mat) { try { delete c.then; } catch (x) { /* res */ } ok(true); return; }
          if (Date.now() - t0 > 90000) { ko(new Error('OpenCV no arrenca')); return; }
          setTimeout(mira, 100);
        })();
      }))
      .catch((e) => { cvPromesa = null; throw e; });
  }
  return cvPromesa;
}
const distP = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
// Ordena quatre punts: dalt-esquerra, dalt-dreta, baix-dreta, baix-esquerra
function ordenaPunts(p) {
  const s = p.map((q) => q.x + q.y), d = p.map((q) => q.x - q.y);
  return [p[s.indexOf(Math.min(...s))], p[d.indexOf(Math.max(...d))], p[s.indexOf(Math.max(...s))], p[d.indexOf(Math.min(...d))]];
}
const puntsPerDefecte = (w, h) => [{ x: w * 0.06, y: h * 0.06 }, { x: w * 0.94, y: h * 0.06 }, { x: w * 0.94, y: h * 0.94 }, { x: w * 0.06, y: h * 0.94 }];
// Busca el quadrilàter més gran de la foto (el full)
function detectaVores(cv, font) {
  // Es proven diverses maneres de trobar el full (vores, contrast amb el fons, llum desigual)
  // i es queda el quadrilàter més gran que no sigui la foto sencera.
  const petit = redueixCanvas(font, 900), f = font.width / petit.width, W = petit.width, H = petit.height;
  const src = cv.imread(petit), gris = new cv.Mat();
  cv.cvtColor(src, gris, cv.COLOR_RGBA2GRAY);
  let millor = null, millorArea = W * H * 0.1;
  const prova = (bin) => {
    const cont = new cv.MatVector(), jer = new cv.Mat();
    cv.findContours(bin, cont, jer, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
    for (let i = 0; i < cont.size(); i++) {
      const c = cont.get(i), a = cv.contourArea(c);
      if (a > millorArea && a < W * H * 0.985) {
        // Primer el contorn tal qual; si no fa quatre cantonades, el seu contorn convex
        const hull = new cv.Mat(); cv.convexHull(c, hull, false, true);
        for (const forma of [c, hull]) {
          const peri = cv.arcLength(forma, true);
          for (const eps of [0.02, 0.03, 0.045, 0.06]) {
            const ap = new cv.Mat(); cv.approxPolyDP(forma, ap, eps * peri, true);
            if (ap.rows === 4 && cv.isContourConvex(ap)) {
              const pts = [0, 1, 2, 3].map((j) => ({ x: ap.data32S[j * 2], y: ap.data32S[j * 2 + 1] }));
              const ar = Math.abs(cv.contourArea(ap));
              if (ar > millorArea) { millorArea = ar; millor = pts; }
              ap.delete(); break;
            }
            ap.delete();
          }
        }
        hull.delete();
      }
      c.delete();
    }
    cont.delete(); jer.delete();
  };
  const tmp = new cv.Mat(), k = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(5, 5)), k2 = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(9, 9));
  try {
    // 1) Vores (Canny) amb dues sensibilitats
    for (const [b, t1, t2] of [[5, 40, 140], [7, 20, 80]]) {
      cv.GaussianBlur(gris, tmp, new cv.Size(b, b), 0);
      cv.Canny(tmp, tmp, t1, t2);
      cv.dilate(tmp, tmp, k);
      prova(tmp);
      if (millor) break;   // el mètode més precís primer: si ja l'ha trobat, no cal provar els altres
    }
    // 2) El full és més clar que el fons: llindar automàtic (Otsu) i tancament
    cv.GaussianBlur(gris, tmp, new cv.Size(7, 7), 0);
    cv.threshold(tmp, tmp, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);
    cv.morphologyEx(tmp, tmp, cv.MORPH_CLOSE, k2);
    if (!millor) prova(tmp);
    // 3) Llum desigual: llindar adaptatiu
    cv.GaussianBlur(gris, tmp, new cv.Size(7, 7), 0);
    cv.adaptiveThreshold(tmp, tmp, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 51, 5);
    cv.morphologyEx(tmp, tmp, cv.MORPH_CLOSE, k2);
    if (!millor) prova(tmp);
  } finally { [src, gris, tmp, k, k2].forEach((m) => m.delete()); }
  return millor ? ordenaPunts(millor.map((p) => ({ x: p.x * f, y: p.y * f }))) : null;
}
function redueixCanvas(c, max) {
  const s = Math.min(1, max / Math.max(c.width, c.height));
  if (s === 1) return c;
  const o = document.createElement('canvas');
  o.width = Math.round(c.width * s); o.height = Math.round(c.height * s);
  o.getContext('2d').drawImage(c, 0, 0, o.width, o.height);
  return o;
}
function giraCanvas(c) {
  const o = document.createElement('canvas');
  o.width = c.height; o.height = c.width;
  const x = o.getContext('2d');
  x.translate(o.width, 0); x.rotate(Math.PI / 2); x.drawImage(c, 0, 0);
  return o;
}
// Endreça el full (perspectiva) i el millora: «millorat» (fons blanc, sense ombres), «bn» (blanc i negre) o «color» (tal qual)
function endrecaFull(cv, font, punts, filtre) {
  const [tl, tr, br, bl] = punts;
  let w = Math.max(distP(tl, tr), distP(bl, br)), h = Math.max(distP(tl, bl), distP(tr, br));
  const s = Math.min(1, 1800 / Math.max(w, h)); w = Math.max(10, Math.round(w * s)); h = Math.max(10, Math.round(h * s));
  const src = cv.imread(font), dst = new cv.Mat();
  const a = cv.matFromArray(4, 1, cv.CV_32FC2, [tl.x, tl.y, tr.x, tr.y, br.x, br.y, bl.x, bl.y]);
  const b = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, w, 0, w, h, 0, h]);
  const M = cv.getPerspectiveTransform(a, b);
  cv.warpPerspective(src, dst, M, new cv.Size(w, h), cv.INTER_LINEAR, cv.BORDER_REPLICATE);
  [src, a, b, M].forEach((m) => m.delete());
  const out = document.createElement('canvas');
  try {
    if (filtre === 'color') { cv.imshow(out, dst); return out; }
    const rgb = new cv.Mat(); cv.cvtColor(dst, rgb, cv.COLOR_RGBA2RGB);
    const k = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(9, 9));
    // Treu les ombres: cada canal es divideix pel seu fons (que s'estima esborrant la lletra)
    const neteja = (ch) => {
      const fons = new cv.Mat(), dif = new cv.Mat();
      cv.dilate(ch, fons, k); cv.medianBlur(fons, fons, 21);
      cv.absdiff(ch, fons, dif); cv.bitwise_not(dif, ch);
      cv.normalize(ch, ch, 0, 255, cv.NORM_MINMAX);
      fons.delete(); dif.delete();
    };
    if (filtre === 'bn') {
      const g = new cv.Mat(); cv.cvtColor(rgb, g, cv.COLOR_RGB2GRAY); neteja(g);
      cv.threshold(g, g, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);
      cv.imshow(out, g); g.delete();
    } else {
      const canals = new cv.MatVector(); cv.split(rgb, canals);
      for (let i = 0; i < 3; i++) { const ch = canals.get(i); neteja(ch); canals.set(i, ch); ch.delete(); }
      cv.merge(canals, rgb); canals.delete();
      // Una mica més de contrast
      rgb.convertTo(rgb, -1, 1.15, -20);
      cv.imshow(out, rgb);
    }
    rgb.delete(); k.delete();
  } finally { dst.delete(); }
  return out;
}
// Pantalla de l'escàner
const escn = { pagines: [], font: null, punts: null, filtre: 'millorat', pas: 'foto', resultat: null };
function obreEscaner() {
  document.querySelector('.escaner')?.remove();
  Object.assign(escn, { pagines: [], font: null, punts: null, pas: 'foto', resultat: null });
  const d = document.createElement('div');
  d.className = 'escaner';
  d.innerHTML = '<input type="file" id="escFoto" accept="image/*" capture="environment" hidden><div class="esc-cap"><button type="button" class="sat-torna" data-esc="tanca">Cancel·la</button><b id="escTitol">Escaneja</b></div><div class="esc-cos" id="escCos"></div><div class="esc-peu" id="escPeu"></div>';
  document.body.appendChild(d);
  d.addEventListener('click', clicEscaner);
  d.querySelector('#escFoto').addEventListener('change', fotoEscaner);
  carregaCV().catch(() => {});   // es comença a baixar mentre es fa la foto
  pintaEscaner();
  d.querySelector('#escFoto').click();
}
function tancaEscaner() { document.querySelector('.escaner')?.remove(); escn.pagines = []; escn.font = null; escn.resultat = null; }
async function fotoEscaner(e) {
  const f = e.target.files?.[0]; e.target.value = '';
  if (!f) return;
  escn.pas = 'carrega'; pintaEscaner();
  try {
    const im = await carregaImg(f);
    escn.font = redueix(im, 2600);
    await carregaCV();
    const trobats = detectaVores(window.cv, escn.font);
    escn.punts = trobats || puntsPerDefecte(escn.font.width, escn.font.height);
    escn.auto = Boolean(trobats); escn.trobat = Boolean(trobats);
    if (trobats) { processa(); escn.pas = 'resultat'; } else escn.pas = 'ajusta';
  } catch (x) {
    toast(navigator.onLine ? "No s'ha pogut preparar l'escàner. Torna-ho a provar." : "La primera vegada cal connexió per preparar l'escàner.", 5000);
    escn.pas = 'foto';
  }
  pintaEscaner();
}
function processa() {
  escn.resultat = endrecaFull(window.cv, escn.font, escn.punts, escn.filtre);
}
function pintaEscaner() {
  const cos = document.getElementById('escCos'), peu = document.getElementById('escPeu'), tit = document.getElementById('escTitol');
  if (!cos) return;
  const n = escn.pagines.length;
  tit.textContent = n ? `Escaneja · pàgina ${n + 1}` : 'Escaneja';
  const tira = n ? `<div class="esc-tira">${escn.pagines.map((p, i) => `<span><img src="${p.toDataURL('image/jpeg', 0.5)}" alt=""><small>${i + 1}</small></span>`).join('')}</div>` : '';
  if (escn.pas === 'foto') {
    cos.innerHTML = `<p class="esc-ajuda">Fes una foto del document sobre una superfície fosca i ben il·luminada, que s'hi vegin les quatre vores.</p>`;
    peu.innerHTML = tira + `<button type="button" class="btn primary" data-esc="foto">Fes la foto${n ? ' de la pàgina ' + (n + 1) : ''}</button>${n ? `<button type="button" class="btn" data-esc="desa">Desa (${n} ${n === 1 ? 'pàgina' : 'pàgines'})</button>` : ''}`;
  } else if (escn.pas === 'carrega') {
    cos.innerHTML = `<p class="esc-ajuda"><b>Preparant l'escàner…</b><br>La primera vegada pot trigar una mica, perquè es baixa l'eina que troba les vores.</p>`;
    peu.innerHTML = tira;
  } else if (escn.pas === 'ajusta') {
    cos.innerHTML = '<div class="esc-foto" id="escFotoCaixa"><canvas id="escVista"></canvas><svg id="escSvg"><polygon id="escPoli"/></svg>'
      + [0, 1, 2, 3].map((i) => `<span class="esc-punt" data-punt="${i}"></span>`).join('') + '</div>';
    peu.innerHTML = `<p class="esc-ajuda">${escn.trobat === false ? "No he trobat les vores soles: a" : 'A'}rrossega les cantonades fins a les vores del document.</p>
      <div class="esc-botons"><button type="button" class="btn" data-esc="gira">Gira ↻</button><button type="button" class="btn" data-esc="refes">Torna a fer la foto</button><button type="button" class="btn primary" data-esc="endavant">Endavant</button></div>`;
    dibuixaAjust();
  } else if (escn.pas === 'resultat') {
    cos.innerHTML = '<div class="esc-res"></div>' + (escn.auto ? '<p class="esc-ajuda esc-auto">Vores trobades soles. Si el full no ha quedat bé, toca <b>‹ Ajusta</b>.</p>' : '');
    cos.firstChild.appendChild(escn.resultat);
    peu.innerHTML = `<div class="seg esc-filtres">${[['millorat', 'Millorat'], ['bn', 'Blanc i negre'], ['color', 'Color']].map(([k, nom]) => `<button type="button" aria-pressed="${escn.filtre === k}" data-escfiltre="${k}">${nom}</button>`).join('')}</div>
      <div class="esc-botons"><button type="button" class="btn" data-esc="ajusta">‹ Ajusta</button><button type="button" class="btn" data-esc="mes">+ Una altra pàgina</button><button type="button" class="btn primary" data-esc="desa">Desa${n ? ` (${n + 1} pàgines)` : ''}</button></div>`;
  }
}
// Dibuixa la foto amb les quatre cantonades que es poden arrossegar
function dibuixaAjust() {
  const caixa = document.getElementById('escFotoCaixa'), cv = document.getElementById('escVista');
  if (!caixa || !escn.font) return;
  const maxW = Math.min(innerWidth - 64, 700), maxH = Math.max(200, innerHeight - 320);
  const s = Math.min(maxW / escn.font.width, maxH / escn.font.height);
  const w = Math.round(escn.font.width * s), h = Math.round(escn.font.height * s);
  const dpr = devicePixelRatio || 1;
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); cv.style.width = w + 'px'; cv.style.height = h + 'px';
  cv.getContext('2d').drawImage(escn.font, 0, 0, cv.width, cv.height);
  caixa.style.width = w + 'px'; caixa.style.height = h + 'px';
  caixa.dataset.escala = s;
  const svg = document.getElementById('escSvg'); svg.setAttribute('width', w); svg.setAttribute('height', h);
  posaPunts();
}
function posaPunts() {
  const caixa = document.getElementById('escFotoCaixa');
  if (!caixa) return;
  const s = Number(caixa.dataset.escala);
  document.getElementById('escPoli').setAttribute('points', escn.punts.map((p) => `${p.x * s},${p.y * s}`).join(' '));
  caixa.querySelectorAll('[data-punt]').forEach((el) => { const p = escn.punts[el.dataset.punt]; el.style.left = p.x * s + 'px'; el.style.top = p.y * s + 'px'; });
}
document.addEventListener('pointerdown', (e) => {
  const el = e.target.closest('.escaner [data-punt]');
  if (!el) return;
  e.preventDefault();
  el.setPointerCapture(e.pointerId);
  const caixa = document.getElementById('escFotoCaixa'), s = Number(caixa.dataset.escala), i = Number(el.dataset.punt);
  const r = caixa.getBoundingClientRect();
  const mou = (ev) => {
    escn.punts[i] = { x: Math.max(0, Math.min(escn.font.width, (ev.clientX - r.left) / s)), y: Math.max(0, Math.min(escn.font.height, (ev.clientY - r.top) / s)) };
    posaPunts();
  };
  const fi = () => { el.removeEventListener('pointermove', mou); el.removeEventListener('pointerup', fi); el.removeEventListener('pointercancel', fi); el.classList.remove('mou'); };
  el.classList.add('mou');
  el.addEventListener('pointermove', mou); el.addEventListener('pointerup', fi); el.addEventListener('pointercancel', fi);
});
async function clicEscaner(e) {
  const fb = e.target.closest('[data-escfiltre]');
  if (fb) { escn.filtre = fb.dataset.escfiltre; processa(); pintaEscaner(); return; }
  const b = e.target.closest('[data-esc]');
  if (!b) return;
  const acc = b.dataset.esc;
  if (acc === 'tanca') { if (escn.pagines.length && b.dataset.segur !== '1') { b.dataset.segur = '1'; b.textContent = 'Segur? Es perdran'; return; } tancaEscaner(); return; }
  if (acc === 'foto' || acc === 'refes') { escn.pas = 'foto'; pintaEscaner(); document.getElementById('escFoto').click(); return; }
  if (acc === 'gira') {
    const w = escn.font.height;
    escn.font = giraCanvas(escn.font);
    escn.punts = escn.punts.map((p) => ({ x: w - p.y, y: p.x }));
    escn.punts = ordenaPunts(escn.punts);
    pintaEscaner(); return;
  }
  if (acc === 'endavant') {
    b.disabled = true; b.textContent = 'Endreçant…';
    await new Promise((r) => setTimeout(r, 30));
    try { escn.punts = ordenaPunts(escn.punts); processa(); escn.pas = 'resultat'; } catch (x) { toast("No s'ha pogut endreçar la imatge."); }
    pintaEscaner(); return;
  }
  if (acc === 'ajusta') { escn.pas = 'ajusta'; escn.auto = false; pintaEscaner(); return; }
  if (acc === 'mes') { escn.pagines.push(escn.resultat); escn.resultat = null; escn.font = null; escn.pas = 'foto'; pintaEscaner(); document.getElementById('escFoto').click(); return; }
  if (acc === 'desa') {
    if (escn.resultat) { escn.pagines.push(escn.resultat); escn.resultat = null; }
    if (!escn.pagines.length) return;
    // Diverses pàgines: cadascuna en un full (contractes) o totes juntes en un sol full (DNI, targetes)
    let unFull = false;
    if (escn.pagines.length > 1) {
      const op = await triaOpcio('Com el vols desar?', [
        ['pagines', 'Una pàgina per full', 'Contractes, informes, factures de diversos fulls'],
        ['unfull', 'Tot en un sol full', 'DNI, targetes: les cares juntes, com una fotocòpia'],
      ]);
      if (!op) { escn.pas = 'foto'; pintaEscaner(); return; }
      unFull = op === 'unfull';
    }
    const titol = await demanaText('Nom del document', (unFull ? 'DNI ' : 'Document ') + new Date().toLocaleDateString('ca-ES'), { max: 80 });
    if (titol === null) { escn.pas = 'foto'; pintaEscaner(); return; }
    const rep = docRepetit({ titol: titol.trim() || 'Document' });
    if (rep && !(await confirmaDocRepetit(rep))) { escn.pas = 'foto'; pintaEscaner(); return; }
    b.disabled = true; b.textContent = 'Desant…';
    try { await desaEscaneig(unFull ? [muntaFull(escn.pagines)] : escn.pagines, (titol.trim() || 'Document').slice(0, 80)); tancaEscaner(); render(); toast('Document desat'); }
    catch (x) { b.disabled = false; b.textContent = 'Desa'; toast(navigator.onLine ? "No s'ha pogut desar. Torna-ho a provar." : 'Cal connexió a internet per desar.', 5000); }
  }
}
// Una pàgina es desa com a imatge (es veu i s'amplia al visor); diverses, com un PDF
// Totes les pàgines en un full DIN A4, una sota l'altra, com una fotocòpia.
// Les targetes (DNI, carnet de conduir, targeta sanitària) surten a mida real; la resta, ajustades a l'amplada.
function muntaFull(pagines) {
  const PX = 1240 / 210;                     // 150 punts per polzada: un A4 fa 1240 × 1754
  const full = document.createElement('canvas');
  full.width = 1240; full.height = 1754;
  const x = full.getContext('2d');
  x.fillStyle = '#fff'; x.fillRect(0, 0, full.width, full.height);
  const marge = 20, separacio = 12, utilAmp = 210 - marge * 2, utilAlt = 297 - marge * 2;
  const mides = pagines.map((c) => {
    const r = c.width / c.height, targeta = r > 1.35 && r < 1.8;   // apaïsada i amb la proporció d'una targeta
    const amp = targeta ? 85.6 : utilAmp;
    return { c, amp, alt: amp / r };
  });
  // Si no hi caben, es redueixen totes igual
  const total = mides.reduce((n, m) => n + m.alt, 0) + separacio * (mides.length - 1);
  const k = Math.min(1, utilAlt / total, ...mides.map((m) => utilAmp / m.amp));
  let y = marge;
  mides.forEach((m) => {
    const w = m.amp * k, h = m.alt * k;
    x.drawImage(m.c, Math.round((210 - w) / 2 * PX), Math.round(y * PX), Math.round(w * PX), Math.round(h * PX));
    x.strokeStyle = '#ccc'; x.lineWidth = 1; x.strokeRect(Math.round((210 - w) / 2 * PX) + .5, Math.round(y * PX) + .5, Math.round(w * PX), Math.round(h * PX));
    y += h + separacio;
  });
  return full;
}
async function desaEscaneig(pagines, titol) {
  const id = nouId('d'), mini = redueixCanvas(pagines[0], 240).toDataURL('image/jpeg', 0.6);
  const aBlob = (c) => new Promise((ok) => c.toBlob(ok, 'image/jpeg', 0.85));
  let blob, tipus, ext;
  if (pagines.length === 1) { blob = await aBlob(pagines[0]); tipus = 'image/jpeg'; ext = 'jpg'; }
  else {
    if (!window.jspdf) await carregaScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    const { jsPDF } = window.jspdf;
    let pdf = null;
    for (const c of pagines) {
      const amp = 210, alt = Math.round(210 * c.height / c.width);
      const dades = c.toDataURL('image/jpeg', 0.82);
      if (!pdf) pdf = new jsPDF({ unit: 'mm', format: [amp, alt], orientation: alt >= amp ? 'portrait' : 'landscape' });
      else pdf.addPage([amp, alt], alt >= amp ? 'portrait' : 'landscape');
      pdf.addImage(dades, 'JPEG', 0, 0, amp, alt);
    }
    blob = pdf.output('blob'); tipus = 'application/pdf'; ext = 'pdf';
  }
  const cami = await sync().pujaDoc(id, blob, tipus, ext);
  state.documents.push({ id, titol, tipus, cami, nomFitxer: titol + '.' + ext, mida: blob.size, mini, carpeta: carpetaOberta('docs') || '', creat: new Date().toISOString() });
  save();
}
$('#main').addEventListener('click', (e) => { if (e.target.closest('[data-escaneja]')) obreEscaner(); });
addEventListener('resize', () => { if (escn.pas === 'ajusta') dibuixaAjust(); });
// Píndoles: la d'avui i les dels dies anteriors, i les preferides (guardades a Ajustos, es sincronitzen)
const preferides = () => (Array.isArray(state.ajustos.pindoles) ? state.ajustos.pindoles : []);
function filaPindola(text, data) {
  const fav = preferides().includes(text);
  return `<div class="pd-fila">${data ? `<small>${esc(data)}</small>` : ''}<p>${esc(text)}</p>
    <button class="pd-fav${fav ? ' si' : ''}" data-pdfav="${esc(text)}" aria-pressed="${fav}" aria-label="${fav ? 'Treu de preferides' : 'Marca com a preferida'}"><svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8 3.6 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.6 0 5.7 3.5 4.5 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg></button></div>`;
}
const frasesMeves = () => (Array.isArray(state.ajustos.frasesMeves) ? state.ajustos.frasesMeves : []);
function pindola(d = parseYmd(avui())) {
  const ds = ymd(d), meves = frasesMeves().filter((f) => f.des && f.des <= ds);
  if (meves.length) {
    const primera = meves.find((f) => f.des === ds);
    if (primera) return primera.text;
    const n = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
    if (n % 3 === 0) return meves[Math.floor(n / 3) % meves.length].text;
  }
  return pindolaDelDia(d);
}
function vistaPindoles() {
  const tab = ['pref', 'meves'].includes(ui.pindTab) ? ui.pindTab : 'dies';
  const pestanyes = `<div class="seg pd-seg"><button aria-pressed="${tab === 'dies'}" data-pdtab="dies">Aquests dies</button><button aria-pressed="${tab === 'pref'}" data-pdtab="pref">Preferides${preferides().length ? ' (' + preferides().length + ')' : ''}</button><button aria-pressed="${tab === 'meves'}" data-pdtab="meves">Les meves${frasesMeves().length ? ' (' + frasesMeves().length + ')' : ''}</button></div>`;
  if (tab === 'meves') {
    const llista = frasesMeves().slice().reverse();
    return capSatel('Píndoles') + pestanyes + `<p class="help">Escriu les frases que t'agradin i sortiran barrejades amb les altres com a frase del dia: la primera vegada, l'endemà d'afegir-la.</p>
      <form id="formFrase" class="rec-nou" autocomplete="off"><input id="fraseText" placeholder="Escriu una frase…" maxlength="200" enterkeyhint="done"><button class="btn primary">Afegeix</button></form>
      <button class="enllac enganxa" data-enganxa="frases">Enganxa les frases que has copiat</button>
      ${llista.length ? `<div class="pd-llista">${llista.map((f) => `<div class="pd-fila pd-meva"><p>${esc(f.text)}</p>
        <div class="mem-accions"><button class="enllac" data-frasedita="${esc(f.id)}">Edita</button><button class="enllac perill" data-frasetreu="${esc(f.id)}">Treu</button></div></div>`).join('')}</div>`
        : '<p class="help buit">Encara no n\'has afegit cap.</p>'}`;
  }
  if (tab === 'pref') {
    const llista = preferides().slice().reverse();
    return capSatel('Píndoles') + pestanyes + (llista.length ? `<div class="pd-llista">${llista.map((t) => filaPindola(t, '')).join('')}</div>`
      : '<p class="help buit">Encara no tens cap preferida. Marca les frases que més t\'agradin i les trobaràs aquí.</p>');
  }
  const avuiD = parseYmd(avui()), inici = new Date(avuiD.getFullYear(), 0, 1);
  const n = Math.min(ui.pindDies || 30, Math.round((avuiD - inici) / 86400000) + 1);
  let html = '';
  for (let i = 0; i < n; i++) {
    const d = addDays(avuiD, -i);
    html += filaPindola(pindola(d), i === 0 ? 'Avui' : i === 1 ? 'Ahir' : cap(dataLlarga(ymd(d))));
  }
  const queden = Math.round((avuiD - inici) / 86400000) + 1 - n;
  return capSatel('Píndoles') + pestanyes + `<div class="pd-llista">${html}</div>`
    + (queden > 0 ? '<div class="grp centre"><button class="btn" data-pdmes>Mostra\'n més</button></div>' : '');
}
const VISTES = { inici: vistaInici, aniversaris: vistaAniversaris, recordatoris: vistaRecordatoris, llista: vistaLlista, compres: vistaCompres, memoria: vistaMemoria, documents: vistaDocuments, veu: vistaVeu, pindoles: vistaPindoles, propers: vistaPropers, calendari: vistaCalendari, gent: vistaGent, ajustos: vistaAjustos, entrada: vistaEntrada };
// Aspecte: Clar, Fosc o Automàtic (com l'iPhone). Es guarda amb el compte i també en aquest aparell (per a la guia)
function aplicaTema() {
  const t = state.ajustos.tema, r = document.documentElement;
  if (t === 'clar') r.dataset.theme = 'light'; else if (t === 'fosc') r.dataset.theme = 'dark'; else delete r.dataset.theme;
  desaPref('tema', t || 'auto');
  const fosc = t === 'fosc' || (t !== 'clar' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', fosc ? '#0E0B09' : '#221C18');
}
let tempsDesaMem = null;
function render() {
  // Abans de redibuixar, la fitxa de Memòria oberta es desa (així no es perd res en sortir-ne)
  if (document.getElementById('formMem')) { clearTimeout(tempsDesaMem); desaFormMem(document.getElementById('formMem')); }
  aplicaTema();
  if (!VISTES[ui.view]) ui.view = 'propers';
  if (modeAgenda() && SATEL.some((x) => x.id === ui.view) && ui.view !== 'aniversaris' && !(ui.view === 'recordatoris' && ui.recObert)) ui.view = 'inici';
  document.body.classList.toggle('mode-agenda', modeAgenda());
  if (ui.view === 'entrada' && !sync()?.disponible) ui.view = 'propers';
  document.body.classList.toggle('mode-entrada', ui.view === 'entrada');
  document.body.classList.toggle('mode-inici', ui.view === 'inici');
  document.body.classList.toggle('mode-galaxia', VISTES_GALAXIA.includes(ui.view));
  const marca = document.querySelector('.brand-nom b');
  if (marca && !marca.querySelector('.w-galaxia')) marca.innerHTML = '<span class="w-galaxia">Galàxia</span>';
  if (ui.view === 'inici') requestAnimationFrame(ajustaPortada);
  if ($('#syncBtn') && sync()?.disponible) $('#syncBtn').hidden = ui.view === 'entrada';
  $$('#tabs button').forEach((b) => b.setAttribute('aria-current', b.dataset.view === ui.view ? 'page' : 'false'));
  const focus = document.activeElement?.id === 'cerca' ? document.activeElement.selectionStart : null;
  $('#main').innerHTML = `<div class="vista vista-${ui.view}">${VISTES[ui.view]()}</div>`;
  if (focus !== null && $('#cerca')) { $('#cerca').focus(); $('#cerca').setSelectionRange(focus, focus); }
  if (ui.view === 'ajustos' && sync()) sync().bind();
  if (ui.view === 'entrada') $('.entrada input')?.focus();
  completaMinis();
}
// Les fotos que arriben per la drecera «Desa a Galàxia» no porten miniatura: es fa aquí, un sol cop
const minisProvades = new Set();
let minisEnCurs = false;
async function completaMinis() {
  if (minisEnCurs || !usuari() || !navigator.onLine) return;
  const falten = [];
  (state.memoria || []).forEach((f) => (f.imatges || []).forEach((im) => { if (!im.mini && im.cami && !minisProvades.has(im.id)) falten.push([f, im]); }));
  if (!falten.length) return;
  minisEnCurs = true;
  let fet = false;
  for (const [f, im] of falten) {
    minisProvades.add(im.id);
    try {
      const url = await sync().urlDoc(im.cami);
      const img = await new Promise((ok, ko) => { const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => ok(i); i.onerror = ko; i.src = url; });
      const mini = redueix(img, 240).toDataURL('image/jpeg', 0.6);
      const ara = state.memoria.find((x) => x.id === f.id), ii = ara && (ara.imatges || []).find((x) => x.id === im.id);
      if (ii) { ii.mini = mini; fet = true; }
    } catch (err) { /* es tornarà a provar el proper cop que s'obri l'app */ }
  }
  minisEnCurs = false;
  if (fet) { save(); render(); }
}
const fiEntrada = () => { ui.view = 'inici'; render(); };

/* ---------- Clics a la pantalla principal ---------- */
$('#tabs').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-view]');
  if (!b) return;
  ui.view = b.dataset.view; ui.persona = ''; ui.cercaGent = ''; ui.tornaA = '';
  desaPref('view', ui.view);
  if (VISTES_AGENDA.includes(ui.view)) desaPref('vistaAgenda', ui.view);
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
  if (pe) {
    if (!pe.dataset.persona && ui.tornaA) { ui.view = ui.tornaA; ui.tornaA = ''; ui.persona = ''; render(); window.scrollTo(0, 0); return; }
    ui.persona = pe.dataset.persona; ui.cercaGent = ''; ui.tornaA = ''; render(); window.scrollTo(0, 0); return;
  }
  if (t.id === 'pRenom') {
    const p = pers(ui.persona);
    demanaText('Nom del contacte', p.nom, { max: 80 }).then((n) => { if (n && n.trim()) { p.nom = n.trim(); save(); render(); } });
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
  if (e.target.dataset.dm) {
    const t = e.target, part = t.dataset.part;
    t.value = t.value.replace(/\D/g, '').slice(0, Number(t.maxLength));
    const ple = t.value.length >= t.maxLength || (part === 'd' && Number(t.value) > 3) || (part === 'm' && Number(t.value) > 1);
    if (ple && part !== 'a') {
      const seg = t.parentElement.querySelector(`[data-part="${part === 'd' ? 'm' : 'a'}"]`);
      if (seg) { seg.focus(); seg.select?.(); } else t.blur();
    } else if (ple) t.blur();
    return;
  }
  if (e.target.id === 'cercaGent') {
    ui.cercaGent = e.target.value;
    const q = normal(ui.cercaGent.trim());
    $$('.persona[data-cerca]').forEach((b) => { b.hidden = Boolean(q) && !b.dataset.cerca.includes(q); });
    $('#cercaGentX').hidden = !ui.cercaGent;
    return;
  }
  if (e.target.id === 'cerca') { ui.cerca = e.target.value; render(); }
});
$('#main').addEventListener('change', (e) => {
  const t = e.target;
  if (t.dataset.dm) {
    const pe = pers(ui.persona), k = t.dataset.dm, caixa = t.closest('.dm');
    const v = (p) => (caixa.querySelector(`[data-part="${p}"]`)?.value || '').trim();
    const d = Number(v('d')), m = Number(v('m')), a = v('a');
    if (!v('d') && !v('m') && !a) { if (pe[k]) { pe[k] = ''; save(); toast('Tret'); } return; }
    if (!v('d') || !v('m')) return;   // encara a mitges
    if (d < 1 || d > 31 || m < 1 || m > 12) { toast('Aquest dia no existeix'); return; }
    if (a && (a.length !== 4 || Number(a) < 1900 || Number(a) > new Date().getFullYear())) { if (a.length === 4) toast("L'any no sembla correcte"); return; }
    const nou = `${pad(d)}/${pad(m)}${a ? '/' + a : ''}`;
    if (pe[k] === nou) return;
    pe[k] = nou; save(); toast('Desat');
    if (!caixa.querySelector('.dm-treu')) caixa.insertAdjacentHTML('beforeend', `<button type="button" class="enllac dm-treu" data-dmtreu="${k}">Treu</button>`);
    return;
  }
  if (t.id === 'acceptaTot') {
    state.ajustos.acceptaTot = t.checked; save();
    toast(t.checked ? "Els plans que t'enviïn s'afegiran sols" : "Només s'afegiran sols els de les persones de la llista");
    if (t.checked) acceptaAutomatics();
    return;
  }
  if (t.id === 'nomMeu') { state.ajustos.nom = t.value.trim(); save(); toast('Desat'); return; }
  if (t.dataset.papp !== undefined) {
    const pe = pers(ui.persona);
    if (t.checked && !emailValid(pe.email)) { t.checked = false; toast("Primer posa el seu correu (el mateix amb què entra a l'app)"); return; }
    pe.teApp = t.checked;
    if (t.checked) convidaEmail(pe.email, pe.nom).catch(() => {});
    const nous = t.checked ? enviaAApp() : [];
    save();
    toast(!t.checked ? 'Desat: els plans nous ja no li arribaran a la seva app'
      : !usuari() ? 'Desat. Perquè li arribin, entra amb el teu correu (Ajustos → Compte)'
      : nous.length ? (nous.length === 1 ? 'Desat. Li ha arribat 1 pla a la seva app' : `Desat. Li han arribat ${nous.length} plans a la seva app`) : 'Desat: els plans on surti li arribaran a la seva app');
    return;
  }
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
  if (t.id === 'fitxerPlans' && t.files[0]) { afegeixPlans(t.files[0]); t.value = ''; }
});
function errorEntrada(err) {
  const m = String(err?.message || err || '');
  if (/NOMES_CONVIDATS|not allowed|signups? not allowed|403/i.test(m)) return "Aquesta app és només per a persones convidades. Demana a qui te l'ha passat que t'hi afegeixi i torna-ho a provar.";
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
    toast(resposta === 'si' ? 'Apuntat! Ja el tens als teus plans' : 'Fet. Ja saben que no hi vas.');
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
    state.ajustos.nom = nom; save(); fiEntrada(); toast(`Benvingut/da, ${nom}!`);
    return;
  }
  if (e.target.id === 'formPersona') {
    const nom = String(f.get('nom') || '').trim();
    if (!nom) return;
    const ja = state.persones.find((p) => normal(p.nom) === normal(nom));
    if (ja) { toast(`${ja.nom} ja hi és: t'obro la fitxa`); ui.persona = ja.id; ui.cercaGent = ''; render(); window.scrollTo(0, 0); return; }
    const nou = { id: 'pe-' + uid(), nom };
    state.persones.push(nou); save();
    ui.persona = nou.id; ui.cercaGent = ''; ui.tornaA = ''; render(); window.scrollTo(0, 0);
    toast('Contacte creat: omple les dades que vulguis');
    (document.querySelector('#main [data-pcamp="tel"]') || document.querySelector('#main [data-pcamp]'))?.focus();
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
  if (!c || e.touches.length !== 1 || c.dataset.pla.startsWith('rc|')) return;
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
  if (c.dataset.pla.startsWith('rc|')) return;
  if (!('ontouchstart' in window)) eliminaPla(trobaPla(c.dataset.pla));
});
$('#main').addEventListener('click', (e) => {
  if (ignoraClic && e.target.closest('[data-pla]')) { e.stopImmediatePropagation(); e.preventDefault(); return; }
  // Un recordatori a l'agenda: s'obre la seva fitxa i, en tornar, es torna on eres
  const rc = e.target.closest('[data-pla^="rc|"]');
  if (rc) {
    e.stopImmediatePropagation(); e.preventDefault();
    ui.recTorna = ui.view; ui.view = 'recordatoris'; ui.recObert = rc.dataset.pla.slice(3); render(); window.scrollTo(0, 0);
  }
}, true);

/* ---------- Finestreta per escriure o canviar un nom (el text surt seleccionat: el que escrius el substitueix) ---------- */
function demanaText(titol, valor = '', opcions = {}) {
  document.querySelector('.demana')?.remove();
  return new Promise((resol) => {
    const d = document.createElement('div');
    d.className = 'demana';
    d.innerHTML = '<form class="demana-caixa" autocomplete="off"><label>' + esc(titol)
      + '<input name="v" type="' + (opcions.tipus || 'text') + '" maxlength="' + (opcions.max || 300) + '" placeholder="' + esc(opcions.placeholder || '') + '" enterkeyhint="done" autocapitalize="sentences"></label>'
      + (opcions.ajuda ? '<p class="help">' + esc(opcions.ajuda) + '</p>' : '')
      + '<div class="grp"><button type="button" class="btn" data-dm-no>Cancel·la</button><button class="btn primary">Desa</button></div></form>';
    document.body.appendChild(d);
    const inp = d.querySelector('input');
    inp.value = valor;
    const acaba = (v) => { d.remove(); resol(v); };
    d.querySelector('form').addEventListener('submit', (e) => { e.preventDefault(); acaba(inp.value); });
    d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('[data-dm-no]')) acaba(null); });
    inp.addEventListener('keydown', (e) => { if (e.key === 'Escape') acaba(null); });
    inp.focus();
    try { inp.setSelectionRange(0, inp.value.length); } catch (x) { inp.select(); }
    setTimeout(() => { try { inp.setSelectionRange(0, inp.value.length); } catch (x) { /* res */ } }, 40);
  });
}

function enganxaText(titol, ajuda) {
  document.querySelector('.demana')?.remove();
  return new Promise((resol) => {
    const d = document.createElement('div');
    d.className = 'demana';
    d.innerHTML = '<form class="demana-caixa" autocomplete="off"><label>' + esc(titol)
      + '<textarea name="v" rows="9" placeholder="Enganxa-hi el text…"></textarea></label><p class="help">' + esc(ajuda) + '</p>'
      + '<div class="grp"><button type="button" class="btn" data-dm-no>Cancel·la</button><button class="btn primary">Afegeix-ho</button></div></form>';
    document.body.appendChild(d);
    const t = d.querySelector('textarea');
    const acaba = (v) => { d.remove(); resol(v); };
    d.querySelector('form').addEventListener('submit', (e) => { e.preventDefault(); acaba(t.value); });
    d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('[data-dm-no]')) acaba(null); });
    t.focus();
  });
}
// Neteja les línies copiades: treu vinyetes, caselles i números del davant, i les buides
const liniesNetes = (text) => String(text || '').split(/\r?\n/)
  .map((l) => l.replace(/^\s*(?:[-–—•·*◦○●▪▫□■☐☑✓✔✗➤>]+|\[[ xX]?\]|\(?\d{1,3}[.)]|[a-z][.)](?=\s))\s*/u, '').replace(/\s+/g, ' ').trim())
  .filter(Boolean);
const AJUDA_ENGANXA = "Copia la llista de l'altra app (Recordatorios, Notes, Notebook, Outlook…) i enganxa-la aquí. Cada línia serà un element; les repetides se salten.";

/* ---------- Galàxia: botons del cercle, aniversaris i recordatoris ---------- */
let gxPrem = null, gxLlarg = false;
const VISTES_AGENDA = ['propers', 'calendari', 'gent', 'ajustos'];
$('#main').addEventListener('pointerdown', (e) => {
  if (!e.target.closest('#gxAgenda')) return;
  gxLlarg = false; clearTimeout(gxPrem);
  gxPrem = setTimeout(() => { gxLlarg = true; navigator.vibrate?.(15); obreForm(null, { data: avui() }); }, 550);
});
['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => $('#main').addEventListener(ev, () => clearTimeout(gxPrem), true));
$('#main').addEventListener('contextmenu', (e) => { if (e.target.closest('#gxAgenda')) e.preventDefault(); });
function obreAgendaMes() {
  ui.view = 'calendari'; ui.calMode = 'mes'; desaPref('calMode', 'mes');
  ui.diaSel = avui(); ui.cursor = new Date(); ui.persona = '';
  render(); window.scrollTo(0, 0);
}
// Si l'app torna a primer pla després d'una estona (més de 10 minuts) amb el calendari, torna al mes d'avui
let amagadaDes = 0;
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') { amagadaDes = Date.now(); return; }
  if (amagadaDes && Date.now() - amagadaDes > 10 * 60 * 1000 && ui.view === 'calendari' && !document.querySelector('#dlg[open]')) obreAgendaMes();
});
$('#main').addEventListener('click', (e) => {
  if (e.target.closest('#gxAgenda')) {
    if (gxLlarg) { gxLlarg = false; return; }
    // L'Agenda s'obre sempre al calendari en vista de mes, situat en el dia d'avui
    obreAgendaMes(); return;
  }
  const s = e.target.closest('[data-sat]');
  if (s) {
    const sat = SATEL.find((x) => x.id === s.dataset.sat);
    if (sat?.aviat) { toast(`${sat.nom}: aviat`); return; }
    ui.view = s.dataset.sat; ui.llista = ''; ui.memEdita = ''; ui.recObert = ''; ui.recTorna = ''; ui.memCarpeta = null; ui.memSel = null; ui.compTot = false; ui.llCarpeta = null; ui.docCarpeta = null; ui.compCarpeta = null; ui.docCerca = ''; render(); window.scrollTo(0, 0); return;
  }
  const f = e.target.closest('[data-fitxa]');
  if (f) { ui.tornaA = ui.view === 'aniversaris' ? 'aniversaris' : ''; ui.view = 'gent'; ui.persona = f.dataset.fitxa; render(); window.scrollTo(0, 0); return; }
  const fet = e.target.closest('[data-recfet]');
  if (fet) {
    const r = state.recordatoris.find((x) => x.id === fet.dataset.recfet);
    if (!r) return;
    fet.closest('li').classList.add('fet');
    setTimeout(() => marcaFet(r), 380);
    return;
  }
  const ed = e.target.closest('[data-recedita]');
  if (ed) {
    const r = state.recordatoris.find((x) => x.id === ed.dataset.recedita);
    if (!r) return;
    ui.recObert = r.id; render(); window.scrollTo(0, 0);
  }
});
$('#main').addEventListener('submit', (e) => {
  if (e.target.id !== 'formRec') return;
  e.preventDefault();
  const text = $('#recText').value.trim();
  if (!text) { $('#recText').focus(); return; }
  const igual = pendentsRec().find((x) => normal(x.text) === normal(text));
  if (igual) {
    $('#recText').value = '';
    e.target.parentElement.querySelector('.ja-hi-es')?.remove();
    e.target.insertAdjacentHTML('afterend', `<p class="ja-hi-es">«${esc(igual.text)}» ja és als recordatoris</p>`);
    const avis = e.target.nextElementSibling; setTimeout(() => avis?.remove(), 2600);
    const li = document.querySelector(`li[data-rec="${CSS.escape(igual.id)}"]`);
    if (li) { li.classList.remove('ressalta'); void li.offsetWidth; li.classList.add('ressalta'); }
    $('#recText').focus();
    return;
  }
  const n = recNou(), id = 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  state.recordatoris.push({ id, text: text.slice(0, 300), creat: new Date().toISOString(),
    ...(n.data ? { data: n.data, hora: n.hora || '' } : {}), ...(n.important ? { important: true } : {}), ...(n.lloc ? { lloc: n.lloc, llocUrl: n.llocUrl || '' } : {}) });
  const fotos = n.fotos.slice();
  ui.recNou = null; ui.recNouData = false; ui.recNouText = '';
  save(); render();
  $('#recText')?.focus();
  if (fotos.length) pujaFotosRecNou(id, fotos);
});

// «Tota la compra»: el que falta de totes les botigues junt, per imprimir-ho o compartir-ho en un sol full
const botiguesAmbPendents = () => [...carpetesDe('compres'), { id: '', nom: 'General', color: '#868E96' }]
  .map((c) => ({ c, items: state.compres.filter((r) => !r.fet && carpetaItem('compres', r) === c.id) }))
  .filter((x) => x.items.length);
function vistaTotaCompra() {
  const grups = botiguesAmbPendents(), total = grups.reduce((n, g) => n + g.items.length, 0);
  return `<div class="sat-cap"><button class="sat-torna" data-comptotsurt aria-label="Torna a les botigues">‹ Botigues</button><h1 class="h1-curt">Tota la compra</h1></div>
    <p class="help">Tot el que tens per comprar, botiga per botiga. Per afegir coses, entra a cada botiga.</p>
    ${total ? grups.map((g) => `<h3 class="fam-titol tc-botiga" style="--fc:${esc(g.c.color)}">${esc(g.c.nom)} <small>${g.items.length}</small></h3>
      <ul class="rec-llista">${g.items.map((it) => `<li data-item="${esc(it.id)}">
        <button class="rec-check" data-chk="compres||${esc(it.id)}" aria-label="Comprat"></button>
        <button class="rec-text" data-itedita="compres||${esc(it.id)}"><span>${esc(it.text)}</span></button></li>`).join('')}</ul>`).join('')
      + '<div class="ll-peu"><button class="btn primary" data-comprescomparteix>Comparteix-ho tot</button><button class="btn" data-comprescimprimeix>Imprimeix-ho tot</button></div>'
      : '<p class="help buit">No falta res a cap botiga.</p>'}`;
}
// Text i full d'impressió de la compra: d'una botiga (per famílies) o de totes (per botigues)
function compraPerCompartir() {
  if (ui.compTot) {
    const grups = botiguesAmbPendents();
    return { titol: 'Llista de la compra', grups: grups.map((g) => ({ nom: g.c.nom, items: g.items.map((r) => r.text) })) };
  }
  const pend = state.compres.filter((r) => !r.fet && carpetaItem('compres', r) === botigaAra());
  return { titol: 'Llista de la compra · ' + nomCarpeta('compres', botigaAra()),
    grups: FAMILIES.map((f) => ({ nom: f.nom, items: pend.filter((r) => familiaDe(r) === f.id).map((r) => r.text) })).filter((g) => g.items.length) };
}
$('#main').addEventListener('click', (e) => {
  if (e.target.closest('[data-comptot]')) { ui.compTot = true; render(); window.scrollTo(0, 0); return; }
  if (e.target.closest('[data-comptotsurt]')) { ui.compTot = false; render(); window.scrollTo(0, 0); }
});
// Abans d'afegir un producte: si ja és per comprar a una altra botiga, es pregunta què fer
async function repetitAltraBotiga(text, botiga) {
  const altra = state.compres.find((x) => !x.fet && normal(x.text) === normal(text) && carpetaItem('compres', x) !== botiga);
  if (!altra) return 'afegeix';
  const on = nomCarpeta('compres', carpetaItem('compres', altra)), aqui = nomCarpeta('compres', botiga);
  const op = await triaOpcio(`«${text}» ja és a la llista`, [
    ['no', "No l'afegeixis", `Ja és per comprar a ${on}`],
    ['mou', 'Mou-lo aquí', `Passa de ${on} a ${aqui}`],
    ['si', 'Afegeix-lo igualment', 'Quedarà a totes dues botigues'],
  ]);
  if (op === 'mou') { altra.carpeta = botiga; save(); render(); toast(`Ara és a ${aqui}`); return 'fet'; }
  return op === 'si' ? 'afegeix' : 'fet';
}
// ---------- Enviar una còpia (carpeta de Memòria, fitxes, llista o botiga) a una altra persona ----------
// Qui la rep l'accepta i se li copia a la seva app; després cadascú té la seva, independent.
async function triaDestinatari() {
  const amb = state.persones.filter(teApp);
  const op = await triaOpcio('A qui la vols enviar?', [...amb.map((p) => [p.email, p.nom, p.email]), ['altre', 'Un altre correu…', 'Ha de tenir Galàxia amb aquest correu']]);
  if (!op) return '';
  if (op !== 'altre') return op;
  const em = await demanaText('Correu de qui la rebrà', '', { tipus: 'email', placeholder: 'nom@exemple.com', max: 120 });
  if (!em) return '';
  if (!emailValid(em)) { toast('Aquest correu no sembla correcte.'); return ''; }
  if (normal(em) === normal(usuari()?.email || '')) { toast('Aquest correu és el teu.'); return ''; }
  return em.trim().toLowerCase();
}
const nomDe = (email) => state.persones.find((p) => normal(p.email || '') === normal(email))?.nom || email;
async function enviaCopia(tipus, titol, contingut, resum) {
  if (!usuari()) { toast('Per enviar còpies cal haver entrat amb el teu correu.'); return; }
  const per = await triaDestinatari();
  if (!per) return;
  try { await sync().enviaCopia(per, tipus, titol, contingut); toast(`Enviat a ${nomDe(per)}: ${resum}. Quan l'accepti, ja la tindrà.`, 5000); }
  catch (x) { toast(navigator.onLine ? "No s'ha pogut enviar. Torna-ho a provar." : 'Cal connexió a internet per enviar.', 5000); }
}
const fitxesPerEnviar = (llista) => llista.map((f) => ({ titol: f.titol, text: f.text || '' }));
const nFitxes = (n) => (n === 1 ? '1 fitxa' : n + ' fitxes');
$('#main').addEventListener('click', async (e) => {
  const t = e.target;
  if (t.closest('[data-envmem]')) {
    const c = carpetesMem().find((k) => k.id === carpetaActual());
    if (!c || c.virtual) return;
    const fitxes = state.memoria.filter((f) => carpetaDe(f) === c.id);
    if (!fitxes.length) { toast('Aquesta carpeta és buida.'); return; }
    await enviaCopia('memoria', c.nom, { carpeta: { nom: c.nom, color: c.color }, fitxes: fitxesPerEnviar(fitxes) }, `«${c.nom}» (${nFitxes(fitxes.length)})`);
    return;
  }
  const el = t.closest('[data-envllista]');
  if (el) {
    const l = state.llistes.find((x) => x.id === el.dataset.envllista);
    if (!l) return;
    await enviaCopia('llista', l.nom, { nom: l.nom, carpetaNom: nomCarpeta('llista', carpetaItem('llista', l)), items: l.items.map((i) => ({ text: i.text, fet: Boolean(i.fet) })) }, `«${l.nom}»`);
    return;
  }
  if (t.closest('[data-envcompres]')) {
    const cid = carpetaOberta('compres'), c = carpetesDe('compres').find((k) => k.id === cid);
    if (!c) return;
    const items = state.compres.filter((r) => carpetaItem('compres', r) === cid).map((r) => ({ text: r.text, fet: Boolean(r.fet), familia: r.familia || '', vegades: r.vegades || 0 }));
    if (!items.length) { toast('Aquesta botiga és buida.'); return; }
    await enviaCopia('compres', c.nom, { botiga: { nom: c.nom, color: c.color }, items }, `la botiga «${c.nom}»`);
  }
});
// Rebre: avís a la pantalla d'inici amb «Accepta» o «No, gràcies»
function descEnviament(x) {
  const c = x.contingut || {};
  if (x.tipus === 'memoria') return `la carpeta «${x.titol}» de Memòria (${nFitxes((c.fitxes || []).length)})`;
  if (x.tipus === 'fitxes') return `${nFitxes((c.fitxes || []).length)} de Memòria`;
  if (x.tipus === 'llista') return `la llista «${x.titol}» (${(c.items || []).length} coses)`;
  if (x.tipus === 'llistes') return `la carpeta de llistes «${x.titol}» (${(c.llistes || []).length === 1 ? '1 llista' : (c.llistes || []).length + ' llistes'})`;
  if (x.tipus === 'docs') return `${c.carpeta ? `la carpeta de documents «${x.titol}»` : 'un document'} (${(c.docs || []).length === 1 ? '1 document' : (c.docs || []).length + ' documents'})`;
  if (x.tipus === 'recordatoris') return `el recordatori «${x.titol}»`;
  if (x.tipus === 'contactes') return `el contacte ${x.titol}`;
  return `la llista de la compra de «${x.titol}» (${(c.items || []).length} productes)`;
}
function avisosEnviaments() {
  const llista = ui.enviaments || [];
  if (!llista.length) return '';
  return llista.map((x) => `<div class="env-avis"><p><b>${esc(x.de_nom || x.de_email || 'Algú')}</b> t'ha enviat ${esc(descEnviament(x))}.</p>
    <div class="grp"><button class="btn primary" data-envaccepta="${esc(x.id)}">Accepta</button><button class="btn" data-envrebutja="${esc(x.id)}">No, gràcies</button></div></div>`).join('');
}
async function acceptaEnviament(x) {
  const c = x.contingut || {}, ara = new Date().toISOString();
  if (['llistes', 'docs', 'recordatoris', 'contactes'].includes(x.tipus)) { const r = await acceptaMes(x, c); save(); return r; }
  let n = 0, rep = 0, on = '';
  if (x.tipus === 'memoria' || x.tipus === 'fitxes') {
    let carpeta = 'perclass';
    if (x.tipus === 'memoria') {
      let k = carpetesReals().find((y) => normal(y.nom) === normal(c.carpeta?.nom || x.titol));
      if (!k) { k = { id: nouId('cm'), nom: (c.carpeta?.nom || x.titol).slice(0, 40), color: c.carpeta?.color || COLORS_CARPETA[0] }; state.ajustos.carpetesMem = [...carpetesReals(), k]; }
      carpeta = k.id; on = k.nom;
    } else on = 'Per classificar';
    (c.fitxes || []).forEach((f) => {
      if (!f || !f.titol) return;
      if (fitxaRepetida(f.titol, f.text)) { rep++; return; }
      state.memoria.push({ id: nouId('m'), titol: String(f.titol).slice(0, 500), text: String(f.text || '').slice(0, 3000), carpeta, creat: ara }); n++;
    });
  } else if (x.tipus === 'llista') {
    let l = state.llistes.find((y) => normal(y.nom) === normal(c.nom || x.titol));
    if (!l) {
      const k = carpetesDe('llista').find((y) => normal(y.nom) === normal(c.carpetaNom || ''));
      l = { id: nouId('l'), nom: (c.nom || x.titol).slice(0, 60), creat: ara, items: [], carpeta: k ? k.id : '' };
      state.llistes.push(l);
    }
    on = l.nom;
    (c.items || []).forEach((i) => {
      if (!i || !i.text) return;
      if (l.items.some((y) => normal(y.text) === normal(i.text))) { rep++; return; }
      l.items.push({ id: nouId('i'), text: String(i.text).slice(0, 200), fet: Boolean(i.fet) }); n++;
    });
  } else if (x.tipus === 'compres') {
    let k = carpetesDe('compres').find((y) => normal(y.nom) === normal(c.botiga?.nom || x.titol));
    if (!k) { k = { id: nouId('cc'), nom: (c.botiga?.nom || x.titol).slice(0, 40), color: c.botiga?.color || COLORS_CARPETA[0] }; state.ajustos.carpetes_compres = [...carpetesDe('compres'), k]; }
    on = k.nom;
    (c.items || []).forEach((i) => {
      if (!i || !i.text) return;
      if (state.compres.some((y) => carpetaItem('compres', y) === k.id && normal(y.text) === normal(i.text))) { rep++; return; }
      state.compres.push({ id: nouId('c'), text: String(i.text).slice(0, 200), fet: Boolean(i.fet), carpeta: k.id, creat: ara,
        ...(i.familia ? { familia: i.familia } : {}), ...(i.vegades ? { vegades: i.vegades } : {}) }); n++;
    });
  }
  save();
  return { n, rep, on };
}
$('#main').addEventListener('click', async (e) => {
  const ac = e.target.closest('[data-envaccepta]'), rb = e.target.closest('[data-envrebutja]');
  if (!ac && !rb) return;
  const id = (ac || rb).dataset[ac ? 'envaccepta' : 'envrebutja'];
  const x = (ui.enviaments || []).find((y) => y.id === id);
  if (!x) return;
  (ac || rb).disabled = true;
  try {
    let r = null;
    if (ac) r = await acceptaEnviament(x);
    await sync().responEnviament(id, ac ? 'acceptat' : 'rebutjat');
    ui.enviaments = (ui.enviaments || []).filter((y) => y.id !== id);
    render();
    if (r) toast(`Copiat a «${r.on}»: ${r.n} ${r.n === 1 ? 'element' : 'elements'}${r.rep ? ` (${r.rep} ja els tenies)` : ''}${r.errors ? ` · ${r.errors} no s'han pogut copiar` : ''}`, 6000);
  } catch (x2) {
    (ac || rb).disabled = false;
    toast(navigator.onLine ? "No s'ha pogut fer. Torna-ho a provar." : 'Cal connexió a internet.');
  }
});
// «Envia una còpia» igual a tot arreu: qualsevol carpeta (Memòria, Llista, Compres, Documents), un document, un recordatori o un contacte
async function docsPerEnviar(docs) {
  const out = [];
  for (const d of docs) {
    const x = { titol: d.titol, tipus: d.tipus, nomFitxer: d.nomFitxer || '', mida: d.mida || 0, mini: d.mini || '' };
    if (d.tipus === 'enllac') x.url = d.url;
    else if (d.cami) { try { x.fitxer = await sync().urlDoc(d.cami, null, 7 * 86400); } catch (e) { continue; } }
    out.push(x);
  }
  return out;
}
async function enviaCarpeta(k, id) {
  if (!usuari()) { toast('Per enviar còpies cal haver entrat amb el teu correu.'); return; }
  if (k === 'mem') {
    const c = carpetesMem().find((x) => x.id === id), fitxes = state.memoria.filter((f) => carpetaDe(f) === id);
    if (!c || !fitxes.length) { toast('Aquesta carpeta és buida.'); return; }
    return enviaCopia('memoria', c.nom, { carpeta: { nom: c.nom, color: c.color }, fitxes: fitxesPerEnviar(fitxes) }, `«${c.nom}» (${nFitxes(fitxes.length)})`);
  }
  const c = carpetesDe(k).find((x) => x.id === id);
  if (!c) return;
  if (k === 'llista') {
    const ll = state.llistes.filter((l) => carpetaItem('llista', l) === id).sort(perOrdreLl);
    if (!ll.length) { toast('Aquesta carpeta és buida.'); return; }
    return enviaCopia('llistes', c.nom, { carpeta: { nom: c.nom, color: c.color }, llistes: ll.map((l) => ({ nom: l.nom, items: l.items.map((i) => ({ text: i.text, fet: Boolean(i.fet) })) })) },
      `la carpeta «${c.nom}» (${ll.length === 1 ? '1 llista' : ll.length + ' llistes'})`);
  }
  if (k === 'compres') {
    const items = state.compres.filter((r) => carpetaItem('compres', r) === id).map((r) => ({ text: r.text, fet: Boolean(r.fet), familia: r.familia || '', vegades: r.vegades || 0 }));
    if (!items.length) { toast('Aquesta botiga és buida.'); return; }
    return enviaCopia('compres', c.nom, { botiga: { nom: c.nom, color: c.color }, items }, `la botiga «${c.nom}»`);
  }
  if (k === 'docs') {
    const docs = state.documents.filter((d) => carpetaItem('docs', d) === id);
    if (!docs.length) { toast('Aquesta carpeta és buida.'); return; }
    toast('Preparant els documents…', 2500);
    return enviaCopia('docs', c.nom, { carpeta: { nom: c.nom, color: c.color }, docs: await docsPerEnviar(docs) }, `la carpeta «${c.nom}» (${docs.length === 1 ? '1 document' : docs.length + ' documents'})`);
  }
}
const recPerEnviar = (r) => ({ text: r.text, notes: r.notes || '', url: r.url || '', data: r.data || '', hora: r.hora || '', avis: r.avis || '', important: Boolean(r.important),
  lloc: r.lloc || '', llocUrl: r.llocUrl || '', subtasques: (r.subtasques || []).map((s) => ({ text: s.text, fet: Boolean(s.fet) })) });
const personaPerEnviar = (pe) => Object.fromEntries([['nom', pe.nom], ...CAMPS_CONTACTE.map((k) => [k, pe[k] || ''])].filter(([, v]) => v));
$('#main').addEventListener('click', async (e) => {
  const t = e.target;
  const ec = t.closest('[data-envcarp]');
  if (ec) {
    const k = ec.dataset.envcarp, id = k === 'mem' ? carpetaActual() : carpetaOberta(k);
    if (id) await enviaCarpeta(k, id);
    return;
  }
  if (t.closest('[data-envrec]')) {
    const r = state.recordatoris.find((x) => x.id === ui.recObert);
    if (r) await enviaCopia('recordatoris', r.text, { items: [recPerEnviar(r)] }, `el recordatori «${r.text}»`);
    return;
  }
  if (t.closest('#pEnvia')) {
    const pe = pers(ui.persona);
    if (pe) await enviaCopia('contactes', pe.nom, { persones: [personaPerEnviar(pe)] }, `el contacte ${pe.nom}`);
  }
});
// Acceptar els tipus nous
async function acceptaMes(x, c) {
  const ara = new Date().toISOString();
  let n = 0, rep = 0, on = '', errors = 0;
  const carpetaPerNom = (k, info, camp, pref) => {
    if (!info) return '';
    let f = carpetesDe(k).find((y) => normal(y.nom) === normal(info.nom));
    if (!f) { f = { id: nouId(pref), nom: String(info.nom).slice(0, 40), color: info.color || COLORS_CARPETA[0] }; state.ajustos[camp] = [...carpetesDe(k), f]; }
    return f;
  };
  if (x.tipus === 'llistes') {
    const f = carpetaPerNom('llista', c.carpeta, 'carpetes_llista', 'cl');
    on = f ? f.nom : 'Llista';
    (c.llistes || []).forEach((ll) => {
      let l = state.llistes.find((y) => carpetaItem('llista', y) === (f ? f.id : '') && normal(y.nom) === normal(ll.nom));
      if (!l) { l = { id: nouId('l'), nom: String(ll.nom).slice(0, 60), creat: ara, items: [], carpeta: f ? f.id : '' }; state.llistes.push(l); }
      (ll.items || []).forEach((i) => {
        if (!i || !i.text) return;
        if (l.items.some((y) => normal(y.text) === normal(i.text))) { rep++; return; }
        l.items.push({ id: nouId('i'), text: String(i.text).slice(0, 200), fet: Boolean(i.fet) }); n++;
      });
    });
  } else if (x.tipus === 'docs') {
    const f = carpetaPerNom('docs', c.carpeta, 'carpetes_docs', 'cd');
    const carpeta = f ? f.id : '';
    on = f ? f.nom : 'Documents';
    for (const d of (c.docs || [])) {
      if (state.documents.some((y) => carpetaItem('docs', y) === carpeta && normal(y.titol) === normal(d.titol))) { rep++; continue; }
      if (d.tipus === 'enllac') { state.documents.push({ id: nouId('d'), titol: d.titol, tipus: 'enllac', url: d.url, carpeta, creat: ara }); n++; continue; }
      try {
        const blob = await (await fetch(d.fitxer)).blob();
        const id = nouId('d'), ext = ((d.nomFitxer || '').match(/\.([a-z0-9]{1,8})$/i) || [])[1] || (d.tipus === 'application/pdf' ? 'pdf' : 'jpg');
        const cami = await sync().pujaDoc(id, blob, d.tipus || blob.type, ext);
        state.documents.push({ id, titol: d.titol, tipus: d.tipus || blob.type, cami, nomFitxer: d.nomFitxer || '', mida: blob.size, mini: d.mini || '', carpeta, creat: ara }); n++;
      } catch (err) { errors++; }
    }
  } else if (x.tipus === 'recordatoris') {
    on = 'Recordatoris';
    (c.items || []).forEach((r) => {
      if (!r || !r.text) return;
      if (state.recordatoris.some((y) => !y.fet && normal(y.text) === normal(r.text))) { rep++; return; }
      state.recordatoris.push({ ...r, id: nouId('r'), text: String(r.text).slice(0, 300), subtasques: (r.subtasques || []).map((s) => ({ id: nouId('s'), text: s.text, fet: Boolean(s.fet) })), creat: ara }); n++;
    });
  } else if (x.tipus === 'contactes') {
    on = 'Contactes';
    (c.persones || []).forEach((p) => {
      if (!p || !p.nom) return;
      let pe = state.persones.find((y) => (p.email && normal(y.email || '') === normal(p.email)) || normal(y.nom) === normal(p.nom));
      if (pe) { let canvi = false; CAMPS_CONTACTE.forEach((k) => { if (p[k] && !pe[k]) { pe[k] = p[k]; canvi = true; } }); if (canvi) n++; else rep++; return; }
      state.persones.push({ id: 'pe-' + uid(), ...personaPerEnviar(p) }); n++;
    });
  }
  return { n, rep, on, errors };
}
/* ---------- Enganxar llistes d'altres apps ---------- */
async function textCopiat(titol, ajuda) {
  try { const t = await navigator.clipboard.readText(); if (t && t.trim()) return t; } catch (x) { /* l'aparell no deixa llegir el porta-retalls */ }
  return enganxaText(titol, ajuda);
}
$('#main').addEventListener('click', async (e) => {
  const b = e.target.closest('[data-enganxa]');
  if (!b) return;
  const [on, lid] = b.dataset.enganxa.split('|');
  if (on === 'memoria') {
    const text = await enganxaText('Enganxa les notes', "Cada nota, separada de la següent per una línia en blanc. La primera línia de cada nota serà el títol de la fitxa.");
    if (!text || !text.trim()) return;
    let blocs = text.split(/\r?\n\s*\r?\n/).map((x) => x.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)).filter((x) => x.length);
    // Llista d'una línia per element («Nom | https://…», com la de la drecera de l'iPhone): cada línia és una fitxa
    const URL_RE = /https?:\/\/[^\s|]+/gi;
    if (blocs.length === 1 && blocs[0].length > 1 && blocs[0].filter((l) => l.includes('|') || /https?:\/\//i.test(l)).length >= blocs[0].length / 2) {
      blocs = blocs[0].map((l) => {
        const urls = l.match(URL_RE) || [];
        const parts = l.replace(URL_RE, ' ').split(/\s*\|\s*/).map((x) => x.trim()).filter(Boolean);
        return parts.length ? [parts[0], ...urls, ...parts.slice(1)] : [];
      }).filter((x) => x.length);
    }
    let n = 0, act = 0;
    blocs.forEach((ls) => {
      const titol = ls[0].replace(/^[-•*#\s]+/, '').slice(0, 80);
      const carp = carpetaActual() || '';
      if (!titol) return;
      const ja = state.memoria.find((f) => carpetaDe(f) === carp && normal(f.titol) === normal(titol));
      if (ja) {   // ja hi és: s'hi afegeix el que li falti (p. ex. l'enllaç)
        const nous = ls.slice(1).filter((l) => !normal(ja.text || '').includes(normal(l)));
        if (nous.length) { ja.text = [ja.text, ...nous].filter(Boolean).join('\n').slice(0, 3000); act++; }
        return;
      }
      state.memoria.push({ id: nouId('m'), titol, text: ls.slice(1).join('\n').slice(0, 3000), carpeta: carp, creat: new Date().toISOString() }); n++;
    });
    save(); render();
    const tros = [n ? (n === 1 ? '1 fitxa afegida' : `${n} fitxes afegides`) : '', act ? (act === 1 ? '1 completada' : `${act} completades`) : '',
      blocs.length - n - act > 0 ? `${blocs.length - n - act} ja hi eren` : ''].filter(Boolean);
    toast(tros.length ? tros.join(' · ') : 'Ja les tenies totes', 5000);
    return;
  }
  if (on === 'frases') {
    const text = await textCopiat('Enganxa les frases', 'Una frase a cada línia. Sortiran com a frase del dia, una cada dia a partir de demà, i després de tant en tant.');
    if (!text || !text.trim()) return;
    const clauF = (t) => normal(t).replace(/[^a-z0-9]/g, '');
    const ja = new Set([...frasesMeves().map((f) => clauF(f.text)), ...PINDOLES.map(clauF)]);
    const ocupats = new Set(frasesMeves().map((f) => f.des));
    let d = addDays(parseYmd(avui()), 1), n = 0, rep = 0;
    const noves = [];
    liniesNetes(text).forEach((l) => {
      const k = clauF(l);
      if (!k || ja.has(k)) { rep++; return; }
      ja.add(k);
      while (ocupats.has(ymd(d))) d = addDays(d, 1);
      noves.push({ id: nouId('f'), text: l.slice(0, 200), des: ymd(d) }); ocupats.add(ymd(d)); n++;
    });
    state.ajustos.frasesMeves = [...frasesMeves(), ...noves]; save(); render();
    toast(n ? (n === 1 ? '1 frase afegida' : `${n} frases afegides`) + (rep ? ` (${rep} ja hi eren)` : '') : 'Ja les tenies totes', 4000);
    return;
  }
  const text = await textCopiat('Enganxa la llista', AJUDA_ENGANXA);
  if (!text || !text.trim()) return;
  const linies = liniesNetes(text);
  let n = 0, rep = 0;
  if (on === 'recordatoris') {
    // Cada línia pot portar enllaços («Títol | https://…»): el títol va al recordatori i l'enllaç al camp Enllaç.
    // Si el recordatori ja existeix, no es repeteix: s'hi afegeix l'enllaç (i les notes) que li falti.
    let act = 0, ultim = null;
    linies.forEach((l) => {
      const urls = l.match(/https?:\/\/[^\s|]+/gi) || [];
      const parts = l.replace(/https?:\/\/[^\s|]+/gi, ' ').split(/\s*\|\s*/).map((x) => x.trim()).filter(Boolean);
      const titol = (parts[0] || '').slice(0, 300), notes = parts.slice(1).join('\n').slice(0, 3000), url = urls[0] || '';
      if (!titol) {   // una línia només amb l'enllaç: és del recordatori d'abans
        if (ultim && url && !ultim.url) { ultim.url = url; act++; }
        return;
      }
      const ja = pendentsRec().find((x) => normal(x.text) === normal(titol));
      if (ja) {
        let canvi = false;
        if (url && !ja.url) { ja.url = url; canvi = true; }
        if (notes && !ja.notes) { ja.notes = notes; canvi = true; }
        if (canvi) act++; else rep++;
        ultim = ja; return;
      }
      ultim = { id: nouId('r'), text: titol, url, notes, creat: new Date().toISOString() };
      state.recordatoris.push(ultim); n++;
    });
    save(); render();
    const tros = [n ? (n === 1 ? '1 afegit' : `${n} afegits`) : '', act ? (act === 1 ? '1 completat amb enllaç' : `${act} completats amb enllaç`) : '', rep ? `${rep} ja hi eren` : ''].filter(Boolean);
    toast(tros.length ? tros.join(' · ') : 'No hi havia res de nou', 5000);
    return;
  } else {
    const llista = itemsDe(on, lid);
    if (!llista) return;
    const altres = [];
    linies.forEach((l) => {
      const igual = llista.find((x) => normal(x.text) === normal(l) && (on !== 'compres' || carpetaItem('compres', x) === (lid || '')));
      if (igual && !igual.fet) { rep++; return; }
      if (on === 'compres' && !igual) {
        const altra = state.compres.find((x) => !x.fet && normal(x.text) === normal(l) && carpetaItem('compres', x) !== (lid || ''));
        if (altra) { altres.push(`${l} (${nomCarpeta('compres', carpetaItem('compres', altra))})`); return; }
      }
      if (igual) { igual.fet = false; n++; return; }
      llista.push(on === 'compres' ? { id: nouId('c'), text: l.slice(0, 200), fet: false, carpeta: lid || '', creat: new Date().toISOString() } : { id: nouId('i'), text: l.slice(0, 200), fet: false });
      n++;
    });
    if (altres.length) { save(); render(); toast((n ? (n === 1 ? '1 afegit. ' : n + ' afegits. ') : '') + 'Ja els tenies a una altra botiga: ' + altres.join(', '), 7000); return; }
  }
  save(); render();
  toast(n ? (n === 1 ? '1 element afegit' : `${n} elements afegits`) + (rep ? ` (${rep} ja hi eren)` : '') : 'Ja els tenies tots', 4000);
});

// Fitxa d'un recordatori: notes, enllaç, important, subtasques i fotos
function vistaRecFitxa(r) {
  const subs = Array.isArray(r.subtasques) ? r.subtasques : [], imgs = Array.isArray(r.imatges) ? r.imatges : [];
  const entrat = Boolean(usuari());
  return `<div class="sat-cap"><button class="sat-torna" data-rectorna aria-label="Torna als recordatoris">‹ Tornar</button><h1>Recordatori</h1></div>
    <div class="rec-fitxa">
      <textarea class="rec-titol" data-reccamp="text" rows="2" maxlength="300" placeholder="Què has de recordar?">${esc(r.text)}</textarea>
      <button class="rec-imp${r.important ? ' si' : ''}" data-recimp aria-pressed="${Boolean(r.important)}"><span class="rec-bandera"></span>${r.important ? 'Important' : 'Marca com a important'}</button>
      <div class="rec-bloc"><span>Quan (opcional)</span>
        <div class="rec-quan"><input type="date" data-reccamp="data" value="${esc(r.data || '')}" aria-label="Dia"><input type="time" data-reccamp="hora" value="${esc(r.hora || '')}" aria-label="Hora" ${r.data ? '' : 'disabled'}>${r.data ? '<button class="enllac" data-rectreudata>Treu</button>' : ''}</div>
        ${r.data ? `<label class="rec-avis">Avís al calendari de l'iPhone <select data-reccamp="avis">${AVISOS_REC.map(([k, n]) => `<option value="${k}"${(r.avis || 'hora') === k ? ' selected' : ''}>${esc(n(r))}</option>`).join('')}</select></label>
          <p class="help">Surt a l'agenda i al calendari de l'iPhone (a l'etiqueta Recordatoris), on t'avisarà.</p>` : '<p class="help">Si hi poses dia, sortirà a l\'agenda i el calendari de l\'iPhone t\'avisarà.</p>'}
      </div>
      <label class="rec-bloc"><span>Notes</span><textarea data-reccamp="notes" rows="4" maxlength="3000" placeholder="Detalls, telèfons, el que calgui…">${esc(r.notes || '')}</textarea></label>
      <div class="rec-bloc"><span>Ubicació</span>
        <div class="rec-url"><input data-reccamp="lloc" maxlength="120" placeholder="On és? (un restaurant, una adreça…)" value="${esc(r.lloc || '')}">${mapsDe(r) ? `<a class="btn" href="${esc(mapsDe(r))}" target="_blank" rel="noopener">Maps</a>` : ''}</div>
        <div class="grp"><button type="button" class="enllac" data-reclloc="ara">On soc ara</button>${r.lloc || r.llocUrl ? '<button type="button" class="enllac" data-reclloc="treu">Treu la ubicació</button>' : ''}</div>
      </div>
      <label class="rec-bloc"><span>Enllaç</span><div class="rec-url"><input data-reccamp="url" type="url" inputmode="url" maxlength="2000" placeholder="https://…" value="${esc(r.url || '')}">${r.url ? `<a class="btn" href="${esc(r.url)}" target="_blank" rel="noopener">Obre</a>` : ''}</div></label>
      <div class="rec-bloc"><span>Subtasques${subs.length ? ` · ${subs.filter((s) => s.fet).length}/${subs.length}` : ''}</span>
        ${subs.length ? `<ul class="rec-subs">${subs.map((s) => `<li class="${s.fet ? 'fet' : ''}"><button class="rec-check petit${s.fet ? ' ple' : ''}" data-subfet="${esc(s.id)}" aria-label="${s.fet ? 'Desmarca' : 'Fet'}"></button><button class="rec-subtext" data-subedita="${esc(s.id)}">${esc(s.text)}</button></li>`).join('')}</ul>` : ''}
        <form class="rec-nou petit" id="formSub" autocomplete="off"><input name="text" placeholder="Afegeix un pas…" maxlength="200" enterkeyhint="done"><button class="btn">Afegeix</button></form>
      </div>
      <div class="rec-bloc"><span>Fotos</span>
        ${imgs.length ? `<div class="rec-imgs">${imgs.map((im) => `<button class="rec-img" data-recimg="${esc(im.id)}"><img src="${esc(im.mini)}" alt=""></button>`).join('')}</div>` : ''}
        ${entrat ? `<label class="btn rec-afoto${ui.recPujant ? ' ocupat' : ''}"><input type="file" id="recFoto" accept="image/*" multiple hidden ${ui.recPujant ? 'disabled' : ''}>${ui.recPujant ? 'Pujant…' : 'Afegeix fotos'}</label>`
          : '<p class="help">Per afegir fotos cal haver entrat amb el teu correu.</p>'}
      </div>
      <div class="ll-peu"><button class="btn primary" data-recfitxafet>Fet</button><button class="enllac" data-envrec>Envia una còpia</button><button class="enllac perill" data-recesborra>Esborra</button></div>
    </div>`;
}
const AVISOS_REC = [
  ['hora', (r) => (r.hora ? "A l'hora" : 'A les 9 del matí')],
  ['15', () => '15 minuts abans'],
  ['60', () => '1 hora abans'],
  ['1440', (r) => (r.hora ? '1 dia abans' : "El dia abans a les 9")],
  ['cap', () => 'Sense avís'],
];
const recObert = () => state.recordatoris.find((x) => x.id === ui.recObert && !x.fet);
// Treu del núvol les fotos d'un recordatori que ja no hi és (passat el temps de Desfés)
function netejaFotosRec(r) {
  setTimeout(() => {
    if (state.recordatoris.some((x) => x.id === r.id)) return;
    (r.imatges || []).forEach((im) => { sync()?.esborraDoc(im.cami).catch(() => {}); });
  }, 7000);
}
function treuRecordatori(r, text) {
  const copia = JSON.parse(JSON.stringify(r)), lloc = state.recordatoris.indexOf(r);
  state.recordatoris = state.recordatoris.filter((x) => x.id !== r.id);
  ui.recObert = ''; save(); render(); window.scrollTo(0, 0);
  toastDesfes(text, () => { state.recordatoris.splice(Math.max(0, lloc), 0, copia); save(); render(); });
  netejaFotosRec(copia);
}
$('#main').addEventListener('change', async (e) => {
  const t = e.target, r = recObert();
  if (!r) return;
  if (t.dataset?.reccamp) {
    const k = t.dataset.reccamp;
    let v = t.value.trim();
    if (k === 'text' && !v) { t.value = r.text; return; }
    if (k === 'url' && v && !/^https?:\/\//i.test(v)) v = 'https://' + v;
    if ((r[k] || '') === v) return;
    r[k] = v.slice(0, k === 'notes' ? 3000 : k === 'url' ? 2000 : 300);
    if (k === 'data' && !v) { r.hora = ''; }
    if (k === 'lloc') r.llocUrl = '';
    save();
    if (['url', 'data', 'hora', 'lloc'].includes(k)) render();
    return;
  }
  if (t.id === 'recFoto') {
    const files = [...(t.files || [])]; t.value = '';
    if (!files.length) return;
    ui.recPujant = true; render();
    let errors = 0;
    for (const f of files) {
      try {
        const im = await carregaImg(f);
        const blob = await new Promise((ok) => redueix(im, 2000).toBlob(ok, 'image/jpeg', 0.82));
        const id = nouId('ri'), cami = await sync().pujaDoc(id, blob, 'image/jpeg', 'jpg');
        const rr = state.recordatoris.find((x) => x.id === r.id);
        if (rr) { rr.imatges = [...(rr.imatges || []), { id, cami, mini: redueix(im, 240).toDataURL('image/jpeg', 0.6) }]; save(); }
      } catch (err) { errors++; if (!navigator.onLine) break; }
    }
    ui.recPujant = false; render();
    if (errors) toast(navigator.onLine ? `${errors === 1 ? 'Una foto no s\'ha' : errors + ' fotos no s\'han'} pogut pujar.` : 'Cal connexió a internet per pujar fotos.', 4500);
  }
});
$('#main').addEventListener('submit', (e) => {
  if (e.target.id !== 'formSub') return;
  e.preventDefault();
  const r = recObert(), inp = e.target.elements.text, text = inp.value.trim();
  if (!r || !text) { inp.focus(); return; }
  r.subtasques = [...(r.subtasques || []), { id: nouId('s'), text: text.slice(0, 200), fet: false }];
  save(); render();
  document.querySelector('#formSub input')?.focus();
});
$('#main').addEventListener('click', async (e) => {
  const t = e.target;
  if (t.closest('[data-rectorna]')) {
    document.activeElement?.blur?.(); ui.recObert = '';
    if (ui.recTorna) { ui.view = ui.recTorna; ui.recTorna = ''; }
    render(); window.scrollTo(0, 0); return;
  }
  const r = recObert();
  if (!r) return;
  if (t.closest('[data-recimp]')) { r.important = !r.important; save(); render(); return; }
  if (t.closest('[data-rectreudata]')) { r.data = ''; r.hora = ''; save(); render(); return; }
  const rl = t.closest('[data-reclloc]');
  if (rl) {
    if (rl.dataset.reclloc === 'treu') { r.lloc = ''; r.llocUrl = ''; save(); render(); return; }
    const p = await onSocAra();
    if (p) { const rr = state.recordatoris.find((x) => x.id === r.id); if (rr) { Object.assign(rr, p); save(); render(); toast('Ubicació guardada'); } }
    return;
  }
  const sf = t.closest('[data-subfet]');
  if (sf) { const s = (r.subtasques || []).find((x) => x.id === sf.dataset.subfet); if (s) { s.fet = !s.fet; save(); render(); } return; }
  const se = t.closest('[data-subedita]');
  if (se) {
    const s = (r.subtasques || []).find((x) => x.id === se.dataset.subedita);
    if (!s) return;
    const nou = await demanaText('Corregeix el pas', s.text, { max: 200, ajuda: 'Deixa-ho buit per treure\'l.' });
    if (nou === null) return;
    if (!nou.trim()) r.subtasques = r.subtasques.filter((x) => x !== s); else s.text = nou.trim().slice(0, 200);
    save(); render(); return;
  }
  if (t.closest('[data-recfitxafet]')) { ui.recObert = ''; marcaFet(r); window.scrollTo(0, 0); return; }
  if (t.closest('[data-recesborra]')) {
    const b = t.closest('[data-recesborra]');
    if (b.dataset.segur !== '1') { b.dataset.segur = '1'; b.textContent = "Segur? Toca'l un altre cop"; return; }
    treuRecordatori(r, `Esborrat: ${r.text}`); return;
  }
  const ib = t.closest('[data-recimg]');
  if (ib) {
    const im = (r.imatges || []).find((x) => x.id === ib.dataset.recimg);
    if (im) obreFotoRec(r, im);
  }
});
// Fotos d'una fitxa en gran: amb zoom i, si n'hi ha més d'una, lliscant el dit es passa a la següent
async function obreFoto(titol, fotos, inici, { treu, mou } = {}) {
  tancaVisor();
  let i = Math.max(0, Math.min(fotos.length - 1, inici)), urls = {};
  const v = document.createElement('div');
  v.className = 'doc-visor';
  const diverses = fotos.length > 1;
  v.innerHTML = `<div class="doc-visor-cap"><button type="button" class="sat-torna" data-fv="tanca">‹ Tanca</button><b>${esc(titol)}</b></div>
    ${diverses ? '<p class="help doc-zoom">Llisca el dit cap als costats per veure les altres fotos</p>' : ''}
    <div class="doc-visor-cos"></div>
    <div class="doc-visor-peu"><a class="btn primary" data-fv="obre" target="_blank" rel="noopener" hidden>Obre / Comparteix</a>${mou ? '<button type="button" class="btn" data-fv="mou">Mou a una altra fitxa</button>' : ''}<button type="button" class="enllac perill" data-fv="treu">Treu la foto</button></div>`;
  document.body.appendChild(v);
  const cos = v.querySelector('.doc-visor-cos');
  const mostra = async (dir = 0) => {
    const im = fotos[i];
    cos.innerHTML = `<div class="doc-zoomcaixa${dir ? (dir > 0 ? ' entra-dreta' : ' entra-esquerra') : ''}"><img src="${esc(im.mini)}" alt="" draggable="false"></div>`
      + (diverses ? `<button type="button" class="foto-fletxa esq" data-fv="ant" aria-label="Foto anterior"${i === 0 ? ' hidden' : ''}>‹</button><button type="button" class="foto-fletxa dre" data-fv="seg" aria-label="Foto següent"${i === fotos.length - 1 ? ' hidden' : ''}>›</button><span class="foto-compte">${i + 1} / ${fotos.length}</span>` : '');
    const img = cos.querySelector('img');
    ampliable(cos.firstChild, img);
    const tr = v.querySelector('[data-fv="treu"]'); tr.dataset.segur = ''; tr.textContent = 'Treu la foto';
    const o = v.querySelector('[data-fv="obre"]'); o.hidden = true;
    try {
      const url = urls[im.id] || (urls[im.id] = await sync().urlDoc(im.cami));
      if (!document.body.contains(v) || fotos[i] !== im) return;
      img.src = url; o.href = url; o.hidden = false;
    } catch (err) { /* es queda la miniatura */ }
  };
  const passa = (dir) => { const n = i + dir; if (n < 0 || n >= fotos.length) return; i = n; mostra(dir); };
  // Lliscar: només si la foto no està ampliada
  let ini = null;
  cos.addEventListener('touchstart', (e) => { ini = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() } : null; }, { passive: true });
  cos.addEventListener('touchend', (e) => {
    if (!ini || !diverses || e.touches.length) { ini = null; return; }
    const t = e.changedTouches[0], dx = t.clientX - ini.x, dy = t.clientY - ini.y;
    const img = cos.querySelector('img'), ampliada = /scale\((?!1\))/.test(img?.style.transform || '');
    ini = null;
    if (!ampliada && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) passa(dx < 0 ? 1 : -1);
  });
  const tecla = (e) => { if (!document.body.contains(v)) { removeEventListener('keydown', tecla); return; } if (e.key === 'ArrowRight') passa(1); else if (e.key === 'ArrowLeft') passa(-1); else if (e.key === 'Escape') tancaVisor(); };
  addEventListener('keydown', tecla);
  v.addEventListener('click', (e) => {
    const b = e.target.closest('[data-fv]');
    if (!b) return;
    if (b.dataset.fv === 'tanca') { tancaVisor(); return; }
    if (b.dataset.fv === 'ant') { passa(-1); return; }
    if (b.dataset.fv === 'seg') { passa(1); return; }
    if (b.dataset.fv === 'mou') { tancaVisor(); mou(fotos[i]); return; }
    if (b.dataset.fv === 'treu') {
      if (b.dataset.segur !== '1') { b.dataset.segur = '1'; b.textContent = "Segur? Toca'l un altre cop"; return; }
      tancaVisor(); treu(fotos[i]); toast('Foto treta');
    }
  });
  mostra();
}
// Foto en gran, amb zoom, i opció de treure-la
async function obreFotoRec(r, im) {
  tancaVisor();
  const v = document.createElement('div');
  v.className = 'doc-visor';
  v.innerHTML = `<div class="doc-visor-cap"><button type="button" class="sat-torna" data-fv="tanca">‹ Tanca</button><b>${esc(r.text)}</b></div>
    <div class="doc-visor-cos"><img src="${esc(im.mini)}" alt="" draggable="false"></div>
    <div class="doc-visor-peu"><a class="btn primary" data-fv="obre" target="_blank" rel="noopener" hidden>Obre / Comparteix</a><button type="button" class="enllac perill" data-fv="treu">Treu la foto</button></div>`;
  document.body.appendChild(v);
  const cos = v.querySelector('.doc-visor-cos');
  ampliable(cos, cos.querySelector('img'));
  v.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-fv]');
    if (!b) return;
    if (b.dataset.fv === 'tanca') { tancaVisor(); return; }
    if (b.dataset.fv === 'treu') {
      if (b.dataset.segur !== '1') { b.dataset.segur = '1'; b.textContent = "Segur? Toca'l un altre cop"; return; }
      const rr = state.recordatoris.find((x) => x.id === r.id);
      if (rr) { rr.imatges = (rr.imatges || []).filter((x) => x.id !== im.id); save(); }
      sync()?.esborraDoc(im.cami).catch(() => {});
      tancaVisor(); render(); toast('Foto treta');
    }
  });
  try {
    const url = await sync().urlDoc(im.cami);
    if (!document.body.contains(v)) return;
    v.querySelector('.doc-visor-cos img').src = url;
    const o = v.querySelector('[data-fv="obre"]'); o.href = url; o.hidden = false;
  } catch (err) { /* es queda la miniatura */ }
}

// Recordatoris: barra ràpida en afegir-ne un (com a l'iPhone): dia, ubicació, important i foto
const SVG_REC = {
  data: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="8.5" cy="14" r=".6"/><circle cx="12" cy="14" r=".6"/><circle cx="15.5" cy="14" r=".6"/></svg>',
  lloc: '<svg viewBox="0 0 24 24"><path d="M20.5 3.5 3.5 10.5l7 2.5 2.5 7z"/></svg>',
  imp: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5.5" class="ple"/></svg>',
  foto: '<svg viewBox="0 0 24 24"><path d="M4 8.5h3l1.6-2.5h6.8L17 8.5h3v10.5H4z"/><circle cx="12" cy="13.5" r="3.3"/></svg>',
};
const recNou = () => (ui.recNou ||= { data: '', hora: '', important: false, lloc: '', llocUrl: '', fotos: [] });
function barraRecNou() {
  const n = recNou();
  const xips = [n.data ? `${dataCurta(n.data)}${n.hora ? ' ' + n.hora : ''}` : '', n.lloc ? (n.lloc.length < 30 ? n.lloc : 'Ubicació') : '', n.important ? 'Important' : '', n.fotos.length ? (n.fotos.length === 1 ? '1 foto' : n.fotos.length + ' fotos') : ''].filter(Boolean);
  return `<div class="rec-barra">
      <button type="button" class="rb-t${n.data ? ' on' : ''}" data-rb="data">Agenda</button>
      <button type="button" class="rb-t${n.lloc ? ' on' : ''}" data-rb="lloc">Ubicació</button>
      <button type="button" class="rb-t${n.important ? ' on' : ''}" data-rb="imp">Important</button>
      <label class="rb-t${n.fotos.length ? ' on' : ''}">Foto<input type="file" id="recNouFoto" accept="image/*" multiple hidden></label>
    </div>
    ${xips.length ? `<div class="rb-resum"><span class="rb-xips">${esc(xips.join(' · '))}</span><button type="button" class="enllac rb-treu" data-rb="treu">Treu</button></div>` : ''}
    ${ui.recNouData ? `<div class="rec-quan rb-quan"><input type="date" id="rbData" value="${esc(n.data)}" aria-label="Dia"><input type="time" id="rbHora" value="${esc(n.hora)}" aria-label="Hora"><button type="button" class="btn" data-rb="dataok">D'acord</button></div>` : ''}`;
}
// Es manté el que hi ha escrit a la casella quan es torna a pintar la pantalla
const desaTextRecNou = () => { const i = document.getElementById('recText'); if (i) ui.recNouText = i.value; };
// El que s'escriu a la casella es recorda a cada lletra, perquè no es perdi si es toca un botó de la barra
$('#main').addEventListener('input', (e) => { if (e.target.id === 'recText') ui.recNouText = e.target.value; });
$('#main').addEventListener('click', (e) => {
  const b = e.target.closest('[data-rb]');
  if (!b) return;
  const n = recNou(), acc = b.dataset.rb;
  desaTextRecNou();
  // Agenda funciona com les altres tecles: un toc la posa (obre el dia i l'hora), un altre toc la treu
  if (acc === 'data') {
    if (ui.recNouData || n.data) { n.data = ''; n.hora = ''; ui.recNouData = false; }
    else { ui.recNouData = true; n.data = avui(); }
  }
  else if (acc === 'dataok') { n.data = $('#rbData')?.value || ''; n.hora = n.data ? ($('#rbHora')?.value || '') : ''; ui.recNouData = false; }
  else if (acc === 'imp') n.important = !n.important;
  else if (acc === 'treu') { ui.recNou = null; ui.recNouData = false; }
  else if (acc === 'lloc') {
    triaLloc(Boolean(n.lloc)).then((p) => {
      if (p) Object.assign(recNou(), p);
      // Si encara no hi havia res escrit i s'ha buscat un lloc, el nom del lloc fa de recordatori (es pot canviar)
      const autom = Boolean(p && p.lloc && !p.llocUrl && !(ui.recNouText || '').trim());
      if (autom) ui.recNouText = p.lloc;
      render();
      const i = document.getElementById('recText');
      // El nom posat automàticament queda seleccionat: si escrius, el substitueix
      if (i) { i.value = ui.recNouText || ''; i.focus(); try { i.setSelectionRange(autom ? 0 : i.value.length, i.value.length); } catch (x) { /* res */ } }
    });
    return;
  }
  render();
  const i = document.getElementById('recText'); if (i) { i.value = ui.recNouText || ''; i.focus(); }
});
$('#main').addEventListener('change', (e) => {
  if (e.target.id === 'rbData' || e.target.id === 'rbHora') { const n = recNou(); n.data = $('#rbData').value || ''; n.hora = n.data ? $('#rbHora').value || '' : ''; return; }
  if (e.target.id !== 'recNouFoto') return;
  desaTextRecNou();
  recNou().fotos.push(...[...(e.target.files || [])]);
  render();
  const i = document.getElementById('recText'); if (i) { i.value = ui.recNouText || ''; i.focus(); }
});
// Puja les fotos triades a la barra al recordatori que s'acaba de crear
async function pujaFotosRecNou(id, fotos) {
  for (const f of fotos) {
    try {
      const im = await carregaImg(f);
      const blob = await new Promise((ok) => redueix(im, 2000).toBlob(ok, 'image/jpeg', 0.82));
      const fid = nouId('ri'), cami = await sync().pujaDoc(fid, blob, 'image/jpeg', 'jpg');
      const r = state.recordatoris.find((x) => x.id === id);
      if (r) { r.imatges = [...(r.imatges || []), { id: fid, cami, mini: redueix(im, 240).toDataURL('image/jpeg', 0.6) }]; save(); }
    } catch (err) { toast(navigator.onLine ? "Alguna foto no s'ha pogut pujar." : 'Cal connexió a internet per pujar fotos.', 4500); break; }
  }
  if (ui.view === 'recordatoris') render();
}

// Memòria: lliscar una fitxa cap a l'esquerra per esborrar-la (amb Desfés)
let lliscM = null, murMObert = null;
const tancaMurM = (m = murMObert) => { if (!m) return; m.querySelector('.mem-fitxa').style.transform = ''; m.classList.remove('obert'); if (murMObert === m) murMObert = null; };
const ampleM = (m) => m.querySelector('.mur-accions').offsetWidth;
$('#main').addEventListener('touchstart', (e) => {
  const m = e.target.closest('.mur-mem');
  if (murMObert && murMObert !== m) tancaMurM();
  if (!m || e.target.closest('.mur-accions') || e.target.closest('a, .rec-img') || e.touches.length !== 1) { lliscM = null; return; }
  lliscM = { m, x: e.touches[0].clientX, y: e.touches[0].clientY, ini: m.classList.contains('obert') ? -ampleM(m) : 0, mou: false };
}, { passive: true });
$('#main').addEventListener('touchmove', (e) => {
  if (!lliscM) return;
  const dx = e.touches[0].clientX - lliscM.x, dy = e.touches[0].clientY - lliscM.y;
  if (!lliscM.mou) {
    if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) { if (Math.abs(dy) > 10) lliscM = null; return; }
    lliscM.mou = true; lliscM.m.classList.add('mou');
  }
  lliscM.m.querySelector('.mem-fitxa').style.transform = `translateX(${Math.max(-ampleM(lliscM.m) - 30, Math.min(0, lliscM.ini + dx))}px)`;
}, { passive: true });
$('#main').addEventListener('touchend', (e) => {
  if (!lliscM) return;
  const { m, mou, ini, x } = lliscM; lliscM = null;
  if (!mou) return;
  m.classList.remove('mou');
  const dx = e.changedTouches[0].clientX - x;
  if (ini + dx < -ampleM(m) / 2) { m.classList.add('obert'); m.querySelector('.mem-fitxa').style.transform = `translateX(-${ampleM(m)}px)`; murMObert = m; }
  else tancaMurM(m);
}, { passive: true });
// Memòria: seleccionar diverses fitxes (o totes) per esborrar-les de cop
const memSelN = (n) => (n === 1 ? '1 seleccionada' : `${n} seleccionades`);
function actualitzaMemSel() {
  const n = (ui.memSel || []).length, totes = document.querySelectorAll('.mur-mem:not([hidden]) [data-memobre]').length;
  const t = document.getElementById('memSelN'); if (t) t.textContent = memSelN(n);
  const b = document.querySelector('[data-memsel="totes"]'); if (b) b.textContent = n && n >= totes ? 'Desmarca-les totes' : 'Selecciona-les totes';
  const ev = document.querySelector('[data-memsel="envia"]'); if (ev) ev.disabled = !n;
  const mo = document.querySelector('[data-memsel="mou"]'); if (mo) { mo.disabled = !n; mo.textContent = n ? `Mou a… (${n})` : 'Mou a…'; }
  const es = document.querySelector('[data-memsel="esborra"]'); if (es) { es.disabled = !n; es.dataset.segur = ''; es.textContent = n ? `Esborra (${n})` : 'Esborra'; }
}
$('#main').addEventListener('click', (e) => {
  if (!ui.memSel || ui.view !== 'memoria') return;
  const f = e.target.closest('[data-memobre]');
  if (!f) return;
  // En mode de selecció, tocar una fitxa la marca o la desmarca (no l'obre)
  e.preventDefault(); e.stopImmediatePropagation();
  const id = f.dataset.memobre, i = ui.memSel.indexOf(id);
  if (i >= 0) ui.memSel.splice(i, 1); else ui.memSel.push(id);
  f.classList.toggle('triada', i < 0);
  actualitzaMemSel();
}, true);
$('#main').addEventListener('click', async (e) => {
  const b = e.target.closest('[data-memsel]');
  if (!b) return;
  const acc = b.dataset.memsel;
  if (acc === 'entra') { ui.memSel = []; render(); return; }
  if (acc === 'surt') { ui.memSel = null; render(); return; }
  if (acc === 'totes') {
    const visibles = [...document.querySelectorAll('.mur-mem:not([hidden]) [data-memobre]')];
    const totes = ui.memSel.length >= visibles.length;
    ui.memSel = totes ? [] : visibles.map((el) => el.dataset.memobre);
    visibles.forEach((el) => el.classList.toggle('triada', !totes));
    actualitzaMemSel();
    return;
  }
  if (acc === 'envia') {
    const ids = ui.memSel || [], fitxes = state.memoria.filter((f) => ids.includes(f.id));
    if (!fitxes.length) return;
    await enviaCopia('fitxes', nFitxes(fitxes.length), { fitxes: fitxesPerEnviar(fitxes) }, nFitxes(fitxes.length));
    ui.memSel = null; render();
    return;
  }
  if (acc === 'mou') {
    const ids = ui.memSel || [];
    if (!ids.length) return;
    mouFitxes(ids);
    return;
  }
  if (acc === 'esborra') {
    const ids = ui.memSel || [];
    if (!ids.length) return;
    if (b.dataset.segur !== '1') { b.dataset.segur = '1'; b.textContent = `Segur? Esborra ${ids.length === 1 ? 'la fitxa' : 'les ' + ids.length + ' fitxes'}`; return; }
    const abans = state.memoria.slice(), treure = state.memoria.filter((x) => ids.includes(x.id));
    state.memoria = state.memoria.filter((x) => !ids.includes(x.id));
    ui.memSel = null; save(); render();
    toastDesfes(treure.length === 1 ? `Esborrada: ${treure[0].titol}` : `${treure.length} fitxes esborrades`, () => { state.memoria = abans; save(); render(); });
    // Les fotos s'esborren del núvol quan ja no es pot desfer
    setTimeout(() => treure.forEach((f) => { if (!state.memoria.some((x) => x.id === f.id)) (f.imatges || []).forEach((im) => sync()?.esborraDoc(im.cami).catch(() => {})); }), 7000);
  }
});
// Moure fitxes a una altra carpeta sense sortir de la carpeta on ets (per classificar de pressa)
async function mouFitxes(ids) {
  const ara = carpetaActual();
  const opcions = [...(ara === '' ? [] : [['g', 'General', '']]), ...carpetesMem().filter((c) => !c.virtual && c.id !== ara).map((c) => [c.id, c.nom, ''])];
  const on = await triaOpcio(ids.length === 1 ? 'Mou a…' : `Mou ${ids.length} fitxes a…`, opcions);
  if (!on) return;
  const desti = on === 'g' ? '' : on, abans = {};
  state.memoria.forEach((f) => { if (ids.includes(f.id)) { abans[f.id] = f.carpeta || ''; f.carpeta = desti; } });
  ui.memSel = null; save(); render();
  const nom = desti ? (carpetesMem().find((c) => c.id === desti)?.nom || '') : 'General';
  toastDesfes(ids.length === 1 ? `Moguda a ${nom}` : `${ids.length} fitxes mogudes a ${nom}`, () => {
    state.memoria.forEach((f) => { if (f.id in abans) f.carpeta = abans[f.id]; }); save(); render();
  });
}
$('#main').addEventListener('click', (e) => {
  const b = e.target.closest('[data-memmou]');
  if (!b || ui.memSel) return;
  e.stopPropagation();
  mouFitxes([b.dataset.memmou]);
});
const ajustaTitolMem = () => { const t = document.querySelector('#formMem [name="titol"]'); if (t) { t.style.height = 'auto'; t.style.height = t.scrollHeight + 2 + 'px'; } };
$('#main').addEventListener('input', (e) => { if (e.target.matches('#formMem [name="titol"]')) ajustaTitolMem(); });
$('#main').addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.matches('#formMem [name="titol"]')) { e.preventDefault(); document.querySelector('#formMem [name="text"]')?.focus(); } });
new MutationObserver(() => { if (document.querySelector('#formMem [name="titol"]')) ajustaTitolMem(); }).observe($('#main'), { childList: true });
// Fitxes repetides: el mateix títol o el mateix enllaç (sense «www», la barra final ni els paràmetres de seguiment)
const urlNetaApp = (u) => {
  try {
    const x = new URL(u);
    [...x.searchParams.keys()].forEach((k) => { if (/^(igsh|igshid|si|fbclid|gclid|ref|s|t)$/i.test(k) || /^utm_/i.test(k)) x.searchParams.delete(k); });
    return (x.hostname.replace(/^www\./, '') + x.pathname.replace(/\/+$/, '') + x.search).toLowerCase();
  } catch (e) { return String(u).toLowerCase(); }
};
const urlsDeText = (t) => (String(t || '').match(/https?:\/\/\S+/g) || []).map(urlNetaApp);
function fitxaRepetida(titol, text, excepte) {
  const t = normal(titol || '').trim(), urls = urlsDeText(text);
  return state.memoria.find((f) => f.id !== excepte && (normal(f.titol || '').trim() === t || (urls.length && urlsDeText(f.text).some((u) => urls.includes(u)))));
}
async function confirmaRepetida(f) {
  const nom = carpetesMem().find((c) => c.id === carpetaDe(f))?.nom || 'General';
  const op = await triaOpcio('Aquesta fitxa ja la tens', [
    ['no', "No l'afegeixis", `Ja hi ha «${f.titol.length > 50 ? f.titol.slice(0, 50) + '…' : f.titol}» a ${nom}`],
    ['si', 'Afegeix-la igualment', ''],
  ]);
  return op === 'si';
}
// «Enganxa»: el text que has copiat (d'una nota, de Recordatorios, de WhatsApp…) es converteix en una fitxa nova
// de la carpeta on ets. La primera línia fa de títol (hi cap una frase llarga) i la resta va a sota.
$('#main').addEventListener('click', async (e) => {
  if (!e.target.closest('[data-memcopiat]')) return;
  let text = '';
  try { text = await navigator.clipboard.readText(); } catch (x) { /* l'aparell no deixa llegir el porta-retalls */ }
  if (!text || !text.trim()) {
    text = await enganxaText('Enganxa el text', "Mantén el dit a la casella i tria «Enganxar». La primera línia serà el títol.");
    if (!text || !text.trim()) return;
  }
  const ls = text.replace(/\r/g, '').split('\n').map((l) => l.trim());
  while (ls.length && !ls[0]) ls.shift();
  let titol = ls.shift() || 'Nota', resta = ls.join('\n').trim();
  if (titol.length > 500) { resta = titol.slice(500) + (resta ? '\n' + resta : ''); titol = titol.slice(0, 500); }
  titol = titol.charAt(0).toUpperCase() + titol.slice(1);
  const rep = fitxaRepetida(titol, resta);
  if (rep && !(await confirmaRepetida(rep))) return;
  const f = { id: nouId('m'), titol, text: resta.slice(0, 3000), carpeta: carpetaActual() || '', creat: new Date().toISOString() };
  state.memoria.push(f); save(); render();
  toastDesfes(`Fitxa nova: ${titol.length > 40 ? titol.slice(0, 40) + '…' : titol}`, () => { state.memoria = state.memoria.filter((x) => x.id !== f.id); save(); render(); });
});
// Triar una fitxa de Memòria (amb cercador): les més noves primer
function triaFitxa(titol, excepte) {
  document.querySelector('.demana')?.remove();
  return new Promise((resol) => {
    const d = document.createElement('div');
    d.className = 'demana';
    const fitxes = state.memoria.filter((f) => f.id !== excepte).slice().sort((a, b) => String(b.creat || '').localeCompare(String(a.creat || '')));
    const nomC = (f) => carpetesMem().find((c) => c.id === carpetaDe(f))?.nom || 'General';
    d.innerHTML = `<div class="demana-caixa tria-fitxa"><b>${esc(titol)}</b><input type="search" placeholder="Busca la fitxa…" autocomplete="off">
      <div class="tria-llista">${fitxes.map((f) => `<button type="button" class="btn opcio" data-op="${esc(f.id)}" data-cerca="${esc(normal(f.titol + ' ' + (f.text || '') + ' ' + nomC(f)))}">${(f.imatges || [])[0]?.mini ? `<img src="${esc(f.imatges[0].mini)}" alt="">` : ''}<span>${esc(f.titol.length > 80 ? f.titol.slice(0, 80) + '…' : f.titol)}</span><small>${esc(nomC(f))}${(f.imatges || []).length ? ' · ' + (f.imatges.length === 1 ? '1 foto' : f.imatges.length + ' fotos') : ''}</small></button>`).join('')
      || '<p class="help">No hi ha cap altra fitxa.</p>'}<p class="help" hidden>Cap fitxa amb aquest nom.</p></div>
      <button type="button" class="enllac" data-op="">Cancel·la</button></div>`;
    document.body.appendChild(d);
    const inp = d.querySelector('input'), cap = d.querySelector('.tria-llista > p[hidden], .tria-llista > p:last-child');
    inp.addEventListener('input', () => {
      const q = normal(inp.value.trim()); let n = 0;
      d.querySelectorAll('[data-cerca]').forEach((b) => { const si = !q || b.dataset.cerca.includes(q); b.hidden = !si; if (si) n++; });
      if (cap) cap.hidden = n > 0 || !fitxes.length;
    });
    d.addEventListener('click', (e) => { const b = e.target.closest('[data-op]'); if (b || e.target === d) { d.remove(); resol(b ? b.dataset.op : ''); } });
  });
}
// Moure una foto d'una fitxa a una altra (si la fitxa d'origen queda buida, es pot esborrar)
async function mouFotoMem(deId, fotoId) {
  const de = state.memoria.find((x) => x.id === deId), im = de && (de.imatges || []).find((x) => x.id === fotoId);
  if (!im) return;
  const aId = await triaFitxa('Mou la foto a…', deId);
  const a = aId && state.memoria.find((x) => x.id === aId);
  if (!a) return;
  de.imatges = de.imatges.filter((x) => x.id !== fotoId);
  a.imatges = [...(a.imatges || []), im];
  save(); render();
  const buida = !de.imatges.length && !String(de.text || '').trim();
  const desfes = () => {
    const aa = state.memoria.find((x) => x.id === aId), dd = state.memoria.find((x) => x.id === deId);
    if (aa) aa.imatges = (aa.imatges || []).filter((x) => x.id !== fotoId);
    if (dd) dd.imatges = [...(dd.imatges || []), im];
    save(); render();
  };
  if (buida) {
    const op = await triaOpcio(`La fitxa «${de.titol.length > 50 ? de.titol.slice(0, 50) + '…' : de.titol}» s'ha quedat buida`, [
      ['esborra', 'Esborra-la', 'Ja no hi queda cap foto ni cap text'],
      ['deixa', 'Deixa-la', ''],
    ]);
    if (op === 'esborra') { esborraFitxaMem(de); return; }
  }
  toastDesfes(`Foto moguda a ${a.titol.length > 40 ? a.titol.slice(0, 40) + '…' : a.titol}`, desfes);
}
function esborraFitxaMem(f) {
  const lloc = state.memoria.indexOf(f), copia = { ...f };
  state.memoria.splice(lloc, 1); ui.memEdita = ''; save(); render();
  toastDesfes(`Esborrada: ${f.titol}`, () => { state.memoria.splice(Math.max(0, lloc), 0, copia); save(); render(); });
  setTimeout(() => { if (!state.memoria.some((x) => x.id === copia.id)) (copia.imatges || []).forEach((im) => sync()?.esborraDoc(im.cami).catch(() => {})); }, 7000);
}
$('#main').addEventListener('click', (e) => {
  const b = e.target.closest('[data-memtreu]');
  if (b) { const f = state.memoria.find((x) => x.id === b.dataset.memtreu); if (f) esborraFitxaMem(f); return; }
  if (murMObert && e.target.closest('.mur-mem') === murMObert) { e.preventDefault(); e.stopPropagation(); tancaMurM(); }
}, true);
// Tocar una fitxa (fora dels botons i enllaços) l'obre per editar-la
$('#main').addEventListener('click', (e) => {
  const f = e.target.closest('[data-memobre]');
  if (!f || e.target.closest('a, button, .rec-img, input, textarea, select')) return;
  if (String(getSelection?.() || '').trim()) return;   // estava seleccionant text per copiar-lo
  ui.memEdita = f.dataset.memobre; render(); window.scrollTo(0, 0);
});
// Memòria: buscar a Google o a Maps el que hi ha al títol, i enganxar les dades copiades
$('#main').addEventListener('click', async (e) => {
  const b = e.target.closest('[data-memcerca-web]');
  if (b) {
    const form = document.getElementById('formMem');
    const titol = form?.elements.titol.value.trim() || '';
    if (!titol) { toast('Escriu primer el nom al títol (p. ex. el restaurant)'); form?.elements.titol.focus(); return; }
    const carp = carpetesMem().find((c) => c.id === form.elements.carpeta.value);
    const q = encodeURIComponent(titol + (carp && !normal(titol).includes(normal(carp.nom)) && /restaurant|vins?|bars?|botigu|hotel/i.test(carp.nom) ? ' ' + carp.nom.replace(/s$/, '') : ''));
    window.open(b.dataset.memcercaWeb === 'maps' ? `https://www.google.com/maps/search/?api=1&query=${q}` : `https://www.google.com/search?q=${q}`, '_blank', 'noopener');
    return;
  }
  if (e.target.closest('[data-memenganxa]')) {
    const form = document.getElementById('formMem');
    let text = '';
    try { text = await navigator.clipboard.readText(); } catch (x) { /* l'iPhone no ho ha permès */ }
    if (!text) text = (await enganxaText('Enganxa aquí les dades', 'Mantén el dit dins del requadre i toca «Enganxar». Després prem «Afegeix-ho».')) || '';
    text = text.trim();
    if (!text || !form) return;
    const ta = form.elements.text;
    if (!form.elements.titol.value.trim()) {   // sense títol: la primera línia fa de títol (p. ex. el nom que copia Maps)
      const ls = text.split(/\r?\n/);
      form.elements.titol.value = ls.shift().trim().slice(0, 80);
      text = ls.join('\n').trim();
    }
    ta.value = [ta.value.trim(), text].filter(Boolean).join('\n').slice(0, 3000);
    toast('Dades afegides a la fitxa. Recorda prémer Desa.', 3500);
  }
});

// Finestreta per triar una opció (p. ex. «On soc ara» o «Busca un lloc»)
function triaOpcio(titol, opcions) {
  document.querySelector('.demana')?.remove();
  return new Promise((resol) => {
    const d = document.createElement('div');
    d.className = 'demana';
    d.innerHTML = '<div class="demana-caixa"><b>' + esc(titol) + '</b>' + opcions.map(([k, n, ajuda]) => '<button type="button" class="btn opcio" data-op="' + esc(k) + '"><span>' + esc(n) + '</span>' + (ajuda ? '<small>' + esc(ajuda) + '</small>' : '') + '</button>').join('')
      + '<button type="button" class="enllac" data-op="">Cancel·la</button></div>';
    document.body.appendChild(d);
    d.addEventListener('click', (e) => { const b = e.target.closest('[data-op]'); if (b || e.target === d) { d.remove(); resol(b ? b.dataset.op : ''); } });
  });
}
// Ubicació: on soc ara (coordenades) o un lloc buscat pel nom (s'obre a Google Maps)
const mapsDe = (r) => r.llocUrl || (r.lloc ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.lloc)}` : '');
function onSocAra() {
  return new Promise((ok) => {
    if (!navigator.geolocation) { toast('Aquest aparell no pot dir on ets.'); ok(null); return; }
    toast('Buscant on ets…', 2000);
    navigator.geolocation.getCurrentPosition((p) => {
      const ara = new Date();
      ok({ lloc: `On era el ${ara.getDate()}/${ara.getMonth() + 1} a les ${pad(ara.getHours())}:${pad(ara.getMinutes())}`,
        llocUrl: `https://maps.google.com/?q=${p.coords.latitude.toFixed(6)},${p.coords.longitude.toFixed(6)}` });
    }, () => { toast("No s'ha pogut saber on ets. Mira que l'app tingui permís d'ubicació.", 4500); ok(null); }, { enableHighAccuracy: true, timeout: 12000 });
  });
}
async function triaLloc(actual) {
  const op = await triaOpcio('Ubicació', [
    ['ara', 'On soc ara', "Per recordar on has aparcat, on has trobat bolets…"],
    ['busca', 'Busca un lloc', 'Un restaurant, una adreça, on has quedat…'],
    ...(actual ? [['treu', 'Treu la ubicació', '']] : []),
  ]);
  if (op === 'ara') return onSocAra();
  if (op === 'busca') {
    const nom = await demanaText('Quin lloc?', '', { max: 120, placeholder: 'Restaurant l\'Escabetx, Girona' });
    if (!nom || !nom.trim()) return null;
    return { lloc: nom.trim(), llocUrl: '' };
  }
  if (op === 'treu') return { lloc: '', llocUrl: '' };
  return null;
}
// Recordatoris: lliscar cap a l'esquerra per esborrar (amb Desfés)
let lliscR = null, murRObert = null;
const tancaMurR = (m = murRObert) => { if (!m) return; m.querySelector('.rec-cos').style.transform = ''; m.classList.remove('obert'); if (murRObert === m) murRObert = null; };
const ampleR = (m) => m.querySelector('.mur-accions').offsetWidth;
$('#main').addEventListener('touchstart', (e) => {
  const m = e.target.closest('.mur-rec');
  if (murRObert && murRObert !== m) tancaMurR();
  if (!m || e.target.closest('.mur-accions') || e.touches.length !== 1) { lliscR = null; return; }
  lliscR = { m, x: e.touches[0].clientX, y: e.touches[0].clientY, ini: m.classList.contains('obert') ? -ampleR(m) : 0, mou: false };
}, { passive: true });
$('#main').addEventListener('touchmove', (e) => {
  if (!lliscR) return;
  const dx = e.touches[0].clientX - lliscR.x, dy = e.touches[0].clientY - lliscR.y;
  if (!lliscR.mou) {
    if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) { if (Math.abs(dy) > 10) lliscR = null; return; }
    lliscR.mou = true; lliscR.m.classList.add('mou');
  }
  lliscR.m.querySelector('.rec-cos').style.transform = `translateX(${Math.max(-ampleR(lliscR.m) - 30, Math.min(0, lliscR.ini + dx))}px)`;
}, { passive: true });
$('#main').addEventListener('touchend', (e) => {
  if (!lliscR) return;
  const { m, mou, ini, x } = lliscR; lliscR = null;
  if (!mou) return;
  m.classList.remove('mou');
  const dx = e.changedTouches[0].clientX - x;
  if (ini + dx < -ampleR(m) / 2) { m.classList.add('obert'); m.querySelector('.rec-cos').style.transform = `translateX(-${ampleR(m)}px)`; murRObert = m; }
  else tancaMurR(m);
}, { passive: true });
$('#main').addEventListener('click', (e) => {
  const b = e.target.closest('[data-rectreu]');
  if (b) { const r = state.recordatoris.find((x) => x.id === b.dataset.rectreu); if (r) treuRecordatori(r, `Esborrat: ${r.text}`); e.stopPropagation(); return; }
  if (murRObert && e.target.closest('.mur-rec') === murRObert) { e.preventDefault(); e.stopPropagation(); tancaMurR(); }
}, true);

/* ---------- Llista i Compres ---------- */
// Avís «Ja hi és» al costat de la casella (a baix de tot no es veu quan el teclat és obert) i l'element parpelleja
function jaHiEs(form, it) {
  form.parentElement.querySelector('.ja-hi-es')?.remove();
  form.insertAdjacentHTML('afterend', `<p class="ja-hi-es">«${esc(it.text)}» ja és a la llista</p>`);
  const avis = form.nextElementSibling;
  setTimeout(() => avis?.remove(), 2600);
  const li = document.querySelector(`li[data-item="${CSS.escape(it.id)}"]`);
  if (li) { li.classList.remove('ressalta'); void li.offsetWidth; li.classList.add('ressalta'); }
  form.elements.text.focus();
}
let chipPrem = null, chipLlarg = false;
$('#main').addEventListener('pointerdown', (e) => {
  const ch = e.target.closest('[data-torna]');
  if (!ch) return;
  chipLlarg = false; clearTimeout(chipPrem);
  chipPrem = setTimeout(() => {
    chipLlarg = true; setTimeout(() => { chipLlarg = false; }, 800); navigator.vibrate?.(15);
    const r = state.compres.find((x) => x.id === ch.dataset.torna);
    if (!r) return;
    const lloc = state.compres.indexOf(r), copia = { ...r };
    state.compres.splice(lloc, 1); save(); render();
    toastDesfes(`Tret dels habituals: ${r.text}`, () => { state.compres.splice(lloc, 0, copia); save(); render(); });
  }, 600);
});
['pointerup', 'pointercancel', 'pointerleave', 'scroll'].forEach((ev) => $('#main').addEventListener(ev, () => clearTimeout(chipPrem), true));
$('#main').addEventListener('touchmove', () => clearTimeout(chipPrem), { passive: true });
$('#main').addEventListener('contextmenu', (e) => { if (e.target.closest('[data-torna]')) e.preventDefault(); });
function itemsDe(col, lid) { return col === 'compres' ? state.compres : state.llistes.find((l) => l.id === lid)?.items || null; }
$('#main').addEventListener('click', (e) => {
  const t = e.target;
  if (t.closest('[data-llistes]')) { ui.llista = ''; render(); window.scrollTo(0, 0); return; }
  const ob = t.closest('[data-obrellista]');
  if (ob) { ui.llista = ob.dataset.obrellista; render(); window.scrollTo(0, 0); return; }
  const chk = t.closest('[data-chk]');
  if (chk) {
    const [col, lid, iid] = chk.dataset.chk.split('|');
    const it = itemsDe(col, lid)?.find((x) => x.id === iid);
    if (!it) return;
    chk.closest('li').classList.add('fet');
    setTimeout(() => {
      it.fet = true;
      if (col === 'compres') it.vegades = (it.vegades || 0) + 1;   // quantes vegades s'ha comprat
      save(); render();
      toastDesfes(`Fet: ${it.text}`, () => {
        const x = itemsDe(col, lid)?.find((y) => y.id === iid);
        if (x) { x.fet = false; if (col === 'compres' && x.vegades) x.vegades--; }
        save(); render();
      });
    }, 380);
    return;
  }
  const ed = t.closest('[data-itedita]');
  if (ed) {
    const [col, lid, iid] = ed.dataset.itedita.split('|');
    const llista = itemsDe(col, lid), it = llista?.find((x) => x.id === iid);
    if (!it) return;
    if (col === 'compres' && !ed.dataset.corregeix) {
      triaOpcio(it.text, [['corregeix', 'Corregeix-ho', 'Canvia el nom o treu-ho de la llista'], ['mou', 'Mou a una altra botiga', 'Ara és a ' + nomCarpeta('compres', carpetaItem('compres', it))]]).then(async (op) => {
        if (op === 'corregeix') { ed.dataset.corregeix = '1'; ed.click(); delete ed.dataset.corregeix; return; }
        if (op !== 'mou') return;
        const on = await triaOpcio('A quina botiga?', [...carpetesDe('compres').map((c) => [c.id, c.nom, '']), ['g', 'General', 'Sense botiga']]);
        if (!on) return;
        it.carpeta = on === 'g' ? '' : on; save(); render(); toast(`Ara és a ${nomCarpeta('compres', it.carpeta)}`);
      });
      return;
    }
    demanaText('Corregeix-ho', it.text, { max: 200, ajuda: 'Deixa-ho buit per treure-ho de la llista.' }).then((nou) => {
      if (nou === null || nou.trim() === it.text) return;
      if (!nou.trim()) {
        const lloc = llista.indexOf(it), copia = { ...it };
        llista.splice(lloc, 1); save(); render();
        toastDesfes(`Tret: ${it.text}`, () => { itemsDe(col, lid)?.splice(lloc, 0, copia); save(); render(); });
        return;
      }
      it.text = nou.trim().slice(0, 200); save(); render();
    });
    return;
  }
  const tr = t.closest('[data-torna]');
  if (tr && chipLlarg) { chipLlarg = false; return; }
  if (tr) { const r = state.compres.find((x) => x.id === tr.dataset.torna); if (r) { r.fet = false; save(); render(); } return; }
  const om = t.closest('[data-omple]');
  if (om) { const l = state.llistes.find((x) => x.id === om.dataset.omple); if (l) { l.items.forEach((i) => { i.fet = false; }); save(); render(); toast('Llista a punt'); } return; }
  const cl = t.closest('[data-llistacomparteix]');
  if (cl) {
    const l = state.llistes.find((x) => x.id === cl.dataset.llistacomparteix);
    if (!l) return;
    const pend = l.items.filter((i) => !i.fet), items = pend.length ? pend : l.items;
    const text = l.nom + '\n' + items.map((i) => '- ' + i.text).join('\n');
    (async () => {
      if (navigator.share) { try { await navigator.share({ title: l.nom, text }); return; } catch (x) { if (x.name === 'AbortError') return; } }
      try { await navigator.clipboard.writeText(text); toast("Llista copiada: enganxa-la a WhatsApp, a un correu…"); } catch (x) { prompt('Copia la llista:', text); }
    })();
    return;
  }
  if (t.closest('[data-comprescimprimeix]')) {
    const { titol, grups } = compraPerCompartir();
    if (!grups.length) return;
    const blocs = grups.map((g) => '<h2>' + esc(g.nom) + '</h2><ul>' + g.items.map((x) => '<li><span class="quadret"></span>' + esc(x) + '</li>').join('') + '</ul>').join('');
    imprimeixFull('<div class="llista-full imprès full-llista full-compra"><p class="ll-app">Galàxia</p><h1>' + esc(titol) + '</h1>' + blocs + '</div>');
    return;
  }
  if (t.closest('[data-comprescomparteix]')) {
    const { titol, grups } = compraPerCompartir();
    if (!grups.length) return;
    const text = titol + '\n\n' + grups.map((g) => g.nom + '\n' + g.items.map((x) => '- ' + x).join('\n')).join('\n\n');
    (async () => {
      if (navigator.share) { try { await navigator.share({ title: titol, text }); return; } catch (x) { if (x.name === 'AbortError') return; } }
      try { await navigator.clipboard.writeText(text); toast('Llista copiada: enganxa-la a WhatsApp, a un correu…'); } catch (x) { prompt('Copia la llista:', text); }
    })();
    return;
  }
  const im = t.closest('[data-llistaimprimeix]');
  if (im) {
    const l = state.llistes.find((x) => x.id === im.dataset.llistaimprimeix);
    if (!l) return;
    const pend = l.items.filter((i) => !i.fet), items = pend.length ? pend : l.items;
    imprimeixFull(`<div class="llista-full imprès full-llista"><p class="ll-app">Galàxia</p><h1>${esc(l.nom)}</h1>
      <ul>${items.map((i) => `<li><span class="quadret"></span>${esc(i.text)}</li>`).join('')}</ul></div>`, l.nom + '.pdf');
    return;
  }
  const nm = t.closest('[data-llistanom]');
  if (nm) {
    const l = state.llistes.find((x) => x.id === nm.dataset.llistanom);
    if (l) demanaText('Nom de la llista', l.nom, { max: 60 }).then((nou) => { if (nou && nou.trim()) { l.nom = nou.trim().slice(0, 60); save(); render(); } });
    return;
  }
  const es = t.closest('[data-llistaesborra]');
  if (es) {
    const l = state.llistes.find((x) => x.id === es.dataset.llistaesborra);
    if (!l) return;
    const lloc = state.llistes.indexOf(l), copia = JSON.parse(JSON.stringify(l));
    state.llistes.splice(lloc, 1); ui.llista = ''; save(); render();
    toastDesfes(`Esborrada: ${l.nom}`, () => { state.llistes.splice(lloc, 0, copia); ui.llista = copia.id; save(); render(); });
  }
});
$('#main').addEventListener('change', (e) => {
  if (!e.target.dataset?.fam) return;
  const r = state.compres.find((x) => x.id === e.target.dataset.fam);
  if (!r) return;
  r.familia = e.target.value; save(); render();
  toast(`Ara és a ${FAMILIES.find((f) => f.id === r.familia)?.nom || 'Altres'}`);
});
$('#main').addEventListener('submit', async (e) => {
  const f = e.target;
  if (f.id === 'formLlistaNova') {
    e.preventDefault();
    const nom = $('#llistaNom').value.trim();
    if (!nom) { $('#llistaNom').focus(); return; }
    const germanes = state.llistes.filter((x) => carpetaItem('llista', x) === (carpetaOberta('llista') || '') && typeof x.ordre === 'number');
    const l = { id: nouId('l'), nom: nom.slice(0, 60), creat: new Date().toISOString(), items: [], carpeta: carpetaOberta('llista') || '', ...(germanes.length ? { ordre: Math.min(...germanes.map((x) => x.ordre)) - 1 } : {}) };
    state.llistes.push(l); ui.llista = l.id; save(); render();
    document.querySelector('[data-formitem] input')?.focus();
    return;
  }
  if (!f.dataset.formitem) return;
  e.preventDefault();
  const [col, lid] = f.dataset.formitem.split('|');
  const text = f.elements.text.value.trim().slice(0, 200), llista = itemsDe(col, lid);
  if (!text || !llista) { f.elements.text.focus(); return; }
  const igual = llista.find((x) => normal(x.text) === normal(text) && (col !== 'compres' || carpetaItem('compres', x) === (lid || '')));
  if (igual && !igual.fet) {
    f.elements.text.value = '';
    jaHiEs(f, igual);
    return;
  }
  if (col === 'compres' && !(igual && igual.fet)) {
    const r = await repetitAltraBotiga(text, lid || '');
    if (r === 'fet') { f.elements.text.value = ''; document.querySelector(`[data-formitem="${f.dataset.formitem}"] input`)?.focus(); return; }
  }
  if (igual) igual.fet = false;
  else llista.push(col === 'compres' ? { id: nouId('c'), text, fet: false, carpeta: lid || '', creat: new Date().toISOString() } : { id: nouId('i'), text, fet: false });
  save(); render();
  document.querySelector(`[data-formitem="${f.dataset.formitem}"] input`)?.focus();
});

/* ---------- Imprimir un full (Llista, Memòria, Documents) ---------- */
// A l'app instal·lada a l'iPhone, «imprimir» no fa res (l'iPhone no ho permet): es fa un PDF i s'obre el menú de compartir,
// on hi ha «Imprimir», «Desar a Arxius», WhatsApp…
const appInstallada = () => window.navigator.standalone === true || matchMedia('(display-mode: standalone)').matches;
const esIOS = () => /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
let llibresPdf = null;
function carregaScript(src) {
  return new Promise((ok, ko) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); });
}
async function fullAPdf(el, nom) {
  if (!llibresPdf) llibresPdf = Promise.all([
    carregaScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
    carregaScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
  ]);
  await llibresPdf;
  // Es dibuixa el full (amb fons blanc) i es reparteix en pàgines A4
  const caixa = document.createElement('div');
  caixa.className = 'pdf-full';
  caixa.innerHTML = el.innerHTML;
  document.body.appendChild(caixa);
  try {
    const canvas = await window.html2canvas(caixa, { scale: 1.6, backgroundColor: '#ffffff', useCORS: true });
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
    const ampleMm = 190, altPagMm = 277, mmPerPx = ampleMm / canvas.width, altPagPx = Math.floor(altPagMm / mmPerPx);
    for (let y = 0, p = 0; y < canvas.height; y += altPagPx, p++) {
      const tros = document.createElement('canvas');
      tros.width = canvas.width; tros.height = Math.min(altPagPx, canvas.height - y);
      tros.getContext('2d').drawImage(canvas, 0, y, canvas.width, tros.height, 0, 0, canvas.width, tros.height);
      if (p) pdf.addPage();
      pdf.addImage(tros.toDataURL('image/jpeg', 0.8), 'JPEG', 10, 10, ampleMm, tros.height * mmPerPx);
    }
    // Nom sense accents ni espais: l'extensió de WhatsApp de l'iPhone no envia bé els fitxers amb noms així
    const nomNet = nom.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9.]+/g, '-').replace(/-+/g, '-').replace(/^-|-(?=\.pdf$)/g, '') || 'Galaxia.pdf';
    return new File([pdf.output('blob')], nomNet, { type: 'application/pdf' });
  } finally { caixa.remove(); }
}
// Si el PDF ha trigat a fer-se, l'iPhone ja no deixa obrir el menú Compartir sol: es mostra un botó per obrir-lo
function botoCompartirPdf(f) {
  document.querySelector('.demana')?.remove();
  const d = document.createElement('div');
  d.className = 'demana';
  d.innerHTML = '<div class="demana-caixa"><b>El PDF ja està a punt</b><button type="button" class="btn primary" data-pdf="comparteix">Envia o desa el PDF</button><p class="help">Surt el menú de l\'iPhone: WhatsApp, Correu, Imprimir, Desar a Arxius…</p><button type="button" class="enllac" data-pdf="">Tanca</button></div>';
  document.body.appendChild(d);
  d.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-pdf]');
    if (!b && e.target !== d) return;
    if (b?.dataset.pdf === 'comparteix') { try { await navigator.share({ files: [f] }); } catch (x) { /* ha cancel·lat */ } }
    d.remove();
  });
}
async function imprimeixAlMobil(nom) {
  toast('Preparant el PDF…', 2500);
  try {
    const f = await fullAPdf($('#impressio'), nom);
    if (navigator.canShare && navigator.canShare({ files: [f] })) {
      // Només el fitxer: si s'hi afegeix un títol o un text, WhatsApp no l'accepta
      try { await navigator.share({ files: [f] }); }
      catch (x) { if (x.name !== 'AbortError') botoCompartirPdf(f); }   // l'iPhone no l'ha deixat obrir sol: es fa amb un toc
      return;
    }
    window.open(URL.createObjectURL(f), '_blank');
  } catch (err) {
    toast(navigator.onLine ? "No s'ha pogut preparar el PDF." : 'Cal connexió a internet per preparar el PDF.', 4500);
  }
}
function imprimeixFull(html, nom = 'Galàxia.pdf') {
  const full = $('#impressio');
  full.innerHTML = html;
  const imgs = [...full.querySelectorAll('img')];
  const ves = () => {
    if (esIOS() && appInstallada()) { imprimeixAlMobil(nom); return; }
    document.body.classList.add('imprimint');
    setTimeout(() => { window.print(); setTimeout(() => document.body.classList.remove('imprimint'), 500); }, 100);
  };
  if (!imgs.length) { ves(); return; }
  let falten = imgs.length;
  const una = () => { if (--falten === 0) ves(); };
  imgs.forEach((im) => { if (im.complete) una(); else { im.onload = una; im.onerror = una; } });
}
const htmlFitxa = (f) => `<div class="mem-imp"><h2>${esc(f.titol)}</h2>${f.text ? `<p>${esc(f.text)}</p>` : ''}</div>`;

/* ---------- Memòria ---------- */
$('#main').addEventListener('click', async (e) => {
  const t = e.target;
  if (t.closest('[data-memnova]')) { ui.memEdita = 'nova'; render(); window.scrollTo(0, 0); $('#formMem [name="titol"]')?.focus(); return; }
  const ed = t.closest('[data-memedita]');
  if (ed) {
    ui.memEdita = ed.dataset.memedita; render(); window.scrollTo(0, 0);
    const ti = $('#formMem [name="titol"]');
    if (ti) { ti.focus(); try { ti.setSelectionRange(0, ti.value.length); } catch (x) { /* res */ } }
    return;
  }
  if (t.closest('[data-memcancela]')) { ui.memEdita = ''; render(); return; }
  const es = t.closest('[data-memesborra]');
  if (es) {
    const f = state.memoria.find((x) => x.id === es.dataset.memesborra);
    if (!f) return;
    const lloc = state.memoria.indexOf(f), copia = { ...f };
    state.memoria.splice(lloc, 1); ui.memEdita = ''; save(); render();
    toastDesfes(`Esborrada: ${f.titol}`, () => { state.memoria.splice(lloc, 0, copia); save(); render(); });
    setTimeout(() => { if (!state.memoria.some((x) => x.id === copia.id)) (copia.imatges || []).forEach((im) => sync()?.esborraDoc(im.cami).catch(() => {})); }, 7000);
    return;
  }
  const mi = t.closest('[data-memimg]');
  if (mi) {
    const [fid, iid] = mi.dataset.memimg.split('|');
    const f = state.memoria.find((x) => x.id === fid), im = f && (f.imatges || []).find((x) => x.id === iid);
    if (im) obreFoto(f.titol, f.imatges.slice(), f.imatges.indexOf(im), {
      treu: (x) => { f.imatges = f.imatges.filter((y) => y.id !== x.id); save(); sync()?.esborraDoc(x.cami).catch(() => {}); render(); },
      mou: (x) => mouFotoMem(f.id, x.id),
    });
    return;
  }
  const ip = t.closest('[data-memimprimeix]');
  if (ip) {
    const totes = ip.dataset.memimprimeix === 'totes';
    const llista = totes ? state.memoria.filter((x) => carpetaDe(x) === (carpetaActual() || '')).sort((a, b) => a.titol.localeCompare(b.titol, 'ca')) : state.memoria.filter((x) => x.id === ip.dataset.memimprimeix);
    if (!llista.length) return;
    imprimeixFull(`<div class="llista-full imprès full-mem"><p class="ll-app">Galàxia · Memòria</p>${llista.map(htmlFitxa).join('')}</div>`);
    return;
  }
  const sh = t.closest('[data-memcomparteix]');
  if (sh) {
    const f = state.memoria.find((x) => x.id === sh.dataset.memcomparteix);
    if (!f) return;
    const text = f.titol + (f.text ? '\n' + f.text : '');
    if (navigator.share) { try { await navigator.share({ title: f.titol, text }); return; } catch (x) { if (x.name === 'AbortError') return; } }
    try { await navigator.clipboard.writeText(text); toast("Copiat: enganxa'l a WhatsApp, a un correu…"); } catch (x) { prompt('Copia-ho:', text); }
    return;
  }
  const cp = t.closest('[data-memcopia]');
  if (cp) {
    const f = state.memoria.find((x) => x.id === cp.dataset.memcopia);
    if (!f) return;
    try { await navigator.clipboard.writeText(f.text); toast('Copiat'); } catch (x) { prompt('Copia-ho:', f.text); }
  }
});
$('#main').addEventListener('change', async (e) => {
  if (e.target.id !== 'memFoto') return;
  const files = [...(e.target.files || [])]; e.target.value = '';
  const f = state.memoria.find((x) => x.id === ui.memEdita);
  if (!f || !files.length) return;
  const form = document.getElementById('formMem');
  desaFormMem(document.getElementById('formMem'));
  ui.memPujant = true; render();
  let errors = 0;
  for (const file of files) {
    try {
      const im = await carregaImg(file);
      const blob = await new Promise((ok) => redueix(im, 2000).toBlob(ok, 'image/jpeg', 0.82));
      const id = nouId('mi'), cami = await sync().pujaDoc(id, blob, 'image/jpeg', 'jpg');
      f.imatges = [...(f.imatges || []), { id, cami, mini: redueix(im, 240).toDataURL('image/jpeg', 0.6) }]; save();
    } catch (err) { errors++; if (!navigator.onLine) break; }
  }
  ui.memPujant = false; render();
  if (errors) toast(navigator.onLine ? "Alguna foto no s'ha pogut pujar." : 'Cal connexió a internet per pujar fotos.', 4500);
});
$('#main').addEventListener('input', (e) => {
  if (e.target.id !== 'cercaMem') return;
  const q = normal(e.target.value.trim());
  let n = 0;
  document.querySelectorAll('[data-memcerca]').forEach((el) => { const si = !q || el.dataset.memcerca.includes(q); el.hidden = !si; if (si) n++; });
  const r = document.getElementById('memRes'); if (r) r.hidden = n > 0;
});
// La fitxa es desa sola mentre s'escriu, i també en sortir-ne (fletxa enrere, una altra pantalla, tancar l'app)
function desaFormMem(form) {
  if (!form || !form.isConnected) return null;
  const titol = form.elements.titol.value.replace(/\s*\n\s*/g, ' ').trim().slice(0, 500), text = form.elements.text.value.trim().slice(0, 3000);
  if (!titol) return null;
  const carpeta = carpetesMem().some((c) => c.id === form.elements.carpeta?.value) ? form.elements.carpeta.value : '';
  const id = form.dataset.memid === 'nova' ? form.dataset.creada : form.dataset.memid;
  const ara = new Date().toISOString();
  let f = id && state.memoria.find((x) => x.id === id);
  if (f) {
    if (f.titol === titol && (f.text || '') === text && (f.carpeta || '') === carpeta) return f;
    Object.assign(f, { titol, text, carpeta, modificat: ara });
  } else if (form.dataset.memid === 'nova' && !form.dataset.creada) {
    f = { id: nouId('m'), titol, text, carpeta, creat: ara };
    state.memoria.push(f); form.dataset.creada = f.id;
    if (ui.memEdita === 'nova') ui.memEdita = f.id;   // si la pantalla es redibuixa, continua sent aquesta fitxa
  } else return null;   // la fitxa s'ha esborrat mentrestant
  save();
  const av = form.querySelector('.mem-desat'); if (av) av.textContent = 'Desat ✓';
  return f;
}
$('#main').addEventListener('input', (e) => {
  const form = e.target.closest('#formMem');
  if (!form) return;
  const av = form.querySelector('.mem-desat'); if (av) av.textContent = 'Desant…';
  clearTimeout(tempsDesaMem); tempsDesaMem = setTimeout(() => desaFormMem(form), 700);
});
$('#main').addEventListener('change', (e) => { const form = e.target.closest('#formMem'); if (form && e.target.name === 'carpeta') desaFormMem(form); });
document.addEventListener('visibilitychange', () => { if (document.hidden) { clearTimeout(tempsDesaMem); desaFormMem(document.getElementById('formMem')); } });
addEventListener('pagehide', () => desaFormMem(document.getElementById('formMem')));
$('#main').addEventListener('submit', async (e) => {
  if (e.target.id !== 'formMem') return;
  e.preventDefault();
  const form = e.target;
  clearTimeout(tempsDesaMem);
  const nova = form.dataset.memid === 'nova', jaCreada = form.dataset.creada;
  const titol = form.elements.titol.value.replace(/\s*\n\s*/g, ' ').trim(), text = form.elements.text.value.trim();
  if (!titol) { form.elements.titol.focus(); return; }
  // Fitxa nova: es mira si ja n'hi ha una d'igual
  if (nova) {
    const rep = fitxaRepetida(titol, text, jaCreada);
    if (rep && !(await confirmaRepetida(rep))) {
      if (jaCreada) { state.memoria = state.memoria.filter((x) => x.id !== jaCreada); save(); }
      form.dataset.memid = 'descartada'; ui.memEdita = ''; render(); return;
    }
  }
  desaFormMem(form);
  form.dataset.memid = 'feta';
  ui.memEdita = ''; render();
  toast(/contrasenya|password|\bpw\b|\bpin\b/i.test(titol + ' ' + text) ? "Desat. Recorda: les contrasenyes, millor a l'app Contrasenyes de l'iPhone." : 'Desat', 4500);
});

/* ---------- Píndoles ---------- */
$('#main').addEventListener('click', (e) => {
  const t = e.target;
  if (t.closest('[data-pindoles]')) { ui.view = 'pindoles'; ui.pindTab = 'dies'; ui.pindDies = 30; render(); window.scrollTo(0, 0); return; }
  const tb = t.closest('[data-pdtab]');
  if (tb) { ui.pindTab = tb.dataset.pdtab; render(); return; }
  if (t.closest('[data-pdmes]')) { ui.pindDies = (ui.pindDies || 30) + 30; render(); return; }
  const fv = t.closest('[data-pdfav]');
  if (fv) {
    const text = fv.dataset.pdfav, llista = preferides().filter((x) => x !== text);
    if (llista.length === preferides().length) llista.push(text);
    state.ajustos.pindoles = llista; save();
    const y = window.scrollY; render(); window.scrollTo(0, y);
  }
});

// Frases pròpies: afegir, corregir i treure
$('#main').addEventListener('submit', (e) => {
  if (e.target.id !== 'formFrase') return;
  e.preventDefault();
  const text = $('#fraseText').value.trim().replace(/\s+/g, ' ');
  if (!text) { $('#fraseText').focus(); return; }
  const totes = [...frasesMeves().map((f) => f.text), ...PINDOLES];
  if (totes.some((t) => normal(t).replace(/[^a-z0-9]/g, '') === normal(text).replace(/[^a-z0-9]/g, ''))) {
    e.target.parentElement.querySelector('.ja-hi-es')?.remove();
    e.target.insertAdjacentHTML('afterend', '<p class="ja-hi-es">Aquesta frase ja hi és</p>');
    const avis = e.target.nextElementSibling; setTimeout(() => avis?.remove(), 2600);
    $('#fraseText').value = ''; $('#fraseText').focus(); return;
  }
  // Surt per primer cop el primer dia lliure a partir de demà
  const ocupats = new Set(frasesMeves().map((f) => f.des));
  let d = addDays(parseYmd(avui()), 1);
  while (ocupats.has(ymd(d))) d = addDays(d, 1);
  state.ajustos.frasesMeves = [...frasesMeves(), { id: nouId('f'), text: text.slice(0, 200), des: ymd(d) }];
  save(); render();
  const dies = Math.round((d - parseYmd(avui())) / 86400000);
  toast(dies === 1 ? 'Frase afegida: sortirà demà' : `Frase afegida: sortirà per primer cop el ${dataLlarga(ymd(d))}`, 4000);
  $('#fraseText')?.focus();
});
$('#main').addEventListener('click', (e) => {
  const tr = e.target.closest('[data-frasetreu]');
  if (tr) {
    const llista = frasesMeves(), f = llista.find((x) => x.id === tr.dataset.frasetreu);
    if (!f) return;
    state.ajustos.frasesMeves = llista.filter((x) => x !== f); save(); render();
    toastDesfes('Frase treta', () => { state.ajustos.frasesMeves = [...frasesMeves(), f]; save(); render(); });
    return;
  }
  const ed = e.target.closest('[data-frasedita]');
  if (ed) {
    const f = frasesMeves().find((x) => x.id === ed.dataset.frasedita);
    if (!f) return;
    demanaText('Corregeix la frase', f.text, { max: 200 }).then((nou) => {
      if (!nou || !nou.trim() || nou.trim() === f.text) return;
      state.ajustos.frasesMeves = frasesMeves().map((x) => (x.id === f.id ? { ...x, text: nou.trim().slice(0, 200) } : x));
      save(); render();
    });
  }
});

/* ---------- Documents ---------- */
function carregaImg(file) {
  return new Promise((ok, ko) => {
    const u = URL.createObjectURL(file), im = new Image();
    im.onload = () => { URL.revokeObjectURL(u); ok(im); };
    im.onerror = () => { URL.revokeObjectURL(u); ko(new Error('imatge')); };
    im.src = u;
  });
}
function redueix(im, max) {
  const w = im.naturalWidth, h = im.naturalHeight, s = Math.min(1, max / Math.max(w, h));
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w * s)); c.height = Math.max(1, Math.round(h * s));
  const x = c.getContext('2d');
  x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height);
  return c;
}
const MAX_DOC = 50 * 1024 * 1024;
// Puja un fitxer al núvol i el desa a Documents (les fotos es redueixen perquè no ocupin tant)
async function pujaUnDocument(file, titol) {
  const ext = ((file.name.match(/\.([a-z0-9]{1,8})$/i) || [])[1] || '').toLowerCase();
  const esFoto = /^image\/(jpeg|png|webp|heic|heif|gif)$/.test(file.type) || /^(jpe?g|png|webp|heic|heif)$/.test(ext);
  const id = nouId('d');
  let blob = file, tipus = file.type || 'application/octet-stream', mini = '', extFinal = ext || 'bin';
  if (esFoto) {
    try {
      const im = await carregaImg(file);
      blob = await new Promise((ok) => redueix(im, 2000).toBlob(ok, 'image/jpeg', 0.82));
      tipus = 'image/jpeg'; extFinal = 'jpg';
      mini = redueix(im, 240).toDataURL('image/jpeg', 0.6);
    } catch (x) { blob = file; }
  }
  const cami = await sync().pujaDoc(id, blob, tipus, extFinal);
  state.documents.push({ id, titol: titol.slice(0, 80), tipus, cami, nomFitxer: file.name.slice(0, 120), mida: blob.size, mini, carpeta: carpetaOberta('docs') || '', creat: new Date().toISOString() });
  save();
}
const nomPerDefecte = (file) => {
  const nomNet = file.name.replace(/\.[a-z0-9]{1,8}$/i, '');
  return /^(image|img|photo|foto|dsc|pxl)[\s_-]?\d*/i.test(nomNet) ? 'Document ' + new Date().toLocaleDateString('ca-ES') : nomNet || 'Document';
};
$('#main').addEventListener('change', async (e) => {
  if (e.target.id !== 'docFitxer' && e.target.id !== 'docFoto') return;
  const tots = [...(e.target.files || [])];
  e.target.value = '';
  if (!tots.length) return;
  const grans = tots.filter((f) => f.size > MAX_DOC), files = tots.filter((f) => f.size <= MAX_DOC);
  if (grans.length) toast(grans.length === 1 ? `«${grans[0].name}» fa ${midaText(grans[0].size)} i el màxim són 50 MB.` : `${grans.length} fitxers passen de 50 MB i no es pujaran.`, 5000);
  if (!files.length) return;
  // Un sol fitxer: es demana el nom. Diversos: cadascun amb el seu nom de fitxer (després es pot canviar)
  let titolUn = '';
  if (files.length === 1) {
    titolUn = await demanaText('Nom del document', nomPerDefecte(files[0]), { max: 80 });
    if (titolUn === null) return;
    const rep = docRepetit({ titol: titolUn.trim() || nomPerDefecte(files[0]), nomFitxer: files[0].name.slice(0, 120), mida: files[0].size });
    if (rep && !(await confirmaDocRepetit(rep))) return;
  } else {
    const repetits = files.filter((f) => docRepetit({ nomFitxer: f.name.slice(0, 120), mida: f.size }));
    if (repetits.length) {
      toast(`${repetits.length === 1 ? '1 ja el tenies' : repetits.length + ' ja els tenies'} i no es tornen a pujar: ${repetits.map((f) => f.name).join(', ')}`, 6000);
      files.splice(0, files.length, ...files.filter((f) => !repetits.includes(f)));
      if (!files.length) return;
    }
  }
  ui.docPujant = true; render();
  let fets = 0, errors = 0;
  for (const f of files) {
    if (files.length > 1) { const b = document.querySelector('.doc-afegeix'); if (b) b.lastChild.textContent = `Pujant ${fets + errors + 1} de ${files.length}…`; }
    try { await pujaUnDocument(f, (files.length === 1 ? titolUn.trim() : '') || nomPerDefecte(f)); fets++; }
    catch (err) { errors++; if (!navigator.onLine) break; }
  }
  ui.docPujant = false; render();
  if (!errors) toast(fets === 1 ? 'Document desat' : `${fets} documents desats`);
  else toast(!navigator.onLine ? 'Cal connexió a internet per pujar documents.' : `${fets} desats, ${errors} no s'han pogut pujar.`, 4500);
});
// Documents repetits: el mateix enllaç, el mateix fitxer (nom i mida) o el mateix nom (sense la data del final)
const titolBase = (t) => normal(String(t || '').replace(/\s*\d{1,2}\/\d{1,2}\/\d{2,4}\s*$/, '')).trim();
function docRepetit({ titol = '', url = '', nomFitxer = '', mida = 0 }) {
  const tb = titolBase(titol);
  return state.documents.find((d) => (url && d.url && urlNetaApp(d.url) === urlNetaApp(url))
    || (nomFitxer && mida && d.nomFitxer === nomFitxer && d.mida === mida)
    || (tb && tb !== 'document' && titolBase(d.titol) === tb));   // «Document» a seques és el nom genèric: no compta
}
async function confirmaDocRepetit(d) {
  const op = await triaOpcio('Aquest document ja el tens', [
    ['no', 'No el desis', `Ja hi ha «${d.titol}» a ${nomCarpeta('docs', carpetaItem('docs', d))}`],
    ['si', "Desa'l igualment", ''],
  ]);
  return op === 'si';
}
// Enllaç a una pàgina web: no es puja cap fitxer, només es guarda l'adreça
$('#main').addEventListener('click', async (e) => {
  if (!e.target.closest('[data-docenllac]')) return;
  let url = ((await demanaText("Adreça de la pàgina web", '', { tipus: 'url', max: 2000, placeholder: 'Enganxa-la aquí' })) || '').trim();
  if (!url) return;
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  if (!/^https?:\/\/[^\s.]+\.[^\s]+$/i.test(url)) { toast('Aquesta adreça no sembla correcta.'); return; }
  const titol = await demanaText('Nom del document', domini(url), { max: 80 });
  if (titol === null) return;
  const rep = docRepetit({ titol: titol.trim() || domini(url), url });
  if (rep && !(await confirmaDocRepetit(rep))) return;
  state.documents.push({ id: nouId('d'), titol: (titol.trim() || domini(url)).slice(0, 80), tipus: 'enllac', url: url.slice(0, 2000), carpeta: carpetaOberta('docs') || '', creat: new Date().toISOString() });
  save(); render(); toast('Enllaç desat');
});
$('#main').addEventListener('click', (e) => {
  const b = e.target.closest('[data-docfiltre]');
  if (!b) return;
  ui.docFiltre = b.dataset.docfiltre; render();
});
$('#main').addEventListener('input', (e) => {
  if (e.target.id !== 'cercaDoc') return;
  ui.docCerca = e.target.value;
  const q = normal(e.target.value.trim());
  const ini = document.getElementById('docInici'), totsD = document.getElementById('docTots');
  if (ini) ini.hidden = Boolean(q);
  if (totsD) totsD.hidden = !q;
  let n = 0;
  document.querySelectorAll('[data-doccerca]').forEach((el) => { el.hidden = Boolean(q) && !el.dataset.doccerca.includes(q); if (!el.hidden) n++; });
  const r = document.getElementById('docRes'); if (r) r.hidden = n > 0;
});
// Visor a pantalla completa: imatge, o botó per obrir el PDF
// Ampliar la imatge: pessigar amb dos dits, arrossegar amb un dit i doble toc per ampliar o tornar a la mida
function ampliable(cos, img) {
  let s = 1, x = 0, y = 0, ini = null, ultimToc = 0;
  const limita = () => {
    const mx = (img.offsetWidth * (s - 1)) / 2, my = (img.offsetHeight * (s - 1)) / 2;
    x = Math.max(-mx, Math.min(mx, x)); y = Math.max(-my, Math.min(my, y));
  };
  const aplica = (anima) => { img.style.transition = anima ? 'transform .2s ease' : 'none'; img.style.transform = `translate(${x}px, ${y}px) scale(${s})`; };
  const dist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  cos.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) ini = { d: dist(e.touches), s, x, y, mx: (e.touches[0].clientX + e.touches[1].clientX) / 2, my: (e.touches[0].clientY + e.touches[1].clientY) / 2 };
    else if (e.touches.length === 1) {
      const ara = Date.now();
      if (ara - ultimToc < 300) {   // doble toc
        if (s > 1) { s = 1; x = 0; y = 0; }
        else {
          const r = cos.getBoundingClientRect();
          s = 2.5; x = -(e.touches[0].clientX - (r.left + r.width / 2)) * 1.5; y = -(e.touches[0].clientY - (r.top + r.height / 2)) * 1.5; limita();
        }
        aplica(true); ultimToc = 0; ini = null; return;
      }
      ultimToc = ara;
      ini = { px: e.touches[0].clientX, py: e.touches[0].clientY, x, y };
    }
  }, { passive: true });
  cos.addEventListener('touchmove', (e) => {
    if (!ini) return;
    e.preventDefault();
    if (e.touches.length === 2 && ini.d) {
      s = Math.max(1, Math.min(6, ini.s * dist(e.touches) / ini.d));
      const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2, my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      x = ini.x + (mx - ini.mx); y = ini.y + (my - ini.my);
    } else if (e.touches.length === 1 && ini.px !== undefined && s > 1) {
      x = ini.x + e.touches[0].clientX - ini.px; y = ini.y + e.touches[0].clientY - ini.py;
    } else return;
    limita(); aplica(false);
  }, { passive: false });
  cos.addEventListener('touchend', (e) => {
    if (e.touches.length === 1) ini = { px: e.touches[0].clientX, py: e.touches[0].clientY, x, y };
    else if (!e.touches.length) { ini = null; if (s < 1.05) { s = 1; x = 0; y = 0; aplica(true); } }
  });
  // A l'ordinador: roda del ratolí
  cos.addEventListener('wheel', (e) => { e.preventDefault(); s = Math.max(1, Math.min(6, s * (e.deltaY < 0 ? 1.15 : 0.87))); if (s === 1) { x = 0; y = 0; } limita(); aplica(false); }, { passive: false });
}
// Els PDF es veuen dins de l'app: totes les pàgines una sota l'altra; tocant-ne una, s'amplia
let pdfjsPromesa = null;
function carregaPdfjs() {
  if (!pdfjsPromesa) {
    pdfjsPromesa = carregaScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js').then(() => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      return true;
    }).catch((e) => { pdfjsPromesa = null; throw e; });
  }
  return pdfjsPromesa;
}
async function mostraPdf(cos, url, v) {
  await carregaPdfjs();
  const pdf = await window.pdfjsLib.getDocument({ url }).promise;
  if (!document.body.contains(v)) return;
  const amp = Math.min(1600, Math.round((cos.clientWidth || innerWidth) * (devicePixelRatio || 1)));
  const pagines = [];
  for (let i = 1; i <= Math.min(pdf.numPages, 40); i++) {
    const p = await pdf.getPage(i), vp0 = p.getViewport({ scale: 1 }), vp = p.getViewport({ scale: amp / vp0.width });
    const c = document.createElement('canvas'); c.width = Math.round(vp.width); c.height = Math.round(vp.height);
    await p.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
    pagines.push(c.toDataURL('image/jpeg', 0.85));
    if (!document.body.contains(v)) return;
  }
  const ampliaPagina = (i) => {
    cos.classList.remove('pagines');
    // El zoom va dins d'una caixa pròpia: en tornar a la llista de pàgines desapareix i es pot tornar a lliscar
    cos.innerHTML = `<div class="doc-zoomcaixa"><img src="${pagines[i]}" alt="Pàgina ${i + 1}" draggable="false"></div>`;
    ampliable(cos.firstChild, cos.querySelector('img'));
    if (pagines.length > 1) {
      const torna = document.createElement('button');
      torna.type = 'button'; torna.className = 'btn doc-totes'; torna.textContent = `‹ Totes les pàgines (${pagines.length})`;
      torna.onclick = (e) => { e.stopPropagation(); mostraTotes(); };
      cos.appendChild(torna);
    }
  };
  const mostraTotes = () => {
    cos.classList.add('pagines');
    cos.innerHTML = pagines.map((src, i) => `<button type="button" class="doc-pagina" data-pag="${i}"><img src="${src}" alt="Pàgina ${i + 1}"><small>${i + 1} / ${pagines.length}</small></button>`).join('');
    cos.querySelectorAll('[data-pag]').forEach((b) => { b.onclick = () => ampliaPagina(Number(b.dataset.pag)); });
  };
  if (pagines.length === 1) ampliaPagina(0); else mostraTotes();
  v.querySelector('.doc-zoom')?.remove();
  v.querySelector('.doc-visor-cap').insertAdjacentHTML('afterend', `<p class="help doc-zoom">${pagines.length > 1 ? 'Toca una pàgina per ampliar-la' : 'Pessiga amb dos dits o toca dues vegades per ampliar'}</p>`);
}
function tancaVisor() { document.querySelector('.doc-visor')?.remove(); }
// Visor a pantalla completa: la foto (amb zoom), o una fitxa amb el tipus i el botó per obrir-lo
async function obreVisor(doc) {
  tancaVisor();
  const cat = catDoc(doc), esEnllac = cat === 'enllac', esFoto = cat === 'foto' && doc.tipus === 'image/jpeg';
  const v = document.createElement('div');
  v.className = 'doc-visor';
  v.innerHTML = `<div class="doc-visor-cap"><button type="button" class="sat-torna" data-visor="tanca">‹ Tanca</button><b>${esc(doc.titol)}</b></div>
    <div class="doc-visor-cos"><p class="help">Carregant…</p></div>
    <div class="doc-visor-peu"><a class="btn primary" data-visor="obre" target="_blank" rel="noopener" hidden>${esEnllac ? 'Obre la pàgina' : 'Obre / Comparteix'}</a>
      ${esEnllac ? '<button type="button" class="btn" data-visor="comparteix">Comparteix</button>' : '<button type="button" class="btn" data-visor="imprimeix" hidden>Imprimeix</button>'}
      ${triaCarpeta('docs', doc)}<button type="button" class="enllac" data-visor="envia">Envia una còpia</button><button type="button" class="enllac" data-visor="nom">Canvia el nom</button><button type="button" class="enllac perill" data-visor="esborra">Esborra</button></div>`;
  document.body.appendChild(v);
  v.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-visor]');
    if (!b) return;
    const acc = b.dataset.visor;
    if (acc === 'tanca') { tancaVisor(); return; }
    if (acc === 'envia') {
      if (!usuari()) { toast('Per enviar còpies cal haver entrat amb el teu correu.'); return; }
      await enviaCopia('docs', doc.titol, { docs: await docsPerEnviar([doc]) }, `«${doc.titol}»`);
      return;
    }
    if (acc === 'comparteix') {
      if (navigator.share) { try { await navigator.share({ title: doc.titol, url: doc.url }); return; } catch (x) { if (x.name === 'AbortError') return; } }
      try { await navigator.clipboard.writeText(doc.url); toast('Enllaç copiat'); } catch (x) { prompt("Copia l'enllaç:", doc.url); }
      return;
    }
    if (acc === 'imprimeix') {
      const url = v.querySelector('[data-visor="obre"]').href;
      if (!url) return;
      if (!esFoto) {   // els altres documents s'imprimeixen des del visor de l'iPhone
        window.open(url, '_blank', 'noopener');
        toast('Al document, toca Compartir i després Imprimir', 5000);
        return;
      }
      imprimeixFull(`<div class="doc-imp"><img src="${esc(url)}" alt=""></div>`);
      return;
    }
    if (acc === 'nom') {
      const nou = await demanaText('Nom del document', doc.titol, { max: 80 });
      if (nou && nou.trim()) { doc.titol = nou.trim().slice(0, 80); save(); render(); v.querySelector('.doc-visor-cap b').textContent = doc.titol; }
      return;
    }
    if (acc === 'esborra') {
      if (b.dataset.segur !== '1') { b.dataset.segur = '1'; b.textContent = "Segur? Toca'l un altre cop"; return; }
      try {
        if (doc.cami) await sync().esborraDoc(doc.cami);
        state.documents = state.documents.filter((x) => x.id !== doc.id);
        save(); tancaVisor(); render(); toast('Document esborrat');
      } catch (err) { toast(navigator.onLine ? "No s'ha pogut esborrar." : 'Cal connexió a internet.'); }
    }
  });
  const cos = v.querySelector('.doc-visor-cos'), obre = v.querySelector('[data-visor="obre"]');
  const fitxa = (detall) => `<div class="doc-pdf" style="--fc:${CATS_DOC.find((c) => c.id === cat).c}"><b>${esc(etiquetaDoc(doc))}</b><p class="doc-detall">${detall}</p></div>`;
  if (esEnllac) {
    obre.href = doc.url; obre.hidden = false;
    cos.innerHTML = fitxa(`<span class="doc-url">${esc(doc.url)}</span>`);
    return;
  }
  try {
    // Les fotos i els PDF s'obren dins del navegador; la resta es descarreguen amb el seu nom
    const url = await sync().urlDoc(doc.cami, esFoto || cat === 'pdf' ? '' : doc.nomFitxer || (doc.titol + '.' + extDoc(doc)));
    if (!document.body.contains(v)) return;
    obre.href = url; obre.hidden = false; v.querySelector('[data-visor="imprimeix"]').hidden = false;
    if (esFoto) {
      cos.innerHTML = `<img src="${esc(url)}" alt="${esc(doc.titol)}" draggable="false">`;
      ampliable(cos, cos.querySelector('img'));
      v.querySelector('.doc-visor-cap').insertAdjacentHTML('afterend', '<p class="help doc-zoom">Pessiga amb dos dits o toca dues vegades per ampliar</p>');
    } else if (cat === 'pdf') {
      try { await mostraPdf(cos, url, v); }
      catch (e2) { cos.innerHTML = fitxa(`${esc(doc.nomFitxer || '')}<br><span class="help">Toca «Obre / Comparteix» per veure'l.</span>`); }
    } else {
      cos.innerHTML = fitxa(`${esc(doc.nomFitxer || '')}${doc.mida ? '<br>' + esc(midaText(doc.mida)) : ''}<br><span class="help">Toca «Obre / Comparteix» per veure'l, desar-lo o enviar-lo.</span>`);
    }
  } catch (err) {
    cos.innerHTML = `<p class="help">${navigator.onLine ? "No s'ha pogut obrir el document." : 'Cal connexió a internet per veure el document.'}</p>`;
  }
}
$('#main').addEventListener('click', (e) => {
  const b = e.target.closest('[data-docobre]');
  if (!b) return;
  const doc = state.documents.find((x) => x.id === b.dataset.docobre);
  if (!doc) return;
  if (!usuari() && doc.tipus !== 'enllac') { toast('Per veure els documents cal haver entrat amb el correu.'); return; }
  obreVisor(doc);
});

/* ---------- Lliscar un pla cap a l'esquerra: Confirma / Esborra ---------- */
let llisc = null, murObert = null;
const ampleAccions = (m) => m.querySelector('.pla-accions').offsetWidth;
function tancaMur(m = murObert) { if (!m) return; m.querySelector('.pla').style.transform = ''; m.classList.remove('obert'); if (murObert === m) murObert = null; }
function obreMur(m) { if (murObert && murObert !== m) tancaMur(); m.classList.add('obert'); m.querySelector('.pla').style.transform = `translateX(-${ampleAccions(m)}px)`; murObert = m; }
$('#main').addEventListener('touchstart', (e) => {
  const m = e.target.closest('.pla-mur');
  if (murObert && murObert !== m) tancaMur();
  if (!m || e.target.closest('.pla-accions') || e.touches.length !== 1) { llisc = null; return; }
  llisc = { m, x: e.touches[0].clientX, y: e.touches[0].clientY, ini: m.classList.contains('obert') ? -ampleAccions(m) : 0, mou: false };
}, { passive: true });
$('#main').addEventListener('touchmove', (e) => {
  if (!llisc) return;
  const dx = e.touches[0].clientX - llisc.x, dy = e.touches[0].clientY - llisc.y;
  if (!llisc.mou) {
    if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) { if (Math.abs(dy) > 10) llisc = null; return; }
    llisc.mou = true; cancelaPremut(); llisc.m.classList.add('mou');
  }
  const x = Math.max(-ampleAccions(llisc.m) - 30, Math.min(0, llisc.ini + dx));
  llisc.m.querySelector('.pla').style.transform = `translateX(${x}px)`;
}, { passive: true });
$('#main').addEventListener('touchend', (e) => {
  if (!llisc) return;
  const { m, mou, ini, x: x0 } = llisc;
  llisc = null;
  if (!mou) return;
  m.classList.remove('mou');
  ignoraClic = true; setTimeout(() => { ignoraClic = false; }, 350);   // que no s'obri el pla en deixar anar
  const dx = e.changedTouches[0].clientX - x0;
  if (ini + dx < -ampleAccions(m) / 2) obreMur(m); else tancaMur(m);
}, { passive: true });
$('#main').addEventListener('click', (e) => {
  const b = e.target.closest('[data-acc]');
  if (b) {
    e.preventDefault(); e.stopPropagation();
    const p0 = trobaPla(b.dataset.accpla), p = p0?.base || p0;
    if (!p) return;
    if (b.dataset.acc === 'confirma') {
      Object.assign(p, { estat: 'confirmat', versio: (p.versio || 1) + 1, modificat: new Date().toISOString() });
      save(); render(); toast('Pla confirmat');
      return;
    }
    if (p.repeteix) { tancaMur(); eliminaPla(p); return; }   // es repeteix: es demana confirmació
    const copia = JSON.parse(JSON.stringify(p)), lloc = state.plans.findIndex((x) => x.id === p.id);
    state.plans = state.plans.filter((x) => x.id !== p.id);
    save(); render();
    toastDesfes(`Esborrat: ${titolPla(p)}`, () => { state.plans.splice(Math.max(0, lloc), 0, copia); save(); render(); });
    return;
  }
  // Tocar un pla obert el tanca (no l'obre)
  if (murObert && e.target.closest('.pla-mur') === murObert) { e.preventDefault(); e.stopImmediatePropagation(); tancaMur(); }
}, true);
// Avís amb botó «Desfés» durant uns segons
function toastDesfes(text, desfes) {
  document.querySelector('.toast-desfes')?.remove();
  const t = document.createElement('div');
  t.className = 'toast-desfes';
  t.innerHTML = `<span>${esc(text)}</span><button type="button">Desfés</button>`;
  t.querySelector('button').onclick = () => { desfes(); t.remove(); toast('Recuperat'); };
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 5000);
}

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

/* ---------- Ajustos: persones convidades ---------- */
$('#main').addEventListener('click', (e) => {
  const b = e.target.closest('[data-tema]');
  if (!b) return;
  state.ajustos.tema = b.dataset.tema === 'auto' ? '' : b.dataset.tema; save(); render();
});
// Triar la icona (fosca o crua) i copiar l'enllaç per tornar-la a afegir des de Safari
const enllacIcona = () => location.origin + location.pathname.replace(/index\.html$/, '') + '?icona=' + llegeixPref('icona', 'fosca');
$('#main').addEventListener('click', async (e) => {
  const b = e.target.closest('[data-icona]');
  if (b) { desaPref('icona', b.dataset.icona); render(); return; }
  if (!e.target.closest('#iconaCopia')) return;
  const url = enllacIcona();
  try { await navigator.clipboard.writeText(url); toast("Enllaç copiat: obre Safari i enganxa'l", 4500); } catch (x) { demanaText("Copia aquest enllaç i obre'l a Safari", url); }
});
// Canviar el mode propi (Ajustos) o el d'una persona convidada (administrador)
$('#main').addEventListener('click', (e) => {
  const b = e.target.closest('[data-mode]');
  if (!b || (b.dataset.mode === 'agenda') === modeAgenda()) return;
  state.ajustos.mode = b.dataset.mode; save(); render();
  toast(b.dataset.mode === 'agenda' ? "Ara a l'inici només hi haurà l'Agenda" : 'Ara en obrir l\'app veuràs la galàxia');
});
$('#main').addEventListener('change', async (e) => {
  const s = e.target.closest('[data-modeconv]');
  if (!s) return;
  try {
    await sync().modeConvidat(s.dataset.modeconv, s.value);
    const c = (admin.llista || []).find((x) => x.email === s.dataset.modeconv); if (c) c.mode = s.value;
    toast(`Mode ${s.value === 'agenda' ? 'Agenda' : 'Galàxia'} per a ${c?.nom || s.dataset.modeconv}`);
  } catch (err) { toast(navigator.onLine ? "No s'ha pogut canviar. Has executat l'SQL dels modes?" : 'Cal connexió a internet.'); }
});
async function carregaAdmin(forca = false) {
  const u = usuari();
  if (!u) { admin.es = false; admin.mirat = ''; admin.llista = null; return; }
  if (!forca && admin.mirat === u.id) return;
  admin.mirat = u.id;
  admin.es = await sync().esAdmin();
  admin.llista = null;
  if (admin.es) { try { admin.llista = await sync().convidats(); } catch (e) { admin.llista = []; } }
  if (ui.view === 'ajustos') render();
}
async function convidaEmail(email, nom = '', mode = 'galaxia') {
  if (!admin.es || !emailValid(email)) return false;
  if ((admin.llista || []).some((c) => normal(c.email) === normal(email))) return false;
  await sync().convida(email, nom, mode);
  admin.llista = await sync().convidats();
  return true;
}
$('#main').addEventListener('submit', async (e) => {
  if (e.target.id !== 'formConvida') return;
  e.preventDefault();
  const f = e.target, email = f.email.value.trim().toLowerCase(), nom = f.nom.value.trim(), mode = f.mode?.value || 'galaxia';
  if (!emailValid(email)) { toast('Aquest correu no sembla correcte'); return; }
  try {
    const nou = await convidaEmail(email, nom, mode);
    toast(nou ? `${nom || email} ja pot entrar a l'app` : 'Aquesta persona ja hi era');
    render();
  } catch (err) { toast(navigator.onLine ? "No s'ha pogut afegir. Torna-ho a provar." : 'Cal connexió a internet.'); }
});
$('#main').addEventListener('click', async (e) => {
  const b = e.target.closest('[data-desconvida]');
  if (!b) return;
  const email = b.dataset.desconvida;
  if (b.dataset.segur !== '1') { b.dataset.segur = '1'; b.textContent = 'Segur? Toca per treure'; return; }
  try { await sync().desconvida(email); admin.llista = await sync().convidats(); toast('Tret de la llista'); render(); }
  catch (err) { toast("No s'ha pogut treure. Torna-ho a provar."); }
});

/* ---------- Ajustos: enllaç de veu ---------- */
$('#main').addEventListener('click', async (e) => {
  const b = e.target.closest('#veuCopia, #veuNou, #veuDesa, #veuDoc');
  if (!b) return;
  if (b.id === 'veuNou' && b.dataset.segur !== '1') { b.dataset.segur = '1'; b.textContent = "segur? toca'l un altre cop"; return; }
  try {
    const url = (await sync().enllacVeu(b.id === 'veuNou')) + (b.id === 'veuDesa' ? '&desa=1' : b.id === 'veuDoc' ? '&doc=1' : '');
    try { await navigator.clipboard.writeText(url); toast(b.id === 'veuNou' ? 'Enllaç nou copiat: posa\'l a la Drecera' : 'Enllaç copiat'); }
    catch (x) { prompt('Copia aquest enllaç:', url); }
  } catch (err) {
    toast(navigator.onLine ? "No s'ha pogut preparar l'enllaç. Comprova que a Supabase hi ha la funció «veu»." : 'Cal connexió a internet.');
  }
});

/* ---------- Ajustos: subscripció al calendari ---------- */
$('#main').addEventListener('click', async (e) => {
  const b = e.target.closest('#calSubscriu, #calCopia, #calNou, [data-calg]');
  if (!b) return;
  if (b.id === 'calNou' && !confirm("Fer un enllaç nou? L'antic deixarà de funcionar i t'hauràs de tornar a subscriure des de l'iPhone.")) return;
  try {
    const en = await sync().enllacCalendari(b.id === 'calNou');
    if (b.id === 'calSubscriu') { location.href = en.webcal; return; }
    if (b.dataset.calg) { location.href = en.webcal + '&g=' + encodeURIComponent(b.dataset.calg); b.classList.add('fet'); return; }
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
          const detalls = [p.lloc || '', n.length && (p.titol || '').trim() ? 'Amb ' + llistaNoms(n) : '', p.extern ? p.extern.nom : ''].filter(Boolean);
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
      return `☐ ${p.totElDia || !p.hora ? 'Tot el dia' : p.hora + (p.horaFi ? '–' + p.horaFi : '')} · ${titolPla(p)}${p.lloc ? ' · ' + p.lloc : ''}${n.length && (p.titol || '').trim() ? ' · amb ' + llistaNoms(n) : ''}`;
    }) : ['(cap activitat)'])].join('\n');
  }).filter(Boolean).join('\n\n');
}
function obreLlista(quin) {
  const dies = diesLlista(quin);
  const titol = quin === 'dia' ? 'Llista del dia' : 'Llista de la setmana';
  obreDlg(`<header class="dlg-cap"><h2>${titol}</h2><button type="button" class="x" data-tanca aria-label="Tanca">×</button></header>
    <div class="dlg-cos"><div class="llista-full">${htmlLlista(dies)}</div></div>
    <footer class="dlg-peu">
      <button type="button" class="btn" id="llText">Envia el text</button>
      <button type="button" class="btn primary" id="llImprimeix">Imprimeix</button>
    </footer>`, 'form');
  dlgForm.onclick = async (e) => {
    if (e.target.closest('#llImprimeix')) {
      // Es prepara un full a part (fora de la finestra) i s'imprimeix només aquest
      const full = $('#impressio');
      full.innerHTML = `<div class="llista-full imprès"><p class="ll-app">Galàxia</p>${htmlLlista(dies)}</div>`;
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
  if (ui.view !== 'calendari' || e.touches.length !== 1 || e.target.closest('.pla-mur')) { toc = null; return; }
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
function tancaDlg() {
  if (!dlg.open) return;
  // El formulari obert pot voler desar abans de tancar (el pla es desa sol); si torna false, no es tanca
  const abans = dlgForm.abansDeTancar;
  if (abans) { dlgForm.abansDeTancar = null; if (abans() === false) { if (!dlgForm.abansDeTancar) dlgForm.abansDeTancar = abans; return; } }
  if (dlg.open) dlg.close();
}
// La tecla Esc també passa per tancaDlg
dlg.addEventListener('cancel', (e) => { if (dlgForm.abansDeTancar) { e.preventDefault(); tancaDlg(); } });
dlg.addEventListener('click', (e) => {
  if (e.target === dlg || e.target.closest('[data-tanca]')) tancaDlg();
});
function obreDlg(html, classe = '') {
  dlgForm.onsubmit = null; dlgForm.onclick = null; dlgForm.onchange = null; dlgForm.oninput = null; dlgForm.abansDeTancar = null;
  dlgForm.className = classe;
  dlgForm.innerHTML = html;
  if (!dlg.open) dlg.showModal();
  dlgForm.scrollTop = 0;
}

$('#main').addEventListener('click', (e) => {
  const b = e.target.closest('[data-dmtreu]');
  if (!b) return;
  const pe = pers(ui.persona);
  pe[b.dataset.dmtreu] = ''; save(); toast('Tret');
  b.closest('.dm').querySelectorAll('input').forEach((x) => { x.value = ''; });
  b.remove();
});
// Caselles de data: en tocar-ne una, se selecciona el que hi ha i el que escriguis ho substitueix
$('#main').addEventListener('focusin', (e) => {
  const t = e.target;
  if (!t.dataset?.dm && !(t.dataset && 'triatot' in t.dataset)) return;
  const tria = () => { try { t.setSelectionRange(0, t.value.length); } catch (x) { t.select?.(); } };
  tria(); setTimeout(tria, 30);
});
// Si ja estava seleccionat i s'hi torna a tocar, l'iPhone treu la selecció: es torna a seleccionar
$('#main').addEventListener('mouseup', (e) => { if (e.target.dataset?.dm && document.activeElement === e.target) { e.preventDefault(); } });
// Botó per buidar la cerca de contactes d'un toc
$('#main').addEventListener('click', (e) => {
  if (!e.target.closest('#cercaGentX')) return;
  const c = $('#cercaGent');
  c.value = '';
  c.dispatchEvent(new Event('input', { bubbles: true }));
  c.focus();
});
/* ---------- Detall d'un aniversari ---------- */
function obreExtern(p) {
  obreDlg(`<header class="det-cap" style="--c:${esc(p._t.color)}">
      <span class="det-emoji">${ico(p._t)}</span>
      <div><small>${esc(p.extern.nom)}</small><h2>${esc(p.titol)}</h2></div>
      <button type="button" class="x" data-tanca aria-label="Tanca">×</button>
    </header>
    <div class="dlg-cos">
      <ul class="det">
        <li><span class="et">Quan</span>${esc(cap(dataLlarga(p.data)))}</li>
        <li><span class="et">Hora</span>${esc(horaText(p))}</li>
        ${p.lloc ? `<li><span class="et">On</span><a href="${esc(mapaDe(p))}" target="_blank" rel="noopener">${esc(p.lloc)}</a></li>` : ''}
        ${p.notes ? `<li class="notes"><span class="et">Notes</span><div>${esc(p.notes).replace(/\n/g, '<br>')}</div></li>` : ''}
      </ul>
      <p class="help">Ve del calendari «${esc(p.extern.nom)}». Per canviar-lo, fes-ho a la seva app.</p>
    </div>`, 'detall');
}
function obreAniversari(p) {
  const pe = p.aniversari;
  obreDlg(`<header class="det-cap" style="--c:${esc(p._t.color)}">
      <span class="det-emoji">${ico(p._t)}</span>
      <div><small>${p.sant ? 'Sant' : 'Aniversari'}</small><h2>${esc(p.titol)}</h2></div>
      <button type="button" class="x" data-tanca aria-label="Tanca">×</button>
    </header>
    <div class="dlg-cos">
      <ul class="det">
        <li><span class="et">Dia</span>${esc(cap(dataLlarga(p.data)))}</li>
        ${falten(p.data) ? `<li><span class="et">Falten</span>${esc(cap(falten(p.data)))}</li>` : ''}
        ${pe.tel ? `<li><span class="et">Telèfon</span>${esc(pe.tel)}</li>` : ''}
      </ul>
      <p class="help">Surt sol cada any perquè la fitxa de ${esc(pe.nom)} té ${p.sant ? 'el sant' : "l'aniversari"}. Per canviar-lo o treure'l, edita la fitxa.</p>
    </div>
    <footer class="dlg-peu det-accions">
      ${pe.tel ? `<a class="btn primary" href="https://wa.me/${esc(waNum(pe.tel))}" target="_blank" rel="noopener">Felicita'l per WhatsApp</a>` : ''}
      <button type="button" class="btn" id="aFitxa">Fitxa de ${esc(pe.nom)}</button>
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
  const whatsapp = ambTel.length ? `<li><span class="et">WhatsApp</span><div><div class="wa-botons">${ambTel.map((pe) =>
    `<a class="btn wa" href="https://wa.me/${esc(waNum(pe.tel))}?text=${encodeURIComponent(textPla(p, pe))}" target="_blank" rel="noopener">${esc(pe.nom)}</a>`).join('')}</div>
      <small class="hint">S'obre el xat amb el missatge escrit: només has de prémer Enviar.</small></div></li>` : '';
  const enviat = (p.compartit || []).length
    ? `<li><span class="et">App</span><div><ul class="respostes">${(p.compartit || []).map((em) => {
      const x = resp.find((y) => y.email === em);
      return `<li><b>${esc(nomDeCorreu(em))}</b> <small>${esc(RESPOSTES[x?.resposta || 'pendent'])}</small></li>`;
    }).join('')}</ul>${usuari() ? '' : '<small class="hint">Entra amb el teu correu perquè els arribi.</small>'}</div></li>` : '';
  const peu = r
    ? `<button type="button" class="btn${r.resposta === 'si' ? ' primary' : ''}" data-respon="si">Hi vaig</button>
       <button type="button" class="btn${r.resposta === 'no' ? ' primary' : ''}" data-respon="no">No hi vaig</button>
       <button type="button" class="btn" id="dCalendari">Al meu calendari</button>`
    : `<button type="button" class="btn primary" id="dComparteix">Comparteix</button>
       <button type="button" class="btn" id="dCalendari">Al meu calendari</button>
       <button type="button" class="btn" id="dEdita">Edita</button>
       <button type="button" class="btn" id="dDuplica">Duplica</button>`;
  obreDlg(`<header class="det-cap" style="--c:${esc(t.color)}">
      <span class="det-emoji">${ico(t)}</span>
      <div><small>${esc(t.nom)}</small><h2>${esc(titolPla(p))}</h2></div>
      <button type="button" class="x" data-tanca aria-label="Tanca">×</button>
    </header>
    <div class="dlg-cos">
      <ul class="det">
        ${r ? `<li><span class="et">De part de</span><b>${esc(r.de_nom || r.de_email)}</b></li>` : ''}
        <li><span class="et">Quan</span>${esc(textDies(vista.data, vista.dataFi))}</li>
        ${p.repeteix ? `<li><span class="et">Es repeteix</span>${esc(nomRepeticio(p.repeteix))}${p.repeteixFins ? esc(', fins al ' + dataLlarga(p.repeteixFins)) : ''}</li>` : ''}
        <li><span class="et">Hora</span>${esc(horaSola(p))}</li>
        ${p.lloc || p.llocUrl ? `<li><span class="et">On</span><a href="${esc(mapaDe(p))}" target="_blank" rel="noopener">${esc(p.lloc || 'Obre la ubicació al mapa')}</a></li>` : ''}
        ${n.length ? `<li><span class="et">Qui</span>${esc(llistaNoms(n))}</li>` : ''}
        ${p.estat !== 'confirmat' ? `<li><span class="et">Estat</span>${esc((ESTATS.find((e) => e[0] === p.estat) || [, ''])[1])}</li>` : ''}
        ${p.notes ? `<li class="notes"><span class="et">Notes</span><div>${esc(p.notes).replace(/\n/g, '<br>')}</div></li>` : ''}
        ${enviat}
        ${whatsapp}
        ${r && r.resposta === 'pendent' ? '<li><span class="et">Resposta</span>Encara no has dit si hi vas.</li>' : ''}
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
  const quan = textDies(p.data, p.dataFi);
  return [
    titolPer(p, pe),
    `${quan}${p.totElDia || !p.hora ? '' : ' · ' + horaSola(p)}`,
    p.lloc ? p.lloc : '',
    p.llocUrl ? p.llocUrl : '',
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
          ? `<a class="btn primary" href="${esc(Cal.urlIcs(e))}" target="_blank" rel="noopener">Calendari de l'iPhone / Mac</a>`
          : '<button type="button" class="btn primary" id="cIcs">Calendari de l\'iPhone / Mac</button>'}
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
    ? `<p class="help">Les persones que marquis veuran el pla a la seva app <b>Galàxia</b> i et podran dir si hi van. Si encara no la tenen, els sortirà quan hi entrin amb aquest correu.</p>
       <div id="dests">${files.map(fila).join('') || '<p class="help">Afegeix el correu de qui vulguis:</p>'}</div>
       <div class="afegeix"><input type="email" id="altreCorreu" placeholder="Un altre correu" autocomplete="off" inputmode="email"><button type="button" class="btn" id="afegeixCorreu">Afegeix</button></div>
       <button type="button" class="btn primary ample" id="envia">Desa i envia</button>`
    : `<p class="help">Per enviar plans a l'app d'altres persones, primer has d'entrar amb el teu correu.</p>
       <button type="button" class="btn" data-entra>Entra amb el teu correu</button>`;
  obreDlg(`<header class="dlg-cap"><h2>Comparteix</h2><button type="button" class="x" data-tanca aria-label="Tanca">×</button></header>
    <div class="dlg-cos">
      <fieldset><legend>A la seva app</legend>${app}</fieldset>
      <fieldset><legend>Per WhatsApp, missatge o correu</legend>
        <p class="help">Envia un enllaç: qui el rebi el podrà afegir al seu calendari, encara que no tingui l'app.</p>
        <button type="button" class="btn ample" id="enllac">Envia l'enllaç</button>
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
      toast(nous.length ? `Enviat a ${llistaNoms(nous.map(nomDeCorreu))}` : trets.length ? 'Fet: ja no ho veuran' : 'Desat');
      render();
      obreDetall(p);
    }
  };
}
async function enviaEnllac(p) {
  const t = tipDe(p);
  const quan = textDies(p.data, p.dataFi);
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
      altres = [];
    }
    const boto = (pe) => `<button type="button" class="xip" data-qui="${esc(pe.id)}" aria-pressed="${d.qui.includes(pe.id)}">${esc(pe.nom)}</button>`;
    const exacte = q && totes().some((pe) => normal(pe.nom) === q);
    // A dalt, qui ve al pla (groc). A sota, separades, les dreceres per afegir-ne més amb un toc
    const rotol = altres.length && triades.length ? '<div class="qui-rotol">Toca per afegir:</div>' : '';
    return (triades.map(boto).join('') + rotol + altres.map((pe) => boto(pe).replace('class="xip"', 'class="xip suggerit"')).join(''))
      + (q && !exacte ? `<button type="button" class="xip xip-nou" id="quiAfegeix">+ Afegeix «${esc($('#quiNou').value.trim())}»</button>` : '')
      || '';
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
  const xipTipus = (t) => `<button type="button" class="etq${nomCurt(t).length > 11 ? ' llarg' : ''}" data-tipus="${esc(t.id)}" aria-pressed="${d.tipusId === t.id}" style="--c:${esc(t.color)}">${esc(nomCurt(t))}</button>`;
  const tipusXips = () => {
    const pr = principals();
    const resta = GRUPS.map(([g, nomG]) => {
      const ts = tipusOrdenats().filter((t) => g !== 'principals' && grupDe(t) === g);
      return ts.length ? `<optgroup label="${esc(nomG)}">${ts.map((t) => `<option value="${esc(t.id)}"${d.tipusId === t.id ? ' selected' : ''}>${esc(t.nom)}</option>`).join('')}</optgroup>` : '';
    }).join('');
    const triatResta = d.tipusId && !pr.some((t) => t.id === d.tipusId);
    return `<div class="etqs">${pr.map(xipTipus).join('')}</div>
      <select name="tipusMes" class="mes-tipus${triatResta ? ' triat' : ''}" aria-label="Més tipus">
        <option value=""${triatResta ? '' : ' selected'}>Més tipus…</option>${resta}
        <option value="+nou">+ Nou tipus…</option>
      </select>`;
  };
  // El tipus s'endevina pel nom del pla (fins que se'n tria un a mà)
  let tipusAMa = Boolean(p && p.tipusId);
  const pintaTipus = () => { $('#tipusGrid').innerHTML = tipusXips(); };

  obreDlg(`<header class="dlg-cap"><h2>${nou ? 'Nou pla' : 'Edita el pla'}</h2><button type="button" class="x" data-tanca aria-label="Tanca">×</button></header>
    <div class="dlg-cos">
      <fieldset><legend><span class="w-que">Què</span></legend>
        <input name="titol" value="${esc(d.titol)}" placeholder="Què faràs? Escriu-ho com vulguis" autocomplete="off">
      </fieldset>
      <fieldset><legend><span class="w-quan">Quan</span></legend>
        <div class="quan-grid">
          <label>Dia${campData('data', d.data)}</label>
          <label>Hora<input type="time" name="hora" value="${esc(d.hora || '')}" ${d.totElDia ? 'disabled' : ''}></label>
          <label>Es repeteix<select name="repeteix">${REPETICIONS.map(([v, n]) => `<option value="${v}"${(d.repeteix || '') === v ? ' selected' : ''}>${({ '': 'No', setmana: 'Setmanal', '2setmanes': 'Quinzenal', mes: 'Mensual', any: 'Anual' })[v] || n}</option>`).join('')}</select></label>
          <label>Fins al dia${campData('dataFi', d.dataFi || '')}</label>
          <label>Fins a<input type="time" name="horaFi" value="${esc(d.horaFi || '')}" ${d.totElDia ? 'disabled' : ''}></label>
          <label class="tot-dia"><span>&nbsp;</span><span class="tot-dia-caixa"><input type="checkbox" name="totElDia" ${d.totElDia ? 'checked' : ''}> Tot el dia</span></label>
        </div>
        <label class="camp rep-fins" ${d.repeteix ? '' : 'hidden'}>Fins quan es repeteix <small>(opcional; si no hi poses res, sempre)</small>
          ${campData('repeteixFins', d.repeteixFins || '')}</label>
      </fieldset>
      <fieldset><legend><span class="w-qui">Qui</span></legend>
        <div class="afegeix"><input id="quiNou" type="search" placeholder="Cerca o afegeix una persona" autocomplete="off" enterkeyhint="done">${potContactes() ? '<button type="button" class="btn" id="quiContactes" aria-label="Tria dels contactes"><span class="ms">contacts</span></button>' : ''}</div>
        <div class="xips xips-col" id="quiXips"></div>
      </fieldset>
      <fieldset><legend>On</legend>
        <div class="lloc-cerca">
          <input name="lloc" value="${esc(d.lloc || '')}" placeholder="Cerca un lloc o escriu-lo" autocomplete="off" enterkeyhint="done">
          <div class="sugg" id="llocSugg" hidden></div>
        </div>
        <input name="llocUrl" type="url" value="${esc(d.llocUrl || '')}" placeholder="Enllaç de la ubicació (Google Maps, Apple Maps…)" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="url">
        <div class="grp lloc-botons">
          <button type="button" class="btn" id="llocMaps">Cerca a Maps</button>
          <button type="button" class="btn" id="llocAra">On soc ara</button>
        </div>
      </fieldset>
      <fieldset><legend>Tipus</legend>
        <div id="tipusGrid">${tipusXips()}</div>
        <div class="nou-tipus-fila" id="nouTipusFila" hidden>
          ${botoColor(COLORS_NOUS[state.tipus.length % COLORS_NOUS.length], 'id="ntColor"')}
          <input id="ntNom" placeholder="Nom del tipus (p. ex. Karaoke)" autocomplete="off" enterkeyhint="done">
          <button type="button" class="btn primary" id="ntCrea">Crea</button>
        </div>
        <button type="button" class="enllac" id="tGestiona">Canvia les etiquetes</button>
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
      <span class="help desa-sol">Es desa sol en tancar</span>
      <button class="btn primary">Fet</button>
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
    d.tipusId = t.id; tipusAMa = true;
    pintaTipus();
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
        toast('Ubicació afegida');
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
    if (e.target.id === 'ntCrea') { creaTipus(); return; }
    if (e.target.id === 'tGestiona') {
      if (!confirm('Vols anar a Ajustos per canviar els tipus? El pla es desarà tal com està.')) return;
      tancaDlg(); if (dlg.open) return;
      ui.view = 'ajustos'; desaPref('view', ui.view); render();
      $('#seccioTipus')?.scrollIntoView({ block: 'start' });
      return;
    }
    const tx = e.target.closest('[data-tipus]');
    if (tx) {
      // Tornar a tocar el tipus triat el treu (el tipus és opcional)
      d.tipusId = d.tipusId === tx.dataset.tipus ? '' : tx.dataset.tipus;
      tipusAMa = true;
      pintaTipus();
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
      dlgForm.abansDeTancar = null;
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
    pintaDates();
  };
  limits();
  di.addEventListener('change', limits);
  di.addEventListener('input', limits);

  dlgForm.elements.titol.addEventListener('input', () => {
    if (tipusAMa) return;
    const t = endevinaTipus(dlgForm.elements.titol.value);
    if ((t?.id || '') !== d.tipusId) { d.tipusId = t?.id || ''; pintaTipus(); }
  });
  dlgForm.onchange = (e) => {
    if (e.target.name === 'tipusMes') {
      if (e.target.value === '+nou') { e.target.value = ''; $('#nouTipusFila').hidden = false; $('#ntNom').focus(); return; }
      if (e.target.value) { d.tipusId = e.target.value; tipusAMa = true; pintaTipus(); }
      return;
    }
    if (e.target.name === 'repeteix') dlgForm.querySelector('.rep-fins').hidden = !e.target.value;
    if (e.target.name === 'totElDia') {
      dlgForm.elements.hora.disabled = e.target.checked;
      dlgForm.elements.horaFi.disabled = e.target.checked;
    }
  };
  // Desa el pla. Torna true si s'ha desat (o no hi havia res a desar) i false si falta alguna cosa.
  // tancant = s'ha tocat ×, fora de la finestra o Esc: un pla nou buit es descarta i no s'obre el detall
  const desaPla = (tancant) => {
    const f = dlgForm.elements;
    if (!f || !f.titol) return true;
    if (tancant && nou && !f.titol.value.trim() && !tipusAMa && !f.notes.value.trim() && !f.lloc.value.trim() && !d.qui.length) return true;
    const falta = !d.tipusId && !f.titol.value.trim() ? ['Escriu què faràs o tria un tipus', f.titol]
      : !f.data.value ? ['Falta el dia', f.data]
      : f.dataFi.value && f.dataFi.value < f.data.value ? ["«Fins al dia» ha de ser després del primer dia", f.dataFi] : null;
    if (falta) {
      if (tancant && confirm(`${falta[0]}.\n\nVols sortir sense desar ${nou ? 'aquest pla' : 'els canvis'}?`)) return true;
      toast(falta[0]); falta[1].focus(); return false;
    }
    // Coincideix amb una altra activitat amb hora el mateix dia?
    if (!f.totElDia.checked && f.hora.value && !dlgForm.dataset.solapOk) {
      const min = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
      const ini = min(f.hora.value), fi = f.horaFi.value && min(f.horaFi.value) > ini ? min(f.horaFi.value) : ini + 60;
      const xoc = totsPlans(false).filter((x) => x.data === f.data.value && !(x.dataFi > x.data) && (x.base || x).id !== p?.id && !x.totElDia && x.hora && x.estat !== 'cancellat')
        .filter((x) => { const a = min(x.hora), b = x.horaFi && min(x.horaFi) > a ? min(x.horaFi) : a + 60; return a < fi && ini < b; });
      if (xoc.length) {
        const llista = xoc.map((x) => `• ${titolPla(x)} (${horaText(x)})`).join('\n');
        if (!confirm(`Aquest pla coincideix amb:\n${llista}\n\nVols desar-lo igualment?`)) return false;
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
    const nv = (v) => (v === false || v == null ? '' : String(v));
    // Un pla que ja existia i no ha canviat: no es toca (ni s'envia res als altres)
    if (!nou && Object.keys(dades).every((k) => (k === 'qui' ? dades.qui.join() === (p.qui || []).join() : nv(dades[k]) === nv(p[k])))) {
      if (!tancant) { render(); obreDetall(p); }
      return true;
    }
    nousPers.filter((pe) => dades.qui.includes(pe.id)).forEach((pe) => state.persones.push(pe));
    // Compartir: s'afegeixen els correus de la gent nova de «Qui» i es treuen els de qui ja no hi és
    const correuDe = (id) => normal(pers(id)?.email);
    const abansQui = nou ? [] : (p.qui || []);
    const trets = abansQui.filter((id) => !dades.qui.includes(id)).map(correuDe).filter(Boolean);
    let compartit = (nou ? [] : (p.compartit || [])).filter((em) => !trets.includes(em));
    dades.compartit = compartit;
    const perApp = dades.qui.map(pers).filter(teApp).filter((pe) => !compartit.includes(normal(pe.email)));
    if (usuari() && dades.data >= avui()) perApp.forEach((pe) => compartit.push(normal(pe.email)));
    let desat;
    if (nou) { desat = { id: 'pl-' + uid(), ...dades, versio: 1, modificat: new Date().toISOString() }; state.plans.push(desat); }
    else { desat = Object.assign(p, dades, { versio: (p.versio || 1) + 1, modificat: new Date().toISOString() }); }
    save();
    ui.diaSel = desat.data;
    ui.cursor = new Date(parseYmd(desat.data).getFullYear(), parseYmd(desat.data).getMonth(), 1);
    render();
    if (!tancant) obreDetall(desat);
    const perWa = dades.qui.map(pers).filter((pe) => pe && pe.tel && !(usuari() && teApp(pe)));
    toast((nou ? 'Pla afegit' : 'Canvis desats') + (usuari() && perApp.length && dades.data >= avui() ? ` i enviat a l'app de ${llistaNoms(perApp.map((pe) => pe.nom))}` : '')
      + (nou && perWa.length && !tancant ? `. Per avisar ${perWa.length === 1 ? perWa[0].nom : 'els altres'} per WhatsApp, toca el seu nom aquí sota.` : ''), perWa.length ? 6000 : 3200);
    return true;
  };
  dlgForm.onsubmit = (e) => { e.preventDefault(); if (desaPla(false)) dlgForm.abansDeTancar = null; };
  dlgForm.abansDeTancar = () => desaPla(true);
}

/* ---------- Còpia de seguretat ---------- */
async function exporta() {
  const blob = new Blob([JSON.stringify({ app: 'que-qui-quan', versio: 1, data: new Date().toISOString(), ...state }, null, 2)], { type: 'application/json' });
  const nom = `Galaxia-copia-${avui()}.json`;
  desaPref('ultimaCopia', new Date().toISOString());
  // Al mòbil: menú Compartir (Desar a Arxius, iCloud Drive, Correu…); a l'ordinador: es descarrega
  const f = new File([blob], nom, { type: 'application/json' });
  if (esIOS() && navigator.canShare && navigator.canShare({ files: [f] })) {
    try { await navigator.share({ files: [f] }); toast('Còpia preparada'); render(); return; }
    catch (x) { if (x.name === 'AbortError') return; }
  }
  setTimeout(render, 500);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = nom;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
// Afegeix plans d'un fitxer { app: 'que-qui-quan-plans', plans: [{ id, titol, tipus, data, hora, horaFi, lloc, qui: [noms], notes, estat }] }
// No substitueix res: els plans que ja hi són (pel seu identificador) no es tornen a afegir
function afegeixPlans(fitxer) {
  const r = new FileReader();
  r.onload = () => {
    let d;
    try { d = JSON.parse(r.result); } catch (e) { d = null; }
    const llista = d && d.app === 'que-qui-quan-plans' && Array.isArray(d.plans) ? d.plans.filter((p) => p && p.id && /^\d{4}-\d{2}-\d{2}$/.test(p.data || '')) : null;
    if (!llista) { toast('Aquest fitxer no és una llista de plans de Galàxia.'); return; }
    const nous = llista.filter((p) => !state.plans.some((x) => x.id === p.id));
    if (!nous.length) { toast('Tots aquests plans ja els tens'); return; }
    if (!confirm(`Vols afegir ${nous.length === 1 ? '1 pla' : nous.length + ' plans'} a la teva agenda?${d.nom ? ' (' + d.nom + ')' : ''}`)) return;
    const tipusPerNom = (nom) => (nom ? state.tipus.find((t) => normal(t.nom) === normal(nom) || normal(nomCurt(t)) === normal(nom)) : null);
    const persona = (nom) => {
      let pe = state.persones.find((x) => normal(x.nom) === normal(nom));
      if (!pe) { pe = { id: 'pe-' + uid(), nom: String(nom).trim() }; state.persones.push(pe); }
      return pe.id;
    };
    const afegits = nous.map((p) => ({
      id: String(p.id), titol: String(p.titol || '').trim(), tipusId: tipusPerNom(p.tipus)?.id || '',
      data: p.data, dataFi: p.dataFi || '', hora: p.hora || '', horaFi: p.horaFi || '', totElDia: Boolean(p.totElDia),
      lloc: p.lloc || '', llocUrl: '', notes: p.notes || '', estat: ['confirmat', 'pendent', 'cancellat'].includes(p.estat) ? p.estat : 'confirmat',
      qui: (Array.isArray(p.qui) ? p.qui : []).filter(Boolean).map(persona), versio: 1, modificat: new Date().toISOString(),
    }));
    state.plans.push(...afegits);
    enviaAApp(afegits);
    save(); render();
    toast(`Fet: ${afegits.length === 1 ? 'afegit 1 pla' : 'afegits ' + afegits.length + ' plans'}`, 4500);
  };
  r.readAsText(fitxer);
}
function importa(fitxer) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const d = JSON.parse(r.result);
      if (!d || !Array.isArray(d.plans)) throw new Error('format');
      if (!confirm(`Aquesta còpia té ${d.plans.length} plans. Vols substituir les dades actuals per les de la còpia?`)) return;
      state = normalize(d); save(); render(); toast('Còpia recuperada');
    } catch (e) { toast('Aquest fitxer no és una còpia de Galàxia.'); }
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
// Tocar el logo obre un menú petit: tornar a l'inici i el compte (sortir d'aquest dispositiu o dels altres)
function tancaMenuCompte() { document.querySelector('.menu-compte')?.remove(); }
function obreMenuCompte() {
  if (document.querySelector('.menu-compte')) { tancaMenuCompte(); return; }
  const u = usuari();
  const m = document.createElement('div');
  m.className = 'menu-compte';
  m.innerHTML = '<div class="mc-caixa" role="menu">'
    + (ui.view !== 'inici' ? '<button type="button" data-mc="inici">Torna a l\'inici</button>' : '')
    + (u ? '<p class="mc-qui">Has entrat com a<br><b>' + esc(u.email) + '</b></p>'
        + '<button type="button" data-mc="surt">Tanca la sessió en aquest dispositiu</button>'
        + '<button type="button" data-mc="altres">Tanca la sessió als altres dispositius</button>'
      : (sync()?.disponible ? '<p class="mc-qui">No has entrat amb el teu correu.</p><button type="button" data-mc="entra">Entra amb el teu correu</button>' : ''))
    + '<button type="button" class="mc-tanca" data-mc="tanca">Tanca</button></div>';
  document.body.appendChild(m);
  const cap = document.querySelector('header.top');
  if (cap) m.querySelector('.mc-caixa').style.top = (cap.getBoundingClientRect().bottom + 6) + 'px';
  m.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-mc]');
    if (!b) { if (e.target === m) tancaMenuCompte(); return; }
    const acc = b.dataset.mc;
    tancaMenuCompte();
    if (acc === 'inici') { ui.view = 'inici'; ui.persona = ''; render(); window.scrollTo(0, 0); return; }
    if (acc === 'entra') { ui.view = 'entrada'; ui.entrada = { pas: 'correu', email: '' }; render(); return; }
    if (acc === 'surt') {
      const pend = sync().pendentsPerPujar();
      if (!confirm('Tancar la sessió en aquest dispositiu?' + (pend ? '\n\nAtenció: hi ha ' + pend + " canvis que encara no s'han pujat al núvol i es perdran." : "\n\nS'esborraran les teves dades d'aquest aparell. Són al núvol: les recuperaràs quan tornis a entrar."))) return;
      await sync().surt();
      ui.view = 'entrada'; ui.entrada = { pas: 'correu', email: '' }; render();
      return;
    }
    if (acc === 'altres') {
      if (!confirm("Tancar la sessió a tots els altres dispositius (ordinadors, tauletes o mòbils on hagis entrat)?\n\nEn aquest continuaràs dins.")) return;
      try { await sync().surtAltres(); toast("Sessió tancada als altres dispositius", 4000); }
      catch (err) { toast(navigator.onLine ? "No s'ha pogut tancar. Torna-ho a provar." : 'Cal connexió a internet.'); }
    }
  });
}
document.querySelector('.brand')?.addEventListener('click', obreMenuCompte);
