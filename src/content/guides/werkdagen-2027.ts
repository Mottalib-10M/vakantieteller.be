/** Werkdagen 2027 : per maand, met en zonder vervangingsdagen, gemeenschapsfeestdagen, deeltijds. Data : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, W } from '../_data';
import { MAANDEN } from '../../lib/tool-specs';
import type { Lang } from '../../lib/format';

const Y = 2027;
const O = { vervanging: 'volgende' as const };
const m0 = K.werkdagen(Y), mV = K.werkdagen(Y, O);
const s0 = m0.reduce((a, b) => a + b, 0), sV = mV.reduce((a, b) => a + b, 0);
const wkd = K.weekdagen(Y);
const fWk = K.opWeekdag(K.wettelijke(Y)).length;
const gemD = K.GEMEENSCHAPPEN.map((g) => ({ g, date: K.toIso(K.dayNum(Y, K.GEM_FEEST[g].m, K.GEM_FEEST[g].d)), n: K.werkdagen(Y, { gem: g }).reduce((a, b) => a + b, 0) }));
const od = K.werkdagen(Y, { oudejaar: true }).reduce((a, b) => a + b, 0);
const s26 = K.werkdagen(Y - 1).reduce((a, b) => a + b, 0), s28 = K.werkdagen(Y + 1).reduce((a, b) => a + b, 0);
const maxI = mV.indexOf(Math.max(...mV)), minI = mV.indexOf(Math.min(...mV));
const topM = (l: Lang) => MAANDEN(l).filter((_, i) => mV[i] === mV[maxI]).join(', ').replace(/, ([^,]*)$/, l === 'nl' ? ' en $1' : l === 'fr' ? ' et $1' : ' and $1');
const rij = (l: Lang) => MAANDEN(l).map((m, i) => [m, m0[i], mV[i]]);
const vier = Math.round((sV * 4) / 5), drie = Math.round((sV * 3) / 5);

export default defineGuide({
  id: 'werkdagen-2027', group: 'werk', order: 17, tool: 'wd', toolArg: { jaar: Y },
  related: ['feestdagen-2027', 'vervangingsdagen-2027', 'kalender-2027', 'brugdagen-2027'],
  sources: ['wet-1974', 'fod-feestdagen'],
  nl: {
    slug: 'werkdagen-2027', nav: 'Werkdagen 2027', card: `${s0} werkdagen, ${sV} na vervangingsdagen`,
    title: `Werkdagen 2027 België: ${s0} dagen, per maand berekend`,
    description: `Werkdagen 2027 in België: ${s0} dagen van maandag tot vrijdag zonder feestdagen, ${sV} met de vervangingsdagen. Per maand, met gemeenschapsfeestdag en deeltijds.`,
    h1: 'Werkdagen 2027 in België',
    intro: 'Hoeveel werkdagen 2027 telt, per maand, met of zonder vervangingsdagen en voor een vier- of driedagenweek. Ook een gemeenschapsfeestdag of 24 en 31 december kunt u vrij zetten.',
    resume: `${Y} telt ${wkd} dagen van maandag tot vrijdag. ${fWk} van de tien wettelijke feestdagen vallen op zo'n dag, dus blijven er ${s0} werkdagen over. Drie feestdagen vallen in het weekend: de Dag van de Arbeid, Onze-Lieve-Vrouw-Hemelvaart en Kerstmis. Wie daarvoor een vervangingsdag krijgt, zoals in een vijfdagenweek, werkt nog drie dagen minder: ${sV} werkdagen. De meeste werkdagen, ${mV[maxI]}, hebben ${topM('nl')}; de rustigste maand is ${MAANDEN('nl')[minI]} met ${mV[minI]}. Ter vergelijking: ${Y - 1} had ${s26} werkdagen zonder vervangingsdagen en ${Y + 1} krijgt er ${s28}. Bij een vierdagenweek komt u op ongeveer ${vier} dagen, bij drie dagen per week op ongeveer ${drie}, als u de vervangingsdagen meetelt. De feestdag van een Gemeenschap is geen wettelijke feestdag voor de privésector en zit niet in deze telling, tenzij u hem in de rekenaar vrij zet.`,
    faqs: [
      { q: 'Hoeveel werkdagen telt 2027 in België?', a: `${s0} werkdagen van maandag tot vrijdag na aftrek van de ${fWk} feestdagen op een weekdag. Krijgt u vervangingsdagen voor de feestdagen in het weekend, dan blijven er ${sV} over. Het aantal is in heel België gelijk, want de tien wettelijke feestdagen gelden in alle gewesten.` },
      { q: 'Tellen 11 juli, 27 september en 15 november mee?', a: `Niet als wettelijke feestdag. Ze zijn vrij bij de overheid van de betrokken Gemeenschap en soms in een sector. Zet u er een vrij in de rekenaar, dan daalt het jaartotaal naar ${gemD.map((x) => `${x.n} (${K.GEM_FEEST[x.g].name.nl})`).join(', ')}; 11 juli valt in ${Y} op een zondag en kost dus geen werkdag.` },
      { q: 'Wat als kerstavond en oudejaarsavond vrij zijn?', a: `Dan telt ${Y} ${od} werkdagen zonder vervangingsdagen. Wettelijk zijn 24 en 31 december gewone werkdagen, maar veel ondernemingen geven ze geheel of half vrij via een akkoord of een cao. Vul ze in de rekenaar in onder de extra opties. Beide vallen in 2027 op een vrijdag.` },
    ],
    body: (h) => `<h2>Werkdagen per maand in 2027</h2>
${h.table(['Maand', 'Zonder vervangingsdagen', 'Met vervangingsdagen'], rij('nl'), `Werkdagen ${Y}, maandag tot vrijdag`, ['l', 'r', 'r'])}
<p>De vervangingsdagen vallen zonder ander akkoord in mei, augustus en december, zoals de ${h.src('fod-feestdagen', 'FOD Werkgelegenheid')} de terugvalregel beschrijft. In de kolom "met" zijn die maanden telkens één dag korter. De wettelijke basis is de ${h.src('wet-1974', 'wet van 4 januari 1974')}; de keuze van de dagen leest u op ${h.a('vervangingsdagen-2027', 'vervangingsdagen 2027')}.</p>
<h2>Waarvoor u het aantal werkdagen nodig hebt</h2>
<p>Wie een dagtarief uit een jaarbedrag afleidt, deelt door de werkdagen min het verlof. Bij twintig wettelijke vakantiedagen in een vijfdagenweek blijven er van de ${sV} werkdagen ${sV - 20} over. Ook voor een planning, een opzegtermijn in werkdagen of een berekening van thuiswerkdagen is het jaartotaal het vertrekpunt. Een feestdag op een gewone werkdag wordt betaald zoals een gewerkte dag, dus voor een maandloon verandert er niets.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y }, c: 'Alle feestdagen van 2027 met hun weekdag' })}
<h2>Werkdagen en verlof samen bekijken</h2>
<p>Wie verlof rond de feestdagen legt, haalt er het meest uit; de ${h.a('brugdagen-2027', 'brugdagen 2027')} tonen hoe. De jaarkalender met weeknummers staat op ${h.a('kalender-2027', 'kalender 2027')}. Een eerste werkdag van het jaar valt op ${W(`${Y}-01-04`, 'nl')}, na Nieuwjaar op vrijdag.</p>`,
  },
  fr: {
    slug: 'jours-ouvrables-2027', nav: 'Jours ouvrables 2027', card: `${s0} jours ouvrables, ${sV} après remplacements`,
    title: `Jours ouvrables 2027 en Belgique : ${s0} jours, mois par mois`,
    description: `Jours ouvrables 2027 en Belgique : ${s0} jours du lundi au vendredi hors fériés, ${sV} avec les remplacements. Par mois, avec fête de Communauté et temps partiel.`,
    h1: 'Jours ouvrables 2027 en Belgique',
    intro: 'Combien de jours ouvrables compte 2027, mois par mois, avec ou sans jours de remplacement, pour une semaine de quatre ou trois jours. Fête de Communauté et 24 et 31 décembre réglables.',
    resume: `${Y} compte ${wkd} jours du lundi au vendredi. ${fWk} des dix jours fériés légaux tombent un de ces jours, ce qui laisse ${s0} jours ouvrables. Trois fériés tombent un week-end : la fête du Travail, l’Assomption et Noël. Pour qui a droit à leur remplacement, comme en semaine de cinq jours, il faut retirer trois jours de plus : ${sV} jours ouvrables. Les mois les plus chargés, avec ${mV[maxI]} jours, sont ${topM('fr')} ; le plus léger est ${MAANDEN('fr')[minI]}, avec ${mV[minI]}. À titre de comparaison, ${Y - 1} comptait ${s26} jours ouvrables hors remplacements et ${Y + 1} en comptera ${s28}. En semaine de quatre jours, on arrive à environ ${vier} jours, en semaine de trois jours à environ ${drie}, remplacements compris. La fête d’une Communauté n’est pas un jour férié légal pour le secteur privé et n’entre pas dans ce total, sauf si vous la cochez dans l’outil.`,
    faqs: [
      { q: 'Combien de jours ouvrables en 2027 en Belgique ?', a: `${s0} jours du lundi au vendredi, une fois déduits les ${fWk} fériés tombant en semaine. Avec les jours de remplacement des fériés du week-end, il en reste ${sV}. Le chiffre est le même partout en Belgique, puisque les dix jours fériés légaux valent dans toutes les Régions.` },
      { q: 'Le 27 septembre, le 11 juillet et le 15 novembre sont-ils déduits ?', a: `Pas comme jours fériés légaux. Ils sont chômés dans les services publics de la Communauté concernée et parfois dans un secteur. Si vous en cochez un dans l’outil, le total devient ${gemD.map((x) => `${x.n} (${K.GEM_FEEST[x.g].name.fr})`).join(', ')} ; le 11 juillet ${Y} est un dimanche.` },
      { q: 'Et si le 24 et le 31 décembre sont des jours de congé ?', a: `${Y} compte alors ${od} jours ouvrables hors remplacements. Légalement, ce sont des jours de travail ordinaires, mais de nombreuses entreprises les accordent entièrement ou en partie par accord ou convention collective. L’outil permet de les cocher dans les options avancées. Les deux tombent un vendredi en 2027.` },
    ],
    body: (h) => `<h2>Les jours ouvrables de 2027 par mois</h2>
${h.table(['Mois', 'Sans remplacement', 'Avec remplacement'], rij('fr'), `Jours ouvrables ${Y}, du lundi au vendredi`, ['l', 'r', 'r'])}
<p>À défaut d’autre accord, les remplacements tombent en mai, en août et en décembre, selon la règle décrite par le ${h.src('fod-feestdagen', 'SPF Emploi')}. Ces trois mois comptent donc un jour de moins dans la seconde colonne. La base légale est la ${h.src('wet-1974', 'loi du 4 janvier 1974')} ; le choix des jours est expliqué sur ${h.a('vervangingsdagen-2027', 'jours de remplacement 2027')}.</p>
<h2>À quoi sert le nombre de jours ouvrables</h2>
<p>Pour tirer un tarif journalier d’un montant annuel, on divise par les jours ouvrables moins les congés. Avec vingt jours de vacances légales en semaine de cinq jours, il reste ${sV - 20} jours sur ${sV}. Le total annuel sert aussi de point de départ pour un planning, un délai exprimé en jours ouvrables ou un décompte de télétravail. Un jour férié tombant un jour de travail est payé comme un jour presté : un salaire mensuel ne change pas.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y }, c: 'Tous les jours fériés 2027 et leur jour' })}
<h2>Jours ouvrables et congés</h2>
<p>Placer ses congés autour des fériés rapporte le plus ; les ${h.a('brugdagen-2027', 'ponts 2027')} montrent comment. Le calendrier annuel avec numéros de semaine est sur ${h.a('kalender-2027', 'calendrier 2027')}. Le premier jour ouvrable de l’année est le ${W(`${Y}-01-04`, 'fr')}, après un Nouvel An tombant un vendredi.</p>`,
  },
  en: {
    slug: 'working-days-2027', nav: 'Working days 2027', card: `${s0} working days, ${sV} after replacement days`,
    title: `Working days 2027 Belgium: ${s0} days, month by month`,
    description: `Working days 2027 in Belgium: ${s0} days from Monday to Friday excluding holidays, ${sV} with replacement days. By month, with Community days and part-time weeks.`,
    h1: 'Working days in Belgium 2027',
    intro: 'How many working days 2027 has, month by month, with or without replacement days, for a four or three-day week. You can also mark a Community day or 24 and 31 December as off.',
    resume: `${Y} has ${wkd} days from Monday to Friday. ${fWk} of the ten statutory public holidays fall on one of them, leaving ${s0} working days. Three holidays fall at the weekend: Labour Day, Assumption Day and Christmas Day. Employees entitled to a replacement day for each, as on a five-day week, work three days fewer: ${sV} working days. The busiest months, with ${mV[maxI]} working days each, are ${topM('en')}; the quietest is ${MAANDEN('en')[minI]} with ${mV[minI]}. For comparison, ${Y - 1} had ${s26} working days before replacement days and ${Y + 1} will have ${s28}. On a four-day week you reach roughly ${vier} days, on three days a week roughly ${drie}, replacement days included. A Community’s own holiday is not a statutory holiday for private employers and is not deducted here unless you mark it in the tool.`,
    faqs: [
      { q: 'How many working days are there in Belgium in 2027?', a: `${s0} working days from Monday to Friday after deducting the ${fWk} holidays that fall on weekdays. With replacement days for the weekend holidays, ${sV} remain. The figure is the same throughout Belgium, because the ten statutory holidays apply in every Region. Saturdays are not counted.` },
      { q: 'Are 11 July, 27 September and 15 November deducted?', a: `Not as statutory holidays. They are days off in the public services of the Community concerned and in some sectors. Mark one in the tool and the total becomes ${gemD.map((x) => `${x.n} (${K.GEM_FEEST[x.g].name.en})`).join(', ')}; 11 July ${Y} is a Sunday.` },
      { q: 'What if Christmas Eve and New Year’s Eve are days off?', a: `Then ${Y} has ${od} working days before replacement days. By law 24 and 31 December are ordinary working days, but many companies give them off in full or in part through an agreement. Tick them under the extra options in the tool. Both fall on a Friday in 2027.` },
    ],
    body: (h) => `<h2>Working days per month in 2027</h2>
${h.table(['Month', 'Without replacements', 'With replacements'], rij('en'), `Working days ${Y}, Monday to Friday`, ['l', 'r', 'r'])}
<p>Without another agreement, the replacement days fall in May, August and December, under the default rule described by the ${h.src('fod-feestdagen', 'federal employment service')}. Those three months are one day shorter in the second column. The legal basis is the ${h.src('wet-1974', 'Act of 4 January 1974')}; how the days are chosen is on ${h.a('vervangingsdagen-2027', 'replacement days 2027')}.</p>
<h2>What the working-day count is used for</h2>
<p>To turn an annual amount into a day rate, divide by working days minus leave. With twenty days of statutory leave on a five-day week, ${sV - 20} of the ${sV} working days remain. The annual total is also the starting point for a project plan, a deadline expressed in working days or a count of home-working days. A holiday on a working day is paid like a day worked, so a monthly salary does not change.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y }, c: 'Every 2027 public holiday with its weekday' })}
<h2>Working days and leave together</h2>
<p>Leave placed around the holidays goes furthest; ${h.a('brugdagen-2027', 'bridge days 2027')} shows how. The year calendar with week numbers is on ${h.a('kalender-2027', 'calendar 2027')}. The first working day of the year is ${W(`${Y}-01-04`, 'en')}, after New Year’s Day on a Friday.</p>`,
  },
});
