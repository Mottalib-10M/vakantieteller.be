/** Toutes les pages prévues (id = nom du fichier de src/content/guides, ou id d'une entrée d'un fichier à plusieurs pages).
 *  Les tests acceptent un lien vers ces ids pendant la rédaction ; « toutes les pages existent » échoue tant qu'il en manque. */
export const PLANNED_GUIDES = [
  'schoolvakanties-2027-2028', 'schoolvakanties-2028-2029', 'herfstvakantie-2026', 'kerstvakantie-2026', 'krokusvakantie-2027',
  'paasvakantie-2027', 'zomervakantie-2027', 'vergelijker', 'ostbelgien', 'vrije-dagen-school',
  'feestdagen-2026', 'feestdagen-2027', 'feestdagen-2028', 'vervangingsdagen-2027',
  'brugdagen-2027', 'brugdagen-2028', 'werkdagen-2027', 'pasen-2027', 'kalender-2027',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, 'home', 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
