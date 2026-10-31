# Folder Services

Folder ini disiapkan untuk logic pemanggilan data eksternal di masa depan,
misalnya:

- Konfigurasi API client (contoh: `api.js` berisi instance `fetch`/`axios`)
- Layanan penyimpanan lokal (contoh: `storage.js` untuk AsyncStorage)
- Integrasi pihak ketiga lainnya

Saat ini aplikasi belum membutuhkan service apa pun karena:
- Tidak ada sistem login/registrasi
- Engine konversi Jawi berjalan 100% offline (lihat `src/utils/jawiConverter.js`)

Contoh pola penulisan service ke depannya:

```js
// src/services/exampleService.js
export async function fetchSomething() {
  const response = await fetch('https://api.example.com/data');
  return response.json();
}
```
