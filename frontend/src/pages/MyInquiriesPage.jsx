import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { inquiryService } from '../services/inquiryService'
import { formatDate, formatCurrency } from '../utils/helpers'
import { INQUIRY_STATUS } from '../utils/constants'
import LoadingSpinner from '../components/LoadingSpinner'

export default function MyInquiriesPage() {
  const { user } = useAuth()
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInquiries = async () => {
      if (!user) return
      try {
        const data = await inquiryService.getInquiries(user.id)
        setInquiries(data)
      } catch (error) {
        console.error('Error fetching inquiries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInquiries()
  }, [user])

  const handleStatusUpdate = async (inquiryId, newStatus) => {
    try {
      await inquiryService.updateInquiry(inquiryId, { status: newStatus })
      setInquiries(inquiries.map(i => i.id === inquiryId ? { ...i, status: newStatus } : i))
    } catch (error) {
      console.error('Error updating inquiry:', error)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Inquiries</h1>

      {inquiries.length > 0 ? (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{inquiry.properties?.title}</h3>
                  <p className="text-gray-600">{inquiry.properties?.city}, {inquiry.properties?.state}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  inquiry.status === 'New' ? 'bg-blue-100 text-blue-800' :
                  inquiry.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                  inquiry.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                  inquiry.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {inquiry.status}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 mb-2"><strong>Price:</strong> {formatCurrency(inquiry.properties?.price)}</p>
                <p className="text-gray-700"><strong>Your Message:</strong> {inquiry.message}</p>
                <p className="text-gray-600 text-sm mt-2">Contact: {inquiry.contact_number}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-gray-500 text-sm">{formatDate(inquiry.created_at)}</span>
                <select
                  value={inquiry.status}
                  onChange={(e) => handleStatusUpdate(inquiry.id, e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {INQUIRY_STATUS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No inquiries yet</p>
        </div>
      )}
    </div>
  )
}
