/**
 * Wettelijke feestdagen in België, berekend en niet overgetypt.
 *
 * - De tien feestdagen staan in artikel 1 van het koninklijk besluit van 18 april 1974, genomen ter uitvoering van
 *   de wet van 4 januari 1974 betreffende de feestdagen: Nieuwjaar, Paasmaandag, 1 mei, Hemelvaartsdag,
 *   Pinkstermaandag, 21 juli, 15 augustus, 1 november, 11 november en 25 december. Ze gelden in heel het land.
 * - Pasen: formule van Gauss (versie van de PTB, Lichtenberg); Paasmaandag +1, Hemelvaart +39, Pinkstermaandag +50.
 * - Valt een feestdag op een zondag of op een gewone inactiviteitsdag van de onderneming (in een vijfdagenweek de
 *   zaterdag), dan moet hij worden vervangen door een gewone activiteitsdag (art. 6 van de wet). Zonder akkoord
 *   (paritair comité, ondernemingsraad, vakbondsafvaardiging, werknemers) is dat de eerste gewone activiteitsdag
 *   die op de feestdag volgt. Die terugvalregel rekent `vervangingsdagen`.
 * - De feestdagen van de Gemeenschappen (11 juli, 27 september, 15 november) zijn geen wettelijke feestdagen voor
 *   de privésector; ze worden apart bijgehouden.
 */

export type Lang = 'nl' | 'fr' | 'en';
export type Tri = { nl: string; fr: string; en: string };

/* ------------------------------------------------------------------ Dagen als gehele getallen (UTC) */
const MS = 86400000;
export const dayNum = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d) / MS;
export const fromIso = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return dayNum(y, m, d); };
export const toIso = (n: number) => new Date(n * MS).toISOString().slice(0, 10);
/** 0 = zondag … 6 = zaterdag */
export const weekday = (n: number) => new Date(n * MS).getUTCDay();
export const isWeekend = (n: number) => { const w = weekday(n); return w === 0 || w === 6; };
export const plusDagen = (iso: string, d: number) => toIso(fromIso(iso) + d);

/* ------------------------------------------------------------------ Pasen */
/** Paaszondag volgens de formule van Gauss, versie van de PTB (Lichtenberg). Resultaat als ISO-datum. */
export function paaszondag(x: number): string {
  const K = Math.floor(x / 100);
  const M = 15 + Math.floor((3 * K + 3) / 4) - Math.floor((8 * K + 13) / 25);
  const S = 2 - Math.floor((3 * K + 3) / 4);
  const A = x % 19;
  const D = (19 * A + M) % 30;
  const R = Math.floor((D + Math.floor(A / 11)) / 29);
  const OG = 21 + D - R;
  const SZ = 7 - ((x + Math.floor(x / 4) + S) % 7);
  const OE = 7 - (((OG - SZ) % 7) + 7) % 7;
  return toIso(dayNum(x, 3, 1) + OG + OE - 1);
}
/** Tweede, onafhankelijke berekening (Meeus/Jones/Butcher), alleen voor de tests. */
export function paaszondagMeeus(y: number): string {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return toIso(dayNum(y, month, day));
}
/** n-de weekdag van een maand (n = −1: laatste). wd 0 = zondag. */
export function nthWeekday(y: number, m: number, wd: number, n: number): string {
  if (n > 0) { const first = dayNum(y, m, 1); return toIso(first + ((wd - weekday(first) + 7) % 7) + 7 * (n - 1)); }
  const last = dayNum(y, m + 1, 1) - 1; return toIso(last - ((weekday(last) - wd + 7) % 7));
}

/* ------------------------------------------------------------------ De tien wettelijke feestdagen */
export interface FeestdagDef { id: string; name: Tri; date: (y: number) => string }
const vast = (m: number, d: number) => (y: number) => toIso(dayNum(y, m, d));
const pasen = (off: number) => (y: number) => plusDagen(paaszondag(y), off);
const N = (nl: string, fr: string, en: string): Tri => ({ nl, fr, en });

export const FEESTDAGEN: FeestdagDef[] = [
  { id: 'nieuwjaar', name: N('Nieuwjaar', 'Jour de l’An', "New Year's Day"), date: vast(1, 1) },
  { id: 'paasmaandag', name: N('Paasmaandag', 'Lundi de Pâques', 'Easter Monday'), date: pasen(1) },
  { id: 'dag-van-de-arbeid', name: N('Dag van de Arbeid', 'Fête du Travail', 'Labour Day'), date: vast(5, 1) },
  { id: 'hemelvaart', name: N('Onze-Lieve-Heer-Hemelvaart', 'Ascension', 'Ascension Day'), date: pasen(39) },
  { id: 'pinkstermaandag', name: N('Pinkstermaandag', 'Lundi de Pentecôte', 'Whit Monday'), date: pasen(50) },
  { id: 'nationale-feestdag', name: N('Nationale feestdag', 'Fête nationale', 'National Day'), date: vast(7, 21) },
  { id: 'olv-hemelvaart', name: N('Onze-Lieve-Vrouw-Hemelvaart', 'Assomption', 'Assumption Day'), date: vast(8, 15) },
  { id: 'allerheiligen', name: N('Allerheiligen', 'Toussaint', "All Saints' Day"), date: vast(11, 1) },
  { id: 'wapenstilstand', name: N('Wapenstilstand', 'Armistice', 'Armistice Day'), date: vast(11, 11) },
  { id: 'kerstmis', name: N('Kerstmis', 'Noël', 'Christmas Day'), date: vast(12, 25) },
];

/** Feestdagen van de Gemeenschappen: geen wettelijke feestdag voor de privésector. */
export type Gemeenschap = 'VG' | 'FWB' | 'DG';
export const GEMEENSCHAPPEN: Gemeenschap[] = ['VG', 'FWB', 'DG'];
export const GEM_NAME: Record<Gemeenschap, Tri> = {
  VG: N('Vlaamse Gemeenschap', 'Communauté flamande', 'Flemish Community'),
  FWB: N('Fédération Wallonie-Bruxelles', 'Fédération Wallonie-Bruxelles', 'Wallonia-Brussels Federation'),
  DG: N('Duitstalige Gemeenschap', 'Communauté germanophone', 'German-speaking Community'),
};
/** Kort: in tabellen en keuzelijsten. */
export const GEM_KORT: Record<Gemeenschap, Tri> = {
  VG: N('Vlaanderen', 'Flandre', 'Flanders'),
  FWB: N('Wallonië-Brussel (Franstalig)', 'Wallonie-Bruxelles', 'Wallonia-Brussels (French-speaking)'),
  DG: N('Ostbelgien (Duitstalig)', 'Ostbelgien (germanophone)', 'Ostbelgien (German-speaking)'),
};
export const GEM_FEEST: Record<Gemeenschap, { m: number; d: number; name: Tri }> = {
  VG: { m: 7, d: 11, name: N('Feest van de Vlaamse Gemeenschap', 'Fête de la Communauté flamande', 'Flemish Community Day') },
  FWB: { m: 9, d: 27, name: N('Feest van de Fédération Wallonie-Bruxelles', 'Fête de la Fédération Wallonie-Bruxelles', 'Wallonia-Brussels Federation Day') },
  DG: { m: 11, d: 15, name: N('Feest van de Duitstalige Gemeenschap', 'Fête de la Communauté germanophone', 'German-speaking Community Day') },
};

export interface Feestdag { id: string; date: string; name: Tri; wettelijk: boolean; vervanging?: boolean; voor?: string }

/** Regime: in een vijfdagenweek (ma–vr) is de zaterdag een gewone inactiviteitsdag; in een zesdagenweek alleen de zondag. */
export type Regime = 5 | 6;
export interface Optionen {
  /** 'volgende': vervangingsdag = eerste gewone activiteitsdag na de feestdag (terugvalregel); 'geen': niet meetellen. */
  vervanging?: 'volgende' | 'geen';
  regime?: Regime;
  /** Feestdag van een Gemeenschap meetellen (overheidsdiensten van die Gemeenschap, sommige sectoren). */
  gem?: Gemeenschap | '';
  /** 24 en 31 december als vrije dag (cao, bedrijfsakkoord). */
  oudejaar?: boolean;
}

/** De tien wettelijke feestdagen van een jaar, op datum. */
export const wettelijke = (y: number): Feestdag[] =>
  FEESTDAGEN.map((f) => ({ id: f.id, date: f.date(y), name: f.name, wettelijk: true })).sort((a, b) => a.date.localeCompare(b.date));

const inactief = (n: number, regime: Regime) => (regime === 5 ? isWeekend(n) : weekday(n) === 0);

/**
 * Vervangingsdagen volgens de terugvalregel: voor elke feestdag op een zondag of (vijfdagenweek) zaterdag, de eerste
 * gewone activiteitsdag erna die zelf geen feestdag en nog geen vervangingsdag is. Blijft binnen het kalenderjaar:
 * valt de eerste vrije activiteitsdag in januari van het volgende jaar, dan nemen we de laatste vóór de feestdag.
 */
export function vervangingsdagen(y: number, regime: Regime = 5): Feestdag[] {
  const fd = wettelijke(y);
  const bezet = new Set(fd.map((f) => fromIso(f.date)));
  const out: Feestdag[] = [];
  for (const f of fd) {
    const n = fromIso(f.date);
    if (!inactief(n, regime)) continue;
    let d = n + 1;
    while (inactief(d, regime) || bezet.has(d)) d++;
    if (d > dayNum(y, 12, 31)) { d = n - 1; while (inactief(d, regime) || bezet.has(d)) d--; }
    bezet.add(d);
    out.push({ id: `vervanging-${f.id}`, date: toIso(d), wettelijk: true, vervanging: true, voor: f.id,
      name: N(`Vervangingsdag ${f.name.nl}`, `Jour de remplacement (${f.name.fr})`, `Replacement day (${f.name.en})`) });
  }
  return out;
}

/** Alle vrije dagen van een jaar volgens de opties: feestdagen, vervangingsdagen, gemeenschapsfeestdag, 24/31 december. */
export function feestdagen(y: number, o: Optionen = {}): Feestdag[] {
  const out = wettelijke(y);
  if (o.vervanging === 'volgende') out.push(...vervangingsdagen(y, o.regime ?? 5));
  if (o.gem) { const g = GEM_FEEST[o.gem]; out.push({ id: `gem-${o.gem}`, date: toIso(dayNum(y, g.m, g.d)), name: g.name, wettelijk: false }); }
  if (o.oudejaar) for (const [m, d, nl, fr, en] of [[12, 24, 'Kerstavond', 'Réveillon de Noël', 'Christmas Eve'], [12, 31, 'Oudejaarsdag', 'Saint-Sylvestre', "New Year's Eve"]] as const)
    out.push({ id: `dec-${d}`, date: toIso(dayNum(y, m, d)), name: N(nl, fr, en), wettelijk: false });
  return out.sort((a, b) => a.date.localeCompare(b.date));
}
/** Feestdagen op een weekdag (maandag tot vrijdag). */
export const opWeekdag = (list: Feestdag[]) => list.filter((f) => !isWeekend(fromIso(f.date)));
/** De volgende n wettelijke feestdagen vanaf een dag (inbegrepen), over de jaarwisseling heen. */
export function volgende(iso: string, n = 5, o: Optionen = {}): Feestdag[] {
  const y = Number(iso.slice(0, 4));
  return [...feestdagen(y, o), ...feestdagen(y + 1, o)].filter((f) => f.date >= iso).slice(0, n);
}
/** Uiterste datum om de vervangingsdagen van jaar y aan te plakken: vóór 15 december van het jaar ervoor. */
export const aanplakDatum = (y: number) => `${y - 1}-12-15`;
