import { useState } from 'react'
import { useSecurityStore } from '../context/securityStore'
import { securityService } from '../services/securityService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { MapPin, AlertCircle, Check } from 'lucide-react'

export default function GuardPatrollingPage() {
  const { patrolRoutes, patrolLogs, createPatrolRoute, logPatrolCheckpoint } = useSecurityStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('routes')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    routeName: '',
    checkpoints: '',
    estimatedTime: '',
    frequency: 'hourly',
  })

  const handleCreateRoute = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await securityService.createPatrolRoute(formData)
      createPatrolRoute({
        ...formData,
        checkpoints: formData.checkpoints.split(',').map(c => c.trim()),
      })
      setFormData({
        routeName: '',
        checkpoints: '',
        estimatedTime: '',
        frequency: 'hourly',
      })
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create route')
    } finally {
      setLoading(false)
    }
  }

  const handleLogCheckpoint = async (routeId) => {
    setLoading(true)
    setError(null)
    try {
      await securityService.logPatrolCheckpoint({
        routeId,
        timestamp: new Date(),
      })
      logPatrolCheckpoint({
        routeId,
        timestamp: new Date(),
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log checkpoint')
    } finally {
      setLoading(false)
    }
  }

  const mockRoutes = [
    {
      id: 1,
      name: 'North Block Perimeter',
      checkpoints: 4,
      frequency: 'Hourly',
      lastChecked: '06:45 AM',
      status: 'on-time',
    },
    {
      id: 2,
      name: 'South Gate & Parking',
      checkpoints: 3,
      frequency: '2 Hours',
      lastChecked: '06:30 AM',
      status: 'on-time',
    },
    {
      id: 3,
      name: 'Community Center',
      checkpoints: 2,
      frequency: '4 Hours',
      lastChecked: '04:00 AM',
      status: 'pending',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Guard Patrolling Management</h1>

        {error && <ErrorMessage message={error} />}

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'routes'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Patrol Routes
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'logs'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Patrol Logs
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {showForm ? 'Cancel' : 'Create Route'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Patrol Route</h2>
            <form onSubmit={handleCreateRoute}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Route Name"
                  value={formData.routeName}
                  onChange={(e) => setFormData({ ...formData, routeName: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Estimatedited Time (minutes)"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <textarea
                  placeholder="Checkpoints (comma separated)"
                  value={formData.checkpoints}
                  onChange={(e) => setFormData({ ...formData, checkpoints: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
                  rows="3"
                  required
                />
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
                >
                  <option value="hourly">Hourly</option>
                  <option value="2hourly">Every 2 Hours</option>
                  <option value="4hourly">Every 4 Hours</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : 'Create Route'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'routes' && (
          <div className="grid grid-cols-1 gap-6">
            {mockRoutes.map(route => (
              <div key={route.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{route.name}</h3>
                    <p className="text-gray-600">{route.checkpoints} Checkpoints • {route.frequency}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    route.status === 'on-time' ? 'bg-green-100 text-green-800' :
                    route.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {route.status === 'on-time' ? '✓ On Time' : route.status === 'pending' ? 'Pending' : 'Overdue'}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">Last Checked: {route.lastChecked}</p>
                <button
                  onClick={() => handleLogCheckpoint(route.id)}
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <MapPin className="h-4 w-4" /> Log Checkpoint
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-4">
            {patrolLogs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No patrol logs recorded</p>
              </div>
            )}
            {patrolLogs.map((log, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Route {log.routeId}</h3>
                    <p className="text-gray-600">{new Date(log.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="text-green-600 flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    <span className="font-bold">Completed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
