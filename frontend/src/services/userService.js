import { supabase } from './supabase'

export const userService = {
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    if (error) throw error
    return data
  },

  async createUserProfile(userData) {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert(userData)
      .select()
    if (error) throw error
    return data[0]
  },

  async updateUserProfile(userId, userData) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(userData)
      .eq('user_id', userId)
      .select()
    if (error) throw error
    return data[0]
  },

  async uploadProfilePicture(file, userId) {
    const fileName = `${userId}-${Date.now()}`
    const { error } = await supabase.storage
      .from('profile-pictures')
      .upload(`users/${fileName}`, file)
    if (error) throw error

    const { data } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(`users/${fileName}`)
    
    return data.publicUrl
  }
}
