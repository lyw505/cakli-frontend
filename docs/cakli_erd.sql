// ============================================================================
// CAKLI ERD — Eraser.io DSL Format
// ============================================================================
// Platform   : Cakli 1.0 (Becak Listrik Ride-Hailing)
// Total      : 49 tabel + 3 views
// ============================================================================

// ============================================================================
// 1. USERS & PROFIL
// ============================================================================

users [icon: user, color: blue] {
  id UUID pk
  name VARCHAR
  email VARCHAR
  phone VARCHAR
  password_hash TEXT
  pin_hash VARCHAR
  avatar_url TEXT
  status VARCHAR
  rating DECIMAL
  total_orders INT
  total_cancel INT
  cancel_rate DECIMAL
  total_reports INT
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
}

saved_addresses [icon: map-pin, color: blue] {
  id UUID pk
  user_id UUID fk
  label VARCHAR
  address TEXT
  latitude DECIMAL
  longitude DECIMAL
  landmark VARCHAR
  is_default BOOLEAN
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
}

user_status_history [icon: clock, color: blue] {
  id UUID pk
  user_id UUID fk
  action VARCHAR
  reason TEXT
  admin_name VARCHAR
  duration VARCHAR
  created_at TIMESTAMPTZ
}

user_reports [icon: alert-triangle, color: blue] {
  id UUID pk
  user_id UUID fk
  reported_by VARCHAR
  type VARCHAR
  description TEXT
  status VARCHAR
  created_at TIMESTAMPTZ
}

user_audit_logs [icon: file-text, color: blue] {
  id UUID pk
  user_id UUID fk
  user_name VARCHAR
  action VARCHAR
  before_val JSONB
  after_val JSONB
  reason TEXT
  admin_name VARCHAR
  created_at TIMESTAMPTZ
}

// ============================================================================
// 2. DRIVERS & KENDARAAN
// ============================================================================

drivers [icon: truck, color: green] {
  id UUID pk
  name VARCHAR
  nik CHAR
  email VARCHAR
  phone VARCHAR
  password_hash TEXT
  avatar_url TEXT
  gender VARCHAR
  date_of_birth DATE
  address TEXT
  status VARCHAR
  is_online BOOLEAN
  autobid_enabled BOOLEAN
  rating DECIMAL
  total_orders INT
  cancel_rate DECIMAL
  acceptance_rate DECIMAL
  points INT
  violations INT
  reports INT
  emergency_name VARCHAR
  emergency_phone VARCHAR
  joined_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
}

vehicles [icon: zap, color: green] {
  id UUID pk
  driver_id UUID fk
  plate_number VARCHAR
  model VARCHAR
  year INT
  color VARCHAR
  battery_ah INT
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
}

driver_documents [icon: file, color: green] {
  id UUID pk
  driver_id UUID fk
  doc_type VARCHAR
  file_url TEXT
  is_verified BOOLEAN
  uploaded_at TIMESTAMPTZ
  verified_at TIMESTAMPTZ
}

driver_status_history [icon: clock, color: green] {
  id UUID pk
  driver_id UUID fk
  action VARCHAR
  reason TEXT
  admin_name VARCHAR
  created_at TIMESTAMPTZ
}

driver_violations [icon: alert-circle, color: green] {
  id UUID pk
  driver_id UUID fk
  type VARCHAR
  description TEXT
  severity VARCHAR
  created_at TIMESTAMPTZ
}

driver_audit_logs [icon: file-text, color: green] {
  id UUID pk
  driver_id UUID fk
  action VARCHAR
  admin_name VARCHAR
  admin_role VARCHAR
  reason TEXT
  details TEXT
  created_at TIMESTAMPTZ
}

// ============================================================================
// 3. DRIVER FITUR TAMBAHAN
// ============================================================================

driver_wallets [icon: credit-card, color: green] {
  id UUID pk
  driver_id UUID fk
  ewallet_bal DECIMAL
  cash_bal DECIMAL
  updated_at TIMESTAMPTZ
}

driver_wallet_transactions [icon: repeat, color: green] {
  id UUID pk
  wallet_id UUID fk
  type VARCHAR
  amount DECIMAL
  description TEXT
  created_at TIMESTAMPTZ
}

driver_bank_accounts [icon: landmark, color: green] {
  id UUID pk
  driver_id UUID fk
  bank_name VARCHAR
  account_no VARCHAR
  account_name VARCHAR
  is_primary BOOLEAN
  created_at TIMESTAMPTZ
}

driver_schedules [icon: calendar, color: green] {
  id UUID pk
  driver_id UUID fk
  day_of_week INT
  start_time TIME
  end_time TIME
  created_at TIMESTAMPTZ
}

driver_sanctions [icon: slash, color: green] {
  id UUID pk
  driver_id UUID fk
  type VARCHAR
  reason TEXT
  admin_name VARCHAR
  starts_at TIMESTAMPTZ
  ends_at TIMESTAMPTZ
  created_at TIMESTAMPTZ
}

driver_referrals [icon: share-2, color: green] {
  id UUID pk
  referrer_id UUID fk
  referred_id UUID fk
  referral_code VARCHAR
  status VARCHAR
  created_at TIMESTAMPTZ
}

driver_qr_codes [icon: maximize, color: green] {
  id UUID pk
  driver_id UUID fk
  qr_data TEXT
  created_at TIMESTAMPTZ
}

driver_appointments [icon: calendar, color: green] {
  id UUID pk
  driver_id UUID fk
  subject VARCHAR
  description TEXT
  appointment_at TIMESTAMPTZ
  status VARCHAR
  created_at TIMESTAMPTZ
}

partnership_agreements [icon: file-text, color: green] {
  id UUID pk
  driver_id UUID fk
  version VARCHAR
  signed_at TIMESTAMPTZ
  document_url TEXT
  created_at TIMESTAMPTZ
}

// ============================================================================
// 4. ZONES & TARIF
// ============================================================================

zones [icon: map, color: orange] {
  id UUID pk
  code VARCHAR
  name VARCHAR
  city VARCHAR
  operating_hours VARCHAR
  density VARCHAR
  active_drivers INT
  utilization DECIMAL
  daily_volume INT
  daily_revenue DECIMAL
  margin DECIMAL
  cancel_rate DECIMAL
  status VARCHAR
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
}

zone_requests [icon: git-pull-request, color: orange] {
  id UUID pk
  type VARCHAR
  description TEXT
  requested_by VARCHAR
  risk_level VARCHAR
  sla_deadline TIMESTAMPTZ
  status VARCHAR
  city VARCHAR
  est_daily_demand INT
  est_driver_need INT
  risk_score DECIMAL
  est_bep VARCHAR
  created_at TIMESTAMPTZ
}

tariff_configs [icon: dollar-sign, color: orange] {
  id UUID pk
  base_rate_per_km DECIMAL
  min_fare DECIMAL
  night_surcharge_pct DECIMAL
  surge_max DECIMAL
  platform_fee_pct DECIMAL
  driver_payout_pct DECIMAL
  net_margin DECIMAL
  activation_mode VARCHAR
  scheduled_at TIMESTAMPTZ
  propagation_pct DECIMAL
  synced_nodes INT
  total_nodes INT
  last_propagated_at TIMESTAMPTZ
  churn_risk_pct DECIMAL
  cancel_increase_pct DECIMAL
  change_threshold DECIMAL
  is_active BOOLEAN
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
}

tariff_version_history [icon: git-commit, color: orange] {
  id UUID pk
  tariff_id UUID fk
  version VARCHAR
  change_desc TEXT
  author VARCHAR
  status VARCHAR
  reason TEXT
  before_val JSONB
  after_val JSONB
  created_at TIMESTAMPTZ
}

zone_tariff_multipliers [icon: percent, color: orange] {
  id UUID pk
  zone_id UUID fk
  tariff_id UUID fk
  multiplier DECIMAL
  effective_rate DECIMAL
  margin DECIMAL
  volume INT
  cancel_rate DECIMAL
  is_override BOOLEAN
  override_note TEXT
  updated_at TIMESTAMPTZ
}

// ============================================================================
// 5. ORDERS & PAYMENTS
// ============================================================================

orders [icon: shopping-cart, color: red] {
  id UUID pk
  code VARCHAR
  user_id UUID fk
  driver_id UUID fk
  zone_id UUID fk
  status VARCHAR
  pickup_name VARCHAR
  pickup_address TEXT
  pickup_lat DECIMAL
  pickup_lng DECIMAL
  dest_name VARCHAR
  dest_address TEXT
  dest_lat DECIMAL
  dest_lng DECIMAL
  base_fare DECIMAL
  service_fee DECIMAL
  discount DECIMAL
  surge_multiplier DECIMAL
  total_fare DECIMAL
  distance_km DECIMAL
  est_duration_min INT
  actual_duration_min INT
  payment_method VARCHAR
  voucher_id UUID
  cancel_reason TEXT
  cancel_by VARCHAR
  cancelled_at TIMESTAMPTZ
  cancel_penalty DECIMAL
  points_earned INT
  ordered_at TIMESTAMPTZ
  assigned_at TIMESTAMPTZ
  picked_up_at TIMESTAMPTZ
  completed_at TIMESTAMPTZ
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
}

payments [icon: credit-card, color: red] {
  id UUID pk
  order_id UUID fk
  method VARCHAR
  amount DECIMAL
  status VARCHAR
  paid_at TIMESTAMPTZ
  refunded_at TIMESTAMPTZ
  created_at TIMESTAMPTZ
}

order_timeline [icon: activity, color: red] {
  id UUID pk
  order_id UUID fk
  event VARCHAR
  actor VARCHAR
  note TEXT
  created_at TIMESTAMPTZ
}

order_audit_logs [icon: file-text, color: red] {
  id UUID pk
  order_id UUID fk
  action VARCHAR
  admin_name VARCHAR
  reason TEXT
  details JSONB
  created_at TIMESTAMPTZ
}

ratings [icon: star, color: red] {
  id UUID pk
  order_id UUID fk
  user_id UUID fk
  driver_id UUID fk
  score DECIMAL
  comment TEXT
  arrived_at TIMESTAMPTZ
  created_at TIMESTAMPTZ
}

// ============================================================================
// 6. CHAT & NOTIFIKASI
// ============================================================================

chat_messages [icon: message-circle, color: purple] {
  id UUID pk
  order_id UUID fk
  sender_type VARCHAR
  sender_id UUID
  message TEXT
  media_url TEXT
  media_type VARCHAR
  sent_at TIMESTAMPTZ
}

notifications [icon: bell, color: purple] {
  id UUID pk
  target_type VARCHAR
  target_id UUID
  title VARCHAR
  body TEXT
  type VARCHAR
  is_read BOOLEAN
  data JSONB
  created_at TIMESTAMPTZ
}

// ============================================================================
// 7. VOUCHER & E-WALLET (CaPay)
// ============================================================================

vouchers [icon: tag, color: yellow] {
  id UUID pk
  code VARCHAR
  title VARCHAR
  description TEXT
  discount_amount DECIMAL
  min_order DECIMAL
  terms TEXT
  is_active BOOLEAN
  valid_from TIMESTAMPTZ
  valid_until TIMESTAMPTZ
  max_claims INT
  created_at TIMESTAMPTZ
}

voucher_claims [icon: check-circle, color: yellow] {
  id UUID pk
  voucher_id UUID fk
  user_id UUID fk
  order_id UUID fk
  claimed_at TIMESTAMPTZ
}

capay_wallets [icon: credit-card, color: yellow] {
  id UUID pk
  user_id UUID fk
  balance DECIMAL
  updated_at TIMESTAMPTZ
}

capay_transactions [icon: repeat, color: yellow] {
  id UUID pk
  wallet_id UUID fk
  type VARCHAR
  amount DECIMAL
  order_id UUID fk
  description TEXT
  created_at TIMESTAMPTZ
}

// ============================================================================
// 8. DRIVER EARNINGS & INCENTIVES
// ============================================================================

driver_earnings [icon: trending-up, color: green] {
  id UUID pk
  driver_id UUID fk
  order_id UUID fk
  gross DECIMAL
  platform_fee DECIMAL
  net DECIMAL
  points INT
  payment_method VARCHAR
  earned_at TIMESTAMPTZ
}

driver_incentives [icon: gift, color: green] {
  id UUID pk
  driver_id UUID fk
  name VARCHAR
  type VARCHAR
  amount DECIMAL
  is_claimed BOOLEAN
  valid_from TIMESTAMPTZ
  valid_until TIMESTAMPTZ
  created_at TIMESTAMPTZ
}

// ============================================================================
// 9. ADMIN & KEBIJAKAN
// ============================================================================

admins [icon: shield, color: gray] {
  id UUID pk
  code VARCHAR
  name VARCHAR
  email VARCHAR
  password_hash TEXT
  role VARCHAR
  scope VARCHAR
  scope_detail VARCHAR
  mfa_status VARCHAR
  status VARCHAR
  risk_level VARCHAR
  last_login_at TIMESTAMPTZ
  last_action VARCHAR
  last_login_ip VARCHAR
  failed_logins INT
  password_changed_at TIMESTAMPTZ
  created_by VARCHAR
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
}

admin_activity_logs [icon: activity, color: gray] {
  id UUID pk
  admin_id UUID fk
  admin_name VARCHAR
  action VARCHAR
  target VARCHAR
  ip_address VARCHAR
  result VARCHAR
  created_at TIMESTAMPTZ
}

partner_policies [icon: book, color: gray] {
  id UUID pk
  platform_cut_pct DECIMAL
  vat_pct DECIMAL
  daily_bonus_low DECIMAL
  daily_bonus_high DECIMAL
  max_vehicle_age INT
  min_battery_ah INT
  min_partner_rating DECIMAL
  version VARCHAR
  published_by VARCHAR
  is_active BOOLEAN
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
}

// ============================================================================
// 10. PENGADUAN & SENGKETA
// ============================================================================

complaints [icon: alert-octagon, color: pink] {
  id UUID pk
  code VARCHAR
  type VARCHAR
  subject VARCHAR
  from_name VARCHAR
  from_role VARCHAR
  from_phone VARCHAR
  from_email VARCHAR
  to_name VARCHAR
  to_role VARCHAR
  to_phone VARCHAR
  to_email VARCHAR
  trip_id UUID fk
  detail TEXT
  priority VARCHAR
  status VARCHAR
  resolution_action VARCHAR
  resolution_notes TEXT
  resolved_at TIMESTAMPTZ
  resolved_by VARCHAR
  final_priority VARCHAR
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
}

complaint_timeline [icon: clock, color: pink] {
  id UUID pk
  complaint_id UUID fk
  title VARCHAR
  description TEXT
  performed_by VARCHAR
  created_at TIMESTAMPTZ
}

complaint_escalations [icon: arrow-up-circle, color: pink] {
  id UUID pk
  complaint_id UUID fk
  target VARCHAR
  reason TEXT
  escalated_by VARCHAR
  status VARCHAR
  response TEXT
  escalated_at TIMESTAMPTZ
}

complaint_audit_logs [icon: file-text, color: pink] {
  id UUID pk
  complaint_id UUID fk
  ticket_code VARCHAR
  action VARCHAR
  performed_by VARCHAR
  details TEXT
  created_at TIMESTAMPTZ
}

// ============================================================================
// 11. MONITORING AKTIVITAS DRIVER
// ============================================================================

driver_activity_alerts [icon: alert-triangle, color: cyan] {
  id UUID pk
  driver_id UUID fk
  issue VARCHAR
  location VARCHAR
  duration VARCHAR
  status VARCHAR
  last_online TIMESTAMPTZ
  last_trip VARCHAR
  cancel_rate DECIMAL
  acceptance_rate DECIMAL
  created_at TIMESTAMPTZ
  updated_at TIMESTAMPTZ
}

driver_activity_logs [icon: list, color: cyan] {
  id UUID pk
  alert_id UUID fk
  driver_id UUID fk
  admin_name VARCHAR
  action VARCHAR
  details TEXT
  created_at TIMESTAMPTZ
}

// ============================================================================
// 12. MASTER AUDIT LOG & REVENUE
// ============================================================================

master_audit_logs [icon: shield, color: gray] {
  id UUID pk
  code VARCHAR
  timestamp TIMESTAMPTZ
  actor_name VARCHAR
  actor_role VARCHAR
  source VARCHAR
  action VARCHAR
  module VARCHAR
  target VARCHAR
  severity VARCHAR
  result VARCHAR
  correlation_id VARCHAR
  ip_address VARCHAR
  device VARCHAR
  location VARCHAR
  session_id VARCHAR
  changes JSONB
  created_at TIMESTAMPTZ
}

revenue_transactions [icon: dollar-sign, color: gray] {
  id UUID pk
  code VARCHAR
  date DATE
  source VARCHAR
  amount DECIMAL
  area VARCHAR
  type VARCHAR
  status VARCHAR
  description TEXT
  created_at TIMESTAMPTZ
}

// ============================================================================
// 13. PARTNER POLICY DOCUMENTS
// ============================================================================

partner_policy_documents [icon: paperclip, color: gray] {
  id UUID pk
  policy_id UUID fk
  doc_name VARCHAR
  verification VARCHAR
  expiry_period VARCHAR
  is_required BOOLEAN
  created_at TIMESTAMPTZ
}

// ============================================================================
// 14. SETTLEMENT BATCH
// ============================================================================

settlement_batches [icon: layers, color: gray] {
  id UUID pk
  code VARCHAR
  date DATE
  total_drivers INT
  total_amount DECIMAL
  status VARCHAR
  processed_at TIMESTAMPTZ
  created_at TIMESTAMPTZ
}

// ============================================================================
// RELATIONSHIPS
// ============================================================================

// --- Users & Profil ---
saved_addresses.user_id > users.id
user_status_history.user_id > users.id
user_reports.user_id > users.id
user_audit_logs.user_id > users.id

// --- Drivers & Kendaraan ---
vehicles.driver_id - drivers.id
driver_documents.driver_id > drivers.id
driver_status_history.driver_id > drivers.id
driver_violations.driver_id > drivers.id
driver_audit_logs.driver_id > drivers.id

// --- Driver Fitur Tambahan ---
driver_wallets.driver_id - drivers.id
driver_wallet_transactions.wallet_id > driver_wallets.id
driver_bank_accounts.driver_id > drivers.id
driver_schedules.driver_id > drivers.id
driver_sanctions.driver_id > drivers.id
driver_referrals.referrer_id > drivers.id
driver_referrals.referred_id > drivers.id
driver_qr_codes.driver_id - drivers.id
driver_appointments.driver_id > drivers.id
partnership_agreements.driver_id > drivers.id

// --- Zones & Tarif ---
tariff_version_history.tariff_id > tariff_configs.id
zone_tariff_multipliers.zone_id > zones.id
zone_tariff_multipliers.tariff_id > tariff_configs.id

// --- Orders & Payments ---
orders.user_id > users.id
orders.driver_id > drivers.id
orders.zone_id > zones.id
payments.order_id - orders.id
order_timeline.order_id > orders.id
order_audit_logs.order_id > orders.id
ratings.order_id - orders.id
ratings.user_id > users.id
ratings.driver_id > drivers.id

// --- Chat & Notifikasi ---
chat_messages.order_id > orders.id

// --- Voucher & E-Wallet ---
voucher_claims.voucher_id > vouchers.id
voucher_claims.user_id > users.id
voucher_claims.order_id > orders.id
capay_wallets.user_id - users.id
capay_transactions.wallet_id > capay_wallets.id
capay_transactions.order_id > orders.id

// --- Driver Earnings & Incentives ---
driver_earnings.driver_id > drivers.id
driver_earnings.order_id > orders.id
driver_incentives.driver_id > drivers.id

// --- Admin ---
admin_activity_logs.admin_id > admins.id

// --- Pengaduan & Sengketa ---
complaints.trip_id > orders.id
complaint_timeline.complaint_id > complaints.id
complaint_escalations.complaint_id > complaints.id
complaint_audit_logs.complaint_id > complaints.id

// --- Monitoring Aktivitas Driver ---
driver_activity_alerts.driver_id > drivers.id
driver_activity_logs.alert_id > driver_activity_alerts.id
driver_activity_logs.driver_id > drivers.id

// --- Partner Policy Documents ---
partner_policy_documents.policy_id > partner_policies.id
