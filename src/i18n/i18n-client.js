import i18n from 'i18next';

i18n
  .init({
    whitelist: ['en', 'ru'],
    fallbackLng: 'en',
    debug: false,

    ns: ['common'],
    defaultNS: 'common',

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
