import { useState } from 'react'
import { useManagementStore } from '../context/managementStore'
import { managementService } from '../services/managementService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { Package, Users, CreditCard } from 'lucide-react'

export default function AssetInventoryPage() {
  const { assets, vendors, addAsset, addVendor } = useManagementStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('assets')
  const [showAssetForm, setShowAssetForm] = useState(false)
  const [showVendorForm, setShowVendorForm] = useState(false)
  
  const [assetData, setAssetData] = useState({
    name: '',
    category: '',
    quantity: '',
    value: '',
    location: '',
    condition: 'good',
  })

  const [vendorData, setVendorData] = useState({
    name: '',
    category: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
  })

  const handleAddAsset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await managementService.addAsset(assetData)
      addAsset(assetData)
      setAssetData({
        name: '',
        category: '',
        quantity: '',
        value: '',
        location: '',
        condition: 'good',
      })
      setShowAssetForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add asset')
    } finally {
      setLoading(false)
    }
  }

  const handleAddVendor = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await managementService.addVendor(vendorData)
      addVendor(vendorData)
      setVendorData({
        name: '',
        category: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
      })
      setShowVendorForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add vendor')
    } finally {
      setLoading(false)
    }
  }

  const mockAssets = [
    { id: 1, name: 'AC Units', category: 'Maintenance', quantity: 8, value: 80000, location: 'Common Areas', condition: 'good' },
    { id: 2, name: 'Furniture', category: 'Clubhouse', quantity: 20, value: 50000, location: 'Clubhouse', condition: 'good' },
    { id: 3, name: 'LED Lights', category: 'Lighting', quantity: 50, value: 15000, location: 'Common Areas', condition: 'excellent' },
  ]

  const mockVendors = [
    { id: 1, name: 'ABC Maintenance', category: 'Maintenance', contactPerson: 'John', phone: '+91-XXXX-XXXX-1', lastPayment: '2024-03-20' },
    { id: 2, name: 'XYZ Plumbing', category: 'Plumbing', contactPerson: 'Raj', phone: '+91-XXXX-XXXX-2', lastPayment: '2024-03-15' },
    { id: 3, name: 'Security Plus', category: 'Security', contactPerson: 'Kumar', phone: '+91-XXXX-XXXX-3', lastPayment: '2024-03-01' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Asset & Inventory Management</h1>

        {error && <ErrorMessage message={error} />}

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'assets'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            📦 Assets
          </button>
          <button
            onClick={() => setActiveTab('vendors')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'vendors'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            👥 Vendors
          </button>
          <button
            onClick={() => {
              if (activeTab === 'assets') setShowAssetForm(!showAssetForm)
              else setShowVendorForm(!showVendorForm)
            }}
            className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {activeTab === 'assets' ? (showAssetForm ? 'Cancel' : 'Add Asset') : (showVendorForm ? 'Cancel' : 'Add Vendor')}
          </button>
        </div>

        {activeTab === 'assets' && showAssetForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <form onSubmit={handleAddAsset}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Asset Name"
                  value={assetData.name}
                  onChange={(e) => setAssetData({ ...assetData, name: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={assetData.category}
                  onChange={(e) => setAssetData({ ...assetData, category: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={assetData.quantity}
                  onChange={(e) => setAssetData({ ...assetData, quantity: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Value (₹)"
                  value={assetData.value}
                  onChange={(e) => setAssetData({ ...assetData, value: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={assetData.location}
                  onChange={(e) => setAssetData({ ...assetData, location: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <select
                  value={assetData.condition}
                  onChange={(e) => setAssetData({ ...assetData, condition: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : 'Add Asset'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'vendors' && showVendorForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <form onSubmit={handleAddVendor}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Vendor Name"
                  value={vendorData.name}
                  onChange={(e) => setVendorData({ ...vendorData, name: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={vendorData.category}
                  onChange={(e) => setVendorData({ ...vendorData, category: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Contact Person"
                  value={vendorData.contactPerson}
                  onChange={(e) => setVendorData({ ...vendorData, contactPerson: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={vendorData.phone}
                  onChange={(e) => setVendorData({ ...vendorData, phone: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={vendorData.email}
                  onChange={(e) => setVendorData({ ...vendorData, email: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={vendorData.address}
                  onChange={(e) => setVendorData({ ...vendorData, address: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : 'Add Vendor'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="grid grid-cols-1 gap-6">
            {mockAssets.concat(assets).length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No assets recorded yet</p>
              </div>
            ) : (
              mockAssets.concat(assets).map((asset, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{asset.name}</h3>
                      <p className="text-gray-600">{asset.category}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      asset.condition === 'excellent' ? 'bg-green-100 text-green-800' :
                      asset.condition === 'good' ? 'bg-blue-100 text-blue-800' :
                      asset.condition === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {asset.condition.charAt(0).toUpperCase() + asset.condition.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Quantity</p>
                      <p className="font-bold">{asset.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Value</p>
                      <p className="font-bold">₹{asset.value}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-600">Location</p>
                      <p className="font-bold">{asset.location}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'vendors' && (
          <div className="space-y-4">
            {mockVendors.concat(vendors).length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No vendors registered yet</p>
              </div>
            ) : (
              mockVendors.concat(vendors).map((vendor, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{vendor.name}</h3>
                      <p className="text-gray-600">{vendor.category}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                      Record Payment
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Contact Person</p>
                      <p className="font-bold">{vendor.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-bold">{vendor.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Payment</p>
                      <p className="font-bold">{vendor.lastPayment || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
