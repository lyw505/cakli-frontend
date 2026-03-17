# Admin Panel Feature Mapping

This document provides a comprehensive structured catalog of features and functionalities across the three primary admin roles in the Cakli platform.

---

## 🔑 Master Admin
Master Admin memiliki kontrol sistem global, berfokus pada konfigurasi, manajemen kebijakan tingkat tinggi, dan keamanan seluruh sistem.

### 📊 Kontrol Sistem Global / Dashboard ([master-admin/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/master-admin/page.tsx))

#### Header
*   **Judul:** "Kontrol Sistem Global" dengan deskripsi "Data terkonsolidasi tingkat tinggi dan perbandingan regional."

#### KPI Summary (4 Kartu)
*   **Total Pendapatan Regional:** Nominal total transaksi kotor, tren vs bulan lalu, tooltip: "Nilai total transaksi kotor sebelum pemotongan biaya." Ikon: Globe.
*   **Tingkat Pertumbuhan Pesanan:** Persentase pertumbuhan MoM, subtitel perbandingan bulan. Ikon: TrendingUp.
*   **Margin Keuntungan Regional:** Persentase margin rata-rata, subtitel konteks. Ikon: DollarSign.
*   **Tingkat Uptime Sistem:** Persentase uptime, subtitel. Ikon: Activity.

#### Grafik Perbandingan Performa Regional
*   **Tipe:** Area chart (multi-line, area terisi gradient).
*   **Data Bulanan:** 6 bulan data, data per kota meliputi volume/pendapatan/dll.
*   **Kota Tersedia (Multi-Select Popover):** Daftar kota operasional (multi-select).
*   **Default Terpilih:** Beberapa kota utama.
*   **Filter Aspek (Dropdown):** Pendapatan, Volume Pesanan, Tingkat Pembatalan, Margin per Area.

#### Sidebar: Peringatan Konfigurasi
*   **Desain:** Card warning dengan ikon AlertTriangle.
*   **Detail:** Pesan peringatan terkait konfigurasi yang perlu diverifikasi.
*   **Aksi:** Link navigasi ke halaman Konfigurasi Tarif (`/master-admin/tariffs`).

#### Sidebar: Indikator Risiko (3 Item)
*   **Bendera Kecurigaan Fraud:** Card — detail transaksi mencurigakan. Badge jumlah. Ikon: Flag.
*   **Wilayah Sengketa Tinggi:** Card — nama wilayah + rasio sengketa vs ambang batas. Badge persentase. Ikon: MapPin.
*   **Lonjakan Pembatalan Abnormal:** Card — detail lonjakan pembatalan. Badge persentase. Ikon: Zap.

#### Ringkasan Unit Ekonomi (4 Metrik)
*   **Pendapatan per Pesanan:** Nominal dinamis, tren perubahan.
*   **Biaya per Pesanan:** Nominal dinamis, tren perubahan.
*   **Rata-rata Pembayaran Driver:** Persentase.
*   **Tingkat Pengambilan Platform:** Persentase.

#### Kebijakan Kritis (2 Item)
*   **Mode Tarif Utama:** Mode tarif yang sedang aktif — Badge status.
*   **Ekspansi Zona Baru:** Detail kota tertunda — Tombol link "Detail" ke `/master-admin/areas`.

#### Log Audit Terbaru (3 Entri Terakhir)
*   **Atribut per Entry:** `time` (jam, font mono), `user` (nama admin atau "System"), `action` (deskripsi aksi), `type` (Badge: Tarif / Driver / Sistem).

### 🗺️ Manajemen Area & Zona ([master-admin/areas/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/master-admin/areas/page.tsx))

#### Model Data Zona
*   **Atribut:** `id` (ZN-xx), `name`, `city`, `hours` (jam operasional), `density`, `drivers` (jumlah driver aktif), `util` (persentase utilisasi), `volume` (pesanan harian), `revenue` (pendapatan dalam Rupiah), `margin` (persentase margin), `cancel` (persentase pembatalan), `status`.
*   **Status Zona:** Enum: `Aktif` | `Pemantauan` | `Ekspansi` | `Jam Terbatas`.
*   **Kepadatan:** Enum: `Tinggi` | `Kritis` | `Sedang` | `Rendah`.

#### KPI Summary (6 Kartu Global)
*   **Total Zona:** Jumlah zona terdaftar, subtitel zona aktif saat ini. Ikon: Navigation.
*   **Pemantauan:** Jumlah zona butuh tindakan, subtitel: "Butuh Tindakan". Ikon: AlertCircle.
*   **Pendapatan (7H):** Total pendapatan 7 hari, subtitel persentase pertumbuhan. Ikon: DollarSign.
*   **Margin Rata-rata:** Persentase margin rata-rata, subtitel: "Diatas Target". Ikon: Percent.
*   **Driver Aktif:** Jumlah driver aktif, subtitel persentase online. Ikon: Users.
*   **Utilisasi Rata-rata %:** Persentase utilisasi, subtitel: "Optimal". Ikon: Activity.

#### Performance Snapshot (4 Kartu Insight)
*   **Performa Tertinggi:** Nama zona, subtitel nominal pendapatan. Ikon: TrendingUp.
*   **Margin Terendah:** Nama zona, subtitel margin vs target. Ikon: TrendingDown.
*   **Tingkat Batal Tinggi:** Nama zona, subtitel persentase volume. Ikon: AlertTriangle.
*   **Pertumbuhan Tercepat:** Nama zona, subtitel persentase kenaikan. Ikon: ArrowUpRight.

#### Permintaan Regional Tertunda
*   **Antrian Persetujuan:** Daftar permintaan perubahan strategis yang diajukan oleh Admin Operasional atau Sistem.
*   **Tipe Permintaan:** "Ekspansi zona baru" | "Penggabungan zona".
*   **Detail per Item:** Tipe permintaan, deskripsi detail, pihak pengaju (nama admin), badge level risiko (Sedang/Rendah), sisa waktu SLA (misal: "SLA: 4 jam tersisa").
*   **Aksi:** Tombol "Tinjau" (dengan ikon ChevronRight) per permintaan.

#### Tampilan Data Zona (Tab: Tabel & Peta)
*   **Pencarian:** Search bar untuk ID zona, nama, atau kota.
*   **Tab Tabel — Kolom:**
    - **Nama & ID Zona:** Nama zona + kode ID unik.
    - **Status & Kota:** Badge status zona (Aktif, Pemantauan, Ekspansi, Jam Terbatas) + nama kota induk.
    - **Demografi:** Level kepadatan (Tinggi/Kritis/Sedang/Rendah) + jam operasional zona.
    - **Status Armada:** Jumlah driver aktif, persentase utilisasi, progress bar visual.
    - **Performa (Hari Ini):** Volume pesanan harian + tingkat pembatalan (ikon peringatan jika melebihi ambang batas).
    - **Keuangan:** Pendapatan zona + persentase margin keuntungan.
    - **Aksi:** Tombol menu kontekstual "Kontrol Risiko" per zona.
    - **Paginasi:** Navigasi halaman, info jumlah zona.
*   **Tab Peta:**
    - **Peta Interaktif:** Titik-titik berwarna berdasarkan status kesehatan zona.
    - **Panel Wawasan Zona (Sidebar):** Klik zona menampilkan detail: ID, nama, kota, pendapatan, margin, rasio supply driver, progress bar utilisasi.
    - **Aksi Cepat:** Tombol "Ubah Jam Operasional" dan tombol "Berhenti Darurat" (destructive).
    - **Kontrol Peta:** Tombol fullscreen dan layer toggle.

#### Dialog Tambah Zona Baru
*   **Input Ekspansi:**
    - **Pilih Kota:** Dropdown daftar kota.
    - **Area Ekspansi:** Map Draw Tool placeholder (untuk menggambar batas zona di peta).
*   **Proyeksi 30 Hari:**
    - Estimasi permintaan harian.
    - Saran jumlah driver.
    - Skor Risiko: Badge level.
*   **Estimasi BEP:** Estimasi waktu Break-Even Point.
*   **Tombol Aksi:** "Simpan sebagai Draf" (outline) dan "Mulai Ekspansi" (primer).

#### Dialog Hentikan Zona
*   **Analisis Dampak Potensial:** Estimasi kehilangan pendapatan harian, jumlah driver terdampak, pesanan terdampak per jam, badge tingkat risiko (KRITIS/TINGGI/SEDANG/RENDAH).
*   **Notifikasi Otomatis:** "Notifikasi push dikirimkan ke seluruh driver di zona terkait dalam 2 menit setelah konfirmasi."
*   **Aksi:** Tombol "Kembali" (outline) dan "Konfirmasi & Terapkan" (destructive merah) untuk menghentikan zona.

### 💰 Manajemen Tarif ([master-admin/tariffs/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/master-admin/tariffs/page.tsx))

#### Tab: Tarif Aktif

##### Harga Layanan Inti
*   **Tarif Dasar (Per KM):** Input angka, tooltip: "Harga per kilometer, berlaku sebelum multiplikator zona."
*   **Tarif Minimum (Buka Pintu):** Input angka, tooltip: "Tarif minimum yang dikenakan per perjalanan."
*   **Biaya Tambahan:**
    - **Shift Malam (22:00 - 05:00):** Input persentase surcharge.
    - **Pengali Lonjakan (Maks):** Input multiplier maksimal.

##### Simulasi Dampak
*   **Estimasi Kenaikan Pendapatan Kotor:** Badge persentase kenaikan revenue.
*   **Nilai Perjalanan Rata-rata:** Perbandingan Sebelum → Sesudah.
*   **Metrik Dampak Detail (5 Item):**
    - Dampak ke Pembayaran Driver (persentase perubahan).
    - Perubahan Take Rate Platform (persentase).
    - Estimasi Perubahan Margin.
    - Zona Paling Terdampak (nama zona).
    - Estimasi Risiko Batal Meningkat (persentase).

##### Pembagian Biaya & Margin
*   **Biaya Platform (%):** Input persentase potongan platform.
*   **Pembayaran Driver (%):** Input persentase pembayaran ke driver.
*   **Margin Bersih per Perjalanan:** Kalkulasi otomatis.

##### Pengaman / Peringatan Batas
*   **Peringatan Otomatis:** Notifikasi jika perubahan tarif melebihi ambang batas aman.
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
*   **Atribut:** `zone` (nama zona), `multiplier`, `effective` (tarif efektif), `margin` (persentase), `volume` (jumlah pesanan), `cancel` (persentase pembatalan), `override` (boolean), `overrideNote` (alasan override lokal).

###### Tabel & Filter
*   **Pencarian:** Search bar filter nama zona.
*   **Kolom Tabel:**
    - **Zona / Kota:** Nama zona + ikon ⚡ jika override lokal (tooltip menampilkan `overrideNote`).
    - **Pengali:** Input editable.
    - **Tarif Efektif:** Tarif hasil kalkulasi.
    - **Margin:** Persentase margin per zona.
    - **Volume Pesanan:** Jumlah pesanan di zona.
    - **Tkt Pembatalan:** Persentase pembatalan (highlight jika melebihi ambang batas).
    - **Status:** Badge "Penyesuaian" (override lokal) atau "Global" (tarif standar).
*   **Paginasi:** Navigasi halaman tabel.

#### Tab: Riwayat Versi

##### Model Data Riwayat Versi
*   **Atribut:** `v` (versi, misal: "v2.4.1"), `date` (tanggal), `user` (admin pembuat), `change` (deskripsi perubahan), `status`.
*   **Status:** Enum: `Aktif` | `Diarsipkan`.

##### Tabel & Aksi
*   **Kolom:** Versi, Tanggal, Penulis, Perubahan, Status (badge).
*   **Rollback:** Tombol per versi "Diarsipkan", dengan dialog konfirmasi menampilkan detail sebelum/sesudah.

#### Dialog Review & Terapkan Perubahan (2 Langkah)
*   **Langkah 1 — Ringkasan Perubahan:** Tabel perbandingan Sebelum → Sesudah untuk setiap parameter tarif yang diubah.
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
*   **Level Risiko:** Enum: `High` (Tinggi) | `Medium` (Sedang) | `Low` (Rendah).

#### KPI Summary (5 Kartu)
*   **Total Admin Aktif:** Jumlah admin aktif / total admin, subtitel: "dari {n} admin". Ikon: Users.
*   **Master Admin Aktif:** Jumlah Master Admin aktif, subtitel: batas aman. Ikon: ShieldCheck. Highlight jika melebihi batas.
*   **Kepatuhan MFA:** Persentase admin dengan MFA aktif, subtitel: "{n} dari {total} admin". Ikon: Fingerprint.
*   **Ditangguhkan / Dikunci:** Jumlah admin tersuspend/terkunci, subtitel: "perlu perhatian". Ikon: Lock.
*   **Peran Berubah (7H):** Jumlah perubahan peran 7 hari terakhir, subtitel: waktu perubahan terakhir. Ikon: Activity.

#### Peringatan Risiko Keamanan
*   Daftar alert keamanan dinamis berdasarkan kondisi sistem saat ini (jumlah Master Admin, status MFA, login inaktif, percobaan login gagal, dll.) dengan level keparahan (CRITICAL / HIGH / MEDIUM / LOW).

#### Tab: Admin

##### Filter & Pencarian
*   **Search Bar:** Pencarian berdasarkan nama atau email.
*   **Filter Role:** Dropdown: Semua | Master Admin | Operating Admin | Reporting Admin.
*   **Filter Status:** Dropdown: Semua | Active | Suspended | Pending Approval.

##### Tabel Daftar Admin
*   **Kolom Tabel:**
    - **Admin:** Avatar (inisial), nama, dan email.
    - **Peran:** Badge berwarna sesuai role: Master Admin, Admin Operasional, Admin Pelaporan.
    - **Cakupan:** Ikon scope + detail wilayah jika ada.
    - **MFA:** Ikon status: Aktif, Nonaktif, Wajib.
    - **Status:** Badge: Aktif, Ditangguhkan, Menunggu Persetujuan.
    - **Aktivitas Terakhir:** Waktu login terakhir + aksi terakhir yang dilakukan.
    - **Risiko:** Badge level: Tinggi, Sedang, Rendah.
    - **Aksi:** Tombol "Detail" (membuka side drawer) + Dropdown menu.
*   **Dropdown Aksi per Admin:**
    - Ubah Peran (ikon Pencil).
    - Ubah Cakupan (ikon Globe).
    - Reset MFA (ikon RefreshCw).
    - Separator.
    - Tangguhkan (ikon Ban, destructive).
    - Nonaktifkan (ikon UserX, destructive).
*   **Paginasi:** Navigasi halaman tabel.
*   **Tombol Header:** "Akses Admin Baru" (ikon UserPlus).

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

*   **Indikator Visual:** Ikon centang = diizinkan, silang = tidak diizinkan.

#### Tab: Log Aktivitas

##### Model Data Log Aktivitas
*   **Atribut:** `time`, `admin`, `action`, `target`, `ip`, `result`.
*   **Hasil:** Enum: `Berhasil` (badge hijau) | `Gagal` (badge merah).

##### Tabel
*   **Kolom:** Waktu (font mono), Admin, Aksi, Target, Alamat IP (font mono), Hasil (badge).
*   **Paginasi:** Navigasi halaman log.

#### Panel Detail Admin (Side Drawer / Overlay)
*   **Informasi Dasar:** ID Admin (font mono), dibuat oleh (nama admin/System), tanggal dibuat, badge tingkat risiko.
*   **Peran yang Ditugaskan:** Badge peran + deskripsi akses + tombol "Ubah" (ikon Pencil).
*   **Scope Akses:** Ikon scope + detail cakupan (Global / Regional + nama wilayah / Zona + nama zona) + tombol "Ubah Cakupan Akses".
*   **Panel Keamanan:**
    - Status MFA: badge + ikon status.
    - Password terakhir diubah: durasi relatif.
    - Login terakhir IP: alamat IP (font mono).
    - Upaya login gagal: jumlah angka (highlight jika melebihi ambang batas).
*   **Aksi Keamanan:** Tombol "Paksa Reset Kata Sandi" (ikon RefreshCw) dan "Paksa Pendaftaran Ulang MFA" (ikon RefreshCw).
*   **Zona Bahaya:** Tombol "Tangguhkan" (ikon Ban, destructive) dan "Nonaktifkan" (ikon UserX, destructive).

### 📜 Log Audit ([master-admin/audit/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/master-admin/audit/page.tsx))

#### Header
*   **Badge Akses Kritis:** Indikator animasi pulse yang menandakan level akses keamanan halaman.

#### Model Data Log Audit
*   **Atribut Utama:** `id` (AUD-xxxxx), `timestamp` (tanggal + waktu + timezone), `actor` (object: `{ name, role }`), `source`, `action`, `module`, `target`, `severity`, `result`, `correlationId` (CORR-xxx).
*   **Detail (nested object):** `ip`, `device` (OS/browser), `location` (kota + negara), `sessionId`, `changes` (nullable: `{ field, before, after }`).
*   **Sumber (Source):** Enum: `Web Console` | `API Client` | `Internal Worker` | `Mobile App`.
*   **Aksi (Action):** Enum: `Edit Role` | `Approve Expansion` | `Export Data` | `Login Attempt` | `Suspend Driver` | dan lainnya.
*   **Modul:** Enum: `Admin Management` | `Zone Management` | `Analytics` | `Authentication` | `Driver Management`.
*   **Keparahan (Severity):** Enum: `Critical` | `High` | `Medium` | `Low`.
*   **Hasil (Result):** Enum: `Success` (Berhasil) | `Failed` (Gagal).

#### KPI Summary (5 Kartu)
*   **Total Peristiwa:** Jumlah total event, subtitel tren vs kemarin. Ikon: Activity.
*   **Peristiwa Kritis:** Jumlah event kritis, subtitel: "Membutuhkan review". Ikon: ShieldAlert.
*   **Tingkat Keparahan Tinggi:** Jumlah event high, subtitel tren vs kemarin. Ikon: AlertTriangle.
*   **Tindakan Gagal:** Jumlah tindakan gagal, subtitel: "Terdeteksi sistem". Ikon: XCircle.
*   **Aktivitas Ekspor Log:** Jumlah ekspor, subtitel nama admin. Ikon: Download.

#### Peringatan Anomali
*   Daftar alert anomali dinamis berdasarkan deteksi sistem (perubahan role massal, login IP baru, event critical berturut-turut, dll.) dengan level keparahan.

#### Status Integritas Rantai Audit
*   **Verifikasi Hash:** Badge status "VALID" atau "INVALID".
*   **Detail Teknis:**
    - Pemeriksaan integritas terakhir: timestamp.
    - Jenis enkripsi.
    - Node utama penyimpanan.
*   **Aksi:** Tombol "Verifikasi Integritas Log" (ikon RefreshCw).

#### Kebijakan Retensi
*   **Penyimpanan Aktif:** Konfigurasi hari retensi.
*   **Standar Arsip:** Terenkripsi.
*   **Akses Penghapusan:** "Log Baca-Saja" — log tidak dapat dihapus.

#### Filter & Pencarian
*   **Search Bar:** Pencarian berdasarkan Log ID, Aktor, atau Aksi.
*   **Filter Tingkat Keparahan:** Dropdown: Semua Tingkat | Kritis | Tinggi | Sedang | Rendah.
*   **Filter Modul:** Dropdown dinamis: Admin Management | Zone Management | Analytics | Authentication | Driver Management.
*   **Rentang Tanggal:** Tombol pemilih rentang tanggal (ikon Calendar).
*   **Manajemen Ekspor:** Tombol ekspor log audit (ikon Download).

#### Tabel Log Audit
*   **Kolom Tabel:**
    - **ID Log:** Kode unik (link).
    - **Stempel Waktu:** Waktu lengkap + timezone.
    - **Aktor:** Avatar (inisial), nama, dan role admin.
    - **Sumber:** Badge berwarna sesuai sumber.
    - **Tindakan:** Jenis aksi yang dilakukan.
    - **Modul:** Nama modul sistem.
    - **Keparahan:** Badge level.
    - **Hasil:** Ikon + teks: Berhasil atau Gagal.
    - **Detail:** Tombol panah (ChevronRight) untuk membuka panel detail.
*   **Paginasi:** Navigasi halaman tabel.

#### Panel Detail Log (Side Drawer / Overlay)
*   **Header:** ID Log (font mono), badge modul, badge keparahan.
*   **Info Dasar:** Stempel waktu, hasil (badge), Correlation ID (font mono + tombol Share2).
*   **Metadata Aktor:** Avatar, nama, role, lokasi login (kota + negara), OS/User Agent (device).
*   **Detail Tindakan:** Badge aksi, field yang diubah, perbandingan visual SEBELUM → SESUDAH.
*   **Sesi Terkait (Korelasi):** Timeline event terkait dalam sesi yang sama dengan waktu dan ikon.
*   **Aksi Footer:** Tombol "Ekspor Entri" (ikon Save) dan "Lihat Siklus Hidup" (ikon ArrowRight).

### 🤝 Kebijakan Mitra ([master-admin/partners/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/master-admin/partners/page.tsx))

#### Header
*   **Judul:** "Kebijakan Mitra" dengan deskripsi "Kelola bagi hasil, standar kendaraan, dan persyaratan pengemudi secara global."
*   **Tombol:** "Publikasi Kebijakan Baru" (ikon Save).

#### KPI Summary (3 Kartu)
*   **Bagi Hasil Aplikasi:** Persentase komisi Cakli per transaksi, subtitel: "Komisi Cakli per Transaksi". Ikon: Percent.
*   **Standar Armada EV:** Versi protokol pemeliharaan, subtitel: "Protokol Pemeliharaan Baterai". Ikon: CarFront.
*   **Rating Minimal Mitra:** Ambang batas rating suspend otomatis, subtitel: "Ambang Batas Suspend Otomatis". Ikon: UserCheck.

#### Konfigurasi Bagi Hasil & Insentif
*   **Potongan Platform (%):** Input angka.
*   **Pajak Pertambahan Nilai (%):** Input angka.
*   **Skema Insentif Harian:**
    - Bonus Target Order tier rendah (Rp): Input angka.
    - Bonus Target Order tier tinggi (Rp): Input angka.

#### Spesifikasi & Standar Kendaraan
*   **Usia Maksimal Kendaraan (Tahun):** Input angka.
*   **Kapasitas Baterai Minimal (Ah):** Input angka.
*   **Standard Operasional Kelistrikan (Info Panel):**
    - Wajib melakukan pemeriksaan daya secara berkala.
    - Modifikasi motor penggerak tanpa izin akan mengakibatkan pemutusan kontrak.
    - GPS Tracker wajib dalam kondisi aktif 24/7.

#### Persyaratan Dokumen & Onboarding

##### Model Data Dokumen
*   **Atribut:** `name` (nama dokumen), `type` (jenis verifikasi), `expiry` (masa berlaku), `required` (wajib/opsional).

##### Tabel Dokumen
*   **Kolom:** Dokumen, Jenis Verifikasi (badge), Masa Berlaku, Wajib (badge), Aksi ("Ubah Aturan").

#### Peringatan Kebijakan
*   **Desain:** Banner peringatan dengan ikon AlertTriangle.
*   **Pesan:** Peringatan bahwa perubahan pada bagi hasil berdampak langsung pada penghasilan mitra dan perlu sosialisasi sebelum diterapkan.

---

## 🛠️ Admin Operasional
Admin Operasional mengelola aktivitas sehari-hari, hubungan driver, dan eskalasi dukungan pelanggan.

### 📊 Dashboard Operasional ([operation-admin/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/operation-admin/page.tsx))

#### Header
*   **Judul:** "Dashboard Operasional" dengan deskripsi "Overview of current system status and activities."
*   **Indikator Sistem:** Badge status sistem dengan indikator ikon Activity dan timestamp last updated.

#### KPI Summary (4 Kartu)
*   **Active Orders:** Jumlah pesanan aktif saat ini, tren perubahan vs jam sebelumnya.
*   **Drivers Online:** Jumlah driver online / total driver terdaftar, persentase ketersediaan armada.
*   **Active Complaints:** Jumlah keluhan aktif, tren perubahan vs kemarin.
*   **Daily Revenue:** Pendapatan harian, tren perubahan vs kemarin dalam persen.

#### Grafik Total Visitors
*   **Chart Interaktif:** Area chart menampilkan tren pengunjung/aktivitas.
*   **Pemilihan Rentang:** Toggle tab: "Last 3 months", "Last 30 days", "Last 7 days".

#### Tabel Live Orders
*   **Kolom Tabel:**
    - **Order ID:** Kode pesanan unik.
    - **Customer:** Nama pelanggan.
    - **Status:** Badge status pesanan (Picking Up, In Transit, Assigning).
    - **Action:** Tombol "Details" per baris.

#### Sidebar: Quick Operations
*   **Broadcast:** Tombol aksi cepat untuk mengirim broadcast ke driver.
*   **Heatmap:** Tombol untuk membuka peta heatmap permintaan.

#### Sidebar: System Alerts
*   **Emergency Signal:** Alert darurat — detail driver yang memicu PANIC. Aksi: tombol "Call Driver" (destructive) dan "Track Now".
*   **High Demand Alert:** Alert permintaan tinggi — detail wilayah dengan lonjakan mendadak. Aksi: tombol "Adjust Payout".

#### Sidebar: Fleet Statistics
*   **In-Trip:** Jumlah driver sedang dalam perjalanan.
*   **Idle (Searching):** Jumlah driver diam menunggu order.
*   **Out-of-Service:** Jumlah driver tidak beroperasi.

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
*   **Rating:** Rating rata-rata armada (subtitel: "Dari {n} ulasan").
*   **Cancel Rate:** Persentase pembatalan rata-rata (subtitel: "batas aman: 5%").

#### Filter & Pencarian
*   **Search Bar:** Pencarian berdasarkan nama, ID, NIK, atau kendaraan.
*   **Filter Status:** Dropdown: Semua Status | Aktif | Pending | Suspend | Nonaktif.
*   **Filter Online:** Dropdown: Semua | Online | Offline.

#### Tabel Driver
*   **Kolom Tabel:**
    - **Driver:** Avatar (inisial), nama, dan ID driver (font mono).
    - **Status:** Badge status akun (Aktif, Pending, Suspend, Nonaktif).
    - **Online:** Badge online/offline.
    - **Trip:** Badge status trip aktif (On Trip, Assigned, Issue) atau tanda `-` jika tidak ada trip.
    - **Kendaraan:** Ikon becak + nama unit kendaraan.
    - **Rating:** Ikon bintang + nilai rating.
    - **Order:** Total pesanan yang diselesaikan.
    - **Risiko:** Badge level risiko berdasarkan cancel rate.
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
*   **Tampilan:** Card per log — ikon berwarna sesuai tipe aksi, detail, alasan, executor, timestamp.

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
    - **Prioritas:** Badge berwarna sesuai level prioritas.
    - **Status:** Badge status berwarna sesuai tahap.
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
*   **Pengemudi Diam:** Jumlah driver dengan pola "diam" (ikon Clock, subtitel: "{n} pengemudi perlu perhatian").
*   **Tingkat Batal Tinggi:** Jumlah driver dengan pola "pembatalan" (ikon AlertTriangle, subtitel: "Membutuhkan evaluasi").
*   **Offline Terbaru:** Jumlah driver offline mendadak (ikon UserX, subtitel: "Dalam 30 menit terakhir").

#### Tabel Peringatan Tidak Aktif & Pola
*   **Pencarian:** Search bar untuk mencari berdasarkan nama driver, ID, masalah, atau lokasi.
*   **Kolom Tabel:**
    - **Pengemudi:** Avatar (inisial), nama, dan ID driver.
    - **Pola Masalah:** Jenis masalah terdeteksi (Diam > X menit, Pembatalan Sering, Offline Mendadak, Pembatalan Tinggi).
    - **Lokasi Terakhir:** Nama lokasi.
    - **Durasi/Jumlah:** Lama diam atau jumlah pembatalan.
    - **Status:** Badge berwarna sesuai level (Kritis, Peringatan, Dipantau, Diselidiki, Info).
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
    - **Cancel Rate:** Persentase pembatalan (highlight jika melebihi ambang batas).
    - **Reports:** Jumlah laporan (highlight jika > 0).
    - **Status:** Badge status (Active, Suspended, Under Review).
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
*   **Total Pesanan:** Jumlah total pesanan, tren vs minggu lalu.
*   **Total Pendapatan:** Pendapatan total, tren vs minggu lalu.
*   **Pengemudi Aktif:** Jumlah driver sedang online, subtitel "Sedang online".
*   **Tingkat Penyelesaian:** Persentase pesanan selesai, komplemen pembatalan.

#### Grafik Tren Pesanan
*   **Tipe:** Area chart.
*   **Data:** Volume pesanan per jam (data hourly), termasuk `orders` dan `revenue` per jam.

#### Sidebar: Jam Sibuk (Peak Hours)
*   **Daftar Slot Waktu:** Setiap entry menampilkan rentang jam dan badge level (Tertinggi / Tinggi / Sedang).

#### Sidebar: Area Teratas
*   **Daftar Wilayah:** Setiap entry menampilkan nama area, persentase permintaan, dan progress bar visual.

#### Tabel Aktivitas Terbaru
*   **Header:** Judul + tombol link "Lihat Semua Riwayat" (navigasi ke `/reporting-admin/history`).
*   **Kolom Tabel:**
    - **ID Pesanan:** Kode unik dengan font mono.
    - **Waktu:** Jam transaksi.
    - **Area:** Wilayah operasional.
    - **Jumlah:** Nominal tarif.
    - **Status:** Badge (Completed / Cancelled).

### 🚗 Wawasan Performa Driver ([reporting-admin/drivers/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/reporting-admin/drivers/page.tsx))

#### Header
*   **Judul:** "Driver Performance Insight" dengan deskripsi "Comprehensive analysis of fleet efficiency and service quality."

#### KPI Summary (3 Kartu)
*   **Avg. Driver Rating:** Rating rata-rata, tren vs bulan lalu. Ikon: Star.
*   **Global Cancel Rate:** Persentase pembatalan global, subtitel tren. Ikon: TrendingDown.
*   **Active Fleet Size:** Jumlah armada aktif, subtitel driver baru. Ikon: Truck.

#### Grafik Top Drivers by Order Fulfillment
*   **Tipe:** Bar chart.
*   **Data:** Volume pesanan per driver teratas.

#### Sidebar: Peringkat Driver
*   **Top 3 Driver:** Tampilan setiap driver: Avatar, nama, rating (bintang), jumlah pesanan.
*   **Badge Rank 1:** Ikon Award pada driver peringkat pertama.

#### Model Data Driver Stats
*   **Atribut:** `name`, `orders` (jumlah pesanan), `rating` (skala 5), `cancelRate` (persentase pembatalan), `status`, `avatar` (inisial).
*   **Status:** Enum: `Top Performer` | `Stable` | `Needs Review` | `Warning`.

#### Tabel Performa Komprehensif
*   **Pencarian:** Search bar filter driver.
*   **Kolom Tabel:**
    - **Driver Name:** Nama driver (font medium).
    - **Total Orders:** Jumlah pesanan selesai.
    - **Rating:** Ikon bintang + angka rating.
    - **Cancel Rate:** Persentase pembatalan (highlight berdasarkan ambang batas).
    - **Status Label:** Badge status (Top Performer / Stable / Needs Review / Warning).
    - **Efficiency:** Tren (naik/turun) + persentase efisiensi (font mono).

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
*   **Total Pendapatan Kotor:** Nominal, tren vs bulan lalu. Ikon: DollarSign.
*   **Pendapatan Bersih:** Nominal, subtitel: "Setelah insentif & promo". Ikon: TrendingUp.
*   **Pembayaran ke Mitra:** Nominal, subtitel persentase dari order selesai. Ikon: Wallet.
*   **Bakar Uang Promo:** Nominal, subtitel persentase dari pendapatan kotor. Ikon: AlertCircle.

##### Grafik Tren Pendapatan
*   **Tipe:** Line chart, dual line.
*   **Data Harian:** Data harian, `gross` (pendapatan kotor) dan `net` (pendapatan bersih).

##### Sidebar: Sumber Pendapatan (Distribusi)
*   Daftar sumber pendapatan (CakliBike, CakliKirim, Biaya Platform, dll.) dengan persentase distribusi dan progress bar.

#### Tab: Rincian & Layanan (Breakdown)

##### Tabel Performa Regional
*   **Kolom:** Wilayah/Kota, Total Order, Pendapatan Kotor, Pendapatan Bersih, Penggunaan Promo.

#### Tab: Pencairan Mitra (Settlement)

##### KPI Pencairan (2 Kartu)
*   **Menunggu Pencairan:** Nominal, subtitel: "Akan diproses hari ini". Tombol: "Proses Batch".
*   **Telah Dicairkan (Minggu Ini):** Nominal, subtitel: "Berhasil ditransfer".

##### Tabel Riwayat Pencairan
*   **Kolom:** ID Batch (font mono), Tanggal, Jlh Mitra, Total Jumlah, Status (badge).

#### Tab: Refund & Penyesuaian (Adjustments)

##### Filter & Pencarian
*   **Search Bar:** Cari ID Transaksi.
*   **Filter Tipe:** Dropdown: Semua Tipe | Kredit (Masuk) | Debit (Keluar).

##### Tabel Audit Log Keuangan
*   **Kolom:** ID Transaksi (font mono), Tanggal, Tipe (badge Kredit/Debit), Deskripsi, Area, Jumlah, Status (badge).

### 📊 Wawasan Kinerja Pengemudi / Laporan ([reporting-admin/reports/driver-performance/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/reporting-admin/reports/driver-performance/page.tsx))

#### Header
*   **Judul:** "Wawasan Kinerja Pengemudi" dengan deskripsi "Analisis metrik pengemudi, penilaian, pembatalan, dan tingkat aktivitas."
*   **Tombol Ekspor Laporan:** Dropdown: Rincian (.xlsx) | Ringkasan (.pdf).

#### KPI Summary (4 Kartu)
*   **Performa Terbaik:** Nama driver terbaik, subtitel pesanan bulan ini. Ikon: Trophy.
*   **Rata-rata Penilaian:** Rating rata-rata, subtitel: "Berdasarkan {n}+ ulasan". Ikon: Star.
*   **Rata-rata Penyelesaian:** Persentase, subtitel: "Target Operasional: 95%". Ikon: CheckCircle2.
*   **Tingkat Pembatalan Tinggi:** Jumlah driver, subtitel: "> 10% Tingkat Pembatalan". Ikon: XCircle.

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
*   **Tingkat Pembatalan:** Persentase, tren vs minggu lalu. Ikon: AlertCircle.
*   **Pembatalan oleh Pengemudi:** Persentase, subtitel alasan utama. Ikon: AlertCircle.
*   **Pembatalan oleh Pelanggan:** Persentase, subtitel alasan utama. Ikon: AlertCircle.

#### Model Data Pembatalan
*   **Atribut:** `id` (ORD-xxxx), `date`, `reason` (alasan pembatalan), `type`, `penalty` (denda), `area`.
*   **Tipe Pembatalan:** Enum: `Dibatalkan Pelanggan` | `Dibatalkan Pengemudi` | `Sistem Habis Waktu`.
*   **Denda:** "Tidak" | nominal Rupiah.

#### Tabel Log Pesanan Dibatalkan
*   **Kolom:**
    - **ID Pesanan:** Kode unik (font mono).
    - **Tanggal:** Tanggal pembatalan.
    - **Alasan:** Deskripsi alasan.
    - **Tipe:** Badge tipe pembatalan.
    - **Area:** Wilayah.
    - **Denda:** Nominal denda.
*   **Paginasi:** Navigasi halaman.

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
    - **Order ID:** Kode pesanan (font mono).
    - **Date & Time:** Tanggal dan jam pesanan.
    - **Customer:** Nama pelanggan (font medium).
    - **Driver:** Nama driver.
    - **Amount:** Nominal tarif (font semibold).
    - **Status:** Badge (Completed / Cancelled).
    - **View:** Tombol mata (eye) untuk membuka dialog detail.
*   **Paginasi:** Navigasi halaman.

#### Dialog Detail Pesanan
*   **Header:** "Order Details - {Order ID}" dengan deskripsi "Full transactional audit."
*   **Info Pengguna & Driver:** Nama pelanggan dan nama driver.
*   **Rute Perjalanan:** Pickup Location dan Drop-off Location.
*   **Keuangan:** Total Fare dan Status (badge).
*   **Detail Tambahan:** Distance (km), Duration (menit), Payment method.

### 📉 Analitik Lintas Area ([reporting-admin/analytics/page.tsx](file:///d:/aul-pkl/rafa/cakli-frontend/app/reporting-admin/analytics/page.tsx))

#### Header
*   **Judul:** "Analitik Lintas Area" dengan deskripsi "Metrik performa komparatif di seluruh wilayah operasional."
*   **Tab Periode:** Toggle: Harian | Mingguan | Bulanan | Tahunan.
*   **Filter Wilayah:** Dropdown: Semua Wilayah | Hanya Aktif | Pertumbuhan Tinggi.
*   **Tombol Ekspor Laporan:** Ekspor laporan lintas area.

#### KPI Perbandingan (3 Kartu)
*   **Kota Pendapatan Tertinggi:** Nama kota dengan ikon tren naik, subtitel kontribusi pendapatan.
*   **Tingkat Pembatalan Terendah:** Nama kota dengan badge persentase, subtitel skor kepuasan.
*   **Pertumbuhan Tercepat:** Nama kota dengan ikon tren naik, subtitel metrik pertumbuhan.

#### Grafik Pendapatan vs Volume Pesanan
*   **Tipe:** Bar chart dengan dual Y-axis.
*   **Data Per Kota:** `city`, `orders`, `revenue`, `cancelRate` per kota operasional.

#### Grafik Analisis Tingkat Pembatalan
*   **Tipe:** Horizontal bar chart.
*   **Data:** `cancelRate` per kota.

#### Wawasan Strategi Ekspansi (Kartu AI)
*   **Desain:** Card gradient.
*   **Target Utama:** Nama kota rekomendasi, alasan, estimasi penguasaan pasar.
*   **Butuh Optimasi:** Nama kota, masalah yang terdeteksi, rekomendasi tindakan.
