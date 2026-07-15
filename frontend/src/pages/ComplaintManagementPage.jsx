import { useState } from 'react'
import { useManagementStore } from '../context/managementStore'
import { managementService } from '../services/managementService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { AlertCircle, User, ClipboardList } from 'lucide-react'

export default function ComplaintManagementPage() {
  const { complaints, addComplaint, updateComplaintStatus, assignComplaint } = useManagementStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'maintenance',
    priority: 'medium',
  })

  const categories = [
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'neighbor', label: 'Neighbor Issue' },
    { id: 'security', label: 'Security' },
    { id: 'amenity', label: 'Amenity' },
    { id: 'parking', label: 'Parking' },
    { id: 'other', label: 'Other' },
  ]

  const priorities = [
    { id: 'low', label: 'Low', color: 'blue' },
    { id: 'medium', label: 'Medium', color: 'yellow' },
    { id: 'high', label: 'High', color: 'red' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await managementService.createComplaint(formData)
      addComplaint(formData)
      setFormData({
        title: '',
        description: '',
        category: 'maintenance',
        priority: 'medium',
      })
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create complaint')
    } finally {
      setLoading(false)
    }
  }

  const filteredComplaints = filterStatus === 'all' 
    ? complaints 
    : complaints.filter(c => c.status === filterStatus)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complaint Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? 'Cancel' : 'New Complaint'}
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Complaint Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  {priorities.map(pri => (
                    <option key={pri.id} value={pri.id}>{pri.label}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Complaint Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
                  rows="4"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : 'Submit Complaint'}
              </button>
            </form>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {['all', 'open', 'in-progress', 'resolved'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredComplaints.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <ClipboardList className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No complaints in this category</p>
            </div>
          ) : (
            filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{complaint.title}</h3>
                    <p className="text-gray-600">{categories.find(c => c.id === complaint.category)?.label}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold block mb-2 ${
                      complaint.priority === 'high' ? 'bg-red-100 text-red-800' :
                      complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      complaint.status === 'open' ? 'bg-gray-100 text-gray-800' :
                      complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{complaint.description}</p>
                <p className="text-sm text-gray-600 mb-4">Created: {new Date(complaint.createdAt).toLocaleString()}</p>
                
                {complaint.assignedTo && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <User className="h-4 w-4" />
                    <span>Assigned to: {complaint.assignedTo}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <select
                    value={complaint.status || 'open'}
                    onChange={(e) => updateComplaintStatus(complaint.id, e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                    Assign Staff
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
