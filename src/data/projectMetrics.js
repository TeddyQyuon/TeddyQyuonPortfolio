// Headline numbers for the dashboard panels. Every value is copied from the
// `results`, `dataset` or `cardSummary` text of the same project in
// projects.js. Do not add a number here that is not stated there.
export const projectMetrics = {
  'gamevault-marketplace': [
    { label: 'Automated tests', value: '76' },
    { label: 'Catalogue products', value: '37' },
    { label: 'Subscriptions', value: '15' },
  ],
  'sole-district': [
    { label: 'Backend checks', value: '42' },
    { label: 'Database', value: 'PG 16' },
    { label: 'Sample products', value: '6' },
  ],
  'scenthaus-intelligence': [
    { label: 'Backend tests', value: '119' },
    { label: 'Browser journeys', value: '12' },
    { label: 'Fragrance houses', value: '35' },
  ],
  'meterwise-building-energy-analytics': [
    { label: 'Load MAE (kWh)', value: '0.14' },
    { label: 'Forecast horizon', value: '48', unit: 'h' },
    { label: 'HDB blocks', value: '6' },
  ],
  'gym-calories-predictive-analysis': [
    { label: 'Clean records', value: '950' },
    { label: 'Models compared', value: '4' },
    { label: 'Lower ASE vs LR', value: '70.6', unit: '%' },
  ],
};
