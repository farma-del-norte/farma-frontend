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
        catalogs: require('./locales/es/catalogs.json'),
        maintenances: require('./locales/es/maintenances.json'),
        branches: require('./locales/es/branches.json'),
        users: require('./locales/es/users.json')
      }
    },
    ns: ['translations', 'catalogs', 'maintenances', 'branches', 'users'],
    defaultNS: 'translations'
  })

i18n.language = 'es'

export default i18n
