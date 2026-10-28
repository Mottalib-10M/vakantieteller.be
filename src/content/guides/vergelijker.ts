/** Vergelijker : twee Gemeenschappen naast elkaar (twee kinderen, twee scholen, co-ouderschap). Cijfers : vergelijk(). */
import { defineGuide } from '../../lib/page-types';
import { vergelijk, sj } from '../../lib/tool-specs';
import { VG, FWB, P } from '../_data';

const c26 = vergelijk('VG', 'FWB', 2026), c27 = vergelijk('VG', 'FWB', 2027), c28 = vergelijk('VG', 'FWB', 2028);
const d26 = vergelijk('VG', 'DG', 2026), d27 = vergelijk('VG', 'DG', 2027);
const f26 = FWB(2026), v26 = VG(2026);
const rij = (y: number, c: typeof c26) => [sj(y), c.both, c.onlyA, c.onlyB];

export default defineGuide({
  id: 'vergelijker', group: 'school', order: 8, tool: 'vg', toolArg: { a: 'VG', b: 'FWB', sj: 2026 },
  related: ['home', 'schoolvakanties-2027-2028', 'ostbelgien', 'brugdagen-2027'],
  sources: ['vg-vakanties', 'fwb-calendrier', 'dg-kalender'],
  nl: {
    slug: 'vlaanderen-wallonie-brussel-vergelijken', nav: 'Vlaanderen en Wallonië vergelijken', card: `${c26.both} weekdagen samen vrij in 2026-2027`,
    title: 'Schoolvakanties vergelijken: Vlaanderen en Wallonië-Brussel',
    description: 'Schoolvakanties van Vlaanderen, Wallonië-Brussel en Ostbelgien naast elkaar: hoeveel dagen twee kinderen samen vrij zijn en wanneer maar één kind thuis is.',
    h1: 'Schoolvakanties vergelijken: twee kinderen, twee kalenders',
    intro: 'Kies de Gemeenschap van elk kind en het schooljaar: de vergelijker telt de weekdagen samen vrij en toont per periode wie thuis is.',
    resume: `Sinds het Franstalig onderwijs in 2022 zijn kalender hervormde, hebben Vlaamse en Franstalige scholen nog maar een deel van hun vakanties gemeen. In het schooljaar 2026-2027 zijn een kind in een Nederlandstalige school en een kind in een Franstalige school samen ${c26.both} weekdagen vrij, zomer inbegrepen. Het Vlaamse kind heeft daarnaast ${c26.onlyA} vakantiedagen op weekdagen alleen, het Franstalige kind ${c26.onlyB}. In 2027-2028 worden dat ${c27.both} gemeenschappelijke dagen, met ${c27.onlyA} en ${c27.onlyB} dagen apart. Tussen Vlaanderen en Ostbelgien is het verschil klein: ${d26.both} gemeenschappelijke dagen in 2026-2027 en geen enkele afwijkende dag, maar in 2027-2028 ${d27.onlyA} en ${d27.onlyB} dagen apart door een andere paasvakantie. De vergelijker telt alleen maandag tot vrijdag binnen de vakanties; losse vrije dagen zoals Wapenstilstand gelden voor iedereen en tellen niet mee. Voor Brusselse gezinnen, voor co-ouders en voor wie werk en school combineert, toont hij elke periode met data.`,
    faqs: [
      { q: 'Hoeveel vakantiedagen hebben een Vlaams en een Franstalig kind samen?', a: `In 2026-2027 ${c26.both} weekdagen, vooral met Kerstmis en in juli en augustus. In 2027-2028 ${c27.both}. Weekends tellen niet mee: die zijn voor alle kinderen vrij. Ook losse vrije dagen zoals Wapenstilstand laat de vergelijker buiten beschouwing, omdat ze in beide Gemeenschappen gelden. Kies in de rekenaar een ander schooljaar om de telling te zien.` },
      { q: 'Waarom geeft de vergelijker voor 2028-2029 zo weinig gemeenschappelijke dagen?', a: `Omdat het einde van de Franstalige zomervakantie ${2029} nog niet gepubliceerd is. Zonder einddatum telt de vergelijker de zomer niet mee, en blijven er ${c28.both} dagen over in de herfst en met Kerstmis. Zodra de Fédération haar kalender 2029-2030 publiceert, verandert die telling.` },
      { q: 'Hoe verdeel je als co-ouders vakanties over twee kalenders?', a: 'Begin met de periodes waarin beide kinderen vrij zijn: die laten een gezamenlijke week toe. De periodes waarin maar één kind vrij is, kunnen de ouders apart opnemen of laten opvangen. De tabel onder de vergelijker geeft ze met data, zodat u ze in een ouderschapsplan kunt overnemen.' },
    ],
    body: (h) => `<h2>Drie schooljaren in cijfers</h2>
${h.table(['Schooljaar', 'Samen vrij', 'Alleen Vlaanderen', 'Alleen Franstalig'], [rij(2026, c26), rij(2027, c27), rij(2028, c28)], 'Weekdagen in de vakanties, Vlaamse en Franstalige school', ['l', 'r', 'r', 'r'])}
<p>De Vlaamse data volgen uit ${h.src('vg-vakanties', 'vlaanderen.be')}, de Franstalige uit ${h.src('fwb-calendrier', 'enseignement.be')} en die van Ostbelgien uit de ${h.src('dg-kalender', 'Duitstalige kalender')}. Voor 2028-2029 ontbreekt het einde van de Franstalige zomer, dus telt de laatste rij zonder zomer.</p>
<h2>Waar het misloopt</h2>
<p>De grootste verschillen zitten in de herfst en de lente. In 2026-2027 neemt het Franstalige kind herfstvakantie van ${P(f26.herfst, 'nl')}, het Vlaamse kind van ${P(v26.herfst, 'nl')}. In de lente is het Vlaamse kind vrij van ${P(v26.pasen, 'nl')}, het Franstalige pas van ${P(f26.pasen, 'nl')}. De zomer overlapt dan weer bijna volledig, alleen de eerste dagen van juli en de laatste van augustus verschillen.</p>
${h.mini('vk', { p: ['gem', 'vak'], d: { vak: 'pasen' }, c: 'Eén vakantie in de drie Gemeenschappen' })}
<h2>Brussel</h2>
<p>In Brussel bepaalt de taal van de school de kalender, niet het adres. Een gezin met een kind in een Nederlandstalige basisschool en een kind in een Franstalige secundaire school volgt dus twee kalenders. Ook leerkrachten die in beide netten werken, of ouders die in Vlaanderen werken en hun kind in Brussel naar een Franstalige school sturen, kunnen hier de weken zien waarin opvang nodig is. Verlof plannen rond die weken doet u met ${h.a('brugdagen-2027', 'brugdagen 2027')}.</p>`,
  },
  fr: {
    slug: 'comparer-flandre-wallonie-bruxelles', nav: 'Comparer Flandre et Wallonie', card: `${c26.both} jours communs en 2026-2027`,
    title: 'Vacances scolaires comparées : Flandre et Wallonie-Bruxelles',
    description: 'Comparez les vacances scolaires de la Fédération Wallonie-Bruxelles, de la Flandre et d’Ostbelgien : jours de congé communs à deux enfants et jours séparés.',
    h1: 'Comparer les vacances scolaires de deux enfants',
    intro: 'Indiquez la Communauté de chaque enfant et l’année scolaire : le comparateur compte les jours de semaine libres pour les deux et montre qui est en congé, période par période.',
    resume: `Depuis la réforme des rythmes scolaires de 2022, les écoles francophones et néerlandophones n’ont plus qu’une partie de leurs congés en commun. En 2026-2027, un enfant scolarisé dans la Fédération Wallonie-Bruxelles et un autre dans une école flamande ont ${c26.both} jours de semaine de congé ensemble, été compris. L’enfant francophone a en plus ${c26.onlyB} jours de congé en semaine pour lui seul, l’enfant néerlandophone ${c26.onlyA}. En 2027-2028, on passe à ${c27.both} jours communs, avec ${c27.onlyB} et ${c27.onlyA} jours séparés. Entre la Flandre et Ostbelgien, l’écart est faible : aucun jour différent en 2026-2027, puis ${d27.onlyA} et ${d27.onlyB} jours d’écart en 2027-2028 à cause de Pâques. Le comparateur ne compte que les jours du lundi au vendredi compris dans les congés ; les jours fériés isolés comme l’Armistice valent pour tous et ne changent rien. Il sert aux familles bruxelloises, aux parents séparés et à ceux qui doivent organiser une garde.`,
    faqs: [
      { q: 'Combien de jours de congé communs entre une école francophone et une école flamande ?', a: `${c26.both} jours de semaine en 2026-2027 et ${c27.both} en 2027-2028, surtout à Noël et en été. Les week-ends ne sont pas comptés puisque tous les enfants sont alors libres. Les jours fériés isolés comme l’Armistice, valables dans les deux Communautés, sont aussi laissés de côté. Changez l’année dans l’outil pour voir le détail période par période.` },
      { q: 'Pourquoi si peu de jours communs en 2028-2029 ?', a: `Parce que la fin de l’été 2029 francophone n’est pas encore publiée. Faute de date de fin, le comparateur laisse l’été de côté et il reste ${c28.both} jours, à la Toussaint et à Noël. Le chiffre changera quand la Fédération publiera son calendrier 2029-2030.` },
      { q: 'Comment répartir les congés entre parents séparés avec deux calendriers ?', a: 'Repérez d’abord les périodes où les deux enfants sont libres : elles permettent une semaine commune chez l’un ou l’autre parent. Les périodes où un seul enfant est en congé se gèrent à part (congé d’un parent, stage, grands-parents). Le tableau sous l’outil donne ces périodes avec leurs dates.' },
    ],
    body: (h) => `<h2>Trois années en chiffres</h2>
${h.table(['Année scolaire', 'Communs', 'Seulement FWB', 'Seulement Flandre'], [[sj(2026), c26.both, c26.onlyB, c26.onlyA], [sj(2027), c27.both, c27.onlyB, c27.onlyA], [sj(2028), c28.both, c28.onlyB, c28.onlyA]], 'Jours de semaine de congé, école francophone et école néerlandophone', ['l', 'r', 'r', 'r'])}
<p>Les dates francophones viennent d’${h.src('fwb-calendrier', 'enseignement.be')}, les flamandes de ${h.src('vg-vakanties', 'vlaanderen.be')}, celles d’Ostbelgien du ${h.src('dg-kalender', 'calendrier germanophone')}. La dernière ligne exclut l’été, dont la fin n’est pas encore publiée côté francophone.</p>
<h2>Les périodes qui divergent</h2>
<p>L’automne et le printemps concentrent les écarts. En 2026-2027, l’enfant francophone est en congé du ${P(f26.herfst, 'fr')}, l’enfant néerlandophone du ${P(v26.herfst, 'fr')}. Au printemps, la Flandre part du ${P(v26.pasen, 'fr')}, la Fédération du ${P(f26.pasen, 'fr')}. L’été se recouvre presque entièrement : seuls les premiers jours de juillet et les derniers d’août diffèrent.</p>
${h.mini('vk', { p: ['gem', 'vak'], d: { gem: 'FWB', vak: 'krokus' }, c: 'Un congé dans les trois Communautés' })}
<h2>Le cas bruxellois</h2>
<p>À Bruxelles, c’est la langue de l’école qui fixe le calendrier, pas la commune de résidence. Une fratrie partagée entre une école primaire néerlandophone et une école secondaire francophone vit donc avec deux calendriers. Pour poser vos propres congés autour des semaines où un seul enfant est libre, voyez les ${h.a('brugdagen-2027', 'ponts 2027')}.</p>`,
  },
  en: {
    slug: 'flanders-vs-wallonia-brussels', nav: 'Flanders vs Wallonia-Brussels', card: `${c26.both} shared weekdays in 2026-2027`,
    title: 'School holiday comparison: Flanders vs Wallonia-Brussels',
    description: 'Compare school holidays in Flanders, Wallonia-Brussels and Ostbelgien: how many days two children have off together and which weeks only one of them is at home.',
    h1: 'Comparing school holidays for two children',
    intro: 'Choose each child’s Community and the school year: the tool counts the weekdays both have off and shows, period by period, who is at home.',
    resume: `Since French-language schools reformed their school year in 2022, Belgium’s two main calendars share only part of their holidays. In 2026-2027 a child at a Dutch-language school and a child at a French-language school have ${c26.both} weekdays off together, summer included. The Flemish child has another ${c26.onlyA} weekday holidays alone, the French-language child ${c26.onlyB}. In 2027-2028 the shared total is ${c27.both}, with ${c27.onlyA} and ${c27.onlyB} days apart. Flanders and Ostbelgien barely differ: no separate days in 2026-2027, then ${d27.onlyA} and ${d27.onlyB} days apart in 2027-2028 because of a different Easter break. The tool counts Monday to Friday inside the breaks only; single days off such as Armistice Day apply to everyone and are left out. It is built for Brussels families with children in both systems, for separated parents sharing holidays and for anyone arranging childcare around two calendars.`,
    faqs: [
      { q: 'How many holidays do a Flemish and a French-language pupil share?', a: `${c26.both} weekdays in 2026-2027 and ${c27.both} in 2027-2028, mostly at Christmas and in summer. Weekends are not counted, since every child is off then. Single days off such as Armistice Day apply in both Communities and are left out as well. Change the school year in the tool to see the full list of periods.` },
      { q: 'Why does 2028-2029 show so few shared days?', a: `Because the end of the French-language summer 2029 has not been published. Without an end date the tool leaves the summer out, which leaves ${c28.both} days in autumn and at Christmas. The figure will change once the Fédération publishes its 2029-2030 calendar.` },
      { q: 'How can separated parents share holidays across two calendars?', a: 'Start with the periods when both children are off, which allow a full week together with one parent. Periods when only one child is off can be covered separately, by leave, a holiday camp or family. The table under the tool lists each period with its dates, ready to copy into a parenting plan.' },
    ],
    body: (h) => `<h2>Three school years in figures</h2>
${h.table(['School year', 'Off together', 'Flemish only', 'French-language only'], [rij(2026, c26), rij(2027, c27), rij(2028, c28)], 'Weekdays inside the breaks, Flemish and French-language school', ['l', 'r', 'r', 'r'])}
<p>Flemish dates come from ${h.src('vg-vakanties', 'vlaanderen.be')}, French-language ones from ${h.src('fwb-calendrier', 'enseignement.be')} and Ostbelgien’s from the ${h.src('dg-kalender', 'German-speaking calendar')}. The last row leaves out summer, whose end is not yet published for French-language schools.</p>
<h2>Where the calendars part</h2>
<p>Autumn and spring hold most of the gap. In 2026-2027 the French-language child is off ${P(f26.herfst, 'en')}, the Flemish child ${P(v26.herfst, 'en')}. In spring Flanders breaks ${P(v26.pasen, 'en')}, French-language schools ${P(f26.pasen, 'en')}. Summer overlaps almost completely; only the first days of July and the last days of August differ.</p>
${h.mini('vk', { p: ['gem', 'vak'], d: { vak: 'herfst' }, c: 'One break in all three Communities' })}
<h2>Brussels</h2>
<p>In Brussels the language of the school sets the calendar, not your address. Siblings at a Dutch-language primary and a French-language secondary school live with two calendars, and so do teachers working in both systems. To place your own leave around the weeks when only one child is off, see ${h.a('brugdagen-2027', 'bridge days 2027')}.</p>`,
  },
});
