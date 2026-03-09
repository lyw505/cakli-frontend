# Admin Panel Feature Mapping

This document provides a comprehensive structured catalog of features and functionalities across the three primary admin roles in the Cakli platform.

---

## 🔑 Master Admin
Master Admin memiliki kontrol sistem global, berfokus pada konfigurasi, manajemen kebijakan tingkat tinggi, dan keamanan seluruh sistem.

### 📊 Kontrol Sistem Global / Dashboard ([master-admin/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/master-admin/page.tsx))

#### Header
*   **Judul:** "Kontrol Sistem Global" dengan deskripsi "Data terkonsolidasi tingkat tinggi dan perbandingan regional."

#### KPI Summary (4 Kartu)
*   **Total Pendapatan Regional:** Nominal total transaksi kotor (misal: Rp 124.5M), tren vs bulan lalu (misal: +8.2%), tooltip: "Nilai total transaksi kotor sebelum pemotongan biaya." Ikon: Globe.
*   **Tingkat Pertumbuhan Pesanan:** Persentase pertumbuhan MoM (misal: +14.3%), subtitel perbandingan bulan (misal: "Pertumbuhan MoM · Feb vs Jan"). Ikon: TrendingUp. Warna hijau.
*   **Margin Keuntungan Regional:** Persentase margin rata-rata (misal: 18.5%), subtitel konteks (misal: "Rata-rata di 12 zona"). Ikon: DollarSign.
*   **Tingkat Uptime Sistem:** Persentase uptime (misal: 99.999%), subtitel (misal: "Five Nines · ~5,26 mnt/thn"). Ikon: Activity. Warna hijau.

#### Grafik Perbandingan Performa Regional
*   **Tipe:** Area chart (multi-line, area terisi gradient).
*   **Data Bulanan:** 6 bulan data (Sep – Feb), data per kota meliputi volume/pendapatan/dll.
*   **Kota Tersedia (Multi-Select Popover):**
    - Malang Kota (warna: `#E04D04` / oranye)
    - Surabaya (warna: `#3b82f6` / biru)
    - Batu (warna: `#22c55e` / hijau)
    - Sidoarjo (warna: `#8b5cf6` / ungu)
    - Kepanjen (warna: `#ec4899` / pink)
    - Pasuruan (warna: `#f59e0b` / kuning)
*   **Default Terpilih:** Malang Kota, Surabaya, Batu.
*   **Filter Aspek (Dropdown):**
    - `revenue` → "Pendapatan (Rp)"
    - `order_volume` → "Volume Pesanan"
    - `cancel_rate` → "Tingkat Pembatalan (%)"
    - `margin` → "Margin per Area (%)"
*   **Ukuran:** 8/12 kolom grid layout.

#### Sidebar: Peringatan Konfigurasi
*   **Desain:** Card kuning (warning) dengan ikon AlertTriangle.
*   **Detail:** Pesan peringatan terkait konfigurasi yang perlu diverifikasi (misal: "Terdeteksi pembaruan zona Surabaya. Harap verifikasi struktur tarif baru sebelum pemrosesan akhir hari.").
*   **Aksi:** Link navigasi ke halaman Konfigurasi Tarif (`/master-admin/tariffs`).

#### Sidebar: Indikator Risiko (3 Item)
*   **Bendera Kecurigaan Fraud:** Card merah — detail transaksi mencurigakan (misal: "3 transaksi mencurigakan di Surabaya Pusat (24 jam terakhir)"). Badge jumlah (misal: 3). Ikon: Flag.
*   **Wilayah Sengketa Tinggi:** Card oranye — nama wilayah + rasio sengketa vs ambang batas (misal: "Kepanjen: rasio sengketa 8.2% (ambang 5%)"). Badge persentase (misal: 8.2%). Ikon: MapPin.
*   **Lonjakan Pembatalan Abnormal:** Card kuning — detail lonjakan (misal: "Pembatalan +42% di Batu (18:00-20:00, cuaca buruk)"). Badge persentase (misal: +42%). Ikon: Zap.

#### Ringkasan Unit Ekonomi (4 Metrik)
*   **Pendapatan per Pesanan:** Rp 18.450, tren: +2.1%.
*   **Biaya per Pesanan:** Rp 12.800, tren: -0.8%.
*   **Rata-rata Pembayaran Driver:** 80%.
*   **Tingkat Pengambilan Platform:** 20%.

#### Kebijakan Kritis (2 Item)
*   **Mode Tarif Utama:** "Harga Regional Standar" — Badge: Aktif.
*   **Ekspansi Zona Baru:** Detail kota tertunda (misal: "Medan, Palembang (Tertunda)") — Tombol link "Detail" ke `/master-admin/areas`.

#### Log Audit Terbaru (3 Entri Terakhir)
*   **Atribut per Entry:** `time` (jam, font mono), `user` (nama admin atau "System"), `action` (deskripsi aksi), `type` (Badge: Tarif / Driver / Sistem).
*   **Contoh Data:**
    - 10:32 — Admin Rafi — "Mengubah tarif zona Surabaya Pusat" — Badge: Tarif.
    - 09:15 — Admin Dina — "Menambah driver baru (ID: DRV-0892)" — Badge: Driver.
    - 08:47 — System — "Backup otomatis database selesai" — Badge: Sistem.

### 🗺️ Manajemen Area & Zona ([master-admin/areas/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/master-admin/areas/page.tsx))

#### Model Data Zona
*   **Atribut:** `id` (ZN-xx), `name`, `city`, `hours` (jam operasional), `density`, `drivers` (jumlah driver aktif), `util` (persentase utilisasi), `volume` (pesanan harian), `revenue` (pendapatan dalam Rupiah), `margin` (persentase margin), `cancel` (persentase pembatalan), `status`.
*   **Status Zona:** Enum: `Aktif` | `Pemantauan` | `Ekspansi` | `Jam Terbatas`.
*   **Kepadatan:** Enum: `Tinggi` | `Kritis` | `Sedang` | `Rendah`.

#### KPI Summary (6 Kartu Global)
*   **Total Zona:** Jumlah zona terdaftar (misal: 24), subtitel zona aktif saat ini (misal: "5 Aktif Sekarang"). Ikon: Navigation.
*   **Pemantauan:** Jumlah zona butuh tindakan (misal: 3), subtitel: "Butuh Tindakan". Ikon: AlertCircle.
*   **Pendapatan (7H):** Total pendapatan 7 hari (misal: Rp 1.2M), subtitel persentase pertumbuhan (misal: "+12.4%"). Ikon: DollarSign.
*   **Margin Rata-rata:** Persentase margin rata-rata (misal: 16.8%), subtitel: "Diatas Target". Ikon: Percent.
*   **Driver Aktif:** Jumlah driver aktif (misal: 482), subtitel persentase online (misal: "92% Online"). Ikon: Users.
*   **Utilisasi Rata-rata %:** Persentase utilisasi (misal: 74%), subtitel: "Optimal". Ikon: Activity.

#### Performance Snapshot (4 Kartu Insight)
*   **Performa Tertinggi:** Nama zona (misal: "Surabaya Pusat"), subtitel nominal pendapatan (misal: "Rp 78.2jt Pendapatan"). Ikon: TrendingUp.
*   **Margin Terendah:** Nama zona (misal: "Kepanjen Sub"), subtitel margin vs target (misal: "8.2% (Target 15%)"). Ikon: TrendingDown.
*   **Tingkat Batal Tinggi:** Nama zona (misal: "Surabaya Pusat"), subtitel persentase volume (misal: "4.5% dari volume total"). Ikon: AlertTriangle.
*   **Pertumbuhan Tercepat:** Nama zona (misal: "Sidoarjo Kota"), subtitel persentase kenaikan (misal: "+22% volume pesanan"). Ikon: ArrowUpRight.

#### Permintaan Regional Tertunda
*   **Antrian Persetujuan:** Daftar permintaan perubahan strategis yang diajukan oleh Admin Operasional atau Sistem.
*   **Tipe Permintaan:** "Ekspansi zona baru" | "Penggabungan zona".
*   **Detail per Item:** Tipe permintaan, deskripsi detail, pihak pengaju (nama admin), badge level risiko (Sedang/Rendah), sisa waktu SLA (misal: "SLA: 4 jam tersisa").
*   **Aksi:** Tombol "Tinjau" (dengan ikon ChevronRight) per permintaan.

#### Tampilan Data Zona (Tab: Tabel & Peta)
*   **Pencarian:** Search bar untuk ID zona, nama, atau kota.
*   **Tab Tabel — Kolom:**
    - **Nama & ID Zona:** Nama zona + kode ID unik (misal: ZN-01).
    - **Status & Kota:** Badge status zona (Aktif hijau, Pemantauan kuning, Ekspansi biru, Jam Terbatas abu) + nama kota induk.
    - **Demografi:** Level kepadatan (Tinggi/Kritis/Sedang/Rendah) + jam operasional zona (misal: "24/7" atau "06:00-22:00").
    - **Status Armada:** Jumlah driver aktif, persentase utilisasi, progress bar visual.
    - **Performa (Hari Ini):** Volume pesanan harian + tingkat pembatalan (ikon peringatan merah jika >4%).
    - **Keuangan:** Pendapatan zona (format: jutaan, misal: "Rp 24.5jt") + persentase margin keuntungan.
    - **Aksi:** Tombol menu kontekstual "Kontrol Risiko" per zona.
    - **Paginasi:** Navigasi halaman (5 item per halaman), info jumlah zona.
*   **Tab Peta:**
    - **Peta Interaktif:** Titik-titik berwarna berdasarkan status kesehatan (Hijau: OK, Orange: Stagnan, Merah: Risiko/Rugi).
    - **Panel Wawasan Zona (Sidebar):** Klik zona menampilkan detail: ID, nama, kota, pendapatan, margin, rasio supply driver, progress bar utilisasi.
    - **Aksi Cepat:** Tombol "Ubah Jam Operasional" dan tombol "Berhenti Darurat" (destructive).
    - **Kontrol Peta:** Tombol fullscreen dan layer toggle.

#### Dialog Tambah Zona Baru
*   **Input Ekspansi:**
    - **Pilih Kota:** Dropdown: Malang | Surabaya | Batu.
    - **Area Ekspansi:** Map Draw Tool placeholder (untuk menggambar batas zona di peta).
*   **Proyeksi 30 Hari:**
    - Est. Permintaan: ~1.2k pesanan/hari.
    - Saran Driver: 45 unit.
    - Skor Risiko: Badge level (misal: RENDAH hijau).
*   **Estimasi BEP:** "Break-Even Point (BEP) tercapai dalam 14 hari operasi normal."
*   **Tombol Aksi:** "Simpan sebagai Draf" (outline) dan "Mulai Ekspansi" (primer).

#### Dialog Sistem Kontrol Risiko
*   **Analisis Dampak Potensial:** Estimasi kehilangan pendapatan harian, jumlah driver terdampak, pesanan terdampak per jam, badge tingkat risiko (KRITIS/TINGGI/SEDANG/RENDAH).
*   **Notifikasi Otomatis:** "Notifikasi push dikirimkan ke seluruh driver di zona terkait dalam 2 menit setelah konfirmasi."
*   **Aksi:** Tombol "Kembali" (outline) dan "Konfirmasi & Terapkan" (destructive merah).

### 💰 Manajemen Tarif ([master-admin/tariffs/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/master-admin/tariffs/page.tsx))

#### Tab: Tarif Aktif

##### Harga Layanan Inti
*   **Tarif Dasar (Per KM):** Input angka, default: Rp 2.500, tooltip: "Harga per kilometer, berlaku sebelum multiplikator zona."
*   **Tarif Minimum (Buka Pintu):** Input angka, default: Rp 12.000, tooltip: "Tarif minimum yang dikenakan per perjalanan."
*   **Biaya Tambahan:**
    - **Shift Malam (22:00 - 05:00):** Input persentase surcharge (misal: 15%).
    - **Pengali Lonjakan (Maks):** Input multiplier maksimal (misal: 2.5x).

##### Simulasi Dampak
*   **Estimasi Kenaikan Pendapatan Kotor:** Badge persentase kenaikan revenue (misal: +4.6%).
*   **Nilai Perjalanan Rata-rata:** Perbandingan Sebelum → Sesudah (misal: Rp 28.200 → Rp 29.500).
*   **Metrik Dampak Detail (5 Item):**
    - Dampak ke Pembayaran Driver (persentase perubahan).
    - Perubahan Take Rate Platform (persentase).
    - Estimasi Perubahan Margin (dalam Rupiah).
    - Zona Paling Terdampak (nama zona).
    - Estimasi Risiko Batal Meningkat (persentase).

##### Pembagian Biaya & Margin
*   **Biaya Platform (%):** Input persentase potongan platform (misal: 20%).
*   **Pembayaran Driver (%):** Input persentase pembayaran ke driver (misal: 80%).
*   **Margin Bersih per Perjalanan:** Kalkulasi otomatis (misal: Rp 3.650).

##### Pengaman / Peringatan Batas
*   **Peringatan Otomatis:** Notifikasi jika perubahan tarif melebihi ambang batas aman (default threshold: 10%).
*   **Estimasi Risiko Churn:** Persentase pengguna berpotensi berhenti.
*   **Estimasi Kenaikan Tingkat Batal:** Persentase kenaikan pembatalan.
*   **Ambang Batas Perubahan:** Input threshold kustom.

##### Tanggal Efektif & Penjadwalan
*   **Mode Aktivasi:** Dropdown: "Aktif Sekarang" (`now`) | "Jadwalkan" (`schedule`).
*   **Catatan Propagasi:** "Tarif berlaku dalam 15-30 menit setelah disimpan."
*   **Penjadwalan:** Input tanggal + waktu (muncul jika mode "Jadwalkan").
*   **Pratinjau:** Tombol preview efek sebelum diterapkan.

##### Status Propagasi
*   **Progress Sinkronisasi:** Progress bar + persentase (misal: 100%).
*   **Status Node:** Indikator sinkronisasi (misal: "5/5 zona tersinkronisasi").
*   **Timestamp Terakhir:** Waktu propagasi terakhir.
*   **Status Kegagalan:** Notifikasi jika ada node gagal sinkronisasi.

##### Penyesuaian Regional (Multiplikator)

###### Model Data Multiplikator Per Zona
*   **Atribut:** `zone` (nama zona), `multiplier` (misal: "1.2x"), `effective` (tarif efektif, misal: "Rp 3.000"), `margin` (persentase), `volume` (jumlah pesanan), `cancel` (persentase pembatalan), `override` (boolean), `overrideNote` (alasan override lokal).

###### Tabel & Filter
*   **Pencarian:** Search bar filter nama zona.
*   **Kolom Tabel:**
    - **Zona / Kota:** Nama zona + ikon ⚡ jika override lokal (tooltip menampilkan `overrideNote`).
    - **Pengali:** Input editable (misal: 1.2x).
    - **Tarif Efektif:** Tarif hasil kalkulasi (misal: Rp 3.000).
    - **Margin:** Persentase margin per zona.
    - **Volume Pesanan:** Jumlah pesanan di zona.
    - **Tkt Pembatalan:** Persentase pembatalan (font merah tebal jika >5%).
    - **Status:** Badge "Penyesuaian" (override lokal, oranye) atau "Global" (tarif standar, hijau).
*   **Data Contoh:**
    - Batu (Wisata): 1.2x, Rp 3.000, 18.2%, 1,240 pesanan, 4.8%, override: "tanjakan tinggi".
    - Malang Kota: 1.0x, Rp 2.500, 22.5%, 5,830 pesanan, 2.1%, global.
    - Surabaya Pusat: 1.0x, Rp 2.500, 24.1%, 8,420 pesanan, 1.9%, global.
    - Kepanjen: 1.1x, Rp 2.750, 16.8%, 780 pesanan, 6.3%, override: "subsidi akuisisi pasar".
    - Lahar Semeru (Zona Khusus): 1.5x, Rp 3.750, 12.4%, 320 pesanan, 8.1%, override: "medan ekstrem".
*   **Paginasi:** Navigasi halaman tabel.

#### Tab: Riwayat Versi

##### Model Data Riwayat Versi
*   **Atribut:** `v` (versi, misal: "v2.4.1"), `date` (tanggal), `user` (admin pembuat), `change` (deskripsi perubahan), `status`.
*   **Status:** Enum: `Aktif` | `Diarsipkan`.

##### Tabel & Aksi
*   **Kolom:** Versi, Tanggal, Penulis, Perubahan, Status (badge).
*   **Rollback:** Tombol per versi "Diarsipkan", dengan dialog konfirmasi menampilkan detail sebelum/sesudah.
*   **Data Contoh:**
    - v2.4.1 — 15 Jan 2024 — Admin Goldi — "Tarif dasar 2.4k -> 2.5k" — Aktif.
    - v2.4.0 — 01 Des 2023 — Admin Aulia — "Menambahkan biaya malam" — Diarsipkan.
    - v2.3.9 — 12 Nov 2023 — Admin Goldi — "Tarif min 10k -> 12k" — Diarsipkan.
    - v2.3.8 — 28 Okt 2023 — Admin Rafi — "Multiplikator Batu 1.0x -> 1.2x" — Diarsipkan.

#### Dialog Review & Terapkan Perubahan (2 Langkah)
*   **Langkah 1 — Ringkasan Perubahan:** Tabel perbandingan Sebelum → Sesudah untuk setiap parameter:
    - Tarif Dasar/KM: Rp 2.400 → Rp 2.500.
    - Tarif Minimum: Rp 10.000 → Rp 12.000.
    - Shift Malam: 10% → 15%.
    - Pengali Lonjakan Maks: 2.0x → 2.5x.
*   **Langkah 2 — Konfirmasi Akhir:**
    - Input wajib: Textarea alasan perubahan (min 5 karakter).
    - Peringatan: "Perubahan ini akan tercatat di audit log dan tidak dapat dibatalkan secara otomatis."
    - Tombol: "← Kembali" dan "✓ Terapkan Perubahan".

### 🛡️ Kontrol Akses Admin ([master-admin/roles/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/master-admin/roles/page.tsx))

#### Model Data Admin
*   **Atribut Utama:** `id` (ADM-xxx), `name`, `email`, `role`, `scope`, `scopeDetail` (nullable, nama wilayah), `mfa`, `status`, `lastLogin`, `lastAction`, `lastLoginIP`, `risk`, `createdAt`, `createdBy`, `passwordChanged`, `failedLogins`.
*   **Peran (Role):** Enum: `Master Admin` | `Operating Admin` (Admin Operasional) | `Reporting Admin` (Admin Pelaporan).
*   **Cakupan (Scope):** Enum: `Global` (🌐) | `Regional` (📍) | `Zone-Specific` (🧭 Spesifik Zona).
*   **Status MFA:** Enum: `Enabled` (✅ Aktif) | `Disabled` (❌ Nonaktif) | `Required` (⚠️ Wajib).
*   **Status Akun:** Enum: `Active` (Aktif) | `Suspended` (Ditangguhkan) | `Pending Approval` (Menunggu Persetujuan).
*   **Level Risiko:** Enum: `High` (Tinggi, badge merah) | `Medium` (Sedang, badge kuning) | `Low` (Rendah, badge hijau).

#### KPI Summary (5 Kartu)
*   **Total Admin Aktif:** Jumlah admin aktif / total admin (misal: "4 dari 6 admin"), subtitel: "dari {n} admin". Ikon: Users.
*   **Master Admin Aktif:** Jumlah Master Admin aktif (misal: 3), subtitel: "batas aman: 2". Ikon: ShieldCheck. Highlight merah jika melebihi batas.
*   **Kepatuhan MFA:** Persentase admin dengan MFA aktif (misal: 50%), subtitel: "{n} dari {total} admin". Ikon: Fingerprint.
*   **Ditangguhkan / Dikunci:** Jumlah admin tersuspend/terkunci (misal: 1), subtitel: "perlu perhatian". Ikon: Lock. Border merah.
*   **Peran Berubah (7H):** Jumlah perubahan peran 7 hari terakhir (misal: 3), subtitel: "Perubahan terakhir 2j lalu". Ikon: Activity.

#### Peringatan Risiko Keamanan (4 Alert)
*   **CRITICAL:** "3 Master Admin aktif — melebihi batas aman (maks. 2)." Ikon: ShieldAlert, warna merah.
*   **HIGH:** "Dev Internal (ADM-005): Master Admin tanpa MFA aktif." Ikon: AlertTriangle, warna oranye.
*   **HIGH:** "ADM-005 tidak login selama 65 hari (batas: 60 hari)." Ikon: Clock, warna oranye.
*   **MEDIUM:** "ADM-003 (Risma): MFA disabled, 2 failed login attempts." Ikon: KeyRound, warna kuning.

#### Tab: Admin

##### Filter & Pencarian
*   **Search Bar:** Pencarian berdasarkan nama atau email.
*   **Filter Role:** Dropdown: Semua | Master Admin | Operating Admin | Reporting Admin.
*   **Filter Status:** Dropdown: Semua | Active | Suspended | Pending Approval.

##### Tabel Daftar Admin
*   **Kolom Tabel:**
    - **Admin:** Avatar (inisial), nama, dan email.
    - **Peran:** Badge berwarna: Master Admin (merah `bg-red-100`), Admin Operasional (biru `bg-blue-100`), Admin Pelaporan (abu `bg-slate-100`).
    - **Cakupan:** Ikon scope (🌐 Globe/biru, 📍 MapPin/ungu, 🧭 Navigation/oranye) + detail wilayah jika ada.
    - **MFA:** Ikon status: ✅ CheckCircle2 hijau (Aktif), ❌ XCircle merah (Nonaktif), ⚠️ AlertTriangle kuning (Wajib).
    - **Status:** Badge: Aktif (hijau), Ditangguhkan (merah), Menunggu Persetujuan (kuning).
    - **Aktivitas Terakhir:** Waktu login terakhir + aksi terakhir yang dilakukan.
    - **Risiko:** Badge level: Tinggi (merah), Sedang (kuning), Rendah (hijau).
    - **Aksi:** Tombol "Detail" (membuka side drawer) + Dropdown menu.
*   **Dropdown Aksi per Admin:**
    - Ubah Peran (ikon Pencil).
    - Ubah Cakupan (ikon Globe).
    - Reset MFA (ikon RefreshCw).
    - Separator.
    - Tangguhkan (ikon Ban, destructive).
    - Nonaktifkan (ikon UserX, destructive).
*   **Paginasi:** Navigasi halaman tabel.
*   **Tombol Header:** "Akses Admin Baru" (ikon UserPlus, warna oranye).

#### Tab: Matriks Izin

##### Kapabilitas (5 Tipe)
*   `Lihat` (View) | `Ubah` (Edit) | `Setujui` (Approve) | `Ekspor` (Export) | `Hapus` (Delete).

##### Matriks Per Modul (8 Modul × 3 Peran)
| Modul | Master | Oper. | Pelap. |
|---|---|---|---|
| Analitik Dasbor | Lihat, Ekspor | Lihat | Lihat |
| Manajemen Driver | Lihat, Ubah, Suspend, Hapus | Lihat, Ubah, Suspend | Lihat |
| Manajemen Zona | Lihat, Ubah, Setujui, Hapus | Lihat, Ubah | Lihat |
| Manajemen Tarif | Lihat, Ubah, Setujui | — | Lihat |
| Pengaturan Global | Lihat, Ubah | — | — |
| Penutupan Darurat | Setujui | — | — |
| Ekspor Data | Lihat, Ekspor, Hapus | Lihat, Ekspor | Lihat, Ekspor |
| Manajemen Admin | Lihat, Ubah, Setujui, Hapus | — | — |

*   **Indikator Visual:** Ikon centang hijau (`CheckCircle2`) = diizinkan, silang abu (`XCircle`) = tidak diizinkan.

#### Tab: Log Aktivitas

##### Model Data Log Aktivitas
*   **Atribut:** `time`, `admin`, `action`, `target`, `ip`, `result`.
*   **Hasil:** Enum: `Berhasil` (badge hijau) | `Gagal` (badge merah).

##### Tabel
*   **Kolom:** Waktu (font mono), Admin, Aksi, Target, Alamat IP (font mono), Hasil (badge).
*   **Data Contoh:**
    - 13:42 — Aulia Rahmawati — Edit Role — "ADM-006 → Operating Admin" — 103.145.22.10 — Berhasil.
    - 11:30 — Dev Internal — Login Attempt — "-" — 10.0.0.1 — Gagal.
    - 10:15 — Aulia Rahmawati — Suspend Admin — "Dev Internal (ADM-005)" — 103.145.22.10 — Berhasil.
*   **Paginasi:** Navigasi halaman log.

#### Panel Detail Admin (Side Drawer / Overlay)
*   **Informasi Dasar:** ID Admin (font mono), dibuat oleh (nama admin/System), tanggal dibuat, badge tingkat risiko.
*   **Peran yang Ditugaskan:** Badge peran (warna sesuai role) + deskripsi akses + tombol "Ubah" (ikon Pencil).
*   **Scope Akses:** Ikon scope + detail cakupan (Global / Regional + nama wilayah / Zona + nama zona) + tombol "Ubah Cakupan Akses".
*   **Panel Keamanan:**
    - Status MFA: badge + ikon status.
    - Password terakhir diubah: durasi relatif (misal: "14 hari lalu").
    - Login terakhir IP: alamat IP (font mono).
    - Upaya login gagal: jumlah angka (highlight merah jika >3).
*   **Aksi Keamanan:** Tombol "Paksa Reset Kata Sandi" (ikon RefreshCw) dan "Paksa Pendaftaran Ulang MFA" (ikon RefreshCw).
*   **Zona Bahaya:** Tombol "Tangguhkan" (ikon Ban, destructive) dan "Nonaktifkan" (ikon UserX, destructive).

### 📜 Log Audit ([master-admin/audit/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/master-admin/audit/page.tsx))

#### Header
*   **Badge Akses Kritis:** Indikator animasi pulse merah yang menandakan level akses keamanan halaman.

#### Model Data Log Audit
*   **Atribut Utama:** `id` (AUD-xxxxx), `timestamp` (tanggal + waktu + timezone), `actor` (object: `{ name, role }`), `source`, `action`, `module`, `target`, `severity`, `result`, `correlationId` (CORR-xxx).
*   **Detail (nested object):** `ip`, `device` (OS/browser), `location` (kota + negara), `sessionId`, `changes` (nullable: `{ field, before, after }`).
*   **Sumber (Source):** Enum: `Web Console` (biru) | `API Client` (ungu) | `Internal Worker` (abu) | `Mobile App` (hijau).
*   **Aksi (Action):** Enum: `Edit Role` | `Approve Expansion` | `Export Data` | `Login Attempt` | `Suspend Driver` | dan lainnya.
*   **Modul:** Enum: `Admin Management` | `Zone Management` | `Analytics` | `Authentication` | `Driver Management`.
*   **Keparahan (Severity):** Enum: `Critical` (merah solid) | `High` (oranye) | `Medium` (kuning) | `Low` (abu).
*   **Hasil (Result):** Enum: `Success` (Berhasil, hijau) | `Failed` (Gagal, merah).

#### KPI Summary (5 Kartu)
*   **Total Peristiwa:** Jumlah total event (misal: 1,248), subtitel: "+12% vs kemarin". Ikon: Activity, warna biru.
*   **Peristiwa Kritis:** Jumlah event kritis (misal: 3), subtitel: "Membutuhkan review". Ikon: ShieldAlert, warna merah.
*   **Tingkat Keparahan Tinggi:** Jumlah event high (misal: 12), subtitel: "-5% vs kemarin". Ikon: AlertTriangle, warna oranye.
*   **Tindakan Gagal:** Jumlah tindakan gagal (misal: 8), subtitel: "Terdeteksi sistem". Ikon: XCircle, warna merah.
*   **Aktivitas Ekspor Log:** Jumlah ekspor (misal: 2), subtitel: "Oleh Risma & Goldi". Ikon: Download, warna ungu.

#### Peringatan Anomali (3 Alert)
*   **Role Change Surge (CRITICAL):** "5 perubahan role dalam 10 menit (Anomali terdeteksi)." Ikon: AlertTriangle.
*   **New IP Login (HIGH):** "Master Admin (Goldi) login dari IP baru: 180.242.11.44." Ikon: Globe.
*   **Security Cascade (CRITICAL):** "3 event Critical berturut-turut pada modul Authentication." Ikon: ShieldAlert.

#### Status Integritas Rantai Audit
*   **Verifikasi Hash:** Badge status "VALID" (hijau, dengan animasi pulse) atau "INVALID" (merah).
*   **Detail Teknis:**
    - Pemeriksaan integritas terakhir: timestamp.
    - Jenis enkripsi: RSA-4096 / SHA-256.
    - Node utama penyimpanan: nama node (misal: "Primary Node SG-1").
*   **Aksi:** Tombol "Verifikasi Integritas Log" (ikon RefreshCw).

#### Kebijakan Retensi
*   **Penyimpanan Aktif:** 365 Hari.
*   **Standar Arsip:** Terenkripsi AES-256.
*   **Akses Penghapusan:** "Log Baca-Saja" — log tidak dapat dihapus.

#### Filter & Pencarian
*   **Search Bar:** Pencarian berdasarkan Log ID, Aktor, atau Aksi.
*   **Filter Tingkat Keparahan:** Dropdown: Semua Tingkat | Kritis | Tinggi | Sedang | Rendah.
*   **Filter Modul:** Dropdown dinamis: Admin Management | Zone Management | Analytics | Authentication | Driver Management.
*   **Rentang Tanggal:** Tombol pemilih rentang tanggal (ikon Calendar).
*   **Manajemen Ekspor:** Tombol ekspor log audit (ikon Download).

#### Tabel Log Audit
*   **Kolom Tabel:**
    - **ID Log:** Kode unik (link biru, misal: AUD-88219).
    - **Stempel Waktu:** Waktu lengkap + timezone (misal: "2024-02-23 13:42:05 +07:00").
    - **Aktor:** Avatar (inisial), nama, dan role admin.
    - **Sumber:** Badge berwarna: Web Console (biru), API Client (ungu), Internal Worker (abu), Mobile App (hijau).
    - **Tindakan:** Jenis aksi yang dilakukan.
    - **Modul:** Nama modul sistem.
    - **Keparahan:** Badge level berwarna.
    - **Hasil:** Ikon + teks: ✓ Berhasil (hijau) atau ✗ Gagal (merah).
    - **Detail:** Tombol panah (ChevronRight) untuk membuka panel detail.
*   **Paginasi:** Navigasi halaman tabel.

#### Panel Detail Log (Side Drawer / Overlay)
*   **Header:** ID Log (font mono), badge modul, badge keparahan.
*   **Info Dasar:** Stempel waktu, hasil (badge), Correlation ID (font mono + tombol Share2).
*   **Metadata Aktor:** Avatar, nama, role, lokasi login (kota + negara), OS/User Agent (device).
*   **Detail Tindakan:** Badge aksi, field yang diubah, perbandingan visual SEBELUM (merah `line-through`) → SESUDAH (hijau `font-bold`).
*   **Sesi Terkait (Korelasi):** Timeline event terkait dalam sesi yang sama (misal: "Login Sistem → Navigasi ke Panel Admin → Edit Role → Eksekusi") dengan waktu dan ikon.
*   **Aksi Footer:** Tombol "Ekspor Entri" (ikon Save) dan "Lihat Siklus Hidup" (ikon ArrowRight).

### 🤝 Kebijakan Mitra ([master-admin/partners/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/master-admin/partners/page.tsx))

#### Header
*   **Judul:** "Kebijakan Mitra" dengan deskripsi "Kelola bagi hasil, standar kendaraan, dan persyaratan pengemudi secara global."
*   **Tombol:** "Publikasi Kebijakan Baru" (ikon Save, warna oranye).

#### KPI Summary (3 Kartu)
*   **Bagi Hasil Aplikasi:** Persentase komisi Cakli per transaksi (misal: 20%), subtitel: "Komisi Cakli per Transaksi". Ikon: Percent, bg oranye.
*   **Standar Armada EV:** Versi protokol pemeliharaan (misal: V5.2), subtitel: "Protokol Pemeliharaan Baterai". Ikon: CarFront, bg biru.
*   **Rating Minimal Mitra:** Ambang batas rating suspend otomatis (misal: 4.65), subtitel: "Ambang Batas Suspend Otomatis". Ikon: UserCheck, bg hijau.

#### Konfigurasi Bagi Hasil & Insentif
*   **Potongan Platform (%):** Input angka, default: 20.
*   **Pajak Pertambahan Nilai (%):** Input angka, default: 11.
*   **Skema Insentif Harian:**
    - Bonus Target 10 Order (Rp): Input angka, default: 25.000.
    - Bonus Target 15 Order (Rp): Input angka, default: 45.000.

#### Spesifikasi & Standar Kendaraan
*   **Usia Maksimal Kendaraan (Tahun):** Input angka, default: 5.
*   **Kapasitas Baterai Minimal (Ah):** Input angka, default: 60.
*   **Standard Operasional Kelistrikan (Info Panel):**
    - Wajib melakukan pemeriksaan daya setiap 30 hari.
    - Modifikasi motor penggerak tanpa izin akan mengakibatkan pemutusan kontrak.
    - GPS Tracker wajib dalam kondisi aktif 24/7.

#### Persyaratan Dokumen & Onboarding

##### Model Data Dokumen
*   **Atribut:** `name` (nama dokumen), `type` (jenis verifikasi), `expiry` (masa berlaku), `required` (wajib/opsional).

##### Tabel Dokumen
*   **Kolom:** Dokumen, Jenis Verifikasi (badge), Masa Berlaku, Wajib (badge WAJIB hijau), Aksi ("Ubah Aturan").
*   **Data Dokumen:**
    - KTP (Kartu Tanda Penduduk) — Verifikasi: OCR & Pencocokan — Masa Berlaku: Seumur Hidup — Wajib.
    - SIM (Surat Izin Mengemudi) — Verifikasi: Peninjauan Manual — Masa Berlaku: 5 Tahun — Wajib.
    - SKCK (Surat Keterangan Catatan Kepolisian) — Verifikasi: Peninjauan Manual — Masa Berlaku: 6 Bulan — Wajib.
    - Sertifikasi Safety Driving Cakli — Verifikasi: Sertifikat Digital — Masa Berlaku: 2 Tahun — Wajib.

#### Peringatan Kebijakan
*   **Desain:** Banner oranye dengan ikon AlertTriangle.
*   **Pesan:** "Perubahan pada bagi hasil akan berdampak langsung pada penghasilan harian ribuan mitra. Harap lakukan sosialisasi 3x24 jam sebelum kebijakan baru diterapkan secara otomatis oleh sistem."

---

## 🛠️ Admin Operasional
Admin Operasional mengelola aktivitas sehari-hari, hubungan driver, dan eskalasi dukungan pelanggan.

### 📊 Dashboard Operasional ([operation-admin/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/operation-admin/page.tsx))

#### Header
*   **Judul:** "Dashboard Operasional" dengan deskripsi "Overview of current system status and activities."
*   **Indikator Sistem:** Badge "System Normal" (hijau) dengan indikator ikon Activity dan timestamp "Last updated: Just now".

#### KPI Summary (4 Kartu)
*   **Active Orders:** Jumlah pesanan aktif saat ini (misal: 24), tren perubahan vs jam sebelumnya (misal: +2 from last hour).
*   **Drivers Online:** Jumlah driver online / total driver terdaftar (misal: 18/25), persentase ketersediaan armada (misal: 72% fleet availability).
*   **Active Complaints:** Jumlah keluhan aktif (highlight merah, misal: 3), tren perubahan vs kemarin (misal: +1 from yesterday).
*   **Daily Revenue:** Pendapatan harian (misal: Rp 2.4M), tren perubahan vs kemarin dalam persen (misal: +12% from yesterday).

#### Grafik Total Visitors
*   **Chart Interaktif:** Area chart menampilkan tren pengunjung/aktivitas.
*   **Pemilihan Rentang:** Toggle tab: "Last 3 months", "Last 30 days", "Last 7 days".

#### Tabel Live Orders
*   **Kolom Tabel:**
    - **Order ID:** Kode pesanan unik (misal: ORD-001).
    - **Customer:** Nama pelanggan.
    - **Status:** Badge status pesanan (Picking Up, In Transit, Assigning). Badge "Assigning" menggunakan variant secondary.
    - **Action:** Tombol "Details" per baris.

#### Sidebar: Quick Operations
*   **Broadcast:** Tombol aksi cepat untuk mengirim broadcast ke driver.
*   **Heatmap:** Tombol untuk membuka peta heatmap permintaan.

#### Sidebar: System Alerts
*   **Emergency Signal:** Alert merah — detail: nama driver yang memicu tombol PANIC (misal: Driver "Agus T."). Aksi: tombol "Call Driver" (destructive) dan "Track Now".
*   **High Demand Alert:** Alert oranye — detail: wilayah dengan lonjakan mendadak (misal: "Malang Kota"). Aksi: tombol "Adjust Payout".

#### Sidebar: Fleet Statistics
*   **In-Trip:** Jumlah driver sedang dalam perjalanan (🟢 hijau, misal: 12).
*   **Idle (Searching):** Jumlah driver diam menunggu order (🟡 kuning, misal: 6).
*   **Out-of-Service:** Jumlah driver tidak beroperasi (🔴 merah, misal: 2).

### 📉 Peta Operasional ([operation-admin/map/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/operation-admin/map/page.tsx))
*   **Mesin Spasial Real-Time:** Visualisasi peta interaktif untuk driver, pesanan aktif, dan permintaan.
*   **Manajemen Layer:** Toggle visibilitas untuk Driver, Pesanan, dan Heatmap Permintaan.
*   **Header Metrik Live:** Visibilitas real-time: Driver Aktif, Pesanan Live, Rata-rata ETA, Zona Permintaan Tinggi.
*   **Alert Cerdas:** Panel mengambang untuk masalah operasional mendesak (mis: driver terjebak, keterlambatan eskalasi).
*   **Panel Kontrol Terpadu:** Sidebar untuk pencarian ID driver/pesanan spesifik dan filter berdasarkan status (Available, On Trip, Idle).
*   **Tangkapan Snapshot:** Fungsi untuk mengekspor kondisi operasional saat ini sebagai laporan.

### 🚘 Manajemen Driver ([operation-admin/drivers/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/operation-admin/drivers/page.tsx))

#### Model Data Driver
*   **Atribut Utama:** `id` (DRV-xxx), `name`, `nik` (16 digit NIK), `status`, `onlineStatus`, `vehicle`, `phone`, `email`, `rating`, `totalOrders`, `cancelRate`, `joinDate`, `address`.
*   **Status Akun:** Enum: `Aktif` | `Pending Verifikasi` | `Suspend` | `Nonaktif`.
*   **Status Online:** Enum: `Online` | `Offline`.
*   **Dokumen:** Object: `{ ktp: boolean, sim: boolean, vehicle: boolean }`.
*   **Pelanggaran & Laporan:** `violations` (jumlah), `reports` (jumlah).
*   **Trip Aktif:** `currentTrip?: { id, status, customer, pickup, destination }`. Status trip: `On Trip` | `Assigned` | `Issue` | `Selesai` | `Batal`.
*   **Riwayat Suspend/Reaktivasi:** Array `{ date, reason, admin }[]`.

#### KPI Summary (5 Kartu)
*   **Total Driver:** Jumlah driver terdaftar (subtitel: "Registered drivers").
*   **Online:** Jumlah driver online saat ini (subtitel: "{n} total aktif").
*   **Pending:** Jumlah driver menunggu verifikasi (subtitel: "Menunggu verifikasi").
*   **Rating:** Rating rata-rata armada (subtitel: "Dari 2.5k ulasan").
*   **Cancel Rate:** Persentase pembatalan rata-rata (subtitel: "batas aman: 5%").

#### Filter & Pencarian
*   **Search Bar:** Pencarian berdasarkan nama, ID, NIK, atau kendaraan.
*   **Filter Status:** Dropdown: Semua Status | Aktif | Pending | Suspend | Nonaktif.
*   **Filter Online:** Dropdown: Semua | Online | Offline.

#### Tabel Driver
*   **Kolom Tabel:**
    - **Driver:** Avatar (inisial), nama, dan ID driver (font mono).
    - **Status:** Badge status akun (Aktif hijau, Pending kuning, Suspend merah, Nonaktif abu).
    - **Online:** Badge online/offline.
    - **Trip:** Badge status trip aktif (On Trip biru, Assigned ungu, Issue oranye) atau tanda `-` jika tidak ada trip.
    - **Kendaraan:** Ikon becak + nama unit kendaraan (misal: Becak Listrik A-01).
    - **Rating:** Ikon bintang + nilai rating (misal: 4.8).
    - **Order:** Total pesanan yang diselesaikan.
    - **Risiko:** Badge level risiko berdasarkan cancel rate (Tinggi >10%, Sedang >5%, Rendah ≤5%).
    - **Aksi:** Tombol detail file dan dropdown menu kontekstual.
*   **Dropdown Aksi per Driver:**
    - **Verifikasi Driver** (aktif hanya untuk status "Pending Verifikasi").
    - **Suspend Driver** (aktif hanya untuk status "Aktif").
    - **Aktifkan Kembali** (aktif hanya untuk status "Suspend").
*   **Paginasi:** Navigasi halaman tabel.

#### Dialog Tambah Driver Baru (Form Multi-Step / 5 Langkah)
*   **Langkah 1 — Pribadi:** Foto profil (JPG/PNG, maks 2MB), Nama Lengkap, NIK (16 digit), Tanggal Lahir, Jenis Kelamin (Laki-laki/Perempuan), Alamat Domisili Sesuai KTP.
*   **Langkah 2 — Kontak:** Nomor HP, Alamat Email, Kontak Darurat (nama & nomor).
*   **Langkah 3 — Dokumen:** Upload KTP (JPG/PNG, maks 5MB), SIM (JPG/PNG, maks 5MB), STNK / Foto Kendaraan (JPG/PNG, maks 5MB).
*   **Langkah 4 — Unit:** Nomor Plat Kendaraan, Model / Tipe Kendaraan, Tahun Kendaraan, Warna Kendaraan.
*   **Langkah 5 — Status:** Pilihan status awal: Pending Verifikasi (default) atau Aktif (khusus admin kewenangan).

#### Dialog Konfirmasi Tindakan
*   **Tipe Aksi:** Suspend Driver / Aktifkan Kembali / Verifikasi Driver.
*   **Input Wajib:** Textarea alasan tindakan (wajib diisi).
*   **Dampak:** Perubahan status driver, pencatatan di audit log.

#### Dialog Audit Log (Riwayat Tindakan)
*   **Atribut Log:** `id` (AUD-xxx), `action`, `admin`, `adminRole`, `timestamp`, `reason`, `details`.
*   **Tipe Aksi Tercatat:** Suspend Driver, Verifikasi Driver, Aktivasi Kembali, Edit Data Driver.
*   **Tampilan:** Card per log — ikon berwarna sesuai tipe aksi (merah: Suspend, oranye: Verifikasi, hijau: Aktivasi), detail, alasan, executor, timestamp.

### 📦 Manajemen Pesanan ([operation-admin/orders/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/operation-admin/orders/page.tsx))
*   **Pelacakan Pesanan Lanjutan:** Tampilan berbasis tab untuk semua status pesanan: Mencari, Assigned, On-Trip, Selesai, Batal, Issue.
*   **Suite Intervensi Operasional:**
    - **Reassign/Assign:** Pilih manual dan tugaskan driver ke pesanan pending atau bermasalah.
    - **Tandai Masalah:** Tandai pesanan untuk investigasi manual dengan alasan detail.
    - **Pembatalan Manual:** Hentikan pesanan dengan alasan kustom dan logging.
*   **Audit Log Pesanan Komprehensif:** Riwayat detail tindakan sistem dan admin untuk setiap pesanan individu.
*   **Analisis Keuangan & Rute:** Rincian tarif (Dasar, Layanan, Diskon) dan metrik rute (Jarak, ETA vs Realitas).
*   **Log Intervensi:** Jejak audit untuk pembatalan manual dan penyesuaian tarif manual.

### ⚠️ Keluhan & Sengketa ([operation-admin/complaints/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/operation-admin/complaints/page.tsx))

#### Model Data Keluhan
*   **Atribut Utama:** `id` (TKT-xxx), `type`, `subject`, `from`, `fromRole`, `fromContact` (phone, email), `to`, `toRole`, `toContact` (phone, email), `status`, `priority`, `tripId`, `date`, `detail`.
*   **Tipe Keluhan:** "Penumpang -> Pengemudi", "Pengemudi -> Penumpang", "Pengguna -> Aplikasi", "Pengemudi -> Aplikasi".
*   **Status:** Enum: `Baru` | `Sedang Diinvestigasi` | `Menunggu Konfirmasi` | `Dieskalasi` | `Selesai`.
*   **Prioritas:** Enum: `Tinggi` | `Sedang` | `Rendah`.
*   **Timeline:** Array `{ date, title, description, performedBy }[]`.
*   **Resolusi:** `{ action, notes, resolvedAt, resolvedBy, finalPriority }`.
*   **Eskalasi:** `{ target, reason, escalatedAt, escalatedBy, status (PENDING/RESOLVED/REJECTED), response? }`.

#### KPI Summary (6 Statistik)
*   **Baru:** Jumlah tiket berstatus "Baru".
*   **Sedang Diinvestigasi:** Jumlah tiket sedang diinvestigasi.
*   **Menunggu Konfirmasi:** Jumlah tiket menunggu konfirmasi.
*   **Dieskalasi:** Jumlah tiket yang dieskalasi.
*   **Selesai:** Jumlah tiket yang sudah selesai.
*   **Prioritas Tinggi (Aktif):** Jumlah tiket prioritas tinggi yang belum selesai.

#### Filter & Pencarian
*   **Search Bar:** Pencarian berdasarkan ID tiket, nama pelapor/terlapor, atau subjek.
*   **Filter Status:** Dropdown: Semua | Baru | Sedang Diinvestigasi | Menunggu Konfirmasi | Dieskalasi | Selesai.
*   **Filter Prioritas:** Dropdown: Semua | Tinggi | Sedang | Rendah.
*   **Filter Tipe:** Dropdown: Semua | Penumpang -> Pengemudi | Pengemudi -> Penumpang | Sistem.
*   **Filter Tanggal:** Dropdown: Semua | Hari Ini | Minggu Ini | Bulan Ini.

#### Tabel Keluhan
*   **Kolom Tabel:**
    - **ID Tiket:** Kode unik (TKT-xxx).
    - **Tipe:** Arah keluhan (Penumpang -> Pengemudi, dll.).
    - **Subjek:** Judul singkat keluhan.
    - **Dari / Ke:** Nama pelapor dan terlapor beserta role.
    - **Prioritas:** Badge berwarna (Tinggi merah, Sedang oranye, Rendah biru).
    - **Status:** Badge status berwarna (Baru ungu, Sedang Diinvestigasi biru, Menunggu Konfirmasi kuning, Dieskalasi oranye, Selesai hijau).
    - **Tanggal:** Tanggal dan waktu pelaporan.
    - **Aksi:** Dropdown menu (Tinjau & Resolusi, Hubungi Pelapor, Hubungi Terlapor, Eskalasi).
*   **Paginasi:** 8 item per halaman.

#### Dialog Tinjau & Resolusi
*   **Detail Keluhan:** Info lengkap (dari, ke, trip ID, tanggal, detail laporan, info kontak).
*   **Timeline Investigasi:** Riwayat kronologis tindakan pada tiket.
*   **Form Resolusi:**
    - **Tindakan:** Dropdown: Suspend Permanen | Suspend Sementara | Laporan Valid | Refund Diberikan | Peringatan Diberikan | Kompensasi | Ditolak.
    - **Catatan Resolusi:** Textarea untuk catatan admin.
    - **Prioritas Otomatis:** Prioritas berubah otomatis sesuai aksi (Suspend → Tinggi, Peringatan → Sedang, Ditolak → Rendah).
*   **Notifikasi Otomatis:** Notifikasi terkirim ke pelapor dan terlapor setelah resolusi.

#### Dialog Eskalasi
*   **Target Eskalasi:** Dropdown: Admin Utama | Tim Legal & Kepatuhan | Manajer Operasional | Tim Teknis.
*   **Alasan Eskalasi:** Textarea alasan eskalasi.

#### Dialog Kontak
*   **Info Kontak:** Nomor HP dan email pelapor/terlapor.
*   **Aksi:** Tombol "Tandai Sudah Dihubungi".

#### Dialog Audit Log
*   **Atribut Log:** `id`, `ticketId`, `action`, `performedBy`, `timestamp`, `details`, `date`.
*   **Tipe Aksi Tercatat:** VIEW_DETAIL, VIEW_CONTACT, OPEN_ESCALATION, CONTACT_MADE, RESOLUTION_MADE, ESCALATION_MADE, NOTIFICATION_SENT.
*   **Pengelompokan:** Log dikelompokkan berdasarkan tanggal (Hari Ini / Kemarin / Tanggal lengkap).

### 🕵️ Pemantauan Aktivitas Pengemudi ([operation-admin/activity/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/operation-admin/activity/page.tsx))

#### Model Data Aktivitas Driver
*   **Atribut Utama:** `id` (DRV-xxx), `name`, `issue`, `location`, `duration`, `status`, `lastOnline`, `lastTrip`, `cancelRate`, `acceptanceRate`.
*   **Status:** Enum: `Peringatan` | `Kritis` | `Info` | `Dipantau` | `Diselidiki`.

#### Referensi Batas Deteksi
*   **Batas Diam:** 15 menit.
*   **Batas Pembatalan:** 3 per jam.

#### KPI Summary (3 Kartu)
*   **Pengemudi Diam:** Jumlah driver dengan pola "diam" (ikon Clock biru, subtitel: "{n} pengemudi perlu perhatian").
*   **Tingkat Batal Tinggi:** Jumlah driver dengan pola "pembatalan" (ikon AlertTriangle oranye, subtitel: "Membutuhkan evaluasi").
*   **Offline Terbaru:** Jumlah driver offline mendadak (ikon UserX merah, subtitel: "Dalam 30 menit terakhir").

#### Tabel Peringatan Tidak Aktif & Pola
*   **Pencarian:** Search bar untuk mencari berdasarkan nama driver, ID, masalah, atau lokasi.
*   **Kolom Tabel:**
    - **Pengemudi:** Avatar (inisial), nama, dan ID driver.
    - **Pola Masalah:** Jenis masalah terdeteksi (Diam > X menit, Pembatalan Sering, Offline Mendadak, Pembatalan Tinggi).
    - **Lokasi Terakhir:** Nama lokasi (misal: Suhat, Ijen, Dinoyo, Sawojajar).
    - **Durasi/Jumlah:** Lama diam (misal: 32m) atau jumlah pembatalan (misal: 4 perjalanan).
    - **Status:** Badge berwarna (Kritis merah, Peringatan oranye, Dipantau biru, Diselidiki teal, Info abu).
    - **Aksi:** Tombol kontekstual per status: "Pantau" (Info), "Peringatan" (Peringatan), "Selidiki" (Kritis).
*   **Paginasi:** 8 item per halaman.

#### Dialog Pantau
*   **Info Detail:** Online Terakhir, Penerimaan (acceptance rate).
*   **Riwayat Terbaru (2 jam):** Perjalanan terakhir, pola aktivitas (Konsisten/Fluktuatif).
*   **Aksi:** Tombol "Terus Pantau" (ubah status ke Dipantau) dan "Hubungi" (catat log kontak).

#### Dialog Kirim Peringatan
*   **Info Driver:** Avatar, nama, ID, deteksi masalah, lokasi.
*   **Alur Setelah Kirim:** 4 langkah (Pesan terkirim → Status berubah ke Dipantau → Pantau respons 5-10 menit → Eskalasi jika tidak ada respons).
*   **Editor Pesan:** Textarea dengan pesan template otomatis (dapat diedit).
*   **Eskalasi Langsung:** Tombol "Tingkatkan Level Deteksi ke Kritis" (ubah status langsung ke Kritis).

#### Dialog Selidiki
*   **Informasi Risiko:** Tingkat Batal, Penerimaan, Pola, Area Jemput.
*   **Linimasa Insiden (60 menit terakhir):** Kronologi timeline event (misal: 3 Pembatalan Beruntun → Notifikasi Otomatis).
*   **Aksi Investigasi:**
    - **Kirim Peringatan Keras:** Ubah status ke Peringatan.
    - **Tandai untuk Suspend:** Ubah status ke Kritis + notifikasi ke supervisor.
    - **Hubungi Langsung:** Catat log kontak.

#### Dialog Audit Log
*   **Atribut Log:** `id`, `admin`, `timestamp`, `action`, `driver`.
*   **Tampilan:** Card per log: ikon Activity, detail aksi, nama driver, executor, timestamp.

### 👥 Moderasi Pengguna ([operation-admin/users/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/operation-admin/users/page.tsx))

#### Model Data Pengguna
*   **Atribut Utama:** `id` (USR-xxx), `name`, `email`, `phone`, `status`, `joinedDate`, `totalOrders`, `totalCancel`, `cancelRate`, `totalReports`, `rating`.
*   **Status Akun:** Enum: `Active` | `Suspended` | `Under Review`.
*   **Riwayat Pesanan:** Array `{ id (ORD-xxx), date, status, amount }[]`. Status pesanan: `selesai` | `batal` | `on-trip` | `menunggu driver` | `assigned` | `issue`.
*   **Riwayat Laporan:** Array `{ reportedBy, type, description, date, status }[]`. Status laporan: `Resolved` | `Investigating` | `Pending`.
*   **Riwayat Status:** Array `{ date, action, reason, admin, duration? }[]`.
*   **Audit Log:** Array `{ id, timestamp, userId, userName, action, before, after, reason, admin }[]`.

#### Filter & Pencarian
*   **Search Bar:** Pencarian berdasarkan nama, email, atau nomor telepon.
*   **Filter Status:** Dropdown: All Status | Active | Suspended | Under Review.
*   **Filter Risiko:** Dropdown: All Activity | Cancel Rate > 30% | High Reports (> 3).

#### Tabel Pengguna
*   **Kolom Tabel:**
    - **User Profile:** Avatar (inisial), nama, dan email.
    - **Joined Date:** Tanggal bergabung.
    - **Orders:** Total pesanan.
    - **Cancel Rate:** Persentase pembatalan (highlight oranye jika >30%).
    - **Reports:** Jumlah laporan (highlight oranye jika >0).
    - **Status:** Badge status (Active hijau, Suspended merah, Under Review oranye).
    - **Actions:** Dropdown menu (View Profile, Suspend Account / Activate Profile).
*   **Paginasi:** 10 item per halaman.

#### Dialog Detail Profil Pengguna
*   **Info Dasar:** Avatar, nama, email, telepon, status, tanggal bergabung, rating.
*   **Tab Riwayat Pesanan:** Tabel: ID Pesanan, Tanggal, Status (badge), Jumlah.
*   **Tab Riwayat Laporan:** Tabel: Pelapor, Tipe, Deskripsi, Tanggal, Status.
*   **Tab Riwayat Status:** Timeline perubahan status (aksi, alasan, admin, durasi suspend).
*   **Tab Audit Log:** Log detail (aksi, sebelum → sesudah, alasan, admin).

#### Dialog Suspend Akun
*   **Tipe Suspend:** Toggle: Temporary | Permanent.
*   **Durasi (jika Temporary):** Dropdown: 24 Jam | 3 Hari | 7 Hari (Default) | 30 Hari.
*   **Alasan Suspend:** Textarea wajib diisi.
*   **Dampak:** Perubahan status ke Suspended, pencatatan di audit log dan status history.

#### Dialog Audit Log Global
*   **Atribut Log:** `id`, `timestamp`, `userId`, `userName`, `action`, `before`, `after`, `reason`, `admin`.
*   **Sumber Data:** Gabungan (flatten) dari audit log seluruh pengguna.
*   **Paginasi:** 10 item per halaman.
*   **Aksi Header:** Tombol "Export Database".

---

## 📊 Admin Pelaporan
Admin Pelaporan berfokus pada analisis data, inteligensi bisnis, dan pelaporan performa.

### 📔 Ikhtisar Bisnis ([reporting-admin/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/reporting-admin/page.tsx))

#### Header
*   **Judul:** "Ikhtisar Bisnis" dengan deskripsi "Metrik performa waktu-nyata dan pemeriksaan kesehatan bisnis."
*   **Pemilih Rentang Tanggal:** Date range picker dengan kalender 2 bulan.
*   **Tombol Unduh:** Ikon download untuk ekspor data.

#### KPI Summary (4 Kartu)
*   **Total Pesanan:** Jumlah total pesanan (misal: 2,350), tren vs minggu lalu (misal: +12%).
*   **Total Pendapatan:** Pendapatan total (misal: Rp 45.2M), tren vs minggu lalu (misal: +8%).
*   **Pengemudi Aktif:** Jumlah driver sedang online (misal: 145), subtitel "Sedang online".
*   **Tingkat Penyelesaian:** Persentase pesanan selesai (misal: 94.2%), komplemen pembatalan (misal: 5.8% Dibatalkan).

#### Grafik Tren Pesanan
*   **Tipe:** Area chart (gradient biru).
*   **Data:** Volume pesanan per jam (data hourly: 06:00 - 22:00), termasuk `orders` dan `revenue` per jam.
*   **Ukuran:** Lebar 4/7 kolom grid.

#### Sidebar: Jam Sibuk (Peak Hours)
*   **Daftar 3 Slot Waktu:** Setiap entry menampilkan rentang jam dan badge level:
    - 17:00 - 19:00 → Badge "Tertinggi".
    - 11:00 - 13:00 → Badge "Tinggi".
    - 07:00 - 09:00 → Badge "Sedang".

#### Sidebar: Area Teratas
*   **Daftar Wilayah:** Setiap entry menampilkan nama area, persentase permintaan, dan progress bar visual:
    - Malang Kota: 45% (progress bar).
    - Lowokwaru: 30% (progress bar).

#### Tabel Aktivitas Terbaru
*   **Header:** Judul + tombol link "Lihat Semua Riwayat" (navigasi ke `/reporting-admin/history`).
*   **Kolom Tabel:**
    - **ID Pesanan:** Kode unik (ORD-9001, dst.) dengan font mono.
    - **Waktu:** Jam transaksi (misal: 10:23).
    - **Area:** Wilayah operasional (Malang Kota, Lowokwaru, Sukun, Batu).
    - **Jumlah:** Nominal tarif (misal: Rp 24.000).
    - **Status:** Badge (Completed default, Cancelled destructive).

### 🚗 Wawasan Performa Driver ([reporting-admin/drivers/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/reporting-admin/drivers/page.tsx))

#### Header
*   **Judul:** "Driver Performance Insight" dengan deskripsi "Comprehensive analysis of fleet efficiency and service quality."

#### KPI Summary (3 Kartu)
*   **Avg. Driver Rating:** Rating rata-rata (misal: 4.72 / 5.0), tren vs bulan lalu (misal: +0.2). Ikon: Star (oranye, filled).
*   **Global Cancel Rate:** Persentase pembatalan global (misal: 4.2%), subtitel tren (misal: "Decreasing vs last week", warna hijau). Ikon: TrendingDown (merah).
*   **Active Fleet Size:** Jumlah armada aktif (misal: 285), subtitel driver baru (misal: "12 new drivers onboarded"). Ikon: Truck (biru).

#### Grafik Top Drivers by Order Fulfillment
*   **Tipe:** Bar chart (Recharts).
*   **Data:** Volume pesanan per driver teratas (Ahmad: 154, Slamet: 132, Eko: 98, Bambang: 85, Suprapto: 72).
*   **Warna:** Bar pertama `#E04D04` (cakli-orange), lainnya `#f97316`.
*   **Ukuran:** 4/7 kolom grid.

#### Sidebar: Peringkat Driver
*   **Top 3 Driver:** Tampilan setiap driver: Avatar, nama, rating (bintang), jumlah pesanan.
*   **Badge Rank 1:** Ikon Award (kuning, filled) pada driver peringkat pertama.
*   **Ukuran:** 3/7 kolom grid.

#### Model Data Driver Stats
*   **Atribut:** `name`, `orders` (jumlah pesanan), `rating` (skala 5), `cancelRate` (persentase pembatalan), `status`, `avatar` (inisial).
*   **Status:** Enum: `Top Performer` (badge default) | `Stable` (badge secondary) | `Needs Review` (badge outline) | `Warning` (badge destructive).

#### Tabel Performa Komprehensif
*   **Pencarian:** Search bar filter driver.
*   **Kolom Tabel:**
    - **Driver Name:** Nama driver (font medium).
    - **Total Orders:** Jumlah pesanan selesai.
    - **Rating:** Ikon bintang + angka rating.
    - **Cancel Rate:** Persentase pembatalan (hijau jika <5%, merah jika ≥5%).
    - **Status Label:** Badge status (Top Performer / Stable / Needs Review / Warning).
    - **Efficiency:** Tren (↑ hijau atau ↓ merah) + persentase efisiensi `(orders/160)*100` (font mono).

### 🗄️ Pusat Laporan ([reporting-admin/reports/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/reporting-admin/reports/page.tsx))

#### Navigasi Dashboard Laporan (4 Kartu Link)
*   **Order History:** Link ke `/reporting-admin/history`. Deskripsi: "Complete audit log of all orders with status and details."
*   **Revenue Report:** Link ke `/reporting-admin/reports/revenue`. Deskripsi: "Financial breakdown, income sources, and transaction logs."
*   **Driver Performance:** Link ke `/reporting-admin/reports/driver-performance`. Deskripsi: "Driver metrics, ratings, completion rates, and earnings."
*   **Cancellation Analysis:** Link ke `/reporting-admin/reports/cancellation`. Deskripsi: "Analysis of cancelled orders, reasons, and penalties."

### 💵 Kokpit Keuangan / Laporan Pendapatan ([reporting-admin/reports/revenue/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/reporting-admin/reports/revenue/page.tsx))

#### Header
*   **Judul:** "Kokpit Keuangan" dengan deskripsi "Panel kendali ekonomi menyeluruh: Pendapatan, Pencairan, dan Penyesuaian."
*   **Pemilih Periode:** Toggle: Harian | Mingguan (default aktif) | Bulanan.
*   **Tombol Ekspor Data:** Dropdown format: Buku Besar Bulanan (.xlsx) | Laporan Pencairan (.pdf).

#### Model Data Transaksi
*   **Atribut:** `id` (REV-2024-xxx), `date`, `source` (sumber pendapatan), `amount` (dalam Rupiah), `area`, `status`, `type`.
*   **Source:** Enum: `Komisi Order` | `Biaya Layanan App` | `Insentif Mitra` | `Langganan` | `Refund Pelanggan`.
*   **Status:** Enum: `Settled` | `Dibayarkan` | `Disesuaikan`.
*   **Type:** Enum: `Credit` (masuk) | `Debit` (keluar).

#### Tab: Ringkasan (Overview)

##### KPI Summary (4 Kartu)
*   **Total Pendapatan Kotor:** Nominal (misal: Rp 45.231.000), tren vs bulan lalu (misal: +20.1%). Ikon: DollarSign.
*   **Pendapatan Bersih:** Nominal (misal: Rp 12.450.000), subtitel: "Setelah insentif & promo". Ikon: TrendingUp, warna hijau.
*   **Pembayaran ke Mitra:** Nominal (misal: Rp 28.500.000), subtitel: "78% dari order selesai". Ikon: Wallet.
*   **Bakar Uang Promo:** Nominal (misal: Rp 4.281.000), subtitel persentase dari kotor (misal: "9.4% dari Pendapatan Kotor"). Ikon: AlertCircle, warna merah.

##### Grafik Tren Pendapatan
*   **Tipe:** Line chart (Recharts), dual line.
*   **Data Harian:** 7 hari (Sen-Min), data: `gross` (pendapatan kotor) dan `net` (pendapatan bersih).
*   **Line 1:** Kotor — warna ungu (`#8884d8`).
*   **Line 2:** Bersih — warna hijau (`#82ca9d`).
*   **Ukuran:** 4/7 kolom grid.

##### Sidebar: Sumber Pendapatan (Distribusi)
*   **Komisi CakliBike:** 65% (Rp 8.1M) — progress bar primary.
*   **Komisi CakliKirim:** 25% (Rp 3.1M) — progress bar biru.
*   **Biaya Platform:** 10% (Rp 1.2M) — progress bar oranye.
*   **Ukuran:** 3/7 kolom grid.

#### Tab: Rincian & Layanan (Breakdown)

##### Tabel Performa Regional
*   **Kolom:** Wilayah/Kota, Total Order, Pendapatan Kotor, Pendapatan Bersih, Penggunaan Promo.
*   **Data:**
    - Malang Kota: 1,250 order, Rp 18.500.000 kotor, Rp 5.200.000 bersih, Rp 1.2M (TINGGI, merah).
    - Lowokwaru: 980, Rp 12.100.000, Rp 3.800.000, Rp 800K.
    - Sukun: 850, Rp 9.500.000, Rp 2.100.000, Rp 400K.
    - Batu: 420, Rp 5.131.000, Rp 1.350.000, Rp 1.8M (Ekspansi).

#### Tab: Pencairan Mitra (Settlement)

##### KPI Pencairan (2 Kartu)
*   **Menunggu Pencairan:** Nominal (misal: Rp 4.500.000), subtitel: "Akan diproses hari ini". Tombol: "Proses Batch".
*   **Telah Dicairkan (Minggu Ini):** Nominal (misal: Rp 12.850.000), subtitel: "Berhasil ditransfer", warna hijau.

##### Tabel Riwayat Pencairan
*   **Kolom:** ID Batch (font mono, misal: BATCH-9921), Tanggal, Jlh Mitra, Total Jumlah, Status (badge).
*   **Data:**
    - BATCH-9921 — 2024-02-09 — 45 Mitra — Rp 3.200.000 — Diproses.
    - BATCH-9920 — 2024-02-08 — 120 Mitra — Rp 9.650.000 — Diproses.

#### Tab: Refund & Penyesuaian (Adjustments)

##### Filter & Pencarian
*   **Search Bar:** Cari ID Transaksi.
*   **Filter Tipe:** Dropdown: Semua Tipe | Kredit (Masuk) | Debit (Keluar).

##### Tabel Audit Log Keuangan
*   **Kolom:** ID Transaksi (font mono), Tanggal, Tipe (badge Kredit/Debit), Deskripsi, Area, Jumlah (hijau +/merah -), Status (badge).
*   **Data Contoh:**
    - REV-2024-001 — Komisi Order — Rp 450.000 — Malang Kota — Settled — Credit.
    - REV-2024-003 — Insentif Mitra — Rp 150.000 — Sukun — Dibayarkan — Debit.
    - REV-2024-005 — Refund Pelanggan — Rp 45.000 — Blimbing — Disesuaikan — Debit.

### 📊 Wawasan Kinerja Pengemudi / Laporan ([reporting-admin/reports/driver-performance/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/reporting-admin/reports/driver-performance/page.tsx))

#### Header
*   **Judul:** "Wawasan Kinerja Pengemudi" dengan deskripsi "Analisis metrik pengemudi, penilaian, pembatalan, dan tingkat aktivitas."
*   **Tombol Ekspor Laporan:** Dropdown: Rincian (.xlsx) | Ringkasan (.pdf).

#### KPI Summary (4 Kartu)
*   **Performa Terbaik:** Nama driver terbaik (misal: "Joko Wow"), subtitel pesanan bulan ini (misal: "145 Pesanan bulan ini"). Ikon: Trophy (kuning).
*   **Rata-rata Penilaian:** Rating rata-rata (misal: 4.72), subtitel: "Berdasarkan 500+ ulasan". Ikon: Star (kuning, filled).
*   **Rata-rata Penyelesaian:** Persentase (misal: 94.5%), subtitel: "Target Operasional: 95%". Ikon: CheckCircle2 (hijau).
*   **Tingkat Pembatalan Tinggi:** Jumlah driver (misal: 12 Pengemudi), subtitel: "> 10% Tingkat Pembatalan". Ikon: XCircle (merah).

#### Filter & Pencarian
*   **Search Bar:** Cari Nama atau ID Pengemudi.
*   **Filter Tanggal:** Input date picker.
*   **Filter Area:** Dropdown: Semua Area | Malang Kota | Lowokwaru | Sukun | Blimbing.
*   **Tombol Filter:** Ikon filter tambahan.

#### Model Data Driver (Report)
*   **Atribut:** `id` (DRV-xxxx), `name`, `area`, `orders` (pesanan), `completion` (persentase penyelesaian), `rating` (skala 5), `status`, `cancelRate` (persentase pembatalan).
*   **Status:** Enum: `Aktif` (badge default) | `Peringatan` (badge destructive).

#### Tabel Metrik Pengemudi
*   **Kolom:**
    - **Pengemudi:** Avatar (inisial) + nama + ID (font mono kecil).
    - **Area:** Wilayah operasional.
    - **Pesanan:** Jumlah pesanan.
    - **Penyelesaian:** ikon ✅ (>90%) atau ❌ (<90%) + persentase.
    - **Tingkat Pembatalan:** Persentase (font merah).
    - **Penilaian:** Ikon bintang + angka rating.
    - **Status:** Badge (Aktif / Peringatan).
*   **Paginasi:** Navigasi halaman (5 halaman).

### ❌ Analisis Pembatalan ([reporting-admin/reports/cancellation/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/reporting-admin/reports/cancellation/page.tsx))

#### Header
*   **Judul:** "Analisis Pembatalan" dengan deskripsi "Tinjau pesanan yang dibatalkan dan alasannya."
*   **Tombol Ekspor Laporan:** Dropdown: Excel (.xlsx) | PDF (.pdf).

#### Filter & Pencarian
*   **Search Bar:** Cari ID Pesanan.
*   **Filter Tanggal:** Input date picker.
*   **Filter Area:** Dropdown: Semua Area | Malang Kota | Lowokwaru | Sukun | Blimbing.
*   **Tombol Filter:** Ikon filter tambahan.

#### KPI Summary (3 Kartu)
*   **Tingkat Pembatalan:** Persentase (misal: 4.2%), tren vs minggu lalu (misal: +0.5%), warna destructive. Ikon: AlertCircle.
*   **Pembatalan oleh Pengemudi:** Persentase (misal: 1.8%), subtitel alasan utama (misal: "Masalah Kendaraan"). Ikon: AlertCircle.
*   **Pembatalan oleh Pelanggan:** Persentase (misal: 2.4%), subtitel alasan utama (misal: "Pengemudi terlalu jauh"). Ikon: AlertCircle.

#### Model Data Pembatalan
*   **Atribut:** `id` (ORD-xxxx), `date`, `reason` (alasan pembatalan), `type`, `penalty` (denda), `area`.
*   **Tipe Pembatalan:** Enum: `Dibatalkan Pelanggan` | `Dibatalkan Pengemudi` | `Sistem Habis Waktu`.
*   **Denda:** "Tidak" | nominal Rupiah (misal: "Rp 2.000").

#### Tabel Log Pesanan Dibatalkan
*   **Kolom:**
    - **ID Pesanan:** Kode unik (font mono).
    - **Tanggal:** Tanggal pembatalan.
    - **Alasan:** Deskripsi alasan.
    - **Tipe:** Badge tipe pembatalan (outline).
    - **Area:** Wilayah.
    - **Denda:** Nominal denda (font destructive merah).
*   **Paginasi:** Navigasi halaman (5 halaman).

### 🕒 Riwayat Transaksi ([reporting-admin/history/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/reporting-admin/history/page.tsx))

#### Header
*   **Judul:** "Order History & Reports" dengan deskripsi "Comprehensive log of all orders with reporting capabilities."
*   **Tombol Ekspor Riwayat:** Dropdown format: Excel (.xlsx) | PDF (.pdf).

#### Filter & Pencarian
*   **Search Bar:** Pencarian berdasarkan ID pesanan atau nama pelanggan.
*   **Filter Tanggal:** Input date picker.
*   **Filter Area:** Dropdown: All Areas | Malang Kota | Lowokwaru | Sukun | Batu.
*   **Filter Status:** Dropdown: All Status | Completed | Cancelled | Refunded.
*   **Tombol Aksi:** Tombol sort (ArrowUpDown) dan tombol filter tambahan.

#### Tabel Riwayat Pesanan
*   **Kolom Tabel:**
    - **Order ID:** Kode pesanan (font mono, misal: ORD-8921).
    - **Date & Time:** Tanggal dan jam pesanan (misal: 2024-02-09 08:30).
    - **Customer:** Nama pelanggan (font medium).
    - **Driver:** Nama driver.
    - **Amount:** Nominal tarif (font semibold, misal: Rp 24.000).
    - **Status:** Badge (Completed default, Cancelled destructive).
    - **View:** Tombol mata (eye) untuk membuka dialog detail.
*   **Paginasi:** Navigasi halaman (5 halaman).

#### Dialog Detail Pesanan
*   **Header:** "Order Details - {Order ID}" dengan deskripsi "Full transactional audit."
*   **Info Pengguna & Driver:** Nama pelanggan dan nama driver.
*   **Rute Perjalanan:** Pickup Location (titik biru) dan Drop-off Location (titik merah).
*   **Keuangan:** Total Fare (font besar, warna primer) dan Status (badge).
*   **Detail Tambahan (Panel Abu):** Distance (km), Duration (menit), Payment method (CakliWallet).

### 📉 Analitik Lintas Area ([reporting-admin/analytics/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/reporting-admin/analytics/page.tsx))

#### Header
*   **Judul:** "Analitik Lintas Area" dengan deskripsi "Metrik performa komparatif di seluruh wilayah operasional."
*   **Tab Periode:** Toggle: Harian | Mingguan | Bulanan | Tahunan.
*   **Filter Wilayah:** Dropdown: Semua Wilayah | Hanya Aktif | Pertumbuhan Tinggi.
*   **Tombol Ekspor Laporan:** Ekspor laporan lintas area.

#### KPI Perbandingan (3 Kartu)
*   **Kota Pendapatan Tertinggi:** Nama kota (misal: Surabaya) dengan ikon tren naik hijau, subtitel kontribusi pendapatan (misal: 68% dari total).
*   **Tingkat Pembatalan Terendah:** Nama kota (misal: Batu) dengan badge persentase hijau (misal: 2.1%), subtitel skor kepuasan (misal: 4.9/5).
*   **Pertumbuhan Tercepat:** Nama kota (misal: Sidoarjo) dengan ikon tren naik biru, subtitel metrik pertumbuhan (misal: +5.8% MoM Akuisisi Pengguna Baru).

#### Grafik Pendapatan vs Volume Pesanan
*   **Tipe:** Bar chart dengan dual Y-axis.
*   **Data Per Kota:** `city`, `orders`, `revenue`, `cancelRate` untuk: Malang, Surabaya, Batu, Sidoarjo.
*   **Bar 1:** Pendapatan (juta) — sumbu kiri, warna ungu (`#8884d8`).
*   **Bar 2:** Pesanan — sumbu kanan, warna hijau (`#82ca9d`).

#### Grafik Analisis Tingkat Pembatalan
*   **Tipe:** Horizontal bar chart.
*   **Data:** `cancelRate` per kota (Malang 4.2%, Surabaya 6.8%, Batu 2.1%, Sidoarjo 5.5%).
*   **Warna Bar:** Merah (`#ef4444`).

#### Wawasan Strategi Ekspansi (Kartu AI)
*   **Desain:** Card gradient biru ke indigo.
*   **Target Utama:** Nama kota rekomendasi (misal: Gresik), alasan (limpahan permintaan dari Surabaya Barat), estimasi penguasaan pasar (15% dalam 3 bulan).
*   **Butuh Optimasi:** Nama kota (misal: Surabaya Timur), masalah (tingkat pembatalan 6.8% menunjukkan kekurangan driver), rekomendasi (peningkatan insentif 5% di zona timur).
