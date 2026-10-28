/** Belgische wettelijke tijd → UTC-tijdstip. Normaaltijd is de Midden-Europese Tijd (UTC+1); zomertijd (UTC+2)
 *  volgens richtlijn 2000/84/EG: van de laatste zondag van maart, 2 uur, tot de laatste zondag van oktober, 3 uur.
 *  Dient de aftellers: middernacht in Brussel, omgerekend naar de klok van de bezoeker. */
import { nthWeekday, fromIso } from './engine/feestdagen';
export function brusselInstant(dateIso: string, time = '00:00'): string {
  const y = Number(dateIso.slice(0, 4)), [hh, mm] = time.split(':').map(Number);
  const local = Date.UTC(y, Number(dateIso.slice(5, 7)) - 1, Number(dateIso.slice(8, 10)), hh, mm);
  const b = fromIso(nthWeekday(y, 3, 0, -1)) * 864e5 + 1 * 3600e3; // 2 uur MET = 1 uur UTC
  const e = fromIso(nthWeekday(y, 10, 0, -1)) * 864e5 + 1 * 3600e3; // 3 uur MEZT = 1 uur UTC
  const guessUtc = local - 3600e3;
  const off = guessUtc > b && local - 7200e3 <= e ? 2 : 1;
  return new Date(local - off * 3600e3).toISOString();
}
