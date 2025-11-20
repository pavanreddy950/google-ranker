-- =====================================================
-- SUPABASE DATABASE SETUP FOR GOOGLE RANKER
-- =====================================================
-- Run this ENTIRE SQL in your Supabase SQL Editor
-- Project: google ranker
-- Project ID: eyrkxpodgqileiqxblpr
-- Database URL: https://eyrkxpodgqileiqxblpr.supabase.co
--
-- INSTRUCTIONS:
-- 1. Go to: https://supabase.com/dashboard/project/eyrkxpodgqileiqxblpr/sql
-- 2. Click "New Query"
-- 3. Copy and paste this ENTIRE file
-- 4. Click "Run" or press Ctrl+Enter
-- =====================================================

-- =====================================================
-- 1. SUBSCRIPTIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  gbp_account_id TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'trial',
  plan_id TEXT,
  profile_count INTEGER DEFAULT 0,
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  trial_end_date TIMESTAMPTZ,
  amount INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'INR',
  price_per_profile INTEGER,
  last_payment_date TIMESTAMPTZ,
  razorpay_subscription_id TEXT,
  razorpay_payment_id TEXT,
  payment_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  created_by_admin BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMPTZ,
  cancelled_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_gbp_account_id ON subscriptions(gbp_account_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- =====================================================
-- 2. USER GBP MAPPING TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS user_gbp_mapping (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  gbp_account_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, gbp_account_id)
);

CREATE INDEX IF NOT EXISTS idx_user_gbp_mapping_user_id ON user_gbp_mapping(user_id);
CREATE INDEX IF NOT EXISTS idx_user_gbp_mapping_gbp_account_id ON user_gbp_mapping(gbp_account_id);

-- =====================================================
-- 3. USER TOKENS TABLE (for Google OAuth tokens)
-- =====================================================
CREATE TABLE IF NOT EXISTS user_tokens (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  encrypted_access_token TEXT NOT NULL,
  encrypted_refresh_token TEXT,
  token_expiry BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_tokens_user_id ON user_tokens(user_id);

-- =====================================================
-- 4. TOKEN FAILURES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS token_failures (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  error TEXT,
  retry_count INTEGER DEFAULT 0,
  last_retry_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_token_failures_user_id ON token_failures(user_id);

-- =====================================================
-- 5. COUPONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS coupons (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL, -- 'percentage' or 'fixed'
  discount NUMERIC NOT NULL,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  valid_until TIMESTAMPTZ,
  description TEXT,
  one_time_per_user BOOLEAN DEFAULT FALSE,
  single_use BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  used_by JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(active);

-- =====================================================
-- 6. COUPON USAGE TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS coupon_usage (
  id SERIAL PRIMARY KEY,
  coupon_code TEXT NOT NULL,
  user_id TEXT NOT NULL,
  email TEXT,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  discount_amount NUMERIC,
  FOREIGN KEY (coupon_code) REFERENCES coupons(code)
);

CREATE INDEX IF NOT EXISTS idx_coupon_usage_coupon_code ON coupon_usage(coupon_code);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_user_id ON coupon_usage(user_id);

-- =====================================================
-- 7. QR CODES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS qr_codes (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  location_id TEXT NOT NULL,
  qr_code_data TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_qr_codes_user_id ON qr_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_location_id ON qr_codes(location_id);

-- =====================================================
-- 8. AUDIT RESULTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_results (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  location_id TEXT NOT NULL,
  location_name TEXT,
  audit_data JSONB NOT NULL,
  recommendations JSONB,
  score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_results_user_id ON audit_results(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_results_location_id ON audit_results(location_id);
CREATE INDEX IF NOT EXISTS idx_audit_results_created_at ON audit_results(created_at);

-- =====================================================
-- 9. AUDIT LOGS TABLE (Admin activity logs)
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  action TEXT NOT NULL,
  admin_id TEXT,
  admin_email TEXT,
  description TEXT,
  target_type TEXT,
  target_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_id ON audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- =====================================================
-- 10. AUTOMATION SETTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS automation_settings (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  location_id TEXT NOT NULL,
  enabled BOOLEAN DEFAULT FALSE,
  frequency TEXT DEFAULT 'daily', -- 'daily', 'weekly', 'monthly'
  post_type TEXT, -- 'update', 'offer', 'event'
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, location_id)
);

CREATE INDEX IF NOT EXISTS idx_automation_settings_user_id ON automation_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_automation_settings_location_id ON automation_settings(location_id);

-- =====================================================
-- 11. AUTOMATION LOGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS automation_logs (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  location_id TEXT NOT NULL,
  action TEXT NOT NULL,
  status TEXT NOT NULL, -- 'success', 'failed', 'pending'
  details JSONB DEFAULT '{}'::jsonb,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_automation_logs_user_id ON automation_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_automation_logs_location_id ON automation_logs(location_id);
CREATE INDEX IF NOT EXISTS idx_automation_logs_created_at ON automation_logs(created_at);

-- =====================================================
-- 12. PAYMENT HISTORY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS payment_history (
  id SERIAL PRIMARY KEY,
  subscription_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL, -- 'success', 'failed', 'pending'
  description TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_payment_history_subscription_id ON payment_history(subscription_id);
CREATE INDEX IF NOT EXISTS idx_payment_history_user_id ON payment_history(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_history_created_at ON payment_history(created_at);

-- =====================================================
-- INSERT DEFAULT TEST COUPON
-- =====================================================
-- This is the default coupon that the application expects
INSERT INTO coupons (code, type, discount, max_uses, current_uses, valid_until, description, one_time_per_user, single_use, active, used_by)
VALUES (
  'RAJATEST',
  'percentage',
  100,
  10000,
  0,
  '2025-12-31 23:59:59+00',
  'Test coupon - 100% discount',
  false,
  false,
  true,
  '[]'::jsonb
)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- ENABLE ROW LEVEL SECURITY (RLS) - OPTIONAL
-- =====================================================
-- Note: RLS is disabled by default for service_role key access
-- Uncomment these if you want to add additional security layers
-- and create policies for user-level access

-- ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_gbp_mapping ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE coupon_usage ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE audit_results ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE automation_settings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- Example RLS Policy (uncomment and modify as needed):
-- CREATE POLICY "Users can view their own subscriptions"
--   ON subscriptions FOR SELECT
--   USING (auth.uid()::text = user_id);

-- =====================================================
-- VERIFY INSTALLATION
-- =====================================================
-- Run this to verify all tables were created:
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'public'
-- ORDER BY table_name;

-- =====================================================
-- COMPLETED!
-- =====================================================
-- ✅ All 12 tables have been created successfully
-- ✅ Indexes have been added for performance
-- ✅ Default test coupon 'RAJATEST' has been inserted
--
-- Your Google Ranker application is now ready to use this database!
--
-- Next steps:
-- 1. Verify tables were created by running the verify query above
-- 2. Your backend server is already configured with the correct credentials
-- 3. Start using the application!
