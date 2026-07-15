-- Society Pluss Database Schema
-- Complete SQL for all 13 features

-- ============================================================
-- RESIDENT FEATURES TABLES
-- ============================================================

-- Visitor Management
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT,
  guest_phone TEXT,
  relationship TEXT,
  visit_date TIMESTAMP NOT NULL,
  visit_end_date TIMESTAMP,
  vehicle_number TEXT,
  purpose TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'visited', 'overstay')),
  entry_time TIMESTAMP,
  exit_time TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Domestic Staff
CREATE TABLE IF NOT EXISTS staff_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  category TEXT CHECK (category IN ('maid', 'driver', 'cook', 'gardener', 'other')),
  working_days TEXT,
  salary NUMERIC,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS staff_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID NOT NULL REFERENCES staff_members(id),
  attendance_date DATE NOT NULL,
  entry_time TIMESTAMP,
  exit_time TIMESTAMP,
  status TEXT DEFAULT 'present' CHECK (status IN ('present', 'absent', 'half_day')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Home Services
CREATE TABLE IF NOT EXISTS service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL,
  service_type TEXT CHECK (service_type IN ('cleaning', 'painting', 'plumbing', 'pest_control', 'electrical', 'carpentry')),
  description TEXT,
  requested_date TIMESTAMP NOT NULL,
  preferred_time TEXT,
  budget NUMERIC,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
  provider_name TEXT,
  provider_phone TEXT,
  rating NUMERIC,
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Safety & SOS
CREATE TABLE IF NOT EXISTS sos_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL,
  alert_type TEXT CHECK (alert_type IN ('medical', 'security', 'fire', 'other')),
  description TEXT,
  location TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'responded', 'resolved')),
  responder_name TEXT,
  response_time TIMESTAMP,
  resolution_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL,
  contact_name TEXT NOT NULL,
  relationship TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Community Engagement
CREATE TABLE IF NOT EXISTS community_notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_by UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  notice_type TEXT CHECK (notice_type IN ('maintenance', 'event', 'emergency', 'announcement')),
  posted_date TIMESTAMP DEFAULT NOW(),
  expiry_date TIMESTAMP,
  attachment_url TEXT
);

CREATE TABLE IF NOT EXISTS forum_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_by UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID NOT NULL REFERENCES forum_discussions(id),
  posted_by UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- MANAGEMENT FEATURES TABLES
-- ============================================================

-- Complaint Management
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL,
  category TEXT CHECK (category IN ('maintenance', 'noise', 'parking', 'behavior', 'cleanliness', 'other')),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  assigned_to UUID,
  assignment_date TIMESTAMP,
  resolution_notes TEXT,
  resolved_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Amenity Management
CREATE TABLE IF NOT EXISTS amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  capacity INTEGER,
  location TEXT,
  hourly_rate NUMERIC,
  daily_rate NUMERIC,
  rules TEXT,
  images TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS amenity_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amenity_id UUID NOT NULL REFERENCES amenities(id),
  resident_id UUID NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  guest_count INTEGER,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_cost NUMERIC,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Communications
CREATE TABLE IF NOT EXISTS broadcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sent_by UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  communication_type TEXT CHECK (communication_type IN ('notice', 'alert', 'announcement', 'reminder')),
  recipient_group TEXT DEFAULT 'all',
  sent_date TIMESTAMP DEFAULT NOW(),
  read_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  meeting_date TIMESTAMP NOT NULL,
  location TEXT,
  agenda TEXT,
  participant_count INTEGER,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Asset Inventory
CREATE TABLE IF NOT EXISTS assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  purchase_date DATE,
  purchase_cost NUMERIC,
  condition TEXT DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  maintenance_notes TEXT,
  last_maintenance DATE,
  next_maintenance DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'damaged', 'disposed')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_name TEXT NOT NULL,
  category TEXT,
  contact_person TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  gst_number TEXT,
  bank_details TEXT,
  last_payment_date DATE,
  last_payment_amount NUMERIC,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- SECURITY FEATURES TABLES
-- ============================================================

-- Gate Control
CREATE TABLE IF NOT EXISTS gate_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID,
  visitor_name TEXT NOT NULL,
  visitor_phone TEXT,
  visitor_type TEXT CHECK (visitor_type IN ('guest', 'service_provider', 'delivery', 'vendor', 'other')),
  vehicle_number TEXT,
  purpose TEXT,
  host_unit TEXT,
  entry_time TIMESTAMP DEFAULT NOW(),
  exit_time TIMESTAMP,
  entry_by_staff UUID,
  exit_by_staff UUID,
  notes TEXT
);

-- Guard Patrolling
CREATE TABLE IF NOT EXISTS patrol_routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_name TEXT NOT NULL,
  checkpoints TEXT[] NOT NULL,
  frequency TEXT CHECK (frequency IN ('hourly', '2hourly', '4hourly', 'daily')),
  estimated_duration INTEGER,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS patrol_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID NOT NULL REFERENCES patrol_routes(id),
  guard_id UUID NOT NULL,
  checkpoint_name TEXT NOT NULL,
  log_time TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'missed', 'delayed')),
  notes TEXT,
  photo_url TEXT
);

-- Overstay Alerts
CREATE TABLE IF NOT EXISTS overstay_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID,
  visitor_name TEXT NOT NULL,
  unit_number TEXT,
  expected_checkout TIMESTAMP NOT NULL,
  alert_triggered TIMESTAMP DEFAULT NOW(),
  alert_type TEXT DEFAULT 'warning' CHECK (alert_type IN ('warning', 'critical')),
  duration_exceeded INTEGER,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'notified', 'resolved')),
  contacted_at TIMESTAMP,
  notes TEXT
);

-- Vehicle Management
CREATE TABLE IF NOT EXISTS registered_vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL,
  vehicle_type TEXT CHECK (vehicle_type IN ('car', 'bike', 'scooter', 'other')),
  registration_number TEXT NOT NULL UNIQUE,
  owner_name TEXT NOT NULL,
  owner_phone TEXT,
  unit_number TEXT NOT NULL,
  parking_slot TEXT,
  color TEXT,
  model TEXT,
  registration_expiry DATE,
  insurance_expiry DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'revoked')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS parking_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_number TEXT NOT NULL UNIQUE,
  location TEXT,
  assigned_to UUID REFERENCES registered_vehicles(id),
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'reserved', 'maintenance')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vehicle_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES registered_vehicles(id),
  vehicle_number TEXT NOT NULL,
  violation_type TEXT CHECK (violation_type IN ('unauthorized', 'no_registration', 'expired_documents', 'improper_parking', 'other')),
  severity TEXT CHECK (severity IN ('minor', 'major', 'critical')),
  violation_date TIMESTAMP DEFAULT NOW(),
  location TEXT,
  description TEXT,
  evidence_photo_url TEXT,
  action_taken TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'appealed')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================

CREATE INDEX idx_visitors_resident_id ON visitors(resident_id);
CREATE INDEX idx_visitors_status ON visitors(status);
CREATE INDEX idx_staff_members_resident_id ON staff_members(resident_id);
CREATE INDEX idx_service_requests_resident_id ON service_requests(resident_id);
CREATE INDEX idx_sos_alerts_resident_id ON sos_alerts(resident_id);
CREATE INDEX idx_emergency_contacts_resident_id ON emergency_contacts(resident_id);
CREATE INDEX idx_complaints_resident_id ON complaints(resident_id);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_amenity_bookings_amenity_id ON amenity_bookings(amenity_id);
CREATE INDEX idx_amenity_bookings_resident_id ON amenity_bookings(resident_id);
CREATE INDEX idx_broadcasts_sent_by ON broadcasts(sent_by);
CREATE INDEX idx_meetings_created_by ON meetings(created_by);
CREATE INDEX idx_assets_category ON assets(category);
CREATE INDEX idx_gate_entries_entry_time ON gate_entries(entry_time);
CREATE INDEX idx_patrol_logs_route_id ON patrol_logs(route_id);
CREATE INDEX idx_overstay_alerts_status ON overstay_alerts(status);
CREATE INDEX idx_registered_vehicles_resident_id ON registered_vehicles(resident_id);
CREATE INDEX idx_vehicle_violations_vehicle_id ON vehicle_violations(vehicle_id);

-- ============================================================
-- ROW LEVEL SECURITY (Optional but Recommended)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenity_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE gate_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE patrol_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE patrol_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE overstay_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE registered_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parking_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_violations ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================

-- You can add sample data here if needed for testing
