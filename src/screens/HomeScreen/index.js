import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AppButton from '../../components/AppButton';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import FloatingTabButton from '../../components/FloatingTabButton';
import COLORS from '../../constants/colors';
import Donate from '../../components/Donate';

// --- Background ---------------------------------------------------------
const BG_SOURCE = require('../../assets/images/tgh.jpeg');

// Skala gambar latar. 1 = normal, 0.9 = lebih kecil, 1.1 = lebih besar.
const BG_SCALE = 1;

// Blur dimulai dari TENGAH layar (0.5) lalu makin tebal ke bawah.
const BLUR_START = 0.5;

// Lebar area peralihan agar blur "masuk" pelan-pelan (tidak ada garis keras).
const BLUR_FEATHER = 0.18;

// Jumlah lapisan peralihan blur. Makin banyak makin halus, tapi makin berat.
const BLUR_STEPS = 6;

// Kekuatan blur (px).
const BLUR_RADIUS = 24;

// Jumlah lapisan gradien putih dari bawah ke atas.
const FADE_STEPS = 32;

/**
 * BlurBand
 * Satu potongan horizontal dari gambar yang di-blur. Posisi gambar di
 * dalamnya dihitung (start/end dalam skala 0..1 tinggi layar) supaya selalu
 * sejajar dengan gambar latar di belakangnya.
 */
function BlurBand({ start, end, opacity = 1 }) {
  const bandHeight = end - start;
  if (bandHeight <= 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.blurBand,
        { top: `${start * 100}%`, height: `${bandHeight * 100}%` },
      ]}
    >
      <Image
        source={BG_SOURCE}
        resizeMode="cover"
        blurRadius={BLUR_RADIUS}
        style={[
          styles.blurBandImage,
          {
            // Geser + regangkan gambar agar potongan ini sama persis dengan
            // gambar asli pada posisi yang sama.
            top: `${-(start / bandHeight) * 100}%`,
            height: `${(1 / bandHeight) * 100}%`,
            opacity,
          },
        ]}
      />
    </View>
  );
}

/**
 * BackgroundBlurGradient
 * Blur bertahap: transparan di TENGAH layar, makin pekat ke BAWAH.
 */
function BackgroundBlurGradient() {
  const featherEnd = Math.min(BLUR_START + BLUR_FEATHER, 1);
  const stepSize = (featherEnd - BLUR_START) / BLUR_STEPS;

  return (
    <View style={[styles.blurLayer, { transform: [{ scale: BG_SCALE }] }]}>
      {/* Bagian peralihan: opacity naik dari 0 ke 1 */}
      {Array.from({ length: BLUR_STEPS }).map((_, i) => (
        <BlurBand
          key={`blur-step-${i}`}
          start={BLUR_START + i * stepSize}
          end={BLUR_START + (i + 1) * stepSize}
          opacity={(i + 1) / BLUR_STEPS}
        />
      ))}

      {/* Bagian bawah: blur penuh sampai dasar layar */}
      <BlurBand start={featherEnd} end={1} opacity={1} />
    </View>
  );
}

/**
 * HomeScreen
 * Background image + blur bertahap dari bawah ke tengah layar,
 * tombol menu bergaya outline (latar transparan, teks hitam),
 * serta bottom menu melayang (Home & User).
 */
export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={BG_SOURCE}
      style={styles.background}
      imageStyle={{ transform: [{ scale: BG_SCALE }] }}
      resizeMode="cover"
    >
      {/* Overlay blur + fade. pointerEvents none supaya tombol tetap bisa
          ditekan. */}
      <View style={styles.bgOverlay} pointerEvents="none">
        <BackgroundBlurGradient />

        {/* Gradien putih dari bawah ke atas agar ujung blur melebur ke
            warna latar halaman tanpa garis batas. */}
        <View style={styles.bgFade}>
          {Array.from({ length: FADE_STEPS }).map((_, i) => {
            const progress = (i + 1) / FADE_STEPS; // 0 (atas) -> 1 (bawah)
            return (
              <View
                key={`fade-${i}`}
                style={[
                  styles.fadeStep,
                  {
                    backgroundColor: COLORS.background,
                    opacity: 0.1 + Math.pow(progress, 2.1) * 0.85,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        {/* Pemilih bahasa diletakkan di atas agar tidak mengganggu titik tengah layar */}
        <View style={styles.topBar}>
          <LanguageSwitcher />
        </View>

        {/* Konten utama: benar-benar di tengah layar */}
        <View style={styles.center}>
          <AppButton
            label={t('home.kalam')}
            onPress={() => navigation.navigate('Menu2')}
            variant="ghost"
          />
          <AppButton
            label={t('home.alBarzanji')}
            onPress={() => navigation.navigate('Menu2')}
            variant="ghost"
          />
          {/* <AppButton
            label={t('home.menu1')}
            onPress={() => navigation.navigate('Menu1')}
            variant="ghost"
          /> */}
        </View>

        {/* Bottom menu melayang: satu bar berisi 2 item (Home & User) */}
        <View
          style={[styles.floatingBarWrapper, { paddingBottom: insets.bottom + 12 }]}
          pointerEvents="box-none"
        >
          <View style={styles.floatingBar}>
            <FloatingTabButton
              label={t('home.tabs.home')}
              active
              onPress={() => {}}
            />
            <FloatingTabButton
              label={t('home.tabs.about')}
              onPress={() => navigation.navigate('User')}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  blurLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  blurBand: {
    position: 'absolute',
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  blurBandImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
  },
  bgFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: `${BLUR_START * 100}%`,
    bottom: 0,
  },
  fadeStep: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topBar: {
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  floatingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // jarak antar item di dalam satu bar
    padding: 6,
    borderRadius: 999,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    // Shadow (iOS)
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    // Shadow (Android)
    elevation: 8,
  },
});
