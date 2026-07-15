import { create } from 'zustand'
import { authService } from '../services/authService'

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  signUp: async (email, password, userData) => {
    set({ loading: true, error: null })
    try {
      const result = await authService.signUp(email, password, userData)
      set({ loading: false })
      return result
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const result = await authService.signIn(email, password)
      set({ user: result.user, loading: false })
      return result
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  signOut: async () => {
    set({ loading: true, error: null })
    try {
      await authService.signOut()
      set({ user: null, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  checkUser: async () => {
    try {
      const user = await authService.getCurrentUser()
      set({ user, loading: false })
    } catch (error) {
      set({ user: null, loading: false })
    }
  }
}))
