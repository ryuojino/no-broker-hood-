import { create } from 'zustand'

export const useManagementStore = create((set) => ({
  // Complaint Management
  complaints: [],
  addComplaint: (complaint) => set((state) => ({
    complaints: [...state.complaints, { id: Date.now(), ...complaint, createdAt: new Date(), status: 'open' }]
  })),
  updateComplaintStatus: (complaintId, status) => set((state) => ({
    complaints: state.complaints.map(c => c.id === complaintId ? { ...c, status } : c)
  })),
  assignComplaint: (complaintId, assignedTo) => set((state) => ({
    complaints: state.complaints.map(c => c.id === complaintId ? { ...c, assignedTo } : c)
  })),

  // Amenity Booking
  amenities: [],
  bookings: [],
  addAmenity: (amenity) => set((state) => ({
    amenities: [...state.amenities, { id: Date.now(), ...amenity }]
  })),
  bookAmenity: (booking) => set((state) => ({
    bookings: [...state.bookings, { id: Date.now(), ...booking, createdAt: new Date() }]
  })),
  cancelBooking: (bookingId) => set((state) => ({
    bookings: state.bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b)
  })),

  // Communications
  broadcasts: [],
  meetings: [],
  sendBroadcast: (broadcast) => set((state) => ({
    broadcasts: [...state.broadcasts, { id: Date.now(), ...broadcast, createdAt: new Date() }]
  })),
  scheduleMeeting: (meeting) => set((state) => ({
    meetings: [...state.meetings, { id: Date.now(), ...meeting, createdAt: new Date() }]
  })),

  // Asset & Inventory
  assets: [],
  vendors: [],
  addAsset: (asset) => set((state) => ({
    assets: [...state.assets, { id: Date.now(), ...asset, createdAt: new Date() }]
  })),
  addVendor: (vendor) => set((state) => ({
    vendors: [...state.vendors, { id: Date.now(), ...vendor, createdAt: new Date() }]
  })),
  updateVendorPayment: (vendorId, payment) => set((state) => ({
    vendors: state.vendors.map(v => v.id === vendorId ? { ...v, lastPayment: payment } : v)
  })),
}))
