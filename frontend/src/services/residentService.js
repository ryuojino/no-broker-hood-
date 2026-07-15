import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const residentService = {
  // Visitor Management
  async preAuthorizeVisitor(visitorData) {
    return axios.post(`${API_URL}/visitors/pre-authorize`, visitorData)
  },
  
  async getVisitorHistory(userId) {
    return axios.get(`${API_URL}/visitors/history/${userId}`)
  },

  async approveVisitor(visitorId) {
    return axios.put(`${API_URL}/visitors/${visitorId}/approve`)
  },

  async denyVisitor(visitorId) {
    return axios.put(`${API_URL}/visitors/${visitorId}/deny`)
  },

  // Domestic Staff Management
  async addStaffMember(staffData) {
    return axios.post(`${API_URL}/staff/add`, staffData)
  },

  async getStaffAttendance(staffId) {
    return axios.get(`${API_URL}/staff/${staffId}/attendance`)
  },

  async recordStaffTimestamp(staffId, timestamp) {
    return axios.post(`${API_URL}/staff/${staffId}/timestamp`, { timestamp })
  },

  async searchDailyHelp(filters) {
    return axios.get(`${API_URL}/daily-help/search`, { params: filters })
  },

  async hireDailyHelp(helpData) {
    return axios.post(`${API_URL}/daily-help/hire`, helpData)
  },

  // Home Services
  async requestHomeService(serviceData) {
    return axios.post(`${API_URL}/services/request`, serviceData)
  },

  async getAvailableServices() {
    return axios.get(`${API_URL}/services/available`)
  },

  async getServiceProviders(serviceType) {
    return axios.get(`${API_URL}/services/providers/${serviceType}`)
  },

  // Safety & SOS
  async triggerSOS(sosData) {
    return axios.post(`${API_URL}/sos/trigger`, sosData)
  },

  async addEmergencyContact(contact) {
    return axios.post(`${API_URL}/emergency-contacts/add`, contact)
  },

  async getEmergencyContacts(userId) {
    return axios.get(`${API_URL}/emergency-contacts/${userId}`)
  },

  // Community Engagement
  async getNoticeBoard() {
    return axios.get(`${API_URL}/notices`)
  },

  async postNotice(notice) {
    return axios.post(`${API_URL}/notices/post`, notice)
  },

  async getCommunityForums() {
    return axios.get(`${API_URL}/forums`)
  },

  async postForumDiscussion(discussion) {
    return axios.post(`${API_URL}/forums/post`, discussion)
  },

  async getHomeCookedFood() {
    return axios.get(`${API_URL}/community/home-chef`)
  },

  async postHomeCookedFood(foodData) {
    return axios.post(`${API_URL}/community/home-chef/post`, foodData)
  },
}
