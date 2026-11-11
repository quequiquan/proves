'use strict';
/* Eines per afegir un pla a qualsevol calendari (Google, iPhone, Outlook…).
   Les fan servir l'app (index.html) i la pàgina que reben els convidats (afegir.html).
   Un pla compartit és un objecte curt:
   { u: identificador, v: versió, t: títol, e: emoji, d: 'AAAA-MM-DD', h: 'HH:MM', f: 'HH:MM' (fins a),
     a: 1 (tot el dia), l: lloc, n: notes, o: qui l'envia } */

const Cal = (() => {
  const pad = (n) => String(n).padStart(2, '0');

  /* ---------- Codificar el pla dins l'enllaç (part després del #, no s'envia mai a cap servidor) ---------- */
  function codifica(obj) {
    const net = {};
    Object.keys(obj).forEach((k) => { if (obj[k] !== undefined && obj[k] !== '' && obj[k] !== null) net[k] = obj[k]; });
    const bytes = new TextEncoder().encode(JSON.stringify(net));
    let bin = '';
    bytes.forEach((b) => { bin += String.fromCharCode(b); });
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function descodifica(txt) {
    try {
      const b64 = txt.replace(/-/g, '+').replace(/_/g, '/');
      const bin = atob(b64 + '==='.slice((b64.length + 3) % 4));
      const obj = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
      return obj && /^\d{4}-\d{2}-\d{2}$/.test(obj.d) ? obj : null;
    } catch (e) { return null; }
  }

  /* ---------- Dates ---------- */
  const totElDia = (e) => Boolean(e.a || !e.h);
  const dia = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const amb = (s, h) => { const d = dia(s); const [a, b] = h.split(':').map(Number); d.setHours(a, b || 0, 0, 0); return d; };
  function inici(e) { return totElDia(e) ? dia(e.d) : amb(e.d, e.h); }
  function fi(e) {
    if (totElDia(e)) { const d = dia(e.d); d.setDate(d.getDate() + 1); return d; }
    if (e.f) {
      const f = amb(e.d, e.f);
      if (f <= inici(e)) f.setDate(f.getDate() + 1);   // acaba passada la mitjanit
      return f;
    }
    return new Date(inici(e).getTime() + 2 * 3600 * 1000);   // si no es diu, 2 hores
  }
  const utc = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  const local = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const titol = (e) => [e.e, e.t].filter(Boolean).join(' ');
  function descripcio(e) {
    return [e.n, e.o ? `De part de: ${e.o}` : ''].filter(Boolean).join('\n\n');
  }

  /* ---------- Fitxer .ics (iPhone, Mac, Outlook i la majoria de calendaris) ---------- */
  const escIcs = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  function plega(linia) {
    // Les línies llargues es parteixen (norma dels fitxers de calendari)
    const out = [];
    let resta = linia;
    while (resta.length > 70) { out.push(resta.slice(0, 70)); resta = ' ' + resta.slice(70); }
    out.push(resta);
    return out.join('\r\n');
  }
  function ics(e) {
    const ll = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Que Qui Quan//CA', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${e.u || Date.now()}@que-qui-quan`,
      `SEQUENCE:${Number(e.v) || 0}`,
      `DTSTAMP:${utc(new Date())}`,
    ];
    if (totElDia(e)) ll.push(`DTSTART;VALUE=DATE:${local(inici(e))}`, `DTEND;VALUE=DATE:${local(fi(e))}`);
    else ll.push(`DTSTART:${utc(inici(e))}`, `DTEND:${utc(fi(e))}`);
    ll.push(`SUMMARY:${escIcs(titol(e))}`);
    if (e.l) ll.push(`LOCATION:${escIcs(e.l)}`);
    const desc = descripcio(e);
    if (desc) ll.push(`DESCRIPTION:${escIcs(desc)}`);
    if (!totElDia(e)) ll.push('BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${escIcs(titol(e))}`, 'TRIGGER:-PT1H', 'END:VALARM');
    ll.push('END:VEVENT', 'END:VCALENDAR');
    return ll.map(plega).join('\r\n') + '\r\n';
  }

  /* ---------- Enllaços directes ---------- */
  function google(e) {
    const dates = totElDia(e) ? `${local(inici(e))}/${local(fi(e))}` : `${utc(inici(e))}/${utc(fi(e))}`;
    const q = new URLSearchParams({ action: 'TEMPLATE', text: titol(e), dates });
    if (e.l) q.set('location', e.l);
    const desc = descripcio(e);
    if (desc) q.set('details', desc);
    return 'https://calendar.google.com/calendar/render?' + q.toString();
  }
  function outlook(e) {
    const iso = (d) => d.toISOString().replace(/\.\d{3}Z$/, 'Z');
    const q = new URLSearchParams({
      path: '/calendar/action/compose', rru: 'addevent', subject: titol(e),
      startdt: totElDia(e) ? e.d : iso(inici(e)), enddt: totElDia(e) ? local(fi(e)).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') : iso(fi(e)),
    });
    if (totElDia(e)) q.set('allday', 'true');
    if (e.l) q.set('location', e.l);
    const desc = descripcio(e);
    if (desc) q.set('body', desc);
    return 'https://outlook.live.com/calendar/0/deeplink/compose?' + q.toString();
  }
  const mapa = (lloc) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(lloc);

  // Obre o baixa el fitxer .ics (a l'iPhone apareix «Afegeix al calendari»)
  function baixaIcs(e) {
    const text = ics(e);
    const nom = (e.t || 'pla').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w]+/g, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 40) || 'pla';
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (ios) { location.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(text); return; }
    const url = URL.createObjectURL(new Blob([text], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = nom + '.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  // Enllaç al fitxer .ics servit per la funció «ics» de Supabase (a l'iPhone és l'única manera que
  // funciona des de l'app instal·lada: s'obre a Safari i surt «Afegeix al calendari»)
  function urlIcs(e) {
    const base = (window.QQQ_CONFIG || {}).supabaseUrl;
    if (!base) return '';
    const tot = totElDia(e);
    const p = {
      u: e.u, v: e.v, t: titol(e), l: e.l, n: descripcio(e) || undefined,
      s: tot ? local(inici(e)) : utc(inici(e)), f: tot ? local(fi(e)) : utc(fi(e)),
    };
    return base.replace(/\/$/, '') + '/functions/v1/ics?p=' + codifica(p);
  }

  /* ---------- Llegir un calendari .ics d'una altra app (p. ex. gravacions de podcasts) ---------- */
  // Retorna [{ uid, titol, lloc, notes, data: 'AAAA-MM-DD', hora, horaFi, totElDia }] amb l'hora local d'aquí
  function llegeixIcs(text) {
    const linies = String(text).replace(/\r?\n[ \t]/g, '').split(/\r?\n/);
    const desesc = (v) => String(v || '').replace(/\\n/gi, '\n').replace(/\\([,;\\])/g, '$1');
    const out = [];
    let ev = null;
    const quan = (param, valor) => {
      if (/VALUE=DATE(?!-)/i.test(param) || /^\d{8}$/.test(valor)) {
        return { data: `${valor.slice(0, 4)}-${valor.slice(4, 6)}-${valor.slice(6, 8)}`, hora: '', dia: true };
      }
      const m = valor.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?(Z?)$/);
      if (!m) return null;
      // Amb «Z» és hora universal → es passa a l'hora d'aquí; sense (o amb TZID) es pren tal qual
      const d = m[7] ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5])) : new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
      return { data: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, hora: `${pad(d.getHours())}:${pad(d.getMinutes())}`, dia: false, d };
    };
    for (const l of linies) {
      if (/^BEGIN:VEVENT/i.test(l)) { ev = {}; continue; }
      if (/^END:VEVENT/i.test(l)) {
        if (ev && ev.ini) {
          const fi = ev.fi;
          out.push({
            uid: ev.uid || ev.titol + ev.ini.data, titol: ev.titol || 'Sense títol', lloc: ev.lloc || '', notes: ev.notes || '',
            data: ev.ini.data, totElDia: ev.ini.dia, hora: ev.ini.hora,
            horaFi: !ev.ini.dia && fi && !fi.dia ? fi.hora : '', cancellat: ev.cancellat,
          });
        }
        ev = null; continue;
      }
      if (!ev) continue;
      const m = l.match(/^([A-Z-]+)((?:;[^:]*)?):(.*)$/i);
      if (!m) continue;
      const [, camp, param, valor] = m;
      const c = camp.toUpperCase();
      if (c === 'UID') ev.uid = valor;
      else if (c === 'SUMMARY') ev.titol = desesc(valor);
      else if (c === 'LOCATION') ev.lloc = desesc(valor);
      else if (c === 'DESCRIPTION') ev.notes = desesc(valor);
      else if (c === 'DTSTART') ev.ini = quan(param, valor);
      else if (c === 'DTEND') ev.fi = quan(param, valor);
      else if (c === 'STATUS') ev.cancellat = /CANCELLED/i.test(valor);
    }
    return out;
  }

  return { codifica, descodifica, ics, google, outlook, mapa, baixaIcs, urlIcs, llegeixIcs, inici, fi, totElDia };
})();
