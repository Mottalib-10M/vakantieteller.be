/** llms.txt (RECETTE §21), généré à partir du registre des pages. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { KIT as K } from '../lib/kit';
export function GET() {
  const vg = K.vgJaar(2026), fwb = K.kalender('FWB', 2026)!, dg = K.kalender('DG', 2026)!;
  const vv = K.vervangingsdagen(2027).map((f) => f.date).join(', ');
  const lines = [
    `# ${SITE_NAMES.nl}`, '',
    `> School holidays, public holidays, replacement days and bridge days in Belgium, 2026 to 2029, in Dutch (nl-BE), French (fr-BE) and English. Three school calendars: Flemish Community (computed from fixed rules, tested against the list on vlaanderen.be for 2023-2024 to 2029-2030), Wallonia-Brussels Federation (reformed calendar, dates from enseignement.be) and German-speaking Community (2026-2029 calendar adopted by its government). 2026-2027: Flanders autumn break ${vg.herfst.van} to ${vg.herfst.tot}, carnival ${vg.krokus.van} to ${vg.krokus.tot}, Easter ${vg.pasen.van} to ${vg.pasen.tot}; Wallonia-Brussels autumn ${fwb.herfst!.van} to ${fwb.herfst!.tot}, relaxation break ${fwb.krokus!.van} to ${fwb.krokus!.tot}, spring ${fwb.pasen!.van} to ${fwb.pasen!.tot}; German-speaking Community autumn ${dg.herfst!.van} to ${dg.herfst!.tot} (published Monday to Friday). Ten statutory public holidays under the Act of 4 January 1974 and the royal decree of 18 April 1974; a holiday on a Sunday or usual non-working day must be replaced (art. 6), by default on the first ordinary working day after it; 2027 default replacement days: ${vv}. Easter by Gauss's formula, cross-checked against Meeus for 1600-2600. Everything runs in the browser; nothing entered is sent. Independent site by Radif Partners; no travel, booking or affiliate offers. Last updated ${LAST_UPDATED}.`, '',
    `## School holidays 2026-2027`, `- [Schoolvakanties 2026-2027](${SITE_URL}${route('home', 'nl')})`, `- [Vacances scolaires 2026-2027](${SITE_URL}${route('home', 'fr')})`, `- [School holidays 2026-2027](${SITE_URL}${route('home', 'en')})`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en}`, ...GUIDES.filter((p) => p.group === g.id).flatMap((p) => [
      `- [${p.nl.nav}](${SITE_URL}${route(p.id, 'nl')}): ${p.nl.card}`,
      `- [${p.fr.nav}](${SITE_URL}${route(p.id, 'fr')}): ${p.fr.card}`,
      `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`,
    ]), '']),
    '## About', `- [Methode](${SITE_URL}${route('method', 'nl')})`, `- [Méthode](${SITE_URL}${route('method', 'fr')})`, `- [Method](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
