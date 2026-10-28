import type { Locale } from './routes';
const nl = {
  updatedOn: 'Bijgewerkt op', editorialPolicy: 'Redactiebeleid', contactLabel: 'Contact', reviewedBy: 'Opgesteld door',
  skipToContent: 'Naar de inhoud', mainNav: 'Hoofdnavigatie', breadcrumbLabel: 'Kruimelpad', breadcrumbHome: 'Start', menuOpen: 'Menu openen',
  faqTitle: 'Veelgestelde vragen', relatedCalculators: 'Verder met', sourcesTitle: 'Officiële bronnen van deze pagina', writtenBy: 'Opgesteld door',
  asOf: 'Stand', lastUpdated: 'Schoolkalenders en feestdagenwet nagekeken op', footerValidated: 'Bronnen: schoolkalenders van de Vlaamse Gemeenschap, de Fédération Wallonie-Bruxelles en de Duitstalige Gemeenschap, wet van 4 januari 1974 betreffende de feestdagen, FOD Werkgelegenheid',
  footerBrowser: 'Alles rekent in uw browser · niets wat u invult wordt verzonden of bewaard · geen account',
  footerDisclaimer: 'Onafhankelijke site van Radif Partners, niet verbonden aan de Vlaamse overheid, de Fédération Wallonie-Bruxelles, de Duitstalige Gemeenschap, de FOD Werkgelegenheid of een school. Pedagogische studiedagen en lokale vrije dagen bepaalt elke school; voor uw werk gelden ook cao en arbeidsreglement. Deze site vervangt geen bericht van uw school of werkgever.',
  footerPopular: 'Rekenaars',
  notFound: 'Op dit adres staat geen pagina. Op de startpagina vindt u de schoolvakanties van de drie Gemeenschappen, de feestdagen en de brugdagen.',
  readMore: 'Lees verder',
  moreOptions: 'Meer opties', copyLink: 'Link kopiëren', copied: 'Link gekopieerd', print: 'Afdrukken', howComputed: 'Zo wordt gerekend', openFull: 'Naar de volledige rekenaar',
  countdownTo: 'Nog tot', days: 'dagen', hours: 'uur', minutes: 'min', seconds: 'sec', tzNote: 'Rekent met de klok van uw toestel, tijdzone', passed: 'Deze datum ligt achter ons.',
};
const fr: typeof nl = {
  updatedOn: 'Mis à jour le', editorialPolicy: 'Charte éditoriale', contactLabel: 'Contact', reviewedBy: 'Préparé par',
  skipToContent: 'Aller au contenu', mainNav: 'Navigation principale', breadcrumbLabel: 'Fil d’Ariane', breadcrumbHome: 'Accueil', menuOpen: 'Ouvrir le menu',
  faqTitle: 'Questions fréquentes', relatedCalculators: 'Pour continuer', sourcesTitle: 'Sources officielles de cette page', writtenBy: 'Préparé par',
  asOf: 'Situation', lastUpdated: 'calendriers scolaires et loi sur les jours fériés vérifiés le', footerValidated: 'Sources : calendriers scolaires de la Communauté flamande, de la Fédération Wallonie-Bruxelles et de la Communauté germanophone, loi du 4 janvier 1974 relative aux jours fériés, SPF Emploi',
  footerBrowser: 'Tout se calcule dans votre navigateur · rien de ce que vous saisissez n’est envoyé ni conservé · aucun compte',
  footerDisclaimer: 'Site indépendant publié par Radif Partners, sans lien avec la Fédération Wallonie-Bruxelles, la Communauté flamande, la Communauté germanophone, le SPF Emploi ou une école. Les journées pédagogiques sont fixées par chaque école ; au travail, la convention collective et le règlement de travail s’appliquent aussi. Ce site ne remplace pas les communications de votre école ou de votre employeur.',
  footerPopular: 'Outils',
  notFound: 'Aucune page à cette adresse. L’accueil donne les vacances scolaires des trois Communautés, les jours fériés et les ponts.',
  readMore: 'Lire la suite',
  moreOptions: 'Plus d’options', copyLink: 'Copier le lien', copied: 'Lien copié', print: 'Imprimer', howComputed: 'Comment on calcule', openFull: 'Ouvrir l’outil complet',
  countdownTo: 'Encore avant', days: 'jours', hours: 'h', minutes: 'min', seconds: 's', tzNote: 'Calculé avec l’horloge de votre appareil, fuseau', passed: 'Cette date est passée.',
};
const en: typeof nl = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Keep going', sourcesTitle: 'Official sources for this page', writtenBy: 'Prepared by',
  asOf: 'As of', lastUpdated: 'school calendars and public holidays act checked on', footerValidated: 'Sources: school calendars of the Flemish Community, the Wallonia-Brussels Federation and the German-speaking Community, Act of 4 January 1974 on public holidays, Federal Public Service Employment',
  footerBrowser: 'Everything runs in your browser · nothing you type is sent or stored · no account',
  footerDisclaimer: 'Independent site published by Radif Partners, not affiliated with the Flemish government, the Wallonia-Brussels Federation, the German-speaking Community, the Federal Public Service Employment or any school. Each school sets its own training days; at work, your collective agreement and work rules also apply. This site does not replace notices from your school or employer.',
  footerPopular: 'Tools',
  notFound: 'Nothing lives at this address. The home page has the school holidays of all three Communities, public holidays and bridge days.',
  readMore: 'Read more',
  moreOptions: 'More options', copyLink: 'Copy share link', copied: 'Link copied', print: 'Print', howComputed: 'How this is calculated', openFull: 'Open the full tool',
  countdownTo: 'Time left until', days: 'days', hours: 'hrs', minutes: 'min', seconds: 'sec', tzNote: 'Uses your device clock, time zone', passed: 'This date has passed.',
};
const ALL = { nl, fr, en };
export function t(lang: Locale) { return ALL[lang] ?? nl; }
