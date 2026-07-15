import { useState } from 'react'
import { useResidentStore } from '../context/residentStore'
import { residentService } from '../services/residentService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { Wrench, MapPin, Calendar } from 'lucide-react'

export default function HomeServicesPage() {
  const { serviceRequests, addServiceRequest, updateServiceStatus } = useResidentStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    serviceType: 'cleaning',
    description: '',
    preferredDate: '',
    preferredTime: '',
    budget: '',
  })

  const services = [
    { id: 'cleaning', label: 'Home Cleaning', icon: '🧹' },
    { id: 'painting', label: 'Painting', icon: '🎨' },
    { id: 'pest-control', label: 'Pest Control', icon: '🐛' },
    { id: 'plumbing', label: 'Plumbing', icon: '🔧' },
    { id: 'packers', label: 'Packers & Movers', icon: '📦' },
    { id: 'electrical', label: 'Electrical', icon: '⚡' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await residentService.requestHomeService(formData)
      addServiceRequest(formData)
      setFormData({
        serviceType: 'cleaning',
        description: '',
        preferredDate: '',
        preferredTime: '',
        budget: '',
      })
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Home Services</h1>

        {error && <ErrorMessage message={error} />}

        {!showForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {services.map(service => (
              <button
                key={service.id}
                onClick={() => {
                  setFormData({ ...formData, serviceType: service.id })
                  setShowForm(true)
                }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-left"
              >
                <div className="text-4xl mb-2">{service.icon}</div>
                <h3 className="font-semibold text-gray-900">{service.label}</h3>
              </button>
            ))}
          </div>
        )}

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Request: {services.find(s => s.id === formData.serviceType)?.label}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
                  <textarea
                    placeholder="Describe your service requirement"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    rows="4"
                    required
                  />
                </div>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹)</label>
                  <input
                    type="number"
                    placeholder="Your budget range"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? <LoadingSpinner /> : 'Request Service'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Service Requests</h2>
          {serviceRequests.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <Wrench className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No service requests yet</p>
            </div>
          ) : (
            serviceRequests.map((request) => (
              <div key={request.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{services.find(s => s.id === request.serviceType)?.label}</h3>
                    <p className="text-gray-600">{request.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    request.status === 'completed' ? 'bg-green-100 text-green-800' :
                    request.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {request.status || 'Pending'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{request.preferredDate} at {request.preferredTime}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Budget:</span> ₹{request.budget}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
