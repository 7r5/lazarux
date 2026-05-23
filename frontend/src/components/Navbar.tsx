import { Link, useNavigate } from 'react-router-dom'

interface NavbarProps {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}

export default function Navbar({ isAuthenticated, setIsAuthenticated }: NavbarProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('dummy_token')
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold text-slate-900">
          Ecommerce en línea
        </Link>
        <nav className="flex items-center gap-4 text-slate-600">
          {isAuthenticated ? (
            <>
              <Link to="/">Catálogo</Link>
              <Link to="/cart">Carrito</Link>
              <button onClick={handleLogout} className="rounded-md bg-slate-900 px-3 py-2 text-white">
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login">Ingresar</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
