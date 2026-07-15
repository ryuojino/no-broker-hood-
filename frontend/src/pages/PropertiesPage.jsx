import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { propertyService } from '../services/propertyService'
import { favoritesService } from '../services/favoritesService'
import { useAuth } from '../hooks/useAuth'
import PropertyCard from '../components/PropertyCard'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'

export default function PropertiesPage() {
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [favorites, setFavorites] = useState([])
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      try {
        const data = await propertyService.getProperties(filters)
        setProperties(data)
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [filters])

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return
      try {
        const data = await favoritesService.getFavorites(user.id)
        setFavorites(data.map(f => f.property_id))
      } catch (error) {
        console.error('Error fetching favorites:', error)
      }
    }

    fetchFavorites()
  }, [user])

  const handleFavoriteToggle = async (propertyId) => {
    if (!user) {
      alert('Please login to save favorites')
      return
    }

    try {
      if (favorites.includes(propertyId)) {
        await favoritesService.removeFavorite(user.id, propertyId)
        setFavorites(favorites.filter(id => id !== propertyId))
      } else {
        await favoritesService.addFavorite(user.id, propertyId)
        setFavorites([...favorites, propertyId])
      }
    } catch (error) {
      console.error('Error updating favorite:', error)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value
    })
  }

  if (loading && properties.length === 0) return <LoadingSpinner />

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Browse Properties</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Results */}
      {loading ? (
        <LoadingSpinner />
      ) : properties.length > 0 ? (
        <div>
          <p className="text-gray-600 mb-6">Found {properties.length} properties</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Link key={property.id} to={`/property/${property.id}`}>
                <PropertyCard
                  property={property}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={favorites.includes(property.id)}
                />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg mb-4">No properties found matching your criteria</p>
          <Link to="/properties" className="text-blue-600 hover:text-blue-700 font-semibold">
            Clear filters and try again
          </Link>
        </div>
      )}
    </div>
  )
}
