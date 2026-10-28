/** Zomervakantie 2027 : VG et DG 1/7–31/8, FWB plus courte. Dates : moteur via _data.ts. */
import { defineGuide } from '../../lib/page-types';
import { K, VG, FWB, DG, P, D, W, WD, fd } from '../_data';

const Y = 2026;
const v = VG(Y), f = FWB(Y), g = DG(Y);
const vz = v.zomer!, fz = f.zomer!, gz = g.zomer!;
const nV = K.dagen(vz), nF = K.dagen(fz);
const wV = K.weekdagenIn(vz), wF = K.weekdagenIn(fz);
const v2 = VG(Y + 1), f2 = FWB(Y + 1);
const samen = (() => { let c = 0; for (let d = K.fromIso(vz.van); d <= K.fromIso(vz.tot); d++) if (!K.isWeekend(d) && d >= K.fromIso(fz.van) && d <= K.fromIso(fz.tot)) c++; return c; })();
const nf = fd(Y + 1, 'nationale-feestdag'), olv = fd(Y + 1, 'olv-hemelvaart');
const olvVerv = K.vervangingsdagen(Y + 1).find((x) => x.voor === 'olv-hemelvaart');
const fz28 = FWB(Y + 1).zomer!, vz28 = VG(Y + 1).zomer!;

export default defineGuide({
  id: 'zomervakantie-2027', group: 'school', order: 7, tool: 'vk', toolArg: { vak: 'zomer', sj: Y },
  related: ['paasvakantie-2027', 'schoolvakanties-2027-2028', 'feestdagen-2027', 'home'],
  sources: ['vg-vakanties', 'fwb-calendrier', 'dg-kalender', 'fod-feestdagen'],
  countdown: { date: vz.van, label: { nl: 'Nog tot de grote vakantie in Vlaanderen', fr: 'Avant les grandes vacances en Flandre', en: 'Until the Flemish summer holidays' } },
  nl: {
    slug: 'zomervakantie-2027', nav: 'Zomervakantie 2027', card: `Vlaanderen ${P(vz, 'nl')}`,
    title: 'Zomervakantie 2027: laatste schooldag en start in België',
    description: 'Zomervakantie 2027: in Vlaanderen en Ostbelgien van 1 juli tot 31 augustus, in het Franstalig onderwijs van 3 juli tot 29 augustus. Aftelling en nieuwe start.',
    h1: 'Zomervakantie 2027 in België',
    intro: 'Hoe lang het nog duurt tot de grote vakantie, wanneer de laatste schooldag valt en wanneer de school weer begint, voor elke Gemeenschap.',
    resume: `De zomervakantie 2027 begint in het Nederlandstalig onderwijs op ${W(vz.van, 'nl')} en loopt tot ${W(vz.tot, 'nl')}: ${nV} dagen, waarvan ${wV} weekdagen. De laatste schooldag is ${W(v.laatste!, 'nl')}, en het nieuwe schooljaar begint op ${W(v2.start!, 'nl')}. Ostbelgien volgt dezelfde data, van ${P(gz, 'nl')}. Het Franstalig onderwijs heeft sinds de hervorming van 2022 een kortere zomer: de lessen lopen door tot ${W(f.laatste!, 'nl')}, de vakantie duurt van ${W(fz.van, 'nl')} tot ${W(fz.tot, 'nl')}, ${nF} dagen of ${wF} weekdagen, en de school begint opnieuw op ${W(f2.start!, 'nl')}. Kinderen in beide systemen hebben ${samen} weekdagen samen vrij, het grootste gemeenschappelijke blok van het jaar. Tijdens de zomer vallen twee wettelijke feestdagen: de Nationale Feestdag op ${W(nf, 'nl')} en Onze-Lieve-Vrouw-Hemelvaart op ${W(olv, 'nl')}${olvVerv ? `, met ${D(olvVerv.date, 'nl')} als vervangingsdag voor werknemers zonder ander akkoord` : ''}.`,
    faqs: [
      { q: 'Wat is de laatste schooldag in Vlaanderen in 2027?', a: `${W(v.laatste!, 'nl')}. De regel: 30 juni, of de vrijdag ervoor als 30 juni in een weekend valt. Veel scholen laten de leerlingen die dag vroeger naar huis gaan; dat beslist de school zelf. Franstalige leerlingen gaan nog tot ${W(f.laatste!, 'nl')} naar school.` },
      { q: 'Waarom is de Franstalige zomervakantie korter?', a: `De Fédération Wallonie-Bruxelles laat de zomer sinds 2022 later beginnen en eerder eindigen, zodat de herfst- en de krokusvakantie elk twee weken konden duren. In 2027 duurt de zomer daar ${nF} dagen, tegenover ${nV} in Vlaanderen. Het nieuwe schooljaar begint er daarom al eind augustus.` },
      { q: 'Vallen er wettelijke feestdagen in de zomervakantie 2027?', a: `Twee: de Nationale Feestdag op ${W(nf, 'nl')} en Onze-Lieve-Vrouw-Hemelvaart op ${W(olv, 'nl')}. Voor de kinderen verandert dat niets, want ze zijn al vrij. Voor werkende ouders wel: valt een feestdag op een zondag, dan krijgen ze een vervangingsdag, ${olvVerv ? `in 2027 ${W(olvVerv.date, 'nl')}` : 'dit jaar geen'}, tenzij de sector of het bedrijf een andere dag kiest.` },
    ],
    body: (h) => `<h2>De zomer van 2027 per Gemeenschap</h2>
<p>De Vlaamse data staan op ${h.src('vg-vakanties', 'vlaanderen.be')}, de Franstalige op ${h.src('fwb-calendrier', 'enseignement.be')} en die van Ostbelgien in de ${h.src('dg-kalender', 'kalender van de Duitstalige Gemeenschap')}.</p>
${h.table(['Gemeenschap', 'Laatste schooldag', 'Zomervakantie', 'Weekdagen vrij', 'Nieuw schooljaar'], [['Vlaamse Gemeenschap', D(v.laatste!, 'nl'), P(vz, 'nl'), wV, D(v2.start!, 'nl')], ['Fédération Wallonie-Bruxelles', D(f.laatste!, 'nl'), P(fz, 'nl'), wF, D(f2.start!, 'nl')], ['Duitstalige Gemeenschap', D(g.laatste!, 'nl'), P(gz, 'nl'), K.weekdagenIn(gz), D(DG(Y + 1).start!, 'nl')]], 'Zomervakantie 2027', ['l', 'l', 'l', 'r', 'l'])}
<h2>Feestdagen en verlof in juli en augustus</h2>
<p>Voor werkende ouders vallen er twee feestdagen in de zomer. De Nationale Feestdag is een ${WD(nf, 'nl')}; Onze-Lieve-Vrouw-Hemelvaart valt op een ${WD(olv, 'nl')} en wordt dan volgens de regels van de ${h.src('fod-feestdagen', 'FOD Werkgelegenheid')} vervangen. Alle feestdagen en vervangingsdagen staan op ${h.a('feestdagen-2027', 'feestdagen 2027')}.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y + 1 }, c: 'Alle feestdagen van het jaar' })}
<h2>De zomer van 2028</h2>
<p>Een jaar later duurt de Vlaamse zomer opnieuw van ${P(vz28, 'nl')}; het Franstalig onderwijs is vrij van ${P(fz28, 'nl')}. Het hele schooljaar staat op ${h.a('schoolvakanties-2027-2028', 'schoolvakanties 2027-2028')}.</p>`,
  },
  fr: {
    slug: 'vacances-d-ete-2027', nav: 'Vacances d’été 2027', card: `FWB ${P(fz, 'fr')}`,
    title: 'Vacances d’été 2027 : dernier jour de classe et rentrée',
    description: 'Vacances d’été 2027 : du 3 juillet au 29 août en Fédération Wallonie-Bruxelles, du 1er juillet au 31 août en Flandre. Compte à rebours, dernier jour et rentrée.',
    h1: 'Vacances d’été 2027 en Belgique',
    intro: 'Le temps qu’il reste avant les grandes vacances, le dernier jour de classe et la date de la rentrée, dans les trois Communautés.',
    resume: `En Fédération Wallonie-Bruxelles, les grandes vacances 2027 vont du ${W(fz.van, 'fr')} au ${W(fz.tot, 'fr')} : ${nF} jours, dont ${wF} jours de semaine. Le dernier jour de classe est le ${W(f.laatste!, 'fr')}, et la rentrée suivante a lieu le ${W(f2.start!, 'fr')}. C’est la conséquence de la réforme des rythmes scolaires : l’été francophone a été raccourci pour allonger la Toussaint et le congé de détente à deux semaines. En Flandre et en Ostbelgien, l’été garde ses deux mois pleins, du ${P(vz, 'fr')}, soit ${nV} jours ; les cours s’y arrêtent le ${W(v.laatste!, 'fr')} et reprennent le ${W(v2.start!, 'fr')}. Les enfants des deux réseaux partagent ${samen} jours de semaine de congé, le plus long bloc commun de l’année. Deux jours fériés légaux tombent pendant l’été : la fête nationale, le ${W(nf, 'fr')}, et l’Assomption, le ${W(olv, 'fr')}${olvVerv ? `, remplacée pour les travailleurs par le ${D(olvVerv.date, 'fr')} à défaut d’autre accord` : ''}.`,
    faqs: [
      { q: 'Quel est le dernier jour d’école en juillet 2027 ?', a: `Le ${W(f.laatste!, 'fr')} pour les écoles de la Fédération Wallonie-Bruxelles. Les écoles néerlandophones terminent plus tôt, le ${W(v.laatste!, 'fr')}. Les grandes vacances commencent le ${W(fz.van, 'fr')}. Beaucoup d’écoles libèrent les élèves plus tôt ce dernier jour ; c’est l’école qui décide.` },
      { q: 'Combien de semaines durent les grandes vacances francophones ?', a: `Un peu plus de huit semaines en 2027 : ${nF} jours, du ${D(fz.van, 'fr')} au ${D(fz.tot, 'fr')}. Avant la réforme de 2022, elles duraient tout juillet et août, comme en Flandre. La rentrée a donc lieu fin août plutôt que début septembre.` },
      { q: 'Y a-t-il des jours fériés pendant l’été 2027 ?', a: `Deux : la fête nationale le ${W(nf, 'fr')} et l’Assomption le ${W(olv, 'fr')}. Pour les élèves, cela ne change rien puisqu’ils sont déjà en vacances. Pour les parents salariés, un jour férié tombant un dimanche est remplacé, ${olvVerv ? `en 2027 par le ${W(olvVerv.date, 'fr')}` : 'ce qui n’arrive pas cette année'}, sauf si le secteur ou l’entreprise choisit un autre jour.` },
    ],
    body: (h) => `<h2>L’été 2027 par Communauté</h2>
<p>Les dates proviennent du ${h.src('fwb-calendrier', 'calendrier de la Fédération Wallonie-Bruxelles')}, de ${h.src('vg-vakanties', 'vlaanderen.be')} et du ${h.src('dg-kalender', 'calendrier germanophone')}.</p>
${h.table(['Communauté', 'Dernier jour', 'Vacances d’été', 'Jours de semaine', 'Rentrée'], [['Fédération Wallonie-Bruxelles', D(f.laatste!, 'fr'), P(fz, 'fr'), wF, D(f2.start!, 'fr')], ['Communauté flamande', D(v.laatste!, 'fr'), P(vz, 'fr'), wV, D(v2.start!, 'fr')], ['Communauté germanophone', D(g.laatste!, 'fr'), P(gz, 'fr'), K.weekdagenIn(gz), D(DG(Y + 1).start!, 'fr')]], 'Vacances d’été 2027', ['l', 'l', 'l', 'r', 'l'])}
<h2>Jours fériés de l’été</h2>
<p>La fête nationale tombe un ${WD(nf, 'fr')}. L’Assomption tombe un ${WD(olv, 'fr')} ; le ${h.src('fod-feestdagen', 'SPF Emploi')} prévoit alors un jour de remplacement pour les travailleurs. Le détail est sur ${h.a('feestdagen-2027', 'jours fériés 2027')}.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y + 1 }, c: 'Tous les jours fériés de l’année' })}
<h2>L’été 2028</h2>
<p>L’année suivante, la Fédération sera en vacances du ${P(fz28, 'fr')} et la Flandre du ${P(vz28, 'fr')}. Toute l’année est sur ${h.a('schoolvakanties-2027-2028', 'vacances scolaires 2027-2028')}.</p>`,
  },
  en: {
    slug: 'summer-holidays-2027', nav: 'Summer holidays 2027', card: `Flanders ${P(vz, 'en')}`,
    title: 'Summer holidays 2027 Belgium: last school day and new term',
    description: 'Summer holidays 2027 in Belgium: 1 July to 31 August in Flemish and German-speaking schools, 3 July to 29 August in French-language schools. With a countdown.',
    h1: 'Summer holidays 2027 in Belgium',
    intro: 'How long until the summer holidays, the last day of school and the first day back, for each of the three Communities.',
    resume: `Flemish schools break up for the summer of 2027 after ${W(v.laatste!, 'en')}. The holidays run from ${W(vz.van, 'en')} to ${W(vz.tot, 'en')}, ${nV} days of which ${wV} are weekdays, and the new year starts on ${W(v2.start!, 'en')}. Ostbelgien uses the same two months, ${P(gz, 'en')}. French-language schools have a shorter summer since the 2022 reform shortened it to lengthen the autumn and carnival breaks: lessons continue until ${W(f.laatste!, 'en')}, the holidays run ${W(fz.van, 'en')} to ${W(fz.tot, 'en')}, ${nF} days or ${wF} weekdays, and school starts again on ${W(f2.start!, 'en')}. Children in both systems share ${samen} weekdays off, the largest common block of the year. Two public holidays fall in the summer: National Day on ${W(nf, 'en')} and Assumption Day on ${W(olv, 'en')}${olvVerv ? `, replaced for employees by ${D(olvVerv.date, 'en')} unless another day is agreed` : ''}.`,
    faqs: [
      { q: 'What is the last day of school in Flanders in 2027?', a: `${W(v.laatste!, 'en')}. The rule is 30 June, or the Friday before when 30 June falls at a weekend. French-language schools finish on ${W(f.laatste!, 'en')}. Many schools let pupils go home early on that last day; the school decides.` },
      { q: 'Why is the French-language summer holiday shorter?', a: `Since 2022 the Fédération Wallonie-Bruxelles starts the summer later and ends it earlier, so that the autumn and carnival breaks can last two weeks each. Its 2027 summer lasts ${nF} days, against ${nV} in Flanders. The new school year therefore starts in late August.` },
      { q: 'Are there public holidays during the 2027 summer break?', a: `Two: National Day on ${W(nf, 'en')} and Assumption Day on ${W(olv, 'en')}. For pupils nothing changes, since they are already on holiday. For working parents it matters: a public holiday falling on a Sunday is replaced, ${olvVerv ? `in 2027 by ${W(olvVerv.date, 'en')}` : 'which does not happen this year'}, unless the sector or employer picks another day.` },
    ],
    body: (h) => `<h2>Summer 2027 by Community</h2>
<p>Sources: ${h.src('vg-vakanties', 'vlaanderen.be')}, ${h.src('fwb-calendrier', 'enseignement.be')} and the ${h.src('dg-kalender', 'German-speaking Community’s calendar')}.</p>
${h.table(['Community', 'Last day', 'Summer holidays', 'Weekdays off', 'New year'], [['Flemish Community', D(v.laatste!, 'en'), P(vz, 'en'), wV, D(v2.start!, 'en')], ['Fédération Wallonie-Bruxelles', D(f.laatste!, 'en'), P(fz, 'en'), wF, D(f2.start!, 'en')], ['German-speaking Community', D(g.laatste!, 'en'), P(gz, 'en'), K.weekdagenIn(gz), D(DG(Y + 1).start!, 'en')]], 'Summer holidays 2027', ['l', 'l', 'l', 'r', 'l'])}
<h2>Public holidays during the summer</h2>
<p>National Day is a ${WD(nf, 'en')}. Assumption Day is a ${WD(olv, 'en')}, so under the rules set out by the ${h.src('fod-feestdagen', 'federal employment service')} employees get a replacement day. Every holiday is listed on ${h.a('feestdagen-2027', 'public holidays 2027')}.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y + 1 }, c: 'All public holidays of the year' })}
<h2>Summer 2028</h2>
<p>The following summer, Flemish schools are off ${P(vz28, 'en')} and French-language schools ${P(fz28, 'en')}. The whole year is on ${h.a('schoolvakanties-2027-2028', 'school holidays 2027-2028')}.</p>`,
  },
});
