/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://vakantieteller.be";
export const SITE_NAMES: Record<string, string> = {"nl": "Vakantieteller", "fr": "Vakantieteller", "en": "Vakantieteller"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "teller";
export const LANG_TAGS: Record<string, string> = {"nl": "nl-BE", "fr": "fr-BE", "en": "en-BE"};
export const OG_LOCALES: Record<string, string> = {"nl": "nl_BE", "fr": "fr_BE", "en": "en_GB"};
export const LOCALE_TAG = 'nl-BE';
/** Formats de nombres et de dates par langue de page. */
export const NUM_TAGS: Record<string, string> = {"nl": "nl-BE", "fr": "fr-BE", "en": "en-GB", "nl-BE": "nl-BE", "fr-BE": "fr-BE", "en-BE": "en-GB"};
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-28';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"nl": "Uitgever van een onafhankelijke kalender van schoolvakanties, feestdagen en brugdagen in België, berekend uit de officiële regels van de drie Gemeenschappen en de feestdagenwet", "fr": "Éditeur d'un calendrier indépendant des vacances scolaires, jours fériés et ponts en Belgique, calculé à partir des règles officielles des trois Communautés et de la loi sur les jours fériés", "en": "Publisher of an independent calendar of Belgian school holidays, public holidays and bridge days, computed from the official rules of the three Communities and the public holidays act"};
export const AUTHOR_DESC: Record<string, string> = {"nl": "Radif Partners leest de schoolkalenders van de Vlaamse Gemeenschap, de Fédération Wallonie-Bruxelles en de Duitstalige Gemeenschap, de wet van 4 januari 1974 betreffende de feestdagen en de richtlijnen van de FOD Werkgelegenheid, berekent Pasen met de formule van Gauss en legt daaruit vakanties, feestdagen, vervangingsdagen en brugdagen voor 2026 tot 2029 vast. Alles rekent in uw browser. Wij verkopen geen reizen, geen verblijven en geen kalenders.", "fr": "Radif Partners lit les calendriers scolaires de la Communauté flamande, de la Fédération Wallonie-Bruxelles et de la Communauté germanophone, la loi du 4 janvier 1974 relative aux jours fériés et les indications du SPF Emploi, calcule Pâques avec la formule de Gauss et en tire vacances, jours fériés, jours de remplacement et ponts pour 2026 à 2029. Tout se calcule dans votre navigateur. Nous ne vendons ni voyages, ni séjours, ni calendriers.", "en": "Radif Partners reads the school calendars of the Flemish Community, the Wallonia-Brussels Federation and the German-speaking Community, the Act of 4 January 1974 on public holidays and the guidance of the Federal Public Service Employment, computes Easter with Gauss's formula and derives holidays, public holidays, replacement days and bridge days for 2026 to 2029. Everything runs in your browser. We sell no trips, no stays and no calendars."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"nl": ["Schoolvakanties in de Vlaamse Gemeenschap", "Schoolkalender van de Fédération Wallonie-Bruxelles", "Wettelijke feestdagen in België", "Vervangingsdagen en brugdagen", "Werkdagen en weeknummers"], "fr": ["Vacances scolaires en Communauté flamande", "Calendrier scolaire de la Fédération Wallonie-Bruxelles", "Jours fériés légaux en Belgique", "Jours de remplacement et ponts", "Jours ouvrables et numéros de semaine"], "en": ["School holidays in the Flemish Community", "School calendar of the Wallonia-Brussels Federation", "Statutory public holidays in Belgium", "Replacement days and bridge days", "Working days and week numbers"]};
export const CONTACT_EMAIL = "contact@vakantieteller.be";
export const THEME_COLOR = '#C8102E';
export const LOGO_SYMBOL = 'SV';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = 'G-1BMGPWFTCT';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'z4zqh0fluu';
export const INDEXNOW_KEY = '8b88fc013c2606b9e1557dbd64aa2d72';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "TVA / BTW",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
