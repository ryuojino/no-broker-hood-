import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { favoritesService } from '../services/favoritesService'
import PropertyCard from '../components/PropertyCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function FavoritesPage() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return
      try {
        const data = await favoritesService.getFavorites(user.id)
        setFavorites(data)
      } catch (error) {
        console.error('Error fetching favorites:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user])

  const handleRemoveFavorite = async (favoriteId, propertyId) => {
    try {
      await favoritesService.removeFavorite(user.id, propertyId)
      setFavorites(favorites.filter(f => f.id !== favoriteId))
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Heart size={32} className="text-red-500 mr-4" />
        <h1 className="text-4xl font-bold text-gray-900">My Favorites</h1>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="relative">
              <Link to={`/property/${favorite.properties.id}`}>
                <PropertyCard
                  property={favorite.properties}
                  onFavoriteToggle={() => handleRemoveFavorite(favorite.id, favorite.properties.id)}
                  isFavorite={true}
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 text-lg mb-4">No favorites yet</p>
          <Link to="/properties" className="text-blue-600 hover:text-blue-700 font-semibold">
            Browse properties
          </Link>
        </div>
      )}
    </div>
  )
}
