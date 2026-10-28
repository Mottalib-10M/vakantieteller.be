/** Données calculées partagées par les fichiers de contenu (préfixe « _ » : pas une page). Rien n'est tapé à la main. */
import { KIT as K } from '../lib/kit';
import { periode, dLong, dWeek, dShort, wdLong, dDay } from '../lib/tool-specs';
import type { Lang } from '../lib/format';
import type { Gemeenschap } from '../lib/engine/feestdagen';
import type { Kalender, Periode, Vak } from '../lib/engine/school';

export const VG = (y: number) => K.vgJaar(y);
export const FWB = (y: number) => K.kalender('FWB', y)!;
export const DG = (y: number) => K.kalender('DG', y)!;
export const KAL = (g: Gemeenschap, y: number): Kalender => K.kalender(g, y)!;
/** Période en toutes lettres. */
export const P = (p: Periode | null, l: Lang) => (p ? periode(p, l) : '');
/** Une vacance d'une Communauté, en toutes lettres. */
export const V = (g: Gemeenschap, y: number, v: Vak, l: Lang) => P(KAL(g, y)[v], l);
export const D = dLong, W = dWeek, S = dShort, WD = wdLong, DD = dDay;
/** Jours de la vacance (week-ends autour inclus pour la DG). */
export const nDagen = (g: Gemeenschap, y: number, v: Vak) => { const p = KAL(g, y)[v]!; return K.dagen(g === 'DG' ? K.blok(p) : p); };
export const fd = (y: number, id: string) => K.wettelijke(y).find((f) => f.id === id)!.date;
export const T3 = (l: Lang, nl: string, fr: string, en: string) => (l === 'nl' ? nl : l === 'fr' ? fr : en);
export { K };
