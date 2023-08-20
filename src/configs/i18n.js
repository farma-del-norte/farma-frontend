import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n

  // Enables the i18next backend
  .use(Backend)

  // Enable automatic language detection
  .use(LanguageDetector)

  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    lng: 'es',
    resources: {
      es: {
        translations: require('./locales/es/translations.json'),
        catalogs: require('./locales/es/catalogs.json')
      }
    },
    ns: ['translations', 'catalogs'],
    defaultNS: 'translations'
  })

i18n.language = 'es'

export default i18n
