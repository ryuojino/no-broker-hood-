import { useState } from 'react'
import { useSecurityStore } from '../context/securityStore'
import { securityService } from '../services/securityService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { LogOut, LogIn, Clock } from 'lucide-react'

export default function GateControlPage() {
  const { gateEntries, recordEntry, recordExit } = useSecurityStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showEntryForm, setShowEntryForm] = useState(false)
  const [activeTab, setActiveTab] = useState('today')
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorType: 'guest',
    vehicleNumber: '',
    purpose: '',
    residentName: '',
  })

  const visitorTypes = [
    { id: 'guest', label: 'Guest' },
    { id: 'delivery', label: 'Delivery Person' },
    { id: 'vendor', label: 'Vendor' },
    { id: 'service', label: 'Service Provider' },
    { id: 'resident', label: 'Resident' },
  ]

  const handleRecordEntry = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await securityService.recordEntry({
        ...formData,
        timestamp: new Date(),
        type: 'entry',
      })
      recordEntry({
        ...formData,
        timestamp: new Date(),
        type: 'entry',
      })
      setFormData({
        visitorName: '',
        visitorType: 'guest',
        vehicleNumber: '',
        purpose: '',
        residentName: '',
      })
      setShowEntryForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record entry')
    } finally {
      setLoading(false)
    }
  }

  const handleRecordExit = async (entryId) => {
    setLoading(true)
    setError(null)
    try {
      await securityService.recordExit({
        entryId,
        timestamp: new Date(),
      })
      recordExit({
        entryId,
        timestamp: new Date(),
        type: 'exit',
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record exit')
    } finally {
      setLoading(false)
    }
  }

  const getToday = () => gateEntries.filter(e => {
    const date = new Date(e.timestamp)
    const today = new Date()
    return date.toDateString() === today.toDateString()
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gate Control</h1>
          <button
            onClick={() => setShowEntryForm(!showEntryForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <LogIn className="h-5 w-5" /> {showEntryForm ? 'Cancel' : 'Record Entry'}
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        {showEntryForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Record Gate Entry</h2>
            <form onSubmit={handleRecordEntry}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Visitor Name"
                  value={formData.visitorName}
                  onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <select
                  value={formData.visitorType}
                  onChange={(e) => setFormData({ ...formData, visitorType: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  {visitorTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Vehicle Number (Optional)"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Visiting Resident/Unit"
                  value={formData.residentName}
                  onChange={(e) => setFormData({ ...formData, residentName: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <textarea
                  placeholder="Purpose of Visit"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
                  rows="3"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : 'Record Entry'}
              </button>
            </form>
          </div>
        )}

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'today'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            All Entries
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {(activeTab === 'today' ? getToday() : gateEntries).length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No entries recorded</p>
            </div>
          ) : (
            (activeTab === 'today' ? getToday() : gateEntries).map((entry) => (
              <div key={entry.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{entry.visitorName}</h3>
                    <p className="text-gray-600">{visitorTypes.find(t => t.id === entry.visitorType)?.label}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Entry Time:</p>
                    <p className="font-bold">{new Date(entry.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <p><span className="font-semibold">Vehicle:</span> {entry.vehicleNumber || 'N/A'}</p>
                  <p><span className="font-semibold">Visiting:</span> {entry.residentName}</p>
                  <p className="md:col-span-2"><span className="font-semibold">Purpose:</span> {entry.purpose}</p>
                </div>
                {!entry.exitTime && (
                  <button
                    onClick={() => handleRecordExit(entry.id)}
                    disabled={loading}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" /> Record Exit
                  </button>
                )}
                {entry.exitTime && (
                  <div className="text-green-600 font-semibold text-sm">
                    ✓ Exited at {new Date(entry.exitTime).toLocaleTimeString()}
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
