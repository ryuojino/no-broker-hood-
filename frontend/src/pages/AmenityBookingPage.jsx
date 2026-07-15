import { useState } from 'react'
import { useManagementStore } from '../context/managementStore'
import { managementService } from '../services/managementService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { Calendar, Users, MapPin } from 'lucide-react'

export default function AmenityBookingPage() {
  const { amenities, bookings, addAmenity, bookAmenity, cancelBooking } = useManagementStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('amenities')
  const [showAmenityForm, setShowAmenityForm] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedAmenity, setSelectedAmenity] = useState(null)
  
  const [amenityData, setAmenityData] = useState({
    name: '',
    description: '',
    capacity: '',
    hourlyRate: '',
  })

  const [bookingData, setBookingData] = useState({
    amenityId: '',
    date: '',
    startTime: '',
    endTime: '',
    userName: '',
    userPhone: '',
  })

  const mockAmenities = [
    { id: 1, name: 'Clubhouse', description: 'Multi-purpose hall', capacity: 100, hourlyRate: 500, booked: 3 },
    { id: 2, name: 'Swimming Pool', description: 'Olympic size pool', capacity: 50, hourlyRate: 200, booked: 2 },
    { id: 3, name: 'Gym', description: 'Fully equipped gymnasium', capacity: 30, hourlyRate: 300, booked: 4 },
    { id: 4, name: 'Tennis Court', description: 'Professional court', capacity: 4, hourlyRate: 250, booked: 1 },
  ]

  const handleAddAmenity = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await managementService.getAmenities('society-1')
      addAmenity(amenityData)
      setAmenityData({
        name: '',
        description: '',
        capacity: '',
        hourlyRate: '',
      })
      setShowAmenityForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add amenity')
    } finally {
      setLoading(false)
    }
  }

  const handleBookAmenity = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await managementService.bookAmenity(bookingData)
      bookAmenity(bookingData)
      setBookingData({
        amenityId: '',
        date: '',
        startTime: '',
        endTime: '',
        userName: '',
        userPhone: '',
      })
      setShowBookingForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book amenity')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Amenity Booking Management</h1>

        {error && <ErrorMessage message={error} />}

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('amenities')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'amenities'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Amenities
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'bookings'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setShowAmenityForm(!showAmenityForm)}
            className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {showAmenityForm ? 'Cancel' : 'Add Amenity'}
          </button>
        </div>

        {showAmenityForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <form onSubmit={handleAddAmenity}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Amenity Name"
                  value={amenityData.name}
                  onChange={(e) => setAmenityData({ ...amenityData, name: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  value={amenityData.capacity}
                  onChange={(e) => setAmenityData({ ...amenityData, capacity: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={amenityData.description}
                  onChange={(e) => setAmenityData({ ...amenityData, description: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
                  rows="3"
                  required
                />
                <input
                  type="number"
                  placeholder="Hourly Rate (₹)"
                  value={amenityData.hourlyRate}
                  onChange={(e) => setAmenityData({ ...amenityData, hourlyRate: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : 'Add Amenity'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'amenities' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockAmenities.map(amenity => (
              <div key={amenity.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{amenity.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{amenity.description}</p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>Capacity: {amenity.capacity} people</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>{amenity.booked} bookings</span>
                  </div>
                  <div className="text-green-600 font-semibold">
                    ₹{amenity.hourlyRate}/hour
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedAmenity(amenity)
                    setShowBookingForm(true)
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  New Booking
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No bookings yet</p>
              </div>
            ) : (
              bookings.map(booking => (
                <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{booking.amenityId}</h3>
                      <p className="text-gray-600">{booking.userName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status || 'Pending'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{booking.date}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Time:</span> {booking.startTime} - {booking.endTime}
                    </div>
                  </div>
                  <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                    Cancel Booking
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {showBookingForm && selectedAmenity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Book {selectedAmenity.name}</h3>
              <form onSubmit={handleBookAmenity}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Resident Name"
                    value={bookingData.userName}
                    onChange={(e) => setBookingData({ ...bookingData, userName: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={bookingData.userPhone}
                    onChange={(e) => setBookingData({ ...bookingData, userPhone: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                  />
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="time"
                      value={bookingData.startTime}
                      onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2"
                      required
                    />
                    <input
                      type="time"
                      value={bookingData.endTime}
                      onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2"
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
                    {loading ? <LoadingSpinner /> : 'Confirm Booking'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
