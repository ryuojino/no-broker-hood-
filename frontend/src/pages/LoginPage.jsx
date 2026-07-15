import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { authService } from '../services/authService'
import { validateEmail } from '../utils/helpers'
import ErrorMessage from '../components/ErrorMessage'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const successMessage = location.state?.message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email')
      return
    }
    if (!formData.password) {
      setError('Password is required')
      return
    }

    setLoading(true)
    try {
      await authService.signIn(formData.email, formData.password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Login</h2>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-green-800">
            {successMessage}
          </div>
        )}

        {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Mail size={18} className="inline mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Lock size={18} className="inline mr-2" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
          <p>
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
              Forgot Password?
            </Link>
          </p>
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
