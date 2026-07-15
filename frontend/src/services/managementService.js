import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const managementService = {
  // Complaint Management
  async createComplaint(complaintData) {
    return axios.post(`${API_URL}/complaints/create`, complaintData)
  },

  async getComplaints(societyId) {
    return axios.get(`${API_URL}/complaints/${societyId}`)
  },

  async updateComplaintStatus(complaintId, status) {
    return axios.put(`${API_URL}/complaints/${complaintId}/status`, { status })
  },

  async assignComplaint(complaintId, staffId) {
    return axios.put(`${API_URL}/complaints/${complaintId}/assign`, { assignedTo: staffId })
  },

  async getComplaintStats(societyId) {
    return axios.get(`${API_URL}/complaints/${societyId}/stats`)
  },

  // Amenity Booking
  async getAmenities(societyId) {
    return axios.get(`${API_URL}/amenities/${societyId}`)
  },

  async bookAmenity(bookingData) {
    return axios.post(`${API_URL}/amenities/book`, bookingData)
  },

  async getBookingSchedule(amenityId) {
    return axios.get(`${API_URL}/amenities/${amenityId}/schedule`)
  },

  async cancelBooking(bookingId) {
    return axios.put(`${API_URL}/amenities/booking/${bookingId}/cancel`)
  },

  // Communications
  async sendBroadcast(broadcastData) {
    return axios.post(`${API_URL}/communications/broadcast`, broadcastData)
  },

  async sendEmergencyAlert(alertData) {
    return axios.post(`${API_URL}/communications/emergency-alert`, alertData)
  },

  async scheduleMeeting(meetingData) {
    return axios.post(`${API_URL}/communications/meeting`, meetingData)
  },

  async getBroadcasts(societyId) {
    return axios.get(`${API_URL}/communications/broadcasts/${societyId}`)
  },

  // Asset & Inventory
  async addAsset(assetData) {
    return axios.post(`${API_URL}/assets/add`, assetData)
  },

  async getAssets(societyId) {
    return axios.get(`${API_URL}/assets/${societyId}`)
  },

  async updateAsset(assetId, assetData) {
    return axios.put(`${API_URL}/assets/${assetId}`, assetData)
  },

  async addVendor(vendorData) {
    return axios.post(`${API_URL}/vendors/add`, vendorData)
  },

  async getVendors(societyId) {
    return axios.get(`${API_URL}/vendors/${societyId}`)
  },

  async recordVendorPayment(vendorId, paymentData) {
    return axios.post(`${API_URL}/vendors/${vendorId}/payment`, paymentData)
  },

  async getVendorContracts(societyId) {
    return axios.get(`${API_URL}/vendors/${societyId}/contracts`)
  },
}
