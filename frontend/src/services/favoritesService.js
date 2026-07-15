import { supabase } from './supabase'

export const favoritesService = {
  async getFavorites(userId) {
    const { data, error } = await supabase
      .from('favorites')
      .select('*, properties(*)')
      .eq('user_id', userId)
    if (error) throw error
    return data
  },

  async addFavorite(userId, propertyId) {
    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, property_id: propertyId })
      .select()
    if (error) throw error
    return data[0]
  },

  async removeFavorite(userId, propertyId) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId)
    if (error) throw error
  },

  async isFavorite(userId, propertyId) {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single()
    
    return data ? true : false
  }
}
