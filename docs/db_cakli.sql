-- ============================================================================
-- CAKLI PLATFORM — DATABASE SCHEMA
-- Generated from: docs/feature.md (Admin Panel Feature Mapping)
-- Database: MySQL 8.0+
-- ============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================================
-- 1. KOTA (Cities)
-- Referensi: Master Admin > Areas > Kota Tersedia
-- ============================================================================
CREATE TABLE IF NOT EXISTS cities (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nama kota (Malang, Surabaya, Batu, Sidoarjo, Kepanjen, Pasuruan)',
    color_hex   VARCHAR(7)   DEFAULT NULL COMMENT 'Warna representasi di chart (#E04D04)',
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 2. ZONA OPERASIONAL (Zones)
-- Referensi: Master Admin > Manajemen Area & Zona > Model Data Zona
-- ============================================================================
CREATE TABLE IF NOT EXISTS zones (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code            VARCHAR(10)     NOT NULL UNIQUE COMMENT 'Kode unik zona (ZN-01, ZN-02, dst)',
    name            VARCHAR(100)    NOT NULL COMMENT 'Nama zona (Malang Kota, Surabaya Pusat)',
    city_id         BIGINT UNSIGNED NOT NULL,
    operating_hours VARCHAR(20)     DEFAULT '24/7' COMMENT 'Jam operasional (24/7, 06:00-22:00)',
    density         ENUM('Tinggi', 'Kritis', 'Sedang', 'Rendah') DEFAULT 'Sedang',
    status          ENUM('Aktif', 'Pemantauan', 'Ekspansi', 'Jam Terbatas') DEFAULT 'Aktif',
    active_drivers  INT UNSIGNED    DEFAULT 0 COMMENT 'Jumlah driver aktif di zona',
    utilization     DECIMAL(5,2)    DEFAULT 0.00 COMMENT 'Persentase utilisasi armada (%)',
    daily_volume    INT UNSIGNED    DEFAULT 0 COMMENT 'Total pesanan harian',
    revenue         BIGINT          DEFAULT 0 COMMENT 'Pendapatan zona (dalam Rupiah)',
    margin          DECIMAL(5,2)    DEFAULT 0.00 COMMENT 'Persentase margin keuntungan (%)',
    cancel_rate     DECIMAL(5,2)    DEFAULT 0.00 COMMENT 'Persentase tingkat pembatalan (%)',
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_zones_city (city_id),
    INDEX idx_zones_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 3. PERMINTAAN REGIONAL (Regional Requests)
-- Referensi: Master Admin > Areas > Permintaan Regional Tertunda
-- ============================================================================
CREATE TABLE IF NOT EXISTS regional_requests (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type            ENUM('Ekspansi zona baru', 'Penggabungan zona') NOT NULL,
    description     TEXT            NOT NULL COMMENT 'Detail permintaan',
    requested_by    BIGINT UNSIGNED NOT NULL COMMENT 'ID Admin pengaju',
    risk_level      ENUM('Rendah', 'Sedang', 'Tinggi', 'Kritis') DEFAULT 'Rendah',
    sla_deadline    DATETIME        DEFAULT NULL COMMENT 'Batas waktu SLA',
    status          ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    reviewed_by     BIGINT UNSIGNED DEFAULT NULL COMMENT 'ID Admin yang meninjau',
    reviewed_at     DATETIME        DEFAULT NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_rr_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. KONFIGURASI TARIF (Tariff Configuration)
-- Referensi: Master Admin > Manajemen Tarif > Harga Layanan Inti
-- ============================================================================
CREATE TABLE IF NOT EXISTS tariff_configs (
    id                      BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    version                 VARCHAR(20)     NOT NULL UNIQUE COMMENT 'Versi tarif (v2.4.1)',
    base_rate_per_km        BIGINT          NOT NULL COMMENT 'Tarif dasar per KM (dalam Rupiah)',
    minimum_fare            BIGINT          NOT NULL COMMENT 'Tarif minimum buka pintu (Rupiah)',
    night_surcharge_pct     DECIMAL(5,2)    DEFAULT 0.00 COMMENT 'Surcharge shift malam 22:00-05:00 (%)',
    max_surge_multiplier    DECIMAL(4,2)    DEFAULT 1.00 COMMENT 'Pengali lonjakan maksimal (2.5x)',
    platform_fee_pct        DECIMAL(5,2)    DEFAULT 20.00 COMMENT 'Potongan platform (%)',
    driver_payout_pct       DECIMAL(5,2)    DEFAULT 80.00 COMMENT 'Pembayaran driver (%)',
    change_threshold_pct    DECIMAL(5,2)    DEFAULT 10.00 COMMENT 'Ambang batas peringatan perubahan (%)',
    activation_mode         ENUM('now', 'schedule') DEFAULT 'now',
    scheduled_at            DATETIME        DEFAULT NULL COMMENT 'Jadwal aktivasi (jika mode=schedule)',
    status                  ENUM('Aktif', 'Diarsipkan') DEFAULT 'Aktif',
    change_reason           TEXT            DEFAULT NULL COMMENT 'Alasan perubahan untuk audit trail',
    created_by              BIGINT UNSIGNED DEFAULT NULL COMMENT 'Admin pembuat',
    created_at              TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tc_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 5. MULTIPLIKATOR TARIF PER ZONA (Zone Tariff Overrides)
-- Referensi: Master Admin > Tarif > Penyesuaian Regional
-- ============================================================================
CREATE TABLE IF NOT EXISTS tariff_zone_overrides (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tariff_id       BIGINT UNSIGNED NOT NULL,
    zone_id         BIGINT UNSIGNED NOT NULL,
    multiplier      DECIMAL(4,2)    DEFAULT 1.00 COMMENT 'Pengali zona (1.0x, 1.2x, 1.5x)',
    effective_rate   BIGINT          DEFAULT 0 COMMENT 'Tarif efektif setelah pengali (Rupiah)',
    is_override     BOOLEAN         DEFAULT FALSE COMMENT 'True jika override lokal',
    override_note   TEXT            DEFAULT NULL COMMENT 'Alasan override lokal',
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tariff_id) REFERENCES tariff_configs(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE KEY uq_tariff_zone (tariff_id, zone_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 6. STATUS PROPAGASI TARIF
-- Referensi: Master Admin > Tarif > Status Propagasi
-- ============================================================================
CREATE TABLE IF NOT EXISTS tariff_propagation (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tariff_id           BIGINT UNSIGNED NOT NULL,
    zone_id             BIGINT UNSIGNED NOT NULL,
    sync_status         ENUM('Synced', 'Pending', 'Failed') DEFAULT 'Pending',
    synced_at           DATETIME DEFAULT NULL,
    error_message       TEXT DEFAULT NULL,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tariff_id) REFERENCES tariff_configs(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 7. ADMIN (Administrator Accounts)
-- Referensi: Master Admin > Kontrol Akses Admin > Model Data Admin
-- ============================================================================
CREATE TABLE IF NOT EXISTS admins (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code                VARCHAR(10)     NOT NULL UNIQUE COMMENT 'Kode admin (ADM-001)',
    name                VARCHAR(150)    NOT NULL,
    email               VARCHAR(200)    NOT NULL UNIQUE,
    password_hash       VARCHAR(255)    NOT NULL,
    role                ENUM('Master Admin', 'Operating Admin', 'Reporting Admin') NOT NULL,
    scope               ENUM('Global', 'Regional', 'Zone-Specific') DEFAULT 'Global',
    scope_detail        VARCHAR(100)    DEFAULT NULL COMMENT 'Nama wilayah/zona (nullable)',
    mfa_status          ENUM('Enabled', 'Disabled', 'Required') DEFAULT 'Disabled',
    status              ENUM('Active', 'Suspended', 'Pending Approval') DEFAULT 'Pending Approval',
    risk_level          ENUM('High', 'Medium', 'Low') DEFAULT 'Low',
    last_login_at       DATETIME        DEFAULT NULL,
    last_action         VARCHAR(255)    DEFAULT NULL,
    last_login_ip       VARCHAR(45)     DEFAULT NULL COMMENT 'Alamat IP terakhir login (IPv4/IPv6)',
    password_changed_at DATETIME        DEFAULT NULL,
    failed_logins       INT UNSIGNED    DEFAULT 0,
    created_by          BIGINT UNSIGNED DEFAULT NULL COMMENT 'Admin/System yang membuat akun ini',
    created_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_admins_role (role),
    INDEX idx_admins_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 8. MODUL & PERMISSION (Permission Matrix)
-- Referensi: Master Admin > Roles > Matriks Izin
-- ============================================================================
CREATE TABLE IF NOT EXISTS modules (
    id      BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nama modul (Analitik Dasbor, Manajemen Driver, dll)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS permissions (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    module_id       BIGINT UNSIGNED NOT NULL,
    role            ENUM('Master Admin', 'Operating Admin', 'Reporting Admin') NOT NULL,
    capability      ENUM('View', 'Edit', 'Approve', 'Export', 'Delete', 'Suspend') NOT NULL,
    is_allowed      BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE KEY uq_perm (module_id, role, capability)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 9. LOG AUDIT (Audit Logs)
-- Referensi: Master Admin > Log Audit > Model Data Log Audit
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code            VARCHAR(20)     NOT NULL UNIQUE COMMENT 'Kode log (AUD-88219)',
    timestamp       DATETIME(3)     NOT NULL COMMENT 'Waktu kejadian (presisi milidetik)',
    actor_id        BIGINT UNSIGNED DEFAULT NULL COMMENT 'FK ke admins',
    actor_name      VARCHAR(150)    NOT NULL COMMENT 'Nama aktor (untuk log System)',
    actor_role      VARCHAR(50)     DEFAULT NULL COMMENT 'Role aktor',
    source          ENUM('Web Console', 'API Client', 'Internal Worker', 'Mobile App') NOT NULL,
    action          VARCHAR(100)    NOT NULL COMMENT 'Aksi (Edit Role, Approve Expansion, Login Attempt, dll)',
    module          ENUM('Admin Management', 'Zone Management', 'Analytics', 'Authentication', 'Driver Management', 'Tariff Management', 'Order Management', 'User Management', 'System') NOT NULL,
    target          VARCHAR(255)    DEFAULT NULL COMMENT 'Target aksi (ADM-006, New Zone: Malang Selatan)',
    severity        ENUM('Critical', 'High', 'Medium', 'Low') DEFAULT 'Low',
    result          ENUM('Success', 'Failed') NOT NULL,
    correlation_id  VARCHAR(50)     DEFAULT NULL COMMENT 'ID korelasi sesi (CORR-xxx)',
    ip_address      VARCHAR(45)     DEFAULT NULL,
    device          VARCHAR(255)    DEFAULT NULL COMMENT 'OS/Browser (MacBook Pro / Chrome 121)',
    location        VARCHAR(100)    DEFAULT NULL COMMENT 'Lokasi login (Jakarta, ID)',
    session_id      VARCHAR(100)    DEFAULT NULL,
    change_field    VARCHAR(100)    DEFAULT NULL COMMENT 'Field yang diubah (nullable)',
    change_before   TEXT            DEFAULT NULL COMMENT 'Nilai sebelum perubahan',
    change_after    TEXT            DEFAULT NULL COMMENT 'Nilai sesudah perubahan',
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (actor_id) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_al_severity (severity),
    INDEX idx_al_module (module),
    INDEX idx_al_actor (actor_id),
    INDEX idx_al_timestamp (timestamp),
    INDEX idx_al_correlation (correlation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 10. KEBIJAKAN MITRA (Partner Policies)
-- Referensi: Master Admin > Kebijakan Mitra
-- ============================================================================
CREATE TABLE IF NOT EXISTS partner_policies (
    id                      BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    platform_fee_pct        DECIMAL(5,2) DEFAULT 20.00 COMMENT 'Potongan platform (%)',
    tax_pct                 DECIMAL(5,2) DEFAULT 11.00 COMMENT 'PPN (%)',
    bonus_10_orders         BIGINT       DEFAULT 25000 COMMENT 'Bonus target 10 order (Rupiah)',
    bonus_15_orders         BIGINT       DEFAULT 45000 COMMENT 'Bonus target 15 order (Rupiah)',
    max_vehicle_age_years   INT          DEFAULT 5 COMMENT 'Usia maks kendaraan (tahun)',
    min_battery_capacity_ah INT          DEFAULT 60 COMMENT 'Kapasitas baterai minimal (Ah)',
    min_driver_rating       DECIMAL(3,2) DEFAULT 4.65 COMMENT 'Rating minimal mitra (ambang suspend otomatis)',
    fleet_standard_version  VARCHAR(10)  DEFAULT 'V5.2' COMMENT 'Versi standar armada EV',
    is_active               BOOLEAN      DEFAULT TRUE,
    published_by            BIGINT UNSIGNED DEFAULT NULL,
    created_at              TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (published_by) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 11. PERSYARATAN DOKUMEN ONBOARDING
-- Referensi: Master Admin > Kebijakan Mitra > Persyaratan Dokumen
-- ============================================================================
CREATE TABLE IF NOT EXISTS onboarding_requirements (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    document_name       VARCHAR(100)    NOT NULL COMMENT 'Nama dokumen (KTP, SIM, SKCK, Sertifikasi Safety)',
    verification_type   VARCHAR(50)     NOT NULL COMMENT 'Jenis verifikasi (OCR & Pencocokan, Peninjauan Manual, Sertifikat Digital)',
    validity_period     VARCHAR(50)     NOT NULL COMMENT 'Masa berlaku (Seumur Hidup, 5 Tahun, 6 Bulan, 2 Tahun)',
    is_required         BOOLEAN         DEFAULT TRUE,
    created_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 12. PENGGUNA / PELANGGAN (Users / Customers)
-- Referensi: Operation Admin > Moderasi Pengguna > Model Data Pengguna
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code            VARCHAR(10)     NOT NULL UNIQUE COMMENT 'Kode pengguna (USR-001)',
    name            VARCHAR(150)    NOT NULL,
    email           VARCHAR(200)    NOT NULL UNIQUE,
    phone           VARCHAR(20)     DEFAULT NULL,
    password_hash   VARCHAR(255)    NOT NULL,
    status          ENUM('Active', 'Suspended', 'Under Review') DEFAULT 'Active',
    rating          DECIMAL(3,2)    DEFAULT 0.00,
    total_orders    INT UNSIGNED    DEFAULT 0,
    total_cancel    INT UNSIGNED    DEFAULT 0,
    cancel_rate     DECIMAL(5,2)    DEFAULT 0.00 COMMENT 'Persentase pembatalan (%)',
    total_reports   INT UNSIGNED    DEFAULT 0,
    joined_date     DATE            NOT NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 13. DRIVER / MITRA PENGEMUDI
-- Referensi: Operation Admin > Manajemen Driver > Model Data Driver
-- ============================================================================
CREATE TABLE IF NOT EXISTS drivers (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code                VARCHAR(10)     NOT NULL UNIQUE COMMENT 'Kode driver (DRV-001)',
    name                VARCHAR(150)    NOT NULL,
    nik                 CHAR(16)        NOT NULL UNIQUE COMMENT 'NIK 16 digit',
    phone               VARCHAR(20)     DEFAULT NULL,
    email               VARCHAR(200)    DEFAULT NULL,
    address             TEXT            DEFAULT NULL COMMENT 'Alamat domisili sesuai KTP',
    date_of_birth       DATE            DEFAULT NULL,
    gender              ENUM('Laki-laki', 'Perempuan') DEFAULT NULL,
    status              ENUM('Aktif', 'Pending Verifikasi', 'Suspend', 'Nonaktif') DEFAULT 'Pending Verifikasi',
    online_status       ENUM('Online', 'Offline') DEFAULT 'Offline',
    rating              DECIMAL(3,2)    DEFAULT 0.00,
    total_orders        INT UNSIGNED    DEFAULT 0,
    cancel_rate         DECIMAL(5,2)    DEFAULT 0.00 COMMENT 'Persentase pembatalan (%)',
    acceptance_rate     DECIMAL(5,2)    DEFAULT 100.00 COMMENT 'Tingkat penerimaan pesanan (%)',
    violations          INT UNSIGNED    DEFAULT 0,
    reports             INT UNSIGNED    DEFAULT 0,
    zone_id             BIGINT UNSIGNED DEFAULT NULL COMMENT 'Zona operasional utama',
    join_date           DATE            NOT NULL,
    profile_photo_url   VARCHAR(500)    DEFAULT NULL,
    created_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_drivers_status (status),
    INDEX idx_drivers_online (online_status),
    INDEX idx_drivers_zone (zone_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 14. KENDARAAN DRIVER (Driver Vehicles)
-- Referensi: Operation Admin > Drivers > Form Tambah Driver > Langkah 4
-- ============================================================================
CREATE TABLE IF NOT EXISTS driver_vehicles (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    driver_id       BIGINT UNSIGNED NOT NULL,
    plate_number    VARCHAR(20)     NOT NULL COMMENT 'Nomor plat kendaraan',
    model           VARCHAR(100)    DEFAULT NULL COMMENT 'Model / Tipe kendaraan',
    year            YEAR            DEFAULT NULL COMMENT 'Tahun kendaraan',
    color           VARCHAR(50)     DEFAULT NULL COMMENT 'Warna kendaraan',
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 15. DOKUMEN DRIVER (Driver Documents)
-- Referensi: Operation Admin > Drivers > Form Tambah > Langkah 3
-- ============================================================================
CREATE TABLE IF NOT EXISTS driver_documents (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    driver_id       BIGINT UNSIGNED NOT NULL,
    document_type   ENUM('KTP', 'SIM', 'STNK', 'Foto Kendaraan', 'Sertifikasi Safety', 'SKCK') NOT NULL,
    file_url        VARCHAR(500)    NOT NULL,
    is_verified     BOOLEAN         DEFAULT FALSE,
    verified_by     BIGINT UNSIGNED DEFAULT NULL,
    verified_at     DATETIME        DEFAULT NULL,
    expires_at      DATE            DEFAULT NULL COMMENT 'Tanggal masa berlaku habis',
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_dd_driver (driver_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 16. RIWAYAT STATUS DRIVER (Suspend / Reaktivasi / Verifikasi)
-- Referensi: Operation Admin > Drivers > Dialog Konfirmasi
-- ============================================================================
CREATE TABLE IF NOT EXISTS driver_status_history (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    driver_id   BIGINT UNSIGNED NOT NULL,
    action      ENUM('Suspend', 'Verifikasi', 'Aktivasi Kembali', 'Edit Data', 'Nonaktifkan') NOT NULL,
    reason      TEXT            DEFAULT NULL,
    admin_id    BIGINT UNSIGNED DEFAULT NULL COMMENT 'Admin yang melakukan aksi',
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_dsh_driver (driver_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 17. PESANAN (Orders)
-- Referensi: Operation Admin > Manajemen Pesanan + Reporting Admin > Riwayat Transaksi
-- ============================================================================
CREATE TABLE IF NOT EXISTS orders (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code                VARCHAR(15)     NOT NULL UNIQUE COMMENT 'Kode pesanan unik (ORD-8921)',
    user_id             BIGINT UNSIGNED DEFAULT NULL,
    driver_id           BIGINT UNSIGNED DEFAULT NULL,
    zone_id             BIGINT UNSIGNED DEFAULT NULL,
    status              ENUM('Mencari', 'Assigned', 'On-Trip', 'Selesai', 'Batal', 'Issue') DEFAULT 'Mencari',
    pickup_location     VARCHAR(255)    DEFAULT NULL COMMENT 'Alamat titik jemput',
    dropoff_location    VARCHAR(255)    DEFAULT NULL COMMENT 'Alamat titik antar',
    pickup_lat          DECIMAL(10,7)   DEFAULT NULL,
    pickup_lng          DECIMAL(10,7)   DEFAULT NULL,
    dropoff_lat         DECIMAL(10,7)   DEFAULT NULL,
    dropoff_lng         DECIMAL(10,7)   DEFAULT NULL,
    distance_km         DECIMAL(6,2)    DEFAULT NULL COMMENT 'Jarak tempuh (km)',
    duration_minutes    INT UNSIGNED    DEFAULT NULL COMMENT 'Durasi perjalanan (menit)',
    base_fare           BIGINT          DEFAULT 0 COMMENT 'Tarif dasar (Rupiah)',
    service_fee         BIGINT          DEFAULT 0 COMMENT 'Biaya layanan (Rupiah)',
    discount            BIGINT          DEFAULT 0 COMMENT 'Diskon yang diterapkan (Rupiah)',
    total_fare          BIGINT          DEFAULT 0 COMMENT 'Total tarif akhir (Rupiah)',
    surge_multiplier    DECIMAL(4,2)    DEFAULT 1.00,
    payment_method      VARCHAR(50)     DEFAULT 'CakliWallet' COMMENT 'Metode pembayaran',
    cancel_reason       TEXT            DEFAULT NULL COMMENT 'Alasan pembatalan (jika batal)',
    cancel_type         ENUM('Dibatalkan Pelanggan', 'Dibatalkan Pengemudi', 'Sistem Habis Waktu') DEFAULT NULL,
    cancel_penalty      BIGINT          DEFAULT 0 COMMENT 'Denda pembatalan (Rupiah, 0 = tidak ada)',
    ordered_at          DATETIME        NOT NULL COMMENT 'Waktu pesanan dibuat',
    completed_at        DATETIME        DEFAULT NULL COMMENT 'Waktu pesanan selesai',
    created_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_orders_status (status),
    INDEX idx_orders_user (user_id),
    INDEX idx_orders_driver (driver_id),
    INDEX idx_orders_date (ordered_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 18. LOG INTERVENSI PESANAN
-- Referensi: Operation Admin > Pesanan > Suite Intervensi Operasional
-- ============================================================================
CREATE TABLE IF NOT EXISTS order_interventions (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id        BIGINT UNSIGNED NOT NULL,
    action          ENUM('Reassign', 'Assign Manual', 'Tandai Masalah', 'Pembatalan Manual', 'Penyesuaian Tarif') NOT NULL,
    reason          TEXT            DEFAULT NULL,
    admin_id        BIGINT UNSIGNED DEFAULT NULL,
    details         JSON            DEFAULT NULL COMMENT 'Detail tambahan (before/after, dsb)',
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_oi_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 19. KELUHAN & SENGKETA (Complaints)
-- Referensi: Operation Admin > Keluhan & Sengketa > Model Data Keluhan
-- ============================================================================
CREATE TABLE IF NOT EXISTS complaints (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code                VARCHAR(15)     NOT NULL UNIQUE COMMENT 'Kode tiket (TKT-001)',
    type                ENUM('Penumpang -> Pengemudi', 'Pengemudi -> Penumpang', 'Pengguna -> Aplikasi', 'Pengemudi -> Aplikasi') NOT NULL,
    subject             VARCHAR(255)    NOT NULL COMMENT 'Judul singkat keluhan',
    detail              TEXT            DEFAULT NULL COMMENT 'Detail laporan',
    from_name           VARCHAR(150)    NOT NULL COMMENT 'Nama pelapor',
    from_role           VARCHAR(50)     NOT NULL COMMENT 'Role pelapor (Penumpang/Pengemudi)',
    from_phone          VARCHAR(20)     DEFAULT NULL,
    from_email          VARCHAR(200)    DEFAULT NULL,
    to_name             VARCHAR(150)    DEFAULT NULL COMMENT 'Nama terlapor',
    to_role             VARCHAR(50)     DEFAULT NULL,
    to_phone            VARCHAR(20)     DEFAULT NULL,
    to_email            VARCHAR(200)    DEFAULT NULL,
    trip_id             BIGINT UNSIGNED DEFAULT NULL COMMENT 'FK ke orders',
    status              ENUM('Baru', 'Sedang Diinvestigasi', 'Menunggu Konfirmasi', 'Dieskalasi', 'Selesai') DEFAULT 'Baru',
    priority            ENUM('Tinggi', 'Sedang', 'Rendah') DEFAULT 'Sedang',
    resolution_action   ENUM('Suspend Permanen', 'Suspend Sementara', 'Laporan Valid', 'Refund Diberikan', 'Peringatan Diberikan', 'Kompensasi', 'Ditolak') DEFAULT NULL,
    resolution_notes    TEXT            DEFAULT NULL,
    resolved_at         DATETIME        DEFAULT NULL,
    resolved_by         BIGINT UNSIGNED DEFAULT NULL,
    escalation_target   ENUM('Admin Utama', 'Tim Legal & Kepatuhan', 'Manajer Operasional', 'Tim Teknis') DEFAULT NULL,
    escalation_reason   TEXT            DEFAULT NULL,
    escalated_at        DATETIME        DEFAULT NULL,
    escalated_by        BIGINT UNSIGNED DEFAULT NULL,
    escalation_status   ENUM('PENDING', 'RESOLVED', 'REJECTED') DEFAULT NULL,
    reported_at         DATETIME        NOT NULL,
    created_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES orders(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (resolved_by) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (escalated_by) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_complaints_status (status),
    INDEX idx_complaints_priority (priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 20. TIMELINE KELUHAN
-- Referensi: Operation Admin > Keluhan > Timeline Investigasi
-- ============================================================================
CREATE TABLE IF NOT EXISTS complaint_timeline (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    complaint_id    BIGINT UNSIGNED NOT NULL,
    title           VARCHAR(255)    NOT NULL,
    description     TEXT            DEFAULT NULL,
    performed_by    VARCHAR(150)    DEFAULT NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_ct_complaint (complaint_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 21. LOG AKTIVITAS KELUHAN
-- Referensi: Operation Admin > Keluhan > Dialog Audit Log
-- ============================================================================
CREATE TABLE IF NOT EXISTS complaint_activity_logs (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    complaint_id    BIGINT UNSIGNED NOT NULL,
    action          ENUM('VIEW_DETAIL', 'VIEW_CONTACT', 'OPEN_ESCALATION', 'CONTACT_MADE', 'RESOLUTION_MADE', 'ESCALATION_MADE', 'NOTIFICATION_SENT') NOT NULL,
    performed_by    VARCHAR(150)    DEFAULT NULL,
    details         TEXT            DEFAULT NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_cal_complaint (complaint_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 22. PEMANTAUAN AKTIVITAS DRIVER (Driver Activity Monitoring)
-- Referensi: Operation Admin > Pemantauan Aktivitas > Model Data
-- ============================================================================
CREATE TABLE IF NOT EXISTS driver_activity_alerts (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    driver_id       BIGINT UNSIGNED NOT NULL,
    issue           VARCHAR(255)    NOT NULL COMMENT 'Masalah terdeteksi (Diam > 30m, Pembatalan Sering, dll)',
    location        VARCHAR(255)    DEFAULT NULL COMMENT 'Lokasi terakhir',
    duration        VARCHAR(50)     DEFAULT NULL COMMENT 'Durasi/jumlah masalah (32m, 4 perjalanan)',
    status          ENUM('Peringatan', 'Kritis', 'Info', 'Dipantau', 'Diselidiki') DEFAULT 'Info',
    last_online     DATETIME        DEFAULT NULL,
    last_trip       VARCHAR(255)    DEFAULT NULL COMMENT 'Info trip terakhir',
    admin_id        BIGINT UNSIGNED DEFAULT NULL COMMENT 'Admin yang menangani',
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_daa_driver (driver_id),
    INDEX idx_daa_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 23. RIWAYAT STATUS PENGGUNA
-- Referensi: Operation Admin > Moderasi Pengguna > Riwayat Status
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_status_history (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    action          VARCHAR(100)    NOT NULL COMMENT 'Aksi (Suspend, Activate, Review)',
    reason          TEXT            DEFAULT NULL,
    admin_id        BIGINT UNSIGNED DEFAULT NULL,
    duration        VARCHAR(50)     DEFAULT NULL COMMENT 'Durasi suspend (24 Jam, 3 Hari, 7 Hari, 30 Hari, Permanen)',
    suspend_type    ENUM('Temporary', 'Permanent') DEFAULT NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_ush_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 24. LAPORAN PENGGUNA (User Reports)
-- Referensi: Operation Admin > Moderasi Pengguna > Riwayat Laporan
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_reports (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL COMMENT 'Pengguna yang dilaporkan',
    reported_by     VARCHAR(150)    NOT NULL COMMENT 'Nama pelapor',
    type            VARCHAR(100)    NOT NULL COMMENT 'Tipe laporan',
    description     TEXT            DEFAULT NULL,
    status          ENUM('Resolved', 'Investigating', 'Pending') DEFAULT 'Pending',
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_ur_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 25. TRANSAKSI KEUANGAN (Financial Transactions)
-- Referensi: Reporting Admin > Kokpit Keuangan > Model Data Transaksi
-- ============================================================================
CREATE TABLE IF NOT EXISTS transactions (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code            VARCHAR(20)     NOT NULL UNIQUE COMMENT 'Kode transaksi (REV-2024-001)',
    date            DATE            NOT NULL,
    source          ENUM('Komisi Order', 'Biaya Layanan App', 'Insentif Mitra', 'Langganan', 'Refund Pelanggan') NOT NULL,
    amount          BIGINT          NOT NULL COMMENT 'Nominal (Rupiah)',
    area            VARCHAR(100)    DEFAULT NULL COMMENT 'Nama wilayah',
    zone_id         BIGINT UNSIGNED DEFAULT NULL,
    status          ENUM('Settled', 'Dibayarkan', 'Disesuaikan') DEFAULT 'Settled',
    type            ENUM('Credit', 'Debit') NOT NULL,
    order_id        BIGINT UNSIGNED DEFAULT NULL COMMENT 'FK ke orders jika terkait pesanan',
    driver_id       BIGINT UNSIGNED DEFAULT NULL COMMENT 'FK ke drivers jika terkait mitra',
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_tx_date (date),
    INDEX idx_tx_type (type),
    INDEX idx_tx_source (source)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 26. BATCH PENCAIRAN MITRA (Settlement Batches)
-- Referensi: Reporting Admin > Kokpit Keuangan > Pencairan Mitra
-- ============================================================================
CREATE TABLE IF NOT EXISTS settlement_batches (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code            VARCHAR(20)     NOT NULL UNIQUE COMMENT 'Kode batch (BATCH-9921)',
    date            DATE            NOT NULL,
    total_drivers   INT UNSIGNED    NOT NULL COMMENT 'Jumlah mitra dalam batch',
    total_amount    BIGINT          NOT NULL COMMENT 'Total jumlah pencairan (Rupiah)',
    status          ENUM('Menunggu', 'Diproses', 'Selesai', 'Gagal') DEFAULT 'Menunggu',
    processed_by    BIGINT UNSIGNED DEFAULT NULL,
    processed_at    DATETIME        DEFAULT NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (processed_by) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_sb_status (status),
    INDEX idx_sb_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 27. DETAIL PENCAIRAN PER DRIVER
-- Referensi: Reporting Admin > Kokpit Keuangan > Pencairan per Mitra
-- ============================================================================
CREATE TABLE IF NOT EXISTS settlement_details (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    batch_id        BIGINT UNSIGNED NOT NULL,
    driver_id       BIGINT UNSIGNED NOT NULL,
    amount          BIGINT          NOT NULL COMMENT 'Jumlah pencairan driver (Rupiah)',
    status          ENUM('Pending', 'Transferred', 'Failed') DEFAULT 'Pending',
    transferred_at  DATETIME        DEFAULT NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES settlement_batches(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_sd_batch (batch_id),
    INDEX idx_sd_driver (driver_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 28. KONTAK DARURAT DRIVER
-- Referensi: Operation Admin > Drivers > Form Tambah > Langkah 2
-- ============================================================================
CREATE TABLE IF NOT EXISTS driver_emergency_contacts (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    driver_id       BIGINT UNSIGNED NOT NULL,
    contact_name    VARCHAR(150)    NOT NULL,
    contact_phone   VARCHAR(20)     NOT NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 29. LOG AUDIT PENGGUNA
-- Referensi: Operation Admin > Moderasi Pengguna > Audit Log
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_audit_logs (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    action          VARCHAR(100)    NOT NULL COMMENT 'Aksi (Suspend, Activate, Edit, dll)',
    field_changed   VARCHAR(100)    DEFAULT NULL,
    before_value    TEXT            DEFAULT NULL,
    after_value     TEXT            DEFAULT NULL,
    reason          TEXT            DEFAULT NULL,
    admin_id        BIGINT UNSIGNED DEFAULT NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_ual_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 30. ANOMALI KEAMANAN (Security Anomalies)
-- Referensi: Master Admin > Log Audit > Peringatan Anomali
-- ============================================================================
CREATE TABLE IF NOT EXISTS security_anomalies (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type            VARCHAR(100)    NOT NULL COMMENT 'Tipe anomali (Role Change Surge, New IP Login, Security Cascade)',
    message         TEXT            NOT NULL,
    severity        ENUM('Critical', 'High', 'Medium', 'Low') NOT NULL,
    is_resolved     BOOLEAN         DEFAULT FALSE,
    resolved_by     BIGINT UNSIGNED DEFAULT NULL,
    resolved_at     DATETIME        DEFAULT NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resolved_by) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_sa_severity (severity),
    INDEX idx_sa_resolved (is_resolved)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SEED DATA: Modules for Permission Matrix
-- ============================================================================
INSERT INTO modules (name) VALUES
    ('Analitik Dasbor'),
    ('Manajemen Driver'),
    ('Manajemen Zona'),
    ('Manajemen Tarif'),
    ('Pengaturan Global'),
    ('Penutupan Darurat'),
    ('Ekspor Data'),
    ('Manajemen Admin')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- ============================================================================
-- SEED DATA: Onboarding Requirements
-- ============================================================================
INSERT INTO onboarding_requirements (document_name, verification_type, validity_period, is_required) VALUES
    ('KTP (Kartu Tanda Penduduk)', 'OCR & Pencocokan', 'Seumur Hidup', TRUE),
    ('SIM (Surat Izin Mengemudi)', 'Peninjauan Manual', '5 Tahun', TRUE),
    ('SKCK (Surat Keterangan Catatan Kepolisian)', 'Peninjauan Manual', '6 Bulan', TRUE),
    ('Sertifikasi Safety Driving Cakli', 'Sertifikat Digital', '2 Tahun', TRUE)
ON DUPLICATE KEY UPDATE document_name = VALUES(document_name);

-- ============================================================================
-- SEED DATA: Cities
-- ============================================================================
INSERT INTO cities (name, color_hex) VALUES
    ('Malang', '#E04D04'),
    ('Surabaya', '#3b82f6'),
    ('Batu', '#22c55e'),
    ('Sidoarjo', '#8b5cf6'),
    ('Kepanjen', '#ec4899'),
    ('Pasuruan', '#f59e0b')
ON DUPLICATE KEY UPDATE color_hex = VALUES(color_hex);

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
