import { create } from 'zustand'
import type { CartItem } from '../api'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: number) => void
  clearCart: () => void
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((cart) => cart.product_id === item.product_id)
      if (existing) {
        return {
          items: state.items.map((cart) =>
            cart.product_id === item.product_id ? { ...cart, quantity: cart.quantity + item.quantity } : cart,
          ),
        }
      }
      return { items: [...state.items, item] }
    }),
  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((item) => item.product_id !== productId) })),
  clearCart: () => set({ items: [] }),
}))

export default useCartStore
