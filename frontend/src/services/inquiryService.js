import { supabase } from './supabase'

export const inquiryService = {
  async getInquiries(userId) {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*, properties(*)')
      .or(`buyer_id.eq.${userId},properties(owner_id)=${userId}`)
    if (error) throw error
    return data
  },

  async getPropertyInquiries(propertyId) {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*, user_profiles(*)')
      .eq('property_id', propertyId)
    if (error) throw error
    return data
  },

  async createInquiry(inquiryData) {
    const { data, error } = await supabase
      .from('inquiries')
      .insert(inquiryData)
      .select()
    if (error) throw error
    return data[0]
  },

  async updateInquiry(id, updates) {
    const { data, error } = await supabase
      .from('inquiries')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async deleteInquiry(id) {
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id)
    if (error) throw error
  }
}
