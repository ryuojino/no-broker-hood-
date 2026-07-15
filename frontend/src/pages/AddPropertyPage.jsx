import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { propertyService } from '../services/propertyService'
import { PROPERTY_TYPES, PROPERTY_STATUS, AMENITIES } from '../utils/constants'
import ErrorMessage from '../components/ErrorMessage'

export default function AddPropertyPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    propertyType: '',
    status: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    city: '',
    state: '',
    amenities: []
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please login to post a property</p>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter(a => a !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.title || !formData.description || !formData.price || !formData.propertyType) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      let imageUrl = null
      if (image) {
        imageUrl = await propertyService.uploadPropertyImage(image, `temp-${Date.now()}`)
      }

      const property = await propertyService.createProperty({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        property_type: formData.propertyType,
        status: formData.status || 'For Sale',
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        area: formData.area ? parseInt(formData.area) : null,
        city: formData.city,
        state: formData.state,
        amenities: formData.amenities.join(','),
        image_url: imageUrl
      })

      navigate(`/property/${property.id}`)
    } catch (err) {
      setError(err.message || 'Failed to create property')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Post Your Property</h1>

      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Property title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed property description"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select property type</option>
                  {PROPERTY_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select status</option>
                  {PROPERTY_STATUS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Property Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area (sqft)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {AMENITIES.map(amenity => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  value={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              {imagePreview ? (
                <div>
                  <img src={imagePreview} alt="Preview" className="mx-auto max-h-48 mb-4" />
                  <p className="text-gray-600">Click to change image</p>
                </div>
              ) : (
                <div>
                  <Upload size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish Property'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
