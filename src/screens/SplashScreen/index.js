import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';
import COLORS from '../../constants/colors';

const SPLASH_DURATION_MS = 3000;

/**
 * SplashScreen
 * Ditampilkan pertama kali saat aplikasi dibuka.
 * - Background putih
 * - Logo di tengah, nama aplikasi di bawah logo
 * - Setelah ±2 detik, otomatis pindah ke HomeScreen (replace, agar
 *   pengguna tidak bisa "back" ke splash screen).
 */
export default function SplashScreen({ navigation }) {
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      {/*
        Ganti source di bawah dengan logo asli aplikasi.
        Taruh file logo di: src/assets/images/logo.png
      */}
      <Image
        source={require('../../assets/images/dh.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>{t('appName')}</Text>
      <Text style={styles.tagline}>{t('splash.tagline')}</Text>
    </View>
      <Text style={styles.version}>V0.0.1</Text>
      <Text style={styles.developBy}>Developed By | DH DEV</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  tagline: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
   version: {
    marginTop: 40,
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    fontWeight:'bold'
  },
   developBy: {
    marginTop: 10,
    paddingBottom:30,
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    fontStyle:'normal',
    fontWeight:'bold'
  },
});
