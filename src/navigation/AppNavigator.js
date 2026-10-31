import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import Menu1Screen from '../screens/Menu1Screen';
import Menu2Screen from '../screens/Menu2Screen';
import UserScreen from '../screens/UserScreen';
import Kalam from '../screens/Kalam';
import COLORS from '../constants/colors';

const Stack = createNativeStackNavigator();

/**
 * AppNavigator
 * Mendefinisikan seluruh alur navigasi aplikasi:
 * Splash -> Home -> (Menu1 | Menu2)
 *
 * Header dibuat minimalis (putih, teks hitam) agar konsisten
 * dengan tema aplikasi. Judul header diambil dari translation
 * sehingga otomatis berubah saat bahasa diganti.
 */
export default function AppNavigator() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.text,
          headerTitleStyle: { fontWeight: '600' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu1"
          component={Menu1Screen}
          options={{ title: t('menu1.title') }}
        />
        <Stack.Screen
          name="Menu2"
          component={Menu2Screen}
          options={{ title: t('menu2.title') }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{ title: t('user.title') }}
        />
        <Stack.Screen
          name="Kalam"
          component={Kalam}
          options={{ title: 'Kalam' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
