/**
 * Trousse de rédaction : tout chiffre et toute date écrits dans une page viennent d'ici, jamais tapés à la main.
 *   K.P                                    paramètres datés (params-2026.json)
 *   K.wettelijke, K.vervangingsdagen, K.feestdagen, K.paaszondag …   jours fériés (engine/feestdagen.ts)
 *   K.optimaliseer, K.bruggen, K.brugdagen, K.werkdagen …            ponts et jours ouvrables (engine/bruggen.ts)
 *   K.kalender, K.vgJaar, K.volgendeVakantie …                       vacances scolaires (engine/school.ts)
 *   K.tool(kind, lang, args, valeurs)  lance un simulateur de tool-specs.ts et rend sa carte de résultat
 */
import P from '../data/params-2026.json';
import * as F from './engine/feestdagen';
import * as B from './engine/bruggen';
import * as S from './engine/school';
import { runTool } from './tool-specs';
import { LAST_UPDATED } from '../data/site-config';

export const KIT = { P, ...F, ...B, ...S, tool: runTool, LEESDATUM: LAST_UPDATED };
export type Kit = typeof KIT;
