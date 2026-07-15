import { useEffect, useState } from 'react'
import { authService } from '../services/authService'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    const { data: listener } = authService.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}
