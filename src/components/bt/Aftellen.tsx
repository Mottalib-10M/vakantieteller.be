/**
 * Hoe lang nog tot de vakantie: de lopende of volgende schoolvakantie van de gekozen Gemeenschap, met aftelling in de
 * tijd van het toestel tot middernacht in Brussel, en de vakanties die erna komen.
 * Eerste weergave = dag van de build (__BUILD_DAY__), gelijk op server en browser (RECETTE §17.5); de klok van het
 * toestel neemt het over na het mounten. Niets wordt verzonden.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { ResultCard, Rows, ShareRow } from '../calc/parts';
import { readParams, updateURL } from '../../lib/url-state';
import { GEMEENSCHAPPEN, GEM_KORT, fromIso, volgende, type Gemeenschap } from '../../lib/engine/feestdagen';
import { volgendeVakantie, VAK_NAME } from '../../lib/engine/school';
import { brusselInstant } from '../../lib/zeit';
import { dShort, dWeek, T as TT } from '../../lib/tool-specs';
import { t } from '../../i18n/ui';
import type { Lang } from '../../lib/format';

interface Props { lang: Lang; gem?: string; methodHref?: string; idPrefix?: string }
const isoOf = (ms: number) => { const d = new Date(ms); const p = (x: number) => String(x).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`; };

export default function Aftellen({ lang, gem: gem0, methodHref, idPrefix = 'a' }: Props) {
  const ui = t(lang), T = (nl: string, fr: string, en: string) => TT(lang, nl, fr, en);
  const [gem, setGem] = useState<Gemeenschap>((gem0 as Gemeenschap) ?? (lang === 'fr' ? 'FWB' : 'VG'));
  const [now, setNow] = useState<number>(() => Date.parse(`${__BUILD_DAY__}T00:00:00Z`));
  const [live, setLive] = useState(false);
  useEffect(() => {
    const u = readParams(window.location.search);
    const g = u.get('gem') as Gemeenschap | null; if (g && GEMEENSCHAPPEN.includes(g)) setGem(g);
    setNow(Date.now()); setLive(true);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => updateURL({ gem }), [gem]);
  const today = live ? isoOf(now) : __BUILD_DAY__;
  const list = useMemo(() => volgendeVakantie(gem, today, 6), [gem, today]);
  const next = list[0];
  const fd = useMemo(() => volgende(today, 1)[0], [today]);
  if (!next) return null;
  const doel = next.bezig ? next.p.tot : next.p.van;
  const left = Math.max(0, Date.parse(brusselInstant(doel)) + (next.bezig ? 864e5 : 0) - now);
  const d = Math.floor(left / 864e5), h = Math.floor((left % 864e5) / 36e5), m = Math.floor((left % 36e5) / 6e4), s = Math.floor((left % 6e4) / 1e3);
  const nf = new Intl.NumberFormat(lang === 'nl' ? 'nl-BE' : lang === 'fr' ? 'fr-BE' : 'en-GB');
  const naam = (x: typeof next) => VAK_NAME[gem][x.vak][lang];
  const schooldagen = next.bezig ? 0 : (() => { let c = 0; for (let x = fromIso(today); x < fromIso(next.p.van); x++) { const w = new Date(x * 864e5).getUTCDay(); if (w !== 0 && w !== 6) c++; } return c; })();
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
        <form className="grid content-start grid-cols-1 gap-x-4 gap-y-3" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-gem`} label={T('Onderwijs van', 'Enseignement', 'School system')} value={gem} onChange={(v) => setGem(v as Gemeenschap)} options={GEMEENSCHAPPEN.map((g) => ({ value: g, label: GEM_KORT[g][lang] }))} />
          <div className="rounded-lg border border-accent-200 bg-accent-50 px-4 py-3" data-chrome>
            <p className="text-sm font-medium text-navy-700">{next.bezig ? T(`Nu ${naam(next).toLowerCase()}, nog vrij tot het einde`, `${naam(next)} en cours, encore`, `${naam(next)} now, time left`) : T(`Nog tot de ${naam(next).toLowerCase()}`, `Encore avant : ${naam(next).toLowerCase()}`, `Time left until the ${naam(next).toLowerCase()}`)}</p>
            <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1" aria-live="off">
              {[[d, ui.days], [h, ui.hours], [m, ui.minutes], [s, ui.seconds]].map(([v, u]) => <span key={String(u)} className="inline-flex items-baseline gap-1"><span className="tabular-nums text-2xl font-bold text-navy-900">{nf.format(Number(v))}</span><span className="text-sm text-navy-600">{u}</span></span>)}
            </p>
            <p className="mt-1 text-xs text-navy-600">{T('Geteld tot middernacht in Brussel, met de klok van uw toestel.', 'Compté jusqu’à minuit à Bruxelles, avec l’horloge de votre appareil.', 'Counted to midnight in Brussels, using your device clock.')}</p>
          </div>
        </form>
        <ResultCard label={T(`Volgende vakantie, ${GEM_KORT[gem].nl}`, `Prochain congé, ${GEM_KORT[gem].fr}`, `Next break, ${GEM_KORT[gem].en}`)} value={naam(next)} sub={`${dShort(next.p.van, lang)} – ${dShort(next.p.tot, lang)}`}>
          <Rows rows={[
            ...(next.bezig ? [] : [[T('Schooldagen tot dan (ma–vr)', 'Jours de classe d’ici là (lun–ven)', 'School days until then (Mon–Fri)'), nf.format(schooldagen)] as [string, string]]),
            ...list.slice(1, 4).map((x) => [naam(x), `${dShort(x.p.van, lang)} – ${dShort(x.p.tot, lang)}`] as [string, string]),
            ...(fd ? [[T('Volgende wettelijke feestdag', 'Prochain jour férié légal', 'Next public holiday'), `${fd.name[lang]}, ${dShort(fd.date, lang)}`] as [string, string]] : []),
          ]} />
          <p className="mt-2 text-xs text-navy-600">{T('Vandaag', 'Aujourd’hui', 'Today')}: {dWeek(today, lang)}</p>
          <ShareRow methodHref={methodHref} labels={ui} />
        </ResultCard>
      </div>
    </div>
  );
}
