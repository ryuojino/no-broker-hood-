import { useState } from 'react'
import { useManagementStore } from '../context/managementStore'
import { managementService } from '../services/managementService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { Send, Bell, Users, Calendar } from 'lucide-react'

export default function CommunicationsPage() {
  const { broadcasts, meetings, sendBroadcast, scheduleMeeting } = useManagementStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('broadcasts')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'notice',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (activeTab === 'broadcasts') {
        await managementService.sendBroadcast(formData)
        sendBroadcast(formData)
      } else {
        await managementService.scheduleMeeting(formData)
        scheduleMeeting(formData)
      }
      setFormData({
        title: '',
        message: '',
        type: 'notice',
      })
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Communications</h1>

        {error && <ErrorMessage message={error} />}

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('broadcasts')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'broadcasts'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            📢 Broadcasts
          </button>
          <button
            onClick={() => setActiveTab('meetings')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'meetings'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            📅 Meetings
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {showForm ? 'Cancel' : `New ${activeTab === 'broadcasts' ? 'Broadcast' : 'Meeting'}`}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {activeTab === 'broadcasts' ? 'Send Broadcast' : 'Schedule Meeting'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={activeTab === 'broadcasts' ? 'Broadcast Title' : 'Meeting Title'}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  required
                />
                
                {activeTab === 'meetings' && (
                  <>
                    <input
                      type="datetime-local"
                      value={formData.datetime}
                      onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Location/Venue"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                      required
                    />
                  </>
                )}

                <textarea
                  placeholder={activeTab === 'broadcasts' ? 'Broadcast Message' : 'Meeting Agenda'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  rows="6"
                  required
                />

                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="notice">Notice</option>
                  <option value="announcement">Announcement</option>
                  <option value="emergency">Emergency Alert</option>
                  <option value="info">Information</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : `Send ${activeTab === 'broadcasts' ? 'Broadcast' : 'Meeting Invite'}`}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'broadcasts' && (
          <div className="space-y-4">
            {broadcasts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <Send className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No broadcasts sent yet</p>
              </div>
            ) : (
              broadcasts.map(broadcast => (
                <div key={broadcast.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{broadcast.title}</h3>
                      <p className="text-sm text-gray-600">{new Date(broadcast.createdAt).toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      broadcast.type === 'emergency' ? 'bg-red-100 text-red-800' :
                      broadcast.type === 'announcement' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {broadcast.type.charAt(0).toUpperCase() + broadcast.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{broadcast.message}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>✓ Sent to all residents</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="space-y-4">
            {meetings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No meetings scheduled yet</p>
              </div>
            ) : (
              meetings.map(meeting => (
                <div key={meeting.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{meeting.title}</h3>
                      <p className="text-gray-600">{meeting.location}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Scheduled
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 my-4">
                    <div>
                      <p className="text-sm text-gray-600">📅 Date & Time:</p>
                      <p className="font-semibold">{new Date(meeting.datetime).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">📍 Location:</p>
                      <p className="font-semibold">{meeting.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{meeting.message}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Send Reminder
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
