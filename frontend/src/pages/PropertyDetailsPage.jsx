import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heart, MapPin, BedDouble, Bath, Ruler, Mail, Phone, MessageSquare, Loader } from 'lucide-react'
import { propertyService } from '../services/propertyService'
import { favoritesService } from '../services/favoritesService'
import { inquiryService } from '../services/inquiryService'
import { useAuth } from '../hooks/useAuth'
import { formatCurrency, calculateDaysAgo } from '../utils/helpers'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [inquiryData, setInquiryData] = useState({
    message: '',
    contact_number: ''
  })
  const [submittingInquiry, setSubmittingInquiry] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await propertyService.getPropertyById(id)
        setProperty(data)

        if (user) {
          const favorite = await favoritesService.isFavorite(user.id, id)
          setIsFavorite(favorite)
        }
      } catch (err) {
        setError('Failed to load property details')
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id, user])

  const handleFavoriteToggle = async () => {
    if (!user) {
      setError('Please login to save favorites')
      return
    }

    try {
      if (isFavorite) {
        await favoritesService.removeFavorite(user.id, property.id)
      } else {
        await favoritesService.addFavorite(user.id, property.id)
      }
      setIsFavorite(!isFavorite)
    } catch (err) {
      setError('Failed to update favorite')
    }
  }

  const handleInquirySubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('Please login to send inquiry')
      return
    }

    setSubmittingInquiry(true)
    try {
      await inquiryService.createInquiry({
        property_id: property.id,
        buyer_id: user.id,
        message: inquiryData.message,
        contact_number: inquiryData.contact_number,
        status: 'New'
      })
      setInquiryData({ message: '', contact_number: '' })
      setShowInquiryForm(false)
      alert('Inquiry sent successfully!')
    } catch (err) {
      setError('Failed to send inquiry')
    } finally {
      setSubmittingInquiry(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="min-h-screen flex items-center justify-center"><ErrorMessage message={error} /></div>
  if (!property) return <div className="min-h-screen flex items-center justify-center"><p>Property not found</p></div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Image Gallery */}
      <div className="mb-8">
        <div className="relative h-96 rounded-lg overflow-hidden bg-gray-200">
          <img
            src={property.image_url || '/placeholder-property.jpg'}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleFavoriteToggle}
            className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{property.title}</h1>
                <div className="flex items-center text-gray-600 mt-2">
                  <MapPin size={20} className="mr-2" />
                  <span>{property.city}, {property.state}</span>
                </div>
              </div>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                {property.status}
              </span>
            </div>

            <div className="text-3xl font-bold text-blue-600 mb-6">
              {formatCurrency(property.price)}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b">
              {property.bedrooms && (
                <div className="text-center">
                  <BedDouble size={32} className="mx-auto text-gray-600 mb-2" />
                  <p className="text-gray-600">Bedrooms</p>
                  <p className="text-2xl font-bold">{property.bedrooms}</p>
                </div>
              )}
              {property.bathrooms && (
                <div className="text-center">
                  <Bath size={32} className="mx-auto text-gray-600 mb-2" />
                  <p className="text-gray-600">Bathrooms</p>
                  <p className="text-2xl font-bold">{property.bathrooms}</p>
                </div>
              )}
              {property.area && (
                <div className="text-center">
                  <Ruler size={32} className="mx-auto text-gray-600 mb-2" />
                  <p className="text-gray-600">Area</p>
                  <p className="text-2xl font-bold">{property.area} sqft</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 line-height-relaxed">{property.description}</p>
            </div>

            {property.amenities && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities.split(',').map((amenity, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <span className="text-blue-600 mr-2">✓</span>
                      {amenity.trim()}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t text-sm text-gray-500">
              <p>Posted {calculateDaysAgo(property.created_at)}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Owner Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Contact Owner</h2>
            {property.owner && (
              <div className="space-y-3">
                <p className="text-gray-700"><strong>Name:</strong> {property.owner}</p>
                {property.owner_phone && (
                  <p className="flex items-center text-gray-700">
                    <Phone size={18} className="mr-2" />
                    {property.owner_phone}
                  </p>
                )}
                {property.owner_email && (
                  <p className="flex items-center text-gray-700">
                    <Mail size={18} className="mr-2" />
                    {property.owner_email}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Inquiry Form */}
          <div className="bg-blue-50 rounded-lg shadow-md p-6">
            {!showInquiryForm ? (
              <button
                onClick={() => setShowInquiryForm(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center"
              >
                <MessageSquare size={20} className="mr-2" />
                Send Inquiry
              </button>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <h3 className="font-bold text-lg">Send Your Inquiry</h3>
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  value={inquiryData.contact_number}
                  onChange={(e) => setInquiryData({ ...inquiryData, contact_number: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Your Message"
                  value={inquiryData.message}
                  onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={submittingInquiry}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
                  >
                    {submittingInquiry ? <Loader className="inline animate-spin" size={16} /> : 'Send'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
