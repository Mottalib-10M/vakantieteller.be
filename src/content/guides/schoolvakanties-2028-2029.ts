/** Schooljaar 2028-2029 : laatste jaar dat de drie Gemeenschappen gepubliceerd hebben. Data : moteur via _data.ts. */
import { defineGuide } from '../../lib/page-types';
import { K, VG, FWB, DG, P, D, W } from '../_data';

const Y = 2028;
const v = VG(Y), f = FWB(Y), g = DG(Y), v9 = VG(Y + 1);
const ps = K.paaszondag(Y + 1);
const fz = K.zomerBegin('FWB', Y)!;
const cmp = (() => { const A = K.vakantieSet('VG', Y), B = K.vakantieSet('FWB', Y); return [...A].filter((d) => B.has(d) && !K.isWeekend(d) && d < K.fromIso(`${Y + 1}-07-01`)).length; })();
const kWeken = (p: { van: string; tot: string }) => Math.round(K.dagen(p) / 7);

export default defineGuide({
  id: 'schoolvakanties-2028-2029', group: 'school', order: 2, tool: 'sv', toolArg: { sj: Y },
  related: ['schoolvakanties-2027-2028', 'home', 'vergelijker', 'krokusvakantie-2027'],
  sources: ['vg-vakanties', 'fwb-calendrier', 'dg-kalender'],
  nl: {
    slug: 'schoolvakanties-2028-2029', nav: 'Schoolvakanties 2028-2029', card: `Kerst overal vanaf ${D(v.kerst.van, 'nl')}`,
    title: 'Schoolvakanties 2028-2029: wat al vastligt per Gemeenschap',
    description: 'Schoolvakanties 2028-2029 in België: de Vlaamse, Franstalige en Duitstalige kalender met alle gepubliceerde data, en wat voor de zomer nog niet vastligt.',
    h1: 'Schoolvakanties 2028-2029 in België',
    intro: 'Het schooljaar 2028-2029 is het laatste dat de drie Gemeenschappen al hebben vastgelegd. De rekenaar toont per Gemeenschap elke vakantie en zegt wat nog ontbreekt.',
    resume: `Voor 2028-2029 liggen de vakanties in de drie Gemeenschappen vast, op één punt na. Het Vlaamse schooljaar begint op ${W(v.start!, 'nl')}, met de herfstvakantie van ${P(v.herfst, 'nl')}, de kerstvakantie van ${P(v.kerst, 'nl')}, de krokusvakantie van ${P(v.krokus, 'nl')} en de paasvakantie van ${P(v.pasen, 'nl')}; Pasen valt op ${D(ps, 'nl')}, dus begint die vakantie op Paasmaandag. De laatste schooldag is ${W(v.laatste!, 'nl')}. Het Franstalig onderwijs start op ${W(f.start!, 'nl')}, heeft vrij van ${P(f.herfst, 'nl')}, ${P(f.kerst, 'nl')}, ${P(f.krokus, 'nl')} en ${P(f.pasen, 'nl')}, en begint de zomervakantie op ${W(fz, 'nl')}. Wanneer die zomer eindigt, hangt af van de kalender 2029-2030, die de Fédération Wallonie-Bruxelles nog niet gepubliceerd heeft. Ostbelgien volgt de Vlaamse weken. Vóór de zomer hebben Vlaamse en Franstalige leerlingen ${cmp} weekdagen samen vrij, bijna alleen in de herfst en met Kerstmis.`,
    faqs: [
      { q: 'Is de Franstalige kalender 2029-2030 al bekend?', a: `Nee. Op de leesdatum vermeldt enseignement.be de schooljaren tot ${Y}-${Y + 1}, en de Duitstalige kalender loopt eveneens tot dat schooljaar. Daarom staat de terugkeer naar school na de zomer van ${Y + 1} hier als nog niet gepubliceerd. In Vlaanderen ligt ${Y + 1}-${Y + 2} wel vast: start op ${W(v9.start!, 'nl')}.` },
      { q: 'Valt de krokusvakantie 2029 samen in Vlaanderen en Wallonië?', a: `Nee. De Vlaamse krokusvakantie loopt van ${P(v.krokus, 'nl')}, zeven weken voor Pasen. Het Franstalige congé de détente begint twee weken later en duurt van ${P(f.krokus, 'nl')}. Er is geen enkele gemeenschappelijke dag. Ostbelgien volgt de Vlaamse week, van maandag tot vrijdag. Gezinnen met kinderen in beide systemen hebben in februari en maart dus drie aparte vakantieweken op te vangen.` },
      { q: 'Klopt de kerstdatum 2028 op enseignement.be?', a: `De Franstalige kalender vermeldt voor de wintervakantie een maandag 25 december "2029", een tikfout: 25 december 2029 is een dinsdag, 25 december ${Y} wel een maandag. De vakantie loopt dus van ${P(f.kerst, 'nl')}, dezelfde twee weken als in Vlaanderen.` },
    ],
    body: (h) => `<h2>De drie kalenders</h2>
${h.table(['Vakantie', 'Vlaanderen', 'Franstalig onderwijs', 'Ostbelgien (ma–vr)'], K.VAKS.map((x) => [K.VAK_NAME.VG[x].nl, v[x] ? P(v[x], 'nl') : '', f[x] ? P(f[x], 'nl') : `vanaf ${D(fz, 'nl')}, einde nog niet gepubliceerd`, g[x] ? P(g[x]!, 'nl') : '']), `Schoolvakanties ${Y}-${Y + 1}`)}
<p>Bronnen: de regels en de lijst van ${h.src('vg-vakanties', 'vlaanderen.be')}, de kalender van ${h.src('fwb-calendrier', 'enseignement.be')} en de ${h.src('dg-kalender', 'Duitstalige kalender 2026-2029')}. Ostbelgien publiceert van maandag tot vrijdag, zoals in de laatste kolom.</p>
<h2>Een vroege Pasen, een vroege krokus</h2>
<p>Pasen ${Y + 1} valt op ${D(ps, 'nl')}, vroeg in het jaar. In Vlaanderen trekt dat de krokusvakantie naar februari en begint de paasvakantie op Paasmaandag, ${D(v.pasen.van, 'nl')}. Het Franstalig onderwijs blijft bij zijn eigen ritme van zeven weken les en twee weken vakantie, met de lentevakantie pas eind april. Wie kinderen in beide systemen heeft, rekent dus op ${kWeken(v.kerst)} gemeenschappelijke weken met Kerstmis en één week in de herfst.</p>
${h.mini('vk', { p: ['gem', 'vak'], d: { sj: Y, vak: 'krokus' }, c: 'Eén vakantie in alle Gemeenschappen' })}
<h2>Wat daarna komt</h2>
<p>Vlaanderen heeft ook ${Y + 1}-${Y + 2} al gepubliceerd: herfstvakantie van ${P(v9.herfst, 'nl')}, kerst van ${P(v9.kerst, 'nl')}, krokus van ${P(v9.krokus, 'nl')} en Pasen van ${P(v9.pasen, 'nl')}. Voor de Franstalige en de Duitstalige Gemeenschap staat er niets: hun volgende kalenders zijn nog niet gepubliceerd, en deze site vult ze niet zelf in. Het lopende schooljaar staat op de ${h.a('home', 'startpagina')}.</p>`,
  },
  fr: {
    slug: 'vacances-scolaires-2028-2029', nav: 'Vacances scolaires 2028-2029', card: `Rentrée FWB le ${D(f.start!, 'fr')}`,
    title: 'Vacances scolaires 2028-2029 : les dates déjà fixées',
    description: 'Vacances scolaires 2028-2029 : calendrier de la Fédération Wallonie-Bruxelles, de la Flandre et d’Ostbelgien, avec ce qui est publié et ce qui ne l’est pas.',
    h1: 'Vacances scolaires 2028-2029 en Belgique',
    intro: 'L’année 2028-2029 est la dernière que les trois Communautés ont arrêtée. L’outil affiche chaque congé par Communauté et signale ce qui manque.',
    resume: `Côté francophone, l’année 2028-2029 commence le ${W(f.start!, 'fr')}. Les vacances d’automne vont du ${P(f.herfst, 'fr')}, les vacances d’hiver du ${P(f.kerst, 'fr')}, le congé de détente du ${P(f.krokus, 'fr')} et les vacances de printemps du ${P(f.pasen, 'fr')}. Le dernier jour de classe est le ${W(f.laatste!, 'fr')} et l’été commence le ${W(fz, 'fr')} ; sa fin dépend du calendrier 2029-2030, pas encore publié par la Fédération Wallonie-Bruxelles. La Flandre reprend le ${W(v.start!, 'fr')} et sera en congé du ${P(v.herfst, 'fr')}, du ${P(v.kerst, 'fr')}, du ${P(v.krokus, 'fr')} et du ${P(v.pasen, 'fr')}, Pâques tombant le ${D(ps, 'fr')}. Ostbelgien suit les semaines flamandes, publiées du lundi au vendredi. Avant l’été, un élève francophone et un élève néerlandophone n’auront que ${cmp} jours de semaine de congé en commun : la semaine du 30 octobre et les deux semaines de Noël.`,
    faqs: [
      { q: 'Quand se termine l’été 2029 dans l’enseignement francophone ?', a: `On ne le sait pas encore. La rentrée de ${Y + 1} fait partie du calendrier ${Y + 1}-${Y + 2}, que la Fédération Wallonie-Bruxelles n’a pas encore publié. Seul le début de l’été est connu : le ${W(fz, 'fr')}. Le site affichera la date de fin dès sa publication sur enseignement.be, sans la deviner d’ici là. En Flandre, l’été va du ${P(v.zomer, 'fr')}.` },
      { q: 'Pourquoi le calendrier officiel indique-t-il Noël « 2029 » ?', a: `C’est une coquille de la page d’enseignement.be : le lundi 25 décembre tombe en ${Y}, pas en ${Y + 1} (le 25 décembre ${Y + 1} est un mardi). Les vacances d’hiver vont donc du ${P(f.kerst, 'fr')}, exactement comme en Flandre. Le site corrige cette coquille dans ses tableaux et la signale ici pour que chacun puisse vérifier.` },
      { q: 'Le carnaval 2029 est-il commun à la Flandre et à la Wallonie ?', a: `Non. Le carnaval flamand va du ${P(v.krokus, 'fr')}, le congé de détente francophone du ${P(f.krokus, 'fr')}. Les deux congés ne se touchent pas : une famille partagée entre les deux réseaux a donc trois semaines de congé séparées à organiser entre la mi-février et la mi-mars. Ostbelgien suit la semaine flamande.` },
    ],
    body: (h) => `<h2>Le calendrier de la Fédération et des deux autres Communautés</h2>
${h.table(['Congé', 'Fédération Wallonie-Bruxelles', 'Flandre', 'Ostbelgien (lun–ven)'], K.VAKS.map((x) => [K.VAK_NAME.FWB[x].fr, f[x] ? P(f[x], 'fr') : `dès le ${D(fz, 'fr')}, fin pas encore publiée`, v[x] ? P(v[x], 'fr') : '', g[x] ? P(g[x]!, 'fr') : '']), `Vacances scolaires ${Y}-${Y + 1}`)}
<p>Les dates viennent du ${h.src('fwb-calendrier', 'calendrier d’enseignement.be')}, de ${h.src('vg-vakanties', 'vlaanderen.be')} et du ${h.src('dg-kalender', 'calendrier germanophone 2026-2029')}. Les jours de congé isolés francophones sont la fête du 27 septembre, l’Armistice (un samedi en ${Y}), le lundi de Pâques (${D(K.plusDagen(ps, 1), 'fr')}), l’Ascension (${D(K.plusDagen(ps, 39), 'fr')}) et le lundi de Pentecôte (${D(K.plusDagen(ps, 50), 'fr')}).</p>
<h2>Deux rythmes qui se croisent peu</h2>
<p>Pâques étant précoce, la Flandre place son carnaval à la mi-février et ses vacances de Pâques dès le lundi de Pâques. Le calendrier francophone garde ses blocs de sept semaines de cours : le congé de détente tombe fin février, le printemps fin avril. Les deux systèmes ne partagent donc que la Toussaint flamande, incluse dans les deux semaines d’automne francophones, et Noël. Le ${h.a('vergelijker', 'comparateur')} détaille l’année jour par jour.</p>
${h.mini('vk', { p: ['gem', 'vak'], d: { gem: 'FWB', sj: Y, vak: 'krokus' }, c: 'Un congé dans les trois Communautés' })}
<h2>Et ensuite ?</h2>
<p>La Flandre a déjà publié ${Y + 1}-${Y + 2} : automne du ${P(v9.herfst, 'fr')}, Noël du ${P(v9.kerst, 'fr')}, carnaval du ${P(v9.krokus, 'fr')}. Pour la Fédération et la Communauté germanophone, rien n’est encore publié, et le site n’invente pas de dates.</p>`,
  },
  en: {
    slug: 'school-holidays-2028-2029', nav: 'School holidays 2028-2029', card: `Early Easter, carnival ${P(v.krokus, 'en')}`,
    title: 'School holidays 2028-2029 Belgium: the dates already set',
    description: 'School holidays 2028-2029 in Belgium: the Flemish, French-language and German-speaking calendars with every published date, and what has not been published yet.',
    h1: 'School holidays in Belgium 2028-2029',
    intro: '2028-2029 is the last school year all three Communities have fixed. The tool shows each break per Community and flags anything still missing.',
    resume: `All three Belgian Communities have published their 2028-2029 calendars, with one gap. Flemish schools start on ${W(v.start!, 'en')} and break ${P(v.herfst, 'en')} in autumn, ${P(v.kerst, 'en')} at Christmas, ${P(v.krokus, 'en')} for carnival and ${P(v.pasen, 'en')} at Easter, which falls early on ${D(ps, 'en')}; the last school day is ${W(v.laatste!, 'en')}. French-language schools start on ${W(f.start!, 'en')} and break ${P(f.herfst, 'en')}, ${P(f.kerst, 'en')}, ${P(f.krokus, 'en')} and ${P(f.pasen, 'en')}, with summer from ${W(fz, 'en')}. The end of that summer depends on the 2029-2030 calendar, which the Fédération Wallonie-Bruxelles has not published yet. Ostbelgien keeps the Flemish weeks, Monday to Friday. Before the summer, Flemish and French-language pupils share only ${cmp} weekdays off, in the autumn week and over Christmas, since carnival and spring fall weeks apart.`,
    faqs: [
      { q: 'Are the 2029-2030 school holidays known?', a: `Only in Flanders, where term starts on ${W(v9.start!, 'en')} and the autumn break runs ${P(v9.herfst, 'en')}. The French-language and German-speaking Communities have not published 2029-2030, so the end of their summer ${Y + 1} is shown as not yet published.` },
      { q: 'Is there a typo in the official 2028 Christmas date?', a: `Yes. The enseignement.be calendar gives Monday 25 December "2029" for the winter break, but 25 December ${Y + 1} is a Tuesday; the Monday is 25 December ${Y}. The break runs ${P(f.kerst, 'en')}, the same two weeks as in Flanders. This site corrects the typo in its tables and mentions it here so that anyone can check the source.` },
      { q: 'Do Flemish and French-language schools share the 2029 carnival break?', a: `No. Flanders is off ${P(v.krokus, 'en')}, French-language schools ${P(f.krokus, 'en')}. The two breaks do not touch, so a family with a child in each system has three separate weeks of carnival break to cover between mid-February and mid-March. Ostbelgien takes the Flemish week, Monday to Friday, as published by its government.` },
    ],
    body: (h) => `<h2>The three calendars</h2>
${h.table(['Break', 'Flanders', 'French-language schools', 'Ostbelgien (Mon–Fri)'], K.VAKS.map((x) => [K.VAK_NAME.VG[x].en, v[x] ? P(v[x], 'en') : '', f[x] ? P(f[x], 'en') : `from ${D(fz, 'en')}, end not yet published`, g[x] ? P(g[x]!, 'en') : '']), `School holidays ${Y}-${Y + 1}`)}
<p>Sources: ${h.src('vg-vakanties', 'vlaanderen.be')}, the ${h.src('fwb-calendrier', 'enseignement.be calendar')} and the ${h.src('dg-kalender', 'German-speaking 2026-2029 calendar')}. French-language schools also close on 27 September, Easter Monday (${D(K.plusDagen(ps, 1), 'en')}), Ascension Day (${D(K.plusDagen(ps, 39), 'en')}) and Whit Monday; Armistice Day ${Y} is a Saturday.</p>
<h2>An early Easter pulls Flanders forward</h2>
<p>With Easter on ${D(ps, 'en')}, the Flemish carnival break lands in mid-February and the Easter break starts on Easter Monday itself. French-language schools keep their pattern of seven weeks of lessons and two weeks off, so their carnival break comes at the end of February and spring at the end of April. Families split between the two systems can only count on the autumn week and the ${kWeken(v.kerst)} Christmas weeks together. See the ${h.a('vergelijker', 'comparison tool')} for every day.</p>
${h.mini('vk', { p: ['gem', 'vak'], d: { sj: Y, vak: 'pasen' }, c: 'One break across all Communities' })}
<h2>Beyond 2029</h2>
<p>Flanders has also published ${Y + 1}-${Y + 2}: Christmas ${P(v9.kerst, 'en')}, carnival ${P(v9.krokus, 'en')}, Easter ${P(v9.pasen, 'en')}. The other two Communities have published nothing for that year, and this site does not fill the gap with guesses. The current year is on the ${h.a('home', 'home page')}.</p>`,
  },
});
