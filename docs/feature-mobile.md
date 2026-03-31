# 📱 Dokumentasi Fitur Mobile — CAKLI 1.0

> **Tanggal:** 26 Maret 2026  
> **Platform:** Flutter (Dart) — Android & iOS  
> **State Management:** GetX (GetView + GetxController)  
> **Map Engine:** flutter_map + OpenStreetMap  
> **Arsitektur:** Modular (modules → bindings / controllers / views)

---

## Daftar Isi

- [A. Aplikasi User (cakli)](#a-aplikasi-user-cakli)
  - [1. Splash Screen](#1-splash-screen)
  - [2. Home](#2-home)
  - [3. Set Lokasi Jemput](#3-set-lokasi-jemput)
  - [4. Pesan Alamat (Konfirmasi Lokasi)](#4-pesan-alamat-konfirmasi-lokasi)
  - [5. Pesan (Order Ride)](#5-pesan-order-ride)
  - [6. Pesan Driver (Tracking Perjalanan)](#6-pesan-driver-tracking-perjalanan)
  - [7. Chat (User ↔ Driver)](#7-chat-user--driver)
  - [8. Rating & Ulasan](#8-rating--ulasan)
  - [9. Voucher](#9-voucher)
  - [10. Aktivitas (Riwayat Perjalanan)](#10-aktivitas-riwayat-perjalanan)
  - [11. Setting (Pengaturan Akun)](#11-setting-pengaturan-akun)
  - [12. Edit Profile](#12-edit-profile)
  - [13. Edit Email](#13-edit-email)
  - [14. Edit PIN E-Wallet](#14-edit-pin-e-wallet)
  - [15. Alamat Tersimpan](#15-alamat-tersimpan)
  - [16. Tambah Alamat](#16-tambah-alamat)
  - [17. Cari Alamat](#17-cari-alamat)
  - [18. Map Test](#18-map-test)
- [B. Aplikasi Driver (cakli_driver)](#b-aplikasi-driver-cakli_driver)
  - [1. Splash Screen](#1-splash-screen-1)
  - [2. Home (Beranda Driver)](#2-home-beranda-driver)
  - [3. Terima Order (Jemput Penumpang)](#3-terima-order-jemput-penumpang)
  - [4. Antar Order (Pengantaran)](#4-antar-order-pengantaran)
  - [5. Pendapatan](#5-pendapatan)
  - [6. Profil Driver](#6-profil-driver)
  - [7. Pengaturan Driver](#7-pengaturan-driver)
  - [8. Riwayat Trip](#8-riwayat-trip)
  - [9. Chat (Driver ↔ User)](#9-chat-driver--user)
  - [10. Daftar Pesan (List Chat)](#10-daftar-pesan-list-chat)
- [C. Ringkasan Perbandingan Fitur](#c-ringkasan-perbandingan-fitur)

---

## A. Aplikasi User (cakli)

Folder: `CAKLI1.0/cakli/`  
Total module: **18 module**  
Route awal: `/splashscreen` → auto redirect ke `/home`

---

### 1. Splash Screen

| Item | Detail |
|------|--------|
| **Module** | `splashscreen` |
| **Route** | `/splashscreen` (initial route) |
| **File View** | `splashscreen_view.dart` |
| **File Controller** | `splashscreen_controller.dart` |

**Deskripsi:**  
Halaman pembuka aplikasi dengan animasi fade-in/out logo CAKLI. Menampilkan transisi warna background dari putih ke oranye beserta pergantian logo. Setelah 5 detik, otomatis redirect ke halaman Home.

**Detail Fitur:**
- Animasi `AnimatedContainer` untuk transisi warna background (`putih → oranye`)
- Animasi `AnimatedOpacity` untuk efek fade pada logo
- Pergantian asset logo: `logo.png` → `logo-orange.png`
- Auto-navigate ke `/home` setelah delay 5 detik

---

### 2. Home

| Item | Detail |
|------|--------|
| **Module** | `home` |
| **Route** | `/home` |
| **File View** | `home_view.dart` |
| **File Controller** | `home_controller.dart` |

**Deskripsi:**  
Halaman utama user yang menampilkan peta interaktif, search bar untuk mencari lokasi tujuan, quick-action buttons, dan daftar riwayat lokasi. Header menampilkan ilustrasi dengan greeting personalized.

**Detail Fitur:**
- **Header Ilustrasi** — Gambar fullwidth dengan greeting user ("Mau ke mana, Aul?") dan alamat saat ini
- **Tombol Profil** — Ikon user di pojok kanan atas, navigasi ke halaman Setting
- **Peta Interaktif** — Widget `FlutterMap` embedded dalam container overlap, menampilkan peta OpenStreetMap berdasarkan koordinat user
- **Search Bar** — Pill-shaped search field "Cari lokasi tujuan", tap navigasi ke halaman Set Lokasi (`/setlokasi`)
- **Quick Action Buttons:**
  - `Simpan Rumah` — Menyimpan lokasi rumah (snackbar feedback)
  - `Simpan Kantor` — Menyimpan lokasi kantor (snackbar feedback)
- **Riwayat Lokasi** — ListView reaktif (Obx) menampilkan daftar lokasi yang pernah dikunjungi (title + subtitle + ikon)
- **Pencarian Lokasi (Controller):**
  - Integrasi API Nominatim (OpenStreetMap) untuk geocoding
  - Filter hasil pencarian khusus Indonesia (`countrycodes: 'id'`)
  - Fungsi `selectPlace()` untuk memilih lokasi dari hasil pencarian

---

### 3. Set Lokasi Jemput

| Item | Detail |
|------|--------|
| **Module** | `setlokasi` |
| **Route** | `/setlokasi` |
| **File View** | `setlokasi_view.dart` |

**Deskripsi:**  
Halaman untuk menentukan titik jemput dan tujuan. Menampilkan route card (pickup → destination), opsi pemilihan lokasi, dan daftar lokasi rekomendasi.

**Detail Fitur:**
- **Route Location Card** — Komponen visual menampilkan:
  - Titik jemput (ikon oranye + arrow up)
  - Garis penghubung
  - Titik tujuan (ikon biru)
  - Teks pickup & destination
- **Tombol Navigasi:**
  - `Pilih lewat peta` — Memilih lokasi melalui peta interaktif
  - `Lokasimu sekarang` — Menggunakan lokasi GPS saat ini
- **Daftar Lokasi Rekomendasi:**
  - **LocationHeader** — Lokasi utama (nama + alamat lengkap), highlight warna oranye jika relevan
  - **LocationOption** — Sub-lokasi (contoh: "Gerbang Sekolah", "Gerbang Samping") dengan keterangan seperti "Kamu pernah di sini" atau "Paling dekat"
  - Ikon bookmark untuk menyimpan lokasi
- Tap pada lokasi → navigasi ke `/pesanalamat`

---

### 4. Pesan Alamat (Konfirmasi Lokasi)

| Item | Detail |
|------|--------|
| **Module** | `pesanalamat` |
| **Route** | `/pesanalamat` |
| **File View** | `pesanalamat_view.dart` |

**Deskripsi:**  
Halaman konfirmasi lokasi jemput dengan peta fullscreen dan panel detail lokasi di bagian bawah.

**Detail Fitur:**
- **Peta Fullscreen** — FlutterMap sebagai background dengan tile OpenStreetMap
- **Route Location Card** — Menampilkan pickup & destination di bagian atas
- **Bottom Panel (Detail Lokasi):**
  - Label "Your Current Location"
  - Nama lokasi (bold): "SMK NEGERI 4 MALANG"
  - Alamat lengkap: "Jl. Tanimbar No.22, Kasin, Kec. Klojen, Malang, Jawa Timur 65117"
- **Tombol "Selanjutnya"** — Pill button oranye, navigasi ke halaman Pesan (`/pesan`)

---

### 5. Pesan (Order Ride)

| Item | Detail |
|------|--------|
| **Module** | `pesan` |
| **Route** | `/pesan` |
| **File View** | `pesan_view.dart` |

**Deskripsi:**  
Halaman pemesanan becak dengan peta, route card, pemilihan metode pembayaran, penggunaan voucher, dan tombol cari driver.

**Detail Fitur:**
- **Peta Fullscreen** — Background FlutterMap
- **Route Location Card** — Pickup & destination di atas peta
- **Bottom Action Bar:**
  - **CaPay Button** — Memilih metode pembayaran e-wallet, membuka bottom sheet metode pembayaran
  - **Voucher Button** — Navigasi ke halaman Voucher (`/voucher`)
  - **Tombol "Cari driver"** — Pill button oranye menampilkan estimasi harga (Rp10.000), navigasi ke `/pesandriver`
- **Modal Metode Pembayaran (DraggableScrollableSheet):**
  - `CaPay` — E-Wallet (saldo: Rp 50.000)
  - `Cash` — Uang Tunai
  - `QRIS` — Scan QR pada driver
  - Custom radio button animasi untuk seleksi
  - Handle drag indicator di atas modal

---

### 6. Pesan Driver (Tracking Perjalanan)

| Item | Detail |
|------|--------|
| **Module** | `pesandriver` |
| **Route** | `/pesandriver` |
| **File View** | `pesandriver_view.dart` |

**Deskripsi:**  
Halaman tracking perjalanan real-time setelah driver ditemukan. Menampilkan informasi driver, estimasi kedatangan, detail rute, dan opsi komunikasi.

**Detail Fitur:**
- **Peta Fullscreen** — Background map untuk tracking
- **Draggable Sheet (expandable):**
  - **Header Info:**
    - "Pengemudi dalam perjalanan"
    - Estimasi kedatangan: "10 menit"
  - **Card Driver:**
    - Foto profil driver + ikon kendaraan (becak)
    - Nama driver: "Alenxander Fabio"
    - Rating bintang: ⭐ 5.0
    - Nama kendaraan: "Becak Honda A70s"
    - Plat nomor: "N 1234 SYBAU" (green dot = online)
  - **Tombol Komunikasi:**
    - 💬 Chat — Navigasi ke `/chat`
    - 📞 Call — Tombol panggilan
  - **Detail Rute:**
    - Pickup: "SMK Negeri 4 Malang"
    - Destination: "Rujak Cingur Penyet"
    - Ikon timeline (orange dot → blue dot)
  - **Info Pembayaran:**
    - Metode: Tunai
    - Total: Rp. 12.000
- **Tombol "Batalkan Pesanan"** — Membatalkan order aktif

---

### 7. Chat (User ↔ Driver)

| Item | Detail |
|------|--------|
| **Module** | `chat` |
| **Route** | `/chat` |
| **File View** | `chat_view.dart` |

**Deskripsi:**  
Halaman chat real-time antara user dan driver yang sedang menjemput/mengantar.

**Detail Fitur:**
- **AppBar Info Driver:**
  - Foto profil driver (CircleAvatar)
  - Nama driver: "Febrian"
  - Plat nomor: "N 1234 SYBAU"
  - Status kendaraan: 🟢 "Becak Honda A70s"
- **Chat Bubble:**
  - Bubble putih dengan border oranye
  - Alignment kiri (driver) / kanan (user)
  - Timestamp di setiap bubble ("13.00")
- **Input Area:**
  - Tombol attachment (+)
  - TextField "Ketik Disini" dengan rounded border
  - Tombol kirim (orange send icon)

---

### 8. Rating & Ulasan

| Item | Detail |
|------|--------|
| **Module** | `rating` |
| **Route** | `/rating` |
| **File View** | `rating_view.dart` |

**Deskripsi:**  
Halaman pemberian rating dan ulasan setelah perjalanan selesai. Menampilkan rangkuman transaksi dan form review.

**Detail Fitur:**
- **AppBar Rangkuman Transaksi:**
  - Kiri: "Rangkuman Transaksi" + "Anda sudah sampai!"
  - Kanan: "Sampai Pada" + "25 June 2026, 06:07 AM"
- **Profil Driver:**
  - Foto profil circular
  - Nama: "Sucipto Putra"
  - Rating existing: ⭐⭐⭐⭐⭐ (5 bintang)
- **Rating Bar (interactive):**
  - `RatingBar.builder` — Interaktif, 1-5 bintang
  - Mendukung half-rating (setengah bintang)
- **Form Ulasan:**
  - Pertanyaan: "Apa Yang Buat Kamu Terkesan?"
  - TextField "Ketik Disini" untuk komentar
- **Info Total Biaya:**
  - Total: 2000 (dengan ikon uang)
- **Tombol "Kirim"** — Submit rating, navigasi kembali ke Home

---

### 9. Voucher

| Item | Detail |
|------|--------|
| **Module** | `voucher` |
| **Route** | `/voucher` |
| **File View** | `voucher_view.dart` |

**Deskripsi:**  
Halaman daftar voucher diskon yang tersedia dan bisa digunakan saat pemesanan.

**Detail Fitur:**
- **AppBar Oranye** — Judul "Voucher" dengan background oranye
- **Input Kode Voucher:**
  - TextField "Masukkan Kode Voucher" di bawah AppBar
  - Real-time binding ke controller
- **Daftar Voucher (ListView):**
  - **VoucherCard** per item:
    - Thumbnail logo CAKLI (warna / grayscale berdasarkan status aktif)
    - Label "Diskon Hingga" + nominal diskon (bold, large font)
    - Periode penggunaan dengan ikon jam
    - Menu detail (ikon titik tiga)
  - Perbedaan visual aktif vs tidak aktif (warna teks dan logo)
- **Dialog Detail Voucher:**
  - Informasi: Diskon Hingga, Periode, Status (Aktif / Tidak Aktif)
  - Syarat & Ketentuan
  - Tombol "Tutup"

---

### 10. Aktivitas (Riwayat Perjalanan)

| Item | Detail |
|------|--------|
| **Module** | `aktivitas` |
| **Route** | `/aktivitas` |
| **File View** | `aktivitas_view.dart` |

**Deskripsi:**  
Halaman riwayat aktivitas perjalanan user dengan sistem tab untuk kategori status.

**Detail Fitur:**
- **TabBar (4 tab):**
  - `Riwayat` — Daftar perjalanan yang sudah selesai
  - `Dalam proses` — Perjalanan yang sedang berjalan (placeholder)
  - `Terjadwal` — Perjalanan yang dijadwalkan (placeholder)
  - `Draf` — Pesanan draft (placeholder)
- **RiwayatCard (per perjalanan):**
  - Thumbnail ikon becak (oranye background)
  - Nama lokasi tujuan (contoh: "SMKN 4 Malang")
  - Harga: "Rp. 16.000"
  - Tanggal: "2 Jan, 10:47"
  - Status:
    - ✅ "Perjalanan selesai" (hijau)
    - ❌ "Perjalanan dibatalkan" (merah)
  - **Action Button (jika selesai):**
    - `Ulasan` → Navigasi ke `/rating` (jika belum beri rating)
    - `Mau Lagi` → Navigasi ke `/setlokasi` (pesan ulang)

---

### 11. Setting (Pengaturan Akun)

| Item | Detail |
|------|--------|
| **Module** | `setting` |
| **Route** | `/setting` |
| **File View** | `setting_view.dart` |

**Deskripsi:**  
Halaman pengaturan akun user dengan informasi profil dan menu pengaturan.

**Detail Fitur:**
- **Header Ilustrasi** — Gambar banner atas
- **Profile Card:**
  - Foto profil
  - Nama: "Aulia Sukma"
  - Email: "auliasr.edu@gmail.com"
  - Nomor telepon: "0821345678"
  - Tombol Edit → navigasi ke `/editprofile`
- **Menu Pengaturan:**
  - 🛡️ `Ganti Email` → `/editemail`
  - 💳 `Ganti PIN E-Wallet` → `/editpin`
  - 🔖 `Alamat Tersimpan` → `/editalamat`
  - 🕐 `Riwayat` → `/aktivitas`
  - ⭐ `Beri Rating` (belum terimplementasi)
  - ⚙️ `MAPTEST` → `/maptest` (halaman test peta)
- **Menu Danger Zone (border merah):**
  - 🚪 `Keluar` — Logout (belum terimplementasi)
  - 🗑️ `Hapus Akun` — Hapus akun permanen (belum terimplementasi)

---

### 12. Edit Profile

| Item | Detail |
|------|--------|
| **Module** | `editprofile` |
| **Route** | `/editprofile` |
| **File View** | `editprofile_view.dart` |

**Deskripsi:**  
Form untuk mengedit data profil user.

**Detail Fitur:**
- **Foto Profil:**
  - CircleAvatar dengan foto profil
  - Tap foto → Dialog fullscreen preview foto
  - Tombol "Edit Foto" (text button)
- **Form Fields:**
  - `Nama` * — TextFormField (default: "Ustadzah")
  - `Nomor Telepon` * — TextFormField (default: "08123456567")
  - `Email` * — TextFormField (default: "mimimimimi@gmail.com")
  - Semua field menggunakan FloatingLabel + UnderlineInputBorder
- **Tombol "Simpan"** — Pill button oranye, navigasi kembali ke Setting

---

### 13. Edit Email

| Item | Detail |
|------|--------|
| **Module** | `editemail` |
| **Route** | `/editemail` |
| **File View** | `editemail_view.dart` |

**Deskripsi:**  
Form untuk mengubah email akun dengan verifikasi.

**Detail Fitur:**
- **Ikon Ilustrasi** — Gambar ikon email (200x200)
- **Form Fields:**
  - `Email` * — Email baru
  - `Masukkan Email Kembali` * — Konfirmasi email
- **Tombol "Verifikasi"** — Pill button oranye, navigasi kembali ke Setting

---

### 14. Edit PIN E-Wallet

| Item | Detail |
|------|--------|
| **Module** | `editpin` |
| **Route** | `/editpin` |
| **File View** | `editpin_view.dart` |

**Deskripsi:**  
Form untuk mengganti PIN 6 digit E-Wallet (CaPay).

**Detail Fitur:**
- **Ikon Ilustrasi** — Gambar ikon PIN
- **Label** — "Masukkan 6 digit PIN baru"
- **PIN Input (Custom):**
  - 6 circle indicator (filled = hitam, empty = transparent)
  - Hidden TextField di belakang untuk input keyboard
  - Auto-focus keyboard numerik
  - Max length 6 digit
- **Link "Lupa PIN"** — Teks oranye (belum terimplementasi)
- **Tombol "Selanjutnya"** — Navigasi kembali ke Setting

---

### 15. Alamat Tersimpan

| Item | Detail |
|------|--------|
| **Module** | `editalamat` |
| **Route** | `/editalamat` |
| **File View** | `editalamat_view.dart` |

**Deskripsi:**  
Halaman daftar alamat yang tersimpan oleh user.

**Detail Fitur:**
- **Daftar Alamat Card:**
  - Header oranye dengan nama lokasi (contoh: "SMKN 4 MALANG")
  - Ikon bookmark + more options (titik tiga)
  - Body putih dengan alamat lengkap
- **Tombol "Tambah Alamat Baru"** — Fixed bottom button, navigasi ke `/tambahalamat`

---

### 16. Tambah Alamat

| Item | Detail |
|------|--------|
| **Module** | `tambahalamat` |
| **Route** | `/tambahalamat` |
| **File View** | `tambahalamat_view.dart` |

**Deskripsi:**  
Halaman untuk menambahkan alamat baru dengan peta dan form detail.

**Detail Fitur:**
- **Peta Background** — FlutterMap setengah layar atas
- **Bottom Panel (putih, rounded top):**
  - Judul: "Tambah Alamat"
  - **Search Bar** — "Cari lokasi tujuan", navigasi ke `/carialamat`
  - **Detail Lokasi Card:**
    - Ikon pin lokasi oranye
    - Nama: "SMKN 4 Malang"
    - Alamat lengkap
  - **Field "Tambah Patokan"** — TextField dengan ikon landmark
  - **Field "Email"** — TextFormField tambahan
- **Tombol "Simpan"** — Menyimpan alamat, kembali ke daftar alamat
- **Tombol Back** — Floating circular back button di atas peta

---

### 17. Cari Alamat

| Item | Detail |
|------|--------|
| **Module** | `carialamat` |
| **Route** | `/carialamat` |
| **File View** | `carialamat_view.dart` |

**Deskripsi:**  
Halaman pencarian alamat dengan search field dan opsi pemilihan lokasi.

**Detail Fitur:**
- **Search Field:**
  - Ikon pin oranye (prefix)
  - Ikon search (suffix)
  - Hint: "Cari lokasi tujuan"
  - Rounded white container
- **Tombol Opsi Lokasi:**
  - 🗺️ `Pilih lewat peta` — Pemilihan manual melalui peta
  - 📍 `Lokasimu sekarang` — Otomatis deteksi lokasi saat ini
- **Divider** — Pemisah fullwidth sebelum hasil pencarian

---

### 18. Map Test

| Item | Detail |
|------|--------|
| **Module** | `maptest` |
| **Route** | `/maptest` |
| **File View** | `maptest_view.dart` |

**Deskripsi:**  
Halaman test/debug untuk FlutterMap. Menampilkan peta fullscreen OpenStreetMap.

**Detail Fitur:**
- FlutterMap fullscreen (default: London coordinates)
- OpenStreetMap attribution widget
- Digunakan untuk development/testing peta

---

## B. Aplikasi Driver (cakli_driver)

Folder: `CAKLI1.0/cakli_driver/`  
Total module: **10 module**  
Route awal: `/splashscreen` → auto redirect ke `/home`

---

### 1. Splash Screen

| Item | Detail |
|------|--------|
| **Module** | `splashscreen` |
| **Route** | `/splashscreen` (initial route) |
| **File View** | `splashscreen_view.dart` |
| **File Controller** | `splashscreen_controller.dart` |

**Deskripsi:**  
Identik dengan splash screen user. Animasi fade logo CAKLI dengan transisi warna background. Auto-navigate ke Home driver.

**Detail Fitur:**
- Animasi `AnimatedContainer` (putih → oranye)
- Animasi `AnimatedOpacity` fade logo
- Pergantian logo: `logo.png` → `logo-orange.png`
- Auto-navigate ke `/home` setelah animasi selesai

---

### 2. Home (Beranda Driver)

| Item | Detail |
|------|--------|
| **Module** | `home` |
| **Route** | `/home` |
| **File View** | `home_view.dart` |
| **File Controller** | `home_controller.dart` |

**Deskripsi:**  
Halaman utama driver menampilkan peta fullscreen, status online/offline, statistik harian, dan navigasi bawah.

**Detail Fitur:**
- **Peta Fullscreen** — FlutterMap sebagai background utama
- **Header:**
  - **Avatar Profil** — CircleAvatar dengan border oranye, tap → navigasi ke `/profil`
  - **Status Pill** — Badge "Offline" / "Online" (rounded container putih)
  - **Tombol Power** — Circular hitam, membuka Status Modal
- **Status Modal (Dialog):**
  - Status Online/Offline toggle
  - **Poin Hari Ini:**
    - Ikon medali + skor poin (contoh: 750)
    - Keterangan: "5 dari 5 trip selesai"
  - **Statistik:**
    - `Penerimaan bid` — Persentase (contoh: 100%)
    - `Penyelesaian trip` — Persentase (contoh: 100%)
  - **Toggle Autobid:**
    - Switch on/off untuk auto-accept order
  - Tombol close (circular putih) di bawah modal
- **Bottom Navigation Bar:**
  - 🏠 `Beranda` (aktif) → `/home`
  - 💰 `Pendapatan` → `/pendapatan`
  - ✉️ `Pesan` → `/listchat`
  - Active state: oranye dengan indicator bar atas

---

### 3. Terima Order (Jemput Penumpang)

| Item | Detail |
|------|--------|
| **Module** | `terimaorder` |
| **Route** | `/terimaorder` |
| **File View** | `terimaorder_view.dart` |

**Deskripsi:**  
Halaman detail order masuk yang perlu diaccept oleh driver. Menampilkan informasi penumpang, rute, harga, dan slide-to-act untuk menerima.

**Detail Fitur:**
- **Peta Background** — FlutterMap dengan lokasi order
- **DraggableScrollableSheet (Popup):**
  - **Sheet Handle** — Drag bar indicator
  - **Header:** "Jemput Penumpang" + tombol back
  - **Info Order:**
    - ⏱️ Estimasi waktu: "14 Menit"
    - 💰 Harga: "Rp 15.000"
  - **Info Penumpang:**
    - Avatar (inisial): "AS"
    - Nama: "Aulia Sukma R."
    - Rating: ⭐ 4.7
    - 📞 Tombol call
  - **Timeline Rute:**
    - Pickup: "11.25am — Gerbang Samping, SMK Negeri 4 Malang, Kecamatan Klojen"
    - Drop-off: "11.45am — Jl. Gadang gg 12 no 18, Gadang"
    - Visual timeline (titik orange → garis → titik orange transparan)
- **Slide to Act** — Geser untuk "Jemput Penumpang", navigasi ke halaman Antar Order

---

### 4. Antar Order (Pengantaran)

| Item | Detail |
|------|--------|
| **Module** | `antarorder` |
| **Route** | `/antarorder` |
| **File View** | `antarorder_view.dart` |

**Deskripsi:**  
Halaman proses pengantaran penumpang ke tujuan. Menampilkan tujuan, info penumpang, dan slide-to-act selesai.

**Detail Fitur:**
- **Peta Background** — FlutterMap untuk navigasi
- **DraggableScrollableSheet:**
  - **Sheet Handle** — Drag bar indicator
  - **Tujuan Pengantaran:**
    - Circle indicator bertingkat (3 layer oranye)
    - Label: "Tujuan Pengantaran"
    - Alamat: "Gerbang Samping, SMK Negeri 4 Malang"
  - **Info Penumpang:**
    - ⏱️ Estimasi: "14 Menit"
    - 💰 Harga: "Rp 15.000"
    - Avatar (inisial) + nama (disingkat): "Aulia Sukma R."
    - Rating: ⭐ 4.7
    - 💬 Tombol Chat → navigasi ke `/chat`
    - 📞 Tombol Call
- **Slide to Act** — Geser "Penumpang Sampai Tujuan" untuk menyelesaikan trip

---

### 5. Pendapatan

| Item | Detail |
|------|--------|
| **Module** | `pendapatan` |
| **Route** | `/pendapatan` |
| **File View** | `pendapatan_view.dart` |

**Deskripsi:**  
Dashboard keuangan driver yang menampilkan pendapatan, saldo wallet, dan akses fitur tambahan.

**Detail Fitur:**
- **Custom AppBar** — "Pendapatan" dengan tombol back dan shadow
- **Saldo Card (Tab Harian/Mingguan):**
  - Tab `Harian`:
    - "Pendapatan Hari Ini" — Rp 57.800
    - "11 Pengantaran Selesai"
    - Tombol "Lihat Detail"
  - Tab `Mingguan`:
    - "Pendapatan Minggu Ini" — Rp 32.500
    - "50 Pengantaran Selesai"
    - Tombol "Lihat Detail"
  - Animated tab indicator (oranye)
- **Wallet Card:**
  - Saldo E-Wallet dan Saldo Dompet
  - **Menu Aksi:**
    - ➕ `Top Up` — Isi saldo
    - ⬇️ `Tarik ke Bank` — Pencairan dana
    - 🕐 `Riwayat transaksi` — Histori transaksi
  - Garis pemisah oranye antara saldo dan menu
- **Pendapatan Tambahan:**
  - 📍 `Jadwal Operasional` — Card dengan ikon peta
  - 💵 `Insentif & Lainnya` — Card dengan ikon cash

---

### 6. Profil Driver

| Item | Detail |
|------|--------|
| **Module** | `profil` |
| **Route** | `/profil` |
| **File View** | `profil_view.dart` |

**Deskripsi:**  
Halaman profil lengkap driver dengan info akun, statistik, dan menu navigasi.

**Detail Fitur:**
- **Header Ilustrasi** — Banner visual atas (scale 1.2x)
- **Profile Card (overlap):**
  - Avatar dengan inisial (background oranye)
  - Nama, Email, Nomor Telepon, User ID
  - Tombol Edit (ikon pensil)
  - Reactive data via `Obx`
- **Driver Section (Responsive Layout):**
  - **Saldo Poin** — CircleAvatar $ + skor (10.000)
  - **Poin Driver** — Ikon poin + skor (10.000)
  - **Penilaian dari Customer** — ListTile navigasi ke `/riwayat`
  - Layout responsif: Row (layar ≥400) / Column (layar <400)
- **Menu Lainnya:**
  - ⚙️ `Pengaturan` → `/pengaturan`
  - 📱 `Kode QR`
  - ⚠️ `Status akun & sanksi`
  - ✅ `Cek aplikasi`
  - 📄 `Penyerahan dokumen`
  - 👥 `Ajak teman jadi mitra`
  - 🤝 `Perjanjian Kemitraan`
  - 📅 `Buat janji`
  - ❓ `Bantuan`
- **Menu Danger Zone (border merah):**
  - 🚪 `Keluar` — Logout

---

### 7. Pengaturan Driver

| Item | Detail |
|------|--------|
| **Module** | `pengaturan` |
| **Route** | `/pengaturan` |
| **File View** | `pengaturan_view.dart` |

**Deskripsi:**  
Halaman pengaturan detail akun dan kendaraan driver.

**Detail Fitur:**
- **Custom AppBar** — "Pengaturan" dengan shadow
- **Daftar Pengaturan (SettingView reusable widget):**
  - ⚙️ `Ganti Nomor` — Subtitle: "+621234567899"
  - 📧 `Email` — Subtitle: "@sabrina1@gmail.com"
  - 🚗 `Nomor Kendaraan` — Subtitle: "B 1234 AB"
  - 💳 `Rekening bank` — Subtitle: "PT. BANK RAKYAT INDONESIA..."
  - 💼 `Pemilihan Layanan` — Subtitle: "Daftar pilihan layanan"
  - 🗑️ `Hapus akun` — Subtitle: "Hapus akun anda selamanya."
- Setiap item memiliki ikon, judul, subtitle, arrow chevron, dan divider

---

### 8. Riwayat Trip

| Item | Detail |
|------|--------|
| **Module** | `riwayat` |
| **Route** | `/riwayat` |
| **File View** | `riwayat_view.dart` |

**Deskripsi:**  
Halaman riwayat trip detail driver dengan kalender tanggal, saldo, statistik trip, dan history pengantaran.

**Detail Fitur:**
- **Date Selector (Horizontal Calendar):**
  - Navigasi bulan (chevron kiri/kanan)
  - Daftar 5 hari (tanggal + nama hari)
  - Highlight tanggal terpilih (oranye)
  - Tanggal di luar bulan berwarna grey
- **Saldo Card (Tab Total Saldo/Laba Bersih):**
  - Tab `Total Saldo`: "Total Pendapatan" — Rp 57.800
  - Tab `Laba Bersih`: "Pendapatan Bersih" — Rp 32.500
  - Animated tab indicator
- **Trip View (Statistik):**
  - Trip Selesai: 5
  - Trip Cancel: 0
- **History View (Per Transaksi):**
  - Harga + Status ("Selesai" = oranye)
  - Waktu: "16:48 - 16:53"
  - ID Transaksi: "GK-91-1222377"
  - Timeline rute (pickup → destination) dengan garis putus-putus
  - Badge info:
    - 🏆 Poin earned (contoh: +300 / +50)
    - 💰 Metode pembayaran: Tunai / CaPay (ikon berbeda)
  - Tap → navigasi ke `/terimaorder` (detail order)

---

### 9. Chat (Driver ↔ User)

| Item | Detail |
|------|--------|
| **Module** | `chat` |
| **Route** | `/chat` |
| **File View** | `chat_view.dart` |

**Deskripsi:**  
Halaman chat antara driver dan user/penumpang dengan fitur kirim teks, foto, dan kamera.

**Detail Fitur:**
- **Custom AppBar** — "ChatView" dengan shadow
- **Chat Messages (Reactive ListView):**
  - Bubble pesan (Obx reactive list)
  - Pesan teks: background oranye (driver) / grey (user)
  - Pesan gambar: `Image.file()` dengan ClipRRect rounded
  - Timestamp di setiap bubble
  - Auto-scroll
- **Input Area:**
  - ➕ Tombol attachment → Bottom Sheet:
    - 📷 Camera — Ambil foto lewat kamera
    - 🖼️ Gallery — Pilih foto dari galeri
  - TextField "Ketik pesan..." (grey rounded)
  - 📤 Tombol Send (oranye)
  - 📸 Tombol Camera Quick (oranye) — Shortcut kamera

---

### 10. Daftar Pesan (List Chat)

| Item | Detail |
|------|--------|
| **Module** | `listchat` |
| **Route** | `/listchat` |
| **File View** | `listchat_view.dart` |

**Deskripsi:**  
Halaman daftar percakapan/pesan dengan semua penumpang.

**Detail Fitur:**
- **Custom AppBar** — "Daftar Pesan" dengan shadow
- **Daftar Chat (Reactive ListView):**
  - CircleAvatar default (ikon person)
  - Nama penumpang (bold)
  - Preview pesan terakhir
  - Timestamp
  - Divider oranye antar item
- Data reactive via `Obx` dari controller

---

## C. Ringkasan Perbandingan Fitur

| Fitur | User (cakli) | Driver (cakli_driver) |
|-------|:------------:|:---------------------:|
| Splash Screen | ✅ | ✅ |
| Home + Peta | ✅ | ✅ |
| Pencarian Lokasi (Geocoding) | ✅ | ❌ |
| Set Lokasi Jemput/Tujuan | ✅ | ❌ |
| Pemesanan Ride | ✅ | ❌ |
| Pilih Metode Pembayaran | ✅ | ❌ |
| Voucher & Diskon | ✅ | ❌ |
| Tracking Driver (Real-time) | ✅ | ❌ |
| Chat (In-ride) | ✅ (teks) | ✅ (teks + foto + kamera) |
| Daftar Chat | ❌ | ✅ |
| Rating & Ulasan | ✅ | ❌ |
| Riwayat Perjalanan | ✅ (tab 4 kategori) | ✅ (kalender + detail) |
| Edit Profil | ✅ | ✅ (via profile card) |
| Edit Email | ✅ | ✅ (dalam pengaturan) |
| Edit PIN E-Wallet | ✅ | ❌ |
| Alamat Tersimpan | ✅ | ❌ |
| Tambah Alamat + Patokan | ✅ | ❌ |
| Peta Interaktif | ✅ | ✅ |
| Status Online/Offline | ❌ | ✅ |
| Toggle Autobid | ❌ | ✅ |
| Statistik Poin & Trip | ❌ | ✅ |
| Terima/Tolak Order | ❌ | ✅ (slide-to-act) |
| Proses Pengantaran | ❌ | ✅ (slide-to-act) |
| Pendapatan (Harian/Mingguan) | ❌ | ✅ |
| E-Wallet (Saldo + Top Up + Tarik) | ❌ | ✅ |
| Menu Profil (QR, Dokumen, dll) | ❌ | ✅ |
| Pengaturan Kendaraan | ❌ | ✅ |
| Logout | ✅ (placeholder) | ✅ (placeholder) |
| Hapus Akun | ✅ (placeholder) | ✅ (dalam pengaturan) |

---

> **Catatan:**  
> - Beberapa fitur masih berstatus **placeholder/belum terimplementasi** (contoh: Logout, Hapus Akun, Beri Rating dari setting).
> - Kedua aplikasi menggunakan **GetX** sebagai state management dan routing.
> - Peta menggunakan **flutter_map** dengan tile **OpenStreetMap** dan user-agent `com.cakli.app/1.0`.
> - Warna utama (brand color): `#E04D04` / `#E45A1F` / `#D46A2E` (variasi oranye CAKLI).
