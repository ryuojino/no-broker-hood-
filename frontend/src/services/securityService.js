import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const securityService = {
  // Gate Control
  async recordEntry(entryData) {
    return axios.post(`${API_URL}/gate/record-entry`, entryData)
  },

  async recordExit(exitData) {
    return axios.post(`${API_URL}/gate/record-exit`, exitData)
  },

  async getGateLog(societyId, date) {
    return axios.get(`${API_URL}/gate/logs/${societyId}`, { params: { date } })
  },

  async verifyVisitor(visitorCode) {
    return axios.get(`${API_URL}/gate/verify/${visitorCode}`)
  },

  // Guard Patrolling
  async createPatrolRoute(routeData) {
    return axios.post(`${API_URL}/patrol/route/create`, routeData)
  },

  async logPatrolCheckpoint(logData) {
    return axios.post(`${API_URL}/patrol/checkpoint/log`, logData)
  },

  async getPatrolLog(guardId, date) {
    return axios.get(`${API_URL}/patrol/logs/${guardId}`, { params: { date } })
  },

  async trackGuardLocation(guardId, location) {
    return axios.post(`${API_URL}/patrol/track-location`, { guardId, location })
  },

  // Overstay Alerts
  async checkOverstay(visitorId) {
    return axios.get(`${API_URL}/overstay/check/${visitorId}`)
  },

  async createOverstayAlert(alertData) {
    return axios.post(`${API_URL}/overstay/alert`, alertData)
  },

  async getOverstayAlerts(societyId) {
    return axios.get(`${API_URL}/overstay/alerts/${societyId}`)
  },

  async resolveOverstayAlert(alertId) {
    return axios.put(`${API_URL}/overstay/alerts/${alertId}/resolve`)
  },

  // Vehicle Management
  async registerVehicle(vehicleData) {
    return axios.post(`${API_URL}/vehicles/register`, vehicleData)
  },

  async getRegisteredVehicles(societyId) {
    return axios.get(`${API_URL}/vehicles/${societyId}`)
  },

  async identifyUnauthorizedVehicle(vehicleData) {
    return axios.post(`${API_URL}/vehicles/check-unauthorized`, vehicleData)
  },

  async manageParkingSlot(slotData) {
    return axios.post(`${API_URL}/parking/manage-slot`, slotData)
  },

  async getParkingLayout(societyId) {
    return axios.get(`${API_URL}/parking/layout/${societyId}`)
  },

  async logViolation(violationData) {
    return axios.post(`${API_URL}/vehicles/violation/log`, violationData)
  },

  async getVehicleViolations(societyId) {
    return axios.get(`${API_URL}/vehicles/violations/${societyId}`)
  },
}
