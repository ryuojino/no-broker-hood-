import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { userService } from '../services/userService'
import { propertyService } from '../services/propertyService'
import { formatCurrency } from '../utils/helpers'
import LoadingSpinner from '../components/LoadingSpinner'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState(null)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      try {
        const userProfile = await userService.getUserProfile(user.id)
        setProfile(userProfile)

        const userProperties = await propertyService.getProperties()
        const myProperties = userProperties.filter(p => p.owner_id === user.id)
        setProperties(myProperties)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (authLoading || loading) return <LoadingSpinner />
  if (!user) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'profile'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('properties')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'properties'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          My Properties ({properties.length})
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
          {profile ? (
            <div className="space-y-4">
              <div>
                <label className="text-gray-600">Full Name</label>
                <p className="text-lg font-semibold text-gray-900">{profile.full_name}</p>
              </div>
              <div>
                <label className="text-gray-600">Email</label>
                <p className="text-lg font-semibold text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="text-gray-600">Phone</label>
                <p className="text-lg font-semibold text-gray-900">{profile.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-gray-600">City</label>
                <p className="text-lg font-semibold text-gray-900">{profile.city || 'Not provided'}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Loading profile...</p>
          )}
        </div>
      )}

      {/* Properties Tab */}
      {activeTab === 'properties' && (
        <div>
          {properties.length > 0 ? (
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center hover:shadow-lg transition-shadow">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
                    <p className="text-gray-600">{property.city}, {property.state}</p>
                    <p className="text-blue-600 font-semibold mt-2">{formatCurrency(property.price)}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      property.status === 'For Rent' ? 'bg-blue-100 text-blue-800' :
                      property.status === 'For Sale' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {property.status}
                    </span>
                    <div className="mt-4 space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg mb-4">No properties yet</p>
              <a href="/add-property" className="text-blue-600 hover:text-blue-700 font-semibold">
                Post your first property
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
