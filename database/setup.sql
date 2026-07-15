-- Society Pluss Database Schema
-- Run these SQL queries in Supabase SQL Editor

-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  city VARCHAR(100),
  profile_picture_url TEXT,
  bio TEXT,
  role VARCHAR(50) DEFAULT 'buyer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Create properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL,
  property_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'For Sale',
  bedrooms INTEGER,
  bathrooms INTEGER,
  area INTEGER,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  amenities TEXT,
  image_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inquiries table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT,
  contact_number VARCHAR(20),
  status VARCHAR(50) DEFAULT 'New',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create favorites table
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, property_id)
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Public profiles are viewable by everyone" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for properties
CREATE POLICY "Properties are viewable by everyone" ON properties
  FOR SELECT USING (true);

CREATE POLICY "Users can insert properties" ON properties
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own properties" ON properties
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own properties" ON properties
  FOR DELETE USING (auth.uid() = owner_id);

-- RLS Policies for inquiries
CREATE POLICY "Users can view inquiries they're involved with" ON inquiries
  FOR SELECT USING (
    auth.uid() = buyer_id OR
    auth.uid() = (SELECT owner_id FROM properties WHERE properties.id = inquiries.property_id)
  );

CREATE POLICY "Authenticated users can create inquiries" ON inquiries
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Involved parties can update inquiries" ON inquiries
  FOR UPDATE USING (
    auth.uid() = buyer_id OR
    auth.uid() = (SELECT owner_id FROM properties WHERE properties.id = inquiries.property_id)
  );

-- RLS Policies for favorites
CREATE POLICY "Users can view their own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for reviews
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);
