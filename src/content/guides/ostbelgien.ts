/** Schoolvakanties in Ostbelgien (Communauté germanophone) 2026-2029, publiées lundi–vendredi. Dates : params via moteur. */
import { defineGuide } from '../../lib/page-types';
import type { Lang } from '../../lib/format';
import { K, VG, DG, P, D, W, nDagen } from '../_data';

const Y = 2026;
const g = DG(Y), g2 = DG(Y + 1), v2 = VG(Y + 1);
const JAREN = K.JAREN.DG;
const sj = (y: number) => `${y}-${y + 1}`;
const rijen = (l: Lang) => K.VAKS.filter((x) => x !== 'zomer').map((x) => [`${K.VAK_DE[x]} (${K.VAK_NAME.DG[x][l].toLowerCase()})`, ...JAREN.map((y) => { const p = DG(y)[x]; return p ? P(p, l) : ''; })]);
const vrij = (y: number, l: Lang) => DG(y).vrij.map((x) => [W(x.date, l), x.name[l]]);
const eigen = g2.vrij.filter((x) => !VG(Y + 1).vrij.some((z) => z.date === x.date));
const pasenVerschil = K.fromIso(g2.pasen!.van) - K.fromIso(v2.pasen.van);
const kerstDG = nDagen('DG', Y, 'kerst');

export default defineGuide({
  id: 'ostbelgien', group: 'school', order: 9, tool: 'sv', toolArg: { gem: 'DG', sj: Y },
  related: ['vergelijker', 'schoolvakanties-2027-2028', 'vrije-dagen-school', 'home'],
  sources: ['dg-kalender', 'vg-vakanties'],
  nl: {
    slug: 'schoolvakanties-ostbelgien', nav: 'Ostbelgien', card: 'Duitstalige Gemeenschap, tot 2028-2029',
    title: 'Schoolvakanties Ostbelgien 2026-2029: Duitstalig onderwijs',
    description: 'Schoolvakanties in Ostbelgien, de Duitstalige Gemeenschap van België: alle Ferien van 2026-2027 tot 2028-2029, eigen vrije dagen en verschillen met Vlaanderen.',
    h1: 'Schoolvakanties in Ostbelgien (Duitstalige Gemeenschap)',
    intro: 'De kalender van de scholen in Eupen, Sankt Vith en de zeven andere Duitstalige gemeenten, voor drie schooljaren. Kies het schooljaar in de rekenaar.',
    resume: `De Duitstalige Gemeenschap legt haar schoolkalender telkens voor drie schooljaren vast; de huidige reeks loopt van ${sj(JAREN[0])} tot ${sj(JAREN[JAREN.length - 1])}. Het schooljaar begint op 1 september en eindigt op 30 juni. De vakanties worden van maandag tot vrijdag gepubliceerd: in ${sj(Y)} de Allerheiligenferien van ${P(g.herfst!, 'nl')}, de Weihnachtsferien van ${P(g.kerst!, 'nl')} (${kerstDG} dagen met de weekends), de Karnevalsferien van ${P(g.krokus!, 'nl')} en de Osterferien van ${P(g.pasen!, 'nl')}. Dat zijn dezelfde weken als in Vlaanderen. In ${sj(Y + 1)} wijkt Pasen af: Ostbelgien is vrij van ${P(g2.pasen!, 'nl')}, ${Math.abs(pasenVerschil)} dagen ${pasenVerschil > 0 ? 'later' : 'eerder'} dan de Vlaamse paasvakantie. Daarnaast heeft Ostbelgien eigen vrije dagen, zoals 15 november, de feestdag van de Duitstalige Gemeenschap, en in ${sj(Y + 1)} ook ${D('2027-12-24', 'nl')}. Het Franstalige ritme met twee weken herfst- en krokusvakantie geldt hier niet.`,
    faqs: [
      { q: 'Welke gemeenten volgen de Duitstalige schoolkalender?', a: 'De negen gemeenten van de Duitstalige Gemeenschap: Eupen, Kelmis, Lontzen, Raeren, Amel, Büllingen, Burg-Reuland, Bütgenbach en Sankt Vith. Franstalige scholen in andere gemeenten van de provincie Luik volgen de kalender van de Fédération Wallonie-Bruxelles. Brusselse scholen volgen nooit de Duitstalige kalender.' },
      { q: 'Is 15 november een vrije dag in Ostbelgien?', a: `Ja, de feestdag van de Duitstalige Gemeenschap is er een schoolvrije dag. In ${Y} valt hij op een ${K.weekday(K.fromIso(`${Y}-11-15`)) === 0 ? 'zondag' : 'weekdag'}; in ${Y + 1} op ${W(`${Y + 1}-11-15`, 'nl')}. Voor werknemers is het geen wettelijke feestdag. Vlaamse en Franstalige scholen hebben die dag gewoon les.` },
      { q: 'Waarom staan de vakanties van Ostbelgien van maandag tot vrijdag?', a: 'Zo publiceert de regering ze: de eerste en de laatste lesvrije werkdag. De weekends ervoor en erna zijn natuurlijk ook vrij. De rekenaar telt ze mee wanneer hij het aantal vrije dagen op een rij toont. De tabel hieronder geeft de officiële data, zonder de weekends.' },
    ],
    body: (h) => `<h2>Alle vakanties van ${sj(JAREN[0])} tot ${sj(JAREN[JAREN.length - 1])}</h2>
<p>De tabel geeft de data zoals de regering ze publiceert, van maandag tot vrijdag, met de Duitse naam van elke vakantie. De zomervakantie loopt telkens van 1 juli tot 31 augustus. De kalender is overgenomen uit het ${h.src('dg-kalender', 'verslag van de regeringsbeslissing in GrenzEcho')}; de onderwijssite van de Gemeenschap liet bij onze controle geen automatische lezing toe. Vraag bij twijfel de kalender van uw school.</p>
${h.table(['Vakantie', ...JAREN.map(sj)], rijen('nl'), 'Schoolvakanties in Ostbelgien, maandag tot vrijdag')}
<h2>Vrije dagen in ${sj(Y + 1)}</h2>
${h.table(['Datum', 'Vrije dag'], vrij(Y + 1, 'nl'), `Losse vrije dagen in Ostbelgien, ${sj(Y + 1)}`)}
<p>Wat Ostbelgien in dat jaar meer heeft dan Vlaanderen: ${eigen.map((x) => `${x.name.nl} (${D(x.date, 'nl')})`).join(', ')}. De Vlaamse vrije dagen staan op ${h.src('vg-vakanties', 'vlaanderen.be')} en op ${h.a('vrije-dagen-school', 'vrije dagen op school')}.</p>
<h2>Gezinnen over de taalgrens</h2>
<p>Wie in Ostbelgien woont en een kind in een Franstalige school in Verviers of Malmedy heeft, combineert twee heel verschillende kalenders. De vergelijker telt de gemeenschappelijke vrije dagen.</p>
${h.mini('vg', { p: ['a', 'b'], d: { a: 'DG', b: 'FWB' }, c: 'Ostbelgien vergelijken met een andere kalender' })}`,
  },
  fr: {
    slug: 'vacances-scolaires-ostbelgien', nav: 'Ostbelgien', card: 'Communauté germanophone, jusqu’en 2028-2029',
    title: 'Vacances scolaires Ostbelgien 2026-2029 : école germanophone',
    description: 'Vacances scolaires en Ostbelgien, la Communauté germanophone : tous les congés de 2026-2027 à 2028-2029, les jours libres propres et les écarts avec la Flandre.',
    h1: 'Vacances scolaires en Ostbelgien (Communauté germanophone)',
    intro: 'Le calendrier des écoles d’Eupen, de Saint-Vith et des sept autres communes germanophones, sur trois années scolaires. Choisissez l’année dans l’outil.',
    resume: `Le gouvernement de la Communauté germanophone arrête son calendrier scolaire par périodes de trois ans ; la série actuelle couvre ${sj(JAREN[0])} à ${sj(JAREN[JAREN.length - 1])}. L’année va du 1er septembre au 30 juin, comme en Flandre, et non de fin août à début juillet comme en Fédération Wallonie-Bruxelles. Les congés sont publiés du lundi au vendredi : en ${sj(Y)}, Toussaint du ${P(g.herfst!, 'fr')}, Noël du ${P(g.kerst!, 'fr')}, carnaval du ${P(g.krokus!, 'fr')} et Pâques du ${P(g.pasen!, 'fr')}, les mêmes semaines qu’en Flandre. En ${sj(Y + 1)}, Pâques diffère : congé du ${P(g2.pasen!, 'fr')}, soit ${Math.abs(pasenVerschil)} jours ${pasenVerschil > 0 ? 'plus tard' : 'plus tôt'} que la paasvakantie flamande. S’y ajoutent des jours propres, dont le 15 novembre, fête de la Communauté germanophone, et le ${D('2027-12-24', 'fr')}. Le rythme francophone à Toussaint et carnaval de deux semaines ne s’applique pas ici.`,
    faqs: [
      { q: 'Quelles communes suivent le calendrier germanophone ?', a: 'Les neuf communes de la Communauté germanophone : Eupen, La Calamine (Kelmis), Lontzen, Raeren, Amblève (Amel), Bullange (Büllingen), Burg-Reuland, Butgenbach et Saint-Vith. Les écoles francophones de Malmedy ou Waimes suivent le calendrier de la Fédération Wallonie-Bruxelles. À Bruxelles, aucune école ne suit ce calendrier.' },
      { q: 'Le 15 novembre est-il un jour de congé scolaire en Ostbelgien ?', a: `Oui, c’est la fête de la Communauté germanophone. En ${Y + 1}, il tombe le ${W(`${Y + 1}-11-15`, 'fr')}. Ce n’est pas un jour férié légal pour les salariés. Les écoles flamandes et francophones ont cours ce jour-là, sauf s’il tombe un week-end.` },
      { q: 'Pourquoi les dates germanophones s’arrêtent-elles un vendredi ?', a: 'Le gouvernement publie le premier et le dernier jour ouvrable sans cours. Les week-ends qui entourent le congé sont évidemment libres ; l’outil les compte dans le nombre de jours d’affilée. Le tableau ci-dessous reprend les dates officielles, sans les week-ends.' },
    ],
    body: (h) => `<h2>Tous les congés de ${sj(JAREN[0])} à ${sj(JAREN[JAREN.length - 1])}</h2>
<p>Le tableau reprend les dates publiées, du lundi au vendredi, avec le nom allemand de chaque congé. L’été va chaque fois du 1er juillet au 31 août. Les dates proviennent du ${h.src('dg-kalender', 'compte rendu de la décision du gouvernement paru dans GrenzEcho')} ; le site d’enseignement de la Communauté n’autorisait pas la lecture automatique lors de notre vérification. En cas de doute, consultez le calendrier de l’école.</p>
${h.table(['Congé', ...JAREN.map(sj)], rijen('fr'), 'Vacances scolaires en Ostbelgien, du lundi au vendredi')}
<h2>Jours libres en ${sj(Y + 1)}</h2>
${h.table(['Date', 'Congé'], vrij(Y + 1, 'fr'), `Jours de congé isolés en Ostbelgien, ${sj(Y + 1)}`)}
<p>Ce qu’Ostbelgien a de plus que la Flandre cette année-là : ${eigen.map((x) => `${x.name.fr} (${D(x.date, 'fr')})`).join(', ')}. Les jours libres flamands figurent sur ${h.src('vg-vakanties', 'vlaanderen.be')} et sur ${h.a('vrije-dagen-school', 'jours de congé à l’école')}.</p>
<h2>Familles de part et d’autre de la frontière linguistique</h2>
<p>Un enfant à Eupen et un autre dans une école francophone de Verviers n’ont presque aucun congé en commun hors Noël et l’été. Le comparateur compte les jours partagés.</p>
${h.mini('vg', { p: ['a', 'b'], d: { a: 'DG', b: 'FWB' }, c: 'Comparer Ostbelgien à un autre calendrier' })}`,
  },
  en: {
    slug: 'school-holidays-ostbelgien', nav: 'Ostbelgien', card: 'German-speaking Community, to 2028-2029',
    title: 'Ostbelgien school holidays 2026-2029: German-speaking area',
    description: 'School holidays in Ostbelgien, the German-speaking Community of Belgium: every break from 2026-2027 to 2028-2029, its own days off and the gaps with Flanders.',
    h1: 'School holidays in Ostbelgien (German-speaking Community)',
    intro: 'The calendar for schools in Eupen, Sankt Vith and the seven other German-speaking municipalities, over three school years. Choose the year in the tool.',
    resume: `The government of Belgium’s German-speaking Community sets its school calendar three years at a time; the current set covers ${sj(JAREN[0])} to ${sj(JAREN[JAREN.length - 1])}. The school year runs from 1 September to 30 June, as in Flanders. Breaks are published from Monday to Friday: in ${sj(Y)} the Allerheiligenferien run ${P(g.herfst!, 'en')}, the Weihnachtsferien ${P(g.kerst!, 'en')} (${kerstDG} days with the weekends), the Karnevalsferien ${P(g.krokus!, 'en')} and the Osterferien ${P(g.pasen!, 'en')}, all in the same weeks as Flanders. In ${sj(Y + 1)} Easter differs: Ostbelgien is off ${P(g2.pasen!, 'en')}, ${Math.abs(pasenVerschil)} days ${pasenVerschil > 0 ? 'later' : 'earlier'} than the Flemish Easter break. There are also days off of its own, such as 15 November, German-speaking Community Day, and ${D('2027-12-24', 'en')}. The French-language pattern of two-week autumn and carnival breaks does not apply here.`,
    faqs: [
      { q: 'Which municipalities use the German-speaking school calendar?', a: 'The nine municipalities of the German-speaking Community: Eupen, Kelmis, Lontzen, Raeren, Amel, Büllingen, Burg-Reuland, Bütgenbach and Sankt Vith. French-language schools elsewhere in Liège province follow the Fédération Wallonie-Bruxelles calendar. No school in Brussels uses the German-speaking calendar, whatever its language.' },
      { q: 'Is 15 November a school holiday in Ostbelgien?', a: `Yes, it is German-speaking Community Day. In ${Y + 1} it falls on ${W(`${Y + 1}-11-15`, 'en')}. It is not a statutory public holiday for employees. Flemish and French-language schools have lessons that day unless it falls at a weekend, as in 2026.` },
      { q: 'Why do the Ostbelgien dates end on a Friday?', a: 'The government publishes the first and last weekday without lessons. The surrounding weekends are of course free too, and the tool counts them in the number of days off in a row. The table below gives the official dates without the weekends.' },
    ],
    body: (h) => `<h2>Every break from ${sj(JAREN[0])} to ${sj(JAREN[JAREN.length - 1])}</h2>
<p>The table shows the dates as published, Monday to Friday, with the German name of each break. Summer always runs from 1 July to 31 August. The calendar is taken from ${h.src('dg-kalender', 'GrenzEcho’s report of the government decision')}; the Community’s education website did not allow automated reading when we checked. If in doubt, ask your school for its calendar.</p>
${h.table(['Break', ...JAREN.map(sj)], rijen('en'), 'School holidays in Ostbelgien, Monday to Friday')}
<h2>Days off in ${sj(Y + 1)}</h2>
${h.table(['Date', 'Day off'], vrij(Y + 1, 'en'), `Single days off in Ostbelgien, ${sj(Y + 1)}`)}
<p>What Ostbelgien has on top of Flanders that year: ${eigen.map((x) => `${x.name.en} (${D(x.date, 'en')})`).join(', ')}. The Flemish days off are on ${h.src('vg-vakanties', 'vlaanderen.be')} and on ${h.a('vrije-dagen-school', 'school days off')}.</p>
<h2>Families across the language border</h2>
<p>A child in Eupen and a sibling at a French-language school in Verviers share almost no breaks apart from Christmas and summer. The comparison tool counts the shared days.</p>
${h.mini('vg', { p: ['a', 'b'], d: { a: 'DG', b: 'FWB' }, c: 'Compare Ostbelgien with another calendar' })}`,
  },
});
