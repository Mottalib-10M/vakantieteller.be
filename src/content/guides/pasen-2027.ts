/** Pasen 2027 : datum (Gauss), beweeglijke feestdagen en de schoolvakanties die eraan hangen. Data : moteur. */
import { defineGuide } from '../../lib/page-types';
import { gaussSchritte } from '../../lib/tool-specs';
import { K, VG, FWB, DG, P, D, W, fd } from '../_data';

const Y = 2027;
const ps = K.paaszondag(Y), g = gaussSchritte(Y);
const pm = fd(Y, 'paasmaandag'), hv = fd(Y, 'hemelvaart'), pi = fd(Y, 'pinkstermaandag');
const v = VG(Y - 1), f = FWB(Y - 1), dg = DG(Y - 1);
const jaren = [2026, 2027, 2028, 2029, 2030];

export default defineGuide({
  id: 'pasen-2027', group: 'feestdagen', order: 18, tool: 'os', toolArg: { jaar: Y },
  related: ['paasvakantie-2027', 'krokusvakantie-2027', 'feestdagen-2027', 'home'],
  sources: ['ostern-ptb', 'wet-1974', 'vg-vakanties', 'fwb-calendrier'],
  nl: {
    slug: 'pasen-2027', nav: 'Pasen 2027', card: `Paaszondag ${D(ps, 'nl')}`,
    title: 'Pasen 2027 op 28 maart: Paasmaandag, Hemelvaart, Pinksteren',
    description: 'Pasen 2027 valt op zondag 28 maart. Met Paasmaandag, Hemelvaart, Pinkstermaandag, de berekening volgens Gauss en het effect op de Vlaamse schoolvakanties.',
    h1: 'Pasen 2027: datum, feestdagen en schoolvakanties',
    intro: 'Op welke datum Pasen valt, voor 2027 of elk ander jaar, met de stappen van de paasformule en de feestdagen en vakanties die ervan afhangen.',
    resume: `Pasen valt in ${Y} op ${W(ps, 'nl')}, een vroege datum: de vroegst mogelijke is 22 maart, de laatste 25 april. Paasmaandag, ${D(pm, 'nl')}, is een wettelijke feestdag. Hemelvaartsdag volgt 39 dagen na Pasen, op ${W(hv, 'nl')}, en Pinkstermaandag 50 dagen erna, op ${W(pi, 'nl')}; ook die twee zijn wettelijke feestdagen. Goede Vrijdag, ${D(K.plusDagen(ps, -2), 'nl')}, is in België geen feestdag. De datum hangt af van de eerste volle maan na het begin van de lente, en wordt hier berekend met de formule van Gauss. Een vroege Pasen trekt ook de Vlaamse schoolvakanties naar voren: de krokusvakantie, altijd zeven weken voor Pasen, loopt van ${P(v.krokus, 'nl')}, en omdat Pasen in maart valt, begint de paasvakantie pas op Paasmaandag, van ${P(v.pasen, 'nl')}. Het Franstalig onderwijs koppelt zijn lentevakantie niet meer aan Pasen.`,
    faqs: [
      { q: 'Is Goede Vrijdag 2027 een feestdag in België?', a: `Nee. De wet van 4 januari 1974 en het koninklijk besluit van 18 april 1974 noemen tien feestdagen, en Goede Vrijdag hoort daar niet bij. In ${Y} valt hij op ${D(K.plusDagen(ps, -2), 'nl')}, een gewone werkdag; Vlaamse leerlingen gaan die dag nog naar school.` },
      { q: 'Hoe wordt de datum van Pasen berekend?', a: `Pasen is de eerste zondag na de eerste volle maan op of na 21 maart. De formule van Gauss vertaalt dat in een reeks deelresten; voor ${Y} geeft ze een paasgrens op ${g.OG} maart en ${g.OE} dagen tot de zondag, dus dag ${g.OS} van maart: 28 maart. De tabel onder de rekenaar toont elke stap.` },
      { q: 'Wanneer valt Pasen in de komende jaren?', a: `${jaren.filter((x) => x !== Y).map((x) => `${x}: ${D(K.paaszondag(x), 'nl')}`).join('; ')}. De rekenaar geeft elk jaar tussen 2020 en 2050, met de stappen van de formule, Paasmaandag, Hemelvaart, Pinkstermaandag en het begin van de Vlaamse krokusvakantie.` },
    ],
    body: (h) => `<h2>Feestdagen die van Pasen afhangen</h2>
${h.table(['Dag', 'Afstand tot Pasen', 'Datum in 2027', 'Wettelijke feestdag'], [['Goede Vrijdag', '−2', W(K.plusDagen(ps, -2), 'nl'), 'nee'], ['Paaszondag', '0', W(ps, 'nl'), 'zondag'], ['Paasmaandag', '+1', W(pm, 'nl'), 'ja'], ['Hemelvaartsdag', '+39', W(hv, 'nl'), 'ja'], ['Pinkstermaandag', '+50', W(pi, 'nl'), 'ja']], `Beweeglijke dagen ${Y}`)}
<p>Drie van de tien wettelijke feestdagen schuiven elk jaar mee met Pasen. Ze staan in de ${h.src('wet-1974', 'feestdagenwet van 1974')} en het uitvoeringsbesluit ervan. De berekening van de datum zelf volgt de beschrijving van de ${h.src('ostern-ptb', 'Physikalisch-Technische Bundesanstalt')}, die de paasformule van Gauss met zijn correcties uitlegt.</p>
<h2>Wat Pasen met de schoolkalender doet</h2>
<p>In Vlaanderen hangen twee vakanties aan Pasen. De krokusvakantie begint 48 dagen voor Paaszondag, dus in ${Y} op ${D(v.krokus.van, 'nl')}. De paasvakantie begint op de eerste maandag van april, behalve als Pasen in maart valt, zoals nu: dan start ze op Paasmaandag en duurt ze tot ${D(v.pasen.tot, 'nl')}. Ostbelgien volgt dit jaar dezelfde weken (${P(dg.pasen!, 'nl')}, maandag tot vrijdag). Het Franstalig onderwijs, dat sinds 2022 met vaste blokken werkt, neemt zijn lentevakantie pas van ${P(f.pasen, 'nl')}; Paasmaandag en Hemelvaart zijn daar losse vrije dagen. Meer op ${h.a('paasvakantie-2027', 'paasvakantie 2027')} en ${h.a('krokusvakantie-2027', 'krokusvakantie 2027')}.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y }, c: 'Alle feestdagen van het jaar' })}`,
  },
  fr: {
    slug: 'paques-2027', nav: 'Pâques 2027', card: `Dimanche ${D(ps, 'fr')}`,
    title: 'Pâques 2027 : le 28 mars, avec l’Ascension et la Pentecôte',
    description: 'Pâques 2027 tombe le dimanche 28 mars : lundi de Pâques, Ascension, lundi de Pentecôte, calcul selon Gauss et effet de Pâques sur les congés scolaires.',
    h1: 'Pâques 2027 : date, jours fériés et congés scolaires',
    intro: 'La date de Pâques pour 2027 ou toute autre année, les étapes du calcul et les jours fériés et congés qui en découlent.',
    resume: `En ${Y}, Pâques tombe le ${W(ps, 'fr')}, une date précoce : Pâques peut aller du 22 mars au 25 avril. Le lundi de Pâques, ${D(pm, 'fr')}, est un jour férié légal. L’Ascension suit 39 jours après Pâques, le ${W(hv, 'fr')}, et le lundi de Pentecôte 50 jours après, le ${W(pi, 'fr')} ; ce sont aussi des jours fériés. Le Vendredi saint, ${D(K.plusDagen(ps, -2), 'fr')}, ne l’est pas en Belgique. La date dépend de la première pleine lune qui suit le début du printemps ; l’outil la calcule avec la formule de Gauss. Côté scolaire, la Fédération Wallonie-Bruxelles ne cale plus ses vacances de printemps sur Pâques : elles vont du ${P(f.pasen, 'fr')}, et le lundi de Pâques est un congé isolé. En Flandre, au contraire, Pâques précoce avance le carnaval, du ${P(v.krokus, 'fr')}, et les vacances de Pâques partent du lundi de Pâques, jusqu’au ${D(v.pasen.tot, 'fr')}.`,
    faqs: [
      { q: 'Le Vendredi saint 2027 est-il férié en Belgique ?', a: `Non. La loi du 4 janvier 1974 et l’arrêté royal du 18 avril 1974 retiennent dix jours fériés, sans le Vendredi saint. Le ${D(K.plusDagen(ps, -2), 'fr')} est donc un jour ouvrable ordinaire. Certaines conventions sectorielles ou d’entreprise peuvent accorder un congé, mais ce n’est pas une règle générale. Dans les écoles, le Vendredi saint ${Y} est un jour de classe, en Flandre comme en Fédération Wallonie-Bruxelles.` },
      { q: 'Comment calcule-t-on la date de Pâques ?', a: `Pâques est le premier dimanche après la première pleine lune qui tombe le 21 mars ou après. La formule de Gauss traduit cette règle en restes de divisions ; pour ${Y}, la limite pascale tombe le ${g.OG} mars et le dimanche suit ${g.OE} jours plus tard, soit le jour ${g.OS} de mars : le 28 mars.` },
      { q: 'Quelles sont les dates de Pâques des prochaines années ?', a: `${jaren.filter((x) => x !== Y).map((x) => `${x} : ${D(K.paaszondag(x), 'fr')}`).join(' ; ')}. L’outil couvre toutes les années de 2020 à 2050 et affiche pour chacune le lundi de Pâques, l’Ascension, le lundi de Pentecôte et les étapes du calcul.` },
    ],
    body: (h) => `<h2>Les jours liés à Pâques</h2>
${h.table(['Jour', 'Écart avec Pâques', 'Date en 2027', 'Férié légal'], [['Vendredi saint', '−2', W(K.plusDagen(ps, -2), 'fr'), 'non'], ['Dimanche de Pâques', '0', W(ps, 'fr'), 'dimanche'], ['Lundi de Pâques', '+1', W(pm, 'fr'), 'oui'], ['Ascension', '+39', W(hv, 'fr'), 'oui'], ['Lundi de Pentecôte', '+50', W(pi, 'fr'), 'oui']], `Jours mobiles ${Y}`)}
<p>Trois des dix jours fériés légaux, fixés en application de la ${h.src('wet-1974', 'loi du 4 janvier 1974')}, se déplacent avec Pâques. Le calcul de la date suit la présentation de la formule de Gauss par la ${h.src('ostern-ptb', 'Physikalisch-Technische Bundesanstalt')}, l’institut national de métrologie allemand.</p>
<h2>Pâques et le calendrier scolaire</h2>
<p>Depuis la réforme de 2022, le ${h.src('fwb-calendrier', 'calendrier francophone')} n’est plus organisé autour de Pâques : les vacances de printemps tombent à la fin d’un bloc de sept semaines, en ${Y} fin avril. L’Ascension (${D(hv, 'fr')}) et le lundi de Pentecôte restent des congés. En Flandre, le carnaval est toujours la septième semaine avant Pâques, et les vacances de Pâques en dépendent directement, comme l’explique ${h.src('vg-vakanties', 'vlaanderen.be')}. Voir aussi ${h.a('paasvakantie-2027', 'vacances de printemps 2027')}.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y }, c: 'Tous les jours fériés de l’année' })}`,
  },
  en: {
    slug: 'easter-2027', nav: 'Easter 2027', card: `Easter Sunday ${D(ps, 'en')}`,
    title: 'Easter 2027: 28 March, with Ascension and Whit Monday dates',
    description: 'Easter 2027 falls on Sunday 28 March: Easter Monday, Ascension Day, Whit Monday, the Gauss calculation step by step and its effect on Belgian school holidays.',
    h1: 'Easter 2027: date, public holidays and school breaks',
    intro: 'The date of Easter for 2027 or any other year, the steps of the Easter formula and the public holidays and school breaks that follow from it.',
    resume: `Easter Sunday ${Y} is ${W(ps, 'en')}, an early date; Easter can fall between 22 March and 25 April. In Belgium Easter Monday, ${D(pm, 'en')}, is a public holiday. Ascension Day comes 39 days after Easter, on ${W(hv, 'en')}, and Whit Monday 50 days after, on ${W(pi, 'en')}; both are public holidays too. Good Friday, ${D(K.plusDagen(ps, -2), 'en')}, is not. The date depends on the first full moon of spring, and the tool works it out with Gauss’s Easter formula, showing every intermediate value. Easter also moves the Flemish school calendar: the carnival (krokus) break is always the seventh week before Easter, so in ${Y} it runs ${P(v.krokus, 'en')}, and because Easter falls in March the Easter holidays start on Easter Monday and last until ${D(v.pasen.tot, 'en')}. French-language schools no longer tie their spring break to Easter; theirs runs ${P(f.pasen, 'en')}.`,
    faqs: [
      { q: 'Is Good Friday 2027 a public holiday in Belgium?', a: `No. The Act of 4 January 1974 and the Royal Decree of 18 April 1974 list ten public holidays, and Good Friday is not among them. ${D(K.plusDagen(ps, -2), 'en')} is an ordinary working day. A sector or company agreement may give it off, but that is not a general rule. In schools it is a lesson day in ${Y}, in Flemish as well as French-language schools, since both Easter breaks start later.` },
      { q: 'How is the date of Easter calculated?', a: `Easter is the first Sunday after the first full moon on or after 21 March. Gauss’s formula turns that rule into a chain of remainders; for ${Y} the paschal full moon falls on day ${g.OG} of March and Sunday follows ${g.OE} days later, day ${g.OS} of March: 28 March.` },
      { q: 'What are the Easter dates for the next few years?', a: `${jaren.filter((x) => x !== Y).map((x) => `${x}: ${D(K.paaszondag(x), 'en')}`).join('; ')}. The tool covers every year from 2020 to 2050 and shows Easter Monday, Ascension Day, Whit Monday and each step of the calculation for the year you pick.` },
    ],
    body: (h) => `<h2>Days that move with Easter</h2>
${h.table(['Day', 'Offset from Easter', 'Date in 2027', 'Public holiday'], [['Good Friday', '−2', W(K.plusDagen(ps, -2), 'en'), 'no'], ['Easter Sunday', '0', W(ps, 'en'), 'Sunday'], ['Easter Monday', '+1', W(pm, 'en'), 'yes'], ['Ascension Day', '+39', W(hv, 'en'), 'yes'], ['Whit Monday', '+50', W(pi, 'en'), 'yes']], `Movable days ${Y}`)}
<p>Three of Belgium’s ten statutory holidays, set under the ${h.src('wet-1974', 'Act of 4 January 1974')}, move with Easter each year. The date calculation follows the account of Gauss’s formula published by the ${h.src('ostern-ptb', 'Physikalisch-Technische Bundesanstalt')}, Germany’s national metrology institute.</p>
<h2>Easter and the school year</h2>
<p>The Flemish carnival break starts 48 days before Easter Sunday, and the Easter break follows rules tied to the date of Easter, as ${h.src('vg-vakanties', 'vlaanderen.be')} sets out. In ${Y} Ostbelgien keeps the same weeks, ${P(dg.pasen!, 'en')}, Monday to Friday. French-language schools work in fixed blocks since 2022, according to the ${h.src('fwb-calendrier', 'Fédération’s calendar')}, so Easter Monday and Ascension Day are single days off and their spring break comes at the end of April. See ${h.a('paasvakantie-2027', 'Easter holidays 2027')} and ${h.a('krokusvakantie-2027', 'carnival break 2027')}.</p>
${h.mini('ft', { p: ['jaar'], d: { jaar: Y }, c: 'Every public holiday of the year' })}`,
  },
});
