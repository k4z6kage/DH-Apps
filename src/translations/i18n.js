/**
 * i18n.js
 * Konfigurasi react-i18next.
 * - Bahasa default: Indonesia ("id")
 * - Mendeteksi bahasa perangkat via react-native-localize sebagai fallback awal,
 *   namun pengguna tetap bisa mengganti bahasa manual kapan saja lewat
 *   LanguageSwitcher tanpa perlu restart aplikasi.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import id from './id.json';
import en from './en.json';

const resources = {
  id: { translation: id },
  en: { translation: en },
};

// Ambil bahasa perangkat, fallback ke 'id' jika tidak didukung
const supportedLanguages = Object.keys(resources);
const deviceLanguages = RNLocalize.getLocales().map(l => l.languageCode);
const bestDeviceLanguage =
  deviceLanguages.find(lng => supportedLanguages.includes(lng)) || 'id';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: bestDeviceLanguage,
  fallbackLng: 'id',
  interpolation: {
    escapeValue: false, // React sudah aman dari XSS secara default
  },
  react: {
    useSuspense: false,
  },
});

/**
 * Helper untuk mengganti bahasa aplikasi secara langsung (live),
 * dipanggil dari komponen LanguageSwitcher.
 * @param {'id'|'en'} lang
 */
export function changeLanguage(lang) {
  i18n.changeLanguage(lang);
}

export default i18n;
