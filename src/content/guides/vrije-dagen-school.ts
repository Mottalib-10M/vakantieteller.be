/** Losse vrije dagen op school 2026-2027 in de drie Gemeenschappen + pedagogische studiedagen (VG). Dates : moteur via _data.ts. */
import { defineGuide } from '../../lib/page-types';
import type { Lang } from '../../lib/format';
import { K, VG, FWB, DG, W } from '../_data';

const Y = 2026;
const k = { VG: VG(Y), FWB: FWB(Y), DG: DG(Y) } as const;
const G = ['VG', 'FWB', 'DG'] as const;
const datums = [...new Set(G.flatMap((g) => k[g].vrij.map((x) => x.date)))].sort();
const naam = (d: string, l: Lang) => G.map((g) => k[g].vrij.find((x) => x.date === d)).find(Boolean)!.name[l];
const ja = (l: Lang) => (l === 'nl' ? 'vrij' : l === 'fr' ? 'congé' : 'off');
const rij = (l: Lang) => datums.map((d) => [W(d, l), naam(d, l), ...G.map((g) => (k[g].vrij.some((x) => x.date === d) ? ja(l) : K.vakantieSet(g, Y).has(K.fromIso(d)) ? (l === 'nl' ? 'vakantie' : l === 'fr' ? 'en congé' : 'on holiday') : '–'))]);
const opWeek = (g: (typeof G)[number]) => k[g].vrij.filter((x) => !K.isWeekend(K.fromIso(x.date)) && !K.vakantieSet(g, Y).has(K.fromIso(x.date))).length;
const nVG = opWeek('VG'), nFWB = opWeek('FWB'), nDG = opWeek('DG');
const weekend = k.VG.vrij.filter((x) => K.isWeekend(K.fromIso(x.date)));

export default defineGuide({
  id: 'vrije-dagen-school', group: 'school', order: 10, tool: 'sv', toolArg: { sj: Y },
  related: ['herfstvakantie-2026', 'ostbelgien', 'feestdagen-2027', 'home'],
  sources: ['vg-vakanties', 'vg-studiedagen', 'fwb-calendrier', 'dg-kalender'],
  nl: {
    slug: 'vrije-dagen-school-2026-2027', nav: 'Vrije dagen op school', card: 'Losse vrije dagen en studiedagen 2026-2027',
    title: 'Vrije dagen school 2026-2027: losse dagen per Gemeenschap',
    description: 'Vrije dagen op school in 2026-2027: Wapenstilstand, Hemelvaart, Pinkstermaandag en de eigen dagen van elke Gemeenschap, plus de nieuwe regels voor studiedagen.',
    h1: 'Vrije dagen op school in 2026-2027',
    intro: 'Naast de vakanties zijn er losse dagen zonder les. Hier staan ze voor de drie Gemeenschappen naast elkaar, met de regels voor pedagogische studiedagen.',
    resume: `Buiten de vijf vakanties telt het schooljaar ${Y}-${Y + 1} nog een handvol losse vrije dagen, en die verschillen per Gemeenschap. In het Vlaamse onderwijs zijn het Wapenstilstand, de Dag van de Arbeid, Hemelvaartsdag, de vrijdag na Hemelvaart en Pinkstermaandag; ${weekend.map((x) => x.name.nl).join(' en ')} ${weekend.length === 1 ? 'valt' : 'vallen'} dit jaar in het weekend, zodat ${nVG} dagen echt een lesdag schrappen. Het Franstalig onderwijs heeft geen vrijdag na Hemelvaart, maar wel de Fête de la Communauté française op 27 september, Allerzielen na de herfstvakantie en Paasmaandag, die buiten de lentevakantie valt: ${nFWB} lesvrije weekdagen. Ostbelgien heeft er ${nDG}, waaronder 15 november. Daarbovenop kiest elke school haar pedagogische studiedagen. Voor het Vlaamse basisonderwijs gelden vanaf ${Y}-${Y + 1} strengere regels: hoogstens drie halve dagen zonder les per schooljaar, en in het secundair onderwijs mag een studiedag de lessen niet meer schorsen.`,
    faqs: [
      { q: 'Hoeveel pedagogische studiedagen mag een Vlaamse basisschool inrichten?', a: `Vanaf ${Y}-${Y + 1} hoogstens drie halve dagen zonder les per schooljaar, en nooit op de laatste schooldag. De school beslist zelf wanneer en meldt het aan de ouders, meestal via de schoolkalender aan het begin van het jaar. Vanaf 2029-2030 moet ze op zo’n dag ook opvang voor de kinderen organiseren.` },
      { q: 'Is de vrijdag na Hemelvaart overal schoolvrij?', a: `Nee. In het Vlaamse onderwijs is ${W(K.plusDagen(K.paaszondag(Y + 1), 40), 'nl')} vrij. In het Franstalig onderwijs valt Hemelvaart in ${Y + 1} midden in de lentevakantie, en in Ostbelgien staat alleen Hemelvaartsdag zelf op de lijst van vrije dagen. Kijk voor de zekerheid altijd ook naar de kalender van uw eigen school.` },
      { q: 'Krijgen leerlingen een vervangdag als een vrije dag in het weekend valt?', a: 'Nee. Vervangingsdagen bestaan alleen voor werknemers, op basis van de wet op de feestdagen. Valt een schoolvrije dag op een zaterdag of zondag, dan gaat hij voor de leerlingen gewoon verloren. Ook de school zelf schuift hem niet op naar een andere dag van de week.' },
    ],
    body: (h) => `<h2>Losse vrije dagen per Gemeenschap</h2>
<p>De tabel zet elke losse vrije dag van ${Y}-${Y + 1} naast de drie kalenders: ${h.src('vg-vakanties', 'Vlaamse Gemeenschap')}, ${h.src('fwb-calendrier', 'Fédération Wallonie-Bruxelles')} en ${h.src('dg-kalender', 'Duitstalige Gemeenschap')}. "Vakantie" betekent dat de dag daar binnen een vakantie valt.</p>
${h.table(['Datum', 'Vrije dag', 'Vlaanderen', 'Franstalig', 'Ostbelgien'], rij('nl'), `Losse vrije dagen ${Y}-${Y + 1}`)}
<h2>Pedagogische studiedagen in Vlaanderen</h2>
<p>De nieuwe regels staan op ${h.src('vg-studiedagen', 'vlaanderen.be')}. Ze willen de lestijd beschermen: minder lesvrije dagen in het basisonderwijs en geen in het secundair. Studiedagen staan in geen enkele algemene kalender, ook niet op deze site: alleen de school kent ze. In het Franstalig onderwijs en in Ostbelgien bepalen de school of de inrichtende macht de vormingsdagen.</p>
<h2>Vrije dagen en feestdagen</h2>
<p>De meeste losse vrije dagen zijn ook wettelijke feestdagen, maar niet allemaal: de vrijdag na Hemelvaart en de gemeenschapsfeestdagen zijn voor werkende ouders gewone werkdagen. Welke feestdagen voor werknemers gelden, staat op ${h.a('feestdagen-2027', 'feestdagen 2027')}.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y + 1 }, c: 'Feestdagen voor werknemers bekijken' })}`,
  },
  fr: {
    slug: 'jours-de-conge-ecole-2026-2027', nav: 'Jours de congé à l’école', card: 'Congés isolés et journées pédagogiques 2026-2027',
    title: 'Jours de congé école 2026-2027 : les congés isolés',
    description: 'Jours de congé à l’école en 2026-2027 : fête de la Communauté française, Armistice, lundi de Pâques, Ascension et Pentecôte, comparés entre Communautés.',
    h1: 'Jours de congé isolés à l’école en 2026-2027',
    intro: 'En plus des vacances, quelques jours sans cours ponctuent l’année. Les voici pour les trois Communautés, avec ce que l’on sait des journées pédagogiques.',
    resume: `En dehors des cinq périodes de vacances, l’année ${Y}-${Y + 1} compte quelques jours de congé isolés, différents d’une Communauté à l’autre. En Fédération Wallonie-Bruxelles, ce sont la Fête de la Communauté française le 27 septembre, la fête des morts le lendemain de la Toussaint, l’Armistice, le lundi de Pâques (hors vacances de printemps cette année), l’Ascension et le lundi de Pentecôte ; ${nFWB} d’entre eux suppriment réellement un jour de classe en semaine. Les écoles néerlandophones ont l’Armistice, la fête du Travail, l’Ascension, le vendredi qui suit et le lundi de Pentecôte : ${nVG} jours de semaine. L’Ostbelgien en compte ${nDG}, dont le 15 novembre. À cela s’ajoutent les journées pédagogiques ou de formation, fixées par chaque école ou pouvoir organisateur. En Flandre, de nouvelles règles les limitent depuis ${Y}-${Y + 1} à trois demi-journées sans cours par an dans le fondamental, et les interdisent dans le secondaire.`,
    faqs: [
      { q: 'Le 27 septembre est-il congé dans toutes les écoles ?', a: `Non, seulement dans les écoles de la Fédération Wallonie-Bruxelles. C’est la Fête de la Communauté française, qui tombe en ${Y} un ${K.weekday(K.fromIso(`${Y}-09-27`)) === 0 ? 'dimanche' : 'jour de semaine'}. Les écoles flamandes et germanophones ont cours ce jour-là. Pour les salariés, ce n’est pas un jour férié légal, sauf dans certains services publics.` },
      { q: 'Combien de journées pédagogiques une école peut-elle organiser ?', a: 'En Fédération Wallonie-Bruxelles, les journées de formation dépendent de l’école et du pouvoir organisateur, qui les annoncent aux parents ; ce site ne peut pas les connaître. En Flandre, depuis 2026-2027, l’enseignement fondamental est limité à trois demi-journées sans cours par an.' },
      { q: 'Le vendredi après l’Ascension 2027 est-il un jour de classe ?', a: `En Fédération Wallonie-Bruxelles, la question ne se pose pas cette année : l’Ascension tombe pendant les vacances de printemps. En Flandre, le ${W(K.plusDagen(K.paaszondag(Y + 1), 40), 'fr')} est libre. En Ostbelgien, seul le jeudi de l’Ascension figure dans la liste des congés publiée.` },
    ],
    body: (h) => `<h2>Les congés isolés par Communauté</h2>
<p>Le tableau compare chaque jour de congé isolé de ${Y}-${Y + 1} dans les trois calendriers : ${h.src('fwb-calendrier', 'Fédération Wallonie-Bruxelles')}, ${h.src('vg-vakanties', 'Communauté flamande')} et ${h.src('dg-kalender', 'Communauté germanophone')}. « En congé » signifie que la date tombe déjà pendant des vacances.</p>
${h.table(['Date', 'Congé', 'Flandre', 'FWB', 'Ostbelgien'], rij('fr'), `Jours de congé isolés ${Y}-${Y + 1}`)}
<h2>Les journées pédagogiques</h2>
<p>Elles ne figurent dans aucun calendrier général. Côté flamand, les règles sont expliquées sur ${h.src('vg-studiedagen', 'vlaanderen.be')} : moins de journées sans cours dans le fondamental, plus aucune dans le secondaire, et une garderie obligatoire à partir de 2029-2030. Côté francophone et germanophone, renseignez-vous auprès de l’école.</p>
<h2>Congés scolaires et jours fériés</h2>
<p>La plupart de ces congés sont aussi des jours fériés légaux, mais pas tous : la fête d’une Communauté ou le vendredi après l’Ascension restent des jours ouvrables pour les parents salariés. La liste des jours fériés est sur ${h.a('feestdagen-2027', 'jours fériés 2027')}.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y + 1 }, c: 'Voir les jours fériés des travailleurs' })}`,
  },
  en: {
    slug: 'school-days-off-2026-2027', nav: 'School days off', card: 'Single days off and in-service days 2026-2027',
    title: 'School days off 2026-2027 Belgium: single holidays compared',
    description: 'School days off in Belgium in 2026-2027: Armistice Day, Ascension, Whit Monday and each Community’s own days, compared side by side, plus in-service rules.',
    h1: 'Single school days off in Belgium, 2026-2027',
    intro: 'Besides the breaks, a few single days without lessons dot the year. Here they are for all three Communities, with what is known about in-service days.',
    resume: `Apart from the five breaks, the ${Y}-${Y + 1} school year has a handful of single days off, and they vary by Community. Flemish schools close for Armistice Day, Labour Day, Ascension Day, the Friday after Ascension and Whit Monday; ${weekend.map((x) => x.name.en).join(' and ')} ${weekend.length === 1 ? 'falls' : 'fall'} at a weekend this year, so ${nVG} of them actually cancel a weekday of lessons. French-language schools have no Friday after Ascension, but they do close on French Community Day (27 September), All Souls’ Day after the autumn break and Easter Monday, which falls outside their spring break: ${nFWB} weekdays without lessons. Ostbelgien has ${nDG}, including 15 November. On top of these, each school picks its own in-service days. Stricter Flemish rules apply from ${Y}-${Y + 1}: at most three half days without lessons a year in primary schools, and none at all in secondary schools.`,
    faqs: [
      { q: 'How many in-service days can a Flemish primary school hold?', a: `From ${Y}-${Y + 1}, at most three half days without lessons per school year, never on the last day of school. The school chooses the dates and tells parents, usually in the calendar handed out in September. From 2029-2030 it must also provide childcare for pupils on those days.` },
      { q: 'Do pupils get a replacement day when a day off falls at a weekend?', a: 'No. Replacement days exist only for employees, under the public holidays act. When a school day off falls on a Saturday or Sunday, pupils simply lose it, and schools do not move it to another day of the week. Only the general school calendar of each Community decides which days are off.' },
      { q: 'Is the Friday after Ascension 2027 a school day?', a: `Not in Flanders: ${W(K.plusDagen(K.paaszondag(Y + 1), 40), 'en')} is a day off. French-language schools are on their spring break that week anyway, and in Ostbelgien only Ascension Day itself appears in the published list of days off. Check your own school’s calendar as well, in case of in-service days.` },
    ],
    body: (h) => `<h2>Single days off by Community</h2>
<p>The table sets every single day off in ${Y}-${Y + 1} against the three calendars: ${h.src('vg-vakanties', 'Flemish Community')}, ${h.src('fwb-calendrier', 'Fédération Wallonie-Bruxelles')} and ${h.src('dg-kalender', 'German-speaking Community')}. “On holiday” means the date already falls inside a break there.</p>
${h.table(['Date', 'Day off', 'Flanders', 'French-language', 'Ostbelgien'], rij('en'), `Single days off ${Y}-${Y + 1}`)}
<h2>In-service days</h2>
<p>They appear in no general calendar, including this one; only the school knows them. The Flemish rules are explained on ${h.src('vg-studiedagen', 'vlaanderen.be')}: fewer lesson-free days in primary education, none in secondary, and compulsory childcare from 2029-2030. For French-language and German-speaking schools, ask the school.</p>
<h2>School days off and public holidays</h2>
<p>Most of these days are statutory holidays too, but not all: Community days and the Friday after Ascension are ordinary working days for parents. The statutory list is on ${h.a('feestdagen-2027', 'public holidays 2027')}.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y + 1 }, c: 'See the public holidays for employees' })}`,
  },
});
