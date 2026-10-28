/**
 * Brugdagen (ponts) en verlofplanning.
 *
 * Het jaar wordt opgedeeld in afwisselende blokken: vrije blokken (weekend, wettelijke feestdag, op verzoek de
 * vervangingsdag, de feestdag van een Gemeenschap en 24/31 december) en werkblokken (maandag tot vrijdag zonder
 * vrije dag). Wie alle dagen van een werkblok verlof neemt, verbindt de twee vrije blokken links en rechts.
 *
 * - `bruggen`: elk werkblok van hoogstens vier dagen naast een feestdag, met het rendement (vrije dagen op een rij
 *   per verlofdag), op rendement gesorteerd. Een blok van één dag is een echte brugdag.
 * - `optimaliseer`: de beste keuze voor een budget aan verlofdagen. Dynamisch programmeren over de geordende
 *   werkblokken (gekozen / niet gekozen, verbruikte dagen): maximaliseert de vrije dagen in de verlofblokken; bij
 *   gelijkstand wint de oplossing met minder verlofdagen. Exact, geen benadering.
 */
import { feestdagen, fromIso, toIso, isWeekend, dayNum, type Optionen } from './feestdagen';
export type { Optionen };

interface Block { frei: boolean; start: number; len: number; feest: boolean }

const vrijeDagen = (y: number, o: Optionen) => {
  const hol = new Set<number>();
  for (const yy of [y - 1, y, y + 1]) for (const f of feestdagen(yy, o)) hol.add(fromIso(f.date));
  return hol;
};

/** Vrije en werkblokken van begin december van het vorige jaar tot eind januari van het volgende. */
export function blokken(y: number, o: Optionen = {}): Block[] {
  const hol = vrijeDagen(y, o);
  const a = dayNum(y - 1, 12, 1), b = dayNum(y + 1, 1, 31);
  const out: Block[] = [];
  for (let d = a; d <= b; d++) {
    const isHol = hol.has(d), frei = isHol || isWeekend(d);
    // Alleen een vrije dag op een weekdag maakt van een blok een brug; een feestdag op zondag niet.
    const wirkt = isHol && !isWeekend(d);
    const last = out[out.length - 1];
    if (last && last.frei === frei) { last.len++; last.feest ||= wirkt; }
    else out.push({ frei, start: d, len: 1, feest: wirkt });
  }
  return out;
}

export interface Brug {
  /** Verlofdagen: eerste en laatste (ISO). */
  verlofVan: string; verlofTot: string; verlof: number;
  /** Vrij blok op een rij dat ontstaat. */
  vrijVan: string; vrijTot: string; vrij: number;
  /** Vrije dagen (ids) in het blok. */
  feestdagen: string[];
}
const mk = (bl: Block[], i: number, j: number, y: number, o: Optionen): Brug => {
  const pre = bl[i - 1], post = bl[j + 1];
  const von = pre ? pre.start : bl[i].start, bis = post ? post.start + post.len - 1 : bl[j].start + bl[j].len - 1;
  let verlof = 0; for (let k = i; k <= j; k++) if (!bl[k].frei) verlof += bl[k].len;
  const ids = new Set<string>();
  for (const yy of [y - 1, y, y + 1]) for (const f of feestdagen(yy, o)) { const n = fromIso(f.date); if (n >= von && n <= bis) ids.add(f.id); }
  return { verlofVan: toIso(bl[i].start), verlofTot: toIso(bl[j].start + bl[j].len - 1), verlof, vrijVan: toIso(von), vrijTot: toIso(bis), vrij: bis - von + 1, feestdagen: [...ids] };
};
const inJaar = (b: Block, y: number) => b.start >= dayNum(y, 1, 1) && b.start + b.len - 1 <= dayNum(y, 12, 31);

/** Alle bruggen van een jaar: werkblokken tot `max` dagen naast een vrije weekdag, beste eerst. */
export function bruggen(y: number, o: Optionen = {}, max = 4): Brug[] {
  const bl = blokken(y, o), out: Brug[] = [];
  for (let i = 1; i < bl.length - 1; i++) {
    const b = bl[i];
    if (b.frei || b.len > max || !inJaar(b, y)) continue;
    if (!bl[i - 1].feest && !bl[i + 1].feest) continue;
    out.push(mk(bl, i, i, y, o));
  }
  return out.sort((a, b) => b.vrij / b.verlof - a.vrij / a.verlof || b.vrij - a.vrij || a.verlofVan.localeCompare(b.verlofVan));
}

/** Echte brugdagen: één werkdag tussen een vrije dag en het weekend (of twee vrije dagen). */
export const brugdagen = (y: number, o: Optionen = {}) => bruggen(y, o, 1);

export interface Plan { blokken: Brug[]; verlof: number; vrij: number; /** Verlofdagen die geen brug meer verlengen. */ rest: number }
/** Beste verdeling van `budget` verlofdagen in jaar y (alleen dagen in jaar y kosten verlof). */
export function optimaliseer(y: number, budget: number, o: Optionen = {}): Plan {
  const B = Math.max(0, Math.min(60, Math.floor(budget)));
  const bl = blokken(y, o);
  const runs: number[] = []; for (let i = 0; i < bl.length; i++) if (!bl[i].frei) runs.push(i);
  const n = runs.length, NEG = -1e9;
  const ok = (r: number) => { const i = runs[r]; return i > 0 && i < bl.length - 1 && inJaar(bl[i], y) && bl[i].len <= 10; };
  const fr = (i: number) => (bl[i] && bl[i].frei ? bl[i].len : 0);
  // dp[r][s][c]: beste waarde na blok r met c verbruikte dagen. s = 0: blok r niet gekozen;
  // 1: gekozen, de keten raakt al een vrije weekdag; 2: gekozen, nog zonder (mag zo niet eindigen).
  const dp: Float64Array[][] = [], from: Int32Array[][] = [];
  for (let r = 0; r <= n; r++) { dp.push([0, 1, 2].map(() => new Float64Array(B + 1).fill(NEG))); from.push([0, 1, 2].map(() => new Int32Array(B + 1).fill(-1))); }
  dp[0][0][0] = 0;
  const hol = (i: number) => !!(bl[i] && bl[i].frei && bl[i].feest);
  for (let r = 0; r < n; r++) {
    const i = runs[r], cost = bl[i].len;
    for (let c = 0; c <= B; c++) for (let s = 0; s < 3; s++) {
      const v = dp[r][s][c]; if (v <= NEG / 2) continue;
      if (s !== 2 && v > dp[r + 1][0][c]) { dp[r + 1][0][c] = v; from[r + 1][0][c] = s; }
      if (ok(r) && c + cost <= B) {
        const gain = s ? cost + fr(i + 1) : fr(i - 1) + cost + fr(i + 1);
        const has = (s === 1) || (s === 0 && hol(i - 1)) || hol(i + 1);
        const t = has ? 1 : 2, nv = v + 100 * gain - cost;
        if (nv > dp[r + 1][t][c + cost]) { dp[r + 1][t][c + cost] = nv; from[r + 1][t][c + cost] = s; }
      }
    }
  }
  let best = 0, bc = 0, bs = 0;
  for (let c = 0; c <= B; c++) for (let s = 0; s < 2; s++) if (dp[n][s][c] > best) { best = dp[n][s][c]; bc = c; bs = s; }
  const chosen: boolean[] = new Array(n).fill(false);
  for (let r = n, c = bc, s = bs; r > 0; r--) { const p = from[r][s][c]; if (s) { chosen[r - 1] = true; c -= bl[runs[r - 1]].len; } s = p < 0 ? 0 : p; }
  const plan: Brug[] = [];
  for (let r = 0; r < n; r++) {
    if (!chosen[r]) continue;
    let e = r; while (e + 1 < n && chosen[e + 1]) e++;
    plan.push(mk(bl, runs[r], runs[e], y, o)); r = e;
  }
  const verlof = plan.reduce((a, b) => a + b.verlof, 0);
  return { blokken: plan, verlof, vrij: plan.reduce((a, b) => a + b.vrij, 0), rest: B - verlof };
}

/* ------------------------------------------------------------------ Werkdagen, weeknummers */
/** Werkdagen (maandag tot vrijdag zonder vrije dagen) per maand. */
export function werkdagen(y: number, o: Optionen = {}): number[] {
  const hol = new Set(feestdagen(y, o).map((f) => fromIso(f.date)));
  const out: number[] = [];
  for (let m = 1; m <= 12; m++) {
    let c = 0; for (let d = dayNum(y, m, 1); d < dayNum(y, m + 1, 1); d++) if (!isWeekend(d) && !hol.has(d)) c++;
    out.push(c);
  }
  return out;
}
/** Maandagen tot vrijdagen van een jaar, zonder feestdagen af te trekken. */
export const weekdagen = (y: number) => { let c = 0; for (let d = dayNum(y, 1, 1); d <= dayNum(y, 12, 31); d++) if (!isWeekend(d)) c++; return c; };
/** Weeknummer volgens ISO 8601 (NBN EN 28601): week 1 is de week met de eerste donderdag. */
export function isoWeek(iso: string): { year: number; week: number } {
  const n = fromIso(iso), wd = (new Date(n * 86400000).getUTCDay() + 6) % 7;
  const thu = n - wd + 3, ty = new Date(thu * 86400000).getUTCFullYear();
  return { year: ty, week: Math.floor((thu - dayNum(ty, 1, 1)) / 7) + 1 };
}
export const weeksInYear = (y: number) => isoWeek(`${y}-12-28`).week;
