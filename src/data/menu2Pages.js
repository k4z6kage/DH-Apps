/**
 * menu2Pages.js
 * ------------------------------------------------------------------
 * Data statis konten buku edukasi Jawi (Menu 2).
 *
 * Dipisahkan dari komponen screen supaya file screen hanya berisi
 * logika tampilan/navigasi, dan data konten mudah diubah, ditambah,
 * atau dipindah ke sumber lain (misal API/JSON) di masa depan.
 *
 * Bentuk tiap item:
 * - pageNumber: number  -> nomor halaman yang ditampilkan
 * - title: string       -> judul halaman
 * - arabic: string      -> teks Arab/Jawi pendek (opsional, boleh null)
 * - content: string     -> isi/penjelasan dalam huruf Latin
 * ------------------------------------------------------------------
 */

export const PAGES = [
  {
    pageNumber: 1,
    title: 'Aksara Jawi',
    arabic: 'ابجد جاوي',
    content:
      'Aksara Jawi (أكسارا جاوي) adalah abjad Arab yang disesuaikan untuk menuliskan Bahasa Melayu dan Bahasa Indonesia. Aksara ini telah digunakan luas sejak abad ke-14 Masehi di Nusantara.',
  },
  {
    pageNumber: 2,
    title: 'Sejarah Singkat',
    arabic: 'سجاره ملايو',
    content:
      'Sebelum huruf Latin digunakan secara resmi, abjad Jawi adalah media utama penulisan naskah sastra, hukum adat, surat diplomatik kerajaan, hingga teks keagamaan di daerah Riau, Malaysia, Brunei, dan sekitarnya.',
  },
  {
    pageNumber: 3,
    title: 'Huruf Kustom',
    arabic: 'حروف ملايو',
    content:
      'Aksara Jawi memiliki 6 huruf tambahan kustom untuk melambangkan fonem asli Melayu yang tidak ada di bahasa Arab standar: Nga (ڠ), Pa (ڤ), Ga (ݢ), Nya (ڽ), Ca (چ), dan Va (ۏ).',
  },
  {
    pageNumber: 4,
    title: 'Mari Lestarikan',
    arabic: 'لستاريکن بودايا',
    content:
      'Melalui aplikasi Jawi Converter ini, kami berupaya melestarikan warisan budaya berharga ini agar dapat dipelajari dengan mudah secara gratis, offline, dan modern di era digital.',
  },
];

export default PAGES;
