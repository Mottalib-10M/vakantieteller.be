import { makeRouter, type RouteDef } from './routes-core';
import { GUIDES } from '../lib/pages';
/** Néerlandais de Belgique d'abord, puis français de Belgique, anglais sur toutes les pages (RECETTE : langues locales + anglais). */
export const LOCALES = ['nl', 'fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'nl';
const R = (id: string, nl: string, fr: string, en: string, noindex = false) => ({ id, paths: { nl: `/nl/${nl}/`, fr: `/fr/${fr}/`, en: `/en/${en}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { nl: '/nl/', fr: '/fr/', en: '/en/' } },
  R('method', 'methode', 'methode', 'method'),
  R('about', 'over-ons', 'a-propos', 'about'),
  R('widget', 'widget', 'widget', 'widget', true),
  R('contact', 'contact', 'contact', 'contact', true),
  R('editorial', 'redactiebeleid', 'charte-editoriale', 'editorial-policy', true),
  R('privacy', 'privacy', 'confidentialite', 'privacy', true),
  R('terms', 'disclaimer', 'mentions-legales', 'legal-notice', true),
  R('cookies', 'cookies', 'cookies', 'cookies', true),
];
const G = (g: (typeof GUIDES)[number]): RouteDef<Locale> => ({ id: g.id, paths: { nl: `/nl/${g.nl.slug}/`, fr: `/fr/${g.fr.slug}/`, en: `/en/${g.en.slug}/` } });
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...GUIDES.map(G), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
