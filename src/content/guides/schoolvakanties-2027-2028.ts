/** Schooljaar 2027-2028 in de drie Gemeenschappen. Data : moteur via _data.ts. */
import { defineGuide } from '../../lib/page-types';
import type { Lang } from '../../lib/format';
import { K, VG, FWB, DG, P, D, W, nDagen } from '../_data';

const Y = 2027;
const v = VG(Y), f = FWB(Y), g = DG(Y);
const ps = K.paaszondag(Y + 1);
const gb = (p: { van: string; tot: string }) => K.blok(p);
const nPV = nDagen('VG', Y, 'pasen'), nPF = nDagen('FWB', Y, 'pasen'), nPG = nDagen('DG', Y, 'pasen');
const cmp = (a: 'VG' | 'FWB' | 'DG', b: 'VG' | 'FWB' | 'DG') => { const A = K.vakantieSet(a, Y), B = K.vakantieSet(b, Y); return [...A].filter((d) => B.has(d) && !K.isWeekend(d)).length; };
const samen = cmp('VG', 'FWB');
const rows = (l: Lang) => K.VAKS.map((x) => [K.VAK_NAME.VG[x][l], v[x] ? P(v[x], l) : '', f[x] ? P(f[x], l) : '', g[x] ? P(gb(g[x]!), l) : '']);

export default defineGuide({
  id: 'schoolvakanties-2027-2028', group: 'school', order: 1, tool: 'sv', toolArg: { sj: Y },
  related: ['home', 'schoolvakanties-2028-2029', 'vergelijker', 'ostbelgien'],
  sources: ['vg-vakanties', 'fwb-calendrier', 'dg-kalender'],
  nl: {
    slug: 'schoolvakanties-2027-2028', nav: 'Schoolvakanties 2027-2028', card: `Start ${D(v.start!, 'nl')}, late Pasen`,
    title: 'Schoolvakanties 2027-2028: data in de drie Gemeenschappen',
    description: 'Schoolvakanties 2027-2028 in Vlaanderen, de Fédération Wallonie-Bruxelles en Ostbelgien: start, herfst, kerst, krokus, Pasen en zomer, met de losse vrije dagen.',
    h1: 'Schoolvakanties 2027-2028 in België',
    intro: 'Het volledige schooljaar 2027-2028 per Gemeenschap: kies het onderwijs in de rekenaar en zie elke vakantie met begin, einde en aantal dagen.',
    resume: `Het schooljaar 2027-2028 begint in Vlaanderen op ${W(v.start!, 'nl')} en in het Franstalig onderwijs al op ${W(f.start!, 'nl')}. De Vlaamse herfstvakantie loopt van ${P(v.herfst, 'nl')}, de Franstalige van ${P(f.herfst, 'nl')}, zodat beide Gemeenschappen één week samen vrij hebben. Kerst valt gelijk: ${P(v.kerst, 'nl')}. De krokusvakantie begint overal op ${D(v.krokus.van, 'nl')}, maar duurt in het Franstalig onderwijs twee weken, tot ${D(f.krokus.tot, 'nl')}. Omdat Pasen ${Y + 1} laat valt, op ${D(ps, 'nl')}, loopt de Vlaamse paasvakantie van ${P(v.pasen, 'nl')}, ${nPV} dagen inclusief Paasmaandag. Ostbelgien wijkt dit jaar af met ${P(g.pasen!, 'nl')}, en het Franstalig onderwijs heeft lentevakantie van ${P(f.pasen, 'nl')}. De zomer begint in Vlaanderen op ${D(v.zomer.van, 'nl')} en in het Franstalig onderwijs op ${D(f.zomer!.van, 'nl')}. Samen tellen Vlaamse en Franstalige leerlingen ${samen} gemeenschappelijke vakantiedagen op weekdagen.`,
    faqs: [
      { q: 'Waarom duurt de Vlaamse paasvakantie 2028 vijftien dagen?', a: `Pasen ${Y + 1} valt na 15 april, op ${D(ps, 'nl')}. Dan begint de vakantie op de tweede maandag voor Pasen, ${D(v.pasen.van, 'nl')}, en omdat Paasmaandag direct op de tweede week volgt, hoort die er nog bij. Zo loopt de vakantie tot ${D(v.pasen.tot, 'nl')}.` },
      { q: 'Is 24 december 2027 vrij in Ostbelgien?', a: `Ja. De Duitstalige Gemeenschap geeft ${W(`${Y}-12-24`, 'nl')} vrij, de vrijdag voor haar kerstvakantie, die loopt van ${P(g.kerst!, 'nl')}. In Vlaanderen en in het Franstalig onderwijs begint de kerstvakantie pas op ${D(v.kerst.van, 'nl')}; 24 december is daar een gewone lesdag.` },
      { q: 'Wanneer begint het schooljaar 2027-2028?', a: `Op ${W(v.start!, 'nl')} in Vlaanderen en Ostbelgien, op ${W(f.start!, 'nl')} in het Franstalig onderwijs van Wallonië en Brussel. De laatste schooldag is ${W(v.laatste!, 'nl')} in Vlaanderen en ${W(f.laatste!, 'nl')} in het Franstalig onderwijs.` },
    ],
    body: (h) => `<h2>Overzicht per Gemeenschap</h2>
${h.table(['Vakantie', 'Vlaamse Gemeenschap', 'Fédération Wallonie-Bruxelles', 'Duitstalige Gemeenschap'], rows('nl'), `Schoolvakanties ${Y}-${Y + 1}, weekends inbegrepen`)}
<p>De Vlaamse data volgen uit de vaste regels die ${h.src('vg-vakanties', 'vlaanderen.be')} toepast en die de rekenaar narekent. De Franstalige data komen uit de kalender op ${h.src('fwb-calendrier', 'enseignement.be')}, de Duitstalige uit de ${h.src('dg-kalender', 'kalender 2026-2029 van de Duitstalige Gemeenschap')}, die maandag tot vrijdag vermeldt; in de tabel staan de weekends erbij.</p>
<h2>Een late Pasen verschuift de lente</h2>
<p>Pasen op ${D(ps, 'nl')} is een van de laatste data die mogelijk zijn. In Vlaanderen ligt de paasvakantie daardoor midden april, ${nPV} dagen lang. In Ostbelgien begint ze pas op Paasmaandag en duurt ze tot ${D(gb(g.pasen!).tot, 'nl')}, ${nPG} dagen met de weekends. Het Franstalig onderwijs koppelt de lentevakantie niet meer aan Pasen: ${P(f.pasen, 'nl')}, ${nPF} dagen. Wie in april een reis plant voor kinderen uit verschillende scholen, vindt dus geen enkele week waarin iedereen vrij is.</p>
${h.mini('vg', { p: ['a', 'b'], d: { sj: Y }, c: 'De kalenders van twee kinderen naast elkaar' })}
<h2>Losse vrije dagen</h2>
<p>In Vlaanderen zijn Wapenstilstand, de Dag van de Arbeid, Hemelvaart met de vrijdag erna en Pinkstermaandag vrij. Hemelvaart valt in ${Y + 1} pas op ${D(K.plusDagen(ps, 39), 'nl')}, Pinkstermaandag op ${D(K.plusDagen(ps, 50), 'nl')}. Het Franstalig onderwijs heeft daarnaast de feestdag van 27 september en een losse Paasmaandag, omdat die buiten de lentevakantie valt. Pedagogische studiedagen kiest elke school zelf; ze staan op ${h.a('vrije-dagen-school', 'vrije dagen op school')} uitgelegd.</p>`,
  },
  fr: {
    slug: 'vacances-scolaires-2027-2028', nav: 'Vacances scolaires 2027-2028', card: `Rentrée FWB le ${D(f.start!, 'fr')}`,
    title: 'Vacances scolaires 2027-2028 : dates des trois Communautés',
    description: 'Vacances scolaires 2027-2028 en Fédération Wallonie-Bruxelles, en Flandre et en Ostbelgien : rentrée, Toussaint, hiver, détente, printemps, été et congés.',
    h1: 'Vacances scolaires 2027-2028 en Belgique',
    intro: 'Toute l’année scolaire 2027-2028, Communauté par Communauté : choisissez l’enseignement dans l’outil pour voir chaque congé, ses dates et sa durée.',
    resume: `En Fédération Wallonie-Bruxelles, l’année 2027-2028 commence le ${W(f.start!, 'fr')} et se termine le ${W(f.laatste!, 'fr')}. Les vacances d’automne vont du ${P(f.herfst, 'fr')}, les vacances d’hiver du ${P(f.kerst, 'fr')}, le congé de détente du ${P(f.krokus, 'fr')}, les vacances de printemps du ${P(f.pasen, 'fr')} et l’été commence le ${D(f.zomer!.van, 'fr')}. En Flandre, la rentrée a lieu le ${W(v.start!, 'fr')} ; la Toussaint flamande, du ${P(v.herfst, 'fr')}, chevauche d’une semaine la francophone, et Noël coïncide entièrement. Pâques tombe tard en ${Y + 1}, le ${D(ps, 'fr')} : les vacances de Pâques flamandes vont donc du ${P(v.pasen, 'fr')}, et celles d’Ostbelgien du ${P(g.pasen!, 'fr')}. La Communauté germanophone accorde aussi le ${D(`${Y}-12-24`, 'fr')}. Un enfant en école francophone et un autre en école néerlandophone auront ${samen} jours de semaine de congé en commun sur l’année.`,
    faqs: [
      { q: 'Quand est la rentrée scolaire 2027 en Fédération Wallonie-Bruxelles ?', a: `Le ${W(f.start!, 'fr')}. Depuis la réforme des rythmes scolaires, la rentrée francophone a lieu fin août, un lundi. Les écoles flamandes reprennent le ${W(v.start!, 'fr')}, et la Communauté germanophone le même jour. Pour les familles qui ont un enfant dans chaque réseau, cela fait quelques jours de garde à prévoir à la fin du mois d’août.` },
      { q: 'Les vacances de printemps 2028 tombent-elles à Pâques ?', a: `Non. Côté francophone, elles vont du ${P(f.pasen, 'fr')}, plus de deux semaines après le lundi de Pâques (${D(K.plusDagen(ps, 1), 'fr')}), qui reste un congé isolé. En Flandre, les vacances de Pâques encadrent la fête : ${P(v.pasen, 'fr')}.` },
      { q: 'Le congé de détente 2028 commence-t-il le même jour qu’en Flandre ?', a: `Oui, le ${W(f.krokus.van, 'fr')}, mais il dure deux semaines côté francophone (jusqu’au ${D(f.krokus.tot, 'fr')}) contre une en Flandre (jusqu’au ${D(v.krokus.tot, 'fr')}). Les deux enfants d’une famille partagée entre les deux réseaux ont donc une semaine commune, puis l’enfant francophone reste seul en congé la semaine suivante. En Ostbelgien, le carnaval va du ${P(g.krokus!, 'fr')}.` },
    ],
    body: (h) => `<h2>Les congés par Communauté</h2>
${h.table(['Congé', 'Communauté flamande', 'Fédération Wallonie-Bruxelles', 'Communauté germanophone'], rows('fr'), `Vacances scolaires ${Y}-${Y + 1}, week-ends compris`)}
<p>Les dates francophones sont reprises du ${h.src('fwb-calendrier', 'calendrier publié sur enseignement.be')}. Les dates flamandes résultent des règles fixes que publie ${h.src('vg-vakanties', 'vlaanderen.be')} et que l’outil recalcule. Les dates germanophones viennent du ${h.src('dg-kalender', 'calendrier 2026-2029 de la Communauté germanophone')}, publié du lundi au vendredi ; le tableau ajoute les week-ends.</p>
<h2>Un printemps éclaté</h2>
<p>Avec Pâques le ${D(ps, 'fr')}, les trois Communautés partent en congé à des moments différents. La Flandre est libre ${nPV} jours autour de Pâques, Ostbelgien ${nPG} jours à partir du lundi de Pâques, la Fédération ${nPF} jours début mai. Aucune semaine d’avril ou de mai n’est commune aux trois. Pour des familles réparties entre deux réseaux, l’été et l’hiver restent les seuls longs congés partagés.</p>
${h.mini('vg', { p: ['a', 'b'], d: { a: 'FWB', b: 'VG', sj: Y }, c: 'Comparer les congés de deux enfants' })}
<h2>Jours de congé isolés</h2>
<p>Côté francophone : la fête de la Communauté française le 27 septembre, l’Armistice, le lundi de Pâques, l’Ascension (${D(K.plusDagen(ps, 39), 'fr')}) et le lundi de Pentecôte (${D(K.plusDagen(ps, 50), 'fr')}). Côté flamand s’ajoutent la fête du Travail et le vendredi après l’Ascension. En Ostbelgien, le 15 novembre et le 24 décembre sont libres. Les journées pédagogiques restent fixées école par école ; voir ${h.a('vrije-dagen-school', 'jours de congé à l’école')}.</p>`,
  },
  en: {
    slug: 'school-holidays-2027-2028', nav: 'School holidays 2027-2028', card: `Late Easter, ${P(v.pasen, 'en')}`,
    title: 'School holidays 2027-2028 Belgium: every break, all systems',
    description: 'School holidays 2027-2028 in Flanders, the Fédération Wallonie-Bruxelles and Ostbelgien: start of term, autumn, Christmas, carnival, Easter and summer.',
    h1: 'School holidays in Belgium 2027-2028',
    intro: 'The whole 2027-2028 school year for each Community: choose the school system in the tool to see every break with its first day, last day and length.',
    resume: `The 2027-2028 school year starts on ${W(v.start!, 'en')} in Flemish and German-speaking schools and on ${W(f.start!, 'en')} in French-language schools. Flemish pupils have the autumn break ${P(v.herfst, 'en')}; French-language pupils are off ${P(f.herfst, 'en')}, so the two overlap by one week. Christmas is shared: ${P(v.kerst, 'en')}. Carnival starts everywhere on ${D(v.krokus.van, 'en')}, lasting one week in Flanders and two in French-language schools. Easter ${Y + 1} is late, on ${D(ps, 'en')}, so the Flemish Easter holidays run ${P(v.pasen, 'en')}, ${nPV} days including Easter Monday, while Ostbelgien is off ${P(g.pasen!, 'en')} and French-language schools take their spring break ${P(f.pasen, 'en')}. Summer starts on ${D(v.zomer.van, 'en')} in Flanders and ${D(f.zomer!.van, 'en')} for French-language schools. The German-speaking Community also gives ${D(`${Y}-12-24`, 'en')} off. Children split between Flemish and French-language schools share ${samen} weekday holidays over the year.`,
    faqs: [
      { q: 'Why does Easter 2028 split the Belgian school holidays?', a: `Easter Sunday ${Y + 1} is ${D(ps, 'en')}. Flanders builds its two-week Easter break around it (${P(v.pasen, 'en')}), Ostbelgien starts on Easter Monday (${P(g.pasen!, 'en')}), and French-language schools ignore Easter and break in May (${P(f.pasen, 'en')}).` },
      { q: 'When does the 2027-2028 school year end?', a: `The last school day is ${W(v.laatste!, 'en')} in Flanders and ${W(f.laatste!, 'en')} in French-language schools, whose summer runs ${P(f.zomer!, 'en')}. Ostbelgien ends on the same day as Flanders. The next school year, 2028-2029, starts again in late August for French-language schools and on 1 September for the others; its dates are on the following page.` },
      { q: 'Is Christmas Eve 2027 a school day?', a: `In Ostbelgien it is a day off. In Flemish and French-language schools ${W(`${Y}-12-24`, 'en')} falls in the last school week before the Christmas holidays, which start on ${D(v.kerst.van, 'en')}. Many families plan the Christmas week around that, so check the school’s own calendar for an early finish on the Friday. In-service days set by individual schools are never part of the official calendars shown here.` },
    ],
    body: (h) => `<h2>Every break by Community</h2>
${h.table(['Break', 'Flemish Community', 'Fédération Wallonie-Bruxelles', 'German-speaking Community'], rows('en'), `School holidays ${Y}-${Y + 1}, weekends included`)}
<p>Flemish dates follow the fixed rules published on ${h.src('vg-vakanties', 'vlaanderen.be')}, which the tool recomputes. French-language dates are copied from the ${h.src('fwb-calendrier', 'enseignement.be calendar')}. German-speaking dates come from the ${h.src('dg-kalender', 'Community’s 2026-2029 calendar')}, published Monday to Friday; the table adds the weekends.</p>
<h2>Spring in three pieces</h2>
<p>With Easter on ${D(ps, 'en')}, the three Communities break at three different times: Flanders for ${nPV} days around Easter, Ostbelgien for ${nPG} days from Easter Monday, French-language schools for ${nPF} days in early May. No April or May week is common to all three. For families with children in two systems, summer and Christmas remain the only long breaks they fully share.</p>
${h.mini('vg', { p: ['a', 'b'], d: { sj: Y }, c: 'Line up two children’s calendars' })}
<h2>Single days off</h2>
<p>Flemish schools also close on Armistice Day, Labour Day, Ascension Day (${D(K.plusDagen(ps, 39), 'en')}) with the Friday after it, and Whit Monday (${D(K.plusDagen(ps, 50), 'en')}). French-language schools close on 27 September, Armistice Day, Easter Monday, Ascension Day and Whit Monday. Ostbelgien adds 15 November and 24 December. In-service days are set by each school; see ${h.a('vrije-dagen-school', 'school days off')}.</p>`,
  },
});
