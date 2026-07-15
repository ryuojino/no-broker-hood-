import { create } from 'zustand'

export const useResidentStore = create((set) => ({
  // Visitor Management
  visitors: [],
  addVisitor: (visitor) => set((state) => ({ 
    visitors: [...state.visitors, { id: Date.now(), ...visitor, createdAt: new Date() }] 
  })),
  approveVisitor: (visitorId) => set((state) => ({
    visitors: state.visitors.map(v => v.id === visitorId ? { ...v, status: 'approved' } : v)
  })),
  denyVisitor: (visitorId) => set((state) => ({
    visitors: state.visitors.map(v => v.id === visitorId ? { ...v, status: 'denied' } : v)
  })),
  updateVisitorStatus: (visitorId, status) => set((state) => ({
    visitors: state.visitors.map(v => v.id === visitorId ? { ...v, status } : v)
  })),

  // Domestic Staff
  staffRecords: [],
  addStaffRecord: (staff) => set((state) => ({
    staffRecords: [...state.staffRecords, { id: Date.now(), ...staff, createdAt: new Date() }]
  })),
  updateStaffAttendance: (staffId, timestamp) => set((state) => ({
    staffRecords: state.staffRecords.map(s => 
      s.id === staffId ? { ...s, lastTimestamp: timestamp, attendance: [...(s.attendance || []), timestamp] } : s
    )
  })),

  // Home Services
  serviceRequests: [],
  addServiceRequest: (request) => set((state) => ({
    serviceRequests: [...state.serviceRequests, { id: Date.now(), ...request, createdAt: new Date() }]
  })),
  updateServiceStatus: (requestId, status) => set((state) => ({
    serviceRequests: state.serviceRequests.map(r => r.id === requestId ? { ...r, status } : r)
  })),

  // Safety & SOS
  sosAlerts: [],
  triggerSOS: (data) => set((state) => ({
    sosAlerts: [...state.sosAlerts, { id: Date.now(), ...data, timestamp: new Date() }]
  })),

  // Community Notices
  communityNotices: [],
  addNotice: (notice) => set((state) => ({
    communityNotices: [...state.communityNotices, { id: Date.now(), ...notice, createdAt: new Date() }]
  })),
}))
