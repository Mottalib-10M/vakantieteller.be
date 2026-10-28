/**
 * Jaarkalender met weeknummers (ISO 8601), de tien wettelijke feestdagen, de vervangingsdagen (terugvalregel) en de
 * schoolvakanties van de gekozen Gemeenschap. Eerste weergave = standaardwaarden van de build; het gedeelde adres
 * wordt pas na het mounten gelezen (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { Choice, ResultCard, Rows, ShareRow } from '../calc/parts';
import { readParams, updateURL } from '../../lib/url-state';
import { wettelijke, vervangingsdagen, GEMEENSCHAPPEN, GEM_KORT, dayNum, fromIso, type Gemeenschap } from '../../lib/engine/feestdagen';
import { werkdagen, isoWeek, weeksInYear } from '../../lib/engine/bruggen';
import { vakantieSet } from '../../lib/engine/school';
import { dLong, T as TT, TAG } from '../../lib/tool-specs';
import { t } from '../../i18n/ui';
import type { Lang } from '../../lib/format';

interface Props { lang: Lang; year: number; gem?: string; methodHref?: string; idPrefix?: string }

export default function Kalender({ lang, year, gem: gem0, methodHref, idPrefix = 'k' }: Props) {
  const ui = t(lang), T = (nl: string, fr: string, en: string) => TT(lang, nl, fr, en);
  const [gem, setGem] = useState<Gemeenschap>((gem0 as Gemeenschap) ?? (lang === 'fr' ? 'FWB' : 'VG'));
  const [vv, setVv] = useState<'ja' | 'nee'>('ja');
  useEffect(() => {
    const u = readParams(window.location.search);
    const g = u.get('gem') as Gemeenschap | null; if (g && GEMEENSCHAPPEN.includes(g)) setGem(g);
    const p = u.get('vv'); if (p === 'ja' || p === 'nee') setVv(p);
  }, []);
  useEffect(() => updateURL({ gem, vv }), [gem, vv]);
  const list = useMemo(() => [...wettelijke(year), ...(vv === 'ja' ? vervangingsdagen(year) : [])].sort((a, b) => a.date.localeCompare(b.date)), [year, vv]);
  const hol = useMemo(() => new Map(list.map((f) => [f.date, f])), [list]);
  const school = useMemo(() => new Set([...vakantieSet(gem, year - 1), ...vakantieSet(gem, year)]), [gem, year]);
  const wd = useMemo(() => werkdagen(year, { vervanging: vv === 'ja' ? 'volgende' : 'geen' }).reduce((a, b) => a + b, 0), [year, vv]);
  const ft = wettelijke(year).filter((f) => { const w = new Date(fromIso(f.date) * 864e5).getUTCDay(); return w !== 0 && w !== 6; }).length;
  const wdHead = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2027, 1, 1 + i)).toLocaleDateString(TAG(lang), { weekday: 'short', timeZone: 'UTC' }).replace('.', ''));
  const months = Array.from({ length: 12 }, (_, m) => {
    const first = dayNum(year, m + 1, 1), last = dayNum(year, m + 2, 1) - 1;
    const lead = (new Date(first * 864e5).getUTCDay() + 6) % 7;
    const cells: Array<number | null> = [...Array(lead).fill(null)];
    for (let d = first; d <= last; d++) cells.push(d);
    while (cells.length % 7) cells.push(null);
    const weeks: Array<Array<number | null>> = []; for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return { name: new Date(first * 864e5).toLocaleDateString(TAG(lang), { month: 'long', timeZone: 'UTC' }), weeks };
  });
  const iso = (d: number) => new Date(d * 864e5).toISOString().slice(0, 10);
  const schoolDays = [...school].filter((d) => d >= dayNum(year, 1, 1) && d <= dayNum(year, 12, 31)).length;
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
        <form className="grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-gem`} label={T('Schoolvakanties van', 'Vacances scolaires', 'School holidays of')} value={gem} onChange={(v) => setGem(v as Gemeenschap)} options={GEMEENSCHAPPEN.map((g) => ({ value: g, label: GEM_KORT[g][lang] }))} />
          <div className="grid grid-rows-subgrid row-span-3"><Choice id={`${idPrefix}-vv`} label={T('Vervangingsdagen tonen', 'Jours de remplacement', 'Show replacement days')} value={vv} options={[{ value: 'ja', label: T('Ja', 'Oui', 'Yes') }, { value: 'nee', label: T('Nee', 'Non', 'No') }]} onChange={(v) => setVv(v)} /></div>
        </form>
        <ResultCard label={T(`Kalender ${year}, ${GEM_KORT[gem].nl}`, `Calendrier ${year}, ${GEM_KORT[gem].fr}`, `Calendar ${year}, ${GEM_KORT[gem].en}`)} value={T(`${wd} werkdagen`, `${wd} jours ouvrables`, `${wd} working days`)} sub={T(`${ft} feestdagen op een weekdag, ${weeksInYear(year)} weken`, `${ft} jours fériés en semaine, ${weeksInYear(year)} semaines`, `${ft} holidays on weekdays, ${weeksInYear(year)} weeks`)}>
          <Rows rows={[[T('Dagen schoolvakantie in dit kalenderjaar', 'Jours de vacances scolaires dans l’année civile', 'School-holiday days in this calendar year'), String(schoolDays)], [T('Week 1 begint op', 'La semaine 1 commence le', 'Week 1 starts on'), dLong(iso(dayNum(year, 1, 4) - ((new Date(dayNum(year, 1, 4) * 864e5).getUTCDay() + 6) % 7)), lang)]]} />
          <ShareRow methodHref={methodHref} labels={ui} />
        </ResultCard>
      </div>
      <div className="kal-grid mt-6">
        {months.map((mo) => (
          <table key={mo.name}>
            <caption className="mb-1 text-left text-sm font-semibold text-navy-900">{mo.name} {year}</caption>
            <thead><tr><th scope="col" className="text-[0.7rem] font-medium text-navy-600">{T('Wk', 'Sem', 'Wk')}</th>{wdHead.map((h) => <th key={h} scope="col" className="font-medium text-navy-700">{h}</th>)}</tr></thead>
            <tbody>{mo.weeks.map((w, i) => {
              const firstDay = w.find((x) => x !== null)!;
              return (
                <tr key={i}><td className="kw">{isoWeek(iso(firstDay)).week}</td>
                  {w.map((d, j) => {
                    if (d === null) return <td key={j} />;
                    const f = hol.get(iso(d));
                    const cls = f ? (f.vervanging ? 'tf' : 'ft') : school.has(d) ? 'sv' : j >= 5 ? 'we' : '';
                    return <td key={j} className={cls} title={f ? f.name[lang] : undefined}>{new Date(d * 864e5).getUTCDate()}</td>;
                  })}
                </tr>
              );
            })}</tbody>
          </table>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-700">
        <span><span className="mr-1 inline-block h-3 w-3 rounded bg-accent-100 align-middle" aria-hidden="true" />{T('wettelijke feestdag', 'jour férié légal', 'public holiday')}</span>
        <span><span className="mr-1 inline-block h-3 w-3 rounded bg-navy-100 align-middle" aria-hidden="true" />{T('vervangingsdag zonder akkoord', 'remplacement par défaut', 'default replacement day')}</span>
        <span><span className="mr-1 inline-block h-3 w-3 rounded bg-amber-100 align-middle" aria-hidden="true" />{T('schoolvakantie', 'vacances scolaires', 'school holiday')}</span>
      </p>
      <ul className="mt-4 grid gap-x-6 gap-y-1 text-sm text-navy-800 sm:grid-cols-2">
        {list.map((f) => <li key={f.id + f.date}><span className="tabular-nums">{dLong(f.date, lang)}</span> · {f.name[lang]}</li>)}
      </ul>
    </div>
  );
}
