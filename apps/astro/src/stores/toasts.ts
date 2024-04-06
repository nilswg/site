import { create } from 'zustand'

export type ToastType = 'success' | 'info' | 'warn' | 'error'

type Toast = {
  id: string
  type: ToastType
  text: string
}

type ToastsStore = {
  index: number
  toasts: Toast[]
  addToast: (payload: { type: ToastType; text: string }) => void
  removeToast: (id: string) => void
}

export const useToastsStore = create<ToastsStore>((set, get) => ({
  index: 0,
  toasts: [],
  addToast: (payload: { type: ToastType; text: string }) => {
    const id = `toast_${get().index}`
    const toast = { id, type: payload.type, text: payload.text }
    set((state) => ({
      index: state.index + 1,
      toasts: [...state.toasts, toast],
    }))
  },
  removeToast: (id: string) => {
    set((state) => ({
      ...state,
      toasts: state.toasts.filter((e) => e.id !== id),
    }))
  },
}))
