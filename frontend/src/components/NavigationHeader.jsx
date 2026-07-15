import { Link } from 'react-router-dom'
import { Menu, X, LogOut, User, Home, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/authService'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const { user } = useAuth()

  const handleLogout = async () => {
    try {
      await authService.signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const residentMenu = [
    { label: 'Visitor Management', href: '/resident/visitors' },
    { label: 'Domestic Staff', href: '/resident/domestic-staff' },
    { label: 'Home Services', href: '/resident/home-services' },
    { label: 'Safety & SOS', href: '/resident/safety-sos' },
    { label: 'Community', href: '/resident/community' },
  ]

  const managementMenu = [
    { label: 'Complaint Management', href: '/management/complaints' },
    { label: 'Amenity Booking', href: '/management/amenities' },
    { label: 'Communications', href: '/management/communications' },
    { label: 'Asset & Inventory', href: '/management/assets' },
  ]

  const securityMenu = [
    { label: 'Gate Control', href: '/security/gate-control' },
    { label: 'Guard Patrolling', href: '/security/patrol' },
    { label: 'Overstay Alerts', href: '/security/overstay' },
    { label: 'Vehicle Management', href: '/security/vehicles' },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="text-blue-600" size={28} />
            <span className="text-2xl font-bold text-gray-900">NoBrokerHood</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 z-50">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded hover:bg-gray-100">
              Home
            </Link>
            <Link to="/properties" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded hover:bg-gray-100">
              Browse
            </Link>

            {user && (
              <>
                {/* Resident Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setOpenDropdown('resident')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1 focus:outline-none">
                    👥 Resident
                    <ChevronDown size={16} />
                  </button>
                  {openDropdown === 'resident' && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                      <div className="py-2">
                        {residentMenu.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium transition"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Management Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setOpenDropdown('management')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1 focus:outline-none">
                    📊 Management
                    <ChevronDown size={16} />
                  </button>
                  {openDropdown === 'management' && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                      <div className="py-2">
                        {managementMenu.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium transition"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Security Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setOpenDropdown('security')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1 focus:outline-none">
                    🛡️ Security
                    <ChevronDown size={16} />
                  </button>
                  {openDropdown === 'security' && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                      <div className="py-2">
                        {securityMenu.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium transition"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded hover:bg-gray-100">
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
          <div className="md:hidden pb-4 space-y-2 max-h-96 overflow-y-auto bg-gray-50">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Home
            </Link>
            <Link to="/properties" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Browse Properties
            </Link>

            {user && (
              <>
                {/* Resident Section Mobile */}
                <div className="px-4 py-2">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'resident' ? null : 'resident')}
                    className="w-full text-left text-gray-700 hover:text-blue-600 font-semibold flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                  >
                    👥 Resident Menu
                    <ChevronDown size={16} className={`transition-transform ${openDropdown === 'resident' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'resident' && (
                    <div className="pl-4 space-y-1 mt-2">
                      {residentMenu.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Management Section Mobile */}
                <div className="px-4 py-2">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'management' ? null : 'management')}
                    className="w-full text-left text-gray-700 hover:text-blue-600 font-semibold flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                  >
                    📊 Management Menu
                    <ChevronDown size={16} className={`transition-transform ${openDropdown === 'management' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'management' && (
                    <div className="pl-4 space-y-1 mt-2">
                      {managementMenu.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Security Section Mobile */}
                <div className="px-4 py-2">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'security' ? null : 'security')}
                    className="w-full text-left text-gray-700 hover:text-blue-600 font-semibold flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                  >
                    🛡️ Security Menu
                    <ChevronDown size={16} className={`transition-transform ${openDropdown === 'security' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'security' && (
                    <div className="pl-4 space-y-1 mt-2">
                      {securityMenu.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Dashboard
                </Link>
              </>
            )}

            {/* Mobile Auth */}
            <div className="px-4 py-2 space-y-2 border-t border-gray-300 mt-2 pt-2">
              {user ? (
                <>
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
