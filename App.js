import 'react-native-gesture-handler'; // WAJIB baris pertama untuk react-navigation
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Inisialisasi i18next - cukup di-import sekali di root agar aktif di seluruh app
import './src/translations/i18n';

import AppNavigator from './src/navigation/AppNavigator';

/**
 * App
 * Root component aplikasi.
 * - SafeAreaProvider: agar semua screen bisa memakai useSafeAreaInsets/SafeAreaView
 * - AppNavigator: berisi seluruh stack navigation (Splash, Home, Menu1, Menu2)
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
