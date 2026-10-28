import { route, hasRoute, type Locale } from './routes';
import { GUIDES, guideById } from '../lib/pages';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  nl: { home: 'Schoolvakanties 2026-2027', method: 'Methode', about: 'Over ons', widget: 'Widget insluiten', contact: 'Contact', editorial: 'Redactiebeleid', privacy: 'Privacy', terms: 'Disclaimer', cookies: 'Cookies' },
  fr: { home: 'Vacances scolaires 2026-2027', method: 'Méthode', about: 'À propos', widget: 'Intégrer le widget', contact: 'Contact', editorial: 'Charte éditoriale', privacy: 'Confidentialité', terms: 'Mentions légales', cookies: 'Cookies' },
  en: { home: 'School holidays 2026-2027', method: 'Method', about: 'About', widget: 'Embed the widget', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
};
/** `short` : intitulé du menu du haut (un ou deux mots, RECETTE §10.3) ; `label` : intitulé complet. */
export const GROUPS: Array<{ id: Group; label: Record<Locale, string>; short: Record<Locale, string> }> = [
  { id: 'school', label: { nl: 'Schoolvakanties per vakantie en per jaar', fr: 'Vacances scolaires par congé et par année', en: 'School holidays by break and by year' }, short: { nl: 'Schoolvakanties', fr: 'Vacances', en: 'School holidays' } },
  { id: 'feestdagen', label: { nl: 'Feestdagen en vervangingsdagen', fr: 'Jours fériés et remplacements', en: 'Public holidays and replacement days' }, short: { nl: 'Feestdagen', fr: 'Jours fériés', en: 'Holidays' } },
  { id: 'werk', label: { nl: 'Brugdagen, werkdagen en kalender', fr: 'Ponts, jours ouvrables et calendrier', en: 'Bridge days, working days and calendar' }, short: { nl: 'Brugdagen', fr: 'Ponts', en: 'Bridge days' } },
];
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? guideById(id)?.[lang]?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale, short = true): NavCategory[] {
  return GROUPS.map((g) => ({ label: (short ? g.short : g.label)[lang], links: g.id === 'school' ? [link('home', lang), ...inGroup(g.id, lang)] : inGroup(g.id, lang) })).filter((c) => c.links.length);
}
/** La Méthode n'est pas dans le menu du haut (RECETTE §10.3) : sous le titre et en bas de page. */
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => {
  const site = { label: { nl: 'Deze site', fr: 'Ce site', en: 'This site' }[lang], links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) };
  return [
    { label: GROUPS[0].label[lang], links: inGroup('school', lang) },
    { label: GROUPS[1].label[lang], links: inGroup('feestdagen', lang) },
    { label: GROUPS[2].label[lang], links: inGroup('werk', lang) },
    site,
  ];
};
/** Les outils, à un clic de toute page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => [link('home', lang), ...['vergelijker', 'brugdagen-2027', 'feestdagen-2027'].filter((id) => hasRoute(id, lang)).map((id) => link(id, lang))];
