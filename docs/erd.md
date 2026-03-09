// ============================================================================
// CAKLI PLATFORM — ENTITY RELATIONSHIP DIAGRAM
// Generated from: docs/feature.md & docs/db_cakli.sql
// ============================================================================

// ============================================================================
// MASTER ADMIN — Core Entities
// ============================================================================

cities [icon: map-pin, color: orange] {
  id bigint pk
  name string unique
  color_hex string
  created_at timestamp
  updated_at timestamp
}

zones [icon: navigation, color: orange] {
  id bigint pk
  code string unique
  name string
  city_id bigint fk
  operating_hours string
  density enum(Tinggi, Kritis, Sedang, Rendah)
  status enum(Aktif, Pemantauan, Ekspansi, Jam Terbatas)
  active_drivers int
  utilization decimal
  daily_volume int
  revenue bigint
  margin decimal
  cancel_rate decimal
  created_at timestamp
  updated_at timestamp
}

regional_requests [icon: git-pull-request, color: orange] {
  id bigint pk
  type enum(Ekspansi zona baru, Penggabungan zona)
  description text
  requested_by bigint fk
  risk_level enum(Rendah, Sedang, Tinggi, Kritis)
  sla_deadline datetime
  status enum(Pending, Approved, Rejected)
  reviewed_by bigint fk
  reviewed_at datetime
  created_at timestamp
  updated_at timestamp
}

// ============================================================================
// MASTER ADMIN — Tariff Management
// ============================================================================

tariff_configs [icon: dollar-sign, color: green] {
  id bigint pk
  version string unique
  base_rate_per_km bigint
  minimum_fare bigint
  night_surcharge_pct decimal
  max_surge_multiplier decimal
  platform_fee_pct decimal
  driver_payout_pct decimal
  change_threshold_pct decimal
  activation_mode enum(now, schedule)
  scheduled_at datetime
  status enum(Aktif, Diarsipkan)
  change_reason text
  created_by bigint fk
  created_at timestamp
  updated_at timestamp
}

tariff_zone_overrides [icon: sliders, color: green] {
  id bigint pk
  tariff_id bigint fk
  zone_id bigint fk
  multiplier decimal
  effective_rate bigint
  is_override boolean
  override_note text
  created_at timestamp
  updated_at timestamp
}

tariff_propagation [icon: refresh-cw, color: green] {
  id bigint pk
  tariff_id bigint fk
  zone_id bigint fk
  sync_status enum(Synced, Pending, Failed)
  synced_at datetime
  error_message text
  created_at timestamp
}

// ============================================================================
// MASTER ADMIN — Access Control & Security
// ============================================================================

admins [icon: shield, color: red] {
  id bigint pk
  code string unique
  name string
  email string unique
  password_hash string
  role enum(Master Admin, Operating Admin, Reporting Admin)
  scope enum(Global, Regional, Zone-Specific)
  scope_detail string
  mfa_status enum(Enabled, Disabled, Required)
  status enum(Active, Suspended, Pending Approval)
  risk_level enum(High, Medium, Low)
  last_login_at datetime
  last_action string
  last_login_ip string
  password_changed_at datetime
  failed_logins int
  created_by bigint fk
  created_at timestamp
  updated_at timestamp
}

modules [icon: layout, color: red] {
  id bigint pk
  name string unique
}

permissions [icon: key, color: red] {
  id bigint pk
  module_id bigint fk
  role enum(Master Admin, Operating Admin, Reporting Admin)
  capability enum(View, Edit, Approve, Export, Delete, Suspend)
  is_allowed boolean
  created_at timestamp
}

audit_logs [icon: file-text, color: red] {
  id bigint pk
  code string unique
  timestamp datetime
  actor_id bigint fk
  actor_name string
  actor_role string
  source enum(Web Console, API Client, Internal Worker, Mobile App)
  action string
  module enum(Admin Management, Zone Management, Analytics, Authentication, Driver Management, Tariff Management, Order Management, User Management, System)
  target string
  severity enum(Critical, High, Medium, Low)
  result enum(Success, Failed)
  correlation_id string
  ip_address string
  device string
  location string
  session_id string
  change_field string
  change_before text
  change_after text
  created_at timestamp
}

security_anomalies [icon: alert-triangle, color: red] {
  id bigint pk
  type string
  message text
  severity enum(Critical, High, Medium, Low)
  is_resolved boolean
  resolved_by bigint fk
  resolved_at datetime
  created_at timestamp
}

// ============================================================================
// MASTER ADMIN — Partner Policies
// ============================================================================

partner_policies [icon: handshake, color: orange] {
  id bigint pk
  platform_fee_pct decimal
  tax_pct decimal
  bonus_10_orders bigint
  bonus_15_orders bigint
  max_vehicle_age_years int
  min_battery_capacity_ah int
  min_driver_rating decimal
  fleet_standard_version string
  is_active boolean
  published_by bigint fk
  created_at timestamp
  updated_at timestamp
}

onboarding_requirements [icon: clipboard, color: orange] {
  id bigint pk
  document_name string
  verification_type string
  validity_period string
  is_required boolean
  created_at timestamp
  updated_at timestamp
}

// ============================================================================
// OPERATION ADMIN — Users / Customers
// ============================================================================

users [icon: user, color: blue] {
  id bigint pk
  code string unique
  name string
  email string unique
  phone string
  password_hash string
  status enum(Active, Suspended, Under Review)
  rating decimal
  total_orders int
  total_cancel int
  cancel_rate decimal
  total_reports int
  joined_date date
  created_at timestamp
  updated_at timestamp
}

user_status_history [icon: clock, color: blue] {
  id bigint pk
  user_id bigint fk
  action string
  reason text
  admin_id bigint fk
  duration string
  suspend_type enum(Temporary, Permanent)
  created_at timestamp
}

user_reports [icon: flag, color: blue] {
  id bigint pk
  user_id bigint fk
  reported_by string
  type string
  description text
  status enum(Resolved, Investigating, Pending)
  created_at timestamp
  updated_at timestamp
}

user_audit_logs [icon: list, color: blue] {
  id bigint pk
  user_id bigint fk
  action string
  field_changed string
  before_value text
  after_value text
  reason text
  admin_id bigint fk
  created_at timestamp
}

// ============================================================================
// OPERATION ADMIN — Drivers
// ============================================================================

drivers [icon: truck, color: purple] {
  id bigint pk
  code string unique
  name string
  nik char(16) unique
  phone string
  email string
  address text
  date_of_birth date
  gender enum(Laki-laki, Perempuan)
  status enum(Aktif, Pending Verifikasi, Suspend, Nonaktif)
  online_status enum(Online, Offline)
  rating decimal
  total_orders int
  cancel_rate decimal
  acceptance_rate decimal
  violations int
  reports int
  zone_id bigint fk
  join_date date
  profile_photo_url string
  created_at timestamp
  updated_at timestamp
}

driver_vehicles [icon: zap, color: purple] {
  id bigint pk
  driver_id bigint fk
  plate_number string
  model string
  year year
  color string
  created_at timestamp
  updated_at timestamp
}

driver_documents [icon: file, color: purple] {
  id bigint pk
  driver_id bigint fk
  document_type enum(KTP, SIM, STNK, Foto Kendaraan, Sertifikasi Safety, SKCK)
  file_url string
  is_verified boolean
  verified_by bigint fk
  verified_at datetime
  expires_at date
  created_at timestamp
  updated_at timestamp
}

driver_status_history [icon: activity, color: purple] {
  id bigint pk
  driver_id bigint fk
  action enum(Suspend, Verifikasi, Aktivasi Kembali, Edit Data, Nonaktifkan)
  reason text
  admin_id bigint fk
  created_at timestamp
}

driver_emergency_contacts [icon: phone, color: purple] {
  id bigint pk
  driver_id bigint fk
  contact_name string
  contact_phone string
  created_at timestamp
}

driver_activity_alerts [icon: bell, color: purple] {
  id bigint pk
  driver_id bigint fk
  issue string
  location string
  duration string
  status enum(Peringatan, Kritis, Info, Dipantau, Diselidiki)
  last_online datetime
  last_trip string
  admin_id bigint fk
  created_at timestamp
  updated_at timestamp
}

// ============================================================================
// OPERATION ADMIN — Orders
// ============================================================================

orders [icon: shopping-cart, color: green] {
  id bigint pk
  code string unique
  user_id bigint fk
  driver_id bigint fk
  zone_id bigint fk
  status enum(Mencari, Assigned, On-Trip, Selesai, Batal, Issue)
  pickup_location string
  dropoff_location string
  pickup_lat decimal
  pickup_lng decimal
  dropoff_lat decimal
  dropoff_lng decimal
  distance_km decimal
  duration_minutes int
  base_fare bigint
  service_fee bigint
  discount bigint
  total_fare bigint
  surge_multiplier decimal
  payment_method string
  cancel_reason text
  cancel_type enum(Dibatalkan Pelanggan, Dibatalkan Pengemudi, Sistem Habis Waktu)
  cancel_penalty bigint
  ordered_at datetime
  completed_at datetime
  created_at timestamp
  updated_at timestamp
}

order_interventions [icon: tool, color: green] {
  id bigint pk
  order_id bigint fk
  action enum(Reassign, Assign Manual, Tandai Masalah, Pembatalan Manual, Penyesuaian Tarif)
  reason text
  admin_id bigint fk
  details json
  created_at timestamp
}

// ============================================================================
// OPERATION ADMIN — Complaints & Disputes
// ============================================================================

complaints [icon: alert-circle, color: yellow] {
  id bigint pk
  code string unique
  type enum(Penumpang-Pengemudi, Pengemudi-Penumpang, Pengguna-Aplikasi, Pengemudi-Aplikasi)
  subject string
  detail text
  from_name string
  from_role string
  from_phone string
  from_email string
  to_name string
  to_role string
  to_phone string
  to_email string
  trip_id bigint fk
  status enum(Baru, Sedang Diinvestigasi, Menunggu Konfirmasi, Dieskalasi, Selesai)
  priority enum(Tinggi, Sedang, Rendah)
  resolution_action enum(Suspend Permanen, Suspend Sementara, Laporan Valid, Refund Diberikan, Peringatan Diberikan, Kompensasi, Ditolak)
  resolution_notes text
  resolved_at datetime
  resolved_by bigint fk
  escalation_target enum(Admin Utama, Tim Legal, Manajer Operasional, Tim Teknis)
  escalation_reason text
  escalated_at datetime
  escalated_by bigint fk
  escalation_status enum(PENDING, RESOLVED, REJECTED)
  reported_at datetime
  created_at timestamp
  updated_at timestamp
}

complaint_timeline [icon: git-commit, color: yellow] {
  id bigint pk
  complaint_id bigint fk
  title string
  description text
  performed_by string
  created_at timestamp
}

complaint_activity_logs [icon: eye, color: yellow] {
  id bigint pk
  complaint_id bigint fk
  action enum(VIEW_DETAIL, VIEW_CONTACT, OPEN_ESCALATION, CONTACT_MADE, RESOLUTION_MADE, ESCALATION_MADE, NOTIFICATION_SENT)
  performed_by string
  details text
  created_at timestamp
}

// ============================================================================
// REPORTING ADMIN — Financial
// ============================================================================

transactions [icon: credit-card, color: green] {
  id bigint pk
  code string unique
  date date
  source enum(Komisi Order, Biaya Layanan App, Insentif Mitra, Langganan, Refund Pelanggan)
  amount bigint
  area string
  zone_id bigint fk
  status enum(Settled, Dibayarkan, Disesuaikan)
  type enum(Credit, Debit)
  order_id bigint fk
  driver_id bigint fk
  created_at timestamp
}

settlement_batches [icon: layers, color: green] {
  id bigint pk
  code string unique
  date date
  total_drivers int
  total_amount bigint
  status enum(Menunggu, Diproses, Selesai, Gagal)
  processed_by bigint fk
  processed_at datetime
  created_at timestamp
  updated_at timestamp
}

settlement_details [icon: check-square, color: green] {
  id bigint pk
  batch_id bigint fk
  driver_id bigint fk
  amount bigint
  status enum(Pending, Transferred, Failed)
  transferred_at datetime
  created_at timestamp
}

// ============================================================================
// RELATIONSHIPS
// ============================================================================

// --- Zones & Cities ---
zones.city_id > cities.id

// --- Regional Requests ---
regional_requests.requested_by > admins.id
regional_requests.reviewed_by > admins.id

// --- Tariff Configs ---
tariff_configs.created_by > admins.id
tariff_zone_overrides.tariff_id > tariff_configs.id
tariff_zone_overrides.zone_id > zones.id
tariff_propagation.tariff_id > tariff_configs.id
tariff_propagation.zone_id > zones.id

// --- Admins (self-referencing) ---
admins.created_by > admins.id

// --- Permissions ---
permissions.module_id > modules.id

// --- Audit Logs ---
audit_logs.actor_id > admins.id

// --- Security Anomalies ---
security_anomalies.resolved_by > admins.id

// --- Partner Policies ---
partner_policies.published_by > admins.id

// --- Users ---
user_status_history.user_id > users.id
user_status_history.admin_id > admins.id
user_reports.user_id > users.id
user_audit_logs.user_id > users.id
user_audit_logs.admin_id > admins.id

// --- Drivers ---
drivers.zone_id > zones.id
driver_vehicles.driver_id > drivers.id
driver_documents.driver_id > drivers.id
driver_documents.verified_by > admins.id
driver_status_history.driver_id > drivers.id
driver_status_history.admin_id > admins.id
driver_emergency_contacts.driver_id > drivers.id
driver_activity_alerts.driver_id > drivers.id
driver_activity_alerts.admin_id > admins.id

// --- Orders ---
orders.user_id > users.id
orders.driver_id > drivers.id
orders.zone_id > zones.id
order_interventions.order_id > orders.id
order_interventions.admin_id > admins.id

// --- Complaints ---
complaints.trip_id > orders.id
complaints.resolved_by > admins.id
complaints.escalated_by > admins.id
complaint_timeline.complaint_id > complaints.id
complaint_activity_logs.complaint_id > complaints.id

// --- Financial / Transactions ---
transactions.zone_id > zones.id
transactions.order_id > orders.id
transactions.driver_id > drivers.id

// --- Settlements ---
settlement_batches.processed_by > admins.id
settlement_details.batch_id > settlement_batches.id
settlement_details.driver_id > drivers.id
