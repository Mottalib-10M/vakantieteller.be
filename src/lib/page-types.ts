/**
 * Une page = UN fichier de contenu : `src/content/guides/<id>.ts`, avec les versions néerlandaise (`nl`), française
 * (`fr`) et anglaise (`en`) côte à côte. Routes, menus, sitemap, hreflang, schémas et liens internes lisent ces
 * fichiers et rien d'autre.
 */
import type { Kit } from './kit';
import type { Lang } from './format';

export interface FAQ { q: string; a: string }
export interface MiniOpts { /** titre */ t?: string; /** champs montrés */ p?: string[]; /** valeurs par défaut */ d?: Record<string, number | string>; /** texte du lien */ c?: string }

export interface Helpers extends Kit {
  lang: Lang;
  /** Lien interne par id de page, dans la langue de la page. Id inconnu = test en échec. */
  a: (id: string, text: string) => string;
  /** Tableau ; les nombres sont formatés dans la langue, les chaînes insérées en HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Lien vers une source de params-2026.json (clé). */
  src: (key: string, text?: string) => string;
  ext: (url: string, text: string) => string;
  box: (title: string, html: string) => string;
  /** Mini-simulateur bâti sur un calculateur de tool-specs.ts. */
  mini: (kind: string, opts?: MiniOpts) => string;
  n: (x: number, d?: number) => string;
  /** Date longue « 8 februari 2027 ». */
  day: (iso: string) => string;
  /** Date avec le jour : « maandag 8 februari 2027 ». */
  wday: (iso: string) => string;
  /** Jour de la semaine seul. */
  wd: (iso: string) => string;
  /** Période « 2 – 8 november 2026 ». */
  per: (p: { van: string; tot: string }) => string;
  /** Choisit le texte de la langue. */
  t: (nl: string, fr: string, en: string) => string;
}

export type Group = 'school' | 'feestdagen' | 'werk';

export interface LangPage {
  /** Segment d'URL, minuscules et tirets, sans accent. */
  slug: string;
  nav: string; card: string;
  /** 50 à 60 caractères, terme clé d'abord, année comprise (RECETTE §11). */
  title: string;
  /** 150 à 160 caractères, année comprise. */
  description: string;
  h1: string; intro: string;
  /** UN paragraphe de 120 mots ou plus : la réponse directe, chiffrée (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
}
export interface GuideDef {
  id: string; group: Group; order: number;
  /** Outil en tête : une clé de tool-specs.ts, ou un outil propre (kalender, aftellen). */
  tool: string;
  toolArg?: Record<string, number | string>;
  related: string[];
  /** Clés de params-2026.json > sources. */
  sources: string[];
  /** Compte à rebours en direct au-dessus de l'outil : date (ISO), heure de Bruxelles facultative, libellé. */
  countdown?: { date: string; time?: string; label: { nl: string; fr: string; en: string } };
  nl: LangPage; fr: LangPage; en: LangPage;
}
export const defineGuide = (p: GuideDef): GuideDef => p;
