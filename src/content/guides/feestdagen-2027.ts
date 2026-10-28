/** Feestdagen 2027 : drie feestdagen in het weekend, vroege Pasen, mei vol feestdagen. Data : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, VG, D, W, fd } from '../_data';

const Y = 2027;
const lijst = K.wettelijke(Y);
const vv = K.vervangingsdagen(Y);
const wkn = K.opWeekdag(lijst);
const weekend = lijst.filter((f) => K.isWeekend(K.fromIso(f.date)));
const ps = K.paaszondag(Y);
const pm = fd(Y, 'paasmaandag'), hv = fd(Y, 'hemelvaart'), pi = fd(Y, 'pinkstermaandag'), nf = fd(Y, 'nationale-feestdag');
const bd = K.brugdagen(Y);
const gem = K.GEMEENSCHAPPEN.map((g) => ({ g, date: K.toIso(K.dayNum(Y, K.GEM_FEEST[g].m, K.GEM_FEEST[g].d)) }));
const paas = VG(Y - 1).pasen;
const p10 = K.optimaliseer(Y, 10, { vervanging: 'volgende' });
const ps28 = K.paaszondag(Y + 1);
const mei = lijst.filter((f) => f.date.slice(5, 7) === '05');

export default defineGuide({
  id: 'feestdagen-2027', group: 'feestdagen', order: 12, tool: 'ft', toolArg: { jaar: Y },
  related: ['vervangingsdagen-2027', 'brugdagen-2027', 'werkdagen-2027', 'feestdagen-2028'],
  sources: ['wet-1974', 'fod-feestdagen', 'ostern-ptb'],
  nl: {
    slug: 'feestdagen-2027', nav: 'Feestdagen 2027', card: `${wkn.length} op een weekdag, ${vv.length} vervangingsdagen`,
    title: 'Feestdagen 2027 België: alle data en de vervangingsdagen',
    description: `Feestdagen 2027 in België: alle tien wettelijke feestdagen met hun weekdag, de ${vv.length} vervangingsdagen voor feestdagen in het weekend en de brugdagen van het jaar.`,
    h1: 'Wettelijke feestdagen 2027 in België',
    intro: 'De tien wettelijke feestdagen van 2027 met hun weekdag en, voor de feestdagen in het weekend, de vervangingsdag zonder akkoord. Kies een ander jaar in de rekenaar.',
    resume: `In ${Y} vallen ${wkn.length} van de tien Belgische feestdagen op een weekdag, en ${weekend.length} in het weekend: de Dag van de Arbeid op ${W(fd(Y, 'dag-van-de-arbeid'), 'nl')}, Onze-Lieve-Vrouw-Hemelvaart op ${W(fd(Y, 'olv-hemelvaart'), 'nl')} en Kerstmis op ${W(fd(Y, 'kerstmis'), 'nl')}. Die drie geven recht op een vervangingsdag. Zonder andere afspraak in de sector of de onderneming wordt dat ${vv.map((x) => W(x.date, 'nl')).join(', ').replace(/, ([^,]*)$/, ' en $1')}. Pasen valt vroeg, op ${D(ps, 'nl')}, en dus ook Paasmaandag (${D(pm, 'nl')}), Hemelvaart (${D(hv, 'nl')}) en Pinkstermaandag (${D(pi, 'nl')}). Het jaar telt ${bd.length} echte brugdagen, telkens een vrijdag: ${bd.map((b) => D(b.verlofVan, 'nl')).join(' en ')}. Wie tien verlofdagen slim plaatst, haalt er ${p10.vrij} vrije dagen uit. De nationale feestdag valt op ${W(nf, 'nl')}, midden in de zomervakantie van de scholen.`,
    faqs: [
      { q: 'Welke feestdagen van 2027 vallen in het weekend?', a: `Drie: ${weekend.map((f) => `${f.name.nl} (${W(f.date, 'nl')})`).join(', ')}. Werknemers in een vijfdagenweek krijgen voor elk een vervangingsdag. In een zesdagenweek wordt alleen de feestdag op zondag vervangen. De vervangingsdagen ziet u in de laatste kolom van de tabel.` },
      { q: 'Wanneer is Pinkstermaandag 2027?', a: `Op ${W(pi, 'nl')}, vijftig dagen na Pasen (${D(ps, 'nl')}). Hemelvaart valt elf dagen eerder, op ${W(hv, 'nl')}. Beide zijn ook vrije dagen op school; in Vlaanderen is daarnaast de vrijdag na Hemelvaart vrij, wat een lang weekend van vier dagen geeft.` },
      { q: 'Is 11 juli een feestdag in 2027?', a: `Niet wettelijk. De feestdag van de Vlaamse Gemeenschap (${W(gem[0].date, 'nl')}) is vrij voor de Vlaamse overheid en in sommige sectoren, maar geen wettelijke feestdag voor de privésector. Hetzelfde geldt voor 27 september in de Fédération Wallonie-Bruxelles (${W(gem[1].date, 'nl')}) en 15 november in de Duitstalige Gemeenschap (${W(gem[2].date, 'nl')}).` },
    ],
    body: (h) => `<h2>Alle feestdagen van 2027</h2>
${h.table(['Datum', 'Weekdag', 'Feestdag', 'Vervangingsdag zonder akkoord'], lijst.map((f) => { const r = vv.find((x) => x.voor === f.id); return [D(f.date, 'nl'), h.wd(f.date), f.name.nl, r ? W(r.date, 'nl') : '–']; }), `De tien wettelijke feestdagen ${Y}`)}
<p>De lijst komt uit het koninklijk besluit van 18 april 1974 bij de ${h.src('wet-1974', 'feestdagenwet')}. De beweeglijke feestdagen volgen uit Pasen, dat we berekenen met de formule van Gauss en controleren met de ${h.src('ostern-ptb', 'paastabel van de PTB')}; de berekening zelf staat op ${h.a('pasen-2027', 'Pasen 2027')}.</p>
<h2>Een volle meimaand</h2>
<p>Mei telt in ${Y} ${mei.length} feestdagen, maar de Dag van de Arbeid valt op zaterdag. De vervangingsdag zonder akkoord is ${W(vv[0].date, 'nl')}, waardoor de week van Hemelvaart begint met een vrije maandag. Zo ontstaat de beste brug van het jaar: verlof op dinsdag, woensdag en vrijdag geeft negen dagen vrij. De ${h.a('brugdagen-2027', 'brugdagen 2027')} rekenen alle varianten uit.</p>
${h.mini('bt', { p: ['verlof'], d: { jaar: Y, verlof: 3 }, c: 'Uw verlof 2027 rond de feestdagen leggen' })}
<h2>Feestdagen en schoolvakanties</h2>
<p>Paasmaandag is in Vlaanderen de eerste dag van de paasvakantie (${h.per(paas)}). In het Franstalig onderwijs is het een losse vrije dag, want de lentevakantie volgt pas eind april. Hoe de ${h.src('fod-feestdagen', 'FOD Werkgelegenheid')} de vervanging regelt, leest u op ${h.a('vervangingsdagen-2027', 'vervangingsdagen 2027')}. In ${Y + 1} valt Pasen op ${D(ps28, 'nl')}, zie ${h.a('feestdagen-2028', 'feestdagen 2028')}.</p>`,
  },
  fr: {
    slug: 'jours-feries-2027', nav: 'Jours fériés 2027', card: `${wkn.length} en semaine, ${vv.length} jours de remplacement`,
    title: 'Jours fériés 2027 en Belgique : dates et remplacements',
    description: `Jours fériés 2027 en Belgique : les dix jours fériés légaux avec leur jour de la semaine, les ${vv.length} remplacements des fériés du week-end et les ponts de 2027.`,
    h1: 'Jours fériés légaux 2027 en Belgique',
    intro: 'Les dix jours fériés légaux de 2027, leur jour de la semaine et, pour ceux qui tombent un week-end, le jour de remplacement par défaut. L’outil change d’année.',
    resume: `En ${Y}, ${wkn.length} des dix jours fériés belges tombent en semaine et ${weekend.length} un week-end : la fête du Travail le ${W(fd(Y, 'dag-van-de-arbeid'), 'fr')}, l’Assomption le ${W(fd(Y, 'olv-hemelvaart'), 'fr')} et Noël le ${W(fd(Y, 'kerstmis'), 'fr')}. Chacun ouvre le droit à un jour de remplacement, qui tombe à défaut d’accord le ${vv.map((x) => W(x.date, 'fr')).join(', le ').replace(/, le ([^,]*)$/, ' et le $1')}. Pâques est précoce, le ${D(ps, 'fr')}, ce qui avance le lundi de Pâques (${D(pm, 'fr')}), l’Ascension (${D(hv, 'fr')}) et la Pentecôte (lundi ${D(pi, 'fr')}). L’année offre ${bd.length} vrais ponts, deux vendredis : le ${bd.map((b) => D(b.verlofVan, 'fr')).join(' et le ')}. Dix jours de congé bien placés rapportent ${p10.vrij} jours de repos. La fête nationale tombe le ${W(nf, 'fr')}, pendant les grandes vacances. Au total, l’année compte ${K.weekdagen(Y)} jours du lundi au vendredi, dont ${wkn.length} fériés.`,
    faqs: [
      { q: 'Quels jours fériés de 2027 tombent un week-end ?', a: `Trois : ${weekend.map((f) => `${f.name.fr} (${W(f.date, 'fr')})`).join(', ')}. Les travailleurs en semaine de cinq jours ont droit à un remplacement pour chacun. En semaine de six jours, seul le férié du dimanche est remplacé.` },
      { q: 'Quelle est la date du lundi de Pentecôte 2027 ?', a: `Le ${W(pi, 'fr')}, cinquante jours après Pâques (${D(ps, 'fr')}). L’Ascension tombe onze jours plus tôt, le ${W(hv, 'fr')}. Les deux sont aussi des jours sans école ; en Flandre, le vendredi après l’Ascension l’est également. Les deux font aussi partie du calendrier des écoles francophones.` },
      { q: 'Le 27 septembre 2027 est-il férié ?', a: `Pas légalement. La fête de la Fédération Wallonie-Bruxelles (${W(gem[1].date, 'fr')}) est chômée dans ses administrations et ses écoles, mais n’est pas un jour férié pour le secteur privé. Il en va de même du 11 juillet en Flandre (${W(gem[0].date, 'fr')}) et du 15 novembre en Communauté germanophone (${W(gem[2].date, 'fr')}).` },
    ],
    body: (h) => `<h2>Tous les jours fériés de 2027</h2>
${h.table(['Date', 'Jour', 'Jour férié', 'Remplacement par défaut'], lijst.map((f) => { const r = vv.find((x) => x.voor === f.id); return [D(f.date, 'fr'), h.wd(f.date), f.name.fr, r ? W(r.date, 'fr') : '–']; }), `Les dix jours fériés légaux ${Y}`)}
<p>La liste vient de l’arrêté royal du 18 avril 1974 pris en exécution de la ${h.src('wet-1974', 'loi sur les jours fériés')}. Les fêtes mobiles découlent de Pâques, que nous calculons avec la formule de Gauss et vérifions avec la ${h.src('ostern-ptb', 'table de Pâques de la PTB')} ; le détail du calcul est sur ${h.a('pasen-2027', 'Pâques 2027')}.</p>
<h2>Un mois de mai chargé</h2>
<p>Mai ${Y} compte ${mei.length} jours fériés, mais la fête du Travail tombe un samedi. Son remplacement par défaut, le ${W(vv[0].date, 'fr')}, ouvre la semaine de l’Ascension par un lundi libre. D’où le meilleur pont de l’année : trois jours de congé, mardi, mercredi et vendredi, pour neuf jours de repos. Les ${h.a('brugdagen-2027', 'ponts 2027')} détaillent toutes les variantes.</p>
${h.mini('bt', { p: ['verlof'], d: { jaar: Y, verlof: 3 }, c: 'Placer vos congés 2027 autour des fériés' })}
<h2>Jours fériés et congés scolaires</h2>
<p>En Fédération Wallonie-Bruxelles, le lundi de Pâques est un congé isolé : les vacances de printemps ne commencent que fin avril. En Flandre, il ouvre les vacances de Pâques (${h.per(paas)}). La façon dont le ${h.src('fod-feestdagen', 'SPF Emploi')} organise le remplacement est expliquée sur ${h.a('vervangingsdagen-2027', 'jours de remplacement 2027')}. En ${Y + 1}, Pâques tombera le ${D(ps28, 'fr')} : voir ${h.a('feestdagen-2028', 'jours fériés 2028')}.</p>`,
  },
  en: {
    slug: 'public-holidays-2027', nav: 'Public holidays 2027', card: `${wkn.length} on weekdays, ${vv.length} replacement days`,
    title: 'Public holidays 2027 Belgium: all ten dates and replacements',
    description: `Public holidays 2027 in Belgium: all ten statutory holidays with their weekdays, the ${vv.length} replacement days for holidays at the weekend and the year’s bridge days.`,
    h1: 'Public holidays in Belgium 2027',
    intro: 'Belgium’s ten statutory public holidays in 2027 with their weekdays and, for those at the weekend, the default replacement day. Pick another year in the tool.',
    resume: `In ${Y}, ${wkn.length} of Belgium’s ten public holidays fall on a weekday and ${weekend.length} at the weekend: Labour Day on ${W(fd(Y, 'dag-van-de-arbeid'), 'en')}, Assumption Day on ${W(fd(Y, 'olv-hemelvaart'), 'en')} and Christmas Day on ${W(fd(Y, 'kerstmis'), 'en')}. Each of those three earns employees a replacement day, which by default falls on ${vv.map((x) => W(x.date, 'en')).join(', ').replace(/, ([^,]*)$/, ' and $1')}, unless the sector or the company has agreed otherwise. Easter is early, on ${D(ps, 'en')}, which brings forward Easter Monday (${D(pm, 'en')}), Ascension Day (${D(hv, 'en')}) and Whit Monday (${D(pi, 'en')}). There are ${bd.length} true bridge days, both Fridays: ${bd.map((b) => D(b.verlofVan, 'en')).join(' and ')}. Ten well-placed leave days give ${p10.vrij} days off. National Day falls on ${W(nf, 'en')}, in the middle of the school summer holidays.`,
    faqs: [
      { q: 'Which 2027 public holidays fall at the weekend?', a: `Three: ${weekend.map((f) => `${f.name.en} (${W(f.date, 'en')})`).join(', ')}. Employees on a five-day week get a replacement day for each. On a six-day week, only the Sunday holiday is replaced. The default dates are in the last column of the table below.` },
      { q: 'What is the date of Whit Monday 2027?', a: `${W(pi, 'en')}, fifty days after Easter Sunday (${D(ps, 'en')}). Ascension Day falls eleven days earlier, on ${W(hv, 'en')}. Both are school holidays too; in Flanders the Friday after Ascension is also off, which gives Flemish pupils a four-day weekend.` },
      { q: 'Is 11 July a public holiday in 2027?', a: `Not by law. Flemish Community Day (${W(gem[0].date, 'en')}) is a day off for the Flemish administration and in some sectors, but not a statutory holiday for private employers. The same goes for 27 September in the Wallonia-Brussels Federation (${W(gem[1].date, 'en')}) and 15 November in the German-speaking Community (${W(gem[2].date, 'en')}).` },
    ],
    body: (h) => `<h2>Every public holiday in 2027</h2>
${h.table(['Date', 'Weekday', 'Holiday', 'Default replacement'], lijst.map((f) => { const r = vv.find((x) => x.voor === f.id); return [D(f.date, 'en'), h.wd(f.date), f.name.en, r ? W(r.date, 'en') : '–']; }), `The ten public holidays ${Y}`)}
<p>The list comes from the Royal Decree of 18 April 1974 under the ${h.src('wet-1974', 'Public Holidays Act')}. The movable feasts follow from Easter, which we compute with Gauss’s formula and check against the ${h.src('ostern-ptb', 'PTB Easter table')}; the working is on ${h.a('pasen-2027', 'Easter 2027')}.</p>
<h2>A crowded May</h2>
<p>May ${Y} has ${mei.length} holidays, but Labour Day falls on a Saturday. Its default replacement, ${W(vv[0].date, 'en')}, starts Ascension week with a free Monday. That creates the best bridge of the year: leave on the Tuesday, Wednesday and Friday gives nine days off. ${h.a('brugdagen-2027', 'Bridge days 2027')} works out every option.</p>
${h.mini('bt', { p: ['verlof'], d: { jaar: Y, verlof: 3 }, c: 'Fit your 2027 leave around the holidays' })}
<h2>Holidays and school breaks</h2>
<p>In Flanders, Easter Monday opens the Easter holidays (${h.per(paas)}). In French-language schools it is a single day off, as the spring break only starts in late April. How the ${h.src('fod-feestdagen', 'federal employment service')} handles replacement is set out on ${h.a('vervangingsdagen-2027', 'replacement days 2027')}. In ${Y + 1}, Easter falls on ${D(ps28, 'en')}; see ${h.a('feestdagen-2028', 'public holidays 2028')}.</p>`,
  },
});
