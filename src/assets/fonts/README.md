# Folder Font (fonts)

Taruh file font Arab open-source di sini, contoh:

- `Amiri-Regular.ttf`
- `Amiri-Bold.ttf`
- `NotoNaskhArabic-Regular.ttf`

Sumber unduhan gratis:
- Amiri: https://github.com/aliftype/amiri/releases
- Noto Naskh Arabic: https://fonts.google.com/noto/specimen/Noto+Naskh+Arabic

## Cara Link Font ke Project Native

1. Pastikan file `.ttf` sudah ada di folder ini.
2. Tambahkan konfigurasi berikut di `react-native.config.js` pada root project
   (buat file ini jika belum ada):

   ```js
   module.exports = {
     assets: ['./src/assets/fonts'],
   };
   ```

3. Jalankan perintah berikut dari root project:

   ```bash
   npx react-native-asset
   ```

   Perintah ini akan otomatis meng-copy & mendaftarkan font ke project
   Android (`android/app/src/main/assets/fonts`) dan iOS (Xcode `Info.plist`
   + copy bundle resources).

4. Rebuild aplikasi (`npx react-native run-android` / `run-ios`).

5. Nama font yang dipakai di kode (`src/constants/fonts.js`) harus SAMA PERSIS
   dengan nama internal font (bukan nama file), misalnya `Amiri-Regular`.
   Anda bisa cek nama internal font memakai Font Book (macOS) atau
   situs seperti https://fontdrop.info.
