import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar'

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('dummy_token')
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('dummy_token')),
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Catalog />
              </RequireAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
