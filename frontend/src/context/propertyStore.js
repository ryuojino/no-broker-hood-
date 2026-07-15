import { create } from 'zustand'

export const usePropertyStore = create((set) => ({
  properties: [],
  loading: false,
  error: null,
  filters: {},

  setProperties: (properties) => set({ properties }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilters: (filters) => set({ filters }),

  updateFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    }))
}))

export const useFavoritesStore = create((set) => ({
  favorites: [],
  loading: false,
  error: null,

  setFavorites: (favorites) => set({ favorites }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addFavorite: (property) =>
    set((state) => ({
      favorites: [...state.favorites, property]
    })),

  removeFavorite: (propertyId) =>
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== propertyId)
    }))
}))
