# Supabase Authentication Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or sign in
3. Click **"New Project"**
4. Fill in:
   - **Name:** Society Pluss
   - **Database Password:** (save this securely)
   - **Region:** Choose closest to you
5. Click **Create new project** (wait 2-3 minutes)

---

## Step 2: Get Your API Keys

1. In Supabase Dashboard, go to **Settings** (bottom left) → **API**
2. Copy these keys:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon / public** (under API Key) → `VITE_SUPABASE_ANON_KEY`

3. Add to `.env.local`:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

✅ You already have these! So this part is done.

---

## Step 3: Enable Email/Password Authentication

1. Go to **Authentication** (left sidebar)
2. Click **Providers**
3. Click **Email** (should be enabled by default)
4. Toggle **Enable Email provider** ON
5. Under **Email/Password signin:**
   - Toggle **Enable email signup** ✓
   - Toggle **Confirm email** OFF (for testing without email verification)
6. Click **Save**

---

## Step 4: Create Auth Tables

This is **LIKELY THE ISSUE** - your Supabase project might not have the required tables.

Go to **SQL Editor** and run this:

```sql
-- Create users table
create table if not exists public.users (
  id uuid primary key default auth.uid(),
  email text unique not null,
  full_name text,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

-- Create profiles table (optional, for extra user data)
create table if not exists public.profiles (
  id uuid primary key references public.users(id) on delete cascade,
  role text default 'resident',
  property_unit text,
  phone text,
  created_at timestamp default current_timestamp
);

-- Enable RLS (Row Level Security)
alter table public.users enable row level security;
alter table public.profiles enable row level security;

-- Create policies
create policy "Users can read their own user data."
  on public.users for select
  using ( auth.uid() = id );

create policy "Users can update their own user data."
  on public.users for update
  using ( auth.uid() = id );

create policy "Users can read their own profile."
  on public.profiles for select
  using ( auth.uid() = id );
```

👉 **Copy the entire SQL above and paste it into SQL Editor**

---

## Step 5: Verify Email Settings (Optional but Recommended)

1. Go to **Authentication** → **Email Templates**
2. Check that email templates are configured
3. Go to **Settings** → **Email Configuration**
4. If you want real email confirmations:
   - Set up your email provider (Gmail, SendGrid, etc.)
   - Otherwise, disable "Confirm email" for development

---

## Step 6: Test Sign Up & Login

### Try signing up in your app:
- **Email:** test@example.com
- **Password:** Test123!

### If it works:
✅ You're all set! Users can now sign up and log in.

### If it still fails:
Check browser console (F12 → Console) for detailed error messages.

---

## Common Issues & Fixes

### Error: "Invalid API Key"
- ✅ You have this fixed - your keys are valid

### Error: "Signup requires a valid password"
- Make sure password is at least 6 characters
- Update signup form validation if needed

### Error: "Email already exists"
- The email is already registered
- Try a different email

### Error: "new_user_request_body contains invalid fields"
- Supabase auth doesn't accept custom fields on signup
- Use the **profiles** table for extra user data instead

### Sign up works but page doesn't recognize the user
- Manually refresh the page after signing up
- Check browser's **Application** tab → **LocalStorage**
- Clear cache if needed

---

## Step 7: Update Database on User Signup

If you want to automatically create a profile when user signs up:

In `frontend/src/services/authService.js`, after successful signup:

```javascript
async signUp(email, password, userData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  if (error) throw error
  
  // Create profile after signup
  if (data.user) {
    await supabase
      .from('profiles')
      .insert([
        {
          id: data.user.id,
          role: userData?.role || 'resident',
          full_name: userData?.fullName || ''
        }
      ])
  }
  
  return data
}
```

---

## Quick Checklist

- [ ] Supabase project created
- [ ] API keys in `.env.local`
- [ ] Email provider enabled
- [ ] Auth tables created (SQL query executed)
- [ ] Email confirmation disabled (for development)
- [ ] Tested sign up with test@example.com
- [ ] Tested login with same credentials
- [ ] User appears in **Authentication → Users** table

---

## Useful Links

- **Supabase Docs:** https://supabase.com/docs/guides/auth
- **SQL Editor:** In your Supabase dashboard
- **Users Table:** Authentication → Users (shows all registered users)
- **Logs:** Check Project → Logs for debug info

---

## Once This Works

After successful Supabase auth setup:
1. Users will see all features after logging in
2. Data will persist in Supabase database
3. Users can sign up / sign in from anywhere
4. Multi-device login support built-in

Good luck! Let me know if you hit any errors - paste the exact error message from the console.
