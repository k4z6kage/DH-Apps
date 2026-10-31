/**
 * fonts.js
 * Daftar nama font family yang dipakai di aplikasi.
 *
 * PENTING:
 * - "Amiri-Regular" dan "NotoNaskhArabic-Regular" adalah font Arab open-source
 *   yang harus ditaruh di src/assets/fonts/ (lihat README di folder tsb).
 * - Setelah menaruh file .ttf, jalankan `npx react-native-asset`
 *   (atau link manual di Xcode untuk iOS) agar font ter-link ke project native.
 * - Font Latin memakai font default sistem agar ringan & konsisten.
 */
export const FONTS = {
  // Font default untuk teks Latin (Indonesia/English)
  latinRegular: undefined, // undefined = pakai font sistem default
  latinBold: undefined,

  // Font khusus untuk menampilkan teks Arab / Arab Jawi
  arabicRegular: 'Amiri-Regular',
  arabicBold: 'Amiri-Bold',

  // Alternatif font Arab (opsional, bisa ditukar di sini saja)
  arabicAlt: 'NotoNaskhArabic-Regular',
};

export default FONTS;
