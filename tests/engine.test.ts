import { describe, it, expect } from 'vitest';
import { paaszondag, paaszondagMeeus, wettelijke, vervangingsdagen, feestdagen, volgende, aanplakDatum, nthWeekday } from '../src/lib/engine/feestdagen';
import { optimaliseer, bruggen, brugdagen, werkdagen, isoWeek, weeksInYear } from '../src/lib/engine/bruggen';
import { vgJaar, kalender, volgendeVakantie, vakantieSet, blok, JAREN, zomerBegin } from '../src/lib/engine/school';
import { brusselInstant } from '../src/lib/zeit';

describe('Pasen', () => {
  it('klopt met de paastabel', () => {
    expect(paaszondag(2026)).toBe('2026-04-05');
    expect(paaszondag(2027)).toBe('2027-03-28');
    expect(paaszondag(2028)).toBe('2028-04-16');
    expect(paaszondag(2029)).toBe('2029-04-01');
    expect(paaszondag(2030)).toBe('2030-04-21');
  });
  it('Gauss en Meeus geven van 1600 tot 2600 hetzelfde', () => {
    for (let y = 1600; y <= 2600; y++) expect(paaszondag(y)).toBe(paaszondagMeeus(y));
  });
});

describe('Wettelijke feestdagen (KB 18 april 1974)', () => {
  it('tien per jaar', () => { for (const y of [2026, 2027, 2028, 2029]) expect(wettelijke(y).length).toBe(10); });
  it('beweeglijke feestdagen 2027', () => {
    const d = Object.fromEntries(wettelijke(2027).map((f) => [f.id, f.date]));
    expect(d).toMatchObject({ paasmaandag: '2027-03-29', hemelvaart: '2027-05-06', pinkstermaandag: '2027-05-17' });
  });
  it('vervangingsdagen volgens de terugvalregel (vijfdagenweek)', () => {
    expect(vervangingsdagen(2026).map((f) => [f.voor, f.date])).toEqual([['olv-hemelvaart', '2026-08-17'], ['allerheiligen', '2026-11-02']]);
    expect(vervangingsdagen(2027).map((f) => [f.voor, f.date])).toEqual([['dag-van-de-arbeid', '2027-05-03'], ['olv-hemelvaart', '2027-08-16'], ['kerstmis', '2027-12-27']]);
    expect(vervangingsdagen(2028).map((f) => [f.voor, f.date])).toEqual([['nieuwjaar', '2028-01-03'], ['wapenstilstand', '2028-11-13']]);
  });
  it('zesdagenweek: alleen zondagen vervangen', () => {
    expect(vervangingsdagen(2027, 6).map((f) => f.voor)).toEqual(['olv-hemelvaart']);
  });
  it('aanplakken vóór 15 december van het jaar ervoor', () => { expect(aanplakDatum(2027)).toBe('2026-12-15'); });
  it('volgende feestdagen over de jaarwisseling', () => {
    expect(volgende('2026-10-28', 3).map((f) => f.date)).toEqual(['2026-11-01', '2026-11-11', '2026-12-25']);
    expect(volgende('2026-12-26', 2).map((f) => f.id)).toEqual(['nieuwjaar', 'paasmaandag']);
  });
  it('gemeenschapsfeestdag en 24/31 december alleen op verzoek', () => {
    expect(feestdagen(2027, { gem: 'VG' }).length).toBe(11);
    expect(feestdagen(2027, { oudejaar: true, vervanging: 'volgende' }).length).toBe(15);
  });
});

describe('Brugdagen', () => {
  it('2027: vrijdag na Hemelvaart en vrijdag 12 november', () => {
    expect(brugdagen(2027).map((b) => b.verlofVan)).toEqual(['2027-05-07', '2027-11-12']);
  });
  it('2026: maandag 10 november ligt niet tussen een feestdag en het weekend', () => {
    expect(brugdagen(2026).some((b) => b.verlofVan === '2026-11-10')).toBe(false);
  });
  it('optimaliseerder: nooit meer verlof dan het budget, meer budget geeft nooit minder', () => {
    let prev = 0;
    for (let b = 0; b <= 25; b++) {
      const p = optimaliseer(2027, b, { vervanging: 'volgende' });
      expect(p.verlof).toBeLessThanOrEqual(b);
      expect(p.vrij).toBeGreaterThanOrEqual(prev);
      prev = p.vrij;
    }
  });
  it('alle bruggen liggen in het jaar', () => {
    for (const b of bruggen(2028)) expect(b.verlofVan.startsWith('2028')).toBe(true);
  });
});

describe('Werkdagen en weken', () => {
  it('werkdagen 2027 zonder en met vervangingsdagen', () => {
    const a = werkdagen(2027).reduce((x, y) => x + y, 0), b = werkdagen(2027, { vervanging: 'volgende' }).reduce((x, y) => x + y, 0);
    expect(a).toBe(254);
    expect(b).toBe(a - 3);
  });
  it('ISO-weken', () => {
    expect(isoWeek('2027-01-01')).toEqual({ year: 2026, week: 53 });
    expect(weeksInYear(2026)).toBe(53);
    expect(weeksInYear(2027)).toBe(52);
    expect(nthWeekday(2027, 3, 0, -1)).toBe('2027-03-28');
  });
});

describe('Vlaamse schoolvakanties: regels tegen de lijst van vlaanderen.be', () => {
  const OFFICIEEL: Record<number, Record<string, [string, string]>> = {
    2023: { herfst: ['2023-10-30', '2023-11-05'], kerst: ['2023-12-25', '2024-01-07'], krokus: ['2024-02-12', '2024-02-18'], pasen: ['2024-04-01', '2024-04-14'] },
    2024: { herfst: ['2024-10-28', '2024-11-03'], kerst: ['2024-12-23', '2025-01-05'], krokus: ['2025-03-03', '2025-03-09'], pasen: ['2025-04-07', '2025-04-21'] },
    2025: { herfst: ['2025-10-27', '2025-11-02'], kerst: ['2025-12-22', '2026-01-04'], krokus: ['2026-02-16', '2026-02-22'], pasen: ['2026-04-06', '2026-04-19'] },
    2026: { herfst: ['2026-11-02', '2026-11-08'], kerst: ['2026-12-21', '2027-01-03'], krokus: ['2027-02-08', '2027-02-14'], pasen: ['2027-03-29', '2027-04-11'] },
    2027: { herfst: ['2027-11-01', '2027-11-07'], kerst: ['2027-12-27', '2028-01-09'], krokus: ['2028-02-28', '2028-03-05'], pasen: ['2028-04-03', '2028-04-17'] },
    2028: { herfst: ['2028-10-30', '2028-11-05'], kerst: ['2028-12-25', '2029-01-07'], krokus: ['2029-02-12', '2029-02-18'], pasen: ['2029-04-02', '2029-04-15'] },
    2029: { herfst: ['2029-10-29', '2029-11-04'], kerst: ['2029-12-24', '2030-01-06'], krokus: ['2030-03-04', '2030-03-10'], pasen: ['2030-04-08', '2030-04-22'] },
  };
  for (const [y, v] of Object.entries(OFFICIEEL)) {
    it(`schooljaar ${y}-${Number(y) + 1}`, () => {
      const k = vgJaar(Number(y));
      for (const [vak, [a, b]] of Object.entries(v)) expect(k[vak as 'herfst']).toEqual({ van: a, tot: b });
      expect(k.zomer).toEqual({ van: `${Number(y) + 1}-07-01`, tot: `${Number(y) + 1}-08-31` });
    });
  }
  it('hemelvaart: donderdag en vrijdag vrij', () => {
    expect(vgJaar(2026).vrij.filter((x) => x.date.startsWith('2027-05-0')).map((x) => x.date)).toEqual(['2027-05-01', '2027-05-06', '2027-05-07']);
  });
});

describe('FWB en DG', () => {
  it('gepubliceerde jaren', () => {
    expect(JAREN.FWB).toEqual([2026, 2027, 2028]);
    expect(JAREN.DG).toEqual([2026, 2027, 2028]);
    expect(kalender('FWB', 2029)).toBeNull();
  });
  it('FWB 2026-2027: Toussaint en lente', () => {
    expect(kalender('FWB', 2026)!.herfst).toEqual({ van: '2026-10-19', tot: '2026-11-01' });
    expect(kalender('FWB', 2026)!.pasen).toEqual({ van: '2027-04-26', tot: '2027-05-09' });
    expect(kalender('FWB', 2028)!.zomer).toBeNull();
    expect(zomerBegin('FWB', 2028)).toBe('2029-07-07');
  });
  it('DG gepubliceerd maandag–vrijdag, als blok met weekends', () => {
    expect(blok(kalender('DG', 2026)!.herfst!)).toEqual({ van: '2026-10-31', tot: '2026-11-08' });
  });
  it('alle periodes zijn van maandag tot zondag (VG, FWB) of maandag tot vrijdag (DG)', () => {
    for (const g of ['VG', 'FWB', 'DG'] as const) for (const y of [2026, 2027, 2028]) {
      const k = kalender(g, y)!;
      for (const v of ['herfst', 'kerst', 'krokus'] as const) {
        const p = k[v]!;
        expect(new Date(p.van + 'T12:00:00Z').getUTCDay()).toBe(1);
        expect(new Date(p.tot + 'T12:00:00Z').getUTCDay()).toBe(g === 'DG' ? 5 : 0);
      }
    }
  });
});

describe('Volgende vakantie', () => {
  it('op 28 oktober 2026', () => {
    expect(volgendeVakantie('VG', '2026-10-28')[0]).toMatchObject({ vak: 'herfst', bezig: false });
    expect(volgendeVakantie('FWB', '2026-10-28')[0]).toMatchObject({ vak: 'herfst', bezig: true });
    expect(volgendeVakantie('DG', '2026-10-28')[0].p.van).toBe('2026-10-31');
  });
  it('overlap VG en FWB in 2026-2027 bestaat (kerst)', () => {
    const a = vakantieSet('VG', 2026), b = vakantieSet('FWB', 2026);
    expect([...a].filter((d) => b.has(d)).length).toBeGreaterThan(14);
  });
});

describe('Brusselse tijd', () => {
  it('wintertijd en zomertijd', () => {
    expect(brusselInstant('2027-01-01')).toBe('2026-12-31T23:00:00.000Z');
    expect(brusselInstant('2027-07-01')).toBe('2027-06-30T22:00:00.000Z');
  });
});
