// Headline numbers for the dashboard panels. Every value is copied from the
// `results`, `dataset` or `cardSummary` text of the same project in
// projects.js. Do not add a number here that is not stated there.
export const projectMetrics = {
  'gamevault-marketplace': [
    { label: 'Release tests', value: '110' },
    { label: 'Catalogue products', value: '37' },
    { label: 'Subscriptions', value: '15' },
  ],
  'sole-district': [
    { label: 'Earlier backend checks', value: '42' },
    { label: 'Database', value: 'PG 16' },
    { label: 'Catalogue pieces', value: '175' },
  ],
  'scenthaus-intelligence': [
    { label: 'Earlier backend tests', value: '119' },
    { label: 'Earlier browser journeys', value: '12' },
    { label: 'Fragrance houses', value: '35' },
  ],
  'meterwise-building-energy-analytics': [
    { label: 'Release tests', value: '91' },
    { label: 'Less initial JS', value: '16.6', unit: '%' },
    { label: 'HDB blocks', value: '6' },
  ],
  'playlist-port-spotify-mover': [
    { label: 'Release tests', value: '55' },
    { label: 'Queue page size', value: '6' },
  ],
  'gym-calories-predictive-analysis': [
    { label: 'Clean records', value: '950' },
    { label: 'Models compared', value: '4' },
    { label: 'Lower ASE vs LR', value: '70.6', unit: '%' },
  ],
};
