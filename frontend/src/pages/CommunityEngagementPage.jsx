import { useState } from 'react'
import { useResidentStore } from '../context/residentStore'
import { residentService } from '../services/residentService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { MessageSquare, Bell, Utensils } from 'lucide-react'

export default function CommunityEngagementPage() {
  const { communityNotices, addNotice } = useResidentStore()
  const [activeTab, setActiveTab] = useState('notices')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'notice',
  })

  const noticeTypes = [
    { id: 'notice', label: 'Notice', icon: '📢' },
    { id: 'announcement', label: 'Announcement', icon: '📣' },
    { id: 'maintenance', label: 'Maintenance Work', icon: '🔨' },
    { id: 'event', label: 'Event', icon: '🎉' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await residentService.postNotice(formData)
      addNotice(formData)
      setFormData({
        title: '',
        content: '',
        type: 'notice',
      })
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post notice')
    } finally {
      setLoading(false)
    }
  }

  const mockNotices = [
    {
      id: 1,
      title: 'Water Supply Maintenance',
      content: 'Water supply will be shut down on Sunday for maintenance work. Water tanker will be available at the gate.',
      type: 'maintenance',
      author: 'Management',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      title: 'Annual Society Picnic',
      content: 'Join us for our annual society picnic next month. Register now at the management office.',
      type: 'event',
      author: 'Community',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ]

  const mockForumPosts = [
    {
      id: 1,
      title: 'Best Plumber in the Area?',
      author: 'Priya S.',
      replies: 8,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      title: 'Anyone interested in a fitness group?',
      author: 'Rajesh K.',
      replies: 12,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ]

  const mockHomeChef = [
    {
      id: 1,
      name: 'Homemade Samosas',
      preparedBy: 'Mrs. Sharma',
      price: '₹80/dozen',
      description: 'Fresh, crispy samosas prepared daily',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Gulab Jamun',
      preparedBy: 'Mrs. Patel',
      price: '₹150/kg',
      description: 'Traditional gulab jamun in sugar syrup',
      rating: 4.9,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Community Engagement</h1>

        {error && <ErrorMessage message={error} />}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-6 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'notices'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Notice Board
          </button>
          <button
            onClick={() => setActiveTab('forums')}
            className={`px-6 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'forums'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Community Forums
          </button>
          <button
            onClick={() => setActiveTab('homechef')}
            className={`px-6 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'homechef'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Home Chef
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition whitespace-nowrap"
          >
            {showForm ? 'Cancel' : 'Post Notice'}
          </button>
        </div>

        {/* Post Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  >
                    {noticeTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <textarea
                  placeholder="Content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  rows="6"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : 'Post Notice'}
              </button>
            </form>
          </div>
        )}

        {/* Notices Tab */}
        {activeTab === 'notices' && (
          <div className="space-y-4">
            {[...mockNotices, ...communityNotices].length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No notices posted yet</p>
              </div>
            ) : (
              [...mockNotices, ...communityNotices].map(notice => (
                <div key={notice.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span>{noticeTypes.find(t => t.id === notice.type)?.icon}</span>
                        <span className="text-xs font-semibold text-blue-600 uppercase">
                          {noticeTypes.find(t => t.id === notice.type)?.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{notice.title}</h3>
                    </div>
                    <span className="text-xs text-gray-500">{notice.date.toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{notice.content}</p>
                  <p className="text-sm text-gray-600">Posted by: {notice.author}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Forums Tab */}
        {activeTab === 'forums' && (
          <div className="space-y-4">
            {mockForumPosts.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-600">Started by {post.author} • {post.date.toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{post.replies}</p>
                    <p className="text-sm text-gray-600">replies</p>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Start New Discussion
            </button>
          </div>
        )}

        {/* Home Chef Tab */}
        {activeTab === 'homechef' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockHomeChef.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 text-sm">by {item.preparedBy}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-500 font-semibold">⭐ {item.rating}</p>
                    <p className="text-2xl font-bold text-green-600 mt-2">{item.price}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4">{item.description}</p>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold">
                  Order Now
                </button>
              </div>
            ))}
            <button className="bg-white p-6 rounded-lg shadow-md border-2 border-dashed border-blue-600 flex items-center justify-center hover:bg-blue-50 transition">
              <div className="text-center">
                <p className="text-3xl mb-2">🍳</p>
                <p className="font-semibold text-blue-600">List Your Dish</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
