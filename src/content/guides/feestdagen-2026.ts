/** Feestdagen 2026 : wat er van het jaar overblijft (Allerheiligen op zondag, Wapenstilstand, Kerstmis). Data : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, D, W, fd } from '../_data';

const Y = 2026;
const lijst = K.wettelijke(Y);
const vv = K.vervangingsdagen(Y);
const wk = K.opWeekdag(lijst).length;
const ah = fd(Y, 'allerheiligen'), ws = fd(Y, 'wapenstilstand'), ks = fd(Y, 'kerstmis'), oh = fd(Y, 'olv-hemelvaart');
const vAh = vv.find((x) => x.voor === 'allerheiligen')!.date, vOh = vv.find((x) => x.voor === 'olv-hemelvaart')!.date;
const brug = K.bruggen(Y);
const kerstBrug = brug.find((b) => b.vrijVan === ks)!;
const novA = brug.find((b) => b.vrijTot === ws)!, novB = brug.find((b) => b.vrijVan === ws)!;
const wd = K.werkdagen(Y).reduce((a, b) => a + b, 0), wdV = K.werkdagen(Y, { vervanging: 'volgende' }).reduce((a, b) => a + b, 0);
const nj27 = fd(Y + 1, 'nieuwjaar');
const rest = lijst.filter((f) => f.date >= '2026-10-28');

export default defineGuide({
  id: 'feestdagen-2026', group: 'feestdagen', order: 11, tool: 'ft', toolArg: { jaar: Y },
  related: ['feestdagen-2027', 'vervangingsdagen-2027', 'kerstvakantie-2026', 'home'],
  sources: ['wet-1974', 'fod-feestdagen'],
  nl: {
    slug: 'feestdagen-2026', nav: 'Feestdagen 2026', card: `${wk} op een weekdag, Allerheiligen op zondag`,
    title: 'Feestdagen 2026 België: de laatste vrije dagen van het jaar',
    description: 'Feestdagen 2026 in België: Allerheiligen valt op zondag, vervangingsdag 2 november, dan Wapenstilstand en Kerstmis. Alle tien data met weekdag en brugdagen.',
    h1: 'Wettelijke feestdagen 2026 in België',
    intro: 'De tien wettelijke feestdagen van 2026 met hun weekdag, en wat er tot eind december nog komt. Kies een ander jaar of de zesdagenweek in de rekenaar.',
    resume: `België telt tien wettelijke feestdagen, en in ${Y} vallen er ${wk} op een weekdag. Twee vallen in het weekend: Onze-Lieve-Vrouw-Hemelvaart op ${W(oh, 'nl')} en Allerheiligen op ${W(ah, 'nl')}. Voor wie van maandag tot vrijdag werkt, moeten die twee worden vervangen; zonder ander akkoord wordt dat de eerste gewone werkdag erna, dus ${W(vOh, 'nl')} en ${W(vAh, 'nl')}. Van het jaar blijven nu nog ${rest.length} feestdagen over: Allerheiligen, Wapenstilstand op ${W(ws, 'nl')} en Kerstmis op ${W(ks, 'nl')}. Kerstmis op een vrijdag maakt het eindejaar gunstig: met vier verlofdagen, van ${D(kerstBrug.verlofVan, 'nl')} tot ${D(kerstBrug.verlofTot, 'nl')}, bent u ${kerstBrug.vrij} dagen vrij tot en met Nieuwjaar ${Y + 1}, dat zelf op een vrijdag valt. Over het hele jaar telt ${Y} ${wd} werkdagen van maandag tot vrijdag, of ${wdV} wanneer u de twee vervangingsdagen aftrekt.`,
    faqs: [
      { q: 'Is maandag 2 november 2026 een vrije dag?', a: `Voor de meeste werknemers wel. Allerheiligen valt op zondag ${D(ah, 'nl')}, en de wet van 4 januari 1974 schrijft dan een vervangingsdag voor. Zonder beslissing van het paritair comité, de ondernemingsraad of een akkoord in de onderneming is dat de eerste gewone werkdag erna: ${W(vAh, 'nl')}. Uw werkgever moest de vervangingsdagen vóór ${D(K.aanplakDatum(Y), 'nl')} aanplakken; kijk dus eerst naar die bekendmaking.` },
      { q: 'Welke feestdagen van 2026 moeten nog komen?', a: `Na eind oktober nog drie: Allerheiligen (${W(ah, 'nl')}, met vervangingsdag), Wapenstilstand (${W(ws, 'nl')}) en Kerstmis (${W(ks, 'nl')}). Daarna volgt Nieuwjaar ${Y + 1} op ${W(nj27, 'nl')}. Kerstavond en oudejaarsavond zijn wettelijk gewone werkdagen. Veel ondernemingen geven ze wel vrij via een akkoord.` },
      { q: 'Is Wapenstilstand ook een vrije dag op school?', a: `Ja. ${D(ws, 'nl')} is vrij in de drie Gemeenschappen, want het is zowel een wettelijke feestdag als een vrije dag in elke schoolkalender. In Vlaanderen valt hij drie dagen na het einde van de herfstvakantie, in het Franstalig onderwijs tien dagen erna. Op een woensdag betekent dat voor veel gezinnen een onderbroken werkweek.` },
    ],
    body: (h) => `<h2>De tien feestdagen van 2026</h2>
<p>De lijst van feestdagen ligt vast in het koninklijk besluit van 18 april 1974, genomen ter uitvoering van de ${h.src('wet-1974', 'wet van 4 januari 1974')}. Zes feestdagen hebben een vaste datum, drie hangen af van Pasen (Paasmaandag, Hemelvaart, Pinkstermaandag) en één, de Dag van de Arbeid, valt altijd op 1 mei. In ${Y} viel Pasen op ${D(K.paaszondag(Y), 'nl')}.</p>
${h.table(['Datum', 'Weekdag', 'Feestdag'], lijst.map((f) => [D(f.date, 'nl'), h.wd(f.date), f.name.nl]), `Wettelijke feestdagen ${Y}`)}
<h2>Twee feestdagen op een weekenddag</h2>
<p>Zaterdag ${D(oh, 'nl')} en zondag ${D(ah, 'nl')}: die twee feestdagen gaan niet verloren. Volgens de ${h.src('fod-feestdagen', 'FOD Werkgelegenheid')} krijgt de werknemer voor elke feestdag op een zondag of op een gewone inactiviteitsdag een vervangingsdag. Bij een zesdagenweek is de zaterdag een gewone werkdag, en dan moet alleen Allerheiligen worden vervangen. De volledige regeling staat op ${h.a('vervangingsdagen-2027', 'vervangingsdagen 2027')}.</p>
<h2>Het eindejaar plannen</h2>
<p>Rond Wapenstilstand liggen twee korte bruggen: verlof op ${D(novA.verlofVan, 'nl')} en ${D(novA.verlofTot, 'nl')} geeft ${novA.vrij} vrije dagen, verlof op ${D(novB.verlofVan, 'nl')} en ${D(novB.verlofTot, 'nl')} ook ${novB.vrij}. Met de kerstbrug valt de werkweek tussen Kerstmis en Nieuwjaar weg. Dat is ook de week waarin de ${h.a('kerstvakantie-2026', 'kerstvakantie')} van de kinderen bezig is.</p>
${h.mini('bt', { p: ['verlof'], d: { jaar: Y, verlof: 4 }, c: 'Alle brugdagen van 2026 berekenen' })}`,
  },
  fr: {
    slug: 'jours-feries-2026', nav: 'Jours fériés 2026', card: `${wk} en semaine, Toussaint un dimanche`,
    title: 'Jours fériés 2026 en Belgique : Toussaint et fin d’année',
    description: 'Jours fériés 2026 en Belgique : la Toussaint tombe un dimanche et se remplace le 2 novembre, puis l’Armistice et Noël. Les dix dates et leur jour de semaine.',
    h1: 'Jours fériés légaux 2026 en Belgique',
    intro: 'Les dix jours fériés légaux de 2026, leur jour de la semaine et ceux qui restent d’ici fin décembre. L’outil passe à une autre année ou à la semaine de six jours.',
    resume: `Sur les dix jours fériés légaux belges, ${wk} tombent en semaine en ${Y}. Les deux autres tombent un week-end : l’Assomption le ${W(oh, 'fr')} et la Toussaint le ${W(ah, 'fr')}. Pour un travailleur occupé du lundi au vendredi, ces deux jours doivent être remplacés ; sans autre décision, le remplacement a lieu le premier jour habituel d’activité qui suit, soit le ${W(vOh, 'fr')} et le ${W(vAh, 'fr')}. Il reste aujourd’hui ${rest.length} jours fériés dans l’année : la Toussaint, l’Armistice le ${W(ws, 'fr')} et Noël le ${W(ks, 'fr')}. Noël un vendredi rend la fin d’année avantageuse : quatre jours de congé, du ${D(kerstBrug.verlofVan, 'fr')} au ${D(kerstBrug.verlofTot, 'fr')}, donnent ${kerstBrug.vrij} jours de repos d’affilée jusqu’au Nouvel An, lui aussi un vendredi. Sur l’année, ${Y} compte ${wd} jours ouvrables du lundi au vendredi, ou ${wdV} une fois les deux remplacements déduits.`,
    faqs: [
      { q: 'Le lundi 2 novembre 2026 est-il un jour de congé ?', a: `Pour la plupart des salariés, oui. La Toussaint tombe le dimanche ${D(ah, 'fr')}, et la loi impose alors un jour de remplacement. À défaut de décision de la commission paritaire, du conseil d’entreprise ou d’un accord dans l’entreprise, c’est le premier jour ouvrable suivant : le ${W(vAh, 'fr')}. L’employeur devait afficher les remplacements avant le ${D(K.aanplakDatum(Y), 'fr')}.` },
      { q: 'Quels jours fériés reste-t-il en 2026 ?', a: `Après fin octobre, trois : la Toussaint (${W(ah, 'fr')}, remplacée), l’Armistice (${W(ws, 'fr')}) et Noël (${W(ks, 'fr')}). Le Nouvel An ${Y + 1} suit le ${W(nj27, 'fr')}. Le 24 et le 31 décembre restent des jours de travail ordinaires selon la loi.` },
      { q: 'Le 11 novembre est-il aussi un congé scolaire ?', a: `Oui, dans les trois Communautés : c’est à la fois un jour férié légal et un congé inscrit dans chaque calendrier scolaire. En Fédération Wallonie-Bruxelles, il tombe dix jours après la fin des vacances d’automne ; en Flandre, trois jours après. Un mercredi, il coupe la semaine en deux pour beaucoup de familles.` },
    ],
    body: (h) => `<h2>Les dix jours fériés de 2026</h2>
<p>La liste figure dans l’arrêté royal du 18 avril 1974, pris en exécution de la ${h.src('wet-1974', 'loi du 4 janvier 1974 relative aux jours fériés')}. Six jours ont une date fixe, trois dépendent de Pâques (lundi de Pâques, Ascension, lundi de Pentecôte), et la fête du Travail tombe toujours le 1er mai. Pâques ${Y} était le ${D(K.paaszondag(Y), 'fr')}.</p>
${h.table(['Date', 'Jour', 'Jour férié'], lijst.map((f) => [D(f.date, 'fr'), h.wd(f.date), f.name.fr]), `Jours fériés légaux ${Y}`)}
<h2>Un samedi et un dimanche à remplacer</h2>
<p>Le samedi ${D(oh, 'fr')} et le dimanche ${D(ah, 'fr')} ne sont pas perdus pour autant. Comme l’explique le ${h.src('fod-feestdagen', 'SPF Emploi')}, chaque jour férié qui tombe un dimanche ou un jour habituel d’inactivité donne droit à un jour de remplacement. Dans une semaine de six jours, le samedi est travaillé et seule la Toussaint doit être remplacée. Les règles complètes sont sur ${h.a('vervangingsdagen-2027', 'jours de remplacement 2027')}.</p>
<h2>Organiser la fin de l’année</h2>
<p>Autour de l’Armistice, deux petits ponts sont possibles : congé les ${D(novA.verlofVan, 'fr')} et ${D(novA.verlofTot, 'fr')} pour ${novA.vrij} jours de repos, ou les ${D(novB.verlofVan, 'fr')} et ${D(novB.verlofTot, 'fr')}, pour autant. Le pont de Noël couvre la semaine entre Noël et le Nouvel An, en plein dans les ${h.a('kerstvakantie-2026', 'vacances d’hiver')} des enfants.</p>
${h.mini('bt', { p: ['verlof'], d: { jaar: Y, verlof: 4 }, c: 'Calculer tous les ponts de 2026' })}`,
  },
  en: {
    slug: 'public-holidays-2026', nav: 'Public holidays 2026', card: `${wk} on weekdays, All Saints’ on a Sunday`,
    title: 'Public holidays 2026 Belgium: what is left of the year',
    description: 'Public holidays 2026 in Belgium: All Saints’ Day is a Sunday, replaced on 2 November, then Armistice Day and Christmas. All ten dates with weekdays and bridges.',
    h1: 'Public holidays in Belgium 2026',
    intro: 'Belgium’s ten statutory public holidays in 2026 with their weekdays, and the ones still to come before the end of December. Switch year or working week in the tool.',
    resume: `Belgium has ten statutory public holidays, and ${wk} of them fall on a weekday in ${Y}. The other two fall at the weekend: Assumption Day on ${W(oh, 'en')} and All Saints’ Day on ${W(ah, 'en')}. Employees on a Monday-to-Friday week are owed a replacement day for each; unless something else has been agreed, it is the first ordinary working day after the holiday, so ${W(vOh, 'en')} and ${W(vAh, 'en')}. ${rest.length} holidays are left this year: All Saints’ Day, Armistice Day on ${W(ws, 'en')} and Christmas Day on ${W(ks, 'en')}. With Christmas on a Friday, the end of the year works well: four leave days, ${D(kerstBrug.verlofVan, 'en')} to ${D(kerstBrug.verlofTot, 'en')}, give ${kerstBrug.vrij} days off in a row up to New Year’s Day, also a Friday. Across the year, ${Y} has ${wd} working days from Monday to Friday, or ${wdV} once the two replacement days are taken off.`,
    faqs: [
      { q: 'Is Monday 2 November 2026 a day off?', a: `For most employees, yes. All Saints’ Day falls on Sunday ${D(ah, 'en')}, and the law then requires a replacement day. Without a decision by the joint committee, the works council or an agreement in the company, it is the first ordinary working day after: ${W(vAh, 'en')}. Employers had to post the replacement days before ${D(K.aanplakDatum(Y), 'en')}.` },
      { q: 'Which public holidays are still to come in 2026?', a: `From the end of October, three: All Saints’ Day (${W(ah, 'en')}, replaced), Armistice Day (${W(ws, 'en')}) and Christmas Day (${W(ks, 'en')}). New Year’s Day ${Y + 1} follows on ${W(nj27, 'en')}. Christmas Eve and New Year’s Eve are ordinary working days by law.` },
      { q: 'Are schools closed on 11 November?', a: 'Yes, in all three Communities: it is both a statutory public holiday and a day off in every school calendar. In French-language schools it comes ten days after the autumn break ends; in Flemish schools, three days after. Falling on a Wednesday, it splits the working week in two for many families.' },
    ],
    body: (h) => `<h2>The ten holidays of 2026</h2>
<p>The list is set by the Royal Decree of 18 April 1974, made under the ${h.src('wet-1974', 'Act of 4 January 1974 on public holidays')}. Six holidays have fixed dates, three depend on Easter (Easter Monday, Ascension Day, Whit Monday), and Labour Day is always 1 May. Easter ${Y} fell on ${D(K.paaszondag(Y), 'en')}.</p>
${h.table(['Date', 'Weekday', 'Holiday'], lijst.map((f) => [D(f.date, 'en'), h.wd(f.date), f.name.en]), `Public holidays ${Y}`)}
<h2>A Saturday and a Sunday to replace</h2>
<p>Saturday ${D(oh, 'en')} and Sunday ${D(ah, 'en')} are not lost. As the ${h.src('fod-feestdagen', 'federal employment service')} explains, every holiday on a Sunday or on a usual non-working day entitles the employee to a replacement day. On a six-day week Saturday is a working day, so only All Saints’ Day needs replacing. The full rules are on ${h.a('vervangingsdagen-2027', 'replacement days 2027')}.</p>
<h2>Planning the end of the year</h2>
<p>Around Armistice Day there are two short bridges: leave on ${D(novA.verlofVan, 'en')} and ${D(novA.verlofTot, 'en')} gives ${novA.vrij} days off, and so does leave on ${D(novB.verlofVan, 'en')} and ${D(novB.verlofTot, 'en')}. The Christmas bridge covers the week between Christmas and New Year, right in the children’s ${h.a('kerstvakantie-2026', 'Christmas holidays')}.</p>
${h.mini('bt', { p: ['verlof'], d: { jaar: Y, verlof: 4 }, c: 'Work out every bridge in 2026' })}`,
  },
});
