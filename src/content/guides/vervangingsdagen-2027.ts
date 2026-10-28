/** Vervangingsdagen 2027 : wie beslist, de terugvalregel, het aanplakken, de zesdagenweek. Data : moteur. */
import { defineGuide } from '../../lib/page-types';
import { K, D, W } from '../_data';

const Y = 2027;
const fd = K.wettelijke(Y);
const v5 = K.vervangingsdagen(Y, 5), v6 = K.vervangingsdagen(Y, 6);
const naam = (id: string, l: 'nl' | 'fr' | 'en') => fd.find((f) => f.id === id)!.name[l];
const dag = (id: string) => fd.find((f) => f.id === id)!.date;
const aanplak = K.aanplakDatum(Y);
const v28 = K.vervangingsdagen(Y + 1, 5);
const rij = (l: 'nl' | 'fr' | 'en') => v5.map((x) => [naam(x.voor!, l), W(dag(x.voor!), l), W(x.date, l), v6.find((z) => z.voor === x.voor) ? W(v6.find((z) => z.voor === x.voor)!.date, l) : '–']);

export default defineGuide({
  id: 'vervangingsdagen-2027', group: 'feestdagen', order: 14, tool: 'vv', toolArg: { jaar: Y },
  related: ['feestdagen-2027', 'brugdagen-2027', 'werkdagen-2027', 'feestdagen-2028'],
  sources: ['wet-1974', 'fod-feestdagen'],
  nl: {
    slug: 'vervangingsdagen-2027', nav: 'Vervangingsdagen 2027', card: `${v5.length} in een vijfdagenweek, ${v6.length} in een zesdagenweek`,
    title: 'Vervangingsdagen 2027: data, wie beslist en terugvalregel',
    description: `Vervangingsdagen 2027 in België: ${v5.length} feestdagen vallen in het weekend. Wie de vervangende dag kiest, wat zonder akkoord geldt en wanneer de werkgever ze aanplakt.`,
    h1: 'Vervangingsdagen 2027: de regels voor feestdagen in het weekend',
    intro: 'Welke feestdagen in 2027 een vervangingsdag krijgen, op welke dag die zonder akkoord valt en wie hem anders vastlegt. Kies vijf- of zesdagenweek in de rekenaar.',
    resume: `Valt een wettelijke feestdag op een zondag of op een dag waarop u gewoonlijk niet werkt, dan heeft u recht op een vervangingsdag. In ${Y} gaat het in een vijfdagenweek om ${v5.length} feestdagen: ${v5.map((x) => `${naam(x.voor!, 'nl')} (${W(dag(x.voor!), 'nl')})`).join(', ')}. De dag zelf wordt in de eerste plaats gekozen door het paritair comité van uw sector; daarna, in die volgorde, door de ondernemingsraad, de vakbondsafvaardiging, een akkoord met de werknemers of, als er niets is, een individueel akkoord. Wordt er niets beslist, dan is de vervangingsdag de eerste gewone werkdag na de feestdag: ${v5.map((x) => W(x.date, 'nl')).join(', ').replace(/, ([^,]*)$/, ' en $1')}. De werkgever moet de vervangingsdagen van ${Y} vóór ${D(aanplak, 'nl')} in de onderneming aanplakken. Wie in een zesdagenweek werkt, heeft de zaterdag als gewone werkdag en krijgt dan alleen voor ${v6.map((x) => naam(x.voor!, 'nl')).join(' en ')} een vervangingsdag.`,
    faqs: [
      { q: 'Wie kiest de vervangingsdag in mijn bedrijf?', a: 'Eerst het paritair comité: als dat voor de sector een dag vastlegt, geldt die. Doet het dat niet, dan beslist de ondernemingsraad, bij gebrek daaraan de vakbondsafvaardiging, en anders een akkoord tussen werkgever en werknemers. Is er geen enkele beslissing, dan valt de vervangingsdag op de eerste gewone werkdag na de feestdag.' },
      { q: 'Valt de vervangingsdag van Kerstmis 2027 op 27 december?', a: `Volgens de terugvalregel wel: Kerstmis valt op ${W(dag('kerstmis'), 'nl')} en de eerste gewone werkdag erna is ${W(v5.find((x) => x.voor === 'kerstmis')!.date, 'nl')}. Uw sector of onderneming kan een andere dag kiezen, bijvoorbeeld een brugdag; dat staat in de bekendmaking die uw werkgever aanplakt.` },
      { q: 'Waar vind ik de vervangingsdagen die mijn werkgever koos?', a: 'In het bericht dat de werkgever elk jaar in de onderneming aanplakt en bij het arbeidsreglement voegt. Staat er geen andere dag in, of is er niets beslist, dan geldt de terugvalregel die de rekenaar toepast: de eerste gewone werkdag na de feestdag.' },
    ],
    body: (h) => `<h2>De vervangingsdagen van 2027</h2>
${h.table(['Feestdag', 'Valt op', 'Vijfdagenweek', 'Zesdagenweek'], rij('nl'), `Vervangingsdagen ${Y} zonder akkoord (terugvalregel)`)}
<p>Artikel 6 van de ${h.src('wet-1974', 'wet van 4 januari 1974')} legt de vervanging vast, artikel 7 laat de keuze van de dag aan de paritaire comités. De ${h.src('fod-feestdagen', 'FOD Werkgelegenheid')} beschrijft de volgorde van wie beslist wanneer het comité niets regelt.</p>
<h2>Aanplakken vóór 15 december</h2>
<p>Elke werkgever hangt jaarlijks een bericht op met de vervangingsdagen van het komende jaar, vóór ${D(aanplak, 'nl')} voor ${Y}. Het bericht hoort bij het arbeidsreglement. Een vervangingsdag is een betaalde vrije dag, net als de feestdag zelf.</p>
<h2>Vijf of zes dagen per week</h2>
<p>Het verschil tussen de twee regimes zit in de zaterdag. In een vijfdagenweek is zaterdag een gewone inactiviteitsdag, dus een feestdag op zaterdag wordt vervangen. In een zesdagenweek wordt er op zaterdag gewerkt en verandert er niets. In ${Y + 1} vallen ${v28.length} feestdagen op een zaterdag, zie ${h.a('feestdagen-2028', 'feestdagen 2028')}. Hoe de vervangingsdagen uw aantal werkdagen beïnvloeden, ziet u op ${h.a('werkdagen-2027', 'werkdagen 2027')}.</p>
${h.mini('wd', { p: ['vv'], d: { jaar: Y }, c: 'Werkdagen 2027 met of zonder vervangingsdagen' })}`,
  },
  fr: {
    slug: 'jours-de-remplacement-2027', nav: 'Jours de remplacement 2027', card: `${v5.length} en semaine de cinq jours, ${v6.length} en six jours`,
    title: 'Jours de remplacement 2027 : dates et règle par défaut',
    description: `Jours de remplacement 2027 en Belgique : ${v5.length} jours fériés tombent un week-end. Qui choisit le jour, ce qui vaut sans accord et quand l’employeur les affiche.`,
    h1: 'Jours de remplacement 2027 : les fériés du week-end',
    intro: 'Les jours fériés 2027 qui donnent droit à un remplacement, le jour retenu à défaut d’accord et qui peut en décider autrement. L’outil gère la semaine de cinq ou six jours.',
    resume: `Lorsqu’un jour férié légal tombe un dimanche ou un jour habituel d’inactivité, le travailleur a droit à un jour de remplacement. En ${Y}, en semaine de cinq jours, ${v5.length} jours fériés sont concernés : ${v5.map((x) => `${naam(x.voor!, 'fr')} (${W(dag(x.voor!), 'fr')})`).join(', ')}. Le jour de remplacement est d’abord fixé par la commission paritaire du secteur ; à défaut, et dans cet ordre, par le conseil d’entreprise, la délégation syndicale, un accord avec les travailleurs ou un accord individuel. Faute de toute décision, il tombe le premier jour habituel d’activité qui suit le férié : ${v5.map((x) => `le ${W(x.date, 'fr')}`).join(', ').replace(/, ([^,]*)$/, ' et $1')}. L’employeur doit afficher les remplacements de ${Y} avant le ${D(aanplak, 'fr')}. En semaine de six jours, le samedi est un jour de travail habituel ; seul le férié qui tombe un dimanche, ${v6.map((x) => naam(x.voor!, 'fr')).join(' et ')}, est alors remplacé.`,
    faqs: [
      { q: 'Qui fixe le jour de remplacement dans mon entreprise ?', a: 'D’abord la commission paritaire, si elle fixe un jour pour le secteur. Sinon le conseil d’entreprise, à défaut la délégation syndicale, puis un accord entre l’employeur et les travailleurs. Sans aucune décision, le remplacement a lieu le premier jour habituel d’activité après le férié.' },
      { q: 'Le remplacement de Noël 2027 tombe-t-il le 27 décembre ?', a: `Selon la règle par défaut, oui : Noël tombe le ${W(dag('kerstmis'), 'fr')}, et le premier jour d’activité suivant est le ${W(v5.find((x) => x.voor === 'kerstmis')!.date, 'fr')}. Le secteur ou l’entreprise peut choisir un autre jour, un pont par exemple ; l’avis affiché par l’employeur fait foi.` },
      { q: 'Où trouver les jours de remplacement choisis par mon employeur ?', a: 'Dans l’avis que l’employeur affiche chaque année dans l’entreprise et joint au règlement de travail. S’il ne mentionne pas d’autre jour, ou si rien n’a été décidé, la règle par défaut appliquée par l’outil vaut : le premier jour habituel d’activité après le férié.' },
    ],
    body: (h) => `<h2>Les remplacements de 2027</h2>
${h.table(['Jour férié', 'Tombe le', 'Semaine de 5 jours', 'Semaine de 6 jours'], rij('fr'), `Jours de remplacement ${Y} sans accord (règle par défaut)`)}
<p>L’article 6 de la ${h.src('wet-1974', 'loi du 4 janvier 1974')} prévoit le remplacement, l’article 7 confie le choix du jour aux commissions paritaires. Le ${h.src('fod-feestdagen', 'SPF Emploi')} précise l’ordre des décideurs lorsque la commission ne règle rien.</p>
<h2>L’affichage avant le 15 décembre</h2>
<p>Chaque année, l’employeur affiche un avis avec les jours de remplacement de l’année suivante, avant le ${D(aanplak, 'fr')} pour ${Y}. Cet avis est annexé au règlement de travail. Le jour de remplacement est rémunéré comme le férié lui-même.</p>
<h2>Cinq ou six jours par semaine</h2>
<p>Tout se joue sur le samedi. En semaine de cinq jours, c’est un jour habituel d’inactivité : un férié tombant un samedi est remplacé. En semaine de six jours, le samedi est travaillé et rien ne change. En ${Y + 1}, ${v28.length} fériés tombent un samedi, voir ${h.a('feestdagen-2028', 'jours fériés 2028')}. L’effet des remplacements sur le nombre de jours de travail est calculé sur ${h.a('werkdagen-2027', 'jours ouvrables 2027')}.</p>
${h.mini('wd', { p: ['vv'], d: { jaar: Y }, c: 'Jours ouvrables 2027 avec ou sans remplacement' })}`,
  },
  en: {
    slug: 'replacement-days-2027', nav: 'Replacement days 2027', card: `${v5.length} on a five-day week, ${v6.length} on six days`,
    title: 'Replacement days 2027 Belgium: dates and the default rule',
    description: `Replacement days 2027 in Belgium: ${v5.length} public holidays fall at the weekend. Who picks the day, what applies without agreement and when the notice goes up.`,
    h1: 'Replacement days 2027: public holidays at the weekend',
    intro: 'Which 2027 holidays earn a replacement day, the day that applies without an agreement, and who can set another one. The tool handles five and six-day weeks.',
    resume: `When a statutory public holiday falls on a Sunday or on a day you do not usually work, Belgian law gives you a replacement day. On a five-day week, ${v5.length} holidays are affected in ${Y}: ${v5.map((x) => `${naam(x.voor!, 'en')} (${W(dag(x.voor!), 'en')})`).join(', ')}. The replacement day is set first by the joint committee for your sector; failing that, in this order, by the works council, the union delegation, an agreement with the workforce or an individual agreement. If nobody decides, it is the first ordinary working day after the holiday: ${v5.map((x) => W(x.date, 'en')).join(', ').replace(/, ([^,]*)$/, ' and $1')}. Employers must post the ${Y} replacement days in the workplace before ${D(aanplak, 'en')}. On a six-day week Saturday is a normal working day, so only the Sunday holiday, ${v6.map((x) => naam(x.voor!, 'en')).join(' and ')}, is replaced.`,
    faqs: [
      { q: 'Who sets the replacement day in my company?', a: 'First the joint committee, if it sets a day for the sector. Otherwise the works council, then the union delegation, then an agreement between the employer and the workforce. With no decision at all, the replacement is the first ordinary working day after the holiday.' },
      { q: 'Is the Christmas 2027 replacement day on 27 December?', a: `Under the default rule, yes: Christmas Day is ${W(dag('kerstmis'), 'en')} and the first working day after it is ${W(v5.find((x) => x.voor === 'kerstmis')!.date, 'en')}. Your sector or company may choose another day, a bridge day for instance; the notice your employer posts is what counts.` },
      { q: 'Where do I find the replacement days my employer chose?', a: 'In the notice the employer posts in the workplace every year and adds to the work rules. If it names no other day, or nothing was decided, the default rule used by the tool applies: the first ordinary working day after the holiday.' },
    ],
    body: (h) => `<h2>The 2027 replacement days</h2>
${h.table(['Holiday', 'Falls on', 'Five-day week', 'Six-day week'], rij('en'), `Replacement days ${Y} without agreement (default rule)`)}
<p>Section 6 of the ${h.src('wet-1974', 'Act of 4 January 1974')} provides for replacement, and section 7 leaves the choice of day to the joint committees. The ${h.src('fod-feestdagen', 'federal employment service')} sets out who decides when the committee does not.</p>
<h2>The notice before 15 December</h2>
<p>Each year the employer posts a notice with the next year’s replacement days, before ${D(aanplak, 'en')} for ${Y}. It forms part of the work rules. A replacement day is paid like the holiday itself.</p>
<h2>Five or six days a week</h2>
<p>It all comes down to Saturday. On a five-day week it is a usual non-working day, so a Saturday holiday is replaced. On a six-day week Saturday is worked and nothing changes. In ${Y + 1}, ${v28.length} holidays fall on a Saturday; see ${h.a('feestdagen-2028', 'public holidays 2028')}. How replacement days change your number of working days is shown on ${h.a('werkdagen-2027', 'working days 2027')}.</p>
${h.mini('wd', { p: ['vv'], d: { jaar: Y }, c: 'Working days 2027 with or without replacements' })}`,
  },
});
