import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug logging
console.log('=== SUPABASE CONNECTION DEBUG ===')
console.log('URL loaded:', !!supabaseUrl)
console.log('Key loaded:', !!supabaseAnonKey)
console.log('URL:', supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'MISSING')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase configuration!')
  console.error('Check that .env.local has:')
  console.error('  VITE_SUPABASE_URL')
  console.error('  VITE_SUPABASE_ANON_KEY')
  throw new Error('Missing Supabase configuration. Check your .env.local file.')
}

let supabase = null

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
  console.log('✅ Supabase client created successfully')
} catch (err) {
  console.error('❌ Failed to create Supabase client:', err.message)
  throw err
}

// Test connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.warn('⚠️ Session check error:', error.message)
  } else {
    console.log('✅ Supabase connected and responding')
  }
}).catch(err => {
  console.error('❌ Connection test failed:', err.message)
})

export { supabase }
