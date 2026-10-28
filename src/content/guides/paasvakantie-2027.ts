/** Paasvakantie 2027 (VG, DG) et vacances de printemps 2027 (FWB, non liées à Pâques). Dates : moteur via _data.ts. */
import { defineGuide } from '../../lib/page-types';
import type { Lang } from '../../lib/format';
import { K, VG, FWB, DG, P, D, W, nDagen, fd } from '../_data';

const Y = 2026;
const vp = VG(Y).pasen, fp = FWB(Y).pasen, gp = DG(Y).pasen!;
const nV = nDagen('VG', Y, 'pasen'), nF = nDagen('FWB', Y, 'pasen'), nG = nDagen('DG', Y, 'pasen');
const ps = K.paaszondag(Y + 1), pm = fd(Y + 1, 'paasmaandag'), hv = fd(Y + 1, 'hemelvaart');
const weken = Math.round((K.fromIso(fp.van) - K.fromIso(vp.tot) - 1) / 7);
const nog = (l: Lang) => (l === 'nl' ? 'nog niet gepubliceerd' : l === 'fr' ? 'pas encore publié' : 'not yet published');
const rij = (l: Lang) => [Y, Y + 1, Y + 2, Y + 3].map((y) => {
  const c = (g: 'VG' | 'FWB' | 'DG') => { const p = K.kalender(g, y)?.pasen; return p ? P(g === 'DG' ? K.blok(p) : p, l) : nog(l); };
  return [String(y + 1), D(K.paaszondag(y + 1), l), c('VG'), c('FWB'), c('DG')];
});

export default defineGuide({
  id: 'paasvakantie-2027', group: 'school', order: 6, tool: 'vk', toolArg: { vak: 'pasen', sj: Y },
  related: ['krokusvakantie-2027', 'zomervakantie-2027', 'pasen-2027', 'vergelijker'],
  sources: ['vg-vakanties', 'fwb-calendrier', 'dg-kalender'],
  countdown: { date: vp.van, label: { nl: 'Nog tot de paasvakantie in Vlaanderen', fr: 'Avant les vacances de Pâques en Flandre', en: 'Until the Flemish Easter holidays' } },
  nl: {
    slug: 'paasvakantie-2027', nav: 'Paasvakantie 2027', card: `Vlaanderen ${P(vp, 'nl')}, Franstalig in mei`,
    title: 'Paasvakantie 2027: data in Vlaanderen, Brussel en Wallonië',
    description: 'Paasvakantie 2027: van 29 maart tot 11 april in Vlaanderen. Het Franstalig onderwijs heeft lentevakantie van 26 april tot 9 mei. Met aftelling en data tot 2030.',
    h1: 'Paasvakantie 2027 in België',
    intro: 'Hoe lang het nog duurt tot de paasvakantie, en waarom het Franstalig onderwijs pas eind april vrij is. Kies het onderwijs en het schooljaar.',
    resume: `De paasvakantie 2027 loopt in het Nederlandstalig onderwijs van ${W(vp.van, 'nl')} tot ${W(vp.tot, 'nl')}, twee weken of ${nV} dagen met de weekends. Omdat Pasen dit jaar in maart valt, op ${D(ps, 'nl')}, begint de vakantie op Paasmaandag: dat schrijft de Vlaamse regel voor als Pasen vóór 1 april ligt. Ostbelgien heeft vrij van ${P(gp, 'nl')}, maandag tot vrijdag. Het Franstalig onderwijs volgt sinds 2022 een eigen ritme en heeft geen paasvakantie meer, maar een lentevakantie van ${W(fp.van, 'nl')} tot ${W(fp.tot, 'nl')}, ${nF} dagen op een rij, ruim ${weken} weken na de Vlaamse. Paasmaandag, ${D(pm, 'nl')}, is daar een losse vrije dag, en Hemelvaartsdag, ${D(hv, 'nl')}, valt midden in de lentevakantie. Wie kinderen in beide netten heeft, telt in het voorjaar dus vier vakantieweken die elkaar niet raken.`,
    faqs: [
      { q: 'Wanneer begint de Vlaamse paasvakantie als Pasen in maart valt?', a: `Dan begint ze op Paasmaandag en duurt ze twee weken, zoals in 2027: ${P(vp, 'nl')}. Valt Pasen na 15 april, dan begint ze twee maandagen voor Pasen; in de andere jaren op de eerste maandag van april.` },
      { q: 'Heeft het Franstalig onderwijs nog paasvakantie?', a: `Niet meer onder die naam. Sinds de hervorming heet ze vacances de printemps en ligt ze los van Pasen, in ${Y + 1} van ${P(fp, 'nl')}. Alleen Paasmaandag blijft er een vrije dag. Voor gezinnen met kinderen in beide netten betekent dat meestal twee aparte vakanties in het voorjaar.` },
      { q: 'Is de vrijdag na Hemelvaart 2027 vrij op school?', a: `In het Vlaamse onderwijs wel: ${D(hv, 'nl')} en ${D(K.plusDagen(hv, 1), 'nl')} zijn vrij. In het Franstalig onderwijs valt Hemelvaart dit jaar in de lentevakantie. Ostbelgien geeft alleen Hemelvaartsdag zelf vrij. Voor werkende ouders is die vrijdag geen feestdag maar een klassieke brugdag.` },
    ],
    body: (h) => `<h2>Paas- en lentevakantie 2027 per Gemeenschap</h2>
<p>De data komen van ${h.src('vg-vakanties', 'vlaanderen.be')}, ${h.src('fwb-calendrier', 'enseignement.be')} en de ${h.src('dg-kalender', 'Duitstalige Gemeenschap')}. Vlaanderen en Ostbelgien zijn rond Pasen vrij; Ostbelgien publiceert twee lesweken van maandag tot vrijdag. De Franstalige scholen hebben hun voorjaarsvakantie pas in april en mei.</p>
${h.table(['Gemeenschap', 'Vakantie', 'Dagen'], [['Vlaamse Gemeenschap', P(vp, 'nl'), nV], ['Duitstalige Gemeenschap', P(K.blok(gp), 'nl'), nG], ['Fédération Wallonie-Bruxelles (lente)', P(fp, 'nl'), nF]], 'Voorjaarsvakantie 2027, weekends inbegrepen', ['l', 'l', 'r'])}
<h2>De paasvakantie in de volgende jaren</h2>
<p>De Vlaamse paasvakantie hangt aan Pasen en verschuift elk jaar. In 2028 valt Pasen laat, en dan lopen ook de Vlaamse en de Duitstalige data uiteen. De Franstalige lentevakantie ligt altijd eind april of begin mei.</p>
${h.table(['Jaar', 'Paaszondag', 'Vlaanderen', 'Franstalig (lente)', 'Ostbelgien'], rij('nl'), 'Paas- en lentevakantie per jaar, weekends inbegrepen')}
<h2>Twee kinderen, vier weken</h2>
<p>De twee voorjaarsvakanties overlappen in 2027 geen enkele dag. Vergelijk het hele schooljaar met de rekenaar hieronder, of bekijk de berekening van Pasen op ${h.a('pasen-2027', 'Pasen 2027')}.</p>
${h.mini('vg', { p: ['a', 'b'], c: 'Beide kalenders naast elkaar' })}`,
  },
  fr: {
    slug: 'vacances-de-printemps-2027', nav: 'Vacances de printemps 2027', card: `FWB ${P(fp, 'fr')}, Flandre à Pâques`,
    title: 'Vacances de printemps 2027 : dates et Pâques en Flandre',
    description: 'Vacances de printemps 2027 : du 26 avril au 9 mai en Fédération Wallonie-Bruxelles, Pâques du 29 mars au 11 avril en Flandre. Décompte et années suivantes.',
    h1: 'Vacances de printemps 2027 en Belgique',
    intro: 'Les dates du congé de printemps francophone et des vacances de Pâques flamandes et germanophones, avec le compte à rebours. Choisissez l’enseignement dans l’outil.',
    resume: `En Fédération Wallonie-Bruxelles, les vacances de printemps 2027 vont du ${W(fp.van, 'fr')} au ${W(fp.tot, 'fr')}, soit ${nF} jours d’affilée week-ends compris. Depuis la réforme de 2022, elles ne dépendent plus de Pâques : elles coupent le dernier long trimestre et tombent fin avril ou début mai. Le lundi de Pâques, ${D(pm, 'fr')}, reste un jour de congé isolé, et le jeudi de l’Ascension, ${D(hv, 'fr')}, tombe cette année pendant les vacances. Les écoles néerlandophones gardent de vraies vacances de Pâques : du ${W(vp.van, 'fr')} au ${W(vp.tot, 'fr')}, ${nV} jours. Comme Pâques tombe en mars, le ${D(ps, 'fr')}, la règle flamande les fait commencer le lundi de Pâques. L’Ostbelgien a congé du ${P(gp, 'fr')}, du lundi au vendredi. Entre les deux congés de printemps, il s’écoule environ ${weken} semaines : une famille aux enfants dans les deux réseaux compte quatre semaines de congé distinctes.`,
    faqs: [
      { q: 'Pourquoi les vacances de printemps ne tombent-elles plus à Pâques ?', a: 'La réforme des rythmes scolaires vise des périodes de cours d’environ sept semaines. Pâques pouvant varier d’un mois, la Fédération a fixé le congé de printemps indépendamment de la fête, fin avril ou début mai. Seul le lundi de Pâques reste congé.' },
      { q: 'Le lundi de Pâques 2027 est-il un jour de classe ?', a: `Non. Le ${D(pm, 'fr')} est un jour férié légal et un jour de congé dans les trois Communautés. En Flandre et en Ostbelgien, il ouvre même les vacances de Pâques. Pour les parents salariés, c’est aussi un jour férié légal.` },
      { q: 'Quand seront les vacances de printemps 2028 ?', a: `Du ${P(FWB(Y + 1).pasen, 'fr')} en Fédération Wallonie-Bruxelles. En Flandre, Pâques ${Y + 2} tombe tard et les vacances vont du ${P(VG(Y + 1).pasen, 'fr')}. Les deux congés resteront donc séparés de plusieurs semaines, comme en 2027, et sans aucun jour commun.` },
    ],
    body: (h) => `<h2>Le congé de printemps 2027 dans chaque Communauté</h2>
<p>Selon le ${h.src('fwb-calendrier', 'calendrier de la Fédération Wallonie-Bruxelles')}, les élèves francophones sont en congé à partir du ${D(fp.van, 'fr')}. ${h.src('vg-vakanties', 'Vlaanderen.be')} place la paasvakantie un mois plus tôt, et le ${h.src('dg-kalender', 'calendrier germanophone')} retient les mêmes semaines que la Flandre, publiées du lundi au vendredi.</p>
${h.table(['Communauté', 'Congé', 'Jours'], [['Fédération Wallonie-Bruxelles', P(fp, 'fr'), nF], ['Communauté flamande', P(vp, 'fr'), nV], ['Communauté germanophone', P(K.blok(gp), 'fr'), nG]], 'Congé de printemps 2027, week-ends compris', ['l', 'l', 'r'])}
<h2>Les années suivantes</h2>
<p>Le tableau suit chaque année scolaire jusqu’en 2030. La colonne flamande bouge avec la date de Pâques ; la colonne francophone reste fin avril ou début mai, et s’arrête là où la Fédération n’a encore rien publié.</p>
${h.table(['Année', 'Dimanche de Pâques', 'Flandre', 'FWB (printemps)', 'Ostbelgien'], rij('fr'), 'Pâques et printemps par année, week-ends compris')}
<h2>Quatre semaines sans recoupement</h2>
<p>En 2027, les deux congés de printemps ne partagent aucun jour. Le comparateur ci-dessous le montre sur l’année entière ; le calcul de la date de Pâques est détaillé sur ${h.a('pasen-2027', 'Pâques 2027')}.</p>
${h.mini('vg', { p: ['a', 'b'], d: { a: 'FWB', b: 'VG' }, c: 'Aligner les deux calendriers' })}`,
  },
  en: {
    slug: 'easter-holidays-2027', nav: 'Easter holidays 2027', card: `Flanders ${P(vp, 'en')}, French schools in May`,
    title: 'Easter holidays 2027 Belgium: Flemish and spring break dates',
    description: 'Easter holidays 2027 in Belgium: 29 March to 11 April in Flemish schools; French-language schools break from 26 April to 9 May. Countdown and later years.',
    h1: 'Easter holidays 2027 in Belgium',
    intro: 'How long until the Easter holidays, and why French-language schools break up a month later. Choose the school system and year in the tool.',
    resume: `Flemish schools have their Easter holidays 2027 from ${W(vp.van, 'en')} to ${W(vp.tot, 'en')}, two weeks or ${nV} days with the weekends. Easter Sunday falls in March this year, on ${D(ps, 'en')}, and the Flemish rule then starts the break on Easter Monday. Ostbelgien is off ${P(gp, 'en')}, Monday to Friday. French-language schools no longer have an Easter break at all: since the 2022 reform they take a spring break, ${W(fp.van, 'en')} to ${W(fp.tot, 'en')}, ${nF} days in a row and about ${weken} weeks after the Flemish one. Easter Monday, ${D(pm, 'en')}, is a single day off for them, and Ascension Day, ${D(hv, 'en')}, falls inside their spring break. For families with children in both systems, that adds up to four separate weeks off between late March and early May, with no day in common.`,
    faqs: [
      { q: 'How is the Flemish Easter break fixed?', a: `It always lasts two weeks. It starts on the first Monday of April, on Easter Monday when Easter is in March (as in 2027: ${P(vp, 'en')}), or on the second Monday before Easter when Easter falls after 15 April.` },
      { q: 'Do French-language schools close for Easter 2027?', a: `Only on Easter Monday, ${D(pm, 'en')}. Their two-week spring break runs ${P(fp, 'en')}, independent of the Easter date since the 2022 reform. Ascension Day falls inside that spring break this year, so it adds no extra day off.` },
      { q: 'When are the Easter holidays 2028?', a: `Easter 2028 is late, on ${D(K.paaszondag(Y + 2), 'en')}. Flemish schools are off ${P(VG(Y + 1).pasen, 'en')}, Ostbelgien ${P(DG(Y + 1).pasen!, 'en')}, and French-language schools have their spring break ${P(FWB(Y + 1).pasen, 'en')}. Each break ends on a Sunday and lessons resume on the Monday after it.` },
    ],
    body: (h) => `<h2>Spring breaks 2027 by Community</h2>
<p>The dates come from ${h.src('vg-vakanties', 'vlaanderen.be')}, ${h.src('fwb-calendrier', 'enseignement.be')} and the ${h.src('dg-kalender', 'German-speaking Community')}. Flanders and Ostbelgien break up at Easter; French-language schools wait until late April.</p>
${h.table(['Community', 'Break', 'Days'], [['Flemish Community', P(vp, 'en'), nV], ['German-speaking Community', P(K.blok(gp), 'en'), nG], ['Fédération Wallonie-Bruxelles (spring)', P(fp, 'en'), nF]], 'Spring breaks 2027, weekends included', ['l', 'l', 'r'])}
<h2>The years ahead</h2>
<p>The Flemish column moves with Easter; the French-language column stays in late April or early May and stops where nothing has been published yet.</p>
${h.table(['Year', 'Easter Sunday', 'Flanders', 'French-language (spring)', 'Ostbelgien'], rij('en'), 'Easter and spring breaks by year, weekends included')}
<h2>Four weeks, no overlap</h2>
<p>In 2027 the two spring breaks share no day at all. Compare the whole school year below, or see how Easter is calculated on ${h.a('pasen-2027', 'Easter 2027')}.</p>
${h.mini('vg', { p: ['a', 'b'], c: 'Put both calendars side by side' })}`,
  },
});
