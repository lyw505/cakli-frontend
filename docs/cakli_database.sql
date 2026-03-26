-- ============================================================================
-- CAKLI DATABASE SCHEMA — PostgreSQL
-- ============================================================================
-- Platform   : Cakli 1.0 (Becak Listrik Ride-Hailing)
-- Database   : PostgreSQL 15+
-- Komponen   : User App (Flutter) + Driver App (Flutter) + Admin Dashboard (Next.js)
-- Total      : 49 tabel + 3 views + 70+ indeks
-- Dibuat     : 26 Maret 2026
-- ============================================================================

-- ============================================================================
-- 0. EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- untuk gen_random_uuid()

-- ============================================================================
-- 1. USERS & PROFIL
-- ============================================================================

-- 1.1 users
CREATE TABLE users (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name           VARCHAR(150)  NOT NULL,
    email          VARCHAR(255)  NOT NULL UNIQUE,
    phone          VARCHAR(20)   NOT NULL UNIQUE,
    password_hash  TEXT          NOT NULL,
    pin_hash       VARCHAR(6),                             -- PIN E-Wallet (CaPay), 6 digit
    avatar_url     TEXT,
    status         VARCHAR(20)   NOT NULL DEFAULT 'active'
                       CHECK (status IN ('active','suspended','under_review','deleted')),
    rating         DECIMAL(2,1)  DEFAULT 5.0,
    total_orders   INT           DEFAULT 0,
    total_cancel   INT           DEFAULT 0,
    cancel_rate    DECIMAL(5,2)  DEFAULT 0.00,
    total_reports  INT           DEFAULT 0,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_email   ON users (email);
CREATE INDEX idx_users_phone   ON users (phone);
CREATE INDEX idx_users_status  ON users (status);

COMMENT ON TABLE users IS 'Pengguna / penumpang aplikasi Cakli (Flutter user app)';

-- 1.2 saved_addresses
CREATE TABLE saved_addresses (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label       VARCHAR(100)  NOT NULL,                    -- misal: "Rumah", "Kantor", "SMKN 4 Malang"
    address     TEXT          NOT NULL,
    latitude    DECIMAL(10,7) NOT NULL,
    longitude   DECIMAL(10,7) NOT NULL,
    landmark    VARCHAR(255),                              -- patokan
    is_default  BOOLEAN       DEFAULT FALSE,
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_saved_addresses_user ON saved_addresses (user_id);

COMMENT ON TABLE saved_addresses IS 'Alamat tersimpan oleh user (Rumah, Kantor, dll)';

-- 1.3 user_status_history
CREATE TABLE user_status_history (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action      VARCHAR(50)  NOT NULL,                     -- suspend_temp, suspend_perm, activate, under_review
    reason      TEXT,
    admin_name  VARCHAR(150),
    duration    VARCHAR(50),                               -- misal: "24 Jam", "7 Hari"
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_status_history_user ON user_status_history (user_id);

-- 1.4 user_reports
CREATE TABLE user_reports (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reported_by  VARCHAR(150) NOT NULL,
    type         VARCHAR(100) NOT NULL,
    description  TEXT         NOT NULL,
    status       VARCHAR(30)  NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending','investigating','resolved')),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_reports_user   ON user_reports (user_id);
CREATE INDEX idx_user_reports_status ON user_reports (status);

-- 1.5 user_audit_logs
CREATE TABLE user_audit_logs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_name   VARCHAR(150),
    action      VARCHAR(100) NOT NULL,
    before_val  JSONB,
    after_val   JSONB,
    reason      TEXT,
    admin_name  VARCHAR(150),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_audit_logs_user ON user_audit_logs (user_id);

-- ============================================================================
-- 2. DRIVERS & KENDARAAN
-- ============================================================================

-- 2.1 drivers
CREATE TABLE drivers (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name             VARCHAR(150)  NOT NULL,
    nik              CHAR(16)      NOT NULL UNIQUE,         -- Nomor Induk Kependudukan
    email            VARCHAR(255)  NOT NULL UNIQUE,
    phone            VARCHAR(20)   NOT NULL UNIQUE,
    password_hash    TEXT          NOT NULL,
    avatar_url       TEXT,
    gender           VARCHAR(10)   CHECK (gender IN ('male','female')),
    date_of_birth    DATE,
    address          TEXT,                                   -- alamat domisili (sesuai KTP)
    status           VARCHAR(30)   NOT NULL DEFAULT 'pending_verification'
                         CHECK (status IN ('active','pending_verification','suspended','inactive')),
    is_online        BOOLEAN       NOT NULL DEFAULT FALSE,
    autobid_enabled  BOOLEAN       NOT NULL DEFAULT FALSE,
    rating           DECIMAL(2,1)  DEFAULT 5.0,
    total_orders     INT           DEFAULT 0,
    cancel_rate      DECIMAL(5,2)  DEFAULT 0.00,
    acceptance_rate  DECIMAL(5,2)  DEFAULT 100.00,
    points           INT           DEFAULT 0,               -- saldo poin driver
    violations       INT           DEFAULT 0,
    reports          INT           DEFAULT 0,
    emergency_name   VARCHAR(150),
    emergency_phone  VARCHAR(20),
    joined_at        TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_drivers_nik       ON drivers (nik);
CREATE INDEX idx_drivers_email     ON drivers (email);
CREATE INDEX idx_drivers_phone     ON drivers (phone);
CREATE INDEX idx_drivers_status    ON drivers (status);
CREATE INDEX idx_drivers_is_online ON drivers (is_online);

COMMENT ON TABLE drivers IS 'Pengemudi / mitra becak listrik Cakli';

-- 2.2 vehicles
CREATE TABLE vehicles (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id      UUID         NOT NULL UNIQUE REFERENCES drivers(id) ON DELETE CASCADE,
    plate_number   VARCHAR(20)  NOT NULL UNIQUE,             -- plat nomor, misal "N 1234 SYBAU"
    model          VARCHAR(100) NOT NULL,                    -- misal "Becak Honda A70s"
    year           INT,
    color          VARCHAR(50),
    battery_ah     INT,                                      -- kapasitas baterai (Ah)
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_vehicles_driver ON vehicles (driver_id);

-- 2.3 driver_documents
CREATE TABLE driver_documents (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id    UUID         NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    doc_type     VARCHAR(20)  NOT NULL CHECK (doc_type IN ('ktp','sim','stnk','vehicle_photo')),
    file_url     TEXT         NOT NULL,
    is_verified  BOOLEAN      DEFAULT FALSE,
    uploaded_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    verified_at  TIMESTAMPTZ
);

CREATE INDEX idx_driver_documents_driver ON driver_documents (driver_id);

-- 2.4 driver_status_history
CREATE TABLE driver_status_history (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id   UUID         NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    action      VARCHAR(50)  NOT NULL,   -- suspend, verify, reactivate, edit_data
    reason      TEXT,
    admin_name  VARCHAR(150),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_driver_status_history_driver ON driver_status_history (driver_id);

-- 2.5 driver_violations
CREATE TABLE driver_violations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id   UUID         NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    type        VARCHAR(100) NOT NULL,
    description TEXT,
    severity    VARCHAR(20)  CHECK (severity IN ('low','medium','high','critical')),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_driver_violations_driver ON driver_violations (driver_id);

-- 2.6 driver_audit_logs
CREATE TABLE driver_audit_logs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id   UUID         NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    action      VARCHAR(100) NOT NULL,
    admin_name  VARCHAR(150),
    admin_role  VARCHAR(50),
    reason      TEXT,
    details     TEXT,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_driver_audit_logs_driver ON driver_audit_logs (driver_id);

-- ============================================================================
-- 3. DRIVER FITUR TAMBAHAN
-- ============================================================================

-- 3.1 driver_wallets (E-Wallet + Dompet driver)
CREATE TABLE driver_wallets (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id      UUID          NOT NULL UNIQUE REFERENCES drivers(id) ON DELETE CASCADE,
    ewallet_bal    DECIMAL(15,2) NOT NULL DEFAULT 0.00,     -- saldo E-Wallet
    cash_bal       DECIMAL(15,2) NOT NULL DEFAULT 0.00,     -- saldo Dompet
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT now()
);

-- 3.2 driver_wallet_transactions
CREATE TABLE driver_wallet_transactions (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id      UUID          NOT NULL REFERENCES driver_wallets(id) ON DELETE CASCADE,
    type           VARCHAR(20)   NOT NULL CHECK (type IN ('topup','withdraw','earning','deduction')),
    amount         DECIMAL(15,2) NOT NULL,
    description    TEXT,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_dwt_wallet ON driver_wallet_transactions (wallet_id);

-- 3.3 driver_bank_accounts
CREATE TABLE driver_bank_accounts (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id    UUID         NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    bank_name    VARCHAR(100) NOT NULL,
    account_no   VARCHAR(30)  NOT NULL,
    account_name VARCHAR(150) NOT NULL,
    is_primary   BOOLEAN      DEFAULT TRUE,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_driver_bank_driver ON driver_bank_accounts (driver_id);

-- 3.4 driver_schedules (jadwal operasional)
CREATE TABLE driver_schedules (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id   UUID        NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    day_of_week INT         NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),  -- 0=Senin
    start_time  TIME        NOT NULL,
    end_time    TIME        NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_driver_schedules_driver ON driver_schedules (driver_id);

-- 3.5 driver_sanctions (status akun & sanksi)
CREATE TABLE driver_sanctions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id   UUID         NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    type        VARCHAR(50)  NOT NULL,   -- warning, temp_suspend, perm_suspend
    reason      TEXT         NOT NULL,
    admin_name  VARCHAR(150),
    starts_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    ends_at     TIMESTAMPTZ,             -- NULL = permanent
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_driver_sanctions_driver ON driver_sanctions (driver_id);

-- 3.6 driver_referrals (ajak teman jadi mitra)
CREATE TABLE driver_referrals (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id     UUID        NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    referred_id     UUID        REFERENCES drivers(id) ON DELETE SET NULL,
    referral_code   VARCHAR(20) NOT NULL UNIQUE,
    status          VARCHAR(20) NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending','registered','active')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_driver_referrals_referrer ON driver_referrals (referrer_id);

-- 3.7 driver_qr_codes
CREATE TABLE driver_qr_codes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id   UUID        NOT NULL UNIQUE REFERENCES drivers(id) ON DELETE CASCADE,
    qr_data     TEXT        NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.8 driver_appointments (buat janji)
CREATE TABLE driver_appointments (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id      UUID         NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    subject        VARCHAR(200) NOT NULL,
    description    TEXT,
    appointment_at TIMESTAMPTZ  NOT NULL,
    status         VARCHAR(20)  NOT NULL DEFAULT 'scheduled'
                       CHECK (status IN ('scheduled','completed','cancelled')),
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_driver_appointments_driver ON driver_appointments (driver_id);

-- 3.9 partnership_agreements (perjanjian kemitraan)
CREATE TABLE partnership_agreements (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id   UUID        NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    version     VARCHAR(20) NOT NULL,
    signed_at   TIMESTAMPTZ,
    document_url TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_partnership_agreements_driver ON partnership_agreements (driver_id);

-- ============================================================================
-- 4. ZONES & TARIF
-- ============================================================================

-- 4.1 zones
CREATE TABLE zones (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code            VARCHAR(10)   NOT NULL UNIQUE,          -- misal "ZN-01"
    name            VARCHAR(150)  NOT NULL,
    city            VARCHAR(100)  NOT NULL,
    operating_hours VARCHAR(50),                            -- misal "06:00 - 22:00"
    density         VARCHAR(20)   CHECK (density IN ('low','medium','high','critical')),
    active_drivers  INT           DEFAULT 0,
    utilization     DECIMAL(5,2)  DEFAULT 0.00,
    daily_volume    INT           DEFAULT 0,
    daily_revenue   DECIMAL(15,2) DEFAULT 0.00,
    margin          DECIMAL(5,2)  DEFAULT 0.00,
    cancel_rate     DECIMAL(5,2)  DEFAULT 0.00,
    status          VARCHAR(20)   NOT NULL DEFAULT 'active'
                        CHECK (status IN ('active','monitoring','expansion','limited_hours')),
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_zones_code   ON zones (code);
CREATE INDEX idx_zones_city   ON zones (city);
CREATE INDEX idx_zones_status ON zones (status);

COMMENT ON TABLE zones IS 'Zona operasional / area layanan Cakli';

-- 4.2 zone_requests (permintaan ekspansi / penggabungan)
CREATE TABLE zone_requests (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type            VARCHAR(30)  NOT NULL CHECK (type IN ('expansion','merge')),
    description     TEXT         NOT NULL,
    requested_by    VARCHAR(150) NOT NULL,
    risk_level      VARCHAR(20)  CHECK (risk_level IN ('low','medium','high','critical')),
    sla_deadline    TIMESTAMPTZ,
    status          VARCHAR(20)  NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending','approved','rejected')),
    city            VARCHAR(100),
    est_daily_demand INT,
    est_driver_need  INT,
    risk_score       DECIMAL(3,1),
    est_bep          VARCHAR(50),                           -- estimasi Break-Even Point
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_zone_requests_status ON zone_requests (status);

-- 4.3 tariff_configs (konfigurasi tarif aktif)
CREATE TABLE tariff_configs (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    base_rate_per_km    DECIMAL(10,2) NOT NULL,              -- tarif dasar per KM
    min_fare            DECIMAL(10,2) NOT NULL,              -- tarif minimum (buka pintu)
    night_surcharge_pct DECIMAL(5,2)  DEFAULT 0.00,          -- biaya tambahan shift malam (%)
    surge_max           DECIMAL(3,1)  DEFAULT 1.0,           -- pengali lonjakan maks
    platform_fee_pct    DECIMAL(5,2)  DEFAULT 20.00,         -- biaya platform (%)
    driver_payout_pct   DECIMAL(5,2)  DEFAULT 80.00,         -- pembayaran driver (%)
    net_margin          DECIMAL(10,2) DEFAULT 0.00,          -- margin bersih per perjalanan
    activation_mode     VARCHAR(10)   DEFAULT 'now'
                            CHECK (activation_mode IN ('now','schedule')),
    scheduled_at        TIMESTAMPTZ,
    propagation_pct     DECIMAL(5,2)  DEFAULT 100.00,
    synced_nodes        INT           DEFAULT 0,
    total_nodes         INT           DEFAULT 0,
    last_propagated_at  TIMESTAMPTZ,
    churn_risk_pct      DECIMAL(5,2)  DEFAULT 0.00,
    cancel_increase_pct DECIMAL(5,2)  DEFAULT 0.00,
    change_threshold    DECIMAL(5,2)  DEFAULT 15.00,
    is_active           BOOLEAN       NOT NULL DEFAULT TRUE, -- hanya 1 yg aktif
    created_at          TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE tariff_configs IS 'Konfigurasi tarif master — harga per KM, biaya platform, dll.';

-- 4.4 tariff_version_history
CREATE TABLE tariff_version_history (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tariff_id   UUID         NOT NULL REFERENCES tariff_configs(id) ON DELETE CASCADE,
    version     VARCHAR(20)  NOT NULL,                      -- misal "v2.4.1"
    change_desc TEXT         NOT NULL,
    author      VARCHAR(150) NOT NULL,
    status      VARCHAR(20)  NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active','archived')),
    reason      TEXT,                                       -- alasan perubahan
    before_val  JSONB,
    after_val   JSONB,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_tariff_versions_tariff ON tariff_version_history (tariff_id);

-- 4.5 zone_tariff_multipliers (penyesuaian tarif per zona)
CREATE TABLE zone_tariff_multipliers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zone_id         UUID          NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
    tariff_id       UUID          NOT NULL REFERENCES tariff_configs(id) ON DELETE CASCADE,
    multiplier      DECIMAL(4,2)  NOT NULL DEFAULT 1.00,
    effective_rate   DECIMAL(10,2),
    margin          DECIMAL(5,2),
    volume          INT           DEFAULT 0,
    cancel_rate     DECIMAL(5,2)  DEFAULT 0.00,
    is_override     BOOLEAN       DEFAULT FALSE,
    override_note   TEXT,
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
    UNIQUE(zone_id, tariff_id)
);

CREATE INDEX idx_ztm_zone   ON zone_tariff_multipliers (zone_id);
CREATE INDEX idx_ztm_tariff ON zone_tariff_multipliers (tariff_id);

-- ============================================================================
-- 5. ORDERS & PAYMENTS
-- ============================================================================

-- 5.1 orders
CREATE TABLE orders (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code              VARCHAR(20)   NOT NULL UNIQUE,          -- misal "ORD-2026-001" atau "GK-91-1222377"
    user_id           UUID          NOT NULL REFERENCES users(id),
    driver_id         UUID          REFERENCES drivers(id),
    zone_id           UUID          REFERENCES zones(id),
    status            VARCHAR(30)   NOT NULL DEFAULT 'searching'
                          CHECK (status IN (
                              'searching','assigned','picking_up','on_trip',
                              'completed','cancelled','issue'
                          )),

    -- lokasi jemput
    pickup_name       VARCHAR(255),
    pickup_address    TEXT,
    pickup_lat        DECIMAL(10,7),
    pickup_lng        DECIMAL(10,7),

    -- lokasi tujuan
    dest_name         VARCHAR(255),
    dest_address      TEXT,
    dest_lat          DECIMAL(10,7),
    dest_lng          DECIMAL(10,7),

    -- keuangan
    base_fare         DECIMAL(10,2),
    service_fee       DECIMAL(10,2)  DEFAULT 0.00,
    discount          DECIMAL(10,2)  DEFAULT 0.00,
    surge_multiplier  DECIMAL(3,1)   DEFAULT 1.0,
    total_fare        DECIMAL(10,2)  NOT NULL DEFAULT 0.00,

    -- metrik rute
    distance_km       DECIMAL(6,2),
    est_duration_min  INT,
    actual_duration_min INT,

    -- pembayaran
    payment_method    VARCHAR(20)    CHECK (payment_method IN ('capay','cash','qris')),
    voucher_id        UUID,

    -- pembatalan
    cancel_reason     TEXT,
    cancel_by         VARCHAR(30)    CHECK (cancel_by IN ('user','driver','system')),
    cancelled_at      TIMESTAMPTZ,
    cancel_penalty    DECIMAL(10,2)  DEFAULT 0.00,

    -- points
    points_earned     INT            DEFAULT 0,

    -- timestamps
    ordered_at        TIMESTAMPTZ    NOT NULL DEFAULT now(),
    assigned_at       TIMESTAMPTZ,
    picked_up_at      TIMESTAMPTZ,
    completed_at      TIMESTAMPTZ,
    created_at        TIMESTAMPTZ    NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ    NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_code        ON orders (code);
CREATE INDEX idx_orders_user        ON orders (user_id);
CREATE INDEX idx_orders_driver      ON orders (driver_id);
CREATE INDEX idx_orders_zone        ON orders (zone_id);
CREATE INDEX idx_orders_status      ON orders (status);
CREATE INDEX idx_orders_ordered_at  ON orders (ordered_at);

COMMENT ON TABLE orders IS 'Pesanan / trip becak listrik';

-- 5.2 payments
CREATE TABLE payments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id        UUID          NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    method          VARCHAR(20)   NOT NULL CHECK (method IN ('capay','cash','qris')),
    amount          DECIMAL(10,2) NOT NULL,
    status          VARCHAR(20)   NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending','paid','refunded','failed')),
    paid_at         TIMESTAMPTZ,
    refunded_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_order  ON payments (order_id);
CREATE INDEX idx_payments_status ON payments (status);

-- 5.3 order_timeline (event tracking per order)
CREATE TABLE order_timeline (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id    UUID         NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    event       VARCHAR(100) NOT NULL,   -- searching, driver_assigned, picking_up, on_trip, completed, cancelled, issue_flagged
    actor       VARCHAR(150),            -- user/driver/system/admin name
    note        TEXT,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_timeline_order ON order_timeline (order_id);

-- 5.4 order_audit_logs (intervensi admin pada pesanan)
CREATE TABLE order_audit_logs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id    UUID         NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    action      VARCHAR(100) NOT NULL,   -- reassign, manual_cancel, flag_issue, fare_adjust
    admin_name  VARCHAR(150),
    reason      TEXT,
    details     JSONB,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_audit_logs_order ON order_audit_logs (order_id);

-- 5.5 ratings
CREATE TABLE ratings (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id     UUID          NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    user_id      UUID          NOT NULL REFERENCES users(id),
    driver_id    UUID          NOT NULL REFERENCES drivers(id),
    score        DECIMAL(2,1)  NOT NULL CHECK (score BETWEEN 0.5 AND 5.0),  -- half-star supported
    comment      TEXT,
    arrived_at   TIMESTAMPTZ,                                                -- "Sampai Pada"
    created_at   TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_ratings_order  ON ratings (order_id);
CREATE INDEX idx_ratings_user   ON ratings (user_id);
CREATE INDEX idx_ratings_driver ON ratings (driver_id);

COMMENT ON TABLE ratings IS 'Rating & ulasan user terhadap driver setelah trip selesai';

-- ============================================================================
-- 6. CHAT & NOTIFIKASI
-- ============================================================================

-- 6.1 chat_messages
CREATE TABLE chat_messages (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id    UUID         NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    sender_type VARCHAR(10)  NOT NULL CHECK (sender_type IN ('user','driver')),
    sender_id   UUID         NOT NULL,
    message     TEXT,
    media_url   TEXT,                      -- foto attachment (camera / gallery)
    media_type  VARCHAR(20),               -- 'image', 'file', dll.
    sent_at     TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_chat_order    ON chat_messages (order_id);
CREATE INDEX idx_chat_sender   ON chat_messages (sender_id);
CREATE INDEX idx_chat_sent_at  ON chat_messages (sent_at);

COMMENT ON TABLE chat_messages IS 'Pesan chat real-time antara user ↔ driver dalam satu trip';

-- 6.2 notifications
CREATE TABLE notifications (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_type VARCHAR(10)  NOT NULL CHECK (target_type IN ('user','driver','admin')),
    target_id   UUID         NOT NULL,
    title       VARCHAR(200) NOT NULL,
    body        TEXT,
    type        VARCHAR(50),              -- order_update, promo, system, warning, dll.
    is_read     BOOLEAN      DEFAULT FALSE,
    data        JSONB,                    -- payload tambahan (deep link, dll.)
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_notif_target ON notifications (target_type, target_id);
CREATE INDEX idx_notif_read   ON notifications (is_read);

-- ============================================================================
-- 7. VOUCHER & E-WALLET (CaPay — User Side)
-- ============================================================================

-- 7.1 vouchers
CREATE TABLE vouchers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code            VARCHAR(30)   NOT NULL UNIQUE,
    title           VARCHAR(200)  NOT NULL,                   -- misal "Diskon Hingga Rp 5.000"
    description     TEXT,
    discount_amount DECIMAL(10,2) NOT NULL,
    min_order       DECIMAL(10,2) DEFAULT 0.00,
    terms           TEXT,                                     -- syarat & ketentuan
    is_active       BOOLEAN       NOT NULL DEFAULT TRUE,
    valid_from      TIMESTAMPTZ   NOT NULL,
    valid_until     TIMESTAMPTZ   NOT NULL,
    max_claims      INT,                                      -- NULL = unlimited
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_vouchers_code   ON vouchers (code);
CREATE INDEX idx_vouchers_active ON vouchers (is_active);

COMMENT ON TABLE vouchers IS 'Voucher diskon yang bisa digunakan user saat order';

-- 7.2 voucher_claims
CREATE TABLE voucher_claims (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    voucher_id  UUID        NOT NULL REFERENCES vouchers(id) ON DELETE CASCADE,
    user_id     UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id    UUID        REFERENCES orders(id) ON DELETE SET NULL,
    claimed_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(voucher_id, user_id)                               -- 1 user max 1 claim per voucher
);

CREATE INDEX idx_voucher_claims_user ON voucher_claims (user_id);

-- 7.3 capay_wallets (E-Wallet user)
CREATE TABLE capay_wallets (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID          NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    balance     DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    updated_at  TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE capay_wallets IS 'Saldo CaPay (E-Wallet) milik user';

-- 7.4 capay_transactions
CREATE TABLE capay_transactions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id   UUID          NOT NULL REFERENCES capay_wallets(id) ON DELETE CASCADE,
    type        VARCHAR(20)   NOT NULL CHECK (type IN ('topup','payment','refund')),
    amount      DECIMAL(15,2) NOT NULL,
    order_id    UUID          REFERENCES orders(id) ON DELETE SET NULL,
    description TEXT,
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_capay_tx_wallet ON capay_transactions (wallet_id);

-- ============================================================================
-- 8. DRIVER EARNINGS & INCENTIVES
-- ============================================================================

-- 8.1 driver_earnings (pendapatan per order)
CREATE TABLE driver_earnings (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id   UUID          NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    order_id    UUID          NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    gross       DECIMAL(10,2) NOT NULL,
    platform_fee DECIMAL(10,2) DEFAULT 0.00,
    net         DECIMAL(10,2) NOT NULL,
    points      INT           DEFAULT 0,
    payment_method VARCHAR(20),
    earned_at   TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_driver_earnings_driver ON driver_earnings (driver_id);
CREATE INDEX idx_driver_earnings_date   ON driver_earnings (earned_at);

-- 8.2 driver_incentives (bonus insentif)
CREATE TABLE driver_incentives (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id    UUID          REFERENCES drivers(id) ON DELETE SET NULL,
    name         VARCHAR(200)  NOT NULL,               -- misal "Bonus 50 Trip"
    type         VARCHAR(50)   NOT NULL,               -- daily_target, weekly_bonus, referral_bonus
    amount       DECIMAL(10,2) NOT NULL,
    is_claimed   BOOLEAN       DEFAULT FALSE,
    valid_from   TIMESTAMPTZ,
    valid_until  TIMESTAMPTZ,
    created_at   TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_driver_incentives_driver ON driver_incentives (driver_id);

-- ============================================================================
-- 9. ADMIN & KEBIJAKAN
-- ============================================================================

-- 9.1 admins
CREATE TABLE admins (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code              VARCHAR(10)   NOT NULL UNIQUE,         -- misal "ADM-001"
    name              VARCHAR(150)  NOT NULL,
    email             VARCHAR(255)  NOT NULL UNIQUE,
    password_hash     TEXT          NOT NULL,
    role              VARCHAR(30)   NOT NULL
                          CHECK (role IN ('master_admin','operating_admin','reporting_admin')),
    scope             VARCHAR(20)   NOT NULL DEFAULT 'global'
                          CHECK (scope IN ('global','regional','zone_specific')),
    scope_detail      VARCHAR(150),                          -- nama wilayah/zona jika regional/zone
    mfa_status        VARCHAR(20)   NOT NULL DEFAULT 'disabled'
                          CHECK (mfa_status IN ('enabled','disabled','required')),
    status            VARCHAR(30)   NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active','suspended','pending_approval')),
    risk_level        VARCHAR(10)   DEFAULT 'low'
                          CHECK (risk_level IN ('low','medium','high')),
    last_login_at     TIMESTAMPTZ,
    last_action       VARCHAR(200),
    last_login_ip     VARCHAR(45),
    failed_logins     INT           DEFAULT 0,
    password_changed_at TIMESTAMPTZ,
    created_by        VARCHAR(150),
    created_at        TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_admins_code   ON admins (code);
CREATE INDEX idx_admins_email  ON admins (email);
CREATE INDEX idx_admins_role   ON admins (role);
CREATE INDEX idx_admins_status ON admins (status);

COMMENT ON TABLE admins IS 'Admin panel — Master, Operasional, Pelaporan';

-- 9.2 admin_activity_logs
CREATE TABLE admin_activity_logs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id    UUID         NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
    admin_name  VARCHAR(150),
    action      VARCHAR(200) NOT NULL,
    target      VARCHAR(200),
    ip_address  VARCHAR(45),
    result      VARCHAR(20)  DEFAULT 'success'
                    CHECK (result IN ('success','failed')),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_admin_activity_admin ON admin_activity_logs (admin_id);
CREATE INDEX idx_admin_activity_time  ON admin_activity_logs (created_at);

-- 9.3 partner_policies (kebijakan mitra global)
CREATE TABLE partner_policies (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform_cut_pct     DECIMAL(5,2)  NOT NULL,             -- potongan platform (%)
    vat_pct              DECIMAL(5,2)  DEFAULT 0.00,         -- PPN (%)
    daily_bonus_low      DECIMAL(10,2) DEFAULT 0.00,         -- bonus target order tier rendah
    daily_bonus_high     DECIMAL(10,2) DEFAULT 0.00,         -- bonus target order tier tinggi
    max_vehicle_age      INT,                                -- usia maks kendaraan (tahun)
    min_battery_ah       INT,                                -- kapasitas baterai minimal (Ah)
    min_partner_rating   DECIMAL(2,1)  DEFAULT 4.0,          -- rating minimal mitra
    version              VARCHAR(20),
    published_by         VARCHAR(150),
    is_active            BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at           TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ   NOT NULL DEFAULT now()
);

COMMENT ON TABLE partner_policies IS 'Kebijakan mitra global — bagi hasil, standar kendaraan, dll.';

-- ============================================================================
-- 10. PENGADUAN & SENGKETA
-- ============================================================================

-- 10.1 complaints
CREATE TABLE complaints (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code            VARCHAR(10)   NOT NULL UNIQUE,           -- misal "TKT-001"
    type            VARCHAR(50)   NOT NULL
                        CHECK (type IN (
                            'passenger_to_driver','driver_to_passenger',
                            'user_to_app','driver_to_app'
                        )),
    subject         VARCHAR(255)  NOT NULL,
    from_name       VARCHAR(150)  NOT NULL,
    from_role       VARCHAR(20)   NOT NULL,
    from_phone      VARCHAR(20),
    from_email      VARCHAR(255),
    to_name         VARCHAR(150),
    to_role         VARCHAR(20),
    to_phone        VARCHAR(20),
    to_email        VARCHAR(255),
    trip_id         UUID          REFERENCES orders(id) ON DELETE SET NULL,
    detail          TEXT          NOT NULL,
    priority        VARCHAR(10)   NOT NULL DEFAULT 'medium'
                        CHECK (priority IN ('low','medium','high')),
    status          VARCHAR(30)   NOT NULL DEFAULT 'new'
                        CHECK (status IN (
                            'new','investigating','awaiting_confirmation',
                            'escalated','resolved'
                        )),
    -- resolusi
    resolution_action VARCHAR(100),   -- suspend_perm, suspend_temp, valid, refund, warning, compensation, rejected
    resolution_notes  TEXT,
    resolved_at       TIMESTAMPTZ,
    resolved_by       VARCHAR(150),
    final_priority    VARCHAR(10),
    created_at        TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_complaints_code     ON complaints (code);
CREATE INDEX idx_complaints_status   ON complaints (status);
CREATE INDEX idx_complaints_priority ON complaints (priority);
CREATE INDEX idx_complaints_type     ON complaints (type);

COMMENT ON TABLE complaints IS 'Tiket keluhan / sengketa antara user, driver, atau sistem';

-- 10.2 complaint_timeline (kronologi investigasi)
CREATE TABLE complaint_timeline (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    complaint_id  UUID         NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    title         VARCHAR(200) NOT NULL,
    description   TEXT,
    performed_by  VARCHAR(150),
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_complaint_timeline ON complaint_timeline (complaint_id);

-- 10.3 complaint_escalations
CREATE TABLE complaint_escalations (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    complaint_id  UUID         NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    target        VARCHAR(100) NOT NULL,   -- admin_utama, tim_legal, manajer_ops, tim_teknis
    reason        TEXT         NOT NULL,
    escalated_by  VARCHAR(150),
    status        VARCHAR(20)  NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','resolved','rejected')),
    response      TEXT,
    escalated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_complaint_escalations ON complaint_escalations (complaint_id);

-- 10.4 complaint_audit_logs
CREATE TABLE complaint_audit_logs (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    complaint_id  UUID         NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    ticket_code   VARCHAR(10),
    action        VARCHAR(100) NOT NULL,   -- VIEW_DETAIL, VIEW_CONTACT, RESOLUTION_MADE, ESCALATION_MADE, NOTIFICATION_SENT, dll.
    performed_by  VARCHAR(150),
    details       TEXT,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_complaint_audit ON complaint_audit_logs (complaint_id);

-- ============================================================================
-- 11. MONITORING AKTIVITAS DRIVER
-- ============================================================================

-- 11.1 driver_activity_alerts
CREATE TABLE driver_activity_alerts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id       UUID         NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    issue           VARCHAR(200) NOT NULL,                     -- "Diam > 15 menit", "Pembatalan Sering", "Offline Mendadak"
    location        VARCHAR(255),
    duration        VARCHAR(50),                               -- misal "18 menit" atau "4 pembatalan"
    status          VARCHAR(20)  NOT NULL DEFAULT 'info'
                        CHECK (status IN ('info','warning','critical','monitored','investigated')),
    last_online     TIMESTAMPTZ,
    last_trip       VARCHAR(200),
    cancel_rate     DECIMAL(5,2),
    acceptance_rate DECIMAL(5,2),
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_daa_driver ON driver_activity_alerts (driver_id);
CREATE INDEX idx_daa_status ON driver_activity_alerts (status);

-- 11.2 driver_activity_logs (log tindakan admin terhadap alert)
CREATE TABLE driver_activity_logs (
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alert_id  UUID         NOT NULL REFERENCES driver_activity_alerts(id) ON DELETE CASCADE,
    driver_id UUID         NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    admin_name VARCHAR(150),
    action    VARCHAR(100) NOT NULL,   -- monitor, send_warning, investigate, escalate, contact
    details   TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_dal_alert  ON driver_activity_logs (alert_id);
CREATE INDEX idx_dal_driver ON driver_activity_logs (driver_id);

-- ============================================================================
-- 12. MASTER AUDIT LOG & REVENUE
-- ============================================================================

-- 12.1 master_audit_logs (log audit tingkat sistem untuk Master Admin)
CREATE TABLE master_audit_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code            VARCHAR(15)  NOT NULL UNIQUE,              -- misal "AUD-00001"
    timestamp       TIMESTAMPTZ  NOT NULL DEFAULT now(),
    actor_name      VARCHAR(150) NOT NULL,
    actor_role      VARCHAR(50),
    source          VARCHAR(30)  CHECK (source IN ('web_console','api_client','internal_worker','mobile_app')),
    action          VARCHAR(100) NOT NULL,
    module          VARCHAR(50)  CHECK (module IN (
                        'admin_management','zone_management','analytics',
                        'authentication','driver_management','tariff_management',
                        'partner_policy','order_management','user_management'
                    )),
    target          VARCHAR(200),
    severity        VARCHAR(10)  NOT NULL DEFAULT 'low'
                        CHECK (severity IN ('critical','high','medium','low')),
    result          VARCHAR(10)  NOT NULL DEFAULT 'success'
                        CHECK (result IN ('success','failed')),
    correlation_id  VARCHAR(20),                              -- misal "CORR-001"

    -- detail (nested)
    ip_address      VARCHAR(45),
    device          VARCHAR(200),     -- OS/browser
    location        VARCHAR(200),     -- kota + negara
    session_id      VARCHAR(100),
    changes         JSONB,            -- { field, before, after }

    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_mal_code       ON master_audit_logs (code);
CREATE INDEX idx_mal_severity   ON master_audit_logs (severity);
CREATE INDEX idx_mal_module     ON master_audit_logs (module);
CREATE INDEX idx_mal_timestamp  ON master_audit_logs (timestamp);
CREATE INDEX idx_mal_actor      ON master_audit_logs (actor_name);
CREATE INDEX idx_mal_corr       ON master_audit_logs (correlation_id);

COMMENT ON TABLE master_audit_logs IS 'Log audit kritis untuk Master Admin — enkripsi, immutable';

-- 12.2 revenue_transactions (kokpit keuangan)
CREATE TABLE revenue_transactions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code        VARCHAR(20)   NOT NULL UNIQUE,               -- misal "REV-2024-001"
    date        DATE          NOT NULL,
    source      VARCHAR(50)   NOT NULL
                    CHECK (source IN (
                        'order_commission','app_service_fee','partner_incentive',
                        'subscription','customer_refund'
                    )),
    amount      DECIMAL(15,2) NOT NULL,
    area        VARCHAR(100),
    type        VARCHAR(10)   NOT NULL CHECK (type IN ('credit','debit')),
    status      VARCHAR(20)   NOT NULL DEFAULT 'settled'
                    CHECK (status IN ('settled','disbursed','adjusted')),
    description TEXT,
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_revenue_date   ON revenue_transactions (date);
CREATE INDEX idx_revenue_source ON revenue_transactions (source);
CREATE INDEX idx_revenue_type   ON revenue_transactions (type);
CREATE INDEX idx_revenue_status ON revenue_transactions (status);

COMMENT ON TABLE revenue_transactions IS 'Log transaksi keuangan platform — pendapatan, pencairan, refund';

-- ============================================================================
-- 13. PARTNER POLICY DOCUMENTS (persyaratan dokumen onboarding)
-- ============================================================================

CREATE TABLE partner_policy_documents (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_id     UUID         NOT NULL REFERENCES partner_policies(id) ON DELETE CASCADE,
    doc_name      VARCHAR(150) NOT NULL,                     -- misal "KTP", "SIM C", "STNK"
    verification  VARCHAR(50),                               -- misal "Manual Review", "OCR", "Auto"
    expiry_period VARCHAR(50),                               -- misal "Seumur Hidup", "5 Tahun"
    is_required   BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_ppd_policy ON partner_policy_documents (policy_id);

-- ============================================================================
-- 14. SETTLEMENT BATCH (pencairan mitra)
-- ============================================================================

CREATE TABLE settlement_batches (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code           VARCHAR(20)   NOT NULL UNIQUE,            -- misal "STL-2026-001"
    date           DATE          NOT NULL,
    total_drivers  INT           NOT NULL DEFAULT 0,
    total_amount   DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    status         VARCHAR(20)   NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending','processing','completed','failed')),
    processed_at   TIMESTAMPTZ,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_settlement_date   ON settlement_batches (date);
CREATE INDEX idx_settlement_status ON settlement_batches (status);

COMMENT ON TABLE settlement_batches IS 'Batch pencairan pendapatan ke mitra driver';

-- ============================================================================
-- 15. VIEWS — Reporting & Analytics
-- ============================================================================

-- 15.1 vw_driver_performance
CREATE VIEW vw_driver_performance AS
SELECT
    d.id,
    d.name,
    d.rating,
    d.total_orders,
    d.cancel_rate,
    d.status,
    d.is_online,
    v.plate_number,
    v.model AS vehicle_model,
    COALESCE(SUM(de.net), 0)     AS total_earnings,
    COUNT(DISTINCT de.order_id)  AS completed_trips,
    CASE
        WHEN d.cancel_rate < 5.0  THEN 'Top Performer'
        WHEN d.cancel_rate < 10.0 THEN 'Stable'
        WHEN d.cancel_rate < 20.0 THEN 'Needs Review'
        ELSE 'Warning'
    END AS performance_label
FROM drivers d
LEFT JOIN vehicles v          ON v.driver_id = d.id
LEFT JOIN driver_earnings de  ON de.driver_id = d.id
GROUP BY d.id, d.name, d.rating, d.total_orders, d.cancel_rate,
         d.status, d.is_online, v.plate_number, v.model;

COMMENT ON VIEW vw_driver_performance IS 'Ringkasan performa driver untuk reporting admin';

-- 15.2 vw_zone_performance
CREATE VIEW vw_zone_performance AS
SELECT
    z.id,
    z.code,
    z.name,
    z.city,
    z.status,
    z.active_drivers,
    z.utilization,
    z.daily_volume,
    z.daily_revenue,
    z.margin,
    z.cancel_rate,
    COUNT(o.id)                                               AS total_orders,
    COALESCE(SUM(o.total_fare), 0)                            AS gross_revenue,
    COUNT(CASE WHEN o.status = 'cancelled' THEN 1 END)        AS cancelled_orders
FROM zones z
LEFT JOIN orders o ON o.zone_id = z.id
GROUP BY z.id, z.code, z.name, z.city, z.status, z.active_drivers,
         z.utilization, z.daily_volume, z.daily_revenue, z.margin, z.cancel_rate;

COMMENT ON VIEW vw_zone_performance IS 'Ringkasan performa zona untuk analitik lintas area';

-- 15.3 vw_user_summary
CREATE VIEW vw_user_summary AS
SELECT
    u.id,
    u.name,
    u.email,
    u.phone,
    u.status,
    u.rating,
    u.total_orders,
    u.total_cancel,
    u.cancel_rate,
    u.total_reports,
    u.created_at                                          AS joined_at,
    COUNT(DISTINCT o.id)                                  AS order_count,
    COALESCE(SUM(o.total_fare), 0)                        AS total_spent,
    MAX(o.ordered_at)                                     AS last_order_at
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name, u.email, u.phone, u.status, u.rating,
         u.total_orders, u.total_cancel, u.cancel_rate, u.total_reports, u.created_at;

COMMENT ON VIEW vw_user_summary IS 'Ringkasan data user untuk moderasi & reporting';

-- ============================================================================
-- 16. SEED DATA
-- ============================================================================

-- 16.1 Zona operasional awal
INSERT INTO zones (code, name, city, operating_hours, density, status) VALUES
    ('ZN-01', 'Klojen',       'Malang',  '06:00 - 22:00', 'high',   'active'),
    ('ZN-02', 'Lowokwaru',    'Malang',  '06:00 - 22:00', 'high',   'active'),
    ('ZN-03', 'Sukun',        'Malang',  '06:00 - 21:00', 'medium', 'active'),
    ('ZN-04', 'Blimbing',     'Malang',  '06:00 - 21:00', 'medium', 'active'),
    ('ZN-05', 'Kedungkandang','Malang',  '06:00 - 20:00', 'low',    'monitoring'),
    ('ZN-06', 'Batu Kota',    'Batu',    '07:00 - 20:00', 'low',    'expansion');

-- 16.2 Konfigurasi tarif default
INSERT INTO tariff_configs (
    base_rate_per_km, min_fare, night_surcharge_pct, surge_max,
    platform_fee_pct, driver_payout_pct, activation_mode, is_active
) VALUES (
    3000.00, 5000.00, 20.00, 2.0,
    20.00, 80.00, 'now', TRUE
);

-- 16.3 Kebijakan mitra default
INSERT INTO partner_policies (
    platform_cut_pct, vat_pct, daily_bonus_low, daily_bonus_high,
    max_vehicle_age, min_battery_ah, min_partner_rating, version, is_active
) VALUES (
    20.00, 11.00, 15000.00, 50000.00,
    5, 20, 4.0, 'v1.0', TRUE
);

-- ============================================================================
-- DONE
-- ============================================================================
-- Total: 49 tabel + 3 views + 70+ indeks
-- Kompatibel PostgreSQL 15+
-- ============================================================================