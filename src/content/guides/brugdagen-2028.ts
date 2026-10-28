/** Brugdagen 2028 : Hemelvaart en 15 augustus, het eindejaar 2028-2029, korte bruggen rond Allerheiligen. Data : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, VG, FWB, D, W, P, fd } from '../_data';
import type { Lang } from '../../lib/format';

const Y = 2028;
const O = { vervanging: 'volgende' as const };
const bd = K.brugdagen(Y, O);
const alle = K.bruggen(Y, O);
const p5 = K.optimaliseer(Y, 5, O), p10 = K.optimaliseer(Y, 10, O), p20 = K.optimaliseer(Y, 20, O);
const kerst = alle.find((b) => b.feestdagen.includes('kerstmis'))!;
const jan = alle.find((b) => b.vrijVan === `${Y}-01-01`)!;
const ah = alle.filter((b) => b.feestdagen.includes('allerheiligen'));
const ahD = fd(Y, 'allerheiligen'), oh = fd(Y, 'olv-hemelvaart'), nf = fd(Y, 'nationale-feestdag');
const herfstVG = VG(Y).herfst, herfstF = FWB(Y).herfst;
const pasVG = VG(Y - 1).pasen, lenteF = FWB(Y - 1).pasen;
const top = [...alle].sort((a, b) => b.vrij / b.verlof - a.vrij / a.verlof || b.vrij - a.vrij).slice(0, 8);
const rij = (l: Lang) => top.map((b) => [P({ van: b.verlofVan, tot: b.verlofTot }, l), b.verlof, P({ van: b.vrijVan, tot: b.vrijTot }, l), b.vrij]);

export default defineGuide({
  id: 'brugdagen-2028', group: 'werk', order: 16, tool: 'bt', toolArg: { jaar: Y },
  related: ['brugdagen-2027', 'feestdagen-2028', 'schoolvakanties-2028-2029', 'werkdagen-2027'],
  sources: ['wet-1974', 'fod-feestdagen', 'fwb-calendrier'],
  nl: {
    slug: 'brugdagen-2028', nav: 'Brugdagen 2028', card: `${bd.length} echte brugdagen, eindejaar met ${kerst.vrij} dagen vrij`,
    title: 'Brugdagen 2028 België: Hemelvaart, 15 augustus en eindejaar',
    description: `Brugdagen 2028 in België: de vrijdag na Hemelvaart, maandag 14 augustus en de kerstbrug naar 2029. Tien verlofdagen goed geplaatst geven ${p10.vrij} vrije dagen.`,
    h1: 'Brugdagen 2028 in België',
    intro: 'Vooruit plannen voor 2028: de planner verdeelt uw verlofdagen over de feestdagen van het jaar. Kies het aantal dagen en of u vervangingsdagen meetelt.',
    resume: `Het jaar ${Y} heeft ${bd.length} echte brugdagen: ${bd.map((b) => W(b.verlofVan, 'nl')).join(' en ')}. De eerste volgt op Hemelvaart, de tweede gaat vooraf aan Onze-Lieve-Vrouw-Hemelvaart op ${W(oh, 'nl')}, en elk levert vier vrije dagen op voor één verlofdag. Daarnaast valt de nationale feestdag op ${W(nf, 'nl')}, een lang weekend zonder verlof. Het beste blok ligt aan het einde van het jaar: Kerstmis op maandag en Nieuwjaar ${Y + 1} ook op maandag, zodat vier verlofdagen van ${D(kerst.verlofVan, 'nl')} tot ${D(kerst.verlofTot, 'nl')} ${kerst.vrij} dagen vrij geven. Het jaar begint even gunstig: Nieuwjaar valt op zaterdag, en met de vervangingsdag op maandag 3 januari geven vier verlofdagen ${jan.vrij} dagen vrij. Samen geven vijf verlofdagen ${p5.vrij} vrije dagen, tien ${p10.vrij} en twintig ${p20.vrij}. De planner telt daarbij de vervangingsdagen van de terugvalregel mee.`,
    faqs: [
      { q: 'Is maandag 14 augustus 2028 een brugdag?', a: `Ja. Onze-Lieve-Vrouw-Hemelvaart valt op ${W(oh, 'nl')}, dus wie op maandag verlof neemt, is van zaterdag 12 tot dinsdag 15 augustus vrij: vier dagen voor één verlofdag. De scholen zijn dan in zomervakantie, wat het een geschikt moment maakt voor een kort reisje met kinderen.` },
      { q: 'Hoe overbrug ik Allerheiligen op woensdag in 2028?', a: `Met twee verlofdagen ervoor of erna: ${ah.map((b) => `${P({ van: b.verlofVan, tot: b.verlofTot }, 'nl')} geeft ${b.vrij} dagen vrij`).join(', of ')}. Met vier verlofdagen overbrugt u de hele week, die in Vlaanderen samenvalt met de herfstvakantie. De planner kiest zelf de beste combinatie.` },
      { q: 'Telt de planner de brug naar Nieuwjaar 2029 mee?', a: `Ja. Het blok van eind december loopt door tot en met Nieuwjaar ${Y + 1}, dat ook een feestdag is. De verlofdagen zelf vallen allemaal in ${Y}, zodat u ze met het verlof van ${Y} kunt opnemen. Kijk wel na of uw werkgever een collectieve sluiting tussen Kerstmis en Nieuwjaar plant.` },
    ],
    body: (h) => `<h2>De rendabelste bruggen van 2028</h2>
${h.table(['Verlof nemen', 'Verlofdagen', 'Vrij op een rij', 'Vrije dagen'], rij('nl'), `Bruggen ${Y}, beste verhouding eerst`, ['l', 'r', 'l', 'r'])}
<p>De lijst houdt rekening met de vervangingsdagen zonder akkoord: maandag 3 januari voor Nieuwjaar en maandag 13 november voor Wapenstilstand, die allebei op zaterdag vallen. Legt uw sector die dagen anders, dan verandert de lijst; de regels staan bij de ${h.src('fod-feestdagen', 'FOD Werkgelegenheid')} en in de ${h.src('wet-1974', 'feestdagenwet')}.</p>
<h2>Bruggen en schoolvakanties</h2>
<p>Allerheiligen op ${W(ahD, 'nl')} valt midden in de Vlaamse herfstvakantie (${h.per(herfstVG)}), terwijl Franstalige leerlingen vrij zijn van ${h.per(herfstF)}. In het voorjaar valt de Vlaamse paasvakantie van ${h.per(pasVG)}, met Paasmaandag als laatste dag; de Franstalige lentevakantie van ${h.per(lenteF)} begint met de Dag van de Arbeid, zoals de ${h.src('fwb-calendrier', 'kalender van de Fédération')} vermeldt. Wie verlof en schoolvakanties wil combineren, vindt beide op ${h.a('schoolvakanties-2028-2029', 'schoolvakanties 2028-2029')}.</p>
${h.mini('vg', { p: ['a', 'b'], d: { sj: Y }, c: 'Vlaamse en Franstalige vakanties 2028-2029 vergelijken' })}
<h2>Vergelijking met 2027</h2>
<p>In ${Y - 1} geven tien verlofdagen ${K.optimaliseer(Y - 1, 10, O).vrij} vrije dagen, nu ${p10.vrij}. Het verschil zit in de ligging: ${Y} heeft minder feestdagen op donderdag, maar meer op maandag. Zie ${h.a('brugdagen-2027', 'brugdagen 2027')}.</p>`,
  },
  fr: {
    slug: 'ponts-2028', nav: 'Ponts 2028', card: `${bd.length} vrais ponts, fin d’année à ${kerst.vrij} jours de repos`,
    title: 'Ponts 2028 en Belgique : Ascension, 15 août et fin d’année',
    description: `Ponts 2028 en Belgique : le vendredi après l’Ascension, le lundi 14 août et le pont de Noël vers 2029. Dix jours de congé bien placés donnent ${p10.vrij} jours de repos.`,
    h1: 'Ponts 2028 en Belgique',
    intro: 'Pour s’organiser à l’avance : l’outil répartit vos jours de congé 2028 autour des jours fériés. Choisissez le nombre de jours et la prise en compte des remplacements.',
    resume: `L’année ${Y} compte ${bd.length} vrais ponts : le ${bd.map((b) => W(b.verlofVan, 'fr')).join(' et le ')}. Le premier suit l’Ascension, le second précède l’Assomption du ${W(oh, 'fr')}, et chacun rapporte quatre jours de repos pour un jour de congé. La fête nationale tombe le ${W(nf, 'fr')}, ce qui donne un long week-end sans rien poser. Le meilleur bloc est en fin d’année : Noël tombe un lundi, et le Nouvel An ${Y + 1} aussi, si bien que quatre jours de congé du ${D(kerst.verlofVan, 'fr')} au ${D(kerst.verlofTot, 'fr')} donnent ${kerst.vrij} jours de repos. Le début d’année est tout aussi favorable : le Nouvel An tombe un samedi et, avec son remplacement le lundi 3 janvier, quatre jours de congé donnent ${jan.vrij} jours libres. Au total, cinq jours de congé rapportent ${p5.vrij} jours de repos, dix ${p10.vrij} et vingt ${p20.vrij}.`,
    faqs: [
      { q: 'Le lundi 14 août 2028 est-il un pont ?', a: `Oui. L’Assomption tombe le ${W(oh, 'fr')} : un jour de congé le lundi donne quatre jours de repos, du samedi 12 au mardi 15 août. Les écoles sont alors en vacances d’été, ce qui en fait un bon moment pour une courte escapade en famille.` },
      { q: 'Comment faire le pont de la Toussaint 2028, un mercredi ?', a: `Avec deux jours de congé avant ou après : ${ah.map((b) => `${P({ van: b.verlofVan, tot: b.verlofTot }, 'fr')} pour ${b.vrij} jours de repos`).join(', ou ')}. Quatre jours couvrent toute la semaine, qui correspond en Flandre au congé d’automne.` },
      { q: 'Le pont vers le Nouvel An 2029 est-il compté ?', a: `Oui. Le bloc de fin décembre court jusqu’au Nouvel An ${Y + 1}, lui aussi férié. Les jours de congé eux-mêmes tombent tous en ${Y} et se prennent donc sur les congés de ${Y}. Vérifiez si votre employeur prévoit une fermeture collective entre Noël et le Nouvel An.` },
    ],
    body: (h) => `<h2>Les ponts les plus rentables de 2028</h2>
${h.table(['Congé à prendre', 'Jours de congé', 'Repos d’affilée', 'Jours de repos'], rij('fr'), `Ponts ${Y}, meilleur rendement d’abord`, ['l', 'r', 'l', 'r'])}
<p>La liste intègre les remplacements par défaut : le lundi 3 janvier pour le Nouvel An et le lundi 13 novembre pour l’Armistice, tous deux tombant un samedi. Si votre secteur en décide autrement, la liste change ; les règles sont expliquées par le ${h.src('fod-feestdagen', 'SPF Emploi')} et figurent dans la ${h.src('wet-1974', 'loi sur les jours fériés')}.</p>
<h2>Ponts et vacances scolaires</h2>
<p>En Fédération Wallonie-Bruxelles, les vacances de printemps ${h.per(lenteF)} s’ouvrent sur la fête du Travail, d’après le ${h.src('fwb-calendrier', 'calendrier officiel')}, et les vacances d’automne vont du ${h.per(herfstF)}. La Toussaint, le ${W(ahD, 'fr')}, tombe en plein congé d’automne flamand (${h.per(herfstVG)}). Pour croiser congés des parents et des enfants, voir ${h.a('schoolvakanties-2028-2029', 'vacances scolaires 2028-2029')}.</p>
${h.mini('vg', { p: ['a', 'b'], d: { sj: Y, a: 'FWB', b: 'VG' }, c: 'Comparer les congés 2028-2029 des deux réseaux' })}
<h2>Par rapport à 2027</h2>
<p>En ${Y - 1}, dix jours de congé donnent ${K.optimaliseer(Y - 1, 10, O).vrij} jours de repos, contre ${p10.vrij} en ${Y}. La différence tient au calendrier : ${Y} a moins de fériés un jeudi, mais davantage un lundi. Voir ${h.a('brugdagen-2027', 'ponts 2027')}.</p>`,
  },
  en: {
    slug: 'bridge-days-2028', nav: 'Bridge days 2028', card: `${bd.length} true bridge days, year-end with ${kerst.vrij} days off`,
    title: 'Bridge days 2028 Belgium: Ascension, 15 August and year-end',
    description: `Bridge days 2028 in Belgium: the Friday after Ascension, Monday 14 August and the Christmas bridge into 2029. Ten well-placed leave days give ${p10.vrij} days off.`,
    h1: 'Bridge days in Belgium 2028',
    intro: 'Plan 2028 ahead: the planner spreads your leave days around the year’s public holidays. Choose how many days to use and whether replacement days count.',
    resume: `${Y} has ${bd.length} true bridge days: ${bd.map((b) => W(b.verlofVan, 'en')).join(' and ')}. The first follows Ascension Day, the second comes before Assumption Day on ${W(oh, 'en')}, and each gives four days off for a single day of leave. National Day falls on ${W(nf, 'en')}, a long weekend with no leave needed. The best block is at the end of the year: Christmas Day is a Monday and so is New Year’s Day ${Y + 1}, so four leave days from ${D(kerst.verlofVan, 'en')} to ${D(kerst.verlofTot, 'en')} give ${kerst.vrij} days off. The year starts well too: New Year’s Day ${Y} is a Saturday and, with its replacement on Monday 3 January, four leave days give ${jan.vrij} days off. Overall, five leave days give ${p5.vrij} days off, ten give ${p10.vrij} and twenty give ${p20.vrij}.`,
    faqs: [
      { q: 'Is Monday 14 August 2028 a bridge day?', a: `Yes. Assumption Day falls on ${W(oh, 'en')}, so one day of leave on the Monday gives four days off, Saturday 12 to Tuesday 15 August. Schools are on their summer holidays then, which makes it a good moment for a short family trip.` },
      { q: 'How do I bridge All Saints’ Day on a Wednesday in 2028?', a: `With two leave days before or after: ${ah.map((b) => `${P({ van: b.verlofVan, tot: b.verlofTot }, 'en')} gives ${b.vrij} days off`).join(', or ')}. Four leave days cover the whole week, which is the autumn break in Flemish schools. The planner picks the best combination for you.` },
      { q: 'Does the planner include the bridge into New Year 2029?', a: `Yes. The late-December block runs up to New Year’s Day ${Y + 1}, itself a public holiday. The leave days all fall in ${Y}, so they come out of your ${Y} allowance. Check whether your employer plans a collective shutdown between Christmas and New Year.` },
    ],
    body: (h) => `<h2>The best-value bridges of 2028</h2>
${h.table(['Take leave', 'Leave days', 'Off in a row', 'Days off'], rij('en'), `Bridges ${Y}, best ratio first`, ['l', 'r', 'l', 'r'])}
<p>The list includes the default replacement days: Monday 3 January for New Year’s Day and Monday 13 November for Armistice Day, both of which fall on a Saturday. If your sector sets other days, the list changes; the rules are explained by the ${h.src('fod-feestdagen', 'federal employment service')} and set out in the ${h.src('wet-1974', 'Public Holidays Act')}.</p>
<h2>Bridges and school holidays</h2>
<p>All Saints’ Day on ${W(ahD, 'en')} falls in the middle of the Flemish autumn break (${h.per(herfstVG)}), while French-language pupils are off ${h.per(herfstF)}. In spring the Flemish Easter holidays run ${h.per(pasVG)}, ending on Easter Monday, and the French-language spring break, ${h.per(lenteF)}, opens with Labour Day according to the ${h.src('fwb-calendrier', 'official calendar')}. To combine leave and school breaks, see ${h.a('schoolvakanties-2028-2029', 'school holidays 2028-2029')}.</p>
${h.mini('vg', { p: ['a', 'b'], d: { sj: Y }, c: 'Compare the 2028-2029 breaks of both systems' })}
<h2>Compared with 2027</h2>
<p>In ${Y - 1}, ten leave days give ${K.optimaliseer(Y - 1, 10, O).vrij} days off, against ${p10.vrij} in ${Y}. The difference is the layout: ${Y} has fewer holidays on a Thursday but more on a Monday. See ${h.a('brugdagen-2027', 'bridge days 2027')}.</p>`,
  },
});
