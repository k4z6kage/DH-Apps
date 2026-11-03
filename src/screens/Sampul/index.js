import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  PanResponder,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';
import PAGES from '../../data/sampul';

const PAGE_PADDING = 24;
const SWIPE_THRESHOLD = 10; // jarak minimal (px) sebelum halaman berputar

export default function Sampul() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [flipDirection, setFlipDirection] = useState(null); // 'forward' | 'backward' | null

  const flipAnim = useRef(new Animated.Value(0)).current;
  const isFlipping = useRef(false);
  const gestureHandled = useRef(false); // agar satu usapan hanya memicu satu kali balik halaman

  // Ref halaman aktif: dipakai oleh PanResponder (yang dibuat sekali) supaya
  // tidak memakai nilai `currentPage` lama (stale closure).
  const currentPageRef = useRef(0);

  // Tombol navigasi alternatif tap
  const goToNextPage = useCallback(() => {
    if (isFlipping.current || currentPageRef.current >= PAGES.length - 1) {
      return;
    }
    isFlipping.current = true;
    setFlipDirection('forward');
    Animated.timing(flipAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      const next = Math.min(currentPageRef.current + 1, PAGES.length - 1);
      currentPageRef.current = next;
      setCurrentPage(next);
      flipAnim.setValue(0);
      setFlipDirection(null);
      isFlipping.current = false;
    });
  }, [flipAnim]);

  const goToPrevPage = useCallback(() => {
    if (isFlipping.current || currentPageRef.current <= 0) {
      return;
    }
    isFlipping.current = true;
    setFlipDirection('backward');
    flipAnim.setValue(1);
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      const prev = Math.max(currentPageRef.current - 1, 0);
      currentPageRef.current = prev;
      setCurrentPage(prev);
      flipAnim.setValue(0);
      setFlipDirection(null);
      isFlipping.current = false;
    });
  }, [flipAnim]);

  // PanResponder untuk mendeteksi swipe.
  // Arah usapan (kebalikan dari sebelumnya):
  //   - Usap dari KIRI ke KANAN (dx positif) -> halaman BERIKUTNYA
  //   - Usap dari KANAN ke KIRI (dx negatif) -> halaman SEBELUMNYA
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // Jangan ambil alih gesture saat sentuhan dimulai, supaya ScrollView
        // di dalam halaman tetap bisa di-scroll secara vertikal.
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponderCapture: (_, gestureState) =>
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderMove: (_, gestureState) => {
          if (isFlipping.current || gestureHandled.current) {
            return;
          }

          // Hanya tanggapi usapan horizontal
          if (Math.abs(gestureState.dx) <= Math.abs(gestureState.dy)) {
            return;
          }

          const dx = gestureState.dx;

          // Begitu usapan melampaui threshold, langsung jalankan animasi penuh
          if (dx >= SWIPE_THRESHOLD && currentPageRef.current < PAGES.length - 1) {
            gestureHandled.current = true;
            goToNextPage();
          } else if (dx <= -SWIPE_THRESHOLD && currentPageRef.current > 0) {
            gestureHandled.current = true;
            goToPrevPage();
          }
        },
        onPanResponderRelease: () => {
          gestureHandled.current = false;
        },
        onPanResponderTerminate: () => {
          gestureHandled.current = false;
        },
      }),
    [goToNextPage, goToPrevPage]
  );

  // Interpolasi rotasi Y-axis (3D Page Flip).
  // Poros di sisi KANAN: 0deg -> 180deg membuat sisi kiri lembar terangkat
  // ke arah pembaca lalu bergerak ke KANAN (seperti membuka buku Jawi/Arab).
  const rotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Kontrol visibilitas sisi depan dan belakang lembar halaman yang sedang berputar
  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.49, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.49, 0.5, 1],
    outputRange: [0, 0, 1, 1],
  });

  // Komponen Halaman Kertas
  const BookPage = ({ page }) => {
    const pageNumber = Number(page.pageNumber);

    // Halaman 1 & 2 tetap rata tengah seperti semula.
    const isCentered = pageNumber === 1 || pageNumber === 2;

    // Khusus halaman 3: tiap kalimat (dipisah tanda titik) ditampilkan
    // bergantian rata kanan -> kiri -> kanan -> kiri, dst.
    const isAlternating = [3,6].includes(pageNumber)
    const sentences = isAlternating
      ? page.content
          .split('.')
          .map((sentence) => sentence.trim())
          .filter(Boolean)
      : [];

    return (
      <View style={styles.pageCard}>
        {/* Isi konten halaman — bisa di-scroll jika melebihi tinggi kertas */}
        <ScrollView
          style={styles.pageScroll}
          contentContainerStyle={[
            styles.pageContent,
            isCentered && styles.pageContentCentered,
          ]}
          showsVerticalScrollIndicator
          nestedScrollEnabled
          bounces={false}
        >
          {/* Jangan render title kosong agar tidak menyisakan ruang di atas */}
          {!!page.title && (
            <Text style={styles.pageTitle}>{page.title}</Text>
          )}

          {isAlternating ? (
            <View style={styles.alternatingContainer}>
              {sentences.map((sentence, index) => {
                const alignRight = index % 2 === 0;

                return (
                  <View
                    key={`sentence-${index}`}
                    style={[
                      styles.alternatingRow,
                      {
                        alignItems: alignRight ? 'flex-end' : 'flex-start',
                        // Teks Arab itu RTL, jadi beri indentasi agar
                        // perbedaan kanan/kiri benar-benar terlihat.
                        paddingLeft: alignRight ? 36 : 0,
                        paddingRight: alignRight ? 0 : 36,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.pageText,
                        styles.alternatingSentence,
                        { textAlign: alignRight ? 'right' : 'left' },
                      ]}
                    >
                      {sentence}.
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text
              style={[styles.pageText, isCentered && styles.pageTextCenter]}
            >
              {page.content}
            </Text>
          )}
        </ScrollView>

        {/* Nomor halaman di bagian bawah */}
        <Text style={styles.pageNumber}>- {page.pageNumber} -</Text>
      </View>
    );
  };

  // Tentukan konten untuk halaman statis bawah dan halaman yang sedang berputar
  const nextPageIndex = currentPage + 1;
  const prevPageIndex = currentPage - 1;

  let staticPageContent = PAGES[currentPage];
  let flippingPageContent = null;

  if (flipDirection === 'forward' && nextPageIndex < PAGES.length) {
    staticPageContent = PAGES[nextPageIndex];
    flippingPageContent = PAGES[currentPage];
  } else if (flipDirection === 'backward' && prevPageIndex >= 0) {
    staticPageContent = PAGES[currentPage];
    flippingPageContent = PAGES[prevPageIndex];
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF6EE" />

      {/* Book Container - Full Screen */}
      <View style={styles.bookBase} {...panResponder.panHandlers}>
        {/* Halaman Statis di Bawah (Penyangga) */}
        <View style={styles.pageLayer}>
          <BookPage page={staticPageContent} />
        </View>

        {/* Halaman yang sedang Berputar (3D Page Flip) */}
        {flippingPageContent && (
          <Animated.View
            style={[
              styles.pageLayer,
              styles.flippingPage,
              {
                // Poros putaran dipaku di sisi KANAN (spine kanan).
                transformOrigin: 'right center',
                transform: [{ perspective: 1200 }, { rotateY: rotateY }],
              },
            ]}
          >
            {/* Sisi Depan Halaman (Terlihat dari 0° - 90°) */}
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: frontOpacity }]}>
              <BookPage page={flippingPageContent} />
            </Animated.View>

            {/* Sisi Belakang Halaman (Terlihat dari 90° - 180°, dibalik 180° agar teks tidak terbalik) */}
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {
                  opacity: backOpacity,
                  transform: [{ rotateY: '180deg' }],
                },
              ]}
            >
              <View style={[styles.pageCard, styles.pageBack]}>
                <View style={styles.backLinesContainer}>
                  {Array.from({ length: 15 }).map((_, i) => (
                    <View key={i} style={styles.notebookLine} />
                  ))}
                </View>
                <View style={styles.spineFoldShadow} />
              </View>
            </Animated.View>
          </Animated.View>
        )}
      </View>

      {/* Floating Bottom Bar for Info & Navigation */}
      <View style={styles.floatingControls}>
        {/* Tombol KIRI = halaman berikutnya */}
        <Pressable
          style={[
            styles.navButton,
            currentPage === PAGES.length - 1 && styles.disabledButton,
          ]}
          onPress={goToNextPage}
          disabled={currentPage === PAGES.length - 1}
        >
          <Text style={styles.navButtonText}>◀</Text>
        </Pressable>

        <View style={styles.infoPill}>
          <Text style={styles.pageNumIndicator}>
            Halaman {currentPage + 1} / {PAGES.length}
          </Text>
        </View>

        {/* Tombol KANAN = halaman sebelumnya */}
        <Pressable
          style={[styles.navButton, currentPage === 0 && styles.disabledButton]}
          onPress={goToPrevPage}
          disabled={currentPage === 0}
        >
          <Text style={styles.navButtonText}>▶</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF6EE', // Menyesuaikan warna dasar kertas
  },
  bookBase: {
    flex: 1,
    backgroundColor: '#FAF6EE',
    position: 'relative',
  },
  pageLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  flippingPage: {
    backfaceVisibility: 'hidden',
  },
  pageCard: {
    flex: 1,
    backgroundColor: '#FAF6EE', // Kertas krem hangat
    // padding: PAGE_PADDING,
    paddingTop:2,
    paddingLeft: 42, // Margin lebih besar untuk binder spine kiri
    paddingRight: 24, 
    paddingBottom: 80, // Space untuk area floating controls bawah
    justifyContent: 'space-between',
    position: 'relative',
  },
  pageBack: {
    paddingLeft: 24,
    paddingRight: 42, // margin dibalik untuk sisi belakang
  },
  linesContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 120,
    justifyContent: 'space-between',
  },
  backLinesContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 120,
    justifyContent: 'space-between',
  },
  notebookLine: {
    height: 1,
    backgroundColor: '#E6EFF7', // Garis biru notebook tulis tipis
    width: '100%',
  },
  spineFoldShadow: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 25,
    backgroundColor: 'rgba(0,0,0,0.05)', // Gradien lipatan kertas kiri
  },
  pageScroll: {
    flex: 1,
  },
  pageContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  pageContentCentered: {
    justifyContent: 'center',
  },
  pageSubtitle: {
    fontSize: 12,
    color: '#8A5E38',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    // marginBottom: 4,
    fontFamily: FONTS.latinBold,
  },
  pageTitle: {
    textAlign:'center',
    fontSize: 25,
    fontWeight: '800',
    color: '#3E2A18',
    fontFamily: FONTS.latinBold,
    marginBottom:30
  },
  pageArabic: {
    fontSize: 32,
    color: '#8A5E38', // Cokelat emas untuk kaligrafi Arab
    textAlign: 'right',
    marginBottom: 16,
    fontFamily: FONTS.arabicRegular,
    lineHeight: 44,
  },
  pageText: {
    fontSize: 26,
    color: '#4E3825',
    lineHeight: 30,
    fontFamily: FONTS.latinRegular,
  },
  pageTextCenter: {
    textAlign: 'center',
  },
  alternatingContainer: {
    width: '100%',
  },
  alternatingRow: {
    width: '100%',
    marginBottom: 24,
  },
  alternatingSentence: {
    flexShrink: 1,
  },
  pageNumber: {
    fontSize: 13,
    color: '#A08E79',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: FONTS.latinRegular,
    marginBottom: 10,
  },
  binderSpine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
  },
  floatingControls: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 150,
  },
  infoPill: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: '#E6DCC8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3E2A18',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#EADEC9',
    elevation: 0,
    shadowOpacity: 0,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pageNumIndicator: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3E2A18',
  },
});

