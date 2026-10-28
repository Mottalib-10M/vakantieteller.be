/**
 * Schoolvakanties van de drie Gemeenschappen.
 *
 * - Vlaamse Gemeenschap: berekend met de vaste regels van de Vlaamse schoolkalender, getest tegen de lijst die
 *   vlaanderen.be publiceert (schooljaren 2023-2024 tot 2029-2030, tests/engine.test.ts):
 *   herfstvakantie = de week van 1 november (valt 1 november op zondag: de week erna);
 *   kerstvakantie = twee weken vanaf de maandag van de week van 25 december (valt 25 december op zaterdag of
 *   zondag: vanaf de maandag erna); krokusvakantie = één week vanaf de zevende maandag vóór Pasen;
 *   paasvakantie = twee weken vanaf de eerste maandag van april, vanaf de maandag na Pasen als Pasen in maart
 *   valt, vanaf de tweede maandag vóór Pasen als Pasen na 15 april valt (Paasmaandag hoort er altijd bij);
 *   zomervakantie = 1 juli tot 31 augustus. Het schooljaar begint op 1 september (zaterdag of zondag: de maandag
 *   erna) en de laatste schooldag is 30 juni (zaterdag of zondag: de vrijdag ervoor).
 * - Fédération Wallonie-Bruxelles en Duitstalige Gemeenschap: overgenomen uit de gepubliceerde kalenders
 *   (src/data/params-2026.json, met bron en leesdatum). Wat nog niet gepubliceerd is, staat er niet in.
 */
import { paaszondag, dayNum, toIso, fromIso, weekday, isWeekend, plusDagen, type Gemeenschap, type Tri } from './feestdagen';
import P from '../../data/params-2026.json';

export type Vak = 'herfst' | 'kerst' | 'krokus' | 'pasen' | 'zomer';
export const VAKS: Vak[] = ['herfst', 'kerst', 'krokus', 'pasen', 'zomer'];
export const VAK_NAME: Record<Gemeenschap, Record<Vak, Tri>> = {
  VG: {
    herfst: { nl: 'Herfstvakantie', fr: 'Congé d’automne', en: 'Autumn break' },
    kerst: { nl: 'Kerstvakantie', fr: 'Vacances de Noël', en: 'Christmas holidays' },
    krokus: { nl: 'Krokusvakantie', fr: 'Congé de carnaval (krokus)', en: 'Carnival break (krokus)' },
    pasen: { nl: 'Paasvakantie', fr: 'Vacances de Pâques', en: 'Easter holidays' },
    zomer: { nl: 'Zomervakantie', fr: 'Vacances d’été', en: 'Summer holidays' },
  },
  FWB: {
    herfst: { nl: 'Herfstvakantie (Toussaint)', fr: 'Vacances d’automne (Toussaint)', en: 'Autumn break (All Saints)' },
    kerst: { nl: 'Wintervakantie (Kerstmis)', fr: 'Vacances d’hiver (Noël)', en: 'Winter break (Christmas)' },
    krokus: { nl: 'Ontspanningsvakantie (carnaval)', fr: 'Vacances de détente (Carnaval)', en: 'Relaxation break (Carnival)' },
    pasen: { nl: 'Lentevakantie', fr: 'Vacances de printemps', en: 'Spring break' },
    zomer: { nl: 'Zomervakantie', fr: 'Vacances d’été', en: 'Summer holidays' },
  },
  DG: {
    herfst: { nl: 'Allerheiligenvakantie', fr: 'Vacances de Toussaint', en: 'All Saints break' },
    kerst: { nl: 'Kerstvakantie', fr: 'Vacances de Noël', en: 'Christmas holidays' },
    krokus: { nl: 'Carnavalsvakantie', fr: 'Vacances de carnaval', en: 'Carnival break' },
    pasen: { nl: 'Paasvakantie', fr: 'Vacances de Pâques', en: 'Easter holidays' },
    zomer: { nl: 'Zomervakantie', fr: 'Vacances d’été', en: 'Summer holidays' },
  },
};
/** Duitse benaming, zoals de Duitstalige Gemeenschap ze gebruikt. */
export const VAK_DE: Record<Vak, string> = { herfst: 'Allerheiligenferien', kerst: 'Weihnachtsferien', krokus: 'Karnevalsferien', pasen: 'Osterferien', zomer: 'Sommerferien' };

export interface Periode { van: string; tot: string }
/** null = nog niet gepubliceerd. */
export type Kalender = Record<Vak, Periode | null> & { start: string | null; laatste: string | null; vrij: Array<{ date: string; name: Tri }> };

/* ------------------------------------------------------------------ Vlaamse Gemeenschap: regels */
const mondayOfWeek = (n: number) => n - ((weekday(n) + 6) % 7);
export function vgHerfst(y: number): Periode {
  const n = dayNum(y, 11, 1), mo = weekday(n) === 0 ? n + 1 : mondayOfWeek(n);
  return { van: toIso(mo), tot: toIso(mo + 6) };
}
export function vgKerst(y: number): Periode {
  const n = dayNum(y, 12, 25), w = weekday(n), mo = w === 6 ? n + 2 : w === 0 ? n + 1 : mondayOfWeek(n);
  return { van: toIso(mo), tot: toIso(mo + 13) };
}
/** Krokusvakantie in het kalenderjaar y (februari of maart). */
export function vgKrokus(y: number): Periode {
  const mo = fromIso(paaszondag(y)) - 48;
  return { van: toIso(mo), tot: toIso(mo + 6) };
}
export function vgPasen(y: number): Periode {
  const ps = fromIso(paaszondag(y));
  const apr1 = dayNum(y, 4, 1), eersteMa = apr1 + ((8 - weekday(apr1)) % 7);
  const mo = ps < apr1 ? ps + 1 : ps > dayNum(y, 4, 15) ? ps - 13 : eersteMa;
  let tot = mo + 13; if (ps + 1 === tot + 1) tot++;
  return { van: toIso(mo), tot: toIso(tot) };
}
export const vgZomer = (y: number): Periode => ({ van: `${y}-07-01`, tot: `${y}-08-31` });
export function vgStart(y: number): string { const n = dayNum(y, 9, 1), w = weekday(n); return toIso(w === 6 ? n + 2 : w === 0 ? n + 1 : n); }
export function vgLaatste(y: number): string { const n = dayNum(y, 6, 30), w = weekday(n); return toIso(w === 6 ? n - 1 : w === 0 ? n - 2 : n); }

/** Schooljaar y/y+1 in Vlaanderen. */
export function vgJaar(y: number): Kalender {
  const ps = paaszondag(y + 1);
  return {
    herfst: vgHerfst(y), kerst: vgKerst(y), krokus: vgKrokus(y + 1), pasen: vgPasen(y + 1), zomer: vgZomer(y + 1),
    start: vgStart(y), laatste: vgLaatste(y + 1),
    vrij: [
      { date: `${y}-11-11`, name: { nl: 'Wapenstilstand', fr: 'Armistice', en: 'Armistice Day' } },
      { date: `${y + 1}-05-01`, name: { nl: 'Dag van de Arbeid', fr: 'Fête du Travail', en: 'Labour Day' } },
      { date: plusDagen(ps, 39), name: { nl: 'Hemelvaartsdag', fr: 'Ascension', en: 'Ascension Day' } },
      { date: plusDagen(ps, 40), name: { nl: 'Vrijdag na Hemelvaart', fr: 'Vendredi après l’Ascension', en: 'Friday after Ascension' } },
      { date: plusDagen(ps, 50), name: { nl: 'Pinkstermaandag', fr: 'Lundi de Pentecôte', en: 'Whit Monday' } },
    ].sort((a, b) => a.date.localeCompare(b.date)),
  };
}

/* ------------------------------------------------------------------ FWB en DG: gepubliceerde kalenders */
type Raw = { herfst: [string, string]; kerst: [string, string]; krokus: [string, string]; pasen: [string, string]; zomer: [string, string | null]; start: string; laatste: string; vrij: Array<{ date: string; nl: string; fr: string; en: string }> };
const RAW = P.school as unknown as Record<'FWB' | 'DG', Record<string, Raw>>;
const per = (a: [string, string | null] | undefined): Periode | null => (a && a[1] ? { van: a[0], tot: a[1] } : null);

/** Schooljaren per Gemeenschap waarvoor een officiële kalender bestaat (Vlaanderen: tot 2029-2030 gepubliceerd). */
export const JAREN: Record<Gemeenschap, number[]> = {
  VG: [2026, 2027, 2028, 2029],
  FWB: Object.keys(RAW.FWB).map(Number),
  DG: Object.keys(RAW.DG).map(Number),
};
export const heeftJaar = (g: Gemeenschap, y: number) => JAREN[g].includes(y);

/** Kalender van een schooljaar (y = jaar van september), of null als hij nog niet gepubliceerd is. */
export function kalender(g: Gemeenschap, y: number): Kalender | null {
  if (g === 'VG') return y >= 2023 && y <= 2029 ? vgJaar(y) : null;
  const r = RAW[g][String(y)];
  if (!r) return null;
  return {
    herfst: per(r.herfst), kerst: per(r.kerst), krokus: per(r.krokus), pasen: per(r.pasen),
    zomer: r.zomer[1] ? { van: r.zomer[0], tot: r.zomer[1] } : null,
    start: r.start, laatste: r.laatste,
    vrij: r.vrij.map((v) => ({ date: v.date, name: { nl: v.nl, fr: v.fr, en: v.en } })),
  };
}
/** Begin van de zomervakantie, ook als het einde (de volgende schoolstart) nog niet gepubliceerd is. */
export const zomerBegin = (g: Gemeenschap, y: number): string | null => (g === 'VG' ? `${y + 1}-07-01` : RAW[g][String(y)]?.zomer[0] ?? null);

/** Een periode uitgebreid met het weekend ervoor en erna (de Duitstalige Gemeenschap publiceert maandag–vrijdag). */
export function blok(p: Periode): Periode {
  let a = fromIso(p.van), b = fromIso(p.tot);
  while (isWeekend(a - 1)) a--;
  while (isWeekend(b + 1)) b++;
  return { van: toIso(a), tot: toIso(b) };
}
export const dagen = (p: Periode) => fromIso(p.tot) - fromIso(p.van) + 1;
/** Schooldagen (maandag tot vrijdag) in een periode. */
export const weekdagenIn = (p: Periode) => { let c = 0; for (let d = fromIso(p.van); d <= fromIso(p.tot); d++) if (!isWeekend(d)) c++; return c; };

/** Alle vakantiedagen (inclusief weekends in de periode, zonder losse vrije dagen) van een schooljaar. */
export function vakantieSet(g: Gemeenschap, y: number, metVrij = false): Set<number> {
  const k = kalender(g, y), s = new Set<number>();
  if (!k) return s;
  for (const v of VAKS) { const p = k[v]; if (!p) continue; const q = g === 'DG' ? blok(p) : p; for (let d = fromIso(q.van); d <= fromIso(q.tot); d++) s.add(d); }
  if (metVrij) for (const v of k.vrij) s.add(fromIso(v.date));
  return s;
}

export interface Volgende { vak: Vak; y: number; p: Periode; bezig: boolean }
/** De lopende of volgende vakantie vanaf een dag, voor een Gemeenschap. */
export function volgendeVakantie(g: Gemeenschap, iso: string, n = 1): Volgende[] {
  const y0 = Number(iso.slice(0, 4)) - 1, out: Volgende[] = [];
  for (let y = y0; y <= y0 + 3; y++) {
    const k = kalender(g, y); if (!k) continue;
    for (const v of VAKS) {
      const p = k[v] ?? (v === 'zomer' && zomerBegin(g, y) ? { van: zomerBegin(g, y)!, tot: zomerBegin(g, y)! } : null);
      if (!p) continue;
      const q = g === 'DG' ? blok(p) : p;
      if (q.tot >= iso) out.push({ vak: v, y, p: q, bezig: q.van <= iso });
    }
  }
  return out.sort((a, b) => a.p.van.localeCompare(b.p.van)).slice(0, n);
}
