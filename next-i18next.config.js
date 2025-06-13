module.exports = {
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
  },
  localePath:
    typeof window === 'undefined'
      ? require('node:path').resolve('./public/locales')
      : '/locales',
};
