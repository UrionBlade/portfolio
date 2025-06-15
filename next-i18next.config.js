module.exports = {
  locales: ['it', 'en'],
  defaultLocale: 'it',
  fallbackLng: 'it',
  localeDetection: true,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  ns: ['translation'],
  defaultNS: 'translation',
};
