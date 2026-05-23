import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
})

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  image_url?: string
  stock: number
}

export interface CartItem {
  product_id: number
  quantity: number
  name?: string
  price?: number
  image_url?: string
}

export function register(data: { email: string; password: string; name?: string }) {
  return api.post('/auth/register', data)
}

export function login(data: { email: string; password: string }) {
  return api.post('/auth/login', data)
}

export function fetchProducts() {
  return api.get<Product[]>('/products/')
}

export function checkout(payload: { items: CartItem[]; shipping_address: string; payment_method: string }) {
  return api.post('/cart/checkout', payload)
}

export default api
