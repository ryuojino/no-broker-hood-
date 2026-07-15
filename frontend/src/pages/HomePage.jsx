import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Search, MapPin, Home, Users } from 'lucide-react'
import { propertyService } from '../services/propertyService'
import PropertyCard from '../components/PropertyCard'
import { favoritesService } from '../services/favoritesService'
import { useAuth } from '../hooks/useAuth'
import LoadingSpinner from '../components/LoadingSpinner'

export default function HomePage() {
  const { user } = useAuth()
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const properties = await propertyService.getProperties({ status: 'For Rent' })
        setFeaturedProperties(properties.slice(0, 6))

        if (user) {
          const userFavorites = await favoritesService.getFavorites(user.id)
          setFavorites(userFavorites.map(f => f.property_id))
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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

  if (loading) return <LoadingSpinner />

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Property</h1>
          <p className="text-xl text-blue-100 mb-8">Discover the best properties for rent and sale in India</p>
          
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
              <Search className="text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Search by city or property name..."
                className="bg-transparent ml-4 w-full text-gray-700 focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold ml-2">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Home size={40} className="mx-auto text-blue-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">10,000+</h3>
              <p className="text-gray-600">Active Properties</p>
            </div>
            <div className="text-center">
              <Users size={40} className="mx-auto text-blue-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">50,000+</h3>
              <p className="text-gray-600">Happy Users</p>
            </div>
            <div className="text-center">
              <MapPin size={40} className="mx-auto text-blue-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">100+</h3>
              <p className="text-gray-600">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <Link to="/properties" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center">
              View All
              <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
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
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to List Your Property?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of property owners and agents on Society Pluss</p>
          <Link
            to={user ? "/add-property" : "/signup"}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-bold text-lg"
          >
            Post Your Property
          </Link>
        </div>
      </section>
    </div>
  )
}
