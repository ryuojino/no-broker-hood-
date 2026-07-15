import { useState } from 'react'
import { useSecurityStore } from '../context/securityStore'
import { securityService } from '../services/securityService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { Car, AlertTriangle, CheckCircle } from 'lucide-react'

export default function VehicleManagementPage() {
  const { registeredVehicles, vehicleViolations, registerVehicle, logViolation } = useSecurityStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('registered')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    residentName: '',
    residentUnit: '',
    vehicleType: 'car',
    parkingSlot: '',
  })

  const mockVehicles = [
    { id: 1, number: 'DL-01-AB-1234', owner: 'Rajesh Kumar', unit: 'F-201', type: 'Car', parkingSlot: 'A-12', status: 'authorized' },
    { id: 2, number: 'DL-01-CD-5678', owner: 'Priya Singh', unit: 'C-305', type: 'Car', parkingSlot: 'B-05', status: 'authorized' },
    { id: 3, number: 'DL-01-EF-9012', owner: 'Amit Patel', unit: 'B-102', type: 'Bike', parkingSlot: 'B-15', status: 'authorized' },
    { id: 4, number: 'HR-26-XY-7890', owner: 'Unknown', unit: 'N/A', type: 'Car', parkingSlot: 'C-08', status: 'unauthorized' },
  ]

  const mockViolations = [
    {
      id: 1,
      vehicleNumber: 'DL-01-AB-1234',
      type: 'Wrong Parking Slot',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'pending',
    },
    {
      id: 2,
      vehicleNumber: 'DL-01-EF-9012',
      type: 'Overstay in Guest Parking',
      date: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'resolved',
    },
    {
      id: 3,
      vehicleNumber: 'HR-26-XY-7890',
      type: 'Unauthorized Vehicle',
      date: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'pending',
    },
  ]

  const handleRegisterVehicle = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await securityService.registerVehicle(formData)
      registerVehicle(formData)
      setFormData({
        vehicleNumber: '',
        residentName: '',
        residentUnit: '',
        vehicleType: 'car',
        parkingSlot: '',
      })
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register vehicle')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Vehicle Management & Parking</h1>

        {error && <ErrorMessage message={error} />}

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('registered')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'registered'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            🚗 Registered Vehicles
          </button>
          <button
            onClick={() => setActiveTab('violations')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'violations'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            ⚠️ Violations
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {showForm ? 'Cancel' : 'Register Vehicle'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Register New Vehicle</h2>
            <form onSubmit={handleRegisterVehicle}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Vehicle Number (e.g., DL-01-AB-1234)"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="scooter">Scooter</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Owner Name"
                  value={formData.residentName}
                  onChange={(e) => setFormData({ ...formData, residentName: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Unit Number"
                  value={formData.residentUnit}
                  onChange={(e) => setFormData({ ...formData, residentUnit: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Parking Slot (e.g., A-12)"
                  value={formData.parkingSlot}
                  onChange={(e) => setFormData({ ...formData, parkingSlot: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : 'Register Vehicle'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'registered' && (
          <div className="space-y-4">
            {mockVehicles.map(vehicle => (
              <div key={vehicle.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-4">
                    <Car className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{vehicle.number}</h3>
                      <p className="text-gray-600">{vehicle.owner}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      vehicle.status === 'authorized'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {vehicle.status === 'authorized' ? '✓ Authorized' : '⚠️ Unauthorized'}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Type</p>
                    <p className="font-semibold">{vehicle.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Unit</p>
                    <p className="font-semibold">{vehicle.unit}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Parking Slot</p>
                    <p className="font-semibold">{vehicle.parkingSlot}</p>
                  </div>
                  <div className="text-right">
                    {vehicle.status === 'unauthorized' && (
                      <button className="text-red-600 hover:text-red-700 font-semibold">Alert Sent</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'violations' && (
          <div className="space-y-4">
            {mockViolations.map(violation => (
              <div key={violation.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{violation.type}</h3>
                      <p className="text-gray-600 text-sm">{violation.vehicleNumber}</p>
                      <p className="text-gray-600 text-sm">{violation.date.toLocaleString()}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      violation.status === 'pending'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {violation.status === 'pending' ? '⏳ Pending' : '✓ Resolved'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
