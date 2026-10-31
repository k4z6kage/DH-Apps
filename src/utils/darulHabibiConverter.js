/**
 * darulHabibiConverter.js
 * ------------------------------------------------------------------
 * Engine transliterasi teks Bahasa Indonesia (huruf Latin) ke
 * tulisan Arab Jawi, dibuat sepenuhnya secara lokal (tanpa API online).
 *
 * ATURAN UTAMA YANG DIPAKAI:
 * 1. Huruf konsonan gabungan (digraf) diproses lebih dulu, sebelum
 *    huruf tunggal, supaya "ng", "ny", "sy", "kh", "dz", "ts", "gh"
 *    tidak salah terpecah menjadi huruf tunggal.
 * 2. Huruf vokal "a" HANYA dituliskan sebagai alif (ا) pada
 *    kemunculan pertamanya dalam satu kata. Kemunculan "a" berikutnya
 *    dalam kata yang sama tidak dituliskan (senyap), mengikuti
 *    konvensi ejaan Jawi klasik di mana bunyi "a" adalah bacaan
 *    default sebuah huruf konsonan.
 *      contoh: "akan"       -> ا ك ن   (اكن)
 *              "makan"      -> م ا ك ن (ماكن)
 *              "nasi"       -> ن ا س ي (ناسي)
 * 3. Vokal selain "a" (i, u, e, o) selalu dituliskan menggunakan
 *    huruf mad terdekat (ي untuk i/e, و untuk u/o) karena Jawi modern
 *    umumnya menuliskan vokal-vokal ini secara eksplisit.
 * 4. Karakter yang tidak dikenali (angka, tanda baca, spasi ganda,
 *    dsb.) akan dibiarkan apa adanya agar teks tetap terbaca.
 *
 * CATATAN:
 * Ejaan Jawi baku (Ejaan Rumi-Jawi) sesungguhnya jauh lebih kompleks
 * (ada aturan pepet vs taling, hamzah, dsb). Engine ini adalah
 * pendekatan heuristik yang praktis dan cukup akurat untuk
 * penggunaan sehari-hari / edukasi, dan bisa terus disempurnakan.
 * ------------------------------------------------------------------
 */

// Konsonan gabungan (harus dicek SEBELUM huruf tunggal)
const DIGRAPHS = {
  ng: 'ڠ',
  ny: 'ڽ',
  sy: 'ش',
  kh: 'خ',
  dz: 'ذ',
  ts: 'ث',
  gh: 'غ',
};

// Konsonan tunggal
const CONSONANTS = {
  b: 'ب',
  c: 'چ',
  d: 'د',
  f: 'ف',
  g: 'ݢ',
  h: 'ه',
  j: 'ج',
  k: 'ك',
  l: 'ل',
  m: 'م',
  n: 'ن',
  p: 'ڤ',
  q: 'ق',
  r: 'ر',
  s: 'س',
  t: 'ت',
  v: 'ۏ',
  w: 'و',
  x: 'کس',
  y: 'ي',
  z: 'ز',
};

// Vokal (selain "a", yang punya aturan khusus lihat convertWord)
const VOWELS = {
  a: 'ا',
  i: 'ي',
  u: 'و',
  e: 'ي',
  o: 'و',
};

/**
 * Mengonversi satu kata (tanpa spasi) dari Latin ke Jawi.
 * @param {string} word - kata dalam huruf latin (huruf kecil)
 * @returns {string} kata dalam tulisan Jawi
 */
function convertWord(word) {
  let result = '';
  let firstAWritten = false;
  let i = 0;

  while (i < word.length) {
    // 1) Coba cocokkan digraf (2 huruf) terlebih dahulu
    const twoChars = word.substr(i, 2);
    if (DIGRAPHS[twoChars]) {
      result += DIGRAPHS[twoChars];
      i += 2;
      continue;
    }

    const ch = word[i];

    // 2) Tangani vokal
    if (VOWELS[ch]) {
      if (ch === 'a') {
        // Huruf "a" pertama dalam kata dituliskan sebagai alif,
        // kemunculan berikutnya senyap (tidak dituliskan).
        if (!firstAWritten) {
          result += VOWELS.a;
          firstAWritten = true;
        }
      } else {
        // Vokal selain "a" selalu dituliskan
        result += VOWELS[ch];
      }
      i += 1;
      continue;
    }

    // 3) Tangani konsonan tunggal
    if (CONSONANTS[ch]) {
      result += CONSONANTS[ch];
      i += 1;
      continue;
    }

    // 4) Karakter tidak dikenal (spasi, angka, tanda baca) -> biarkan
    result += ch;
    i += 1;
  }

  return result;
}

/**
 * Fungsi utama: mengonversi sebuah kalimat/teks Indonesia ke Jawi.
 * Teks dipecah per kata (berdasarkan spasi) supaya aturan "a pertama
 * per kata" berlaku dengan benar untuk setiap kata secara independen.
 *
 * @param {string} text - teks Bahasa Indonesia, contoh: "saya makan nasi"
 * @returns {string} teks dalam tulisan Arab Jawi, contoh: "ساي ماكن ناسي"
 */
export function convertToDarulHabibi(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .toLowerCase()
    .split(' ')
    .map(word => (word.length > 0 ? convertWord(word) : word))
    .join(' ');
}

export default convertToDarulHabibi;
