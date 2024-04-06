import { create } from 'zustand'

type ContactStore = {
  loading: boolean
  message: string
  setLoading: (loading: boolean) => void
  setMessage: (message: string) => void
}

export const useContactStore = create<ContactStore>((set) => ({
  loading: false,
  message: '',
  setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
  setMessage: (message: string) => set((state) => ({ ...state, message })),
}))
