/** Feestdagen 2028 : late Pasen, Nieuwjaar en Wapenstilstand op zaterdag, schrikkeljaar. Data : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, D, W, fd } from '../_data';

const Y = 2028;
const lijst = K.wettelijke(Y);
const vv = K.vervangingsdagen(Y);
const wkn = K.opWeekdag(lijst);
const ps = K.paaszondag(Y), ps27 = K.paaszondag(Y - 1);
const pm = fd(Y, 'paasmaandag'), hv = fd(Y, 'hemelvaart'), pi = fd(Y, 'pinkstermaandag'), nf = fd(Y, 'nationale-feestdag'), oh = fd(Y, 'olv-hemelvaart'), ks = fd(Y, 'kerstmis');
const bd = K.brugdagen(Y);
const kerst = K.bruggen(Y).find((b) => b.feestdagen.includes('kerstmis') && b.verlof === 4)!;
const wd = K.werkdagen(Y).reduce((a, b) => a + b, 0), wdV = K.werkdagen(Y, { vervanging: 'volgende' }).reduce((a, b) => a + b, 0);
const wd27 = K.werkdagen(Y - 1).reduce((a, b) => a + b, 0);
const lp = K.weekdagen(Y);
const maandagen = lijst.filter((f) => K.weekday(K.fromIso(f.date)) === 1);

export default defineGuide({
  id: 'feestdagen-2028', group: 'feestdagen', order: 13, tool: 'ft', toolArg: { jaar: Y },
  related: ['brugdagen-2028', 'feestdagen-2027', 'schoolvakanties-2027-2028', 'home'],
  sources: ['wet-1974', 'fod-feestdagen'],
  nl: {
    slug: 'feestdagen-2028', nav: 'Feestdagen 2028', card: `Late Pasen, ${maandagen.length} feestdagen op maandag`,
    title: 'Feestdagen 2028 België: late Pasen en veel lange weekends',
    description: 'Feestdagen 2028 in België: Pasen pas op 16 april, Nieuwjaar en Wapenstilstand op zaterdag met vervangingsdag, en een reeks maandagen. De tien data met weekdag.',
    h1: 'Wettelijke feestdagen 2028 in België',
    intro: 'Vooruitkijken naar 2028: de tien wettelijke feestdagen met hun weekdag, de twee vervangingsdagen en de bruggen. De rekenaar toont ook elk ander jaar.',
    resume: `${Y} is een schrikkeljaar met ${lp} dagen van maandag tot vrijdag, en de feestdagen liggen er anders dan in ${Y - 1}. Pasen valt laat, op ${D(ps, 'nl')}, bijna drie weken later dan in ${Y - 1} (${D(ps27, 'nl')}). Daardoor schuiven Paasmaandag naar ${D(pm, 'nl')}, Hemelvaart naar ${D(hv, 'nl')} en Pinkstermaandag naar ${D(pi, 'nl')}. ${maandagen.length} feestdagen vallen op een maandag, wat lange weekends oplevert zonder verlof te nemen. Twee feestdagen vallen op een zaterdag: Nieuwjaar en Wapenstilstand. Zonder ander akkoord worden ze vervangen op ${W(vv[0].date, 'nl')} en ${W(vv[1].date, 'nl')}. In totaal liggen ${wkn.length} feestdagen op een weekdag, zodat het jaar ${wd} werkdagen telt, of ${wdV} met de vervangingsdagen, tegen ${wd27} in ${Y - 1}. Er zijn ${bd.length} echte brugdagen: ${bd.map((b) => W(b.verlofVan, 'nl')).join(' en ')}.`,
    faqs: [
      { q: 'Waarom valt Pasen 2028 zo laat?', a: `Pasen is de eerste zondag na de eerste volle maan van de lente, gerekend vanaf 21 maart. In ${Y} komt die volle maan pas in april, en dus valt Pasen op ${D(ps, 'nl')}. De uiterste datum is 25 april. De Vlaamse paasvakantie begint daardoor al vóór Pasen.` },
      { q: 'Wordt Nieuwjaar 2028 vervangen?', a: `Ja, voor wie van maandag tot vrijdag werkt. 1 januari ${Y} is een zaterdag; zonder ander akkoord is ${W(vv[0].date, 'nl')} de vervangingsdag. De werkgever plakt de vervangingsdagen van ${Y} vóór ${D(K.aanplakDatum(Y), 'nl')} aan. Ook Wapenstilstand valt dat jaar op zaterdag.` },
      { q: 'Welke lange weekends zijn er in 2028 zonder verlof?', a: `Elke feestdag op maandag of vrijdag geeft drie dagen vrij: ${[...maandagen, ...lijst.filter((f) => K.weekday(K.fromIso(f.date)) === 5)].sort((a, b) => a.date.localeCompare(b.date)).map((f) => `${f.name.nl} (${D(f.date, 'nl')})`).join(', ')}. Daarbij komen de maandagen die als vervangingsdag dienen. Zo zijn er heel wat korte uitstappen mogelijk.` },
    ],
    body: (h) => `<h2>De feestdagen van 2028 op een rij</h2>
${h.table(['Datum', 'Weekdag', 'Feestdag'], lijst.map((f) => [D(f.date, 'nl'), h.wd(f.date), f.name.nl]), `Wettelijke feestdagen ${Y}`)}
<p>Feestdagen worden betaald zoals een gewerkte dag; dat bepaalt de ${h.src('wet-1974', 'wet van 4 januari 1974')}. Het verschil met ${Y - 1} zit vooral in de weekdagen: waar in ${Y - 1} drie feestdagen in het weekend vielen, zijn het er nu twee, allebei op een zaterdag.</p>
<h2>Bruggen in de zomer en met Kerstmis</h2>
<p>De nationale feestdag valt op ${W(nf, 'nl')} en geeft vanzelf een lang weekend. Onze-Lieve-Vrouw-Hemelvaart op ${W(oh, 'nl')} maakt van maandag ${D(K.plusDagen(oh, -1), 'nl')} een brugdag. Kerstmis op ${W(ks, 'nl')} levert de ruimste brug: verlof van ${D(kerst.verlofVan, 'nl')} tot ${D(kerst.verlofTot, 'nl')} geeft ${kerst.vrij} dagen vrij tot en met Nieuwjaar ${Y + 1}. Alles staat op ${h.a('brugdagen-2028', 'brugdagen 2028')}.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y + 1 }, c: 'De feestdagen van een ander jaar bekijken' })}
<h2>Wat het voor het schooljaar betekent</h2>
<p>Hemelvaart en Pinkstermaandag vallen in ${Y} eind mei en begin juni, in de laatste weken van het schooljaar ${Y - 1}-${Y}. De ${h.a('schoolvakanties-2027-2028', 'schoolvakanties 2027-2028')} tonen hoe Vlaanderen en het Franstalig onderwijs met die late Pasen omgaan. De regeling van vervangingsdagen staat bij de ${h.src('fod-feestdagen', 'FOD Werkgelegenheid')}.</p>`,
  },
  fr: {
    slug: 'jours-feries-2028', nav: 'Jours fériés 2028', card: `Pâques tardive, ${maandagen.length} fériés un lundi`,
    title: 'Jours fériés 2028 en Belgique : Pâques tardive et lundis',
    description: 'Jours fériés 2028 en Belgique : Pâques le 16 avril, Nouvel An et Armistice un samedi avec remplacement, et plusieurs lundis fériés. Les dix dates et leur jour.',
    h1: 'Jours fériés légaux 2028 en Belgique',
    intro: 'Un coup d’œil sur 2028 : les dix jours fériés légaux et leur jour de la semaine, les deux remplacements et les ponts. L’outil affiche aussi toute autre année.',
    resume: `${Y} est une année bissextile qui compte ${lp} jours du lundi au vendredi, et ses jours fériés se placent autrement qu’en ${Y - 1}. Pâques est tardive, le ${D(ps, 'fr')}, près de trois semaines après celle de ${Y - 1} (${D(ps27, 'fr')}). Le lundi de Pâques passe donc au ${D(pm, 'fr')}, l’Ascension au ${D(hv, 'fr')} et le lundi de Pentecôte au ${D(pi, 'fr')}. ${maandagen.length} jours fériés tombent un lundi, soit autant de longs week-ends sans prendre congé. Deux tombent un samedi, le Nouvel An et l’Armistice ; à défaut d’accord, ils sont remplacés le ${W(vv[0].date, 'fr')} et le ${W(vv[1].date, 'fr')}. Au total, ${wkn.length} fériés tombent en semaine, ce qui laisse ${wd} jours ouvrables, ou ${wdV} avec les remplacements, contre ${wd27} en ${Y - 1}. L’année offre ${bd.length} vrais ponts : le ${bd.map((b) => W(b.verlofVan, 'fr')).join(' et le ')}.`,
    faqs: [
      { q: 'Pourquoi Pâques 2028 tombe-t-elle si tard ?', a: `Pâques est le premier dimanche après la première pleine lune du printemps, comptée à partir du 21 mars. En ${Y}, cette pleine lune n’arrive qu’en avril, d’où Pâques le ${D(ps, 'fr')}. La date la plus tardive possible est le 25 avril. Les vacances de Pâques flamandes commencent donc avant le dimanche de Pâques.` },
      { q: 'Le Nouvel An 2028 est-il remplacé ?', a: `Oui pour les travailleurs occupés du lundi au vendredi. Le 1er janvier ${Y} est un samedi ; à défaut d’autre accord, le remplacement a lieu le ${W(vv[0].date, 'fr')}. L’employeur affiche les remplacements de ${Y} avant le ${D(K.aanplakDatum(Y), 'fr')}. L’Armistice tombe lui aussi un samedi cette année-là.` },
      { q: 'Quels longs week-ends sans congé en 2028 ?', a: `Chaque jour férié un lundi ou un vendredi donne trois jours de repos : ${[...maandagen, ...lijst.filter((f) => K.weekday(K.fromIso(f.date)) === 5)].sort((a, b) => a.date.localeCompare(b.date)).map((f) => `${f.name.fr} (${D(f.date, 'fr')})`).join(', ')}. S’y ajoutent les lundis de remplacement.` },
    ],
    body: (h) => `<h2>Les jours fériés de 2028 en un tableau</h2>
${h.table(['Date', 'Jour', 'Jour férié'], lijst.map((f) => [D(f.date, 'fr'), h.wd(f.date), f.name.fr]), `Jours fériés légaux ${Y}`)}
<p>Un jour férié est payé comme un jour presté, selon la ${h.src('wet-1974', 'loi du 4 janvier 1974')}. La différence avec ${Y - 1} tient surtout aux jours de la semaine : trois fériés tombaient un week-end en ${Y - 1}, il n’y en a plus que deux, tous deux un samedi.</p>
<h2>Ponts d’été et de Noël</h2>
<p>La fête nationale tombe le ${W(nf, 'fr')} et offre d’elle-même un long week-end. L’Assomption, le ${W(oh, 'fr')}, fait du lundi ${D(K.plusDagen(oh, -1), 'fr')} un jour de pont. Noël le ${W(ks, 'fr')} donne le pont le plus large : congé du ${D(kerst.verlofVan, 'fr')} au ${D(kerst.verlofTot, 'fr')} pour ${kerst.vrij} jours de repos jusqu’au Nouvel An ${Y + 1}. Le détail est sur ${h.a('brugdagen-2028', 'ponts 2028')}.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y + 1 }, c: 'Voir les jours fériés d’une autre année' })}
<h2>Et pour l’année scolaire</h2>
<p>L’Ascension et la Pentecôte tombent fin mai et début juin ${Y}, dans les dernières semaines de l’année ${Y - 1}-${Y}. Les ${h.a('schoolvakanties-2027-2028', 'vacances scolaires 2027-2028')} montrent comment la Flandre et la Fédération Wallonie-Bruxelles placent leurs congés autour de cette Pâques tardive. Les règles de remplacement sont détaillées par le ${h.src('fod-feestdagen', 'SPF Emploi')}.</p>`,
  },
  en: {
    slug: 'public-holidays-2028', nav: 'Public holidays 2028', card: `Late Easter, ${maandagen.length} holidays on a Monday`,
    title: 'Public holidays 2028 Belgium: late Easter and long weekends',
    description: 'Public holidays 2028 in Belgium: Easter not until 16 April, New Year and Armistice Day on a Saturday with replacement days, and several Mondays. All ten dates.',
    h1: 'Public holidays in Belgium 2028',
    intro: 'Looking ahead to 2028: the ten statutory holidays with their weekdays, the two replacement days and the bridges. The tool shows any other year as well.',
    resume: `${Y} is a leap year with ${lp} days from Monday to Friday, and its holidays sit differently from ${Y - 1}. Easter is late, on ${D(ps, 'en')}, almost three weeks after ${Y - 1} (${D(ps27, 'en')}). Easter Monday therefore moves to ${D(pm, 'en')}, Ascension Day to ${D(hv, 'en')} and Whit Monday to ${D(pi, 'en')}. ${maandagen.length} holidays fall on a Monday, each a long weekend without using leave. Two fall on a Saturday, New Year’s Day and Armistice Day; unless something else is agreed, they are replaced on ${W(vv[0].date, 'en')} and ${W(vv[1].date, 'en')}. In all, ${wkn.length} holidays fall on weekdays, leaving ${wd} working days, or ${wdV} after the replacement days, against ${wd27} in ${Y - 1}. There are ${bd.length} true bridge days: ${bd.map((b) => W(b.verlofVan, 'en')).join(' and ')}.`,
    faqs: [
      { q: 'Why is Easter so late in 2028?', a: `Easter is the first Sunday after the first full moon of spring, counted from 21 March. In ${Y} that full moon only comes in April, so Easter falls on ${D(ps, 'en')}. The latest possible date is 25 April. Because of it, the Flemish Easter holidays begin before Easter Sunday that year.` },
      { q: 'Is New Year’s Day 2028 replaced?', a: `Yes, for employees working Monday to Friday. 1 January ${Y} is a Saturday; without another agreement the replacement is ${W(vv[0].date, 'en')}. Employers post the ${Y} replacement days before ${D(K.aanplakDatum(Y), 'en')}. Armistice Day also falls on a Saturday that year. On a six-day week it is not.` },
      { q: 'Which long weekends does 2028 offer without leave?', a: `Every holiday on a Monday or a Friday gives three days off: ${[...maandagen, ...lijst.filter((f) => K.weekday(K.fromIso(f.date)) === 5)].sort((a, b) => a.date.localeCompare(b.date)).map((f) => `${f.name.en} (${D(f.date, 'en')})`).join(', ')}. The Mondays used as replacement days come on top.` },
    ],
    body: (h) => `<h2>The 2028 holidays at a glance</h2>
${h.table(['Date', 'Weekday', 'Holiday'], lijst.map((f) => [D(f.date, 'en'), h.wd(f.date), f.name.en]), `Public holidays ${Y}`)}
<p>A public holiday is paid like a day worked, under the ${h.src('wet-1974', 'Act of 4 January 1974')}. The difference from ${Y - 1} lies mostly in the weekdays: three holidays fell at the weekend in ${Y - 1}, now only two do, both on a Saturday.</p>
<h2>Summer and Christmas bridges</h2>
<p>National Day falls on ${W(nf, 'en')} and makes a long weekend by itself. Assumption Day on ${W(oh, 'en')} turns Monday ${D(K.plusDagen(oh, -1), 'en')} into a bridge day. Christmas Day on ${W(ks, 'en')} gives the widest bridge: leave from ${D(kerst.verlofVan, 'en')} to ${D(kerst.verlofTot, 'en')} for ${kerst.vrij} days off up to New Year’s Day ${Y + 1}. Everything is on ${h.a('brugdagen-2028', 'bridge days 2028')}.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y + 1 }, c: 'See the holidays of another year' })}
<h2>What it means for the school year</h2>
<p>Ascension and Whit Monday fall in late May and early June ${Y}, in the last weeks of the ${Y - 1}-${Y} school year. ${h.a('schoolvakanties-2027-2028', 'School holidays 2027-2028')} shows how Flanders and the French-language system place their breaks around this late Easter. The replacement rules are published by the ${h.src('fod-feestdagen', 'federal employment service')}.</p>`,
  },
});
