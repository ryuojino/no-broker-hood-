import { useState } from 'react'
import { useResidentStore } from '../context/residentStore'
import { residentService } from '../services/residentService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { MessageCircle, CheckCircle, XCircle } from 'lucide-react'

export default function VisitorManagementPage() {
  const { visitors, addVisitor, approveVisitor, denyVisitor } = useResidentStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    guestName: '',
    relationship: '',
    phoneNumber: '',
    vehicleNumber: '',
    expectedArrival: '',
    expectedDeparture: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await residentService.preAuthorizeVisitor(formData)
      addVisitor(formData)
      setFormData({
        guestName: '',
        relationship: '',
        phoneNumber: '',
        vehicleNumber: '',
        expectedArrival: '',
        expectedDeparture: '',
      })
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to authorize visitor')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = (visitorId) => {
    approveVisitor(visitorId)
  }

  const handleDeny = (visitorId) => {
    denyVisitor(visitorId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Visitor Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? 'Cancel' : 'Pre-Authorize Visitor'}
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Guest Name"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Relationship"
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Vehicle Number (Optional)"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="datetime-local"
                  value={formData.expectedArrival}
                  onChange={(e) => setFormData({ ...formData, expectedArrival: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="datetime-local"
                  value={formData.expectedDeparture}
                  onChange={(e) => setFormData({ ...formData, expectedDeparture: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : 'Send Authorization'}
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {visitors.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No visitors pre-authorized yet</p>
            </div>
          ) : (
            visitors.map((visitor) => (
              <div key={visitor.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{visitor.guestName}</h3>
                    <p className="text-gray-600">{visitor.relationship}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    visitor.status === 'approved' ? 'bg-green-100 text-green-800' :
                    visitor.status === 'denied' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {visitor.status || 'Pending'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <p><span className="font-semibold">Phone:</span> {visitor.phoneNumber}</p>
                  <p><span className="font-semibold">Vehicle:</span> {visitor.vehicleNumber || 'N/A'}</p>
                  <p><span className="font-semibold">Arrival:</span> {new Date(visitor.expectedArrival).toLocaleString()}</p>
                  <p><span className="font-semibold">Departure:</span> {new Date(visitor.expectedDeparture).toLocaleString()}</p>
                </div>
                {(!visitor.status || visitor.status === 'pending') && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(visitor.id)}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4" /> Approve
                    </button>
                    <button
                      onClick={() => handleDeny(visitor.id)}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      <XCircle className="h-4 w-4" /> Deny
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
