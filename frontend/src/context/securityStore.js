import { create } from 'zustand'

export const useSecurityStore = create((set) => ({
  // Gate Control
  gateEntries: [],
  recordEntry: (entry) => set((state) => ({
    gateEntries: [...state.gateEntries, { id: Date.now(), ...entry, timestamp: new Date() }]
  })),

  // Guard Patrolling
  patrolRoutes: [],
  patrolLogs: [],
  createPatrolRoute: (route) => set((state) => ({
    patrolRoutes: [...state.patrolRoutes, { id: Date.now(), ...route }]
  })),
  logPatrolCheckpoint: (log) => set((state) => ({
    patrolLogs: [...state.patrolLogs, { id: Date.now(), ...log, timestamp: new Date() }]
  })),

  // Overstay Alerts
  overstayAlerts: [],
  createOverstayAlert: (alert) => set((state) => ({
    overstayAlerts: [...state.overstayAlerts, { id: Date.now(), ...alert, timestamp: new Date() }]
  })),
  resolveOverstayAlert: (alertId) => set((state) => ({
    overstayAlerts: state.overstayAlerts.map(a => a.id === alertId ? { ...a, resolved: true } : a)
  })),

  // Vehicle Management
  registeredVehicles: [],
  parkingSlots: [],
  vehicleViolations: [],
  registerVehicle: (vehicle) => set((state) => ({
    registeredVehicles: [...state.registeredVehicles, { id: Date.now(), ...vehicle, createdAt: new Date() }]
  })),
  manageParkingSlot: (slot) => set((state) => ({
    parkingSlots: [...state.parkingSlots, { id: Date.now(), ...slot }]
  })),
  logViolation: (violation) => set((state) => ({
    vehicleViolations: [...state.vehicleViolations, { id: Date.now(), ...violation, timestamp: new Date() }]
  })),
}))
