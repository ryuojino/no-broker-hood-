import  { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { authService } from './services/authService'
import { useAuthStore } from './context/authStore'

import Header from './components/NavigationHeader'
import Footer from './components/Footer'

// Original Pages
import HomePage from './pages/HomePage'
import PropertiesPage from './pages/PropertiesPage'
import PropertyDetailsPage from './pages/PropertyDetailsPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import FavoritesPage from './pages/FavoritesPage'
import MyInquiriesPage from './pages/MyInquiriesPage'
import DashboardPage from './pages/DashboardPage'
import AddPropertyPage from './pages/AddPropertyPage'

// Resident Platform Pages
import VisitorManagementPage from './pages/VisitorManagementPage'
import DomesticStaffPage from './pages/DomesticStaffPage'
import HomeServicesPage from './pages/HomeServicesPage'
import SafetySOSPage from './pages/SafetySOSPage'
import CommunityEngagementPage from './pages/CommunityEngagementPage'

// Management Committee Pages
import ComplaintManagementPage from './pages/ComplaintManagementPage'
import AmenityBookingPage from './pages/AmenityBookingPage'
import CommunicationsPage from './pages/CommunicationsPage'
import AssetInventoryPage from './pages/AssetInventoryPage'

// Security Staff Pages
import GateControlPage from './pages/GateControlPage'
import GuardPatrollingPage from './pages/GuardPatrollingPage'
import OverstayAlertsPage from './pages/OverstayAlertsPage'
import VehicleManagementPage from './pages/VehicleManagementPage'

export default function App() {
  const checkUser = useAuthStore(state => state.checkUser)

  useEffect(() => {
    checkUser()
  }, [checkUser])

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            {/* Original Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/my-inquiries" element={<MyInquiriesPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add-property" element={<AddPropertyPage />} />

            {/* Resident Platform Routes */}
            <Route path="/resident/visitors" element={<VisitorManagementPage />} />
            <Route path="/resident/domestic-staff" element={<DomesticStaffPage />} />
            <Route path="/resident/home-services" element={<HomeServicesPage />} />
            <Route path="/resident/safety-sos" element={<SafetySOSPage />} />
            <Route path="/resident/community" element={<CommunityEngagementPage />} />

            {/* Management Committee Routes */}
            <Route path="/management/complaints" element={<ComplaintManagementPage />} />
            <Route path="/management/amenities" element={<AmenityBookingPage />} />
            <Route path="/management/communications" element={<CommunicationsPage />} />
            <Route path="/management/assets" element={<AssetInventoryPage />} />

            {/* Security Staff Routes */}
            <Route path="/security/gate-control" element={<GateControlPage />} />
            <Route path="/security/patrol" element={<GuardPatrollingPage />} />
            <Route path="/security/overstay" element={<OverstayAlertsPage />} />
            <Route path="/security/vehicles" element={<VehicleManagementPage />} />
            
            <Route path="*" element={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Page not found</p>
                  <a href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Go back home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}
