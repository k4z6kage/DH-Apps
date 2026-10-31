# Jawi Converter App (React Native)

Aplikasi React Native untuk mengonversi teks Bahasa Indonesia (huruf Latin)
ke tulisan Arab Jawi, dengan dukungan multi-bahasa (Indonesia/English)
dan tampilan minimalis.

## ✨ Fitur

- Splash screen (±2 detik) → Home
- Home dengan 2 menu utama (tombol besar, di tengah layar)
- Menu 1: Konversi Jawi (input → tombol Konversi → hasil)
- Menu 2: Placeholder, siap dikembangkan
- Multi-bahasa (ID/EN) via `react-i18next`, ganti bahasa langsung tanpa restart
- Engine transliterasi Jawi buatan sendiri, 100% offline
  (`src/utils/jawiConverter.js`)
- Dukungan font Arab (Amiri / Noto Naskh Arabic) untuk menampilkan hasil Jawi
- Struktur folder modular & scalable (screens, components, services, hooks,
  utils, translations, dsb.)

## 📁 Struktur Folder

```
src/
├── assets/
│   ├── images/        # logo.png dsb.
│   └── fonts/          # font Arab (Amiri, dsb.) — lihat README di dalamnya
├── components/         # komponen reusable (AppButton, LanguageSwitcher)
├── screens/             # SplashScreen, HomeScreen, Menu1, Menu2, UserScreen
├── navigation/          # AppNavigator.js (React Navigation stack)
├── translations/        # i18n.js, id.json, en.json
├── utils/                # jawiConverter.js (engine transliterasi)
├── hooks/                # useJawiConverter.js
├── data/                 # data statis konten (menu2Pages.js)
├── services/             # tempat service API di masa depan
└── constants/            # colors.js, fonts.js
App.js
index.js
```

## 🚀 Cara Menjalankan

> **PENTING:** Paket yang Anda unduh ini hanya berisi lapisan JavaScript/React
> (App.js, src/, package.json, dll). Folder native `android/` dan `ios/`
> **belum ada** dan harus di-generate di komputer Anda sendiri memakai
> React Native CLI, karena proses generate itu butuh Android Studio/Xcode
> yang tidak tersedia di lingkungan pembuatan kode ini.
> Ikuti langkah 1–3 di bawah ini untuk membuat folder native tersebut lalu
> menggabungkannya dengan source code yang sudah disiapkan.

### 1. Prasyarat
Pastikan environment React Native sudah siap
(Node.js ≥ 18, JDK, Android Studio / Xcode, dst).
Ikuti panduan resmi: https://reactnative.dev/docs/environment-setup

### 2. Generate project native (folder android/ & ios/)

Di lokasi terpisah (BUKAN di dalam folder hasil unduhan ini), jalankan:

```bash
npx @react-native-community/cli@latest init JawiConverterApp --version 0.73.6
```

Perintah ini akan membuat project baru lengkap dengan folder `android/`
dan `ios/` yang sudah siap build.

### 3. Gabungkan dengan source code dari paket ini

Dari folder hasil `init` di atas:

1. **Hapus** file/folder berikut (akan digantikan oleh isi paket ini):
   `App.js`, `App.tsx` (jika ada), `index.js`
2. **Copy semua isi** paket unduhan ini (`src/`, `App.js`, `index.js`,
   `metro.config.js`, `react-native.config.js`, `package.json`,
   `babel.config.js`, `app.json`) ke dalam folder hasil `init`,
   **timpa (overwrite)** file yang sama namanya.
   - Folder `android/` dan `ios/` hasil `init` **JANGAN dihapus/ditimpa**
     — biarkan tetap ada karena itu yang belum saya sertakan.

### 4. Install dependency

```bash
npm install
```

Untuk iOS, install juga CocoaPods:

```bash
cd ios && pod install && cd ..
```

### 5. Link font Arab (opsional tapi disarankan)

Lihat instruksi lengkap di `src/assets/fonts/README.md`.
Tanpa font ini, teks Jawi tetap tampil namun memakai fallback font sistem
(kemungkinan tidak seindah font Arab khusus).

### 6. Jalankan aplikasi

```bash
# Android
npm run android

# iOS
npm run ios
```

### 7. Start Metro bundler (jika belum otomatis jalan)

```bash
npm start
```

### ⚠️ Troubleshooting: "No Metro config found"

Error ini muncul jika `metro.config.js` tidak ada di root project, atau
Anda menjalankan `npm start`/`npm run android` dari folder yang salah.
Paket ini sudah menyertakan `metro.config.js` — pastikan file tersebut
ikut ter-copy ke root project hasil `init` pada langkah 3, dan pastikan
Anda menjalankan perintah dari root folder project (yang berisi
`package.json`, bukan dari dalam `src/`).

## 🔤 Contoh Penggunaan Engine Konversi

```js
import { convertToJawi } from './src/utils/jawiConverter';

convertToJawi('akan');            // -> اكن
convertToJawi('makan nasi');      // -> ماكن ناسي
convertToJawi('saya makan nasi'); // -> ساي ماكن ناسي
```

Aturan lengkap & penjelasan logic ada sebagai komentar di dalam file
`src/utils/jawiConverter.js`.

## 🌐 Menambah Bahasa Baru

1. Buat file baru di `src/translations/`, misal `ms.json` (Bahasa Melayu).
2. Import & daftarkan di `src/translations/i18n.js` pada objek `resources`.
3. Tambahkan opsi bahasa baru di `src/components/LanguageSwitcher/index.js`.

## 🧩 Menambah Menu/Fitur Baru

1. Buat folder baru di `src/screens/`, misal `Menu3Screen/index.js`.
2. Daftarkan screen tersebut di `src/navigation/AppNavigator.js`.
3. Tambahkan tombol navigasi baru di `HomeScreen` (atau tempat lain sesuai
   kebutuhan) memakai komponen `AppButton` yang sudah reusable.
4. Tambahkan teks/label baru ke `id.json` & `en.json` agar tetap mendukung
   multi-bahasa.

## 📦 Library Utama

| Library | Kegunaan |
|---|---|
| @react-navigation/native + native-stack | Navigasi antar screen |
| react-i18next / i18next | Multi-bahasa |
| react-native-localize | Deteksi bahasa perangkat |
| react-native-safe-area-context | Aman terhadap notch/safe area |
| react-native-screens | Optimasi native-stack |
| react-native-gesture-handler | Dibutuhkan oleh react-navigation |
| react-native-vector-icons | Ikon (siap dipakai untuk fitur berikutnya) |

## 📝 Catatan Engine Jawi

Ejaan Jawi baku memiliki banyak aturan kompleks (pepet vs taling, hamzah,
kata serapan Arab, dll). Engine di aplikasi ini memakai pendekatan heuristik
sederhana namun konsisten dengan contoh-contoh standar (lihat bagian
"Contoh Penggunaan Engine" di atas), dan didesain agar mudah disempurnakan
lebih lanjut di `src/utils/jawiConverter.js`.
