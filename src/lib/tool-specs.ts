/**
 * De rekenaars van de site. Elke datum komt uit de rekenkern (engine/feestdagen.ts, engine/bruggen.ts,
 * engine/school.ts); niets is overgetypt. Een spec somt zijn velden op (zichtbaar eerst, `adv` ingeklapt) en een
 * functie `run` die de resultaatkaart levert. Kalender en aftellen zijn eigen componenten.
 */
import type { ToolSpec, V, ToolOut, Opt } from './tool-types';
import { resolve } from './tool-types';
import { formatNumber, formatDecimal, premier, type Lang } from './format';
import { wettelijke, vervangingsdagen, feestdagen, paaszondag, nthWeekday, fromIso, toIso, isWeekend, weekday, dayNum, GEMEENSCHAPPEN, GEM_KORT, GEM_FEEST, aanplakDatum, type Gemeenschap, type Optionen, type Regime } from './engine/feestdagen';
import { optimaliseer, bruggen, brugdagen, werkdagen, isoWeek, weeksInYear, weekdagen } from './engine/bruggen';
import { kalender, JAREN, VAKS, VAK_NAME, blok, dagen, weekdagenIn, vakantieSet, zomerBegin, type Vak, type Periode } from './engine/school';

export type Args = Record<string, number | string>;
export const T = (l: Lang, nl: string, fr: string, en: string) => (l === 'nl' ? nl : l === 'fr' ? fr : en);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k] ?? '');
const num = (x: number, l: Lang) => formatNumber(x, 0, l);
export const TAG = (l: Lang) => (l === 'nl' ? 'nl-BE' : l === 'fr' ? 'fr-BE' : 'en-GB');
const fmt = (iso: string, l: Lang, o: Intl.DateTimeFormatOptions) => { const x = new Date(`${iso}T12:00:00Z`).toLocaleDateString(TAG(l), { ...o, timeZone: 'UTC' }); return l === 'fr' ? premier(x) : x; };
/** « 8 februari 2027 » */
export const dLong = (iso: string, l: Lang) => fmt(iso, l, { day: 'numeric', month: 'long', year: 'numeric' });
/** « maandag 8 februari 2027 » */
export const dWeek = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
/** « ma 8 februari » */
export const dShort = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'short', day: 'numeric', month: 'long' });
/** « 8 februari » */
export const dDay = (iso: string, l: Lang) => fmt(iso, l, { day: 'numeric', month: 'long' });
export const wdLong = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'long' });
export const span = (a: string, b: string, l: Lang) => (a === b ? dShort(a, l) : `${dShort(a, l)} – ${dShort(b, l)}`);
/** « 2 – 8 november 2026 » of « 21 december 2026 – 3 januari 2027 » */
export function periode(p: Periode, l: Lang): string {
  const [ya, yb] = [p.van.slice(0, 4), p.tot.slice(0, 4)];
  if (ya !== yb) return `${dLong(p.van, l)} – ${dLong(p.tot, l)}`;
  if (p.van.slice(5, 7) === p.tot.slice(5, 7)) return `${fmt(p.van, l, { day: 'numeric' })} – ${dLong(p.tot, l)}`;
  return `${dDay(p.van, l)} – ${dLong(p.tot, l)}`;
}
export const dagenTxt = (x: number, l: Lang) => `${num(x, l)} ${x === 1 ? T(l, 'dag', 'jour', 'day') : T(l, 'dagen', 'jours', 'days')}`;
const off = (iso: string, d: number) => toIso(fromIso(iso) + d);
export const sj = (y: number) => `${y}-${y + 1}`;

/* ------------------------------------------------------------------ Velden */
const yearRange = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const jaarOpts = (ys: number[]): Opt[] => ys.map((y) => ({ value: String(y), label: String(y) }));
const gemOpts = (l: Lang): Opt[] => GEMEENSCHAPPEN.map((g) => ({ value: g, label: GEM_KORT[g][l] }));
const fGem = (l: Lang, def: string, id = 'gem', label?: string) => ({ kind: 'select' as const, id, label: label ?? T(l, 'Onderwijs van', 'Enseignement', 'School system'), def, options: gemOpts(l) });
const fJaar = (l: Lang, def: number, ys = [2026, 2027, 2028, 2029, 2030]) => ({ kind: 'select' as const, id: 'jaar', label: T(l, 'Jaar', 'Année', 'Year'), def: String(def), options: jaarOpts(ys) });
/** Schooljaren waarvoor de gekozen Gemeenschap een kalender heeft. */
const fSj = (l: Lang, def: number, dep = 'gem') => ({ kind: 'select' as const, id: 'sj', label: T(l, 'Schooljaar', 'Année scolaire', 'School year'), def: String(def), options: (v: V) => (JAREN[(s(v, dep) || 'VG') as Gemeenschap] ?? JAREN.VG).map((y) => ({ value: String(y), label: sj(y) })) });
const fVerv = (l: Lang, def = 'volgende', adv = true) => ({ kind: 'choice' as const, id: 'vv', label: T(l, 'Vervangingsdagen', 'Jours de remplacement', 'Replacement days'), def, adv, options: [{ value: 'volgende', label: T(l, 'Meetellen', 'Compter', 'Count') }, { value: 'geen', label: T(l, 'Niet', 'Non', 'No') }], help: T(l, 'Zonder akkoord: eerste werkdag na de feestdag.', 'Sans accord : premier jour ouvrable suivant.', 'Without an agreement: first working day after.') });
const fGemFeest = (l: Lang) => ({ kind: 'select' as const, id: 'gf', label: T(l, 'Feestdag van een Gemeenschap vrij', 'Fête d’une Communauté chômée', 'Community day off'), def: '', adv: true, options: [{ value: '', label: T(l, 'Geen', 'Aucune', 'None') }, ...GEMEENSCHAPPEN.map((g) => ({ value: g, label: `${GEM_FEEST[g].name[l]} (${dDay(toIso(dayNum(2027, GEM_FEEST[g].m, GEM_FEEST[g].d)), l)})` }))] });
const fOud = (l: Lang) => ({ kind: 'choice' as const, id: 'od', label: T(l, '24 en 31 december', '24 et 31 décembre', '24 and 31 December'), def: 'werk', adv: true, options: [{ value: 'werk', label: T(l, 'Werkdagen', 'Travaillés', 'Working days') }, { value: 'vrij', label: T(l, 'Vrij', 'Congé', 'Days off') }] });
const fRegime = (l: Lang, adv = true) => ({ kind: 'choice' as const, id: 'rg', label: T(l, 'Werkweek', 'Semaine de travail', 'Working week'), def: '5', adv, options: [{ value: '5', label: T(l, 'Ma–vr', 'Lun–ven', 'Mon–Fri') }, { value: '6', label: T(l, 'Ma–za', 'Lun–sam', 'Mon–Sat') }] });
const opts = (v: V): Optionen => ({ vervanging: s(v, 'vv') === 'geen' ? 'geen' : 'volgende', gem: (s(v, 'gf') || '') as Gemeenschap | '', oudejaar: s(v, 'od') === 'vrij', regime: (n(v, 'rg') || 5) as Regime });
const fname = (id: string, y: number, l: Lang, o: Optionen) => [...feestdagen(y - 1, o), ...feestdagen(y, o), ...feestdagen(y + 1, o)].find((f) => f.id === id)?.name[l] ?? id;
const sumA = (a: number[]) => a.reduce((x, z) => x + z, 0);
const gname = (g: Gemeenschap, l: Lang) => GEM_KORT[g][l];
const vname = (g: Gemeenschap, v: Vak, l: Lang) => VAK_NAME[g][v][l];
const nog = (l: Lang) => T(l, 'nog niet gepubliceerd', 'pas encore publié', 'not yet published');

/* ------------------------------------------------------------------ Schooljaar van een Gemeenschap */
function svSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fGem(l, String(a.gem ?? (l === 'fr' ? 'FWB' : 'VG'))), fSj(l, Number(a.sj ?? 2026))],
    run: (v) => {
      const g = (s(v, 'gem') || 'VG') as Gemeenschap, y = n(v, 'sj'), k = kalender(g, y);
      if (!k) return { label: `${gname(g, l)} ${sj(y)}`, value: nog(l), rows: [] };
      const rows = VAKS.map((x) => {
        const p = k[x];
        const zb = x === 'zomer' && !p ? zomerBegin(g, y) : null;
        return [vname(g, x, l), p ? (x === 'zomer' ? `${dDay(p.van, l)} – ${dDay(p.tot, l)}` : span(p.van, p.tot, l)) : zb ? T(l, `vanaf ${dShort(zb, l)}`, `dès le ${dShort(zb, l)}`, `from ${dShort(zb, l)}`) : nog(l)] as [string, string];
      });
      const wk = VAKS.filter((x) => x !== 'zomer').reduce((t, x) => t + (k[x] ? weekdagenIn(k[x]!) : 0), 0);
      return {
        label: T(l, `Schoolvakanties ${sj(y)}, ${gname(g, l)}`, `Vacances scolaires ${sj(y)}, ${gname(g, l)}`, `School holidays ${sj(y)}, ${gname(g, l)}`),
        value: k.herfst ? periode(g === 'DG' ? k.herfst : k.herfst, l) : nog(l),
        sub: T(l, `${vname(g, 'herfst', l)}; daarna volgen nog vier vakanties. ${num(wk, l)} lesvrije weekdagen buiten de zomer.`, `${vname(g, 'herfst', l)} ; quatre autres congés suivent. ${num(wk, l)} jours de semaine sans cours hors été.`, `${vname(g, 'herfst', l)}; four more breaks follow. ${num(wk, l)} weekdays without lessons outside summer.`),
        rows: [[T(l, 'Eerste schooldag', 'Rentrée', 'First day of school'), k.start ? dShort(k.start, l) : nog(l)], ...rows.slice(1), [T(l, 'Laatste dag van het schooljaar', 'Dernier jour de l’année', 'Last day of the school year'), k.laatste ? dShort(k.laatste, l) : nog(l)]],
        table: {
          caption: T(l, `Alle vakanties ${sj(y)} (${gname(g, l)}), met het aantal vrije dagen`, `Tous les congés ${sj(y)} (${gname(g, l)}), avec le nombre de jours`, `Every break in ${sj(y)} (${gname(g, l)}), with the number of days`),
          headers: [T(l, 'Vakantie', 'Congé', 'Break'), T(l, 'Van', 'Du', 'From'), T(l, 'Tot en met', 'Au', 'To'), T(l, 'Dagen op een rij', 'Jours d’affilée', 'Days in a row')],
          rows: VAKS.map((x) => { const p = k[x]; if (!p) return [vname(g, x, l), zomerBegin(g, y) ? dWeek(zomerBegin(g, y)!, l) : '–', nog(l), '–']; const b = g === 'DG' ? blok(p) : p; return [vname(g, x, l), dWeek(p.van, l), dWeek(p.tot, l), num(dagen(b), l)]; }),
          align: ['l', 'l', 'l', 'r'],
        },
        tables: [{
          caption: T(l, 'Losse vrije dagen in hetzelfde schooljaar', 'Jours de congé isolés de la même année scolaire', 'Single days off in the same school year'),
          headers: [T(l, 'Datum', 'Date', 'Date'), T(l, 'Vrije dag', 'Congé', 'Day off')],
          rows: k.vrij.map((x) => [dWeek(x.date, l), x.name[l]]),
          align: ['l', 'l'],
        }],
        note: g === 'DG' ? T(l, 'De Duitstalige Gemeenschap publiceert maandag tot vrijdag; het aantal dagen telt de weekends ervoor en erna mee.', 'La Communauté germanophone publie du lundi au vendredi ; le nombre de jours compte les week-ends qui entourent le congé.', 'The German-speaking Community publishes Monday to Friday; the day count includes the weekends either side.') : undefined,
      };
    },
  };
}

/* ------------------------------------------------------------------ Eén vakantie, drie Gemeenschappen */
function vkSpec(l: Lang, a: Args = {}): ToolSpec {
  const vak = String(a.vak ?? 'herfst') as Vak;
  return {
    inputs: [fGem(l, String(a.gem ?? (l === 'fr' ? 'FWB' : 'VG'))), fSj(l, Number(a.sj ?? 2026)), { kind: 'select', id: 'vak', label: T(l, 'Vakantie', 'Congé', 'Break'), def: vak, adv: true, options: VAKS.map((x) => ({ value: x, label: VAK_NAME.VG[x][l] })) }],
    run: (v) => {
      const g = (s(v, 'gem') || 'VG') as Gemeenschap, y = n(v, 'sj'), x = (s(v, 'vak') || vak) as Vak;
      const k = kalender(g, y), p = k?.[x] ?? null;
      const ander = GEMEENSCHAPPEN.filter((h) => h !== g).map((h) => { const q = kalender(h, y)?.[x]; return [`${vname(h, x, l)}, ${gname(h, l)}`, q ? span(q.van, q.tot, l) : nog(l)] as [string, string]; });
      const ys = [2026, 2027, 2028, 2029];
      return {
        label: `${vname(g, x, l)} ${x === 'herfst' || x === 'kerst' ? y : y + 1}, ${gname(g, l)}`,
        value: p ? periode(p, l) : nog(l),
        sub: p ? T(l, `${dagenTxt(dagen(g === 'DG' ? blok(p) : p), l)} vrij op een rij, van ${wdLong(p.van, l)} tot ${wdLong(p.tot, l)}.`, `${dagenTxt(dagen(g === 'DG' ? blok(p) : p), l)} de congé d’affilée, du ${wdLong(p.van, l)} au ${wdLong(p.tot, l)}.`, `${dagenTxt(dagen(g === 'DG' ? blok(p) : p), l)} off in a row, ${wdLong(p.van, l)} to ${wdLong(p.tot, l)}.`) : undefined,
        rows: [...ander, [T(l, 'Lesvrije weekdagen', 'Jours de semaine sans cours', 'Weekdays without lessons'), p ? num(weekdagenIn(p), l) : '–']],
        table: {
          caption: T(l, `${VAK_NAME.VG[x].nl} in de drie Gemeenschappen, schooljaren 2026-2027 tot 2029-2030`, `${VAK_NAME.FWB[x].fr} dans les trois Communautés, de 2026-2027 à 2029-2030`, `${VAK_NAME.VG[x].en} in the three Communities, school years 2026-2027 to 2029-2030`),
          headers: [T(l, 'Schooljaar', 'Année scolaire', 'School year'), ...GEMEENSCHAPPEN.map((h) => gname(h, l))],
          rows: ys.map((yy) => [sj(yy), ...GEMEENSCHAPPEN.map((h) => { const q = kalender(h, yy)?.[x]; return q ? span(q.van, q.tot, l) : x === 'zomer' && zomerBegin(h, yy) ? T(l, `vanaf ${dShort(zomerBegin(h, yy)!, l)}`, `dès le ${dShort(zomerBegin(h, yy)!, l)}`, `from ${dShort(zomerBegin(h, yy)!, l)}`) : nog(l); })]),
          align: ['l', 'l', 'l', 'l'],
        },
      };
    },
  };
}

/* ------------------------------------------------------------------ Vergelijker van twee Gemeenschappen */
export function vergelijk(a: Gemeenschap, b: Gemeenschap, y: number) {
  const A = vakantieSet(a, y), B = vakantieSet(b, y);
  const lo = Math.min(...A, ...B), hi = Math.max(...A, ...B);
  const segs: Array<{ van: string; tot: string; st: 'beide' | 'a' | 'b' }> = [];
  let both = 0, onlyA = 0, onlyB = 0;
  for (let d = lo; d <= hi; d++) {
    const ia = A.has(d), ib = B.has(d);
    if (!ia && !ib) continue;
    const st = ia && ib ? 'beide' : ia ? 'a' : 'b';
    if (!isWeekend(d)) { if (st === 'beide') both++; else if (st === 'a') onlyA++; else onlyB++; }
    const last = segs[segs.length - 1];
    if (last && last.st === st && fromIso(last.tot) === d - 1) last.tot = toIso(d); else segs.push({ van: toIso(d), tot: toIso(d), st });
  }
  return { both, onlyA, onlyB, segs: segs.filter((x) => fromIso(x.tot) - fromIso(x.van) >= 1 || !isWeekend(fromIso(x.van))) };
}
function vgSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fGem(l, String(a.a ?? 'VG'), 'a', T(l, 'Kind 1 of school 1', 'Enfant 1 ou école 1', 'Child 1 or school 1')), fGem(l, String(a.b ?? 'FWB'), 'b', T(l, 'Kind 2 of school 2', 'Enfant 2 ou école 2', 'Child 2 or school 2')), { kind: 'select', id: 'sj', label: T(l, 'Schooljaar', 'Année scolaire', 'School year'), def: String(a.sj ?? 2026), options: [2026, 2027, 2028].map((y) => ({ value: String(y), label: sj(y) })) }],
    run: (v) => {
      const ga = (s(v, 'a') || 'VG') as Gemeenschap, gb = (s(v, 'b') || 'FWB') as Gemeenschap, y = n(v, 'sj');
      if (ga === gb) return { label: gname(ga, l), value: T(l, 'Zelfde kalender', 'Même calendrier', 'Same calendar'), sub: T(l, 'Kies twee verschillende Gemeenschappen.', 'Choisissez deux Communautés différentes.', 'Choose two different Communities.'), rows: [] };
      const r = vergelijk(ga, gb, y);
      const lab = (st: string) => (st === 'beide' ? T(l, 'beiden vrij', 'les deux en congé', 'both off') : st === 'a' ? T(l, `alleen ${gname(ga, l)}`, `seulement ${gname(ga, l)}`, `${gname(ga, l)} only`) : T(l, `alleen ${gname(gb, l)}`, `seulement ${gname(gb, l)}`, `${gname(gb, l)} only`));
      return {
        label: T(l, `${gname(ga, l)} en ${gname(gb, l)}, ${sj(y)}`, `${gname(ga, l)} et ${gname(gb, l)}, ${sj(y)}`, `${gname(ga, l)} and ${gname(gb, l)}, ${sj(y)}`),
        value: T(l, `${num(r.both, l)} weekdagen samen vrij`, `${num(r.both, l)} jours de semaine en commun`, `${num(r.both, l)} weekdays off together`),
        sub: T(l, 'Weekdagen in de vakanties, zomer inbegrepen; weekends niet meegeteld.', 'Jours de semaine dans les congés, été compris ; week-ends non comptés.', 'Weekdays inside the breaks, summer included; weekends not counted.'),
        rows: [[lab('beide'), num(r.both, l), r.both], [lab('a'), num(r.onlyA, l), r.onlyA], [lab('b'), num(r.onlyB, l), r.onlyB]],
        table: {
          caption: T(l, `Wie is wanneer vrij, ${sj(y)}`, `Qui est en congé et quand, ${sj(y)}`, `Who is off when, ${sj(y)}`),
          headers: [T(l, 'Periode', 'Période', 'Period'), T(l, 'Weekdagen', 'Jours de semaine', 'Weekdays'), T(l, 'Situatie', 'Situation', 'Situation')],
          rows: r.segs.map((x) => [span(x.van, x.tot, l), num(weekdagenIn(x), l), lab(x.st)]),
          align: ['l', 'r', 'l'],
        },
      };
    },
  };
}

/* ------------------------------------------------------------------ Feestdagen van een jaar */
function ftSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJaar(l, Number(a.jaar ?? 2027)), fRegime(l, false)],
    run: (v) => {
      const y = n(v, 'jaar'), rg = (n(v, 'rg') || 5) as Regime;
      const list = wettelijke(y), vv = vervangingsdagen(y, rg);
      const wk = list.filter((f) => !isWeekend(fromIso(f.date)));
      const bd = brugdagen(y);
      const at = sumA(werkdagen(y));
      return {
        label: T(l, `Wettelijke feestdagen ${y} in België`, `Jours fériés légaux ${y} en Belgique`, `Public holidays ${y} in Belgium`),
        value: T(l, `${num(wk.length, l)} op een weekdag`, `${num(wk.length, l)} en semaine`, `${num(wk.length, l)} on a weekday`),
        sub: T(l, `Van de 10 feestdagen vallen er ${num(10 - wk.length, l)} in het weekend; ${num(vv.length, l)} daarvan moet${vv.length === 1 ? '' : 'en'} worden vervangen.`, `Sur les 10 jours fériés, ${num(10 - wk.length, l)} tombent un week-end ; ${num(vv.length, l)} doivent être remplacés.`, `Of the 10 holidays, ${num(10 - wk.length, l)} fall at a weekend; ${num(vv.length, l)} must be replaced.`),
        rows: [
          [T(l, 'Feestdagen op een weekdag', 'Jours fériés en semaine', 'Holidays on weekdays'), num(wk.length, l)],
          [T(l, 'Te vervangen feestdagen', 'Jours fériés à remplacer', 'Holidays to replace'), num(vv.length, l)],
          [T(l, 'Echte brugdagen', 'Vrais ponts', 'True bridge days'), num(bd.length, l)],
          [T(l, 'Werkdagen (zonder vervangingsdagen)', 'Jours ouvrables (sans remplacement)', 'Working days (no replacement days)'), num(at, l)],
        ],
        table: {
          caption: T(l, `De 10 wettelijke feestdagen ${y}, met weekdag en vervangingsdag zonder akkoord`, `Les 10 jours fériés légaux ${y}, avec le jour de la semaine et le remplacement par défaut`, `The 10 public holidays ${y}, with weekday and default replacement day`),
          headers: [T(l, 'Datum', 'Date', 'Date'), T(l, 'Weekdag', 'Jour', 'Weekday'), T(l, 'Feestdag', 'Jour férié', 'Holiday'), T(l, 'Vervangingsdag', 'Remplacement', 'Replacement')],
          rows: list.map((f) => { const r = vv.find((x) => x.voor === f.id); return [dLong(f.date, l), wdLong(f.date, l), f.name[l], r ? dShort(r.date, l) : '–']; }),
          align: ['l', 'l', 'l', 'l'],
        },
      };
    },
  };
}

/* ------------------------------------------------------------------ Vervangingsdagen */
function vvSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJaar(l, Number(a.jaar ?? 2027)), fRegime(l, false)],
    run: (v) => {
      const y = n(v, 'jaar'), rg = (n(v, 'rg') || 5) as Regime;
      const vv = vervangingsdagen(y, rg);
      const fd = wettelijke(y);
      return {
        label: T(l, `Vervangingsdagen ${y}, ${rg === 5 ? 'vijfdagenweek' : 'zesdagenweek'}`, `Jours de remplacement ${y}, semaine de ${rg} jours`, `Replacement days ${y}, ${rg}-day week`),
        value: T(l, `${num(vv.length, l)} ${vv.length === 1 ? 'dag' : 'dagen'}`, `${num(vv.length, l)} jour${vv.length === 1 ? '' : 's'} à remplacer`, `${num(vv.length, l)} replacement day${vv.length === 1 ? '' : 's'}`),
        sub: T(l, `Aanplakken in de onderneming vóór ${dLong(aanplakDatum(y), l)}.`, `Affichage dans l’entreprise avant le ${dLong(aanplakDatum(y), l)}.`, `Notice posted in the workplace before ${dLong(aanplakDatum(y), l)}.`),
        rows: vv.length ? vv.map((x) => { const f = fd.find((z) => z.id === x.voor)!; return [`${f.name[l]} (${wdLong(f.date, l)})`, dShort(x.date, l)] as [string, string]; }) : [[T(l, 'Geen feestdag op een inactiviteitsdag', 'Aucun jour férié un jour d’inactivité', 'No holiday on a non-working day'), '–']],
        note: T(l, 'Datum zonder akkoord: de eerste gewone activiteitsdag na de feestdag. Paritair comité, ondernemingsraad, vakbondsafvaardiging of een akkoord met de werknemers kunnen een andere dag kiezen.', 'Date sans accord : le premier jour habituel d’activité qui suit le jour férié. Commission paritaire, conseil d’entreprise, délégation syndicale ou accord avec les travailleurs peuvent fixer un autre jour.', 'Date without an agreement: the first ordinary working day after the holiday. A joint committee, works council, union delegation or agreement with staff can choose another day.'),
        table: {
          caption: T(l, 'Vervangingsdagen 2026 tot 2030 (vijfdagenweek, terugvalregel)', 'Jours de remplacement 2026 à 2030 (semaine de cinq jours, règle par défaut)', 'Replacement days 2026 to 2030 (five-day week, default rule)'),
          headers: [T(l, 'Jaar', 'Année', 'Year'), T(l, 'Feestdag in het weekend', 'Jour férié le week-end', 'Holiday at a weekend'), T(l, 'Vervangingsdag', 'Remplacement', 'Replacement day')],
          rows: yearRange(2026, 2030).flatMap((yy) => vervangingsdagen(yy, 5).map((x) => { const f = wettelijke(yy).find((z) => z.id === x.voor)!; return [String(yy), `${f.name[l]}, ${dShort(f.date, l)}`, dShort(x.date, l)]; })),
          align: ['l', 'l', 'l'],
        },
      };
    },
  };
}

/* ------------------------------------------------------------------ Brugdagen-optimalisator */
function btSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJaar(l, Number(a.jaar ?? 2027), [2026, 2027, 2028]), { id: 'verlof', label: T(l, 'Verlofdagen die u inzet', 'Jours de congé à placer', 'Leave days to use'), def: Number(a.verlof ?? 6), unit: T(l, 'dagen', 'jours', 'days'), max: 40 }, fVerv(l, String(a.vv ?? 'volgende')), fGemFeest(l), fOud(l)],
    run: (v) => {
      const y = n(v, 'jaar'), o = opts(v), budget = Math.round(n(v, 'verlof'));
      const p = optimaliseer(y, budget, o), all = bruggen(y, o);
      const f = p.verlof ? p.vrij / p.verlof : 0;
      return {
        label: T(l, `${y}: met ${num(p.verlof, l)} verlofdagen`, `${y} : avec ${num(p.verlof, l)} jours de congé`, `${y}: using ${num(p.verlof, l)} leave days`),
        value: T(l, `${num(p.vrij, l)} dagen vrij`, `${num(p.vrij, l)} jours de repos`, `${num(p.vrij, l)} days off`),
        sub: p.verlof ? T(l, `Eén verlofdag levert gemiddeld ${formatDecimal(f, 1, l)} vrije dagen op een rij op.`, `Un jour de congé rapporte en moyenne ${formatDecimal(f, 1, l)} jours de repos d’affilée.`, `One leave day buys on average ${formatDecimal(f, 1, l)} days off in a row.`) : T(l, 'Vul minstens één verlofdag in.', 'Indiquez au moins un jour de congé.', 'Enter at least one leave day.'),
        rows: p.blokken.slice(0, 6).map((b) => [span(b.vrijVan, b.vrijTot, l), `${num(b.verlof, l)} → ${num(b.vrij, l)}`, b.vrij] as [string, string, number]),
        table: p.blokken.length ? {
          caption: T(l, `Uw verlofplan ${y}: deze dagen aanvragen`, `Votre plan de congés ${y} : les jours à demander`, `Your ${y} leave plan: book these days`),
          headers: [T(l, 'Verlof nemen', 'Congé à prendre', 'Take leave'), T(l, 'Verlofdagen', 'Jours de congé', 'Leave days'), T(l, 'Vrij op een rij', 'Repos d’affilée', 'Off in a row'), T(l, 'Vrije dagen', 'Jours de repos', 'Days off'), T(l, 'Dankzij', 'Grâce à', 'Thanks to')],
          rows: p.blokken.map((b) => [span(b.verlofVan, b.verlofTot, l), num(b.verlof, l), span(b.vrijVan, b.vrijTot, l), num(b.vrij, l), b.feestdagen.map((id) => fname(id, y, l, o)).join(', ')]),
          align: ['l', 'r', 'l', 'r', 'l'],
        } : undefined,
        tables: all.length ? [{
          caption: T(l, `Alle brugdagen en korte bruggen ${y}, de beste eerst`, `Tous les ponts ${y}, les plus rentables d’abord`, `Every bridge in ${y}, best first`),
          headers: [T(l, 'Verlof nemen', 'Congé à prendre', 'Take leave'), T(l, 'Verlofdagen', 'Jours de congé', 'Leave days'), T(l, 'Vrij op een rij', 'Repos d’affilée', 'Off in a row'), T(l, 'Vrije dagen', 'Jours de repos', 'Days off'), T(l, 'Feestdag', 'Jour férié', 'Holiday')],
          rows: all.map((b) => [span(b.verlofVan, b.verlofTot, l), num(b.verlof, l), span(b.vrijVan, b.vrijTot, l), num(b.vrij, l), b.feestdagen.map((id) => fname(id, y, l, o)).join(', ')]),
          align: ['l', 'r', 'l', 'r', 'l'],
        }] : undefined,
        note: p.rest > 0 ? T(l, `${dagenTxt(p.rest, l)} verlengen geen brug meer en blijven vrij te plannen.`, `${dagenTxt(p.rest, l)} n’allongent plus aucun pont et restent libres.`, `${dagenTxt(p.rest, l)} no longer lengthen a bridge and stay free to plan.`) : undefined,
      };
    },
  };
}

/* ------------------------------------------------------------------ Werkdagen */
export const MAANDEN = (l: Lang) => Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(2027, i, 15)).toLocaleDateString(TAG(l), { month: 'long', timeZone: 'UTC' }));
function wdSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJaar(l, Number(a.jaar ?? 2027)), { kind: 'choice', id: 'week', label: T(l, 'Werkdagen per week', 'Jours par semaine', 'Days per week'), def: '5', options: [{ value: '5', label: '5' }, { value: '4', label: '4' }, { value: '3', label: '3' }] }, fVerv(l), fGemFeest(l), fOud(l)],
    run: (v) => {
      const y = n(v, 'jaar'), o = opts(v), m = werkdagen(y, o), sum = sumA(m), w = Number(s(v, 'week')) || 5;
      const bruto = weekdagen(y), anteil = Math.round((sum * w) / 5);
      return {
        label: T(l, `Werkdagen ${y} in België`, `Jours ouvrables ${y} en Belgique`, `Working days ${y} in Belgium`),
        value: w === 5 ? num(sum, l) : `≈ ${num(anteil, l)}`,
        sub: w === 5 ? T(l, 'Maandag tot vrijdag, zonder feestdagen en gekozen vrije dagen.', 'Du lundi au vendredi, sans jours fériés ni jours choisis.', 'Monday to Friday, holidays and chosen days off excluded.') : T(l, `Bij ${w} dagen per week, pro rata uit ${num(sum, l)} werkdagen.`, `À ${w} jours par semaine, au prorata de ${num(sum, l)} jours.`, `At ${w} days a week, pro rata from ${num(sum, l)} days.`),
        rows: [
          [T(l, 'Maandagen tot vrijdagen', 'Lundis à vendredis', 'Mondays to Fridays'), num(bruto, l)],
          [T(l, 'Daarvan vrij', 'Dont congés', 'Of which off'), num(bruto - sum, l)],
          [T(l, 'Eerste helft', 'Premier semestre', 'First half'), num(sumA(m.slice(0, 6)), l)],
          [T(l, 'Tweede helft', 'Second semestre', 'Second half'), num(sumA(m.slice(6)), l)],
        ],
        table: { caption: T(l, `Werkdagen per maand, ${y}`, `Jours ouvrables par mois, ${y}`, `Working days per month, ${y}`), headers: [T(l, 'Maand', 'Mois', 'Month'), T(l, 'Werkdagen', 'Jours ouvrables', 'Working days')], rows: MAANDEN(l).map((mn, i) => [mn, num(m[i], l)]), align: ['l', 'r'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Pasen */
export function gaussSchritte(x: number) {
  const K = Math.floor(x / 100), M = 15 + Math.floor((3 * K + 3) / 4) - Math.floor((8 * K + 13) / 25), S = 2 - Math.floor((3 * K + 3) / 4);
  const A = x % 19, D = (19 * A + M) % 30, R = Math.floor((D + Math.floor(A / 11)) / 29), OG = 21 + D - R;
  const SZ = 7 - ((x + Math.floor(x / 4) + S) % 7), OE = 7 - ((((OG - SZ) % 7) + 7) % 7);
  return { K, M, S, A, D, R, OG, SZ, OE, OS: OG + OE };
}
function osSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJaar(l, Number(a.jaar ?? 2027), yearRange(2020, 2050))],
    run: (v) => {
      const y = n(v, 'jaar'), os = paaszondag(y), g = gaussSchritte(y);
      return {
        label: T(l, `Pasen ${y}`, `Pâques ${y}`, `Easter ${y}`),
        value: dLong(os, l),
        sub: T(l, `Paasmaandag ${dLong(off(os, 1), l)} is een wettelijke feestdag.`, `Le lundi de Pâques, ${dLong(off(os, 1), l)}, est férié.`, `Easter Monday, ${dLong(off(os, 1), l)}, is a public holiday.`),
        rows: [
          [T(l, 'Goede Vrijdag (geen feestdag)', 'Vendredi saint (non férié)', 'Good Friday (not a holiday)'), dShort(off(os, -2), l)],
          [T(l, 'Paasmaandag', 'Lundi de Pâques', 'Easter Monday'), dShort(off(os, 1), l)],
          [T(l, 'Hemelvaartsdag', 'Ascension', 'Ascension Day'), dShort(off(os, 39), l)],
          [T(l, 'Pinkstermaandag', 'Lundi de Pentecôte', 'Whit Monday'), dShort(off(os, 50), l)],
          [T(l, 'Krokusvakantie Vlaanderen vanaf', 'Carnaval en Flandre dès le', 'Flemish carnival break from'), dShort(off(os, -48), l)],
        ],
        table: {
          caption: T(l, `Paasformule van Gauss voor ${y}, stap voor stap`, `Formule de Pâques de Gauss pour ${y}, pas à pas`, `Gauss's Easter formula for ${y}, step by step`),
          headers: [T(l, 'Grootheid', 'Grandeur', 'Quantity'), T(l, 'Betekenis', 'Signification', 'Meaning'), T(l, 'Waarde', 'Valeur', 'Value')],
          rows: [
            ['K', T(l, 'eeuwgetal', 'siècle', 'century number'), String(g.K)], ['M', T(l, 'maancorrectie', 'correction lunaire', 'lunar correction'), String(g.M)], ['S', T(l, 'zonnecorrectie', 'correction solaire', 'solar correction'), String(g.S)],
            ['A', T(l, 'maanparameter', 'paramètre lunaire', 'lunar parameter'), String(g.A)], ['D', T(l, 'kiem van de eerste lentevolle maan', 'germe de la première pleine lune de printemps', 'seed of the first spring full moon'), String(g.D)], ['R', T(l, 'kalendercorrectie', 'correction calendaire', 'calendar correction'), String(g.R)],
            ['OG', T(l, 'paasgrens (dag van maart)', 'limite pascale (jour de mars)', 'paschal full moon (day of March)'), String(g.OG)], ['SZ', T(l, 'eerste zondag van maart', 'premier dimanche de mars', 'first Sunday in March'), String(g.SZ)], ['OE', T(l, 'afstand tot paaszondag', 'écart jusqu’au dimanche de Pâques', 'days to Easter Sunday'), String(g.OE)],
            ['OS', T(l, 'paaszondag als dag van maart (32 = 1 april)', 'Pâques en jour de mars (32 = 1er avril)', 'Easter Sunday as a day of March (32 = 1 April)'), String(g.OS)],
          ],
          align: ['l', 'l', 'r'],
        },
      };
    },
  };
}

/* ------------------------------------------------------------------ Weeknummer */
function kwSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJaar(l, Number(a.jaar ?? 2027), yearRange(2025, 2030)), { kind: 'select', id: 'kw', label: T(l, 'Weeknummer', 'Semaine', 'Week number'), def: String(a.kw ?? 1), options: (v: V) => yearRange(1, weeksInYear(n(v, 'jaar'))).map((w) => ({ value: String(w), label: T(l, `Week ${w}`, `Semaine ${w}`, `Week ${w}`) })) }],
    run: (v) => {
      const y = n(v, 'jaar'), w = n(v, 'kw');
      const j4 = fromIso(`${y}-01-04`), mo1 = j4 - ((weekday(j4) + 6) % 7);
      const mo = toIso(mo1 + 7 * (w - 1)), zo = toIso(mo1 + 7 * (w - 1) + 6);
      const hol = [...wettelijke(y - 1), ...wettelijke(y), ...wettelijke(y + 1)].filter((f) => f.date >= mo && f.date <= zo);
      const sch = GEMEENSCHAPPEN.filter((g) => { const S = new Set([...vakantieSet(g, y - 1), ...vakantieSet(g, y)]); return S.has(fromIso(mo) + 2); });
      return {
        label: T(l, `Week ${w} van ${y}`, `Semaine ${w} de ${y}`, `Week ${w} of ${y}`),
        value: `${dShort(mo, l)} – ${dShort(zo, l)}`,
        sub: T(l, `${y} telt ${weeksInYear(y)} weken volgens ISO 8601.`, `${y} compte ${weeksInYear(y)} semaines selon l’ISO 8601.`, `${y} has ${weeksInYear(y)} ISO 8601 weeks.`),
        rows: [
          [T(l, 'Maandag', 'Lundi', 'Monday'), dLong(mo, l)], [T(l, 'Zondag', 'Dimanche', 'Sunday'), dLong(zo, l)],
          [T(l, 'Feestdagen in deze week', 'Jours fériés cette semaine', 'Holidays this week'), hol.length ? hol.map((f) => f.name[l]).join(', ') : T(l, 'geen', 'aucun', 'none')],
          [T(l, 'Schoolvakantie op woensdag', 'Congé scolaire le mercredi', 'School break on Wednesday'), sch.length ? sch.map((g) => gname(g, l)).join(', ') : T(l, 'nergens', 'nulle part', 'none')],
        ],
      };
    },
  };
}

export const SPECS: Record<string, (l: Lang, arg?: Args) => ToolSpec> = { sv: svSpec, vk: vkSpec, vg: vgSpec, ft: ftSpec, vv: vvSpec, bt: btSpec, wd: wdSpec, os: osSpec, kw: kwSpec };
export const TOOL_KINDS = [...Object.keys(SPECS), 'kalender', 'aftellen'];
export function getTool(kind: string, l: Lang, arg?: Args): ToolSpec {
  const f = SPECS[kind]; if (!f) throw new Error(`simulateur inconnu : ${kind}`);
  return f(l, arg);
}
/** Lance un simulateur avec ses valeurs par défaut (ou celles données) : sert aux pages et aux tests. */
export function runTool(kind: string, l: Lang, arg?: Args, values?: V): ToolOut {
  const spec = getTool(kind, l, arg);
  const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])) as V;
  return spec.run(resolve(spec.inputs, { ...v, ...(values ?? {}) }));
}
export { formatNumber, isoWeek, nthWeekday, GEM_FEEST };
