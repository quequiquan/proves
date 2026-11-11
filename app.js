'use strict';

/* ---------- Entorn: versió de proves o definitiva ---------- */
// La versió de proves (adreça amb «proves») guarda les dades a part, per no tocar mai les reals.
const PROVES = /proves/i.test(location.pathname);
const KEY = 'qqq-dades-v1' + (PROVES ? '-proves' : '');

/* ---------- Tipus de pla de sèrie (es poden canviar des d'Ajustos) ---------- */
// Identificadors fixos: així els dispositius nous no dupliquen els tipus en sincronitzar
const GRUPS = [
  ['apats', 'Àpats i copes'], ['cultura', 'Cultura i espectacles'],
  ['celebracions', 'Celebracions i trobades'], ['sortides', 'Sortides'], ['altres', 'Altres'],
];
const TIPUS_INICIALS = [
  { id: 't-esmorzar', nom: 'Esmorzar / Brunch', emoji: '🥐', color: '#F08C00', grup: 'apats' },
  { id: 't-dinar', nom: 'Dinar', emoji: '🍽️', color: '#E8590C', grup: 'apats' },
  { id: 't-sopar', nom: 'Sopar', emoji: '🍷', color: '#C92A2A', grup: 'apats' },
  { id: 't-vermut', nom: 'Vermut / Copes', emoji: '🍸', color: '#E64980', grup: 'apats' },
  { id: 't-cafe', nom: 'Cafè / Berenar', emoji: '☕', color: '#8D6E63', grup: 'apats' },
  { id: 't-concert', nom: 'Concert', emoji: '🎸', color: '#7048E8', grup: 'cultura' },
  { id: 't-teatre', nom: 'Teatre / Espectacle', emoji: '🎭', color: '#9C36B5', grup: 'cultura' },
  { id: 't-cinema', nom: 'Cinema', emoji: '🎬', color: '#4263EB', grup: 'cultura' },
  { id: 't-exposicio', nom: 'Exposició / Museu', emoji: '🖼️', color: '#1C7ED6', grup: 'cultura' },
  { id: 't-inauguracio', nom: 'Inauguració', emoji: '🥂', color: '#D9A400', grup: 'cultura' },
  { id: 't-festa', nom: 'Festa / Aniversari', emoji: '🎉', color: '#F06595', grup: 'celebracions' },
  { id: 't-amics', nom: 'Trobada amb amics', emoji: '🙌', color: '#1098AD', grup: 'celebracions' },
  { id: 't-casament', nom: 'Casament / Celebració familiar', emoji: '💐', color: '#E8738A', grup: 'celebracions' },
  { id: 't-excursio', nom: 'Excursió / Natura', emoji: '🥾', color: '#2F9E44', grup: 'sortides' },
  { id: 't-escapada', nom: 'Escapada / Viatge', emoji: '🧳', color: '#0CA678', grup: 'sortides' },
  { id: 't-esport', nom: 'Esport', emoji: '⚽', color: '#66A80F', grup: 'sortides' },
  { id: 't-festival', nom: 'Festival / Fira', emoji: '🎪', color: '#BE4BDB', grup: 'sortides' },
  { id: 't-altres', nom: 'Altres', emoji: '✨', color: '#868E96', grup: 'altres' },
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
  return { tipus: TIPUS_INICIALS.map((t) => ({ ...t })), persones: [], plans: [], ajustos: { nom: '' } };
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
save();
// En sortir del compte (o si entra una altra persona en aquest dispositiu) es comença de zero
function reiniciaDades() {
  state = seed();
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* res */ }
}

function llegeixPref(k, def) { try { const v = localStorage.getItem('qqq-pref-' + k); return v === null ? def : JSON.parse(v); } catch (e) { return def; } }
function desaPref(k, v) { try { localStorage.setItem('qqq-pref-' + k, JSON.stringify(v)); } catch (e) { /* res */ } }
const ui = {
  view: llegeixPref('view', 'propers'), calMode: llegeixPref('calMode', 'mes'), cursor: new Date(), diaSel: avui(), cerca: '', passats: false, persona: '',
  entrada: { pas: 'correu', email: '' },
};

/* ---------- Consultes ---------- */
const ALTRES = { id: '', nom: 'Altres', emoji: '✨', icona: 'auto_awesome', color: '#868E96' };
const tip = (id) => state.tipus.find((t) => t.id === id) || state.tipus.find((t) => t.id === 't-altres') || ALTRES;
const pers = (id) => state.persones.find((p) => p.id === id);
const nomCurt = (t) => t.nom.split(' / ')[0];
const emailValid = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').trim());
// Els plans que t'envien altres persones porten el seu propi tipus i la seva llista de gent
const tipDe = (p) => p._t || tip(p.tipusId);
const noms = (p) => p._amb || (p.qui || []).map(pers).filter(Boolean).map((x) => x.nom);
const titolPla = (p) => (p.titol || '').trim() || nomCurt(tipDe(p)) + (noms(p).length ? ' amb ' + llistaNoms(noms(p)) : '');
const horaText = (p) => (p.totElDia ? 'Tot el dia' : p.hora ? (p.horaFi ? `${p.hora} – ${p.horaFi}` : p.hora) : 'Sense hora');
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
    totElDia: Boolean(s.totElDia), lloc: s.lloc || '', estat: s.estat || 'confirmat', versio: s.versio || 1, qui: [],
    _t: { nom: s.tipusNom || 'Pla', emoji: s.emoji || '✨', icona: s.icona || '', color: s.color || '#868E96' }, _amb: s.amb || [],
  };
}
const rebuts = () => (sync()?.rebuts() || []).filter((r) => r.pla && r.pla.data).map(planRebut);
// Tots els plans que es veuen: els teus i els que t'han enviat i has dit que hi vas
const totsPlans = () => [...state.plans, ...rebuts().filter((p) => p.rebut.resposta === 'si')];
const trobaPla = (id) => state.plans.find((p) => p.id === id) || rebuts().find((p) => p.id === id);
const delDia = (ds) => totsPlans().filter((p) => p.data === ds).sort(perOrdre);
// Còpia del pla que rep cada persona (sense notes; «amb» des del seu punt de vista)
function snapshotPla(p, em) {
  const t = tip(p.tipusId);
  const amb = [nomPropi(), ...(p.qui || []).map(pers).filter((x) => x && normal(x.email) !== em).map((x) => x.nom)];
  return {
    tipusNom: t.nom, emoji: t.emoji, icona: iconaDe(t), color: t.color, titol: p.titol || '', amb, data: p.data,
    hora: p.totElDia ? '' : p.hora || '', horaFi: p.totElDia ? '' : p.horaFi || '', totElDia: Boolean(p.totElDia),
    lloc: p.lloc || '', estat: p.estat || 'confirmat', versio: p.versio || 1,
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
  const res = await navigator.contacts.select(['name', 'email'], { multiple: true });
  return res.map((c) => ({ nom: String((c.name || [])[0] || '').trim(), email: String((c.email || [])[0] || '').trim().toLowerCase() }))
    .map((c) => ({ nom: c.nom || c.email.split('@')[0], email: emailValid(c.email) ? c.email : '' }))
    .filter((c) => c.nom);
}
// Targetes de contacte (.vcf), com les que es comparteixen des de l'app Contactes de l'iPhone
function llegeixVcf(text) {
  const net = String(text).replace(/\r?\n[ \t]/g, '');
  return net.split(/BEGIN:VCARD/i).slice(1).map((bloc) => {
    const camp = (re) => { const m = bloc.match(re); return m ? m[1].trim() : ''; };
    let nom = camp(/^FN[^:\n]*:(.*)$/mi);
    if (!nom) { const n = camp(/^N[^:\n]*:(.*)$/mi).split(';'); nom = [n[1], n[0]].filter(Boolean).join(' '); }
    const email = camp(/^(?:item\d+\.)?EMAIL[^:\n]*:(.*)$/mi).toLowerCase();
    return { nom: nom.replace(/\\([,;])/g, '$1'), email: emailValid(email) ? email : '' };
  }).filter((c) => c.nom || c.email).map((c) => ({ nom: c.nom || c.email.split('@')[0], email: c.email }));
}
// Converteix contactes en fitxes de persona (si ja hi són, només hi afegeix el correu)
function incorporaContactes(llista, existents, onAfegir) {
  return llista.map((c) => {
    let pe = existents.find((x) => (c.email && normal(x.email) === c.email) || normal(x.nom) === normal(c.nom));
    if (!pe) { pe = { id: 'pe-' + uid(), nom: c.nom }; onAfegir.push(pe); existents.push(pe); }
    if (c.email && !pe.email) pe.email = c.email;
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
  const env = (p.compartit || []).length ? '<span class="env" title="Enviat a altres persones">📨</span>' : '';
  const estat = p.estat !== 'confirmat' ? `<span class="badge ${p.estat}">${esc((ESTATS.find((e) => e[0] === p.estat) || [, p.estat])[1])}</span>` : '';
  return `<button class="pla ${esc(p.estat)}${p.data < avui() ? ' passat' : ''}${p.rebut ? ' rebut' : ''}" data-pla="${esc(p.id)}" style="--c:${esc(t.color)}">
    <span class="pla-emoji">${ico(t)}</span>
    <span class="pla-cos"><b>${esc(titolPla(p))}</b><small>${esc(info.join(' · '))}</small>${gent}${de}</span>
    ${env}${estat}
  </button>`;
}
function llistaPerDies(plans, ordreInvers = false) {
  const grups = new Map();
  plans.forEach((p) => { if (!grups.has(p.data)) grups.set(p.data, []); grups.get(p.data).push(p); });
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
    plans = totsPlans().filter((p) => normal([titolPla(p), tipDe(p).nom, p.lloc, p.notes, p.rebut?.de_nom, ...noms(p)].join(' ')).includes(q));
    invers = true;
    buit = `No s'ha trobat cap pla amb «${esc(ui.cerca.trim())}».`;
  } else if (ui.passats) {
    plans = totsPlans().filter((p) => p.data < avui());
    invers = true;
    buit = 'Encara no hi ha cap pla passat.';
  } else {
    plans = totsPlans().filter((p) => p.data >= avui());
    buit = '';
  }
  const setmana = totsPlans().filter((p) => p.data >= avui() && p.data <= ymd(addDays(mondayOf(new Date()), 6)) && p.estat !== 'cancellat').length;
  const cap0 = !q && !ui.passats
    ? `<p class="resum">${setmana ? `Aquesta setmana tens <b>${setmana} ${setmana === 1 ? 'pla' : 'plans'}</b>.` : 'Aquesta setmana encara no tens cap pla.'}</p>` : '';
  // Plans que t'han enviat i encara no has contestat
  const inv = !q && !ui.passats ? rebuts().filter((p) => p.rebut.resposta === 'pendent' && p.data >= avui()).sort(perOrdre) : [];
  const invHtml = inv.length ? `<section class="invitacions"><h3>📨 T'han enviat ${inv.length === 1 ? 'un pla' : inv.length + ' plans'}</h3>
      ${inv.map((p) => `<div class="invitacio">${targeta(p, true)}
        <div class="grp"><button class="btn primary" data-respon="si" data-r="${esc(p.id)}">✅ Hi vaig</button><button class="btn" data-respon="no" data-r="${esc(p.id)}">No hi vaig</button></div></div>`).join('')}
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
      <div class="buit-emoji"><span class="ms">celebration</span></div>
      <p>No tens cap pla a la vista.</p>
      <button class="btn primary" data-nou>+ Afegeix el primer pla</button></div>`}`;
}

/* ---------- Vista: Calendari (dia, setmana o mes) ---------- */
const MODES = [['dia', 'Dia'], ['setmana', 'Setmana'], ['mes', 'Mes']];
const apostrof = (txt) => txt.replace(/de ([aeiou])/g, "d'$1");
function vistaCalendari() {
  const mode = ui.calMode;
  const sel = parseYmd(ui.diaSel);
  let titol, cos;
  if (mode === 'dia') {
    titol = cap(dataLlarga(ui.diaSel));
    const plans = delDia(ui.diaSel);
    cos = `<section class="vista-dia">
        ${plans.map((p) => `<div class="franja"><span class="franja-hora">${esc(p.totElDia ? 'Tot el dia' : p.hora || '—')}</span>${targeta(p)}</div>`).join('') || '<p class="buit">Cap pla aquest dia.</p>'}
        <button class="btn afegeix-dia" data-nou="${ui.diaSel}">+ Afegeix un pla aquest dia</button>
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
  const quin = { dia: 'Dia', setmana: 'Setmana', mes: 'Mes' }[mode];
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
    return `<div class="cal-cap"><button class="btn" data-persona="">‹ Gent</button><h2>${esc(pe.nom)}</h2></div>
      <label class="camp">Correu <small>(opcional: per enviar-li plans a la seva app)</small>
        <input type="email" id="pCorreu" value="${esc(pe.email || '')}" placeholder="nom@exemple.com" autocomplete="off" inputmode="email"></label>
      <div class="grp">
        <button class="btn" id="pRenom">Canvia el nom</button>
        <button class="btn perill" id="pEsborra">Esborra</button>
      </div>
      <h3 class="sub">Propers</h3>
      ${propers.map((p) => targeta(p, true)).join('') || '<p class="buit">Cap pla previst.</p>'}
      <h3 class="sub">Fets</h3>
      ${passats.map((p) => targeta(p, true)).join('') || '<p class="buit">Encara cap.</p>'}`;
  }
  const llista = [...state.persones].sort((a, b) => a.nom.localeCompare(b.nom, 'ca'));
  return `<form class="barra" id="formPersona">
      <input name="nom" placeholder="Nom d'una persona" autocomplete="off">
      <button class="btn primary">Afegeix</button>
    </form>
    <div class="grp">
      ${potContactes() ? '<button class="btn" id="gContactes">📇 Tria dels contactes</button>' : ''}
      <label class="btn">📥 Importa contactes<input type="file" id="gVcf" accept=".vcf,text/vcard,text/x-vcard" multiple hidden></label>
    </div>
    ${potContactes() ? '' : AJUDA_CONTACTES}
    ${llista.length ? `<div class="gent">${llista.map((pe) => {
      const seus = state.plans.filter((p) => (p.qui || []).includes(pe.id)).sort(perOrdre);
      const prox = seus.find((p) => p.data >= avui());
      const ult = [...seus].reverse().find((p) => p.data < avui());
      const info = [seus.length ? `${seus.length} ${seus.length === 1 ? 'pla' : 'plans'}` : 'Cap pla', prox ? 'proper: ' + dataCurta(prox.data) : ult ? 'últim: ' + dataCurta(ult.data) : ''].filter(Boolean).join(' · ');
      return `<button class="persona" data-persona="${esc(pe.id)}"><span class="avatar">${esc(pe.nom.trim().charAt(0).toUpperCase())}</span><span><b>${esc(pe.nom)}</b><small>${esc(info)}</small></span></button>`;
    }).join('')}</div>` : '<p class="buit">Aquí hi sortiran les persones amb qui quedes. Les pots afegir aquí o directament quan crees un pla.</p>'}`;
}

/* ---------- Vista: Ajustos ---------- */
function vistaAjustos() {
  const files = GRUPS.map(([g, nomG]) => {
    const ts = state.tipus.filter((t) => (t.grup || 'altres') === g);
    if (!ts.length) return '';
    return `<h3 class="sub">${esc(nomG)}</h3>` + ts.map((t) => `<div class="tipus-fila" data-tid="${esc(t.id)}">
        ${botoColor(t.color, 'data-camp="color"')}
        <input data-camp="nom" value="${esc(t.nom)}" aria-label="Nom">
        <button class="btn icona" data-treu="${esc(t.id)}" aria-label="Treu ${esc(t.nom)}">×</button>
      </div>`).join('');
  }).join('');
  return `${sync() ? sync().html() : ''}
    <div class="section">
      <h2>El teu nom</h2>
      <p class="help">És el que veuen les persones a qui envies plans («De part de…»).</p>
      <input id="nomMeu" value="${esc(state.ajustos.nom || '')}" placeholder="El teu nom">
    </div>
    <div class="section" id="seccioTipus">
      <h2>Tipus de pla</h2>
      <p class="help">Toca el cercle per canviar-ne el color. També pots canviar el nom. Els canvis es desen sols.</p>
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
const VISTES = { propers: vistaPropers, calendari: vistaCalendari, gent: vistaGent, ajustos: vistaAjustos, entrada: vistaEntrada };
function render() {
  if (!VISTES[ui.view]) ui.view = 'propers';
  if (ui.view === 'entrada' && !sync()?.disponible) ui.view = 'propers';
  document.body.classList.toggle('mode-entrada', ui.view === 'entrada');
  if ($('#syncBtn') && sync()?.disponible) $('#syncBtn').hidden = ui.view === 'entrada';
  $$('#tabs button').forEach((b) => b.setAttribute('aria-current', b.dataset.view === ui.view ? 'page' : 'false'));
  const focus = document.activeElement?.id === 'cerca' ? document.activeElement.selectionStart : null;
  $('#main').innerHTML = `<div class="vista vista-${ui.view}">${VISTES[ui.view]()}</div>`;
  if (focus !== null && $('#cerca')) { $('#cerca').focus(); $('#cerca').setSelectionRange(focus, focus); }
  if (ui.view === 'ajustos' && sync()) sync().bind();
  if (ui.view === 'entrada') $('.entrada input')?.focus();
}
const fiEntrada = () => { ui.view = 'propers'; desaPref('view', ui.view); render(); };

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
  const resp = t.closest('[data-respon]');
  if (resp) { const p = trobaPla(resp.dataset.r); if (p) respon(p, resp.dataset.respon); return; }
  if (pla) { const p = trobaPla(pla.dataset.pla); if (p) obreDetall(p); return; }
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
  if (mes) {
    const n = Number(mes.dataset.mes);
    if (n === 0) { ui.cursor = new Date(); ui.diaSel = avui(); }
    else if (ui.calMode === 'dia') ui.diaSel = ymd(addDays(parseYmd(ui.diaSel), n));
    else if (ui.calMode === 'setmana') ui.diaSel = ymd(addDays(parseYmd(ui.diaSel), 7 * n));
    else ui.cursor = new Date(ui.cursor.getFullYear(), ui.cursor.getMonth() + n, 1);
    if (ui.calMode !== 'mes') { const d = parseYmd(ui.diaSel); ui.cursor = new Date(d.getFullYear(), d.getMonth(), 1); }
    render(); return;
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
  if (e.target.id === 'cerca') { ui.cerca = e.target.value; render(); }
});
$('#main').addEventListener('change', (e) => {
  const t = e.target;
  if (t.id === 'nomMeu') { state.ajustos.nom = t.value.trim(); save(); toast('Desat'); return; }
  if (t.id === 'pCorreu') {
    const v = t.value.trim().toLowerCase();
    if (v && !emailValid(v)) { toast('Aquest correu no sembla correcte'); return; }
    pers(ui.persona).email = v; save(); toast('Desat'); return;
  }
  const fila = t.closest('[data-tid]');
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

/* ---------- Detall d'un pla ---------- */
function obreDetall(p) {
  const t = tipDe(p);
  const n = noms(p);
  const r = p.rebut;
  const resp = !r && usuari() ? sync().respostes(p.id).filter((x) => (p.compartit || []).includes(x.email)) : [];
  const enviat = (p.compartit || []).length
    ? `<li><span>📨</span><div>Enviat a:<ul class="respostes">${(p.compartit || []).map((em) => {
      const x = resp.find((y) => y.email === em);
      return `<li><b>${esc(nomDeCorreu(em))}</b> <small>${esc(RESPOSTES[x?.resposta || 'pendent'])}</small></li>`;
    }).join('')}</ul>${usuari() ? '' : '<small class="hint">Entra amb el teu correu perquè els arribi.</small>'}</div></li>` : '';
  const peu = r
    ? `<button type="button" class="btn${r.resposta === 'si' ? ' primary' : ''}" data-respon="si">✅ Hi vaig</button>
       <button type="button" class="btn${r.resposta === 'no' ? ' primary' : ''}" data-respon="no">❌ No hi vaig</button>
       <button type="button" class="btn" id="dCalendari">📆 Al meu calendari</button>`
    : `<button type="button" class="btn primary" id="dComparteix">📤 Comparteix</button>
       <button type="button" class="btn" id="dCalendari">📆 Al meu calendari</button>
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
        <li><span>📅</span>${esc(etiquetaDia(p.data) === cap(dataLlarga(p.data)) ? etiquetaDia(p.data) : etiquetaDia(p.data) + ', ' + dataLlarga(p.data))}</li>
        <li><span>🕘</span>${esc(horaText(p))}</li>
        ${p.lloc ? `<li><span>📍</span><a href="${esc(Cal.mapa(p.lloc))}" target="_blank" rel="noopener">${esc(p.lloc)}</a></li>` : ''}
        ${n.length ? `<li><span>👥</span>${esc(llistaNoms(n))}</li>` : ''}
        ${p.estat !== 'confirmat' ? `<li><span>${p.estat === 'cancellat' ? '🚫' : '⏳'}</span>${esc((ESTATS.find((e) => e[0] === p.estat) || [, ''])[1])}</li>` : ''}
        ${p.notes ? `<li class="notes"><span>📝</span><div>${esc(p.notes).replace(/\n/g, '<br>')}</div></li>` : ''}
        ${enviat}
        ${r && r.resposta === 'pendent' ? '<li><span>❓</span>Encara no has dit si hi vas.</li>' : ''}
      </ul>
    </div>
    <footer class="dlg-peu det-accions">${peu}</footer>`, 'detall');
  dlgForm.onsubmit = (e) => e.preventDefault();
  dlgForm.onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.respon) { respon(p, b.dataset.respon); return; }
    if (b.id === 'dComparteix') obreComparteix(p);
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
function dadesCal(p, perAltres) {
  return {
    u: p.rebut ? p.rebut.pla_id : p.id, v: p.versio || 1, t: titolPla(p), e: tipDe(p).emoji, d: p.data,
    h: p.totElDia ? undefined : p.hora || undefined, f: p.totElDia ? undefined : p.horaFi || undefined,
    a: p.totElDia ? 1 : undefined, l: p.lloc || undefined,
    n: perAltres ? undefined : p.notes || undefined,
    o: perAltres ? nomPropi() : undefined,
  };
}
function enllacPla(p, perAltres) {
  return new URL('afegir.html', location.href).href.split('#')[0] + '#' + Cal.codifica(dadesCal(p, perAltres));
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
  const text = [
    [t.emoji, titolPla(p)].filter(Boolean).join(' '),
    `📅 ${quan}${p.totElDia || !p.hora ? '' : ' · ' + horaText(p)}`,
    p.lloc ? `📍 ${p.lloc}` : '',
    '',
    'Afegeix-ho al teu calendari:',
    enllacPla(p, true),
  ].filter((x, i) => x !== '' || i === 3).join('\n');
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
  const xips = () => {
    const ord = totes().sort((a, b) => (d.qui.includes(b.id) - d.qui.includes(a.id)) || (usos(b.id) - usos(a.id)) || a.nom.localeCompare(b.nom, 'ca'));
    return ord.map((pe) => `<button type="button" class="xip" data-qui="${esc(pe.id)}" aria-pressed="${d.qui.includes(pe.id)}">${esc(pe.nom)}</button>`).join('')
      || '<span class="help">Encara no hi ha ningú: escriu un nom a sota.</span>';
  };
  const tipusXips = () => GRUPS.map(([g]) => state.tipus.filter((t) => (t.grup || 'altres') === g)).flat()
    .map((t) => `<button type="button" class="txip" data-tipus="${esc(t.id)}" aria-pressed="${d.tipusId === t.id}" style="--c:${esc(t.color)}">${ico(t)}${esc(nomCurt(t))}</button>`).join('')
    + '<button type="button" class="txip nou-tipus" id="tNou"><span class="ms">add</span>Nou tipus</button>';

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
        <div class="xips" id="quiXips">${xips()}</div>
        <div class="afegeix"><input id="quiNou" placeholder="Afegeix una persona" autocomplete="off" enterkeyhint="done"><button type="button" class="btn" id="quiAfegeix">Afegeix</button>${potContactes() ? '<button type="button" class="btn" id="quiContactes" aria-label="Tria dels contactes"><span class="ms">contacts</span></button>' : ''}</div>
      </fieldset>
      <fieldset><legend><span class="w-quan">Quan</span></legend>
        <div class="fila">
          <label>Dia<input type="date" name="data" value="${esc(d.data)}" required></label>
          <label>Hora<input type="time" name="hora" value="${esc(d.hora || '')}" ${d.totElDia ? 'disabled' : ''}></label>
          <label>Fins a<input type="time" name="horaFi" value="${esc(d.horaFi || '')}" ${d.totElDia ? 'disabled' : ''}></label>
        </div>
        <label class="check"><input type="checkbox" name="totElDia" ${d.totElDia ? 'checked' : ''}> Tot el dia</label>
      </fieldset>
      <fieldset><legend>On</legend>
        <div class="lloc-cerca">
          <input name="lloc" value="${esc(d.lloc || '')}" placeholder="Cerca un lloc o escriu-lo" autocomplete="off" enterkeyhint="done">
          <div class="sugg" id="llocSugg" hidden></div>
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
    $('#quiXips').innerHTML = xips();
    inp.focus();
  };
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
    if (e.target.closest('#quiContactes')) {
      triaContactes().then((cs) => {
        incorporaContactes(cs, totes(), nousPers).forEach((pe) => { if (!d.qui.includes(pe.id)) d.qui.push(pe.id); });
        $('#quiXips').innerHTML = xips();
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
      q.setAttribute('aria-pressed', d.qui.includes(id));
      return;
    }
    if (e.target.id === 'quiAfegeix') { afegeixPersona(); return; }
    if (e.target.id === 'fEsborra') {
      if (!confirm(`Esborrar «${titolPla(p)}»?`)) return;
      state.plans = state.plans.filter((x) => x.id !== p.id);
      save(); tancaDlg(); render(); toast('Pla esborrat');
    }
  };
  dlgForm.onchange = (e) => {
    if (e.target.name === 'totElDia') {
      dlgForm.elements.hora.disabled = e.target.checked;
      dlgForm.elements.horaFi.disabled = e.target.checked;
    }
  };
  dlgForm.onsubmit = (e) => {
    e.preventDefault();
    if ($('#quiNou').value.trim()) afegeixPersona();
    const f = dlgForm.elements;
    if (!d.tipusId && !f.titol.value.trim()) { toast('Escriu què faràs o tria un tipus'); f.titol.focus(); return; }
    if (!f.data.value) { toast('Falta el dia'); f.data.focus(); return; }
    const dades = {
      tipusId: d.tipusId, titol: f.titol.value.trim(), data: f.data.value,
      totElDia: f.totElDia.checked, hora: f.totElDia.checked ? '' : f.hora.value, horaFi: f.totElDia.checked ? '' : f.horaFi.value,
      lloc: f.lloc.value.trim(), notes: f.notes.value.trim(), estat: f.estat.value || 'confirmat',
      qui: d.qui.filter((id) => totes().some((x) => x.id === id)),
    };
    nousPers.filter((pe) => dades.qui.includes(pe.id)).forEach((pe) => state.persones.push(pe));
    let desat;
    if (nou) { desat = { id: 'pl-' + uid(), ...dades, versio: 1, modificat: new Date().toISOString() }; state.plans.push(desat); }
    else { desat = Object.assign(p, dades, { versio: (p.versio || 1) + 1, modificat: new Date().toISOString() }); }
    save();
    ui.diaSel = desat.data;
    ui.cursor = new Date(parseYmd(desat.data).getFullYear(), parseYmd(desat.data).getMonth(), 1);
    render();
    obreDetall(desat);
    toast(nou ? 'Pla afegit 🎉' : 'Canvis desats');
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
  if (sync()?.disponible && !sync().potserEntrat() && !llegeixPref('senseCompte', false)) ui.view = 'entrada';
  render();
});
// Quan canvia el dia (app oberta tota la nit), es torna a pintar
let diaActual = avui();
setInterval(() => { if (avui() !== diaActual) { diaActual = avui(); render(); } }, 60000);
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
