/** Herfstvakantie 2026 : Vlaanderen (2–8 nov.), FWB (Toussaint, 2 semaines), DG. Dates : moteur via _data.ts. */
import { defineGuide } from '../../lib/page-types';
import { K, VG, FWB, DG, P, D, W, nDagen } from '../_data';

const Y = 2026;
const v = VG(Y), f = FWB(Y), g = DG(Y);
const vh = v.herfst, fh = f.herfst, gh = g.herfst!;
const nV = nDagen('VG', Y, 'herfst'), nF = nDagen('FWB', Y, 'herfst');
const lesVoor = (() => { let c = 0; for (let d = K.fromIso(v.start!); d < K.fromIso(vh.van); d++) if (!K.isWeekend(d)) c++; return c; })();
const lesVoorF = (() => { let c = 0; for (let d = K.fromIso(f.start!); d < K.fromIso(fh.van); d++) if (!K.isWeekend(d) && d !== K.fromIso(`${Y}-09-27`)) c++; return c; })();
const h27 = VG(Y + 1).herfst, f27 = FWB(Y + 1).herfst;

export default defineGuide({
  id: 'herfstvakantie-2026', group: 'school', order: 3, tool: 'vk', toolArg: { vak: 'herfst', sj: Y },
  related: ['kerstvakantie-2026', 'vergelijker', 'vrije-dagen-school', 'home'],
  sources: ['vg-vakanties', 'fwb-calendrier', 'dg-kalender'],
  countdown: { date: vh.van, label: { nl: 'Nog tot de herfstvakantie in Vlaanderen', fr: 'Avant le congé d’automne en Flandre', en: 'Until the autumn break in Flanders' } },
  nl: {
    slug: 'herfstvakantie-2026', nav: 'Herfstvakantie 2026', card: `Vlaanderen ${P(vh, 'nl')}, Franstalig twee weken`,
    title: 'Herfstvakantie 2026: data in Vlaanderen, Brussel en Wallonië',
    description: `Herfstvakantie 2026: in Vlaanderen van 2 tot 8 november, in het Franstalig onderwijs twee weken vanaf 19 oktober. Met aftelling en de data voor 2027 en 2028.`,
    h1: 'Herfstvakantie 2026 in België',
    intro: 'Hoe lang het nog duurt tot de herfstvakantie, en wanneer ze valt in de drie Gemeenschappen. Kies het onderwijs en het schooljaar in de rekenaar.',
    resume: `De herfstvakantie 2026 valt in het Nederlandstalig onderwijs van ${W(vh.van, 'nl')} tot ${W(vh.tot, 'nl')}: één week, ${nV} vrije dagen met de weekends. Ze is in Vlaanderen altijd de week van 1 november, en omdat Allerheiligen dit jaar op een zondag valt, schuift ze naar de week erna. Het Franstalig onderwijs van de Fédération Wallonie-Bruxelles heeft sinds de hervorming van de schoolritmes twee weken vrij: van ${W(fh.van, 'nl')} tot ${W(fh.tot, 'nl')}, en ook ${W(`${Y}-11-02`, 'nl')} (Allerzielen) is daar nog vrij. In Ostbelgien volgt de school de Vlaamse week: vrij van ${P(gh, 'nl')}, maandag tot vrijdag. Wapenstilstand, ${W(`${Y}-11-11`, 'nl')}, is overal een losse vrije dag. Kinderen in een Vlaamse en een Franstalige school hebben dus alleen ${D(`${Y}-11-02`, 'nl')} samen vrij in die periode.`,
    faqs: [
      { q: 'Waarom valt de Vlaamse herfstvakantie in 2026 zo laat?', a: `Omdat de regel de week van 1 november neemt, en 1 november ${Y} een zondag is. Die zondag sluit de week van 26 oktober af, maar de kalender schuift in dat geval een week op, naar ${P(vh, 'nl')}. In ${Y + 1} valt 1 november op een maandag en loopt de vakantie van ${P(h27, 'nl')}.` },
      { q: 'Hoe lang duurt de herfstvakantie in het Franstalig onderwijs?', a: `Twee weken, van ${P(fh, 'nl')}. Sinds de hervorming van 2022 zijn de herfst- en de krokusvakantie in de Fédération Wallonie-Bruxelles verlengd, in ruil voor een kortere zomer. In ${Y} komt Allerzielen op maandag ${D(`${Y}-11-02`, 'nl')} er nog bij.` },
      { q: 'Is 11 november ook vrij?', a: `Ja, in de drie Gemeenschappen. Wapenstilstand is een wettelijke feestdag en een vrije dag op school. In ${Y} valt hij op een ${K.weekday(K.fromIso(`${Y}-11-11`)) === 3 ? 'woensdag' : 'weekdag'}, drie dagen na het einde van de Vlaamse herfstvakantie. Voor werknemers is het een gewone wettelijke feestdag: valt hij in het weekend, dan volgt een vervangingsdag.` },
    ],
    body: (h) => `<h2>Herfstvakantie 2026 per Gemeenschap</h2>
<p>De drie Gemeenschappen hebben in het najaar van ${Y} elk een eigen herfstvakantie. In het Vlaamse onderwijs, ook in de Nederlandstalige scholen van Brussel, is het één week: ${P(vh, 'nl')}. In het Franstalig onderwijs zijn het er twee, met de naam vacances d'automne of congé de Toussaint: ${P(fh, 'nl')}. In de Duitstalige Gemeenschap heten ze Allerheiligenferien en lopen ze van ${P(gh, 'nl')}. De data komen van ${h.src('vg-vakanties', 'vlaanderen.be')}, ${h.src('fwb-calendrier', 'enseignement.be')} en de ${h.src('dg-kalender', 'kalender van de Duitstalige Gemeenschap')}.</p>
${h.table(['Gemeenschap', 'Herfstvakantie', 'Dagen vrij op een rij'], [['Vlaamse Gemeenschap', P(vh, 'nl'), nV], ['Fédération Wallonie-Bruxelles', P(fh, 'nl'), nF], ['Duitstalige Gemeenschap', P(K.blok(gh), 'nl'), K.dagen(K.blok(gh))]], `Herfstvakantie ${Y}, met de weekends`, ['l', 'l', 'r'])}
<h2>Twee weken na elkaar, geen enkele samen</h2>
<p>Voor gezinnen met kinderen in beide systemen is dit najaar onhandig. De Franstalige vakantie eindigt op zondag ${D(fh.tot, 'nl')}; de Vlaamse begint de dag na Allerzielen. Behalve die maandag hebben de kinderen geen enkele weekdag samen vrij. Wie toch een paar dagen samen weg wil, kan kijken naar het verlengde weekend van Wapenstilstand of naar de kerstvakantie, die in ${Y}-${Y + 1} in beide Gemeenschappen gelijk loopt. De ${h.a('vergelijker', 'vergelijker')} toont het hele schooljaar.</p>
${h.mini('vg', { p: ['a', 'b'], c: 'Alle vakanties van twee kinderen vergelijken' })}
<h2>Hoeveel schooldagen tot de vakantie</h2>
<p>In Vlaanderen begon het schooljaar op ${W(v.start!, 'nl')}. Tot de herfstvakantie zijn dat ${lesVoor} schooldagen van maandag tot vrijdag, een lange eerste periode. In het Franstalig onderwijs, dat eind augustus begon, liggen er ${lesVoorF} lesdagen tussen de start en de vakantie. Pedagogische studiedagen van de school zijn in die tellingen niet afgetrokken: die staan alleen in de kalender van uw school.</p>
<h2>De herfstvakantie in de komende jaren</h2>
<p>In ${Y + 1} valt de Vlaamse herfstvakantie van ${P(h27, 'nl')} en de Franstalige van ${P(f27, 'nl')}: dan overlappen ze wel een week. De rekenaar bovenaan toont de data tot 2029-2030 voor Vlaanderen; voor de andere Gemeenschappen staat er "nog niet gepubliceerd" zodra er geen officiële kalender is.</p>`,
  },
  fr: {
    slug: 'conge-d-automne-2026', nav: 'Congé d’automne 2026', card: `FWB ${P(fh, 'fr')}, Flandre une semaine`,
    title: 'Congé d’automne 2026 : Toussaint en Wallonie et en Flandre',
    description: 'Congé d’automne 2026 : deux semaines en Fédération Wallonie-Bruxelles dès le 19 octobre, du 2 au 8 novembre en Flandre. Compte à rebours et dates 2027 et 2028.',
    h1: 'Congé d’automne 2026 (Toussaint) en Belgique',
    intro: 'Le temps qu’il reste avant le congé de Toussaint et ses dates dans les trois Communautés. Choisissez l’enseignement et l’année scolaire dans l’outil.',
    resume: `En Fédération Wallonie-Bruxelles, les vacances d’automne 2026 durent deux semaines, du ${W(fh.van, 'fr')} au ${W(fh.tot, 'fr')}, soit ${nF} jours de congé d’affilée, week-ends compris. Le lundi ${D(`${Y}-11-02`, 'fr')}, fête des morts, prolonge encore le congé d’un jour pour les élèves francophones. Cette durée de deux semaines date de la réforme des rythmes scolaires de 2022, qui a raccourci l’été pour mieux répartir le repos dans l’année. Les écoles néerlandophones de Flandre et de Bruxelles n’ont qu’une semaine, et plus tard : du ${W(vh.van, 'fr')} au ${W(vh.tot, 'fr')}, parce que leur règle retient la semaine du 1er novembre et que le 1er novembre ${Y} est un dimanche. En Ostbelgien, l’école ferme du ${P(gh, 'fr')}. Le ${W(`${Y}-11-11`, 'fr')}, jour de l’Armistice, est libre partout. Deux enfants dans les deux réseaux n’ont donc que le ${D(`${Y}-11-02`, 'fr')} en commun sur cette période.`,
    faqs: [
      { q: 'Pourquoi la Toussaint dure-t-elle deux semaines en Fédération Wallonie-Bruxelles ?', a: 'Depuis l’année 2022-2023, le calendrier francophone alterne environ sept semaines de cours et deux semaines de congé. Les vacances d’automne et le congé de détente sont passés à deux semaines, et l’été a été raccourci d’autant. La Flandre n’a pas suivi cette réforme.' },
      { q: 'Le 2 novembre 2026 est-il un jour de congé ?', a: `Oui pour les écoles de la Fédération Wallonie-Bruxelles : le calendrier officiel y place la fête des morts, le lundi qui suit les vacances d’automne. Les écoles néerlandophones sont alors en congé d’automne, du ${P(vh, 'fr')}. Ce n’est pas un jour férié légal pour les travailleurs.` },
      { q: 'Quand sera le congé d’automne 2027 ?', a: `Du ${P(f27, 'fr')} en Fédération Wallonie-Bruxelles et du ${P(h27, 'fr')} en Flandre. Les deux congés se chevauchent alors d’une semaine, ce qui n’est pas le cas en ${Y}. Une famille dont les enfants fréquentent les deux réseaux pourra donc partir ensemble pendant cette semaine commune.` },
    ],
    body: (h) => `<h2>Les vacances d’automne 2026 par Communauté</h2>
<p>Chaque Communauté fixe ses propres vacances d’automne. Côté francophone, le ${h.src('fwb-calendrier', 'calendrier de la Fédération Wallonie-Bruxelles')} prévoit deux semaines, du ${P(fh, 'fr')}. Côté néerlandophone, ${h.src('vg-vakanties', 'vlaanderen.be')} annonce une semaine, du ${P(vh, 'fr')}, qui vaut aussi pour les écoles flamandes de Bruxelles. La ${h.src('dg-kalender', 'Communauté germanophone')} a placé ses Allerheiligenferien du ${P(gh, 'fr')}, du lundi au vendredi.</p>
${h.table(['Communauté', 'Congé d’automne', 'Jours d’affilée'], [['Fédération Wallonie-Bruxelles', P(fh, 'fr'), nF], ['Communauté flamande', P(vh, 'fr'), nV], ['Communauté germanophone', P(K.blok(gh), 'fr'), K.dagen(K.blok(gh))]], `Congé d’automne ${Y}, week-ends compris`, ['l', 'l', 'r'])}
<h2>Deux congés qui se suivent sans se toucher</h2>
<p>Pour une famille dont un enfant fréquente une école francophone et l’autre une école néerlandophone, cet automne est mal agencé. Le congé francophone se termine le dimanche ${D(fh.tot, 'fr')} ; le congé flamand commence le lendemain de la fête des morts. Hormis ce lundi, aucun jour de semaine n’est libre pour les deux enfants à la fois. Pour partir ensemble, le long week-end du 11 novembre ou les vacances d’hiver, identiques dans les deux Communautés en ${Y}-${Y + 1}, conviennent mieux. Le ${h.a('vergelijker', 'comparateur')} couvre toute l’année.</p>
${h.mini('vg', { p: ['a', 'b'], d: { a: 'FWB', b: 'VG' }, c: 'Comparer tous les congés de deux enfants' })}
<h2>Combien de jours de classe avant le congé</h2>
<p>L’année francophone a commencé le ${W(f.start!, 'fr')}. Jusqu’à la Toussaint, cela fait ${lesVoorF} jours de classe du lundi au vendredi, le 27 septembre (fête de la Communauté française) tombant cette année un dimanche. En Flandre, la rentrée du ${W(v.start!, 'fr')} laisse ${lesVoor} jours de classe avant le congé. Les journées pédagogiques propres à chaque école ne sont pas déduites : seule l’école les connaît.</p>
<h2>Les années suivantes</h2>
<p>En ${Y + 1}, la Toussaint francophone ira du ${P(f27, 'fr')} et le congé flamand du ${P(h27, 'fr')}, avec une semaine commune. L’outil affiche les dates jusqu’en ${Y + 2}-${Y + 3} pour la Fédération, dernière année publiée, et jusqu’en 2029-2030 pour la Flandre.</p>`,
  },
  en: {
    slug: 'autumn-break-2026', nav: 'Autumn break 2026', card: `Flanders ${P(vh, 'en')}, French schools two weeks`,
    title: 'Autumn break 2026 Belgium: Flanders, Brussels and Wallonia',
    description: 'Autumn break 2026 in Belgium: 2 to 8 November in Flemish schools, two weeks from 19 October in French-language schools, with a countdown and later dates.',
    h1: 'Autumn break 2026 in Belgium',
    intro: 'How long until the autumn (All Saints) break, and when it falls in each of the three Communities. Choose the school system and year in the tool.',
    resume: `Belgium’s autumn break 2026 depends on the language of the school. Dutch-language schools in Flanders and Brussels are off for one week, ${W(vh.van, 'en')} to ${W(vh.tot, 'en')}, ${nV} days in a row with the weekends. Their rule takes the week of 1 November, and because 1 November ${Y} is a Sunday the break moves to the following week. French-language schools of the Fédération Wallonie-Bruxelles have two weeks, ${W(fh.van, 'en')} to ${W(fh.tot, 'en')}, plus All Souls’ Day on ${W(`${Y}-11-02`, 'en')}; the two-week autumn break came with the 2022 reform of the school year. Schools in Ostbelgien, the German-speaking east, are off ${P(gh, 'en')}, Monday to Friday. Armistice Day, ${W(`${Y}-11-11`, 'en')}, is a day off everywhere. A child in a Flemish school and a sibling in a French-language school therefore share only ${D(`${Y}-11-02`, 'en')} during this period.`,
    faqs: [
      { q: 'Why is the Flemish autumn break so late in 2026?', a: `The Flemish rule takes the week of 1 November. When 1 November is a Sunday, as in ${Y}, the break moves to the next week, ${P(vh, 'en')}. In ${Y + 1}, 1 November is a Monday and the break runs ${P(h27, 'en')}.` },
      { q: 'Do French-language schools really have two weeks off in autumn?', a: `Yes. Since 2022-2023 the Fédération Wallonie-Bruxelles alternates roughly seven weeks of lessons with two weeks off, so the autumn and carnival breaks last two weeks and summer is shorter. In ${Y} the break runs ${P(fh, 'en')}, followed by All Souls’ Day.` },
      { q: 'When is the autumn break 2027?', a: `${P(h27, 'en')} in Flemish schools and ${P(f27, 'en')} in French-language schools. Unlike ${Y}, the two overlap by one week, so a family with children in both systems can plan a few days away together. Schools in Ostbelgien follow the Flemish week, Monday to Friday.` },
    ],
    body: (h) => `<h2>Autumn break 2026 by Community</h2>
<p>Each Community sets its own autumn break. ${h.src('vg-vakanties', 'Vlaanderen.be')} lists one week for Flemish schools, ${P(vh, 'en')}, which also applies to Dutch-language schools in Brussels. The ${h.src('fwb-calendrier', 'Fédération Wallonie-Bruxelles calendar')} gives French-language schools two weeks, ${P(fh, 'en')}. The ${h.src('dg-kalender', 'German-speaking Community')} has its Allerheiligenferien ${P(gh, 'en')}, Monday to Friday.</p>
${h.table(['Community', 'Autumn break', 'Days in a row'], [['Flemish Community', P(vh, 'en'), nV], ['Fédération Wallonie-Bruxelles', P(fh, 'en'), nF], ['German-speaking Community', P(K.blok(gh), 'en'), K.dagen(K.blok(gh))]], `Autumn break ${Y}, weekends included`, ['l', 'l', 'r'])}
<h2>Back to back, with almost no overlap</h2>
<p>This autumn is awkward for families with children in both systems. The French-language break ends on Sunday ${D(fh.tot, 'en')}; the Flemish one starts the day after All Souls’ Day. Apart from that Monday, the children have no weekday off together. For a few days away as a family, the long Armistice weekend or the Christmas holidays, identical in both Communities in ${Y}-${Y + 1}, work better. The ${h.a('vergelijker', 'comparison tool')} covers the whole year.</p>
${h.mini('vg', { p: ['a', 'b'], c: 'Compare every break for two children' })}
<h2>School days until the break</h2>
<p>Flemish schools started on ${W(v.start!, 'en')}, which leaves ${lesVoor} school days from Monday to Friday before the autumn break, a long first term. French-language schools started in late August and have ${lesVoorF} lesson days before theirs. Each school’s own in-service days are not deducted; only the school knows them.</p>
<h2>The autumn break in later years</h2>
<p>In ${Y + 1} the Flemish break runs ${P(h27, 'en')} and the French-language one ${P(f27, 'en')}, overlapping by a week. The tool shows Flemish dates up to 2029-2030 and the other Communities up to their last published year, then says "not yet published".</p>`,
  },
});
