/** Brugdagen 2027 : de twee echte brugdagen, de meibrug met vervangingsdag, verlof afgestemd op de schoolvakanties. Data : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, VG, FWB, D, W, P } from '../_data';
import type { Lang } from '../../lib/format';

const Y = 2027;
const O = { vervanging: 'volgende' as const };
const bd = K.brugdagen(Y, O);
const alle = K.bruggen(Y, O);
const plan = (b: number) => K.optimaliseer(Y, b, O);
const p5 = plan(5), p10 = plan(10), p20 = plan(20);
const mei = p10.blokken.find((b) => b.vrijVan === `${Y}-05-01`)!;
const kerst = alle.find((b) => b.feestdagen.includes('kerstmis'))!;
const herfstVG = VG(Y).herfst, herfstF = FWB(Y).herfst, paasVG = VG(Y - 1).pasen;
const nov = alle.find((b) => b.vrijTot === herfstVG.tot && b.verlof === 4)!;
const pas = alle.find((b) => b.vrijVan <= paasVG.van && b.vrijTot >= paasVG.van && b.verlof === 4)!;
const blokRij = (l: Lang, p: typeof p10) => p.blokken.map((b) => [P({ van: b.verlofVan, tot: b.verlofTot }, l), b.verlof, P({ van: b.vrijVan, tot: b.vrijTot }, l), b.vrij]);
const sumVrij = (p: typeof p10) => p.vrij;

export default defineGuide({
  id: 'brugdagen-2027', group: 'werk', order: 15, tool: 'bt', toolArg: { jaar: Y },
  related: ['feestdagen-2027', 'vervangingsdagen-2027', 'brugdagen-2028', 'schoolvakanties-2027-2028'],
  sources: ['wet-1974', 'fod-feestdagen', 'vg-vakanties'],
  nl: {
    slug: 'brugdagen-2027', nav: 'Brugdagen 2027', card: `${bd.length} echte brugdagen, 10 verlofdagen = ${p10.vrij} dagen vrij`,
    title: 'Brugdagen 2027 België: verlofplanner voor elke feestdag',
    description: `Brugdagen 2027 in België: de ${bd.length} echte brugdagen, de beste meibrug en een planner die uw verlofdagen op de feestdagen legt. Tien verlofdagen geven ${p10.vrij} dagen vrij.`,
    h1: 'Brugdagen 2027: zoveel mogelijk vrij met zo weinig mogelijk verlof',
    intro: 'Geef op hoeveel verlofdagen u wilt inzetten: de planner legt ze op de brugdagen van 2027 die het meest opleveren, met de vervangingsdagen meegeteld.',
    resume: `Een brugdag is een werkdag tussen een feestdag en het weekend. In ${Y} zijn er in België ${bd.length} echte: ${bd.map((b) => W(b.verlofVan, 'nl')).join(' en ')}, telkens na een feestdag op donderdag. Eén verlofdag levert dan vier vrije dagen op een rij op. De rijkste periode is mei. De Dag van de Arbeid valt op zaterdag en wordt zonder ander akkoord vervangen op maandag 3 mei; met Hemelvaart op donderdag 6 mei kosten drie verlofdagen dan ${mei.vrij} vrije dagen, van ${D(mei.vrijVan, 'nl')} tot ${D(mei.vrijTot, 'nl')}. Over het hele jaar geven vijf verlofdagen ${p5.vrij} vrije dagen, tien verlofdagen ${p10.vrij} en twintig verlofdagen ${p20.vrij}, als u ze op de beste bruggen legt. De planner rekent met de vervangingsdagen van de terugvalregel; kiest uw sector andere dagen, zet die optie dan uit. Wie kinderen heeft, legt de bruggen best naast de schoolvakanties.`,
    faqs: [
      { q: 'Wat is de beste brug van 2027?', a: `In verhouding de twee vrijdagen na Hemelvaart en na Wapenstilstand: één verlofdag voor vier vrije dagen. In absolute cijfers de meibrug: ${mei.verlof} verlofdagen voor ${mei.vrij} dagen vrij, op voorwaarde dat de vervangingsdag van de Dag van de Arbeid op maandag 3 mei valt.` },
      { q: 'Heeft mijn kind vrij op de brugdag na Hemelvaart?', a: `In het Vlaamse onderwijs wel: de vrijdag na Hemelvaart, ${D(bd[0].verlofVan, 'nl')}, is er een vrije dag. In het Franstalig onderwijs niet; daar is alleen Hemelvaart zelf vrij. De vrijdag na Wapenstilstand is in geen enkele Gemeenschap een schoolvrije dag. Daar moet u dus opvang regelen.` },
      { q: 'Kan mijn werkgever een brugdag als collectieve vakantie opleggen?', a: 'Dat kan alleen via een collectieve regeling, zoals een beslissing van het paritair comité of de ondernemingsraad of een wijziging van het arbeidsreglement. Soms wordt een brugdag ook als vervangingsdag gekozen. Vraag het na bij uw werkgever of in het bericht met de vervangingsdagen.' },
    ],
    body: (h) => `<h2>Het verlofplan met tien dagen</h2>
${h.table(['Verlof nemen', 'Verlofdagen', 'Vrij op een rij', 'Vrije dagen'], blokRij('nl', p10), `Tien verlofdagen in ${Y}: ${sumVrij(p10)} dagen vrij`, ['l', 'r', 'l', 'r'])}
<p>De planner zoekt alle combinaties af en kiest de verdeling met de meeste vrije dagen, niet alleen de bruggen met de beste verhouding. Daarom zit de week tussen Kerstmis en Nieuwjaar erin: met Kerstmis op zaterdag en de vervangingsdag op maandag 27 december kosten ${kerst.verlof} verlofdagen ${kerst.vrij} vrije dagen, tot en met ${D(kerst.vrijTot, 'nl')}, want ook Nieuwjaar ${Y + 1} valt op zaterdag en wordt op maandag vervangen.</p>
<h2>Bruggen op maat van de schoolvakanties</h2>
<p>De vier werkdagen na Allerheiligen, van ${D(nov.verlofVan, 'nl')} tot ${D(nov.verlofTot, 'nl')}, vallen samen met de Vlaamse herfstvakantie (${h.per(herfstVG)}): met vier verlofdagen bent u ${nov.vrij} dagen thuis met de kinderen. Franstalige leerlingen hebben dan al hun tweede vakantieweek (${h.per(herfstF)}). In het voorjaar valt de Vlaamse paasvakantie (${h.per(paasVG)}) samen met de brug na Paasmaandag: ${pas.verlof} verlofdagen voor ${pas.vrij} dagen. De data komen van ${h.src('vg-vakanties', 'vlaanderen.be')}; alles op een rij staat op ${h.a('schoolvakanties-2027-2028', 'schoolvakanties 2027-2028')}.</p>
${h.mini('vk', { p: ['gem'], d: { vak: 'herfst', sj: Y }, c: 'De herfstvakantie van uw kind' })}
<h2>Vervangingsdagen maken het verschil</h2>
<p>Drie feestdagen van ${Y} vallen in het weekend, en hun vervangingsdagen bepalen mee welke bruggen er zijn. De ${h.src('wet-1974', 'feestdagenwet')} laat de keuze aan de sector en de onderneming; pas zonder beslissing geldt de eerste werkdag erna, legt de ${h.src('fod-feestdagen', 'FOD Werkgelegenheid')} uit. Meer daarover op ${h.a('vervangingsdagen-2027', 'vervangingsdagen 2027')}.</p>`,
  },
  fr: {
    slug: 'ponts-2027', nav: 'Ponts 2027', card: `${bd.length} vrais ponts, 10 jours de congé = ${p10.vrij} jours libres`,
    title: 'Ponts 2027 en Belgique : planificateur de congés et fériés',
    description: `Ponts 2027 en Belgique : les ${bd.length} vrais ponts, le grand pont de mai et un planificateur qui place vos jours de congé. Dix jours de congé donnent ${p10.vrij} jours de repos.`,
    h1: 'Ponts 2027 : un maximum de repos pour un minimum de congés',
    intro: 'Indiquez le nombre de jours de congé à placer : l’outil les pose sur les ponts 2027 les plus rentables, en tenant compte des jours de remplacement.',
    resume: `Un pont est un jour ouvrable coincé entre un jour férié et le week-end. La Belgique en compte ${bd.length} vrais en ${Y} : le ${bd.map((b) => W(b.verlofVan, 'fr')).join(' et le ')}, chaque fois après un férié tombant un jeudi. Un seul jour de congé donne alors quatre jours de repos. Le mois de mai est le plus généreux : la fête du Travail tombe un samedi et, à défaut d’autre accord, elle est remplacée le lundi 3 mai ; avec l’Ascension le jeudi 6 mai, trois jours de congé suffisent pour ${mei.vrij} jours de repos, du ${D(mei.vrijVan, 'fr')} au ${D(mei.vrijTot, 'fr')}. Sur l’année, cinq jours de congé bien placés donnent ${p5.vrij} jours de repos, dix en donnent ${p10.vrij} et vingt ${p20.vrij}. L’outil compte les remplacements de la règle par défaut ; si votre secteur en a fixé d’autres, désactivez l’option. Pour les parents, mieux vaut caler les ponts sur les vacances scolaires.`,
    faqs: [
      { q: 'Quel est le meilleur pont de 2027 ?', a: `En rendement, les deux vendredis après l’Ascension et l’Armistice : un jour de congé pour quatre jours de repos. En durée, le pont de mai : ${mei.verlof} jours de congé pour ${mei.vrij} jours de repos, à condition que la fête du Travail soit remplacée le lundi 3 mai.` },
      { q: 'Mon enfant a-t-il congé le vendredi après l’Ascension ?', a: `Dans l’enseignement néerlandophone, oui : le ${D(bd[0].verlofVan, 'fr')} y est un jour de congé. En Fédération Wallonie-Bruxelles, non : seul le jeudi de l’Ascension est libre. Le vendredi après l’Armistice n’est un congé scolaire dans aucune Communauté : il faudra prévoir une garde.` },
      { q: 'L’employeur peut-il imposer un pont comme congé collectif ?', a: 'Seulement par une règle collective : décision de la commission paritaire ou du conseil d’entreprise, ou modification du règlement de travail. Un pont est parfois aussi choisi comme jour de remplacement. Renseignez-vous auprès de votre employeur ou dans l’avis des jours de remplacement.' },
    ],
    body: (h) => `<h2>Le plan avec dix jours de congé</h2>
${h.table(['Congé à prendre', 'Jours de congé', 'Repos d’affilée', 'Jours de repos'], blokRij('fr', p10), `Dix jours de congé en ${Y} : ${sumVrij(p10)} jours de repos`, ['l', 'r', 'l', 'r'])}
<p>L’outil examine toutes les combinaisons et retient la répartition qui donne le plus de jours de repos, pas seulement les ponts au meilleur rendement. C’est pourquoi la semaine entre Noël et le Nouvel An y figure : Noël tombe un samedi et son remplacement le lundi 27 décembre, si bien que ${kerst.verlof} jours de congé donnent ${kerst.vrij} jours de repos jusqu’au ${D(kerst.vrijTot, 'fr')}, le Nouvel An ${Y + 1} tombant lui aussi un samedi.</p>
<h2>Des ponts calés sur les vacances scolaires</h2>
<p>Les vacances d’automne ${Y} de la Fédération Wallonie-Bruxelles vont du ${h.per(herfstF)} ; la Toussaint tombe un lundi, en plein dedans. En Flandre, le congé (${h.per(herfstVG)}) recouvre le pont de la Toussaint : congé du ${D(nov.verlofVan, 'fr')} au ${D(nov.verlofTot, 'fr')}, soit quatre jours, pour ${nov.vrij} jours avec les enfants. Au printemps, les vacances de Pâques flamandes (${h.per(paasVG)}) recouvrent le pont qui suit le lundi de Pâques : ${pas.verlof} jours pour ${pas.vrij}. Tous les congés sont sur ${h.a('schoolvakanties-2027-2028', 'vacances scolaires 2027-2028')}, d’après ${h.src('vg-vakanties', 'vlaanderen.be')} et la Fédération.</p>
${h.mini('vk', { p: ['gem'], d: { vak: 'herfst', sj: Y, gem: 'FWB' }, c: 'Les vacances d’automne de votre enfant' })}
<h2>Le poids des jours de remplacement</h2>
<p>Trois fériés de ${Y} tombent un week-end, et leurs remplacements dessinent une partie des ponts. La ${h.src('wet-1974', 'loi sur les jours fériés')} laisse le choix au secteur et à l’entreprise ; ce n’est qu’à défaut de décision que s’applique le premier jour ouvrable suivant, rappelle le ${h.src('fod-feestdagen', 'SPF Emploi')}. Voir ${h.a('vervangingsdagen-2027', 'jours de remplacement 2027')}.</p>`,
  },
  en: {
    slug: 'bridge-days-2027', nav: 'Bridge days 2027', card: `${bd.length} true bridge days, 10 leave days = ${p10.vrij} days off`,
    title: 'Bridge days 2027 Belgium: leave planner around every holiday',
    description: `Bridge days 2027 in Belgium: the ${bd.length} true bridge days, the long May bridge and a planner that places your leave around holidays. Ten leave days give ${p10.vrij} days off.`,
    h1: 'Bridge days 2027: the most time off for the least leave',
    intro: 'Enter how many leave days you want to use: the planner puts them on the 2027 bridge days that pay off most, with replacement days included.',
    resume: `A bridge day is a working day squeezed between a public holiday and the weekend. Belgium has ${bd.length} true ones in ${Y}: ${bd.map((b) => W(b.verlofVan, 'en')).join(' and ')}, each after a Thursday holiday, so one day of leave buys four days off. May is the richest month. Labour Day falls on a Saturday and, unless something else is agreed, is replaced on Monday 3 May; with Ascension Day on Thursday 6 May, three leave days then give ${mei.vrij} days off, ${D(mei.vrijVan, 'en')} to ${D(mei.vrijTot, 'en')}. Across the year, five well-placed leave days give ${p5.vrij} days off, ten give ${p10.vrij} and twenty give ${p20.vrij}. The planner counts the default replacement days; if your sector has chosen others, switch that option off. Parents will want to line the bridges up with the school holidays, which the section below does for Flemish and French-language schools.`,
    faqs: [
      { q: 'Which bridge pays off best in 2027?', a: `By ratio, the two Fridays after Ascension Day and Armistice Day: one leave day for four days off, the best yield any bridge can give. By length, the May bridge: ${mei.verlof} leave days for ${mei.vrij} days off, provided Labour Day is replaced on Monday 3 May.` },
      { q: 'Is my child off school on the Friday after Ascension?', a: `In Flemish schools, yes: ${D(bd[0].verlofVan, 'en')} is a day off there. In French-language schools, no: only Ascension Day itself is off. The Friday after Armistice Day is not a school holiday in any Community, so you may need childcare that day. Plan accordingly.` },
      { q: 'Can my employer impose a bridge day as collective leave?', a: 'Only through a collective arrangement, such as a decision by the joint committee or works council, or a change to the work rules. A bridge day is sometimes chosen as a replacement day too. Check with your employer or in the notice listing the replacement days.' },
    ],
    body: (h) => `<h2>The plan with ten leave days</h2>
${h.table(['Take leave', 'Leave days', 'Off in a row', 'Days off'], blokRij('en', p10), `Ten leave days in ${Y}: ${sumVrij(p10)} days off`, ['l', 'r', 'l', 'r'])}
<p>The planner tries every combination and keeps the split with the most days off, not just the bridges with the best ratio. That is why the week between Christmas and New Year is in: Christmas falls on a Saturday with its replacement on Monday 27 December, so ${kerst.verlof} leave days give ${kerst.vrij} days off up to ${D(kerst.vrijTot, 'en')}, as New Year’s Day ${Y + 1} is also a Saturday.</p>
<h2>Bridges that match the school holidays</h2>
<p>The four working days after All Saints’ Day, ${D(nov.verlofVan, 'en')} to ${D(nov.verlofTot, 'en')}, coincide with the Flemish autumn break (${h.per(herfstVG)}): four leave days give ${nov.vrij} days at home with the children. French-language pupils are then in the second week of theirs (${h.per(herfstF)}). In spring, the Flemish Easter holidays (${h.per(paasVG)}) overlap the bridge after Easter Monday: ${pas.verlof} leave days for ${pas.vrij} days off. Dates come from ${h.src('vg-vakanties', 'vlaanderen.be')}; the full list is on ${h.a('schoolvakanties-2027-2028', 'school holidays 2027-2028')}.</p>
${h.mini('vk', { p: ['gem'], d: { vak: 'herfst', sj: Y }, c: 'Your child’s autumn break' })}
<h2>Why replacement days matter</h2>
<p>Three ${Y} holidays fall at the weekend, and their replacement days shape several bridges. The ${h.src('wet-1974', 'Public Holidays Act')} leaves the choice to the sector and the company; only if nobody decides does the first working day after apply, as the ${h.src('fod-feestdagen', 'federal employment service')} explains. More on ${h.a('vervangingsdagen-2027', 'replacement days 2027')}.</p>`,
  },
});
