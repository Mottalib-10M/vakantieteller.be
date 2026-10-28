/** Krokusvakantie / congé de détente 2027. Dates : moteur via _data.ts (Vlaanderen = 7e semaine avant Pâques). */
import { defineGuide } from '../../lib/page-types';
import type { Lang } from '../../lib/format';
import { K, VG, FWB, DG, P, D, W, WD, nDagen } from '../_data';

const Y = 2026;
const vk = VG(Y).krokus, fk = FWB(Y).krokus, gk = DG(Y).krokus!;
const nV = nDagen('VG', Y, 'krokus'), nF = nDagen('FWB', Y, 'krokus'), nG = nDagen('DG', Y, 'krokus');
const ps = K.paaszondag(Y + 1), asw = K.plusDagen(ps, -46);
const tussen = K.fromIso(fk.van) - K.fromIso(vk.tot) - 1;
const v28 = VG(Y + 1).krokus, f28 = FWB(Y + 1).krokus;
const overlap28 = (() => { let c = 0; for (let d = K.fromIso(v28.van); d <= K.fromIso(v28.tot); d++) if (!K.isWeekend(d) && d >= K.fromIso(f28.van) && d <= K.fromIso(f28.tot)) c++; return c; })();
const nog = (l: Lang) => (l === 'nl' ? 'nog niet gepubliceerd' : l === 'fr' ? 'pas encore publié' : 'not yet published');
const rij = (l: Lang) => [Y, Y + 1, Y + 2, Y + 3].map((y) => {
  const c = (g: 'VG' | 'FWB' | 'DG') => { const k = K.kalender(g, y); const p = k?.krokus; return p ? P(g === 'DG' ? K.blok(p) : p, l) : nog(l); };
  return [String(y + 1), D(K.paaszondag(y + 1), l), c('VG'), c('FWB'), c('DG')];
});

export default defineGuide({
  id: 'krokusvakantie-2027', group: 'school', order: 5, tool: 'vk', toolArg: { vak: 'krokus', sj: Y },
  related: ['kerstvakantie-2026', 'paasvakantie-2027', 'pasen-2027', 'vergelijker'],
  sources: ['vg-vakanties', 'fwb-calendrier', 'dg-kalender', 'ostern-ptb'],
  countdown: { date: vk.van, label: { nl: 'Nog tot de krokusvakantie in Vlaanderen', fr: 'Avant le carnaval en Flandre', en: 'Until the Flemish carnival break' } },
  nl: {
    slug: 'krokusvakantie-2027', nav: 'Krokusvakantie 2027', card: `Vlaanderen ${P(vk, 'nl')}, Franstalig later`,
    title: 'Krokusvakantie 2027: data in Vlaanderen, Brussel en Wallonië',
    description: 'Krokusvakantie 2027: van 8 tot 14 februari in Vlaanderen, twee weken vanaf 22 februari in het Franstalig onderwijs. Aftelling, regel en data tot 2030.',
    h1: 'Krokusvakantie 2027 in België',
    intro: 'Hoe lang het nog duurt tot de krokusvakantie en wanneer ze in elke Gemeenschap valt. Kies het onderwijs en het schooljaar in de rekenaar.',
    resume: `De krokusvakantie 2027 valt in het Nederlandstalig onderwijs van ${W(vk.van, 'nl')} tot ${W(vk.tot, 'nl')}, ${nV} dagen met de weekends. Dat is vroeg, en dat komt door Pasen: de Vlaamse kalender legt de krokusvakantie altijd in de zevende week voor Pasen, en Paaszondag valt in 2027 al op ${D(ps, 'nl')}. Aswoensdag is ${W(asw, 'nl')}, midden in de vakantie. Het Franstalig onderwijs heeft sinds de hervorming van 2022 twee weken congé de détente, losgekoppeld van carnaval: van ${W(fk.van, 'nl')} tot ${W(fk.tot, 'nl')}, ${nF} dagen op een rij. Tussen het einde van de Vlaamse en het begin van de Franstalige vakantie liggen ${tussen} dagen, zodat kinderen in beide systemen geen enkele dag samen vrij zijn. In Ostbelgien loopt de carnavalsvakantie gelijk met de Vlaamse, van ${P(gk, 'nl')}, maandag tot vrijdag.`,
    faqs: [
      { q: 'Waarom heet het de krokusvakantie?', a: 'De naam verwijst naar de krokussen die rond die tijd bloeien. Officieel heet ze in Vlaanderen ook zo; vroeger sprak men van de carnavalsvakantie, omdat ze rond Aswoensdag valt. In het Franstalig onderwijs heet ze congé de détente, in Ostbelgien Karnevalsferien.' },
      { q: 'Valt de krokusvakantie altijd in februari?', a: `Nee. Ze hangt af van Pasen en kan van begin februari tot begin maart vallen. In 2028 loopt ze in Vlaanderen van ${P(v28, 'nl')}, omdat Pasen dan pas op ${D(K.paaszondag(Y + 2), 'nl')} valt. De Franstalige vakantie volgt die regel niet: ze ligt vast in de kalender van de Fédération.` },
      { q: 'Overlappen de Vlaamse en Franstalige krokusvakantie in 2028?', a: `Ja, gedeeltelijk: de Franstalige vakantie loopt dan van ${P(f28, 'nl')} en de Vlaamse van ${P(v28, 'nl')}. Dat zijn ${overlap28} gemeenschappelijke weekdagen, in tegenstelling tot 2027. Gezinnen met kinderen in beide netten kunnen dan dus minstens enkele dagen samen weg.` },
    ],
    body: (h) => `<h2>De krokusvakantie 2027 per Gemeenschap</h2>
<p>De Vlaamse data staan op ${h.src('vg-vakanties', 'vlaanderen.be')}, de Franstalige op ${h.src('fwb-calendrier', 'enseignement.be')} en die van Ostbelgien in de ${h.src('dg-kalender', 'kalender van de Duitstalige Gemeenschap')}. Vlaanderen en Ostbelgien zijn in dezelfde week vrij; het Franstalig onderwijs volgt twee weken later met een dubbele vakantie.</p>
${h.table(['Gemeenschap', 'Vakantie', 'Dagen'], [['Vlaamse Gemeenschap', P(vk, 'nl'), nV], ['Fédération Wallonie-Bruxelles', P(fk, 'nl'), nF], ['Duitstalige Gemeenschap', P(K.blok(gk), 'nl'), nG]], 'Krokusvakantie 2027, weekends inbegrepen', ['l', 'l', 'r'])}
<h2>De regel: zeven weken voor Pasen</h2>
<p>De Vlaamse krokusvakantie begint op de maandag 48 dagen voor Paaszondag. Pasen zelf volgt uit de maankalender en wordt hier berekend met de formule van Gauss, zoals de ${h.src('ostern-ptb', 'Physikalisch-Technische Bundesanstalt')} ze beschrijft. Daardoor schuift de vakantie elk jaar: hieronder de komende jaren, met wat nog niet gepubliceerd is.</p>
${h.table(['Jaar', 'Paaszondag', 'Vlaanderen', 'Franstalig', 'Ostbelgien'], rij('nl'), 'Krokusvakantie per jaar, weekends inbegrepen')}
${h.mini('os', { c: 'Pasen berekenen voor een ander jaar' })}
<h2>Twee kinderen, twee vakanties</h2>
<p>In 2027 valt de Franstalige vakantie volledig na de Vlaamse. Gezinnen met kinderen in beide netten moeten dus drie weken opvang of verlof regelen. Wie de vakanties dag per dag wil naast elkaar zien, gebruikt de ${h.a('vergelijker', 'vergelijker')}; Pasen en de paasvakantie staan op ${h.a('paasvakantie-2027', 'paasvakantie 2027')}.</p>`,
  },
  fr: {
    slug: 'conge-de-detente-2027', nav: 'Congé de détente 2027', card: `FWB ${P(fk, 'fr')}, Flandre plus tôt`,
    title: 'Congé de détente 2027 : dates du carnaval par Communauté',
    description: 'Congé de détente 2027 : deux semaines dès le 22 février en Fédération Wallonie-Bruxelles, du 8 au 14 février en Flandre. Décompte et dates jusqu’en 2030.',
    h1: 'Congé de détente 2027 (Carnaval) en Belgique',
    intro: 'Le temps qu’il reste avant le congé de détente et ses dates dans les trois Communautés. Choisissez l’enseignement et l’année dans l’outil.',
    resume: `En Fédération Wallonie-Bruxelles, le congé de détente 2027 dure deux semaines, du ${W(fk.van, 'fr')} au ${W(fk.tot, 'fr')}, soit ${nF} jours d’affilée week-ends compris. Depuis la réforme des rythmes scolaires de 2022, ce congé n’est plus calé sur le Mardi gras : il tombe environ sept semaines après les vacances d’hiver, pour couper le deuxième trimestre en deux. Les écoles néerlandophones gardent l’ancien principe : leur krokusvakantie est la septième semaine avant Pâques, et comme Pâques ${Y + 1} tombe tôt, le ${D(ps, 'fr')}, elle va du ${P(vk, 'fr')}, avec le mercredi des Cendres le ${D(asw, 'fr')}. Entre la fin du congé flamand et le début du congé francophone, il s’écoule ${tussen} jours : deux enfants scolarisés dans les deux réseaux ne sont jamais en congé ensemble. En Ostbelgien, le congé de carnaval va du ${P(gk, 'fr')}, du lundi au vendredi.`,
    faqs: [
      { q: 'Pourquoi parle-t-on de congé de détente et non plus de carnaval ?', a: 'Avec la réforme de 2022, la Fédération Wallonie-Bruxelles a détaché ses congés des fêtes religieuses ou traditionnelles, sauf Noël. Le nom « congé de détente » reflète ce changement : le congé sert à couper un long trimestre, quelle que soit la date du carnaval.' },
      { q: 'Combien de jours dure le congé de détente 2027 ?', a: `Deux semaines de cours en moins, soit ${nF} jours de congé consécutifs du ${D(fk.van, 'fr')} au ${D(fk.tot, 'fr')}. En Flandre, la krokusvakantie ne dure qu’une semaine, ${nV} jours avec les week-ends, et les écoles germanophones ferment la même semaine que la Flandre.` },
      { q: 'Le congé de détente 2028 coïncide-t-il avec le congé flamand ?', a: `En partie. La Fédération sera en congé du ${P(f28, 'fr')}, la Flandre du ${P(v28, 'fr')} : ${overlap28} jours de semaine en commun, contrairement à 2027. Les familles concernées pourront donc partir ensemble au moins quelques jours.` },
    ],
    body: (h) => `<h2>Le congé de détente 2027 dans chaque Communauté</h2>
<p>Les dates viennent du ${h.src('fwb-calendrier', 'calendrier officiel de la Fédération Wallonie-Bruxelles')}, de ${h.src('vg-vakanties', 'vlaanderen.be')} et du ${h.src('dg-kalender', 'calendrier germanophone')}. La Flandre et l’Ostbelgien sont en congé la même semaine ; l’enseignement francophone suit deux semaines plus tard, avec un congé deux fois plus long.</p>
${h.table(['Communauté', 'Congé', 'Jours'], [['Fédération Wallonie-Bruxelles', P(fk, 'fr'), nF], ['Communauté flamande', P(vk, 'fr'), nV], ['Communauté germanophone', P(K.blok(gk), 'fr'), nG]], 'Congé de détente 2027, week-ends compris', ['l', 'l', 'r'])}
<h2>Les années suivantes</h2>
<p>Le congé flamand dépend de Pâques : il commence le lundi situé 48 jours avant le dimanche de Pâques, calculé ici par la formule de Gauss décrite par la ${h.src('ostern-ptb', 'Physikalisch-Technische Bundesanstalt')}. Le congé francophone, lui, est fixé par la Fédération, qui a publié ses dates jusqu’en 2029.</p>
${h.table(['Année', 'Dimanche de Pâques', 'Flandre', 'FWB', 'Ostbelgien'], rij('fr'), 'Congé de carnaval par année, week-ends compris')}
${h.mini('os', { c: 'Calculer Pâques pour une autre année' })}
<h2>Trois semaines à organiser</h2>
<p>En 2027, une famille avec un enfant dans chaque réseau doit couvrir trois semaines de congé distinctes en février et mars. Le ${h.a('vergelijker', 'comparateur')} aligne les deux calendriers ; la suite, au printemps, est sur ${h.a('paasvakantie-2027', 'vacances de printemps 2027')}.</p>`,
  },
  en: {
    slug: 'carnival-break-2027', nav: 'Carnival break 2027', card: `Flanders ${P(vk, 'en')}, French schools later`,
    title: 'Carnival break 2027: krokusvakantie and congé de détente',
    description: 'Carnival break 2027 in Belgium: 8 to 14 February in Flemish schools, two weeks from 22 February in French-language schools. Countdown, rule and dates to 2030.',
    h1: 'Carnival break 2027 in Belgium (krokusvakantie)',
    intro: 'How long until the February half-term, and when each Community takes it. Choose the school system and year in the tool.',
    resume: `Belgium’s February half-term falls at two different times in 2027. Dutch-language schools in Flanders and Brussels take their krokusvakantie from ${W(vk.van, 'en')} to ${W(vk.tot, 'en')}, ${nV} days with the weekends. It is early because the Flemish rule places it in the seventh week before Easter, and Easter Sunday 2027 is already on ${D(ps, 'en')}; Ash Wednesday, ${D(asw, 'en')}, falls in the middle of it. French-language schools have had a two-week congé de détente since the 2022 reform, no longer tied to carnival: ${W(fk.van, 'en')} to ${W(fk.tot, 'en')}, ${nF} days in a row. Between the end of the Flemish break and the start of the French-language one there are ${tussen} days, so siblings in the two systems are never off together. Ostbelgien’s Karnevalsferien match the Flemish week, ${P(gk, 'en')}, Monday to Friday.`,
    faqs: [
      { q: 'What does krokusvakantie mean?', a: 'Literally “crocus holiday”, after the flowers that bloom at that time of year. It used to be called the carnival holiday because it surrounds Ash Wednesday. French-language schools call their equivalent the congé de détente, and Ostbelgien the Karnevalsferien. The dates differ by Community.' },
      { q: 'Why does the Flemish carnival break move every year?', a: `Because it is tied to Easter, which can fall between 22 March and 25 April. The break starts 48 days before Easter Sunday. In 2028 Easter is ${D(K.paaszondag(Y + 2), 'en')}, so the Flemish break moves to ${P(v28, 'en')}.` },
      { q: 'Will the two carnival breaks overlap in 2028?', a: `Partly. French-language schools are off ${P(f28, 'en')} and Flemish schools ${P(v28, 'en')}, giving ${overlap28} shared weekdays, unlike 2027. Families with children in both systems can therefore plan a few days away together, which was impossible in 2027.` },
    ],
    body: (h) => `<h2>The 2027 break by Community</h2>
<p>The dates come from ${h.src('vg-vakanties', 'vlaanderen.be')}, ${h.src('fwb-calendrier', 'enseignement.be')} and the ${h.src('dg-kalender', 'German-speaking Community’s calendar')}. Flanders and Ostbelgien share a week; French-language schools follow two weeks later with a break twice as long.</p>
${h.table(['Community', 'Break', 'Days'], [['Flemish Community', P(vk, 'en'), nV], ['Fédération Wallonie-Bruxelles', P(fk, 'en'), nF], ['German-speaking Community', P(K.blok(gk), 'en'), nG]], 'Carnival break 2027, weekends included', ['l', 'l', 'r'])}
<h2>Later years</h2>
<p>The Flemish date follows Easter, computed here with Gauss’s formula as set out by the ${h.src('ostern-ptb', 'Physikalisch-Technische Bundesanstalt')}. The French-language date is set by the Fédération, which has published up to 2029. Anything beyond that is marked as not yet published.</p>
${h.table(['Year', 'Easter Sunday', 'Flanders', 'French-language', 'Ostbelgien'], rij('en'), 'Carnival break by year, weekends included')}
${h.mini('os', { c: 'Work out Easter for another year' })}
<h2>Three weeks to cover</h2>
<p>In 2027 a family with one child in each system has three separate weeks off to arrange in February and March, ${WD(vk.van, 'en')} ${D(vk.van, 'en')} being the first. The ${h.a('vergelijker', 'comparison tool')} lines up both calendars, and the spring break is on ${h.a('paasvakantie-2027', 'Easter holidays 2027')}.</p>`,
  },
});
