import { Heart, MapPin, BedDouble, Bath, Ruler } from 'lucide-react'
import { formatCurrency } from '../utils/helpers'

export default function PropertyCard({ property, onFavoriteToggle, isFavorite }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={property.image_url || '/placeholder-property.jpg'}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform"
        />
        <button
          onClick={() => onFavoriteToggle(property.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
          {property.status}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 truncate">{property.title}</h3>
        
        <div className="flex items-center text-gray-600 text-sm mt-2">
          <MapPin size={16} className="mr-1" />
          <span className="truncate">{property.city}, {property.state}</span>
        </div>

        <div className="text-2xl font-bold text-blue-600 mt-3">
          {formatCurrency(property.price)}
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t text-gray-600">
          {property.bedrooms && (
            <div className="flex items-center">
              <BedDouble size={16} className="mr-1" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath size={16} className="mr-1" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center">
              <Ruler size={16} className="mr-1" />
              <span className="text-sm">{property.area} sqft</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
