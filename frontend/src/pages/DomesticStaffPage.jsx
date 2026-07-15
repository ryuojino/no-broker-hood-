import { useState } from 'react'
import { useResidentStore } from '../context/residentStore'
import { residentService } from '../services/residentService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { Users, Clock, Search } from 'lucide-react'

export default function DomesticStaffPage() {
  const { staffRecords, addStaffRecord } = useResidentStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('mystaff')
  const [formData, setFormData] = useState({
    name: '',
    category: 'maid',
    phoneNumber: '',
    rate: '',
    workingDays: '',
  })

  const staffCategories = [
    { id: 'maid', label: 'Maid' },
    { id: 'driver', label: 'Driver' },
    { id: 'cook', label: 'Cook' },
  ]

  const handleAddStaff = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await residentService.addStaffMember(formData)
      addStaffRecord(formData)
      setFormData({
        name: '',
        category: 'maid',
        phoneNumber: '',
        rate: '',
        workingDays: '',
      })
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add staff member')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Domestic Staff Management</h1>

        {error && <ErrorMessage message={error} />}

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('mystaff')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'mystaff'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            My Staff
          </button>
          <button
            onClick={() => setActiveTab('hire')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'hire'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Hire Daily Help
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {showForm ? 'Cancel' : 'Add Staff Member'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <form onSubmit={handleAddStaff}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Staff Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  {staffCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Daily Rate (₹)"
                  value={formData.rate}
                  onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Working Days (e.g., Mon-Fri)"
                  value={formData.workingDays}
                  onChange={(e) => setFormData({ ...formData, workingDays: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : 'Add Staff Member'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'mystaff' && (
          <div className="grid grid-cols-1 gap-6">
            {staffRecords.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No staff members added yet</p>
              </div>
            ) : (
              staffRecords.map((staff) => (
                <div key={staff.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{staff.name}</h3>
                      <p className="text-gray-600">{staffCategories.find(c => c.id === staff.category)?.label}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Active</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <p><span className="font-semibold">Phone:</span> {staff.phoneNumber}</p>
                    <p><span className="font-semibold">Rate:</span> ₹{staff.rate}/day</p>
                    <p><span className="font-semibold">Working Days:</span> {staff.workingDays}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span><span className="font-semibold">Last Recorded:</span> {staff.lastTimestamp ? new Date(staff.lastTimestamp).toLocaleTimeString() : 'Not recorded'}</span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    View Attendance
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'hire' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 1, name: 'Priya Kumar', category: 'Maid', rating: 4.8, reviews: 120 },
              { id: 2, name: 'Raj Patel', category: 'Driver', rating: 4.9, reviews: 95 },
              { id: 3, name: 'Sunita Singh', category: 'Cook', rating: 4.7, reviews: 85 },
              { id: 4, name: 'Vikram Das', category: 'Driver', rating: 4.6, reviews: 110 },
            ].map(helper => (
              <div key={helper.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{helper.name}</h3>
                    <p className="text-gray-600 text-sm">{helper.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-500 font-semibold">⭐ {helper.rating}</p>
                    <p className="text-gray-500 text-xs">{helper.reviews} reviews</p>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Hire Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
