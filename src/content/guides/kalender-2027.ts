/** Kalender 2027 : jaarkalender met ISO-weeknummers, feestdagen en schoolvakanties. Data : moteur. */
import { defineGuide } from '../../lib/page-types';
import type { Lang } from '../../lib/format';
import { MAANDEN } from '../../lib/tool-specs';
import { K, D, W } from '../_data';

const Y = 2027;
const w1 = K.toIso(K.dayNum(Y, 1, 4) - ((K.weekday(K.dayNum(Y, 1, 4)) + 6) % 7));
const nWeken = K.weeksInYear(Y), vorigeWk = K.isoWeek(`${Y}-01-01`);
const wk = K.opWeekdag(K.wettelijke(Y)).length;
const wd = K.werkdagen(Y).reduce((a, b) => a + b, 0);
const schoolDagen = (g: 'VG' | 'FWB' | 'DG') => { const s = new Set([...K.vakantieSet(g, Y - 1), ...K.vakantieSet(g, Y)]); return [...s].filter((d) => d >= K.dayNum(Y, 1, 1) && d <= K.dayNum(Y, 12, 31)).length; };
const sVG = schoolDagen('VG'), sFWB = schoolDagen('FWB');
const kwOf = (id: string) => K.isoWeek(K.wettelijke(Y).find((f) => f.id === id)!.date).week;
const rows = (l: Lang) => K.wettelijke(Y).map((f) => [f.name[l], W(f.date, l), K.isoWeek(f.date).week]);
const ma = (l: Lang) => MAANDEN(l);

export default defineGuide({
  id: 'kalender-2027', group: 'werk', order: 19, tool: 'kalender', toolArg: { jaar: Y },
  related: ['feestdagen-2027', 'werkdagen-2027', 'brugdagen-2027', 'home'],
  sources: ['fod-feestdagen', 'vg-vakanties', 'fwb-calendrier'],
  nl: {
    slug: 'kalender-2027', nav: 'Kalender 2027', card: `${nWeken} weken, feestdagen en vakanties`,
    title: 'Kalender 2027 met weeknummers, feestdagen en schoolvakanties',
    description: `Kalender 2027 voor België: de ${nWeken} ISO-weeknummers, de tien wettelijke feestdagen, de vervangingsdagen en de schoolvakanties van uw Gemeenschap in één overzicht.`,
    h1: 'Kalender 2027 met weeknummers',
    intro: 'Het hele jaar 2027 op één scherm: weeknummers, wettelijke feestdagen, vervangingsdagen en de schoolvakanties van de Gemeenschap die u kiest.',
    resume: `Het jaar ${Y} telt ${nWeken} weken volgens de ISO-norm die in België gebruikt wordt. Week 1 is de week met de eerste donderdag van het jaar en begint op ${W(w1, 'nl')}; vrijdag 1 januari hoort nog bij week ${vorigeWk.week} van ${vorigeWk.year}, het jaar met 53 weken. Van de tien wettelijke feestdagen vallen er in ${Y} ${wk} op een weekdag, zodat het jaar ${wd} werkdagen van maandag tot vrijdag telt, nog zonder de vervangingsdagen. Paasmaandag valt in week ${kwOf('paasmaandag')}, Hemelvaart in week ${kwOf('hemelvaart')}, de Nationale Feestdag in week ${kwOf('nationale-feestdag')}. De kalender kleurt ook de schoolvakanties van de gekozen Gemeenschap: in het Vlaamse onderwijs vallen ${sVG} dagen van het kalenderjaar in een vakantie, weekends inbegrepen, in het Franstalig onderwijs ${sFWB}. Zo ziet u in één oogopslag welke weken druk worden op het werk en wanneer de kinderen thuis zijn.`,
    faqs: [
      { q: 'Hoeveel weken heeft 2027?', a: `${nWeken}. Een jaar heeft 53 ISO-weken als het op een donderdag begint, of op een woensdag in een schrikkeljaar. ${Y} begint op een vrijdag, dus valt 1 januari nog in de laatste week van ${Y - 1}, en week 1 start op ${D(w1, 'nl')}.` },
      { q: 'In welke week valt Kerstmis 2027?', a: `In week ${kwOf('kerstmis')}. Kerstmis valt op een zaterdag; zonder ander akkoord in het bedrijf wordt hij vervangen door de eerstvolgende gewone werkdag, maandag ${D(`${Y}-12-27`, 'nl')}. De kalender toont die vervangingsdag apart. Voor de scholen is het nog een lesweek: de kerstvakantie begint pas op maandag ${D(`${Y}-12-27`, 'nl')}, in Vlaanderen en in het Franstalig onderwijs.` },
      { q: 'Kan ik de kalender afdrukken of delen?', a: 'De kalender is een gewone webpagina: u kunt hem afdrukken via de printfunctie van uw browser. De gekozen Gemeenschap en de instelling voor vervangingsdagen staan in de adresbalk, dus de link toont iemand anders exact dezelfde kalender. Er wordt niets verstuurd of bewaard: alles gebeurt in uw browser.' },
    ],
    body: (h) => `<h2>Feestdagen met weeknummer</h2>
${h.table(['Feestdag', 'Datum', 'Week'], rows('nl'), `Wettelijke feestdagen ${Y} en hun ISO-week`, ['l', 'l', 'r'])}
<p>De lijst volgt de ${h.src('fod-feestdagen', 'FOD Werkgelegenheid')}. Feestdagen op een zaterdag of zondag krijgen een vervangingsdag; in ${Y} gaat het om de Dag van de Arbeid, ${D(`${Y}-08-15`, 'nl')} en Kerstmis. Alles daarover staat op ${h.a('vervangingsdagen-2027', 'vervangingsdagen 2027')}.</p>
<h2>Weeknummers in België</h2>
<p>België volgt de norm ISO 8601: een week begint op maandag, en week 1 is de week waarin de eerste donderdag van januari valt. Daardoor kan 1 januari in week 52 of 53 van het vorige jaar liggen, zoals in ${Y}. Planners, roosters en leveringstermijnen gebruiken die nummers; de kleine rekenaar hieronder zet een weeknummer om in data.</p>
${h.mini('kw', { p: ['kw'], d: { jaar: Y, kw: 10 }, c: 'Een weeknummer opzoeken' })}
<h2>Schoolvakanties in de kalender</h2>
<p>Kies boven de kalender de Gemeenschap: Vlaamse vakanties volgen ${h.src('vg-vakanties', 'vlaanderen.be')}, Franstalige ${h.src('fwb-calendrier', 'enseignement.be')}. Januari begint met het einde van de kerstvakantie, ${ma('nl')[1]} brengt de krokus in Vlaanderen, en de zomervakantie kleurt juli en augustus. Pedagogische studiedagen van uw school staan er niet in.</p>`,
  },
  fr: {
    slug: 'calendrier-2027', nav: 'Calendrier 2027', card: `${nWeken} semaines, fériés et congés`,
    title: 'Calendrier 2027 avec numéros de semaine, fériés et congés',
    description: `Calendrier 2027 pour la Belgique : les ${nWeken} numéros de semaine ISO, les dix jours fériés légaux, les remplacements et les congés scolaires de votre Communauté.`,
    h1: 'Calendrier 2027 avec numéros de semaine',
    intro: 'Toute l’année 2027 sur un écran : numéros de semaine, jours fériés légaux, jours de remplacement et congés scolaires de la Communauté choisie.',
    resume: `L’année ${Y} compte ${nWeken} semaines selon la norme ISO en usage en Belgique. La semaine 1 est celle qui contient le premier jeudi de l’année ; elle commence le ${W(w1, 'fr')}. Le vendredi 1er janvier appartient encore à la semaine ${vorigeWk.week} de ${vorigeWk.year}, une année de 53 semaines. Sur les dix jours fériés légaux, ${wk} tombent en semaine en ${Y}, ce qui laisse ${wd} jours ouvrables du lundi au vendredi, avant jours de remplacement. Le lundi de Pâques est en semaine ${kwOf('paasmaandag')}, l’Ascension en semaine ${kwOf('hemelvaart')}, la fête nationale en semaine ${kwOf('nationale-feestdag')}. Le calendrier colore aussi les vacances scolaires de la Communauté choisie : dans l’enseignement francophone, ${sFWB} jours de l’année civile tombent en congé, week-ends compris, contre ${sVG} en Flandre. On voit d’un coup d’œil quelles semaines seront chargées au travail et quand les enfants seront à la maison.`,
    faqs: [
      { q: 'Combien de semaines compte l’année 2027 ?', a: `${nWeken}. Une année compte 53 semaines ISO quand elle commence un jeudi, ou un mercredi si elle est bissextile. ${Y} commence un vendredi : le 1er janvier appartient à la dernière semaine de ${Y - 1}, et la semaine 1 débute le ${D(w1, 'fr')}.` },
      { q: 'Dans quelle semaine tombe Noël 2027 ?', a: `En semaine ${kwOf('kerstmis')}. Noël tombe un samedi ; sans autre accord dans l’entreprise, il est remplacé par le premier jour ouvrable suivant, le lundi ${D(`${Y}-12-27`, 'fr')}, que le calendrier signale à part. Pour les écoles, c’est encore une semaine de cours : les vacances d’hiver ne commencent que le lundi ${D(`${Y}-12-27`, 'fr')}, en Flandre comme en Fédération.` },
      { q: 'Peut-on imprimer ou partager le calendrier ?', a: 'Oui : c’est une page web ordinaire, imprimable depuis le navigateur. La Communauté choisie et le réglage des jours de remplacement s’inscrivent dans la barre d’adresse, de sorte que le lien affiche le même calendrier à la personne qui le reçoit.' },
    ],
    body: (h) => `<h2>Jours fériés et numéros de semaine</h2>
${h.table(['Jour férié', 'Date', 'Semaine'], rows('fr'), `Jours fériés légaux ${Y} et leur semaine ISO`, ['l', 'l', 'r'])}
<p>La liste suit le ${h.src('fod-feestdagen', 'SPF Emploi')}. Un jour férié qui tombe un samedi ou un dimanche est remplacé ; en ${Y}, c’est le cas de la fête du Travail, du ${D(`${Y}-08-15`, 'fr')} et de Noël. Voir ${h.a('vervangingsdagen-2027', 'jours de remplacement 2027')}.</p>
<h2>La numérotation des semaines</h2>
<p>La Belgique applique la norme ISO 8601 : la semaine commence le lundi, et la semaine 1 contient le premier jeudi de janvier. Le 1er janvier peut donc relever de la semaine 52 ou 53 de l’année précédente, comme en ${Y}. Plannings, horaires et délais de livraison utilisent ces numéros ; le petit outil ci-dessous convertit un numéro en dates.</p>
${h.mini('kw', { p: ['kw'], d: { jaar: Y, kw: 10 }, c: 'Retrouver une semaine' })}
<h2>Les congés scolaires dans le calendrier</h2>
<p>Choisissez la Communauté au-dessus du calendrier. Les congés francophones suivent ${h.src('fwb-calendrier', 'enseignement.be')}, les flamands ${h.src('vg-vakanties', 'vlaanderen.be')}. Côté francophone, ${ma('fr')[2]} s’ouvre sur la fin du congé de détente et ${ma('fr')[4]} sur les vacances de printemps. Les journées pédagogiques de chaque école n’y figurent pas.</p>`,
  },
  en: {
    slug: 'calendar-2027', nav: 'Calendar 2027', card: `${nWeken} weeks, holidays and breaks`,
    title: 'Calendar 2027 with week numbers, holidays and school breaks',
    description: `Calendar 2027 for Belgium: all ${nWeken} ISO week numbers, the ten public holidays, replacement days and your Community’s school holidays in one yearly overview.`,
    h1: 'Calendar 2027 with week numbers',
    intro: 'The whole of 2027 on one screen: week numbers, public holidays, replacement days and the school holidays of the Community you choose.',
    resume: `${Y} has ${nWeken} weeks under the ISO standard used in Belgium. Week 1 is the week containing the first Thursday of the year and starts on ${W(w1, 'en')}; Friday 1 January still belongs to week ${vorigeWk.week} of ${vorigeWk.year}, a 53-week year. Of the ten public holidays, ${wk} fall on a weekday in ${Y}, leaving ${wd} working days from Monday to Friday before replacement days. Easter Monday is in week ${kwOf('paasmaandag')}, Ascension Day in week ${kwOf('hemelvaart')} and National Day in week ${kwOf('nationale-feestdag')}. The calendar also shades the school holidays of the Community you pick: ${sVG} days of the calendar year fall in a Flemish school break, weekends included, and ${sFWB} in a French-language one. At a glance you can see which weeks will be busy at work and when the children are at home, and plan leave, deliveries or rotas around both.`,
    faqs: [
      { q: 'How many weeks are there in 2027?', a: `${nWeken}. A year has 53 ISO weeks when it starts on a Thursday, or on a Wednesday in a leap year. ${Y} starts on a Friday, so 1 January belongs to the last week of ${Y - 1} and week 1 begins on ${D(w1, 'en')}.` },
      { q: 'Which week is Christmas 2027 in?', a: `Week ${kwOf('kerstmis')}. Christmas Day falls on a Saturday; without another agreement at work it is replaced by the next ordinary working day, Monday ${D(`${Y}-12-27`, 'en')}, which the calendar marks separately. For schools it is still a teaching week: the Christmas holidays only start on Monday ${D(`${Y}-12-27`, 'en')}, in Flemish and French-language schools alike.` },
      { q: 'Can I print or share the calendar?', a: 'Yes. It is an ordinary web page you can print from your browser. The chosen Community and the replacement-day setting are written into the address bar, so the link shows the same calendar to whoever opens it. Nothing is sent or stored: everything happens in your browser.' },
    ],
    body: (h) => `<h2>Public holidays and their week numbers</h2>
${h.table(['Holiday', 'Date', 'Week'], rows('en'), `Public holidays ${Y} and their ISO week`, ['l', 'l', 'r'])}
<p>The list follows the ${h.src('fod-feestdagen', 'federal employment service')}. Holidays falling on a Saturday or Sunday are replaced; in ${Y} that applies to Labour Day, ${D(`${Y}-08-15`, 'en')} and Christmas Day. See ${h.a('vervangingsdagen-2027', 'replacement days 2027')}.</p>
<h2>How week numbers work</h2>
<p>Belgium uses ISO 8601: weeks start on Monday, and week 1 is the one containing the first Thursday of January. So 1 January can belong to week 52 or 53 of the previous year, as it does in ${Y}. Rotas, project plans and delivery dates use these numbers; the small tool below turns a week number into dates.</p>
${h.mini('kw', { p: ['kw'], d: { jaar: Y, kw: 10 }, c: 'Look up a week number' })}
<h2>School breaks on the calendar</h2>
<p>Pick the Community above the calendar. Flemish breaks follow ${h.src('vg-vakanties', 'vlaanderen.be')}, French-language ones ${h.src('fwb-calendrier', 'enseignement.be')}. In Flanders, ${ma('en')[1]} brings the carnival break and ${ma('en')[3]} the end of the Easter holidays; July and August are summer. Individual schools’ in-service days are not shown.</p>`,
  },
});
