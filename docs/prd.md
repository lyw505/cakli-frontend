PRODUCT REQUIREMENT DOCUMENT
CAKLI – Platform Transportasi Becak Listrik

1. Ringkasan Produk
CAKLI adalah platform transportasi digital yang menghubungkan penumpang dengan pengemudi becak listrik melalui aplikasi mobile dan sistem manajemen berbasis web.
Tujuan platform:
Ramah lingkungan
Mudah diakses masyarakat
Mendukung program pemerintah terkait becak listrik
Memiliki sistem operasional yang terkelola secara digital
Tiga aplikasi utama:
Mobile App User – untuk penumpang memesan becak listrik
Mobile App Driver – untuk pengemudi menerima dan menjalankan perjalanan
Web Admin Dashboard – untuk admin mengelola operasional sistem
Platform dirancang agar dapat beroperasi di seluruh kota di Indonesia dengan pengelolaan zona operasional.

2. Latar Belakang Masalah
Sulit menemukan becak dengan cepat: 
	penumpang harus mencari manual, tidak efisien.


Pengelolaan driver tidak terorganisasi:
	 admin tidak dapat memonitor driver aktif, lokasi, atau performa.


Tarif perjalanan tidak konsisten: 
	sering ditentukan manual, menimbulkan ketidakpastian bagi penumpang.
Sulit menangani keluhan pengguna: 
	tidak ada sistem pencatatan dan penyelesaian keluhan.


Data operasional tidak tersedia: 
	tanpa sistem digital, pengelola tidak memiliki data perjalanan, pendapatan, 
	dan performa zona.

3. Tujuan Produk
Mempermudah akses transportasi becak listrik
Mengelola driver secara terpusat
Mendukung transportasi ramah lingkungan
Menyediakan monitoring operasional real-time
Menghasilkan data operasional untuk analisis bisnis

4. Aktor Sistem
4.1 User (Penumpang)

User adalah pelanggan yang menggunakan layanan becak listrik melalui mobile app.

Fitur utama:
Splash screen animasi branding CAKLI

Registrasi & login

Home & peta interaktif — menampilkan peta OpenStreetMap, search bar lokasi tujuan, quick-action simpan lokasi (Rumah/Kantor), dan riwayat lokasi

Set lokasi jemput & tujuan — pilih lokasi via peta interaktif, GPS saat ini, atau daftar rekomendasi lokasi

Konfirmasi lokasi — peta fullscreen dengan panel detail lokasi jemput

Pemesanan ride (order) — pilih metode pembayaran, gunakan voucher, lihat estimasi harga, cari driver

Pilih metode pembayaran — Cash, CaPay (e-wallet), atau QRIS (scan QR)

Tracking perjalanan real-time — info driver (nama, rating, kendaraan, plat nomor), estimasi kedatangan, detail rute, info pembayaran, opsi batalkan pesanan

Chat dengan driver — chat real-time teks dengan driver saat dalam perjalanan

Rating & ulasan — beri rating bintang (1-5, half-rating), tulis ulasan, lihat rangkuman transaksi setelah perjalanan selesai

Voucher & diskon — lihat daftar voucher, masukkan kode voucher, lihat detail & syarat ketentuan voucher

Aktivitas (riwayat perjalanan) — tab Riwayat, Dalam Proses, Terjadwal, dan Draf; aksi pesan ulang dan beri ulasan

Pengaturan akun — edit profil (nama, telepon, email, foto), ganti email (dengan verifikasi), ganti PIN e-wallet (6 digit)

Alamat tersimpan — kelola daftar alamat, tambah alamat baru via peta/pencarian dengan patokan

Pencarian lokasi — integrasi API Nominatim (geocoding) dengan filter khusus Indonesia


4.2 Driver (Pengemudi Becak Listrik)

 Driver adalah pengemudi yang mengoperasikan becak listrik yang diberikan pemerintah.
 Karakteristik: mayoritas berusia lanjut, kemampuan teknologi terbatas → UI sederhana.

Fitur utama:
Splash screen animasi branding CAKLI

Home & peta fullscreen — status online/offline toggle, statistik poin harian, statistik penerimaan bid & penyelesaian trip, toggle autobid (auto-accept order)

Terima order (jemput penumpang) — detail order masuk (estimasi waktu, harga, info penumpang, rating, rute pickup-dropoff), slide-to-act untuk menerima

Antar order (pengantaran) — tracking ke tujuan, info penumpang, estimasi waktu & harga, slide-to-act untuk menyelesaikan trip

Pendapatan — dashboard keuangan harian/mingguan (jumlah pengantaran, nominal pendapatan), saldo e-wallet & dompet, menu top up / tarik ke bank / riwayat transaksi, jadwal operasional, insentif

Profil driver — info akun (nama, email, telepon, user ID), saldo poin, poin driver, penilaian dari customer, menu (pengaturan, kode QR, status akun & sanksi, cek aplikasi, penyerahan dokumen, ajak teman, perjanjian kemitraan, buat janji, bantuan)

Pengaturan driver — ganti nomor, email, nomor kendaraan, rekening bank, pemilihan layanan, hapus akun

Riwayat trip — kalender horizontal (navigasi per hari), saldo total/laba bersih, statistik trip selesai & cancel, histori per transaksi (harga, waktu, ID transaksi, rute, poin, metode pembayaran)

Chat dengan user — chat teks + kirim foto (kamera/galeri), daftar percakapan dengan semua penumpang

Bottom navigation — Beranda, Pendapatan, Pesan


4.3 Admin (Web Dashboard)

 Admin bertanggung jawab mengelola sistem operasional platform. Dibagi menjadi 3 role:

Master Admin
Kontrol Sistem Global / Dashboard — KPI (pendapatan regional, pertumbuhan pesanan, margin keuntungan, uptime sistem), grafik perbandingan performa regional multi-kota, indikator risiko (fraud, sengketa tinggi, lonjakan pembatalan), ringkasan unit ekonomi, kebijakan kritis, log audit terbaru

Manajemen Area & Zona — KPI global zona, performance snapshot, permintaan regional tertunda (ekspansi/penggabungan), tampilan data zona (tabel & peta interaktif), dialog tambah zona baru (proyeksi 30 hari, estimasi BEP, skor risiko), dialog hentikan zona (analisis dampak, notifikasi otomatis)

Manajemen Tarif — tarif aktif (harga layanan inti, biaya tambahan malam/lonjakan, simulasi dampak, pembagian biaya & margin, pengaman batas, penjadwalan tanggal efektif, status propagasi), penyesuaian regional (multiplikator per zona), riwayat versi (rollback), dialog review & terapkan perubahan (2 langkah)

Kontrol Akses Admin (Admin Role Management) — KPI admin, peringatan risiko keamanan, tabel daftar admin (filter role/status, dropdown aksi), matriks izin (8 modul × 3 peran × 5 kapabilitas), log aktivitas, panel detail admin (side drawer: info dasar, peran, scope akses, panel keamanan, aksi keamanan, zona bahaya)

Log Audit — KPI event, peringatan anomali, status integritas rantai audit (verifikasi hash, enkripsi), kebijakan retensi, filter & pencarian, tabel log audit, panel detail log (side drawer: metadata aktor, detail tindakan, sesi terkait/korelasi)

Kebijakan Mitra — KPI (bagi hasil, standar armada, rating minimal), konfigurasi bagi hasil & insentif (potongan platform, PPN, skema bonus), spesifikasi & standar kendaraan (usia, baterai, kelistrikan, GPS tracker), persyaratan dokumen & onboarding, peringatan kebijakan

Operating Admin
Dashboard Operasional — KPI (active orders, drivers online, active complaints, daily revenue), grafik total visitors, tabel live orders, quick operations (broadcast, heatmap), system alerts (emergency signal, high demand), fleet statistics

Peta Operasional (Real-time Map) — mesin spasial real-time, manajemen layer (driver, pesanan, heatmap permintaan), header metrik live, alert cerdas, panel kontrol terpadu (pencarian, filter status), tangkapan snapshot

Manajemen Driver — KPI (total, online, pending, rating, cancel rate), filter & pencarian, tabel driver (status, online, trip aktif, kendaraan, rating, order, risiko), dropdown aksi (verifikasi, suspend, reaktivasi), dialog tambah driver baru (form 5 langkah: pribadi, kontak, dokumen, unit, status), dialog konfirmasi tindakan, dialog audit log

Manajemen Pesanan — pelacakan berbasis tab (Mencari, Assigned, On-Trip, Selesai, Batal, Issue), suite intervensi operasional (reassign/assign, tandai masalah, pembatalan manual), audit log pesanan, analisis keuangan & rute, log intervensi

Keluhan & Sengketa — KPI (6 statistik per status), filter & pencarian, tabel keluhan (tiket, tipe, subjek, dari/ke, prioritas, status), dialog tinjau & resolusi (timeline investigasi, form resolusi, notifikasi otomatis), dialog eskalasi, dialog kontak, dialog audit log

Pemantauan Aktivitas Pengemudi — referensi batas deteksi (diam 15 menit, batal 3/jam), KPI (diam, batal tinggi, offline terbaru), tabel peringatan & pola, dialog pantau, dialog kirim peringatan (editor pesan, eskalasi langsung), dialog selidiki (informasi risiko, linimasa insiden), dialog audit log

Moderasi Pengguna — filter & pencarian, tabel pengguna (profil, tanggal bergabung, orders, cancel rate, reports, status), dialog detail profil (tab: riwayat pesanan, riwayat laporan, riwayat status, audit log), dialog suspend akun (temporary/permanent, durasi, alasan), dialog audit log global

Reporting Admin
Ikhtisar Bisnis (Dashboard) — KPI (total pesanan, pendapatan, driver aktif, tingkat penyelesaian), grafik tren pesanan (hourly), sidebar jam sibuk & area teratas, tabel aktivitas terbaru

Wawasan Performa Driver — KPI (avg rating, global cancel rate, active fleet), grafik top drivers by order fulfillment, peringkat driver (top 3), tabel performa komprehensif

Pusat Laporan — navigasi ke 4 laporan: Order History, Revenue Report, Driver Performance, Cancellation Analysis

Kokpit Keuangan / Laporan Pendapatan — tab Overview (KPI, grafik tren, sumber pendapatan), tab Breakdown (tabel performa regional), tab Settlement (KPI pencairan, riwayat pencairan batch), tab Adjustments (audit log keuangan, filter tipe kredit/debit)

Wawasan Kinerja Pengemudi / Laporan — KPI, filter (pencarian, tanggal, area), tabel metrik pengemudi (area, pesanan, penyelesaian, tingkat pembatalan, penilaian, status)

Analisis Pembatalan — KPI (tingkat pembatalan, oleh pengemudi, oleh pelanggan), filter & pencarian, tabel log pesanan dibatalkan (ID, tanggal, alasan, tipe, area, denda)

Riwayat Transaksi / Order History — filter & pencarian (ID, nama, tanggal, area, status), tabel riwayat pesanan, dialog detail pesanan (info pengguna, driver, rute, keuangan, jarak, durasi, metode pembayaran)

Analitik Lintas Area — KPI perbandingan (kota pendapatan tertinggi, pembatalan terendah, pertumbuhan tercepat), grafik pendapatan vs volume pesanan (bar chart dual axis), grafik analisis tingkat pembatalan, wawasan strategi ekspansi (kartu AI)

5. Fitur Utama Sistem
5.1 Dashboard Admin
Master Admin: Kontrol sistem global — KPI pendapatan, pertumbuhan, margin, uptime; grafik perbandingan regional; indikator risiko; ringkasan unit ekonomi
Operating Admin: Dashboard operasional — active orders, drivers online, complaints, revenue; live orders; system alerts; fleet statistics
Reporting Admin: Ikhtisar bisnis — total pesanan, pendapatan, driver aktif, tingkat penyelesaian; tren pesanan; jam sibuk & area teratas

5.2 Manajemen Zona
Membuat & edit zona (tabel & peta interaktif)
Melihat performa zona (pendapatan, margin, utilisasi, volume, cancel rate)
Memantau jumlah driver per zona
Permintaan regional tertunda (ekspansi, penggabungan)
Dialog tambah zona baru dengan proyeksi 30 hari, estimasi BEP, skor risiko
Dialog hentikan zona dengan analisis dampak & notifikasi otomatis

5.3 Manajemen Tarif
Tarif per km, minimum fare, surcharge malam, pengali lonjakan
Simulasi dampak perubahan tarif (revenue, pembayaran driver, take rate, margin, risiko batal)
Pembagian biaya & margin (potongan platform, pembayaran driver, margin bersih)
Pengaman batas & peringatan (risiko churn, kenaikan batal, ambang batas kustom)
Penjadwalan tarif (aktif sekarang / jadwalkan)
Penyesuaian regional per zona (multiplikator, override lokal)
Riwayat versi tarif dengan rollback
Status propagasi sinkronisasi

5.4 Manajemen Driver
Lihat profil driver (data pribadi, kontak, dokumen, kendaraan)
Verifikasi dokumen (KTP, SIM, foto kendaraan)
Tambah driver baru (form 5 langkah)
Aktif/nonaktifkan/suspend driver dengan alasan & audit log
Monitor performa driver (rating, cancel rate, orders, risiko)

5.5 Manajemen Order
Monitoring perjalanan aktif berbasis tab (Mencari, Assigned, On-Trip, Selesai, Batal, Issue)
Intervensi: reassign/assign driver, tandai masalah, pembatalan manual
Audit log pesanan komprehensif
Analisis keuangan & rute per pesanan

5.6 Complaint Management
Meninjau keluhan user/driver (tiket per tipe: penumpang↔pengemudi, pengguna↔aplikasi)
Timeline investigasi kronologis
Resolusi (suspend, refund, peringatan, kompensasi, tolak) dengan notifikasi otomatis
Eskalasi ke admin utama, legal, manajer operasional, atau tim teknis
Kontak pelapor/terlapor dengan logging

5.7 Pemantauan Aktivitas Pengemudi
Deteksi pola: driver diam, pembatalan sering, offline mendadak
Dialog pantau, kirim peringatan (editor pesan, eskalasi langsung), selidiki (informasi risiko, linimasa insiden)

5.8 Moderasi Pengguna
Monitoring pengguna (orders, cancel rate, reports)
Suspend akun (temporary/permanent) dengan durasi & alasan
Detail profil (riwayat pesanan, laporan, status, audit log)

5.9 Kebijakan Mitra
Konfigurasi bagi hasil & insentif (potongan platform, PPN, bonus harian)
Spesifikasi & standar kendaraan (usia, baterai, kelistrikan, GPS)
Persyaratan dokumen & onboarding

5.10 Sistem Keamanan
Kontrol akses admin — matriks izin (8 modul × 3 peran × 5 kapabilitas)
Audit log aktivitas admin — verifikasi hash, integritas rantai audit, kebijakan retensi
Peringatan risiko keamanan (jumlah master admin, MFA, login inaktif, percobaan gagal)
Peringatan anomali (perubahan role massal, IP baru, event critical berturut)
Panel detail admin dengan panel keamanan (MFA, password, IP, failed login)

5.11 Pelaporan & Analitik
Kokpit Keuangan — overview pendapatan kotor/bersih, breakdown regional, pencairan mitra (batch), refund & penyesuaian
Wawasan Kinerja Pengemudi — metrik per driver (area, pesanan, penyelesaian, pembatalan, rating)
Analisis Pembatalan — tingkat pembatalan oleh pengemudi/pelanggan/sistem, alasan, denda
Riwayat Transaksi — log semua pesanan dengan detail lengkap
Analitik Lintas Area — perbandingan performa antar kota, grafik dual-axis, wawasan strategi ekspansi (AI)

5.12 Peta Operasional Real-time
Mesin spasial real-time (driver, pesanan, heatmap permintaan)
Manajemen layer toggle
Alert cerdas untuk masalah operasional mendesak
Panel kontrol terpadu (pencarian, filter status)
Tangkapan snapshot untuk ekspor laporan

5.13 Sistem Pembayaran
Cash: penumpang membayar langsung ke driver → metode utama karena driver gaptek
CaPay (e-wallet): pembayaran via saldo digital, kelola PIN 6 digit
QRIS (opsional): scan QR pada driver
Settlement Driver: pencairan pendapatan batch, riwayat pencairan

6. Dashboard Admin – Detail Per Role
6.1 Master Admin
Kontrol Sistem Global: KPI (pendapatan regional, pertumbuhan, margin, uptime), grafik perbandingan regional multi-kota, indikator risiko (fraud, sengketa, lonjakan), ringkasan unit ekonomi, kebijakan kritis, log audit terbaru

Manajemen Area & Zona: KPI global (total zona, pemantauan, pendapatan 7H, margin, driver aktif, utilisasi), performance snapshot, permintaan regional tertunda, tabel zona & peta interaktif, dialog tambah/hentikan zona

Manajemen Tarif: tab tarif aktif (harga inti, simulasi dampak, pembagian biaya, pengaman batas, penjadwalan, propagasi, penyesuaian regional multiplikator), tab riwayat versi (rollback), dialog review & terapkan

Kontrol Akses Admin: KPI (admin aktif, master admin, MFA, ditangguhkan, perubahan peran 7H), peringatan risiko keamanan, tab admin (tabel + aksi), tab matriks izin (8 modul × 3 peran), tab log aktivitas, panel detail admin (side drawer)

Log Audit: KPI (event total, kritis, high, gagal, ekspor), peringatan anomali, status integritas rantai audit, kebijakan retensi, tabel log audit, panel detail log (side drawer, korelasi sesi)

Kebijakan Mitra: KPI (bagi hasil, standar armada, rating minimal), konfigurasi bagi hasil & insentif, spesifikasi kendaraan, persyaratan dokumen & onboarding

6.2 Operating Admin
Dashboard Operasional: KPI (active orders, drivers online, complaints, revenue), grafik visitors, tabel live orders, quick operations (broadcast, heatmap), system alerts (emergency, high demand), fleet statistics

Peta Operasional: mesin spasial real-time, layer toggle, metrik live, alert cerdas, panel kontrol, snapshot

Manajemen Driver: KPI (total, online, pending, rating, cancel rate), tabel driver, dialog tambah driver (5 langkah), dialog aksi (suspend/verifikasi/reaktivasi), audit log

Manajemen Pesanan: tab per status, intervensi operasional (reassign, tandai masalah, pembatalan manual), audit log, analisis keuangan & rute

Keluhan & Sengketa: KPI (6 statistik), tabel keluhan, dialog resolusi (timeline, form, notifikasi otomatis), dialog eskalasi, dialog kontak, audit log

Pemantauan Aktivitas Pengemudi: KPI (diam, batal tinggi, offline), tabel peringatan, dialog pantau/peringatan/selidiki, audit log

Moderasi Pengguna: tabel pengguna (cancel rate, reports, status), dialog detail profil (4 tab), dialog suspend, audit log global

6.3 Reporting Admin
Ikhtisar Bisnis: KPI (pesanan, pendapatan, driver aktif, penyelesaian), grafik tren pesanan (hourly), jam sibuk, area teratas, tabel aktivitas terbaru

Wawasan Performa Driver: KPI (rating, cancel rate, fleet size), grafik top drivers, peringkat driver top 3, tabel performa

Pusat Laporan: navigasi ke Order History, Revenue Report, Driver Performance, Cancellation Analysis

Kokpit Keuangan: tab Overview (KPI, grafik tren, distribusi sumber pendapatan), tab Breakdown (tabel regional), tab Settlement (KPI pencairan, riwayat batch), tab Adjustments (audit log keuangan)

Wawasan Kinerja Pengemudi: KPI, filter, tabel metrik pengemudi per area

Analisis Pembatalan: KPI (tingkat pembatalan per aktor), filter, tabel pembatalan

Riwayat Transaksi: filter lengkap, tabel pesanan, dialog detail pesanan

Analitik Lintas Area: KPI perbandingan kota, grafik pendapatan vs volume, grafik pembatalan, wawasan strategi ekspansi AI

7. Alur Sistem Utama

7.1 Alur Pemesanan (User)
User membuka aplikasi → splash screen animasi
Home: melihat peta interaktif & riwayat lokasi
User mengetik/memilih lokasi tujuan via search, peta, atau GPS
Konfirmasi lokasi jemput pada peta fullscreen
Memilih metode pembayaran (Cash/CaPay/QRIS) & menggunakan voucher (opsional)
Melihat estimasi harga → tap "Cari driver"
Sistem mencari driver terdekat
Driver menerima order → user melihat tracking real-time (info driver, ETA, rute)
User dapat chat/call driver selama perjalanan
Perjalanan selesai → pembayaran dilakukan
User memberikan rating & ulasan
Transaksi masuk ke riwayat aktivitas

7.2 Alur Penerimaan Order (Driver)
Driver online via toggle status di home
Order masuk → notifikasi dengan detail (estimasi waktu, harga, info penumpang, rute)
Driver geser "slide-to-act" untuk menerima order, atau autobid aktif
Navigasi ke lokasi jemput → chat/call penumpang jika perlu
Geser "slide-to-act" untuk menandai penumpang sampai tujuan
Trip tercatat di riwayat → pendapatan terupdate

8. Driver Onboarding
Driver didaftarkan admin melalui Manajemen Driver (form 5 langkah: data pribadi, kontak, dokumen KTP/SIM/kendaraan, unit kendaraan, status awal)
Dokumen diverifikasi oleh Operating Admin
Pelatihan penggunaan aplikasi
Driver diaktifkan → dapat menerima order

9. Struktur Data
ERD menjamin integritas data, efisiensi, dan konsistensi relasi antar tabel.

10. Indikator Keberhasilan
Operasional: tingkat keberhasilan order, penyelesaian complaint, monitoring zona & driver
Driver: driver aktif, verifikasi dokumen tepat waktu
Bisnis: peningkatan jumlah perjalanan & pendapatan
User: kepuasan user (rating)
Admin: penggunaan dashboard Master Admin & laporan cross-area selesai tepat waktu
Catatan: Nilai numerik akan ditentukan oleh manajemen CAKLI dan dapat disesuaikan saat pilot project.

Kesimpulan
CAKLI menghubungkan penumpang dengan pengemudi becak listrik melalui sistem aplikasi terintegrasi.
Dengan fitur manajemen driver, monitoring perjalanan, dashboard operasional multi-role, sistem pembayaran multi-metode (Cash, CaPay, QRIS), kontrol Master Admin, kebijakan mitra, peta operasional real-time, pemantauan aktivitas pengemudi, moderasi pengguna, pelaporan & analitik lintas area, dan sistem keamanan audit berlapis, platform ini meningkatkan kualitas layanan transportasi becak listrik secara signifikan dan mendukung program transportasi ramah lingkungan di seluruh Indonesia.
