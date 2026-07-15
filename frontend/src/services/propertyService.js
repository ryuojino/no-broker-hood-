import { supabase } from './supabase'

export const propertyService = {
  async getProperties(filters = {}) {
    let query = supabase.from('properties').select('*')

    if (filters.propertyType) {
      query = query.eq('property_type', filters.propertyType)
    }
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice)
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice)
    }
    if (filters.city) {
      query = query.ilike('city', `%${filters.city}%`)
    }
    if (filters.minBedrooms) {
      query = query.gte('bedrooms', filters.minBedrooms)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getPropertyById(id) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async createProperty(propertyData) {
    const { data: user } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('properties')
      .insert({
        ...propertyData,
        owner_id: user.user.id
      })
      .select()
    if (error) throw error
    return data[0]
  },

  async updateProperty(id, propertyData) {
    const { data, error } = await supabase
      .from('properties')
      .update(propertyData)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async deleteProperty(id) {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  async uploadPropertyImage(file, propertyId) {
    const fileName = `${propertyId}-${Date.now()}`
    const { error } = await supabase.storage
      .from('property-images')
      .upload(`properties/${fileName}`, file)
    if (error) throw error
    
    const { data } = supabase.storage
      .from('property-images')
      .getPublicUrl(`properties/${fileName}`)
    
    return data.publicUrl
  },

  async deletePropertyImage(imagePath) {
    const { error } = await supabase.storage
      .from('property-images')
      .remove([imagePath])
    if (error) throw error
  }
}
