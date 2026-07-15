import { supabase } from './supabase'

export const authService = {
  async signUp(email, password, userData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      if (error) {
        console.error('Supabase SignUp Error:', error.message, error)
        throw new Error(error.message || 'Failed to sign up')
      }
      return data
    } catch (err) {
      console.error('SignUp Exception:', err.message)
      throw err
    }
  },

  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        console.error('Supabase SignIn Error:', error.message, error)
        throw new Error(error.message || 'Failed to sign in')
      }
      return data
    } catch (err) {
      console.error('SignIn Exception:', err.message)
      throw err
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (err) {
      console.error('SignOut Exception:', err.message)
      throw err
    }
  },

  async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) throw error
      return data.user
    } catch (err) {
      console.error('GetUser Exception:', err.message)
      throw err
    }
  },

  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
    } catch (err) {
      console.error('ResetPassword Exception:', err.message)
      throw err
    }
  },

  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) throw error
    } catch (err) {
      console.error('UpdatePassword Exception:', err.message)
      throw err
    }
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

