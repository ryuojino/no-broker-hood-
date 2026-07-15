# Supabase Database Schema

This document outlines the database schema for the Society Pluss real estate platform.

## Tables

### 1. auth.users (Managed by Supabase Auth)
- id: UUID (Primary Key)
- email: VARCHAR
- encrypted_password: VARCHAR
- email_confirmed_at: TIMESTAMP
- created_at: TIMESTAMP
- updated_at: TIMESTAMP

### 2. user_profiles
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID FOREIGN KEY (auth.users),
  full_name VARCHAR(255),
  phone VARCHAR(20),
  city VARCHAR(100),
  profile_picture_url TEXT,
  bio TEXT,
  role VARCHAR(50) DEFAULT 'buyer', -- buyer, seller, agent, admin
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. properties
```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID FOREIGN KEY (auth.users),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL,
  property_type VARCHAR(50) NOT NULL, -- Apartment, House, Villa, Commercial, Land, Office
  status VARCHAR(50) NOT NULL DEFAULT 'For Sale', -- For Rent, For Sale, Sold, Rented
  bedrooms INTEGER,
  bathrooms INTEGER,
  area INTEGER, -- in sqft
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  amenities TEXT, -- comma-separated
  image_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. inquiries
```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID FOREIGN KEY (properties),
  buyer_id UUID FOREIGN KEY (auth.users),
  message TEXT,
  contact_number VARCHAR(20),
  status VARCHAR(50) DEFAULT 'New', -- New, In Progress, Accepted, Rejected, Closed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. favorites
```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID FOREIGN KEY (auth.users),
  property_id UUID FOREIGN KEY (properties),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, property_id)
);
```

### 6. reviews
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID FOREIGN KEY (properties),
  user_id UUID FOREIGN KEY (auth.users),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Storage Buckets

### property-images
- Purpose: Store property listing images
- Public: true
- Policies: Users can upload, authenticated users can read

### profile-pictures
- Purpose: Store user profile pictures
- Public: true
- Policies: Authenticated users can upload, all can read

## Row Level Security (RLS) Policies

### user_profiles
- SELECT: Allow authenticated users to select their own profile
- UPDATE: Allow users to update their own profile
- INSERT: Allow authenticated users to create a profile

### properties
- SELECT: Allow all users to select
- INSERT: Allow authenticated users to insert
- UPDATE: Allow users to update their own properties
- DELETE: Allow users to delete their own properties

### inquiries
- SELECT: Allow authenticated users to select their own inquiries
- INSERT: Allow authenticated users to insert
- UPDATE: Allow property owner or inquiry creator to update

### favorites
- SELECT: Allow authenticated users to select their own favorites
- INSERT: Allow authenticated users to insert
- DELETE: Allow authenticated users to delete their own favorites

## Setup Instructions

1. Create a new Supabase project
2. Run the SQL queries above in the SQL editor
3. Enable Row Level Security on all tables
4. Create Storage buckets with appropriate policies
5. Update your .env.local file with:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
