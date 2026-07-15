import { useState } from 'react'
import { useResidentStore } from '../context/residentStore'
import { residentService } from '../services/residentService'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { AlertTriangle, Phone, Heart } from 'lucide-react'

export default function SafetySOSPage() {
  const { sosAlerts, triggerSOS } = useResidentStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSOSModal, setShowSOSModal] = useState(false)
  const [sosType, setSosType] = useState('medical')
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Security Guard', number: '+91-XXXX-XXXX-1' },
    { id: 2, name: 'Mom', number: '+91-XXXX-XXXX-2' },
    { id: 3, name: 'Dad', number: '+91-XXXX-XXXX-3' },
  ])
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContact, setNewContact] = useState({ name: '', number: '' })

  const sosTypes = [
    { id: 'medical', label: 'Medical Emergency', color: 'red', icon: '🏥' },
    { id: 'security', label: 'Security Threat', color: 'red', icon: '🚨' },
    { id: 'accident', label: 'Accident', color: 'red', icon: '🚗' },
    { id: 'fire', label: 'Fire', color: 'red', icon: '🔥' },
  ]

  const handleTriggerSOS = async () => {
    setLoading(true)
    setError(null)
    try {
      await residentService.triggerSOS({
        type: sosType,
        timestamp: new Date(),
        location: 'Current Location',
      })
      triggerSOS({
        type: sosType,
        timestamp: new Date(),
        contactsNotified: contacts.length,
      })
      setShowSOSModal(false)
      setSosType('medical')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to trigger SOS')
    } finally {
      setLoading(false)
    }
  }

  const handleAddContact = async () => {
    if (newContact.name && newContact.number) {
      try {
        await residentService.addEmergencyContact(newContact)
        setContacts([...contacts, { id: Date.now(), ...newContact }])
        setNewContact({ name: '', number: '' })
        setShowAddContact(false)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to add contact')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Safety & SOS</h1>

        {error && <ErrorMessage message={error} />}

        {/* Emergency SOS Button */}
        <div className="bg-red-600 text-white p-8 rounded-lg shadow-lg mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Emergency Alert System</h2>
          <p className="mb-6 text-red-100">Tap the button below to alert security and emergency contacts</p>
          <button
            onClick={() => setShowSOSModal(true)}
            className="bg-white text-red-600 px-12 py-4 rounded-lg font-bold text-xl hover:bg-red-50 transition transform hover:scale-105"
          >
            🚨 TRIGGER SOS
          </button>
        </div>

        {/* SOS Modal */}
        {showSOSModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Select Emergency Type</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {sosTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSosType(type.id)}
                    className={`p-4 rounded-lg text-center font-semibold transition ${
                      sosType === type.id
                        ? 'bg-red-600 text-white scale-105'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="text-sm">{type.label}</div>
                  </button>
                ))}
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                This will immediately alert security guards and {contacts.length} emergency contacts.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleTriggerSOS}
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 font-bold"
                >
                  {loading ? <LoadingSpinner /> : 'CONFIRM SOS'}
                </button>
                <button
                  onClick={() => setShowSOSModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contacts */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Emergency Contacts</h2>
            <button
              onClick={() => setShowAddContact(!showAddContact)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {showAddContact ? 'Cancel' : 'Add Contact'}
            </button>
          </div>

          {showAddContact && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newContact.number}
                  onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <button
                onClick={handleAddContact}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Add Emergency Contact
              </button>
            </div>
          )}

          <div className="space-y-3">
            {contacts.map(contact => (
              <div key={contact.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.number}</p>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-700 font-semibold">Remove</button>
              </div>
            ))}
          </div>
        </div>

        {/* SOS History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent SOS Alerts</h2>
          {sosAlerts.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No SOS alerts triggered</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sosAlerts.map(alert => (
                <div key={alert.id} className="border border-red-300 bg-red-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {sosTypes.find(t => t.id === alert.type)?.label}
                      </h3>
                      <p className="text-sm text-gray-600">{new Date(alert.timestamp).toLocaleString()}</p>
                      <p className="text-sm text-gray-600 mt-2">✓ Notified {alert.contactsNotified} emergency contacts</p>
                    </div>
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Responded</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
