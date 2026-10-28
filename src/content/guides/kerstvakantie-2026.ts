/** Kerstvakantie 2026-2027 : même période dans les trois Communautés cette année. Dates : moteur via _data.ts. */
import { defineGuide } from '../../lib/page-types';
import { K, VG, FWB, DG, P, D, W, WD, nDagen, fd } from '../_data';

const Y = 2026;
const vk = VG(Y).kerst, fk = FWB(Y).kerst, gk = DG(Y).kerst!;
const nV = nDagen('VG', Y, 'kerst'), nG = nDagen('DG', Y, 'kerst');
const kerst = fd(Y, 'kerstmis'), nj = fd(Y + 1, 'nieuwjaar');
/** Brug rond Kerstmis voor werkende ouders (motor). */
const brug = K.bruggen(Y).find((b) => b.vrijVan === kerst)!;
const vk27 = VG(Y + 1).kerst, fk27 = FWB(Y + 1).kerst, gk27 = DG(Y + 1).kerst!;
const vk28 = VG(Y + 2).kerst;
const weekdagen = K.weekdagenIn(vk);

export default defineGuide({
  id: 'kerstvakantie-2026', group: 'school', order: 4, tool: 'vk', toolArg: { vak: 'kerst', sj: Y },
  related: ['herfstvakantie-2026', 'krokusvakantie-2027', 'brugdagen-2027', 'home'],
  sources: ['vg-vakanties', 'fwb-calendrier', 'dg-kalender', 'fod-feestdagen'],
  countdown: { date: vk.van, label: { nl: 'Nog tot de kerstvakantie', fr: 'Avant les vacances d’hiver', en: 'Until the Christmas holidays' } },
  nl: {
    slug: 'kerstvakantie-2026', nav: 'Kerstvakantie 2026', card: `${P(vk, 'nl')}, in heel België gelijk`,
    title: 'Kerstvakantie 2026-2027: data en aftellen voor elke school',
    description: 'Kerstvakantie 2026-2027 in België: van 21 december tot 3 januari in Vlaanderen en Wallonië-Brussel, in Ostbelgien tot 1 januari. Met aftelling en brugdagen.',
    h1: 'Kerstvakantie 2026-2027 in België',
    intro: 'Hoeveel nachtjes slapen nog tot de kerstvakantie, en welke data elke Gemeenschap hanteert. Kies het onderwijs en het schooljaar in de rekenaar.',
    resume: `De kerstvakantie van het schooljaar ${Y}-${Y + 1} begint in heel België op ${W(vk.van, 'nl')}. In het Nederlandstalig en in het Franstalig onderwijs loopt ze tot ${W(vk.tot, 'nl')}: twee volle weken, ${nV} vrije dagen op een rij en ${weekdagen} weekdagen zonder les. De Duitstalige Gemeenschap publiceert ${P(gk, 'nl')}, maandag tot vrijdag; met de weekends ervoor en erna gerekend zijn dat ${nG} dagen. Het is dit schooljaar de enige vakantie die in de drie Gemeenschappen precies samenvalt, omdat de hervorming van het Franstalig onderwijs de wintervakantie aan Kerstmis gekoppeld liet. Kerstdag valt op ${W(kerst, 'nl')}, Nieuwjaar op ${W(nj, 'nl')}; beide zijn wettelijke feestdagen op een weekdag, dus zonder vervangingsdag. Ouders die ${brug.verlof} verlofdagen nemen tussen Kerstmis en Nieuwjaar, zijn ${brug.vrij} dagen thuis, van ${D(brug.vrijVan, 'nl')} tot ${D(brug.vrijTot, 'nl')}.`,
    faqs: [
      { q: 'Valt de kerstvakantie dit jaar overal in België op dezelfde dagen?', a: `Ja. Vlaamse, Franstalige en Duitstalige scholen sluiten op vrijdag ${D(K.plusDagen(vk.van, -3), 'nl')} en zijn vrij vanaf ${D(vk.van, 'nl')}. Ostbelgien publiceert de vakantie tot vrijdag ${D(gk.tot, 'nl')}, maar het weekend erna is uiteraard ook vrij, zodat de lessen overal op ${W(K.plusDagen(vk.tot, 1), 'nl')} hervatten.` },
      { q: 'Moet ik verlof nemen op Kerstmis en Nieuwjaar?', a: `Nee. Kerstmis en Nieuwjaar zijn wettelijke feestdagen en vallen in ${Y}-${Y + 1} op een ${WD(kerst, 'nl')}. Tussen beide liggen vier werkdagen; wie die als verlof neemt, heeft ${brug.vrij} dagen aaneen vrij. Kerstavond en oudejaarsavond zijn gewone werkdagen, tenzij uw sectorakkoord of werkgever er anders over beslist.` },
      { q: 'Wanneer valt de kerstvakantie 2027-2028?', a: `Van ${P(vk27, 'nl')} in Vlaanderen en van ${P(fk27, 'nl')} in het Franstalig onderwijs. Ostbelgien publiceert ${P(gk27, 'nl')}, met ${D('2027-12-24', 'nl')} als extra vrije dag ervoor. Een jaar later begint de Vlaamse kerstvakantie op ${D(vk28.van, 'nl')}.` },
    ],
    body: (h) => `<h2>Eén kerstvakantie voor de drie Gemeenschappen</h2>
<p>De data staan in de officiële kalenders van ${h.src('vg-vakanties', 'vlaanderen.be')}, ${h.src('fwb-calendrier', 'enseignement.be')} en de ${h.src('dg-kalender', 'Duitstalige Gemeenschap')}. In Vlaanderen geldt een vaste regel: de vakantie begint op de maandag van de week waarin Kerstmis valt, en duurt twee weken. Kerstmis ${Y} is een ${WD(kerst, 'nl')}, dus start ze op ${D(vk.van, 'nl')}. De Fédération Wallonie-Bruxelles noemt ze vacances d’hiver en legt ze dit jaar in dezelfde twee weken.</p>
${h.table(['Gemeenschap', 'Kerstvakantie', 'Dagen op een rij'], [['Vlaamse Gemeenschap', P(vk, 'nl'), nV], ['Fédération Wallonie-Bruxelles', P(fk, 'nl'), K.dagen(fk)], ['Duitstalige Gemeenschap', P(K.blok(gk), 'nl'), nG]], `Kerstvakantie ${Y}-${Y + 1}, weekends inbegrepen`, ['l', 'l', 'r'])}
<h2>Verlof plannen rond de feestdagen</h2>
<p>Voor werkende ouders is dit een gunstig jaar: de twee feestdagen vallen op een weekdag en liggen een week uit elkaar. De dagen van ${D(brug.verlofVan, 'nl')} tot ${D(brug.verlofTot, 'nl')} overbruggen de kloof. De eerste vakantieweek, van ${D(vk.van, 'nl')} tot ${D(K.plusDagen(vk.van, 3), 'nl')}, kost nog eens vier verlofdagen voor wie de kinderen niet naar opvang wil sturen. De wettelijke regels rond feestdagen legt de ${h.src('fod-feestdagen', 'FOD Werkgelegenheid')} uit; alle bruggen van het volgende jaar staan op ${h.a('brugdagen-2027', 'brugdagen 2027')}.</p>
${h.mini('bt', { p: ['jaar', 'verlof'], d: { jaar: Y, verlof: brug.verlof }, c: 'Uw verlof optimaal verdelen' })}
<h2>Na de kerstvakantie</h2>
<p>De lessen hervatten op ${W(K.plusDagen(vk.tot, 1), 'nl')}. Daarna gaan de kalenders weer uiteen: de Vlaamse krokusvakantie valt al in februari, de Franstalige twee weken later. Wie beide systemen volgt, vindt de volgende vakantie op ${h.a('krokusvakantie-2027', 'krokusvakantie 2027')}.</p>`,
  },
  fr: {
    slug: 'vacances-d-hiver-2026', nav: 'Vacances d’hiver 2026', card: `${P(fk, 'fr')}, identiques partout`,
    title: 'Vacances d’hiver 2026-2027 : dates de Noël et décompte',
    description: 'Vacances d’hiver 2026-2027 en Belgique : du 21 décembre au 3 janvier en Fédération Wallonie-Bruxelles comme en Flandre. Compte à rebours et ponts de Noël.',
    h1: 'Vacances d’hiver 2026-2027 (Noël) en Belgique',
    intro: 'Le temps qu’il reste avant les vacances de Noël et leurs dates dans chaque Communauté. Choisissez l’enseignement et l’année scolaire dans l’outil.',
    resume: `Les vacances d’hiver ${Y}-${Y + 1} commencent dans toutes les écoles du pays le ${W(fk.van, 'fr')}. En Fédération Wallonie-Bruxelles comme dans l’enseignement néerlandophone, elles durent jusqu’au ${W(fk.tot, 'fr')}, soit deux semaines pleines : ${K.dagen(fk)} jours d’affilée, dont ${weekdagen} jours de semaine sans cours. La Communauté germanophone publie la période du ${P(gk, 'fr')}, du lundi au vendredi, soit ${nG} jours en comptant les week-ends qui l’encadrent. C’est le seul congé de l’année que les trois Communautés partagent entièrement : la réforme des rythmes scolaires a laissé les vacances d’hiver accrochées à Noël. Noël tombe un ${WD(kerst, 'fr')}, le Nouvel An aussi ; ces deux jours fériés légaux, placés en semaine, ne donnent pas lieu à remplacement. Un parent qui pose ${brug.verlof} jours de congé entre les deux fêtes reste ${brug.vrij} jours chez lui, du ${D(brug.vrijVan, 'fr')} au ${D(brug.vrijTot, 'fr')}.`,
    faqs: [
      { q: 'Les écoles flamandes ont-elles aussi congé à Noël 2026 ?', a: `Oui, exactement aux mêmes dates : du ${P(vk, 'fr')}. Après l’automne décalé, c’est le premier congé commun aux deux grands réseaux en ${Y}-${Y + 1}. Les écoles d’Ostbelgien ferment elles aussi le ${D(gk.van, 'fr')}, et les cours reprennent partout le même lundi de janvier.` },
      { q: 'Faut-il poser congé le 24 et le 31 décembre ?', a: `Pour un salarié, oui en principe : la veille de Noël et la Saint-Sylvestre ne sont pas des jours fériés légaux. Certains secteurs ou employeurs les accordent. Les quatre jours entre Noël et le Nouvel An, du ${D(brug.verlofVan, 'fr')} au ${D(brug.verlofTot, 'fr')}, offrent ${brug.vrij} jours de repos pour ${brug.verlof} jours posés.` },
      { q: 'Quelles sont les dates des vacances d’hiver 2027-2028 ?', a: `Du ${P(fk27, 'fr')} en Fédération Wallonie-Bruxelles, et du ${P(vk27, 'fr')} en Flandre. Ostbelgien publie du ${P(gk27, 'fr')} et accorde en plus le vendredi ${D('2027-12-24', 'fr')}.` },
    ],
    body: (h) => `<h2>Un même congé d’hiver pour les trois Communautés</h2>
<p>Le ${h.src('fwb-calendrier', 'calendrier de la Fédération Wallonie-Bruxelles')} place les vacances d’hiver du ${P(fk, 'fr')}. ${h.src('vg-vakanties', 'Vlaanderen.be')} retient la même période pour la kerstvakantie, selon sa règle fixe : deux semaines à partir du lundi de la semaine de Noël. Le ${h.src('dg-kalender', 'calendrier germanophone')} suit le mouvement, en ne publiant que les jours ouvrables.</p>
${h.table(['Communauté', 'Vacances de Noël', 'Jours d’affilée'], [['Fédération Wallonie-Bruxelles', P(fk, 'fr'), K.dagen(fk)], ['Communauté flamande', P(vk, 'fr'), nV], ['Communauté germanophone', P(K.blok(gk), 'fr'), nG]], `Vacances d’hiver ${Y}-${Y + 1}, week-ends compris`, ['l', 'l', 'r'])}
<h2>Organiser la garde et les congés des parents</h2>
<p>Deux semaines sans école, c’est dix jours ouvrables à couvrir. Les deux jours fériés en retirent deux, et les quatre jours entre les fêtes forment le pont le plus rentable de la saison. La première semaine, du ${D(fk.van, 'fr')} au ${D(K.plusDagen(fk.van, 3), 'fr')}, demande encore quatre jours de congé ou une solution de garde. Le ${h.src('fod-feestdagen', 'SPF Emploi')} rappelle les règles des jours fériés ; tous les ponts de l’année suivante sont sur ${h.a('brugdagen-2027', 'ponts 2027')}.</p>
${h.mini('bt', { p: ['jaar', 'verlof'], d: { jaar: Y, verlof: brug.verlof }, c: 'Placer vos jours de congé au mieux' })}
<h2>La rentrée de janvier</h2>
<p>Les cours reprennent le ${W(K.plusDagen(fk.tot, 1), 'fr')}. Ensuite, les calendriers se séparent à nouveau : le carnaval flamand tombe dès février, le congé de détente francophone deux semaines plus tard. Le détail est sur ${h.a('krokusvakantie-2027', 'congé de détente 2027')}.</p>`,
  },
  en: {
    slug: 'christmas-holidays-2026', nav: 'Christmas holidays 2026', card: `${P(vk, 'en')}, the same everywhere`,
    title: 'Christmas holidays 2026-2027: Belgian school dates',
    description: 'Christmas holidays 2026-2027 in Belgium: 21 December to 3 January in Flemish and French-language schools, to 1 January in Ostbelgien. Countdown and bridge days.',
    h1: 'Christmas holidays 2026-2027 in Belgium',
    intro: 'How long until the Christmas break, and the dates each Community uses. Choose the school system and year in the tool.',
    resume: `The ${Y}-${Y + 1} Christmas holidays begin in every Belgian school on ${W(vk.van, 'en')}. Dutch-language and French-language schools stay closed until ${W(vk.tot, 'en')}: two full weeks, ${nV} days in a row and ${weekdagen} weekdays without lessons. The German-speaking Community publishes ${P(gk, 'en')}, Monday to Friday, or ${nG} days counting the weekends either side. It is the only break all three Communities share this school year, because the French-language reform kept the winter break tied to Christmas. Christmas Day is a ${WD(kerst, 'en')} and so is New Year’s Day; as statutory holidays on weekdays they carry no replacement day. Working parents who book the ${brug.verlof} working days between the two holidays get ${brug.vrij} days off in a row, from ${D(brug.vrijVan, 'en')} to ${D(brug.vrijTot, 'en')}.`,
    faqs: [
      { q: 'Do all Belgian schools break up on the same day for Christmas 2026?', a: `Yes. Flemish, French-language and German-speaking schools close after Friday ${D(K.plusDagen(vk.van, -3), 'en')} and lessons resume everywhere on ${W(K.plusDagen(vk.tot, 1), 'en')}. Ostbelgien’s published dates end on Friday ${D(gk.tot, 'en')}, but the weekend that follows is free as well. No Community has a different Christmas break this year.` },
      { q: 'Are Christmas Eve and New Year’s Eve public holidays in Belgium?', a: `No. Only 25 December and 1 January are statutory holidays; 24 and 31 December are ordinary working days unless your sector or employer gives them off. Booking ${D(brug.verlofVan, 'en')} to ${D(brug.verlofTot, 'en')} gives ${brug.vrij} days off for ${brug.verlof} days of leave.` },
      { q: 'When are the Christmas holidays 2027-2028?', a: `${P(vk27, 'en')} in Flemish schools and ${P(fk27, 'en')} in French-language schools. Ostbelgien publishes ${P(gk27, 'en')} and adds Friday ${D('2027-12-24', 'en')} as an extra day off.` },
    ],
    body: (h) => `<h2>One Christmas break across the country</h2>
<p>The dates come from the official calendars on ${h.src('vg-vakanties', 'vlaanderen.be')}, ${h.src('fwb-calendrier', 'enseignement.be')} and from the ${h.src('dg-kalender', 'German-speaking Community')}. Flanders uses a fixed rule: two weeks from the Monday of the week containing Christmas Day. With Christmas on a ${WD(kerst, 'en')}, that Monday is ${D(vk.van, 'en')}. The Fédération Wallonie-Bruxelles calls it the vacances d’hiver and has placed it in the same fortnight.</p>
${h.table(['Community', 'Christmas holidays', 'Days in a row'], [['Flemish Community', P(vk, 'en'), nV], ['Fédération Wallonie-Bruxelles', P(fk, 'en'), K.dagen(fk)], ['German-speaking Community', P(K.blok(gk), 'en'), nG]], `Christmas holidays ${Y}-${Y + 1}, weekends included`, ['l', 'l', 'r'])}
<h2>Covering the fortnight as a working parent</h2>
<p>Two weeks without school means ten weekdays to cover. The two public holidays take care of two, and the four days between them are the best-value bridge of the season. The first week, ${D(vk.van, 'en')} to ${D(K.plusDagen(vk.van, 3), 'en')}, needs another four days of leave or childcare. The ${h.src('fod-feestdagen', 'federal employment service')} sets out the public-holiday rules, and next year’s bridges are on ${h.a('brugdagen-2027', 'bridge days 2027')}.</p>
${h.mini('bt', { p: ['jaar', 'verlof'], d: { jaar: Y, verlof: brug.verlof }, c: 'Plan your leave days' })}
<h2>Back to school in January</h2>
<p>After ${D(vk.tot, 'en')} the calendars split again: the Flemish carnival break comes in early February, the French-language one a fortnight later. See ${h.a('krokusvakantie-2027', 'carnival break 2027')} for both.</p>`,
  },
});
