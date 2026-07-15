import { useState } from 'react'
import { useSecurityStore } from '../context/securityStore'
import { securityService } from '../services/securityService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'

export default function OverstayAlertsPage() {
  const { overstayAlerts, createOverstayAlert, resolveOverstayAlert } = useSecurityStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const mockAlerts = [
    {
      id: 1,
      visitorName: 'Rajesh Kumar',
      expectedDeparture: new Date(Date.now() - 30 * 60000),
      currentDuration: '45 mins',
      residentUnit: 'F-201',
      severity: 'warning',
      status: 'active',
    },
    {
      id: 2,
      visitorName: 'Priya Singh',
      expectedDeparture: new Date(Date.now() - 90 * 60000),
      currentDuration: '2 hours 15 mins',
      residentUnit: 'C-305',
      severity: 'critical',
      status: 'active',
    },
    {
      id: 3,
      visitorName: 'Amit Patel',
      expectedDeparture: new Date(Date.now() - 120 * 60000),
      currentDuration: '2 hours',
      residentUnit: 'B-102',
      severity: 'warning',
      status: 'resolved',
    },
  ]

  const filteredAlerts = filterStatus === 'all' ? mockAlerts : mockAlerts.filter(a => a.status === filterStatus)

  const handleResolveAlert = async (alertId) => {
    setLoading(true)
    setError(null)
    try {
      await securityService.resolveOverstayAlert(alertId)
      resolveOverstayAlert(alertId)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resolve alert')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Overstay Alerts</h1>

        {error && <ErrorMessage message={error} />}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm font-semibold">ACTIVE ALERTS</p>
            <p className="text-3xl font-bold text-red-600 mt-2">2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm font-semibold">CRITICAL</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">1</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm font-semibold">RESOLVED TODAY</p>
            <p className="text-3xl font-bold text-green-600 mt-2">1</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8">
          {['all', 'active', 'resolved'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No alerts in this category</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-6 rounded-lg shadow-md ${
                  alert.status === 'active'
                    ? alert.severity === 'critical'
                      ? 'bg-red-50 border-2 border-red-500'
                      : 'bg-yellow-50 border-2 border-yellow-500'
                    : 'bg-gray-50 border-2 border-green-500'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    {alert.severity === 'critical' && (
                      <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    )}
                    {alert.severity === 'warning' && (
                      <Info className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                    )}
                    {alert.status === 'resolved' && (
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{alert.visitorName}</h3>
                      <p className="text-gray-600 text-sm">Unit: {alert.residentUnit}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      alert.severity === 'critical'
                        ? 'bg-red-200 text-red-800'
                        : alert.severity === 'warning'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-green-200 text-green-800'
                    }`}
                  >
                    {alert.severity === 'critical' ? '🔴 CRITICAL' : alert.severity === 'warning' ? '🟡 WARNING' : '✓ RESOLVED'}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Expected Departure</p>
                    <p className="font-semibold">{alert.expectedDeparture.toLocaleTimeString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Duration</p>
                    <p className="font-semibold text-red-600">{alert.currentDuration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overstay</p>
                    <p className="font-semibold">{alert.currentDuration}</p>
                  </div>
                </div>

                {alert.status === 'active' && (
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                      Contact Resident
                    </button>
                    <button
                      onClick={() => handleResolveAlert(alert.id)}
                      disabled={loading}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
                    >
                      {loading ? <LoadingSpinner /> : 'Mark Resolved'}
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
