import { Link } from 'react-router-dom'
import { Menu, X, LogOut, User, Home } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/authService'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()

  const handleLogout = async () => {
    try {
      await authService.signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="text-blue-600" size={28} />
            <span className="text-2xl font-bold text-gray-900">Society Pluss</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/properties" className="text-gray-700 hover:text-blue-600">
              Browse Properties
            </Link>
            {user && (
              <>
                <Link to="/favorites" className="text-gray-700 hover:text-blue-600">
                  Favorites
                </Link>
                <Link to="/my-inquiries" className="text-gray-700 hover:text-blue-600">
                  Inquiries
                </Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                  <User size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Home
            </Link>
            <Link to="/properties" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Browse Properties
            </Link>
            {user ? (
              <>
                <Link to="/favorites" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Favorites
                </Link>
                <Link to="/my-inquiries" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Inquiries
                </Link>
                <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Login
                </Link>
                <Link to="/signup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
